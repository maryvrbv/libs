# [Project Name]

[Brief description of what this project does.]

---

## Capability: Dark Mode Polish

This project implements dark mode properly — not by inverting colors, but through intentional color design for dark surfaces. Dark mode is a separate visual system that respects the same hierarchy and contrast principles as light mode, with specific adjustments for dark backgrounds.

### Core Principle

Dark mode is not `filter: invert(1)`. It requires its own color palette designed for dark surfaces. Every color, shadow, and elevation decision changes in dark mode.

### Color Architecture

All colors must use CSS custom properties. No hardcoded values in components.

```css
:root {
  /* Light mode */
  --color-bg:             #ffffff;
  --color-bg-secondary:   #f8f9fa;
  --color-bg-tertiary:    #f1f3f5;
  --color-surface:        #ffffff;
  --color-surface-raised: #ffffff;
  --color-text:           #111827;
  --color-text-secondary: #6b7280;
  --color-text-tertiary:  #9ca3af;
  --color-border:         #e5e7eb;
  --color-border-subtle:  #f3f4f6;
  --color-primary:        #2563eb;
  --color-primary-hover:  #1d4ed8;
  --color-shadow:         rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  /* Dark mode — intentionally designed, not inverted */
  --color-bg:             #0f1117;
  --color-bg-secondary:   #1a1d27;
  --color-bg-tertiary:    #242836;
  --color-surface:        #1a1d27;
  --color-surface-raised: #242836;
  --color-text:           #e4e6eb;
  --color-text-secondary: #a1a7b5;
  --color-text-tertiary:  #6b7280;
  --color-border:         #2e3345;
  --color-border-subtle:  #242836;
  --color-primary:        #3b82f6;
  --color-primary-hover:  #60a5fa;
  --color-shadow:         rgba(0, 0, 0, 0.4);
}
```

### Background Layers

In dark mode, elevation is communicated by surface lightness — lighter surfaces sit higher. This is the opposite of light mode, where shadows indicate elevation.

```
Layer 0 (Base):     #0f1117  — Page background, deepest layer
Layer 1 (Surface):  #1a1d27  — Cards, sidebars, containers
Layer 2 (Raised):   #242836  — Dropdowns, popovers, floating panels
Layer 3 (Highest):  #2e3345  — Tooltips, active states, selected items
```

**Rules:**
- Never use pure black (#000000) for backgrounds. It creates too much contrast with text and feels like a void. Use dark gray: #0f1117 to #1a1d27.
- Each elevation layer should be visibly distinct from the one below it but not dramatically different. Step in small increments.
- Active/selected states on dark surfaces use the next elevation layer up.

### Text on Dark Backgrounds

**Do not use pure white (#ffffff) for text.** It creates excessive contrast that causes eye strain in dark environments. Reduce white levels.

```
Primary text:    #e4e6eb  (~90% white — comfortable to read)
Secondary text:  #a1a7b5  (~65% white — descriptions, metadata)
Tertiary text:   #6b7280  (~40% white — hints, placeholders)
Disabled text:   #4b5563  (~30% white — clearly inactive)
```

**Contrast check:** Even with reduced white levels, primary text on the darkest background must pass WCAG AA (4.5:1). #e4e6eb on #0f1117 provides approximately 14:1 — well above the minimum.

### Accent and Semantic Colors

Colors behave differently on dark backgrounds. Vivid colors that work on white can vibrate and look harsh against dark surfaces.

**Adjustments for dark mode:**
- Reduce saturation slightly on accent colors. Vivid blue (#2563eb) becomes slightly lighter and softer (#3b82f6).
- Increase lightness of semantic colors so they pass contrast checks against dark backgrounds.
- Error, success, and warning colors all need lighter variants in dark mode.

```css
/* Light mode semantic colors */
:root {
  --color-success:        #059669;
  --color-success-subtle: #ecfdf5;
  --color-warning:        #d97706;
  --color-warning-subtle: #fffbeb;
  --color-error:          #dc2626;
  --color-error-subtle:   #fef2f2;
}

/* Dark mode — lighter and less saturated */
[data-theme="dark"] {
  --color-success:        #34d399;
  --color-success-subtle: rgba(52, 211, 153, 0.1);
  --color-warning:        #fbbf24;
  --color-warning-subtle: rgba(251, 191, 36, 0.1);
  --color-error:          #f87171;
  --color-error-subtle:   rgba(248, 113, 113, 0.1);
}
```

### Shadows and Elevation

Shadows are nearly invisible against dark backgrounds. Adjust your elevation strategy.

**Light mode:** shadows communicate depth.
**Dark mode:** surface lightness communicates depth. Borders provide edge definition.

```css
/* Light mode cards use shadows */
.card {
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

/* Dark mode cards use borders instead */
[data-theme="dark"] .card {
  border: 1px solid var(--color-border);
  box-shadow: none;
}

/* Or use very subtle shadows with higher opacity */
[data-theme="dark"] {
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
}
```

**Subtle glow effect for elevated dark elements (use sparingly):**
```css
[data-theme="dark"] .popover {
  border: 1px solid var(--color-border);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}
```

### Images and Media

Bright images can be blinding in dark mode. Adjust media brightness.

```css
/* Slightly dim images in dark mode */
[data-theme="dark"] img:not([data-no-dim]) {
  filter: brightness(0.85) contrast(1.05);
}

/* Invert logos designed for light backgrounds */
[data-theme="dark"] .logo-invert {
  filter: invert(1) hue-rotate(180deg);
}
```

**Best practices:**
- Use transparent PNGs for logos and icons — they adapt to any background.
- Provide separate light/dark versions of hero images or illustrations when possible.
- SVG icons should use `currentColor` so they inherit the text color automatically.
- Charts and data visualizations need separate dark mode color palettes. Don't just invert them.

```tsx
// Provide themed image sources
function ThemedImage({ lightSrc, darkSrc, alt }: Props) {
  const { theme } = useTheme();
  return <img src={theme === "dark" ? darkSrc : lightSrc} alt={alt} />;
}
```

### Borders and Dividers

Borders are more important in dark mode because shadows don't work as visual separators.

```css
[data-theme="dark"] {
  --color-border:        #2e3345;  /* Standard borders */
  --color-border-subtle: #242836;  /* Subtle dividers */
}
```

**Rules:**
- Card borders should be visible but not prominent. 1px solid with a color that's one or two steps lighter than the card surface.
- Dividers (horizontal rules, section separators) should use the subtle border color.
- Input borders need enough contrast to be visible against the surface they sit on.
- Focus rings must be visible in dark mode — test them.

### Form Elements in Dark Mode

Inputs, selects, and textareas need specific dark mode treatment.

```css
[data-theme="dark"] input,
[data-theme="dark"] select,
[data-theme="dark"] textarea {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border);
  color: var(--color-text);
}

[data-theme="dark"] input::placeholder {
  color: var(--color-text-tertiary);
}

[data-theme="dark"] input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
```

### Testing Checklist

Before dark mode is complete, verify every item:

- [ ] No pure black (#000) backgrounds anywhere
- [ ] No pure white (#fff) text — using off-white (#e4e6eb or similar)
- [ ] All text passes WCAG AA contrast against its dark background
- [ ] Borders are visible — nothing disappearing into the background
- [ ] Form inputs have visible borders and focus states
- [ ] Shadows are adjusted or replaced with borders
- [ ] Images are slightly dimmed, not blinding white rectangles
- [ ] Logos work on dark backgrounds (inverted, transparent, or separate asset)
- [ ] Focus indicators are visible in dark mode
- [ ] Semantic colors (success, warning, error) are adjusted for dark backgrounds
- [ ] No components forgotten — check every page, modal, dropdown, and tooltip
- [ ] Scrollbars styled or not jarring in dark mode
- [ ] Code blocks and syntax highlighting have appropriate dark variants
- [ ] Third-party embeds checked (they may not respect your dark mode)
- [ ] System preference detection works on first visit
- [ ] Theme toggle works and persists across page refreshes
- [ ] No flash of wrong theme on page load

### Anti-Patterns — Do NOT

- Use `filter: invert(1)` on the page or body — dark mode needs intentional color design
- Use pure black (#000000) for backgrounds — it's too harsh. Use #0f1117 to #1a1d27
- Use pure white (#ffffff) for text — it causes eye strain. Use #e4e6eb or similar
- Keep the same shadow values from light mode — they're invisible on dark backgrounds
- Forget to adjust semantic colors — light-mode green, red, and yellow don't work on dark surfaces
- Use opacity to create dark mode text colors — define explicit colors for each level
- Hardcode any color in component styles — everything through CSS custom properties
- Skip testing images — bright images in dark mode are jarring
- Forget about third-party widgets, embeds, and iframes — they may not match your dark mode
- Leave form inputs with white backgrounds in dark mode
- Assume dark mode is just "change the background color" — every UI element needs review

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All colors through CSS custom properties
- Dark backgrounds: dark gray, not pure black
- Text: off-white, not pure white
- Elevation: lighter surfaces = higher layer
- Borders replace shadows for edge definition

## Notes

[Any project-specific context.]
