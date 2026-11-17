# Quick Start Guide

You just downloaded 40 skill files. Here's how to use them — it takes about 2 minutes.

## What these files do

When you put a file called `CLAUDE.md` in a project folder, Claude Code reads it before doing anything. It's like giving Claude a briefing — what your product is, who you're talking to, what frameworks to use, what mistakes to avoid.

These skill files are pre-written briefings for marketing work. Instead of explaining what a good campaign brief looks like every time, you drop in a file and Claude already knows.

## Step 1: Pick your file

Open the `files/` folder. Find the file that matches what you're working on.

**Not sure which one?** See `PICKER.md` for a guide.

## Step 2: Copy it into your project

Every project has a root folder — the top-level folder that contains everything. That's where the file goes.

```
my-project/           <-- this is the root
├── CLAUDE.md         <-- put the skill file here
├── src/
├── package.json
└── ...
```

## Step 3: Rename it to CLAUDE.md

The file must be named exactly `CLAUDE.md` (all caps, `.md` extension). Claude Code only reads this specific filename.

If you're on Mac: right-click the file, then Rename.

## Step 4: Fill in the brackets (optional)

Open the file in any text editor. You'll see sections with `[brackets]`:

```markdown
# [Product/Brand Name]

[Brief description of what you're marketing and who your audience is.]
```

Replace the brackets with your details:

```markdown
# Basecamp

Project management tool for small teams who hate complexity. Target audience: founders, freelancers, and small agency owners who are drowning in Jira/Asana.
```

**This step is optional.** The file works without any edits. But filling in the details makes Claude more precise about your specific product and audience.

## Step 5: Start working

Open Claude Code in your project folder. Claude will automatically read the CLAUDE.md file.

Try prompting:
- "Write a campaign brief for our Black Friday promotion"
- "Draft a 5-email welcome sequence for new trial signups"
- "Analyze our funnel and suggest where we're losing conversions"
- "Create landing page copy for our new enterprise plan"

Claude will use the right structure, sections, tone, and frameworks from your skill file — without you having to explain any of it.

## Real Example: Writing a Campaign Brief

Here's what the full process looks like:

1. You need to plan a product launch campaign
2. Copy `campaign-brief.md` into your project root
3. Rename it to `CLAUDE.md`
4. Open it and fill in:

```markdown
# Draftly

AI writing assistant for marketing teams. B2B SaaS, $49/mo per seat.

## Current State

Launched 8 months ago. 340 paying teams. Strong retention but slow top-of-funnel — most signups come from word of mouth. No paid ads running yet. Email list: 4,200 subscribers.

## Notes

Target audience: marketing managers at 50-200 person companies.
Main competitors: Jasper, Copy.ai, Writer.
Key differentiator: team collaboration features — shared brand voice, approval workflows.
Budget for this campaign: $15,000.
```

5. Open Claude Code and say: "Write a campaign brief for launching our new Brand Voice Library feature — teams can save and share brand voice presets. We want to drive upgrades from free to paid and get press coverage."

Claude will produce a complete campaign brief with objectives, target audience segments, key messages, channel strategy, creative direction, budget allocation, timeline, and success metrics — all structured correctly, with the right level of detail, and none of the vague filler you'd normally have to clean up.

## Combining Multiple Files

For complex marketing work, merge sections from multiple skill files into one CLAUDE.md:

1. **Start with your primary file** (e.g., `campaign-brief.md`) — this gives Claude the document structure
2. **Add messaging guidance** if relevant (e.g., pull in the hierarchy from `messaging-architecture.md`)
3. **Add metrics definitions** if you're setting goals (e.g., the KPI framework from `marketing-metrics.md`)

Copy-paste the sections you need into a single CLAUDE.md. Delete anything that doesn't apply. More context is almost always better.

## Common Combos

**Planning a campaign:**
```
campaign-brief.md + messaging-architecture.md + marketing-metrics.md
```

**Writing launch copy:**
```
product-launch-announcement.md + landing-page-copy.md + email-sequence.md
```

**Building a content engine:**
```
content-strategy.md + content-calendar.md + content-led-growth.md
```

**Growing your email list:**
```
email-growth.md + lead-magnet.md + email-sequence.md
```

**Running experiments:**
```
ab-test-design.md + marketing-sprint.md + campaign-performance.md
```

## Troubleshooting

**Claude isn't following the skill file.**
- Make sure the file is named exactly `CLAUDE.md` (case-sensitive)
- Make sure it's in the project root, not a subfolder
- Make sure you're running Claude Code from that same folder

**Claude is using the wrong format.**
- Check that you're using the right skill file for what you're writing
- If your team has specific templates, edit the Structure section to match

**The file feels too long.**
- That's fine — Claude reads the whole thing. Longer files with more detail produce better results.
- If you want, remove sections that don't apply

**I don't know which file to pick.**
- See `PICKER.md` for a decision guide with common marketing scenarios
