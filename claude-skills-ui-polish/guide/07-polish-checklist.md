# The Polish Checklist

Run through this before you ship. Every item is something AI-generated UI commonly gets wrong.

---

## Typography

- [ ] Font sizes come from a consistent type scale (not random values)
- [ ] Body text is 16px minimum
- [ ] Line height is ~1.5 for body text, ~1.2 for headings
- [ ] Headings have tighter letter spacing (-0.01 to -0.03em)
- [ ] Only 1-2 font families are used (one sans-serif + optional accent)
- [ ] Font weights create clear hierarchy (regular for body, semibold/bold for headings)
- [ ] No orphaned words (single word on last line of a heading)
- [ ] Text is readable at arm's length on mobile

## Spacing

- [ ] All spacing values are multiples of 8px (8, 16, 24, 32, 48, 64)
- [ ] Padding inside cards/containers is consistent
- [ ] Space between sections is larger than space between elements within sections
- [ ] Content has a max-width (640-720px for text, 1200-1440px for layouts)
- [ ] Elements on the same row share a consistent alignment edge
- [ ] No elements touching the viewport edge on mobile (min 16px horizontal padding)

## Color

- [ ] Using semantic color variables (background, foreground, muted, accent) — not hardcoded hex values
- [ ] 60% neutral, 30% secondary, 10% accent color distribution
- [ ] All text passes contrast ratio (4.5:1 for normal text, 3:1 for large text)
- [ ] Interactive elements have a distinct color that isn't used for decoration
- [ ] No more than 5-6 total colors (including neutrals)
- [ ] Dark mode tested — nothing invisible or unreadable

## States

- [ ] Every button has hover, active/pressed, focus, and disabled states
- [ ] Every form input has default, focus, error, and disabled states
- [ ] Every link has hover and focus-visible states
- [ ] Empty states exist for all lists, tables, and data views
- [ ] Loading states exist for all async operations (skeleton or spinner)
- [ ] Error states show what went wrong and how to fix it
- [ ] Success feedback exists for form submissions and actions

## Micro-Interactions

- [ ] Hover transitions on interactive elements (150-200ms)
- [ ] Page/route transitions are smooth (fade or slide, 200-300ms)
- [ ] Buttons have press feedback (subtle scale or color shift)
- [ ] Toasts/notifications animate in from an edge
- [ ] Modals have enter/exit transitions
- [ ] `prefers-reduced-motion` is respected (transitions reduced or removed)
- [ ] No animation is purely decorative — every one communicates something

## Responsive

- [ ] Tested at 320px, 375px, 768px, 1024px, 1440px
- [ ] Touch targets are 44px minimum on mobile
- [ ] Navigation adapts (sidebar → hamburger or bottom nav)
- [ ] Font sizes scale appropriately (not too large or too small)
- [ ] Images are responsive (no horizontal scroll)
- [ ] Forms use correct mobile keyboard types (email, tel, url)
- [ ] Nothing overflows or gets cut off at any width

## Final Pass

- [ ] No placeholder text ("Lorem ipsum", "Your title here", "TODO")
- [ ] No broken images or missing icons
- [ ] Favicon is set
- [ ] Page title and meta description are real (not defaults)
- [ ] Console has no errors or warnings
- [ ] Tab order makes sense (can you navigate the whole page with keyboard?)
- [ ] Scrolling feels natural (no janky jumps or scroll jacking)

---

**How to use this with Claude Code:**

> "Review the app against this checklist and fix everything that fails. Go section by section — typography first, then spacing, then color, then states, then interactions, then responsive. Show me what you changed after each section."

Or for a quick audit without fixes:

> "Audit the app against this polish checklist. For each item that fails, tell me which file and line needs fixing and what the fix is. Don't make changes yet — just report."
