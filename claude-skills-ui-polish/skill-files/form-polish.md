# [Project Name]

[Brief description of what this project does.]

---

## Capability: Form Polish

Forms are where users give you their data and trust. Sloppy forms erode both. This file defines input styling, label positioning, validation patterns, and layout rules. Apply these to every form element you generate or modify.

### Input Sizing and Base Styles

All inputs share the same height and padding. Consistency here is non-negotiable.

```css
.input {
  height: 40px;        /* h-10 */
  padding: 0 12px;     /* px-3 */
  font-size: 0.875rem; /* text-sm (14px) */
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-foreground);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

textarea.input {
  height: auto;
  min-height: 80px;
  padding: 8px 12px; /* py-2 px-3 */
  resize: vertical;
}
```

### Label Positioning

Labels go above the input. Always. No exceptions.

```jsx
<div className="flex flex-col gap-1.5">
  {/* gap-1.5 = 6px between label and input */}
  <label htmlFor="email" className="text-sm font-medium leading-none">
    Email address
    <span className="text-muted-foreground ml-1">*</span>
  </label>
  <input id="email" type="email" className="input" required />
  <p className="text-sm text-muted-foreground">We'll never share your email.</p>
</div>
```

**Rules:**
- Label uses `font-medium` (500 weight), `text-sm` (14px)
- Label has `margin-bottom: 6px` to the input (gap-1.5)
- Required indicator: asterisk `*` in `text-muted-foreground` after the label text
- Labels always use `htmlFor` matching the input `id`

### Input States

Every input must implement all five states.

```css
.input {
  /* Default */
  border: 1px solid var(--color-border);
  background: var(--color-background);

  /* Focus — ring accent, smooth transition */
  &:focus {
    outline: none;
    border-color: var(--color-ring);
    box-shadow: 0 0 0 2px var(--color-ring);
    /* ring-2 ring-accent */
  }

  /* Error — destructive border + red icon */
  &[aria-invalid="true"] {
    border-color: var(--color-destructive);
    &:focus {
      box-shadow: 0 0 0 2px hsl(var(--destructive) / 0.2);
    }
  }

  /* Disabled — muted background, reduced opacity */
  &:disabled {
    opacity: 0.5;
    background: var(--color-muted);
    cursor: not-allowed;
  }

  /* Placeholder */
  &::placeholder {
    color: var(--color-muted-foreground);
  }
}
```

### Error Messages

Error messages appear below the input, never in toasts or alerts.

```jsx
<div className="flex flex-col gap-1.5">
  <label htmlFor="email" className="text-sm font-medium">Email</label>
  <input
    id="email"
    type="email"
    className="input border-destructive"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <p id="email-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
    <AlertCircleIcon className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
    Please enter a valid email address.
  </p>
</div>
```

Error messages must: use `text-sm text-destructive`, include an icon + text, use `role="alert"` for screen readers, and be linked to the input via `aria-describedby`.

### Valid State (Optional)

For fields where confirming validity helps the user (e.g., username availability):

```jsx
<div className="relative">
  <input id="username" className="input border-green-500 pr-10" />
  <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
</div>
```

Use sparingly. Not every field needs a green checkmark.

### Helper Text

Helper text goes below the input, above any error message.

```jsx
<p className="text-sm text-muted-foreground">Must be at least 8 characters.</p>
```

When an error is active, helper text hides and the error message takes its place. Don't show both.

### Select, Checkbox, Radio, Switch

```css
/* Select — same height and padding as inputs */
select.input {
  appearance: none;
  padding-right: 32px; /* room for chevron icon */
  background-image: url("chevron-down.svg");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

/* Checkbox and Radio — consistent sizing */
input[type="checkbox"], input[type="radio"] {
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary);
  cursor: pointer;
}

/* Checkbox/Radio with label — always inline */
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

**Switch component sizing:**
```jsx
<button
  role="switch"
  aria-checked={enabled}
  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
    enabled ? 'bg-primary' : 'bg-input'
  }`}
>
  <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
    enabled ? 'translate-x-6' : 'translate-x-1'
  }`} />
</button>
```

### Form Layout

```jsx
{/* Standard form layout */}
<form className="flex flex-col gap-4">
  {/* gap-4 = 16px between fields */}

  <div className="flex flex-col gap-1.5">
    <label>First name</label>
    <input className="input" />
  </div>

  <div className="flex flex-col gap-1.5">
    <label>Last name</label>
    <input className="input" />
  </div>

  {/* Side-by-side only on tablet+ */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="flex flex-col gap-1.5">
      <label>City</label>
      <input className="input" />
    </div>
    <div className="flex flex-col gap-1.5">
      <label>State</label>
      <select className="input">...</select>
    </div>
  </div>

  {/* Actions — right-aligned */}
  <div className="flex justify-end gap-2 pt-4">
    <button className="btn btn-outline">Cancel</button>
    <button className="btn btn-primary">Save</button>
  </div>
</form>
```

### Anti-Patterns

Do NOT do any of the following:

- **Error messages that move layout.** Reserve vertical space for error messages, or use absolute positioning. Content jumping on validation is jarring.
- **Placeholder as label.** Placeholders disappear on focus. The user forgets what the field is for. Always use a visible label above the input.
- **Validation only on submit.** Validate on blur for individual fields. Show errors as the user moves through the form, not all at once after they hit submit.
- **Inconsistent input heights.** Every text input, select, and date picker must be the same height (40px). No exceptions.
- **Labels below or beside inputs.** Labels go above. Period. Side-by-side labels waste space and break on mobile.
- **Missing required indicators.** If a field is required, show the asterisk. Don't make users guess.
- **Red placeholder text for errors.** Error state goes on the border and in a message below, not in the placeholder.
- **Textarea without resize handle.** Always allow `resize: vertical` unless there's a strong reason not to.
- **Forms without keyboard navigation.** Tab order must be logical. Enter must submit. Escape must cancel where appropriate.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All inputs are 40px tall with 12px horizontal padding
- Labels above inputs with 6px gap
- Error messages below inputs with icon + text
- Validate on blur, not just on submit
- Actions right-aligned at form bottom

## Notes

[Any project-specific context.]
