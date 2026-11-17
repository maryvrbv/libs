# [Project Name]

[Brief description of what this project does.]

---

## Capability: Modal & Dialog Polish

Modals, dialogs, drawers, and sheets interrupt the user. That means they must be fast, focused, and easy to dismiss. This file defines backdrop, animation, structure, accessibility, and variant rules. Apply these to every overlay component you generate or modify.

### Backdrop

The backdrop dims the page and signals a modal context.

```css
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);        /* bg-black/50 */
  backdrop-filter: blur(4px);              /* backdrop-blur-sm */
  -webkit-backdrop-filter: blur(4px);
  z-index: 50;
  animation: fadeIn 200ms ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

### Dialog (Centered Modal)

The standard confirmation or form modal.

```jsx
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  {/* Backdrop */}
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

  {/* Dialog */}
  <div className="relative z-50 w-full max-w-lg rounded-lg bg-background shadow-lg animate-dialog-in">
    {/* Header */}
    <div className="flex items-start justify-between p-6 pb-0">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-lg font-semibold leading-none">Dialog Title</h2>
        <p className="text-sm text-muted-foreground">Optional description of what this dialog does.</p>
      </div>
      <button
        className="btn-ghost btn-icon-sm -mt-1 -mr-1"
        aria-label="Close dialog"
        onClick={onClose}
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>

    {/* Body */}
    <div className="p-6 max-h-[60vh] overflow-y-auto">
      {/* Dialog content */}
    </div>

    {/* Footer */}
    <div className="flex items-center justify-end gap-2 p-6 pt-0">
      <button className="btn btn-outline" onClick={onClose}>Cancel</button>
      <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
    </div>
  </div>
</div>
```

**Sizing:** `max-w-sm` for confirmations, `max-w-lg` for forms, `max-w-2xl` for complex content. Never full-width on desktop.

### Entrance and Exit Animations

```css
/* Dialog entrance — scale up + fade in */
@keyframes dialogIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Dialog exit — scale down + fade out */
@keyframes dialogOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

.animate-dialog-in {
  animation: dialogIn 250ms ease-out;
}

.animate-dialog-out {
  animation: dialogOut 150ms ease-in;
}
```

Entrance is 250ms ease-out (decelerate in). Exit is 150ms ease-in (accelerate out). Exit is always faster than entrance.

### Sheet (Side Panel)

Slides in from the right. Used for detail views, settings, and secondary workflows.

```jsx
<div className="fixed inset-0 z-50">
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
  <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background shadow-lg animate-sheet-in">
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-border">
      <h2 className="text-lg font-semibold">Sheet Title</h2>
      <button className="btn-ghost btn-icon-sm" aria-label="Close" onClick={onClose}>
        <XIcon className="h-4 w-4" />
      </button>
    </div>

    {/* Body — scrollable */}
    <div className="p-6 overflow-y-auto h-[calc(100vh-73px)]">
      {/* Sheet content */}
    </div>
  </div>
</div>
```

```css
@keyframes sheetIn {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}

.animate-sheet-in {
  animation: sheetIn 250ms ease-out;
}
```

Sheet width: `max-w-sm` (384px) for simple content, `max-w-md` (448px) for forms. Never wider than `max-w-lg`. Full height.

### Drawer (Bottom Sheet)

Slides up from the bottom. Common on mobile for menus, filters, and confirmations.

```jsx
<div className="fixed inset-0 z-50">
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
  <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-lg bg-background shadow-lg animate-drawer-in">
    {/* Drag handle */}
    <div className="flex justify-center pt-3 pb-1">
      <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
    </div>

    {/* Content */}
    <div className="p-6 overflow-y-auto">
      {/* Drawer content */}
    </div>
  </div>
</div>
```

```css
@keyframes drawerIn {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

.animate-drawer-in {
  animation: drawerIn 250ms ease-out;
}
```

Drawers include a drag handle (centered pill, `h-1 w-10 rounded-full bg-muted-foreground/30`). Max height `85vh` with scrollable content.

### Focus Management

Focus trap is required for all overlay components. This is an accessibility requirement, not optional.

```jsx
// On open:
// 1. Save the currently focused element
// 2. Move focus to the first focusable element inside the modal
// 3. Trap Tab/Shift+Tab within the modal

// On close:
// 1. Return focus to the previously saved element

useEffect(() => {
  if (!isOpen) return;
  const previouslyFocused = document.activeElement;
  const firstFocusable = dialogRef.current?.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  firstFocusable?.focus();

  return () => {
    previouslyFocused?.focus();
  };
}, [isOpen]);
```

### Close Behavior

Every overlay must support three close methods:

```jsx
// 1. Close button (top-right corner, ghost variant)
<button className="btn-ghost btn-icon-sm" aria-label="Close" onClick={onClose}>
  <XIcon className="h-4 w-4" />
</button>

// 2. Escape key
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') onClose();
  };
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [onClose]);

// 3. Backdrop click
<div className="fixed inset-0 bg-black/50" onClick={onClose} />
```

### Body Scroll Lock

When a modal is open, the page behind it must not scroll.

```jsx
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  }
  return () => {
    document.body.style.overflow = '';
  };
}, [isOpen]);
```

### Destructive Confirmation Pattern

```jsx
<div className="flex flex-col gap-4 p-6">
  <div className="flex flex-col gap-1.5">
    <h2 className="text-lg font-semibold">Delete project?</h2>
    <p className="text-sm text-muted-foreground">
      This action cannot be undone. This will permanently delete the project and all its data.
    </p>
  </div>
</div>
<div className="flex justify-end gap-2 p-6 pt-0">
  <button className="btn btn-outline" onClick={onClose}>Cancel</button>
  <button className="btn bg-destructive text-destructive-foreground hover:bg-destructive/90">
    Delete Project
  </button>
</div>
```

Destructive dialogs: cancel on left (outline), destructive action on right. Use destructive variant, not primary.

### Anti-Patterns

Do NOT do any of the following:

- **Modals without a close button.** Every modal needs an X button in the top-right corner. No exceptions.
- **Modals that can't be closed by Escape.** Escape key must always close the modal. This is a baseline accessibility requirement.
- **Content behind modal still scrollable.** Lock body scroll when a modal is open. Scrolling the background is disorienting.
- **No backdrop.** Modals without a backdrop make it unclear that the user is in a modal context. Always dim the background.
- **Slow animations.** Entrance at 250ms max, exit at 150ms max. Anything longer feels sluggish.
- **Missing focus trap.** Tab should cycle within the modal, not escape to the page behind. Focus must return to the trigger on close.
- **Full-screen modals on desktop.** Modals should be sized to their content. Use `max-w-lg` as default, not `w-full`.
- **Nested modals.** Never open a modal from within a modal. Use a multi-step flow within a single modal instead.
- **Confirm button styled as primary for destructive actions.** Destructive confirmations use the destructive variant, not the primary button style.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Backdrop: bg-black/50, backdrop-blur-sm, fade in 200ms
- Dialog: max-w-lg, rounded-lg, shadow-lg, scale entrance 250ms
- Sheet: slide from right, max-w-sm, full height
- Drawer: slide from bottom, max-h-[85vh], rounded-t-lg, drag handle
- All overlays: close on Escape, backdrop click, and close button
- Focus trap on all overlays, body scroll lock

## Notes

[Any project-specific context.]
