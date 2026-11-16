# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [React / Next.js / HTML + JS / Vite]
- [TypeScript / JavaScript]
- Bootstrap 5
- [React-Bootstrap — if using React]
- [Data layer: as needed]

## Design System: Bootstrap 5

This project uses Bootstrap 5 — the most widely adopted CSS framework. Bootstrap provides a utility-first CSS layer, a responsive grid system, and pre-built components. If using React, components come from React-Bootstrap (which wraps Bootstrap's markup in React components).

### Component Usage — React-Bootstrap

If using React, always use React-Bootstrap components. They handle state, accessibility, and proper Bootstrap markup.

**Layout:**
- `Container` — max-width page wrapper (`fluid` for full-width)
- `Row` + `Col` — 12-column responsive grid
- `Stack` — flex layout with `gap` prop (vertical by default, `direction="horizontal"` for horizontal)
- `Card` / `Card.Header` / `Card.Body` / `Card.Footer` — content containers
- `ListGroup` / `ListGroup.Item` — styled lists

**Navigation:**
- `Navbar` + `Nav` — responsive top navigation with collapse
- `Nav` + `Nav.Item` + `Nav.Link` — tab or pill navigation
- `Breadcrumb` — hierarchical location
- `Pagination` — page navigation
- `Offcanvas` — slide-out panel (sidebar navigation on mobile)

**Forms:**
- `Form.Group` + `Form.Label` + `Form.Control` — standard text inputs
- `Form.Select` — native dropdowns
- `Form.Check` — checkboxes, radios, switches (`type="checkbox"`, `type="radio"`, `type="switch"`)
- `Form.Range` — range sliders
- `FloatingLabel` — labels that animate into the border
- `InputGroup` — input with addons (icons, buttons, text)
- `Form.Text` — help text below inputs

**Feedback & Overlay:**
- `Modal` / `Modal.Header` / `Modal.Body` / `Modal.Footer` — dialogs
- `Toast` / `ToastContainer` — transient notifications
- `Alert` — dismissible inline messages (variant: primary, success, danger, warning, info)
- `Tooltip` — hover explanations (wrap trigger in `OverlayTrigger`)
- `Popover` — click-triggered rich content (wrap in `OverlayTrigger`)
- `Spinner` — loading indicators (`animation="border"` or `animation="grow"`)
- `Placeholder` — content loading skeletons
- `ProgressBar` — progress indicators

**Data Display:**
- `Table` — styled tables (props: `striped`, `bordered`, `hover`, `responsive`)
- `Badge` — status labels (variant: primary, secondary, success, danger, etc.)
- `Accordion` — collapsible content sections
- `Carousel` — image/content slideshows
- `Image` — responsive images (`fluid`, `rounded`, `thumbnail`)
- `Figure` — image with caption

**Actions:**
- `Button` — variants: `primary`, `secondary`, `outline-primary`, `outline-secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `link`
- `ButtonGroup` — grouped buttons
- `Dropdown` / `DropdownButton` / `SplitButton` — action menus
- `CloseButton` — dismiss actions

### Component Usage — Vanilla HTML

If NOT using React, use Bootstrap's HTML classes:

```html
<!-- Button -->
<button class="btn btn-primary">Primary</button>

<!-- Card -->
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Title</h5>
    <p class="card-text">Content</p>
  </div>
</div>

<!-- Form -->
<div class="mb-3">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control" id="email">
  <div class="form-text">Help text</div>
</div>

<!-- Grid -->
<div class="container">
  <div class="row g-4">
    <div class="col-md-6">Column 1</div>
    <div class="col-md-6">Column 2</div>
  </div>
</div>
```

### Grid System

Bootstrap uses a 12-column responsive grid:

```tsx
// React-Bootstrap
<Container>
  <Row className="g-4">
    <Col xs={12} md={6} lg={4}>Content</Col>
    <Col xs={12} md={6} lg={4}>Content</Col>
    <Col xs={12} md={6} lg={4}>Content</Col>
  </Row>
</Container>
```

**Breakpoints:**
| Prefix | Min width | Typical device |
|--------|-----------|---------------|
| (none) | 0 | Extra small (phones portrait) |
| `sm` | 576px | Phones landscape |
| `md` | 768px | Tablets |
| `lg` | 992px | Desktops |
| `xl` | 1200px | Large desktops |
| `xxl` | 1400px | Extra large |

**Rules:**
- Always use the grid for page layout — don't manually set widths
- Use `g-*` (gap) classes on `Row` for gutters: `g-3`, `g-4`, `g-5`
- Stack on mobile (`col-12`), split on desktop (`col-md-6`)

### Spacing

Bootstrap uses a spacing scale based on `$spacer` (default 1rem = 16px):

| Class | Value | Use |
|-------|-------|-----|
| `*-1` | 0.25rem (4px) | Tight spacing |
| `*-2` | 0.5rem (8px) | Inline gaps |
| `*-3` | 1rem (16px) | Standard content spacing |
| `*-4` | 1.5rem (24px) | Section gaps, card padding |
| `*-5` | 3rem (48px) | Page sections |

Apply as utility classes: `p-3` (padding), `m-3` (margin), `mb-4` (margin-bottom), `px-3` (horizontal padding), `gap-3` (flex/grid gap).

In React-Bootstrap with `className`:
```tsx
<Card className="p-4 mb-3">
<Stack gap={3}>
```

### Color System

Bootstrap provides semantic color variants used across all components:

| Variant | Use |
|---------|-----|
| `primary` | Main brand actions, key CTAs |
| `secondary` | Supporting actions |
| `success` | Positive feedback, confirmations |
| `danger` | Errors, destructive actions |
| `warning` | Cautions, attention-needed |
| `info` | Informational, neutral highlights |
| `light` | Subtle backgrounds, secondary elements |
| `dark` | Strong emphasis |

Apply as `variant` prop (React-Bootstrap) or class suffix (vanilla):
```tsx
<Button variant="primary">Save</Button>
<Alert variant="danger">Error message</Alert>
<Badge bg="success">Active</Badge>
```

**Utility color classes:**
- Text: `text-body` (default), `text-body-secondary` (muted), `text-body-tertiary` (subtle)
- Background: `bg-body` (page), `bg-body-secondary` (surface), `bg-body-tertiary` (subtle)
- Border: `border-*` matches variants

**Dark mode:** Bootstrap 5.3+ supports `data-bs-theme="dark"` on `<html>` or any container. Semantic colors adapt automatically.

### Typography

Use Bootstrap's type scale:

```html
<!-- Headings -->
<h1 class="display-1">Hero text</h1>     <!-- 5rem, very large -->
<h1>Page title</h1>                        <!-- 2.5rem -->
<h2>Section heading</h2>                   <!-- 2rem -->
<h3>Subsection</h3>                        <!-- 1.75rem -->
<h4>Card title</h4>                        <!-- 1.5rem -->

<!-- Body -->
<p>Default body text</p>                   <!-- 1rem -->
<p class="lead">Emphasized intro</p>       <!-- 1.25rem -->
<p><small class="text-body-secondary">Secondary text</small></p>
```

**Rules:**
- Use `display-*` classes only for hero/marketing sections (1-6 scale)
- Use `lead` for introductory paragraphs
- Use `text-body-secondary` for muted/helper text
- Use `fw-bold`, `fw-semibold`, `fw-normal` for weight — not custom CSS

### File Structure

```
src/
├── app/                    # Pages / routes
├── components/
│   ├── layout/             # Navbar, Footer, PageContainer
│   └── [feature].tsx       # Feature components
├── lib/
│   └── utils.ts            # Shared utilities
└── styles/
    ├── custom.scss          # Bootstrap variable overrides (import BEFORE bootstrap)
    └── globals.scss         # @import "bootstrap/scss/bootstrap";
```

To customize Bootstrap, override SCSS variables before importing:
```scss
// custom.scss
$primary: #6f42c1;
$border-radius: 0.5rem;
$font-family-base: 'Inter', sans-serif;

@import "bootstrap/scss/bootstrap";
```

### Naming Conventions

- **Files:** `kebab-case.tsx`
- **Components:** `PascalCase`
- **Custom CSS classes:** use Bootstrap utilities first, custom classes only when utilities can't achieve the result
- **SCSS variables:** override Bootstrap's `$variable` names, don't create parallel systems

### Patterns

**Forms:**
```tsx
<Form>
  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="you@example.com" isInvalid={!!errors.email} />
    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
  </Form.Group>
  <Button variant="primary" type="submit">Sign In</Button>
</Form>
```

**Loading:** `Placeholder` components for content, `Spinner` for actions.

**Empty states:** Centered `text-center` div with icon, heading, body text, and action button.

**Responsive:** Mobile-first. Use `col-*` for mobile, `col-md-*` for tablet, `col-lg-*` for desktop.

### Anti-Patterns — Do NOT

- Mix Bootstrap with Tailwind, MUI, or other CSS frameworks
- Write custom CSS for things Bootstrap utilities handle (`mt-3` not `margin-top: 1rem`)
- Use native `<button>`, `<input>`, `<table>` without Bootstrap classes
- Override Bootstrap with `!important` — use SCSS variable customization instead
- Use inline `style={{}}` for layout — use grid + utility classes
- Create custom modals, dropdowns, or tooltips — use Bootstrap's
- Hardcode colors — use variant props and semantic classes
- Skip the grid system for page layout
- Use `display-*` typography classes for regular headings

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Functional components with hooks (if React)
- Bootstrap utilities for spacing, color, typography — custom CSS only as last resort
- SCSS variable overrides for theming, not CSS overrides
- Responsive design is mobile-first: start with small breakpoint, add larger ones

## Notes

[Any project-specific context]
