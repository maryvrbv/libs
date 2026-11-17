# [Project Name]

[Brief description of what this project does.]

---

## Capability: Spacing System

This project uses an 8px grid spacing system. Every margin, padding, gap, and offset must come from a defined scale. Consistent spacing is what separates "designed" from "thrown together." If the spacing is off, the entire UI feels wrong — even if people can't articulate why. This system removes guessing and enforces visual rhythm.

### Spacing Scale

```css
:root {
  --space-1:   0.25rem;  /*  4px — icon gaps, tight inline spacing */
  --space-2:   0.5rem;   /*  8px — inline padding, related element gaps */
  --space-3:   0.75rem;  /* 12px — compact component padding */
  --space-4:   1rem;     /* 16px — default padding, list item gaps */
  --space-6:   1.5rem;   /* 24px — card padding, comfortable gaps */
  --space-8:   2rem;     /* 32px — content block separation */
  --space-12:  3rem;     /* 48px — section group spacing */
  --space-16:  4rem;     /* 64px — page section separation */
  --space-20:  5rem;     /* 80px — major section breaks */
  --space-24:  6rem;     /* 96px — hero/top-level section spacing */
}
```

### Usage Map

Every value in the scale has a purpose. Use this table when deciding which value to reach for.

```
--space-1  (4px)   Icon-to-label gap. Inline badge padding. Tight element pairs.
--space-2  (8px)   Button inline padding. Tag padding. Gap between icon and text.
                   Minimum space between any two related elements.
--space-3  (12px)  Compact input padding. Small card internal padding.
                   Tight list item vertical spacing.
--space-4  (16px)  Default component padding. Form field gaps. List item spacing.
                   Minimum container padding on mobile.
--space-6  (24px)  Card padding. Comfortable form spacing. Grouped element gaps.
                   Default container padding on tablet.
--space-8  (32px)  Space between content blocks. Between a heading group and
                   its content. Default container padding on desktop.
--space-12 (48px)  Space between groups of cards or content sections within
                   a larger page section.
--space-16 (64px)  Space between distinct page sections (features, testimonials,
                   pricing). Minimum section spacing.
--space-20 (80px)  Space between major page sections. Hero bottom margin.
--space-24 (96px)  Top-level page section separation. Above-the-fold breathing room.
```

### The Relationship Rule

**Space between > Space within.** Always.

The space between two cards must be larger than the padding inside each card. The space between two sections must be larger than the space between elements within a section. This is how you create visual grouping without borders or backgrounds.

```
Example — Card grid:
  Card internal padding:     --space-6  (24px)
  Gap between cards:         --space-8  (32px)  ← larger than internal padding

Example — Page section:
  Elements within section:   --space-4  (16px)
  Groups within section:     --space-8  (32px)
  Between sections:          --space-16 (64px)  ← largest
```

If internal spacing equals or exceeds external spacing, elements visually merge and grouping breaks down.

### Section Spacing Rules

Use these ranges based on what you're spacing:

```
Page sections (hero, features, CTA):    --space-16 to --space-24  (64-96px)
Card groups, content blocks:             --space-8  to --space-12  (32-48px)
Elements within a group:                 --space-4  to --space-6   (16-24px)
Related items (label + input, icon + text): --space-2 to --space-3 (8-12px)
Tight pairs (icon + badge):              --space-1                 (4px)
```

### Container Padding Rules

Container padding scales with viewport width. Tighter on mobile, more breathing room on desktop.

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--space-4);  /* 16px mobile */
}

@media (min-width: 768px) {
  .container {
    padding-inline: var(--space-6);  /* 24px tablet */
  }
}

@media (min-width: 1024px) {
  .container {
    padding-inline: var(--space-8);  /* 32px desktop */
  }
}
```

### Max-Width Constraints

Not everything should stretch to fill the container. Constrain content for readability.

```css
/* Body text blocks */
.prose { max-width: 65ch; }

/* Form containers */
.form { max-width: 480px; }

/* Card grids */
.card-grid { max-width: 1200px; }

/* Hero content */
.hero-content { max-width: 720px; }

/* Full-bleed sections still constrain inner content */
.section--full {
  width: 100%;
  padding-inline: var(--space-4);
}
.section--full .section-inner {
  max-width: 1200px;
  margin-inline: auto;
}
```

### Margin Collapse Awareness

Vertical margins collapse in CSS. Two elements with `margin-bottom: 32px` and `margin-top: 32px` will have 32px between them, not 64px. This is usually fine — but know it's happening.

When margin collapse causes unexpected spacing:
- Use `padding` instead of `margin` on containers
- Use `gap` in flex/grid layouts (gap does not collapse)
- Use `display: flex; flex-direction: column; gap: var(--space-X)` for vertical stacks

Prefer `gap` over margins for spacing children in a container. It's more predictable.

```css
/* Instead of margins on children: */
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Instead of margin-bottom on list items: */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-8);
}
```

### Heading Spacing

Headings get more space above than below. This groups the heading with the content it introduces.

```css
.section-heading {
  margin-top: var(--space-16);
  margin-bottom: var(--space-6);
}

.subsection-heading {
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);
}
```

### [Project-Specific Spacing]

[Define any overrides to the default spacing scale. Note the project's primary container max-width. Specify if the project uses a different base grid (e.g., 4px instead of 8px). Note any components with custom spacing requirements.]

### Anti-Patterns — Do NOT

- Use arbitrary spacing values like `13px`, `17px`, `23px`, or `15px`. Everything comes from the scale. If the right value isn't in the scale, you're solving the wrong problem.
- Use different padding values within the same component type. If one card has `24px` padding, all cards have `24px` padding. No exceptions.
- Mix spacing systems. Don't use the spacing scale for some things and Tailwind's default scale for others. One system, everywhere.
- Use `margin` to create space inside a container. Margin is for space between elements. Padding is for space inside elements.
- Add spacing to only one side of a layout. If a section has `64px` of space above it, it needs proportional space below it too.
- Set `padding: 0` on containers and rely on child margins. Containers own their internal padding.
- Eyeball spacing. If you're adjusting by 1-2px to "make it look right," your scale or alignment is wrong. Fix the root cause.
- Use `margin-top` on the first child or `margin-bottom` on the last child of a container. The container's padding handles edge spacing.
- Forget bottom-of-page spacing. The last section needs space before the footer. Add `padding-bottom` to the main content area.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All spacing from the 8px grid scale — no arbitrary values
- Gap preferred over margins for child spacing
- Container padding scales with viewport
- Space between > space within, always
- Max-width constraints on all text and content blocks

## Notes

[Any project-specific context.]
