# [Project Name]

[Brief description of what this project does.]

---

## Capability: Animation Polish

This project uses a defined micro-interaction system. Every transition has a specific duration, easing function, and purpose. Animations are not decoration — they communicate state changes and make the UI feel responsive. Fast, subtle, purposeful. If the user notices the animation itself, it's too much.

### Transition Custom Properties

```css
:root {
  /* Durations */
  --duration-instant:  100ms;  /* Button press, toggle snap */
  --duration-fast:     150ms;  /* Hover feedback, color changes */
  --duration-normal:   200ms;  /* State changes, small reveals */
  --duration-smooth:   250ms;  /* Modal entrance, panel slides */
  --duration-slow:     300ms;  /* Complex entrances, page transitions */

  /* Easing */
  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);    /* Entrances — decelerate in */
  --ease-in:     cubic-bezier(0.4, 0.0, 1, 1);       /* Exits — accelerate out */
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);     /* Transforms, repositioning */

  /* Shorthand transitions */
  --transition-hover:     150ms var(--ease-out);
  --transition-state:     200ms var(--ease-in-out);
  --transition-entrance:  300ms var(--ease-out);
  --transition-exit:      200ms var(--ease-in);
}
```

### Duration Rules

```
150ms — Hover effects (background-color, border-color, text color)
         Feels instant. The user sees the result, not the animation.

200ms — State changes (active/inactive, open/close, selected/deselected)
         Quick enough to feel responsive, smooth enough to track.

300ms — Entrance animations (modals appearing, content sliding in, toasts)
         Gives the eye time to register where the element came from.

200ms — Exit animations (modals closing, elements disappearing)
         Exits are always faster than entrances. Don't linger.

100ms — Micro-feedback (button press scale, toggle switch snap)
         Near-instant tactile response.
```

### Easing Rules

```
ease-out  → Use for entrances. Element decelerates as it arrives.
             The element "settles into place." Natural and confident.

ease-in   → Use for exits. Element accelerates as it leaves.
             The element "falls away." Quick and decisive.

ease-in-out → Use for transforms (repositioning, scaling, rotating).
               Smooth start and end. Best for movement that stays on screen.

linear    → Almost never. Only for infinite looping animations (spinners,
             progress bars). Never for UI transitions.
```

### Interaction Patterns

**Button hover — background color shift:**
```css
.button {
  transition: background-color var(--transition-hover),
              box-shadow var(--transition-hover);
}
.button:hover {
  background-color: var(--color-accent-hover);
}
```

**Button press — scale feedback:**
```css
.button:active {
  transform: scale(0.97);
  transition: transform 100ms var(--ease-in-out);
}
```

**Card hover — lift with shadow:**
```css
.card {
  transition: box-shadow var(--transition-state),
              transform var(--transition-state);
}
.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
```

**Modal entrance — fade and scale up:**
```css
.modal-overlay {
  opacity: 0;
  transition: opacity var(--transition-entrance);
}
.modal-overlay.is-open {
  opacity: 1;
}

.modal {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 250ms var(--ease-out),
              transform 250ms var(--ease-out);
}
.modal.is-open {
  opacity: 1;
  transform: scale(1);
}
```

**Modal exit — fade and scale down (faster):**
```css
.modal.is-closing {
  opacity: 0;
  transform: scale(0.97);
  transition: opacity 150ms var(--ease-in),
              transform 150ms var(--ease-in);
}
```

**Toast notification — slide in from bottom:**
```css
.toast {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity var(--transition-entrance),
              transform var(--transition-entrance);
}
.toast.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Accordion expand — height and opacity:**
```css
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 250ms var(--ease-in-out),
              opacity 250ms var(--ease-in-out);
}
.accordion-content.is-expanded {
  grid-template-rows: 1fr;
  opacity: 1;
}
.accordion-content > div {
  overflow: hidden;
}
```

**Tab content switch — opacity crossfade:**
```css
.tab-panel {
  opacity: 0;
  transition: opacity 150ms var(--ease-in-out);
}
.tab-panel.is-active {
  opacity: 1;
}
```

### Reduced Motion

Users who prefer reduced motion must still get a functional experience. Remove transforms, keep opacity fades, and shorten durations.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 100ms !important;
    animation-duration: 100ms !important;
    animation-iteration-count: 1 !important;
  }

  /* Remove all transforms — keep opacity fades */
  .card:hover {
    transform: none !important;
  }
  .button:active {
    transform: none !important;
  }
  .modal {
    transform: none !important;
  }
  .toast {
    transform: none !important;
  }
}
```

The key principle: reduced motion means reduced, not removed. Opacity transitions at 100ms still communicate state changes without triggering motion sensitivity.

### [Project-Specific Animations]

[Define any custom animations beyond the standard patterns — loading spinners, skeleton shimmer, page transitions, scroll-triggered reveals. Specify if the project uses a specific animation library (Framer Motion, GSAP, etc.) and how the timing tokens map to that library's API.]

### Anti-Patterns — Do NOT

- Use durations over 400ms for any UI interaction. If it takes longer than 400ms, it feels sluggish. The only exceptions are complex page transitions or deliberate slow reveals.
- Animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`). These trigger layout recalculation and cause jank. Use `transform` (translateX, translateY, scale) and `opacity` — they're GPU-accelerated and smooth.
- Use bouncy or elastic easing for standard UI elements. `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot) is for playful illustration, not for buttons and modals. Stick to ease-out and ease-in.
- Apply both entrance and exit animations to the same CSS class. Entrances and exits need different timing and easing. Use separate states (`.is-open` / `.is-closing`) or handle exit in JavaScript.
- Use `transition: all` — it's lazy and catches properties you didn't intend to animate. Always list specific properties: `transition: opacity 200ms, transform 200ms`.
- Animate on page load without user interaction. Content should be visible immediately. Scroll-triggered animations are acceptable if subtle and fast.
- Add delays to hover effects. Hover response must be immediate. Delays make the UI feel broken.
- Use `animation` when `transition` will do. Transitions are for state changes (A to B). Keyframe animations are for continuous or multi-step effects only.
- Forget to test at 2x speed. If the animation looks fine at double speed, the original was probably too slow. Ship the faster version.
- Skip `prefers-reduced-motion`. It's not optional. Some users get physically ill from motion. Respect the preference.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All durations and easings from CSS custom properties
- ease-out for entrances, ease-in for exits
- Exits faster than entrances
- Transform and opacity only — no layout property animations
- prefers-reduced-motion always respected

## Notes

[Any project-specific context.]
