# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / SvelteKit / Remix / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- **Auth.js (NextAuth.js)** for authentication
- [Database: Prisma / Drizzle / Supabase / etc.]

## Authentication: Auth.js (NextAuth.js)

This project uses Auth.js (NextAuth.js v5) for authentication — handling OAuth providers, magic link email, credentials login, session management, and route protection.

### Setup

```bash
npm install next-auth@beta
npx auth secret          # Generate AUTH_SECRET
```

```ts
// auth.ts — root config
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Apple from 'next-auth/providers/apple';
import Discord from 'next-auth/providers/discord';
import Credentials from 'next-auth/providers/credentials';
import Resend from 'next-auth/providers/resend';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    // Add more providers as needed
  ],
  pages: {
    signIn: '/login',           // Custom login page
    error: '/auth/error',       // Custom error page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;             // Redirect to login
      }
      return true;
    },
  },
});
```

```ts
// app/api/auth/[...nextauth]/route.ts — API route handler
import { handlers } from '@/auth';
export const { GET, POST } = handlers;
```

```ts
// middleware.ts — protect routes via middleware
export { auth as middleware } from '@/auth';

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};
```

**Environment variables:**
```
AUTH_SECRET=...                         # Generated with `npx auth secret`
AUTH_GOOGLE_ID=...                      # Google OAuth client ID
AUTH_GOOGLE_SECRET=...                  # Google OAuth client secret
AUTH_GITHUB_ID=...                      # GitHub OAuth app ID
AUTH_GITHUB_SECRET=...                  # GitHub OAuth app secret
AUTH_TRUST_HOST=true                    # Required for some deployments
```

### OAuth Providers

Each provider needs credentials from its developer console:

**Google:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add redirect URI: `https://[your-domain]/api/auth/callback/google`

**GitHub:**
1. Go to GitHub → Settings → Developer Settings → OAuth Apps
2. Add callback URL: `https://[your-domain]/api/auth/callback/github`

**Apple:**
1. Go to developer.apple.com → Certificates, Identifiers & Profiles
2. Create a Service ID with Sign In with Apple
3. Add redirect URI: `https://[your-domain]/api/auth/callback/apple`

**Discord:**
1. Go to discord.com/developers/applications
2. Add redirect URI: `https://[your-domain]/api/auth/callback/discord`

```ts
// Add provider to auth.ts
import Apple from 'next-auth/providers/apple';

Apple({
  clientId: process.env.AUTH_APPLE_ID,
  clientSecret: process.env.AUTH_APPLE_SECRET,
})
```

### Magic Link / Email Flow

Passwordless auth via email:

```bash
npm install resend       # Or any email provider (Sendgrid, Postmark, etc.)
```

```ts
// auth.ts — add email provider
import Resend from 'next-auth/providers/resend';

Resend({
  from: 'noreply@[your-domain].com',
  apiKey: process.env.AUTH_RESEND_KEY,
})
```

Requires a database adapter to store verification tokens:

```bash
npm install @auth/prisma-adapter
```

```ts
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({ from: 'noreply@example.com' }),
    // ... other providers
  ],
});
```

### Credentials Provider

Email/password authentication (use cautiously — you handle password security):

```ts
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

Credentials({
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    const parsed = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }).safeParse(credentials);

    if (!parsed.success) return null;

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (!user || !user.hashedPassword) return null;

    const passwordMatch = await bcrypt.compare(parsed.data.password, user.hashedPassword);
    if (!passwordMatch) return null;

    return { id: user.id, email: user.email, name: user.name };
  },
})
```

### Session Management

**JWT sessions (default)** — stateless, no database needed:
```ts
export const { handlers, auth } = NextAuth({
  session: { strategy: 'jwt' },
  // ...
});
```

**Database sessions** — stored in DB, required for magic link:
```ts
export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  // ...
});
```

| Strategy | Pros | Cons |
|----------|------|------|
| **JWT** | No DB needed, fast, stateless | Can't revoke, larger cookie |
| **Database** | Revocable, stores more data | DB read on every request |

### Session Data Customization

Add custom fields to the session (e.g., user role, subscription status):

```ts
// auth.ts
export const { handlers, auth } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      // On sign-in, add custom fields to the JWT
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true, subscriptionStatus: true },
        });
        token.role = dbUser?.role || 'user';
        token.subscriptionStatus = dbUser?.subscriptionStatus || 'free';
      }
      return token;
    },
    async session({ session, token }) {
      // Make custom fields available in the session
      session.user.id = token.sub!;
      session.user.role = token.role as string;
      session.user.subscriptionStatus = token.subscriptionStatus as string;
      return session;
    },
  },
});
```

Extend the TypeScript types:
```ts
// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      subscriptionStatus: string;
    } & DefaultSession['user'];
  }
}
```

### Protected Routes (Middleware)

Middleware-based route protection runs before the page loads:

```ts
// middleware.ts
export { auth as middleware } from '@/auth';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/account/:path*',
    '/api/protected/:path*',
  ],
};
```

For more granular control:

```ts
// middleware.ts
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Redirect unauthenticated users to login
  if (pathname.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Redirect authenticated users away from login page
  if (pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});
```

### Role-Based Access Control (RBAC)

```ts
// lib/auth/rbac.ts
type Role = 'user' | 'admin' | 'editor';

const rolePermissions: Record<Role, string[]> = {
  user: ['read:own-profile', 'update:own-profile'],
  editor: ['read:own-profile', 'update:own-profile', 'create:posts', 'update:own-posts'],
  admin: ['read:own-profile', 'update:own-profile', 'create:posts', 'update:any-posts', 'delete:any-posts', 'manage:users'],
};

export function hasPermission(role: Role, permission: string): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}
```

```tsx
// Server Component — check role
import { auth } from '@/auth';

export default async function AdminPage() {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    redirect('/dashboard');
  }

  return <AdminPanel />;
}
```

```ts
// Server Action — check permission
'use server';
import { auth } from '@/auth';
import { hasPermission } from '@/lib/auth/rbac';

export async function deletePost(postId: string) {
  const session = await auth();
  if (!session || !hasPermission(session.user.role, 'delete:any-posts')) {
    throw new Error('Unauthorized');
  }
  await prisma.post.delete({ where: { id: postId } });
}
```

### Getting Session Data

```tsx
// Server Component
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/login');
  return <p>Welcome, {session.user.name}</p>;
}
```

```tsx
// Client Component
'use client';
import { useSession } from 'next-auth/react';

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <Skeleton />;
  if (!session) return <LoginButton />;

  return <p>Welcome, {session.user.name}</p>;
}
```

```tsx
// Wrap app in SessionProvider for client-side access
// app/layout.tsx
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
```

### Sign In / Sign Out

```tsx
// Server-side sign in/out
import { signIn, signOut } from '@/auth';

// In a Server Action or form
<form action={async () => {
  'use server';
  await signIn('google');
}}>
  <button type="submit">Sign in with Google</button>
</form>

<form action={async () => {
  'use server';
  await signOut();
}}>
  <button type="submit">Sign out</button>
</form>
```

```tsx
// Client-side sign in/out
'use client';
import { signIn, signOut } from 'next-auth/react';

<button onClick={() => signIn('google')}>Sign in with Google</button>
<button onClick={() => signOut()}>Sign out</button>
```

### Secure Cookie Configuration

Auth.js handles cookies securely by default. For custom needs:

```ts
export const { handlers, auth } = NextAuth({
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,          // HTTPS only in production
      },
    },
  },
});
```

### File Structure

```
[project-root]/
├── auth.ts                      # Auth.js config (providers, callbacks)
├── middleware.ts                 # Route protection
├── types/
│   └── next-auth.d.ts           # Extended session types
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts     # Auth API handler
│   ├── login/
│   │   └── page.tsx             # Custom login page
│   ├── auth/
│   │   └── error/
│   │       └── page.tsx         # Custom error page
│   └── dashboard/
│       └── page.tsx             # Protected page
├── lib/
│   ├── auth/
│   │   └── rbac.ts              # Role-based access control
│   └── prisma.ts                # Database client (if using DB sessions)
└── .env.local
    # AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, etc.
```

### Anti-Patterns — Do NOT

- Store `AUTH_SECRET` in client-side code or commit it to git
- Use credentials provider without rate limiting — brute force attacks will succeed
- Store plain-text passwords — always hash with bcrypt or argon2
- Check auth only on the client — always validate on the server (middleware or Server Component)
- Put auth logic in individual pages — use middleware for consistent route protection
- Forget to handle the loading state with `useSession()` — it's `undefined` initially
- Skip the `authorized` callback — it's the simplest way to protect routes
- Use `getSession()` in Server Components — use `auth()` instead (it's the v5 way)
- Expose user IDs or roles in URLs — use session data on the server
- Trust client-side role checks for authorization — always verify on the server
- Skip CSRF protection — Auth.js handles it, but don't disable it
- Allow OAuth redirect URIs on `localhost` in production — always use exact domain matches

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Auth config in `auth.ts` at the root
- Route protection via middleware (not per-page checks)
- Server-side session checks in Server Components with `auth()`
- Client-side session access with `useSession()` inside `SessionProvider`
- Roles and permissions defined in `lib/auth/rbac.ts`
- All sensitive operations verify auth server-side

## Notes

[Any project-specific context — which providers are enabled, database adapter, role model]
