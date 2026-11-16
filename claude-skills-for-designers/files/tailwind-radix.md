# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [React / Next.js / Vite + React]
- TypeScript
- Tailwind CSS v4
- Radix UI primitives
- [Data layer: Prisma / Drizzle / Supabase / etc.]

## Design System: Tailwind + Radix UI

This project uses Radix UI primitives for behavior and accessibility, styled entirely with Tailwind CSS. Unlike ShadCN (which provides pre-styled Radix components), this setup gives full control over appearance while Radix handles the hard parts: focus management, keyboard navigation, screen reader support, and state.

### Radix Primitives

Use Radix for any interactive UI pattern. Import from `@radix-ui/react-[component]`.

**Overlay & Feedback:**
- `Dialog` — modals. Handles focus trap, escape key, overlay click.
- `AlertDialog` — destructive confirmations. Requires explicit action.
- `Tooltip` — hover/focus hints. Auto-positions, handles delays.
- `Popover` — floating content on click. For filters, pickers, menus.
- `HoverCard` — rich content on hover. For previews.
- `Toast` — transient notifications. Auto-dismiss with undo support.

**Menus & Navigation:**
- `DropdownMenu` — action menus. Keyboard navigable, supports submenus.
- `ContextMenu` — right-click menus. Same API as DropdownMenu.
- `Menubar` — horizontal menu bar with dropdowns.
- `NavigationMenu` — site navigation with optional dropdown panels.

**Form Controls:**
- `Select` — styled dropdowns. Replaces native `<select>`.
- `Checkbox` — with indeterminate state support.
- `RadioGroup` — mutually exclusive options.
- `Switch` — on/off toggles.
- `Slider` — range inputs with single or dual thumbs.
- `Toggle` — pressed/unpressed state buttons.
- `ToggleGroup` — multiple toggles, single or multi-select.

**Layout & Disclosure:**
- `Accordion` — expandable sections. Single or multiple open.
- `Collapsible` — simple expand/collapse.
- `Tabs` — tabbed content. Handles keyboard arrow-key navigation.
- `ScrollArea` — custom scrollbar styling.
- `Separator` — accessible horizontal/vertical divider.
- `AspectRatio` — constrained aspect ratio containers.

**Utility:**
- `Label` — accessible form labels. Always connect to inputs.
- `Toolbar` — groups of controls with roving tabindex.
- `VisuallyHidden` — screen-reader-only content.
- `Portal` — render content outside the DOM tree.

### Styling Radix with Tailwind

Radix exposes `data-state` attributes for styling interactive states:

```tsx
// Accordion item — style open/closed states
<AccordionContent className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">

// Dialog overlay — style open/closed
<DialogOverlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-fadeIn" />

// Checkbox — style checked/unchecked
<CheckboxIndicator className="data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0" />
```

Common data attributes:
- `data-state="open"` / `data-state="closed"` — Dialog, Popover, Accordion, Collapsible
- `data-state="checked"` / `data-state="unchecked"` — Checkbox, Switch
- `data-state="active"` / `data-state="inactive"` — Tabs, Toggle
- `data-highlighted` — DropdownMenu, Select items (keyboard/hover focus)
- `data-disabled` — any disabled primitive

### Spacing

Use Tailwind spacing tokens consistently:

- **Page padding:** `p-6` or `px-6 py-8`
- **Card/section padding:** `p-6`
- **Section gaps:** `gap-6` or `gap-8`
- **Form field gaps:** `gap-4`
- **Inline element gaps:** `gap-2` or `gap-3`
- **Icon to text:** `gap-2`
- **Tight spacing:** `gap-1`

Use flexbox/grid `gap-*` instead of margin for spacing between siblings. Never use arbitrary values like `mt-[13px]`.

### Color System

Define semantic colors as CSS custom properties and map them to Tailwind:

```css
/* globals.css */
:root {
  --color-bg: theme(colors.white);
  --color-fg: theme(colors.gray.900);
  --color-muted: theme(colors.gray.500);
  --color-border: theme(colors.gray.200);
  --color-surface: theme(colors.gray.50);
  --color-primary: theme(colors.blue.600);
  --color-primary-fg: theme(colors.white);
  --color-danger: theme(colors.red.600);
  --color-danger-fg: theme(colors.white);
}

.dark {
  --color-bg: theme(colors.gray.950);
  --color-fg: theme(colors.gray.50);
  --color-muted: theme(colors.gray.400);
  --color-border: theme(colors.gray.800);
  --color-surface: theme(colors.gray.900);
  --color-primary: theme(colors.blue.400);
  --color-primary-fg: theme(colors.gray.950);
  --color-danger: theme(colors.red.400);
  --color-danger-fg: theme(colors.gray.950);
}
```

Then use via Tailwind: `bg-[var(--color-bg)]`, `text-[var(--color-fg)]`, `border-[var(--color-border)]`.

Keep the palette intentionally small. Add tokens only when a new semantic use case requires it.

### Typography

- **Page titles:** `text-3xl font-bold tracking-tight`
- **Section headings:** `text-xl font-semibold`
- **Subsection headings:** `text-lg font-medium`
- **Body:** `text-base text-[var(--color-fg)]`
- **Secondary text:** `text-sm text-[var(--color-muted)]`
- **Labels:** `text-sm font-medium`
- **Captions:** `text-xs text-[var(--color-muted)]`

### Component Patterns

Build your own component wrappers around Radix primitives. Keep them thin:

```tsx
// components/ui/button.tsx
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-[var(--color-primary)] text-[var(--color-primary-fg)] hover:opacity-90",
  secondary: "bg-[var(--color-surface)] text-[var(--color-fg)] border border-[var(--color-border)] hover:bg-[var(--color-border)]",
  ghost: "text-[var(--color-fg)] hover:bg-[var(--color-surface)]",
  danger: "bg-[var(--color-danger)] text-[var(--color-danger-fg)] hover:opacity-90",
};

export function Button({ variant = "primary", className, ...props }) {
  return <button className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", variants[variant], className)} {...props} />;
}
```

### File Structure

```
src/
├── app/                   # Pages / routes
├── components/
│   ├── ui/                # Base components (Button, Input, etc.)
│   └── [feature].tsx      # Feature components
├── lib/
│   └── utils.ts           # cn() helper, shared utilities
└── styles/
    └── globals.css        # CSS variables + Tailwind
```

### Naming Conventions

- **Files:** `kebab-case.tsx`
- **Components:** `PascalCase`
- **Props:** `PascalCase` for types, `camelCase` for values
- **CSS variables:** `--color-[semantic-name]`
- **Tailwind classes:** Use `cn()` from `lib/utils.ts` for merging

### Anti-Patterns — Do NOT

- Style Radix primitives with `style={{}}` — use Tailwind + data attributes
- Re-implement behavior that Radix already handles (focus traps, keyboard nav, etc.)
- Use native `<select>`, `<dialog>`, or custom modals — use Radix versions
- Mix Radix with other component libraries (Headless UI, React Aria, etc.)
- Skip `Label` pairing on form controls
- Use raw color classes (`text-gray-500`) — use CSS variable tokens
- Create wrapper components that hide Radix's composable parts API
- Forget to handle dark mode in CSS variables

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Functional components with hooks
- TypeScript strict mode
- Composition over configuration — Radix's part-based API is the pattern
- One component per file for base UI, feature components can be larger
- Keep Radix primitives unstyled in their own file, apply styling at the usage level when appropriate

## Notes

[Any project-specific context]
