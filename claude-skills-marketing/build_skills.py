#!/usr/bin/env python3
"""Convert files/*.md (CLAUDE.md templates) into Claude Code skills.

Output: <repo>/.claude/skills/<slug>/SKILL.md
Re-run after editing anything in files/:  python3 claude-skills-marketing/build_skills.py
"""
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "files"
OUT = HERE.parent / ".claude" / "skills"

# Russian trigger phrases so the skills fire on requests written in Russian.
RU = {
    "ab-test-design": "A/B-тест, сплит-тест, дизайн эксперимента, гипотеза для теста",
    "ad-copy": "рекламные тексты, объявления, таргет, контекстная реклама, креативы для Meta/Google/LinkedIn/VK",
    "attribution-model": "атрибуция, UTM-метки, модель атрибуции, вклад каналов",
    "blog-post": "статья для блога, SEO-статья, пост в блог",
    "brand-voice-guide": "голос бренда, тон коммуникации, tone of voice, редполитика",
    "campaign-brief": "бриф кампании, план рекламной кампании",
    "campaign-performance": "результаты кампании, эффективность кампании, ROI кампании, отчёт по кампании",
    "campaign-retrospective": "ретроспектива кампании, разбор кампании, пост-мортем",
    "case-study": "кейс клиента, кейс, история успеха",
    "cohort-analysis": "когортный анализ, удержание, retention по каналам, LTV когорт",
    "community-growth": "сообщество, комьюнити, рост сообщества, амбассадоры",
    "competitive-analysis": "анализ конкурентов, конкурентный анализ, позиционирование конкурентов",
    "content-calendar": "контент-план, контент-календарь, график публикаций",
    "content-led-growth": "рост через контент, контент как канал привлечения",
    "content-performance": "эффективность контента, аудит контента, ROI контента",
    "content-repurposing": "переупаковка контента, репёрпосинг, нарезка контента под площадки",
    "content-roadmap-presentation": "контент-роадмап, квартальный план контента, презентация плана контента",
    "content-strategy": "контент-стратегия, контентные рубрики, стратегия контента",
    "email-analytics": "аналитика рассылок, открываемость, доставляемость, метрики email",
    "email-growth": "рост базы подписчиков, сбор email, рост рассылки",
    "email-sequence": "цепочка писем, welcome-серия, прогревающая цепочка, email-автоматизация",
    "funnel-analysis": "анализ воронки, воронка продаж, конверсия по этапам, где отваливаются",
    "go-to-market": "GTM, выход на рынок, стратегия запуска продукта",
    "landing-page-copy": "лендинг, текст для лендинга, посадочная страница, оффер",
    "launch-checklist": "чек-лист запуска, подготовка к запуску, план запуска",
    "lead-magnet": "лид-магнит, гайд за email, бесплатный материал за контакты",
    "marketing-brief": "маркетинговый бриф, бриф для агентства или фрилансера, онбординг подрядчика",
    "marketing-metrics": "маркетинговые метрики, KPI, CAC, LTV, ROMI, дашборд маркетинга",
    "marketing-sprint": "маркетинговый спринт, двухнедельный спринт, growth-спринт",
    "messaging-architecture": "архитектура сообщений, ключевые сообщения, месседж-хаус",
    "newsletter": "рассылка, выпуск рассылки, ньюслеттер, дайджест",
    "paid-acquisition": "платный трафик, закупка трафика, медиаплан, бюджет на рекламу",
    "partnership-marketing": "партнёрский маркетинг, коллаборации, кросс-промо, партнёрства",
    "positioning-framework": "позиционирование, УТП, ценностное предложение, дифференциация",
    "product-launch-announcement": "анонс запуска, анонс продукта или фичи, пресс-релиз",
    "referral-program": "реферальная программа, приведи друга, вирусная механика",
    "seo-strategy": "SEO-стратегия, семантическое ядро, поисковое продвижение, ключевые слова",
    "social-media-post": "пост для соцсетей, SMM, пост в Telegram/LinkedIn/Instagram/X",
    "stakeholder-update": "отчёт для руководства, апдейт для стейкхолдеров, маркетинговый отчёт",
    "video-script": "сценарий видео, сценарий для YouTube, Reels, Shorts, TikTok",
}

PREAMBLE = """## Before you start

- **Product context.** This framework needs to know the product: name, what it does, who it serves. Take it from the request, the project's CLAUDE.md or README, or earlier conversation. If it is missing and matters for the output, ask one short question instead of inventing facts.
- **Language.** The framework is written in English; write the deliverable in the language of the request (Russian request → Russian output), and adapt examples, platforms and conventions to that market.
- **No invented numbers.** Placeholders in `[brackets]` are to be filled with real data from the user. Where data is missing, leave a clearly marked placeholder rather than fabricating metrics, quotes or customer names.
"""


TOP_SECTIONS = re.compile(
    r"^### (Structure|How to Write.*|Conventions|Anti-Patterns|Examples|Customization)\s*$",
    re.M,
)


def promote_headings(md: str) -> str:
    """Lift the framework's own section headings (### -> ##), since the skill
    title is now the H1 instead of '## Skill: ...'. Only known section names are
    touched, so headings inside (sometimes nested) template code blocks stay put."""
    return TOP_SECTIONS.sub(lambda m: m.group(0)[1:], md)


def convert(path: Path) -> tuple[str, str]:
    text = path.read_text(encoding="utf-8")
    m = re.search(r"^## Skill: (.+)$", text, re.M)
    if not m:
        raise SystemExit(f"{path.name}: no '## Skill:' heading")
    title = m.group(1).strip()
    body = text[m.end():].lstrip("\n")
    intro, _, rest = body.partition("\n\n")
    rest = promote_headings(rest)
    slug = path.stem
    intro_one_line = " ".join(intro.split())
    desc = (
        f"{title} framework for marketing work. {intro_one_line} "
        f"Use when asked for: {RU[slug]}."
    ).replace('"', "'")
    if len(desc) > 1024:
        desc = desc[:1020].rsplit(" ", 1)[0] + "…"
    skill = (
        f'---\nname: {slug}\ndescription: "{desc}"\n---\n\n'
        f"# {title}\n\n{intro}\n\n{PREAMBLE}\n{rest.rstrip()}\n"
    )
    return slug, skill


def main():
    files = sorted(SRC.glob("*.md"))
    missing = {p.stem for p in files} - RU.keys()
    if missing:
        raise SystemExit(f"Add Russian triggers for: {sorted(missing)}")
    for p in files:
        slug, skill = convert(p)
        d = OUT / slug
        d.mkdir(parents=True, exist_ok=True)
        (d / "SKILL.md").write_text(skill, encoding="utf-8")
    print(f"Wrote {len(files)} skills to {OUT}")


if __name__ == "__main__":
    main()
