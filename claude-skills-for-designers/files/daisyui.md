# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / SvelteKit / Astro / etc.]
- TypeScript
- Tailwind CSS v4
- DaisyUI component library
- [Data: Supabase / Firebase / API / etc.]

## Design System: DaisyUI

This project uses DaisyUI — a Tailwind CSS component library that adds semantic class names for common UI patterns. DaisyUI is installed as a Tailwind plugin (not a JavaScript framework), so components are pure CSS classes applied to standard HTML elements. No imports, no JavaScript dependencies — just class names.

### How DaisyUI Works

DaisyUI extends Tailwind with component classes. You write HTML, add DaisyUI classes, and customize with Tailwind utilities. Components are not React/Vue/Svelte components — they're CSS class conventions.

```html
<!-- DaisyUI: semantic class names -->
<button class="btn btn-primary">Save</button>

<!-- Raw Tailwind equivalent (don't do this when DaisyUI exists): -->
<button class="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Save</button>
```

**When to use DaisyUI classes vs raw Tailwind:**
- Use DaisyUI for any component it provides (buttons, cards, modals, etc.)
- Use raw Tailwind for layout (flex, grid, spacing, sizing, positioning)
- Use raw Tailwind for one-off styling adjustments on DaisyUI components
- Never rebuild a component in raw Tailwind when DaisyUI has a class for it

### Theme System

DaisyUI includes 30+ built-in themes and supports custom themes. Themes swap all semantic colors at once using the `data-theme` attribute.

**Applying a theme:**
```html
<!-- On the root element -->
<html data-theme="light">
<!-- or -->
<html data-theme="dark">
<html data-theme="cupcake">
<html data-theme="dracula">
<html data-theme="nord">
```

**Scoped themes (different theme on a section):**
```html
<html data-theme="light">
  <body>
    <div data-theme="dark" class="bg-base-100 p-6">
      <!-- This section uses the dark theme -->
    </div>
  </body>
</html>
```

**Built-in themes include:** light, dark, cupcake, bumblebee, emerald, corporate, synthwave, retro, cyberpunk, valentine, halloween, garden, forest, aqua, lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk, autumn, business, acid, lemonade, night, coffee, winter, dim, nord, sunset.

**Custom theme in Tailwind config:**
```js
// tailwind.config.js
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        [custom-theme-name]: {
          "primary": "#[hex]",
          "primary-content": "#[hex]",
          "secondary": "#[hex]",
          "secondary-content": "#[hex]",
          "accent": "#[hex]",
          "accent-content": "#[hex]",
          "neutral": "#[hex]",
          "neutral-content": "#[hex]",
          "base-100": "#[hex]",
          "base-200": "#[hex]",
          "base-300": "#[hex]",
          "base-content": "#[hex]",
          "info": "#[hex]",
          "success": "#[hex]",
          "warning": "#[hex]",
          "error": "#[hex]",
        },
      },
    ],
  },
};
```

### Semantic Color System

DaisyUI uses semantic color names that adapt to the active theme. Never use Tailwind's raw color palette (`text-blue-500`, `bg-gray-100`).

```
primary / primary-content         — brand color, primary buttons, key actions
secondary / secondary-content     — secondary buttons, supporting elements
accent / accent-content           — highlights, badges, attention-grabbing elements
neutral / neutral-content         — dark surfaces, navbars, footers
base-100                          — page background
base-200                          — slightly darker background (cards, sidebars)
base-300                          — borders, dividers, subtle backgrounds
base-content                      — default text color on base backgrounds
info / info-content               — informational alerts and badges
success / success-content         — success states, confirmations
warning / warning-content         — warning states, caution messages
error / error-content             — error states, destructive actions
```

**Usage in classes:**
```html
<div class="bg-base-100 text-base-content">Page content</div>
<div class="bg-primary text-primary-content">Primary surface</div>
<span class="text-error">Validation error message</span>
<div class="bg-base-200 rounded-lg p-4">Card surface</div>
```

### Component Classes

**Buttons:**
```html
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-error">Error</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-link">Link</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-outline btn-primary">Outline Primary</button>
<button class="btn btn-xs">Tiny</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-md">Medium (default)</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-wide">Wide</button>
<button class="btn btn-block">Full Width</button>
<button class="btn btn-circle">●</button>
<button class="btn btn-square">■</button>
<button class="btn glass">Glass</button>
<button class="btn btn-disabled">Disabled</button>
<button class="btn loading">Loading</button>
```

**Cards:**
```html
<div class="card bg-base-100 shadow-xl">
  <figure><img src="[image]" alt="[alt]" /></figure>
  <div class="card-body">
    <h2 class="card-title">[Title]</h2>
    <p>[Description]</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>

<!-- Compact card -->
<div class="card card-compact bg-base-100 shadow">...</div>

<!-- Side image card -->
<div class="card card-side bg-base-100 shadow-xl">
  <figure><img src="[image]" alt="[alt]" /></figure>
  <div class="card-body">...</div>
</div>

<!-- Glass card -->
<div class="card glass">...</div>
```

**Navbar:**
```html
<div class="navbar bg-base-100 shadow-lg">
  <div class="navbar-start">
    <a class="btn btn-ghost text-xl">[Brand]</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a>Home</a></li>
      <li><a>About</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <a class="btn btn-primary">Get Started</a>
  </div>
</div>
```

**Modal:**
```html
<!-- Trigger -->
<button class="btn" onclick="my_modal.showModal()">Open Modal</button>

<!-- Modal (use <dialog> element) -->
<dialog id="my_modal" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">[Title]</h3>
    <p class="py-4">[Content]</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
```

**Drawer (sidebar navigation):**
```html
<div class="drawer lg:drawer-open">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content -->
    <label for="my-drawer" class="btn btn-ghost drawer-button lg:hidden">☰</label>
  </div>
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 min-h-full w-80 p-4">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
```

**Other key components:**
```html
<!-- Hero -->
<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">[Headline]</h1>
      <p class="py-6">[Subheadline]</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>

<!-- Footer -->
<footer class="footer bg-neutral text-neutral-content p-10">
  <nav>
    <h6 class="footer-title">Services</h6>
    <a class="link link-hover">Branding</a>
    <a class="link link-hover">Design</a>
  </nav>
</footer>

<!-- Stats -->
<div class="stats shadow">
  <div class="stat">
    <div class="stat-title">Total Users</div>
    <div class="stat-value">25.6K</div>
    <div class="stat-desc">21% more than last month</div>
  </div>
</div>

<!-- Table -->
<div class="overflow-x-auto">
  <table class="table">
    <thead><tr><th>Name</th><th>Role</th></tr></thead>
    <tbody><tr><td>Alice</td><td>Engineer</td></tr></tbody>
  </table>
</div>
<!-- Variants: table-zebra, table-pin-rows, table-pin-cols, table-xs/sm/md/lg -->

<!-- Badge -->
<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-outline">Outline</span>
<span class="badge badge-lg">Large</span>

<!-- Alert -->
<div class="alert alert-info">
  <span>New update available.</span>
</div>
<div class="alert alert-error">
  <span>Something went wrong.</span>
</div>

<!-- Toast (fixed position notifications) -->
<div class="toast toast-end">
  <div class="alert alert-success">
    <span>Message sent.</span>
  </div>
</div>

<!-- Tooltip -->
<div class="tooltip" data-tip="Tooltip text">
  <button class="btn">Hover me</button>
</div>
<div class="tooltip tooltip-bottom" data-tip="Bottom">...</div>

<!-- Dropdown -->
<div class="dropdown">
  <div tabindex="0" role="button" class="btn m-1">Click</div>
  <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>

<!-- Menu -->
<ul class="menu bg-base-200 rounded-box w-56">
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
  <li><details>
    <summary>Submenu</summary>
    <ul><li><a>Sub item</a></li></ul>
  </details></li>
</ul>

<!-- Tabs -->
<div role="tablist" class="tabs tabs-bordered">
  <a role="tab" class="tab">Tab 1</a>
  <a role="tab" class="tab tab-active">Tab 2</a>
  <a role="tab" class="tab">Tab 3</a>
</div>
<!-- Variants: tabs-boxed, tabs-lifted, tabs-xs/sm/md/lg -->

<!-- Steps -->
<ul class="steps">
  <li class="step step-primary">Register</li>
  <li class="step step-primary">Payment</li>
  <li class="step">Confirm</li>
</ul>

<!-- Collapse / Accordion -->
<div class="collapse collapse-arrow bg-base-200">
  <input type="radio" name="accordion" checked />
  <div class="collapse-title text-xl font-medium">Question?</div>
  <div class="collapse-content"><p>Answer.</p></div>
</div>

<!-- Carousel -->
<div class="carousel w-full">
  <div id="slide1" class="carousel-item relative w-full">
    <img src="[image]" class="w-full" />
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
      <a href="#slide4" class="btn btn-circle">❮</a>
      <a href="#slide2" class="btn btn-circle">❯</a>
    </div>
  </div>
</div>

<!-- Indicator (notification dot on an element) -->
<div class="indicator">
  <span class="indicator-item badge badge-secondary">99+</span>
  <button class="btn">Inbox</button>
</div>

<!-- Swap (toggle between two states) -->
<label class="swap swap-rotate">
  <input type="checkbox" />
  <div class="swap-on">🌙</div>
  <div class="swap-off">☀️</div>
</label>
```

### Component Sizing

Most DaisyUI components support size modifiers:

```
btn-xs   btn-sm   btn-md (default)   btn-lg
badge-xs badge-sm badge-md           badge-lg
table-xs table-sm table-md           table-lg
tabs-xs  tabs-sm  tabs-md            tabs-lg
```

### Theme Switching (Dark Mode)

Implement theme switching by toggling the `data-theme` attribute on `<html>`:

```ts
// Toggle between light and dark
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  localStorage.setItem('theme', current === 'dark' ? 'light' : 'dark');
}

// On page load, restore saved theme
const saved = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', saved);
```

Do not use Tailwind's `dark:` prefix for dark mode when using DaisyUI themes. The theme system handles all color switching through semantic tokens.

### Typography

Use Tailwind typography utilities alongside DaisyUI semantic colors:

- **Page titles:** `text-3xl font-bold` or `text-4xl font-bold`
- **Section headings:** `text-2xl font-semibold`
- **Card titles:** use `card-title` class (includes proper sizing)
- **Body text:** `text-base` or `text-sm`
- **Muted/helper text:** `text-sm opacity-70` or `text-base-content/70`
- **Labels:** `text-sm font-medium`

### Spacing

Use Tailwind spacing tokens for layout. DaisyUI handles internal component spacing.

- **Page padding:** `p-6` or `px-6 py-8`
- **Card internal:** handled by `card-body` class
- **Section gaps:** `gap-6` or `gap-8` with flex/grid
- **Form field gaps:** `gap-4`
- **Component gaps:** `gap-2` or `gap-3`

Never use arbitrary spacing like `mt-[13px]`. Stick to the Tailwind scale.

### Responsive Design

Use Tailwind breakpoints for responsive layouts. DaisyUI components are responsive by default.

```html
<!-- Stack on mobile, grid on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="card bg-base-100 shadow">...</div>
  <div class="card bg-base-100 shadow">...</div>
  <div class="card bg-base-100 shadow">...</div>
</div>

<!-- Drawer: overlay on mobile, persistent on desktop -->
<div class="drawer lg:drawer-open">...</div>

<!-- Hide/show nav items -->
<div class="navbar-center hidden lg:flex">...</div>
```

### File Structure

```
[project-root]/
├── tailwind.config.js          # DaisyUI plugin + theme config
├── src/
│   ├── app/                    # Pages / routes
│   │   ├── layout.[ext]        # Root layout with data-theme
│   │   └── page.[ext]
│   ├── components/
│   │   ├── navbar.[ext]
│   │   ├── sidebar.[ext]
│   │   ├── footer.[ext]
│   │   └── [feature]/          # Feature-specific components
│   ├── lib/
│   │   └── theme.ts            # Theme switching utilities
│   └── styles/
│       └── globals.css         # Tailwind directives
└── public/
    └── assets/
```

### Anti-Patterns — Do NOT

- Use raw Tailwind colors (`bg-blue-500`, `text-gray-700`) — use DaisyUI semantic tokens (`bg-primary`, `text-base-content`)
- Rebuild components that DaisyUI provides — use `btn`, `card`, `modal`, `dropdown`, etc.
- Use Tailwind's `dark:` prefix for dark mode — use DaisyUI themes with `data-theme`
- Mix DaisyUI with another component library (Chakra, MUI, ShadCN) in the same project
- Use inline `style={{}}` attributes — always use class names
- Hardcode color hex values in components — define them in the theme config
- Forget to set `data-theme` on the root `<html>` element — components will have no theme
- Create custom color utilities when semantic tokens exist (`bg-danger` → use `bg-error`)
- Use component classes on wrong elements (e.g., `card-body` without a parent `card`)
- Nest modals inside other modals
- Use more than one theme system — pick DaisyUI themes or Tailwind dark mode, not both
- Forget `z-10` on dropdown content — items will render behind other elements

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All styling through DaisyUI classes + Tailwind utilities
- Theme defined in `tailwind.config.js` — never hardcode colors
- Semantic color tokens for all color usage
- Mobile-first responsive design using Tailwind breakpoints
- Components use DaisyUI conventions, layout uses Tailwind

## Notes

[Any project-specific context — which theme, custom colors, DaisyUI version]
