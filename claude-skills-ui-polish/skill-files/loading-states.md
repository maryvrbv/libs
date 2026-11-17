# [Project Name]

[Brief description of what this project does.]

---

## Capability: Loading States

Every async operation needs a loading state. A blank screen while data loads is a broken experience. A spinner on everything is lazy. This skill covers every loading pattern, when to use each one, and how to implement them so your UI feels fast and intentional.

### Skeleton Screens

Use for content with a predictable layout — lists, cards, profiles, dashboards. The skeleton matches the shape of the real content.

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton {
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-text {
  height: 14px;
  margin-bottom: 8px;
  width: 100%;
}

.skeleton-text--short { width: 60%; }
.skeleton-text--heading { height: 20px; width: 40%; }
.skeleton-avatar { width: 40px; height: 40px; border-radius: 50%; }
.skeleton-image { width: 100%; aspect-ratio: 16/9; }
```

```tsx
function CardSkeleton() {
  return (
    <div className="card">
      <div className="skeleton skeleton-image" />
      <div style={{ padding: '16px' }}>
        <div className="skeleton skeleton-text--heading" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text--short" />
      </div>
    </div>
  );
}
```

**Rules:**
- Match the exact layout dimensions of real content. Skeletons that don't match cause layout shift when content loads.
- Use `pulse` animation, not shimmer, unless the design system specifies otherwise. Pulse is simpler and less distracting.
- Show the skeleton for at least 300ms even if data arrives faster. Flash of skeleton is worse than no skeleton.
- Never show skeleton for longer than 5 seconds. If loading takes longer, switch to a message.

### Spinners

Use for unpredictable content or brief waits where you don't know the layout shape.

```tsx
function Spinner({ size = 24 }: { size?: 16 | 24 | 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="spinner"
      aria-label="Loading"
      role="status"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
```

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 600ms linear infinite;
  color: var(--color-text-secondary);
}
```

**Sizing:**
- `16px` — inline, next to text or inside small components
- `24px` — component-level loading (card, section)
- `40px` — page-level loading (centered in viewport)

**Centering a page spinner:**
```css
.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
```

### Progress Bars

Use for operations with known duration or measurable progress — file uploads, multi-step processes, downloads.

```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-bg-tertiary);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 9999px;
  transition: width 300ms ease;
}
```

```tsx
function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress-bar-fill" style={{ width: `${value}%` }} />
    </div>
  );
}
```

### Button Loading

Replace button text with a spinner. Keep the button width stable.

```css
.button-loading {
  position: relative;
  color: transparent;
  pointer-events: none;
  min-width: 120px; /* Prevent width collapse */
}

.button-loading::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-text-inverse);
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}
```

```tsx
<button className={`button ${isLoading ? 'button-loading' : ''}`} disabled={isLoading}>
  Save Changes
</button>
```

**Rules:**
- Set `min-width` on the button before loading starts so it doesn't shrink.
- Disable the button during loading to prevent double-submission.
- Spinner color should match the button text color (use `currentColor` or the inverse text color).

### Inline Loading

Small spinner next to the element being updated — auto-save indicators, inline edits, status refreshes.

```tsx
<div className="inline-loading">
  <Spinner size={16} />
  <span className="inline-loading-text">Saving...</span>
</div>
```

```css
.inline-loading {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
```

### Optimistic Updates

Show the result immediately. Revert on error. Use for actions where failure is rare — likes, toggles, adding to list.

```tsx
function handleLike() {
  setLiked(true);               // Show result immediately
  setCount(prev => prev + 1);
  api.like(postId).catch(() => {
    setLiked(false);            // Revert on failure
    setCount(prev => prev - 1);
    showToast("Couldn't save. Try again.");
  });
}
```

**Rules:**
- Only use for actions that almost never fail.
- Always have a revert path. If the API call fails, undo the UI change.
- Show a toast on failure so the user knows it didn't persist.

### Stale-While-Revalidate

Show cached/stale content immediately, fetch fresh data in the background, update when it arrives.

```tsx
function Dashboard() {
  const { data, isValidating } = useSWR('/api/dashboard');
  return (
    <div>
      {isValidating && <div className="refresh-indicator" aria-label="Refreshing" />}
      <DashboardContent data={data} />
    </div>
  );
}
```

```css
.refresh-indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary);
  animation: indeterminate 1.5s ease infinite;
}

@keyframes indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

### Which Pattern to Use

```
Predictable layout, first load  → Skeleton screen
Unpredictable content, < 1s     → Spinner
Known duration/progress          → Progress bar
Button triggered action          → Button loading spinner
Inline field save                → Inline spinner
Fast, rarely-fails action        → Optimistic update
Returning to cached page         → Stale-while-revalidate
```

### Anti-Patterns — Do NOT

- Use a spinner for everything. Skeleton screens are better for content with predictable layout.
- Show a loading state for less than 300ms. The flash is more jarring than no indicator. Add a minimum display time.
- Block the entire page with a full-screen overlay spinner. Only the loading section should show a loading state.
- Cause layout shift when content replaces the skeleton. The skeleton must match the real content dimensions.
- Show a spinner without `role="status"` and `aria-label="Loading"`. Screen readers need to announce loading state.
- Forget to disable interactive elements during loading. Double-submission is a real bug.
- Use indeterminate spinners for operations with known progress. Show a progress bar instead.
- Leave a skeleton showing indefinitely when there's actually no data. After timeout, transition to an empty state.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Skeletons match real content layout exactly
- Spinners use 600ms rotation, 3 sizes (16/24/40px)
- Buttons keep stable width during loading
- Every loading state has an accessible label

## Notes

[Any project-specific context.]
