# [Project Name]

[Brief description of what this project does.]

---

## Capability: Color System

This project uses semantic color tokens. No hardcoded hex values in components. Every color maps to a named role — what it means, not what it looks like. This makes the palette maintainable, consistent, and ready for theming or dark mode. Color is not decoration. It communicates hierarchy, state, and meaning.

### Semantic Color Architecture

```css
:root {
  /* Backgrounds — 3 levels of depth */
  --color-bg:           #FFFFFF;   /* Page background */
  --color-bg-secondary: #F9FAFB;   /* Alternate sections, sidebars */
  --color-bg-tertiary:  #F3F4F6;   /* Subtle highlights, code blocks, wells */

  /* Foreground — 3 levels of emphasis */
  --color-fg:           #111827;   /* Primary text, headings */
  --color-fg-secondary: #6B7280;   /* Descriptions, supporting text */
  --color-fg-muted:     #9CA3AF;   /* Placeholders, timestamps, metadata */

  /* Borders — 2 levels */
  --color-border:       #E5E7EB;   /* Default borders, dividers */
  --color-border-subtle:#F3F4F6;   /* Faint separators, subtle structure */

  /* Accent — your single brand/action color */
  --color-accent:       [#brand];  /* Primary buttons, links, active states */
  --color-accent-hover: [#brand-dark]; /* Hover state for accent elements */
  --color-accent-subtle:[#brand-light]; /* Tinted backgrounds for accent context */

  /* Semantic — meaning-based colors */
  --color-destructive:        #DC2626;  /* Delete, remove, error actions */
  --color-destructive-subtle: #FEF2F2; /* Error backgrounds, banners */
  --color-warning:            #D97706;  /* Caution, attention needed */
  --color-warning-subtle:     #FFFBEB; /* Warning backgrounds */
  --color-success:            #059669;  /* Confirmations, positive states */
  --color-success-subtle:     #ECFDF5; /* Success backgrounds */
  --color-info:               #2563EB; /* Informational, neutral alerts */
  --color-info-subtle:        #EFF6FF; /* Info backgrounds */

  /* Muted — for disabled and inactive states */
  --color-muted:        #9CA3AF;  /* Disabled text */
  --color-muted-bg:     #F9FAFB;  /* Disabled backgrounds */
}
```

### The 60-30-10 Rule

Color distribution across the UI must follow this ratio:

```
60% — Neutral (backgrounds, surfaces, body text)
      Uses: --color-bg, --color-bg-secondary, --color-fg, --color-border
      This is the canvas. It should feel invisible.

30% — Supporting (secondary backgrounds, borders, muted text)
      Uses: --color-bg-tertiary, --color-fg-secondary, --color-fg-muted,
            --color-border-subtle
      This creates structure and hierarchy.

10% — Accent (brand color, CTAs, active states, semantic colors)
      Uses: --color-accent, --color-destructive, --color-success, etc.
      This draws attention. Use it sparingly or it loses power.
```

**Enforcement:** After building a page, squint at it. If more than ~10% of the visible area is a saturated color, you've broken the rule. Pull back. Accent color should appear on buttons, links, and small indicators — not on large surfaces, backgrounds, or containers.

### Contrast Requirements (WCAG AA)

Every text-on-background combination must meet these minimums:

```
Normal text (under 18px):     4.5:1 contrast ratio
Large text (18px+ bold, 24px+): 3:1 contrast ratio
UI components and icons:      3:1 contrast ratio
```

Check every combination you use:
- `--color-fg` on `--color-bg` — must pass 4.5:1
- `--color-fg-secondary` on `--color-bg` — must pass 4.5:1
- `--color-fg-muted` on `--color-bg` — must pass 3:1 (large text only, or use as non-essential)
- White text on `--color-accent` — must pass 4.5:1
- White text on `--color-destructive` — must pass 4.5:1

If a combination fails, adjust the color. Never sacrifice readability for aesthetics.

### Building a Neutral Palette

Your neutrals (grays) should not be pure gray. Pick a hue and desaturate it for a more cohesive feel.

**Process:**
1. Pick the dominant hue from your brand (e.g., blue at 220)
2. Set saturation to 5-15% (just enough to feel warm or cool)
3. Create 5-7 shades from near-white to near-black

```
Example — Blue-tinted neutrals (hue: 220, saturation: 10%):
  50:  #F8FAFC   (background)
  100: #F1F5F9   (secondary background)
  200: #E2E8F0   (borders)
  300: #CBD5E1   (muted borders, disabled)
  500: #64748B   (secondary text)
  700: #334155   (primary text)
  900: #0F172A   (headings, emphasis)
```

This is more sophisticated than pure `#F5F5F5` / `#333333` grays. The tint ties the neutrals to the brand.

### Color Audit Process

When reviewing or inheriting a project, audit colors before making changes:

1. **Search for hardcoded hex values** — every `#` in component CSS should be in the `:root` block or a theme file, not inline
2. **Search for `rgb()` and `rgba()`** in component styles — replace with semantic tokens
3. **Check every color maps to a semantic role** — if you find `#3B82F6` used directly, determine its role (is it accent? info? a link color?) and map it
4. **List all unique colors** — if there are more than 15-20 unique colors, the palette is bloated. Consolidate
5. **Check contrast** on all text-background pairs using a contrast checker

### Color for Meaning

These associations are universal. Don't break them.

```
Red    → Destructive, error, danger, delete, remove
        Uses: --color-destructive
        Never use red for non-destructive actions.

Yellow → Warning, caution, attention needed
        Uses: --color-warning
        Proceed-with-caution states. Not errors.

Green  → Success, confirmation, positive, complete
        Uses: --color-success
        Completed states, saved confirmations.

Blue   → Informational, neutral, links, help
        Uses: --color-info
        Neutral alerts, documentation links.
```

Do not assign colors arbitrarily. If a button deletes something, it's red. If a banner is informational, it's blue. Users have learned these associations from every other application they use.

### [Project-Specific Colors]

[Define the project's accent color (hex value and its hover/subtle variants). Specify the neutral palette hue and saturation. Note any additional brand colors beyond the accent. Specify if the project supports dark mode — if so, define the dark mode overrides for all tokens above.]

### Anti-Patterns — Do NOT

- Use more than 2 saturated colors in the UI. One accent color plus semantic colors (red, yellow, green, blue) is the maximum. If you have a purple accent and an orange highlight and a teal badge, you have too many.
- Use `opacity` to create color variants. `rgba(0, 0, 0, 0.5)` for text and `rgba(59, 130, 246, 0.1)` for backgrounds creates colors that shift depending on what's behind them. Define explicit colors instead.
- Apply the accent color to large surfaces. Accent is for buttons, links, badges, and indicators. Not for section backgrounds, sidebars, or card fills. That breaks 60-30-10.
- Hardcode hex values in component CSS. Every color references a custom property. The only place raw hex values appear is in the `:root` token definitions.
- Use pure black `#000000` for text. It creates too much contrast on white backgrounds and feels harsh. Use `#111827` or similar off-black.
- Use pure white `#FFFFFF` for text on dark backgrounds without checking contrast.
- Introduce new colors without adding them to the token system first. If a new color is needed, add it as a semantic token, then use it.
- Use color as the only indicator of state. A red border on an error field must be paired with an error message and/or icon. Users with color vision deficiency need another signal.
- Create more than 2 "levels" of any semantic color. You need the base (for text/icons) and a subtle variant (for backgrounds). Three levels is usually one too many.
- Use the accent color for destructive actions. Delete buttons are `--color-destructive`, never `--color-accent`.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All colors as CSS custom properties — no hardcoded values in components
- 60-30-10 distribution enforced on every page
- WCAG AA contrast on all text-background combinations
- Semantic color usage: red=destructive, yellow=warning, green=success, blue=info
- Single accent color for all primary actions

## Notes

[Any project-specific context.]
