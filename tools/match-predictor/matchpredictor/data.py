"""Loading match results and odds in the football-data.co.uk CSV format."""
import csv
import hashlib
import io
import os
import urllib.request
from dataclasses import dataclass
from datetime import date, datetime

SEASON_URL = "https://www.football-data.co.uk/mmz4281/{season}/{league}.csv"
FIXTURES_URL = "https://www.football-data.co.uk/fixtures.csv"
DEFAULT_CACHE = os.path.join(os.path.expanduser("~"), ".cache", "matchpredictor")

# Column triples (home, draw, away) in order of preference.
PRE_MATCH_ODDS = [("AvgH", "AvgD", "AvgA"), ("B365H", "B365D", "B365A"), ("PSH", "PSD", "PSA")]
CLOSING_ODDS = [("PSCH", "PSCD", "PSCA"), ("AvgCH", "AvgCD", "AvgCA"), ("B365CH", "B365CD", "B365CA")]


@dataclass
class Match:
    date: date
    home: str
    away: str
    home_goals: int | None = None
    away_goals: int | None = None
    league: str = ""
    odds: tuple[float, float, float] | None = None  # pre-match H/D/A, used for betting
    closing_odds: tuple[float, float, float] | None = None  # market benchmark

    @property
    def played(self) -> bool:
        return self.home_goals is not None and self.away_goals is not None

    @property
    def result(self) -> str | None:
        if not self.played:
            return None
        if self.home_goals > self.away_goals:
            return "H"
        return "D" if self.home_goals == self.away_goals else "A"


def normalize_season(season: str | int) -> str:
    """'2024', '2024-25', '2024/2025' and '2425' all become '2425'.

    A bare 4-digit value made of two consecutive years ('2021') is read as a season code (20/21).
    """
    digits = "".join(ch for ch in str(season) if ch.isdigit())
    if len(digits) == 4 and (int(digits[:2]) + 1) % 100 == int(digits[2:]):
        return digits
    if len(digits) in (4, 6, 8):
        start = int(digits[:4]) % 100
        return f"{start:02d}{(start + 1) % 100:02d}"
    raise ValueError(f"Не понимаю сезон: {season!r}")


def current_season(today: date | None = None) -> str:
    """European seasons start in July."""
    today = today or date.today()
    start = today.year if today.month >= 7 else today.year - 1
    return normalize_season(start)


def recent_seasons(n: int, today: date | None = None) -> list[str]:
    start = int("20" + current_season(today)[:2])
    return [normalize_season(y) for y in range(start - n + 1, start + 1)]


def fetch(url: str, cache_dir: str = DEFAULT_CACHE, refresh: bool = False) -> str:
    os.makedirs(cache_dir, exist_ok=True)
    path = os.path.join(cache_dir, hashlib.sha1(url.encode()).hexdigest()[:16] + ".csv")
    if refresh or not os.path.exists(path):
        with urllib.request.urlopen(url, timeout=30) as resp:
            raw = resp.read()
        with open(path, "wb") as f:
            f.write(raw)
    with open(path, "rb") as f:
        return _decode(f.read())


def _decode(raw: bytes) -> str:
    try:
        return raw.decode("utf-8-sig")
    except UnicodeDecodeError:
        return raw.decode("latin-1")


def _parse_date(value: str) -> date | None:
    for fmt in ("%d/%m/%Y", "%d/%m/%y", "%Y-%m-%d"):
        try:
            return datetime.strptime(value.strip(), fmt).date()
        except ValueError:
            continue
    return None


def _parse_int(value: str | None) -> int | None:
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return None


def _parse_odds(row: dict, candidates) -> tuple[float, float, float] | None:
    for cols in candidates:
        try:
            odds = tuple(float(row[c]) for c in cols)
        except (KeyError, TypeError, ValueError):
            continue
        if all(o > 1.0 for o in odds):
            return odds
    return None


def parse_csv(text: str) -> list[Match]:
    """Parse football-data.co.uk CSV (also accepts a minimal Date,HomeTeam,AwayTeam,FTHG,FTAG file)."""
    matches = []
    for row in csv.DictReader(io.StringIO(text)):
        row = {(k or "").strip(): (v or "").strip() for k, v in row.items()}
        d = _parse_date(row.get("Date", ""))
        home, away = row.get("HomeTeam") or row.get("Home"), row.get("AwayTeam") or row.get("Away")
        if not d or not home or not away:
            continue
        matches.append(Match(
            date=d,
            home=home,
            away=away,
            home_goals=_parse_int(row.get("FTHG", row.get("HG"))),
            away_goals=_parse_int(row.get("FTAG", row.get("AG"))),
            league=row.get("Div", ""),
            odds=_parse_odds(row, PRE_MATCH_ODDS),
            closing_odds=_parse_odds(row, CLOSING_ODDS),
        ))
    matches.sort(key=lambda m: m.date)
    return matches


def load_csv(path: str) -> list[Match]:
    with open(path, "rb") as f:
        return parse_csv(_decode(f.read()))


def load_league(league: str, seasons: list[str], cache_dir: str = DEFAULT_CACHE) -> list[Match]:
    """Download (and cache) several seasons of one league. The current season is always refreshed."""
    cur = current_season()
    matches = []
    for season in map(normalize_season, seasons):
        text = fetch(SEASON_URL.format(season=season, league=league), cache_dir, refresh=season == cur)
        matches.extend(parse_csv(text))
    matches.sort(key=lambda m: m.date)
    return matches


def load_fixtures(league: str, cache_dir: str = DEFAULT_CACHE) -> list[Match]:
    """Upcoming fixtures published by football-data.co.uk (refreshed on every call)."""
    return [m for m in parse_csv(fetch(FIXTURES_URL, cache_dir, refresh=True))
            if m.league == league and not m.played]
