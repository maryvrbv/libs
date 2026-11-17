# [Project Name]

[Brief description of what this project does.]

---

## Capability: Navigation Polish

Navigation is how users move through your app. Bad nav makes everything feel lost. This file defines top navbar, sidebar, mobile nav, breadcrumbs, and active state rules. Apply these to every navigation component you generate or modify.

### Top Navbar

The primary horizontal navigation bar. Fixed to the top, always visible.

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;                          /* h-16 */
  border-bottom: 1px solid var(--color-border);
  background: hsl(var(--background) / 0.95); /* bg-background/95 */
  backdrop-filter: blur(8px);             /* backdrop-blur */
  -webkit-backdrop-filter: blur(8px);
  z-index: 50;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

/* Account for fixed navbar in page content */
main {
  padding-top: 64px;
}
```

```jsx
<header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/95 backdrop-blur z-50">
  <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
    {/* Logo — left-aligned, consistent size */}
    <a href="/" className="flex items-center gap-2">
      <Logo className="h-8 w-auto" />
      <span className="font-semibold text-lg">AppName</span>
    </a>

    {/* Nav links — center or right */}
    <nav className="hidden md:flex items-center gap-6">
      <a href="/dashboard" className="text-sm font-medium text-foreground">Dashboard</a>
      <a href="/projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150">Projects</a>
      <a href="/settings" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150">Settings</a>
    </nav>

    {/* Right section — actions, avatar */}
    <div className="flex items-center gap-2">
      <button className="btn btn-primary btn-sm hidden md:flex">New Project</button>
      <button className="btn-ghost btn-icon md:hidden" aria-label="Open menu">
        <MenuIcon className="h-5 w-5" />
      </button>
    </div>
  </div>
</header>
```

### Nav Link States

```css
.nav-link {
  font-size: 0.875rem;       /* text-sm */
  font-weight: 500;          /* font-medium */
  color: var(--color-muted-foreground);
  transition: color 150ms ease;
  padding: 8px 0;

  /* Hover */
  &:hover {
    color: var(--color-foreground);
  }

  /* Active — current page */
  &[aria-current="page"],
  &.active {
    color: var(--color-foreground);
  }

  /* Focus */
  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
    border-radius: 4px;
  }
}
```

Active page link uses `text-foreground`. Inactive links use `text-muted-foreground`. The difference must be clearly visible — not a subtle shade variation.

### Mobile Navigation

Hamburger button appears at `768px` breakpoint. Two patterns:

**Full-screen overlay:**
```jsx
{/* Triggered by hamburger button */}
<div className="fixed inset-0 z-50 bg-background md:hidden">
  <div className="flex items-center justify-between h-16 px-4 border-b border-border">
    <Logo className="h-8" />
    <button className="btn-ghost btn-icon" aria-label="Close menu" onClick={close}>
      <XIcon className="h-5 w-5" />
    </button>
  </div>
  <nav className="flex flex-col p-4 gap-1">
    <a href="/dashboard" className="flex items-center gap-3 px-3 py-3 rounded-lg text-foreground font-medium bg-accent">
      Dashboard
    </a>
    <a href="/projects" className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground">
      Projects
    </a>
  </nav>
</div>
```

Mobile nav links are taller (py-3) for touch targets. Minimum 44px height per item.

### Sidebar Navigation

```css
.sidebar {
  width: 256px;              /* w-64 */
  border-right: 1px solid var(--color-border);
  height: 100vh;
  position: fixed;
  top: 64px;                 /* below navbar */
  left: 0;
  overflow-y: auto;
  padding: 16px 12px;
  transition: width 200ms ease;
}

/* Collapsed state — icons only */
.sidebar-collapsed {
  width: 64px;              /* w-16 */
}
```

```jsx
<aside className="w-64 border-r border-border h-[calc(100vh-64px)] fixed top-16 left-0 overflow-y-auto p-4">
  {/* Section header */}
  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-6 mb-2 px-3">
    Workspace
  </p>

  {/* Nav items */}
  <nav className="flex flex-col gap-1">
    <a href="/dashboard"
       className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium bg-accent text-foreground">
      <LayoutDashboardIcon className="h-4 w-4" />
      Dashboard
    </a>
    <a href="/projects"
       className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
      <FolderIcon className="h-4 w-4" />
      Projects
    </a>
  </nav>

  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-6 mb-2 px-3">
    Settings
  </p>
  {/* More nav items */}
</aside>

{/* Main content offset */}
<main className="ml-64 pt-16">
  {/* Page content */}
</main>
```

**Active indicator:** Use `bg-accent` background highlight or a left border accent (`border-l-2 border-primary`) on the active item. Not both.

**Section headers:** `text-xs uppercase tracking-wider text-muted-foreground`, with `mt-6` above the first one in each group.

### Breadcrumbs

```jsx
<nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
  <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
  <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
  <a href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
  <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
  <span className="text-foreground font-medium" aria-current="page">Website Redesign</span>
</nav>
```

Current page in breadcrumbs is `text-foreground font-medium` and is NOT a link. Previous levels are links in `text-muted-foreground`.

### Bottom Nav (Mobile)

```jsx
<nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border z-50 md:hidden"
     style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
  <div className="flex items-center justify-around h-full max-w-lg mx-auto">
    {/* 4-5 items maximum */}
    <a href="/home" className="flex flex-col items-center gap-0.5 text-foreground">
      <HomeIcon className="h-5 w-5" />
      <span className="text-[10px] font-medium">Home</span>
    </a>
    <a href="/search" className="flex flex-col items-center gap-0.5 text-muted-foreground">
      <SearchIcon className="h-5 w-5" />
      <span className="text-[10px] font-medium">Search</span>
    </a>
    <a href="/profile" className="flex flex-col items-center gap-0.5 text-muted-foreground">
      <UserIcon className="h-5 w-5" />
      <span className="text-[10px] font-medium">Profile</span>
    </a>
  </div>
</nav>

{/* Account for bottom nav in content */}
<main className="pb-20 md:pb-0">{/* content */}</main>
```

Bottom nav: 4-5 items max. Icons with labels below. `safe-area-inset-bottom` for phones with home indicator.

### Anti-Patterns

Do NOT do any of the following:

- **Nav without mobile adaptation.** Desktop nav must collapse to hamburger or bottom nav on mobile. No horizontal scrolling navbars.
- **Active states that look like hover states.** Active (current page) and hover must be visually distinct. Active is persistent, hover is transient.
- **Sidebar wider than 280px.** Sidebars eat content space. Max width 256px (w-64). Wider sidebars are a layout problem.
- **Missing keyboard navigation.** All nav items must be focusable and navigable with Tab. Active item should be clearly visible on focus.
- **Backdrop-filter without fallback.** `backdrop-blur` needs `-webkit-backdrop-filter` for Safari. Always include both.
- **Bottom nav with more than 5 items.** Five is the maximum. More items means you need a different navigation pattern.
- **Breadcrumbs with the current page as a link.** Current page is plain text, not a link. Linking to the current page is confusing.
- **Section headers that look like nav items.** Section headers in sidebars must be visually distinct — smaller, uppercase, muted. Not clickable.
- **Fixed nav without z-index.** Fixed navbars need `z-50` minimum. Content will overlap without it.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Navbar: fixed, h-16, border-bottom, backdrop-blur, z-50
- Nav links: font-medium, muted-foreground inactive, foreground active
- Sidebar: w-64, collapsible, section headers in uppercase text-xs
- Mobile: hamburger at 768px, bottom nav with 4-5 items max
- All nav transitions: 150ms ease

## Notes

[Any project-specific context.]
