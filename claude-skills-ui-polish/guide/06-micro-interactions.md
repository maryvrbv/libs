# Micro-Interactions

Micro-interactions are small animations that communicate state changes. A button that subtly scales when pressed. A toast that slides in from the edge of the screen. A page that fades in instead of snapping into existence. None of these change functionality. All of them change how the app feels.

AI-generated UI has zero motion by default. Everything is instant — click and the new state appears. That's technically correct and experientially flat. Adding a handful of targeted transitions takes your app from "functional prototype" to "someone actually designed this."

## The Three Transitions Every App Needs

You don't need a motion design system. You need three things.

**Page transitions.** When the user navigates to a new route, the incoming content should fade in. A simple opacity transition from 0 to 1 over 200ms. That's it. No sliding, no zooming, no elaborate choreography. Just a fade so the page doesn't slam into existence.

**Hover feedback.** Every button and interactive card needs a visible transition on hover. Background color shifts, shadow lifts, or subtle border changes — transitioned over 150ms. Without this, the interface feels static and unresponsive. The user should feel like the UI is acknowledging their cursor.

**State changes.** When something appears or disappears — a toast, a dropdown, a modal, an accordion — it should animate in and out. Slide and fade for toasts. Scale and fade for modals. Height transition for accordions. The appearance should take 200-300ms. The disappearance should be slightly faster at 150-200ms.

## Timing

- **150ms** — hover effects, button presses, color changes. Fast enough to feel instant but smooth enough to register.
- **200-300ms** — elements entering the screen. Toasts, modals, page content, dropdowns.
- **150-200ms** — elements leaving the screen. Exits should be faster than entrances.
- **Ease-out** (`cubic-bezier(0.0, 0, 0.2, 1)`) for elements entering. They arrive fast and settle in.
- **Ease-in** (`cubic-bezier(0.4, 0, 1, 1)`) for elements exiting. They start slow and accelerate out.

Never exceed 400ms for any UI transition. Anything longer feels sluggish.

## What NOT to Animate

- Decorative flourishes that serve no purpose (bouncing icons, pulsing logos)
- Layout shifts — content should never push other content around with animation
- Scroll-triggered animations on every element (the "everything fades in as you scroll" pattern is exhausting)
- Anything that loops continuously without user interaction

If the animation doesn't communicate a state change, cut it.

## Specific Patterns

**Button press:** `active:scale-95` with `transition-transform duration-100`. The button shrinks 5% on press for 100ms. Subtle, tactile, done.

**Button hover:** `hover:bg-primary/90` with `transition-colors duration-150`. Darken the background slightly over 150ms.

**Toast entrance:** Slide in from the top or bottom edge, fade from 0 to 1. `translate-y` from -100% to 0, opacity from 0 to 1, over 250ms with ease-out. Auto-dismiss after 5 seconds with the reverse animation.

**Modal entrance:** Scale from 95% to 100%, opacity from 0 to 1, over 200ms with ease-out. Backdrop fades in simultaneously.

**Accordion expand:** Animate `max-height` from 0 to content height, or use `grid-template-rows: 0fr` to `1fr`, over 250ms.

## Respect Reduced Motion

Some users have vestibular disorders or simply prefer no animation. Wrap all motion in a `prefers-reduced-motion` check.

In CSS:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

In Tailwind, use the `motion-safe:` prefix: `motion-safe:transition-all motion-safe:duration-200`.

This is not optional. Ship it from day one.

## Prompts That Work

To add transitions across your app:

```
Add micro-interactions to the app:
1. All buttons: transition-colors duration-150 on hover, active:scale-95 transition-transform duration-100 on press
2. All modals/dialogs: animate in with scale 95→100% + opacity 0→1 over 200ms ease-out
3. All toast notifications: slide in from top with fade, auto-dismiss after 5s with reverse animation
4. Page transitions: fade in new route content over 200ms
5. Wrap all animations in prefers-reduced-motion media query — users who prefer reduced motion should see instant state changes with no animation
```

To fix motion that feels wrong:

```
Audit all transitions and animations in the app. Fix any that:
- Exceed 300ms duration (make them faster)
- Use linear easing (switch to ease-out for entrances, ease-in for exits)
- Animate layout properties like width/height (switch to transform/opacity)
- Don't respect prefers-reduced-motion
```

Motion is seasoning. A little makes everything better. Too much ruins the dish. Add the three core transitions, check your timing, respect user preferences, and stop there.
