# [Project Name]

[Brief description of what this project does.]

---

## Capability: Table Polish

Tables display structured data. They need to be scannable, sortable, and readable at any data density. This file defines header styling, row behavior, cell rules, responsive patterns, and interaction states. Apply these to every data table you generate or modify.

### Header Row

Table headers orient the user. They must be visually distinct from body rows.

```css
thead th {
  font-weight: 500;                    /* font-medium */
  font-size: 0.75rem;                  /* text-xs (12px) */
  text-transform: uppercase;
  letter-spacing: 0.05em;              /* tracking-wider */
  color: var(--color-muted-foreground);
  padding: 12px 16px;                  /* px-4 py-3 */
  text-align: left;
  white-space: nowrap;
  position: sticky;
  top: 0;
  background: var(--color-background);
  z-index: 10;
  border-bottom: 1px solid var(--color-border);
}
```

Sticky headers are required for any table that scrolls. Users must always know what column they're reading.

### Body Rows

```css
tbody tr {
  border-bottom: 1px solid var(--color-border);
  transition: background-color 150ms ease;
}

tbody tr:hover {
  background-color: hsl(var(--muted) / 0.5); /* bg-muted/50 */
}

tbody tr:last-child {
  border-bottom: none;
}

tbody td {
  padding: 12px 16px; /* px-4 py-3 — matches header padding */
  font-size: 0.875rem; /* text-sm */
  color: var(--color-foreground);
  vertical-align: middle;
}
```

### Cell Alignment

Alignment communicates data type. Get this wrong and the table is hard to scan.

```
Strings (names, descriptions):    text-align: left
Numbers (amounts, counts):        text-align: right
Status / icons / badges:          text-align: center
Dates:                            text-align: left
Actions (buttons, menus):         text-align: right (last column)
```

```jsx
<table className="w-full">
  <thead>
    <tr>
      <th className="text-left">Name</th>
      <th className="text-left">Status</th>
      <th className="text-right">Amount</th>
      <th className="text-right">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-muted/50">
      <td className="px-4 py-3 text-left font-medium">Invoice #1234</td>
      <td className="px-4 py-3 text-left"><Badge>Paid</Badge></td>
      <td className="px-4 py-3 text-right tabular-nums">$1,250.00</td>
      <td className="px-4 py-3 text-right">
        <button className="btn-ghost btn-sm">View</button>
      </td>
    </tr>
  </tbody>
</table>
```

Use `tabular-nums` (or `font-variant-numeric: tabular-nums`) for number columns so digits align vertically.

### Column Widths

Don't let columns collapse to unreadable widths.

```css
/* Set minimum widths on columns with important content */
th:first-child { min-width: 200px; }  /* Name column */
th.status-col  { min-width: 100px; }  /* Status */
th.amount-col  { min-width: 120px; }  /* Amounts */
th.actions-col { width: 80px; }       /* Actions — fixed width */

/* Wrap the table for horizontal scroll */
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

### Sort Indicators

```jsx
<th className="cursor-pointer select-none" onClick={() => handleSort('name')}>
  <div className="flex items-center gap-1">
    Name
    {sortColumn === 'name' ? (
      sortDir === 'asc'
        ? <ChevronUpIcon className="h-3.5 w-3.5" />
        : <ChevronDownIcon className="h-3.5 w-3.5" />
    ) : (
      <ChevronsUpDownIcon className="h-3.5 w-3.5 opacity-30" />
    )}
  </div>
</th>
```

Inactive sort columns show a subtle (opacity-30) chevron. Active columns show a solid directional chevron. This teaches users which columns are sortable.

### Responsive Table

Two strategies depending on data complexity.

**Strategy 1: Horizontal scroll (dense data)**
```jsx
<div className="relative overflow-x-auto rounded-lg border border-border">
  <table className="w-full min-w-[600px]">
    {/* Table content */}
  </table>
</div>
```

**Strategy 2: Stack to cards (simple data, mobile)**
```jsx
{/* Desktop: table */}
<table className="hidden md:table w-full">...</table>

{/* Mobile: card stack */}
<div className="md:hidden flex flex-col gap-3">
  {data.map(row => (
    <div key={row.id} className="rounded-lg border border-border p-4">
      <div className="flex justify-between items-center">
        <span className="font-medium">{row.name}</span>
        <Badge>{row.status}</Badge>
      </div>
      <span className="text-sm text-muted-foreground mt-1">{row.amount}</span>
    </div>
  ))}
</div>
```

### Empty Table State

```jsx
<tr>
  <td colSpan={columnCount} className="text-center py-12">
    <div className="flex flex-col items-center gap-2">
      <InboxIcon className="h-10 w-10 text-muted-foreground/50" />
      <p className="text-sm font-medium text-muted-foreground">No invoices found</p>
      <p className="text-xs text-muted-foreground">Create your first invoice to get started.</p>
      <button className="btn btn-primary btn-sm mt-2">Create Invoice</button>
    </div>
  </td>
</tr>
```

Empty states span the full table width and include an icon, headline, description, and action.

### Pagination

```jsx
<div className="flex items-center justify-between border-t border-border px-4 py-3">
  <p className="text-sm text-muted-foreground">Showing 1-10 of 97 results</p>
  <div className="flex items-center gap-2">
    <button className="btn btn-outline btn-sm" disabled={page === 1}>Previous</button>
    <button className="btn btn-outline btn-sm" disabled={page === lastPage}>Next</button>
  </div>
</div>
```

Pagination sits below the table, info on the left, controls on the right.

### Row Actions

```jsx
{/* Visible on hover or always-visible dropdown */}
<td className="px-4 py-3 text-right">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="btn-ghost btn-icon-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Row actions">
        <MoreHorizontalIcon className="h-4 w-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Duplicate</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</td>
```

Add `className="group"` to `<tr>` to enable hover-reveal on row actions.

### Anti-Patterns

Do NOT do any of the following:

- **Tables without hover states on rows.** Hover highlighting helps users track across columns. Always include `hover:bg-muted/50`.
- **Inconsistent cell padding.** Every cell — header and body — uses `px-4 py-3`. Don't vary per column.
- **Text wrapping in data cells.** Data cells should use `whitespace-nowrap` for short content. Long descriptions get `max-w-[300px] truncate`.
- **Numbers left-aligned.** Numbers align right. Always. Use `tabular-nums` for consistent digit widths.
- **Tables without empty states.** An empty `<tbody>` is a broken UI. Show a proper empty state component.
- **Missing sticky headers.** If the table scrolls, headers must stick. Users lose context without them.
- **Tables on mobile without adaptation.** Either horizontal scroll or card-stack layout. A squished table is unusable.
- **Sort indicators that disappear.** Inactive sortable columns need a subtle indicator so users know sorting is available.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Header: sticky, uppercase, text-xs, tracking-wider, muted color
- Body: border-bottom, hover:bg-muted/50, consistent px-4 py-3
- Numbers right-aligned with tabular-nums
- Empty state spans full width with icon + message + action
- Responsive: scroll or stack, never squish

## Notes

[Any project-specific context.]
