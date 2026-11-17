# [Project Name]

[Brief description of what this project does.]

---

## Capability: Responsive Polish

This project works on every screen size — from 320px phones to 1440px+ desktops. Responsive design is not an afterthought; it is the foundation. Build mobile-first and layer on complexity for larger screens.

### Mobile-First Approach

Base styles target mobile. Media queries add layout for larger screens. Never write desktop-first CSS and then try to "fix" mobile.

```css
/* Base: mobile (no media query needed) */
.container {
  padding: 16px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .container {
    padding: 24px;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Wide: 1440px+ */
@media (min-width: 1440px) {
  .container {
    max-width: 1400px;
  }
}
```

### Breakpoints

Test at these specific widths. If it works at all five, it works everywhere.

```
320px  — Smallest phones (iPhone SE, Galaxy S series)
375px  — Standard phones (iPhone 13/14/15)
768px  — Tablets portrait (iPad)
1024px — Tablets landscape / small laptops
1440px — Standard desktop monitors
```

**Rules:**
- Everything must work at 320px. No horizontal scrolling, no overflow, no cut-off content.
- Don't add breakpoints for every small issue. The five above cover 99% of cases.
- If something looks wrong between breakpoints, fix the base/fluid styles — don't add a one-off media query.

### Touch Targets

Every interactive element must be comfortably tappable on mobile.

**Minimum size: 44x44px** (WCAG 2.5.5 / Apple HIG / Material Design)

```css
/* Ensure all interactive elements meet the minimum */
button, a, input, select, textarea, [role="button"] {
  min-height: 44px;
}

/* Icon buttons need explicit sizing */
.icon-button {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Spacing between adjacent touch targets */
.button-group {
  gap: 8px;
}

/* Checkbox and radio — expand hit area */
.checkbox-wrapper {
  display: flex;
  align-items: center;
  min-height: 44px;
  gap: 12px;
  cursor: pointer;
}
```

**Rules:**
- Padding counts toward touch target size. A 16px-tall text link with 14px vertical padding = 44px target.
- Adjacent touch targets need at least 8px gap to prevent mis-taps.
- Small icons (16px) need a larger invisible tap area around them.
- Links in body text are exempt from the 44px rule (inline links flow with text), but navigation and action links need full touch targets.

### Typography Scaling

Font sizes should feel appropriate at every screen size. Headings scale down on mobile; body text stays readable.

```css
/* Mobile base */
h1 { font-size: 1.875rem; }  /* 30px */
h2 { font-size: 1.5rem; }    /* 24px */
h3 { font-size: 1.25rem; }   /* 20px */
body { font-size: 1rem; }    /* 16px — never smaller on mobile */

/* Tablet: 768px+ */
@media (min-width: 768px) {
  h1 { font-size: 2.25rem; }  /* 36px */
  h2 { font-size: 1.875rem; } /* 30px */
  h3 { font-size: 1.5rem; }   /* 24px */
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  h1 { font-size: 3rem; }     /* 48px */
  h2 { font-size: 2.25rem; }  /* 36px */
  h3 { font-size: 1.875rem; } /* 30px */
}
```

**Rules:**
- Body text: 16px minimum on all devices. Never go smaller.
- Small/caption text: 14px minimum. Never below 12px on mobile.
- `clamp()` for fluid typography eliminates breakpoint jumps:
  ```css
  h1 { font-size: clamp(1.875rem, 4vw, 3rem); }
  ```

### Navigation Patterns

Navigation must adapt to the device.

**Mobile (under 768px):**
- Hamburger menu with slide-out panel, or bottom navigation bar
- Bottom nav works best for apps with 3-5 primary destinations
- Hamburger for sites with many nav items or secondary pages
- Mobile nav should be full-width or nearly full-width

**Tablet (768px-1023px):**
- Collapsed sidebar or top navigation with some items hidden under "More"
- Tab bar at the top for section-based navigation

**Desktop (1024px+):**
- Full horizontal navigation bar, or persistent sidebar
- Sidebar for apps with deep navigation trees (dashboards, admin panels)
- Top nav for marketing sites and content-focused sites

```css
/* Mobile: hamburger menu */
.nav-desktop { display: none; }
.nav-mobile { display: flex; }

/* Desktop: full nav */
@media (min-width: 1024px) {
  .nav-desktop { display: flex; }
  .nav-mobile { display: none; }
}
```

**Bottom navigation (mobile apps):**
```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding-bottom: env(safe-area-inset-bottom); /* iPhone notch */
  z-index: 50;
}
```

### Image Handling

Images must be responsive and not break layouts.

```css
/* Baseline: all images responsive */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Maintain aspect ratio for containers */
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

**Art direction — serve different images per breakpoint:**
```html
<picture>
  <source media="(min-width: 1024px)" srcset="hero-desktop.webp" />
  <source media="(min-width: 768px)" srcset="hero-tablet.webp" />
  <img src="hero-mobile.webp" alt="[Description]" />
</picture>
```

**Rules:**
- Always set `width` and `height` attributes on `<img>` to prevent layout shift during loading.
- Use `loading="lazy"` for below-the-fold images.
- Use `object-fit: cover` for images in fixed-ratio containers. Never stretch images.
- Provide WebP format with fallbacks for broad compatibility.

### Form Inputs on Mobile

Forms need special attention on mobile for usability.

**Input types for mobile keyboards:**
```html
<input type="email" />        <!-- @ and . on keyboard -->
<input type="tel" />          <!-- numeric keypad -->
<input type="url" />          <!-- / and .com on keyboard -->
<input type="number" />       <!-- numeric keyboard -->
<input type="search" />       <!-- search button on keyboard -->
<input inputmode="numeric" /> <!-- numeric keyboard without spin buttons -->
```

**Autocomplete attributes for faster form completion:**
```html
<input type="text" autocomplete="name" />
<input type="email" autocomplete="email" />
<input type="tel" autocomplete="tel" />
<input type="text" autocomplete="street-address" />
<input type="text" autocomplete="postal-code" />
<input type="text" autocomplete="cc-number" />
```

**Layout rules:**
- Forms are single-column on mobile. Side-by-side fields only at 768px+.
- Labels always above inputs on mobile (not inline/beside).
- Input height: at least 44px for comfortable tapping.
- Space between form fields: 16-24px.

### Scroll Behavior

```css
/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

/* Momentum scrolling on iOS */
.scrollable-container {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
}

/* Prevent body scroll when modal is open */
body.modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
```

**Rules:**
- Horizontal scrolling on the page is always a bug. Inside a specific component (carousel, code block) it can be intentional.
- Long lists should use virtual scrolling if over 100 items.
- Sticky headers should not take up more than 60px on mobile — screen space is precious.

### Modals and Overlays on Mobile

```css
/* Mobile: full-screen or bottom sheet */
.modal {
  position: fixed;
  inset: 0;
  background: var(--color-surface);
  overflow-y: auto;
  z-index: 100;
}

/* Desktop: centered dialog */
@media (min-width: 768px) {
  .modal {
    inset: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 560px;
    max-height: 85vh;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
  }
}
```

**Rules:**
- On mobile, modals should be full-screen or bottom-sheet style. Don't show a tiny centered box.
- Close button must be easily reachable (top-right on desktop, top-left or top-right on mobile).
- Modal content must scroll if it exceeds viewport height.

### Testing Checklist

- [ ] No horizontal scrolling at 320px
- [ ] No horizontal scrolling at 375px
- [ ] Layout works at 768px (tablet portrait)
- [ ] Layout works at 1024px (tablet landscape / small desktop)
- [ ] Layout works at 1440px (standard desktop)
- [ ] All touch targets are 44px minimum
- [ ] Body text is 16px+ on all devices
- [ ] Navigation adapts to mobile (hamburger, bottom nav, or collapsed)
- [ ] Images don't overflow containers
- [ ] Forms are single-column on mobile
- [ ] Input types trigger appropriate mobile keyboards
- [ ] Modals are full-screen or bottom-sheet on mobile
- [ ] Sticky headers are slim on mobile (max 60px)
- [ ] Safe area insets respected on notched devices (env(safe-area-inset-*))
- [ ] Content is readable without zooming

### Anti-Patterns — Do NOT

- Write desktop-first CSS and "fix" mobile with overrides — build mobile-first
- Use fixed-width containers that don't flex (e.g., `width: 1200px` without `max-width`)
- Set viewport units (100vh) for full-height layouts without accounting for mobile browser chrome — use `100dvh` or JS
- Assume hover states exist on touch devices — provide alternative feedback for touch
- Hide important content on mobile — prioritize, don't hide
- Use tiny touch targets (less than 44px) for buttons, links, or form controls
- Put critical actions in hard-to-reach areas (top corners on large phones)
- Forget about the iPhone notch and home indicator — use `env(safe-area-inset-*)` padding
- Use `position: fixed` extensively on mobile — it behaves unpredictably with virtual keyboards
- Show desktop-width tables on mobile without horizontal scroll or card-based alternative

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Mobile-first CSS — base styles target mobile, media queries add desktop layout
- Test at 320px, 375px, 768px, 1024px, 1440px
- 44px minimum touch targets on mobile
- 16px minimum body text on all devices

## Notes

[Any project-specific context.]
