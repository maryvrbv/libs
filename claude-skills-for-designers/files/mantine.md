# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- React 18+ / Next.js (App Router)
- TypeScript
- Mantine v7
- CSS Modules (Mantine's default styling approach)
- PostCSS with `postcss-preset-mantine`
- [Data: Prisma / Drizzle / Supabase / etc.]
- [State: Zustand / React Query / etc.]

## Design System: Mantine v7

This project uses Mantine v7 — a fully-featured React component library with 100+ hooks and components, built-in form handling, CSS Modules as the default styling approach, and deep customization via MantineProvider. Styles are authored in CSS Modules (`.module.css`), not inline style objects or Tailwind.

### Component Usage

Always use Mantine components when available. Never build custom versions of components that already exist in the library.

**Layout & Structure:**
- `AppShell` — page scaffolding with header, navbar, aside, footer
- `Container` — centered max-width content wrapper
- `Grid` / `Grid.Col` — responsive column layouts (12-column)
- `SimpleGrid` — equal-width responsive grid (simpler than Grid)
- `Group` — horizontal flex layout with gap
- `Stack` — vertical flex layout with gap
- `Flex` — general flexbox wrapper
- `Space` — adds empty space (vertical or horizontal)
- `Center` — centers content horizontally and vertically
- `Card` — content containers
- `Paper` — generic surface with shadow and border
- `Divider` — visual separators
- `Tabs` — switching between views
- `Accordion` — expandable content panels
- `ScrollArea` — custom scrollable regions

**Forms & Input:**
- `TextInput` — single-line text
- `Textarea` — multi-line text
- `NumberInput` — numeric input with stepper
- `PasswordInput` — password with visibility toggle
- `Select` — dropdown (searchable, creatable)
- `MultiSelect` — multi-value dropdown
- `Checkbox` / `Checkbox.Group` — multi-selection toggles
- `Radio` / `Radio.Group` — single-selection toggles
- `Switch` — boolean toggles
- `Slider` / `RangeSlider` — range input
- `DatePickerInput` / `DateTimePicker` — date selection (from `@mantine/dates`)
- `FileInput` / `Dropzone` — file upload (Dropzone from `@mantine/dropzone`)
- `ColorInput` / `ColorPicker` — color selection
- `PinInput` — OTP/PIN code input
- `TagsInput` — tag entry
- `JsonInput` — JSON editing with validation
- `SegmentedControl` — iOS-style segmented toggle
- `Chip` / `Chip.Group` — selectable tag-style toggles
- `Rating` — star rating

**Feedback & Overlay:**
- `Modal` — dialogs (not custom modals)
- `Drawer` — slide-out panels
- `Notifications` — toast system (from `@mantine/notifications`)
- `Tooltip` — hover hints
- `Popover` — contextual floating content
- `HoverCard` — rich hover previews
- `Alert` — inline status messages
- `LoadingOverlay` — overlay spinner on any container
- `Progress` / `RingProgress` — progress indicators
- `Skeleton` — loading placeholders
- `Dialog` — non-modal floating dialog

**Navigation:**
- `NavLink` — sidebar navigation items (supports nesting, icons, active state)
- `Breadcrumbs` — hierarchical location
- `Stepper` — multi-step workflows
- `Menu` — action dropdowns on click
- `Spotlight` — command palette (from `@mantine/spotlight`)
- `Burger` — mobile menu toggle
- `Pagination` — page navigation
- `Anchor` — styled links

**Data Display:**
- `Table` — basic table (for simple cases)
- `Badge` — status labels and counts
- `Avatar` / `Avatar.Group` — user images with fallback
- `Indicator` — notification dot on any element
- `Timeline` — chronological events
- `List` — styled lists
- `ThemeIcon` — icons in colored circles
- `Blockquote` — styled quotes
- `Code` — inline and block code
- `Kbd` — keyboard shortcut display
- `Spoiler` — show more/less text

**Actions:**
- `Button` — primary actions. Variants: `filled`, `outline`, `light`, `subtle`, `transparent`, `default`, `white`
- `ActionIcon` — icon-only buttons
- `CopyButton` — copy-to-clipboard with state
- `FileButton` — file picker styled as button
- `UnstyledButton` — bare button for custom styling
- `CloseButton` — standard close icon button

### Hooks Library

Mantine includes 50+ hooks. Use them instead of writing custom logic:

**UI State:**
- `useDisclosure` — boolean state with `open`, `close`, `toggle` (for modals, drawers, etc.)
- `useToggle` — cycle between values
- `useClickOutside` — detect clicks outside an element
- `useFocusTrap` — trap focus within a container
- `useScrollIntoView` — scroll to element

**Responsive & Viewport:**
- `useMediaQuery` — responsive breakpoint matching
- `useViewportSize` — current viewport width/height
- `useElementSize` — element dimensions
- `useIntersection` — intersection observer
- `useResizeObserver` — element resize tracking

**Forms & Input:**
- `useForm` — full form state management (from `@mantine/form`)
- `useInputState` — controlled input helper
- `useDebouncedValue` — debounce any value
- `useDebouncedCallback` — debounce a callback

**Data & State:**
- `useLocalStorage` — synced with localStorage
- `useSessionStorage` — synced with sessionStorage
- `useClipboard` — copy-to-clipboard
- `useDocumentTitle` — update page title
- `useColorScheme` — detect OS color preference
- `usePrevious` — previous value of a variable
- `useCounter` — increment/decrement state
- `useListState` — array manipulation state (add, remove, reorder, apply)
- `useMap` / `useSet` — Map/Set state wrappers

**Utilities:**
- `useId` — unique ID generation (SSR-safe)
- `useInterval` — interval management
- `useTimeout` — timeout management
- `useOs` — detect operating system
- `useNetwork` — network status
- `useIdle` — detect user idle

### Form Handling

Always use `@mantine/form` for form state and validation:

```tsx
import { useForm } from '@mantine/form';
import { TextInput, Select, Button, Stack } from '@mantine/core';

function UserForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      name: '',
      role: 'user',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack gap="md">
        <TextInput
          label="Name"
          placeholder="Your name"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Email"
          placeholder="you@example.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <Select
          label="Role"
          data={['user', 'admin', 'editor']}
          key={form.key('role')}
          {...form.getInputProps('role')}
        />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
}
```

Key patterns:
- Use `mode: 'uncontrolled'` for better performance (v7 default)
- Use `form.key('fieldName')` for proper uncontrolled mode key handling
- Spread `{...form.getInputProps('fieldName')}` onto inputs
- Use `form.onSubmit()` — it prevents default and validates
- Validation supports functions, regex, and schema (zod via `mantine-form-zod-resolver`)

### Polymorphic Components

Many Mantine components accept a `component` prop to change the rendered element:

```tsx
// Button rendered as a link
<Button component="a" href="/dashboard">Go to Dashboard</Button>

// Button rendered as Next.js Link
import Link from 'next/link';
<Button component={Link} href="/dashboard">Go to Dashboard</Button>

// Card rendered as an anchor
<Card component="a" href="/item/1">Click me</Card>

// Text rendered as a label
<Text component="label" htmlFor="input-id">Label</Text>
```

Always use `component` prop instead of wrapping Mantine components in native elements.

### Spacing

Mantine uses a named spacing scale via `theme.spacing`. The default values:

```
xs = 10px
sm = 12px
md = 16px
lg = 20px
xl = 32px
```

Use spacing tokens in components and CSS Modules:

```tsx
// In components — use named tokens
<Stack gap="md">         // 16px gap
<Group gap="sm">         // 12px gap
<Container p="xl">       // 32px padding
<Card padding="lg">      // 20px padding

// Responsive spacing
<Stack gap={{ base: 'sm', md: 'lg' }}>
```

```css
/* In CSS Modules — use CSS variables */
.section {
  padding: var(--mantine-spacing-md);      /* 16px */
  margin-bottom: var(--mantine-spacing-lg); /* 20px */
  gap: var(--mantine-spacing-sm);           /* 12px */
}
```

Never use arbitrary pixel values. Always use spacing tokens.

### Color System

Mantine uses a color palette with 10 shades (0-9) per color. Customize via `MantineProvider` theme.

**Built-in colors:** `blue`, `red`, `green`, `yellow`, `orange`, `cyan`, `teal`, `violet`, `grape`, `pink`, `indigo`, `lime`, `dark`, `gray`.

Usage in components:

```tsx
<Button color="blue">Default shade (filled[6])</Button>
<Button color="violet" variant="light">Light violet</Button>
<Badge color="green">Active</Badge>
<Alert color="red" title="Error">Something went wrong</Alert>
<ThemeIcon color="cyan" variant="light"><IconCheck /></ThemeIcon>
```

Usage in CSS Modules:

```css
.highlight {
  color: var(--mantine-color-blue-6);
  background-color: var(--mantine-color-blue-0);
  border: 1px solid var(--mantine-color-blue-2);
}

.muted {
  color: var(--mantine-color-dimmed);        /* secondary text */
}

.surface {
  background: var(--mantine-color-body);     /* page background */
  color: var(--mantine-color-text);          /* primary text */
}

.card {
  background: var(--mantine-color-default);  /* card surface */
  border: 1px solid var(--mantine-color-default-border);
}
```

Key CSS variables:
```
--mantine-color-text          — primary text
--mantine-color-dimmed        — secondary / muted text
--mantine-color-body          — page background
--mantine-color-default       — surface background (cards, inputs)
--mantine-color-default-border — default border color
--mantine-primary-color-filled — primary button/accent color
--mantine-primary-color-light — light variant of primary
```

Never use raw hex colors in component props or CSS Modules. Always use Mantine color tokens.

### Typography

Mantine provides `Title` and `Text` components:

```tsx
import { Title, Text, Highlight, Mark, Anchor } from '@mantine/core';

// Headings (Title maps to h1-h6)
<Title order={1}>Page Title</Title>        // h1 — 34px bold
<Title order={2}>Section Heading</Title>   // h2 — 26px bold
<Title order={3}>Card Title</Title>        // h3 — 22px bold
<Title order={4}>Subsection</Title>        // h4 — 18px bold

// Body text
<Text>Default text</Text>                  // 16px (md)
<Text size="sm">Small text</Text>          // 14px
<Text size="xs">Caption text</Text>        // 12px
<Text size="lg">Large text</Text>          // 18px

// Semantic variants
<Text c="dimmed">Secondary text</Text>     // muted color
<Text fw={700}>Bold text</Text>            // font-weight
<Text td="underline">Underlined</Text>
<Text tt="uppercase">Uppercase</Text>
<Text fs="italic">Italic text</Text>
<Text truncate="end">Long text that truncates...</Text>
<Text lineClamp={2}>Multi-line text that clamps to 2 lines...</Text>

// Special
<Highlight highlight="keyword">Text with highlighted keyword</Highlight>
<Mark>Marked text</Mark>
<Anchor href="/path">Link text</Anchor>
```

CSS Module variables for custom styles:

```css
.heading {
  font-size: var(--mantine-font-size-xl);   /* 20px */
  font-weight: 700;
  line-height: var(--mantine-line-height);
}

.caption {
  font-size: var(--mantine-font-size-xs);   /* 12px */
  color: var(--mantine-color-dimmed);
}
```

Always use `Title` for headings and `Text` for body content. Never use raw `<h1>` or `<p>` elements.

### Dark Mode

Mantine handles dark mode via `MantineProvider` and the `forceColorScheme` or `defaultColorScheme` prop:

```tsx
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: "'Inter', sans-serif",
  defaultRadius: 'md',
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <AppContent />
    </MantineProvider>
  );
}
```

Toggle color scheme in components:

```tsx
import { useMantineColorScheme, ActionIcon } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon onClick={toggleColorScheme} variant="default" size="lg">
      {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
}
```

Rules:
- Use `light-dark()` CSS function in CSS Modules for mode-specific values
- Use `var(--mantine-color-*)` tokens — they switch automatically
- Never hardcode colors for light or dark mode separately
- Test both modes — if something breaks, you're using a raw color value

CSS Modules with dark mode:

```css
.card {
  background: light-dark(var(--mantine-color-white), var(--mantine-color-dark-6));
  border: 1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4));
}
```

### Styling with CSS Modules

Mantine v7 uses CSS Modules as the default styling approach. Do not use inline styles for layout/theming.

```tsx
// UserCard.tsx
import classes from './UserCard.module.css';
import { Card, Text, Group, Badge } from '@mantine/core';

function UserCard({ user }: { user: User }) {
  return (
    <Card className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.name}>{user.name}</Text>
        <Badge color={user.active ? 'green' : 'gray'}>
          {user.active ? 'Active' : 'Inactive'}
        </Badge>
      </Group>
      <Text className={classes.email}>{user.email}</Text>
    </Card>
  );
}
```

```css
/* UserCard.module.css */
.card {
  padding: var(--mantine-spacing-lg);
  border: 1px solid var(--mantine-color-default-border);
  transition: box-shadow 150ms ease;
}

.card:hover {
  box-shadow: var(--mantine-shadow-md);
}

.name {
  font-weight: 600;
  font-size: var(--mantine-font-size-md);
}

.email {
  color: var(--mantine-color-dimmed);
  font-size: var(--mantine-font-size-sm);
}
```

### File Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout with MantineProvider
│   ├── page.tsx
│   └── [feature]/
│       └── page.tsx
├── components/
│   ├── common/               # Shared composed components
│   │   ├── PageHeader.tsx
│   │   ├── PageHeader.module.css
│   │   ├── DataTable.tsx
│   │   └── FormModal.tsx
│   └── [feature]/            # Feature-specific components
│       ├── UserList.tsx
│       ├── UserList.module.css
│       └── UserForm.tsx
├── hooks/                    # Custom hooks (supplement Mantine hooks)
├── services/                 # API calls
├── theme/
│   └── theme.ts              # createTheme() config
├── types/                    # TypeScript types
└── utils/                    # Shared utilities
postcss.config.mjs            # PostCSS config with postcss-preset-mantine
```

### Naming Conventions

- **Component files:** `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **CSS Module files:** `PascalCase.module.css` (colocated with component)
- **Component names:** `PascalCase` (e.g., `UserProfile`)
- **Hook files:** `camelCase.ts` prefixed with `use` (e.g., `useUserData.ts`)
- **Utility files:** `camelCase.ts` (e.g., `formatDate.ts`)
- **CSS class names:** `camelCase` in CSS Modules (e.g., `.cardHeader`)
- **Constants:** `UPPER_SNAKE_CASE`

### Anti-Patterns — Do NOT

- Install other component libraries alongside Mantine (no MUI, Chakra, Ant Design, ShadCN)
- Use native HTML elements when a Mantine component exists (`<button>` -> `<Button>`, `<input>` -> `<TextInput>`)
- Use inline `style={{}}` for layout/theming — use CSS Modules with Mantine CSS variables
- Use Tailwind CSS alongside Mantine (Mantine uses CSS Modules and its own token system)
- Use Emotion or styled-components — Mantine v7 removed Emotion in favor of CSS Modules
- Hardcode colors, font sizes, or spacing — always use Mantine tokens/variables
- Wrap Mantine components in native elements for styling — use `className` or `component` prop
- Use `useForm` from `react-hook-form` — use `@mantine/form` `useForm` instead
- Forget to import `@mantine/core/styles.css` in the root layout
- Forget `postcss-preset-mantine` in PostCSS config (required for `light-dark()` and other features)
- Create custom modal, tooltip, or dropdown components — use Mantine's
- Use `useEffect` for things Mantine hooks already handle (debounce, localStorage, media queries)
- Skip dark mode support

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Components are functional, using hooks
- Prefer server components where possible (Next.js App Router)
- Client components only when interactivity is needed (`"use client"`)
- Keep components small and focused — one job per component
- Colocate component + CSS Module + types
- Use Mantine hooks before writing custom hook logic
- All form state managed by `@mantine/form`

## Notes

[Any project-specific context]
