# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / React / Vue / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- [Component Library: ShadCN/UI / Radix / custom / etc.]

## Workflow: Figma to Code

This project is built from Figma designs. This file defines how to translate Figma designs into production code — layer naming, layout mapping, component extraction, spacing, typography, and asset export.

### Describing Figma Designs for Claude

When asking Claude to build from a Figma design, provide structured information in this order:

1. **Screenshot or description** of the overall layout
2. **Component breakdown** — what are the distinct UI pieces
3. **Layout structure** — how components are arranged (rows, columns, grids)
4. **Spacing values** — exact pixel values from Figma's inspector
5. **Typography** — font family, size, weight, line height, color
6. **Colors** — exact hex/HSL values or design token names
7. **Interactive states** — hover, active, disabled, focus
8. **Responsive behavior** — how it should adapt to smaller screens

**Example prompt structure:**
```
Build a pricing card component with:
- Layout: vertical stack, 24px padding, 16px gap between elements
- Header: "Pro Plan" — 24px semibold, #1a1a1a
- Price: "$29/mo" — 48px bold, #1a1a1a; "/mo" is 16px regular, #666
- Features list: checkmark icon + text, 12px gap between icon and text, 8px gap between items
- CTA button: full width, 48px height, #2563eb background, white text, 8px border radius
- Card: white background, 1px #e5e5e5 border, 12px border radius, subtle shadow
```

### Layer Naming Conventions

Name Figma layers so they map directly to code components and CSS classes:

| Figma Layer Name | Maps to Code |
|-----------------|-------------|
| `Header` | `<header>` or `Header` component |
| `Nav / Navbar` | `<nav>` or `Navbar` component |
| `Hero Section` | `<section className="hero">` |
| `Card` | `Card` component |
| `Card / Title` | `CardTitle` component or `.card-title` |
| `Button / Primary` | `<Button variant="primary">` |
| `Button / Secondary` | `<Button variant="secondary">` |
| `Icon / Search` | `<SearchIcon>` |
| `Input / Email` | `<Input type="email">` |
| `Avatar` | `Avatar` component |
| `Badge / Status` | `<Badge variant="status">` |

**Naming rules:**
- Use `/` to separate component and variant (matches component library patterns)
- Use descriptive names, not `Frame 42` or `Group 7`
- Prefix icons with `Icon /`
- Name interactive states: `Button / Primary / Hover`, `Button / Primary / Disabled`

### Auto Layout to CSS Mapping

Figma's Auto Layout maps directly to CSS flexbox:

| Figma Property | CSS Equivalent |
|---------------|---------------|
| **Direction: Horizontal** | `display: flex; flex-direction: row` |
| **Direction: Vertical** | `display: flex; flex-direction: column` |
| **Gap: 16** | `gap: 16px` (or `gap-4` in Tailwind) |
| **Padding: 24** | `padding: 24px` (or `p-6` in Tailwind) |
| **Padding: 16, 24** | `padding: 16px 24px` (or `py-4 px-6`) |
| **Align: Center** | `align-items: center` |
| **Justify: Space Between** | `justify-content: space-between` |
| **Align: Stretch** | `align-items: stretch` |
| **Fill Container** | `flex: 1` or `width: 100%` |
| **Hug Contents** | `width: auto` (default) |
| **Fixed Width: 320** | `width: 320px` or `w-80` |
| **Wrap** | `flex-wrap: wrap` |

**Figma Auto Layout → Tailwind example:**

```
Figma: Vertical, gap 16, padding 24, align stretch
Code:  flex flex-col gap-4 p-6 items-stretch

Figma: Horizontal, gap 12, align center, justify space-between
Code:  flex flex-row gap-3 items-center justify-between

Figma: Horizontal, gap 8, wrap
Code:  flex flex-wrap gap-2
```

### CSS Grid Mapping

For grid layouts in Figma (equal columns, card grids):

```
Figma: 3 columns, 24px gap
Code:  grid grid-cols-3 gap-6

Figma: Auto-fill columns, min 280px, 16px gap
Code:  grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4

Figma: 2 columns on desktop, 1 on mobile
Code:  grid grid-cols-1 md:grid-cols-2 gap-6
```

### Component Mapping

Map Figma components to code components:

| Figma Component | Code Component |
|----------------|---------------|
| Button (variants: primary, secondary, ghost) | `<Button variant="primary\|secondary\|ghost">` |
| Input field | `<Input>` with `<Label>` |
| Card (with header, body, footer) | `<Card><CardHeader><CardContent><CardFooter>` |
| Avatar (with fallback) | `<Avatar><AvatarImage><AvatarFallback>` |
| Badge | `<Badge variant="...">` |
| Dialog / Modal | `<Dialog><DialogContent>` |
| Dropdown | `<DropdownMenu>` |
| Tabs | `<Tabs><TabsList><TabsTrigger><TabsContent>` |
| Toast / Notification | `<Toast>` or `sonner` |
| Navigation | `<nav>` with `<Link>` items |
| Sidebar | `<aside>` with vertical nav |
| Table | `<Table>` with proper `<thead>` and `<tbody>` |

### Spacing Extraction

Read spacing values from Figma's right panel and map to your spacing scale:

| Figma Value | Tailwind Class | CSS |
|------------|---------------|-----|
| 4px | `gap-1`, `p-1` | 0.25rem |
| 8px | `gap-2`, `p-2` | 0.5rem |
| 12px | `gap-3`, `p-3` | 0.75rem |
| 16px | `gap-4`, `p-4` | 1rem |
| 20px | `gap-5`, `p-5` | 1.25rem |
| 24px | `gap-6`, `p-6` | 1.5rem |
| 32px | `gap-8`, `p-8` | 2rem |
| 40px | `gap-10`, `p-10` | 2.5rem |
| 48px | `gap-12`, `p-12` | 3rem |
| 64px | `gap-16`, `p-16` | 4rem |

**Rule:** Round odd Figma values to the nearest scale value. `13px` becomes `gap-3` (12px). `18px` becomes `gap-4` (16px) or `gap-5` (20px). Never use arbitrary values like `gap-[13px]`.

### Color Token Extraction

Map Figma color styles/variables to CSS custom properties:

```css
/* Figma variables → CSS custom properties */
:root {
  --background: 0 0% 100%;           /* White */
  --foreground: 0 0% 3.9%;           /* Near black */
  --primary: 221 83% 53%;            /* Blue-600 */
  --primary-foreground: 0 0% 100%;   /* White */
  --muted: 210 40% 96%;              /* Gray-100 */
  --muted-foreground: 215 16% 47%;   /* Gray-500 */
  --border: 214 32% 91%;             /* Gray-200 */
  --destructive: 0 84% 60%;          /* Red-500 */
}
```

**Figma → CSS variable workflow:**
1. In Figma, select an element and note its color style name (e.g., `primary`, `text/muted`)
2. Map the style name to a CSS variable: `primary` → `var(--primary)`
3. Use semantic names, not raw hex values in code

### Typography Mapping

Extract typography from Figma and map to code:

| Figma Text Style | CSS / Tailwind |
|-----------------|---------------|
| 48px / Bold / -0.02em | `text-5xl font-bold tracking-tight` |
| 36px / Bold / -0.02em | `text-4xl font-bold tracking-tight` |
| 30px / Semibold / -0.01em | `text-3xl font-semibold tracking-tight` |
| 24px / Semibold | `text-2xl font-semibold` |
| 20px / Medium | `text-xl font-medium` |
| 16px / Regular | `text-base` |
| 14px / Regular | `text-sm` |
| 14px / Medium | `text-sm font-medium` |
| 12px / Regular | `text-xs` |

**Line height mapping:**
| Figma | Tailwind |
|-------|---------|
| Auto (~120%) | `leading-none` or default |
| 150% | `leading-relaxed` |
| 160% | `leading-7` (on text-base) |
| 24px on 16px text | `leading-6` |

### Responsive Breakpoint Mapping

Design for these standard breakpoints:

| Figma Frame Width | Breakpoint | Tailwind Prefix |
|-------------------|-----------|----------------|
| 320px–375px | Mobile | (default — mobile-first) |
| 640px | Small tablet | `sm:` |
| 768px | Tablet | `md:` |
| 1024px | Small desktop | `lg:` |
| 1280px | Desktop | `xl:` |
| 1440px | Large desktop | `2xl:` |

**Common responsive patterns:**
```
Figma mobile: 1 column stack → Figma desktop: 2 column grid
Code: grid grid-cols-1 md:grid-cols-2 gap-6

Figma mobile: hidden sidebar → Figma desktop: visible sidebar
Code: hidden lg:block (sidebar), lg:ml-64 (main content)

Figma mobile: stack nav items → Figma desktop: horizontal nav
Code: flex flex-col md:flex-row gap-4
```

### Asset Export

**SVG icons:**
- Export as SVG from Figma (right-click → Copy as SVG, or Export panel)
- Clean up: remove unnecessary `<g>` wrappers, hardcoded dimensions, and `fill` colors
- Use `currentColor` for fill so icons inherit text color
- Save to `public/icons/` or use as React components

**Images:**
- Export at 2x for retina: if displayed at 400px wide, export at 800px
- Use PNG for screenshots/complex images with transparency
- Use JPG for photos
- Use WebP as the primary format (better compression, wide support)
- Save to `public/images/`

**Optimized image component:**
```tsx
import Image from 'next/image';

<Image
  src="/images/hero.webp"
  alt="Descriptive alt text"
  width={800}
  height={400}
  priority                    // Above-the-fold images
  className="rounded-lg"
/>
```

### Grid Systems

Map Figma's grid to code:

```
Figma: 12-column grid, 1200px max width, 24px gutter, 80px margins
Code:
  <div className="max-w-[1200px] mx-auto px-20">
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">Main content</div>
      <div className="col-span-4">Sidebar</div>
    </div>
  </div>

Figma: Content area 720px max width, centered
Code:
  <div className="max-w-3xl mx-auto px-6">
    {/* Content */}
  </div>
```

### Handling Absolute Positioning

Figma uses absolute positioning by default. In code, most layouts should use flexbox or grid instead.

**When Figma shows absolute positioning, translate to:**

| Figma Pattern | Code Approach |
|--------------|--------------|
| Elements stacked vertically with gaps | `flex flex-col gap-N` |
| Elements side by side | `flex gap-N` |
| Element pinned to bottom of card | `flex flex-col` + `mt-auto` on last item |
| Overlapping elements (avatar on card) | `relative` parent + `absolute` child |
| Floating action button | `fixed bottom-6 right-6` |
| Badge on avatar corner | `relative` + `absolute -top-1 -right-1` |

**Rule:** Only use `absolute`/`fixed` positioning when elements genuinely overlap. If elements are just arranged spatially in Figma, use flex or grid.

### File Structure

```
[project-root]/
├── public/
│   ├── images/              # Exported raster images (WebP, PNG, JPG)
│   ├── icons/               # Exported SVG icons
│   └── fonts/               # Custom fonts (if not using Google Fonts)
├── src/
│   ├── components/
│   │   ├── ui/              # Base UI components (Button, Card, Input)
│   │   └── [feature]/       # Feature-specific components
│   ├── styles/
│   │   └── globals.css      # CSS variables (colors, typography tokens)
│   └── lib/
│       └── fonts.ts         # Font configuration
└── [design-tokens/]         # Optional: exported Figma tokens
```

### Anti-Patterns — Do NOT

- Copy Figma's absolute positioning literally — translate to flex/grid layouts
- Use pixel values from Figma as arbitrary Tailwind values (`w-[347px]`) — round to the scale
- Ignore Figma's Auto Layout — it tells you exactly how to structure the flex container
- Export icons as PNG — always use SVG for icons
- Hardcode colors as hex values — map to CSS variables/design tokens
- Skip responsive design — if Figma only has desktop, plan the mobile layout yourself
- Build the entire page as one component — break it into logical sections and components
- Use `<img>` tags — use `next/image` or your framework's image component
- Match Figma exactly at the expense of real content — text will be longer/shorter than placeholder
- Forget hover/focus/active states — if Figma doesn't show them, ask or define sensible defaults
- Use Figma's layer order as DOM order — semantic HTML order matters for accessibility

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All designs come from Figma before coding
- Map Figma variables to CSS custom properties
- Use the spacing scale — never arbitrary pixel values
- Mobile-first responsive implementation
- SVG for all icons, WebP for raster images
- Break designs into components before writing code

## Notes

[Any project-specific context — Figma file links, design system details, brand guidelines]
