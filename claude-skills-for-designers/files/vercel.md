# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / SvelteKit / Nuxt / Astro / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- Deployed on **Vercel**

## Platform: Vercel

This project is deployed and hosted on Vercel. Vercel provides zero-config deployments for frontend frameworks, serverless functions, edge functions, preview deployments per branch, and built-in analytics.

### Project Configuration

`vercel.json` at the project root controls deployment behavior:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ],
  "redirects": [
    { "source": "/old-path", "destination": "/new-path", "permanent": true }
  ],
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://api.example.com/:path*" }
  ]
}
```

Most Next.js projects need no `vercel.json` at all — Vercel auto-detects the framework. Only add it when you need custom headers, redirects, rewrites, or region pinning.

### Environment Variables

Vercel has three environments. Set variables in the Vercel dashboard under **Settings → Environment Variables**.

| Environment | When it runs | Use for |
|-------------|-------------|---------|
| **Production** | `main` branch deploys | Real API keys, production DB |
| **Preview** | Every PR / branch deploy | Staging API keys, test DB |
| **Development** | `vercel dev` locally | Local overrides |

**Rules:**
- Never commit `.env` files — use Vercel dashboard or `vercel env pull` to sync locally
- Prefix client-exposed vars with `NEXT_PUBLIC_` (Next.js) or framework equivalent
- Use different API keys per environment — never share production keys with preview
- Pull env vars locally: `vercel env pull .env.local`

```bash
# Pull environment variables for local development
vercel env pull .env.local
```

### Serverless Functions

Files in `api/` (or `app/api/` for Next.js App Router) become serverless functions automatically:

```
api/
├── hello.ts          # GET/POST /api/hello
├── users/
│   ├── index.ts      # GET/POST /api/users
│   └── [id].ts       # GET/PUT/DELETE /api/users/:id
└── webhooks/
    └── stripe.ts     # POST /api/webhooks/stripe
```

```ts
// api/hello.ts (Vercel serverless function)
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  return res.status(200).json({ message: 'Hello from Vercel' });
}
```

**For Next.js App Router**, use route handlers instead:

```ts
// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello' });
}
```

**Limits:** 10s default timeout (Pro: 60s, Enterprise: 900s). 4.5MB request body max. Cold starts happen on infrequent traffic.

### Edge Functions

Edge functions run closer to the user (globally distributed), with lower latency but a limited runtime (no Node.js APIs, no file system):

```ts
// middleware.ts or api/edge-example.ts
export const config = { runtime: 'edge' };

export default function handler(request: Request) {
  return new Response(JSON.stringify({ location: 'edge' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

Use edge for: auth checks, redirects, A/B testing, geolocation, header manipulation. Do not use for: database connections, heavy computation, file system access.

### Preview Deployments

Every push to a non-production branch gets a unique preview URL automatically. Every PR gets its own deployment.

- Share preview URLs with collaborators for review
- Preview deployments use **Preview** environment variables
- Comment on PRs with the preview link (automatic with Vercel GitHub integration)
- Each preview is isolated — safe to test breaking changes

### Custom Domains

- Add domains in **Settings → Domains**
- Vercel handles SSL certificates automatically
- Use `www` redirect or apex domain — pick one as canonical
- For subdomains: add `api.example.com` pointing to the same project if needed

### Vercel Analytics & Speed Insights

```tsx
// app/layout.tsx (Next.js)
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

- **Analytics** — page views, unique visitors, top pages, referrers
- **Speed Insights** — real user Core Web Vitals (LCP, CLS, INP)
- Both are lightweight and privacy-friendly (no cookies)

### Cron Jobs

Define scheduled functions in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/daily-cleanup",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/hourly-sync",
      "schedule": "0 * * * *"
    }
  ]
}
```

```ts
// app/api/cron/daily-cleanup/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Do the work
  await cleanupStaleRecords();
  return NextResponse.json({ success: true });
}
```

Always protect cron endpoints with `CRON_SECRET` — they're publicly accessible URLs.

### Image Optimization

Use `next/image` — Vercel optimizes images automatically (resizing, format conversion, caching):

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority              // Preload above-the-fold images
  className="rounded-lg"
/>

// Remote images — add domain to next.config.js
<Image
  src="https://cdn.example.com/photo.jpg"
  alt="Remote photo"
  width={800}
  height={400}
/>
```

```js
// next.config.js — allow remote image domains
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.example.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
};
```

### Deploy Hooks

Trigger deployments from external services (CMS publish, webhook, CI):

- Create in **Settings → Git → Deploy Hooks**
- Each hook is a unique URL — `POST` to it triggers a deployment
- Use for: CMS content updates, scheduled rebuilds, external CI triggers

### Monorepo Support

For monorepos with multiple apps:

```json
// vercel.json at repo root
{
  "ignoreCommand": "npx turbo-ignore"
}
```

- Set **Root Directory** per project in Vercel dashboard (e.g., `apps/web`)
- Use `ignoreCommand` to skip builds when only unrelated packages changed
- Each app in the monorepo can be a separate Vercel project

### Project Linking

```bash
# Link local project to Vercel
vercel link

# Deploy from CLI
vercel              # Preview deployment
vercel --prod       # Production deployment

# Pull env vars
vercel env pull .env.local
```

### File Structure

```
[project-root]/
├── vercel.json          # Optional — deployment config
├── .vercelignore        # Files to exclude from deployment
├── .env.local           # Local env vars (gitignored)
├── app/                 # Next.js App Router (or framework equivalent)
│   ├── api/             # API routes (become serverless functions)
│   │   ├── cron/        # Cron job endpoints
│   │   └── webhooks/    # Webhook handlers
│   ├── layout.tsx
│   └── page.tsx
├── middleware.ts         # Edge middleware
├── public/              # Static files (served from CDN)
└── next.config.js       # Framework config
```

### Anti-Patterns — Do NOT

- Commit `.env` or `.env.local` — use Vercel dashboard for env vars
- Share production API keys with preview environments
- Use serverless functions for WebSocket connections — they're request/response only
- Exceed function timeout limits with long-running tasks — use background jobs or queues instead
- Forget to protect cron job endpoints with authentication
- Put heavy computation in edge functions — they have CPU and memory limits
- Use `vercel.json` redirects when Next.js `next.config.js` redirects work fine
- Deploy without testing preview first — always verify the preview deployment
- Hardcode URLs — use `VERCEL_URL` environment variable for dynamic URLs
- Ignore cold starts — keep serverless functions lightweight for fast boot times
- Skip `priority` on above-the-fold images — it prevents layout shift and improves LCP

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All deployments go through Vercel (no manual server management)
- Preview deployments for every PR before merging
- Environment variables managed in Vercel dashboard, pulled locally with `vercel env pull`
- Serverless functions for API logic, edge functions for middleware
- `next/image` for all images (automatic optimization)

## Notes

[Any project-specific context — Vercel team, plan tier, specific region requirements]
