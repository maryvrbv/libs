"""Walk-forward backtest: every week is predicted only from matches played before it."""
import math
from dataclasses import dataclass, field
from datetime import date, timedelta

from .data import Match
from .elo import Elo
from .model import implied_probs
from .poisson import DixonColes

OUTCOMES = "HDA"


def log_loss(probs, result: str) -> float:
    return -math.log(max(probs[OUTCOMES.index(result)], 1e-12))


def brier(probs, result: str) -> float:
    return sum((p - (o == result)) ** 2 for p, o in zip(probs, OUTCOMES))


def rps(probs, result: str) -> float:
    """Ranked probability score: the standard football metric, it respects H > D > A ordering."""
    actual = [float(o == result) for o in OUTCOMES]
    cum_p = cum_a = total = 0.0
    for i in range(2):
        cum_p += probs[i]
        cum_a += actual[i]
        total += (cum_p - cum_a) ** 2
    return total / 2


@dataclass
class Score:
    name: str
    n: int = 0
    log_loss: float = 0.0
    brier: float = 0.0
    rps: float = 0.0
    hits: int = 0
    bets: int = 0
    profit: float = 0.0
    calibration: dict = field(default_factory=dict)  # bucket -> [sum predicted, hits, count]

    def add(self, probs, result: str) -> None:
        self.n += 1
        self.log_loss += log_loss(probs, result)
        self.brier += brier(probs, result)
        self.rps += rps(probs, result)
        self.hits += OUTCOMES[max(range(3), key=lambda i: probs[i])] == result
        for p, o in zip(probs, OUTCOMES):
            bucket = min(int(p * 10), 9)
            cell = self.calibration.setdefault(bucket, [0.0, 0, 0])
            cell[0] += p
            cell[1] += o == result
            cell[2] += 1

    def bet(self, probs, odds, result: str, min_edge: float) -> None:
        """Flat 1-unit stake on the outcome with the largest positive edge p * odds - 1."""
        edges = [p * o - 1 for p, o in zip(probs, odds)]
        i = max(range(3), key=lambda j: edges[j])
        if edges[i] < min_edge:
            return
        self.bets += 1
        self.profit += odds[i] - 1 if OUTCOMES[i] == result else -1

    def summary(self) -> dict:
        n = max(self.n, 1)
        return {
            "model": self.name,
            "matches": self.n,
            "log_loss": self.log_loss / n,
            "brier": self.brier / n,
            "rps": self.rps / n,
            "accuracy": self.hits / n,
            "bets": self.bets,
            "roi": self.profit / self.bets if self.bets else None,
        }


def walk_forward(matches: list[Match], test_from: date, elo_weight: float = 0.2, min_edge: float = 0.05,
                 dc_params: dict | None = None, elo_params: dict | None = None) -> dict:
    played = sorted((m for m in matches if m.played), key=lambda m: m.date)
    train = [m for m in played if m.date < test_from]
    test = [m for m in played if m.date >= test_from]
    if len(train) < 100 or not test:
        raise ValueError("Нужно минимум 100 матчей до начала теста и хотя бы один матч в тесте")

    scores = {name: Score(name) for name in ("ensemble", "dixon_coles", "elo", "base_rate", "market")}
    elo = Elo(**(elo_params or {}))
    for m in train:
        elo.update(m)

    # Group test matches into 7-day windows, refit before each window.
    window_start = test[0].date
    i = 0
    while i < len(test):
        window_end = window_start + timedelta(days=7)
        batch = []
        while i < len(test) and test[i].date < window_end:
            batch.append(test[i])
            i += 1
        if batch:
            history = [m for m in played if m.date < batch[0].date]
            dc = DixonColes(**(dc_params or {})).fit(history, as_of=batch[0].date)
            elo.calibrate()
            counts = [sum(m.result == o for m in history) for o in OUTCOMES]
            base = tuple(c / len(history) for c in counts)
            for m in batch:
                p_dc = dc.predict(m.home, m.away).probs
                p_elo = elo.predict(m.home, m.away).probs
                p_ens = tuple((1 - elo_weight) * a + elo_weight * b for a, b in zip(p_dc, p_elo))
                for name, probs in (("ensemble", p_ens), ("dixon_coles", p_dc), ("elo", p_elo), ("base_rate", base)):
                    scores[name].add(probs, m.result)
                    if m.odds and name != "base_rate":
                        scores[name].bet(probs, m.odds, m.result, min_edge)
                market_odds = m.closing_odds or m.odds
                if market_odds:
                    scores["market"].add(implied_probs(market_odds), m.result)
            for m in batch:
                elo.update(m)
        window_start = window_end

    return {name: s for name, s in scores.items() if s.n}
