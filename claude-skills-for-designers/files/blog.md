# [Project Name]

[One-line description of what this blog covers and who it's for.]

---

## Project Type: Blog

This is a content-driven blog. The primary goals are discoverability (SEO), readability, and subscriber growth. Every design and technical decision supports getting content in front of readers and keeping them engaged.

### Site Structure

```
/                       # Home — latest posts or featured content
/blog                   # Post list (paginated)
/blog/[slug]            # Individual post
/blog/category/[cat]    # Posts filtered by category
/blog/tag/[tag]         # Posts filtered by tag
/about                  # Author or publication info
/search                 # Search results page
/rss.xml                # RSS feed
```

### File Structure

```
[root]/
├── components/
│   ├── layout/
│   │   ├── navbar.tsx              # Site navigation
│   │   ├── footer.tsx              # Footer with links and newsletter
│   │   └── page-layout.tsx         # Shared layout wrapper
│   ├── blog/
│   │   ├── post-card.tsx           # Card for post lists (thumbnail, title, excerpt)
│   │   ├── post-grid.tsx           # Grid/list of post cards
│   │   ├── post-header.tsx         # Post page hero (title, meta, feature image)
│   │   ├── post-body.tsx           # Rendered markdown/MDX content
│   │   ├── table-of-contents.tsx   # Auto-generated TOC from headings
│   │   ├── code-block.tsx          # Syntax-highlighted code with copy button
│   │   ├── author-card.tsx         # Author bio at end of post
│   │   ├── related-posts.tsx       # Related post cards
│   │   ├── reading-time.tsx        # Reading time display
│   │   ├── share-buttons.tsx       # Social sharing links
│   │   └── newsletter-signup.tsx   # Email capture form
│   ├── search/
│   │   ├── search-input.tsx        # Search bar
│   │   └── search-results.tsx      # Results list
│   └── pagination.tsx              # Page navigation
├── content/
│   └── posts/
│       ├── [post-slug].md          # Post content (frontmatter + body)
│       └── ...
├── lib/
│   ├── markdown.ts                 # Markdown/MDX processing pipeline
│   ├── reading-time.ts             # Word count → reading time
│   └── rss.ts                      # RSS feed generation
├── styles/
│   └── prose.css                   # Typography styles for post content
└── pages/
    ├── index.tsx
    ├── blog/
    │   ├── index.tsx               # Post list (paginated)
    │   ├── [slug].tsx              # Individual post
    │   ├── category/[cat].tsx
    │   └── tag/[tag].tsx
    ├── about.tsx
    └── search.tsx
```

### Post Content Format

Posts are written in Markdown or MDX with frontmatter metadata.

**Frontmatter:**
```yaml
---
title: "Post Title Here"
description: "One-sentence description for SEO and excerpts."
date: "2025-01-15"
updated: "2025-01-20"          # Optional
category: "[Category]"
tags: ["[tag1]", "[tag2]"]
image: "/images/posts/[slug]/cover.jpg"
imageAlt: "Description of the cover image"
author: "[Author Name]"
draft: false
---
```

**Rules:**
- Every post must have `title`, `description`, `date`, and `category`.
- `draft: true` posts are excluded from production builds but visible in dev.
- `description` is used for meta tags and post card excerpts.
- `image` is optional but recommended — it's used as the OG image and post card thumbnail.

### Page Breakdown

#### Home Page

**Options (choose one):**
- **Latest posts** — chronological list of recent posts, same layout as /blog.
- **Magazine layout** — featured post (large) + grid of recent posts below.
- **Minimal** — intro text about the blog + link to /blog.

**Rules:**
- Show 6-10 posts on the home page.
- Include a newsletter signup in the hero or after the first row of posts.

#### Post List Page (/blog)

**Layout options:**
- **Grid** — 2-3 column card grid. Each card: thumbnail, title, excerpt, date, category badge.
- **List** — single column, each entry: title, excerpt, date, reading time. More scannable, no thumbnails needed.
- **Hybrid** — first post large (featured), rest in a grid below.

**Post card structure:**
- Thumbnail image (if using grid layout)
- Category badge
- Post title (linked)
- Excerpt (1-2 sentences from `description`)
- Date + reading time
- Author (if multi-author)

**Pagination:**
- Bottom of the list: page numbers + previous/next.
- Show [10-15] posts per page.
- Format: "< Previous | 1 2 3 ... 10 | Next >"
- Include total post count ("42 posts").

#### Individual Post Page (/blog/[slug])

**Structure:**
```
1. Post header (title, meta, feature image)
2. Table of contents (optional, for long posts)
3. Post body (rendered markdown)
4. Author card
5. Related posts
6. Newsletter signup
```

**Post header:**
- Title (h1, large)
- Meta row: date + reading time + category (linked)
- Feature image (full-width, below title)
- Optional: updated date ("Updated: Jan 20, 2025")

**Table of contents:**
- Auto-generated from h2 and h3 headings in the post.
- Sticky sidebar on desktop (scrolls with the reader, highlights current section).
- Collapsed/expandable on mobile (toggle at the top of the post).
- Links smooth-scroll to the heading with `scroll-margin-top` offset.

**Post body — typography and content rendering:**
- Use a `prose` container class for consistent typography.
- Headings: h2 for sections, h3 for subsections. No h1 in body (title is h1).
- Paragraphs: comfortable line height (1.6-1.8), max-width for readability (65-75 characters).
- Links: underlined, distinguishable color.
- Images: full-width or content-width, with captions, lazy-loaded.
- Block quotes: left border + italic or muted styling.
- Lists: indented, proper spacing between items.
- Horizontal rules: subtle dividers between major sections.

**Code blocks — syntax highlighting:**
- Language label in the top-right or top-left corner.
- Copy button: appears on hover (top-right of the code block). Copies code content to clipboard with "Copied!" feedback.
- Syntax highlighting with a theme that matches the site (light and dark variants).
- Line numbers: optional, include for longer code blocks.
- Horizontal scroll for long lines — never wrap code.
- Inline code: monospace font with subtle background.

**Author card:**
- Photo, name, short bio (1-2 sentences).
- Links to author's social profiles or author page.
- Appears at the bottom of the post body.

**Related posts:**
- 2-3 related posts based on category or tags.
- Same card format as the post list.
- Heading: "Related Posts" or "Keep Reading".

**Newsletter signup:**
- Appears after related posts (or inline within the post after the first section).
- Heading: "[Value proposition — e.g., Get weekly design tips]"
- Email input + subscribe button.
- Privacy note: "No spam. Unsubscribe anytime."

### Reading Time Calculation

```
words = post body word count
reading_time = Math.ceil(words / 225)
display = "${reading_time} min read"
```

Average reading speed: 225 words per minute. Round up. Display as "X min read" next to the date.

### Category and Tag Pages

**Category page (/blog/category/[cat]):**
- Page title: "[Category Name]" with post count.
- Same post list layout as /blog, filtered to the category.
- Paginated if more than [10-15] posts.

**Tag page (/blog/tag/[tag]):**
- Same as category page but filtered by tag.
- Tags are more granular than categories.

**Rules:**
- A post has one category and zero or more tags.
- Category and tag names are slugified for URLs (e.g., "Web Design" → "web-design").
- Show category/tag navigation somewhere accessible — in the sidebar, navbar, or a dedicated /categories page.

### Search

**Implementation options:**
- **Client-side:** Pre-build a search index at build time (e.g., Fuse.js, Lunr). Good for small-to-medium blogs (< 500 posts).
- **Server-side:** Search endpoint that queries a database. Better for large blogs.

**UI:**
- Search icon in the navbar that expands to an input, or a dedicated search bar.
- Results page: list of matching posts with title, excerpt (with highlighted matching text), date.
- "No results" state with suggestions ("Try different keywords").

### RSS Feed

Generate an RSS 2.0 or Atom feed at `/rss.xml`.

**Include per item:**
- Title
- Link (full URL)
- Description (the `description` from frontmatter, or first 200 characters)
- Publication date
- Category
- Author

**Rules:**
- Include the 20-50 most recent posts.
- Set proper `Content-Type: application/rss+xml` header.
- Add a `<link rel="alternate" type="application/rss+xml">` tag in the site head.
- Validate the feed with a feed validator before launch.

### SEO

**Per-page meta tags:**
```html
<title>[Post Title] — [Blog Name]</title>
<meta name="description" content="[Post description from frontmatter]" />
<meta property="og:title" content="[Post Title]" />
<meta property="og:description" content="[Post description]" />
<meta property="og:image" content="[Post feature image URL]" />
<meta property="og:type" content="article" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="canonical" href="[Full URL]" />
```

**Structured data (JSON-LD):**
- `Article` schema on post pages (headline, datePublished, author, image).
- `BreadcrumbList` for navigation context.
- `WebSite` with `SearchAction` on the home page (if search exists).

**Rules:**
- Every page has a unique title and description.
- Title format: "[Page/Post Title] — [Blog Name]" (separator: em dash).
- Canonical URLs on every page.
- Sitemap at `/sitemap.xml`, auto-generated from post list.
- Proper heading hierarchy: one h1 per page, h2/h3 for structure.

### Responsive Breakpoints

```
Mobile:    < 640px    — single column, full-width post cards
Tablet:    640-1024px — 2-column post grid
Desktop:   > 1024px   — 2-3 column grid, sidebar TOC on post pages
```

**Mobile rules:**
- Post grid: single column.
- Post page: TOC collapses to a toggle at the top.
- Code blocks: horizontal scroll, copy button always visible.
- Newsletter signup: full-width, stacked input + button.
- Navigation: hamburger menu.

### Anti-Patterns — Do NOT

- Publish posts without a `title` and `description` — SEO depends on them
- Use dates without specifying the format — be consistent ("Jan 15, 2025" or "2025-01-15")
- Render code blocks without syntax highlighting or a copy button
- Auto-truncate post content on list pages — use the `description` field for excerpts
- Put ads or popups above the post content
- Use pagination with only "Older / Newer" — show page numbers
- Skip the RSS feed — readers expect it
- Use a font size below 16px for body text on mobile
- Nest more than 3 levels of headings in a post (h2, h3, h4 maximum)
- Show a "Read More" link that goes to the same page with a scroll anchor
- Forget alt text on images — screen readers and SEO need it
- Build search that only matches exact titles — search should match content too
- Use infinite scroll for the post list — paginated is better for blogs (shareable URLs per page)
- Show related posts that aren't actually related (random is not related)

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Posts are Markdown/MDX files with frontmatter metadata
- One category per post, multiple tags allowed
- Reading time displayed on every post card and post page
- Newsletter signup appears on every post page
- Consistent date format throughout: [format]
- Prose typography uses a max-width container for readability

## Notes

[Any project-specific context — CMS integration, newsletter provider, analytics setup.]
