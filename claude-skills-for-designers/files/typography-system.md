# [Project Name]

[Brief description of what this project does.]

---

## Capability: Typography System

This project uses a structured typography system — type scale, fluid sizing, vertical rhythm, and intentional font loading. Typography is the primary design tool. Get it right and the interface feels polished without touching color or layout.

### Type Scale

A type scale is a set of font sizes derived from a ratio. Pick a ratio, pick a base size, and multiply up or divide down.

**Common ratios:**
| Ratio | Name | Feel |
|-------|------|------|
| 1.125 | Major Second | Tight, subtle — good for dense UI |
| 1.200 | Minor Third | Balanced — good default for most apps |
| 1.250 | Major Third | Clear hierarchy — good for content-heavy sites |
| 1.333 | Perfect Fourth | Strong contrast — good for marketing and editorial |
| 1.500 | Perfect Fifth | Dramatic — good for bold, minimal designs |

**Generating a scale (base: 16px, ratio: 1.25 Major Third):**
```
Step -2:  10.24px   (0.64rem)   — fine print, captions
Step -1:  12.80px   (0.80rem)   — small text, labels
Step  0:  16.00px   (1.00rem)   — body text (base)
Step  1:  20.00px   (1.25rem)   — large body, lead text
Step  2:  25.00px   (1.563rem)  — h4
Step  3:  31.25px   (1.953rem)  — h3
Step  4:  39.06px   (2.441rem)  — h2
Step  5:  48.83px   (3.052rem)  — h1
Step  6:  61.04px   (3.815rem)  — display
```

**As CSS custom properties:**
```css
:root {
  --font-size-xs:      0.64rem;     /* 10.24px */
  --font-size-sm:      0.8rem;      /* 12.8px  */
  --font-size-base:    1rem;        /* 16px    */
  --font-size-lg:      1.25rem;     /* 20px    */
  --font-size-xl:      1.563rem;    /* 25px    */
  --font-size-2xl:     1.953rem;    /* 31.25px */
  --font-size-3xl:     2.441rem;    /* 39.06px */
  --font-size-4xl:     3.052rem;    /* 48.83px */
  --font-size-5xl:     3.815rem;    /* 61.04px */
}
```

**Rules:**
- Pick one ratio and stick with it. Mixing ratios breaks visual consistency.
- The base size (step 0) should be 16px for body text. Going below 16px for body hurts readability.
- You do not need every step. Most projects use 6-8 sizes total.
- Name by purpose when possible: `--font-size-body`, `--font-size-heading`, `--font-size-caption`.

### Fluid Typography

Use `clamp()` so type scales smoothly between viewport sizes. No breakpoints, no jumps.

```css
/* clamp(minimum, preferred, maximum) */
/* preferred uses viewport width (vw) to scale fluidly */

:root {
  --font-size-base:  clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --font-size-lg:    clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --font-size-xl:    clamp(1.5rem, 1.25rem + 1.25vw, 2.25rem);
  --font-size-2xl:   clamp(1.875rem, 1.5rem + 1.875vw, 3rem);
  --font-size-3xl:   clamp(2.25rem, 1.75rem + 2.5vw, 4rem);
  --font-size-4xl:   clamp(2.75rem, 2rem + 3.75vw, 5rem);
}
```

**How to calculate the preferred value:**
```
preferred = minimum + (maximum - minimum) * ((100vw - minViewport) / (maxViewport - minViewport))

For minViewport = 375px and maxViewport = 1440px:
preferred ≈ minimumRem + ((maximumPx - minimumPx) / (1440 - 375)) * 100vw
```

Or use a generator tool — manually calculating every clamp is tedious. The key is: set a minimum (mobile), a maximum (desktop), and let `clamp()` handle everything in between.

**Rules:**
- Body text minimum: 16px (1rem). Never fluid-scale body text below 16px.
- Headings can fluid-scale aggressively. An h1 at 28px on mobile and 60px on desktop is fine.
- Test at 320px and 1920px — the extremes reveal problems.
- Do not use `vw` units alone without `clamp()` — text becomes unreadably small on narrow viewports and absurdly large on wide ones.

### Variable Fonts

Variable fonts contain multiple styles (weight, width, slant) in a single file. One file replaces several static font files.

```css
@font-face {
  font-family: "[FontName]";
  src: url("/fonts/[fontname]-variable.woff2") format("woff2-variations");
  font-weight: 100 900;      /* Available weight range */
  font-stretch: 75% 125%;    /* Available width range (if supported) */
  font-display: swap;
}

/* Use any weight value, not just 400/700 */
body {
  font-family: "[FontName]", [fallback-stack];
  font-weight: 380;          /* Fine-tuned weight */
}

h1 {
  font-weight: 720;          /* Between Bold and Extra Bold */
}

.caption {
  font-weight: 340;          /* Between Light and Regular */
}
```

**Font variation settings for advanced axes:**
```css
/* Named axes (registered) */
.text {
  font-weight: 450;              /* wght axis */
  font-stretch: 90%;             /* wdth axis */
  font-style: oblique 12deg;     /* slnt axis */
  font-optical-sizing: auto;     /* opsz axis — auto-adjusts for size */
}

/* Custom axes (use font-variation-settings) */
.display-text {
  font-variation-settings:
    "wght" 700,
    "wdth" 110,
    "GRAD" 50,                   /* Grade — adjusts weight without changing width */
    "CASL" 1;                    /* Casual — if the font supports it */
}
```

**Optical sizing:**
```css
/* Optical sizing adjusts letter shapes for different sizes */
/* Small text gets more open shapes, large text gets tighter details */
body {
  font-optical-sizing: auto;    /* Browser adjusts based on font-size */
}
```

**Benefits:**
- One file instead of 4-8 static files — fewer requests, often smaller total size.
- Any weight value, not just predefined steps — finer design control.
- Smooth transitions between weights (can animate `font-weight`).
- Optical sizing improves readability at small and large sizes.

### Vertical Rhythm

Vertical rhythm means all spacing is based on a consistent unit derived from the line height. This creates a visual baseline grid.

```css
:root {
  --line-height-base: 1.5;         /* 16px * 1.5 = 24px rhythm unit */
  --rhythm: 1.5rem;                /* 24px — the base spacing unit */
}

/* All vertical spacing is a multiple of --rhythm */
body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

h1 {
  font-size: var(--font-size-4xl);
  line-height: 1.1;
  margin-top: calc(var(--rhythm) * 2);     /* 48px */
  margin-bottom: var(--rhythm);             /* 24px */
}

h2 {
  font-size: var(--font-size-3xl);
  line-height: 1.2;
  margin-top: calc(var(--rhythm) * 1.5);   /* 36px */
  margin-bottom: calc(var(--rhythm) * 0.5); /* 12px */
}

p {
  margin-bottom: var(--rhythm);             /* 24px */
}

p + p {
  margin-top: 0;                            /* Collapse consecutive paragraph margins */
}
```

**Line height guidelines:**
```
Body text (14-18px):    1.5 – 1.6
Large body (18-24px):   1.4 – 1.5
Headings (24-48px):     1.1 – 1.3
Display text (48px+):   1.0 – 1.15
Captions/labels:        1.4
UI text (buttons, nav): 1 – 1.2  (single line, vertically centered with padding)
```

**Rules:**
- Line height decreases as font size increases. Large text needs tighter leading.
- Never use unitless line height below 1.0 — text overlaps.
- Use unitless line height values (not px or rem) so it scales with font size.
- Paragraph max-width: 60-75 characters per line. Use `max-width: 65ch` for readable body text.

### Font Loading Strategy

**`font-display` values:**
```css
@font-face {
  font-family: "[FontName]";
  src: url("/fonts/[fontname].woff2") format("woff2");
  font-display: swap;    /* Show fallback immediately, swap when loaded */
}
```

| Value | Behavior | Use when |
|-------|----------|----------|
| `swap` | Show fallback, swap when ready | Body text — content must be readable immediately |
| `optional` | Show fallback, only swap if loaded very fast | Body text on slow connections — avoids late swap |
| `fallback` | Brief invisible period, then fallback, then swap | Headings — short flash is acceptable |
| `block` | Invisible text until font loads (up to 3s) | Icon fonts only — never for text |

**Preloading critical fonts:**
```html
<head>
  <!-- Preload the most important font file (usually body text regular) -->
  <link
    rel="preload"
    href="/fonts/[fontname]-regular.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
</head>
```

**Self-hosting vs CDN:**
- **Self-host** for production. You control caching, avoid third-party requests, comply with GDPR (Google Fonts sends user IPs to Google).
- Download from Google Fonts, convert to WOFF2, serve from your own domain.
- Set long cache headers: `Cache-Control: public, max-age=31536000, immutable`.

**FOUT (Flash of Unstyled Text) mitigation:**
```css
/* Size-adjust the fallback to match the web font metrics */
@font-face {
  font-family: "[FontName] Fallback";
  src: local("Arial");
  size-adjust: 105%;           /* Adjust to match web font width */
  ascent-override: 90%;
  descent-override: 20%;
  line-gap-override: 0%;
}

body {
  font-family: "[FontName]", "[FontName] Fallback", sans-serif;
}
```

This reduces layout shift when the web font swaps in. The `size-adjust` and override values depend on the specific fonts — use a tool like `fontpie` or Fontaine to calculate them.

### Font Pairing

**Principles:**
- **Contrast, not conflict.** Pair a serif with a sans-serif, or a geometric sans with a humanist sans. Do not pair two fonts that look almost the same.
- **One display, one workhorse.** Use the expressive font for headings, the neutral font for body.
- **Two fonts maximum.** Three is a crowd. One font with weight variation often suffices.

**Common pairings:**
```
Headings: [Display/Serif]     Body: [Sans-Serif]
─────────────────────────     ─────────────────────
Playfair Display              Source Sans 3
Fraunces                      Inter
Lora                          Work Sans
DM Serif Display              DM Sans
Libre Baskerville             Libre Franklin
```

**Single-font systems:**
```
Inter           — weight range covers body and headings
DM Sans         — friendly geometric, works at all sizes
Plus Jakarta Sans — modern, clean
Outfit          — geometric variable font with wide weight range
```

Use weight contrast instead of a second font: body at 400, headings at 700.

### Responsive Typography Across Breakpoints

When not using fluid typography, define size adjustments at breakpoints:

```css
:root {
  --font-size-base: 1rem;
  --font-size-h1: 2rem;
}

@media (min-width: 768px) {
  :root {
    --font-size-h1: 2.5rem;
  }
}

@media (min-width: 1280px) {
  :root {
    --font-size-h1: 3.25rem;
  }
}
```

Fluid `clamp()` is preferred over breakpoint-based scaling. But if the project already uses breakpoint-based design, keep typography consistent with that approach.

### Tailwind Typography Plugin

`@tailwindcss/typography` provides beautiful defaults for rendered markdown and prose content.

```bash
npm install @tailwindcss/typography
```

```tsx
<article className="prose lg:prose-xl dark:prose-invert max-w-none">
  {/* Rendered markdown or CMS content */}
  <h1>Article Title</h1>
  <p>This paragraph gets beautiful default typography.</p>
</article>
```

**Customizing prose styles:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray.700"),
            "--tw-prose-headings": theme("colors.gray.900"),
            "--tw-prose-links": theme("colors.blue.600"),
            maxWidth: "65ch",
            fontSize: "1.075rem",
            lineHeight: "1.7",
            h1: { fontWeight: "800" },
            a: { textDecoration: "underline", textUnderlineOffset: "3px" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
      }),
    },
  },
};
```

### System Font Stacks

When you do not need a custom font — system fonts are fast, free, and native-feeling.

```css
/* Modern system font stack */
body {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen-Sans,
    Ubuntu,
    Cantarell,
    "Helvetica Neue",
    sans-serif;
}

/* Monospace system stack */
code, pre {
  font-family:
    ui-monospace,
    SFMono-Regular,
    "SF Mono",
    Menlo,
    Consolas,
    "Liberation Mono",
    monospace;
}

/* Serif system stack */
.prose-serif {
  font-family:
    "Iowan Old Style",
    "Palatino Linotype",
    Palatino,
    Georgia,
    serif;
}
```

### OpenType Features

Enable advanced typographic features when the font supports them.

```css
/* Ligatures — connect letter pairs (fi, fl, ff) */
body {
  font-variant-ligatures: common-ligatures;
}

/* Tabular numbers — fixed-width digits for aligned columns */
.data-table td {
  font-variant-numeric: tabular-nums;
}

/* Oldstyle numbers — digits with ascenders and descenders, for running text */
.prose {
  font-variant-numeric: oldstyle-nums;
}

/* Small caps — for abbreviations and acronyms */
.acronym {
  font-variant-caps: all-small-caps;
  letter-spacing: 0.05em;
}

/* Fractions */
.fraction {
  font-variant-numeric: diagonal-fractions;
}

/* Ordinals (1st, 2nd, 3rd) */
.ordinal {
  font-variant-numeric: ordinal;
}

/* Combine multiple features */
.data-cell {
  font-variant-numeric: tabular-nums lining-nums;
  font-feature-settings: "kern" 1, "liga" 1;
}
```

**When to use:**
- **Tabular nums** in any data table, price list, or dashboard stat. Non-tabular digits cause columns to misalign.
- **Common ligatures** should be on by default (most browsers enable them).
- **Small caps** for abbreviations in body text (HTML, CSS, API) — looks polished.
- **Oldstyle nums** in long-form prose for a classical feel. Avoid in UI — they look misaligned in buttons and labels.

### Implementing in CSS Custom Properties

A complete typography system as custom properties:

```css
:root {
  /* Font families */
  --font-sans: "[Sans Font]", system-ui, sans-serif;
  --font-serif: "[Serif Font]", Georgia, serif;
  --font-mono: "[Mono Font]", ui-monospace, monospace;

  /* Type scale (fluid) */
  --font-size-xs:   clamp(0.625rem, 0.6rem + 0.125vw, 0.75rem);
  --font-size-sm:   clamp(0.8rem, 0.775rem + 0.125vw, 0.875rem);
  --font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --font-size-lg:   clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --font-size-xl:   clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --font-size-2xl:  clamp(1.875rem, 1.5rem + 1.875vw, 3rem);
  --font-size-3xl:  clamp(2.25rem, 1.75rem + 2.5vw, 4rem);

  /* Font weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line heights */
  --line-height-tight: 1.15;
  --line-height-snug: 1.3;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.65;

  /* Letter spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;

  /* Measure (max line width) */
  --measure-narrow: 45ch;
  --measure-normal: 65ch;
  --measure-wide: 80ch;
}

/* Apply the system */
body {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  letter-spacing: var(--tracking-normal);
}

h1 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--tracking-tight);
}

h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-snug);
  letter-spacing: var(--tracking-tight);
}

.body-text {
  max-width: var(--measure-normal);
}
```

### Anti-Patterns — Do NOT

- Use more than 2 font families — one is often enough with weight variation
- Set body text below 16px — it is too small for comfortable reading on screens
- Use `px` for font sizes — use `rem` so text scales with user preferences
- Skip `font-display` on `@font-face` — users stare at invisible text while fonts load
- Load font weights you do not use — each unused weight is wasted bandwidth
- Use Google Fonts CDN in production without considering GDPR — self-host instead
- Set line-height in `px` — use unitless values so it scales with font size
- Ignore line length — text wider than 75 characters per line is hard to read; use `max-width: 65ch`
- Apply letter-spacing to body text — it rarely improves readability and usually hurts it
- Use `font-weight: bold` on variable fonts when you could use a precise value like 650
- Pair two fonts that look too similar — if you cannot tell them apart, use one
- Apply tabular-nums globally — only use it where digits need to align (tables, stats)
- Animate font-size — it triggers layout reflow; animate `transform: scale()` instead
- Forget to test with long strings in other languages — German and Finnish words are longer than English
- Use `vw` for font sizes without `clamp()` — text becomes microscopic on small screens

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All font sizes use the type scale custom properties — no ad-hoc sizes
- Body text is fluid between [min]px and [max]px using clamp()
- [Font family] for headings, [font family] for body (or single font with weight variation)
- Vertical rhythm based on [X]px base unit
- Self-hosted WOFF2 fonts with preload on the primary weight

## Notes

[Any project-specific context — brand fonts, type scale ratio chosen, special OpenType features in use.]
