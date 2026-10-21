"""Football match outcome prediction: Dixon-Coles + Elo ensemble with walk-forward backtesting."""
from .data import Match, load_csv, load_fixtures, load_league
from .elo import Elo
from .model import MatchPredictor, implied_probs
from .poisson import DixonColes, Prediction

__all__ = ["Match", "load_csv", "load_fixtures", "load_league", "Elo", "MatchPredictor", "implied_probs",
           "DixonColes", "Prediction"]
