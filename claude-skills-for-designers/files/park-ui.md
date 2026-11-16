# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: React / Vue / Solid]
- TypeScript
- Park UI components (built on Ark UI primitives)
- [Styling: Panda CSS / Tailwind CSS]
- [Routing: Next.js / Nuxt / SolidStart / etc.]
- [Data: REST / GraphQL / etc.]

## Design System: Park UI

This project uses Park UI — a component library built on top of Ark UI headless primitives. Park UI provides pre-styled, accessible components that work with React, Vue, and Solid. Components are copied into the project (not installed as a dependency) and styled via either Panda CSS or Tailwind CSS, depending on the project setup. The headless Ark UI layer handles behavior, accessibility, and state — Park UI adds the visual design.

### Architecture

Park UI has a layered architecture:

1. **Ark UI** — headless, framework-agnostic component primitives (behavior + accessibility)
2. **Park UI** — styled layer on top of Ark UI (design tokens + visual styling)
3. **Recipes / Slots** — styling system that maps variant styles to component parts

Components are composed from Ark UI primitives with a slot-based API. Each component part is a named slot that can be independently styled.

### Component Usage

Always use Park UI components when available. Never build custom versions of components that already exist in the library.

**Layout & Structure:**
- `Card` / `Card.Header` / `Card.Body` / `Card.Footer` — content containers
- `Tabs` / `Tabs.List` / `Tabs.Trigger` / `Tabs.Content` — switching between views
- `Accordion` / `Accordion.Item` / `Accordion.ItemTrigger` / `Accordion.ItemContent` — expandable panels
- `Splitter` / `Splitter.Panel` / `Splitter.ResizeTrigger` — resizable split layouts
- `Separator` — visual dividers

**Forms & Input:**
- `Input` — text fields
- `Textarea` — multi-line text
- `NumberInput` / `NumberInput.Control` / `NumberInput.IncrementTrigger` / `NumberInput.DecrementTrigger` — numeric input
- `Select` / `Select.Trigger` / `Select.Content` / `Select.Item` — dropdowns
- `Combobox` / `Combobox.Input` / `Combobox.Content` / `Combobox.Item` — searchable select
- `Checkbox` — multi-selection toggle
- `RadioGroup` / `RadioGroup.Item` — single-selection
- `Switch` — boolean toggle
- `Slider` / `Slider.Track` / `Slider.Thumb` — range input
- `DatePicker` / `DatePicker.Input` / `DatePicker.Content` — date selection
- `PinInput` — OTP/PIN code input
- `RatingGroup` — star rating
- `ColorPicker` — color selection
- `TagsInput` — tag entry
- `FileUpload` / `FileUpload.Dropzone` / `FileUpload.Item` — file upload with drag-and-drop
- `SegmentedControl` — segmented toggle
- `Toggle` — on/off state button
- `ToggleGroup` — mutually exclusive toggles
- `Field` / `Field.Label` / `Field.HelperText` / `Field.ErrorText` — form field wrapper with label and validation

**Feedback & Overlay:**
- `Dialog` / `Dialog.Trigger` / `Dialog.Backdrop` / `Dialog.Content` — modal dialogs
- `Drawer` / `Drawer.Trigger` / `Drawer.Backdrop` / `Drawer.Content` — slide-out panels
- `Toast` — transient notifications (via `createToaster`)
- `Tooltip` / `Tooltip.Trigger` / `Tooltip.Content` — hover hints
- `Popover` / `Popover.Trigger` / `Popover.Content` — contextual floating content
- `HoverCard` / `HoverCard.Trigger` / `HoverCard.Content` — rich hover previews
- `Alert` / `Alert.Icon` / `Alert.Title` / `Alert.Description` — inline messages
- `Progress` / `Progress.Track` / `Progress.Range` — progress bar
- `Skeleton` — loading placeholders
- `Spinner` — loading indicator

**Navigation:**
- `Breadcrumb` / `Breadcrumb.List` / `Breadcrumb.Item` / `Breadcrumb.Link` — hierarchical location
- `Pagination` / `Pagination.PrevTrigger` / `Pagination.NextTrigger` — page navigation
- `Menu` / `Menu.Trigger` / `Menu.Content` / `Menu.Item` — dropdown menus
- `TreeView` / `TreeView.Branch` / `TreeView.Item` — hierarchical tree

**Data Display:**
- `Table` / `Table.Header` / `Table.Body` / `Table.Row` / `Table.Cell` — tabular data
- `Badge` — status labels and tags
- `Avatar` / `Avatar.Image` / `Avatar.Fallback` — user images with fallback
- `Code` — inline and block code
- `Carousel` / `Carousel.Item` — content carousel

**Actions:**
- `Button` — primary actions. Variants: `solid`, `outline`, `ghost`, `subtle`, `link`
- `IconButton` — icon-only actions
- `Clipboard` / `Clipboard.Trigger` — copy-to-clipboard

### Slot-Based Component API

Park UI components use a **slot-based architecture**. Each component is composed of named parts (slots) that map to a compound component pattern:

```tsx
// Each sub-component corresponds to a "slot" in the recipe
<Dialog>
  <Dialog.Trigger asChild>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Confirm Action</Dialog.Title>
      <Dialog.Description>Are you sure you want to proceed?</Dialog.Description>
      <Dialog.CloseTrigger asChild>
        <IconButton variant="ghost"><XIcon /></IconButton>
      </Dialog.CloseTrigger>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog>
```

The `asChild` prop merges Park UI behavior onto your own element instead of rendering a wrapper. Use it when you need to control the rendered element:

```tsx
// Tooltip on a custom element
<Tooltip.Trigger asChild>
  <Button variant="outline">Hover me</Button>
</Tooltip.Trigger>

// Menu item as a link
<Menu.Item asChild>
  <a href="/settings">Settings</a>
</Menu.Item>
```

### Recipe-Based Styling

Park UI uses **recipes** to define component variants and styles. Recipes map variants (size, variant, color) to style rules for each slot.

**With Panda CSS:**

```tsx
// Recipes are defined in the Park UI preset — you customize via panda.config.ts
import { defineConfig } from '@pandacss/dev';
import { createPreset } from '@park-ui/panda-preset';

export default defineConfig({
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: 'violet',
      grayColor: 'sand',
      borderRadius: 'md',
    }),
  ],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  jsxFramework: 'react', // or 'vue' or 'solid'
  outdir: 'styled-system',
});
```

**With Tailwind CSS:**

```tsx
// Recipes are applied via Tailwind classes from the Park UI Tailwind plugin
// tailwind.config.ts
import { parkwindPlugin } from '@park-ui/tailwind-plugin';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    parkwindPlugin({
      accentColor: 'violet',
      grayColor: 'sand',
      borderRadius: 'md',
    }),
  ],
};
```

Component variants are applied via props:

```tsx
// Variants are props — same API regardless of Panda or Tailwind
<Button variant="solid" size="lg">Primary Action</Button>
<Button variant="outline" size="sm">Secondary</Button>
<Button variant="ghost" size="md">Subtle</Button>

<Badge variant="solid" size="sm">New</Badge>
<Badge variant="outline">Draft</Badge>

<Input size="md" />
<Input size="lg" />
```

### Spacing

Park UI inherits spacing from its styling engine (Panda CSS or Tailwind).

**With Panda CSS** — use token-based spacing:

```tsx
import { css } from '../styled-system/css';
import { Stack, HStack, VStack } from '../styled-system/jsx';

// Layout primitives (from Panda CSS JSX)
<Stack gap="4">         {/* 16px */}
<HStack gap="3">        {/* 12px */}
<VStack gap="6">        {/* 24px */}

// Custom styles via css()
<div className={css({ p: '6', mb: '4', gap: '3' })}>

// Token scale: 0.5=2px, 1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px, 10=40px, 12=48px
```

**With Tailwind CSS** — use standard Tailwind spacing:

```tsx
// Use Tailwind utility classes
<div className="p-6 mb-4 flex flex-col gap-3">

// Token scale: 1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px, 10=40px, 12=48px
```

General guidelines:
- **Page padding:** `6` (24px) or `8` (32px)
- **Card padding:** `5` (20px) or `6` (24px)
- **Section gaps:** `6` (24px) or `8` (32px)
- **Form field gaps:** `4` (16px)
- **Inline element gaps:** `2` (8px) or `3` (12px)
- **Icon to text:** `2` (8px)
- **Tight spacing (badges, tags):** `1` (4px)

Never use arbitrary pixel values. Stick to the token scale.

### Color System

Park UI uses a semantic color system built on accent and gray color palettes. Colors are configured at the preset level.

**Accent colors available:** `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`, `tomato`, `ruby`, `crimson`, `plum`, `iris`, `jade`, `grass`, `bronze`, `gold`, `sand`, `sage`, `olive`, `slate`, `mauve`, `neutral`.

**Gray colors available:** `neutral`, `sand`, `sage`, `olive`, `slate`, `mauve`.

**With Panda CSS — semantic tokens:**

```tsx
import { css } from '../styled-system/css';

// Semantic color tokens
css({ color: 'fg.default' })          // primary text
css({ color: 'fg.muted' })            // secondary text
css({ color: 'fg.subtle' })           // tertiary text
css({ color: 'fg.disabled' })         // disabled text

css({ bg: 'bg.canvas' })              // page background
css({ bg: 'bg.default' })             // card/surface background
css({ bg: 'bg.subtle' })              // subtle surface
css({ bg: 'bg.muted' })               // muted surface
css({ bg: 'bg.emphasized' })          // emphasized surface

css({ borderColor: 'border.default' }) // standard borders
css({ borderColor: 'border.muted' })   // subtle borders

css({ color: 'accent.default' })       // primary accent (links, focus)
css({ bg: 'accent.default' })          // accent backgrounds
css({ color: 'accent.fg' })            // text on accent backgrounds

css({ color: 'fg.error' })             // error text
css({ bg: 'bg.error' })                // error background
```

**With Tailwind CSS — CSS variables:**

```tsx
// Tailwind classes using Park UI color tokens
<div className="text-fg-default bg-bg-canvas">
<p className="text-fg-muted">Secondary text</p>
<div className="bg-bg-default border border-border-default">
<span className="text-accent-default">Accent text</span>
<div className="bg-bg-error text-fg-error">Error state</div>
```

Never use raw hex values or framework-default color scales (like `text-gray-500` or `color: gray.500`). Always use Park UI semantic tokens.

### Typography

Park UI provides `Heading` and `Text` components:

```tsx
import { Heading, Text, Code, Link } from '~/components/ui';

// Headings
<Heading as="h1" size="3xl">Page Title</Heading>
<Heading as="h2" size="2xl">Section Heading</Heading>
<Heading as="h3" size="xl">Card Title</Heading>
<Heading as="h4" size="lg">Subsection</Heading>

// Body text
<Text size="md">Default body text</Text>
<Text size="sm">Small text</Text>
<Text size="xs">Caption text</Text>
<Text size="lg">Large text</Text>

// Semantic text styling
<Text color="fg.muted">Secondary text</Text>
<Text fontWeight="semibold">Bold text</Text>

// Code
<Code size="sm">inline code</Code>

// Links
<Link href="/path">Click here</Link>
```

**With Panda CSS — typography tokens:**

```tsx
import { css } from '../styled-system/css';

css({ fontSize: 'sm' })          // 14px
css({ fontSize: 'md' })          // 16px (base)
css({ fontSize: 'lg' })          // 18px
css({ fontSize: 'xl' })          // 20px
css({ fontSize: '2xl' })         // 24px
css({ fontSize: '3xl' })         // 30px

css({ fontWeight: 'medium' })    // 500
css({ fontWeight: 'semibold' })  // 600
css({ fontWeight: 'bold' })      // 700

css({ lineHeight: 'tight' })     // 1.25
css({ lineHeight: 'normal' })    // 1.5
css({ lineHeight: 'relaxed' })   // 1.625
```

**With Tailwind CSS:**

```tsx
<h1 className="text-3xl font-bold tracking-tight">Page Title</h1>
<p className="text-sm text-fg-muted">Helper text</p>
```

Always use `Heading` and `Text` components or token-based font sizes. Never hardcode pixel font sizes.

### Dark Mode

Park UI supports dark mode through its token system. All semantic tokens automatically switch between light and dark values.

**With Panda CSS:**

```tsx
// panda.config.ts — dark mode is built into the preset
// Tokens like fg.default, bg.canvas, etc. auto-switch

// Toggle color mode (depends on framework)
// Next.js: use next-themes
import { ThemeProvider } from 'next-themes';

function App({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}
```

**With Tailwind CSS:**

```tsx
// tailwind.config.ts
export default {
  darkMode: 'class',
  // ...Park UI plugin handles token switching
};
```

Rules:
- Never hardcode colors — always use semantic tokens (`fg.default`, `bg.canvas`, etc.)
- Dark mode works automatically when you use Park UI tokens — no manual dark: prefixes needed for token-based colors
- Test both modes — if something looks wrong, you're using a raw color value
- Use `next-themes` (Next.js), `@vueuse/core` `useColorMode` (Vue), or your framework's preferred color scheme utility

### File Structure

```
src/
├── app/ or pages/              # Framework-specific routing
│   ├── layout.tsx              # Root layout with theme provider
│   └── [feature]/
│       └── page.tsx
├── components/
│   ├── ui/                     # Park UI components (copied in, customizable)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   └── ...
│   └── [feature]/              # Your composed components
│       ├── UserList.tsx
│       └── UserForm.tsx
├── lib/
│   └── utils.ts                # Shared utilities
├── hooks/                      # Custom hooks
├── services/                   # API calls
├── types/                      # TypeScript types
├── styled-system/              # Generated (Panda CSS only — do not edit)
│   ├── css/
│   ├── jsx/
│   ├── patterns/
│   └── tokens/
├── panda.config.ts             # Panda CSS config with Park UI preset (if using Panda)
└── tailwind.config.ts          # Tailwind config with Park UI plugin (if using Tailwind)
```

### Naming Conventions

- **Component files:** `kebab-case.tsx` in `components/ui/` (Park UI convention)
- **Feature components:** `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Component names:** `PascalCase` (e.g., `UserProfile`)
- **Hook files:** `camelCase.ts` prefixed with `use` (e.g., `useUserData.ts`)
- **Utility files:** `camelCase.ts` (e.g., `formatDate.ts`)
- **Panda CSS patterns:** use the generated `styled-system/` imports as-is
- **Constants:** `UPPER_SNAKE_CASE`

### Patterns

**Forms with Field wrapper:**

```tsx
import { Button, Field, Input, Select } from '~/components/ui';

<form onSubmit={handleSubmit}>
  <Stack gap="4">
    <Field.Root required>
      <Field.Label>Email</Field.Label>
      <Input placeholder="you@example.com" value={email} onChange={setEmail} />
      <Field.HelperText>We'll never share your email.</Field.HelperText>
      {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
    </Field.Root>

    <Field.Root>
      <Field.Label>Role</Field.Label>
      <Select.Root
        collection={roleCollection}
        onValueChange={(e) => setRole(e.value[0])}
      >
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a role" />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {roles.map((role) => (
              <Select.Item key={role.value} item={role}>
                <Select.ItemText>{role.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Field.Root>

    <Button type="submit">Save</Button>
  </Stack>
</form>
```

**Dialog (modal) pattern:**

```tsx
<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button variant="outline">Delete Item</Button>
  </Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Stack gap="4" p="6">
        <Dialog.Title>Delete Item</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone. Are you sure?
        </Dialog.Description>
        <HStack gap="3" justify="flex-end">
          <Dialog.CloseTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.CloseTrigger>
          <Button variant="solid" colorPalette="red" onClick={handleDelete}>
            Delete
          </Button>
        </HStack>
      </Stack>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

**Toast notifications:**

```tsx
import { createToaster } from '~/components/ui/toast';

const toaster = createToaster({ placement: 'bottom-end' });

// Trigger a toast
toaster.create({
  title: 'Saved',
  description: 'Your changes have been saved.',
  type: 'success',
});
```

**Loading states:** Use `Skeleton` components matching the shape of content they replace.

**Empty states:** Always handle empty data with a centered message and action. Never show a blank area.

**Responsive (Panda CSS):** `<Stack gap={{ base: '4', md: '6' }}>` — mobile-first responsive tokens.

**Responsive (Tailwind):** `<div className="flex flex-col gap-4 md:gap-6">` — mobile-first breakpoints.

### Framework Compatibility

Park UI works with React, Vue, and Solid. The component API is nearly identical across frameworks, with minor syntax differences:

```tsx
// React
<Button variant="solid" onClick={handleClick}>Click</Button>

// Vue
<Button variant="solid" @click="handleClick">Click</Button>

// Solid
<Button variant="solid" onClick={handleClick}>Click</Button>
```

Key differences:
- **React:** Use `onChange`, `onClick`, standard React event handlers
- **Vue:** Use `@click`, `v-model`, Vue template syntax. Import from `@ark-ui/vue` and Park UI Vue components
- **Solid:** Use `onClick`, `onInput`, Solid event handlers. Import from `@ark-ui/solid` and Park UI Solid components
- **Ark UI imports** differ by framework: `@ark-ui/react`, `@ark-ui/vue`, `@ark-ui/solid`

When setting up, install the correct framework-specific packages.

### Anti-Patterns — Do NOT

- Install other component libraries alongside Park UI (no MUI, Chakra, Ant Design, ShadCN)
- Use native HTML elements when a Park UI component exists (`<button>` -> `<Button>`, `<input>` -> `<Input>`)
- Override Park UI styles with raw CSS — customize via recipe variants or token overrides in the preset config
- Mix Panda CSS and Tailwind CSS in the same project — pick one and stay consistent
- Use `style={{}}` inline styles for layout/theming — use the styling engine's tokens
- Hardcode colors, font sizes, or spacing values — always use semantic tokens
- Forget the `asChild` prop when composing triggers (Dialog.Trigger, Tooltip.Trigger, etc.)
- Skip the `Positioner` wrapper on floating components (Select, Popover, Dialog, etc.) — it's required
- Create custom modals, tooltips, popovers, or dropdowns — use Park UI's slot-based components
- Use state management libraries for UI state that Ark UI already manages (open/close, selection, etc.)
- Edit files in `styled-system/` directory (Panda CSS) — they're generated and will be overwritten
- Forget to wrap the app in the appropriate theme provider for dark mode
- Use framework-default color utilities (`text-gray-500`, `color: gray.500`) instead of Park UI tokens (`text-fg-muted`, `fg.muted`)
- Skip dark mode support

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Components are functional, using hooks (React/Solid) or Composition API (Vue)
- Use Park UI's slot-based compound components — don't flatten the API
- Use `asChild` to compose triggers rather than wrapping in extra elements
- Keep components small and focused — one job per component
- Colocate related files (component + its types + its hooks/composables)
- [Prefer server components / client-only — depends on framework]

## Notes

[Any project-specific context]
