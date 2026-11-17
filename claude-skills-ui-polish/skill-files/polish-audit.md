# [Project Name]

[Brief description of what this project does.]

---

## Capability: Polish Audit

This project uses a polish audit workflow. When active, Claude Code operates in audit mode — scanning existing UI code to identify polish issues and producing a prioritized report with specific fix instructions.

### How the Audit Works

When asked to audit the UI, follow this exact process:

```
1. Scan all UI components, pages, and layouts
2. Check each polish dimension (typography, spacing, color, states, responsive)
3. Categorize issues by severity (critical, major, minor)
4. Output a prioritized report with file paths and fix instructions
```

Do not fix anything during the audit. Report only. Fixes come after the report is reviewed.

### Step 1: Typography Audit

Scan every component and page for typography issues.

**Check for:**
- Font sizes not from a defined type scale (arbitrary values like 13px, 17px, 22px)
- Inconsistent font sizes for the same element type across pages (h2 is 24px on one page, 28px on another)
- Missing or incorrect line heights (text that feels cramped or has too much space between lines)
- Line height not proportional to font size (headings with body-text line height, or vice versa)
- Body text below 16px on any device
- Text lines exceeding 75 characters in width (no `max-width` constraint on paragraphs)
- Inconsistent font weight usage (bold used for emphasis in some places, semibold in others)
- More than 3 font weights on a single page
- Letter spacing not adjusted for headings (large text should be slightly tightened)
- All-caps text without increased letter spacing

**Report format for each issue:**
```
[TYPOGRAPHY] [severity] — [file:line]
Issue: [what's wrong]
Current: [current value]
Expected: [what it should be]
Fix: [specific instruction]
```

### Step 2: Spacing Audit

Scan for spacing inconsistencies.

**Check for:**
- Spacing values not from the 8px grid (odd values like 13px, 17px, 23px, 35px)
- Inconsistent padding across similar components (one card has 16px padding, another has 20px)
- Inconsistent margin between sections (40px gap in one place, 60px in another without justification)
- Missing padding inside containers (content touching the edges of a card or section)
- Heading-to-content spacing larger than section-to-section spacing (breaks visual grouping)
- No breathing room between major page sections (sections feel stacked on top of each other)
- Inconsistent gap values in flex/grid layouts
- Missing bottom padding on pages (content jams against the viewport bottom)
- Form field spacing inconsistent (different gaps between label-input pairs)

**Report format for each issue:**
```
[SPACING] [severity] — [file:line]
Issue: [what's wrong]
Current: [current value]
Expected: [what it should be, citing the spacing scale]
Fix: [specific instruction]
```

### Step 3: Color Audit

Scan for color system issues.

**Check for:**
- Hardcoded hex/rgb values in component styles instead of CSS custom properties
- Colors not part of a defined palette (random hex values)
- Inconsistent use of gray shades (too many similar-but-different grays)
- Primary/accent color used inconsistently (blue buttons in one place, different blue elsewhere)
- Semantic colors used incorrectly (using error red for a non-error purpose)
- Text on colored backgrounds failing contrast requirements (check visually — anything that looks low-contrast probably is)
- Missing semantic color assignments (no defined success, warning, error colors)
- Opacity used to create text colors instead of explicit color values
- Brand colors used for more than 10% of the page surface area
- Destructive actions not using the error/danger color

**Report format for each issue:**
```
[COLOR] [severity] — [file:line]
Issue: [what's wrong]
Current: [current value or color]
Expected: [correct semantic variable or color]
Fix: [specific instruction]
```

### Step 4: States Audit

Scan all interactive elements for missing states.

**Check every button, link, input, card, and interactive element for:**
- Missing hover state (no visual change on hover)
- Missing focus-visible state (no outline or ring on keyboard focus)
- Missing disabled state (or disabled state that looks identical to default)
- Missing loading state on buttons or elements that trigger async operations
- Missing error state on form inputs
- Missing empty state on lists, tables, feeds, search results, and data views
- Active/pressed state missing
- Selected state missing on selectable elements (tabs, toggles, list selections)
- Focus outline removed with `outline: none` without a replacement
- Hover state exists but no transition (state snaps instead of animating)

**Report format for each issue:**
```
[STATES] [severity] — [file:line or component name]
Issue: [which state is missing]
Element: [description of the element]
Fix: [specific CSS or code to add]
```

### Step 5: Contrast Audit

Check text and UI element contrast against their backgrounds.

**Check for:**
- Light gray text on white or light backgrounds (common in placeholders, metadata, captions)
- Colored text on colored backgrounds without sufficient contrast
- Focus indicators that don't contrast against the element's background
- Disabled state text that is completely unreadable (too faint)
- Icon-only elements where the icon doesn't have enough contrast
- Borders that are invisible or nearly invisible against their background
- Error, success, and warning text on their respective tinted backgrounds

**WCAG AA minimums:**
```
Normal text (<18pt / <14pt bold):  4.5:1
Large text (>=18pt / >=14pt bold): 3:1
UI components and icons:           3:1
```

**Report format:**
```
[CONTRAST] [severity] — [file:line]
Issue: [what doesn't have enough contrast]
Foreground: [color]
Background: [color]
Estimated ratio: [X:1]
Required: [4.5:1 or 3:1]
Fix: [suggested color adjustment]
```

### Step 6: Responsive Audit

Check behavior at key viewport widths.

**Check for:**
- Horizontal scrolling at any viewport width (especially 320px and 375px)
- Touch targets smaller than 44x44px on mobile
- Text too small to read on mobile (below 14px for any text, below 16px for body)
- Layout breaking at common breakpoints (768px, 1024px)
- Navigation not adapting to mobile (full desktop nav on small screens)
- Images overflowing their containers
- Fixed-width elements that don't flex on smaller screens
- Modals or overlays that don't adapt to mobile (too wide, can't scroll, can't close)
- Form inputs too small to tap accurately on mobile
- Side-by-side layouts that should stack on mobile

**Report format:**
```
[RESPONSIVE] [severity] — [file:line or component name]
Issue: [what breaks]
Viewport: [width where it breaks]
Fix: [specific responsive fix]
```

### Severity Levels

**Critical** — Blocks usability or looks broken:
- Missing interactive states (can't tell if something is clickable)
- Text unreadable (contrast too low, text too small)
- Layout broken (overflow, overlapping elements)
- Missing error states (user can't recover from errors)

**Major** — Noticeable quality issue:
- Inconsistent spacing or typography
- Hardcoded colors instead of variables
- Missing empty states
- Missing loading states
- Responsive issues at common widths

**Minor** — Professional polish detail:
- Transition timing could be better
- Border radius inconsistency
- Shadow usage could be more consistent
- Letter spacing not optimized for headings

### Output Format

After completing all steps, produce the final report in this structure:

```markdown
# Polish Audit Report

## Summary
- Critical issues: [count]
- Major issues: [count]
- Minor issues: [count]

## Critical Issues
[List each critical issue with full details]

## Major Issues
[List each major issue with full details]

## Minor Issues
[List each minor issue with full details]

## Recommended Fix Order
1. [First thing to fix — usually critical issues]
2. [Second priority]
3. [Continue...]
```

### Anti-Patterns — Do NOT

- Fix issues during the audit — report only, fix later
- Skip the severity classification — it drives fix priority
- Report issues without specific file paths and line numbers
- Give vague fix instructions ("make it better") — every fix must be actionable
- Ignore responsive issues — they are often the most impactful
- Report only obvious issues — dig into component styles, not just page-level layout
- Miss empty states — they are the most commonly skipped polish step
- Skip contrast checking — low contrast is the most common accessibility failure

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Audit before polish — always know the full scope before fixing
- Fix critical issues first, then major, then minor
- Re-audit after fixes to verify resolution

## Notes

[Any project-specific context.]
