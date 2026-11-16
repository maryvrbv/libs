# [Project Name]

[Brief description of what this project does.]

---

## Capability: Accessibility (a11y)

This project meets WCAG 2.1 Level AA. Accessibility is not a feature — it's a baseline requirement. Every component, page, and interaction must be usable by keyboard, screen reader, and assistive technology users.

### WCAG 2.1 AA — Key Criteria

| Criterion | Requirement |
|-----------|-------------|
| 1.1.1 Non-text Content | All images have appropriate alt text |
| 1.3.1 Info and Relationships | Semantic HTML communicates structure |
| 1.4.3 Contrast (Minimum) | 4.5:1 for normal text, 3:1 for large text |
| 1.4.11 Non-text Contrast | 3:1 for UI components and graphics |
| 2.1.1 Keyboard | All functionality available via keyboard |
| 2.4.3 Focus Order | Tab order matches visual reading order |
| 2.4.7 Focus Visible | Focus indicator is always visible |
| 2.5.5 Target Size | Touch targets at least 44x44px |
| 3.3.1 Error Identification | Errors are identified and described in text |
| 4.1.2 Name, Role, Value | All UI components have accessible names |

### Semantic HTML

Use the right element for the job. Semantic HTML gives assistive technologies structure for free.

```html
<!-- Page structure -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/[page]">[Page Name]</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>[Page Title]</h1>

  <section aria-labelledby="features-heading">
    <h2 id="features-heading">Features</h2>
    <article>...</article>
    <article>...</article>
  </section>

  <aside aria-label="Related links">
    ...
  </aside>
</main>

<footer>
  <nav aria-label="Footer navigation">...</nav>
</footer>
```

**Rules:**
- One `<h1>` per page.
- Heading levels never skip (h1 → h2 → h3, never h1 → h3).
- Use `<button>` for actions, `<a>` for navigation. Never use `<div onClick>`.
- Use `<ul>` / `<ol>` for lists — screen readers announce "list, 5 items."
- Use `<table>` for tabular data with `<thead>`, `<th scope="col">`.

### ARIA — When and When NOT to Use

**Prefer semantic HTML.** ARIA is a last resort when no native element exists.

```html
<!-- BAD — ARIA on a div when a button exists -->
<div role="button" tabindex="0" onclick="save()">Save</div>

<!-- GOOD — native button -->
<button onclick="save()">Save</button>
```

**When ARIA is needed:**
```html
<!-- Custom component with no semantic equivalent -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">Tab 2</button>
</div>
<div role="tabpanel" id="panel-1">Content for tab 1</div>

<!-- Labeling regions -->
<nav aria-label="Breadcrumb">...</nav>
<section aria-labelledby="section-title">
  <h2 id="section-title">Section Title</h2>
</section>

<!-- Describing relationships -->
<input id="email" aria-describedby="email-hint email-error" />
<p id="email-hint">We'll never share your email.</p>
<p id="email-error" role="alert">Please enter a valid email.</p>

<!-- Communicating state -->
<button aria-expanded="false" aria-controls="menu-dropdown">Menu</button>
<div id="menu-dropdown" hidden>...</div>
```

### Keyboard Navigation

Every interactive element must be reachable and operable by keyboard.

**Tab order:**
- Follows the DOM order. Do not use `tabindex` > 0 to rearrange.
- Use `tabindex="0"` to make custom interactive elements focusable.
- Use `tabindex="-1"` for elements that should be programmatically focusable but not in the tab sequence.

**Skip link (first element on every page):**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- CSS -->
<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  background: var(--color-primary);
  color: var(--color-primary-text);
  z-index: 100;
  transition: top 150ms;
}
.skip-link:focus {
  top: 0;
}
</style>

<main id="main-content">...</main>
```

**Focus trapping in modals:**
```ts
function trapFocus(element: HTMLElement) {
  const focusable = element.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  first.focus();
}
```

**Keyboard patterns for custom components:**

| Component | Keys |
|-----------|------|
| Menu/Dropdown | Arrow keys to navigate, Enter/Space to select, Escape to close |
| Tabs | Arrow keys to switch tabs, Tab to move into panel |
| Modal | Escape to close, Tab trapped inside, focus returns on close |
| Accordion | Enter/Space to toggle, Arrow keys between headers |
| Combobox | Arrow keys to navigate options, Enter to select, Escape to close |

### Focus Indicators

Focus indicators must be visible and high-contrast. Never remove them.

```css
/* Base focus style */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove outline only on mouse click, keep for keyboard */
:focus:not(:focus-visible) {
  outline: none;
}

/* High-contrast focus for dark backgrounds */
[data-theme="dark"] :focus-visible {
  outline-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-primary);
}
```

### Color Contrast

**Minimum ratios (WCAG AA):**
- Normal text (< 18pt / < 14pt bold): **4.5:1**
- Large text (>= 18pt / >= 14pt bold): **3:1**
- UI components and graphical objects: **3:1**

**Checking contrast:**
```
Tools:
- Chrome DevTools → Inspect element → color picker shows ratio
- axe DevTools browser extension
- WebAIM Contrast Checker: webaim.org/resources/contrastchecker
```

**Common failures:**
- Light gray text on white backgrounds (placeholder text, disabled states)
- Colored text on colored backgrounds without checking
- Focus indicators that don't contrast against the background

### Form Accessibility

```html
<!-- Every input needs a visible label -->
<div>
  <label for="email">Email address</label>
  <input id="email" type="email" aria-describedby="email-help" required />
  <p id="email-help">We'll use this for account recovery.</p>
</div>

<!-- Group related fields -->
<fieldset>
  <legend>Shipping address</legend>
  <label for="street">Street</label>
  <input id="street" type="text" />
  <label for="city">City</label>
  <input id="city" type="text" />
</fieldset>

<!-- Error messages linked to input -->
<div>
  <label for="password">Password</label>
  <input
    id="password"
    type="password"
    aria-invalid="true"
    aria-describedby="password-error"
  />
  <p id="password-error" role="alert">
    Password must be at least 8 characters.
  </p>
</div>
```

**Rules:**
- Never use `placeholder` as a substitute for `<label>`.
- Error messages must be associated with `aria-describedby` and announced with `role="alert"`.
- Required fields use `required` attribute (or `aria-required="true"` for custom inputs).
- Group radio buttons and checkboxes with `<fieldset>` + `<legend>`.

### Image Alt Text

**Informative images — describe the content:**
```html
<img src="chart.png" alt="Bar chart showing 40% revenue growth in Q3 2025" />
<img src="team.jpg" alt="Three team members collaborating at a whiteboard" />
```

**Decorative images — empty alt:**
```html
<img src="divider.svg" alt="" />
<img src="background-pattern.png" alt="" role="presentation" />
```

**Functional images (icons in buttons):**
```html
<!-- Icon-only button needs accessible label -->
<button aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Icon with visible text — hide icon from screen readers -->
<button>
  <svg aria-hidden="true">...</svg>
  Delete
</button>
```

### Live Regions

Announce dynamic content changes to screen readers.

```html
<!-- Polite: announced after current speech finishes -->
<div aria-live="polite">
  {statusMessage && <p>{statusMessage}</p>}
</div>

<!-- Assertive: interrupts current speech (use sparingly) -->
<div aria-live="assertive" role="alert">
  {errorMessage && <p>{errorMessage}</p>}
</div>

<!-- Status updates -->
<div role="status" aria-live="polite">
  Showing {count} of {total} results
</div>
```

**Use live regions for:**
- Toast notifications
- Form validation errors that appear dynamically
- Loading/success/error states
- Search result counts
- Chat messages

### Touch Targets

Minimum touch target size: **44x44px** (WCAG 2.5.5).

```css
/* Ensure small buttons meet minimum target size */
.icon-button {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Adequate spacing between targets */
.button-group {
  gap: 8px; /* prevents accidental taps on adjacent targets */
}
```

### Motion Sensitivity

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Respect this media query for all animations, transitions, and parallax effects.

### Testing

**Automated (catches ~30% of issues):**
- axe DevTools browser extension — run on every page
- Lighthouse Accessibility audit — target 100 score
- eslint-plugin-jsx-a11y — catches issues at build time

**Manual keyboard testing (catches ~50% of issues):**
1. Unplug the mouse
2. Tab through the entire page — can you reach everything?
3. Can you operate every control with Enter, Space, Arrow keys, and Escape?
4. Does focus order make sense visually?
5. Can you see where focus is at all times?

**Screen reader testing (catches remaining issues):**
- macOS: VoiceOver (Cmd + F5 to toggle)
- Windows: NVDA (free) or JAWS
- Test with: page headings navigation, form completion, dynamic content updates

### Anti-Patterns — Do NOT

- Remove focus outlines with `outline: none` without providing an alternative
- Use `<div>` or `<span>` as interactive elements — use `<button>` and `<a>`
- Use color alone to communicate meaning (red for error) — add text or icons
- Use `tabindex` values greater than 0 — it breaks natural tab order
- Hide content with `display: none` when it should be available to screen readers (use `sr-only` class instead)
- Use `aria-label` on non-interactive elements (divs, spans) — it's ignored by most screen readers
- Add ARIA roles to elements that already have that role natively (`role="button"` on `<button>`)
- Rely only on automated testing — it catches less than a third of issues
- Use vague alt text ("image", "photo", "icon") — describe the content or mark as decorative
- Auto-focus elements that disrupt the user's place on the page
- Use `title` attribute as the only accessible name — it's unreliable across assistive technologies
- Skip heading levels (h1 → h3) or use headings for styling instead of structure

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Run axe DevTools before every PR
- All interactive components must be keyboard-operable
- All form inputs must have visible labels
- All images must have appropriate alt text
- Test both light and dark modes for contrast

## Notes

[Any project-specific context.]
