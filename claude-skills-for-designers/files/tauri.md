# [Project Name]

[Brief description — what does this desktop app do?]

---

## Tech Stack

- Tauri v2
- Rust (backend)
- [Frontend: React / Vue / Svelte / SvelteKit / Next.js / vanilla]
- [Design System: file reference]
- TypeScript
- Platforms: [macOS / Windows / Linux]

## Project Type: Tauri v2 Desktop App

This is a cross-platform desktop application built with Tauri v2. Tauri uses a Rust backend for system access and performance, paired with a web frontend rendered in the platform's native webview (WebKit on macOS, WebView2 on Windows, WebKitGTK on Linux). No bundled Chromium — apps are small and fast.

Pair this file with a design system file for component-level guidance.

### Architecture Overview

```
┌─────────────────────────────────────────────┐
│ Rust Backend (Core)                         │
│  ├── Commands (invoke from frontend)        │
│  ├── Event system (emit / listen)           │
│  ├── Plugin system (fs, dialog, etc.)       │
│  ├── Window management                      │
│  ├── System tray                            │
│  ├── Menu system                            │
│  └── App lifecycle                          │
└──────────────┬──────────────────────────────┘
               │ IPC (invoke / events)
┌──────────────┴──────────────────────────────┐
│ Web Frontend (Webview)                      │
│  ├── Any web framework or vanilla           │
│  ├── @tauri-apps/api for IPC                │
│  └── Full DOM / CSS / JS capabilities       │
└─────────────────────────────────────────────┘
```

**Key difference from Electron:** Tauri does not bundle Node.js or Chromium. The frontend has no Node.js access. All system operations go through Rust commands or Tauri plugins. This makes binaries 5-10x smaller.

### Commands (Frontend → Backend)

Commands are Rust functions exposed to the frontend via IPC. This is the primary way the frontend requests work from the backend.

**Rust side — define a command:**
```rust
// src-tauri/src/lib.rs

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
async fn read_config(app: tauri::AppHandle) -> Result<String, String> {
    let path = app.path().app_config_dir().map_err(|e| e.to_string())?;
    std::fs::read_to_string(path.join("config.json"))
        .map_err(|e| e.to_string())
}

// Register commands in the builder
fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, read_config])
        .run(tauri::generate_context!())
        .expect("error while running application");
}
```

**Frontend side — invoke a command:**
```ts
import { invoke } from '@tauri-apps/api/core';

// Simple command
const greeting = await invoke<string>('greet', { name: 'World' });

// Command that returns a result
try {
  const config = await invoke<string>('read_config');
} catch (error) {
  console.error('Failed to read config:', error);
}
```

**Rules:**
- Command names use `snake_case` in Rust, invoked with `snake_case` strings from the frontend
- Arguments are passed as a single object — keys must match Rust parameter names
- Always return `Result<T, String>` from commands that can fail
- Use `async` for commands that do I/O (file system, network, database)
- Commands run on a thread pool — they do not block the main thread or the UI

### Events (Bidirectional Communication)

Events are fire-and-forget messages between frontend and backend. Use events for notifications, progress updates, and state changes that don't need a response.

**Rust → Frontend (emit from backend):**
```rust
use tauri::Emitter;

#[tauri::command]
async fn start_processing(app: tauri::AppHandle) -> Result<(), String> {
    for i in 0..100 {
        app.emit("progress", i).map_err(|e| e.to_string())?;
        tokio::time::sleep(std::time::Duration::from_millis(50)).await;
    }
    app.emit("processing-complete", ()).map_err(|e| e.to_string())?;
    Ok(())
}
```

**Frontend listening:**
```ts
import { listen } from '@tauri-apps/api/event';

const unlisten = await listen<number>('progress', (event) => {
  console.log('Progress:', event.payload);
});

// Clean up when done
unlisten();
```

**Frontend → Backend (emit from frontend):**
```ts
import { emit } from '@tauri-apps/api/event';

await emit('user-action', { action: 'save', data: { /* ... */ } });
```

**Rust listening:**
```rust
use tauri::Listener;

app.listen("user-action", |event| {
    println!("Received: {:?}", event.payload());
});
```

**Rules:**
- Use commands (invoke/handle) when the frontend needs a response
- Use events when the frontend just needs to be notified (progress bars, state changes, background task completion)
- Always clean up listeners with the returned `unlisten` function
- Event names use `kebab-case`

### Permissions and Capabilities (ACL)

Tauri v2 uses an ACL system to control what the frontend can access. Permissions are declared in capability files — the frontend cannot access any plugin or command without explicit permission.

```json5
// src-tauri/capabilities/default.json
{
  "identifier": "default",
  "description": "Default capabilities for the main window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "dialog:allow-open",
    "dialog:allow-save",
    "dialog:allow-message",
    "fs:allow-read",
    "fs:allow-write",
    "fs:allow-exists",
    "clipboard-manager:allow-write",
    "clipboard-manager:allow-read",
    "notification:default",
    "shell:allow-open"
  ]
}
```

**Rules:**
- Every plugin capability must be explicitly granted — nothing is allowed by default
- Scope permissions to specific windows when possible
- Use the most restrictive permissions that still allow the app to function
- Review `src-tauri/capabilities/` when adding new plugin features

### App Configuration

```json5
// src-tauri/tauri.conf.json
{
  "productName": "[App Name]",
  "version": "[0.1.0]",
  "identifier": "com.[org].[appname]",
  "build": {
    "frontendDist": "../dist",
    "devUrl": "http://localhost:[port]",
    "beforeDevCommand": "[npm run dev]",
    "beforeBuildCommand": "[npm run build]"
  },
  "app": {
    "windows": [
      {
        "title": "[App Name]",
        "width": 1200,
        "height": 800,
        "minWidth": 800,
        "minHeight": 600,
        "resizable": true,
        "fullscreen": false,
        "decorations": true
      }
    ],
    "security": {
      "csp": "default-src 'self'; style-src 'self' 'unsafe-inline'"
    }
  },
  "bundle": {
    "active": true,
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ],
    "targets": "all"
  }
}
```

### Plugins

Tauri v2 uses a plugin system for system capabilities. Install and configure each plugin you need.

**File System (fs plugin):**
```bash
cargo add tauri-plugin-fs
```

```rust
// src-tauri/src/lib.rs
tauri::Builder::default()
    .plugin(tauri_plugin_fs::init())
```

```ts
import { readTextFile, writeTextFile, exists, mkdir } from '@tauri-apps/plugin-fs';
import { appDataDir, join } from '@tauri-apps/api/path';

const appDir = await appDataDir();
const filePath = await join(appDir, 'data.json');

if (await exists(filePath)) {
  const content = await readTextFile(filePath);
}

await writeTextFile(filePath, JSON.stringify(data));
```

**Dialog plugin:**
```ts
import { open, save, message, ask, confirm } from '@tauri-apps/plugin-dialog';

// File picker
const selected = await open({
  multiple: false,
  filters: [{ name: 'Images', extensions: ['png', 'jpg', 'webp'] }],
});

// Save dialog
const filePath = await save({
  filters: [{ name: 'JSON', extensions: ['json'] }],
});

// Message box
await message('Operation complete', { title: '[App Name]', kind: 'info' });

// Confirmation
const confirmed = await ask('Are you sure?', { title: 'Confirm', kind: 'warning' });
```

**Other commonly used plugins:**
```bash
cargo add tauri-plugin-clipboard-manager  # Clipboard read/write
cargo add tauri-plugin-notification       # Native OS notifications
cargo add tauri-plugin-shell              # Open URLs in default browser
cargo add tauri-plugin-autostart          # Launch on OS startup
cargo add tauri-plugin-updater            # Auto-updater
cargo add tauri-plugin-store              # Key-value persistent storage
cargo add tauri-plugin-window-state       # Remember window size/position
```

### Window Management

```rust
use tauri::Manager;

#[tauri::command]
async fn open_settings(app: tauri::AppHandle) -> Result<(), String> {
    // Check if window already exists — focus it instead of creating a duplicate
    if let Some(window) = app.get_webview_window("settings") {
        window.set_focus().map_err(|e| e.to_string())?;
        return Ok(());
    }

    tauri::WebviewWindowBuilder::new(
        &app,
        "settings",
        tauri::WebviewUrl::App("settings".into()),
    )
    .title("Settings")
    .inner_size(600.0, 400.0)
    .resizable(false)
    .build()
    .map_err(|e| e.to_string())?;

    Ok(())
}
```

**Frontend window control:**
```ts
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';

const appWindow = getCurrentWebviewWindow();

await appWindow.minimize();
await appWindow.maximize();
await appWindow.unmaximize();
await appWindow.toggleMaximize();
await appWindow.close();
await appWindow.setTitle('New Title');
await appWindow.setFullscreen(true);
```

### System Tray

```rust
use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    Manager,
};

fn setup_tray(app: &tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let show = MenuItem::with_id(app, "show", "Show Window", true, None::<&str>)?;
    let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&show, &quit])?;

    TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "show" => {
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.show();
                    let _ = window.set_focus();
                }
            }
            "quit" => app.exit(0),
            _ => {}
        })
        .build(app)?;

    Ok(())
}
```

### Menu System

```rust
use tauri::menu::{Menu, Submenu, MenuItem, PredefinedMenuItem};

fn setup_menu(app: &tauri::App) -> Result<Menu<tauri::Wry>, Box<dyn std::error::Error>> {
    let file_menu = Submenu::with_items(
        app,
        "File",
        true,
        &[
            &MenuItem::with_id(app, "new", "New", true, Some("CmdOrCtrl+N"))?,
            &MenuItem::with_id(app, "open", "Open...", true, Some("CmdOrCtrl+O"))?,
            &MenuItem::with_id(app, "save", "Save", true, Some("CmdOrCtrl+S"))?,
            &PredefinedMenuItem::separator(app)?,
            &PredefinedMenuItem::quit(app, Some("Quit"))?,
        ],
    )?;

    let menu = Menu::with_items(app, &[&file_menu])?;
    Ok(menu)
}
```

### Auto-Updater

```bash
cargo add tauri-plugin-updater
```

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_updater::Builder::new().build())
```

```ts
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

const update = await check();
if (update) {
  await update.downloadAndInstall();
  await relaunch();
}
```

Configure the update endpoint in `tauri.conf.json`:
```json5
{
  "plugins": {
    "updater": {
      "endpoints": ["https://[your-server]/updates/{{target}}/{{arch}}/{{current_version}}"],
      "pubkey": "[your-public-key]"
    }
  }
}
```

### Bundling and Distribution

Tauri builds native installers for each platform:

```bash
# Development
cargo tauri dev

# Build for production
cargo tauri build

# Build outputs (platform-specific):
# macOS:   .dmg, .app
# Windows: .msi, .exe (NSIS)
# Linux:   .AppImage, .deb, .rpm
```

**Rules:**
- Code sign macOS builds — required for distribution
- Notarize macOS builds for distribution outside the App Store
- Windows builds should be code signed to avoid SmartScreen warnings
- Test the built app, not just the dev build
- Use `tauri icon` to generate all required icon sizes from a single source

### File Structure

```
[project-name]/
├── package.json
├── src/                           # Frontend source
│   ├── App.[ext]
│   ├── components/
│   ├── lib/
│   ├── styles/
│   └── main.ts                    # Frontend entry point
├── src-tauri/
│   ├── Cargo.toml                 # Rust dependencies
│   ├── tauri.conf.json            # App configuration
│   ├── capabilities/
│   │   └── default.json           # Permissions / ACL
│   ├── icons/                     # App icons (all sizes)
│   ├── src/
│   │   ├── lib.rs                 # Main Rust entry — commands, setup
│   │   └── main.rs                # Binary entry point (calls lib::run)
│   └── target/                    # Rust build output (gitignored)
├── dist/                          # Frontend build output
└── [vite.config.ts / next.config.js / etc.]
```

### Naming Conventions

- **Commands:** `snake_case` in Rust, invoked as `snake_case` strings from JS
- **Events:** `kebab-case` strings
- **Rust files:** `snake_case.rs`
- **Frontend:** follows whatever framework convention is in use
- **Plugin registration:** `tauri_plugin_[name]` crate, `@tauri-apps/plugin-[name]` npm package

### IPC Patterns

**Returning structured data:**
```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Project {
    id: String,
    name: String,
    path: String,
}

#[tauri::command]
fn list_projects() -> Result<Vec<Project>, String> {
    // ... load projects
    Ok(projects)
}
```

```ts
interface Project {
  id: string;
  name: string;
  path: string;
}

const projects = await invoke<Project[]>('list_projects');
```

**Rules:**
- Use `serde::Serialize` on all types returned from commands
- Use `serde::Deserialize` on all types received as command arguments
- Match TypeScript interfaces to Rust structs — field names must align
- Keep IPC payloads small — don't send large binary data through `invoke`, use the fs plugin or streaming

### Security Model

- **No Node.js** — the frontend cannot access the file system, network, or OS directly
- **Sandboxed webview** — the frontend is a web page, not a privileged environment
- **ACL-gated plugins** — every system capability must be permitted in the capabilities file
- **CSP enforced** — set a Content Security Policy in `tauri.conf.json`
- **Rust backend validates all input** — never trust data from the frontend without checking

### Anti-Patterns — Do NOT

- Grant broad permissions like `fs:default` when you only need `fs:allow-read` on specific paths
- Skip the capabilities file — your app will silently fail when calling plugin APIs
- Put heavy computation in the frontend — use Rust commands for CPU-intensive work
- Use `unwrap()` in Rust commands — always return `Result` and handle errors
- Create duplicate windows — check if a window exists before creating a new one
- Forget to clean up event listeners — call the `unlisten` function on component unmount
- Bundle dev dependencies or source maps in production builds
- Hardcode file paths — use `app.path()` APIs for platform-appropriate directories
- Skip code signing — unsigned apps trigger OS security warnings
- Use synchronous file I/O in commands without `async` — it blocks the thread pool
- Ignore the Rust compiler warnings — they often indicate real issues
- Use `#[allow(unused)]` to hide warnings — fix them or remove the dead code
- Forget to test on all target platforms — webview behavior varies across macOS, Windows, and Linux

## Screens

1. **[Screen Name]** — [what it shows]
2. **[Screen Name]** — [purpose]
3. **Settings / Preferences** — [what's configurable]

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Rust backend for all system access, frontend for UI only
- All IPC through commands (invoke) and events (emit/listen)
- Permissions explicitly declared in capabilities files
- Platform-aware behavior (check OS for platform-specific features)
- Frontend framework agnostic — UI code should not depend on Tauri APIs directly (wrap them)

## Notes

[Any project-specific context — target platforms, Rust toolchain version, frontend framework choice]
