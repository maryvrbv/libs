# [Project Name]

[One-line description of what this menu bar app does.]

---

## Project Type: macOS Menu Bar App

This is a macOS menu bar application built with SwiftUI. It lives in the system menu bar and provides quick access to [functionality] without a full app window. The interface is compact, responsive to system appearance, and follows macOS conventions.

### App Architecture

```
┌──────────────────────────────────────────────────┐
│ Menu Bar                                          │
│   ┌───┐                                          │
│   │ ◉ │ ← NSStatusItem (menu bar icon)           │
│   └─┬─┘                                          │
│     │                                             │
│     ▼                                             │
│   ┌─────────────────┐    ┌────────────────────┐  │
│   │ Popover / Menu  │    │ Detached Window    │  │
│   │ (primary UI)    │    │ (NSPanel, optional)│  │
│   └─────────────────┘    └────────────────────┘  │
│                                                   │
│   ┌─────────────────┐    ┌────────────────────┐  │
│   │ Settings Window │    │ Background Tasks   │  │
│   │ (Preferences)   │    │ (timers, sync)     │  │
│   └─────────────────┘    └────────────────────┘  │
└──────────────────────────────────────────────────┘
```

- **Menu bar icon** — always visible. Clicking opens the popover or menu.
- **Popover** — the main UI surface. Compact, disappears on click outside.
- **Menu** — alternative to popover for simpler apps. Native macOS dropdown menu.
- **Detached window** — optional. A floating panel for more complex views.
- **Settings window** — standard macOS preferences window.

### File Structure

```
[ProjectName]/
├── [ProjectName]App.swift          # App entry point with MenuBarExtra
├── Views/
│   ├── MenuBarView.swift           # Main popover/menu content
│   ├── SettingsView.swift          # Preferences window
│   ├── DetailView.swift            # Detached window content (if needed)
│   └── Components/
│       ├── StatusItemView.swift    # Custom menu bar icon rendering
│       ├── [Feature]View.swift     # Feature-specific views
│       └── ...
├── Models/
│   ├── AppState.swift              # App-wide observable state
│   └── [Model].swift               # Data models
├── Services/
│   ├── [Feature]Service.swift      # Business logic, API calls
│   └── KeyboardShortcuts.swift     # Global keyboard shortcut handling
├── Utilities/
│   ├── LaunchAtLogin.swift         # Launch at login integration
│   └── Defaults.swift              # UserDefaults keys and helpers
├── Resources/
│   ├── Assets.xcassets/
│   │   ├── AppIcon.appiconset/     # App icon
│   │   └── MenuBarIcon.imageset/   # Menu bar icon (template image)
│   └── [ProjectName].entitlements
└── Info.plist
```

### App Entry Point

Use `MenuBarExtra` (macOS 13+) for the simplest setup.

**Popover style (SwiftUI view in a popover):**
```swift
@main
struct [ProjectName]App: App {
    @StateObject private var appState = AppState()

    var body: some Scene {
        MenuBarExtra("[Tooltip Text]", systemImage: "[sf.symbol.name]") {
            MenuBarView()
                .environmentObject(appState)
        }
        .menuBarExtraStyle(.window)  // Popover with SwiftUI content

        Settings {
            SettingsView()
                .environmentObject(appState)
        }
    }
}
```

**Menu style (native dropdown menu):**
```swift
MenuBarExtra("[Tooltip Text]", systemImage: "[sf.symbol.name]") {
    Button("Action 1") { /* ... */ }
    Button("Action 2") { /* ... */ }
    Divider()
    Button("Settings...") {
        NSApp.sendAction(Selector(("showSettingsWindow:")), to: nil, from: nil)
    }
    Button("Quit") { NSApplication.shared.terminate(nil) }
}
.menuBarExtraStyle(.menu)  // Native macOS dropdown menu
```

**Choosing between Menu and Popover:**
| Use Menu when | Use Popover when |
|--------------|-----------------|
| Few simple actions (< 8 items) | Rich UI with inputs, lists, or custom layout |
| No custom UI needed | Interactive content (toggles, text fields, sliders) |
| Quick access to toggles and links | Displaying data (lists, stats, charts) |

### Menu Bar Icon

**SF Symbols (recommended):**
```swift
MenuBarExtra("Tooltip", systemImage: "square.and.arrow.up")
```

**Custom icon:**
- Provide a template image in the asset catalog (`MenuBarIcon.imageset`).
- Template images: single-color, macOS tints them to match the menu bar.
- Sizes: 18x18 @1x, 36x36 @2x (menu bar height is ~22pt, icon should be 18pt).
- Set "Render As: Template Image" in the asset catalog.

**Icon states:**
```swift
// Change icon based on app state
MenuBarExtra {
    MenuBarView()
} label: {
    Image(systemName: appState.isActive ? "[active.icon]" : "[inactive.icon]")
}
```

**Rules:**
- Keep the icon simple — it's tiny. Avoid detail.
- Use SF Symbols when possible for consistency with system icons.
- Template images adapt to light/dark menu bar and accessibility settings automatically.
- Do not use color in menu bar icons — they should be monochrome templates.

### Popover Sizing and Layout

**Size constraints:**
- Maximum practical width: ~300-350px (menu bar popover convention).
- Maximum practical height: ~500px (before it feels too tall).
- Minimum: ~200px wide x ~150px tall.
- Set a fixed width. Let height be determined by content (up to the max).

```swift
struct MenuBarView: View {
    var body: some View {
        VStack(spacing: 0) {
            // Header
            // Content
            // Footer
        }
        .frame(width: 300)
        .frame(maxHeight: 500)
    }
}
```

**Layout patterns:**

**Simple action panel:**
```
┌─────────────────────┐
│ [Title]        [⚙️]  │  Header
├─────────────────────┤
│                     │
│  [Primary content]  │  Content area
│                     │
├─────────────────────┤
│ [Action buttons]    │  Footer
└─────────────────────┘
```

**List view:**
```
┌─────────────────────┐
│ [Title]     [+ Add] │  Header
├─────────────────────┤
│ [Search...]         │  Search (optional)
├─────────────────────┤
│ ● Item 1        ✕  │
│ ● Item 2        ✕  │  Scrollable list
│ ● Item 3        ✕  │
│ ● Item 4        ✕  │
├─────────────────────┤
│ [Settings] [Quit]   │  Footer
└─────────────────────┘
```

**Status dashboard:**
```
┌─────────────────────┐
│ [Icon] [App Name]   │  Header
├─────────────────────┤
│ Status: Active      │
│ ████████░░ 78%      │  Status info
│ Last sync: 2m ago   │
├─────────────────────┤
│ [Sync Now]   [⚙️]   │  Actions
└─────────────────────┘
```

**Rules:**
- Keep the UI compact. Every pixel counts in a popover.
- Use dividers between header, content, and footer.
- Scrollable content in the middle — header and footer are fixed.
- No tab bars — too complex for a popover. Use a simple navigation stack or segmented control.

### Keyboard Shortcuts

**Global keyboard shortcuts** (work even when the app is not focused):

```swift
import KeyboardShortcuts

extension KeyboardShortcuts.Name {
    static let togglePopover = Self("togglePopover")
}

// In settings, let the user set their shortcut
KeyboardShortcuts.Recorder("Toggle Popover:", name: .togglePopover)

// Listen for the shortcut
KeyboardShortcuts.onKeyUp(for: .togglePopover) {
    togglePopover()
}
```

Use the [KeyboardShortcuts](https://github.com/sindresorhus/KeyboardShortcuts) package by Sindre Sorhus for a reliable, battle-tested implementation.

**In-app shortcuts** (within the popover or settings window):
```swift
Button("New Item") {
    createItem()
}
.keyboardShortcut("n", modifiers: .command)  // ⌘N
```

**Rules:**
- Always let the user customize global shortcuts — do not hardcode them.
- Show shortcuts in menu items and tooltips.
- Reserve standard shortcuts (⌘Q, ⌘,) for their standard functions (Quit, Settings).

### Launch at Login

Users expect menu bar apps to start on login.

**Using LaunchAtLogin package:**
```swift
import LaunchAtLogin

// In settings view
LaunchAtLogin.Toggle("Launch at Login")
```

Use the [LaunchAtLogin](https://github.com/sindresorhus/LaunchAtLogin) package. It handles the modern `SMAppService` API correctly.

**Rules:**
- Default: off. Let the user opt in from Settings.
- Show a toggle in the Settings window.
- Do not prompt on first launch — add it to settings and let users find it.

### System Appearance Detection

macOS menu bar apps must respect light/dark mode and accent colors.

**SwiftUI handles this automatically** when you use system colors:
```swift
Text("Hello")
    .foregroundColor(.primary)      // Adapts to light/dark
    .background(.background)         // System background

Text("Secondary")
    .foregroundColor(.secondary)     // Muted text, adapts automatically
```

**Detecting appearance changes:**
```swift
@Environment(\.colorScheme) var colorScheme

var body: some View {
    VStack {
        if colorScheme == .dark {
            // Dark-specific rendering
        }
    }
}
```

**Rules:**
- Use SwiftUI system colors (`.primary`, `.secondary`, `.background`, `.accentColor`).
- Do not hardcode colors. Test in both light and dark mode.
- Menu bar template images adapt automatically — no manual handling needed.
- Test with "Increase contrast" accessibility setting enabled.

### UserDefaults for Settings

Store user preferences in UserDefaults.

**Pattern with AppStorage:**
```swift
struct SettingsView: View {
    @AppStorage("refreshInterval") var refreshInterval: Int = 300
    @AppStorage("showNotifications") var showNotifications: Bool = true
    @AppStorage("selectedOption") var selectedOption: String = "default"

    var body: some View {
        Form {
            Picker("Refresh Interval", selection: $refreshInterval) {
                Text("1 minute").tag(60)
                Text("5 minutes").tag(300)
                Text("15 minutes").tag(900)
            }
            Toggle("Show Notifications", isOn: $showNotifications)
        }
        .formStyle(.grouped)
        .frame(width: 400)
    }
}
```

**Rules:**
- Use `@AppStorage` for simple types (String, Int, Bool, Double, Data, URL).
- For complex types, encode to JSON/Data and store as `Data`.
- Define default values at the `@AppStorage` declaration.
- Group related settings logically in the Settings view.

### NSPanel for Detached Windows

When the popover is too small for a feature (e.g., detailed view, editing), open a detached floating window.

```swift
class FloatingPanel: NSPanel {
    init(contentView: NSView) {
        super.init(
            contentRect: NSRect(x: 0, y: 0, width: 500, height: 400),
            styleMask: [.titled, .closable, .resizable, .nonactivatingPanel],
            backing: .buffered,
            defer: false
        )
        self.isFloatingPanel = true
        self.level = .floating
        self.contentView = contentView
        self.center()
        self.isMovableByWindowBackground = true
        self.titlebarAppearsTransparent = true
    }
}
```

**When to use NSPanel vs Popover:**
| Popover | NSPanel |
|---------|---------|
| Quick glance, status checks | Editing, detailed views |
| Single interaction then dismiss | Multi-step workflows |
| < 350px wide | > 350px or resizable |
| No text editing | Text editing, forms |

**Rules:**
- Use `.nonactivatingPanel` so the panel doesn't steal focus from other apps.
- Set `.floating` level so it stays above other windows.
- Allow close with Escape key.
- Remember window position and size in UserDefaults.

### Sparkle for Updates

Use [Sparkle](https://sparkle-project.org/) for automatic updates (for apps distributed outside the Mac App Store).

**Setup:**
1. Add Sparkle via SPM: `https://github.com/sparkle-project/Sparkle`
2. Host an appcast XML file at a stable URL.
3. Configure the `SUFeedURL` in Info.plist.

```swift
import Sparkle

// In settings
let updaterController = SPUStandardUpdaterController(startingUpdater: true, updaterDelegate: nil, userDriverDelegate: nil)

Button("Check for Updates...") {
    updaterController.updater.checkForUpdates()
}
```

**Rules:**
- Only needed for direct distribution (not Mac App Store — the store handles its own updates).
- Check for updates on launch (default Sparkle behavior) and provide a manual check button in Settings.
- Sign updates with EdDSA keys.
- Host the appcast over HTTPS.

### Settings Window

**Structure:**
```swift
Settings {
    TabView {
        GeneralSettingsView()
            .tabItem {
                Label("General", systemImage: "gear")
            }
        AppearanceSettingsView()
            .tabItem {
                Label("Appearance", systemImage: "paintbrush")
            }
        AboutView()
            .tabItem {
                Label("About", systemImage: "info.circle")
            }
    }
    .frame(width: 450, height: 300)
}
```

**Typical settings sections:**

**General:**
- Launch at Login toggle
- Global keyboard shortcut recorder
- Default behavior options
- Refresh/sync interval

**Appearance (if applicable):**
- Icon style
- Compact/comfortable density
- Custom accent color (if the app supports it)

**About:**
- App name and version
- Check for updates button (Sparkle)
- Links: website, support, changelog
- Acknowledgments

**Rules:**
- Use macOS standard Settings window (the `Settings` scene).
- Use `Form` with `.formStyle(.grouped)` for native macOS settings appearance.
- Tab bar at the top for multi-section settings.
- Fixed window size — settings should not need scrolling.

### Menu Bar App Conventions

**Quit option:** Always provide a way to quit. Either:
- "Quit [App Name]" in the menu (if using `.menu` style)
- Quit button in the popover footer or settings

```swift
Button("Quit [App Name]") {
    NSApplication.shared.terminate(nil)
}
.keyboardShortcut("q")
```

**No dock icon:** Menu bar apps typically hide the dock icon:
```
<!-- Info.plist -->
<key>LSUIElement</key>
<true/>
```

Or in the App struct:
```swift
@main
struct [ProjectName]App: App {
    init() {
        NSApp.setActivationPolicy(.accessory)  // No dock icon
    }
}
```

**Rules:**
- Menu bar apps should not appear in the Dock unless they also have a main window.
- Always provide Quit. Users must be able to close the app.
- Show a Settings option accessible from the popover/menu.
- The app should feel lightweight — no splash screens, no onboarding flows.

### Anti-Patterns — Do NOT

- Show a dock icon for a menu bar-only app — use `LSUIElement` or `.accessory` activation policy
- Make the popover wider than ~350px — it will feel awkward and oversized
- Use a full `NSWindow` when a popover is sufficient
- Hardcode colors — always use system semantic colors for light/dark adaptation
- Forget the Quit button — users will have no way to close the app
- Use a complex navigation hierarchy in a popover — keep it flat, one or two levels max
- Auto-launch at login by default without the user's consent
- Use colored menu bar icons — template images only
- Block the main thread with network calls or heavy computation — use async/await
- Open a new window for every action — reuse the popover and detached panel
- Skip supporting keyboard navigation and VoiceOver
- Use `Timer` for background tasks when the app is idle — use `DispatchSourceTimer` or Combine publishers
- Forget to handle the case where the popover opens near the screen edge (macOS handles this for `MenuBarExtra`, but custom implementations must account for it)
- Show alerts or modal sheets in the popover — there is not enough room. Use inline messages

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- SwiftUI for all UI
- `MenuBarExtra` with `.window` style for the popover
- `@AppStorage` for user preferences
- System colors and SF Symbols throughout
- No dock icon (LSUIElement = true)
- Settings accessible from the popover footer

## Notes

[Any project-specific context — API integrations, data sync approach, target macOS version.]
