# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / React / Astro / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- [Deployed on: Vercel / Netlify / Cloudflare / etc.]

## Workflow: Performance Optimization

This file covers how to make the app fast — image optimization, font loading, code splitting, bundle analysis, Core Web Vitals improvement, caching, and reducing unnecessary JavaScript and CSS.

### Core Web Vitals

Google's three metrics that measure real user experience. Target: all green.

| Metric | What It Measures | Good | Needs Work | Poor |
|--------|-----------------|------|------------|------|
| **LCP** (Largest Contentful Paint) | How fast the main content loads | < 2.5s | 2.5–4s | > 4s |
| **CLS** (Cumulative Layout Shift) | How much the page visually jumps | < 0.1 | 0.1–0.25 | > 0.25 |
| **INP** (Interaction to Next Paint) | How fast the page responds to clicks | < 200ms | 200–500ms | > 500ms |

**How to measure:**
- **Lab data:** Lighthouse in Chrome DevTools (Cmd+Shift+I → Lighthouse tab)
- **Real user data:** Vercel Speed Insights, Google Search Console, or web-vitals library
- **Quick check:** PageSpeed Insights (pagespeed.web.dev)

### Image Optimization

Images are usually the biggest performance bottleneck. Fix them first.

**Use next/image (Next.js):**
```tsx
import Image from 'next/image';

// Local image (automatic optimization)
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority              // Only for above-the-fold images (improves LCP)
  className="rounded-lg"
/>

// Responsive image
<Image
  src="/feature.jpg"
  alt="Feature"
  width={800}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>

// Fill container (like background-image)
<div className="relative h-96">
  <Image
    src="/banner.jpg"
    alt="Banner"
    fill
    className="object-cover"
    sizes="100vw"
  />
</div>
```

**What next/image does automatically:**
- Converts to WebP/AVIF (smaller files, same quality)
- Generates multiple sizes for different screens
- Lazy loads images below the fold
- Prevents layout shift (reserves space)

**For non-Next.js projects:**
```html
<!-- Manual responsive images with srcset -->
<img
  src="/images/hero-800.webp"
  srcset="
    /images/hero-400.webp 400w,
    /images/hero-800.webp 800w,
    /images/hero-1200.webp 1200w
  "
  sizes="(max-width: 768px) 100vw, 800px"
  alt="Hero image"
  loading="lazy"
  decoding="async"
  width="800"
  height="400"
/>
```

**Image format guide:**
| Format | Best For | Compression |
|--------|---------|-------------|
| **WebP** | Photos, illustrations — primary format | 25-35% smaller than JPG |
| **AVIF** | Photos — best compression (limited browser support) | 50% smaller than JPG |
| **SVG** | Icons, logos, simple graphics | Vector — infinite scale |
| **PNG** | Screenshots, images with transparency | Lossless, larger files |
| **JPG** | Fallback for older browsers | Use WebP instead when possible |

**Image optimization checklist:**
- Use `priority` on the LCP image (hero, above-the-fold banner)
- Always set `width` and `height` (prevents CLS)
- Use `loading="lazy"` on below-the-fold images (next/image does this automatically)
- Compress images before adding to the project (use squoosh.app or sharp)
- Use SVG for icons — never PNG/JPG for icons

### Font Loading Strategies

Fonts can block rendering. Optimize them.

**Use `next/font` (Next.js — best approach):**
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',            // Show fallback font while loading
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

**Why `next/font` is optimal:**
- Self-hosts fonts (no external requests to Google)
- Automatically subsets to only characters you use
- No layout shift from font loading
- Zero external network requests

**For non-Next.js projects:**
```css
/* Preload the font file */
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

/* CSS font-face with swap */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;        /* Show fallback text immediately */
  unicode-range: U+0000-00FF; /* Latin characters only (subset) */
}
```

**Font loading rules:**
- Always use `font-display: swap` — prevents invisible text during loading
- Use variable fonts (one file for all weights) — fewer requests
- Subset fonts to only the character sets you need (Latin, etc.)
- Self-host fonts instead of using Google Fonts CDN
- Limit to 1-2 font families — each additional font is another download

### Code Splitting

Only load the JavaScript the user needs for the current page.

**Dynamic imports (lazy loading components):**
```tsx
import dynamic from 'next/dynamic';

// Heavy component — only loaded when needed
const HeavyChart = dynamic(() => import('@/components/chart'), {
  loading: () => <Skeleton className="h-64 w-full" />,
  ssr: false,    // Skip server rendering for browser-only components
});

// Modal — loaded when opened
const SettingsModal = dynamic(() => import('@/components/settings-modal'));

export default function Dashboard() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div>
      <HeavyChart />
      {showSettings && <SettingsModal />}
    </div>
  );
}
```

**Route-based splitting (automatic in Next.js):**
Each page in the `app/` directory is automatically code-split. Users only download the JavaScript for the page they're on.

**When to split:**
- Components larger than 50KB
- Components only visible after user interaction (modals, drawers, tabs)
- Heavy libraries (charts, rich text editors, maps)
- Features behind feature flags or auth checks

### Bundle Analysis

See what's in your JavaScript bundle:

```bash
# Next.js
npm install -D @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({ /* config */ });

# Run analysis
ANALYZE=true npm run build
```

```bash
# General (any project)
npm install -D source-map-explorer

# Generate source map and analyze
npm run build
npx source-map-explorer dist/assets/*.js
```

**What to look for:**
- Large libraries you don't fully use (import only what you need)
- Duplicate dependencies (two versions of the same library)
- Code that should be lazy-loaded but isn't
- Unused imports that aren't tree-shaken

### Reducing JavaScript

**Tree shaking — import only what you use:**
```ts
// BAD: imports the entire library
import _ from 'lodash';
_.debounce(fn, 300);

// GOOD: imports only the function
import debounce from 'lodash/debounce';
debounce(fn, 300);

// BETTER: use native alternatives
// debounce with a simple utility
function debounce(fn: Function, ms: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
```

**Remove unused dependencies:**
```bash
# Find unused packages
npx depcheck

# Remove them
npm uninstall unused-package-1 unused-package-2
```

**Common heavy libraries and lighter alternatives:**
| Heavy Library | Size | Lighter Alternative | Size |
|--------------|------|-------------------|------|
| `moment` | 300KB | `date-fns` | 10-30KB (tree-shakeable) |
| `lodash` (full) | 70KB | `lodash-es` + specific imports | 1-5KB |
| `axios` | 13KB | Native `fetch` | 0KB |
| `jquery` | 90KB | Native DOM APIs | 0KB |
| `animate.css` | 80KB | Tailwind `animate-*` + CSS | 1KB |

### CSS Optimization

**Purge unused CSS (Tailwind does this automatically):**
```js
// tailwind.config.js — ensure content paths are correct
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
};
```

**Reduce CSS specificity:**
```css
/* BAD: overly specific */
div.container > section.main > article.content > h1.title { color: red; }

/* GOOD: simple, flat selectors */
.title { color: red; }

/* BEST: utility classes (Tailwind) */
<h1 className="text-red-500">...</h1>
```

**Critical CSS:** Next.js and modern frameworks extract critical CSS automatically. For custom setups, inline above-the-fold styles and defer the rest.

### Caching Headers

Tell browsers what to cache and for how long:

```ts
// next.config.js — custom cache headers
module.exports = {
  async headers() {
    return [
      {
        // Static assets (JS, CSS, images) — cache for 1 year
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Images — cache for 1 month
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
      {
        // API responses — no cache (or short cache)
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        // HTML pages — short cache with revalidation
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
};
```

**Cache strategy:**
| Resource | Strategy | Why |
|----------|---------|-----|
| JS/CSS bundles | `immutable, max-age=31536000` | File names contain hashes — they change when content changes |
| Static images | `max-age=2592000` (30 days) | Long-lived, occasional updates |
| API responses | `no-store` or `max-age=60` | Data changes frequently |
| HTML pages | `must-revalidate` | Always check for latest version |
| Fonts | `immutable, max-age=31536000` | Never change once deployed |

### Lighthouse Score Improvement Checklist

**Performance (target: 90+):**
```
[ ] Add priority to LCP image (hero/banner)
[ ] Set explicit width/height on all images (prevents CLS)
[ ] Use next/image or responsive images with srcset
[ ] Lazy load below-the-fold images
[ ] Use font-display: swap on all fonts
[ ] Self-host fonts (no external Google Fonts requests)
[ ] Dynamic import heavy components
[ ] Remove unused JavaScript dependencies
[ ] Enable compression (gzip/brotli — hosting providers do this)
[ ] Set proper Cache-Control headers on static assets
```

**Reducing CLS (Layout Shift):**
```
[ ] Set width and height on all images and videos
[ ] Reserve space for dynamic content (skeletons)
[ ] Don't inject content above existing content after load
[ ] Use font-display: swap with fallback font that matches dimensions
[ ] Avoid dynamically resizing elements (ads, embeds)
```

**Reducing LCP:**
```
[ ] Preload the LCP image: <link rel="preload" as="image" href="...">
[ ] Use priority prop on next/image for hero images
[ ] Minimize server response time (check hosting, database queries)
[ ] Remove render-blocking resources (defer non-critical CSS/JS)
[ ] Use CDN for static assets
```

**Reducing INP:**
```
[ ] Keep JavaScript execution under 50ms per task
[ ] Use requestAnimationFrame for visual updates
[ ] Debounce expensive event handlers (scroll, resize, input)
[ ] Move heavy computation to Web Workers
[ ] Use CSS transitions instead of JavaScript animations
```

### Monitoring Performance Over Time

```tsx
// Report Web Vitals (Next.js)
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

```ts
// Custom Web Vitals reporting
import { onCLS, onINP, onLCP } from 'web-vitals';

onCLS(console.log);
onINP(console.log);
onLCP(console.log);
```

### Preloading and Prefetching

```html
<!-- Preload critical resources (load immediately) -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/hero.webp" as="image">

<!-- Prefetch resources for likely next navigation (load in idle time) -->
<link rel="prefetch" href="/dashboard">

<!-- DNS prefetch for external APIs -->
<link rel="dns-prefetch" href="https://api.example.com">
<link rel="preconnect" href="https://api.example.com" crossorigin>
```

Next.js automatically prefetches linked pages when `<Link>` components enter the viewport.

### File Structure

```
[project-root]/
├── public/
│   ├── images/                # Optimized images (WebP, AVIF)
│   │   ├── hero.webp
│   │   └── ...
│   └── fonts/                 # Self-hosted font files (woff2)
│       └── inter-var.woff2
├── src/
│   ├── components/
│   │   └── heavy/             # Dynamically imported heavy components
│   │       ├── chart.tsx
│   │       └── rich-editor.tsx
│   └── lib/
│       └── utils.ts           # Lightweight utility functions
├── next.config.js             # Cache headers, image config
└── lighthouse-report.html     # Latest Lighthouse report (gitignored)
```

### Performance Budget

Set limits so performance doesn't degrade:

| Metric | Budget |
|--------|--------|
| Total page weight | < 1MB (first load) |
| JavaScript bundle | < 200KB (gzipped) |
| CSS | < 50KB (gzipped) |
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| Lighthouse Performance | > 90 |
| Time to Interactive | < 3.5s |

### Anti-Patterns — Do NOT

- Use unoptimized images (full-size JPGs from a camera) — compress and serve WebP
- Skip `width` and `height` on images — causes CLS (layout shift)
- Load all JavaScript upfront — dynamic import components that aren't immediately visible
- Use `@import` in CSS to load fonts — use `<link rel="preload">` instead
- Import entire utility libraries — use tree-shakeable imports or native alternatives
- Inline large SVGs in JSX — use `next/image` or a sprite sheet
- Add analytics scripts synchronously — they block rendering; use `async` or `defer`
- Use `!important` everywhere in CSS — increases specificity wars and file size
- Ignore bundle size increases — check the bundle analyzer before merging large dependency additions
- Cache API responses forever — stale data causes bugs; use short TTLs or revalidation
- Optimize prematurely — measure first with Lighthouse, then fix what's actually slow
- Add multiple font families "just in case" — each font is 20-100KB+

## Current State

[Where is the project? What's working, what's next?]

## Performance Scores

| Page | Performance | LCP | CLS | INP |
|------|------------|-----|-----|-----|
| Home | [Score] | [Time] | [Score] | [Time] |
| Dashboard | [Score] | [Time] | [Score] | [Time] |
| [Page] | [Score] | [Time] | [Score] | [Time] |

## Conventions

- All images served as WebP via next/image
- Self-hosted fonts with font-display: swap
- Dynamic imports for components > 50KB
- Lighthouse audit before every major release
- Cache-Control headers set for all resource types
- Performance budget enforced in CI

## Notes

[Any project-specific context — hosting platform, CDN, performance goals, known bottlenecks]
