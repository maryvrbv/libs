# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / React / Vue / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- **Testing:** Playwright (E2E + visual), Vitest (component), axe-core (a11y)

## Workflow: Testing for Designers

Testing ensures what you built works correctly, looks right, and is accessible. This file covers visual regression testing, component testing, accessibility audits, and performance testing — framed for designers, not test engineers.

### When to Test

Not everything needs a test. Focus on:

| Test | Why |
|------|-----|
| **Critical user flows** | Signup, login, checkout, form submission — if it breaks, users can't use the product |
| **Complex interactions** | Drag-and-drop, multi-step forms, conditional UI, state-dependent displays |
| **Accessibility** | Screen reader behavior, keyboard navigation, color contrast, focus management |
| **Visual consistency** | Page layouts, component appearance, responsive behavior, dark mode |
| **Regressions** | Things that broke before — write a test so they don't break again |

**Skip testing:** Static pages with no interactivity, one-off admin pages, prototypes.

### Visual Regression Testing with Playwright

Playwright takes screenshots and compares them against saved baselines. If something changes visually, the test fails.

```bash
npm install -D @playwright/test
npx playwright install
```

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    { name: 'Desktop Chrome', use: { viewport: { width: 1280, height: 720 } } },
    { name: 'Mobile Safari', use: { viewport: { width: 375, height: 812 }, isMobile: true } },
    { name: 'Tablet', use: { viewport: { width: 768, height: 1024 } } },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
  },
});
```

```ts
// tests/visual/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage matches visual baseline', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('homepage.png', {
    maxDiffPixelRatio: 0.01,    // Allow 1% pixel difference (anti-aliasing)
  });
});

test('pricing page matches visual baseline', async ({ page }) => {
  await page.goto('/pricing');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('pricing.png');
});

test('dashboard with data matches visual baseline', async ({ page }) => {
  // Mock API data for consistent screenshots
  await page.route('/api/products', async (route) => {
    await route.fulfill({
      json: [
        { id: '1', name: 'Product A', price: 29 },
        { id: '2', name: 'Product B', price: 49 },
      ],
    });
  });

  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('dashboard.png');
});
```

```bash
# Run visual tests (first run creates baselines)
npx playwright test tests/visual/

# Update baselines after intentional design changes
npx playwright test --update-snapshots

# View visual diff report
npx playwright show-report
```

**Workflow:**
1. First run creates baseline screenshots in `tests/visual/*.spec.ts-snapshots/`
2. Future runs compare against baselines
3. If something changes intentionally, run `--update-snapshots`
4. Commit updated snapshots with the design change

### Component Testing

Test that components render correctly and respond to interactions:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
});
```

```ts
// tests/setup.ts
import '@testing-library/jest-dom';
```

```tsx
// components/ui/__tests__/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  test('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('renders destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive');
  });
});
```

```tsx
// components/products/__tests__/product-card.test.tsx
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../product-card';

const mockProduct = {
  id: '1',
  name: 'Skill Files Pack',
  price: 29,
  image: '/products/skill-files.jpg',
};

describe('ProductCard', () => {
  test('displays product name and price', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Skill Files Pack')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
  });

  test('renders product image with alt text', () => {
    render(<ProductCard product={mockProduct} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Skill Files Pack');
  });

  test('handles missing image gracefully', () => {
    render(<ProductCard product={{ ...mockProduct, image: '' }} />);
    // Should show placeholder or fallback, not crash
    expect(screen.getByText('Skill Files Pack')).toBeInTheDocument();
  });
});
```

### Accessibility Testing

**Automated checks with axe-core:**

```bash
npm install -D @axe-core/playwright
```

```ts
// tests/a11y/pages.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('login form has no accessibility violations', async ({ page }) => {
  await page.goto('/login');
  const results = await new AxeBuilder({ page })
    .include('form')                    // Test only the form
    .analyze();
  expect(results.violations).toEqual([]);
});

test('dashboard has no critical a11y issues', async ({ page }) => {
  await page.goto('/dashboard');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])    // WCAG 2.0 Level A & AA
    .analyze();

  // Log warnings but fail only on violations
  if (results.violations.length > 0) {
    console.log('A11y violations:', results.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.length,
    })));
  }
  expect(results.violations).toEqual([]);
});
```

**Keyboard navigation testing:**

```ts
// tests/a11y/keyboard.spec.ts
test('can navigate login form with keyboard', async ({ page }) => {
  await page.goto('/login');

  // Tab to email field
  await page.keyboard.press('Tab');
  const emailField = page.getByLabel('Email');
  await expect(emailField).toBeFocused();

  // Tab to password field
  await page.keyboard.press('Tab');
  const passwordField = page.getByLabel('Password');
  await expect(passwordField).toBeFocused();

  // Tab to submit button
  await page.keyboard.press('Tab');
  const submitButton = page.getByRole('button', { name: 'Sign In' });
  await expect(submitButton).toBeFocused();

  // Submit with Enter
  await page.keyboard.press('Enter');
});

test('modal can be closed with Escape', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'New Project' }).click();

  // Modal should be open
  await expect(page.getByRole('dialog')).toBeVisible();

  // Close with Escape
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('dropdown menu is navigable with arrow keys', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Options' }).click();

  // Arrow down to first item
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeFocused();

  // Arrow down to second item
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Delete' })).toBeFocused();
});
```

### Lighthouse Audits

Run Lighthouse in CI or manually:

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html

# Run specific categories
lighthouse http://localhost:3000 --only-categories=performance,accessibility,seo
```

**Target scores:**

| Category | Target | What it measures |
|----------|--------|-----------------|
| Performance | 90+ | Page speed, LCP, CLS, TBT |
| Accessibility | 95+ | WCAG compliance, ARIA, contrast |
| Best Practices | 90+ | HTTPS, no console errors, image aspect ratios |
| SEO | 90+ | Meta tags, crawlability, mobile-friendly |

**Playwright Lighthouse integration:**

```ts
// tests/performance/lighthouse.spec.ts
import { test } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test('homepage meets performance thresholds', async ({ page }) => {
  await page.goto('/');
  await playAudit({
    page,
    thresholds: {
      performance: 90,
      accessibility: 95,
      'best-practices': 90,
      seo: 90,
    },
    port: 9222,
  });
});
```

### Cross-Browser Testing

Playwright runs tests across multiple browsers:

```ts
// playwright.config.ts
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
],
```

### Snapshot Testing

Capture component HTML output and detect unexpected changes:

```tsx
// components/ui/__tests__/badge.test.tsx
import { render } from '@testing-library/react';
import { Badge } from '../badge';

test('default badge matches snapshot', () => {
  const { container } = render(<Badge>Active</Badge>);
  expect(container.firstChild).toMatchSnapshot();
});

test('destructive badge matches snapshot', () => {
  const { container } = render(<Badge variant="destructive">Error</Badge>);
  expect(container.firstChild).toMatchSnapshot();
});
```

### Test File Structure

```
[project-root]/
├── tests/
│   ├── setup.ts                    # Test setup (jest-dom matchers)
│   ├── visual/                     # Visual regression tests
│   │   ├── homepage.spec.ts
│   │   ├── dashboard.spec.ts
│   │   └── *.spec.ts-snapshots/    # Baseline screenshots (committed)
│   ├── a11y/                       # Accessibility tests
│   │   ├── pages.spec.ts           # Page-level a11y audits
│   │   └── keyboard.spec.ts        # Keyboard navigation tests
│   ├── e2e/                        # End-to-end user flow tests
│   │   ├── auth.spec.ts
│   │   └── checkout.spec.ts
│   └── performance/
│       └── lighthouse.spec.ts
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── __tests__/
│   │   │   └── button.test.tsx     # Component tests colocated
│   │   └── __snapshots__/          # Snapshot files (auto-generated)
│   └── products/
│       ├── product-card.tsx
│       └── __tests__/
│           └── product-card.test.tsx
├── playwright.config.ts            # Playwright config
└── vitest.config.ts                # Vitest config
```

### Running Tests

```bash
# Component tests (Vitest)
npx vitest                      # Watch mode
npx vitest run                  # Single run
npx vitest run --coverage       # With coverage report

# E2E and visual tests (Playwright)
npx playwright test             # Run all
npx playwright test tests/visual/  # Visual only
npx playwright test tests/a11y/    # A11y only
npx playwright test --ui        # Interactive UI mode
npx playwright show-report      # View HTML report

# Update visual baselines
npx playwright test --update-snapshots

# Update component snapshots
npx vitest run --update
```

### Anti-Patterns — Do NOT

- Test implementation details (CSS class names, internal state) — test what the user sees and does
- Write tests for every component — focus on complex, interactive, and critical-path components
- Use `data-testid` everywhere — prefer `getByRole`, `getByLabel`, `getByText` (tests accessibility too)
- Ignore flaky visual tests — investigate the difference; it's either a real bug or a flaky baseline
- Skip accessibility testing — automated tools catch 30-50% of issues with zero effort
- Run Lighthouse only once — run it regularly; performance degrades as code grows
- Test only the happy path — test error states, empty states, and edge cases
- Snapshot everything — snapshots are brittle; use them sparingly for stable, simple components
- Mock everything — test the real integration when possible (especially API responses)
- Wait with arbitrary timeouts (`sleep(2000)`) — use Playwright's `waitFor` and auto-waiting

## Current State

[Where is the project? What's working, what's next?]

## Test Coverage

| Area | Coverage | Status |
|------|----------|--------|
| Visual regression | [N pages] | [Active / TODO] |
| Accessibility | [N pages] | [Active / TODO] |
| Component tests | [N components] | [Active / TODO] |
| E2E user flows | [N flows] | [Active / TODO] |
| Lighthouse | [Score] | [Active / TODO] |

## Conventions

- Visual regression tests for every page and key component state
- Accessibility audits on all public-facing pages
- Component tests for interactive and complex components
- Use `getByRole` and `getByLabel` selectors (not `data-testid`)
- Commit visual baselines with the code that changes them

## Notes

[Any project-specific context — CI pipeline, test environment, browser requirements]
