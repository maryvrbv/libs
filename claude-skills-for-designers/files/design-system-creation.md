# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / React / Vue / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- [Storybook for component documentation]

## Workflow: Building a Design System

This project uses a custom component library / design system. This file defines the token architecture, component API patterns, composition rules, and development workflow for building and maintaining the system.

### Token Definition

Design tokens are the atomic values everything is built from. Define them as CSS custom properties for maximum flexibility.

**Color Tokens:**
```css
/* styles/globals.css */
:root {
  /* Semantic colors — use these in components */
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;

  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;

  --primary: 221 83% 53%;
  --primary-foreground: 0 0% 100%;

  --secondary: 210 40% 96%;
  --secondary-foreground: 0 0% 9%;

  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;

  --accent: 210 40% 96%;
  --accent-foreground: 0 0% 9%;

  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;

  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 221 83% 53%;

  --radius: 0.5rem;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;

  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;

  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;

  /* ... mirror all tokens for dark mode */
}
```

**Spacing Tokens:**
```css
:root {
  --spacing-0: 0;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
}
```

**Typography Tokens:**
```css
:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */

  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
}
```

**Shadow Tokens:**
```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

### Component API Design

Every component follows a consistent API pattern:

**Props pattern:**
```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

**API design rules:**
- Use `variant` for visual style (primary, secondary, ghost, destructive)
- Use `size` for dimensions (sm, default, lg, icon)
- Forward refs on all interactive components
- Extend native HTML element props (`ButtonHTMLAttributes`, `InputHTMLAttributes`)
- Use `className` prop for one-off overrides via `cn()`
- Use `asChild` pattern (via Radix Slot) for custom element rendering
- Default variants so components work with zero props

### Base Components

Every design system needs these foundation components:

**Layout:**
```tsx
// Card — content container
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer actions</CardFooter>
</Card>

// Separator — visual divider
<Separator orientation="horizontal" />

// Stack — vertical/horizontal layout helper
<div className="flex flex-col gap-4">  {/* Vertical stack */}
<div className="flex gap-2 items-center">  {/* Horizontal stack */}
```

**Forms:**
```tsx
<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="message">Message</Label>
    <Textarea id="message" placeholder="Type your message..." />
  </div>
  <Button type="submit">Submit</Button>
</div>
```

**Feedback:**
```tsx
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Pending</Badge>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

**Data Display:**
```tsx
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

<Skeleton className="h-4 w-[200px]" />  {/* Loading placeholder */}
```

### Composition Patterns

Components should compose together predictably:

```tsx
// Card with action button
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Settings</CardTitle>
      <Button variant="ghost" size="icon"><SettingsIcon /></Button>
    </div>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>

// Button with icon
<Button>
  <PlusIcon className="mr-2 h-4 w-4" />
  Add Item
</Button>

// Input with icon
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input className="pl-10" placeholder="Search..." />
</div>

// Avatar group
<div className="flex -space-x-3">
  <Avatar className="border-2 border-background"><AvatarImage src="/user1.jpg" /></Avatar>
  <Avatar className="border-2 border-background"><AvatarImage src="/user2.jpg" /></Avatar>
  <Avatar className="border-2 border-background"><AvatarFallback>+3</AvatarFallback></Avatar>
</div>
```

### Storybook Setup

Document and test components in isolation:

```bash
npx storybook@latest init
```

```tsx
// components/ui/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'Button', variant: 'default' },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' },
};

export const Destructive: Story = {
  args: { children: 'Delete', variant: 'destructive' },
};

export const WithIcon: Story = {
  render: () => (
    <Button>
      <PlusIcon className="mr-2 h-4 w-4" />
      Add Item
    </Button>
  ),
};

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
```

### Theme Provider Pattern

```tsx
// components/providers/theme-provider.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({ theme: 'system', setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (theme === 'system' && systemDark);

    root.classList.toggle('dark', isDark);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

Or use `next-themes` for Next.js projects:

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### CSS Variable Architecture

```css
/* Layer 1: Primitive values (raw palette) */
:root {
  --blue-50: 214 100% 97%;
  --blue-500: 221 83% 53%;
  --blue-600: 221 83% 46%;
  --gray-50: 210 40% 98%;
  --gray-100: 210 40% 96%;
  --gray-500: 215 16% 47%;
  --gray-900: 222 47% 11%;
}

/* Layer 2: Semantic tokens (reference primitives) */
:root {
  --primary: var(--blue-500);
  --primary-hover: var(--blue-600);
  --background: 0 0% 100%;
  --foreground: var(--gray-900);
  --muted: var(--gray-100);
  --muted-foreground: var(--gray-500);
}

.dark {
  --primary: 217 91% 60%;
  --background: var(--gray-900);
  --foreground: var(--gray-50);
  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
}

/* Layer 3: Component tokens (optional, for complex components) */
:root {
  --button-height-sm: 2.25rem;
  --button-height-default: 2.5rem;
  --button-height-lg: 2.75rem;
}
```

### Utility Function: cn()

The `cn()` utility merges Tailwind classes without conflicts:

```ts
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
cn('px-4 py-2', 'px-6')          // → 'px-6 py-2' (px-4 is overridden)
cn('text-red-500', condition && 'text-blue-500')  // Conditional classes
```

### Versioning Strategy

- Use semver: `major.minor.patch`
- **Patch:** Bug fixes, no API changes
- **Minor:** New components, new variants, backward-compatible
- **Major:** Breaking changes (prop renames, removed components, token changes)
- Document breaking changes in a changelog
- If sharing across projects, publish as an npm package

### File Structure

```
[project-root]/
├── components/
│   ├── ui/                        # Design system components
│   │   ├── button.tsx
│   │   ├── button.stories.tsx     # Storybook story
│   │   ├── card.tsx
│   │   ├── card.stories.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   └── tooltip.tsx
│   └── providers/
│       └── theme-provider.tsx
├── lib/
│   └── utils.ts                   # cn() helper
├── styles/
│   └── globals.css                # Tokens + base styles
├── .storybook/
│   ├── main.ts                    # Storybook config
│   └── preview.ts                 # Global decorators
└── CHANGELOG.md                   # Version history
```

### Anti-Patterns — Do NOT

- Define colors as raw hex values in components — always use CSS variable tokens
- Create component variants by adding new props for every style option — use the `variant` + `size` pattern
- Build components that only work in one context — components should be context-agnostic
- Skip `forwardRef` on interactive components — parent components need ref access
- Mix styling approaches (some components use Tailwind, others use styled-components)
- Create deep component hierarchies — prefer composition over inheritance
- Make tokens too granular (`--button-primary-hover-border-color`) — keep the token tree shallow
- Build without Storybook — you need a way to see components in isolation
- Add project-specific logic to design system components — keep them generic
- Forget dark mode from the start — retrofitting dark mode into a token system is painful
- Skip the `cn()` utility — class conflicts cause hard-to-debug styling issues
- Create one-off components in the `ui/` directory — only reusable components belong there

## Current State

[Where is the project? What's working, what's next?]

## Component Status

| Component | Status | Story | Tests |
|-----------|--------|-------|-------|
| Button | [Done / In progress / TODO] | [Yes/No] | [Yes/No] |
| Card | [Done / In progress / TODO] | [Yes/No] | [Yes/No] |
| Input | [Done / In progress / TODO] | [Yes/No] | [Yes/No] |
| Dialog | [Done / In progress / TODO] | [Yes/No] | [Yes/No] |

## Conventions

- All tokens as CSS custom properties in `globals.css`
- Components use `cva` for variant management
- Every component gets a Storybook story
- `cn()` for all class merging
- Forward refs on all interactive components
- Dark mode support from day one

## Notes

[Any project-specific context — brand guidelines, Figma token source, shared package details]
