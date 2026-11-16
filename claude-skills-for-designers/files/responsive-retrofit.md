# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / React / Vue / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- [Component Library: ShadCN/UI / custom / etc.]

## Workflow: Making an Existing App Responsive

This project was originally built for desktop only. This file defines the process for retrofitting responsive behavior — auditing fixed layouts, adding mobile breakpoints, converting navigation patterns, handling images, and testing across viewports.

### Phase 1: Audit Current Layouts

Before adding breakpoints, identify what needs to change.

**Find fixed widths and absolute positioning:**
```bash
# Fixed pixel widths (likely not responsive)
grep -rn "width:" src/ --include="*.css" --include="*.tsx" | grep -v "max-width\|min-width\|100%"

# Absolute positioning (may break on small screens)
grep -rn "position: absolute\|position: fixed" src/ --include="*.css"

# Hardcoded pixel values in Tailwind
grep -rn "w-\[.*px\]" src/ --include="*.tsx"

# Overflow hidden (may clip content on mobile)
grep -rn "overflow.*hidden" src/ --include="*.css" --include="*.tsx"
```

**Common desktop-only patterns that need work:**

| Pattern | Problem on Mobile | Fix |
|---------|-------------------|-----|
| `width: 1200px` | Overflows viewport | `max-w-7xl w-full` |
| `display: flex` (horizontal) | Items crush together | Stack vertically below `md:` |
| Fixed sidebar + main content | Sidebar takes too much space | Hide sidebar, use hamburger menu |
| Multi-column grid | Columns too narrow | Reduce columns: `grid-cols-1 md:grid-cols-3` |
| Large padding (48px+) | Wastes mobile screen space | `p-4 md:p-8 lg:p-12` |
| Hover-only interactions | No hover on touch | Add tap/click alternatives |
| Fixed-width tables | Overflow horizontally | Scroll wrapper or card layout |
| Absolute positioned elements | Overlap on small screens | Use flex/grid positioning |

### Phase 2: Mobile-First Approach

Rewrite CSS from mobile-first. The base styles are mobile, then add complexity at larger breakpoints.

**Standard breakpoints (Tailwind defaults):**

| Breakpoint | Width | Tailwind | Target |
|-----------|-------|---------|--------|
| Default | 0px+ | (none) | Mobile phones |
| `sm` | 640px+ | `sm:` | Large phones / small tablets |
| `md` | 768px+ | `md:` | Tablets |
| `lg` | 1024px+ | `lg:` | Small laptops |
| `xl` | 1280px+ | `xl:` | Desktops |
| `2xl` | 1536px+ | `2xl:` | Large screens |

**Mobile-first pattern:**
```tsx
// WRONG: desktop-first (overriding down)
<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">

// RIGHT: mobile-first (building up)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

```tsx
// WRONG: hiding on mobile by overriding
<div className="block sm:hidden">  {/* Shows on desktop, hides on mobile — backwards */}

// RIGHT: mobile-first thinking
<div className="hidden lg:block">   {/* Hidden by default (mobile), shown on large screens */}
```

### Phase 3: Layout Conversions

**Sidebar + Main Content:**
```tsx
// Desktop: sidebar visible, main shifts right
// Mobile: sidebar hidden, hamburger menu triggers it

<div className="flex min-h-screen">
  {/* Sidebar — hidden on mobile, fixed on desktop */}
  <aside className={cn(
    "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform",
    "lg:translate-x-0 lg:static lg:z-0",
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  )}>
    <nav className="p-4 space-y-2">
      {/* Nav items */}
    </nav>
  </aside>

  {/* Overlay — mobile only, when sidebar is open */}
  {isSidebarOpen && (
    <div
      className="fixed inset-0 z-30 bg-black/50 lg:hidden"
      onClick={() => setIsSidebarOpen(false)}
    />
  )}

  {/* Main content */}
  <main className="flex-1 p-4 lg:p-8">
    {/* Hamburger button — mobile only */}
    <button className="lg:hidden mb-4" onClick={() => setIsSidebarOpen(true)}>
      <MenuIcon className="h-6 w-6" />
    </button>
    {children}
  </main>
</div>
```

**Multi-Column Grid → Stacked:**
```tsx
// 3-column feature grid → stacks on mobile
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  <FeatureCard />
  <FeatureCard />
  <FeatureCard />
</div>
```

**Table → Cards:**
```tsx
// Desktop: traditional table
// Mobile: card-based layout

{/* Desktop table */}
<div className="hidden md:block">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map(item => (
        <TableRow key={item.id}>
          <TableCell>{item.name}</TableCell>
          <TableCell><Badge>{item.status}</Badge></TableCell>
          <TableCell>{item.date}</TableCell>
          <TableCell><ActionMenu /></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

{/* Mobile cards */}
<div className="md:hidden space-y-3">
  {items.map(item => (
    <Card key={item.id} className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-muted-foreground">{item.date}</p>
        </div>
        <Badge>{item.status}</Badge>
      </div>
      <div className="mt-3">
        <ActionMenu />
      </div>
    </Card>
  ))}
</div>
```

**Horizontal scrolling table alternative:**
```tsx
// Simpler: wrap the table in a scroll container
<div className="overflow-x-auto -mx-4 px-4">
  <Table className="min-w-[600px]">
    {/* Table contents — scrolls horizontally on mobile */}
  </Table>
</div>
```

### Responsive Navigation Patterns

**Hamburger Menu (most common):**
```tsx
'use client';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/docs">Docs</NavLink>
            <Button>Sign In</Button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <NavLink href="/features" className="block py-2">Features</NavLink>
            <NavLink href="/pricing" className="block py-2">Pricing</NavLink>
            <NavLink href="/docs" className="block py-2">Docs</NavLink>
            <Button className="w-full mt-2">Sign In</Button>
          </div>
        )}
      </div>
    </nav>
  );
}
```

**Bottom Navigation (mobile app-style):**
```tsx
<nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-50">
  <div className="flex justify-around py-2">
    <BottomNavItem icon={<HomeIcon />} label="Home" href="/" />
    <BottomNavItem icon={<SearchIcon />} label="Search" href="/search" />
    <BottomNavItem icon={<PlusIcon />} label="Create" href="/create" />
    <BottomNavItem icon={<UserIcon />} label="Profile" href="/profile" />
  </div>
</nav>

{/* Add bottom padding to main content to prevent overlap */}
<main className="pb-20 md:pb-0">
  {children}
</main>
```

### Image and Media Handling

```tsx
// Responsive images with next/image
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
  className="w-full h-auto rounded-lg"
  priority
/>
```

```tsx
// Background image that covers different aspect ratios
<div className="relative w-full h-48 md:h-64 lg:h-96">
  <Image
    src="/banner.jpg"
    alt="Banner"
    fill
    className="object-cover"
    sizes="100vw"
  />
</div>
```

```tsx
// Video that adapts to viewport
<div className="relative w-full aspect-video">
  <iframe
    src="https://www.youtube.com/embed/..."
    className="absolute inset-0 w-full h-full"
    allowFullScreen
  />
</div>
```

### Touch Target Sizing

Mobile users tap with fingers, not mouse pointers. Minimum touch target: **44x44px** (Apple HIG) or **48x48px** (Material Design).

```tsx
// WRONG: tiny clickable area
<button className="p-1 text-sm">Delete</button>  {/* ~24px tall — too small */}

// RIGHT: adequate touch target
<button className="p-3 text-sm min-h-[44px] min-w-[44px]">Delete</button>

// Icon buttons need padding for touch targets
<button className="p-2.5">  {/* 20px icon + 10px padding each side = 40px+ */}
  <TrashIcon className="h-5 w-5" />
</button>
```

```tsx
// Links in lists — make the entire row tappable
// WRONG: only the text is clickable
<li>
  <a href="/settings" className="text-blue-600">Settings</a>
</li>

// RIGHT: entire row is tappable with adequate height
<li>
  <a href="/settings" className="block py-3 px-4 -mx-4 hover:bg-muted">
    Settings
  </a>
</li>
```

### Testing Across Viewports

Test at these specific widths:

| Width | Device | What to Check |
|-------|--------|--------------|
| 320px | iPhone SE / small phones | Content doesn't overflow, text is readable |
| 375px | iPhone 14 / standard phones | Primary mobile experience |
| 428px | iPhone 14 Pro Max / large phones | No awkward whitespace |
| 768px | iPad / tablets | Grid layouts transition correctly |
| 1024px | iPad landscape / small laptops | Sidebar behavior, navigation switch |
| 1280px | Standard desktop | Full layout renders properly |
| 1440px | Large desktop | Content doesn't stretch too wide |

**Quick testing in browser dev tools:**
1. Open Chrome DevTools (Cmd+Opt+I)
2. Toggle device mode (Cmd+Shift+M)
3. Test responsive mode by dragging the viewport width
4. Check specific devices from the dropdown

**Check for these common issues:**
- Horizontal scrollbar appears (content overflows)
- Text is too small to read (below 14px on mobile)
- Touch targets too small (below 44px)
- Images overflow their containers
- Fixed headers/footers overlap content
- Forms are hard to use (inputs too close together)
- Modals/dialogs don't fit the screen

### Typography Adjustments

Scale typography down for mobile:

```tsx
// Responsive heading sizes
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
  Page Title
</h1>

<h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
  Section Title
</h2>

// Body text — usually doesn't need to change
<p className="text-sm md:text-base leading-relaxed">
  Body content that reads well at both sizes.
</p>
```

### Spacing Adjustments

Reduce spacing proportionally on mobile:

```tsx
// Page-level padding
<main className="px-4 py-6 md:px-8 md:py-10 lg:px-12 lg:py-16">

// Section gaps
<div className="space-y-8 md:space-y-12 lg:space-y-16">

// Card padding
<Card className="p-4 md:p-6">

// Container max-width with responsive padding
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### File Structure

```
[project-root]/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx        # Already responsive (size variants)
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── navbar.tsx        # Responsive navbar (hamburger + desktop)
│   │   │   ├── sidebar.tsx       # Collapsible sidebar
│   │   │   ├── bottom-nav.tsx    # Mobile bottom navigation
│   │   │   └── page-container.tsx # Responsive padding + max-width
│   │   └── [feature]/
│   │       └── data-table.tsx    # Responsive table (table + card views)
│   ├── hooks/
│   │   └── use-media-query.ts    # Custom hook for responsive logic
│   └── styles/
│       └── globals.css           # Base responsive styles
```

### Responsive Utility Hook

```tsx
// hooks/use-media-query.ts
'use client';
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Usage
const isMobile = useMediaQuery('(max-width: 767px)');
const isDesktop = useMediaQuery('(min-width: 1024px)');
```

### Anti-Patterns — Do NOT

- Use `useMediaQuery` for layout decisions that CSS can handle — prefer Tailwind responsive classes
- Hide content on mobile with `display: none` and show different content — serve the same content, rearranged
- Make everything 100% width on mobile — cards and content areas need padding from screen edges
- Use horizontal scrolling as a primary navigation pattern — it's hidden and undiscoverable
- Forget the viewport meta tag — without it, mobile browsers zoom out to show desktop layout
- Set fixed heights on containers with text — text wraps differently on mobile, overflows fixed heights
- Use `vw` units for font sizes without `clamp()` — text becomes unreadably small on phones
- Ignore landscape orientation on phones — test at 667x375px (iPhone landscape)
- Add touch events AND click events — use `onClick` which works for both on modern browsers
- Nest scrollable areas — mobile users can't tell which container their scroll gesture controls
- Use `:hover` states for showing important UI — touch devices have no hover

## Current State

[Where is the project? What's working, what's next?]

## Responsive Progress

| Page/Component | Mobile | Tablet | Desktop |
|---------------|--------|--------|---------|
| Navbar | [Done / TODO] | [Done / TODO] | [Already works] |
| Sidebar | [Done / TODO] | [Done / TODO] | [Already works] |
| Dashboard | [Done / TODO] | [Done / TODO] | [Already works] |
| Data tables | [Done / TODO] | [Done / TODO] | [Already works] |
| Forms | [Done / TODO] | [Done / TODO] | [Already works] |

## Conventions

- Mobile-first CSS — base styles are mobile, add complexity with breakpoints
- Minimum 44px touch targets on interactive elements
- Test at 320px, 768px, and 1280px minimum
- Use Tailwind responsive prefixes, not media queries in CSS
- Responsive images with proper `sizes` attribute

## Notes

[Any project-specific context — priority breakpoints, device analytics, specific mobile requirements]
