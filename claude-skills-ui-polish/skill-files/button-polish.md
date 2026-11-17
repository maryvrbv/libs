# [Project Name]

[Brief description of what this project does.]

---

## Capability: Button Polish

Every button in this project must follow this system. Buttons are the most common interactive element — inconsistent buttons make the entire UI feel amateur. This file defines sizing, variants, states, and composition rules. Apply these to every button you generate or modify.

### Size Scale

Three sizes. Pick one per context and stay consistent within that context.

```css
/* Small — secondary actions, table rows, compact UI */
.btn-sm {
  height: 32px;       /* h-8 */
  padding: 0 12px;    /* px-3 */
  font-size: 0.875rem; /* text-sm (14px) */
  border-radius: 6px;
}

/* Default — primary actions, forms, general use */
.btn {
  height: 40px;       /* h-10 */
  padding: 0 16px;    /* px-4 */
  font-size: 0.875rem; /* text-sm (14px) */
  border-radius: 8px;
}

/* Large — hero CTAs, onboarding, prominent actions */
.btn-lg {
  height: 48px;       /* h-12 */
  padding: 0 24px;    /* px-6 */
  font-size: 1.125rem; /* text-lg (18px) */
  border-radius: 8px;
}
```

All sizes use `font-weight: 500` (medium). All sizes use `line-height: 1`. All sizes use `display: inline-flex; align-items: center; justify-content: center; gap: 8px;`.

### Variant System

Five variants. Each has a clear purpose — don't mix them up.

```jsx
// Primary — main CTA, one per section max
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Save Changes
</button>

// Secondary / Outline — secondary actions alongside a primary
<button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground">
  Cancel
</button>

// Ghost — tertiary actions, toolbars, minimal UI
<button className="hover:bg-accent hover:text-accent-foreground">
  Settings
</button>

// Destructive — delete, remove, irreversible actions only
<button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Delete Account
</button>

// Link — inline text actions, behaves like a link
<button className="text-primary underline-offset-4 hover:underline p-0 h-auto">
  Learn more
</button>
```

### Required States

Every button must implement all six states. No exceptions.

```css
.btn {
  /* Default */
  cursor: pointer;
  transition: background-color 150ms ease, transform 150ms ease, box-shadow 150ms ease;

  /* Hover — background shifts, smooth transition */
  &:hover {
    background-color: var(--color-primary-hover);
  }

  /* Active / Pressed — slight scale down for tactile feel */
  &:active {
    transform: scale(0.97);
  }

  /* Focus Visible — keyboard users only, clear ring */
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-background), 0 0 0 4px var(--color-ring);
    /* ring-2 ring-offset-2 */
  }

  /* Disabled — faded, non-interactive */
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }

  /* Loading — spinner replaces content, button stays same width */
  &[data-loading="true"] {
    pointer-events: none;
    opacity: 0.8;
  }
}
```

### Loading State Pattern

Loading buttons show a spinner next to the text. The button must not change width.

```jsx
<button disabled={isLoading} data-loading={isLoading}>
  {isLoading && (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )}
  {isLoading ? "Saving..." : "Save Changes"}
</button>
```

### Icon Buttons

Icon-only buttons use square aspect ratio. Minimum 44px touch target on mobile.

```css
.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-icon-sm { width: 32px; height: 32px; }
.btn-icon-lg { width: 48px; height: 48px; }

/* Mobile: enforce 44px minimum touch target even for small icons */
@media (pointer: coarse) {
  .btn-icon-sm { min-width: 44px; min-height: 44px; }
}
```

Icon-only buttons always need `aria-label`. Always.

```jsx
<button className="btn-icon" aria-label="Close dialog">
  <XIcon className="h-4 w-4" aria-hidden="true" />
</button>
```

### Button Groups

When buttons sit together, they need consistent spacing and shared edge radius.

```jsx
<div className="flex items-center gap-2">
  {/* gap-2 = 8px between buttons */}
  <button className="btn">Save</button>
  <button className="btn btn-outline">Cancel</button>
</div>

{/* Attached button group — shared border radius */}
<div className="flex">
  <button className="btn rounded-r-none border-r-0">Left</button>
  <button className="btn rounded-none border-r-0">Center</button>
  <button className="btn rounded-l-none">Right</button>
</div>
```

### Anti-Patterns

Do NOT do any of the following:

- **Buttons without hover states.** If it's clickable, it must respond on hover. No static buttons.
- **Text-only buttons with no padding.** Even ghost buttons need padding for hit area. The link variant is the only exception.
- **Inconsistent sizing across the app.** If your nav uses `btn-sm`, every nav button uses `btn-sm`. Don't mix.
- **Multiple primary buttons in one section.** One primary CTA per visible area. Everything else is secondary or ghost.
- **Missing disabled state.** If a button can be unavailable, it must look unavailable.
- **Color-only differentiation.** Destructive buttons need more than red — use a warning icon or confirmation dialog.
- **Buttons that change width on loading.** Set `min-width` or keep the text present alongside the spinner.
- **No focus ring.** Removing `:focus-visible` styles breaks keyboard accessibility.
- **Using `<div>` or `<span>` as buttons.** Use `<button>` for actions and `<a>` for navigation. Semantic HTML matters.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All buttons use the size scale (sm, default, lg) — no custom heights
- All interactive buttons have hover, active, focus-visible, disabled, and loading states
- Icon-only buttons always have `aria-label`
- One primary button per visible section maximum

## Notes

[Any project-specific context.]
