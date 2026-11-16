# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- [Database: Prisma / Drizzle / Supabase / etc.]
- [Auth: NextAuth / Clerk / Lucia / etc.]
- Deployed on Vercel

## Framework: Next.js App Router

This project uses the Next.js App Router (the `app/` directory). The App Router uses React Server Components by default, file-based routing, and nested layouts.

### Server vs. Client Components

**Server Components (default)** — run on the server, never ship JS to the browser:
- Fetch data directly (no API routes needed)
- Access databases, file systems, environment variables
- Cannot use hooks (`useState`, `useEffect`), event handlers, or browser APIs

**Client Components** (`"use client"`) — run on both server and client:
- Use hooks, event handlers, browser APIs
- Required for interactivity (forms, toggles, modals, animations)
- Import from files marked with `"use client"` at the top

**Rules:**
- Default to Server Components. Only add `"use client"` when you need interactivity.
- Keep Client Components as small as possible — extract interactive parts, keep data-fetching in Server Components.
- Never put `"use client"` on layout or page files unless absolutely necessary.
- Server Components can import Client Components, but NOT the other way around. Pass server data as props.

```tsx
// app/products/page.tsx — Server Component (default)
export default async function ProductsPage() {
  const products = await db.products.findMany(); // Direct DB access
  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />          {/* Server: renders list */}
      <AddProductButton />                          {/* Client: handles click */}
    </div>
  );
}
```

### Routing

File-based routing in `app/`:

```
app/
├── layout.tsx              # Root layout (wraps everything)
├── page.tsx                # Home page (/)
├── loading.tsx             # Loading UI for this segment
├── error.tsx               # Error boundary for this segment
├── not-found.tsx           # 404 page
├── about/
│   └── page.tsx            # /about
├── blog/
│   ├── page.tsx            # /blog
│   └── [slug]/
│       └── page.tsx        # /blog/my-post (dynamic)
├── dashboard/
│   ├── layout.tsx          # Dashboard layout (sidebar, etc.)
│   ├── page.tsx            # /dashboard
│   └── settings/
│       └── page.tsx        # /dashboard/settings
├── (marketing)/            # Route group (no URL segment)
│   ├── layout.tsx          # Shared layout for marketing pages
│   ├── pricing/page.tsx    # /pricing
│   └── features/page.tsx   # /features
└── api/
    └── webhooks/
        └── route.ts        # API route: POST /api/webhooks
```

**Key conventions:**
- `page.tsx` — makes a route segment publicly accessible
- `layout.tsx` — shared UI that wraps child pages (persists across navigation)
- `loading.tsx` — instant loading state (wraps page in Suspense)
- `error.tsx` — error boundary (must be `"use client"`)
- `not-found.tsx` — 404 page
- `(group)` — route groups for organization without affecting URL
- `[param]` — dynamic segments
- `[...slug]` — catch-all segments
- `route.ts` — API routes (GET, POST, PUT, DELETE handlers)

### Data Fetching

Fetch data in Server Components. No `useEffect`, no client-side fetching for initial data.

```tsx
// Direct database access in Server Components
export default async function Page() {
  const data = await db.posts.findMany();
  return <PostList posts={data} />;
}

// API calls with fetch (automatically deduplicated and cached)
export default async function Page() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return <DataView data={data} />;
}
```

**Server Actions** — mutate data from Client Components without API routes:

```tsx
// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  await db.posts.create({ data: { title } });
  revalidatePath('/posts');
}

// Used in a Client Component
<form action={createPost}>
  <input name="title" />
  <button type="submit">Create</button>
</form>
```

**Rules:**
- Fetch in Server Components, not Client Components
- Use Server Actions for mutations (forms, button actions)
- Use `revalidatePath()` or `revalidateTag()` after mutations
- Use `loading.tsx` for streaming/suspense, not manual loading states
- Use `generateStaticParams()` for static generation of dynamic routes

### Metadata & SEO

Set metadata per page:

```tsx
// Static
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};

// Dynamic
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  return { title: post.title, description: post.excerpt };
}
```

Always set `title` and `description` on every page. Use `opengraph-image.tsx` and `twitter-image.tsx` for social images.

### Caching & Revalidation

- `fetch()` in Server Components is cached by default
- `revalidatePath('/path')` — purge cache for a path after mutation
- `revalidateTag('tag')` — purge cache by tag
- `export const revalidate = 3600` — time-based revalidation (seconds)
- `export const dynamic = 'force-dynamic'` — disable caching for a route

### Middleware

`middleware.ts` at the project root — runs before every request:

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Auth check, redirects, rewrites, etc.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

Use for: auth protection, redirects, geolocation, A/B testing. Keep it fast — middleware runs on every matched request.

### File Structure

```
app/
├── layout.tsx               # Root layout
├── page.tsx                 # Home
├── globals.css              # Global styles
├── [feature]/
│   ├── page.tsx
│   ├── loading.tsx
│   └── error.tsx
├── api/
│   └── [resource]/route.ts
└── actions/                 # Server Actions
    └── [feature].ts

components/
├── ui/                      # Shared UI components
├── [feature]/               # Feature-specific components
└── providers.tsx            # Client-side providers (theme, auth, etc.)

lib/
├── db.ts                    # Database client
├── auth.ts                  # Auth configuration
└── utils.ts                 # Shared utilities

public/
├── images/
└── fonts/
```

### Naming Conventions

- **Route files:** `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` — Next.js conventions
- **Components:** `PascalCase.tsx` or `kebab-case.tsx` (pick one, be consistent)
- **Server Actions:** `camelCase` functions in `app/actions/` or colocated
- **API routes:** `route.ts` — export named HTTP methods (`GET`, `POST`, etc.)
- **Utilities:** `camelCase` in `lib/`

### Patterns

**Auth-protected pages:** Check auth in `layout.tsx` and redirect:
```tsx
export default async function DashboardLayout({ children }) {
  const session = await getSession();
  if (!session) redirect('/login');
  return <>{children}</>;
}
```

**Forms:** Use Server Actions with `useFormStatus` for pending state:
```tsx
'use client';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>;
}
```

**Optimistic UI:** Use `useOptimistic` for instant feedback before server confirms.

**Error handling:** `error.tsx` catches errors per route segment. Always provide a retry option.

### Anti-Patterns — Do NOT

- Put `"use client"` on pages or layouts unless necessary
- Fetch data in Client Components when a Server Component can do it
- Create API routes for data that Server Components can access directly
- Use `useEffect` for data fetching — use Server Components or Server Actions
- Mix Pages Router (`pages/`) with App Router (`app/`) patterns
- Import server-only code (db clients, env vars) in Client Components
- Skip `loading.tsx` — users see a blank screen without it
- Use `router.push()` for simple links — use `<Link>`
- Forget `revalidatePath()` after Server Action mutations
- Put all providers in root layout — split them, only wrap what needs them
- Create catch-all `error.tsx` at root that hides specific errors

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Server Components by default, Client Components only for interactivity
- Server Actions for all data mutations
- TypeScript strict mode
- Colocate feature code (components, actions, types) near their routes
- Keep `lib/` for truly shared utilities
- Prefer `<Link>` for navigation, `router.push()` only for programmatic redirects

## Notes

[Any project-specific context]
