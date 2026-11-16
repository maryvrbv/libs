# [Project Name]

[Brief description of what this monorepo contains — e.g., "Monorepo for the web app, documentation site, and shared UI library."]

---

## Capability: Monorepo Setup

This project is a monorepo managed with Turborepo and pnpm workspaces. Multiple apps and shared packages live in one repository with unified tooling, shared dependencies, and cached builds.

### When to Use a Monorepo

**Use a monorepo when:**
- Multiple apps share code (UI components, types, utilities).
- You want unified linting, formatting, and TypeScript config.
- Teams need to make cross-package changes in a single PR.
- Shared types between frontend and backend prevent drift.

**Use separate repos when:**
- Apps are truly independent with different teams and deploy cycles.
- The shared code is stable and versioned (publish it as an npm package instead).
- The codebase is small enough that a single app repo is simpler.

### Package Structure

```
[root]/
├── apps/
│   ├── web/                    # Main web application (Next.js, Remix, etc.)
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── docs/                   # Documentation site (Astro, Nextra, etc.)
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── [app-name]/             # Additional deployable apps
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── ui/                     # Shared UI component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── index.ts   # Re-exports all components
│   │   │   └── index.ts       # Package entry point
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── shared/                 # Shared utilities and helpers
│   │   ├── src/
│   │   │   ├── utils/
│   │   │   ├── hooks/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── types/                  # Shared TypeScript types
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── eslint-config/          # Shared ESLint configuration
│   │   ├── base.js
│   │   ├── react.js
│   │   ├── next.js
│   │   └── package.json
│   └── tsconfig/               # Shared TypeScript configurations
│       ├── base.json
│       ├── react.json
│       ├── nextjs.json
│       └── package.json
├── turbo.json                  # Turborepo pipeline config
├── pnpm-workspace.yaml         # Workspace definition
├── package.json                # Root package.json (scripts, devDependencies)
├── .npmrc                      # pnpm config
└── .gitignore
```

**Conventions:**
- `apps/` contains deployable applications. Each app has its own build, dev server, and deploy target.
- `packages/` contains shared code consumed by apps (and by other packages). Packages are never deployed on their own.
- Every directory in `apps/` and `packages/` is a workspace with its own `package.json`.

### pnpm Workspaces

**`pnpm-workspace.yaml`:**
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**`.npmrc`:**
```ini
auto-install-peers=true
strict-peer-dependencies=false
```

**Root `package.json`:**
```json
{
  "name": "[project-name]",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "type-check": "turbo type-check",
    "clean": "turbo clean",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\""
  },
  "devDependencies": {
    "turbo": "^2",
    "prettier": "^3"
  },
  "packageManager": "pnpm@9.15.0"
}
```

**Rules:**
- Root `package.json` is always `"private": true` — you never publish the root.
- Dev tools shared across all packages (Turbo, Prettier) go in root `devDependencies`.
- App-specific and package-specific dependencies go in their own `package.json`.
- Pin the `packageManager` field to ensure everyone uses the same pnpm version.

### Internal Package Imports

Use the `workspace:*` protocol to reference internal packages.

**In `apps/web/package.json`:**
```json
{
  "name": "@[scope]/web",
  "dependencies": {
    "@[scope]/ui": "workspace:*",
    "@[scope]/shared": "workspace:*",
    "@[scope]/types": "workspace:*"
  }
}
```

**In `packages/ui/package.json`:**
```json
{
  "name": "@[scope]/ui",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./styles.css": "./src/styles.css"
  },
  "dependencies": {
    "react": "^18"
  },
  "devDependencies": {
    "@[scope]/tsconfig": "workspace:*"
  }
}
```

**Using internal packages in app code:**
```tsx
// In apps/web/src/page.tsx
import { Button, Input } from "@[scope]/ui";
import { formatDate, cn } from "@[scope]/shared";
import type { User, ApiResponse } from "@[scope]/types";
```

**Rules:**
- Always use `workspace:*` for internal packages — not fixed versions.
- Set `"main"` and `"types"` to `./src/index.ts` for internal packages. No build step needed — the consuming app's bundler compiles them.
- Use `"exports"` for multiple entry points (e.g., components and styles separately).
- Internal packages should be `"private": true` unless you intend to publish them to npm.

### Turborepo Configuration

**`turbo.json`:**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "type-check": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

**Key concepts:**
- `"dependsOn": ["^build"]` — run `build` in all dependencies first. The `^` means "upstream packages."
- `"outputs"` — tells Turbo what files the task produces, so it can cache and restore them.
- `"cache": false` — disables caching for tasks that should always run (dev servers, clean).
- `"persistent": true` — marks long-running tasks (dev servers) that do not exit.

**How caching works:**
1. Turbo hashes all inputs (source files, dependencies, env vars).
2. If the hash matches a previous run, Turbo replays the cached output instantly.
3. If the hash differs, the task runs and the output is cached for next time.
4. Remote caching shares the cache across CI and team members.

### Shared TypeScript Configuration

**`packages/tsconfig/base.json`:**
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "exclude": ["node_modules", "dist"]
}
```

**`packages/tsconfig/react.json`:**
```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022"
  }
}
```

**`packages/tsconfig/nextjs.json`:**
```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "preserve",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "plugins": [{ "name": "next" }],
    "allowJs": true,
    "incremental": true
  }
}
```

**Consuming in an app (`apps/web/tsconfig.json`):**
```json
{
  "extends": "@[scope]/tsconfig/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "next-env.d.ts", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Shared ESLint Configuration

**`packages/eslint-config/base.js`:**
```js
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
  },
  ignorePatterns: ["dist/", "node_modules/", ".next/"],
};
```

**`packages/eslint-config/react.js`:**
```js
module.exports = {
  extends: [
    "./base.js",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["react", "react-hooks", "jsx-a11y"],
  settings: { react: { version: "detect" } },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};
```

**Consuming in an app (`apps/web/.eslintrc.js`):**
```js
module.exports = {
  root: true,
  extends: ["@[scope]/eslint-config/react"],
};
```

### Shared UI Component Library

The `packages/ui` package is a shared component library consumed by all apps.

**`packages/ui/src/components/button.tsx`:**
```tsx
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@[scope]/shared";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

**`packages/ui/src/index.ts`:**
```ts
// Re-export all components
export { Button } from "./components/button";
export { Input } from "./components/input";
export { Card } from "./components/card";
// ... add components as they are created
```

**Rules:**
- UI components are headless-ish — they accept `className` for styling overrides.
- Components use `forwardRef` for DOM access and composability.
- No app-specific logic in shared components. They receive data via props.
- Export everything from a single `index.ts` for clean imports.

### Root Scripts

Common tasks run from the repo root:

```bash
# Start all dev servers in parallel
pnpm dev

# Build all packages and apps (in dependency order)
pnpm build

# Lint all packages
pnpm lint

# Type-check all packages
pnpm type-check

# Run a command in a specific workspace
pnpm --filter @[scope]/web dev
pnpm --filter @[scope]/ui build

# Add a dependency to a specific workspace
pnpm --filter @[scope]/web add react-query

# Add a dev dependency to the root
pnpm add -D -w prettier

# Clean all build outputs
pnpm clean

# Install dependencies (from root)
pnpm install
```

**The `--filter` flag is essential.** It targets a specific workspace by name. Use it to run scripts, add dependencies, or operate on one package without touching others.

### CI/CD with Caching

**GitHub Actions workflow (`.github/workflows/ci.yml`):**
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile

      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm build
```

**Turborepo remote caching:**
```bash
# Link to Vercel remote cache (one-time setup)
npx turbo login
npx turbo link
```

With remote caching enabled, CI jobs and team members share cached build outputs. If nothing changed in a package, its build is replayed from cache in seconds.

**Rules:**
- Always use `--frozen-lockfile` in CI — never let CI modify the lockfile.
- Cache `node_modules` via the `pnpm` cache option in `setup-node`.
- Turborepo remote cache is free on Vercel and dramatically speeds up CI.
- Run `lint` and `type-check` before `build` — fail fast on cheap checks.

### Common Patterns

**Shared UI library across web + docs:**
```
packages/ui/          → Button, Card, Input, etc.
apps/web/             → imports @[scope]/ui for the product
apps/docs/            → imports @[scope]/ui for the design system docs
```

Both apps render the same components. Update the component once, both apps get the change.

**Shared types between frontend and backend:**
```
packages/types/       → User, ApiResponse, ErrorCode, etc.
apps/web/             → imports @[scope]/types for API response typing
apps/api/             → imports @[scope]/types for request/response validation
```

No type drift between frontend and backend. A change to the API response type triggers type errors in the frontend immediately.

**Shared utilities:**
```
packages/shared/      → cn(), formatDate(), debounce(), etc.
apps/web/             → imports @[scope]/shared
apps/docs/            → imports @[scope]/shared
packages/ui/          → imports @[scope]/shared (cn utility for class merging)
```

**Environment variables per app:**
Each app has its own `.env` (or `.env.local`) file. Do not put env vars at the root.
```
apps/web/.env.local       # NEXT_PUBLIC_API_URL, etc.
apps/docs/.env.local      # DOCS-specific vars
```

Turbo can hash env vars for caching. Declare them in `turbo.json`:
```json
{
  "tasks": {
    "build": {
      "env": ["NEXT_PUBLIC_API_URL", "DATABASE_URL"],
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    }
  }
}
```

### Adding a New Package

1. Create the directory: `packages/[name]/`
2. Add `package.json` with `"name": "@[scope]/[name]"` and `"private": true`.
3. Add `tsconfig.json` extending the shared config.
4. Add `src/index.ts` as the entry point.
5. Set `"main": "./src/index.ts"` and `"types": "./src/index.ts"` in `package.json`.
6. Run `pnpm install` from the root to register the new workspace.
7. Add it as a dependency where needed: `pnpm --filter @[scope]/web add @[scope]/[name]@workspace:*`.

### Adding a New App

1. Create the directory: `apps/[name]/`
2. Scaffold the app (e.g., `pnpm create next-app apps/[name]`).
3. Update `tsconfig.json` to extend the shared config.
4. Update `.eslintrc.js` to extend the shared ESLint config.
5. Add internal package dependencies with `workspace:*`.
6. Run `pnpm install` from the root.
7. Verify `pnpm dev` starts the new app alongside existing apps.

### Anti-Patterns — Do NOT

- Put all dependencies in the root `package.json` — each workspace manages its own dependencies
- Skip the `workspace:*` protocol — using fixed versions for internal packages defeats the purpose
- Build internal packages separately when apps can import source directly — skip the build step for internal `packages/`
- Create circular dependencies between packages — if A depends on B and B depends on A, merge them or extract shared code into a third package
- Put app-specific code in shared packages — shared packages contain only truly shared code
- Use `npm` or `yarn` alongside pnpm — pick one package manager and enforce it with `packageManager` in root `package.json`
- Forget `"dependsOn": ["^build"]` in turbo.json — without it, packages build in random order and fail
- Cache dev servers — set `"cache": false` and `"persistent": true` for `dev` tasks
- Store `.env` files in git — add them to `.gitignore` and use `.env.example` for documentation
- Skip `--frozen-lockfile` in CI — it prevents accidental lockfile changes
- Create a package for every tiny utility — start with one `shared` package and split only when it grows large
- Ignore Turborepo cache invalidation — declare env vars in `turbo.json` so builds re-run when config changes
- Let packages depend on specific versions of each other — `workspace:*` always resolves to the local version

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- pnpm is the package manager — enforced via `packageManager` field
- Internal packages use `workspace:*` and are imported as source (no build step)
- TypeScript and ESLint configs are shared from `packages/tsconfig` and `packages/eslint-config`
- Turborepo manages task orchestration, caching, and dependency ordering
- Each app deploys independently — shared packages are compiled by each app's bundler
- All commands run from the repo root using `pnpm` or `pnpm --filter`

## Notes

[Any project-specific context — which apps are in the monorepo, deploy targets, team structure.]
