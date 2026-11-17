# States and Edge Cases

Claude Code builds the happy path. You click a button, data appears, everything works. But real users don't live on the happy path. They open your app for the first time and see nothing. Their network drops mid-request. They paste 4,000 characters into a field meant for 100. They hit submit twice.

AI-generated UI ignores most of these scenarios because it was never asked about them. This is where the hackathon feel comes from — not the design itself, but the cracks that show the moment anything goes slightly wrong.

## The States AI Forgets

Every interactive element in your app has more states than "default" and "with data." Here's the full list.

**Empty.** The user has no data yet. No projects, no messages, no history. AI typically renders an empty container or the word "No data." That's a dead end. A good empty state tells the user what this area is for and gives them a clear action: "No projects yet. Create your first one." Include an icon, a short explanation, and a primary CTA. Empty states are onboarding in disguise.

**Loading.** Something is being fetched. Use skeleton screens when the layout is predictable — the user sees shapes that match the content about to appear, which feels faster than a spinner. Use spinners for actions where the layout isn't known or the wait is brief (under 1 second). Never show a blank screen while loading. Never show a layout shift when content arrives.

**Error.** Three types, each handled differently:
- *Inline validation* — show the error next to the field immediately. Red border, red text below the input, specific message ("Password must be at least 8 characters" not "Invalid input").
- *Toast notifications* — for action failures that aren't tied to a specific field. "Failed to save. Try again." Slide in from the top or bottom, auto-dismiss after 5 seconds, include a dismiss button.
- *Error pages* — for full-page failures (404, 500, broken routes). Give the user a way back. A link to home, a retry button, something.

**Success.** Confirm that the action worked. A toast, a checkmark, a state change on the button ("Saved" with a check icon that reverts after 2 seconds). AI usually does nothing after success, which leaves the user wondering if it worked.

**Disabled.** Reduced opacity (typically `opacity-50`), `pointer-events-none`, and `aria-disabled="true"`. All three. AI often just dims the color without removing pointer events, so users can still click a disabled button and nothing happens — which feels broken.

**Hover.** Every clickable element needs a visible hover state. Buttons should shift background color or brightness. Cards should lift slightly or show a border change. Links should underline or shift color. If the user can't tell something is interactive by hovering over it, it's not finished.

**Focus.** Tab through your entire app. Every focusable element needs a visible focus ring — a 2px outline offset from the element. This is critical for keyboard navigation and accessibility. AI almost always skips focus styles entirely.

**Active/Pressed.** Buttons should feel like they respond to a click — a subtle scale down (`scale-95` or `scale-98`) for 100ms gives tactile feedback.

## Edge Cases That Break Layouts

**Long text.** What happens when a username is 40 characters? When a title wraps to three lines? Use `truncate` (single line) or `line-clamp-2` (multi-line) and test with absurdly long strings.

**Missing images.** If an avatar or thumbnail fails to load, show a fallback. A colored circle with initials for avatars, a placeholder icon for content images. Never show a broken image icon.

**Zero results.** Different from empty state — the user searched or filtered and nothing matched. "No results for 'xyz'. Try a different search." Include a suggestion to clear filters.

**First-time user.** The app with no configuration done. Are defaults sensible? Is the user dropped into a blank dashboard with no guidance? Walk them through it.

## Prompts That Work

To add missing states across the app:

```
Audit every data-dependent component in the app. For each one, add:
1. Empty state — helpful message + icon + CTA to create/add
2. Loading state — skeleton screen that matches the content layout
3. Error state — inline error message with option to retry

Use consistent patterns: all empty states should use the same layout (centered icon, heading, description, CTA button). All skeletons should use the same animation (pulse).
```

To add hover and focus states:

```
Add hover and focus styles to every interactive element:
- Buttons: darken background 10% on hover, visible focus ring (2px ring offset-2)
- Cards: subtle shadow lift or border change on hover
- Links: underline on hover
- Inputs: ring on focus
- All focusable elements must have a visible focus indicator for keyboard navigation
```

To handle edge cases:

```
Add defensive UI for text overflow and missing assets:
- All user-generated text should truncate with ellipsis if it exceeds its container
- All images should have fallback states (placeholder icon or initials for avatars)
- Add a "no results" state for every list that can be filtered or searched
```

The difference between "it works" and "it's finished" is entirely in these states. Every empty screen, every missing hover style, every silent error is a crack in the illusion. Close them all.
