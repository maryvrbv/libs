# [Project Name]

[One-line description of what this dashboard manages or displays.]

---

## Project Type: SaaS Dashboard

This is an authenticated SaaS dashboard. Users log in and manage [resources / data / settings]. The interface prioritizes clarity, density, and efficiency — users come here to get work done.

### App Structure

```
/login                      # Auth
/signup                     # Registration
/dashboard                  # Overview — stats, recent activity
/dashboard/[resource]       # List view (table)
/dashboard/[resource]/[id]  # Detail view
/dashboard/settings         # User settings
/dashboard/settings/billing # Billing and plan
/dashboard/settings/team    # Team management
```

### File Structure

```
[root]/
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx             # Collapsible sidebar navigation
│   │   ├── topbar.tsx              # Top bar (breadcrumbs, user menu, notifications)
│   │   ├── dashboard-layout.tsx    # Shell combining sidebar + topbar + main content
│   │   └── mobile-nav.tsx          # Bottom tab nav for mobile
│   ├── data/
│   │   ├── data-table.tsx          # Reusable table with sort/filter/pagination
│   │   ├── stat-card.tsx           # Metric card (value + trend + sparkline)
│   │   ├── chart-wrapper.tsx       # Chart container with loading/error states
│   │   └── empty-state.tsx         # Empty state placeholder
│   ├── ui/
│   │   ├── loading-skeleton.tsx    # Skeleton loaders for each content type
│   │   ├── notification-bell.tsx   # Notification icon + dropdown
│   │   ├── user-menu.tsx           # Avatar + dropdown (profile, logout)
│   │   ├── breadcrumbs.tsx         # Breadcrumb trail
│   │   ├── search-bar.tsx          # Global search
│   │   └── confirm-dialog.tsx      # Destructive action confirmation
│   ├── settings/
│   │   ├── profile-form.tsx        # Profile settings
│   │   ├── billing-section.tsx     # Plan, payment method, invoices
│   │   └── team-table.tsx          # Team members with roles
│   └── [feature]/                  # Feature-specific components
├── hooks/
│   ├── use-table.ts                # Table state (sort, filter, pagination)
│   └── use-notifications.ts        # Notification polling/websocket
├── lib/
│   ├── api.ts                      # API client
│   └── permissions.ts              # Role-based access helpers
├── types/
│   └── [resource].ts               # TypeScript types per resource
└── pages/
    ├── login.tsx
    ├── dashboard/
    │   ├── index.tsx               # Overview
    │   ├── [resource]/
    │   │   ├── index.tsx           # List view
    │   │   └── [id].tsx            # Detail view
    │   └── settings/
    │       ├── index.tsx           # Profile
    │       ├── billing.tsx
    │       └── team.tsx
```

### Layout: Dashboard Shell

The dashboard shell is a persistent layout wrapping all authenticated pages.

```
┌──────────────────────────────────────────────┐
│ Topbar [breadcrumbs]        [search] [🔔] [👤]│
├──────────┬───────────────────────────────────┤
│ Sidebar  │                                   │
│          │  Main Content Area                │
│ [nav]    │                                   │
│ [nav]    │  (page-specific content)          │
│ [nav]    │                                   │
│          │                                   │
│ ──────── │                                   │
│ [nav]    │                                   │
│ [nav]    │                                   │
└──────────┴───────────────────────────────────┘
```

### Sidebar Navigation

**Structure:**
- Logo/brand at the top (links to dashboard home)
- Nav sections grouped by purpose, separated by dividers
- Each item: icon + label
- Active state: background highlight + bold or accent color
- Collapse trigger: button at the bottom or top that reduces sidebar to icon-only mode

**Sections:**
```
[Logo]

── Main ──
[icon] Dashboard
[icon] [Resource 1]
[icon] [Resource 2]
[icon] [Resource 3]

── Tools ──
[icon] [Tool 1]
[icon] [Tool 2]

── Account ──
[icon] Settings
[icon] Help
```

**Collapsed state:**
- Show icons only, with tooltip on hover for label.
- Width: ~64px collapsed, ~240px expanded.
- Persist collapse state in localStorage.

**Mobile behavior:**
- Sidebar is hidden. Replace with a bottom tab navigation bar.
- Bottom nav shows 4-5 top-level items with icons + labels.
- Settings and secondary items go behind a "More" tab or the user menu.

### Top Bar

**Structure:**
- **Left:** Breadcrumbs showing current location (Dashboard > [Resource] > [Item Name])
- **Center/right:** Global search input (expands on focus)
- **Right:** Notification bell (with unread count badge) + user avatar menu

**User menu (dropdown):**
- User name + email
- Profile settings link
- Theme toggle (if supported)
- Logout

**Notification dropdown:**
- List of recent notifications (title + timestamp + read/unread indicator)
- "Mark all as read" action
- "View all" link to a notifications page (if volume warrants it)

### Data Tables

The primary way users interact with data. Every list view is a data table.

**Features:**
- **Columns:** sortable (click header to toggle asc/desc, arrow indicator)
- **Search:** text input above the table, filters rows client-side or server-side
- **Filters:** dropdown or multi-select per column (status, category, date range)
- **Pagination:** bottom of table — rows per page selector (10, 25, 50) + page navigation
- **Row actions:** kebab menu (three dots) on each row with Edit, Delete, etc.
- **Bulk actions:** checkbox column, action bar appears when rows are selected ("Delete selected", "Export")
- **Column visibility:** optional toggle to show/hide columns

**Structure:**
```
┌────────────────────────────────────────────┐
│ [Search...] [Filter: Status ▾] [+ Create]  │
├────────────────────────────────────────────┤
│ □ Name ▲  │ Status │ Created  │ Actions    │
│ □ Item 1  │ Active │ Jan 15   │ ···        │
│ □ Item 2  │ Draft  │ Jan 12   │ ···        │
│ □ Item 3  │ Active │ Jan 10   │ ···        │
├────────────────────────────────────────────┤
│ Showing 1-10 of 42    [< 1 2 3 4 5 >]     │
└────────────────────────────────────────────┘
```

**Rules:**
- Always show a loading skeleton while data loads — never a blank table.
- Always show an empty state when there's no data (icon + message + "Create your first [resource]" CTA).
- Sort indicators visible on the active column only.
- Sticky table header on scroll for long tables.
- Row hover highlight.

### Stat Cards

The dashboard overview page leads with 3-4 stat cards.

**Structure per card:**
- Metric label (e.g., "Total Revenue", "Active Users")
- Primary value (large number, formatted)
- Trend indicator (up/down arrow + percentage + "vs last [period]")
- Sparkline chart (optional, small inline chart showing trend over time)

**Layout:** Horizontal row of cards, 3-4 across on desktop. 2-column grid on tablet. Stacked on mobile.

**Rules:**
- Use consistent number formatting (commas, currency symbols, abbreviations for large numbers).
- Green for positive trends, red for negative. Use color plus an icon — never color alone.
- Sparklines are optional — only add them if the trend data is meaningful.

### Chart Integration

Charts appear on the overview page and within resource detail views.

**Patterns:**
- **Line chart** — trends over time (revenue, signups, usage)
- **Bar chart** — comparisons across categories
- **Donut/pie chart** — composition breakdowns (use sparingly, only for 2-5 segments)

**Structure:**
- Chart title + optional description
- Time range selector (7d, 30d, 90d, 12m)
- Legend (inline or below)
- Tooltip on hover showing exact values

**Rules:**
- Wrap charts in a loading state — show a skeleton matching the chart dimensions.
- Handle empty data — show a message, not a broken or blank chart.
- Use the same color palette across all charts for consistency.
- Maximum 5-6 data series per chart. More than that is unreadable.

### Settings Pages

#### Profile
- Avatar upload
- Name, email fields
- Password change (current + new + confirm)
- Save button with success feedback

#### Billing
- Current plan display (name, price, renewal date)
- Upgrade/downgrade buttons
- Payment method (card ending in ****1234, edit link)
- Invoice history table (date, amount, status, download link)

#### Team
- Team members table: name, email, role, status (active/invited), actions (change role, remove)
- Invite form: email + role selector + send button
- Pending invitations list

### Notification System

**Types:**
- **In-app notifications** — bell icon with dropdown. Polling or WebSocket.
- **Toast notifications** — transient messages for actions ("Saved", "Deleted", "Error"). Auto-dismiss after 3-5 seconds.
- **Inline alerts** — persistent messages within a page (billing warning, trial expiring).

**Rules:**
- Toasts appear in a consistent position (top-right or bottom-right).
- Stack multiple toasts vertically. Limit visible count to 3.
- Destructive action toasts include an "Undo" button when possible.

### Empty States

Every data view must have an empty state. No blank screens.

**Structure:**
- Illustration or icon (relevant to the resource)
- Heading: "No [resources] yet"
- Description: one sentence explaining the resource or next step
- CTA button: "Create your first [resource]"

**Where they appear:**
- Data tables with no rows
- Dashboard overview with no activity
- Charts with no data
- Notification dropdown with nothing to show

### Loading Skeletons

Every component that loads data asynchronously shows a skeleton matching its layout.

**Patterns:**
- **Table skeleton:** header row + 5 rows of gray bars matching column widths.
- **Stat card skeleton:** gray bar for label, larger bar for value, thin bar for trend.
- **Chart skeleton:** gray rectangle matching chart dimensions.
- **Form skeleton:** gray bars for labels and input fields.

**Rules:**
- Skeletons must match the dimensions of the loaded content to prevent layout shift.
- Use a subtle shimmer/pulse animation.
- Never show a generic spinner when a skeleton is more informative.

### Role-Based UI Visibility

Different users see different things based on their role.

**Pattern:**
- Define roles: [Admin, Member, Viewer]
- Each role maps to a set of permissions
- Wrap UI elements in a permission check — hide elements the user cannot use
- Server-side: validate permissions on every API call. Never rely on UI hiding alone.

**What changes by role:**
- Sidebar items (Admin sees Settings > Team, members do not)
- Table row actions (Viewer sees no Edit/Delete)
- Create/edit/delete buttons
- Billing page access

**Rules:**
- Hide inaccessible UI entirely — do not show disabled buttons without explanation.
- If a user navigates to a forbidden route, redirect to dashboard with an inline message.
- Always validate permissions server-side. Client-side hiding is a UX convenience, not a security measure.

### Responsive Dashboard

```
Desktop (> 1024px):  Sidebar + topbar + full content area
Tablet (640-1024px): Collapsed sidebar (icons only) + topbar + content
Mobile (< 640px):    No sidebar. Bottom tab nav + topbar + full-width content
```

**Mobile rules:**
- Data tables: horizontal scroll with sticky first column, or switch to card layout per row.
- Stat cards: stack vertically or 2-column grid.
- Charts: full-width, maintain touch interactivity.
- Settings: single column forms.
- Modals: full-screen on mobile (not centered floating).

### Anti-Patterns — Do NOT

- Show a blank screen while data loads — always use skeletons
- Build custom table components when a data table library exists for your stack
- Put all settings on one mega-page — separate profile, billing, and team
- Use color alone to indicate status — pair with icons or labels
- Show raw error messages from the API to users
- Nest navigation more than 2 levels deep in the sidebar
- Auto-refresh the entire page — update specific components
- Use browser alerts (`window.alert`, `window.confirm`) — use styled dialogs
- Forget empty states on any data view
- Make destructive actions (delete) easy to trigger accidentally — always confirm
- Put admin-only features behind disabled buttons without context — hide them entirely
- Paginate with only "Previous / Next" — show page numbers and total count
- Ignore keyboard navigation — tables, modals, and menus must be keyboard accessible

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Dashboard shell layout wraps all authenticated pages
- Data tables are the primary interaction pattern for list views
- Every async data view has a loading skeleton and an empty state
- Server-side permission validation on all mutations
- Consistent toast notifications for user actions

## Notes

[Any project-specific context — user roles, key resources, third-party integrations.]
