# Which Files Do I Need?

60 files is a lot. This guide helps you find the right ones for your project.

## The Quick Answer

Most projects need **1-3 files** combined into a single CLAUDE.md:

1. **A design system or framework file** (how to style and structure code)
2. **A project type file** (what you're building)
3. **A platform file** (where it's deployed) — optional

## Pick by What You're Building

### "I want to build a website"

| What kind? | Start with | Add design system | Add platform |
|-----------|-----------|-------------------|-------------|
| Landing page / marketing site | `landing-page.md` | `shadcn-ui.md` or `tailwind-headless.md` | `vercel.md` or `netlify.md` |
| Portfolio / personal site | `portfolio-site.md` | `shadcn-ui.md` or `tailwind-radix.md` | `vercel.md` or `netlify.md` |
| Blog | `blog.md` | `astro.md` (framework + styling) | `vercel.md` or `netlify.md` |
| Documentation site | `documentation-site.md` | `astro.md` | `vercel.md` or `netlify.md` |
| Waitlist / coming soon page | `waitlist-page.md` | `shadcn-ui.md` or `daisyui.md` | `vercel.md` or `netlify.md` |

### "I want to build a web app"

| What kind? | Start with | Add design system | Add platform |
|-----------|-----------|-------------------|-------------|
| SaaS dashboard | `saas-dashboard.md` | `shadcn-ui.md` or `ant-design.md` | `vercel.md` + `supabase.md` |
| Admin panel / internal tool | `admin-panel.md` | `ant-design.md` or `shadcn-ui.md` | `vercel.md` + `supabase.md` |
| E-commerce store | `ecommerce-storefront.md` | `shadcn-ui.md` or `chakra-ui.md` | `vercel.md` + `stripe.md` |
| Collection / catalog app | `collection-app.md` | `shadcn-ui.md` or `mantine.md` | `vercel.md` + `supabase.md` |
| Multi-step form | `multi-page-form.md` | Your UI library of choice | `vercel.md` |

### "I want to build a mobile app"

| What kind? | Start with | Add |
|-----------|-----------|-----|
| iOS app (native) | `ios-app.md` | `apple-hig-swiftui.md` |
| Cross-platform (iOS + Android) | `react-native-expo.md` | `supabase.md` or `firebase.md` for backend |
| Cross-platform (Flutter) | `flutter.md` | `supabase.md` or `firebase.md` for backend |

### "I want to build a desktop app"

| What kind? | Start with | Add design system |
|-----------|-----------|-------------------|
| macOS menu bar utility | `macos-menu-bar-app.md` | `apple-hig-swiftui.md` |
| Full desktop app (Electron) | `electron-app.md` | `shadcn-ui.md` or `tailwind-radix.md` |
| Lightweight desktop app (Tauri) | `tauri.md` | `shadcn-ui.md` or `tailwind-radix.md` |

### "I want to build a browser extension"

| Start with | Add design system |
|-----------|-------------------|
| `chrome-extension.md` | `shadcn-ui.md` or `tailwind-headless.md` |

### "I want to send HTML emails"

| Start with |
|-----------|
| `email-template.md` (self-contained — no additional files needed) |

## Pick by Your Design System

Already know your UI library? Start here:

| If you use... | Use this file |
|--------------|---------------|
| ShadCN/UI | `shadcn-ui.md` |
| Tailwind (no component library) | `tailwind-radix.md` or `tailwind-headless.md` |
| Tailwind + DaisyUI | `daisyui.md` |
| Material UI (MUI) | `material-design.md` |
| Chakra UI | `chakra-ui.md` |
| Bootstrap | `bootstrap-5.md` |
| Ant Design | `ant-design.md` |
| Mantine | `mantine.md` |
| Park UI / Ark UI | `park-ui.md` |
| SwiftUI (Apple) | `apple-hig-swiftui.md` |

## Pick by Your Framework

Already know your framework? Start here:

| If you use... | Use this file |
|--------------|---------------|
| Next.js | `nextjs-app-router.md` |
| Nuxt / Vue | `vue-nuxt.md` |
| Astro | `astro.md` |
| SvelteKit | `sveltekit.md` |
| Remix | `remix.md` |
| React Native + Expo | `react-native-expo.md` |
| Flutter | `flutter.md` |
| Tauri | `tauri.md` |

## Common Recipes

Here are the most common project setups and exactly which files to combine:

### Recipe: SaaS App (most common)
```
saas-dashboard.md + shadcn-ui.md + nextjs-app-router.md + vercel.md + supabase.md + auth-setup.md + stripe.md
```
Take the architecture from `saas-dashboard.md`, design system from `shadcn-ui.md`, framework patterns from `nextjs-app-router.md`, and relevant platform sections.

### Recipe: iOS App
```
ios-app.md + apple-hig-swiftui.md
```
The iOS app file handles architecture, the HIG file handles design conventions.

### Recipe: Marketing Site + Blog
```
landing-page.md + blog.md + astro.md + netlify.md
```
Astro handles both the marketing pages and the blog with Content Collections.

### Recipe: Chrome Extension
```
chrome-extension.md + shadcn-ui.md
```
Extension architecture + your preferred UI library for the popup.

### Recipe: E-commerce
```
ecommerce-storefront.md + shadcn-ui.md + nextjs-app-router.md + stripe.md + vercel.md
```

### Recipe: Portfolio
```
portfolio-site.md + astro.md + vercel.md
```

## Adding Capabilities

Once you have your base files, add any of these as needed:

| I need... | Add this file |
|----------|---------------|
| User login / auth | `auth-setup.md` |
| Payments | `stripe.md` |
| Database | `supabase.md` or `firebase.md` or `prisma.md` |
| Animations | `animation-motion.md` |
| Dark mode | `dark-mode.md` |
| Accessibility | `accessibility.md` |
| SEO | `seo.md` |
| Multiple languages | `internationalization.md` |
| Offline support | `pwa.md` |
| Real-time (chat, live updates) | `realtime-features.md` |
| State management | `state-management.md` |
| Better typography | `typography-system.md` |
| Responsive design fixes | `responsive-retrofit.md` |
| API connections | `api-integration.md` |
| Testing | `testing-for-designers.md` |
| Git help | `git-for-designers.md` |
| Performance | `performance-optimization.md` |
| Monorepo | `monorepo.md` |

## How to Combine Files

1. Pick your primary file (usually the project type)
2. Open it in a text editor
3. Open the secondary files you want to add
4. Copy relevant sections from the secondary files into your primary file
5. Remove any duplicate or conflicting sections
6. Save as `CLAUDE.md` in your project root

You don't need to include everything from every file. Just grab the sections that are relevant to your project. More context = better results, but irrelevant context won't hurt.

## Still Not Sure?

**Just starting out?** Use `shadcn-ui.md` + `nextjs-app-router.md`. It's the most common stack and has the most community support.

**Building your first app?** Add the project type file that matches what you're building. That's where the biggest value is.

**Overwhelmed?** Pick ONE file. Any one. Drop it in. Start building. You can always add more later.
