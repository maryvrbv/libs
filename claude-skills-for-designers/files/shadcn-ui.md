# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- ShadCN/UI components
- [Data: Prisma / Drizzle / Supabase / etc.]

## Design System: ShadCN/UI

This project uses ShadCN/UI — a collection of reusable components built on Radix UI primitives, styled with Tailwind CSS. Components are copied into the project (not installed as a dependency), so they're fully customizable.

### Component Usage

Always use ShadCN/UI components when available. Never build custom versions of components that already exist in the library.

**Layout & Structure:**
- `Card` — for content containers and sections
- `Separator` — for visual dividers (not `<hr>` or border hacks)
- `ScrollArea` — for scrollable regions (not `overflow-auto`)
- `Sheet` — for slide-out panels
- `Tabs` — for switching between views in the same context
- `Collapsible` — for expandable sections
- `ResizablePanel` — for adjustable layouts

**Forms & Input:**
- `Input` — text fields
- `Textarea` — multi-line text
- `Select` — dropdowns (not native `<select>`)
- `Checkbox`, `RadioGroup`, `Switch` — toggles and selections
- `Slider` — range input
- `DatePicker` — date selection (uses `Calendar` internally)
- `Form` — wraps react-hook-form with validation display
- `Label` — always pair with inputs

**Feedback & Overlay:**
- `Dialog` — modal dialogs (not custom modals)
- `AlertDialog` — destructive confirmations
- `Toast` / `Sonner` — transient notifications
- `Tooltip` — hover hints
- `Popover` — contextual floating content
- `HoverCard` — rich hover previews
- `Alert` — inline messages (info, warning, error, success)

**Navigation:**
- `NavigationMenu` — top-level site navigation
- `Breadcrumb` — hierarchical location
- `Command` — command palette / search (⌘K pattern)
- `DropdownMenu` — action menus on click
- `ContextMenu` — right-click menus
- `Menubar` — horizontal menu bar

**Data Display:**
- `Table` — tabular data (not custom `<table>`)
- `Badge` — status labels and tags
- `Avatar` — user images with fallback
- `Progress` — progress bars
- `Skeleton` — loading placeholders

**Actions:**
- `Button` — primary actions. Variants: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`
- `Toggle` — on/off state buttons
- `ToggleGroup` — mutually exclusive toggles

### Spacing

Use Tailwind spacing tokens consistently:

- **Page padding:** `p-6` or `px-6 py-8`
- **Card padding:** `p-6`
- **Section gaps:** `gap-6` or `gap-8` (use `flex flex-col gap-6`, not margin)
- **Form field gaps:** `gap-4`
- **Inline element gaps:** `gap-2` or `gap-3`
- **Icon to text:** `gap-2`
- **Tight spacing (badges, tags):** `gap-1`

Never use arbitrary values like `mt-[13px]`. Stick to the scale: 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16.

### Color System

Use semantic color tokens, not raw colors:

```
background / foreground          — page background, default text
card / card-foreground           — card surfaces
primary / primary-foreground     — primary buttons, key actions
secondary / secondary-foreground — secondary buttons, subtle actions
muted / muted-foreground         — disabled states, helper text
accent / accent-foreground       — hover states, highlights
destructive / destructive-foreground — delete, error states
border                           — borders and dividers
input                            — input field borders
ring                             — focus rings
```

Usage in Tailwind:
- `bg-background text-foreground` — page level
- `bg-card text-card-foreground` — cards
- `bg-primary text-primary-foreground` — primary buttons
- `text-muted-foreground` — secondary text, descriptions
- `border-border` — standard borders
- `ring-ring` — focus states

Never use `text-gray-500` or `bg-blue-600`. Always use semantic tokens.

### Typography

- **Page titles:** `text-3xl font-bold tracking-tight`
- **Section headings:** `text-2xl font-semibold tracking-tight`
- **Card titles:** `text-lg font-semibold`
- **Body text:** `text-sm` (ShadCN default) or `text-base`
- **Helper/description text:** `text-sm text-muted-foreground`
- **Labels:** `text-sm font-medium`
- **Small/caption:** `text-xs text-muted-foreground`

Use `tracking-tight` on headings. Use `leading-relaxed` or `leading-7` for long-form body text.

### Dark Mode

ShadCN handles dark mode through CSS variables — the semantic tokens above automatically switch. Just ensure:

- Never hardcode colors (`text-white`, `bg-black`, `text-gray-700`)
- Always use semantic tokens (`text-foreground`, `bg-background`, `text-muted-foreground`)
- Test both modes — if something looks wrong in dark mode, you're using a raw color

### File Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx
│   └── [feature]/
│       └── page.tsx
├── components/
│   ├── ui/                # ShadCN components (auto-generated, don't modify unless customizing)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── [feature-name].tsx # Your components
├── lib/
│   └── utils.ts           # cn() helper and shared utilities
└── styles/
    └── globals.css        # Tailwind config + ShadCN CSS variables
```

### Naming Conventions

- **Component files:** `kebab-case.tsx` (e.g., `user-profile.tsx`)
- **Component names:** `PascalCase` (e.g., `UserProfile`)
- **Utility functions:** `camelCase` in `lib/utils.ts`
- **CSS classes:** Use `cn()` for conditional classes: `cn("base-class", conditional && "active-class")`
- **Pages:** `app/[route]/page.tsx` — Next.js App Router conventions

### Patterns

**Forms:** Always use ShadCN `Form` + react-hook-form + zod for validation:
```tsx
<Form>
  <FormField control={form.control} name="email" render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl><Input {...field} /></FormControl>
      <FormMessage />
    </FormItem>
  )} />
</Form>
```

**Loading states:** Use `Skeleton` components that match the layout of the content they replace.

**Empty states:** Always handle empty data with a centered message + action button, not a blank screen.

**Responsive:** Mobile-first. Use `sm:`, `md:`, `lg:` breakpoints. Stack on mobile, grid on desktop.

### Anti-Patterns — Do NOT

- Install component libraries alongside ShadCN (no MUI, Chakra, Ant Design)
- Use native HTML elements when a ShadCN component exists (`<button>` → `<Button>`)
- Create custom modals, tooltips, or dropdowns — use ShadCN's
- Use `style={{}}` inline styles — always use Tailwind classes
- Use raw color values in Tailwind (`text-gray-500`) — use semantic tokens
- Skip dark mode support
- Nest Cards inside Cards
- Use more than 3 levels of heading depth on a page

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Components are functional, using hooks
- Prefer server components where possible (Next.js App Router)
- Client components only when interactivity is needed (`"use client"`)
- Keep components small and focused — one job per component
- Colocate related files (component + its types + its hooks)

## Notes

[Any project-specific context]
