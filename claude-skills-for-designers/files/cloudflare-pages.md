# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Astro / Next.js / SvelteKit / Remix / static HTML / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- Deployed on **Cloudflare Pages** (with Workers, KV, D1, R2 as needed)

## Platform: Cloudflare Pages

This project is deployed on Cloudflare Pages — a JAMstack hosting platform with built-in serverless functions (via Workers), edge-first execution, and access to Cloudflare's storage primitives (KV, D1, R2).

### Project Configuration

Cloudflare Pages auto-detects most frameworks. Configure build settings in the dashboard or `wrangler.toml`:

```toml
# wrangler.toml
name = "[project-name]"
compatibility_date = "2024-01-01"
pages_build_output_dir = "./dist"

[vars]
ENVIRONMENT = "production"

[[kv_namespaces]]
binding = "CACHE"
id = "[kv-namespace-id]"

[[d1_databases]]
binding = "DB"
database_name = "[database-name]"
database_id = "[database-id]"

[[r2_buckets]]
binding = "STORAGE"
bucket_name = "[bucket-name]"
```

### Build Settings

Configure in the Cloudflare dashboard or let it auto-detect:

| Framework | Build Command | Output Directory |
|-----------|--------------|-----------------|
| Astro | `npm run build` | `dist` |
| Next.js | `npx @cloudflare/next-on-pages` | `.vercel/output/static` |
| SvelteKit | `npm run build` | `.svelte-kit/cloudflare` |
| Remix | `npm run build` | `build/client` |
| Static | (none) | `/` or `public` |

### Functions (Server-Side Logic)

Files in `functions/` become Workers that run at the edge:

```
functions/
├── api/
│   ├── hello.ts           # GET/POST /api/hello
│   ├── users/
│   │   ├── index.ts       # GET/POST /api/users
│   │   └── [id].ts        # GET/PUT/DELETE /api/users/:id
│   └── _middleware.ts      # Middleware for /api/* routes
└── _middleware.ts           # Global middleware
```

```ts
// functions/api/hello.ts
export const onRequestGet: PagesFunction = async (context) => {
  return Response.json({ message: 'Hello from Cloudflare' });
};

export const onRequestPost: PagesFunction = async (context) => {
  const body = await context.request.json();
  return Response.json({ received: body });
};
```

```ts
// functions/api/_middleware.ts — runs before all /api/* handlers
export const onRequest: PagesFunction = async (context) => {
  // Auth check, CORS headers, logging, etc.
  const response = await context.next();
  response.headers.set('X-Custom-Header', 'value');
  return response;
};
```

### Middleware

```ts
// functions/_middleware.ts — global middleware
export const onRequest: PagesFunction = async (context) => {
  const { request, env, next } = context;

  // Auth check example
  const token = request.headers.get('Authorization');
  if (request.url.includes('/api/protected') && !token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Add CORS headers
  const response = await next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
};
```

### KV Storage (Key-Value)

Global, low-latency key-value store — ideal for caching, config, session data:

```ts
// functions/api/config.ts
interface Env {
  CACHE: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  // Read from KV
  const value = await context.env.CACHE.get('site-config', 'json');

  if (!value) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json(value);
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const body = await context.request.json();

  // Write to KV (with optional TTL)
  await context.env.CACHE.put('site-config', JSON.stringify(body), {
    expirationTtl: 3600,  // 1 hour
  });

  return Response.json({ success: true });
};
```

**KV characteristics:** Eventually consistent (reads may be stale for ~60s), unlimited reads, fast globally. Best for: caching, feature flags, config. Not for: frequently updated data, counters.

### D1 Database (SQLite at Edge)

Full SQL database running at the edge:

```ts
// functions/api/posts.ts
interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { results } = await context.env.DB
    .prepare('SELECT * FROM posts WHERE published = ? ORDER BY created_at DESC LIMIT ?')
    .bind(true, 20)
    .all();

  return Response.json(results);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { title, content } = await context.request.json();

  const result = await context.env.DB
    .prepare('INSERT INTO posts (title, content, published, created_at) VALUES (?, ?, ?, datetime("now"))')
    .bind(title, content, false)
    .run();

  return Response.json({ id: result.meta.last_row_id });
};
```

```sql
-- migrations/0001_create_posts.sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_posts_published ON posts(published);
```

```bash
# Apply migrations
wrangler d1 migrations apply [database-name]

# Local development
wrangler d1 migrations apply [database-name] --local
```

### R2 Storage (S3-Compatible)

Object storage for files, images, backups:

```ts
// functions/api/upload.ts
interface Env {
  STORAGE: R2Bucket;
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const key = url.pathname.replace('/api/upload/', '');

  await context.env.STORAGE.put(key, context.request.body, {
    httpMetadata: {
      contentType: context.request.headers.get('Content-Type') || 'application/octet-stream',
    },
  });

  return Response.json({ key, success: true });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const key = url.pathname.replace('/api/upload/', '');

  const object = await context.env.STORAGE.get(key);
  if (!object) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return new Response(object.body, {
    headers: { 'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream' },
  });
};
```

### Custom Domains

- Add domains in **Pages project → Custom domains**
- Cloudflare handles SSL automatically
- DNS must be managed through Cloudflare (proxied)
- Add both `example.com` and `www.example.com`, redirect one to the other

### Redirects

```
# public/_redirects (or _redirects at build output root)
/old-page    /new-page    301
/blog/*      /articles/:splat    301
/docs        https://docs.example.com    302
```

Or use `_headers` for custom response headers:

```
# public/_headers
/api/*
  Access-Control-Allow-Origin: *
  Cache-Control: no-store

/*.js
  Cache-Control: public, max-age=31536000, immutable
```

### Environment Variables and Secrets

- Set in **Pages project → Settings → Environment variables**
- Separate values for **Production** and **Preview** environments
- Secrets (API keys, tokens) — use encrypted environment variables
- Access in functions via `context.env.VARIABLE_NAME`

```ts
export const onRequestGet: PagesFunction<{ API_KEY: string }> = async (context) => {
  const apiKey = context.env.API_KEY;
  // Use the key...
};
```

### Wrangler CLI

```bash
# Install
npm install -g wrangler

# Login
wrangler login

# Local development (serves pages + functions)
wrangler pages dev ./dist

# Deploy
wrangler pages deploy ./dist

# D1 commands
wrangler d1 create [database-name]
wrangler d1 migrations apply [database-name]
wrangler d1 execute [database-name] --command "SELECT * FROM posts"

# KV commands
wrangler kv namespace create CACHE
wrangler kv key put --binding CACHE "key" "value"

# R2 commands
wrangler r2 bucket create [bucket-name]
```

### File Structure

```
[project-root]/
├── wrangler.toml            # Cloudflare config (bindings, vars)
├── functions/               # Server-side functions (Workers)
│   ├── api/
│   │   ├── _middleware.ts   # API middleware
│   │   ├── hello.ts
│   │   └── posts/
│   │       ├── index.ts
│   │       └── [id].ts
│   └── _middleware.ts       # Global middleware
├── migrations/              # D1 database migrations
│   ├── 0001_create_posts.sql
│   └── 0002_add_users.sql
├── public/
│   ├── _redirects           # Redirect rules
│   └── _headers             # Custom headers
├── src/                     # Frontend source
│   └── ...
├── dist/                    # Build output (deployed)
└── .dev.vars                # Local env vars (gitignored)
```

### Anti-Patterns — Do NOT

- Use Node.js-specific APIs in Workers/Functions — the runtime is V8, not Node.js (no `fs`, no `path`, no `process`)
- Store frequently-updated data in KV — it's eventually consistent, not a database
- Skip D1 migrations — don't modify the schema through raw SQL in production
- Forget to bind resources in `wrangler.toml` — functions can't access KV/D1/R2 without bindings
- Put secrets in `wrangler.toml` — use `wrangler secret put` or the dashboard
- Assume unlimited execution time — Workers have a 30s CPU time limit
- Use R2 for tiny key-value lookups — use KV for that, R2 is for larger objects
- Ignore the `_middleware.ts` pattern — it's the cleanest way to add auth and CORS
- Commit `.dev.vars` — it contains local secrets
- Deploy without testing locally with `wrangler pages dev` first
- Use `fetch()` to call your own functions from other functions — call the logic directly

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All server logic in `functions/` directory (Workers)
- D1 for relational data, KV for caching/config, R2 for file storage
- Database changes through migrations only
- Local development with `wrangler pages dev`
- Environment variables in dashboard, local overrides in `.dev.vars`

## Notes

[Any project-specific context — Cloudflare account, plan tier, bound services]
