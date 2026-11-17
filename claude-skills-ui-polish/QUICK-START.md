# Quick Start

You just got Claude Skills for UI Polish. 7 guide chapters. 27 skill files. Here's how to use it.

## Path A: I just want it to look good (fastest)

1. Copy `quick-polish.md` into your project root
2. Rename it to `CLAUDE.md`
3. Build as normal

This single file covers the 5 most common polish issues: typography, spacing, color, states, and interactions. It's the 80/20 file. If you want more control later, swap it for `ui-polish.md` and add specific files.

## Path B: I'm starting a new project

1. Open the `skill-files/` folder
2. Copy `ui-polish.md` into your project root
3. Rename it to `CLAUDE.md`
4. Start building with Claude Code — polish is baked in automatically

That's it. Claude will apply proper typography, spacing, color, states, and transitions to everything it builds.

**Building a specific page type?** Also grab the matching page file (`landing-page-polish.md`, `dashboard-polish.md`, etc.) and merge it into your CLAUDE.md for page-specific polish rules.

## Path C: I have an existing app that needs polish

1. Copy `polish-audit.md` into your project root
2. Rename it to `CLAUDE.md`
3. Open Claude Code and say:

> "Audit this app for polish issues. Check typography, spacing, color, states, contrast, and responsive behavior. Give me a prioritized report."

4. Claude will scan your code and give you a list of issues ranked by severity
5. Work through the fixes — grab individual skill files for specific problems (see `PICKER.md`)
6. When you're done, swap in `ui-polish.md` as your permanent CLAUDE.md to keep things polished going forward

## Path D: I want to learn first

Read the guide chapters in order:

1. **Why Polish Matters** — the mindset shift (2 min)
2. **Typography** — fix fonts, sizes, and spacing (5 min)
3. **Spacing & Layout** — the 8px grid and breathing room (5 min)
4. **Color & Contrast** — cohesive palettes and accessibility (5 min)
5. **States & Edges** — every state AI forgets (7 min)
6. **Micro-Interactions** — animation that communicates (5 min)
7. **Polish Checklist** — run through before shipping (reference)

Each chapter includes exact prompts you can paste into Claude Code. After reading, drop `ui-polish.md` into your project to automate everything.

## Path E: I need to fix one specific thing

Go straight to `PICKER.md` — it maps every common problem to the right skill file. Buttons look inconsistent? Grab `button-polish.md`. Forms feel broken? Grab `form-polish.md` + `error-handling-ui.md`. No need to read the whole guide first.

## Combining skill files

Most projects use 2-4 skill files merged together. Copy-paste the sections you need into a single `CLAUDE.md`:

1. Start with `ui-polish.md` as the base
2. Add page-specific rules from a page file (`dashboard-polish.md`, etc.)
3. Add component-specific rules if needed (`table-polish.md`, `form-polish.md`, etc.)

More context is always better. Don't worry about the file being long.

## The checklist

Before shipping anything, open `guide/07-polish-checklist.md` and run through it. Or paste it into Claude Code:

> "Review the app against this checklist and fix everything that fails."

Fastest way to catch issues you missed.
