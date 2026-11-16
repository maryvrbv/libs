# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [React / Next.js / Vite + React]
- TypeScript
- Tailwind CSS v4
- Headless UI v2
- [Data layer: Prisma / Drizzle / Supabase / etc.]

## Design System: Tailwind + Headless UI

This project uses Headless UI for interactive components and Tailwind CSS for all styling. Headless UI is built by the Tailwind Labs team — components are completely unstyled, fully accessible, and designed to integrate seamlessly with Tailwind classes.

### Headless UI Components

Use Headless UI for these patterns. Do not build custom versions.

**Overlay & Disclosure:**
- `Dialog` — modals with focus trap, scroll lock, overlay. Includes `DialogPanel`, `DialogTitle`, `DialogBackdrop`.
- `Popover` — floating panels on click. Auto-positions. Use for filters, menus, complex tooltips.
- `Disclosure` — expand/collapse sections (FAQ, accordion-style).

**Menus & Selection:**
- `Menu` — dropdown action menus. Keyboard navigable. `MenuButton` + `MenuItems` + `MenuItem`.
- `Listbox` — styled dropdown select. Replaces native `<select>`. Supports single and multi-select.
- `Combobox` — searchable select / autocomplete. Supports filtering, creation.
- `RadioGroup` — styled radio selection with full keyboard support.

**Navigation & Layout:**
- `Tab` — tabbed interfaces. `TabGroup` + `TabList` + `Tab` + `TabPanels` + `TabPanel`.

**Form:**
- `Switch` — toggle switches.
- `Checkbox` — styled checkboxes.
- `Input` — accessible input wrapper.
- `Textarea` — accessible textarea wrapper.
- `Select` — native select with accessible label binding.
- `Field` + `Label` + `Description` — form field grouping with automatic aria binding.
- `Fieldset` + `Legend` — form section grouping.

**Utility:**
- `Transition` — enter/leave transitions. Use for modals, dropdowns, popovers.
- `CloseButton` — accessible close button that automatically closes the nearest Dialog/Popover.

### Styling with Tailwind + Data Attributes

Headless UI v2 exposes data attributes for state-based styling:

```tsx
// Menu item — style active (keyboard/hover) state
<MenuItem className="data-[active]:bg-blue-100 data-[active]:text-blue-900 px-4 py-2 text-sm">
  Edit
</MenuItem>

// Dialog with transition
<Dialog open={isOpen} onClose={setIsOpen} className="relative z-50">
  <DialogBackdrop transition className="fixed inset-0 bg-black/30 duration-300 data-[closed]:opacity-0" />
  <DialogPanel transition className="w-full max-w-md transform rounded-xl bg-white p-6 shadow-xl duration-300 data-[closed]:scale-95 data-[closed]:opacity-0">
    <DialogTitle className="text-lg font-semibold">Title</DialogTitle>
    {/* content */}
  </DialogPanel>
</Dialog>

// Switch — style checked/unchecked
<Switch checked={enabled} onChange={setEnabled} className="group relative h-7 w-14 rounded-full bg-gray-200 transition data-[checked]:bg-blue-600">
  <span className="inline-block size-5 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-8" />
</Switch>
```

**Common data attributes:**
- `data-[active]` — Menu/Listbox/Combobox items (keyboard or hover focus)
- `data-[selected]` — Listbox/Combobox selected item, Tab active tab
- `data-[checked]` — Switch, Checkbox, RadioGroup active option
- `data-[open]` — Disclosure, Popover when expanded
- `data-[closed]` — Transition states (entering/leaving)
- `data-[disabled]` — any disabled component
- `data-[focus]` — focused elements

### Spacing

Use Tailwind spacing tokens consistently:

- **Page padding:** `px-6 py-8` or `p-6`
- **Card/section padding:** `p-6`
- **Section gaps:** `space-y-6` or `gap-6`
- **Form field gaps:** `space-y-4` or `gap-4`
- **Inline element gaps:** `gap-2` or `gap-3`
- **Icon to text:** `gap-2`
- **Tight spacing:** `gap-1` or `gap-1.5`

Use `gap-*` with flex/grid. Use `space-y-*` / `space-x-*` when gap isn't supported. Never use arbitrary values.

### Color System

Define your palette as CSS custom properties for easy dark mode:

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f9fafb;
  --color-fg: #111827;
  --color-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-fg: #ffffff;
  --color-danger: #dc2626;
  --color-danger-fg: #ffffff;
  --color-success: #16a34a;
}

.dark {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-fg: #f1f5f9;
  --color-muted: #94a3b8;
  --color-border: #334155;
  --color-primary: #3b82f6;
  --color-primary-hover: #60a5fa;
  --color-primary-fg: #0f172a;
  --color-danger: #f87171;
  --color-danger-fg: #0f172a;
  --color-success: #4ade80;
}
```

Use in Tailwind: `bg-[var(--color-bg)]`, `text-[var(--color-fg)]`, `border-[var(--color-border)]`.

Keep the palette small. Only add a token when a new semantic use case demands it.

### Typography

- **Page titles:** `text-3xl font-bold tracking-tight`
- **Section headings:** `text-xl font-semibold`
- **Card/dialog titles:** `text-lg font-semibold`
- **Body:** `text-base text-[var(--color-fg)]`
- **Secondary text:** `text-sm text-[var(--color-muted)]`
- **Labels:** `text-sm font-medium`
- **Captions:** `text-xs text-[var(--color-muted)]`

### Building Your Components

Headless UI handles behavior. You build the visuals. Keep components thin:

```tsx
// components/ui/button.tsx
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-[var(--color-primary)] text-[var(--color-primary-fg)] hover:bg-[var(--color-primary-hover)]",
  secondary: "bg-[var(--color-surface)] text-[var(--color-fg)] border border-[var(--color-border)] hover:bg-[var(--color-border)]",
  ghost: "text-[var(--color-fg)] hover:bg-[var(--color-surface)]",
  danger: "bg-[var(--color-danger)] text-[var(--color-danger-fg)] hover:opacity-90",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export function Button({ variant = "primary", size = "md", className, ...props }) {
  return (
    <button
      className={cn("rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2", variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
```

### File Structure

```
src/
├── app/                    # Pages / routes
├── components/
│   ├── ui/                 # Base components (Button, Input, Card, etc.)
│   └── [feature].tsx       # Feature components
├── lib/
│   └── utils.ts            # cn() helper, shared utilities
└── styles/
    └── globals.css         # CSS variables + Tailwind base
```

### Naming Conventions

- **Files:** `kebab-case.tsx`
- **Components:** `PascalCase`
- **CSS variables:** `--color-[semantic-name]`
- **Conditional classes:** always merge with `cn()` from `lib/utils.ts`

### Anti-Patterns — Do NOT

- Mix Headless UI with other component libraries (Radix, MUI, Chakra)
- Rebuild behavior that Headless UI provides (focus traps, keyboard nav, aria attributes)
- Use native `<select>` when `Listbox` or `Combobox` is more appropriate
- Use `style={{}}` — always Tailwind classes
- Use Tailwind color classes (`text-gray-500`) directly — use CSS variable tokens
- Skip transitions on Dialogs and Popovers — they feel broken without them
- Forget `Field` + `Label` grouping on form controls
- Use `Disclosure` when `Tab` is more appropriate (and vice versa)

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Functional components with hooks
- TypeScript strict mode
- Headless UI for all interactive UI patterns
- Build simple components (Button, Card, Input) as thin Tailwind wrappers
- Keep components small and focused

## Notes

[Any project-specific context]
