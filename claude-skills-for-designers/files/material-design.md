# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [React / Next.js / Vite + React]
- TypeScript
- MUI (Material UI) v6
- Emotion (MUI's default styling engine)
- [Data layer: Prisma / Drizzle / Supabase / etc.]

## Design System: Material Design 3

This project follows Google's Material Design 3 (Material You) guidelines, implemented through MUI. Material Design 3 emphasizes dynamic color, personal expression, and accessible, consistent UI.

### Component Usage

Always use MUI components. Never create custom versions of components MUI already provides.

**Layout & Surfaces:**
- `Container` — max-width page wrapper
- `Box` — generic layout container (replaces divs)
- `Stack` — flex layout with consistent spacing (vertical or horizontal)
- `Grid2` — responsive grid layout (use v2 grid, not legacy)
- `Paper` — elevated surface. Use `elevation` for depth: 0 (flat), 1 (card), 2 (raised card), 3 (floating)
- `Card` / `CardContent` / `CardActions` / `CardMedia` — content containers
- `Divider` — visual separator
- `Accordion` / `AccordionSummary` / `AccordionDetails` — expandable panels

**Navigation:**
- `AppBar` + `Toolbar` — top app bar (use `position="sticky"`)
- `Drawer` — side navigation (permanent, persistent, or temporary)
- `BottomNavigation` — mobile bottom tabs (3-5 items)
- `Tabs` / `Tab` — horizontal tab navigation
- `Breadcrumbs` — hierarchical location
- `Link` — styled navigation links
- `SpeedDial` — floating action button with expandable actions
- `Stepper` — multi-step flows

**Input & Forms:**
- `TextField` — text input. Always use `variant="outlined"` (MD3 default). Always set `label` prop.
- `Select` — dropdown selection
- `Autocomplete` — searchable selection / combobox
- `Checkbox` / `Radio` / `Switch` — boolean inputs
- `Slider` — range selection
- `Rating` — star/icon rating
- `DatePicker` / `TimePicker` — date/time (from `@mui/x-date-pickers`)
- `FormControl` + `FormLabel` + `FormHelperText` — form field wrappers
- `InputAdornment` — prefix/suffix icons in text fields

**Feedback & Overlay:**
- `Dialog` / `DialogTitle` / `DialogContent` / `DialogActions` — modals
- `Snackbar` + `Alert` — transient notifications
- `Alert` — inline feedback (success, info, warning, error)
- `Backdrop` — overlay behind dialogs
- `CircularProgress` / `LinearProgress` — loading indicators
- `Skeleton` — content loading placeholders
- `Tooltip` — hover explanations

**Data Display:**
- `Table` / `TableHead` / `TableBody` / `TableRow` / `TableCell` — tabular data
- `DataGrid` — advanced tables (from `@mui/x-data-grid`)
- `List` / `ListItem` / `ListItemText` / `ListItemIcon` — list layouts
- `Chip` — tags, filters, compact selections
- `Badge` — notification indicators
- `Avatar` — user images with text fallback
- `Typography` — all text rendering (never use raw `<p>`, `<h1>`, etc.)

**Actions:**
- `Button` — variants: `contained` (primary), `outlined` (secondary), `text` (tertiary)
- `IconButton` — icon-only actions
- `Fab` — floating action button (one per screen, primary action)
- `ButtonGroup` — grouped related actions
- `ToggleButton` / `ToggleButtonGroup` — state-based selections
- `Menu` / `MenuItem` — contextual action menus

### Spacing

MUI uses an 8px spacing system. The `spacing()` function multiplies by 8:

- `spacing(1)` = 8px
- `spacing(2)` = 16px
- `spacing(3)` = 24px
- `spacing(4)` = 32px

Apply through the `sx` prop:
```tsx
<Box sx={{ p: 3, mb: 2, gap: 2 }}>  // p=24px, mb=16px, gap=16px
<Stack spacing={2}>                   // 16px between children
```

**Standard spacing:**
- **Page padding:** `p: 3` (24px)
- **Card padding:** `p: 3` (24px) or `p: 2` (16px) for compact cards
- **Section gaps:** `spacing={3}` in Stack
- **Form field gaps:** `spacing={2.5}` in Stack
- **Inline gaps:** `spacing={1}` or `spacing={1.5}`

Never use pixel values directly. Always use the spacing scale.

### Color System

Material Design 3 uses a tonal color system. Define your theme using `createTheme`:

```tsx
const theme = createTheme({
  palette: {
    primary: { main: '#6750A4' },      // Key brand color
    secondary: { main: '#625B71' },     // Supporting color
    error: { main: '#B3261E' },         // Error states
    warning: { main: '#F9A825' },       // Warnings
    info: { main: '#0288D1' },          // Informational
    success: { main: '#2E7D32' },       // Success states
    background: {
      default: '#FFFBFE',               // Page background
      paper: '#FFFBFE',                 // Surface/card background
    },
    text: {
      primary: '#1C1B1F',              // Main text
      secondary: '#49454F',            // Secondary text
      disabled: '#1C1B1F61',           // Disabled text
    },
  },
});
```

**Usage:**
- `color="primary"` — key actions, FABs, active states
- `color="secondary"` — supporting actions, chips, less prominent elements
- `color="error"` — destructive actions, error states
- `sx={{ color: 'text.secondary' }}` — secondary text
- `sx={{ bgcolor: 'background.paper' }}` — card/surface backgrounds

**Rules:**
- Never use hex codes directly in components — use theme tokens
- Always provide both light and dark palette variants in the theme
- Use `alpha()` from `@mui/material/styles` for transparency, not opacity hacks

### Typography

Material Design 3 type scale — use through the `Typography` component:

```tsx
<Typography variant="displayLarge">Display</Typography>
<Typography variant="headlineLarge">Headline</Typography>
<Typography variant="titleLarge">Title</Typography>
<Typography variant="bodyLarge">Body</Typography>
<Typography variant="labelLarge">Label</Typography>
```

Mapping to MUI variants:
- **Display:** `h1` — hero sections, landing pages
- **Headline:** `h2`, `h3` — page titles, section headers
- **Title:** `h4`, `h5`, `h6` — card titles, dialog titles
- **Body:** `body1` (default), `body2` (smaller) — paragraph text
- **Label:** `button`, `caption`, `overline` — UI labels, buttons, metadata

**Rules:**
- Always use `<Typography>` — never `<p>`, `<h1>`, `<span>` for text
- Never set font sizes manually — use the variant scale
- Use `gutterBottom` for headings that need spacing below

### Elevation & Surface

Material Design 3 uses tonal elevation (surface tint) rather than just shadows:

- **Level 0:** `elevation={0}` — flat surface, page background
- **Level 1:** `elevation={1}` — cards, list items
- **Level 2:** `elevation={2}` — raised cards, menus on hover
- **Level 3:** `elevation={3}` — floating elements, FAB
- **Level 4+:** Dialogs, drawers

In dark mode, higher elevation = lighter surface (tonal elevation). MUI handles this automatically.

### Dark Mode

Set up with `createTheme` and provide both palettes. Use `CssBaseline` to apply background:

```tsx
const theme = createTheme({
  colorSchemes: {
    light: { palette: { /* ... */ } },
    dark: { palette: { /* ... */ } },
  },
});
```

Let MUI handle the rest. Never hardcode colors.

### File Structure

```
src/
├── app/                   # Pages / routes
├── components/
│   ├── layout/            # AppBar, Drawer, Footer, PageContainer
│   └── [feature]/         # Feature-specific components
├── theme/
│   ├── theme.ts           # createTheme configuration
│   └── ThemeProvider.tsx   # Theme context wrapper
├── lib/
│   └── utils.ts           # Shared utilities
└── styles/
    └── globals.css        # Minimal — MUI handles most styling
```

### Naming Conventions

- **Files:** `PascalCase.tsx` for components, `camelCase.ts` for utilities
- **Components:** `PascalCase`
- **Theme tokens:** use MUI's `theme.palette`, `theme.spacing`, `theme.typography` — never create parallel systems
- **sx prop:** preferred for one-off styles. Use `styled()` for reusable styled components.

### Patterns

**Forms:** Group fields in a `Stack`, wrap each in `FormControl` when validation is needed:
```tsx
<Stack spacing={2.5}>
  <TextField label="Email" required error={!!errors.email} helperText={errors.email} />
  <TextField label="Password" type="password" required />
  <Button variant="contained" type="submit">Sign In</Button>
</Stack>
```

**Loading states:** Use `Skeleton` components matching the layout. Use `CircularProgress` for actions.

**Empty states:** Centered `Stack` with an icon, title, description, and action button.

**Responsive:** Use MUI's breakpoint system:
```tsx
sx={{ display: { xs: 'none', md: 'flex' } }}
<Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
```

### Anti-Patterns — Do NOT

- Mix MUI with other component libraries (Chakra, Ant Design, ShadCN)
- Use Tailwind CSS alongside MUI — use `sx` prop or `styled()` instead
- Create custom buttons, modals, or inputs when MUI provides them
- Use raw HTML elements (`<button>`, `<input>`, `<p>`) — use MUI components
- Hardcode colors, font sizes, or spacing values
- Use `makeStyles` (deprecated) — use `sx` prop or `styled()`
- Put more than one FAB on a screen
- Use `elevation` above 6 — it looks unnatural
- Skip `CssBaseline` — it normalizes styles and applies theme background
- Create custom theme tokens outside the MUI theme system

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Functional components with hooks
- TypeScript strict mode
- All styling through `sx` prop or `styled()` — no CSS modules, no Tailwind
- Theme is the single source of truth for design decisions
- Colocate components with their feature

## Notes

[Any project-specific context]
