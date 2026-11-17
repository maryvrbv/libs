# [Project Name]

[Brief description of what this project does.]

---

## Capability: Success Feedback

Every user action needs visible confirmation that it worked. Silence after an action feels broken — the user wonders "did that save?" This skill covers every success feedback pattern. The goal: the user always knows the current state of their action.

### Button Confirmation

After a save or submit, the button text changes briefly to confirm success. Then reverts.

```tsx
function SaveButton() {
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');

  async function handleSave() {
    setState('saving');
    await api.save(data);
    setState('saved');
    setTimeout(() => setState('idle'), 2000);
  }

  return (
    <button
      className={`button ${state === 'saved' ? 'button--success' : ''}`}
      onClick={handleSave}
      disabled={state === 'saving'}
    >
      {state === 'idle' && 'Save Changes'}
      {state === 'saving' && <Spinner size={16} />}
      {state === 'saved' && 'Saved \u2713'}
    </button>
  );
}
```

```css
.button--success {
  background: var(--color-success);
  transition: background-color 300ms ease;
}
```

**Rules:**
- "Saved" state lasts 2 seconds, then reverts to default text.
- Keep button width stable — use `min-width` to prevent layout shift between states.
- Green shift is subtle and temporary. Don't leave the button green permanently.

### Toast Success

Use for actions where the result isn't visible on the current screen — background saves, settings changes, async operations.

```css
.toast--success {
  background: var(--color-success);
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  animation: slideIn 200ms ease;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
```

```tsx
function showSuccessToast(message: string) {
  // Auto-dismiss after 3 seconds — success needs less reading time than errors
  addToast({ variant: 'success', message, duration: 3000 });
}

// Usage
showSuccessToast('Settings saved');
showSuccessToast('3 items moved to archive');
showSuccessToast('Invitation sent to team@example.com');
```

**Rules:**
- Auto-dismiss after 3 seconds. Success needs less reading time than errors (5s).
- Include a check icon for instant visual recognition.
- Keep the message short. "Settings saved" not "Your settings have been successfully saved."

### Inline Confirmation

Subtle checkmark or text that appears next to the saved element. Use for auto-save, inline edits, and field-level updates.

```css
.inline-confirm {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-sm);
  color: var(--color-success);
  animation: fadeInConfirm 200ms ease;
}

@keyframes fadeInConfirm {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}
```

```tsx
<div className="field-row">
  <input className="input" value={name} onChange={handleAutoSave} />
  {saved && <span className="inline-confirm"><CheckIcon size={14} /> Saved</span>}
</div>
```

### Form Submission

After successful form submission, either clear the form and stay, or navigate to the result.

```tsx
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSubmitting(true);

  try {
    const result = await api.createProject(formData);

    // Option A: Navigate to the result
    router.push(`/projects/${result.id}`);
    showSuccessToast('Project created');

    // Option B: Clear form and stay (for "add another" flows)
    resetForm();
    showSuccessToast('Project created. Add another?');
  } catch (err) {
    showErrorToast('Failed to create project. Try again.');
  } finally {
    setSubmitting(false);
  }
}
```

**Rules:**
- Always confirm what was created/saved. "Project created" not just "Success."
- If navigating away, the toast should appear on the new page.
- If staying on the form, clear it so the user knows it submitted.

### Destructive Action Confirmation

Before destructive actions, show a confirmation modal. After the action, show a toast with an undo option.

```tsx
// Step 1: Confirm before action
function DeleteModal({ items, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal" role="alertdialog" aria-labelledby="delete-title">
        <h2 id="delete-title">Delete {items.length} item{items.length > 1 ? 's' : ''}?</h2>
        <p className="modal-description">This action cannot be undone.</p>
        <div className="modal-actions">
          <button className="button button--secondary" onClick={onCancel}>Cancel</button>
          <button className="button button--destructive" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// Step 2: Toast with undo after action
showToast({
  variant: 'default',
  message: `${items.length} item${items.length > 1 ? 's' : ''} deleted`,
  action: { label: 'Undo', onClick: undoDelete },
  duration: 5000,
});
```

```css
.button--destructive {
  background: var(--color-error);
  color: white;
}

.button--destructive:hover {
  background: var(--color-error-hover, #dc2626);
}
```

**Rules:**
- Confirmation modals must name what's being deleted. "Delete 3 items?" not "Are you sure?"
- The destructive button must be red and labeled with the action ("Delete"), not "OK" or "Confirm."
- After deletion, offer undo in the toast (5 second window). Soft-delete on the backend.

### Copy to Clipboard

Show a brief tooltip or toast confirming the copy.

```tsx
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button className="copy-button" onClick={handleCopy} aria-label={copied ? 'Copied' : 'Copy to clipboard'}>
      {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      {copied && <span className="copy-tooltip">Copied!</span>}
    </button>
  );
}
```

```css
.copy-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  font-size: var(--text-xs);
  background: var(--color-text);
  color: var(--color-bg);
  border-radius: var(--radius-sm);
  white-space: nowrap;
  animation: fadeInConfirm 150ms ease;
}
```

### File Upload

Show progress during upload, success state with filename after.

```tsx
function FileUpload({ file, progress, complete }: UploadProps) {
  if (!file) return <DropZone />;

  return (
    <div className="upload-item">
      <FileIcon />
      <div className="upload-info">
        <span className="upload-filename">{file.name}</span>
        {!complete && <ProgressBar value={progress} />}
        {complete && <span className="inline-confirm"><CheckIcon size={14} /> Uploaded</span>}
      </div>
      <button className="upload-remove" onClick={onRemove} aria-label={`Remove ${file.name}`}>
        <XIcon size={16} />
      </button>
    </div>
  );
}
```

```css
.upload-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.upload-filename {
  font-size: var(--text-sm);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}
```

### Feedback Duration Guide

```
Inline confirmation (checkmark):   2 seconds
Button text change ("Saved"):      2 seconds
Copy tooltip ("Copied!"):          2 seconds
Success toast:                     3 seconds
Destructive undo toast:            5 seconds
```

### Anti-Patterns — Do NOT

- Provide no feedback after a user action. Silence = broken. Every action needs a visible response.
- Show success messages that block workflow (full-page success screens for minor actions). Use toasts or inline feedback.
- Leave success states visible permanently. They must auto-clear after 2-3 seconds.
- Use the same feedback for every action. A settings save gets inline confirmation. A project deletion gets a modal + undo toast. Match the feedback to the severity.
- Show "Success!" without saying what succeeded. "Project created" not "Success!"
- Skip the confirmation step for destructive actions. Always confirm before delete.
- Auto-dismiss undo toasts too fast. 5 seconds minimum for destructive undo windows.
- Use alert() or confirm() dialogs. Build proper modals with your design system.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Every action gets visible confirmation
- Inline confirmations auto-clear after 2s
- Toasts auto-dismiss: 3s success, 5s destructive undo
- Destructive actions require modal confirmation + undo toast

## Notes

[Any project-specific context.]
