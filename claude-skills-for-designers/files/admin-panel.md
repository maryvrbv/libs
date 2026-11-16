# [Project Name] Admin Panel

[Brief description — what does this admin panel manage?]

---

## Tech Stack

- [Framework: React / Vue / Next.js / etc.]
- [Design System: file reference]
- [Data fetching: REST / GraphQL / tRPC]
- [Auth: role-based — admin / editor / viewer]
- [Table library: TanStack Table / AG Grid / custom]

## Project Type: Admin Panel

This is an internal admin panel for managing [data/content/users]. It follows standard CRUD patterns with data tables, forms, role-based access, and an overview dashboard. The focus is on efficiency — admins need to find, view, edit, and manage data quickly.

Pair this file with a design system file for component-level guidance.

### Page Layout

Sidebar navigation with a full-width content area.

```
┌──────────────────────────────────────────────────────────┐
│ Top Bar: [App Logo] [Search] [Notifications] [User Menu] │
├────────────┬─────────────────────────────────────────────┤
│            │                                             │
│  Sidebar   │   Content Area                              │
│  Navigation│                                             │
│            │   Breadcrumbs: Home / [Section] / [Page]    │
│  Dashboard │   Page Title            [Action Buttons]    │
│  [Section] │                                             │
│    • Item  │   ┌─────────────────────────────────────┐   │
│    • Item  │   │  Content (table, form, dashboard)   │   │
│  [Section] │   │                                     │   │
│    • Item  │   │                                     │   │
│            │   └─────────────────────────────────────┘   │
│            │                                             │
│  ────────  │                                             │
│  Settings  │                                             │
│  Help      │                                             │
└────────────┴─────────────────────────────────────────────┘
```

**Rules:**
- Sidebar is fixed/persistent on desktop, collapsible on tablet/mobile
- Content area scrolls independently of sidebar
- Top bar stays fixed — always accessible
- Minimum viewport: 1024px (admin panels are desktop-first, responsive second)

### Sidebar Navigation

Grouped navigation with section headers, icons, and badges.

```
Sidebar structure:
├── [App Logo / Name]
├── ──────────────
├── Dashboard                          # Overview page (always first)
├── [Section Label]                    # Non-clickable group header
│   ├── [Icon] [Resource Name]  (42)   # Badge = count (pending, unread)
│   ├── [Icon] [Resource Name]
│   └── [Icon] [Resource Name]
├── [Section Label]
│   ├── [Icon] [Resource Name]
│   └── [Icon] [Resource Name]
├── ──────────────
├── [Icon] Users & Permissions         # User management
├── [Icon] Activity Log                # Audit trail
├── [Icon] Settings
└── ──────────────
    [Collapsed user info]              # Name, role, sign out
```

**Behavior:**
- Active page is highlighted
- Sections can be expanded/collapsed
- Badges show counts for items needing attention (pending approvals, new submissions)
- Sidebar can be collapsed to icon-only mode (wider content area)
- On mobile: sidebar becomes a slide-out drawer

**Rules:**
- Group related resources under section headers
- Use consistent icons for each resource type
- Badge counts update in real time (or on page load)
- Settings and user management go at the bottom — they're used less frequently
- Maximum ~15 items visible without scrolling

### CRUD Interface Patterns

Every resource follows the same list → create/edit → detail flow.

```
Flow:
├── List View (/[resource])
│   ├── Table with all records
│   ├── Search, filter, sort
│   ├── Bulk actions
│   └── "Create New" button
├── Create View (/[resource]/new)
│   ├── Form with validation
│   └── Save / Cancel
├── Detail View (/[resource]/[id])
│   ├── Read-only display of all fields
│   ├── Edit button → Edit View
│   ├── Delete button (with confirmation)
│   └── Related data sections
└── Edit View (/[resource]/[id]/edit)
    ├── Pre-filled form
    └── Save / Cancel / Delete
```

**URL patterns:**
```
/[resource]              # List
/[resource]/new          # Create
/[resource]/[id]         # Detail
/[resource]/[id]/edit    # Edit
```

**Rules:**
- Every resource has all four views (list, create, detail, edit)
- List view is the default landing for each resource
- Create and Edit use the same form component (pre-filled for edit)
- Delete always requires confirmation (modal or inline)
- After successful create/edit: redirect to detail view or list view
- After delete: redirect to list view
- Unsaved changes: warn before navigating away

### Data Tables

The primary interface for viewing and managing records.

```
Table structure:
├── Table Controls Bar
│   ├── Search input (filters visible rows)
│   ├── Filter dropdowns (status, date range, category)
│   ├── Column visibility toggle
│   └── Export button (CSV, JSON)
├── Column Headers
│   ├── [Checkbox] (select all)
│   ├── [Column Name ↕] (sortable — click to toggle asc/desc)
│   ├── [Column Name ↕]
│   └── [Actions]
├── Table Rows
│   ├── [Checkbox] [Data] [Data] [Data] [Actions: Edit | Delete | ...]
│   ├── ...
│   └── ...
├── Bulk Actions Bar (appears when rows are selected)
│   ├── "[n] selected" count
│   ├── [Bulk Delete] [Bulk Export] [Bulk Update Status]
│   └── [Clear Selection]
└── Pagination
    ├── "Showing 1-25 of 342 results"
    ├── Rows per page: [10 | 25 | 50 | 100]
    └── Page navigation: [← Prev] [1] [2] [3] ... [14] [Next →]
```

**Features:**
- **Sorting:** Click column header to sort. Show arrow indicator for sort direction.
- **Search:** Filters across all text columns. Debounce 300ms.
- **Filters:** Dropdown or multi-select per filterable column. Active filters shown as chips.
- **Pagination:** Server-side for large datasets. Show total count.
- **Row actions:** Inline action buttons or dropdown menu per row.
- **Empty state:** "No [resources] found" with a CTA to create the first one.

**Bulk actions:**
- Select individual rows via checkbox, or "Select all" (current page)
- "Select all [n] results" option for selecting across pages
- Bulk actions appear in a bar above or below the table when rows are selected
- Destructive bulk actions (delete) require typed confirmation ("Type DELETE to confirm")

**Rules:**
- Default sort: most recent first (created_at desc)
- Preserve filters, sort, and pagination in the URL query string
- Row click navigates to detail view (except checkbox column and actions column)
- Loading state: skeleton rows (not spinner)
- Keep column count manageable — 5-8 columns visible, hide extras behind column toggle

### Role-Based UI Visibility

Show/hide UI elements based on the user's role.

```
Roles:
├── Admin
│   ├── Full CRUD on all resources
│   ├── User management (invite, edit roles, remove)
│   ├── Settings access
│   ├── Activity log access
│   └── Bulk delete
├── Editor
│   ├── Create, read, update (no delete, or soft-delete only)
│   ├── Cannot manage users
│   ├── Cannot access settings
│   └── Limited bulk actions
└── Viewer
    ├── Read-only access
    ├── Cannot create, edit, or delete
    ├── Can export data
    └── No bulk actions
```

**Implementation:**
- Check role before rendering action buttons, menu items, and pages
- Hide elements the user cannot use — do not show disabled buttons
- Server-side validation always — client-side hiding is for UX, not security
- Show a "no permission" page if a user navigates to a restricted URL directly

**Rules:**
- Never rely solely on client-side role checks — always enforce on the server
- Hide, don't disable — if a user can't do it, don't show the option
- Show the user's role in the sidebar or user menu
- Role changes take effect immediately (or on next page load)

### Form Wizards

Multi-step forms for complex data entry (e.g., creating a product with multiple sections).

```
Wizard structure:
├── Step indicator (top of form)
│   ├── Step 1: [Basic Info] ✓ (completed)
│   ├── Step 2: [Details] ● (current)
│   ├── Step 3: [Media] ○ (upcoming)
│   └── Step 4: [Review] ○
├── Form content (current step)
│   └── Fields for this step
└── Navigation
    ├── [← Back]
    ├── Step progress: "Step 2 of 4"
    └── [Next →] or [Submit] (final step)
```

**Rules:**
- Validate each step before allowing advancement
- Allow navigating back without losing data
- Save draft on each step advancement (server or localStorage)
- Final step shows a summary/review of all entered data
- Clearly indicate required fields on each step
- See the multi-page-form skill file for deeper patterns

### File Upload

Drag-and-drop file upload with progress and preview.

```
Upload states:
├── Empty                    # Drop zone with dashed border, icon, "Drag files here or click to browse"
├── Dragging over            # Border highlight, background change, "Drop files here"
├── Uploading                # File name, progress bar (%), cancel button
├── Complete                 # Thumbnail preview (images), file name, size, remove button
└── Error                    # Error message, retry button
```

**Rules:**
- Accept specific file types (validate on select AND on server)
- Show file size limits clearly ("Max 10MB per file")
- Multiple file upload: show each file's individual progress
- Image uploads: show thumbnail preview after upload
- Allow removing uploaded files before form submission
- Drag-and-drop AND click-to-browse — never just one
- Progress bar shows real upload progress (not a fake animation)

### Activity Log / Audit Trail

Chronological record of all actions performed in the system.

```
Activity log layout:
├── Filters
│   ├── User (dropdown)
│   ├── Action type (created, updated, deleted, signed in)
│   ├── Resource type (dropdown)
│   └── Date range
├── Log entries (most recent first)
│   ├── [Avatar] [User Name] [action] [resource] [resource name]
│   │   [Timestamp — relative: "2 hours ago" with absolute on hover]
│   ├── [Avatar] [User Name] updated [resource] [resource name]
│   │   Changed: [field]: [old value] → [new value]
│   └── ...
└── Pagination / infinite scroll
```

**Rules:**
- Log every create, update, delete, and auth event
- Show who performed the action, what changed, and when
- For updates: show which fields changed with old → new values
- Timestamp: relative by default ("3 min ago"), absolute on hover
- Activity log is read-only — no editing or deleting log entries
- Accessible to Admin role only (or Admin + Editor for their own actions)

### User Management

Invite, manage roles, and remove users.

```
User management screens:
├── User List (/settings/users)
│   ├── Table: Name, Email, Role, Status (active/invited/suspended), Last Active
│   ├── "Invite User" button
│   └── Row actions: Edit Role, Suspend, Remove
├── Invite User (modal or page)
│   ├── Email address input
│   ├── Role selector
│   └── Send Invite button
├── Edit User (/settings/users/[id])
│   ├── Name, email (read-only if SSO)
│   ├── Role selector
│   └── Danger zone: Suspend / Remove account
└── Pending Invitations
    ├── List of sent invitations
    └── Resend / Revoke actions
```

**Rules:**
- Users cannot change their own role
- Users cannot remove themselves
- Removing a user requires confirmation ("Type the user's email to confirm")
- Show "last active" to identify inactive accounts
- Invitation emails expire after [7/14/30] days — show expiration and resend option

### Stats Overview Dashboard

The landing page of the admin panel — a high-level overview.

```
Dashboard layout:
├── Stat Cards (top row, 3-5 cards)
│   ├── [Icon] [Metric Name]
│   │   [Large Number]
│   │   [+12% ↑ vs last period] or [-3% ↓ vs last period]
│   └── ...
├── Charts Section (middle)
│   ├── [Line/Bar Chart: primary metric over time]
│   └── [Secondary chart: breakdown or distribution]
├── Recent Activity (bottom left)
│   └── Last 5-10 activity log entries
└── Quick Actions (bottom right)
    └── Shortcuts to common tasks
```

**Rules:**
- Stat cards: show the most important 3-5 metrics at a glance
- Comparison: show change vs. previous period (percent + direction arrow)
- Green for positive change, red for negative (or reverse if the metric should decrease)
- Charts: keep it simple — one primary chart, one secondary. Not a BI dashboard.
- Recent activity: link to the full activity log
- Quick actions: "Create [resource]", "View pending [items]", etc.
- Data should load fast — use caching, show skeletons while loading

### Breadcrumb Navigation

Show the user's location in the hierarchy.

```
Format: [Section] / [Resource] / [Record Name] / [Action]
Examples:
  Dashboard
  Products / All Products
  Products / Blue Widget / Edit
  Settings / Users / Invite User
```

**Rules:**
- Every page has breadcrumbs (except Dashboard, which is the root)
- Each segment is a link (except the current page)
- Breadcrumbs appear above the page title
- Dynamic segments show the record name, not the ID
- Breadcrumbs match the URL path structure

### File Structure

```
[project-name]/
├── [config files]
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.[ext]
│   │   │   ├── TopBar.[ext]
│   │   │   ├── Breadcrumbs.[ext]
│   │   │   └── AdminLayout.[ext]
│   │   ├── data-table/
│   │   │   ├── DataTable.[ext]
│   │   │   ├── TableControls.[ext]
│   │   │   ├── BulkActions.[ext]
│   │   │   ├── Pagination.[ext]
│   │   │   └── ColumnToggle.[ext]
│   │   ├── forms/
│   │   │   ├── FormWizard.[ext]
│   │   │   ├── FileUpload.[ext]
│   │   │   └── [FieldComponents].[ext]
│   │   └── dashboard/
│   │       ├── StatCard.[ext]
│   │       └── [Charts].[ext]
│   ├── pages/ (or routes/)
│   │   ├── dashboard.[ext]
│   │   ├── [resource]/
│   │   │   ├── index.[ext]           # List view
│   │   │   ├── new.[ext]             # Create view
│   │   │   ├── [id].[ext]            # Detail view
│   │   │   └── [id]/edit.[ext]       # Edit view
│   │   ├── settings/
│   │   │   ├── index.[ext]
│   │   │   └── users.[ext]
│   │   └── activity.[ext]            # Activity log
│   ├── hooks/ (or composables/)
│   │   ├── useAuth.[ext]
│   │   ├── useDataTable.[ext]
│   │   └── useFileUpload.[ext]
│   ├── services/
│   │   ├── api.[ext]                 # API client
│   │   └── auth.[ext]                # Auth service
│   └── utils/
│       ├── permissions.[ext]         # Role-based permission helpers
│       └── formatters.[ext]          # Date, number, currency formatters
└── public/
    └── [assets]
```

### Naming Conventions

- **Pages/routes:** `kebab-case` — matches URL paths
- **Components:** `PascalCase` — `DataTable`, `FileUpload`, `StatCard`
- **Hooks/composables:** `camelCase` with `use` prefix — `useDataTable`, `useAuth`
- **API endpoints:** `/api/[resource]` (plural) — `/api/products`, `/api/users`
- **Permission checks:** `can[Action][Resource]` — `canEditProduct`, `canDeleteUser`

### Anti-Patterns — Do NOT

- Build a custom data table from scratch when a table library handles sorting, filtering, and pagination
- Show disabled buttons for unauthorized actions — hide them entirely
- Rely on client-side role checks alone — always enforce permissions on the server
- Use soft confirmation ("Are you sure?") for bulk delete — require typed confirmation for destructive bulk actions
- Navigate away from an unsaved form without warning
- Show raw IDs in the UI — display names, titles, or slugs
- Put all settings on one massive page — group into sections or tabs
- Skip empty states — every table and list needs a "nothing here" state with a CTA
- Forget loading states — data tables without skeletons feel broken
- Build a full BI dashboard — an admin overview shows 3-5 key metrics, not 20 charts
- Use infinite scroll for data tables — pagination is better for admin workflows (bookmarkable, countable)
- Forget to log destructive actions — audit trails are critical for admin tools
- Let admins delete their own account — prevent self-destructive actions
- Mix resource URLs across different patterns — consistency matters (`/products/123/edit`, not `/edit-product/123`)

## Resources Managed

1. **[Resource Name]** — [what it is, key fields]
2. **[Resource Name]** — [what it is, key fields]
3. **Users** — user management, roles, permissions

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- CRUD pattern for every resource: list → detail → create/edit
- Server-side pagination, sorting, and filtering for all tables
- Role-based access: Admin / Editor / Viewer
- All destructive actions require confirmation
- Activity log records every mutation

## Notes

[Any project-specific context]
