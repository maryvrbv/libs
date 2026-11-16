# Claude Skills for Designers

60 drop-in CLAUDE.md files that make Claude Code fluent in your design system, framework, project type, platform, and workflow. No setup, no prompting — just copy one into your project root.

## What's Inside

### Design Systems (11 files)

| File | Design System | Best For |
|------|--------------|----------|
| `shadcn-ui.md` | ShadCN/UI + Tailwind | Web apps, dashboards, SaaS |
| `tailwind-radix.md` | Tailwind + Radix UI | Custom web apps, full control |
| `apple-hig-swiftui.md` | Apple HIG + SwiftUI | iOS and macOS apps |
| `material-design.md` | Material Design 3 + MUI | Cross-platform web apps |
| `tailwind-headless.md` | Tailwind + Headless UI | Marketing sites, simpler web apps |
| `chakra-ui.md` | Chakra UI v3 | Web apps with built-in styling |
| `bootstrap-5.md` | Bootstrap 5 | Traditional web apps, rapid prototyping |
| `ant-design.md` | Ant Design 5 | Admin panels, enterprise dashboards |
| `mantine.md` | Mantine v7 | Feature-rich React apps |
| `park-ui.md` | Park UI + Ark UI | Multi-framework (React, Vue, Solid) |
| `daisyui.md` | DaisyUI + Tailwind | Rapid prototyping, themed apps |

### Frameworks (8 files)

| File | Framework | Best For |
|------|-----------|----------|
| `nextjs-app-router.md` | Next.js 15 App Router | Full-stack React apps |
| `vue-nuxt.md` | Nuxt 3 + Vue 3 | Full-stack Vue apps |
| `astro.md` | Astro 5 | Content sites, blogs, landing pages |
| `react-native-expo.md` | React Native + Expo | Cross-platform mobile apps |
| `sveltekit.md` | SvelteKit + Svelte 5 | Full-stack Svelte apps |
| `remix.md` | Remix v2 | Form-heavy React apps |
| `flutter.md` | Flutter 3 + Dart | Cross-platform mobile (iOS + Android) |
| `tauri.md` | Tauri v2 | Lightweight desktop apps (Rust backend) |

### Project Types (15 files)

| File | Project Type | What Claude Learns |
|------|-------------|-------------------|
| `landing-page.md` | Landing / Marketing Page | Hero patterns, CTA hierarchy, pricing tables, FAQ, conversion optimization |
| `portfolio-site.md` | Portfolio / Case Study Site | Project grids, case study structure, gallery layouts, image optimization |
| `saas-dashboard.md` | SaaS Dashboard | Sidebar nav, data tables, stat cards, charts, settings pages, role-based UI |
| `blog.md` | Blog / Content Site | Post layouts, MDX rendering, code blocks, TOC, RSS, SEO, search |
| `ecommerce-storefront.md` | E-commerce Store | Product grid, PDP, cart, checkout flow, filters, wishlist, search |
| `chrome-extension.md` | Chrome Extension | Manifest V3, popup UI, content scripts, service worker, storage, message passing |
| `macos-menu-bar-app.md` | macOS Menu Bar App | MenuBarExtra, popover sizing, keyboard shortcuts, LaunchAtLogin |
| `ios-app.md` | iOS App (Full Architecture) | Tab navigation, onboarding, settings, search, sheets, widgets, App Store prep |
| `electron-app.md` | Desktop App (Electron) | Main/renderer process, IPC, native menus, tray, auto-updater, frameless window |
| `documentation-site.md` | Documentation Site | Sidebar nav, search, code blocks, API reference tables, version selector |
| `email-template.md` | HTML Email | Table-based layout, inline CSS, email client compatibility, dark mode for email |
| `admin-panel.md` | Admin Panel / Internal Tool | CRUD interfaces, data tables, bulk actions, role-based visibility, audit logs |
| `multi-page-form.md` | Multi-Step Form | Step indicators, conditional steps, per-step validation, save draft, review step |
| `waitlist-page.md` | Waitlist / Coming Soon | Email capture, product teaser, social proof, referral program, countdown |
| `collection-app.md` | Collection / Catalog App | List/grid toggle, search + filters, tags, favorites, import/export, offline |

### Platforms & Deployment (8 files)

| File | Platform | What Claude Learns |
|------|---------|-------------------|
| `vercel.md` | Vercel | Config, serverless/edge functions, preview deploys, cron, analytics |
| `supabase.md` | Supabase | Schema design, RLS, auth, storage, edge functions, real-time, type generation |
| `firebase.md` | Firebase | Firestore modeling, security rules, auth, Cloud Functions, emulator suite |
| `cloudflare-pages.md` | Cloudflare | Pages, Workers, KV, D1, R2, Wrangler |
| `netlify.md` | Netlify | Config, functions, forms, identity, redirects, deploy previews |
| `stripe.md` | Stripe | Checkout, subscriptions, webhooks, customer portal, test mode |
| `auth-setup.md` | Auth.js / NextAuth | OAuth providers, sessions, middleware guards, RBAC |
| `prisma.md` | Prisma ORM | Schema design, queries, relations, migrations, seeding, TypeScript types |

### Workflows (9 files)

| File | Workflow | What Claude Learns |
|------|---------|-------------------|
| `figma-to-code.md` | Figma → Code | Design description, Auto Layout mapping, component mapping, token extraction |
| `redesign-existing-app.md` | Redesign Existing App | Audit, inventory, incremental replacement, maintaining functionality |
| `responsive-retrofit.md` | Make It Responsive | Audit fixed layouts, add breakpoints, convert patterns, touch targets |
| `design-system-creation.md` | Build a Design System | Tokens, component API, Storybook, theme provider, CSS variables |
| `api-integration.md` | Connect to APIs | Fetch/display data, loading/error/empty states, pagination, caching |
| `testing-for-designers.md` | Testing (For Designers) | Visual regression, component tests, a11y audits, Lighthouse, cross-browser |
| `git-for-designers.md` | Git Workflow | Branching, commits, .gitignore, recovery, PRs, merge conflicts, CI |
| `performance-optimization.md` | Performance | Images, fonts, code splitting, bundle analysis, Core Web Vitals |
| `monorepo.md` | Monorepo Setup | Turborepo, pnpm workspaces, shared packages, build pipelines, CI caching |

### Specialized Capabilities (9 files)

| File | Capability | What Claude Learns |
|------|-----------|-------------------|
| `animation-motion.md` | Animation & Motion | Framer Motion, CSS transitions, scroll animations, micro-interactions |
| `dark-mode.md` | Dark Mode | CSS variables, system detection, toggle persistence, color design, image handling |
| `accessibility.md` | Accessibility | WCAG AA, semantic HTML, ARIA, keyboard nav, focus management, screen readers |
| `seo.md` | SEO | Meta tags, Open Graph, JSON-LD, sitemap, OG images, heading hierarchy |
| `internationalization.md` | Multi-Language (i18n) | Translation files, locale routing, RTL, date/number formatting, pluralization |
| `pwa.md` | Progressive Web App | Service worker, manifest, offline, caching strategies, install prompt, push |
| `realtime-features.md` | Real-Time Features | WebSockets, SSE, presence, typing indicators, Supabase Realtime, Socket.io |
| `state-management.md` | State Management | Zustand, Jotai, Redux Toolkit, Context, URL state, when to use what |
| `typography-system.md` | Typography System | Type scales, fluid typography, variable fonts, vertical rhythm, font loading |

## Getting Started

1. **New to skill files?** Read `QUICK-START.md` — a step-by-step walkthrough with a real example
2. **Not sure which files to pick?** Read `PICKER.md` — a decision guide with common project recipes
3. **Ready to go?** Copy a file into your project root, rename it `CLAUDE.md`, and start building

## How to Use

1. **Pick the file(s)** that match your project (see `PICKER.md` for help)
2. **Copy** into your project's root directory
3. **Rename** to `CLAUDE.md`
4. **Customize** the project-specific sections (marked with `[brackets]`) — optional, but makes Claude more precise
5. **Start building** — Claude now knows your system

**Combining files:** Most projects use 1-3 files merged together. Building a SaaS dashboard with ShadCN on Vercel? Start with `saas-dashboard.md`, pull in the design system section from `shadcn-ui.md`, and add deployment patterns from `vercel.md`. See `PICKER.md` for common recipes.

## Tips

- **Edit the `[brackets]`.** Each file works out of the box, but filling in your project details makes Claude even better.
- **Keep it updated.** As your project evolves, add new conventions or screen descriptions to the file.
- **Works with any Claude Code plan.** These are just markdown files — no special tooling needed.
- **More context = better output.** Don't worry about the file being too long — Claude reads the whole thing.

## Need Help?

- **Quick Start:** See `QUICK-START.md` for a full walkthrough
- **Which files?:** See `PICKER.md` for a decision guide
- **Course:** If you're new to Claude Code, start with [Claude Code for Designers](https://aidesignlab.gumroad.com/l/claude-code-for-designers)
- **Updates:** Follow [@aidesignlab](https://twitter.com/aidesignlab) for new skill files and tips
