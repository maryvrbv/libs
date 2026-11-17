# [Project Name]

[Brief description of what this project does.]

---

## Capability: Dashboard Polish

This project has a dashboard. Dashboards are information-dense — polish means clarity, not decoration. Every element must earn its space. Users glance at dashboards, they don't read them. Apply these rules to all dashboard UI generated or modified.

### Layout Structure

```
Sidebar:      w-64, fixed, full height, bg-background, border-r
Main content: ml-64, flex-1, overflow-y-auto
Top bar:      h-16, sticky top-0, bg-background/95 backdrop-blur, border-b, z-10
Content area: p-6
```

**Sidebar:** Logo (h-16, aligns with top bar), nav items (px-3 py-2, rounded-md, text-sm font-medium), active state (bg-muted, text-foreground, font-semibold), user section at bottom (mt-auto, border-t, avatar + name). Collapses to overlay drawer on mobile (< 1024px).

**Top bar:** flex between — left: breadcrumb or page title (text-lg font-semibold), right: search (w-64) + notification bell (with unread dot) + avatar dropdown (32px circle).

### Stat Cards

```
Grid:       4-col xl, 2-col md, 1-col mobile, gap-6
Card:       bg-card, border, rounded-lg, p-6
Label:      text-sm text-muted-foreground font-medium
Value:      text-3xl font-bold, mt-1
Trend:      text-sm mt-2, flex items-center gap-1
            up: text-green-600 + arrow-up icon
            down: text-red-600 + arrow-down icon
Period:     text-xs text-muted-foreground, "vs last 30 days"
```

Max 4-6 stat cards. Every stat needs period context. Trend indicators use color AND icon (accessibility). Format numbers with locale: `12,450` not `12450`.

### Charts Area

```
Card wrapper: bg-card, border, rounded-lg, p-6
Header:       flex justify-between — title (font-semibold) + time range selector
Chart:        mt-4, min-height 300px, responsive width
Legend:        below chart, text-sm, color dot + label
```

Charts must have labeled axes and hover tooltips. Max 2-3 charts visible without scrolling. Loading: skeleton rectangle with shimmer.

### Data Table

```
Container:   bg-card, border, rounded-lg, overflow-hidden
Header row:  bg-muted/50, text-sm font-medium text-muted-foreground, px-6 py-3, border-b
Body rows:   px-6 py-4, border-b last:border-0, hover: bg-muted/30 150ms
Sort:        column header button with chevron icon
Pagination:  border-t, px-6 py-3, flex between — "Showing 1-10 of 234" + prev/next
```

Align numbers right, text left. Table scrolls horizontally on mobile inside card container. Empty state: centered icon + message + action.

### Activity Feed

```
Item:        flex gap-3, py-3, border-b
Avatar:      32px circle (or system icon)
Content:     text-sm, bold actor name, normal action text
Timestamp:   text-xs text-muted-foreground, relative ("2h ago", "Yesterday", then full date after 7d)
```

### Dashboard States

**No data:** Replace cards + charts with welcome card — heading, setup instructions, CTA ("Complete setup").
**Loading:** Skeleton cards, skeleton chart rectangles, skeleton table rows (5-6). Shimmer animation, stagger by 50ms.
**Error:** Inline banner at top — bg-destructive/10, border-destructive/20, rounded-lg, p-4. Warning icon + message + retry button.

### Spacing

```
Page padding:    p-6 (24px)
Card grid gap:   gap-6 (24px)
Card padding:    p-6 (24px)
Within cards:    gap-2 (8px) between label/value/trend
Between sections: mt-6 (24px)
```

### Anti-Patterns — Do NOT

- Show stat cards without period context. "Revenue: $12,450" needs "this month" or "vs last period."
- Display more than 6 stat cards. Prioritize what matters.
- Render charts without axis labels or tooltips.
- Use a sidebar wider than 280px or narrower than 200px.
- Forget loading states. Every section needs a skeleton.
- Show raw timestamps. Use relative time.
- Let tables break layout on mobile. Horizontal scroll within the card.
- Mix card styles. All cards use the same border, radius, and shadow.
- Leave the first-time dashboard blank. New users need guidance.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Sidebar w-64 fixed, content scrolls independently
- Stat cards max 4-6 with period context and trend indicators
- All sections have loading, empty, and error states
- Tables: numbers right, text left
- Relative timestamps throughout

## Notes

[Any project-specific context.]
