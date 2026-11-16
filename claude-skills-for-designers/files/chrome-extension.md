# [Project Name]

[One-line description of what this Chrome extension does.]

---

## Project Type: Chrome Extension

This is a Chrome Extension built with Manifest V3. It [modifies web pages / adds a popup tool / runs background tasks]. The extension follows Chrome's permissions model and works within the constraints of the extension runtime.

### Extension Architecture

Chrome extensions have multiple isolated contexts that communicate via message passing:

```
┌─────────────────────────────────────────────────┐
│ Browser                                          │
│                                                  │
│  ┌──────────────┐    ┌─────────────────────┐    │
│  │ Popup        │◄──►│ Background           │    │
│  │ (UI panel)   │    │ (Service Worker)     │    │
│  └──────────────┘    └──────┬──────────────┘    │
│                              │                   │
│  ┌──────────────┐    ┌──────▼──────────────┐    │
│  │ Options Page │    │ Content Script(s)    │    │
│  │ (settings)   │    │ (injected into pages)│    │
│  └──────────────┘    └─────────────────────┘    │
│                                                  │
└─────────────────────────────────────────────────┘
```

- **Popup** — HTML page shown when clicking the extension icon. UI for the user.
- **Background (Service Worker)** — runs in the background, handles events, API calls, storage. No DOM access.
- **Content Scripts** — injected into web pages. Can read and modify page DOM. Isolated JS context.
- **Options Page** — full settings page, accessible from extension menu.

### File Structure

```
[extension-root]/
├── manifest.json               # Extension manifest (V3)
├── popup/
│   ├── popup.html              # Popup HTML entry point
│   ├── popup.css               # Popup styles
│   └── popup.js                # Popup logic (or .tsx if using a framework)
├── options/
│   ├── options.html            # Options page entry point
│   ├── options.css
│   └── options.js
├── background/
│   └── service-worker.js       # Background service worker
├── content/
│   ├── content.js              # Content script (injected into pages)
│   └── content.css             # Styles injected into pages
├── lib/
│   ├── storage.js              # Chrome storage API wrappers
│   └── messaging.js            # Message passing helpers
├── icons/
│   ├── icon-16.png             # Favicon, context menus
│   ├── icon-32.png             # Windows taskbar
│   ├── icon-48.png             # Extensions page
│   └── icon-128.png            # Chrome Web Store, install dialog
└── assets/                     # Additional images, fonts
```

### Manifest V3

The manifest is the extension's configuration file. Every extension starts here.

**Core structure:**
```json
{
  "manifest_version": 3,
  "name": "[Extension Name]",
  "version": "1.0.0",
  "description": "[One-line description]",

  "icons": {
    "16": "icons/icon-16.png",
    "32": "icons/icon-32.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  },

  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon-16.png",
      "32": "icons/icon-32.png"
    },
    "default_title": "[Tooltip text on hover]"
  },

  "background": {
    "service_worker": "background/service-worker.js"
  },

  "content_scripts": [
    {
      "matches": ["[URL patterns, e.g., https://*.example.com/*]"],
      "js": ["content/content.js"],
      "css": ["content/content.css"],
      "run_at": "document_idle"
    }
  ],

  "options_page": "options/options.html",

  "permissions": [
    "[Required permissions — see Permissions section]"
  ],

  "host_permissions": [
    "[URL patterns the extension needs access to]"
  ]
}
```

**Rules:**
- `manifest_version` must be `3` — Manifest V2 is deprecated.
- `version` follows semver. Chrome Web Store requires version bumps for updates.
- Keep `permissions` minimal — only request what you need. More permissions = more install friction.

### Popup

The popup is the primary UI surface. It appears when the user clicks the extension icon.

**Constraints:**
- Maximum size: 800px wide x 600px tall. Chrome enforces this.
- Minimum practical size: ~300px wide x 400px tall.
- The popup closes when the user clicks outside it. All state is lost unless saved.

**Popup-specific CSS:**
```css
/* Reset default popup styles */
body {
  margin: 0;
  padding: 0;
  width: [300-400]px;      /* Set a fixed width */
  min-height: [200-400]px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
}

/* Prevent horizontal scrollbar */
html {
  overflow-x: hidden;
}
```

**Structure:**
- **Header** — extension name or logo, minimal (one line).
- **Main content** — the primary feature UI.
- **Footer** (optional) — settings link, version, links.

**Patterns:**
- **Tool popup** — single-purpose: input field + action button + results. Compact.
- **List popup** — scrollable list of items (bookmarks, tabs, tasks). Searchable.
- **Status popup** — display current state (logged in, active on this page, stats).
- **Multi-view popup** — tabs or navigation between views within the popup.

**Rules:**
- Save state to `chrome.storage` before the popup closes — it can close at any moment.
- Do not assume the popup stays open. Never use `setInterval` for long tasks — use the background service worker.
- Load fast — the popup should render in under 200ms. No heavy frameworks for simple UIs.
- Use system fonts for consistency with the browser chrome.

### Options Page

A full-page settings UI for the extension.

**Access:** Right-click extension icon → "Options", or programmatically via `chrome.runtime.openOptionsPage()`.

**Structure:**
- Settings grouped into sections.
- Toggle switches, dropdowns, text inputs for configuration.
- "Save" button or auto-save on change.
- "Reset to defaults" option.
- Import/export settings (for power users).

**Rules:**
- Load current settings from `chrome.storage.sync` on page open.
- Provide feedback on save (toast, inline message).
- Options page has no size constraints — it opens as a full browser tab.

### Content Scripts

Content scripts run in the context of web pages. They can read and modify the page DOM.

**Injection modes (`run_at`):**
- `document_start` — runs before the page loads. Use for blocking or early modifications.
- `document_idle` — runs after the page is loaded and idle. Default, best for most cases.
- `document_end` — runs after DOM is complete but before images/subresources.

**Injecting UI into pages:**
- Create a container element and append it to the page body.
- Use Shadow DOM to isolate your styles from the page's CSS.
- Assign a high `z-index` to keep injected UI above page content.

```js
// Create isolated container
const host = document.createElement('div');
host.id = '[extension-name]-root';
const shadow = host.attachShadow({ mode: 'closed' });

// Add styles (isolated from page)
const style = document.createElement('style');
style.textContent = `/* your extension's CSS */`;
shadow.appendChild(style);

// Add UI
const app = document.createElement('div');
app.innerHTML = `/* your HTML */`;
shadow.appendChild(app);

document.body.appendChild(host);
```

**Rules:**
- Always use Shadow DOM for injected UI — page CSS will break your layout otherwise.
- Content scripts cannot use `chrome.*` APIs directly (except `chrome.runtime` for messaging and `chrome.storage`).
- Content scripts run in an isolated JS world — they share the DOM but not JS variables with the page.
- Cleanup on unload: remove injected elements when the extension is disabled or the user navigates away.
- Scope CSS selectors narrowly to avoid leaking styles into the page.

### Background Service Worker

The service worker handles events, long-running logic, and API calls.

**Key characteristics:**
- No DOM access. Cannot use `document`, `window`, or any DOM APIs.
- Event-driven. It wakes up on events and goes idle when done.
- Stateless between wakeups — use `chrome.storage` for persistence, not in-memory variables.

**Common patterns:**
```js
// Listen for extension install/update
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // First install — set defaults
    chrome.storage.sync.set({ [key]: [defaultValue] });
  }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === '[ACTION_NAME]') {
    // Handle message
    sendResponse({ result: 'done' });
  }
  return true; // Keep channel open for async response
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    // Page finished loading
  }
});
```

**Rules:**
- Do not store state in global variables — they are lost when the service worker goes idle.
- Use `chrome.alarms` for periodic tasks, not `setInterval` (service worker may be killed).
- Return `true` from `onMessage` listener if the response is async.
- Keep the service worker lightweight. Heavy computation should be offloaded.

### Chrome Storage API

Two storage areas:

| Area | Limit | Synced | Best for |
|------|-------|--------|----------|
| `chrome.storage.sync` | 100KB total, 8KB per item | Yes, across devices | User settings, preferences |
| `chrome.storage.local` | 10MB total | No, device only | Cached data, large datasets |

**Usage:**
```js
// Write
await chrome.storage.sync.set({ key: value });

// Read
const result = await chrome.storage.sync.get(['key']);
const value = result.key;

// Read with default
const result = await chrome.storage.sync.get({ key: defaultValue });

// Listen for changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.key) {
    const newValue = changes.key.newValue;
  }
});
```

**Rules:**
- Use `sync` for user preferences (follows the user across devices).
- Use `local` for cached data, large objects, or device-specific state.
- Always handle the case where storage is empty (first run).
- Storage operations are async — always `await` or use callbacks.

### Message Passing

Contexts communicate through Chrome's messaging API.

**Popup ↔ Background:**
```js
// Popup sends to background
const response = await chrome.runtime.sendMessage({ type: 'GET_DATA' });

// Background listens
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_DATA') {
    sendResponse({ data: [...] });
  }
  return true;
});
```

**Background ↔ Content Script:**
```js
// Background sends to content script in a specific tab
await chrome.tabs.sendMessage(tabId, { type: 'UPDATE_UI', payload: data });

// Content script listens
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'UPDATE_UI') {
    updatePageUI(msg.payload);
  }
});
```

**Rules:**
- Define a message type schema: `{ type: string, payload?: any }`.
- Always handle unknown message types gracefully (ignore, don't crash).
- Return `true` from listeners if the response is asynchronous.
- The popup must be open to receive messages — if it's closed, messages are lost.

### Permissions Model

Request the minimum permissions needed.

**Common permissions:**
| Permission | What it grants | When to use |
|-----------|---------------|-------------|
| `storage` | chrome.storage API | Almost always — store settings and data |
| `activeTab` | Access to the current tab when the user clicks the extension | Safer than broad host permissions |
| `tabs` | Read tab URLs and titles | When you need to list or query tabs |
| `contextMenus` | Right-click menu items | Adding actions to the right-click menu |
| `notifications` | Desktop notifications | Alerting the user outside the browser |
| `alarms` | Periodic background tasks | Scheduled checks or syncs |
| `clipboardWrite` | Write to clipboard | Copy-to-clipboard features |

**Host permissions:** `"host_permissions": ["https://*.example.com/*"]` grants access to specific sites. Use `activeTab` instead when possible — it requires user action and is less scary.

**Rules:**
- Every permission is shown to the user at install time. Fewer permissions = higher install rate.
- Use `activeTab` instead of broad host permissions whenever the extension only needs access on click.
- Add `optional_permissions` for features the user can enable later, rather than requesting everything upfront.

### Extension Icons

Provide four sizes. All must be PNG with transparency.

| Size | Used for |
|------|----------|
| 16x16 | Favicon in tabs, context menus |
| 32x32 | Windows taskbar shortcut |
| 48x48 | Extensions management page |
| 128x128 | Chrome Web Store listing, install dialog |

**Rules:**
- Simple, recognizable at 16x16.
- Consistent design across all sizes (not just scaled down).
- Use a distinct silhouette — avoid fine detail that disappears at small sizes.
- No text in the icon.

### Debugging Workflow

**Popup:**
- Right-click the popup → "Inspect" to open DevTools for the popup context.

**Service worker:**
- Go to `chrome://extensions` → find your extension → "Inspect views: service worker".

**Content scripts:**
- Open DevTools on the target page → Console → select the extension's content script world from the dropdown (top-left of console).

**Reload:**
- After code changes: go to `chrome://extensions` → click the reload button on your extension.
- Or use an auto-reload extension during development.

**Common issues:**
- Popup closes when you click inspect — use `chrome://extensions` to debug.
- Service worker is not running — it goes idle. Check `chrome://extensions` to see its status.
- Content script not injecting — check the `matches` pattern in manifest.json.
- Storage not persisting — make sure you're awaiting the async operations.

### Publishing to Chrome Web Store

1. Create a Chrome Web Store Developer account ($5 one-time fee).
2. Prepare store listing assets:
   - Extension name (30 chars max)
   - Short description (132 chars max)
   - Full description
   - Screenshots (1280x800 or 640x400, 1-5 images)
   - Promotional images (440x280 small tile)
   - Category selection
   - Privacy policy URL (required if you collect data)
3. Zip the extension directory (exclude dev files, node_modules).
4. Upload to Chrome Web Store Developer Dashboard.
5. Submit for review (typically 1-3 business days).

**Version updates:**
- Bump `version` in manifest.json.
- Upload new zip to the dashboard.
- Existing users update automatically.

### Anti-Patterns — Do NOT

- Use Manifest V2 — it is deprecated and will stop working
- Request permissions you don't need — users will not install
- Store sensitive data (tokens, passwords) in `chrome.storage.local` without encryption
- Assume the popup stays open — it closes on any outside click
- Use `setInterval` in the service worker — it will be killed. Use `chrome.alarms`
- Inject CSS into pages without Shadow DOM isolation — your styles will break the page
- Make API calls from content scripts — route them through the background service worker
- Hardcode the extension ID — use `chrome.runtime.id`
- Skip the empty state when storage has no data (first run)
- Use `eval()` or inline scripts — Manifest V3's CSP blocks them
- Put all logic in the popup — it's destroyed on close. Move persistent logic to the service worker
- Forget to handle the service worker waking from idle — reinitialize state from storage
- Use large frameworks (React, Vue) for simple popup UIs — vanilla JS or Preact is enough
- Ship with `console.log` statements in production
- Bundle `node_modules` into the extension without tree-shaking — keep the package small

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Manifest V3 only
- Message types follow a consistent schema: `{ type: 'ACTION_NAME', payload?: any }`
- All storage access goes through wrapper functions in `lib/storage.js`
- Content script UI uses Shadow DOM for style isolation
- Extension is [framework: vanilla JS / Preact / React / Svelte]

## Notes

[Any project-specific context — target websites for content scripts, API integrations, auth flow.]
