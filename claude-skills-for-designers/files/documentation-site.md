# [Project Name] Documentation

[Brief description — what does this documentation cover?]

---

## Tech Stack

- [Framework: Astro / Next.js / Docusaurus / VitePress / custom]
- [Design System: file reference]
- [Search: Algolia / Pagefind / Flexsearch / custom]
- [Hosting: Vercel / Netlify / GitHub Pages / Cloudflare Pages]
- Content authored in Markdown / MDX

## Project Type: Documentation Site

This is a documentation site with sidebar navigation, full-text search, code blocks, and API references. It prioritizes readability, scannability, and fast navigation. The content is the product — the UI stays out of the way.

Pair this file with a design system file for component-level guidance.

### Page Layout

Three-column layout on desktop, collapsing to single-column on mobile.

```
┌──────────────────────────────────────────────────────────┐
│ Top Bar: [Logo] [Search Bar] [Version Selector] [GitHub] │
├────────────┬──────────────────────────┬──────────────────┤
│            │                          │                  │
│  Sidebar   │   Main Content Area      │  Table of        │
│  Navigation│                          │  Contents        │
│            │   Breadcrumbs            │  (current page)  │
│  Nested    │   # Page Title           │                  │
│  sections  │   Content...             │  - Section 1     │
│  with      │   Code blocks...         │  - Section 2     │
│  expand/   │   Callouts...            │  - Section 3     │
│  collapse  │                          │                  │
│            │   ┌─────────┬──────────┐ │                  │
│            │   │ ← Prev  │ Next →   │ │                  │
│            │   └─────────┴──────────┘ │                  │
├────────────┴──────────────────────────┴──────────────────┤
│ Footer: [Links] [Edit on GitHub] [Copyright]             │
└──────────────────────────────────────────────────────────┘
```

**Breakpoints:**
- Desktop (1280px+): three columns — sidebar, content, ToC
- Tablet (768px–1279px): two columns — sidebar, content (ToC moves inline or hides)
- Mobile (<768px): single column — sidebar becomes a drawer, ToC collapses into a dropdown

### Sidebar Navigation

Persistent left sidebar with nested, expandable section groups.

```
Sidebar structure:
├── [Section Group 1]              # Expandable/collapsible
│   ├── Page 1                     # Link
│   ├── Page 2                     # Active state (highlighted)
│   └── Page 3
├── [Section Group 2]
│   ├── Subsection                 # Nested group (one level deep)
│   │   ├── Page A
│   │   └── Page B
│   └── Page C
├── [Section Group 3]
│   └── ...
└── [External Links]               # Optional: GitHub, Discord, etc.
```

**Behavior:**
- Current page is highlighted with a distinct background/border
- Active section group is expanded by default
- Other groups can be collapsed — preserve collapse state across navigation
- Scroll position in sidebar is preserved when navigating between pages
- Sidebar is fixed (does not scroll with content)

**Mobile:**
- Sidebar becomes a slide-in drawer (from left)
- Hamburger menu icon in top bar to toggle
- Overlay/backdrop behind drawer to close on tap
- Drawer closes automatically when a page is selected

**Rules:**
- Maximum 2 levels of nesting (group → subgroup → page)
- Section groups have labels, not links — clicking expands/collapses, not navigates
- Keep sidebar width consistent (240–280px)
- Show an indicator (chevron) for expandable groups
- Sidebar order defines the reading order of the documentation

### Search

Top-bar search with instant results.

```
States:
├── Idle                        # Search icon or input field in top bar
├── Focused                     # Expanded input, keyboard shortcut hint (⌘K or Ctrl+K)
├── Typing                      # Dropdown with instant results as user types
│   ├── Result item             # Page title + section + excerpt with highlight
│   ├── Result item
│   └── Result item
├── No results                  # "No results for [query]" with suggestions
└── Navigated                   # Search closes, scrolls to match on page
```

**Features:**
- Keyboard shortcut to focus search: `Cmd+K` (macOS) / `Ctrl+K` (Windows/Linux)
- Instant results as user types (client-side index or fast API)
- Results show: page title, section heading, text excerpt with query highlighted
- Arrow keys to navigate results, Enter to select
- Escape to close search
- Search indexes page content, headings, and code blocks

**Rules:**
- Search must be fast — under 100ms for results to appear
- Results should deep link to the section, not just the page
- Show keyboard shortcut hint next to the search input
- Client-side search (Pagefind, Flexsearch) for static sites; API search (Algolia) for large sites
- Highlight the matched query in results excerpts

### Code Blocks

Syntax-highlighted code with copy button and optional metadata.

```
Code block features:
├── Syntax highlighting           # Language-aware coloring
├── Language label                 # Top-right or top-left (e.g., "typescript")
├── Copy button                   # Top-right, appears on hover or always visible
│   ├── Click → copies code
│   └── Shows "Copied!" feedback for 2 seconds
├── Line numbers                  # Optional, for long blocks or when referenced in text
├── Line highlighting             # Highlight specific lines (e.g., lines 3-5)
├── Filename/title                # Optional header (e.g., "src/index.ts")
└── Diff view                     # + green / - red for showing changes
```

**Rules:**
- Always specify the language for syntax highlighting
- Copy button copies only the code content (not line numbers or filename)
- Use a monospace font that renders well across platforms
- Code blocks should horizontally scroll, not wrap (preserve formatting)
- Dark background for code blocks, even in light mode (or match theme)
- Keep code blocks focused — show only the relevant code, not entire files
- Use line highlighting to draw attention to the important parts

### Version Selector

Dropdown to switch between documentation versions.

```
Position: top bar, near the logo or search
Format: "v2.1" or "2.1.0" dropdown

Options:
├── v3.0 (latest)                # Badge: "latest"
├── v2.1                         # Currently viewing (checkmark)
├── v2.0
├── v1.x                         # Grouped older versions
└── All versions                  # Link to version archive
```

**Rules:**
- Default to latest version
- Show a banner/warning when viewing an older version: "You're viewing docs for v2.0. Switch to latest."
- Switching versions navigates to the same page in the new version (or fallback to index if the page doesn't exist)
- Version is reflected in the URL (`/docs/v2/getting-started`)
- Include pre-release/beta versions with a clear label

### Breadcrumbs

Show the current page's position in the hierarchy.

```
Format: [Section] / [Subsection] / [Page Title]
Example: Guides / Authentication / OAuth Setup
```

**Rules:**
- Breadcrumbs appear above the page title
- Each segment is a link (except the current page)
- Separator: `/` or `›`
- Do not include "Home" or "Docs" as the first crumb — it's implied
- Breadcrumbs match the sidebar hierarchy exactly

### Prev / Next Navigation

Page-level navigation at the bottom of every content page.

```
┌──────────────────────────────────────────┐
│  ← Previous                     Next →   │
│  [Previous Page Title]  [Next Page Title] │
└──────────────────────────────────────────┘
```

**Rules:**
- Previous/Next follows the sidebar order (the defined reading order)
- Show the page title, not just "Previous" / "Next"
- First page: no "Previous" link. Last page: no "Next" link.
- Full-width container with left-aligned prev and right-aligned next
- Visually distinct from inline links — card-like or bordered

### API Reference Tables

Structured reference documentation for parameters, methods, and returns.

**Parameter table:**

```
| Parameter | Type     | Default | Required | Description             |
|-----------|----------|---------|----------|-------------------------|
| `name`    | `string` | —       | Yes      | [Description]           |
| `count`   | `number` | `10`    | No       | [Description]           |
| `options` | `object` | `{}`    | No       | [See Options below]     |
```

**Method/function reference:**
```
### methodName(param1, param2)

[Description of what this method does.]

**Parameters:**
[Parameter table]

**Returns:** `ReturnType` — [description]

**Example:**
[Code block with usage example]

**Throws:** `ErrorType` — [when this error occurs]
```

**Rules:**
- Every parameter documents: name, type, default, required/optional, description
- Every method has at least one usage example
- Group related methods under a heading
- Link types to their definitions when they are custom/complex
- Use inline code formatting for parameter names, types, and default values

### Callout / Admonition Blocks

Highlighted blocks for important information.

```
Types:
├── Note (blue/info)        # Additional context, good to know
├── Tip (green/success)     # Best practices, helpful shortcuts
├── Warning (yellow/amber)  # Potential issues, proceed with caution
├── Danger (red/error)      # Breaking changes, data loss, security risks
└── Info (gray/neutral)     # General supplementary information
```

**Structure per callout:**
- Icon (matching the type)
- Label: "Note", "Tip", "Warning", "Danger" (or custom)
- Content: 1-3 sentences (keep it brief)
- Visually distinct: colored left border or background tint

**Rules:**
- Use sparingly — if everything is a callout, nothing stands out
- Warning and Danger should be rare — reserve them for genuinely important information
- Callouts should be self-contained — a reader skimming the page should understand them without reading surrounding text
- Never nest callouts inside other callouts

### Table of Contents (Current Page)

Right sidebar showing the heading structure of the current page.

**Behavior:**
- Auto-generated from `h2` and `h3` headings on the page
- Highlights the currently visible section as the user scrolls (scroll spy)
- Clicking a heading scrolls to that section with a smooth animation
- Fixed position — stays visible as content scrolls

**Rules:**
- Only show for pages with 3+ headings (hide for short pages)
- Do not include `h1` (the page title) — start from `h2`
- Indent `h3` under their parent `h2`
- Do not go deeper than `h3` — keep the ToC scannable
- On tablet, move ToC inline (above content or collapsible dropdown)
- On mobile, hide ToC or show as a sticky dropdown at the top

### Edit on GitHub Links

Let users contribute corrections directly.

**Placement:**
- "Edit this page" link at the bottom of every content page (above prev/next nav)
- Optional: also in the right sidebar or page header

**Link format:**
```
https://github.com/[org]/[repo]/edit/[branch]/[path-to-file]
```

**Rules:**
- Links directly to the edit view on GitHub (not just the file view)
- Open in a new tab
- Only show for pages that have a source file (not auto-generated pages)
- Include a brief prompt: "Edit this page on GitHub" or "Help improve this page"

### File Structure

```
[project-name]/
├── [config file]                   # Framework config (astro.config, docusaurus.config, etc.)
├── [sidebar config]                # Navigation/sidebar definition
├── content/                        # All documentation content
│   ├── [section-1]/
│   │   ├── index.md                # Section landing page
│   │   ├── [page-1].md
│   │   └── [page-2].md
│   ├── [section-2]/
│   │   ├── [subsection]/
│   │   │   ├── [page-a].md
│   │   │   └── [page-b].md
│   │   └── [page-c].md
│   └── api/                        # API reference docs
│       ├── [module-1].md
│       └── [module-2].md
├── components/                     # Custom MDX components
│   ├── Callout.[ext]
│   ├── CodeBlock.[ext]
│   ├── APITable.[ext]
│   └── Tabs.[ext]                  # Tabbed content (multi-language examples)
├── layouts/
│   ├── DocsLayout.[ext]            # Three-column docs layout
│   └── APILayout.[ext]             # API reference layout (if different)
├── public/
│   ├── images/                     # Documentation images and diagrams
│   └── [assets]
└── styles/
    ├── docs.[ext]                  # Documentation-specific styles
    └── code.[ext]                  # Code block / syntax theme
```

### Content Conventions

**Frontmatter per page:**
```
---
title: [Page Title]
description: [One-line description for SEO and search]
sidebar_position: [number]          # Order in sidebar (if not config-driven)
---
```

**Writing style:**
- Use `h2` (`##`) for major sections, `h3` (`###`) for subsections
- One idea per paragraph — keep paragraphs short (2-4 sentences)
- Start each page with a 1-2 sentence overview of what the page covers
- Use ordered lists for steps, unordered lists for non-sequential items
- Link to related pages frequently — do not assume linear reading

**Code examples:**
- Every concept gets a code example
- Show the minimal working example, not a full app
- Use tabs for multi-language examples (JavaScript / TypeScript / Python / etc.)
- Include comments in code only when the line is non-obvious

### Naming Conventions

- **Content files:** `kebab-case.md` — matches the URL slug
- **Sections/directories:** `kebab-case/` — matches the URL path
- **Images:** `[page-name]-[description].png` — tied to the page that uses them
- **Components:** `PascalCase.[ext]` — following the framework convention

### Anti-Patterns — Do NOT

- Nest sidebar navigation more than 2 levels deep — it becomes unnavigable
- Use search as a crutch for bad organization — if users can't find it in the sidebar, restructure
- Put long code blocks without a copy button — users will leave to find a copyable version
- Show stale version docs without a warning banner — users will follow outdated instructions
- Make callouts the primary way of communicating — they lose their impact when overused
- Skip the page description in frontmatter — search and SEO depend on it
- Write pages longer than ~2000 words — split into subpages instead
- Use screenshots of code instead of actual code blocks — they can't be copied or searched
- Forget mobile sidebar behavior — most developer docs get significant mobile traffic
- Link to sections that don't exist — broken anchor links erode trust
- Mix tutorial content with reference content on the same page — separate "how to" from "what is"
- Auto-generate sidebar order without curation — the reading order matters
- Use jargon in navigation labels — sidebar labels should be scannable plain language
- Omit the "getting started" or "quickstart" page — it's the most-visited page on any docs site

## Content Sections

1. **Getting Started** — installation, quickstart, first example
2. **[Core Concepts]** — foundational knowledge
3. **[Guides]** — task-oriented tutorials
4. **[API Reference]** — complete reference documentation
5. **[Examples]** — real-world usage examples
6. **[Changelog]** — version history and migration guides

## Current State

[Where is the project? What's written, what's next?]

## Conventions

- All content in Markdown/MDX
- One page per concept — keep pages focused
- Every page has a title, description, and position
- Code examples are tested and runnable
- Sidebar order matches recommended reading order

## Notes

[Any project-specific context]
