# Quick Start Guide

You just downloaded 60 skill files. Here's how to use them — it takes about 2 minutes.

## What these files do

When you put a file called `CLAUDE.md` in a project folder, Claude Code reads it before doing anything. It's like giving Claude a briefing on your project — what tools you're using, how things should look, what patterns to follow, what to avoid.

These skill files are pre-written briefings. Instead of explaining your design system to Claude every time, you drop in a file and Claude already knows.

## Step 1: Pick your file

Open the `skill-files/` folder. Find the file that matches what you're building.

**Not sure which one?** See `PICKER.md` for a guide.

## Step 2: Copy it into your project

Every project has a root folder — the top-level folder that contains everything. That's where the file goes.

```
my-project/           ← this is the root
├── CLAUDE.md         ← put the skill file here
├── src/
├── package.json
└── ...
```

For an iOS project in Xcode:
```
MyApp/                ← this is the root
├── CLAUDE.md         ← put the skill file here
├── MyApp/
├── MyApp.xcodeproj
└── ...
```

## Step 3: Rename it to CLAUDE.md

The file must be named exactly `CLAUDE.md` (all caps, `.md` extension). Claude Code only reads this specific filename.

If you're on Mac: right-click the file → Rename.

## Step 4: Fill in the brackets (optional)

Open the file in any text editor. You'll see sections with `[brackets]`:

```markdown
# [Project Name]

[Brief description of what this project does.]

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- ShadCN/UI components
- [Data: Prisma / Drizzle / Supabase / etc.]
```

Replace the brackets with your project's details:

```markdown
# Habit Tracker

A web app that helps users build daily habits with streaks and reminders.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- ShadCN/UI components
- Supabase (database + auth)
```

**This step is optional.** The file works without any edits. But filling in the details makes Claude more precise about your specific project.

## Step 5: Start building

Open Claude Code in your project folder. Claude will automatically read the CLAUDE.md file.

Try prompting:
- "Build the main dashboard page"
- "Add a settings screen with a form"
- "Create a responsive navbar"

Claude will use the right components, spacing, colors, and patterns from your skill file — without you having to explain any of it.

## Real Example: SaaS Dashboard with ShadCN

Here's what the full process looks like:

1. You want to build a SaaS dashboard using ShadCN/UI
2. Copy `shadcn-ui.md` into your project root
3. Rename it to `CLAUDE.md`
4. Open it and fill in:

```markdown
# TeamPulse

A team analytics dashboard that shows engagement metrics and activity feeds.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- ShadCN/UI components
- Supabase (database + auth + real-time)

## Current State

Just getting started. Auth is set up, database schema is done.

- [x] Supabase project created
- [x] Auth with Google OAuth working
- [ ] Dashboard layout
- [ ] Activity feed
- [ ] Team settings page
```

5. Open Claude Code and say: "Build the dashboard layout with a sidebar, top bar with user menu, and a main content area with stat cards"

Claude will use ShadCN's `Card`, `Avatar`, `DropdownMenu`, `Separator`, and `NavigationMenu` — with correct spacing (`gap-6`, `p-6`), semantic colors (`bg-background`, `text-muted-foreground`), and dark mode support. No corrections needed.

## Combining Multiple Files

For complex projects, merge sections from multiple skill files into one CLAUDE.md:

1. **Start with your project type file** (e.g., `saas-dashboard.md`) — this gives Claude the architecture
2. **Add the design system section** from your UI library file (e.g., the component and color sections from `shadcn-ui.md`)
3. **Add platform sections** if relevant (e.g., deployment patterns from `vercel.md`)

Copy-paste the sections you need into a single CLAUDE.md. Delete anything that doesn't apply. There's no wrong way to combine them — more context is almost always better.

## Troubleshooting

**Claude isn't following the skill file.**
- Make sure the file is named exactly `CLAUDE.md` (case-sensitive)
- Make sure it's in the project root, not a subfolder
- Make sure you're running Claude Code from that same folder

**Claude is using the wrong components.**
- Check that you're using the right skill file for your design system
- If you're using a custom or less common library, edit the component sections to match

**The file feels too long.**
- That's fine — Claude reads the whole thing. Longer files with more detail produce better results.
- If you want, remove sections that don't apply to your project

**I don't know which file to pick.**
- See `PICKER.md` for a decision guide with common project recipes
