# [Project Name]

[Brief description of what this project does.]

---

## Capability: Accessibility Polish

Accessibility is not a feature you add later. It is a quality standard that applies to every element you build. This skill covers the visual and interaction accessibility patterns that designers shipping with Claude Code need to get right. Not the full WCAG spec — the practical patterns that catch 90% of accessibility issues.

### Color Contrast

WCAG AA is the minimum. Every text and UI element must pass.

```
Normal text (under 18px / 24px bold):  4.5:1 contrast ratio
Large text (18px+ / 14px+ bold):       3:1 contrast ratio
UI components (borders, icons):        3:1 contrast ratio
```

**How to check:** Chrome DevTools > Inspect element > color picker shows contrast ratio. Or use the Accessibility tab in DevTools.

**Common failures and fixes:**
```css
/* FAIL: light gray text on white — 2.5:1 */
.caption { color: #aaaaaa; }

/* PASS: darker gray — 4.6:1 */
.caption { color: #767676; }

/* FAIL: colored text on colored background — check the combo */
.badge { background: #3b82f6; color: #93c5fd; } /* blue on light blue — likely fails */

/* PASS: white on blue */
.badge { background: #3b82f6; color: #ffffff; } /* 4.7:1 */
```

**Rules:**
- Never use text below 4.5:1 contrast on any background.
- Placeholder text in inputs must meet 4.5:1 against the input background — most default placeholders fail this.
- Disabled elements are exempt from contrast requirements, but should still be perceivable.

### Focus Indicators

Every focusable element needs a visible focus indicator. This is non-negotiable.

```css
/* Default focus ring for all interactive elements */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove default outline only when replacing it */
:focus:not(:focus-visible) {
  outline: none;
}

/* Custom focus for elements where outline doesn't work well (e.g., cards) */
.card:focus-visible {
  box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-primary);
}
```

**`:focus-visible` vs `:focus`:**
- `:focus-visible` shows only on keyboard navigation — what you want for most elements.
- `:focus` shows on all focus (keyboard, mouse click, programmatic). Use for inputs where the user always needs to see focus state.
- Never use `:focus { outline: none }` without providing an alternative. This makes your site unusable for keyboard users.

### Touch Targets

44x44px minimum on mobile. This is the Apple/WCAG standard.

```css
/* Small icon button — visual size 24px, hit area 44px */
.icon-button {
  width: 24px;
  height: 24px;
  position: relative;
}

.icon-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  /* Invisible expanded hit area */
}

/* Or simply pad the element */
.icon-button-padded {
  padding: 10px; /* 24px icon + 10px padding each side = 44px */
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

**Rules:**
- Spacing between adjacent touch targets: at least 8px.
- Links within body text are exempt — but navigation links, buttons, and controls must meet 44px.
- Test by tapping with your thumb, not a cursor.

### Text Sizing

```css
html {
  font-size: 16px; /* Base — never set below 16px */
}

body {
  font-size: 1rem; /* = 16px */
}

/* Use rem for all text sizing — scales with user's browser settings */
.small { font-size: 0.875rem; }  /* 14px — minimum for readable UI text */
.caption { font-size: 0.75rem; } /* 12px — absolute minimum, labels only */

/* Never use px for font-size — breaks user zoom/text scaling preferences */
```

**Rules:**
- Body text: 16px minimum. No exceptions.
- Smallest allowed text: 12px (0.75rem), and only for non-essential labels or metadata.
- Use `rem` not `px` for font sizes. Users who set their browser to larger text need your UI to respect that.

### Reduced Motion

Some users experience motion sickness or vestibular disorders. Respect `prefers-reduced-motion`.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 100ms !important;
    /* Keep short transitions for opacity — removes transforms/slides */
  }

  /* Specifically disable transforms */
  .card:hover { transform: none; }
  .button:active { transform: none; }
  .button:hover { transform: none; }
}
```

**Rules:**
- Remove all transform-based animations (slides, scales, bounces).
- Keep simple opacity fades but cap at 100ms.
- Disable auto-playing animations, carousels, and parallax.
- Test your UI with this media query active (Chrome DevTools > Rendering > Emulate CSS media feature).

### Screen Reader Text

Content that is visually hidden but available to screen readers.

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**When to use:**
```tsx
/* Icon-only button — needs aria-label */
<button aria-label="Close menu"><XIcon aria-hidden="true" /></button>

/* Decorative icon next to text — hide from screen readers */
<span><StarIcon aria-hidden="true" /> 4.5 rating</span>

/* Visual-only information that needs text equivalent */
<span className="status-dot status-dot--green" />
<span className="sr-only">Online</span>
```

### Semantic HTML

Use the right element for the job. Semantic HTML gives you accessibility for free.

```tsx
/* WRONG: div pretending to be a button */
<div onClick={handleClick} className="looks-like-button">Click me</div>

/* RIGHT: actual button — gets focus, keyboard events, screen reader announcement */
<button onClick={handleClick}>Click me</button>

/* WRONG: div for navigation */
<div className="nav">...</div>

/* RIGHT: nav element */
<nav aria-label="Main navigation">...</nav>

/* Page structure */
<header>...</header>
<nav aria-label="Main">...</nav>
<main>...</main>
<footer>...</footer>
```

**Heading hierarchy:** h1 then h2 then h3. Never skip levels (h1 then h3). One h1 per page.

### Form Accessibility

Every form input needs these connections:

```tsx
<div className="field">
  <label htmlFor="email">Email address</label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={!!error}
    aria-describedby={error ? 'email-error' : 'email-hint'}
  />
  <p id="email-hint" className="field-hint">We'll never share your email.</p>
  {error && <p id="email-error" className="field-error" role="alert">{error}</p>}
</div>
```

**Rules:**
- Every input has a `<label>` with matching `htmlFor`/`id`. Placeholder is not a label.
- Required fields use `aria-required="true"`.
- Error messages link to the input via `aria-describedby`.
- Error messages use `role="alert"` so screen readers announce them.

### Color as Information

Never use color as the only way to convey information.

```tsx
/* WRONG: status indicated only by color */
<span className="dot dot--red" />

/* RIGHT: color + text */
<span className="dot dot--red" />
<span>Offline</span>

/* RIGHT: color + icon */
<span className="status--error"><AlertIcon /> Error</span>

/* WRONG: required field indicated only by red asterisk */
<label>Name <span style={{color: 'red'}}>*</span></label>

/* RIGHT: text + visual indicator */
<label>Name <span className="required">(required)</span></label>
```

### Anti-Patterns — Do NOT

- Remove `:focus` or `:focus-visible` outlines globally. This is the single most common accessibility failure.
- Use color as the only indicator of state (error = red border, success = green border, with no text or icon).
- Build interactive elements from `<div>` or `<span>`. Use `<button>`, `<a>`, `<input>`. Semantic HTML provides keyboard and screen reader support for free.
- Skip alt text on images. Decorative images get `alt=""`. Content images get descriptive alt text.
- Use `tabindex` values greater than 0. Only use `tabindex="0"` (add to tab order) or `tabindex="-1"` (programmatic focus only).
- Set font sizes in `px`. Use `rem` so text scales with user preferences.
- Assume all users have a mouse. Every interaction must work with keyboard alone.
- Skip heading levels (h1 directly to h3). Screen reader users navigate by heading hierarchy.
- Use `aria-label` on elements that already have visible text. The label overrides the visible text, causing confusion.
- Add `role="button"` to a `<div>` instead of just using `<button>`. The real element gives you keyboard events and focus for free.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- WCAG AA contrast minimum on all text and UI elements
- Focus-visible rings on every interactive element
- 44px touch targets on mobile
- prefers-reduced-motion respected globally
- Semantic HTML elements, not divs with roles

## Notes

[Any project-specific context.]
