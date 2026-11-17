# [Project Name]

[Brief description of what this project does.]

---

## Capability: Interactive States

Every interactive element needs a complete set of states. Missing states make UI feel broken — hover without focus fails accessibility, active without transition feels cheap, disabled without `aria-disabled` is invisible to assistive tech. This skill covers every state for every interactive element type.

### Global Rules

Every interactive element must follow these rules before any element-specific states apply:

```css
/* All interactive elements need transition on state changes */
button, a, input, select, textarea, [role="button"], [role="checkbox"], [role="switch"] {
  transition: all 150ms ease;
}

/* Focus must be visible on keyboard navigation */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Never remove outline without a replacement */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Buttons

Every button needs all five states. No exceptions.

```css
.button {
  /* Default */
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border: none;
  cursor: pointer;
  transition: background-color 150ms ease, transform 100ms ease, box-shadow 150ms ease;
}

.button:hover {
  background: var(--color-primary-hover);
  /* Shift background — 150ms transition handles the smoothness */
}

.button:active {
  transform: scale(0.97);
  /* 100ms — immediate press feedback */
}

.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  /* ring-2 ring-offset-2 equivalent — keyboard users must see this */
}

.button:disabled,
.button[aria-disabled="true"] {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
```

**Secondary and ghost variants** follow the same state pattern — only the default colors change. The hover shift, active scale, focus ring, and disabled opacity stay identical.

```tsx
<button className="button" disabled={isDisabled} aria-disabled={isDisabled}>
  Save Changes
</button>
```

### Links

```css
a {
  /* Default */
  color: var(--color-primary);
  text-decoration: none;
  transition: color 150ms ease;
}

a:hover {
  text-decoration: underline;
  /* Or shift to --color-primary-hover if underline doesn't fit the design */
}

a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

a:visited {
  color: var(--color-primary-muted);
  /* Optional — slightly muted. Only use on content-heavy pages with many links */
}

a:active {
  color: var(--color-primary-active);
}
```

### Interactive Cards

Cards that link somewhere or trigger an action.

```css
.card-interactive {
  /* Default */
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  /* Lift effect — 200ms keeps it smooth without feeling slow */
}

.card-interactive:active {
  transform: scale(0.99);
  /* Subtle press-down. Faster than hover — instant feel */
}

.card-interactive:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

```tsx
<a href="/project/1" className="card-interactive" tabIndex={0}>
  <h3>Project Name</h3>
  <p>Description text here</p>
</a>
```

### Inputs

```css
.input {
  /* Default */
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  background: var(--color-bg);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-subtle);
  outline: none;
  /* ring-2 ring-accent border-accent equivalent */
}

.input[aria-invalid="true"] {
  border-color: var(--color-error);
}

.input[aria-invalid="true"]:focus {
  box-shadow: 0 0 0 2px var(--color-error-subtle);
  /* Error ring matches error border */
}

.input:disabled {
  background: var(--color-bg-tertiary);
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Checkboxes and Toggles

```css
.checkbox {
  /* Unchecked */
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
  transition: background-color 150ms ease, border-color 150ms ease;
  cursor: pointer;
}

.checkbox:checked,
.checkbox[aria-checked="true"] {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.checkbox:indeterminate,
.checkbox[aria-checked="mixed"] {
  background: var(--color-primary);
  border-color: var(--color-primary);
  /* Show dash icon instead of checkmark */
}

.checkbox:hover {
  border-color: var(--color-primary);
}

.checkbox:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.checkbox:disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
```

**Toggle switch** follows the same checked/unchecked/disabled pattern — the visual is different but the states are identical.

### State Combination Rules

- Hover + focus: both can be active. Focus ring shows; hover background also shows.
- Disabled overrides everything. A disabled button cannot be hovered, focused, or active.
- Loading is a form of disabled — prevent interaction but show a loading indicator instead of muted opacity.
- Error + focus on inputs: show error border with error-colored ring, not the default ring.

### Anti-Patterns — Do NOT

- Add hover state without focus-visible state. Keyboard users exist. Every hover needs a matching focus.
- Use color-only state changes. A button that only changes color on hover breaks accessibility. Pair color shifts with underlines, shadows, transforms, or outlines.
- Apply instant state changes without transition. Every state change needs `transition-colors`, `transition-all`, or property-specific transitions with duration.
- Use `outline: none` globally. This nukes keyboard accessibility. Use `:focus-visible` to scope focus rings to keyboard navigation only.
- Forget `aria-disabled="true"` on disabled elements that need to remain in tab order (e.g., for tooltip explanations of why it's disabled).
- Make disabled elements completely invisible. Opacity 0.5 + `cursor: not-allowed` is the minimum. Users need to see the element exists.
- Skip the active/pressed state. Without it, buttons feel unresponsive on click.
- Use `:hover` styles on touch devices without fallback. Hover states can stick on mobile. Use `@media (hover: hover)` to scope hover styles to pointer devices.

```css
@media (hover: hover) {
  .button:hover {
    background: var(--color-primary-hover);
  }
}
```

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Every interactive element has default, hover, active, focus-visible, and disabled states
- All state transitions use 100-200ms duration
- Focus rings use outline with offset, not box-shadow
- Disabled elements use opacity-50 + pointer-events-none + aria-disabled

## Notes

[Any project-specific context.]
