# [Project Name]

[Brief description of what this project does.]

---

## Capability: Typography Polish

This project uses a strict typography system. Every text element — headings, body, labels, captions — pulls from a defined type scale with matching line heights, letter spacing, and font weights. Typography is the single biggest lever for making a UI feel polished. Get this right and the project looks professional. Get it wrong and nothing else matters.

### Type Scale (1.25 Ratio)

Every font size in this project comes from this scale. No exceptions.

```css
:root {
  --text-xs:    0.64rem;   /* 10.24px — fine print, badges */
  --text-sm:    0.8rem;    /* 12.8px  — captions, metadata */
  --text-base:  1rem;      /* 16px    — body text */
  --text-md:    1.25rem;   /* 20px    — large body, card titles */
  --text-lg:    1.563rem;  /* 25px    — section headings */
  --text-xl:    1.953rem;  /* 31.25px — page headings */
  --text-2xl:   2.441rem;  /* 39px    — hero subheadings */
  --text-3xl:   3.052rem;  /* 48.8px  — display, hero titles */
}
```

### Line Height Rules

Line height changes with text size. Larger text needs tighter leading.

```css
/* Display / hero text (text-3xl) */
line-height: 1.1;

/* Page headings (text-xl, text-2xl) */
line-height: 1.2;

/* Section headings (text-lg) */
line-height: 1.25;

/* Card titles, large body (text-md) */
line-height: 1.3;

/* Body text (text-base) */
line-height: 1.6;

/* Small text, captions (text-sm, text-xs) */
line-height: 1.4;

/* Buttons, labels, single-line UI elements */
line-height: 1;
```

### Letter Spacing

Tighten large text. Loosen small text. Leave body alone.

```css
/* Display headings (text-2xl and above) */
letter-spacing: -0.025em;

/* Page and section headings (text-lg, text-xl) */
letter-spacing: -0.015em;

/* Body text (text-base, text-md) */
letter-spacing: 0;

/* Small text, captions (text-sm, text-xs) */
letter-spacing: 0.01em;

/* All-caps labels, overlines */
letter-spacing: 0.06em;
text-transform: uppercase;
```

### Font Weight Hierarchy

Four weights maximum. Each has a specific role.

```
400 (Regular)  — Body text, descriptions, paragraphs
500 (Medium)   — Subheadings, labels, emphasis within body text
600 (Semibold) — Section headings, card titles, nav items
700 (Bold)     — Display text, hero titles, page headings
```

Never use `font-weight: bold` — always use the numeric value. Never use 300 (light) — it's unreadable on most screens.

### Text Color Hierarchy

```css
:root {
  --text-primary:   rgba(0, 0, 0, 0.87);   /* Headings, body text */
  --text-secondary: rgba(0, 0, 0, 0.60);   /* Descriptions, supporting text */
  --text-muted:     rgba(0, 0, 0, 0.38);   /* Placeholders, timestamps, meta */
  --text-disabled:  rgba(0, 0, 0, 0.20);   /* Disabled labels, inactive UI */
}
```

Headings and body text use `--text-primary`. Supporting information uses `--text-secondary`. Placeholders and non-essential metadata use `--text-muted`. Disabled elements use `--text-disabled`. This creates a clear visual hierarchy without needing extra font sizes.

### Line Width

Body text must never run wider than `65ch`. Long lines are hard to read. Set this on every paragraph and text block:

```css
p, li, blockquote, .body-text {
  max-width: 65ch;
}
```

Headings can run wider — up to `30ch` for display text and `45ch` for section headings. But body text is always `65ch`.

### Heading Margin Rules

Headings group with the content below them, not the content above. Always use more space above a heading than below it.

```css
h1, h2, h3, h4, h5, h6 {
  margin-top: 2em;
  margin-bottom: 0.5em;
}

/* First heading in a container gets no top margin */
h1:first-child, h2:first-child, h3:first-child {
  margin-top: 0;
}
```

The 4:1 ratio (2em above, 0.5em below) creates natural visual grouping. The heading belongs to what follows, not what precedes.

### Responsive Type Scaling

Use `clamp()` to fluidly scale headings between mobile and desktop. Body text stays at `1rem` — it does not scale.

```css
:root {
  --text-lg:  clamp(1.25rem, 1.1rem + 0.75vw, 1.563rem);
  --text-xl:  clamp(1.563rem, 1.3rem + 1.3vw, 1.953rem);
  --text-2xl: clamp(1.953rem, 1.5rem + 2.25vw, 2.441rem);
  --text-3xl: clamp(2.25rem, 1.75rem + 3vw, 3.052rem);
}
```

Body text (`--text-base`) is always `1rem` (16px). Never make body text responsive — it creates inconsistency and makes spacing unpredictable.

### CSS Custom Properties Template

```css
:root {
  /* Type Scale */
  --text-xs:    0.64rem;
  --text-sm:    0.8rem;
  --text-base:  1rem;
  --text-md:    1.25rem;
  --text-lg:    clamp(1.25rem, 1.1rem + 0.75vw, 1.563rem);
  --text-xl:    clamp(1.563rem, 1.3rem + 1.3vw, 1.953rem);
  --text-2xl:   clamp(1.953rem, 1.5rem + 2.25vw, 2.441rem);
  --text-3xl:   clamp(2.25rem, 1.75rem + 3vw, 3.052rem);

  /* Text Colors */
  --text-primary:   rgba(0, 0, 0, 0.87);
  --text-secondary: rgba(0, 0, 0, 0.60);
  --text-muted:     rgba(0, 0, 0, 0.38);
  --text-disabled:  rgba(0, 0, 0, 0.20);
}
```

### [Project-Specific Typography]

[Define the font family/families used in this project. Specify any overrides to the default scale — for instance, if the brand uses text-md for body instead of text-base. Note any display fonts used only for hero text.]

### Anti-Patterns — Do NOT

- Mix `px` and `rem` for font sizes. Use `rem` for all text sizing. The only acceptable `px` value is the base font-size on `html`.
- Use more than 3 font weights on a single page. If you need a fourth weight, you have a hierarchy problem, not a weight problem.
- Set headings to the same color as body text. Headings use `--text-primary`, but secondary descriptions should use `--text-secondary` to create contrast between levels.
- Use `line-height` values with units (e.g., `line-height: 24px`). Always use unitless values like `1.5`.
- Set `font-size` in `px` on any element other than the root `html`. Everything else is `rem`.
- Skip `clamp()` on headings and use media query breakpoints instead. Fluid scaling is smoother and requires less code.
- Use `letter-spacing` values above `0.1em` — it looks like a ransom note.
- Set body text below `1rem` (16px). If text is hard to read on your phone, it's too small.
- Use `text-transform: uppercase` on anything longer than 3 words. All caps is for labels, not sentences.
- Rely on color alone to distinguish text hierarchy. Combine size, weight, and color for clear levels.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All font sizes from the type scale — no arbitrary values
- All text colors from the semantic hierarchy
- Body text capped at 65ch line width
- Headings use more margin above than below
- Responsive scaling via clamp() on headings only

## Notes

[Any project-specific context.]
