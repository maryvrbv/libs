# [Project Name]

[Brief description of what this project does.]

---

## Capability: Dark Mode

This project supports light and dark color modes. The implementation uses CSS custom properties for theming, respects system preferences, and allows manual toggling with persistence.

### Architecture

```
1. Define all colors as CSS custom properties
2. Detect system preference with prefers-color-scheme
3. Allow manual override with a toggle
4. Persist user choice in localStorage
5. Apply theme class to <html> to prevent flash
```

### CSS Custom Properties

Define every color as a variable. Never use hardcoded colors in components.

```css
:root {
  /* Light mode (default) */
  --color-bg: #ffffff;
  --color-bg-secondary: #f8f9fa;
  --color-bg-tertiary: #f1f3f5;
  --color-surface: #ffffff;
  --color-surface-raised: #ffffff;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  --color-text-tertiary: #9ca3af;
  --color-border: #e5e7eb;
  --color-border-subtle: #f3f4f6;
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-text: #ffffff;
  --color-success: #059669;
  --color-warning: #d97706;
  --color-error: #dc2626;
  --color-shadow: rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  --color-bg: #0f1117;
  --color-bg-secondary: #1a1d27;
  --color-bg-tertiary: #242836;
  --color-surface: #1a1d27;
  --color-surface-raised: #242836;
  --color-text: #f1f3f5;
  --color-text-secondary: #a1a7b5;
  --color-text-tertiary: #6b7280;
  --color-border: #2e3345;
  --color-border-subtle: #242836;
  --color-primary: #3b82f6;
  --color-primary-hover: #60a5fa;
  --color-primary-text: #ffffff;
  --color-success: #34d399;
  --color-warning: #fbbf24;
  --color-error: #f87171;
  --color-shadow: rgba(0, 0, 0, 0.3);
}

/* Apply everywhere */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

### Color Design for Dark Mode

Dark mode is not "invert everything." Follow these principles:

**Background layers (dark):**
```
Base:     #0f1117  (darkest — page background)
Surface:  #1a1d27  (cards, containers)
Raised:   #242836  (popovers, dropdowns, modals)
Highest:  #2e3345  (tooltips, active states)
```

Higher elevation = lighter surface. This is the opposite of light mode where shadows show elevation.

**Text on dark backgrounds:**
```
Primary text:   #f1f3f5  (not pure #ffffff — too harsh)
Secondary text: #a1a7b5  (muted, descriptions)
Tertiary text:  #6b7280  (hints, placeholders)
```

**Color adjustments:**
- Reduce saturation slightly on dark backgrounds — vivid colors vibrate against dark surfaces.
- Increase lightness of accent colors so they pass contrast checks.
- Error red, success green, warning yellow all need lighter variants in dark mode.

### System Preference Detection

```css
/* CSS-only approach (no JS needed for initial render) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #0f1117;
    --color-text: #f1f3f5;
    /* ... all dark variables */
  }
}
```

```ts
// JavaScript detection
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

// Listen for system changes
prefersDark.addEventListener("change", (e) => {
  if (!getUserPreference()) {
    applyTheme(e.matches ? "dark" : "light");
  }
});
```

### Manual Toggle with Persistence

```ts
function getTheme(): "light" | "dark" | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("theme") as "light" | "dark" | null;
}

function setTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
}

// Initialize on page load — must run before first paint
function initTheme() {
  const saved = getTheme();
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}
```

### Preventing Flash of Wrong Theme (FOWT)

The theme script must run before the page paints. Place it in the `<head>` as a blocking script:

```html
<head>
  <script>
    (function() {
      var theme = localStorage.getItem("theme");
      if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    })();
  </script>
</head>
```

In Next.js, use a `<script>` tag in `layout.tsx` with `dangerouslySetInnerHTML` or use `next-themes` which handles this.

### React Theme Provider

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "system", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      localStorage.removeItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      localStorage.setItem("theme", theme);
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

**Toggle component:**
```tsx
import { useTheme } from "./theme-provider";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
```

### Image and Media Handling

**Adjust images for dark mode:**
```css
/* Slightly dim bright images in dark mode */
[data-theme="dark"] img:not([data-no-dim]) {
  filter: brightness(0.9);
}

/* Invert dark logos to work on dark backgrounds */
[data-theme="dark"] .logo-dark-invert {
  filter: invert(1) hue-rotate(180deg);
}
```

**Use transparent PNGs where possible** — they adapt to any background automatically.

**Provide separate assets when needed:**
```tsx
function ThemedImage() {
  const { theme } = useTheme();
  return (
    <img
      src={theme === "dark" ? "/hero-dark.webp" : "/hero-light.webp"}
      alt="[Description]"
    />
  );
}
```

**CSS `picture` approach (no JS):**
```html
<picture>
  <source srcset="/hero-dark.webp" media="(prefers-color-scheme: dark)" />
  <img src="/hero-light.webp" alt="[Description]" />
</picture>
```

### Elevation and Shadows

**Light mode:** elevation is communicated with shadows (deeper shadow = higher layer).

**Dark mode:** elevation is communicated with surface lightness (lighter = higher). Shadows are barely visible against dark backgrounds.

```css
:root {
  --shadow-sm: 0 1px 2px var(--color-shadow);
  --shadow-md: 0 4px 12px var(--color-shadow);
  --shadow-lg: 0 8px 24px var(--color-shadow);
}

/* In dark mode, use borders instead of or alongside shadows */
[data-theme="dark"] .card {
  border: 1px solid var(--color-border);
  box-shadow: none; /* or very subtle shadow */
}
```

### Tailwind CSS Integration

```js
// tailwind.config.js — use class strategy for manual toggle
module.exports = {
  darkMode: ["selector", "[data-theme='dark']"],
};
```

```html
<!-- Use dark: prefix for overrides -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <p class="text-gray-600 dark:text-gray-400">Secondary text</p>
</div>
```

Prefer CSS custom properties over `dark:` utilities for large projects — fewer classes, easier to maintain.

### Testing Checklist

- [ ] All text passes WCAG AA contrast in both modes (4.5:1 normal, 3:1 large)
- [ ] No hardcoded colors in component code — everything uses variables
- [ ] System preference is respected on first visit
- [ ] Manual toggle overrides system preference and persists
- [ ] No flash of wrong theme on page load
- [ ] Images and media look appropriate in both modes
- [ ] Borders are visible in dark mode (not lost against dark backgrounds)
- [ ] Form inputs have visible borders in both modes
- [ ] Focus indicators are visible in both modes
- [ ] Shadows are adjusted or replaced with borders in dark mode
- [ ] Third-party embeds and iframes are checked in both modes
- [ ] Code blocks and syntax highlighting have dark variants

### Anti-Patterns — Do NOT

- Invert all colors — dark mode needs intentional color design, not `filter: invert(1)` on the page
- Use pure black (#000000) as the dark background — it's too harsh. Use dark gray (#0f1117 to #1a1d27)
- Use pure white (#ffffff) text on dark backgrounds — use off-white (#f1f3f5)
- Hardcode colors in component styles — always use CSS variables
- Forget to update specific components — every surface, text, border, and shadow needs both modes
- Skip the flash-prevention script — users see a jarring flash on every page load
- Store theme in a cookie and ignore system preferences — respect the OS setting as default
- Use separate CSS files for light and dark — use variables that swap
- Reduce opacity for dark mode text instead of using proper muted colors
- Forget about images, charts, code blocks, and third-party widgets
- Use the same shadow values in both modes — shadows are nearly invisible on dark backgrounds
- Put the theme toggle somewhere hard to find — it should be in the header/navbar

## Current State

[Where is the project? What's working, what's next?]

## Conventions

[Project-specific theming conventions.]

## Notes

[Any project-specific context.]
