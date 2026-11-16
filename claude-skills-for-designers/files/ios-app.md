# [Project Name]

[Brief description — what does this app do?]

---

## Tech Stack

- iOS [17+ / 18+] (SwiftUI)
- [Design System: Apple HIG / custom design system file]
- [Data: SwiftData / Core Data / UserDefaults]
- [Auth: Sign in with Apple / Firebase Auth / none]
- [Backend: CloudKit / Firebase / Supabase / none]

## Project Type: iOS App

This is a full iOS application. It uses tab-based navigation, standard iOS patterns (onboarding, settings, search, sheets), and follows platform conventions for persistence, notifications, widgets, and App Store distribution.

Pair this file with a design system file (e.g., Apple HIG + SwiftUI) for component-level guidance.

### App Architecture

Use a clear separation of concerns:

- **Views** — declarative UI only. No business logic, no networking.
- **ViewModels** — state management, data transformation, user action handling.
- **Models** — data structures and persistence schema.
- **Services** — networking, persistence, notifications, analytics.
- **Router/Coordinator** — navigation logic (if complex).

```
[AppName]/
├── [AppName]App.swift              # Entry point, scene configuration
├── Navigation/
│   ├── AppTabView.swift            # Root tab bar
│   └── Router.swift                # Navigation state (if using coordinator)
├── Features/
│   ├── [Feature]/
│   │   ├── [Feature]View.swift
│   │   ├── [Feature]ViewModel.swift
│   │   └── Components/
│   ├── Onboarding/
│   │   ├── OnboardingView.swift
│   │   ├── OnboardingPageView.swift
│   │   └── OnboardingViewModel.swift
│   ├── Settings/
│   │   └── SettingsView.swift
│   └── Search/
│       ├── SearchView.swift
│       └── SearchViewModel.swift
├── Models/
│   └── [Model].swift
├── Services/
│   ├── DataService.swift
│   ├── NotificationService.swift
│   └── [Service].swift
├── Extensions/
│   └── [Type]+Extensions.swift
├── Widgets/
│   └── [AppName]Widget.swift
└── Resources/
    ├── Assets.xcassets
    ├── Localizable.xcstrings
    └── Info.plist
```

### Tab-Based Navigation

The root of the app is a tab bar with 3-5 sections. Each tab owns its own navigation stack.

```
Tabs:
├── [Tab 1: Primary content]        # e.g., Home, Feed, Dashboard
├── [Tab 2: Discovery/Browse]       # e.g., Search, Explore, Browse
├── [Tab 3: Create/Action]          # e.g., Add, Compose (optional)
├── [Tab 4: Activity]               # e.g., Notifications, Activity
└── [Tab 5: Profile/Settings]       # e.g., Profile, Account
```

**Rules:**
- Each tab has its own `NavigationStack` — they maintain independent history
- Use SF Symbols for tab icons — `.fill` variant for selected state
- Badge counts on tabs for unread items (`.badge(count)`)
- Never nest a `TabView` inside another `TabView`
- Preserve scroll position and state when switching tabs
- 3 tabs minimum, 5 tabs maximum — use "More" pattern if you need 6+

### Onboarding Flow

First-launch onboarding with 3-5 screens, presented as a full-screen cover.

```
Flow:
[Page 1: Value Proposition] → [Page 2: Key Feature] → [Page 3: Key Feature] → [Page 4: Permissions] → [Page 5: Get Started]
```

**Structure per screen:**
- Hero illustration or icon (top 40% of screen)
- Headline (1 line, large title)
- Subtext (2-3 lines, body text)
- Page indicator dots
- "Continue" button (primary, bottom-anchored)
- "Skip" button (text-only, top-right) — skips to final screen

**Rules:**
- Track completion with `@AppStorage("hasCompletedOnboarding")`
- Present with `.fullScreenCover()` — not `.sheet()`
- Page indicator shows current position
- Swipe gesture between pages (horizontal paging)
- Request permissions (notifications, location) on a dedicated screen, not inline
- Skip button always visible — never force users through every screen
- Final screen has a distinct CTA: "Get Started" not "Continue"

### Settings Screen

Form-based settings using grouped sections.

```
Sections:
├── Account
│   ├── Profile (NavigationLink → detail)
│   ├── Subscription (NavigationLink → detail)
│   └── Sign Out (destructive button)
├── Preferences
│   ├── [App Icon] (picker)
│   ├── [Notifications] (toggle)
│   ├── [Theme] (picker: system / light / dark)
│   └── [Units / Language] (picker)
├── Support
│   ├── Help Center (link)
│   ├── Contact Us (link / email)
│   └── Rate on App Store (link)
├── Legal
│   ├── Privacy Policy (link)
│   └── Terms of Service (link)
└── Footer
    └── App version + build number (caption text, centered)
```

**Rules:**
- Use `Form` container — it automatically applies grouped styling
- Use `Section` with headers for grouping
- Toggles for on/off preferences, `Picker` for multiple options
- NavigationLinks for detail screens (profile editing, subscription management)
- Destructive actions (sign out, delete account) use `.foregroundColor(.red)` and require confirmation

### Pull-to-Refresh Lists

Any scrollable list with server-backed data supports pull-to-refresh.

**Pattern:**
- `.refreshable { }` modifier on the list
- Async data fetch inside the closure
- Loading state: system pull-to-refresh spinner (do not customize)
- Empty state: centered message + illustration when list is empty
- Error state: inline error message with retry button

**Rules:**
- Always show cached/local data immediately, refresh in background
- Animate list updates (insert, delete, move)
- Use `.searchable()` on lists that need filtering
- Pagination: load more items as user scrolls near bottom (`.onAppear` on last item)

### Search

Full search experience with suggestions and recent searches.

```
States:
├── Idle                    # Search bar visible but inactive
├── Active (empty)          # Keyboard open, show recent searches + suggestions
├── Active (typing)         # Show filtered suggestions as user types
├── Results                 # Show search results
└── No Results              # Empty state with message
```

**Structure:**
- `.searchable()` modifier on the `NavigationStack`
- `.searchSuggestions { }` for typeahead suggestions
- Recent searches stored locally (`UserDefaults` or `SwiftData`)
- Clear individual recent items (swipe to delete) and "Clear All" button
- Debounce search input (300ms) before hitting the server
- Cancel button dismisses search and restores previous state

### Sheet Presentations

Two sheet sizes for different content types:

**Half-height sheet (`.presentationDetents([.medium])`):**
- Quick actions, confirmations, short forms
- User can drag to dismiss
- Content should fit without scrolling

**Full sheet (`.presentationDetents([.large])` or `.fullScreenCover()`):**
- Complex forms, multi-step flows, content creation
- Include explicit close/done button — do not rely on drag-to-dismiss alone
- Use `.interactiveDismissDisabled()` when the user has unsaved changes

**Rules:**
- Sheets for creation/editing, `NavigationLink` for browsing/drilling down
- Always include a way to dismiss (close button or done button)
- Use `.presentationDragIndicator(.visible)` for draggable sheets
- Confirm before dismissing if there are unsaved changes

### Haptic Feedback

Trigger haptics on key user actions to reinforce interactions.

| Action | Haptic Type |
|--------|-------------|
| Button tap (primary action) | `.impact(.medium)` |
| Toggle switch | `.impact(.light)` |
| Success (save, send) | `.notification(.success)` |
| Error (validation fail) | `.notification(.error)` |
| Destructive action confirmed | `.notification(.warning)` |
| Selection change (picker, segment) | `.selection()` |
| Pull-to-refresh trigger | `.impact(.rigid)` |
| Long press recognized | `.impact(.heavy)` |

**Rules:**
- Use `UIImpactFeedbackGenerator`, `UINotificationFeedbackGenerator`, `UISelectionFeedbackGenerator`
- Prepare the generator before triggering (`.prepare()`) for zero-latency response
- Never use haptics on passive events (scrolling, loading, navigation)
- Respect system haptic settings — the system handles this automatically

### Widget Extensions (WidgetKit)

Glanceable widgets for the home screen and lock screen.

**Supported families:**
- `.systemSmall` — single tap target, minimal info
- `.systemMedium` — 2-3 pieces of info or a compact list
- `.systemLarge` — detailed view, small table, or expanded content
- `.accessoryCircular` / `.accessoryRectangular` / `.accessoryInline` — lock screen

**Structure:**
```
Widget/
├── [AppName]Widget.swift         # Widget definition + timeline provider
├── [AppName]WidgetBundle.swift   # Bundle if multiple widgets
├── Views/
│   ├── SmallWidgetView.swift
│   ├── MediumWidgetView.swift
│   └── LargeWidgetView.swift
└── Intent/
    └── [AppName]WidgetIntent.swift  # Configuration intent (if configurable)
```

**Rules:**
- Widgets are read-only — they display data, not interactive UI
- Use `TimelineProvider` to schedule updates (do not update too frequently)
- Deep link from widget tap to the relevant screen in the app
- Support multiple size families — each size has its own layout
- Use `containerBackground()` for widget background
- Keep data fetching minimal — widgets have a limited execution budget

### Data Persistence (SwiftData)

```swift
@Model
class [ModelName] {
    var [property]: [Type]
    var [property]: [Type]
    var [timestamp]: Date

    init([params]) { ... }
}
```

**Patterns:**
- `@Query` in views to fetch and observe data
- `@Environment(\.modelContext)` for insert/delete operations
- Sort and filter with `#Predicate` and `SortDescriptor`
- Use `@Relationship` for model associations
- Lightweight migrations happen automatically for additive changes

**Rules:**
- Define models in the `Models/` directory
- Register the model container on the `WindowGroup` or `App`
- Never access `modelContext` from a background thread without `ModelActor`
- Use `@Transient` for computed/non-persisted properties
- Test with in-memory containers for previews and unit tests

### Notification Handling

**Setup:**
1. Request permission on a dedicated onboarding screen (explain value before asking)
2. Register for remote notifications in `AppDelegate` or app entry point
3. Handle incoming notifications in foreground and background

**Patterns:**
- Local notifications: `UNUserNotificationCenter` for scheduled/triggered alerts
- Remote notifications: APNs via server or Firebase Cloud Messaging
- Foreground handling: show in-app banner (not system notification)
- Notification actions: define categories with custom buttons
- Deep link from notification tap to relevant content

**Rules:**
- Never request notification permission on first launch without context
- Provide granular notification preferences in settings (not just on/off)
- Store device token securely and send to your backend
- Handle the "denied" state gracefully — show settings prompt

### Deep Linking

Support URL-based navigation into specific screens.

```
URL scheme:  [appname]://[path]
Universal:   https://[domain]/[path]

Routes:
├── /[feature]/[id]           # Detail view
├── /[tab]                    # Switch to tab
├── /settings                 # Open settings
└── /[action]?[params]        # Trigger an action
```

**Rules:**
- Parse URLs in `.onOpenURL { url in }` modifier
- Map URL paths to navigation state
- Validate all parameters — never crash on malformed URLs
- Support both custom URL schemes and Universal Links
- Test every deep link route manually

### App Store Metadata

**Screenshots:**
- 6.7" (iPhone 15 Pro Max) and 6.1" (iPhone 15 Pro) are required
- 5-10 screenshots per device size
- First 3 screenshots are most important (visible without scrolling)
- Each screenshot: one feature, one clear headline, minimal text
- Show real app UI, not mockups — with status bar and clean data

**Description:**
- First line = hook (this shows before "more")
- Short paragraphs, benefit-driven
- Feature list with outcomes, not just feature names
- Keywords in natural language (Apple indexes the description)

**Keywords field:**
- 100 character limit, comma-separated
- Do not duplicate words from the app name or subtitle
- Use singular forms (Apple matches plurals automatically)
- No spaces after commas to maximize characters

**Rules:**
- App name: 30 character limit
- Subtitle: 30 character limit — use for key value proposition
- Update screenshots and description with every major release
- A/B test screenshots using App Store Connect product page optimization

### Anti-Patterns — Do NOT

- Use more than 5 tabs — it crowds the tab bar and breaks usability
- Skip onboarding tracking — users will see it every launch
- Put settings in a modal/sheet — settings should push onto a navigation stack
- Overuse haptics — every tap does not need feedback
- Build custom pull-to-refresh — use `.refreshable` modifier
- Block the UI during network requests — always show cached data first
- Request all permissions at once on first launch — ask in context
- Forget empty states — every list needs a "nothing here yet" view
- Ignore the keyboard — forms must scroll to keep the active field visible
- Use `.onAppear` for async work — use `.task` (it cancels automatically)
- Hardcode strings — use `String(localized:)` for localization readiness
- Skip deep link validation — malformed URLs should fail silently, not crash
- Build widget UI that looks different from the app — match the app's visual style
- Store sensitive data in `UserDefaults` — use Keychain for tokens and credentials
- Ship without testing on a real device — simulators miss haptics, performance, and camera

## Screens

1. **[Screen Name]** — [what it shows]
2. **[Screen Name]** — [purpose]
3. **Settings** — [what's configurable]

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Feature-based file organization (`Features/[Feature]/`)
- ViewModels for state management — views stay declarative
- SwiftData for persistence, `@Query` for observation
- `async/await` for all asynchronous work
- SF Symbols for all icons
- Semantic colors only — no hardcoded color values

## Notes

[Any project-specific context]
