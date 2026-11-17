# [Project Name]

[Brief description of what this project does.]

---

## Capability: Landing Page Polish

This project has a landing page. Every section must be polished, conversion-focused, and visually tight. Landing pages sell — they need to look like it. Apply these rules to every landing page section generated or modified.

### Hero Section

```
Container: max-w-4xl, centered (mx-auto, text-center)
Heading:   48-64px, font-bold, letter-spacing: -0.02em, line-height: 1.05
           Responsive: font-size: clamp(2.25rem, 5vw, 4rem)
Subheading: 18-20px, text-muted-foreground, max-w-2xl mx-auto, line-height: 1.6
CTA group: primary button (lg) + secondary button (outline), flex gap-4 justify-center
Spacing:   24px heading-to-subheading, 32px subheading-to-CTAs, py-20 to py-32
```

Responsive: subheading drops to 16px on mobile. CTA buttons stack `flex-col w-full` below 640px.

### Social Proof

```
Logo strip:     flex items-center justify-center gap-12
Logo treatment: grayscale, opacity-60, consistent height 24-32px
                hover: opacity-100 grayscale-0, transition 200ms
Label:          text-sm text-muted-foreground uppercase tracking-wider above logos
Testimonials:   3-col grid at lg, 1-col mobile. Avatar (40px) + name + role + quote.
                Max 3 visible. Quote: italic, line-height 1.6.
```

### Features Section

```
Grid:       3-column at lg (grid-cols-3), 1-column mobile, gap-8
Card:       p-6, icon (48px, primary-subtle bg, rounded-lg, mb-4) + heading (text-lg font-semibold) + description (text-muted-foreground, line-height 1.6)
Heading:    text-3xl font-bold text-center, max-w-2xl mx-auto
Subheading: text-lg text-muted-foreground text-center, max-w-xl mx-auto
```

All cards must be the same height. Use `grid` (not flexbox) so rows align. Never truncate feature descriptions.

### Pricing Section

```
Layout:     2-3 tiers, grid at lg, stacked mobile. Equal height via CSS Grid.
Recommended: border-2 border-primary, shadow-lg
             "Most Popular" badge: absolute top-0 -translate-y-1/2, bg-primary text-primary-foreground, text-sm px-3 py-1 rounded-full
Card:       tier name (text-lg font-semibold), price (text-4xl font-bold + "/mo" muted), description (text-sm muted, mb-6), feature list (space-y-3, check icon + text), CTA button (full-width, mt-8)
```

Price must be the most prominent element. Recommended tier CTA uses primary variant, others outline. Never more than 3 tiers.

### FAQ Section

```
Container: max-w-3xl mx-auto
Pattern:   accordion, one open at a time
Item:      border-bottom, py-4
Trigger:   flex between, font-medium, full-width button, chevron right (rotate-180 on open, 200ms)
Content:   text-muted-foreground, pt-2, line-height 1.6, animate max-height 300ms ease
```

### Footer

```
Container:  max-w-6xl mx-auto, border-t, pt-12 pb-8
Grid:       4-column lg, 2-column md, 1-column mobile
Text:       text-sm, text-muted-foreground, hover: text-foreground 150ms
Bottom row: flex between, copyright + social icons
```

### Section Spacing

```
Between sections:       64-96px (py-16 to py-24) — consistent across all sections
Within sections:        32-48px heading area to content
Heading to subheading:  16px
Subheading to content:  32px
```

Alternate `bg-background` and `bg-muted/50` to visually separate sections.

### Anti-Patterns — Do NOT

- Use hero heading smaller than 36px. It must dominate the viewport.
- Push the CTA below the fold on desktop.
- Let pricing cards render at different heights. CSS Grid, not flexbox.
- Show FAQ items without border separators.
- Use more than 3 pricing tiers.
- Skip social proof. Even "Used by 500+ designers" helps.
- Use inconsistent section padding across the page.
- Forget to test the hero at 375px width.
- Leave logo images at different visual weights — normalize with grayscale + opacity.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Hero heading uses clamp() for responsive sizing
- Consistent vertical padding across all sections
- Pricing cards equal height via CSS Grid
- FAQ accordion with animated chevron
- Footer 4-column grid collapsing to 1 on mobile

## Notes

[Any project-specific context.]
