"""Command-line interface: predict, fixtures, ratings, backtest."""
import argparse
import difflib
import json
import sys
from dataclasses import asdict
from datetime import date, timedelta

from . import data
from .backtest import walk_forward
from .model import MatchPredictor, implied_probs

LEAGUES = {
    "E0": "Англия, Премьер-лига", "E1": "Англия, Чемпионшип", "SC0": "Шотландия, Премьершип",
    "D1": "Германия, Бундеслига", "D2": "Германия, Бундеслига 2", "I1": "Италия, Серия A",
    "I2": "Италия, Серия B", "SP1": "Испания, Ла Лига", "SP2": "Испания, Сегунда", "F1": "Франция, Лига 1",
    "F2": "Франция, Лига 2", "N1": "Нидерланды, Эредивизи", "B1": "Бельгия, Про-лига",
    "P1": "Португалия, Примейра", "T1": "Турция, Суперлига", "G1": "Греция, Суперлига",
}


def _load(args) -> list[data.Match]:
    if args.csv:
        matches = [m for path in args.csv for m in data.load_csv(path)]
        return sorted(matches, key=lambda m: m.date)
    seasons = args.seasons or data.recent_seasons(3)
    return data.load_league(args.league, seasons, args.cache_dir)


def _resolve(team: str, known: list[str]) -> str:
    if team in known:
        return team
    lowered = {t.lower(): t for t in known}
    if team.lower() in lowered:
        return lowered[team.lower()]
    partial = [t for t in known if team.lower() in t.lower()]
    if len(partial) == 1:
        return partial[0]
    hints = partial or difflib.get_close_matches(team, known, n=5, cutoff=0.5)
    hint = f" Возможно: {', '.join(hints)}." if hints else ""
    sys.exit(f"Команда «{team}» не найдена в данных.{hint} Список: команда ratings.")


def _pct(p: float) -> str:
    return f"{p * 100:5.1f}%"


def _print_prediction(p, odds=None) -> None:
    print(f"\n{p.home} — {p.away}")
    print(f"  xG: {p.xg_home:.2f} : {p.xg_away:.2f}")
    print(f"  П1 {_pct(p.p_home)}   X {_pct(p.p_draw)}   П2 {_pct(p.p_away)}")
    print(f"  Тотал больше 2,5: {_pct(p.over_2_5)}   Обе забьют: {_pct(p.btts)}")
    print("  Вероятные счета: " + ", ".join(f"{x}:{y} ({p_ * 100:.1f}%)" for x, y, p_ in p.top_scores[:3]))
    if odds:
        market = implied_probs(odds)
        print(f"  Рынок: П1 {_pct(market[0])}   X {_pct(market[1])}   П2 {_pct(market[2])}"
              f"   (кэфы {odds[0]:.2f} / {odds[1]:.2f} / {odds[2]:.2f})")


def _prediction_dict(p, m=None) -> dict:
    d = asdict(p)
    d["top_scores"] = [{"score": f"{x}:{y}", "p": prob} for x, y, prob in p.top_scores]
    if m is not None:
        d["date"] = m.date.isoformat()
        d["market"] = implied_probs(m.odds) if m.odds else None
    return d


def cmd_predict(args) -> None:
    matches = _load(args)
    model = MatchPredictor(elo_weight=args.elo_weight).fit(matches)
    known = model.known_teams()
    p = model.predict(_resolve(args.home, known), _resolve(args.away, known))
    if args.json:
        print(json.dumps(_prediction_dict(p), ensure_ascii=False, indent=2))
    else:
        _print_prediction(p)


def cmd_fixtures(args) -> None:
    matches = _load(args)
    model = MatchPredictor(elo_weight=args.elo_weight).fit(matches)
    horizon = date.today() + timedelta(days=args.days)
    fixtures = [m for m in data.load_fixtures(args.league, args.cache_dir) if m.date <= horizon]
    if not fixtures:
        print(f"Нет опубликованных матчей {args.league} на ближайшие {args.days} дн.")
        return
    preds = [(m, model.predict(m.home, m.away)) for m in fixtures]
    if args.json:
        print(json.dumps([_prediction_dict(p, m) for m, p in preds], ensure_ascii=False, indent=2))
        return
    for m, p in preds:
        print(f"\n[{m.date:%d.%m}]", end="")
        _print_prediction(p, m.odds)
        if not (model.dc.knows(m.home) and model.dc.knows(m.away)):
            print("  ⚠ одна из команд без истории в данных — взят приор «новичка лиги»")


def cmd_ratings(args) -> None:
    matches = _load(args)
    model = MatchPredictor(elo_weight=args.elo_weight).fit(matches)
    last = max(m.date for m in matches if m.played)
    active = {t for m in matches if m.played and (last - m.date).days < 300 for t in (m.home, m.away)}
    rows = []
    for t in active:
        att, dfw = model.dc.attack[t], model.dc.defence[t]
        rows.append({"team": t, "attack": att, "defence": 1 / dfw, "strength": att / dfw,
                     "elo": model.elo.ratings.get(t)})
    rows.sort(key=lambda r: -r["strength"])
    if args.json:
        print(json.dumps(rows, ensure_ascii=False, indent=2))
        return
    print(f"Данные до {last:%d.%m.%Y}. Атака/оборона: 1.00 = средний уровень лиги, выше — лучше.")
    print(f"Домашнее преимущество: ×{model.dc.home_adv:.2f} к голам, rho = {model.dc.rho:+.2f}\n")
    print(f"{'#':>3}  {'Команда':<22}{'Атака':>7}{'Оборона':>9}{'Сила':>7}{'Эло':>7}")
    for i, r in enumerate(rows, 1):
        print(f"{i:>3}  {r['team']:<22}{r['attack']:>7.2f}{r['defence']:>9.2f}{r['strength']:>7.2f}{r['elo']:>7.0f}")


def cmd_backtest(args) -> None:
    matches = _load(args)
    if args.test_from:
        test_from = date.fromisoformat(args.test_from)
    else:
        last_start = int("20" + data.normalize_season((args.seasons or data.recent_seasons(3))[-1])[:2])
        test_from = date(last_start, 7, 1)
    results = walk_forward(matches, test_from, elo_weight=args.elo_weight, min_edge=args.min_edge)
    summaries = [s.summary() for s in results.values()]
    if args.json:
        print(json.dumps(summaries, ensure_ascii=False, indent=2))
        return
    names = {"ensemble": "Ансамбль", "dixon_coles": "Диксон — Коулз", "elo": "Эло",
             "base_rate": "Базовая частота", "market": "Рынок (закрытие)"}
    print(f"Walk-forward с {test_from:%d.%m.%Y}: каждая неделя предсказана только по прошлым матчам.")
    print("Меньше — лучше: RPS, log-loss, Brier. Ставки: 1 ед. на исход с перевесом ≥ "
          f"{args.min_edge:.0%} по средним предматчевым кэфам.\n")
    print(f"{'Модель':<18}{'Матчей':>7}{'RPS':>8}{'LogLoss':>9}{'Brier':>8}{'Точность':>10}{'Ставок':>8}{'ROI':>8}")
    for s in summaries:
        roi = f"{s['roi']:+.1%}" if s["roi"] is not None else "—"
        bets = s["bets"] or "—"
        print(f"{names.get(s['model'], s['model']):<18}{s['matches']:>7}{s['rps']:>8.4f}{s['log_loss']:>9.4f}"
              f"{s['brier']:>8.4f}{s['accuracy']:>10.1%}{bets:>8}{roi:>8}")
    cal = results["ensemble"].calibration
    print("\nКалибровка ансамбля (предсказано → случилось):")
    for bucket in sorted(cal):
        total, hits, n = cal[bucket]
        if n >= 20:
            print(f"  {bucket * 10:>2}–{bucket * 10 + 10}%: {total / n:6.1%} → {hits / n:6.1%}  (n={n})")


def main(argv=None) -> None:
    parser = argparse.ArgumentParser(prog="matchpredictor",
                                     description="Прогноз футбольных матчей: Диксон — Коулз + Эло.")
    common = argparse.ArgumentParser(add_help=False)
    common.add_argument("--league", default="E0", help=f"код лиги football-data.co.uk (по умолчанию E0): "
                        + ", ".join(LEAGUES))
    common.add_argument("--seasons", nargs="+", help="сезоны, например 2324 2425 (по умолчанию последние три)")
    common.add_argument("--csv", nargs="+", help="свои CSV вместо скачивания (Date,HomeTeam,AwayTeam,FTHG,FTAG)")
    common.add_argument("--elo-weight", type=float, default=0.2, help="доля Эло в ансамбле (0..1)")
    common.add_argument("--cache-dir", default=data.DEFAULT_CACHE)
    common.add_argument("--json", action="store_true", help="вывод в JSON")
    sub = parser.add_subparsers(dest="command", required=True)

    p = sub.add_parser("predict", parents=[common], help="прогноз одного матча")
    p.add_argument("home")
    p.add_argument("away")
    p.set_defaults(func=cmd_predict)

    p = sub.add_parser("fixtures", parents=[common], help="прогнозы на ближайшие матчи лиги")
    p.add_argument("--days", type=int, default=7)
    p.set_defaults(func=cmd_fixtures)

    p = sub.add_parser("ratings", parents=[common], help="таблица силы команд")
    p.set_defaults(func=cmd_ratings)

    p = sub.add_parser("backtest", parents=[common], help="проверка качества на истории")
    p.add_argument("--test-from", help="дата начала теста YYYY-MM-DD (по умолчанию начало последнего сезона)")
    p.add_argument("--min-edge", type=float, default=0.05, help="минимальный перевес для ставки")
    p.set_defaults(func=cmd_backtest)

    args = parser.parse_args(argv)
    args.func(args)
