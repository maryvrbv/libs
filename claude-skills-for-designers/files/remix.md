# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- Remix v2 (with Vite)
- React 18
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / vanilla-extract / etc.]
- [Database: Prisma / Drizzle / Supabase / etc.]
- [Auth: custom sessions / Auth.js / Clerk / etc.]
- Deployed on [Vercel / Fly.io / Cloudflare / etc.]

## Framework: Remix v2

This project uses Remix v2 with Vite as the build tool. Remix is a full-stack React framework built on Web standards — loaders fetch data on the server, actions handle mutations, and forms work with progressive enhancement. Every route is a server entry point.

### The Loader/Action Pattern

Every route can export a `loader` (GET requests) and an `action` (POST/PUT/PATCH/DELETE). This is the core Remix pattern — server logic lives alongside the component.

**Loader — fetch data for a page:**
```tsx
// app/routes/dashboard.tsx
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireUser } from '~/utils/auth.server';
import { db } from '~/utils/db.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  const projects = await db.project.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
  });
  return json({ user, projects });
}

export default function Dashboard() {
  const { user, projects } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <ProjectList projects={projects} />
    </div>
  );
}
```

**Action — handle form submissions and mutations:**
```tsx
// app/routes/projects.new.tsx
import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { requireUser } from '~/utils/auth.server';
import { db } from '~/utils/db.server';

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const name = formData.get('name');

  if (typeof name !== 'string' || name.length === 0) {
    return json(
      { errors: { name: 'Project name is required.' } },
      { status: 400 }
    );
  }

  const project = await db.project.create({
    data: { name, userId: user.id },
  });

  return redirect(`/projects/${project.id}`);
}

export default function NewProject() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <label>
        Project name
        <input type="text" name="name" />
      </label>
      {actionData?.errors?.name && (
        <p className="error">{actionData.errors.name}</p>
      )}
      <button type="submit">Create Project</button>
    </Form>
  );
}
```

**Rules:**
- Loaders run on every GET request to a route. Return data with `json()`.
- Actions run on non-GET requests (POST, PUT, DELETE). Return errors with `json()` or redirect with `redirect()`.
- Both loaders and actions have access to `request`, `params`, and `context`.
- Loaders and actions are server-only — they never ship to the browser. Import `.server` modules freely.
- Always validate form data in actions. Never trust client input.

### Routing

Remix v2 uses flat file routing by default in `app/routes/`:

```
app/routes/
├── _index.tsx                    # / (home page)
├── about.tsx                     # /about
├── blog._index.tsx               # /blog (index)
├── blog.$slug.tsx                # /blog/:slug (dynamic)
├── dashboard.tsx                 # /dashboard (layout with <Outlet />)
├── dashboard._index.tsx          # /dashboard (index content)
├── dashboard.settings.tsx        # /dashboard/settings
├── dashboard.projects.$id.tsx    # /dashboard/projects/:id
├── _auth.tsx                     # Pathless layout (shared UI, no URL segment)
├── _auth.login.tsx               # /login (uses _auth layout)
├── _auth.register.tsx            # /register (uses _auth layout)
├── api.webhooks.tsx              # /api/webhooks (resource route — no UI)
└── $.tsx                         # Catch-all / 404 (splat route)
```

**Key conventions:**
- `.` separates URL segments: `dashboard.settings` = `/dashboard/settings`
- `$param` — dynamic segments: `blog.$slug` = `/blog/:slug`
- `_index` — index route for a parent layout
- `_prefix` — pathless layout route (shared layout, no URL segment)
- `$` — splat/catch-all route
- Nested routes render inside the parent's `<Outlet />`

**Nested routes and Outlet:**
```tsx
// app/routes/dashboard.tsx — layout route
import { Outlet } from '@remix-run/react';

export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Outlet />  {/* Child routes render here */}
      </main>
    </div>
  );
}
```

### The Form Component

Remix's `<Form>` component is a progressive enhancement over HTML `<form>`. It works without JavaScript and upgrades to fetch-based submissions when JS loads.

```tsx
import { Form } from '@remix-run/react';

// Basic form — submits to the current route's action
<Form method="post">
  <input name="title" />
  <button type="submit">Save</button>
</Form>

// Submit to a different route's action
<Form method="post" action="/api/subscribe">
  <input name="email" type="email" />
  <button type="submit">Subscribe</button>
</Form>

// DELETE request
<Form method="post">
  <input type="hidden" name="intent" value="delete" />
  <button type="submit">Delete</button>
</Form>
```

**Pending UI with useNavigation:**
```tsx
import { Form, useNavigation } from '@remix-run/react';

export default function CreateForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post">
      <input name="title" />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </Form>
  );
}
```

### useFetcher — Non-Navigation Mutations

Use `useFetcher` when you want to call a loader or action without navigating — inline edits, toggles, background saves, search-as-you-type.

```tsx
import { useFetcher } from '@remix-run/react';

function ToggleFavorite({ projectId, isFavorite }: {
  projectId: string;
  isFavorite: boolean;
}) {
  const fetcher = useFetcher();
  const optimistic = fetcher.formData
    ? fetcher.formData.get('favorite') === 'true'
    : isFavorite;

  return (
    <fetcher.Form method="post" action={`/projects/${projectId}/favorite`}>
      <input type="hidden" name="favorite" value={String(!optimistic)} />
      <button type="submit">
        {optimistic ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
```

**Search with useFetcher:**
```tsx
function Search() {
  const fetcher = useFetcher<typeof loader>();

  return (
    <div>
      <fetcher.Form method="get" action="/api/search">
        <input
          type="search"
          name="q"
          onChange={(e) => fetcher.submit(e.currentTarget.form)}
        />
      </fetcher.Form>
      {fetcher.data?.results.map((result) => (
        <SearchResult key={result.id} result={result} />
      ))}
    </div>
  );
}
```

**Rules:**
- Use `<Form>` when the submission should trigger navigation or a full page data reload.
- Use `useFetcher` for in-place mutations, search, autosave, and anything that shouldn't change the URL.
- Access optimistic state via `fetcher.formData` before the server responds.
- `fetcher.state` is `'idle'`, `'submitting'`, or `'loading'`.

### Streaming with defer + Await

Defer slow data to stream it in while showing instant content for fast data:

```tsx
// app/routes/dashboard.tsx
import type { LoaderFunctionArgs } from '@remix-run/node';
import { defer } from '@remix-run/node';
import { useLoaderData, Await } from '@remix-run/react';
import { Suspense } from 'react';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request); // Fast — await immediately
  const analyticsPromise = getAnalytics(user.id); // Slow — don't await

  return defer({
    user,
    analytics: analyticsPromise, // Stream this in later
  });
}

export default function Dashboard() {
  const { user, analytics } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Welcome, {user.name}</h1>

      <Suspense fallback={<AnalyticsSkeleton />}>
        <Await resolve={analytics} errorElement={<p>Failed to load analytics.</p>}>
          {(data) => <AnalyticsChart data={data} />}
        </Await>
      </Suspense>
    </div>
  );
}
```

**Rules:**
- `await` data that is critical (user, page content). `defer` data that is supplemental (analytics, recommendations).
- Always wrap `<Await>` in `<Suspense>` with a meaningful fallback.
- Always provide `errorElement` on `<Await>` for graceful degradation.

### Error Boundaries

Every route can export an `ErrorBoundary` component. It catches errors from loaders, actions, and rendering.

```tsx
import { useRouteError, isRouteErrorResponse } from '@remix-run/react';

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-page">
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    );
  }

  return (
    <div className="error-page">
      <h1>Something went wrong</h1>
      <p>Please try again later.</p>
    </div>
  );
}
```

**Rules:**
- Add `ErrorBoundary` to every layout route at minimum — errors bubble up to the nearest boundary.
- Use `isRouteErrorResponse()` to handle expected errors (404, 403) differently from unexpected ones.
- Throw `Response` objects in loaders/actions for expected errors: `throw new Response('Not found', { status: 404 })`.

### Meta, Links, and Headers

**Meta function — set page metadata:**
```tsx
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.project.name ?? 'Projects' },
    { name: 'description', content: data?.project.description },
    { property: 'og:title', content: data?.project.name },
  ];
};
```

**Links function — add stylesheets, preloads, favicons:**
```tsx
import type { LinksFunction } from '@remix-run/node';
import styles from './dashboard.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'preload', href: '/fonts/inter.woff2', as: 'font', crossOrigin: 'anonymous' },
];
```

**Headers function — set HTTP headers:**
```tsx
import type { HeadersFunction } from '@remix-run/node';

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  'Cache-Control': loaderHeaders.get('Cache-Control') ?? 'max-age=300',
});
```

### Session Management

Remix provides cookie-based session utilities built on Web standards:

```ts
// app/utils/session.server.ts
import { createCookieSessionStorage, redirect } from '@remix-run/node';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
});

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get('Cookie'));
}

export async function requireUser(request: Request) {
  const session = await getSession(request);
  const userId = session.get('userId');
  if (!userId) throw redirect('/login');
  return db.user.findUniqueOrThrow({ where: { id: userId } });
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function destroySession(request: Request) {
  const session = await getSession(request);
  return redirect('/login', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}
```

### File Structure

```
app/
├── entry.client.tsx             # Client entry point
├── entry.server.tsx             # Server entry point
├── root.tsx                     # Root layout (<html>, <head>, <body>)
├── routes/
│   ├── _index.tsx               # Home page
│   ├── [feature].tsx            # Feature layout
│   ├── [feature]._index.tsx     # Feature index
│   └── [feature].$id.tsx        # Feature detail
├── components/
│   ├── ui/                      # Shared UI components
│   └── [feature]/               # Feature-specific components
├── utils/
│   ├── db.server.ts             # Database client (server-only)
│   ├── session.server.ts        # Session management (server-only)
│   ├── auth.server.ts           # Auth utilities (server-only)
│   └── misc.ts                  # Shared utilities
├── models/                      # Data access layer (server-only)
│   ├── user.server.ts
│   └── project.server.ts
└── styles/
    └── global.css

public/
├── images/
├── fonts/
└── favicon.ico

vite.config.ts                   # Vite + Remix plugin config
```

### Naming Conventions

- **Route files:** flat file names with `.` separators — `dashboard.settings.tsx`
- **Server-only files:** `.server.ts` suffix — Remix strips these from client bundles
- **Components:** `PascalCase.tsx` (e.g., `ProjectCard.tsx`)
- **Utilities:** `camelCase.ts` in `utils/` or `camelCase.server.ts` for server-only
- **Models:** `camelCase.server.ts` in `models/` — data access functions

### Patterns

**Intent-based actions — multiple actions per route:**
```tsx
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  switch (intent) {
    case 'update':
      return updateProject(formData);
    case 'delete':
      return deleteProject(formData);
    default:
      return json({ error: 'Invalid intent' }, { status: 400 });
  }
}
```

**Revalidation — Remix auto-revalidates all loaders on the page after any action.** This means data is always fresh after mutations. You don't need to manually refetch.

**Resource routes — API endpoints without UI:**
```tsx
// app/routes/api.health.tsx
import { json } from '@remix-run/node';

export async function loader() {
  return json({ status: 'ok' });
}
// No default export = no UI, just data
```

**Optimistic UI pattern:**
```tsx
function TodoItem({ todo }: { todo: Todo }) {
  const fetcher = useFetcher();
  const isDeleting = fetcher.formData?.get('intent') === 'delete';

  return (
    <li hidden={isDeleting}>
      <span>{todo.title}</span>
      <fetcher.Form method="post">
        <input type="hidden" name="id" value={todo.id} />
        <input type="hidden" name="intent" value="delete" />
        <button type="submit">Delete</button>
      </fetcher.Form>
    </li>
  );
}
```

### Anti-Patterns — Do NOT

- Fetch data with `useEffect` — use loaders instead; Remix runs them on the server before render
- Create separate API routes to feed your own UI — loaders and actions are your API
- Use `onClick` handlers to submit data — use `<Form>` or `useFetcher.Form` for mutations
- Skip the `.server.ts` suffix on files with secrets or database access — they will leak to the client bundle
- Use `window.location` for navigation — use `<Link>`, `useNavigate()`, or `redirect()`
- Call `fetch('/api/...')` from components to hit your own routes — use `useFetcher` instead
- Return sensitive data from loaders without checking auth first — loaders are public endpoints
- Forget `ErrorBoundary` on layout routes — errors will crash the entire page
- Use `redirect()` in loaders for non-auth cases — consider throwing a `Response` instead for errors
- Put client-only code at the top level of route modules — loaders/actions run server-side
- Use global state managers (Redux, Zustand) for server data — Remix already manages it
- Skip `<Suspense>` fallbacks when using `defer` — the page will hang on slow data
- Use `useLoaderData` in non-route components — pass data as props instead
- Manually revalidate after actions — Remix does this automatically
- Create massive route files — extract components and utility functions into separate files

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Loaders for all data fetching, actions for all mutations
- `<Form>` with progressive enhancement for all user submissions
- `useFetcher` for in-place mutations and non-navigation data loading
- `.server.ts` suffix for all server-only code (db, auth, sessions)
- TypeScript strict mode
- Error boundaries on every layout route
- Session-based auth with cookie storage
- Colocate feature components near their routes
- Prefer `<Link>` for navigation, `useNavigate()` only for programmatic redirects

## Notes

[Any project-specific context]
