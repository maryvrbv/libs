# [Project Name]

[Brief description — what is this site/app?]

---

## Tech Stack

- Astro 5
- TypeScript
- [UI framework: None / React / Vue / Svelte — for interactive islands]
- [Styling: Tailwind CSS / scoped CSS]
- [CMS: Markdown / MDX / Contentlayer / Sanity / etc.]
- Deployed on [Vercel / Netlify / Cloudflare Pages]

## Framework: Astro

This project uses Astro — a content-focused web framework that ships zero JavaScript by default. Pages are rendered as static HTML at build time. Interactive components ("islands") only hydrate when needed. Perfect for marketing sites, blogs, documentation, and landing pages.

### Astro Components

Astro's native `.astro` components are HTML-first with a frontmatter script block:

```astro
---
// This runs at build time (server-side only)
const title = "Hello";
const posts = await fetch('https://api.example.com/posts').then(r => r.json());
---

<!-- This is the HTML template -->
<h1>{title}</h1>
<ul>
  {posts.map(post => (
    <li><a href={`/blog/${post.slug}`}>{post.title}</a></li>
  ))}
</ul>

<style>
  /* Scoped to this component by default */
  h1 { color: var(--color-heading); }
</style>
```

**Rules:**
- The `---` frontmatter block runs on the server at build time
- No reactivity — no `useState`, no `ref()`, no re-renders
- Use for layouts, pages, and static UI
- Use framework components (React, Vue, Svelte) only for interactive islands

### Islands Architecture

Astro ships zero JS by default. Interactive parts use `client:*` directives to hydrate:

```astro
---
import SearchBar from '../components/SearchBar.tsx';  // React component
import Counter from '../components/Counter.svelte';    // Svelte component
---

<!-- Static — no JS shipped -->
<header>
  <h1>My Site</h1>
  <nav>...</nav>
</header>

<!-- Interactive island — hydrates immediately -->
<SearchBar client:load />

<!-- Interactive island — hydrates when visible -->
<Counter client:visible />
```

**Client directives:**
| Directive | When it hydrates | Use for |
|-----------|-----------------|---------|
| `client:load` | Immediately on page load | Critical interactive UI (search, auth) |
| `client:idle` | After page is idle | Non-critical UI (newsletter signup) |
| `client:visible` | When scrolled into view | Below-the-fold interactive content |
| `client:media="(max-width: 768px)"` | When media query matches | Mobile-only interactions |
| (none) | Never — renders HTML only | Static content with framework syntax |

**Rules:**
- Default to NO client directive — ship static HTML
- `client:visible` is the most common — use for anything below the fold
- `client:load` only for above-the-fold interactive elements
- You can mix frameworks — React header + Svelte counter + Vue form on the same page
- Framework components WITHOUT a `client:*` directive render to static HTML (no JS shipped)

### Routing

File-based routing in `src/pages/`:

```
src/pages/
├── index.astro              # /
├── about.astro              # /about
├── blog/
│   ├── index.astro          # /blog
│   └── [slug].astro         # /blog/my-post (dynamic)
├── api/
│   └── posts.ts             # API endpoint: /api/posts
├── 404.astro                # Custom 404
└── [...slug].astro          # Catch-all
```

Dynamic routes use `getStaticPaths()`:
```astro
---
export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
---

<h1>{post.title}</h1>
```

### Content Collections

For blogs, docs, or any structured content — use Content Collections:

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

Content files go in `src/content/blog/`:
```
src/content/blog/
├── first-post.md
├── second-post.mdx
└── third-post.md
```

Query collections in pages:
```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => !data.draft);
const sortedPosts = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---
```

### Layouts

Reusable page shells in `src/layouts/`:

```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Default description' } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>
</head>
<body>
  <header>...</header>
  <main>
    <slot />   <!-- Page content goes here -->
  </main>
  <footer>...</footer>
</body>
</html>
```

Use in pages:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About">
  <h1>About Us</h1>
  <p>Content here.</p>
</BaseLayout>
```

### Styling

Astro supports scoped CSS by default:

```astro
<style>
  /* Scoped to this component only */
  h1 { font-size: 2rem; }
</style>

<style is:global>
  /* Global styles */
  :root { --color-primary: #3b82f6; }
</style>
```

With Tailwind:
```astro
<h1 class="text-3xl font-bold tracking-tight">Title</h1>
```

**Rules:**
- Prefer scoped `<style>` in Astro components
- Use `is:global` sparingly — only for CSS variables, resets, or base styles
- With Tailwind, apply classes directly — don't mix Tailwind with scoped styles
- Define CSS variables in a global stylesheet for semantic colors

### SEO & Meta

Use `<head>` in layouts or the `astro-seo` integration:

```astro
---
// In layout or page
const { title, description, image } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<head>
  <title>{title}</title>
  <meta name="description" content={description}>
  <link rel="canonical" href={canonicalURL}>
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={image}>
  <meta property="og:url" content={canonicalURL}>
</head>
```

Every page needs: `title`, `description`, `og:title`, `og:description`, `canonical`.

### File Structure

```
src/
├── pages/                    # File-based routes (.astro, .md, .mdx)
├── layouts/                  # Page layouts
├── components/
│   ├── Header.astro          # Static components (.astro)
│   ├── Footer.astro
│   └── SearchBar.tsx         # Interactive islands (React/Vue/Svelte)
├── content/
│   └── blog/                 # Content collections
├── styles/
│   └── globals.css           # Global CSS / CSS variables
├── lib/
│   └── utils.ts              # Shared utilities
└── content.config.ts         # Collection schemas

public/
├── images/
├── fonts/
└── favicon.svg
```

### Naming Conventions

- **Astro components:** `PascalCase.astro`
- **Pages:** `kebab-case.astro` (maps to URL)
- **Layouts:** `PascalCase.astro` in `layouts/`
- **Content:** `kebab-case.md` in `content/[collection]/`
- **Interactive components:** `PascalCase.tsx` / `.vue` / `.svelte`
- **Utilities:** `camelCase.ts`

### Anti-Patterns — Do NOT

- Add `client:load` to everything — most content doesn't need JavaScript
- Use React/Vue/Svelte for static UI — use `.astro` components instead
- Put interactive logic in `.astro` files — extract to framework components
- Use `client:load` when `client:visible` works (most below-fold components)
- Skip Content Collections for structured content — don't manually parse markdown
- Create SPA-like patterns (client-side routing, global state) — Astro is MPA-first
- Forget `getStaticPaths()` for dynamic routes in static mode
- Import large JS libraries in Astro components — they'll be server-only but slow builds
- Skip meta tags — every page needs title, description, and OG tags
- Use `is:global` styles when scoped styles work

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- `.astro` for all static UI, framework components only for interactivity
- Content Collections for all structured content (blog, docs, etc.)
- Zero JS by default — justify every `client:*` directive
- Scoped CSS or Tailwind — never global CSS for component styles
- TypeScript strict mode
- Static site generation (SSG) by default — use SSR only when needed

## Notes

[Any project-specific context]
