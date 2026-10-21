"""Ensemble of Dixon-Coles and Elo: the one entry point the CLI and backtest use."""
from datetime import date

from .data import Match
from .elo import Elo
from .poisson import DixonColes, Prediction


def implied_probs(odds: tuple[float, float, float]) -> tuple[float, float, float]:
    """Bookmaker odds -> probabilities with the margin (overround) removed proportionally."""
    inv = [1 / o for o in odds]
    total = sum(inv)
    return tuple(p / total for p in inv)


class MatchPredictor:
    def __init__(self, elo_weight: float = 0.2, dc: DixonColes | None = None, elo: Elo | None = None):
        self.elo_weight = elo_weight
        self.dc = dc or DixonColes()
        self.elo = elo or Elo()

    def fit(self, matches: list[Match], as_of: date | None = None) -> "MatchPredictor":
        train = [m for m in matches if m.played and (as_of is None or m.date < as_of)]
        self.dc.fit(train, as_of=as_of)
        self.elo.fit(train)
        return self

    def known_teams(self) -> list[str]:
        return sorted(set(self.dc.attack) | set(self.elo.ratings))

    def predict(self, home: str, away: str) -> Prediction:
        p = self.dc.predict(home, away)
        e = self.elo.predict(home, away)
        w = self.elo_weight
        p.p_home, p.p_draw, p.p_away = ((1 - w) * a + w * b for a, b in zip(p.probs, e.probs))
        return p
