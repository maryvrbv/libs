# [Project Name]

[Brief description of what this project does.]

---

## Capability: UI Polish

This project maintains a high visual quality bar. Every component, page, and interaction must be polished before it ships. Polish is not decoration — it's the difference between "works" and "feels right." Apply these principles to all UI code generated or modified.

### Typography System

Use a defined type scale. Never pick arbitrary font sizes.

**Type scale (based on 1.25 ratio):**
```
--text-xs:   0.75rem   (12px)
--text-sm:   0.875rem  (14px)
--text-base: 1rem      (16px)
--text-lg:   1.125rem  (18px)
--text-xl:   1.25rem   (20px)
--text-2xl:  1.5rem    (24px)
--text-3xl:  1.875rem  (30px)
--text-4xl:  2.25rem   (36px)
--text-5xl:  3rem      (48px)
```

**Line height rules:**
```
Headings (text-2xl and above): line-height: 1.2
Body text:                     line-height: 1.5 to 1.6
Small/UI text:                 line-height: 1.4
Buttons and labels:            line-height: 1
```

**Letter spacing:**
```
Large headings (text-4xl+):   -0.02em (tighten)
Regular headings:             -0.01em (slightly tighten)
Body text:                     0 (normal)
All caps / labels:             0.05em to 0.1em (loosen)
Small text:                    0.01em (slightly loosen)
```

**Font weight hierarchy:**
```
Page title:       700 (bold)
Section heading:  600 (semibold)
Card title:       600 (semibold)
Body text:        400 (regular)
Emphasis in body: 500 (medium) — not bold
Labels:           500 (medium)
Caption/meta:     400 (regular)
```

**Rules:**
- Never use more than 3 font weights on a single page.
- Body text must be at least 16px on all devices. Never go below 14px for any readable text.
- Maximum line width for body text: 65-75 characters (~600-700px). Use `max-width: 65ch` on paragraphs.
- Headings and body text should use the same font family unless there is a deliberate design reason to use two families.

### Spacing System

Use an 8px grid for all spacing. Every margin, padding, and gap should be a multiple of 8.

**Spacing scale:**
```css
:root {
  --space-1:  4px;    /* Use sparingly — tight UI elements only */
  --space-2:  8px;    /* Minimum spacing between related elements */
  --space-3:  12px;   /* Tight padding inside small components */
  --space-4:  16px;   /* Default padding, gap between list items */
  --space-5:  20px;   /* Comfortable padding inside cards */
  --space-6:  24px;   /* Section padding, card padding */
  --space-8:  32px;   /* Gap between content blocks */
  --space-10: 40px;   /* Breathing room between sections */
  --space-12: 48px;   /* Large section spacing */
  --space-16: 64px;   /* Page section separation */
  --space-20: 80px;   /* Hero/major section separation */
  --space-24: 96px;   /* Top-level page sections */
}
```

**Spacing principles:**
```
Related items:   8-16px apart  (form label to input, icon to text)
Grouped items:   16-24px apart (cards in a grid, list items)
Sections:        48-96px apart (hero to features, features to CTA)
Page padding:    16px mobile, 24-32px tablet, 32-64px desktop
```

**Rules:**
- Never use arbitrary spacing values like 13px, 17px, or 23px. Stick to the scale.
- Spacing between elements should communicate their relationship: closer = more related.
- Cards and containers need at least 16px internal padding. 24px is the sweet spot.
- The space between a heading and its content should be smaller than the space above the heading. This groups the heading with what follows.
- Page sections need breathing room. If content feels cramped, add more vertical space between sections — never between items within a section.

### Color System

Define colors semantically. Never hardcode hex values in components.

**Color categories:**
```css
:root {
  /* Backgrounds */
  --color-bg:            /* Page background */
  --color-bg-secondary:  /* Alternate sections, sidebars */
  --color-bg-tertiary:   /* Subtle highlights, code blocks */

  /* Surfaces */
  --color-surface:       /* Cards, containers */
  --color-surface-hover: /* Card hover state */
  --color-surface-active:/* Card pressed/active state */

  /* Text */
  --color-text:          /* Primary body text */
  --color-text-secondary:/* Descriptions, metadata */
  --color-text-tertiary: /* Placeholders, hints */
  --color-text-inverse:  /* Text on dark/primary backgrounds */

  /* Borders */
  --color-border:        /* Default borders */
  --color-border-subtle: /* Subtle separators */
  --color-border-focus:  /* Focus ring color */

  /* Brand / Primary */
  --color-primary:       /* Primary actions, links */
  --color-primary-hover: /* Primary hover state */
  --color-primary-active:/* Primary pressed state */
  --color-primary-subtle:/* Primary tinted backgrounds */

  /* Semantic */
  --color-success:       /* Positive states, confirmations */
  --color-success-subtle:/* Success background tint */
  --color-warning:       /* Caution states */
  --color-warning-subtle:/* Warning background tint */
  --color-error:         /* Error states, destructive actions */
  --color-error-subtle:  /* Error background tint */
  --color-info:          /* Informational states */
  --color-info-subtle:   /* Info background tint */
}
```

**60-30-10 distribution rule:**
```
60% — Neutral backgrounds and surfaces (bg, surface, text colors)
30% — Secondary and supporting colors (secondary bg, borders, muted text)
10% — Accent and brand colors (primary actions, highlights, CTAs)
```

**Rules:**
- Never use more than one primary/accent color for actions. Pick one and use it consistently.
- Destructive actions (delete, remove) use `--color-error`, never the primary color.
- Success, warning, error, and info each need a subtle background variant for banners and badges.
- Text on colored backgrounds must pass WCAG AA contrast (4.5:1 for normal text, 3:1 for large text).
- Gray is a color — don't introduce 15 shades of gray. Define 4-5 and use them consistently.
- Never use opacity to create color variants (e.g., `rgba(0,0,0,0.5)` for text). Use explicit colors.

### Interactive States

Every interactive element must have all of these states defined. No exceptions.

**Required states for buttons:**
```css
.button {
  /* Default */
  background: var(--color-primary);
  color: var(--color-text-inverse);
  transition: all 150ms ease;

  /* Hover */
  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  /* Focus */
  &:focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }

  /* Active / Pressed */
  &:active {
    background: var(--color-primary-active);
    transform: translateY(0);
  }

  /* Disabled */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Loading */
  &[data-loading="true"] {
    color: transparent;
    pointer-events: none;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 600ms linear infinite;
    }
  }
}
```

**Required states for inputs:**
```css
.input {
  /* Default */
  border: 1px solid var(--color-border);
  transition: border-color 150ms ease, box-shadow 150ms ease;

  /* Hover */
  &:hover {
    border-color: var(--color-text-tertiary);
  }

  /* Focus */
  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-subtle);
    outline: none;
  }

  /* Error */
  &[aria-invalid="true"] {
    border-color: var(--color-error);
    &:focus {
      box-shadow: 0 0 0 3px var(--color-error-subtle);
    }
  }

  /* Disabled */
  &:disabled {
    background: var(--color-bg-tertiary);
    cursor: not-allowed;
    opacity: 0.6;
  }
}
```

**Required states for links:**
```
Default:   color: var(--color-primary)
Hover:     underline, slightly darker
Visited:   slightly muted (optional, depends on context)
Focus:     same focus ring as buttons
Active:    slightly darker than hover
```

**Required states for cards/list items (when clickable):**
```
Default:   surface background, subtle border or shadow
Hover:     slightly elevated (shadow increase or background shift)
Focus:     focus ring visible
Active:    slight press-down effect
Selected:  primary-tinted border or background
```

**Rules:**
- If an element is interactive, it must look interactive. Hover should provide visual feedback.
- Disabled elements should look distinct but not invisible. Use reduced opacity (0.5) plus `cursor: not-allowed`.
- Loading states must prevent double-submission. Use `pointer-events: none` during loading.
- Never remove focus indicators. Use `:focus-visible` to show them only on keyboard navigation.
- Error states on form fields need more than just a red border — pair with an error message below the field.

### Empty States

Every list, table, feed, search result, and data view must have an empty state designed.

**Pattern:**
```
[Illustration or icon]
[Headline — what's missing]
[Description — why and what to do]
[Primary action — CTA button]
```

**Examples:**
```
Icon: 📋
Headline: "No projects yet"
Description: "Create your first project to get started."
Action: [Create Project] button

Icon: 🔍
Headline: "No results found"
Description: "Try adjusting your search or filters."
Action: [Clear Filters] button
```

**Rules:**
- Never show a blank page or an empty container with no explanation.
- Empty state copy should be encouraging, not clinical. "No projects yet" is better than "0 projects found."
- Always include a clear primary action that resolves the empty state.
- Search-no-results states should suggest what to try next.
- First-time user empty states are different from returning-user-with-deleted-data empty states. The first should be welcoming and instructional.

### Error States

Every operation that can fail must have a designed error state.

**Form validation errors:**
```html
<div class="field field--error">
  <label for="email">Email</label>
  <input id="email" type="email" aria-invalid="true" aria-describedby="email-error" />
  <p id="email-error" class="field-error" role="alert">
    Please enter a valid email address.
  </p>
</div>
```

**Page-level errors:**
```
Icon: ⚠️
Headline: "Something went wrong"
Description: Specific explanation of what failed.
Action: [Try Again] button + [Contact Support] link
```

**Rules:**
- Inline validation errors appear below the field, not in a toast or alert.
- Error messages must say what went wrong AND how to fix it. "Invalid input" is not acceptable. "Email must include an @ symbol" is.
- Network errors should offer a retry action.
- Never show raw error codes or stack traces to users.
- Error states must be visually distinct (red border, error icon) and accessible (role="alert", aria-invalid).

### Micro-Interactions and Transitions

Transitions make the UI feel responsive and alive. They are not decoration — they communicate state changes.

**Timing rules:**
```
Hover feedback:       100-150ms  (instant feel)
Button press:         100-150ms  (immediate response)
Dropdown/popover:     150-200ms  (quick reveal)
Modal open:           200-250ms  (smooth entrance)
Modal close:          150-200ms  (slightly faster than open)
Page transitions:     200-300ms  (smooth but not slow)
Complex animations:   300-500ms  (loading, skeleton)
```

**Easing:**
```
Default:              ease or cubic-bezier(0.4, 0, 0.2, 1)
Enter (appear):       cubic-bezier(0, 0, 0.2, 1)  — decelerate in
Exit (disappear):     cubic-bezier(0.4, 0, 1, 1)   — accelerate out
Bounce/spring:        cubic-bezier(0.34, 1.56, 0.64, 1)  — use sparingly
```

**Standard transitions to always include:**
```css
/* Buttons */
.button {
  transition: background-color 150ms ease,
              transform 150ms ease,
              box-shadow 150ms ease;
}

/* Cards */
.card {
  transition: box-shadow 200ms ease,
              transform 200ms ease;
}
.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Inputs */
.input {
  transition: border-color 150ms ease,
              box-shadow 150ms ease;
}

/* Links */
a {
  transition: color 150ms ease;
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Skeleton loading */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg,
    var(--color-bg-tertiary) 25%,
    var(--color-bg-secondary) 50%,
    var(--color-bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}
```

**Rules:**
- Every state change should have a transition. No instant snapping between states.
- Respect `prefers-reduced-motion` — disable all non-essential animations.
- Transitions should be fast. If the user notices the animation duration, it's too slow.
- Hover transitions are instant-feel (100-150ms). Anything over 200ms feels sluggish.
- Loading states need either a spinner, a skeleton, or a progress bar. Never leave the user staring at unchanged UI during an async operation.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Responsive Design

Build mobile-first. The base styles are for mobile; layer on complexity for larger screens.

**Breakpoints:**
```css
/* Mobile first — base styles apply to all sizes */

/* Tablet and up */
@media (min-width: 768px) { }

/* Desktop and up */
@media (min-width: 1024px) { }

/* Wide desktop */
@media (min-width: 1440px) { }
```

**Touch targets:**
- All interactive elements must be at least 44x44px on mobile.
- Spacing between tap targets must be at least 8px.
- Buttons in mobile nav should be full-width or nearly full-width.

**Typography scaling:**
```
Mobile (base):     text sizes as defined in type scale
Tablet (768px+):   increase headings by ~1 step
Desktop (1024px+): increase headings by ~1-2 steps
```

**Layout patterns:**
```
Mobile:  single column, stacked layout
Tablet:  2-column grids, sidebar appears
Desktop: multi-column, full navigation, expanded cards
```

**Rules:**
- Never use `px` media queries below 768px for layout. If something looks wrong at 375px, fix the base styles.
- Horizontal scrolling is a bug. Test at 320px width — nothing should overflow.
- Images must be responsive: `max-width: 100%; height: auto;` as a baseline.
- Navigation should collapse to a hamburger or bottom nav on mobile.
- Forms should be single-column on mobile. Side-by-side fields only on tablet and above.
- Modals should be full-screen or bottom-sheet on mobile.

### Shadows and Elevation

Shadows communicate depth and hierarchy.

**Shadow scale:**
```css
:root {
  --shadow-xs:  0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md:  0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.04);
  --shadow-xl:  0 20px 25px rgba(0, 0, 0, 0.08), 0 8px 10px rgba(0, 0, 0, 0.04);
}
```

**Usage:**
```
No shadow:     flat elements, inline content
--shadow-xs:   subtle separation (input fields, tags)
--shadow-sm:   cards at rest
--shadow-md:   cards on hover, dropdowns
--shadow-lg:   modals, popovers
--shadow-xl:   dialogs, notification panels
```

**Rules:**
- Shadows should be subtle. If you can see the shadow clearly, it's probably too heavy.
- Higher elevation = larger, softer shadow. Don't use small sharp shadows for high-elevation elements.
- Use multi-layer shadows (two values) for more natural-looking depth.
- In dark mode, switch to borders or lighter surfaces instead of shadows.

### Border Radius

Use consistent border radius values.

```css
:root {
  --radius-sm:   4px;   /* Tags, badges, small elements */
  --radius-md:   8px;   /* Buttons, inputs, cards */
  --radius-lg:   12px;  /* Large cards, containers */
  --radius-xl:   16px;  /* Modals, prominent containers */
  --radius-full: 9999px; /* Pills, avatars, circular buttons */
}
```

**Rules:**
- Nested elements with rounded corners need smaller radius on inner elements. If a card has 12px radius, elements inside it should use 8px or less.
- Be consistent — don't mix 4px and 6px and 8px radius arbitrarily. Pick from the scale.
- Buttons and inputs should use the same radius. They often appear side by side.

### Icons

**Rules:**
- Use a consistent icon set throughout the project. Don't mix icon libraries.
- Icons must have consistent sizing: 16px (inline), 20px (default), 24px (large).
- Icons in buttons should be the same visual weight as the text. Adjust `stroke-width` if needed.
- Icon-only buttons need `aria-label`. Always.
- Icons should have `aria-hidden="true"` when used alongside text.
- Color should match the text color using `currentColor`.

### Loading States

Every async operation needs a loading state.

**Patterns:**
```
Button action:    inline spinner replacing button text, button disabled
Page load:        skeleton screens matching the page layout
Data fetch:       skeleton placeholders for each data row/card
Navigation:       progress bar at the top of the page
Image loading:    placeholder with aspect ratio preserved, fade in on load
Form submission:  button shows spinner, form fields disabled
```

**Skeleton screen rules:**
- Skeletons should match the approximate shape and size of the content they replace.
- Use the shimmer animation defined in the micro-interactions section.
- Don't show skeleton for more than 3-5 seconds. If loading takes longer, switch to a progress indicator or message.
- Skeleton + subtle animation is better than a centered spinner for content-heavy pages.

### The Quality Bar

Before any UI is considered complete, verify all of the following:

**Content:**
- [ ] No placeholder text ("Lorem ipsum", "[Title here]", "TODO")
- [ ] No placeholder images or broken image links
- [ ] Real or realistic content in all components
- [ ] Truncation handled for long text (ellipsis, line clamp, or expand)

**Visual consistency:**
- [ ] All font sizes from the type scale — no arbitrary sizes
- [ ] All spacing from the spacing scale — no arbitrary values
- [ ] All colors from the color system — no hardcoded hex values
- [ ] Consistent border radius across similar elements
- [ ] Consistent shadow usage following the elevation hierarchy

**States:**
- [ ] Hover state on all interactive elements
- [ ] Focus-visible state on all interactive elements
- [ ] Disabled state where applicable
- [ ] Loading state for all async operations
- [ ] Error state for all operations that can fail
- [ ] Empty state for all lists, tables, and data views

**Responsive:**
- [ ] Works at 320px width — no horizontal scrolling
- [ ] Works at 375px width (iPhone SE)
- [ ] Works at 768px width (tablet portrait)
- [ ] Works at 1024px width (tablet landscape / small desktop)
- [ ] Works at 1440px width (standard desktop)
- [ ] Touch targets are 44px minimum on mobile

**Polish details:**
- [ ] Transitions on all state changes (hover, focus, active)
- [ ] No layout shifts during loading
- [ ] Images have correct aspect ratios (not stretched or squished)
- [ ] Scroll behavior is smooth where appropriate
- [ ] No z-index conflicts (modals above popovers above dropdowns above content)
- [ ] Favicon and page title are set

### Anti-Patterns — Do NOT

- Use arbitrary "magic number" values for spacing, font sizes, or colors. Everything from the scale.
- Hardcode colors in component styles. Always use CSS custom properties.
- Skip hover states on interactive elements. If it's clickable, it needs hover feedback.
- Leave empty states blank. Every empty list needs an empty state.
- Show raw error messages from APIs. Translate them into human-readable messages.
- Use spinners for everything. Match the loading pattern to the content type.
- Neglect keyboard navigation. Every mouse interaction must have a keyboard equivalent.
- Add transitions longer than 300ms for UI interactions. Speed is polish.
- Use `!important` to fix styling conflicts. Fix the specificity issue instead.
- Add unnecessary visual complexity. When in doubt, simplify.
- Ship with placeholder content. Real content or realistic dummy content only.
- Ignore text truncation. Long strings will break your layout.
- Mix icon libraries or sizes within the same project.
- Use pure black (#000) for text on pure white (#fff) backgrounds. Use off-black (#111827 or similar).
- Forget about the space between the last content and the bottom of the page. Add bottom padding.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All spacing values from the 8px grid
- All colors as CSS custom properties
- All interactive elements have hover, focus, disabled states
- Mobile-first responsive design
- Transitions on all state changes

## Notes

[Any project-specific context.]
