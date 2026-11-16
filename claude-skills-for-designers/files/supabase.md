# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / SvelteKit / React / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- **Supabase** (database, auth, storage, edge functions)

## Backend: Supabase

This project uses Supabase as the backend — a hosted PostgreSQL database with built-in authentication, storage, real-time subscriptions, and edge functions. All data access goes through the Supabase client or direct SQL.

### Client Setup

Install and configure the Supabase JavaScript client:

```bash
npm install @supabase/supabase-js
```

```ts
// lib/supabase/client.ts — browser client
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```ts
// lib/supabase/server.ts — server client (Next.js App Router)
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}
```

**Rules:**
- Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — these are safe to expose (RLS protects data)
- Use the server client for Server Components and Server Actions
- Use the browser client for Client Components
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser — it bypasses RLS

### Database Schema Design

Design tables in SQL migrations. Use Supabase migrations for version control:

```bash
supabase migration new create_profiles_table
```

```sql
-- supabase/migrations/001_create_profiles.sql
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Indexes for common queries
create index profiles_username_idx on public.profiles (username);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function update_updated_at();
```

```sql
-- Relationships example
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text,
  published boolean default false,
  created_at timestamptz default now() not null
);

create index posts_author_id_idx on public.posts (author_id);
create index posts_published_idx on public.posts (published) where published = true;
```

**Rules:**
- Always use `uuid` for primary keys (use `gen_random_uuid()` default)
- Always add `created_at timestamptz default now()` to every table
- Add indexes on foreign keys and columns you filter/sort by
- Use `on delete cascade` for dependent records
- Prefer `text` over `varchar` — PostgreSQL treats them the same

### Row Level Security (RLS)

RLS is mandatory. Every table must have RLS enabled and policies defined. Without policies, a table with RLS enabled blocks all access.

```sql
-- Enable RLS
alter table public.profiles enable row level security;

-- Public read access
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Users can insert their own profile
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);
```

```sql
-- Posts: only author can edit, public can read published posts
alter table public.posts enable row level security;

create policy "Published posts are viewable by everyone"
  on public.posts for select
  using (published = true or auth.uid() = author_id);

create policy "Users can create posts"
  on public.posts for insert
  with check (auth.uid() = author_id);

create policy "Users can update own posts"
  on public.posts for update
  using (auth.uid() = author_id);

create policy "Users can delete own posts"
  on public.posts for delete
  using (auth.uid() = author_id);
```

**Rules:**
- Enable RLS on every table — no exceptions
- Always test policies from the browser client (anon key), not the service role
- `auth.uid()` returns the current user's ID in policies
- `using` = row-level filter (which rows can be seen/modified)
- `with check` = validation on insert/update (what data can be written)

### Authentication

Supabase Auth supports multiple providers out of the box:

```ts
// Email/password signup
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
});

// Email/password login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword',
});

// OAuth (Google, GitHub, Apple, Discord, etc.)
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: { redirectTo: `${window.location.origin}/auth/callback` },
});

// Magic link (passwordless)
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
});

// Sign out
await supabase.auth.signOut();

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

Handle the OAuth callback:

```ts
// app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL('/dashboard', request.url));
}
```

### Storage

File storage with access policies:

```sql
-- Create a bucket
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

-- Storage policies
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
```

```ts
// Upload a file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/avatar.png`, file, {
    cacheControl: '3600',
    upsert: true,
  });

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/avatar.png`);
```

### Edge Functions

Serverless functions running Deno at the edge:

```bash
supabase functions new send-welcome-email
```

```ts
// supabase/functions/send-welcome-email/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const { record } = await req.json();

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // Send email, call external API, etc.
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

### Real-Time Subscriptions

Listen to database changes in real time:

```ts
// Subscribe to changes on a table
const channel = supabase
  .channel('posts-changes')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Change:', payload.eventType, payload.new);
    }
  )
  .subscribe();

// Filter to specific rows
const channel = supabase
  .channel('my-posts')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'posts', filter: `author_id=eq.${userId}` },
    (payload) => { /* handle change */ }
  )
  .subscribe();

// Cleanup
supabase.removeChannel(channel);
```

Enable real-time in the Supabase dashboard for the tables you need.

### TypeScript Type Generation

Generate types from your database schema:

```bash
npx supabase gen types typescript --project-id [your-project-id] > lib/database.types.ts
```

```ts
// Use generated types
import { Database } from '@/lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type PostInsert = Database['public']['Tables']['posts']['Insert'];

// Typed client
import { createBrowserClient } from '@supabase/ssr';
const supabase = createBrowserClient<Database>(url, key);

// Queries are now fully typed
const { data } = await supabase.from('profiles').select('*').single();
// data is typed as Profile
```

Regenerate types after every migration.

### Querying Data

```ts
// Select with filters
const { data, error } = await supabase
  .from('posts')
  .select('*, profiles(username, avatar_url)')  // Join related table
  .eq('published', true)
  .order('created_at', { ascending: false })
  .limit(20);

// Insert
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'New Post', author_id: userId, content: '...' })
  .select()
  .single();

// Update
const { data, error } = await supabase
  .from('posts')
  .update({ title: 'Updated Title' })
  .eq('id', postId)
  .select()
  .single();

// Delete
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId);
```

### Database Migrations

```bash
# Create a new migration
supabase migration new add_tags_to_posts

# Apply migrations locally
supabase db reset

# Push migrations to remote
supabase db push

# Pull remote schema changes (from dashboard edits)
supabase db pull
```

### File Structure

```
[project-root]/
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Browser client
│   │   ├── server.ts        # Server client (SSR)
│   │   └── admin.ts         # Service role client (server-only)
│   └── database.types.ts    # Auto-generated types
├── supabase/
│   ├── config.toml          # Local dev config
│   ├── migrations/          # SQL migration files
│   │   ├── 001_create_profiles.sql
│   │   └── 002_create_posts.sql
│   ├── functions/           # Edge functions
│   │   └── send-email/
│   │       └── index.ts
│   └── seed.sql             # Seed data for local dev
└── .env.local               # SUPABASE_URL, SUPABASE_ANON_KEY
```

### Anti-Patterns — Do NOT

- Expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code — it bypasses all RLS
- Forget to enable RLS on new tables — data is publicly accessible without it
- Write RLS policies without testing them — use the SQL editor's "Run as user" feature
- Skip TypeScript type generation — regenerate after every schema change
- Use the dashboard SQL editor for schema changes in production — use migrations
- Store files without access policies — storage buckets need RLS too
- Subscribe to real-time on tables without enabling it in the dashboard
- Create deeply nested joins in `select()` — keep queries flat, do multiple queries if needed
- Forget to handle the `error` return from every Supabase call
- Use `supabase.auth.getSession()` on the server — use `supabase.auth.getUser()` instead (it validates the JWT)
- Skip connection pooling for serverless environments — use the pooler connection string

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All database changes through migrations (not dashboard clicks)
- RLS on every table, tested before deploy
- TypeScript types regenerated after every schema change
- Server client for Server Components, browser client for Client Components
- Service role client only in trusted server-side code (never client-facing)

## Notes

[Any project-specific context — Supabase project ID, region, plan tier]
