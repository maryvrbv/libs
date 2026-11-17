# [Project Name]

[Brief description of what this project does.]

---

## Capability: Empty States

This project handles every empty state with intention. An empty state is any screen, section, or component that displays when there is no data to show. Empty states are the most commonly skipped polish step — and one of the most impactful for user experience.

### The Empty State Pattern

Every empty state follows this structure:

```
[Icon or illustration]
[Headline — what the user is looking at]
[Description — context and guidance]
[Primary action — what to do next]
```

**Example implementation:**
```tsx
function EmptyState({
  icon,
  headline,
  description,
  action,
}: {
  icon: React.ReactNode;
  headline: string;
  description: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-headline">{headline}</h3>
      <p className="empty-state-description">{description}</p>
      {action && (
        <button className="empty-state-action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
```

**Styling:**
```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  min-height: 200px;
}

.empty-state-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: var(--color-text-tertiary);
  /* If using SVG icons, size to 48px and use muted color */
}

.empty-state-headline {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.empty-state-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  max-width: 360px;
  line-height: 1.5;
  margin-bottom: 24px;
}

.empty-state-action {
  /* Use your standard primary button styles */
}
```

### Tone and Copy

Empty state copy should be encouraging and helpful — never clinical or negative.

**Bad copy:**
```
"0 items found"
"No data"
"Nothing here"
"Empty"
"Error: no records match query"
```

**Good copy:**
```
"No projects yet" → "Create your first project to get started."
"No messages" → "Your inbox is empty. Start a conversation to see messages here."
"No results found" → "We couldn't find anything matching your search. Try different keywords or clear your filters."
"No team members" → "Invite your team to start collaborating."
```

**Rules for copy:**
- Lead with what the empty screen IS, not what it ISN'T. "Start your first project" not "You have no projects."
- The headline should name the thing that's missing. "No projects yet" immediately tells the user what this screen is for.
- The description should tell the user what to do or what will appear here. Context, not complaints.
- Use "yet" to imply this is temporary. "No notifications yet" feels different from "No notifications."
- Keep it concise. One short headline, one sentence of description. Don't write a paragraph.

### Types of Empty States

#### First-Time User (No Data Created Yet)

The user has never used this feature. This is your chance to onboard and excite.

```
Icon: [Feature-relevant icon]
Headline: "Create your first [thing]"
Description: "[Brief value proposition — what they'll get by creating one]"
Action: [Create / Get Started / Add First]
```

**Key difference:** First-time empty states should explain the value of the feature, not just that it's empty. The user doesn't know what this feature does yet.

```tsx
// First-time user: explain the value
<EmptyState
  icon={<ProjectIcon />}
  headline="Start your first project"
  description="Projects help you organize your work and track progress. Create one to get going."
  action={{ label: "Create Project", onClick: createProject }}
/>
```

#### Returning User (Data Was Deleted or Cleared)

The user has used this feature before but currently has no items.

```
Icon: [Feature-relevant icon]
Headline: "No [things] right now"
Description: "[Simple prompt to create more]"
Action: [Create New]
```

**Key difference:** Don't re-explain the feature. The user knows what it does. Keep it brief.

```tsx
// Returning user: keep it brief
<EmptyState
  icon={<ProjectIcon />}
  headline="No projects"
  description="Create a new project to get started again."
  action={{ label: "New Project", onClick: createProject }}
/>
```

#### Search With No Results

The user searched or filtered and nothing matched.

```
Icon: [Search/magnifying glass icon]
Headline: "No results found"
Description: "Try adjusting your search or filters."
Action: [Clear Search / Clear Filters]
```

**Rules:**
- Always show what the user searched for: "No results for 'design system'"
- Suggest alternatives: "Try a different keyword" or "Check your spelling"
- Provide a clear way to reset: "Clear filters" button
- If appropriate, suggest related items or popular items

```tsx
<EmptyState
  icon={<SearchIcon />}
  headline={`No results for "${query}"`}
  description="Try a different search term or remove some filters."
  action={{ label: "Clear Search", onClick: clearSearch }}
/>
```

#### Error States That Guide Recovery

Something went wrong while loading data.

```
Icon: [Warning/error icon — not scary, not red]
Headline: "Couldn't load [things]"
Description: "Something went wrong on our end. Give it another try."
Action: [Try Again]
```

**Rules:**
- Don't blame the user. "Something went wrong" not "You did something wrong."
- Always offer a retry action for network/server errors.
- Include a secondary path if retry might not work: "If this keeps happening, contact support."
- Don't show technical error details. Log them to the console; show human language to the user.

```tsx
<EmptyState
  icon={<AlertIcon />}
  headline="Couldn't load your projects"
  description="Something went wrong. Please try again."
  action={{ label: "Try Again", onClick: refetch }}
/>
```

#### Permission / Access Denied

The user doesn't have access to view this content.

```
Icon: [Lock icon]
Headline: "You don't have access"
Description: "Ask the owner to share this with you, or check that you're signed in with the right account."
Action: [Request Access / Go Back]
```

### Where Empty States Are Required

Add an empty state to every one of these:

- [ ] Lists (project lists, user lists, file lists)
- [ ] Tables (data tables, admin tables)
- [ ] Feeds (activity feeds, notification feeds, timelines)
- [ ] Search results
- [ ] Filtered views (when filters exclude all items)
- [ ] Dashboards (when there's no data to chart or summarize)
- [ ] Inbox / messages
- [ ] Media galleries (no images, no files)
- [ ] Comments sections
- [ ] Favorites / bookmarks / saved items
- [ ] Cart / checkout (empty cart)
- [ ] Tabs with no content in one or more tabs

### Anti-Patterns — Do NOT

- Show a completely blank area with no explanation
- Use only text ("No items") without structure (icon + headline + description + action)
- Use clinical language ("0 records returned", "Query returned no results")
- Use negative or discouraging language ("You haven't done anything yet")
- Show a generic error page when data is simply empty (empty is not an error)
- Forget the primary action — every empty state should tell the user what to do next
- Use the same empty state for first-time users and returning users — context matters
- Show a loading skeleton indefinitely when there's actually no data — transition to the empty state
- Put the empty state in a tiny container — give it space to breathe (min 200px height, centered)
- Use complex illustrations that slow page load — a simple icon is enough

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Every data-driven view has an empty state
- Empty states follow the icon + headline + description + action pattern
- Copy is encouraging and action-oriented

## Notes

[Any project-specific context.]
