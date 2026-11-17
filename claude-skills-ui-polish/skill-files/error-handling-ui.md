# [Project Name]

[Brief description of what this project does.]

---

## Capability: Error Handling UI

Every operation that can fail needs a designed error state. Errors are not edge cases — they are guaranteed states. If your UI has no error handling, your users will see broken screens. This skill covers every error UI pattern and when to use each one.

### Inline Field Validation

Use for form inputs. Show errors on blur, clear on input change. Place the error message directly below the field.

```css
.field-error {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  font-size: var(--text-sm);
  color: var(--color-error);
  line-height: 1.4;
}

.field-error-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.input--error {
  border-color: var(--color-error);
}

.input--error:focus {
  box-shadow: 0 0 0 2px var(--color-error-subtle);
}
```

```tsx
<div className="field">
  <label htmlFor="password">Password</label>
  <input
    id="password"
    type="password"
    className={`input ${error ? 'input--error' : ''}`}
    aria-invalid={!!error}
    aria-describedby={error ? 'password-error' : undefined}
    onBlur={validate}
    onChange={() => setError(null)}
  />
  {error && (
    <p id="password-error" className="field-error" role="alert">
      <AlertIcon className="field-error-icon" />
      Must be at least 8 characters
    </p>
  )}
</div>
```

**Rules:**
- Validate on blur, not on every keystroke. Let the user finish typing.
- Clear the error when the user starts correcting the field.
- Show specific messages. "Must be at least 8 characters" not "Invalid password." "Enter a valid email" not "Invalid."
- Link the error to the input with `aria-describedby`. Use `role="alert"` so screen readers announce it.

### Toast Notifications

Use for non-blocking feedback — errors from background operations, connection issues, action failures.

```css
.toast {
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  max-width: 400px;
  z-index: 1000;
  animation: slideIn 200ms ease;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.toast--error {
  background: var(--color-error);
  color: white;
}

.toast--success {
  background: var(--color-success);
  color: white;
}

.toast--warning {
  background: var(--color-warning);
  color: var(--color-text);
}

.toast-dismiss {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 4px;
  opacity: 0.7;
}

.toast-dismiss:hover { opacity: 1; }

.toast-action {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: inherit;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--text-sm);
  font-weight: 500;
}
```

```tsx
function Toast({ variant, message, action, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={`toast toast--${variant}`} role="alert">
      <AlertIcon />
      <span>{message}</span>
      {action && <button className="toast-action" onClick={action.onClick}>{action.label}</button>}
      <button className="toast-dismiss" onClick={onDismiss} aria-label="Dismiss">×</button>
    </div>
  );
}
```

**Rules:**
- Auto-dismiss after 5 seconds for errors (longer than success — user needs time to read).
- Always include a dismiss button. Users should be able to close it early.
- Include an action button when relevant ("Retry", "Undo", "View details").
- Stack multiple toasts vertically with 8px gap. Don't overlap.

### Banner Alerts

Use for persistent, page-level information — maintenance warnings, account issues, feature announcements.

```css
.banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: var(--text-sm);
  border-bottom: 1px solid transparent;
}

.banner--error {
  background: var(--color-error-subtle);
  color: var(--color-error);
  border-color: var(--color-error);
}

.banner--warning {
  background: var(--color-warning-subtle);
  color: var(--color-text);
  border-color: var(--color-warning);
}

.banner--info {
  background: var(--color-info-subtle);
  color: var(--color-info);
  border-color: var(--color-info);
}

.banner--success {
  background: var(--color-success-subtle);
  color: var(--color-success);
  border-color: var(--color-success);
}

.banner-dismiss {
  margin-left: auto;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 4px;
}
```

```tsx
<div className="banner banner--warning" role="alert">
  <WarningIcon />
  <span>Scheduled maintenance tonight at 11 PM EST. Save your work.</span>
  <button className="banner-dismiss" onClick={dismiss} aria-label="Dismiss">×</button>
</div>
```

**Placement:** Full-width, below the navbar or at the top of the relevant section. Never floating, never overlapping content.

### Error Pages (404, 500)

Centered layout with clear messaging and recovery paths.

```tsx
function ErrorPage({ code, title, description }: { code: number; title: string; description: string }) {
  return (
    <main className="error-page">
      <div className="error-page-content">
        <span className="error-page-code">{code}</span>
        <h1 className="error-page-title">{title}</h1>
        <p className="error-page-description">{description}</p>
        <div className="error-page-actions">
          <a href="/" className="button">Go Home</a>
          <button onClick={() => window.location.reload()} className="button button--secondary">
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
}
```

```css
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 48px 24px;
}

.error-page-code {
  font-size: var(--text-5xl);
  font-weight: 700;
  color: var(--color-text-tertiary);
}

.error-page-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-top: 8px;
}

.error-page-description {
  color: var(--color-text-secondary);
  margin-top: 8px;
  max-width: 400px;
}

.error-page-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
}
```

**Copy examples:**
- 404: "Page not found" / "The page you're looking for doesn't exist or has been moved."
- 500: "Something went wrong" / "We're working on it. Try refreshing the page."
- 403: "Access denied" / "You don't have permission to view this page. Contact the owner for access."

### Connection Errors

Toast with retry action. If the error persists, escalate to an inline banner.

```tsx
// First occurrence: toast
showToast({ variant: 'error', message: "Couldn't connect. Check your internet.", action: { label: 'Retry', onClick: retry } });

// Persistent (3+ failures): inline banner
<div className="banner banner--error" role="alert">
  <AlertIcon />
  <span>Connection lost. Your changes won't save until you're back online.</span>
  <button className="toast-action" onClick={retry}>Retry</button>
</div>
```

### Permission Errors

Explain what happened, what access is needed, and who can grant it.

```tsx
<div className="error-page-content">
  <LockIcon size={48} />
  <h1>You don't have access</h1>
  <p>This project is private. Ask the project owner to invite you, or check that you're signed in to the right account.</p>
  <a href="/" className="button">Go Back</a>
</div>
```

### Anti-Patterns — Do NOT

- Show "Something went wrong" with no additional context. Every error must say what happened and what the user can do.
- Auto-dismiss error toasts in under 5 seconds. Users need time to read and act on errors.
- Show layout-shifting errors. Reserve space for inline validation messages, or use absolute positioning.
- Display raw error codes, API responses, or stack traces. Translate to human language.
- Use toasts for inline form validation. Field errors go below the field, not in a toast.
- Show errors that disappear with no way to see them again. If the error blocks a workflow, keep it visible.
- Use the same red intensity for warnings and errors. Warnings are yellow/amber. Errors are red. Different severity, different color.
- Block the entire page with an error overlay when only one section failed. Scope errors to the failing component.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Inline validation: error text below field, validate on blur
- Toasts: auto-dismiss 5s for errors, include dismiss + optional action
- Banners: full-width, below nav, variant colors for severity
- All error elements use role="alert" and aria-invalid where applicable

## Notes

[Any project-specific context.]
