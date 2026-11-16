# [Project Name]

[One-line description — whose portfolio this is and what kind of work it showcases.]

---

## Project Type: Portfolio Site

This is a personal or studio portfolio site. The goal is to showcase work, build credibility, and drive inquiries. Every design decision should let the work speak while making it easy to get in touch.

### Site Structure

```
/                   # Home — intro + featured projects
/work               # Project grid (all projects)
/work/[slug]        # Individual case study
/about              # Bio, skills, experience
/contact            # Contact form
```

### File Structure

```
[root]/
├── components/
│   ├── navbar.tsx              # Site navigation
│   ├── footer.tsx              # Footer with links and social
│   ├── project-card.tsx        # Card for project grid
│   ├── project-grid.tsx        # Grid/gallery layout
│   ├── project-filter.tsx      # Category filter bar
│   ├── case-study-header.tsx   # Hero for case study page
│   ├── case-study-section.tsx  # Reusable section block
│   ├── image-lightbox.tsx      # Fullscreen image viewer
│   ├── about-hero.tsx          # About page intro
│   ├── contact-form.tsx        # Contact form with validation
│   └── social-links.tsx        # Social icon links
├── content/
│   └── projects/
│       ├── [project-slug]/
│       │   ├── index.md        # Case study content (frontmatter + body)
│       │   └── images/         # Project images
│       └── ...
├── assets/
│   ├── images/                 # Site-wide images (headshot, og-image)
│   └── icons/
├── styles/
└── pages/                      # Route definitions
    ├── index.tsx
    ├── work.tsx
    ├── work/[slug].tsx
    ├── about.tsx
    └── contact.tsx
```

### Page Breakdown

#### Home

The home page is a hook — it introduces who you are and shows your best work.

**Structure:**
- **Hero** — name, title/tagline, one sentence about what you do. Optional: subtle animation or background.
- **Featured projects** — 3-4 hand-picked projects in a grid. Use `project-card` component.
- **Brief about** — 2-3 sentences + link to full about page.
- **CTA** — "View all work" and/or "Get in touch".

**Rules:**
- No carousel. Show a static grid of your best work.
- Hero should not push projects below the fold on desktop.
- The fastest path to viewing work should be one click or one scroll.

#### Work / Project Grid

All projects in a browsable grid with optional category filtering.

**Layout options:**

- **Uniform grid** — all cards same size, 2-3 columns. Clean, predictable. Best for consistent project types.
- **Masonry grid** — cards with varying heights based on image aspect ratio. More dynamic, best for visual/photo-heavy work.
- **List layout** — horizontal rows with thumbnail + title + description. Best for text-heavy or case-study-focused portfolios.

**Project card structure:**
- Thumbnail image (hover: subtle zoom, overlay with title, or color shift)
- Project title
- Category or tag (e.g., "Branding", "Web Design", "App")
- Optional: year or client name

**Category filtering:**
- Horizontal filter bar above the grid: "All", "[Category 1]", "[Category 2]", "[Category 3]"
- Filter with CSS/JS — no page reload. Animate cards in/out.
- "All" selected by default.
- Keep category count to 4-6 max.

**Rules:**
- Minimum 4 projects to justify a grid page. If fewer, feature all on the home page.
- Card images should be optimized: responsive `srcset`, WebP/AVIF, lazy-loaded.
- Consistent image aspect ratios within uniform grids (16:9 or 4:3).

#### Case Study Page

The most important page type. Each project gets a dedicated deep-dive.

**Section order:**
```
1. Header (title, role, client, year, hero image)
2. Overview (what the project is, 2-3 sentences)
3. Problem (what challenge needed solving)
4. Process (how you approached it — research, wireframes, iterations)
5. Solution (final design, key decisions, screenshots)
6. Results (metrics, impact, client feedback)
7. Project navigation (previous/next project links)
```

**Header structure:**
- Project title (large)
- Metadata row: client / role / year / tools used
- Full-width hero image or video

**Content patterns:**
- **Full-width images** — for hero shots and key screens. Edge-to-edge on desktop.
- **Image pairs** — two images side by side for before/after or comparison.
- **Image + text** — screenshot on one side, explanation on the other.
- **Image grid** — 2x2 or 3-column grid for showing multiple screens.
- **Pull quotes** — client feedback or key insight, styled differently from body text.

**Image lightbox:**
- Clicking any project image opens a fullscreen lightbox/modal.
- Navigation: left/right arrows, keyboard support (arrow keys, Escape to close).
- Dark overlay background.
- Close button in top-right corner.
- Swipe support on touch devices.

**Project navigation:**
- At the bottom of each case study: links to previous and next project.
- Show project title and thumbnail for each.
- Wrap around (last project links to first).

#### About Page

Build trust and show personality. This page humanizes the work.

**Structure:**
- **Photo** — professional headshot or candid work photo. Not a stock image.
- **Bio** — 2-3 paragraphs. Who you are, what you do, your approach.
- **Skills / tools** — visual list or grid of tools, languages, or specialties.
- **Experience** (optional) — brief timeline or notable clients/companies.
- **Personal note** (optional) — hobbies, interests, location. Keep it brief.
- **CTA** — link to contact page or email.

#### Contact Page

Make it easy to reach out.

**Structure:**
- **Intro text** — short, warm. "Have a project in mind? Let's talk."
- **Contact form:**
  - Name (required)
  - Email (required, validated)
  - Project type (optional dropdown: "[Type 1]", "[Type 2]", "Other")
  - Message (required, textarea)
  - Submit button
- **Alternative contact** — email address (mailto link) and/or social links below the form.

**Form behavior:**
- Client-side validation (required fields, email format).
- Submit sends to [email service / serverless function / form endpoint].
- Success state: clear the form, show a confirmation message.
- Error state: inline error messages per field.
- Honeypot or reCAPTCHA for spam prevention.

### Navigation

**Navbar:**
- Logo or name (links to home)
- Links: Work, About, Contact
- Sticky on scroll (optional — test whether it helps or clutters)
- Mobile: hamburger menu or minimal link set

**Footer:**
- Copyright line
- Social links (icons): [GitHub, Dribbble, LinkedIn, Twitter, etc.]
- Optional: "Built with [tool]" credit

**Smooth scroll:** If using anchor links on the home page, apply `scroll-behavior: smooth` and `scroll-margin-top` for fixed nav offset.

### Image Optimization

Images are the heaviest assets on a portfolio site. Get this right.

- **Format:** Serve WebP or AVIF with JPEG/PNG fallback.
- **Responsive:** Use `srcset` and `sizes` attributes. Serve smaller images on mobile.
- **Lazy loading:** `loading="lazy"` on all images below the fold.
- **Aspect ratio:** Set explicit `width` and `height` to prevent layout shift.
- **Thumbnails:** Generate smaller versions (400-600px wide) for grid cards. Full resolution only on case study pages and lightbox.
- **Hero images:** These are often the LCP element. Load eagerly with `fetchpriority="high"`.

### Responsive Breakpoints

```
Mobile:    < 640px    — single column, stacked layout
Tablet:    640-1024px — 2-column project grid
Desktop:   > 1024px   — 2-3 column grid, side-by-side layouts
```

**Mobile rules:**
- Project grid: single column, full-width cards.
- Case study: full-width images, stacked text/image sections.
- Navigation: hamburger or minimal top links.
- Lightbox: swipe navigation, close on swipe down.
- Contact form: full-width fields.

### SEO

- Unique `title` and `meta description` per page.
- Case study pages: use project name in the title ("Project Name — [Your Name]").
- Open Graph and Twitter Card meta tags with project hero images.
- Semantic HTML: `<main>`, `<article>`, `<section>`, `<nav>`, `<h1>` per page.
- Alt text on every image. Describe what's shown, not "screenshot".
- Sitemap and canonical URLs.

### Anti-Patterns — Do NOT

- Use a home page carousel that cycles through projects automatically
- Add background music or auto-playing video with sound
- Show projects without context — every project needs at least a title, category, and description
- Use low-resolution or watermarked images
- Hide the contact page — it should be one click from any page
- Make the site about the technology instead of the work
- Use heavy page transitions that delay content rendering by more than 300ms
- Put every project on one page with no filtering or organization
- Use Lorem Ipsum placeholder text in production
- Skip mobile optimization for the project grid
- Require visitors to download a PDF portfolio instead of browsing the site
- Add a "Loading..." spinner on initial page load (optimize instead)
- Use inconsistent image aspect ratios in a uniform grid
- Put social media icons in the hero — they distract from the work

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Project content lives in markdown with frontmatter (title, category, date, client, thumbnail)
- Images stored alongside their project in `content/projects/[slug]/images/`
- Mobile-first responsive design
- Semantic HTML throughout
- Consistent image aspect ratios per layout type

## Notes

[Any project-specific context — personal brand guidelines, target audience (agencies, startups, etc.), whether this is a redesign.]
