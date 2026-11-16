# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / Astro / SvelteKit / Gatsby / Hugo / static HTML / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- Deployed on **Netlify**

## Platform: Netlify

This project is deployed on Netlify — a platform for web hosting with built-in serverless functions, form handling, identity (auth), deploy previews, and edge functions. Netlify auto-detects most frameworks and deploys with zero config.

### Configuration

`netlify.toml` at the project root controls build and deploy settings:

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"                    # Build output directory
  functions = "netlify/functions"     # Functions directory

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--legacy-peer-deps"    # If needed for older deps

# Production-only settings
[context.production]
  command = "npm run build"

# Preview/branch deploy settings
[context.deploy-preview]
  command = "npm run build:preview"

# Redirects and rewrites
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/old-page"
  to = "/new-page"
  status = 301

# SPA fallback — route all paths to index.html
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Custom headers
[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Cache-Control = "no-store"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Serverless Functions

Files in the functions directory become serverless API endpoints:

```
netlify/
└── functions/
    ├── hello.ts              # /.netlify/functions/hello
    ├── users.ts              # /.netlify/functions/users
    └── send-email.ts         # /.netlify/functions/send-email
```

```ts
// netlify/functions/hello.ts
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello from Netlify Functions' }),
  };
};
```

```ts
// netlify/functions/users.ts — handling multiple HTTP methods
import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const { httpMethod, body, queryStringParameters } = event;

  switch (httpMethod) {
    case 'GET': {
      const userId = queryStringParameters?.id;
      // Fetch user...
      return { statusCode: 200, body: JSON.stringify({ id: userId, name: 'Jane' }) };
    }
    case 'POST': {
      const data = JSON.parse(body || '{}');
      // Create user...
      return { statusCode: 201, body: JSON.stringify({ created: true }) };
    }
    default:
      return { statusCode: 405, body: 'Method not allowed' };
  }
};
```

**Redirect functions to clean URLs** — so `/api/hello` maps to `/.netlify/functions/hello`:

```toml
# netlify.toml
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

**Limits:** 10s timeout (background functions: 15 minutes). 6MB response body max.

### Scheduled Functions

Run functions on a cron schedule:

```ts
// netlify/functions/daily-cleanup.ts
import type { Handler } from '@netlify/functions';
import { schedule } from '@netlify/functions';

export const handler: Handler = schedule('0 0 * * *', async (event) => {
  // Runs daily at midnight UTC
  await cleanupStaleData();
  return { statusCode: 200, body: 'Cleanup complete' };
});
```

### Netlify Forms

Collect form submissions with zero backend code:

```html
<!-- Add netlify attribute to any form -->
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <!-- Honeypot field for spam filtering (hidden) -->
  <p class="hidden"><input name="bot-field" /></p>

  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

For JavaScript-rendered forms (React, Vue, etc.), add a hidden HTML form:

```html
<!-- In public/index.html or a hidden element -->
<form name="contact" netlify netlify-honeypot="bot-field" hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
</form>
```

Then submit via fetch:

```ts
const handleSubmit = async (formData: FormData) => {
  await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData as any).toString(),
  });
};
```

Submissions appear in **Site → Forms** in the Netlify dashboard. Set up email notifications or webhooks.

### Netlify Identity

Built-in auth with no external service:

```bash
npm install netlify-identity-widget
```

```ts
// Initialize identity widget
import netlifyIdentity from 'netlify-identity-widget';

netlifyIdentity.init();

// Open login modal
netlifyIdentity.open();

// Listen for auth events
netlifyIdentity.on('login', (user) => {
  console.log('Logged in:', user);
  netlifyIdentity.close();
});

netlifyIdentity.on('logout', () => {
  console.log('Logged out');
});

// Get current user
const user = netlifyIdentity.currentUser();

// Log out
netlifyIdentity.logout();
```

For more control, use GoTrue.js (the underlying library) directly.

### Environment Variables

- Set in **Site → Settings → Environment variables** or `netlify.toml`
- Separate values for **Production**, **Deploy previews**, and **Branch deploys**
- Access in functions via `process.env.VARIABLE_NAME`
- Prefix with `NEXT_PUBLIC_` or framework equivalent for client-side exposure

```toml
# netlify.toml — non-secret build-time variables
[build.environment]
  NEXT_PUBLIC_API_URL = "https://api.example.com"
```

Secret variables (API keys, tokens) should only be set in the dashboard, never in `netlify.toml`.

### Deploy Previews

Every pull request gets an automatic deploy preview with a unique URL.

- Preview URLs follow the pattern: `deploy-preview-{PR#}--{site-name}.netlify.app`
- Previews use their own environment variable scope
- Use for: QA reviews, stakeholder feedback, testing integrations
- Netlify bot comments on PRs with the preview link

### Branch Deploys and Split Testing

```toml
# netlify.toml — enable branch deploys
[build]
  command = "npm run build"
  publish = "dist"

# Deploy specific branches (in addition to production)
[context.staging]
  command = "npm run build:staging"

[context.beta]
  command = "npm run build:beta"
```

Branch deploys get URLs like `staging--{site-name}.netlify.app`. Use split testing to send a percentage of traffic to a branch deploy for A/B testing.

### Redirects and Rewrites

Two ways to define redirects:

**`_redirects` file** (in publish directory):
```
/old-path        /new-path        301
/api/*           /.netlify/functions/:splat    200
/app/*           /index.html      200     # SPA fallback
```

**`netlify.toml`** (recommended — more features):
```toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301
  force = true              # Override even if file exists

# Country-based redirect
[[redirects]]
  from = "/store"
  to = "/store/eu"
  status = 302
  conditions = { Country = ["GB", "FR", "DE"] }
```

### Edge Functions

Run at the CDN edge with Deno:

```ts
// netlify/edge-functions/geo.ts
import type { Context } from 'https://edge.netlify.com';

export default async (request: Request, context: Context) => {
  const country = context.geo.country?.code || 'US';

  // Modify the response
  const response = await context.next();
  response.headers.set('X-Country', country);
  return response;
};

// Configure which paths trigger this edge function
export const config = { path: '/api/*' };
```

### Build Plugins

Extend the build process with plugins:

```toml
# netlify.toml
[[plugins]]
  package = "@netlify/plugin-lighthouse"

[[plugins]]
  package = "netlify-plugin-cache"
  [plugins.inputs]
    paths = ["node_modules/.cache", ".next/cache"]
```

Popular plugins: Lighthouse audits, build caching, sitemap generation, image optimization.

### Large Media (Git LFS)

Store large files (images, videos) with Netlify Large Media:

```bash
# Enable
netlify lm:setup

# Track large files
git lfs track "*.jpg" "*.png" "*.mp4"

# Image transformations via URL params
# https://site.netlify.app/images/hero.jpg?w=800&h=400&fit=crop
```

### File Structure

```
[project-root]/
├── netlify.toml               # Build and deploy config
├── netlify/
│   ├── functions/             # Serverless functions
│   │   ├── hello.ts
│   │   ├── send-email.ts
│   │   └── daily-cleanup.ts   # Scheduled function
│   └── edge-functions/        # Edge functions (Deno)
│       └── geo.ts
├── public/
│   ├── _redirects             # Redirect rules (alternative to netlify.toml)
│   └── _headers               # Custom headers (alternative to netlify.toml)
├── src/                       # Frontend source
│   └── ...
├── dist/                      # Build output (published)
└── .env                       # Local env vars (gitignored)
```

### Anti-Patterns — Do NOT

- Put secrets in `netlify.toml` — it's committed to git; use the dashboard for secrets
- Forget the SPA fallback redirect — React/Vue apps will 404 on refresh without it
- Use both `_redirects` file and `netlify.toml` redirects — pick one; `netlify.toml` takes precedence
- Exceed the 10s function timeout for synchronous work — use background functions for long tasks
- Skip the honeypot field on Netlify Forms — you'll get spammed
- Put the `_redirects` file in the project root — it must be in the publish directory
- Use Netlify Identity for production apps with >1000 users — it's limited on free tier
- Forget to set `NODE_VERSION` in build environment — builds may use an old Node version
- Use deploy previews as staging environments — they share the same backend/database
- Commit `.netlify/` directory — it contains local state and should be gitignored
- Cache aggressively without cache-busting hashes — stale files break deployments

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All deploy config in `netlify.toml` (not dashboard settings)
- Serverless functions for API logic, edge functions for request transformation
- Netlify Forms for simple contact/feedback forms
- Deploy previews for every PR before merging
- Environment variables in dashboard for secrets, `netlify.toml` for non-sensitive build vars

## Notes

[Any project-specific context — Netlify team, plan tier, connected services]
