# [Project Name]

[Brief description of what this project does.]

---

## Capability: SEO

This project is optimized for search engines. Every page has proper meta tags, structured data, and semantic markup to maximize discoverability and click-through rates.

### Essential Meta Tags

Every page must include these in the `<head>`:

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>[Page Title] | [Site Name]</title>
  <meta name="description" content="[150-160 character description of the page. Include primary keyword naturally. Write for humans — this appears in search results.]" />
  <link rel="canonical" href="https://[domain]/[path]" />
</head>
```

**Title tag rules:**
- 50-60 characters maximum (Google truncates after ~60)
- Primary keyword near the beginning
- Format: `[Page-Specific Title] | [Brand]` or `[Page-Specific Title] — [Brand]`
- Every page has a unique title
- Home page: `[Brand] — [Tagline or Value Prop]`

**Meta description rules:**
- 150-160 characters
- Include the primary keyword naturally
- Write a compelling reason to click — this is ad copy for organic search
- Every page has a unique description
- If omitted, Google will auto-generate one (usually worse)

### Open Graph Tags

Control how pages appear when shared on social media.

```html
<meta property="og:title" content="[Title for social sharing — can differ from page title]" />
<meta property="og:description" content="[Description for social — can be longer than meta description]" />
<meta property="og:image" content="https://[domain]/og/[page-name].png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://[domain]/[canonical-path]" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="[Site Name]" />
```

**OG image requirements:**
- 1200x630px (1.91:1 ratio)
- Keep important text in the center 60% — platforms crop edges
- File size under 1MB
- Use absolute URLs

### Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Title]" />
<meta name="twitter:description" content="[Description]" />
<meta name="twitter:image" content="https://[domain]/og/[page-name].png" />
<meta name="twitter:site" content="@[handle]" />
```

Card types: `summary` (small image), `summary_large_image` (large image — preferred for most pages).

### Next.js Metadata API

```tsx
// app/[page]/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "[Page Title]",
  description: "[Page description]",
  openGraph: {
    title: "[OG Title]",
    description: "[OG Description]",
    url: "https://[domain]/[path]",
    images: [{ url: "/og/[page].png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "[Twitter Title]",
    description: "[Twitter Description]",
    images: ["/og/[page].png"],
  },
  alternates: {
    canonical: "https://[domain]/[path]",
  },
};
```

**Dynamic metadata for content pages:**
```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.ogImage }],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}
```

### Structured Data (JSON-LD)

Add structured data to help Google understand content and show rich results.

```tsx
// Reusable JSON-LD component
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

**Organization (site-wide, in layout):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Organization Name]",
  "url": "https://[domain]",
  "logo": "https://[domain]/logo.png",
  "sameAs": [
    "https://twitter.com/[handle]",
    "https://github.com/[handle]"
  ]
}
```

**Article (blog posts):**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Post Title]",
  "description": "[Post excerpt]",
  "image": "https://[domain]/blog/[slug]/og.png",
  "datePublished": "[ISO 8601 date]",
  "dateModified": "[ISO 8601 date]",
  "author": {
    "@type": "Person",
    "name": "[Author Name]"
  }
}
```

**Product:**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Product Name]",
  "description": "[Product description]",
  "image": "https://[domain]/products/[slug].png",
  "offers": {
    "@type": "Offer",
    "price": "[Price]",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://[domain]/products/[slug]"
  }
}
```

**FAQ (can trigger rich results):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text?]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text.]"
      }
    }
  ]
}
```

**Breadcrumbs:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://[domain]" },
    { "@type": "ListItem", "position": 2, "name": "[Category]", "item": "https://[domain]/[category]" },
    { "@type": "ListItem", "position": 3, "name": "[Page]" }
  ]
}
```

### Dynamic OG Images

Generate OG images programmatically for content pages.

```tsx
// app/og/route.tsx (Next.js with @vercel/og)
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") ?? "[Default Title]";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <h1 style={{ fontSize: 56, lineHeight: 1.2, margin: 0 }}>{title}</h1>
        <p style={{ fontSize: 24, color: "#a1a1aa", marginTop: 20 }}>
          [domain]
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

### Sitemap

```tsx
// app/sitemap.ts (Next.js)
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://[domain]";

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
  ];

  // Dynamic pages
  const posts = await getAllPosts();
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
}
```

### robots.txt

```tsx
// app/robots.ts (Next.js)
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard/"],
    },
    sitemap: "https://[domain]/sitemap.xml",
  };
}
```

### Heading Hierarchy

```html
<!-- Correct: logical nesting, one h1 -->
<h1>Product Name — Main Value Prop</h1>
  <h2>Features</h2>
    <h3>Feature One</h3>
    <h3>Feature Two</h3>
  <h2>Pricing</h2>
  <h2>FAQ</h2>

<!-- Wrong: skipped levels, multiple h1s -->
<h1>Welcome</h1>
<h1>Features</h1>     <!-- only one h1 per page -->
  <h3>Feature One</h3>  <!-- skipped h2 -->
```

### URL Structure

- Use hyphens, not underscores: `/blog/my-post` not `/blog/my_post`
- Keep URLs flat: `/products/widget` not `/shop/categories/tools/products/widget`
- Lowercase only: `/about` not `/About`
- Descriptive and readable: `/pricing` not `/page?id=3`
- No trailing slashes (pick one convention and be consistent)
- Include the primary keyword in the URL

### Canonical URLs

Prevent duplicate content issues by setting canonical URLs on every page.

```html
<!-- Always set, even when URL and canonical are the same -->
<link rel="canonical" href="https://[domain]/[path]" />
```

**Common duplicate content scenarios:**
- `www.` vs non-`www.` — redirect one to the other
- `http://` vs `https://` — redirect HTTP to HTTPS
- Trailing slash vs no trailing slash — pick one, redirect the other
- URL parameters (`?ref=twitter`) — canonical ignores query params
- Paginated content — canonical points to the first page or use `rel="next"/"prev"`

### Page Speed and SEO

Core Web Vitals directly affect search rankings:

| Metric | Target | What it measures |
|--------|--------|-----------------|
| LCP | < 2.5s | Largest element render time |
| INP | < 200ms | Input responsiveness |
| CLS | < 0.1 | Visual stability |

**Quick wins:**
- Compress and serve images in WebP/AVIF
- Preload the LCP image: `<link rel="preload" as="image" href="..." />`
- Use `loading="lazy"` on below-the-fold images
- Set explicit `width` and `height` on all images (prevents CLS)
- Preload fonts: `<link rel="preload" as="font" crossorigin href="..." />`
- Minimize JavaScript blocking the main thread

### Internal Linking

- Every page should be reachable within 3 clicks from the homepage
- Use descriptive anchor text: "view the pricing plans" not "click here"
- Link related content to each other (blog posts, product pages)
- Use breadcrumbs on content pages for navigation and SEO

### Meta Robots

Control indexing per page when needed:

```html
<!-- Don't index this page, don't follow links -->
<meta name="robots" content="noindex, nofollow" />

<!-- Index but don't follow outbound links -->
<meta name="robots" content="index, nofollow" />

<!-- Don't show cached version in search results -->
<meta name="robots" content="noarchive" />
```

Use `noindex` for: admin pages, search results pages, filtered/paginated views, staging environments, thin content pages.

### Anti-Patterns — Do NOT

- Duplicate the same title or description across multiple pages
- Stuff keywords — write naturally for humans, not search bots
- Use JavaScript-only rendering for critical content without SSR/SSG
- Forget the canonical tag — every page needs one
- Use `display: none` to hide keyword-stuffed text — Google penalizes this
- Create pages without an h1, or use multiple h1 tags
- Use generic anchor text ("click here", "read more") for internal links
- Skip alt text on images — Google Image Search drives traffic
- Block CSS or JS in robots.txt — search engines need to render pages
- Use client-side redirects (meta refresh, JS redirect) instead of 301s
- Forget to submit the sitemap to Google Search Console
- Use absolute URLs with `http://` instead of `https://`
- Ignore 404 errors — set up proper redirects for moved content
- Use iframe-heavy pages — search engines struggle with iframe content

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Every page has unique title, description, and canonical URL
- OG image generated for every content page
- Structured data added for applicable page types
- Sitemap auto-generates from content
- Run Lighthouse SEO audit before deploys

## Notes

[Any project-specific context — target keywords, Search Console setup, analytics.]
