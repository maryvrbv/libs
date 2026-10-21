import math
import random
import unittest
from datetime import date, timedelta

from matchpredictor.backtest import rps, walk_forward
from matchpredictor.data import Match, normalize_season, parse_csv
from matchpredictor.elo import Elo
from matchpredictor.model import MatchPredictor, implied_probs
from matchpredictor.poisson import DixonColes

STRENGTH = {"Strong": 1.8, "Good": 1.3, "Mid A": 1.0, "Mid B": 1.0, "Weak": 0.7, "Poor": 0.55}


def _poisson(rng: random.Random, lam: float) -> int:
    k, p, limit = 0, 1.0, math.exp(-lam)
    while True:
        p *= rng.random()
        if p < limit:
            return k
        k += 1


def synthetic_league(seasons: int = 3, seed: int = 1) -> list[Match]:
    """Double round-robin seasons where goals follow the model's own assumptions."""
    rng = random.Random(seed)
    teams = list(STRENGTH)
    matches, day = [], date(2020, 8, 1)
    for s in range(seasons):
        day = date(2020 + s, 8, 1)
        for _ in range(4):  # four round-robins per season for enough data
            for h in teams:
                for a in teams:
                    if h == a:
                        continue
                    lh = 1.15 * 1.3 * STRENGTH[h] / STRENGTH[a]
                    la = 1.15 * STRENGTH[a] / STRENGTH[h]
                    matches.append(Match(day, h, a, _poisson(rng, lh), _poisson(rng, la),
                                         odds=(2.5, 3.3, 3.0)))
                    day += timedelta(days=1)
    return matches


class DataTests(unittest.TestCase):
    def test_normalize_season(self):
        for value in ("2425", "2024", "2024-25", "2024/2025", 2024):
            self.assertEqual(normalize_season(value), "2425")
        self.assertEqual(normalize_season("1999"), "9900")

    def test_parse_minimal_csv(self):
        text = "Date,HomeTeam,AwayTeam,FTHG,FTAG,B365H,B365D,B365A\n" \
               "10/08/2024,Arsenal,Chelsea,2,1,1.9,3.6,4.2\n12/08/24,Leeds,Hull,,,2.0,3.4,3.8\n"
        played, upcoming = parse_csv(text)
        self.assertEqual(played.result, "H")
        self.assertEqual(played.odds, (1.9, 3.6, 4.2))
        self.assertFalse(upcoming.played)
        self.assertEqual(upcoming.date, date(2024, 8, 12))

    def test_implied_probs_remove_margin(self):
        probs = implied_probs((1.9, 3.6, 4.2))
        self.assertAlmostEqual(sum(probs), 1.0)
        self.assertGreater(probs[0], probs[2])


class ModelTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.matches = synthetic_league()

    def test_dixon_coles_recovers_order(self):
        dc = DixonColes().fit(self.matches)
        strength = {t: dc.attack[t] / dc.defence[t] for t in STRENGTH}
        self.assertEqual(max(strength, key=strength.get), "Strong")
        self.assertEqual(min(strength, key=strength.get), "Poor")
        self.assertAlmostEqual(dc.home_adv, 1.3, delta=0.15)

    def test_prediction_is_a_distribution(self):
        p = DixonColes().fit(self.matches).predict("Strong", "Poor")
        self.assertAlmostEqual(sum(p.probs), 1.0, places=6)
        self.assertGreater(p.p_home, 0.7)
        self.assertEqual(p.pick, "H")
        self.assertTrue(0 < p.over_2_5 < 1 and 0 < p.btts < 1)

    def test_unknown_team_gets_newcomer_prior(self):
        dc = DixonColes().fit(self.matches)
        p = dc.predict("Mid A", "Brand New FC")
        self.assertGreater(p.p_home, p.p_away)

    def test_elo_rewards_winner(self):
        elo = Elo()
        elo.update(Match(date(2024, 1, 1), "A", "B", 3, 0))
        self.assertGreater(elo.ratings["A"], elo.ratings["B"])

    def test_elo_outcome_model_is_monotonic(self):
        elo = Elo().fit(self.matches)
        strong_home = elo.predict("Strong", "Poor")
        weak_home = elo.predict("Poor", "Strong")
        self.assertAlmostEqual(sum(strong_home.probs), 1.0, places=6)
        self.assertGreater(strong_home.p_home, weak_home.p_home)

    def test_ensemble_blends(self):
        model = MatchPredictor(elo_weight=0.5).fit(self.matches)
        p = model.predict("Good", "Weak")
        self.assertAlmostEqual(sum(p.probs), 1.0, places=6)


class BacktestTests(unittest.TestCase):
    def test_rps_bounds(self):
        self.assertEqual(rps((1, 0, 0), "H"), 0)
        self.assertEqual(rps((0, 0, 1), "H"), 1)

    def test_walk_forward_beats_base_rate(self):
        matches = synthetic_league()
        results = walk_forward(matches, date(2022, 8, 1))
        model, base = results["ensemble"].summary(), results["base_rate"].summary()
        self.assertGreater(model["matches"], 100)
        self.assertLess(model["rps"], base["rps"])
        self.assertLess(model["log_loss"], base["log_loss"])


if __name__ == "__main__":
    unittest.main()
