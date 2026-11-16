# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- SvelteKit 2 (Svelte 5)
- TypeScript
- [Styling: Tailwind CSS / vanilla CSS / etc.]
- [Database: Prisma / Drizzle / Supabase / etc.]
- [Auth: Lucia / Auth.js / custom / etc.]
- Deployed on [Vercel / Cloudflare / Netlify / etc.]

## Framework: SvelteKit with Svelte 5

This project uses SvelteKit with Svelte 5's runes system. Svelte 5 replaces the old reactive `$:` declarations with explicit runes (`$state`, `$derived`, `$effect`). SvelteKit provides file-based routing, server-side rendering, and a powerful load/action system.

### Svelte 5 Runes

Runes are compiler-level primitives for reactivity. They replace Svelte 4's implicit reactivity.

**`$state`** — declare reactive state:
```svelte
<script lang="ts">
  let count = $state(0);
  let items = $state<string[]>([]);
  let user = $state<{ name: string; email: string } | null>(null);
</script>

<button onclick={() => count++}>{count}</button>
```

**`$derived`** — compute values from state (replaces `$:` reactive declarations):
```svelte
<script lang="ts">
  let price = $state(100);
  let quantity = $state(2);
  let total = $derived(price * quantity);
  let formatted = $derived(`$${total.toFixed(2)}`);
</script>

<p>Total: {formatted}</p>
```

**`$effect`** — run side effects when dependencies change (replaces `$:` side effects):
```svelte
<script lang="ts">
  let query = $state('');

  $effect(() => {
    // Runs whenever `query` changes
    const timeout = setTimeout(() => {
      search(query);
    }, 300);
    return () => clearTimeout(timeout); // Cleanup function
  });
</script>
```

**`$props`** — declare component props:
```svelte
<script lang="ts">
  interface Props {
    title: string;
    count?: number;
    onchange?: (value: string) => void;
  }

  let { title, count = 0, onchange }: Props = $props();
</script>
```

**`$bindable`** — make a prop two-way bindable:
```svelte
<script lang="ts">
  let { value = $bindable('') }: { value: string } = $props();
</script>
```

**Rules:**
- Use `$state` for all mutable values. Plain `let` declarations are not reactive.
- Use `$derived` for computed values — never assign to a derived value.
- Use `$effect` sparingly — most logic belongs in event handlers, not effects.
- Never destructure `$state` objects — you lose reactivity. Access properties directly.
- `$effect` cannot be used in server-side code — it only runs in the browser.

### Component Syntax

Svelte components are `.svelte` files with `<script>`, template, and `<style>` blocks:

```svelte
<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  interface Props {
    name: string;
  }

  let { name }: Props = $props();
  let greeting = $derived(`Hello, ${name}!`);
</script>

<div class="card">
  <h2>{greeting}</h2>
  <Button onclick={() => console.log('clicked')}>Click me</Button>
</div>

<style>
  .card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
</style>
```

**CSS is scoped by default.** Styles in `<style>` only apply to the current component. Use `:global()` to escape scoping when necessary.

### Template Syntax

**Conditionals:**
```svelte
{#if loggedIn}
  <Dashboard />
{:else if loading}
  <Spinner />
{:else}
  <LoginForm />
{/if}
```

**Loops:**
```svelte
{#each items as item (item.id)}
  <li>{item.name}</li>
{:empty}
  <li>No items found.</li>
{/each}
```

**Await blocks:**
```svelte
{#await fetchData()}
  <Spinner />
{:then data}
  <DataView {data} />
{:catch error}
  <p>Error: {error.message}</p>
{/await}
```

**Snippets (Svelte 5 — replaces slots):**
```svelte
<!-- Parent -->
<Card>
  {#snippet header()}
    <h2>Title</h2>
  {/snippet}
  {#snippet footer()}
    <button>Save</button>
  {/snippet}
</Card>

<!-- Card.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  let { header, footer, children }: {
    header?: Snippet;
    footer?: Snippet;
    children: Snippet;
  } = $props();
</script>

<div class="card">
  {#if header}{@render header()}{/if}
  {@render children()}
  {#if footer}{@render footer()}{/if}
</div>
```

### Transitions & Animations

```svelte
<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  let visible = $state(true);
</script>

{#if visible}
  <div transition:fade={{ duration: 200 }}>Fades in and out</div>
  <div in:fly={{ y: 20 }} out:fade>Flies in, fades out</div>
{/if}

{#each items as item (item.id)}
  <div animate:flip={{ duration: 300 }} transition:slide>
    {item.name}
  </div>
{/each}
```

### Routing

SvelteKit uses file-based routing in `src/routes/`:

```
src/routes/
├── +layout.svelte           # Root layout (wraps everything)
├── +page.svelte             # Home page (/)
├── +error.svelte            # Error page for this segment
├── about/
│   └── +page.svelte         # /about
├── blog/
│   ├── +page.svelte         # /blog
│   ├── +page.server.ts      # Server load function for /blog
│   └── [slug]/
│       ├── +page.svelte     # /blog/my-post (dynamic)
│       └── +page.server.ts  # Server load for dynamic post
├── dashboard/
│   ├── +layout.svelte       # Dashboard layout (sidebar, etc.)
│   ├── +layout.server.ts    # Layout load (runs for all child pages)
│   ├── +page.svelte         # /dashboard
│   └── settings/
│       └── +page.svelte     # /dashboard/settings
├── (marketing)/             # Route group (no URL segment)
│   ├── +layout.svelte       # Shared layout for marketing pages
│   ├── pricing/+page.svelte # /pricing
│   └── features/+page.svelte# /features
└── api/
    └── webhooks/
        └── +server.ts       # API endpoint: POST /api/webhooks
```

**Key conventions:**
- `+page.svelte` — the page component
- `+page.ts` — universal load function (runs server and client)
- `+page.server.ts` — server-only load function and form actions
- `+layout.svelte` — layout that wraps child pages (persists across navigation)
- `+layout.server.ts` — server-only load for layouts
- `+error.svelte` — error boundary for this route segment
- `+server.ts` — standalone API endpoint (GET, POST, PUT, DELETE)
- `(group)` — route groups for organization without affecting URL
- `[param]` — dynamic segments
- `[...rest]` — catch-all segments

### Load Functions

Load functions run before the page renders and provide data via the `data` prop.

```ts
// src/routes/blog/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ params, locals, url }) => {
  const page = Number(url.searchParams.get('page')) || 1;
  const posts = await db.post.findMany({
    skip: (page - 1) * 10,
    take: 10,
  });

  return { posts, page };
};
```

```svelte
<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

{#each data.posts as post}
  <article>
    <h2><a href="/blog/{post.slug}">{post.title}</a></h2>
  </article>
{/each}
```

**Rules:**
- Use `+page.server.ts` for database access, secrets, or anything that must stay server-side.
- Use `+page.ts` for data that can safely run on the client (public APIs, transformations).
- Layout load data is available to all child pages — use it for shared data (auth, site config).
- `$types` is auto-generated — always import types from `./$types`.

### Form Actions

Form actions handle mutations with progressive enhancement — forms work without JavaScript.

```ts
// src/routes/login/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) redirect(303, '/dashboard');
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return fail(400, { email, error: 'All fields are required.' });
    }

    const user = await authenticate(email, password);
    if (!user) {
      return fail(401, { email, error: 'Invalid credentials.' });
    }

    cookies.set('session', user.sessionId, { path: '/', httpOnly: true });
    redirect(303, '/dashboard');
  },
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<form method="POST" use:enhance>
  <input name="email" value={form?.email ?? ''} />
  <input name="password" type="password" />
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  <button type="submit">Log in</button>
</form>
```

**Rules:**
- Always use `use:enhance` on forms for progressive enhancement (no full-page reload).
- Use `fail()` to return validation errors — it preserves the HTTP status and form data.
- Use `redirect()` for navigation after successful mutations.
- Named actions: `export const actions = { login: ..., register: ... }` with `<form method="POST" action="?/login">`.

### Hooks

Hooks are app-level middleware. Define them in `src/hooks.server.ts`:

```ts
// src/hooks.server.ts
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const auth: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');
  event.locals.user = session ? await getUserFromSession(session) : null;
  return resolve(event);
};

const guard: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/dashboard') && !event.locals.user) {
    return new Response(null, { status: 303, headers: { location: '/login' } });
  }
  return resolve(event);
};

export const handle = sequence(auth, guard);

export const handleError: HandleServerError = async ({ error, event }) => {
  console.error('Server error:', error);
  return { message: 'Something went wrong.' };
};
```

### Environment Variables

SvelteKit provides type-safe environment variable access:

```ts
// Server-only (never exposed to client)
import { DATABASE_URL, API_SECRET } from '$env/static/private';
import { env } from '$env/dynamic/private';

// Client-safe (prefixed with PUBLIC_)
import { PUBLIC_API_URL } from '$env/static/public';
import { env } from '$env/dynamic/public';
```

**Rules:**
- Private env vars are only importable in server files (`+page.server.ts`, `$lib/server/`).
- Public env vars must be prefixed with `PUBLIC_`.
- Prefer `$env/static/*` — values are inlined at build time for better performance.
- Use `$env/dynamic/*` when values must be read at runtime (e.g., platform adapters).

### $app Stores & Modules

```ts
import { page } from '$app/state';       // Current page info (url, params, data, error)
import { navigating } from '$app/state'; // Navigation state (null or { from, to })
import { goto } from '$app/navigation';  // Programmatic navigation
import { invalidate, invalidateAll } from '$app/navigation'; // Re-run load functions
```

```svelte
<script lang="ts">
  import { page } from '$app/state';
</script>

<p>Current path: {page.url.pathname}</p>
{#if page.error}
  <p>Error: {page.error.message}</p>
{/if}
```

### Server-Only Modules

Anything in `$lib/server/` is guaranteed to never reach the client:

```
src/lib/server/
├── db.ts          # Database client
├── auth.ts        # Auth helpers (session validation, etc.)
├── email.ts       # Email service
└── stripe.ts      # Payment processing
```

Importing from `$lib/server/` in client code will throw a build error. Use this for database clients, API keys, and any sensitive logic.

### File Structure

```
src/
├── routes/
│   ├── +layout.svelte           # Root layout
│   ├── +page.svelte             # Home
│   ├── [feature]/
│   │   ├── +page.svelte
│   │   ├── +page.server.ts
│   │   └── +error.svelte
│   └── api/
│       └── [resource]/+server.ts
├── lib/
│   ├── components/              # Shared components
│   │   ├── ui/                  # Generic UI (Button, Modal, etc.)
│   │   └── [feature]/           # Feature-specific components
│   ├── server/                  # Server-only code (db, auth, etc.)
│   │   ├── db.ts
│   │   └── auth.ts
│   ├── stores/                  # Shared reactive state (if needed)
│   ├── utils/                   # Shared utilities
│   └── types/                   # Shared TypeScript types
├── hooks.server.ts              # Server hooks (auth, logging)
├── hooks.client.ts              # Client hooks (error tracking)
├── app.html                     # HTML template
├── app.css                      # Global styles
└── app.d.ts                     # Type declarations (locals, etc.)

static/
├── images/
├── fonts/
└── favicon.png
```

### Naming Conventions

- **Route files:** `+page.svelte`, `+layout.svelte`, `+page.server.ts` — SvelteKit conventions
- **Components:** `PascalCase.svelte` (e.g., `UserCard.svelte`)
- **Utilities:** `camelCase.ts` in `$lib/utils/`
- **Server modules:** `camelCase.ts` in `$lib/server/`
- **Types:** `PascalCase` for interfaces/types, in `$lib/types/`

### Patterns

**Auth-protected layouts:**
```ts
// src/routes/dashboard/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) redirect(303, '/login');
  return { user: locals.user };
};
```

**Optimistic UI with enhance:**
```svelte
<form method="POST" action="?/toggle" use:enhance={() => {
  item.completed = !item.completed; // Optimistic update
  return async ({ update }) => {
    await update(); // Sync with server response
  };
}}>
  <button>{item.completed ? 'Undo' : 'Done'}</button>
</form>
```

**Loading indicators:**
```svelte
<script lang="ts">
  import { navigating } from '$app/state';
</script>

{#if navigating.to}
  <div class="loading-bar" transition:fade />
{/if}
```

### Anti-Patterns — Do NOT

- Use `$effect` for data fetching — use load functions instead
- Destructure `$state` objects — you lose reactivity (`let { name } = $state(obj)` is wrong)
- Put database or secret access in `+page.ts` — use `+page.server.ts` for server-only code
- Skip `use:enhance` on forms — without it, forms cause full-page reloads
- Import from `$lib/server/` in client code — it will break the build
- Use `onMount` for data that should come from load functions
- Create API endpoints (`+server.ts`) for data that load functions can provide directly
- Use `$effect` to sync state — use `$derived` instead
- Mutate `$derived` values — they are read-only
- Use the old Svelte 4 syntax (`export let`, `$:`, `$$props`) — this project uses Svelte 5 runes
- Forget `(item.id)` keys in `{#each}` blocks — keyed each blocks prevent rendering bugs
- Put sensitive logic in `+page.ts` — it runs on the client during navigation
- Skip error boundaries — add `+error.svelte` to catch failures gracefully

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Svelte 5 runes for all reactivity (`$state`, `$derived`, `$effect`)
- Server load functions for all data fetching
- Form actions with `use:enhance` for all mutations
- TypeScript strict mode
- Scoped CSS by default — avoid `:global()` unless truly necessary
- Colocate feature code near its routes
- Keep `$lib/server/` for truly server-only logic
- Prefer `<a>` links for navigation, `goto()` only for programmatic redirects

## Notes

[Any project-specific context]
