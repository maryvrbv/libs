# Typography

AI-generated typography is almost always wrong. Not broken — wrong. Claude Code picks reasonable font sizes, but they don't follow a scale. The line heights are browser defaults. Letter spacing is untouched. The result reads fine but looks like a prototype.

Here's how to fix it.

## Pick a Type Scale

A type scale is a set of font sizes based on a consistent ratio. Instead of guessing sizes, you multiply a base size by a ratio to get each step up.

The most reliable scale for UI work:

| Role | Size |
|------|------|
| Small / Caption | 12px |
| Body | 16px |
| Large Body / Subheading | 20px |
| H3 | 24px |
| H2 | 32px |
| H1 | 40px |
| Display | 48px or 64px |

This is roughly a 1.25 ratio (Major Third). Every size feels proportional to the others. Pick the sizes you need — you don't have to use all of them. Most pages need four: body, one subheading, one heading, and one large heading.

**Prompt for Claude Code:**

> Review all font sizes in this project. Replace them with a consistent type scale based on a 16px base: 12, 16, 20, 24, 32, 40, 48. Remove any font sizes that don't appear in this scale. Use rem units (0.75rem, 1rem, 1.25rem, 1.5rem, 2rem, 2.5rem, 3rem).

## Line Height

Line height controls readability and density. AI output usually applies one line height everywhere, or worse, none at all.

The rules:

- **Body text (14–18px):** line-height 1.5. This gives paragraphs room to breathe.
- **Headings (20–40px):** line-height 1.2. Tighter, because large text needs less spacing to feel connected.
- **Display text (48px+):** line-height 1.0–1.1. Big text at 1.5 line height looks like it's floating apart.

**Prompt for Claude Code:**

> Audit all line-height values in this project. Apply these rules: body text (under 20px) should use line-height 1.5, headings (20–40px) should use 1.2, and any display text (above 40px) should use 1.1. Fix any elements that don't follow this pattern.

## Letter Spacing

This is the detail that separates "good enough" from polished. AI never touches letter spacing, but it makes a real difference.

- **Headings (24px+):** tighten to `-0.02em` or `-0.03em`. Large text has too much natural space between letters.
- **Body text:** leave at normal (`0`). Default tracking is optimized for readability at body sizes.
- **All caps text:** loosen to `0.05em` or `0.08em`. Uppercase letters are dense — they need room.
- **Small text / captions:** loosen slightly to `0.01em` if it feels cramped.

**Prompt for Claude Code:**

> Add letter-spacing to all heading elements: -0.02em for h1 through h3. For any text set in uppercase or all-caps, add letter-spacing of 0.05em. Leave body text letter-spacing at normal.

## Font Pairing

Claude Code usually picks one font or grabs two that don't work together. Keep it simple.

**The rule: one sans-serif for everything, plus one accent font if you need it.** That's the max. Two fonts. Not three, not four.

Strong defaults:
- **Inter** — the safest all-purpose UI font. Works for everything.
- **DM Sans** — slightly more personality, still clean.
- **Space Grotesk** — modern, geometric, good for headings paired with Inter for body.

If you want a serif accent for headings, **DM Serif Display** or **Playfair Display** pair well with Inter or DM Sans. Use the accent font only for major headings, not subheadings or UI elements.

**Prompt for Claude Code:**

> This project should use [Inter/DM Sans] as the primary font for all text. Replace any other sans-serif fonts with it. If there are decorative or display headings, use [Space Grotesk/DM Serif Display] for those only. Import both from Google Fonts. Make sure no other font families remain in the codebase.

## The Typography Checklist

Before you move on, verify:

- [ ] Every font size comes from your type scale
- [ ] Body text has 1.5 line height, headings have 1.2
- [ ] Headings have negative letter spacing
- [ ] You're using two fonts maximum
- [ ] Heading sizes create a clear visual hierarchy (squint test it)
