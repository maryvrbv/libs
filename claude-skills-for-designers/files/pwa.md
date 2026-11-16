# [Project Name]

[Brief description of what this project does.]

---

## Capability: Progressive Web App (PWA)

This project is a Progressive Web App. It can be installed on devices, works offline, and delivers an app-like experience through the browser. The implementation uses a service worker for caching, a web app manifest for install behavior, and follows platform conventions for a native feel.

### Architecture

```
1. Web App Manifest — defines app name, icons, theme, display mode
2. Service Worker — handles caching, offline, and background tasks
3. Install Prompt — guides users to add to home screen
4. Caching Strategy — keeps the app fast and functional offline
5. Update Flow — ensures users get new versions
```

### Web App Manifest

```json
// public/manifest.json
{
  "name": "[Full App Name]",
  "short_name": "[Short Name — max 12 chars]",
  "description": "[App description]",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#[brand-color]",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

**Link in HTML:**
```html
<head>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#[brand-color]" />
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
</head>
```

**Icon requirements:**
- 192x192 — minimum for Android install
- 512x512 — splash screen and store listing
- Maskable icon — safe zone is center 80%. Background fills the shape (circle, squircle) on Android
- Apple Touch Icon — 180x180 for iOS home screen
- Use PNG format with transparent backgrounds (except maskable)

### Service Worker Registration

```ts
// Register in your app's entry point
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered:", registration.scope);

        // Check for updates periodically
        setInterval(() => registration.update(), 60 * 60 * 1000);
      })
      .catch((error) => {
        console.error("SW registration failed:", error);
      });
  });
}
```

### Service Worker Lifecycle

```js
// sw.js
const CACHE_NAME = "[app-name]-v[version]";
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/icons/icon-192.png",
  "/manifest.json",
  // Add critical CSS and JS bundles
];

// Install — cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting(); // Activate immediately
});

// Activate — clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // Take control of all pages
});

// Fetch — serve from cache or network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/offline");
          }
        });
    })
  );
});
```

### Caching Strategies

Choose the right strategy per resource type.

**Cache-first (static assets, fonts, images):**
```js
// Fast — always serves cached version, updates in background
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
}
```

**Network-first (API calls, dynamic pages):**
```js
// Fresh — tries network, falls back to cache
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch {
    return caches.match(request);
  }
}
```

**Stale-while-revalidate (content that updates but isn't critical):**
```js
// Fast AND fresh — serves cache immediately, updates in background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((response) => {
    cache.put(request, response.clone());
    return response;
  });

  return cached || fetchPromise;
}
```

**Strategy by resource type:**

| Resource | Strategy | Reason |
|----------|----------|--------|
| App shell (HTML, CSS, JS) | Cache-first | Core UI loads instantly |
| Fonts | Cache-first | Rarely change |
| Images | Cache-first | Large, slow to fetch |
| API responses | Network-first | Need fresh data |
| Blog/content pages | Stale-while-revalidate | Acceptable to show slightly stale |

### Offline Fallback Page

```tsx
// app/offline/page.tsx
export default function OfflinePage() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1>You're offline</h1>
      <p>Check your internet connection and try again.</p>
      <button onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );
}
```

### Install Prompt

```tsx
"use client";

import { useState, useEffect } from "react";

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("Install outcome:", outcome);
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="install-banner">
      <p>Install [App Name] for a better experience</p>
      <button onClick={handleInstall}>Install</button>
      <button onClick={() => setShowBanner(false)}>Not now</button>
    </div>
  );
}
```

**When to show the install prompt:**
- After the user has engaged (visited 2+ times, used a key feature)
- Never on first visit — let them see value first
- Dismissible and not blocking content

### Push Notifications

```ts
// Request permission
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleNotification: true,
    applicationServerKey: "[VAPID_PUBLIC_KEY]",
  });

  // Send subscription to your server
  await fetch("/api/push/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: { "Content-Type": "application/json" },
  });

  return subscription;
}
```

**Handle push in service worker:**
```js
// sw.js
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};

  event.waitUntil(
    self.registration.showNotification(data.title ?? "[App Name]", {
      body: data.body ?? "",
      icon: "/icons/icon-192.png",
      badge: "/icons/badge-96.png",
      data: { url: data.url ?? "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
```

### Update Flow

When deploying a new version, notify users to refresh.

```ts
// In your app
navigator.serviceWorker.addEventListener("controllerchange", () => {
  // New service worker took control — reload for fresh content
  window.location.reload();
});

// More graceful: show an update banner
function checkForUpdates(registration: ServiceWorkerRegistration) {
  registration.addEventListener("updatefound", () => {
    const newWorker = registration.installing;
    if (!newWorker) return;

    newWorker.addEventListener("statechange", () => {
      if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
        // New version available — show update prompt
        showUpdateBanner(() => {
          newWorker.postMessage({ type: "SKIP_WAITING" });
        });
      }
    });
  });
}
```

### Workbox (Production Service Worker Management)

For production apps, use Workbox instead of writing service workers from scratch.

```js
// next.config.js (with next-pwa)
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
      handler: "CacheFirst",
      options: { cacheName: "google-fonts", expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 } },
    },
    {
      urlPattern: /\/_next\/image/,
      handler: "CacheFirst",
      options: { cacheName: "images", expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 } },
    },
    {
      urlPattern: /\/api\//,
      handler: "NetworkFirst",
      options: { cacheName: "api", expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 } },
    },
  ],
});

module.exports = withPWA({ /* next config */ });
```

### iOS PWA Quirks

iOS Safari has limited PWA support. Account for these:

```html
<!-- iOS status bar style -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="[App Name]" />

<!-- Splash screens (generated per device size) -->
<link rel="apple-touch-startup-image" href="/splash/iphone.png" media="(device-width: 390px)" />
```

**iOS limitations:**
- No push notifications on iOS < 16.4 (supported from 16.4+ for home screen apps)
- No background sync
- Service worker cache limited to ~50MB and can be evicted
- No `beforeinstallprompt` — users must manually "Add to Home Screen" from Safari share sheet
- Standalone mode doesn't support `window.open` — opens in Safari instead
- Cache is wiped if the app isn't used for a few weeks

### Background Sync

Queue failed requests and retry when connection returns.

```js
// In your app — register a sync
async function saveData(data) {
  try {
    await fetch("/api/save", { method: "POST", body: JSON.stringify(data) });
  } catch {
    // Queue for background sync
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register("sync-save");
    // Store data in IndexedDB for the service worker to pick up
  }
}

// sw.js
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-save") {
    event.waitUntil(retrySavedData());
  }
});
```

### Testing Checklist

- [ ] Manifest is linked and valid (Chrome DevTools → Application → Manifest)
- [ ] Service worker registers successfully
- [ ] App installs on Android (Chrome) and iOS (Safari)
- [ ] Offline fallback page loads when disconnected
- [ ] Cached pages load instantly on repeat visits
- [ ] New versions trigger an update prompt
- [ ] Icons display correctly on all platforms (including maskable)
- [ ] `theme_color` matches the app's header/nav color
- [ ] Push notifications work (if implemented)
- [ ] Lighthouse PWA audit passes
- [ ] iOS standalone mode works (no browser chrome, correct status bar)

### Anti-Patterns — Do NOT

- Cache everything — be selective. Cache static assets and critical pages, not every API response
- Skip the offline fallback — users see a browser error page instead of your branded offline page
- Use `skipWaiting` without an update prompt — users get new code mid-session with no warning
- Forget to clean up old caches — storage fills up and the browser evicts your data
- Show the install prompt immediately on first visit — let users see value first
- Assume push notifications work everywhere — check support and handle denial gracefully
- Ignore iOS quirks — test on real iOS devices, not just Chrome DevTools
- Cache API auth tokens or sensitive data in the service worker
- Set aggressive cache expiration for API responses — stale data causes bugs
- Forget to version your cache name — old assets persist forever
- Use service workers in development without knowing how to unregister them — they intercept all requests
- Serve the manifest from a CDN with CORS issues — it must be same-origin

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Service worker source: `public/sw.js` (or generated by Workbox)
- Cache versioning: `[app-name]-v[semver]`
- Icons stored in `public/icons/`
- Offline page at `/offline`

## Notes

[Any project-specific context — target platforms, notification strategy, caching priorities.]
