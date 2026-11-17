# [Project Name]

[Brief description of what this project does.]

---

## Capability: Quick Polish

This is the all-in-one polish file. Drop it into any project and it fixes the five most common reasons a UI looks unfinished: bad typography, inconsistent spacing, broken color usage, missing states, and janky interactions. This covers 80% of polish issues in one file. Use the individual skill files only when you need to go deeper on a specific area.

### 1. Typography

A type system creates visual hierarchy without effort. Apply this scale to every text element in the project.

**The 1.25 Type Scale:**

```css
:root {
  --text-xs: 0.75rem;    /* 12px — captions, badges, metadata */
  --text-sm: 0.875rem;   /* 14px — secondary text, table cells, helper text */
  --text-base: 1rem;     /* 16px — body text, default size */
  --text-lg: 1.25rem;    /* 20px — card titles, section labels */
  --text-xl: 1.5rem;     /* 24px — page subtitles, large card titles */
  --text-2xl: 2rem;      /* 32px — page titles, hero subtitles */
  --text-3xl: 2.5rem;    /* 40px — hero headings on desktop */
  --text-4xl: 3rem;      /* 48px — display headings, landing pages only */
}
```

**Line height and spacing:**

```css
/* Body text: generous line height for readability */
body {
  font-size: var(--text-base);
  line-height: 1.5;
  letter-spacing: 0;
}

/* Headings: tighter line height, slight negative letter spacing */
h1, h2, h3, h4, h5, h6 {
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* Small text: slightly more line height for legibility */
.text-sm, .text-xs {
  line-height: 1.6;
}
```

**Rules:**
- Max 2 font families. One for headings, one for body. Or one for everything.
- Body text is always `var(--text-base)` (16px). Never smaller for primary content.
- Every text element must use a step from the scale. No custom font sizes.
- `font-weight: 400` for body, `500` for emphasis, `600` for headings, `700` for hero headings. No other weights.
- Max line length: `65ch` for body text. Apply `max-width: 65ch` to paragraphs and article content.

**Tailwind shorthand:**
```jsx
// Body: text-base, leading-normal (1.5)
// Headings: text-2xl font-semibold tracking-tight leading-tight
// Secondary: text-sm text-muted-foreground
// Caption: text-xs text-muted-foreground
```

### 2. Spacing

Consistent spacing is the single fastest way to make a UI look professional. Every margin, padding, and gap must come from this scale.

**The 8px Grid:**

```css
:root {
  --space-1: 4px;    /* 0.25rem — tight internal padding, icon gaps */
  --space-2: 8px;    /* 0.5rem — inline element gaps, tight padding */
  --space-3: 12px;   /* 0.75rem — compact card padding, small gaps */
  --space-4: 16px;   /* 1rem — default padding, form gaps, list gaps */
  --space-6: 24px;   /* 1.5rem — card padding, section internal spacing */
  --space-8: 32px;   /* 2rem — section gaps, large card padding */
  --space-12: 48px;  /* 3rem — major section separation */
  --space-16: 64px;  /* 4rem — page section separation */
  --space-24: 96px;  /* 6rem — hero padding, page-level breathing room */
}
```

**Application rules:**

```css
/* Cards */
.card {
  padding: var(--space-6);           /* 24px internal padding */
  gap: var(--space-4);               /* 16px between card children */
  border-radius: 12px;
}

/* Card grids */
.card-grid {
  display: grid;
  gap: var(--space-4);               /* 16px between cards */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* Page sections */
.section {
  padding: var(--space-12) 0;        /* 48px vertical section padding */
}

/* Form fields */
.form-group {
  margin-bottom: var(--space-4);     /* 16px between form fields */
}

/* Content containers */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);         /* 16px horizontal padding */
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-8);       /* 32px on tablet+ */
  }
}
```

**The spacing hierarchy:** Section spacing (48-64px) > component spacing (16-24px) > element spacing (4-8px). If two levels feel the same, the hierarchy is broken.

**Rules:**
- Every spacing value must come from the scale. No magic numbers.
- Padding inside components: `16px` or `24px`. Pick one and stay consistent within a component type.
- Gap between sibling components: `16px` for tight layouts, `24px` for standard, `32px` for loose.
- Content max-width: `1200px` for app layouts, `768px` for text-heavy content, `480px` for forms and auth pages.
- Mobile padding: minimum `16px` horizontal padding on all containers.

### 3. Color

A semantic color system means you never hardcode hex values in components. Every color has a purpose.

**Semantic Tokens:**

```css
:root {
  /* Surfaces */
  --background: #ffffff;             /* Page background */
  --foreground: #0a0a0a;             /* Primary text */
  --card: #ffffff;                   /* Card/panel background */
  --card-foreground: #0a0a0a;        /* Card text */

  /* Muted */
  --muted: #f5f5f5;                  /* Subtle backgrounds, disabled states */
  --muted-foreground: #737373;       /* Secondary text, placeholders */

  /* Interactive */
  --primary: #171717;                /* Primary buttons, links */
  --primary-foreground: #fafafa;     /* Text on primary */
  --accent: #f5f5f5;                 /* Hover backgrounds, active states */
  --accent-foreground: #171717;      /* Text on accent */

  /* Semantic */
  --destructive: #dc2626;            /* Errors, delete actions */
  --destructive-foreground: #fafafa; /* Text on destructive */
  --success: #16a34a;                /* Success states, confirmations */
  --warning: #f59e0b;                /* Warnings, caution states */

  /* Borders */
  --border: #e5e5e5;                 /* Default borders */
  --input: #e5e5e5;                  /* Input borders */
  --ring: #171717;                   /* Focus rings */
}
```

**The 60-30-10 Rule:**
- **60% background/foreground** — the dominant surface and text colors
- **30% muted/accent** — secondary surfaces, hover states, subtle UI
- **10% primary/destructive** — CTAs, key actions, critical states

**Rules:**
- Never use hardcoded hex values in components. Always reference tokens: `var(--primary)` or `bg-primary` in Tailwind.
- Text contrast: minimum 4.5:1 ratio for body text, 3:1 for large text (18px+). Test with a contrast checker.
- Don't use color as the only indicator. Error states need color + icon + text. Never rely on red alone.
- Borders: use `var(--border)` for all decorative borders. Use `var(--input)` for form inputs. Use `var(--ring)` for focus states.
- Dark mode: if supported, define all tokens for both themes. If not supported, don't use pure black (`#000`) or pure white (`#fff`) — they're too harsh.

**Tailwind usage:**
```jsx
// Surface: bg-background text-foreground
// Card: bg-card text-card-foreground border border-border rounded-xl
// Muted text: text-muted-foreground
// Primary button: bg-primary text-primary-foreground hover:bg-primary/90
// Destructive: bg-destructive text-destructive-foreground
// Input: border-input focus:ring-ring
```

### 4. States

Every interactive element must communicate its current state. Missing states make the UI feel broken.

**Button States (required for every button):**

```css
.btn {
  cursor: pointer;
  transition: background-color 150ms ease, opacity 150ms ease, transform 150ms ease;
}

.btn:hover {
  opacity: 0.9;
  /* or shift background: background-color: var(--primary-hover); */
}

.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);
}

.btn:active {
  transform: scale(0.97);
}

.btn:disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
```

**Input States (required for every input):**

```css
.input {
  border: 1px solid var(--input);
  border-radius: 8px;
  padding: 8px 12px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.input:focus {
  outline: none;
  border-color: var(--ring);
  box-shadow: 0 0 0 2px var(--ring) / 0.2;
}

.input[aria-invalid="true"],
.input.error {
  border-color: var(--destructive);
}

.input:disabled {
  background-color: var(--muted);
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Empty States (required for every list, table, feed, search result):**

```jsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <IconComponent className="h-12 w-12 text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold mb-1">No projects yet</h3>
  <p className="text-sm text-muted-foreground mb-4 max-w-sm">
    Create your first project to get started.
  </p>
  <button className="btn btn-primary">Create project</button>
</div>
```

**Loading States (required for every async operation):**

```jsx
// Button loading
<button disabled={isLoading}>
  {isLoading && <Spinner className="h-4 w-4 animate-spin mr-2" />}
  {isLoading ? "Saving..." : "Save changes"}
</button>

// Content loading — use skeleton screens
<div className="animate-pulse space-y-3">
  <div className="h-4 bg-muted rounded w-3/4" />
  <div className="h-4 bg-muted rounded w-1/2" />
  <div className="h-4 bg-muted rounded w-5/6" />
</div>

// Full page loading
<div className="flex items-center justify-center min-h-[400px]">
  <Spinner className="h-8 w-8 animate-spin text-muted-foreground" />
</div>
```

**Form Submission Feedback (required for every form):**

```jsx
// Success: show toast or inline message
<div className="text-sm text-success flex items-center gap-2">
  <CheckIcon className="h-4 w-4" />
  Changes saved.
</div>

// Error: show inline below the field
<div className="text-sm text-destructive mt-1">
  Email is already registered.
</div>
```

**State Checklist — apply to every view:**
- [ ] Every button: default, hover, focus-visible, active, disabled, loading
- [ ] Every input: default, focus, error, disabled
- [ ] Every list/table/feed: populated state + empty state
- [ ] Every async operation: loading indicator
- [ ] Every form: success feedback + error feedback
- [ ] Every destructive action: confirmation dialog

### 5. Interactions

Motion makes a UI feel responsive. Too much motion makes it feel slow. These are the defaults.

**Hover Transitions:**

```css
/* Apply to all interactive elements */
.interactive {
  transition-property: background-color, border-color, color, opacity, transform, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease;
}
```

**Entrance Animations:**

```css
/* Fade in — default for appearing elements */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up — for modals, toasts, cards entering view */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scale in — for dropdowns, popovers */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-in {
  animation: slideUp 200ms ease-out;
}

.dropdown-enter {
  animation: scaleIn 150ms ease-out;
}
```

**Exit Animations:**

```css
/* Exits are faster than entrances and use ease-in */
.animate-out {
  animation: fadeOut 150ms ease-in;
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

**Timing Rules:**
- Hover transitions: `150ms`
- Entrance animations: `200-300ms` with `ease-out`
- Exit animations: `100-150ms` with `ease-in`
- Nothing over `400ms`. Anything longer feels sluggish.
- Ease-out for entering (decelerates into place). Ease-in for exiting (accelerates away).

**Reduced Motion:**

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

This is non-negotiable. Every project must include this media query. Users who set `prefers-reduced-motion` have a medical or personal reason. Respect it.

**Scroll behavior:**
```css
html {
  scroll-behavior: smooth;
}

/* But respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

### Quality Bar

A view is "polished" when all of the following are true. Use this as a checklist before calling anything done.

**Typography:**
- [ ] All text uses the type scale — no custom font sizes
- [ ] Body text is 16px with 1.5 line height
- [ ] Headings use tracking-tight (letter-spacing: -0.02em)
- [ ] Max 2 font families in use
- [ ] Content max-width is set (65ch for prose, 1200px for layouts)

**Spacing:**
- [ ] All spacing comes from the 8px grid — no magic numbers
- [ ] Section spacing > component spacing > element spacing
- [ ] Cards have consistent internal padding (16px or 24px)
- [ ] Mobile containers have minimum 16px horizontal padding
- [ ] Content has a max-width and is centered

**Color:**
- [ ] No hardcoded hex values in components — all use semantic tokens
- [ ] Text passes 4.5:1 contrast ratio
- [ ] Color is never the sole indicator of state (error, success, warning)
- [ ] 60-30-10 distribution is visually balanced
- [ ] Borders use the border token, not custom grays

**States:**
- [ ] Every button has hover, focus-visible, active, disabled states
- [ ] Every input has focus, error, disabled states
- [ ] Every list has an empty state with icon + heading + description + CTA
- [ ] Every async action shows a loading indicator
- [ ] Every form shows success and error feedback
- [ ] Every destructive action has a confirmation step

**Interactions:**
- [ ] Hover transitions are 150ms ease
- [ ] Entrance animations are 200-300ms ease-out
- [ ] Exit animations are 100-150ms ease-in
- [ ] No animation exceeds 400ms
- [ ] `prefers-reduced-motion` is respected
- [ ] Focus rings are visible for keyboard navigation

### Anti-Patterns

Do NOT do any of the following:

- **Custom font sizes outside the scale.** If 20px isn't in your scale, you don't use 20px. Adjust the scale, don't bypass it.
- **Spacing values that aren't on the grid.** `padding: 13px` or `margin: 7px` — these are red flags. Snap to the grid.
- **Hardcoded colors.** `color: #6b7280` in a component is a maintenance disaster. Use `text-muted-foreground` or `var(--muted-foreground)`.
- **Missing hover states.** If the user can click it, it must respond on hover. No exceptions.
- **Missing focus-visible styles.** Keyboard users need to see where they are. Removing focus styles breaks accessibility.
- **Missing empty states.** A blank screen with no guidance is a UX failure. Every data-driven view needs an empty state.
- **Animations over 400ms.** Anything longer makes the user wait for the UI. Animation should feel instant.
- **Ignoring prefers-reduced-motion.** This is an accessibility requirement. Not optional.
- **Inconsistent border-radius.** If cards use `12px` radius, buttons should use `8px`, and inputs `8px`. Define the radii and stick to them.
- **Content without max-width.** A paragraph spanning 1400px of screen is unreadable. Constrain it.
- **Mixing spacing systems.** Using `16px` here and `15px` there because "close enough." It's not close enough. The inconsistency is visible.
- **Multiple primary colors.** One accent color for CTAs. If everything is highlighted, nothing is.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All sizes, spacing, and colors come from the defined scales and tokens
- Every interactive element implements all required states
- All animations respect prefers-reduced-motion
- The Quality Bar checklist passes before any view is considered done

## Notes

[Any project-specific context.]
