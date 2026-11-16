# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / React / Vue / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- [Component Library: ShadCN/UI / custom / etc.]

## Workflow: Redesigning an Existing App

This project is being redesigned — updating the visual layer while preserving existing functionality. This file defines the process for auditing, planning, and executing a systematic redesign without breaking what works.

### Phase 1: Audit What Exists

Before changing anything, build a complete picture of the current codebase.

**Component inventory:**
```
1. List every component in the project
2. Note which are reused vs. one-off
3. Identify shared patterns (all cards look similar? all forms structured the same?)
4. Flag components with inline styles, mixed styling approaches, or tech debt
```

```bash
# Quick audit — find all component files
find src/components -name "*.tsx" -o -name "*.jsx" | sort

# Find all CSS files and modules
find src -name "*.css" -o -name "*.scss" -o -name "*.module.css" | sort

# Find inline styles
grep -rn "style={{" src/ --include="*.tsx" --include="*.jsx"

# Find all color values (potential inconsistencies)
grep -rn "#[0-9a-fA-F]\{3,6\}" src/ --include="*.css" --include="*.tsx"
```

**Screen inventory — document every page and state:**

| Screen | Route | States | Components Used |
|--------|-------|--------|----------------|
| Home | `/` | Default, loading | Header, Hero, FeatureGrid, Footer |
| Dashboard | `/dashboard` | Empty, populated, loading, error | Sidebar, StatsCards, Table, Header |
| Settings | `/settings` | Default, saving, success | Form, Input, Button, Tabs |
| Login | `/login` | Default, loading, error | Form, Input, Button |

**Document interactive states for each component:**
- Default / resting
- Hover
- Active / pressed
- Focused (keyboard)
- Disabled
- Loading
- Error
- Empty / no data

### Phase 2: Define the Target

Before writing code, establish the design direction:

```
1. Define design tokens (colors, spacing, typography, radii, shadows)
2. Choose or build the component library (ShadCN, Radix, custom)
3. Create a component mapping: old component → new component
4. Decide on styling approach (Tailwind, CSS Modules, styled-components)
5. Set responsive breakpoints
```

**Component mapping table:**

| Old Component | New Component | Changes |
|--------------|--------------|---------|
| `<OldButton>` | `<Button>` (ShadCN) | New variants, sizes, consistent styling |
| `<CustomModal>` | `<Dialog>` (ShadCN) | Standardized overlay, animation, a11y |
| `<DataTable>` | `<Table>` (ShadCN) | Consistent headers, rows, pagination |
| `<TextInput>` | `<Input>` + `<Label>` | Form field pattern with validation |
| `<Notification>` | `<Toast>` (Sonner) | Standardized positioning and animation |
| Inline color pickers | CSS variables | Centralized theme |

### Phase 3: Incremental Replacement Strategy

Never rewrite the entire app at once. Replace components systematically while keeping the app functional.

**Two approaches:**

**File-by-file (bottom-up):** Replace components one at a time, starting with the most reused ones.
```
Week 1: Replace Button across the app
Week 2: Replace Input, Label, Form fields
Week 3: Replace Card, Table
Week 4: Replace Dialog, Dropdown, navigation
Week 5: Page-level layout updates
```

**Feature-by-feature (top-down):** Redesign one page/feature completely, then move to the next.
```
Week 1: Redesign the Login page (contained, few components)
Week 2: Redesign the Settings page
Week 3: Redesign the Dashboard
Week 4: Redesign the Home/Landing page
```

**Which to choose:**
- **File-by-file** when: the component library is the main change, layout stays similar
- **Feature-by-feature** when: layout and UX are changing significantly, not just styling

### Phase 4: Replace Components Systematically

For each component replacement:

```
1. Create the new component (or install from library)
2. Find all usages of the old component
3. Update imports and props in each file
4. Verify functionality after each file change
5. Remove the old component file once all usages are migrated
```

```bash
# Find all usages of the old component
grep -rn "<OldButton" src/ --include="*.tsx" --include="*.jsx"
grep -rn "from.*OldButton" src/ --include="*.tsx" --include="*.jsx"
```

**Replacement example:**

```tsx
// BEFORE: Old custom button with inline styles
<OldButton
  color="blue"
  size="large"
  onClick={handleSubmit}
  loading={isLoading}
>
  Save Changes
</OldButton>

// AFTER: New standardized button
<Button
  variant="default"
  size="lg"
  onClick={handleSubmit}
  disabled={isLoading}
>
  {isLoading ? 'Saving...' : 'Save Changes'}
</Button>
```

### Maintaining Functionality During Visual Changes

**Rules for safe redesign:**

1. **Never change logic and visuals in the same commit.** Separate concerns:
   - Commit 1: Replace `<OldButton>` with `<Button>` — same behavior
   - Commit 2: Add new loading animation to `<Button>` — new behavior

2. **Keep the old component available until fully migrated:**
```tsx
// During migration, both can exist
import { Button } from '@/components/ui/button';          // New
import { OldButton } from '@/components/legacy/old-button'; // Old (being phased out)
```

3. **Test after every component swap.** Click every button, submit every form, check every state.

4. **Use a feature flag for major layout changes:**
```tsx
const useNewDesign = process.env.NEXT_PUBLIC_NEW_DESIGN === 'true';

export default function Dashboard() {
  return useNewDesign ? <NewDashboard /> : <LegacyDashboard />;
}
```

### Handling Legacy CSS

Common legacy CSS patterns and how to migrate them:

**Global CSS → CSS Variables + Tailwind:**
```css
/* BEFORE: scattered global styles */
.header { background: #1a1a2e; color: white; padding: 16px 24px; }
.card { background: white; border: 1px solid #eee; border-radius: 8px; padding: 24px; }

/* AFTER: design tokens + utility classes */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --border: 0 0% 90%;
}
/* Then use Tailwind: bg-card border border-border rounded-lg p-6 */
```

**Inline styles → Tailwind classes:**
```tsx
// BEFORE
<div style={{ display: 'flex', gap: '16px', padding: '24px', backgroundColor: '#f5f5f5' }}>

// AFTER
<div className="flex gap-4 p-6 bg-muted">
```

**CSS Modules → Tailwind (if migrating):**
```tsx
// BEFORE: styles.module.css + className={styles.card}
// Keep CSS Modules if the team prefers them — don't force Tailwind
// But standardize the values to use CSS variables

// styles.module.css
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--spacing-6);
}
```

**Removing unused CSS:**
```bash
# Find potentially unused CSS classes (manual review needed)
# Use PurgeCSS or Tailwind's built-in purge to remove unused utility classes
```

### Visual Regression Approach

Track visual changes without formal testing tools:

```
1. Screenshot every page/state BEFORE starting the redesign
2. Store screenshots in a `_redesign-reference/` directory (gitignored)
3. After each component migration, compare visually
4. Check: same layout, correct spacing, proper colors, all states work
5. Test at mobile and desktop widths minimum
```

For teams, use Playwright for automated screenshots:

```ts
// Compare before/after screenshots
test('dashboard matches redesign', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveScreenshot('dashboard.png', { maxDiffPixels: 100 });
});
```

### Migration Checklist Per Component

For each component being replaced:

```
[ ] Inventory all usages (grep for imports and JSX usage)
[ ] Map old props to new props
[ ] Handle edge cases (conditional rendering, dynamic props)
[ ] Update all usages across the codebase
[ ] Verify: default state renders correctly
[ ] Verify: hover/focus/active states work
[ ] Verify: disabled state works
[ ] Verify: loading state works (if applicable)
[ ] Verify: error state works (if applicable)
[ ] Verify: responsive behavior at mobile + desktop
[ ] Verify: keyboard navigation works
[ ] Verify: screen reader announces correctly
[ ] Remove old component file
[ ] Remove old CSS (if component-specific)
```

### File Structure During Redesign

```
[project-root]/
├── src/
│   ├── components/
│   │   ├── ui/              # New components (ShadCN or custom)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── legacy/          # Old components (being phased out)
│   │   │   ├── old-button.tsx    # Delete when fully migrated
│   │   │   └── old-card.tsx
│   │   └── [feature]/       # Feature components (update in place)
│   ├── styles/
│   │   ├── globals.css      # New design tokens + Tailwind
│   │   └── legacy.css       # Old global CSS (shrinks over time)
│   └── app/
│       └── ...
├── _redesign-reference/     # Before/after screenshots (gitignored)
└── MIGRATION.md             # Track progress per component/page
```

### Anti-Patterns — Do NOT

- Rewrite the entire app in one PR — incremental changes are safer and reviewable
- Change functionality while changing visuals — separate logic and styling changes
- Delete old components before migrating all usages — the app will break
- Mix old and new design systems on the same page (during final state) — be consistent per page
- Skip testing interactive states — hover, focus, disabled, loading, error
- Ignore responsive behavior — check mobile layout after every change
- Copy-paste old CSS into new components — rethink the styling with the new system
- Forget about dark mode — if the new system supports it, implement it from the start
- Leave legacy CSS files indefinitely — track and remove them as migration completes
- Skip the audit — you'll miss components and create inconsistencies
- Rush — a careful redesign ships faster than a broken rewrite

## Current State

[Where is the project? What's working, what's next?]

## Migration Progress

| Component | Status | Files Remaining |
|-----------|--------|----------------|
| Button | [Not started / In progress / Complete] | [N files] |
| Card | [Not started / In progress / Complete] | [N files] |
| Input | [Not started / In progress / Complete] | [N files] |
| Dialog | [Not started / In progress / Complete] | [N files] |
| [etc.] | | |

## Conventions

- Replace components one at a time — commit each swap individually
- Test every page after each component migration
- Keep legacy components in `components/legacy/` until fully migrated
- Use CSS variables for all colors and spacing tokens
- Mobile-first responsive implementation

## Notes

[Any project-specific context — design files, deadlines, priority pages]
