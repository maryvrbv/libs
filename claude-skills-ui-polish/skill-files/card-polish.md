# [Project Name]

[Brief description of what this project does.]

---

## Capability: Card Polish

Cards are the building blocks of modern UI. They group related content into scannable, self-contained units. This file defines card anatomy, elevation, interaction, and layout rules. Apply these to every card component you generate or modify.

### Card Anatomy

Every card has four optional sections. Consistent padding across all of them.

```jsx
<div className="rounded-lg border border-border bg-card text-card-foreground">
  {/* Header — title + optional action */}
  <div className="flex items-center justify-between p-6 pb-0">
    <h3 className="text-lg font-semibold leading-none">Card Title</h3>
    <button className="btn-ghost btn-sm">Edit</button>
  </div>

  {/* Body — main content */}
  <div className="p-6">
    <p className="text-sm text-muted-foreground">Card body content goes here.</p>
  </div>

  {/* Footer — actions */}
  <div className="flex items-center justify-end gap-2 border-t border-border p-6 pt-4">
    <button className="btn btn-outline btn-sm">Cancel</button>
    <button className="btn btn-primary btn-sm">Save</button>
  </div>
</div>
```

**Padding:** `p-6` (24px) on all sections. This is the standard. Compact cards can use `p-4` (16px) but stay consistent within a card.

### Border and Shadow System

Pick one elevation strategy per card type. Don't combine borders and shadows on the same card.

```css
/* Flat — default, most cards */
.card-flat {
  border: 1px solid var(--color-border);
  background: var(--color-card);
  border-radius: 0.75rem; /* rounded-lg */
}

/* Subtle elevation — slightly raised */
.card-elevated-sm {
  background: var(--color-card);
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  /* shadow-sm */
}

/* Raised — prominent cards, featured content */
.card-elevated-md {
  background: var(--color-card);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  /* shadow-md */
}
```

**Border radius:** `rounded-lg` (0.75rem / 12px) is the standard for all cards. Be consistent.

### Interactive Card States

For clickable cards (links, selection), add hover and focus states.

```css
.card-interactive {
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
    /* Flat cards gain shadow-sm on hover, elevated cards go up one level */
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-background), 0 0 0 4px var(--color-ring);
  }

  &:active {
    transform: translateY(0);
  }
}
```

The `200ms` transition is intentional — cards are larger elements and need slightly more time than buttons for smooth motion.

### Content Spacing Inside Cards

```
Between sections (header → body → footer):  gap handled by padding
Between content blocks within body:          gap-4 (16px)
Between related elements (icon + label):     gap-2 (8px)
Between title and description:               gap-1.5 (6px)
```

```jsx
<div className="p-6 flex flex-col gap-4">
  <div className="flex items-center gap-2">
    <Avatar />
    <span className="text-sm font-medium">Author Name</span>
  </div>
  <p className="text-sm text-muted-foreground">Description text with comfortable spacing.</p>
  <div className="flex gap-2">
    <Badge>Tag 1</Badge>
    <Badge>Tag 2</Badge>
  </div>
</div>
```

### Card Header Patterns

```jsx
{/* Title + action — flex between */}
<div className="flex items-center justify-between p-6 pb-0">
  <h3 className="font-semibold">Title</h3>
  <button className="btn-ghost btn-icon-sm" aria-label="More options">
    <MoreHorizontalIcon className="h-4 w-4" />
  </button>
</div>

{/* Title + description */}
<div className="p-6 pb-0 flex flex-col gap-1.5">
  <h3 className="font-semibold">Title</h3>
  <p className="text-sm text-muted-foreground">Supporting description text.</p>
</div>

{/* With border separator — use when header is visually distinct */}
<div className="flex items-center justify-between p-6 border-b border-border">
  <h3 className="font-semibold">Title</h3>
</div>
```

### Card Footer

```jsx
{/* Actions right-aligned, border-top separator */}
<div className="flex items-center justify-end gap-2 border-t border-border p-6 pt-4">
  <button className="btn btn-outline btn-sm">Cancel</button>
  <button className="btn btn-primary btn-sm">Confirm</button>
</div>

{/* Metadata left, actions right */}
<div className="flex items-center justify-between border-t border-border p-6 pt-4">
  <span className="text-xs text-muted-foreground">Updated 2 hours ago</span>
  <button className="btn btn-ghost btn-sm">View</button>
</div>
```

### Card Grid Layout

```jsx
{/* Responsive card grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* gap-4 for compact grids, gap-6 for spacious grids */}
  <Card />
  <Card />
  <Card />
</div>
```

All cards in a grid must be the same height. Use `flex flex-col` inside cards and `flex-1` on the body to push footers to the bottom.

### Image Cards

```jsx
<div className="rounded-lg border border-border overflow-hidden">
  <div className="aspect-video">
    <img
      src="..."
      alt="Descriptive alt text"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="p-6">
    <h3 className="font-semibold">Title</h3>
    <p className="text-sm text-muted-foreground mt-1.5">Description.</p>
  </div>
</div>
```

Image corners match the card's `border-radius`. Use `overflow-hidden` on the card container so the image doesn't break rounded corners.

### Anti-Patterns

Do NOT do any of the following:

- **Different padding on different cards.** All cards in the same context use the same padding. `p-6` is the standard. Don't mix `p-4` and `p-6` and `p-8` in the same view.
- **Shadows AND borders together.** Pick one elevation strategy. Flat cards use borders. Elevated cards use shadows. Using both is redundant visual noise.
- **Cards without consistent border-radius.** Every card uses `rounded-lg`. Don't use `rounded-md` on some and `rounded-xl` on others.
- **Clickable cards without hover state.** If a card navigates somewhere, it needs `translateY(-2px)` + shadow increase on hover.
- **Card grids with uneven heights.** Use flexbox or grid to ensure all cards in a row are the same height.
- **Images that break card corners.** Always use `overflow-hidden` on the card when it contains edge-to-edge images.
- **Forgetting card footers.** If a card has actions, put them in a proper footer with `border-top`, not floating in the body.
- **Nesting cards inside cards.** One level of cards only. If you need hierarchy inside a card, use sections with subtle dividers.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All cards use `p-6` padding and `rounded-lg` border-radius
- Elevation: flat (border) or elevated (shadow) — never both
- Interactive cards have hover, focus-visible, and active states
- Card grids use consistent `gap-4` or `gap-6`

## Notes

[Any project-specific context.]
