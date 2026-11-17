# Spacing and Layout

AI-generated spacing is the single biggest reason UIs look unfinished. Claude Code uses whatever padding and margin values get the layout close enough. A 12px gap next to a 15px gap next to a 20px gap. Each one is reasonable in isolation. Together, they look like nobody made a decision.

The fix is a system. Here's the one that works.

## The 8px Grid

Every spacing value in your UI should be a multiple of 8: **8, 16, 24, 32, 48, 64, 80, 96.**

Why 8? It divides cleanly on every screen density. It's small enough to be precise, large enough to create visible rhythm. And it forces consistency — you can't have a 13px gap when your options are 8 or 16.

You don't need all of these values. Most UIs live in the 8–48 range:

| Use | Size |
|-----|------|
| Tight gaps (icon to label, tag padding) | 8px |
| Standard padding (cards, inputs, buttons) | 16px |
| Related element spacing (form fields, list items) | 16–24px |
| Group spacing (between card groups, form sections) | 32px |
| Section spacing (between major page sections) | 48–64px |
| Page-level breathing room (hero padding, footer) | 64–96px |

**Prompt for Claude Code:**

> Audit all padding, margin, and gap values in this project. Replace every value with the nearest multiple of 8 (8, 16, 24, 32, 48, 64). No spacing value should exist outside this scale. Use a CSS custom property system: --space-1: 8px, --space-2: 16px, --space-3: 24px, --space-4: 32px, --space-6: 48px, --space-8: 64px. Replace all raw pixel values with these variables.

## The Breathing Room Principle

The space *between* sections should always be larger than the space *within* sections. This sounds obvious, but AI output violates it constantly.

If items inside a card have 16px between them, the cards themselves need at least 24px between them. If card groups use 24px gaps, the sections containing those groups need 48px or more.

This creates visual grouping. The eye reads things that are closer together as related. When everything has the same spacing, nothing is grouped — it's just a flat list.

**Prompt for Claude Code:**

> Check the spacing hierarchy in this layout. Space between elements within a component (like items in a card) should be smaller than space between components (like between cards), which should be smaller than space between sections. Use this progression: 16px within components, 24px between components, 48px between sections. Adjust where needed to maintain this hierarchy.

## Container Max-Widths

Full-width content is almost never what you want. Lines of text that stretch across a 1440px screen are unreadable. Claude Code will often set containers to 100% and call it done.

Standard max-widths:

- **Text content** (articles, docs): `max-width: 680px` — keeps line length at 65–75 characters, the sweet spot for readability.
- **Mixed content** (text + images, dashboards): `max-width: 1024px` or `1120px`.
- **Full layouts** (app shells, wide dashboards): `max-width: 1280px` or `1440px`.

Always center the container with `margin: 0 auto` and add horizontal padding (16–24px) so content doesn't touch the screen edge on mobile.

**Prompt for Claude Code:**

> Add appropriate max-width constraints to all content containers. Text-heavy sections should max out at 680px. Mixed content areas at 1024px. Full-width app layouts at 1280px. Center all containers with margin: 0 auto and add 16px horizontal padding for mobile.

## The Alignment Audit

Open your UI and draw imaginary vertical lines down the page. Do elements share left edges? Do cards in a row start at the same point? Does the heading align with the content below it?

Misalignment is invisible until you look for it. A heading that starts 4px to the left of the paragraph below it. Cards in a grid where the content padding doesn't match. A sidebar where items have different left margins.

**Prompt for Claude Code:**

> Run an alignment audit on this layout. Check that: (1) all content within the same container shares the same left padding, (2) headings and their associated body content are left-aligned to the same edge, (3) grid items have identical internal padding, (4) no element has a unique margin or padding value that puts it out of alignment with its neighbors. Fix any inconsistencies.

## The Spacing Checklist

Before you move on, verify:

- [ ] Every spacing value is a multiple of 8
- [ ] Space between sections is larger than space within sections
- [ ] Text containers have a max-width set
- [ ] Elements on the same level share alignment edges
- [ ] The page has generous top and bottom padding (not cramped against the viewport)
