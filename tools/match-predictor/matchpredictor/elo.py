"""Elo ratings with goal-margin multiplier, plus an ordered-logit map from rating gap to H/D/A.

Elo by itself only gives an "expected score"; to get a draw probability we fit an ordered
logistic regression on the pre-match rating gaps seen so far:
    P(away) = s(c1 - b*d),  P(away or draw) = s(c2 - b*d),  d = (R_home + H - R_away) / 100.
"""
import math

from .data import Match
from .poisson import Prediction


def _sigmoid(z: float) -> float:
    if z >= 0:
        return 1 / (1 + math.exp(-z))
    e = math.exp(z)
    return e / (1 + e)


def _solve3(a: list[list[float]], b: list[float]) -> list[float]:
    """Gaussian elimination with partial pivoting for a 3x3 system."""
    m = [row[:] + [v] for row, v in zip(a, b)]
    for col in range(3):
        piv = max(range(col, 3), key=lambda r: abs(m[r][col]))
        m[col], m[piv] = m[piv], m[col]
        if abs(m[col][col]) < 1e-12:
            raise ZeroDivisionError
        for r in range(col + 1, 3):
            f = m[r][col] / m[col][col]
            for c in range(col, 4):
                m[r][c] -= f * m[col][c]
    x = [0.0] * 3
    for r in (2, 1, 0):
        x[r] = (m[r][3] - sum(m[r][c] * x[c] for c in range(r + 1, 3))) / m[r][r]
    return x


class OrderedLogit:
    def __init__(self):
        self.b, self.c1, self.c2 = 0.55, -0.85, 0.2  # sensible football defaults

    def probs(self, d: float) -> tuple[float, float, float]:
        s1 = _sigmoid(self.c1 - self.b * d)
        s2 = _sigmoid(self.c2 - self.b * d)
        return 1 - s2, max(s2 - s1, 1e-9), s1

    def _loglik(self, params, data) -> float:
        b, c1, c2 = params
        if c2 <= c1:
            return -math.inf
        ll = 0.0
        for d, r in data:
            s1, s2 = _sigmoid(c1 - b * d), _sigmoid(c2 - b * d)
            p = 1 - s2 if r == "H" else s1 if r == "A" else s2 - s1
            ll += math.log(max(p, 1e-12))
        return ll

    def _grad(self, params, data) -> list[float]:
        b, c1, c2 = params
        g = [0.0, 0.0, 0.0]
        for d, r in data:
            s1, s2 = _sigmoid(c1 - b * d), _sigmoid(c2 - b * d)
            g1, g2 = s1 * (1 - s1), s2 * (1 - s2)
            if r == "A":
                g[0] -= (1 - s1) * d
                g[1] += 1 - s1
            elif r == "H":
                g[0] += s2 * d
                g[2] -= s2
            else:
                p = max(s2 - s1, 1e-12)
                g[0] += d * (g1 - g2) / p
                g[1] -= g1 / p
                g[2] += g2 / p
        return g

    def fit(self, data: list[tuple[float, str]], iterations: int = 25) -> "OrderedLogit":
        """Damped Newton's method with a numerical Hessian (only three parameters)."""
        if len(data) < 30:
            return self
        params = [self.b, self.c1, self.c2]
        ll = self._loglik(params, data)
        for _ in range(iterations):
            g = self._grad(params, data)
            eps = 1e-5
            hess = []
            for j in range(3):
                shifted = params[:]
                shifted[j] += eps
                gj = self._grad(shifted, data)
                hess.append([(gj[i] - g[i]) / eps for i in range(3)])
            try:
                step = _solve3(hess, [-v for v in g])
            except ZeroDivisionError:
                break
            t = 1.0
            while t > 1e-4:
                cand = [p + t * s for p, s in zip(params, step)]
                cand_ll = self._loglik(cand, data)
                if cand_ll >= ll:
                    break
                t /= 2
            else:
                break
            converged = cand_ll - ll < 1e-9
            params, ll = cand, cand_ll
            if converged:
                break
        self.b, self.c1, self.c2 = params
        return self


class Elo:
    def __init__(self, k: float = 20, home_advantage: float = 60, initial: float = 1500,
                 newcomer_offset: float = -80, season_regression: float = 0.25, season_gap_days: int = 45):
        self.k = k
        self.home_advantage = home_advantage
        self.initial = initial
        self.newcomer_offset = newcomer_offset
        self.season_regression = season_regression
        self.season_gap_days = season_gap_days
        self.ratings: dict[str, float] = {}
        self.history: list[tuple[float, str]] = []  # (pre-match gap, result) for calibration
        self.outcome_model = OrderedLogit()
        self._last_date = None

    def _rating(self, team: str) -> float:
        if team not in self.ratings:
            self.ratings[team] = self.initial + (self.newcomer_offset if self.ratings else 0)
        return self.ratings[team]

    def gap(self, home: str, away: str) -> float:
        rh = self.ratings.get(home, self.initial + self.newcomer_offset)
        ra = self.ratings.get(away, self.initial + self.newcomer_offset)
        return (rh + self.home_advantage - ra) / 100

    def update(self, m: Match) -> None:
        if not m.played:
            return
        if self._last_date and (m.date - self._last_date).days > self.season_gap_days and self.ratings:
            mean = sum(self.ratings.values()) / len(self.ratings)
            for t in self.ratings:
                self.ratings[t] += self.season_regression * (mean - self.ratings[t])
        self._last_date = m.date

        rh, ra = self._rating(m.home), self._rating(m.away)
        d = (rh + self.home_advantage - ra) / 100
        self.history.append((d, m.result))

        expected = 1 / (1 + 10 ** (-d / 4))
        actual = {"H": 1.0, "D": 0.5, "A": 0.0}[m.result]
        margin = abs(m.home_goals - m.away_goals)
        g = 1 if margin <= 1 else 1.5 if margin == 2 else (11 + margin) / 8
        delta = self.k * g * (actual - expected)
        self.ratings[m.home] = rh + delta
        self.ratings[m.away] = ra - delta

    def fit(self, matches: list[Match], burn_in: int = 100) -> "Elo":
        for m in sorted(matches, key=lambda m: m.date):
            self.update(m)
        return self.calibrate(burn_in)

    def calibrate(self, burn_in: int = 100) -> "Elo":
        """Refit the gap -> H/D/A map, skipping the cold-start matches where ratings mean nothing."""
        data = self.history[burn_in:] if len(self.history) > burn_in + 30 else self.history
        self.outcome_model.fit(data)
        return self

    def predict(self, home: str, away: str) -> Prediction:
        ph, pd, pa = self.outcome_model.probs(self.gap(home, away))
        return Prediction(home=home, away=away, p_home=ph, p_draw=pd, p_away=pa)
