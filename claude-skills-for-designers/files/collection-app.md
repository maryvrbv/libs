# [Project Name]

[One-line description of what this collection app tracks or organizes — e.g., "A personal recipe manager for saving, tagging, and discovering meals."]

---

## Project Type: Collection App

This is a collection/catalog app where users collect, organize, and browse [items]. Think recipes, bookmarks, reading lists, plant trackers, wine logs — any "collect and organize things" pattern. The interface prioritizes browsing, quick capture, and flexible organization.

### Core Data Model

Every collection app has items. Items have metadata. The schema flexes per domain but follows this shape:

```ts
interface CollectionItem {
  id: string;
  title: string;
  description: string;
  image?: string;                 // URL or local path
  tags: string[];                 // Freeform tags for flexible grouping
  category: string;               // Primary category (single value)
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  sortOrder?: number;             // For custom ordering
  metadata: Record<string, any>;  // Domain-specific fields
}

// Example metadata for different domains:
// Recipe:    { servings: 4, prepTime: 15, cookTime: 30, ingredients: [], steps: [] }
// Bookmark:  { url: string, siteName: string, excerpt: string }
// Plant:     { species: string, waterFrequency: string, lastWatered: Date, location: string }
// Wine:      { varietal: string, region: string, vintage: number, rating: number, notes: string }
// Book:      { author: string, isbn: string, pageCount: number, status: "to-read" | "reading" | "finished" }
```

**Rules:**
- `title` and `createdAt` are always required. Everything else is optional.
- `tags` are user-created, freeform strings. Normalize to lowercase on save.
- `category` is a fixed set defined by the app (or user-configurable). Each item has one.
- `metadata` holds domain-specific fields. Keep this typed per project — `Record<string, any>` is the generic shape.

### App Structure

```
/                           # Home — item list/grid with search and filters
/item/[id]                  # Detail view for a single item
/item/new                   # Create new item
/item/[id]/edit             # Edit existing item
/tags                       # Browse all tags
/tags/[tag]                 # Items filtered by tag
/categories                 # Browse by category (optional)
/favorites                  # Favorited items
/settings                   # Import/export, preferences
```

### File Structure

```
[root]/
├── components/
│   ├── layout/
│   │   ├── app-shell.tsx           # Nav + main content wrapper
│   │   ├── navbar.tsx              # Top nav (logo, search, add button)
│   │   └── mobile-nav.tsx          # Bottom tab bar for mobile
│   ├── items/
│   │   ├── item-card.tsx           # Card component for grid view
│   │   ├── item-row.tsx            # Row component for list view
│   │   ├── item-grid.tsx           # Grid layout wrapper
│   │   ├── item-list.tsx           # List/table layout wrapper
│   │   ├── item-detail.tsx         # Full detail view
│   │   ├── item-form.tsx           # Create/edit form
│   │   └── image-upload.tsx        # Image picker/uploader
│   ├── browse/
│   │   ├── search-bar.tsx          # Search input with clear button
│   │   ├── filter-bar.tsx          # Active filters display + controls
│   │   ├── filter-panel.tsx        # Expanded filter options
│   │   ├── sort-select.tsx         # Sort dropdown
│   │   ├── view-toggle.tsx         # Grid/list view switcher
│   │   └── tag-cloud.tsx           # Tag display with counts
│   ├── ui/
│   │   ├── empty-state.tsx         # Empty state with CTA
│   │   ├── favorite-button.tsx     # Heart/star toggle
│   │   ├── tag-badge.tsx           # Individual tag pill
│   │   ├── tag-input.tsx           # Multi-tag input with autocomplete
│   │   ├── category-select.tsx     # Category picker
│   │   ├── confirm-dialog.tsx      # Delete confirmation
│   │   └── image-placeholder.tsx   # Placeholder when no image
│   └── onboarding/
│       └── first-item-prompt.tsx   # Empty collection welcome + CTA
├── hooks/
│   ├── use-items.ts                # CRUD operations for items
│   ├── use-search.ts               # Search and filter state
│   ├── use-tags.ts                 # Tag aggregation and management
│   └── use-view-preference.ts      # Grid/list toggle persistence
├── lib/
│   ├── storage.ts                  # Data persistence (localStorage, SQLite, API)
│   ├── search.ts                   # Search and filter logic
│   ├── import-export.ts            # JSON/CSV import and export
│   └── image.ts                    # Image upload, compression, storage
├── types/
│   └── item.ts                     # TypeScript types for collection items
└── pages/                          # Route pages composing above components
```

### List/Grid View Toggle

Users switch between grid (visual browsing) and list (dense scanning). Persist the preference.

```tsx
type ViewMode = "grid" | "list";

function ViewToggle({ view, onChange }: { view: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div role="radiogroup" aria-label="View mode">
      <button
        role="radio"
        aria-checked={view === "grid"}
        onClick={() => onChange("grid")}
        aria-label="Grid view"
      >
        <GridIcon />
      </button>
      <button
        role="radio"
        aria-checked={view === "list"}
        onClick={() => onChange("list")}
        aria-label="List view"
      >
        <ListIcon />
      </button>
    </div>
  );
}
```

**Grid view:**
- Cards with image thumbnail, title, category badge, favorite icon.
- 2 columns on mobile, 3 on tablet, 4 on desktop.
- Uniform card height. Crop images to a consistent aspect ratio (4:3 or 1:1).
- Cards link to the detail view.

**List view:**
- Rows with small thumbnail, title, category, tags, date.
- Full-width rows on all breakpoints.
- Sortable column headers on desktop. On mobile, use the sort dropdown instead.
- Rows link to the detail view.

### Detail View

The full view of a single item. All metadata is visible here.

**Structure:**
```
┌─────────────────────────────────┐
│ ← Back          [Edit] [Delete] │
├─────────────────────────────────┤
│ [Image — full width or hero]    │
│                                 │
│ Title                    [♡]    │
│ Category badge                  │
│ Tag1 · Tag2 · Tag3              │
│                                 │
│ Description text                │
│                                 │
│ ── Metadata ──                  │
│ [Domain-specific fields]        │
│                                 │
│ Added: Jan 15, 2025             │
│ Updated: Feb 3, 2025            │
└─────────────────────────────────┘
```

**Rules:**
- Back button returns to the previous list view, preserving scroll position and filters.
- Edit and delete actions in the top-right. Delete always requires confirmation.
- Clicking a tag navigates to the filtered list for that tag.
- If no image, hide the image area entirely — do not show a placeholder on the detail view.

### Create/Edit Form

A single form component handles both creation and editing.

```tsx
interface ItemFormProps {
  item?: CollectionItem;          // Undefined for create, populated for edit
  onSubmit: (data: ItemFormData) => void;
  onCancel: () => void;
}
```

**Form fields:**
```
Title*              [text input]
Description         [textarea — auto-resizing]
Image               [upload area — drag and drop or click to browse]
Category*           [select dropdown]
Tags                [tag input — type to add, autocomplete from existing tags]
[Domain fields]     [varies by project]
```

**Image upload:**
- Drag-and-drop zone with click fallback.
- Preview thumbnail after upload.
- Accept common formats: JPEG, PNG, WebP.
- Client-side compression before upload (target < 500KB).
- Remove button to clear the image.
- Show upload progress if uploading to a server.

```tsx
function ImageUpload({ value, onChange }: { value?: string; onChange: (url: string | null) => void }) {
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      role="button"
      aria-label="Upload image"
    >
      {value ? (
        <div className="relative">
          <img src={value} alt="Preview" />
          <button onClick={(e) => { e.stopPropagation(); onChange(null); }} aria-label="Remove image">
            <XIcon />
          </button>
        </div>
      ) : (
        <div className="placeholder">
          <UploadIcon />
          <p>Drop an image or click to browse</p>
        </div>
      )}
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileSelect} />
    </div>
  );
}
```

**Rules:**
- Validate required fields on submit, not on blur (less disruptive).
- Pre-fill tag autocomplete with existing tags from the collection.
- On mobile, the form should be full-screen (not a modal).
- After successful create, navigate to the detail view of the new item.
- After successful edit, navigate back to the detail view.

### Search and Filters

Search is the primary navigation pattern. Users will search more than they browse.

**Search:**
- Text search across title, description, and tags.
- Debounce input by 300ms before filtering.
- Show result count: "12 items" or "3 results for 'pasta'".
- Clear button (X) inside the input when there is text.

**Filters:**
- Category (single-select or multi-select dropdown).
- Tags (multi-select — show most-used tags first).
- Favorites only (toggle).
- Date range (added after / added before).
- Domain-specific filters (e.g., rating >= 4 for wine, status for books).

**Filter bar pattern:**
```
┌──────────────────────────────────────────────┐
│ [🔍 Search...]  [Category ▾] [Tags ▾] [♡]   │
│ Active: Italian × , Quick × , Favorites ×    │
└──────────────────────────────────────────────┘
```

- Show active filters as removable chips below the filter controls.
- "Clear all" link when any filters are active.
- Persist filter state in URL search params so filtered views are shareable and survive refresh.

```ts
// URL state for filters
// /items?q=pasta&category=italian&tags=quick,vegetarian&sort=newest&favorites=true

function useFilterParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  return {
    query: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? "",
    tags: searchParams.get("tags")?.split(",").filter(Boolean) ?? [],
    sort: (searchParams.get("sort") as SortOption) ?? "newest",
    favoritesOnly: searchParams.get("favorites") === "true",
  };
}
```

### Sort Options

```ts
type SortOption = "newest" | "oldest" | "alphabetical" | "recently-updated" | "custom";
```

- **Newest first** (default) — by `createdAt` descending.
- **Oldest first** — by `createdAt` ascending.
- **Alphabetical** — by `title` A-Z.
- **Recently updated** — by `updatedAt` descending.
- **Custom order** — user-defined drag-and-drop ordering (optional, advanced).

Custom order uses a `sortOrder` integer field. When reordering, update the `sortOrder` of affected items. Use fractional indexing or reindex the entire list.

### Favorites / Bookmarking

- Heart or star icon on every card, list row, and detail view.
- Tap to toggle. Optimistic update — change UI instantly, sync in background.
- Dedicated "Favorites" view showing only favorited items.
- Favorites filter as a toggle in the filter bar.

```tsx
function FavoriteButton({ isFavorite, onToggle }: { isFavorite: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
    >
      {isFavorite ? <HeartFilledIcon /> : <HeartOutlineIcon />}
    </button>
  );
}
```

### Tags and Categories System

**Tags** are freeform. Users create them inline while adding items. They enable flexible, cross-cutting organization.

- Store as lowercase strings. Trim whitespace.
- Autocomplete from existing tags when typing.
- Show tag counts on the tags browse page ("Italian (12)", "Quick (8)").
- Allow renaming and merging tags in settings.
- Deleting a tag removes it from all items (with confirmation).

**Categories** are a fixed set. Each item belongs to one category.

- Define categories in config or let users manage them in settings.
- Categories should have a name and optional color/icon.
- Use categories for top-level grouping, tags for fine-grained filtering.

```ts
interface Category {
  id: string;
  name: string;
  color?: string;      // For visual badge color
  icon?: string;       // Optional icon identifier
  itemCount: number;   // Computed — number of items in this category
}
```

### Import / Export

Users need to get their data in and out. Support JSON at minimum, CSV as a bonus.

```ts
// Export
function exportToJSON(items: CollectionItem[]): string {
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), items }, null, 2);
}

// Import
function importFromJSON(json: string): CollectionItem[] {
  const data = JSON.parse(json);
  // Validate shape, generate new IDs to avoid collisions, normalize tags
  return data.items.map(validateAndNormalize);
}
```

**Rules:**
- Export includes all items with full metadata.
- Import should validate data shape and skip malformed entries with a summary ("Imported 42 items, 3 skipped").
- Warn before import if it will overwrite existing data.
- Offer "Export All" and "Export Filtered" (current view).

### Empty States

Every empty view needs a helpful prompt.

**No items yet (first-time user):**
```
[Illustration or icon]
Start your collection
Add your first [item] to get started.
[+ Add First Item]
```

**No results (search/filter returned nothing):**
```
[Search icon]
No items match your filters
Try adjusting your search or removing some filters.
[Clear Filters]
```

**No favorites yet:**
```
[Heart icon]
No favorites yet
Tap the heart on any [item] to save it here.
[Browse Collection]
```

### Onboarding — First Item Prompt

When the collection is empty, guide the user to add their first item. Do not show the standard list/grid UI with an empty state tacked on. Show a dedicated onboarding screen.

**Structure:**
- Welcome headline: "Your [collection] starts here"
- Brief explanation: 1-2 sentences about what they can collect.
- Prominent CTA: "Add your first [item]"
- Optional: "Import existing data" link below.

After the first item is added, switch to the normal list/grid view. Never show this screen again (track with a flag or check item count).

### Offline Support Considerations

If the app should work offline (or has local-first storage):

- **Local storage:** Use IndexedDB (via Dexie or idb) for structured data. localStorage is too small for collections.
- **Images:** Store image blobs in IndexedDB or use the Cache API.
- **Sync:** If there is a server, implement optimistic local writes with background sync.
- **Conflict resolution:** Last-write-wins is simplest. Show conflicts to the user only if data integrity matters.
- **Offline indicator:** Show a subtle banner when offline: "You're offline — changes will sync when connected."

```ts
// Dexie example for IndexedDB
import Dexie from "dexie";

const db = new Dexie("[AppName]DB");
db.version(1).stores({
  items: "++id, title, category, *tags, isFavorite, createdAt, updatedAt",
});
```

### Responsive Layout

```
Mobile (< 640px):
  - 2-column card grid (or single column list)
  - Bottom tab nav (Home, Search, Add, Favorites, Settings)
  - Full-screen forms
  - Filter panel slides up from bottom as a sheet

Tablet (640-1024px):
  - 3-column card grid
  - Top navbar
  - Side filter panel (collapsible)
  - Forms in a centered panel

Desktop (> 1024px):
  - 4-column card grid (or full-width table in list view)
  - Top navbar
  - Persistent sidebar for filters (optional)
  - Forms in a centered panel with max-width
```

**Mobile-specific rules:**
- The "Add" button is always accessible — floating action button (FAB) or center tab bar item.
- Swipe actions on list rows (swipe right to favorite, swipe left to delete) — optional but natural.
- Image upload should trigger the native camera/gallery picker.
- Touch targets minimum 44x44px.
- Pull-to-refresh if data syncs with a server.

### Anti-Patterns — Do NOT

- Make search a separate page — search should be inline, always visible at the top
- Require a category or tags to create an item — keep creation friction low, let users organize later
- Show an empty grid/list with no guidance — always show an empty state with a CTA
- Paginate a personal collection — use infinite scroll or load all items (most personal collections are < 1000 items)
- Use modals for create/edit on mobile — use full-screen pages
- Reset scroll position when toggling between grid and list view
- Reset filters when navigating back from a detail view
- Allow duplicate tags ("Italian" and "italian") — normalize on save
- Delete items without confirmation — always confirm with the item title visible
- Store filter state only in component state — use URL params so filters survive refresh
- Force users through onboarding when they have existing data to import
- Compress images so aggressively they look bad — target reasonable quality (80%) at a useful size
- Build custom drag-and-drop reordering before shipping basic sort options — custom order is an advanced feature

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Items are the core data model — every feature connects back to items
- Search and filters are the primary navigation pattern
- URL params store filter and sort state
- Grid view is the default, list view is the alternative
- Favorites are a first-class concept, not an afterthought
- Tags are freeform and user-created, categories are fixed

## Notes

[Any project-specific context — what is being collected, domain-specific metadata fields, target platform.]
