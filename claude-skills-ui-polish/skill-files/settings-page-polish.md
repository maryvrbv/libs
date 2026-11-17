# [Project Name]

[Brief description of what this project does.]

---

## Capability: Settings Page Polish

This project has a settings page. Settings pages are where trust is built or broken. Users change sensitive information here — the UI must feel stable, predictable, and safe. Apply these rules to all settings UI generated or modified.

### Layout Structure

```
Container:    flex gap-12, p-6 to p-8
Sidebar nav:  w-[200px], sticky top-6, flex-col gap-1
Content area: flex-1, max-w-2xl
```

**Sidebar tabs:** text-sm font-medium, px-3 py-2 rounded-md. Default: text-muted-foreground. Active: bg-muted text-foreground font-semibold. Group related tabs with gap-6 + uppercase text-xs label.

Responsive: below 768px, sidebar becomes horizontal scrollable tabs at top (`overflow-x-auto scrollbar-hide`).

### Form Sections

```
Section:     py-8, border-b (last: no border)
Heading:     text-lg font-semibold
Description: text-sm text-muted-foreground, mt-1, max-w-lg
Fields:      mt-6, space-y-6
```

**Field layout (md+):** `grid grid-cols-3 gap-4` — label area col-span-1 (label + helper text), input area col-span-2. **Mobile:** stacked, full-width. Helper text goes below the input: text-sm text-muted-foreground.

### Save Pattern

Pick one. Never mix on the same page.

**Option A — Sticky footer:** sticky bottom-0, bg-background, border-t, py-4 px-6. Cancel (outline) + Save (primary, disabled until dirty). Only visible when form has unsaved changes. Slide-up animation 200ms. Intercept navigation with "Unsaved changes" confirmation dialog + beforeunload event.

**Option B — Auto-save:** Changes save on blur/toggle. Inline "Saved" confirmation (text-sm text-green-600 + check icon) next to field, fades after 2s. Text inputs debounce 500ms.

### Profile Section

```
Avatar:  80px circle, camera icon overlay on hover (absolute bottom-right, bg-background/80 rounded-full)
         Click opens file picker or crop modal
Fields:  name (required), email (required), username, bio (textarea with character count)
```

### Toggle Settings

```
Row:     flex justify-between items-start, py-4, border-b
Left:    label (text-sm font-medium) + description (text-sm text-muted-foreground mt-0.5)
Right:   switch component (bg-muted off, bg-primary on, 200ms transition)
```

Group related toggles under section headings. "Email Notifications" with toggles for marketing, updates, security.

### Danger Zone

```
Container: mt-12, border border-destructive/30, rounded-lg, p-6, bg-destructive/5
Heading:   text-lg font-semibold text-destructive
Actions:   space-y-4, each: flex justify-between — label + description left, destructive button right
```

Destructive actions always require a confirmation modal. Title explains the consequence, input requires typing account name or "DELETE" to enable the confirm button.

### Input Sizing

```
Text inputs:  w-full within col-span-2, h-10 (40px), border rounded-md
Selects:      same sizing as text inputs for visual consistency
Textarea:     min-h-[100px] resize-y, character count (text-xs text-muted-foreground) below, turns text-destructive near limit
Short values: use max-w-xs or max-w-sm for timezone, language, currency dropdowns
```

### Anti-Patterns — Do NOT

- Dump all settings into one page without sections or tabs.
- Use a save button that doesn't indicate unsaved changes.
- Mix auto-save and manual save on the same page.
- Allow destructive actions without confirmation modals.
- Hide the danger zone among other settings. Bottom, visually distinct.
- Use full-width inputs for short values (timezone, language). Match width to content.
- Forget mobile layout. Two-panel must collapse to stacked.
- Show success/error only as toasts. Confirm inline near the changed field.
- Skip the unsaved changes warning on navigation.
- Use placeholder text as labels. Labels stay visible above inputs.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Two-panel: vertical nav (200px) + content (max-w-2xl)
- Sections separated by border-bottom with py-8
- Label/input same row at md+ (1/3 + 2/3), stacked mobile
- One save pattern per page (sticky footer or auto-save)
- Danger zone at bottom with destructive styling and confirmation

## Notes

[Any project-specific context.]
