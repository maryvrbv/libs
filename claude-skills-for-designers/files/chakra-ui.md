# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [React / Next.js / Vite + React]
- TypeScript
- Chakra UI v3
- [Data layer: Prisma / Drizzle / Supabase / etc.]

## Design System: Chakra UI

This project uses Chakra UI — a component library with built-in styling, accessibility, and dark mode. Chakra uses a token-based design system and a `style props` API where you apply design tokens directly as component props. No separate CSS files needed.

### Component Usage

Always use Chakra components. Never build custom versions of what Chakra provides.

**Layout:**
- `Box` — base building block (replaces `<div>`)
- `Flex` — flexbox container (shorthand for `Box` with `display="flex"`)
- `Stack` / `HStack` / `VStack` — flex with consistent spacing
- `Grid` / `GridItem` — CSS grid layout
- `Container` — max-width page wrapper
- `Center` / `Square` / `Circle` — centering utilities
- `SimpleGrid` — equal-width grid columns
- `Separator` — visual dividers

**Surfaces & Feedback:**
- `Card` / `CardHeader` / `CardBody` / `CardFooter` — content containers
- `Dialog` — modals (trigger + backdrop + content + header + body + footer + closeTrigger)
- `Drawer` — slide-out panels
- `Popover` — floating content on click
- `Tooltip` — hover hints
- `Toaster` + `toaster.create()` — transient notifications
- `Alert` — inline status messages (info, warning, error, success)
- `Skeleton` / `SkeletonText` / `SkeletonCircle` — loading placeholders
- `Spinner` — loading spinners
- `Progress` / `ProgressCircle` — progress indicators

**Navigation:**
- `Tabs` — tabbed interfaces
- `Breadcrumb` — hierarchical location
- `Link` — styled links
- `Menu` — dropdown action menus
- `Steps` — multi-step flows

**Forms & Input:**
- `Input` — text input. Wrap in `Field` for label + help text + error.
- `Textarea` — multi-line text
- `NumberInput` — numeric input with increment/decrement
- `Select` / `NativeSelect` — dropdowns
- `Checkbox` / `CheckboxGroup` — multi-select
- `Radio` / `RadioGroup` — single-select
- `Switch` — on/off toggles
- `Slider` — range selection
- `PinInput` — OTP/PIN entry
- `Field` — form field wrapper (label, help text, error message)
- `Fieldset` — group of related fields

**Data Display:**
- `Table` / `TableHeader` / `TableBody` / `TableRow` / `TableCell` — tabular data
- `Badge` — status labels
- `Tag` — removable labels and filters
- `Avatar` / `AvatarGroup` — user images with fallback
- `Stat` — metric display (label + number + help text)
- `List` — ordered/unordered lists
- `DataList` — key-value pairs (label + value)
- `Timeline` — chronological events
- `Code` — inline code
- `Kbd` — keyboard shortcuts
- `Blockquote` — quotations

**Actions:**
- `Button` — variants: `solid` (primary), `outline` (secondary), `ghost` (tertiary), `subtle`, `surface`
- `IconButton` — icon-only actions
- `CloseButton` — dismiss actions
- `Toggle` / `ToggleGroup` — state-based buttons
- `ActionBar` — floating bar for bulk actions

**Disclosure:**
- `Accordion` — expandable sections
- `Collapsible` — simple expand/collapse

### Style Props

Chakra uses style props instead of CSS classes. Apply design tokens directly:

```tsx
<Box bg="bg.subtle" p={6} borderRadius="lg" borderWidth="1px" borderColor="border">
  <Text fontSize="lg" fontWeight="semibold" color="fg">Title</Text>
  <Text fontSize="sm" color="fg.muted">Description text</Text>
</Box>
```

**Common style props:**
- Layout: `w`, `h`, `minW`, `maxW`, `display`, `overflow`
- Spacing: `p`, `px`, `py`, `pt`, `m`, `mx`, `my`, `mt`, `gap`
- Color: `bg`, `color`, `borderColor`, `opacity`
- Typography: `fontSize`, `fontWeight`, `lineHeight`, `textAlign`
- Border: `borderWidth`, `borderRadius`, `borderColor`
- Flex: `alignItems`, `justifyContent`, `flexDir`, `flexWrap`
- Grid: `gridTemplateColumns`, `gridGap`, `colSpan`

### Spacing

Chakra uses a 4px base spacing scale:

| Token | Value | Use |
|-------|-------|-----|
| `1` | 4px | Tight gaps (icon to text) |
| `2` | 8px | Inline spacing |
| `3` | 12px | Compact padding |
| `4` | 16px | Form field gaps, inline sections |
| `5` | 20px | Standard content gaps |
| `6` | 24px | Card padding, section gaps |
| `8` | 32px | Page sections |
| `10` | 40px | Large sections |
| `12` | 48px | Page padding |

```tsx
<VStack gap={6}>          {/* 24px between children */}
<Box p={6}>               {/* 24px padding */}
<HStack gap={2}>          {/* 8px between children */}
```

Never use pixel values. Always use the token scale.

### Color System

Chakra v3 uses semantic color tokens:

```tsx
// Backgrounds
bg="bg"                   // Page background
bg="bg.subtle"            // Subtle surface (cards, inputs)
bg="bg.muted"             // Muted surface
bg="bg.emphasized"        // Emphasized surface
bg="colorPalette.solid"   // Solid color background (buttons)
bg="colorPalette.subtle"  // Light tinted background

// Foreground / Text
color="fg"                // Primary text
color="fg.muted"          // Secondary text
color="fg.subtle"         // Tertiary/disabled text
color="colorPalette.fg"   // Color-specific foreground

// Borders
borderColor="border"              // Default borders
borderColor="border.subtle"       // Subtle borders
borderColor="colorPalette.solid"  // Color-specific border
```

**Color palettes** — set `colorPalette` on a parent to cascade:
```tsx
<Button colorPalette="blue" variant="solid">Primary</Button>
<Button colorPalette="red" variant="outline">Danger</Button>
<Badge colorPalette="green">Active</Badge>
```

Available palettes: `gray`, `red`, `orange`, `yellow`, `green`, `teal`, `blue`, `cyan`, `purple`, `pink`.

Never use raw color values (`color="gray.500"`). Use semantic tokens.

### Typography

Use the `Text` and `Heading` components:

```tsx
<Heading size="2xl">Page Title</Heading>        // 30px
<Heading size="xl">Section Title</Heading>       // 24px
<Heading size="lg">Card Title</Heading>          // 20px
<Heading size="md">Subsection</Heading>          // 16px
<Text fontSize="md">Body text</Text>             // 16px (default)
<Text fontSize="sm" color="fg.muted">Secondary</Text>  // 14px
<Text fontSize="xs" color="fg.subtle">Caption</Text>   // 12px
```

Font weight tokens: `normal` (400), `medium` (500), `semibold` (600), `bold` (700).

### Dark Mode

Chakra handles dark mode automatically through semantic tokens. The `bg`, `fg`, `border` tokens switch values. Ensure:

- Never use `"white"` or `"black"` — use `"bg"` and `"fg"`
- Never use raw palette values (`"gray.100"`) — use semantic tokens
- Set color mode in your provider config
- Test both modes

### File Structure

```
src/
├── app/                   # Pages / routes
├── components/
│   ├── ui/                # Chakra snippets / customized components
│   └── [feature].tsx      # Feature-specific components
├── theme/
│   └── index.ts           # createSystem() theme customization
├── lib/
│   └── utils.ts           # Shared utilities
└── styles/
    └── globals.css        # Minimal — Chakra handles styling
```

### Naming Conventions

- **Files:** `kebab-case.tsx`
- **Components:** `PascalCase`
- **Style props:** use directly on components — no separate style objects unless reused 3+ times
- **Theme tokens:** extend via `createSystem()` — never create parallel design systems

### Patterns

**Forms:**
```tsx
<VStack gap={4}>
  <Field label="Email" required errorText={errors.email}>
    <Input placeholder="you@example.com" />
  </Field>
  <Field label="Password" required>
    <Input type="password" />
  </Field>
  <Button colorPalette="blue" variant="solid" type="submit" w="full">
    Sign In
  </Button>
</VStack>
```

**Loading states:** `Skeleton` matching content layout. `Spinner` for action feedback.

**Empty states:** `Center` with icon + `VStack` of heading + description + action button.

**Responsive:** Use array or object syntax:
```tsx
<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
<Box display={{ base: "none", md: "block" }}>
```

### Anti-Patterns — Do NOT

- Mix Chakra with Tailwind or other CSS frameworks
- Use raw HTML elements when Chakra components exist
- Use inline `style={{}}` — use style props
- Use raw color values (`gray.500`) instead of semantic tokens
- Create custom modals, tooltips, or selects — use Chakra's
- Override Chakra's theme outside of `createSystem()`
- Nest Cards inside Cards
- Use `!important` anywhere

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Functional components with hooks
- TypeScript strict mode
- All styling through Chakra style props
- Composition using Chakra's compound component patterns
- Keep components focused — one responsibility per component

## Notes

[Any project-specific context]
