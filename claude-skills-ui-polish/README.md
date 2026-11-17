# Claude Skills for UI Polish

Make AI-generated UI look like a designer built it. A 7-chapter guide + 27 drop-in CLAUDE.md skill files for taking Claude Code output from "it works" to "it's ready to ship."

## What's Inside

### The Guide (7 chapters)

| Chapter | What You'll Learn |
|---------|------------------|
| `01-why-polish-matters.md` | Why AI output looks unfinished and the 3 things that fix it |
| `02-typography.md` | Type scales, line height, letter spacing, font pairing |
| `03-spacing-and-layout.md` | The 8px grid, breathing room, alignment audits |
| `04-color-and-contrast.md` | The 60-30-10 rule, semantic colors, contrast ratios |
| `05-states-and-edges.md` | Empty, loading, error, hover, focus, disabled — every state AI forgets |
| `06-micro-interactions.md` | Transitions, hover feedback, animation timing |
| `07-polish-checklist.md` | The full checklist — run through before you ship |

### Skill Files (27 CLAUDE.md files)

#### Quick Start (1 file)

| File | What It Does |
|------|-------------|
| `quick-polish.md` | The 80/20 file. Covers the 5 most common polish issues in one drop-in. Use this if you don't want to think about which files to pick. |

#### System (3 files)

| File | What It Does |
|------|-------------|
| `ui-polish.md` | The master file — all polish rules in one CLAUDE.md |
| `polish-audit.md` | Audit mode — scans your app and reports every polish issue |
| `empty-states.md` | Proper empty states instead of "No data found" |

#### Foundations (4 files)

| File | What It Does |
|------|-------------|
| `typography-polish.md` | Type scale, line height, letter spacing, font weight hierarchy |
| `spacing-system.md` | 8px grid, section spacing, container rules |
| `color-system.md` | Semantic color tokens, 60-30-10 distribution, contrast |
| `animation-polish.md` | Transition timing, easing curves, 8 interaction patterns |

#### Components (6 files)

| File | What It Does |
|------|-------------|
| `button-polish.md` | Size scale, variants, every button state with CSS |
| `form-polish.md` | Input sizing, labels, validation, error messages |
| `card-polish.md` | Card anatomy, elevation, hover, grid layout |
| `table-polish.md` | Headers, row hover, alignment, responsive, pagination |
| `navigation-polish.md` | Navbar, sidebar, breadcrumbs, mobile nav, bottom nav |
| `modal-dialog-polish.md` | Modals, sheets, drawers, focus trap, transitions |

#### States (4 files)

| File | What It Does |
|------|-------------|
| `interactive-states.md` | Hover, focus, active, disabled for every element type |
| `loading-states.md` | Skeletons, spinners, progress bars, optimistic updates |
| `error-handling-ui.md` | Inline validation, toasts, banners, error pages |
| `success-feedback.md` | Button confirmation, toasts, copy feedback, undo |
| `ui-copy-polish.md` | Fixes AI-generated copy: error messages, button labels, empty states, tooltips |

#### Themes (3 files)

| File | What It Does |
|------|-------------|
| `dark-mode-polish.md` | Proper dark mode — elevation, contrast, shadows |
| `responsive-polish.md` | Mobile-first, touch targets, breakpoints, 320px–1440px |
| `accessibility-polish.md` | Contrast, focus, touch targets, screen readers, semantic HTML |

#### Pages (5 files)

| File | What It Does |
|------|-------------|
| `landing-page-polish.md` | Hero, social proof, features, pricing, FAQ, footer |
| `dashboard-polish.md` | Sidebar layout, stat cards, charts, activity feed |
| `settings-page-polish.md` | Form sections, save patterns, danger zone |
| `onboarding-polish.md` | Welcome, step indicator, completion, skip flow |
| `auth-pages-polish.md` | Login, signup, forgot password, social login |

## Getting Started

1. **New to polish?** Start with the guide — read chapters 1-6, then use the checklist (chapter 7)
2. **Want instant results?** Drop `ui-polish.md` into your project as `CLAUDE.md` and start building
3. **Have an existing app?** Use `polish-audit.md` to find every issue, then fix them with the guide
4. **Need a specific fix?** Pick the skill file that matches your problem (see `PICKER.md`)

See `QUICK-START.md` for a step-by-step walkthrough.

## How the Guide and Skill Files Work Together

The **guide** teaches you what polish is and why each technique matters. Read it once.

The **skill files** automate those techniques. Drop them into any project and Claude Code applies the polish rules for you — every time, without you having to remember or re-explain them.

Guide = learn it. Skill files = automate it.

## Framework Compatibility

These skill files work with any CSS framework or UI library. Tailwind, plain CSS, CSS-in-JS, ShadCN, MUI, Chakra. Claude translates the polish rules into whatever your project uses. No changes needed.

## Need Help?

- **Quick start:** See `QUICK-START.md`
- **Which file?** See `PICKER.md`
- **New to Claude Code?** Start with [Claude Code for Designers](https://aidesignlab.gumroad.com/l/claude-code-for-designers)
- **Want more skill files?** Check out [Claude Skills for Designers](https://aidesignlab.gumroad.com/l/claude-skills-for-designers) — 60 files for design systems, frameworks, and project types
- **Updates:** Follow [@aidesignlab](https://twitter.com/aidesignlab)
