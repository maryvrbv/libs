# [Project Name]

[Brief description — what does this desktop app do?]

---

## Tech Stack

- Electron [latest]
- [Renderer Framework: React / Vue / Svelte / vanilla]
- [Design System: file reference]
- [Build: electron-builder / electron-forge]
- [Auto-update: electron-updater]
- Platforms: [macOS / Windows / Linux]

## Project Type: Electron Desktop App

This is a cross-platform desktop application built with Electron. It runs a Chromium renderer for the UI and a Node.js main process for system access. The architecture enforces strict separation between the main process (system access, window management) and renderer process (UI).

Pair this file with a design system file for component-level guidance.

### Process Architecture

Electron runs two process types. Never blur the boundary between them.

**Main Process** — one per app, full Node.js access:
- Creates and manages `BrowserWindow` instances
- Accesses the file system, OS APIs, native menus, tray, dialogs
- Handles app lifecycle (ready, quit, activate)
- Communicates with renderers via IPC

**Renderer Process** — one per window, sandboxed browser context:
- Renders the UI (HTML, CSS, JavaScript / framework)
- No direct access to Node.js APIs or file system
- Communicates with main process via preload-exposed APIs
- Treat it exactly like a web page with extra capabilities

**Preload Script** — the secure bridge:
- Runs in renderer context but has limited Node.js access
- Exposes specific APIs to the renderer via `contextBridge`
- The ONLY way the renderer should talk to the main process

```
┌─────────────────────────────────────────────┐
│ Main Process (Node.js)                      │
│  ├── Window management                      │
│  ├── Native menus & tray                    │
│  ├── File system access                     │
│  ├── Auto-updater                           │
│  └── IPC handlers (ipcMain.handle)          │
└──────────────┬──────────────────────────────┘
               │ IPC (invoke / handle)
┌──────────────┴──────────────────────────────┐
│ Preload Script (contextBridge)              │
│  └── window.electronAPI.methodName()        │
└──────────────┬──────────────────────────────┘
               │ Exposed API
┌──────────────┴──────────────────────────────┐
│ Renderer Process (Chromium)                 │
│  ├── UI framework (React / Vue / etc.)      │
│  └── Calls window.electronAPI methods       │
└─────────────────────────────────────────────┘
```

### IPC Communication

All communication between main and renderer goes through IPC. Use the invoke/handle pattern for request-response, and send/on for one-way messages.

**Request-Response (renderer → main → renderer):**
```
Renderer:    window.electronAPI.readFile(path)          // Returns a promise
Preload:     contextBridge exposes readFile via ipcRenderer.invoke
Main:        ipcMain.handle('read-file', handler)       // Returns result
```

**One-Way (main → renderer):**
```
Main:        mainWindow.webContents.send('update-available', info)
Preload:     ipcRenderer.on('update-available', callback)
Renderer:    window.electronAPI.onUpdateAvailable(callback)
```

**Rules:**
- Always use `contextBridge.exposeInMainWorld()` to expose APIs — never expose `ipcRenderer` directly
- Channel names should be descriptive: `'dialog:open-file'`, `'app:get-version'`
- Validate all data received via IPC on both sides
- Never pass entire Node.js modules or large objects through IPC
- Use `ipcMain.handle` (async, returns result) over `ipcMain.on` (fire-and-forget) when the renderer needs a response

### Security Configuration

Non-negotiable security settings for every Electron app:

```
BrowserWindow config:
├── webPreferences.nodeIntegration: false        # NEVER enable
├── webPreferences.contextIsolation: true        # NEVER disable
├── webPreferences.sandbox: true                 # Enable sandboxing
├── webPreferences.preload: path/to/preload.js   # Always use preload
└── webPreferences.webSecurity: true             # NEVER disable
```

**Rules:**
- `nodeIntegration: false` — renderer must NOT have Node.js access
- `contextIsolation: true` — preload scripts run in isolated context
- Never use `remote` module — it was removed for security reasons
- Never load remote URLs in `BrowserWindow` without validating the origin
- Set a strict Content Security Policy (CSP) in the HTML
- Never use `shell.openExternal()` with unvalidated URLs

### BrowserWindow Configuration

```
Window options:
├── width / height                 # Default window size
├── minWidth / minHeight           # Minimum resize dimensions
├── title                          # Window title (shown in title bar)
├── icon                           # App icon (platform-specific paths)
├── show: false                    # Hide until ready-to-show (prevents flash)
├── backgroundColor                # Background color while loading
└── webPreferences                 # Security settings (see above)
```

**Show when ready pattern:**
- Create window with `show: false`
- Listen for `ready-to-show` event
- Call `win.show()` — prevents the white flash on launch

### Frameless Window with Custom Titlebar

Replace the native title bar with a custom one for a branded look.

```
Window: frame: false (or titleBarStyle: 'hidden' on macOS)

Custom titlebar structure:
├── Drag region (CSS: -webkit-app-region: drag)
│   ├── [macOS] Traffic light space (left padding ~70px)
│   ├── App title / logo (centered or left-aligned)
│   └── [Windows/Linux] Window controls (minimize, maximize, close)
└── Non-drag interactive elements: -webkit-app-region: no-drag
```

**macOS traffic lights:**
- Use `titleBarStyle: 'hiddenInset'` to keep native traffic lights
- Set `trafficLightPosition: { x: [n], y: [n] }` to reposition them
- Traffic lights appear automatically — do not rebuild them

**Windows/Linux window controls:**
- Build custom minimize, maximize, close buttons
- Wire them to `ipcRenderer.invoke('window:minimize')` etc.
- Match platform conventions: minimize-maximize-close order on Windows

**Rules:**
- Always keep a drag region so users can move the window
- Interactive elements (buttons, inputs) inside the titlebar must be `no-drag`
- Double-click on drag region should maximize/restore (macOS convention)
- Test on all target platforms — titlebar behavior differs significantly

### Native Menus

Application menu bar (macOS) and window menus (Windows/Linux).

```
Menu structure:
├── [App Name]  (macOS only)
│   ├── About [App Name]
│   ├── Preferences... (Cmd+,)
│   ├── Separator
│   └── Quit (Cmd+Q)
├── File
│   ├── New (Cmd+N)
│   ├── Open... (Cmd+O)
│   ├── Save (Cmd+S)
│   └── Close Window (Cmd+W)
├── Edit
│   ├── Undo / Redo
│   ├── Cut / Copy / Paste / Select All
│   └── [App-specific edit actions]
├── View
│   ├── Reload (Cmd+R)  — dev only
│   ├── Toggle DevTools  — dev only
│   ├── Zoom In / Out / Reset
│   └── Toggle Full Screen
├── Window
│   ├── Minimize
│   └── Zoom
└── Help
    ├── Documentation
    └── Report Issue
```

**Rules:**
- Build menus in the main process with `Menu.buildFromTemplate()`
- Use standard keyboard shortcuts (Cmd on macOS, Ctrl on Windows/Linux)
- Use `role` property for standard actions (copy, paste, quit) — Electron handles them
- Disable menu items when actions are not available (e.g., Save when no unsaved changes)
- macOS requires the first menu to be the app name menu

### Tray Icon

System tray (Windows/Linux) or menu bar (macOS) icon with context menu.

**Structure:**
- Icon: 16x16 (standard) and 32x32 (@2x) PNG, template image on macOS
- Context menu: quick actions, status info, quit
- Click behavior: show/focus the main window
- Tooltip: app name or status text

**Rules:**
- Use template images on macOS (monochrome, system adapts for dark/light)
- Tray should persist when all windows are closed (if the app runs in background)
- Update tray icon to reflect state (e.g., syncing, error, notifications)
- Keep the context menu short — 5-8 items maximum

### Auto-Updater (electron-updater)

Automatic updates with user notification and consent.

```
Update flow:
├── App launches → check for update (background)
├── Update available → notify user (non-blocking)
├── User accepts → download in background
├── Download complete → prompt to restart
└── User restarts → install and relaunch
```

**Rules:**
- Never force-install an update without user consent
- Show download progress if the update is large
- Check for updates on launch and on a periodic interval (e.g., every 4 hours)
- Sign your app — auto-update requires code signing on macOS and Windows
- Test the update flow end-to-end before shipping — broken updates brick the app

### Window Management

Remember window position and size between sessions.

**Pattern:**
- On window move/resize → save bounds to `electron-store` or a JSON file
- On app launch → restore saved bounds
- Validate saved bounds are still on a visible display (user may have disconnected a monitor)
- Fall back to default centered position if saved bounds are invalid

**Multi-window:**
- Track all open windows in an array/map in the main process
- Clean up references when windows close
- Focus existing window instead of creating a duplicate (e.g., settings window)

### File System Access

All file operations go through the main process. The renderer requests via IPC.

**Dialog patterns:**
- `dialog.showOpenDialog()` — file/folder picker (with filters for file types)
- `dialog.showSaveDialog()` — save-as dialog
- `dialog.showMessageBox()` — native confirmation/alert dialogs

**Rules:**
- Always use dialogs for file selection — never accept raw file paths from the renderer
- Filter file types in the dialog options (`filters: [{ name: 'Images', extensions: ['png', 'jpg'] }]`)
- Handle cancellation (user closes dialog without selecting)
- Use `app.getPath('userData')` for app-specific storage, not hardcoded paths
- Read/write files in the main process, return results via IPC

### Dock / Taskbar Integration

**macOS Dock:**
- Badge count: `app.dock.setBadge('3')` for unread counts
- Bounce: `app.dock.bounce()` to get attention (once or continuous)
- Custom dock menu: right-click actions

**Windows Taskbar:**
- Progress bar: `win.setProgressBar(0.5)` for ongoing operations
- Overlay icon: `win.setOverlayIcon(icon, 'description')` for status
- Thumbnail toolbar buttons for quick actions

**Rules:**
- Use platform-appropriate APIs — check `process.platform` before calling
- Clear badges/progress when the relevant action is complete
- Do not bounce the dock continuously — it annoys users

### Packaging (electron-builder)

```
Build configuration:
├── appId: "com.[org].[appname]"
├── productName: "[App Name]"
├── directories.output: "dist"
├── mac:
│   ├── target: ["dmg", "zip"]
│   ├── category: "public.app-category.[category]"
│   ├── icon: "build/icon.icns"
│   ├── hardenedRuntime: true
│   └── notarize: true (for distribution outside Mac App Store)
├── win:
│   ├── target: ["nsis"]
│   └── icon: "build/icon.ico"
├── linux:
│   ├── target: ["AppImage", "deb"]
│   └── icon: "build/icon.png"
└── publish:
    └── provider: "github" (for auto-update)
```

**Rules:**
- Code sign for macOS (required) and Windows (strongly recommended)
- Notarize macOS builds for distribution outside the Mac App Store
- Test the packaged app, not just the dev build — behavior differs
- Include appropriate icons for each platform (icns, ico, png)
- Set file associations if the app opens specific file types

### File Structure

```
[project-name]/
├── package.json
├── electron-builder.yml          # Build/packaging config
├── src/
│   ├── main/
│   │   ├── index.ts              # Main process entry point
│   │   ├── ipc.ts                # IPC handlers (grouped by domain)
│   │   ├── menu.ts               # Application menu
│   │   ├── tray.ts               # Tray icon and menu
│   │   ├── updater.ts            # Auto-update logic
│   │   └── windows.ts            # Window creation and management
│   ├── preload/
│   │   └── index.ts              # Preload script (contextBridge)
│   └── renderer/
│       ├── index.html            # Entry HTML
│       ├── App.[ext]             # Root UI component
│       ├── components/           # UI components
│       ├── pages/                # App screens/views
│       ├── stores/               # State management
│       └── styles/               # CSS/styles
├── resources/
│   ├── icon.icns                 # macOS icon
│   ├── icon.ico                  # Windows icon
│   ├── icon.png                  # Linux icon
│   └── tray-icon.png             # Tray icon (template on macOS)
└── build/                        # Build output
```

### Naming Conventions

- **IPC channels:** `domain:action` format — `'file:open'`, `'window:minimize'`, `'app:check-update'`
- **Main process files:** `kebab-case.ts`
- **Preload API:** `window.electronAPI.[methodName]` — camelCase methods
- **Renderer:** follows whatever framework convention is in use

### Anti-Patterns — Do NOT

- Enable `nodeIntegration` in any window — this is a critical security hole
- Disable `contextIsolation` — it protects the renderer from preload scope leaks
- Expose `ipcRenderer` directly to the renderer — use `contextBridge` to expose specific methods
- Use the deprecated `remote` module — it was removed for security and performance reasons
- Load remote/untrusted URLs in a `BrowserWindow` without validation
- Put heavy computation in the main process — it blocks all windows. Use worker threads
- Create a new window when you should focus an existing one (e.g., a singleton settings window)
- Skip code signing — unsigned apps trigger OS security warnings and break auto-update
- Hardcode file paths — use `app.getPath()` for platform-appropriate directories
- Forget to handle the macOS `activate` event (clicking dock icon when no windows are open should reopen)
- Use synchronous IPC (`ipcRenderer.sendSync`) — it blocks the renderer. Always use async `invoke`
- Bundle unnecessary files — exclude dev dependencies, source maps, and test files from the build
- Skip testing on all target platforms — window management and menus behave differently per OS
- Forget to set `show: false` + `ready-to-show` — users see a white flash on launch

## Screens

1. **[Screen Name]** — [what it shows]
2. **[Screen Name]** — [purpose]
3. **Settings / Preferences** — [what's configurable]

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Strict process separation: main handles system, renderer handles UI
- All IPC through `contextBridge`-exposed APIs
- Security defaults are non-negotiable (`nodeIntegration: false`, `contextIsolation: true`)
- Platform-aware UI (respect macOS, Windows, and Linux conventions)
- Auto-update enabled for production builds

## Notes

[Any project-specific context]
