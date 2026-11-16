# [Project Name]

[Brief description of what this project does.]

---

## Capability: Internationalization (i18n)

This project supports multiple languages. All user-facing text is externalized into translation files, locale-aware formatting is used for dates and numbers, and the UI adapts to right-to-left languages.

### Supported Locales

| Locale | Language | Status |
|--------|----------|--------|
| `en` | English | [Default / Complete] |
| `[locale]` | [Language] | [Complete / In Progress / Planned] |

### Architecture

```
1. Translation files (JSON per locale)
2. i18n library handles loading and interpolation
3. Locale routing (/en/about, /fr/about)
4. Language detection (URL → cookie → browser preference → default)
5. Formatting (dates, numbers, plurals) via Intl APIs
```

### Translation File Structure

Organize translations as JSON with nested keys by feature area.

```
messages/
├── en.json
├── fr.json
├── de.json
└── ja.json
```

```json
// messages/en.json
{
  "common": {
    "loading": "Loading...",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "confirm": "Are you sure?",
    "error": "Something went wrong. Please try again."
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "pricing": "Pricing",
    "blog": "Blog"
  },
  "auth": {
    "signIn": "Sign in",
    "signOut": "Sign out",
    "email": "Email address",
    "password": "Password",
    "forgotPassword": "Forgot your password?"
  },
  "dashboard": {
    "title": "Dashboard",
    "welcome": "Welcome back, {name}",
    "stats": {
      "visitors": "{count, plural, one {# visitor} other {# visitors}}",
      "revenue": "Revenue this month"
    }
  }
}
```

**Key naming conventions:**
- Use nested keys by feature: `auth.signIn`, `dashboard.title`
- Use camelCase for keys
- Keep keys descriptive: `dashboard.welcome` not `d.w`
- Use variables with `{braces}`: `"Welcome, {name}"`
- Never embed HTML in translations — use rich text patterns from the library

### next-intl Setup (Next.js App Router)

```tsx
// i18n/request.ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));
```

```tsx
// middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fr", "de", "ja"],
  defaultLocale: "en",
  localePrefix: "as-needed", // or "always" for /en/about style
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

```tsx
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Using translations in components:**
```tsx
// Server component
import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations("dashboard");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("welcome", { name: user.name })}</p>
      <p>{t("stats.visitors", { count: visitorCount })}</p>
    </div>
  );
}
```

### vue-i18n Setup (Vue / Nuxt)

```ts
// i18n.config.ts (Nuxt)
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: { /* ... */ },
    fr: { /* ... */ },
  },
}));
```

```vue
<template>
  <h1>{{ $t("dashboard.title") }}</h1>
  <p>{{ $t("dashboard.welcome", { name: user.name }) }}</p>
</template>
```

### Language Detection Priority

Detect locale in this order:

```
1. URL path (/fr/about → French)
2. Cookie (NEXT_LOCALE or similar)
3. Accept-Language header (browser preference)
4. Default locale (fallback)
```

The user's explicit choice (toggle) should be saved to a cookie and take highest priority on subsequent visits.

### RTL Layout Support

For Arabic, Hebrew, and other RTL languages, the entire layout must mirror.

```html
<!-- Set dir on html element based on locale -->
<html lang="ar" dir="rtl">
```

**Use CSS logical properties instead of physical:**
```css
/* BAD — breaks in RTL */
.sidebar {
  margin-left: 16px;
  padding-right: 24px;
  text-align: left;
  border-left: 2px solid var(--color-border);
}

/* GOOD — works in both directions */
.sidebar {
  margin-inline-start: 16px;
  padding-inline-end: 24px;
  text-align: start;
  border-inline-start: 2px solid var(--color-border);
}
```

**Logical property mapping:**

| Physical | Logical |
|----------|---------|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `text-align: left` | `text-align: start` |
| `left: 0` | `inset-inline-start: 0` |
| `border-left` | `border-inline-start` |
| `float: left` | `float: inline-start` |

**Icons that need flipping in RTL:**
- Back arrows, forward arrows, chevrons
- Do NOT flip: checkmarks, play buttons, clocks, phone icons

```css
[dir="rtl"] .icon-directional {
  transform: scaleX(-1);
}
```

### Date and Number Formatting

Always use `Intl` APIs — never manually format dates or numbers.

```tsx
// Dates
const formatter = new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "long",
  day: "numeric",
});
formatter.format(new Date()); // "March 15, 2026" (en) / "15 mars 2026" (fr)

// Numbers
const numFmt = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "USD",
});
numFmt.format(1999.99); // "$1,999.99" (en) / "1 999,99 $US" (fr)

// Relative time
const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
rtf.format(-1, "day"); // "yesterday" (en) / "hier" (fr)
```

**With next-intl:**
```tsx
import { useFormatter } from "next-intl";

function PriceTag({ amount }: { amount: number }) {
  const format = useFormatter();
  return <span>{format.number(amount, { style: "currency", currency: "USD" })}</span>;
}

function PostDate({ date }: { date: Date }) {
  const format = useFormatter();
  return <time>{format.dateTime(date, { year: "numeric", month: "long", day: "numeric" })}</time>;
}
```

### Pluralization (ICU Message Format)

Different languages have different plural rules. Use ICU message format.

```json
{
  "items": "{count, plural, =0 {No items} one {# item} other {# items}}",
  "messages": "{count, plural, =0 {No new messages} one {# new message} other {# new messages}}"
}
```

Some languages (Arabic, Russian, Polish) have more plural forms — the ICU format handles this automatically when translations are provided correctly.

### Language Switcher

```tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next-intl/client";

const localeNames: Record<string, string> = {
  en: "English",
  fr: "Francais",
  de: "Deutsch",
  ja: "日本語",
};

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value })}
      aria-label="Select language"
    >
      {Object.entries(localeNames).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
```

**Rules:**
- Display language names in their own script (Deutsch, not German)
- Place the switcher in the header or footer — consistently accessible
- Use a globe icon as a visual indicator
- Changing language should stay on the same page, not redirect to home

### TypeScript Support

Type-safe translation keys prevent missing translations at build time.

```ts
// next-intl: generate types from the default locale file
// global.d.ts
type Messages = typeof import("./messages/en.json");

declare interface IntlMessages extends Messages {}
```

This enables autocomplete and compile-time errors for translation keys.

### Fallback Locale Handling

```tsx
// If a key is missing in the current locale, fall back to the default
// next-intl handles this automatically:
// messages/fr.json missing "dashboard.newFeature"
// → falls back to messages/en.json "dashboard.newFeature"
```

**Log missing translations in development:**
```tsx
// next-intl config
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
  onError(error) {
    if (error.code === "MISSING_MESSAGE") {
      console.warn(`Missing translation: ${error.message}`);
    }
  },
}));
```

### Static Text Extraction Workflow

When adding new user-facing text:

1. Never hardcode strings in components.
2. Add the key to the default locale file first (`en.json`).
3. Use the key in the component via the translation function.
4. Send the updated default locale file to translators.
5. Translators return completed locale files.
6. Merge translations and test.

**For large projects**, use a translation management platform (Crowdin, Lokalise, Phrase) that syncs with the JSON files in the repo.

### Anti-Patterns — Do NOT

- Hardcode user-facing strings in components — all text goes through the i18n system
- Concatenate translated strings — word order varies across languages. Use variables: `t("greeting", { name })` not `t("hello") + " " + name`
- Assume text length is constant — German is ~30% longer than English, Japanese can be shorter. UI must flex.
- Use flags for language selection — flags represent countries, not languages. Use language names.
- Auto-translate and ship without review — machine translation needs human proofreading
- Format dates manually — `Intl.DateTimeFormat` handles locale rules automatically
- Forget RTL testing — if you support Arabic or Hebrew, test every page mirrored
- Use physical CSS properties (margin-left, padding-right) — use logical properties for RTL compatibility
- Nest translation keys too deeply — 2-3 levels max for maintainability
- Store locale only in the URL — also persist in a cookie for returning visitors
- Translate URL slugs without setting up redirects — each slug needs a canonical URL
- Assume pluralization is just "add an s" — many languages have complex plural rules

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Default locale: `[en]`
- Translation files live in `messages/[locale].json`
- All user-facing text goes through the translation system — no exceptions
- Use ICU message format for plurals and variables
- Use logical CSS properties for layout

## Notes

[Any project-specific context — supported locales, translation workflow, RTL requirements.]
