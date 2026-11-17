# Color and Contrast

AI picks colors that technically work. They pass basic checks, they don't clash, and they render fine. But they don't feel cohesive. That's because Claude Code treats color as a functional decision — this needs to be blue, that needs to be red — rather than a system decision. You end up with five slightly different grays, an accent color that shows up everywhere, and a palette that feels like it was assembled by committee.

## The 60-30-10 Rule

Every polished UI follows this ratio whether the designer names it or not.

- **60% — Neutrals.** Backgrounds, cards, containers. This is the canvas. Most of your interface should be neutral tones.
- **30% — Supporting color.** Secondary backgrounds, borders, muted text, subtle differentiation between sections.
- **10% — Accent.** Primary actions, active states, key indicators. This is the color your brand is known for.

AI output typically inverts this. It uses accent color at 30-40% because it applies your primary color to every button, link, badge, and icon. Pull it back. Your accent color should feel intentional because it's rare.

## Semantic Colors

Stop thinking in hex values. Think in roles.

- **Background** — the base canvas (`bg-background`)
- **Foreground** — primary text and icons (`text-foreground`)
- **Muted** — secondary text, placeholders, subtle borders (`text-muted-foreground`, `bg-muted`)
- **Accent** — primary actions, links, selected states
- **Destructive** — delete, error, critical warnings

Every color in your app should map to one of these roles. If you find a color that doesn't fit a role, it probably shouldn't be there.

## Contrast Ratios

This isn't optional. It's accessibility and readability.

- **4.5:1 minimum** for body text (WCAG AA)
- **3:1 minimum** for large text (18px+) and UI elements like borders and icons

AI frequently fails contrast on muted text. That light gray placeholder on a white background? It's probably at 2:1. Check it. Fix it.

## The Neutral Palette Secret

The most polished interfaces use 5-7 neutral shades and one accent color. That's it. AI generates too many one-off colors because it solves each element independently. A cohesive UI solves the palette once and applies it everywhere.

Build your neutral scale: a pure background, a subtle surface for cards, a border gray, a muted text gray, and your primary foreground. Derive everything else from these.

## Audit and Fix

Look for these problems in AI output:

1. **Too many grays.** Open your browser devtools, inspect text and background elements. If you find more than 5-6 distinct neutral values, consolidate.
2. **Accent overuse.** Count how many elements use your primary color. If it's more than CTAs, active nav items, and key links — strip it back.
3. **Inconsistent opacity.** AI sometimes uses `opacity-50` in one place and a different gray in another to achieve the same visual effect. Pick one approach.

## Prompts That Work

To fix color across your entire app:

```
Audit the color usage across the app. Consolidate to a strict palette:
- 1 background color
- 1 surface/card color
- 1 border color
- 2 text colors (primary foreground and muted)
- 1 accent color (used only for primary actions and active states)
- 1 destructive color

Replace all one-off hex/rgb values with CSS variables or Tailwind theme tokens. Every color in the app must map to one of these roles.
```

To fix a specific contrast issue:

```
Check all text-on-background combinations for WCAG AA contrast (4.5:1 for body text, 3:1 for large text). Fix any that fail by darkening the text or lightening the background — don't change the overall palette, just adjust the specific values that fail.
```

A tight palette with proper contrast does more for polish than any other single change. Get this right and the whole app feels intentional.
