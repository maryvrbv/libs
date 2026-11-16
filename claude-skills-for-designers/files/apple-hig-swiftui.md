# [Project Name]

[Brief description — what does this app do?]

---

## Tech Stack

- iOS [17+ / 18+] (SwiftUI)
- [macOS / iPadOS / watchOS — if applicable]
- No external dependencies — use built-in Apple frameworks
- [Data: SwiftData / Core Data / UserDefaults]
- [Networking: URLSession / none]

## Design System: Apple Human Interface Guidelines

This project follows Apple's Human Interface Guidelines (HIG). Use native SwiftUI components and patterns. The app should feel like it belongs on the platform — not like a web app wrapped in a native shell.

### Navigation Patterns

Choose ONE primary navigation pattern and stick with it:

- **Tab Bar** (`TabView`) — 3-5 top-level sections. Most common for iOS.
- **Sidebar** (`NavigationSplitView`) — for iPad/macOS or content-heavy apps.
- **Stack** (`NavigationStack`) — single-path flows (onboarding, settings, detail views).

Within any pattern, push detail views onto the stack:
```swift
NavigationStack {
    List(items) { item in
        NavigationLink(value: item) {
            ItemRow(item: item)
        }
    }
    .navigationDestination(for: Item.self) { item in
        ItemDetailView(item: item)
    }
    .navigationTitle("Items")
}
```

**Rules:**
- Always set `.navigationTitle()` on every screen
- Use `.navigationBarTitleDisplayMode(.large)` for top-level screens, `.inline` for detail views
- Never hide the back button
- Use `toolbar` for actions, not floating buttons

### Components

Use SwiftUI's built-in components. Do not rebuild what Apple provides.

**Lists & Data:**
- `List` — for scrollable data. Supports swipe actions, sections, selection.
- `Section` — group related rows. Use `header:` and `footer:` for context.
- `Form` — for settings and input screens. Automatically styles as grouped list.
- `Grid` / `LazyVGrid` / `LazyHGrid` — for grid layouts (photos, cards).
- `Table` — for macOS multi-column data.

**Input:**
- `TextField` — single-line text input. Always provide a prompt or label.
- `TextEditor` — multi-line text.
- `SecureField` — passwords.
- `Picker` — selection from options. Adapts style to context (wheel, menu, segmented).
- `DatePicker` — date/time selection.
- `Toggle` — on/off switches. Use in `Form` context.
- `Slider` — range selection.
- `Stepper` — increment/decrement.
- `ColorPicker` — color selection.

**Feedback & Overlay:**
- `.alert()` — critical information requiring acknowledgment.
- `.confirmationDialog()` — destructive action confirmation (replaces action sheets).
- `.sheet()` — modal presentations.
- `.fullScreenCover()` — full-screen modals (onboarding, media).
- `.popover()` — contextual info (primarily iPad/macOS).
- `ProgressView` — loading indicators (spinner or bar).

**Actions:**
- `Button` — primary actions. Use `.buttonStyle(.borderedProminent)` for primary, `.bordered` for secondary.
- `Menu` — contextual actions from a button.
- `ShareLink` — system share sheet.
- `EditButton` — toggles list edit mode.
- `Link` — opens URLs.

**Visual:**
- `Label` — icon + text pair. Use SF Symbols for the icon.
- `Image` / `AsyncImage` — images with automatic loading states.
- `Badge` — notification counts on tab items.
- `Gauge` — circular or linear progress indicators.
- `GroupBox` — visually grouped content (macOS style).

### SF Symbols

Always use SF Symbols for icons. Never bundle custom icon assets when an SF Symbol exists.

```swift
Label("Favorites", systemImage: "heart.fill")
Image(systemName: "gear")
```

**Conventions:**
- Use `.fill` variants for selected/active states, outline for inactive
- Match symbol weight to text weight: `.fontWeight(.medium)` text → `.medium` symbol
- Use `symbolRenderingMode(.hierarchical)` for subtle multi-color
- Use `symbolRenderingMode(.palette)` when you need specific color control
- Use `symbolEffect(.bounce)` for reactive animations

### Spacing & Layout

SwiftUI handles most spacing automatically. Trust the defaults.

- **Default list spacing:** Don't override — `List` handles insets
- **Custom padding:** `.padding()` (system default) or `.padding(.horizontal, 16)`
- **Stack spacing:** `VStack(spacing: 12)`, `HStack(spacing: 8)`
- **Section spacing:** Use `Section` in `List` / `Form` — spacing is automatic
- **Safe areas:** Never manually inset for notch/home indicator — SwiftUI handles it

**Grid items:** Use `columns: [GridItem(.adaptive(minimum: 160))]` for responsive grids.

Standard spacing values: 4, 8, 12, 16, 20, 24, 32. Stick to these.

### Color System

Use semantic colors from Apple's palette:

```swift
.foregroundStyle(.primary)        // Main text
.foregroundStyle(.secondary)      // Secondary text
.foregroundStyle(.tertiary)       // Disabled/hint text

.background(.background)          // Default page background
Color(.systemGroupedBackground)   // Grouped list background
Color(.secondarySystemGroupedBackground) // Card/row background

.tint(.blue)                      // Interactive elements
Color.accentColor                 // App-wide accent
```

**Rules:**
- Never hardcode colors (`Color.white`, `Color.black`, `Color(hex: "#333")`)
- Always use semantic colors — they adapt to light/dark mode automatically
- For brand color, set `AccentColor` in asset catalog
- Use `.tint()` to color interactive elements

### Typography

Use Apple's dynamic type system:

```swift
.font(.largeTitle)     // Screen titles (NavigationStack handles this)
.font(.title)          // Section headers
.font(.title2)         // Subsection headers
.font(.title3)         // Card titles
.font(.headline)       // Emphasized labels
.font(.body)           // Default body text
.font(.callout)        // Secondary body
.font(.subheadline)    // List subtitles
.font(.footnote)       // Captions, timestamps
.font(.caption)        // Smallest text
.font(.caption2)       // Legal, fine print
```

**Rules:**
- Never use custom font sizes (`.font(.system(size: 14))`) — use text styles
- Bold with `.fontWeight(.semibold)` or `.bold()`, not custom sizes
- Support Dynamic Type — never set a fixed frame height on text

### Dark Mode

SwiftUI handles this automatically if you use semantic colors. Verify by:
- Testing in both modes in previews
- Never using `Color.white` or `Color.black` for backgrounds or text
- Using `Color(.systemBackground)` not `Color.white`

### Accessibility

- Every interactive element needs a label — SwiftUI provides most automatically
- Use `.accessibilityLabel()` when the visual content isn't descriptive enough
- Group related elements with `.accessibilityElement(children: .combine)`
- Support Dynamic Type (automatic with text styles)
- Test with VoiceOver

### File Structure

```
[AppName]/
├── [AppName]App.swift          # App entry point, scene setup
├── Views/
│   ├── ContentView.swift       # Root view (tab bar or navigation)
│   ├── [Feature]View.swift     # Feature screens
│   └── Components/             # Reusable view components
├── Models/
│   └── [Model].swift           # Data models (SwiftData @Model)
├── ViewModels/                 # If using MVVM
│   └── [Feature]ViewModel.swift
├── Services/
│   └── [Service].swift         # Network, persistence, etc.
├── Extensions/
│   └── [Type]+Extensions.swift
└── Resources/
    └── Assets.xcassets         # App icon, accent color, images
```

### Naming Conventions

- **View files:** `[Feature]View.swift` — `PascalCase`
- **Models:** `[ModelName].swift` — singular noun
- **ViewModels:** `[Feature]ViewModel.swift`
- **Extensions:** `[Type]+[Purpose].swift` (e.g., `Date+Formatting.swift`)
- **Protocols:** Adjective or `-able` suffix (`Identifiable`, `Configurable`)
- **Boolean properties:** `is-` or `has-` prefix (`isLoading`, `hasUnreadMessages`)

### Anti-Patterns — Do NOT

- Use `UIKit` wrappers when a SwiftUI equivalent exists
- Build custom tab bars, navigation bars, or alert views
- Use `GeometryReader` for basic layout — it's a last resort
- Set fixed frame sizes on text or buttons (breaks Dynamic Type)
- Use `Color.white` / `Color.black` — use semantic colors
- Put business logic in views — extract to view models or services
- Create deeply nested view hierarchies — extract subviews
- Skip `.navigationTitle()` on any screen
- Use `.onAppear` for one-time setup — use `.task` instead
- Ignore the safe area with `.ignoresSafeArea()` unless intentional (e.g., background images)

## Screens

1. **[Screen Name]** — [what it shows]
2. **[Screen Name]** — [purpose]
3. **Settings** — [what's configurable]

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- SwiftUI-first, no UIKit unless absolutely necessary
- Prefer `@Observable` (iOS 17+) over `ObservableObject` + `@Published`
- Use `SwiftData` for persistence unless there's a reason not to
- Prefer `async/await` over Combine for async work
- Keep views declarative — logic goes in view models

## Notes

[Any project-specific context]
