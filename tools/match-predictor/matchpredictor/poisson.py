"""Dixon-Coles model: team attack/defence strengths -> Poisson goal rates -> score matrix.

Home goals ~ Poisson(mu * home * att[h] * defw[a]), away goals ~ Poisson(mu * att[a] * defw[h]),
where defw is "defensive weakness" (higher = concedes more). Older matches are down-weighted
exponentially, and every team is shrunk towards a prior with `shrinkage` pseudo-goals so that
a handful of results can't produce extreme ratings. The Dixon-Coles rho corrects the
frequency of low scores (0-0, 1-0, 0-1, 1-1), which plain independent Poisson gets wrong.
"""
import math
from dataclasses import dataclass, field
from datetime import date

from .data import Match


@dataclass
class Prediction:
    home: str
    away: str
    p_home: float
    p_draw: float
    p_away: float
    xg_home: float | None = None
    xg_away: float | None = None
    over_2_5: float | None = None
    btts: float | None = None
    top_scores: list[tuple[int, int, float]] = field(default_factory=list)

    @property
    def probs(self) -> tuple[float, float, float]:
        return self.p_home, self.p_draw, self.p_away

    @property
    def pick(self) -> str:
        return "HDA"[max(range(3), key=lambda i: self.probs[i])]


def _poisson_pmf(lam: float, max_goals: int) -> list[float]:
    pmf = [math.exp(-lam)]
    for k in range(1, max_goals + 1):
        pmf.append(pmf[-1] * lam / k)
    return pmf


def _tau(x: int, y: int, lh: float, la: float, rho: float) -> float:
    if x == 0 and y == 0:
        return 1 - lh * la * rho
    if x == 0 and y == 1:
        return 1 + lh * rho
    if x == 1 and y == 0:
        return 1 + la * rho
    if x == 1 and y == 1:
        return 1 - rho
    return 1.0


class DixonColes:
    def __init__(self, half_life_days: float = 500, shrinkage: float = 2.0, newcomer_attack: float = 0.8,
                 newcomer_defence: float = 1.2, max_goals: int = 10, max_iter: int = 300, tol: float = 1e-7):
        self.half_life_days = half_life_days
        self.shrinkage = shrinkage
        self.newcomer_attack = newcomer_attack
        self.newcomer_defence = newcomer_defence
        self.max_goals = max_goals
        self.max_iter = max_iter
        self.tol = tol
        self.attack: dict[str, float] = {}
        self.defence: dict[str, float] = {}
        self.mu = 1.2
        self.home_adv = 1.25
        self.rho = 0.0

    def fit(self, matches: list[Match], as_of: date | None = None) -> "DixonColes":
        played = [m for m in matches if m.played and (as_of is None or m.date < as_of)]
        if not played:
            raise ValueError("Нет сыгранных матчей для обучения")
        as_of = as_of or max(m.date for m in played)
        weights = [0.5 ** ((as_of - m.date).days / self.half_life_days) for m in played]

        # Teams that first appear well after the data starts are treated as promoted sides:
        # their prior is weaker than league average until results say otherwise.
        first_seen: dict[str, date] = {}
        for m in played:
            first_seen.setdefault(m.home, m.date)
            first_seen.setdefault(m.away, m.date)
        start = played[0].date
        prior_att, prior_def = {}, {}
        for team, seen in first_seen.items():
            newcomer = (seen - start).days > 200
            prior_att[team] = self.newcomer_attack if newcomer else 1.0
            prior_def[team] = self.newcomer_defence if newcomer else 1.0

        teams = sorted(first_seen)
        att = dict(prior_att)
        dfw = dict(prior_def)
        mu, home = self.mu, self.home_adv
        k = self.shrinkage

        for _ in range(self.max_iter):
            old = (mu, home, dict(att), dict(dfw))

            scored = {t: 0.0 for t in teams}
            exp_scored = {t: 0.0 for t in teams}
            for m, w in zip(played, weights):
                scored[m.home] += w * m.home_goals
                scored[m.away] += w * m.away_goals
                exp_scored[m.home] += w * mu * home * dfw[m.away]
                exp_scored[m.away] += w * mu * dfw[m.home]
            for t in teams:
                att[t] = (scored[t] + k * prior_att[t]) / (exp_scored[t] + k)

            conceded = {t: 0.0 for t in teams}
            exp_conceded = {t: 0.0 for t in teams}
            for m, w in zip(played, weights):
                conceded[m.home] += w * m.away_goals
                conceded[m.away] += w * m.home_goals
                exp_conceded[m.home] += w * mu * att[m.away]
                exp_conceded[m.away] += w * mu * home * att[m.home]
            for t in teams:
                dfw[t] = (conceded[t] + k * prior_def[t]) / (exp_conceded[t] + k)

            # Scale is not identified (att * c, defw / c gives the same rates); keep mean(att) = 1.
            c = sum(att.values()) / len(att)
            for t in teams:
                att[t] /= c
                dfw[t] *= c

            num_a = sum(w * m.away_goals for m, w in zip(played, weights))
            den_a = sum(w * att[m.away] * dfw[m.home] for m, w in zip(played, weights))
            num_h = sum(w * m.home_goals for m, w in zip(played, weights))
            den_h = sum(w * att[m.home] * dfw[m.away] for m, w in zip(played, weights))
            home = (num_h / den_h) / (num_a / den_a)
            mu = (num_h + num_a) / (home * den_h + den_a)

            delta = max([abs(mu - old[0]), abs(home - old[1])]
                        + [abs(att[t] - old[2][t]) for t in teams]
                        + [abs(dfw[t] - old[3][t]) for t in teams])
            if delta < self.tol:
                break

        self.attack, self.defence, self.mu, self.home_adv = att, dfw, mu, home
        self.rho = self._fit_rho(played, weights)
        return self

    def _fit_rho(self, played: list[Match], weights: list[float]) -> float:
        low = [(m, w, *self.expected_goals(m.home, m.away)) for m, w in zip(played, weights)
               if m.home_goals <= 1 and m.away_goals <= 1]
        best, best_ll = 0.0, -math.inf
        for i in range(-25, 16):
            rho = i / 100
            taus = [_tau(m.home_goals, m.away_goals, lh, la, rho) for m, _, lh, la in low]
            if min(taus, default=1) <= 0:
                continue
            ll = sum(w * math.log(t) for (_, w, _, _), t in zip(low, taus))
            if ll > best_ll:
                best, best_ll = rho, ll
        return best

    def knows(self, team: str) -> bool:
        return team in self.attack

    def expected_goals(self, home: str, away: str) -> tuple[float, float]:
        ah = self.attack.get(home, self.newcomer_attack)
        dh = self.defence.get(home, self.newcomer_defence)
        aa = self.attack.get(away, self.newcomer_attack)
        da = self.defence.get(away, self.newcomer_defence)
        return self.mu * self.home_adv * ah * da, self.mu * aa * dh

    def score_matrix(self, home: str, away: str) -> list[list[float]]:
        lh, la = self.expected_goals(home, away)
        ph, pa = _poisson_pmf(lh, self.max_goals), _poisson_pmf(la, self.max_goals)
        mat = [[ph[x] * pa[y] * _tau(x, y, lh, la, self.rho) for y in range(self.max_goals + 1)]
               for x in range(self.max_goals + 1)]
        total = sum(map(sum, mat))
        return [[p / total for p in row] for row in mat]

    def predict(self, home: str, away: str, top: int = 5) -> Prediction:
        lh, la = self.expected_goals(home, away)
        mat = self.score_matrix(home, away)
        n = len(mat)
        cells = [(x, y, mat[x][y]) for x in range(n) for y in range(n)]
        return Prediction(
            home=home,
            away=away,
            p_home=sum(p for x, y, p in cells if x > y),
            p_draw=sum(p for x, y, p in cells if x == y),
            p_away=sum(p for x, y, p in cells if x < y),
            xg_home=lh,
            xg_away=la,
            over_2_5=sum(p for x, y, p in cells if x + y > 2),
            btts=sum(p for x, y, p in cells if x > 0 and y > 0),
            top_scores=sorted(cells, key=lambda c: -c[2])[:top],
        )
