# Which Skill File Should I Use?

Pick based on where you are and what you need.

## Don't want to think about it?

**Use `quick-polish.md`** — the 80/20 file. Covers the 5 most common polish issues in one file: typography, spacing, color, states, and interactions. Drop it in, build, done. Swap to `ui-polish.md` later if you want more control.

## Starting a new project?

**Use `ui-polish.md`** — the master file. Covers everything: typography, spacing, color, states, interactions, responsive. Drop it in as your CLAUDE.md and every screen Claude builds will be polished from the start.

## Have an existing app that looks rough?

**Use `polish-audit.md`** first. It puts Claude into audit mode — scans your code and gives you a prioritized list of fixes. After you've fixed everything, swap it for `ui-polish.md` to keep things clean going forward.

## Building a specific page type?

| You're building... | Use this file |
|---------------------|--------------|
| A landing page or marketing site | `landing-page-polish.md` |
| A dashboard with charts and data | `dashboard-polish.md` |
| A settings or account page | `settings-page-polish.md` |
| A first-time user flow | `onboarding-polish.md` |
| Login, signup, or password reset | `auth-pages-polish.md` |

## Fixing a specific problem?

| The problem | Use this file |
|-------------|--------------|
| Font sizes and spacing feel random | `typography-polish.md` + `spacing-system.md` |
| Colors are inconsistent or muddy | `color-system.md` |
| Buttons look different everywhere | `button-polish.md` |
| Forms feel broken on error | `form-polish.md` + `error-handling-ui.md` |
| Cards look uneven or flat | `card-polish.md` |
| Tables are hard to read | `table-polish.md` |
| Navigation breaks on mobile | `navigation-polish.md` |
| Modals/dialogs feel janky | `modal-dialog-polish.md` |
| No hover or focus feedback | `interactive-states.md` |
| Loading feels broken or blank | `loading-states.md` |
| Empty screens say "No data" | `empty-states.md` |
| Success/errors give no feedback | `success-feedback.md` + `error-handling-ui.md` |
| Dark mode looks terrible | `dark-mode-polish.md` |
| App breaks on mobile | `responsive-polish.md` |
| Accessibility concerns | `accessibility-polish.md` |
| Transitions feel instant or weird | `animation-polish.md` |
| UI copy sounds robotic or vague | `ui-copy-polish.md` |
| I just want one file that fixes the basics | `quick-polish.md` |

## Common combos

Merge sections from multiple files into one CLAUDE.md:

| Building... | Combine these files |
|-------------|-------------------|
| SaaS dashboard | `ui-polish.md` + `dashboard-polish.md` + `table-polish.md` |
| Landing page | `ui-polish.md` + `landing-page-polish.md` |
| Full app (new) | `ui-polish.md` + `auth-pages-polish.md` + `onboarding-polish.md` |
| Full app (existing) | `polish-audit.md` first, then `ui-polish.md` |
| Dark mode overhaul | `dark-mode-polish.md` + `color-system.md` |
| Form-heavy app | `form-polish.md` + `error-handling-ui.md` + `success-feedback.md` |
| Mobile-first app | `responsive-polish.md` + `navigation-polish.md` + `accessibility-polish.md` |

Copy-paste the sections you need into a single file. More context = better output.
