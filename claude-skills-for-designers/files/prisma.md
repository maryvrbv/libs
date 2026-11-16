# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / Express / Fastify / SvelteKit / etc.]
- TypeScript
- [Styling: file reference]
- **Prisma ORM** (database access, migrations, type generation)
- [Database: PostgreSQL / MySQL / SQLite / MongoDB]

## Database: Prisma ORM

This project uses Prisma as the database toolkit — a TypeScript-first ORM with a declarative schema, auto-generated type-safe client, and migration system. All database access goes through the Prisma Client. Raw SQL is available when needed but should be the exception.

### Setup

```bash
npm install prisma @prisma/client
npx prisma init
```

This creates `prisma/schema.prisma` and a `.env` file with `DATABASE_URL`.

```env
# .env
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]?schema=public"
```

### Schema Design (schema.prisma)

The schema file is the single source of truth for your database structure. It defines models (tables), fields (columns), relations, enums, and indexes.

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // or "mysql", "sqlite", "mongodb"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@map("users")  // Custom table name
}

model Profile {
  id     String  @id @default(cuid())
  bio    String?
  avatar String?
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String  @unique

  @@map("profiles")
}

model Post {
  id          String    @id @default(cuid())
  title       String
  content     String?
  published   Boolean   @default(false)
  author      User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId    String
  tags        Tag[]
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([authorId])
  @@index([published, createdAt])
  @@map("posts")
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]

  @@map("tags")
}
```

**Schema rules:**
- Every model gets `id`, `createdAt`, and `updatedAt`
- Use `cuid()` or `uuid()` for IDs — never auto-increment integers in public-facing apps
- Use `@unique` on fields that must be unique (email, slug, username)
- Use `@@index` on fields you filter or sort by — especially foreign keys
- Use `@@unique` for composite unique constraints: `@@unique([authorId, slug])`
- Use `@updatedAt` on the `updatedAt` field — Prisma auto-manages it
- Use `onDelete: Cascade` on relations where dependent records should be deleted
- Use `?` for optional fields, no `?` for required
- Use `@map` and `@@map` to use snake_case table/column names in the database while keeping camelCase in Prisma

### Prisma Client — Singleton Pattern

In serverless environments (Next.js, Vercel, AWS Lambda), a new Prisma Client instance is created on every request, which can exhaust database connections. Use the singleton pattern.

```ts
// lib/prisma.ts (or lib/db.ts)
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

**Rules:**
- Import `prisma` from this file everywhere — never create `new PrismaClient()` elsewhere
- In development, the singleton prevents hot-reload from creating multiple instances
- In production on serverless, connections are still limited — use connection pooling (PgBouncer, Prisma Accelerate, or Supabase pooler) for high-traffic apps

### CRUD Operations

**Create:**
```ts
// Create a single record
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    profile: {
      create: { bio: 'Engineer' },  // Nested create
    },
  },
  include: { profile: true },  // Return the relation
});

// Create many
const count = await prisma.user.createMany({
  data: [
    { email: 'bob@example.com', name: 'Bob' },
    { email: 'carol@example.com', name: 'Carol' },
  ],
  skipDuplicates: true,
});
```

**Read:**
```ts
// Find unique (by unique field)
const user = await prisma.user.findUnique({
  where: { email: 'alice@example.com' },
  include: { posts: true, profile: true },
});

// Find first (by any field)
const admin = await prisma.user.findFirst({
  where: { role: 'ADMIN' },
});

// Find many with filters, sorting, pagination
const posts = await prisma.post.findMany({
  where: {
    published: true,
    author: { role: 'ADMIN' },  // Filter through relations
  },
  orderBy: { createdAt: 'desc' },
  skip: 0,
  take: 20,
  include: {
    author: { select: { name: true, email: true } },
    tags: true,
  },
});

// Count
const totalPosts = await prisma.post.count({
  where: { published: true },
});
```

**Update:**
```ts
// Update one
const updated = await prisma.post.update({
  where: { id: postId },
  data: {
    title: 'Updated Title',
    tags: {
      connect: [{ id: tagId }],     // Add existing tag
      disconnect: [{ id: oldTagId }], // Remove tag
    },
  },
});

// Update many
const result = await prisma.post.updateMany({
  where: { authorId: userId, published: false },
  data: { published: true },
});
```

**Delete:**
```ts
// Delete one
await prisma.post.delete({
  where: { id: postId },
});

// Delete many
await prisma.post.deleteMany({
  where: { authorId: userId },
});
```

**Upsert (create or update):**
```ts
const user = await prisma.user.upsert({
  where: { email: 'alice@example.com' },
  update: { name: 'Alice Updated' },
  create: { email: 'alice@example.com', name: 'Alice' },
});
```

### Filtering

```ts
const results = await prisma.post.findMany({
  where: {
    // Exact match
    published: true,

    // String filters
    title: { contains: 'prisma', mode: 'insensitive' },
    title: { startsWith: 'How' },
    title: { endsWith: 'Guide' },

    // Comparison
    createdAt: { gte: new Date('2024-01-01') },
    createdAt: { lt: new Date('2025-01-01') },

    // IN
    authorId: { in: [id1, id2, id3] },

    // NULL checks
    publishedAt: { not: null },  // IS NOT NULL
    content: null,               // IS NULL

    // Combinators
    AND: [
      { published: true },
      { createdAt: { gte: new Date('2024-01-01') } },
    ],
    OR: [
      { title: { contains: 'prisma' } },
      { title: { contains: 'database' } },
    ],
    NOT: {
      authorId: blockedUserId,
    },
  },
});
```

### Pagination

**Offset-based (simple, good for pages 1-10):**
```ts
const page = 1;
const pageSize = 20;

const [posts, total] = await Promise.all([
  prisma.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
  }),
  prisma.post.count(),
]);

const totalPages = Math.ceil(total / pageSize);
```

**Cursor-based (better for infinite scroll, large datasets):**
```ts
const posts = await prisma.post.findMany({
  take: 20,
  skip: 1,                          // Skip the cursor itself
  cursor: { id: lastPostId },       // Start after this record
  orderBy: { createdAt: 'desc' },
});

const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;
```

### Relations

**Select specific fields (reduce payload):**
```ts
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    _count: { select: { posts: true } },  // Count relations
  },
});
```

**Include vs Select:**
- `include` — return all fields of the model PLUS the specified relations
- `select` — return ONLY the specified fields (exclusive with `include`)
- Never use both `include` and `select` on the same level

**Nested writes (create related records in one operation):**
```ts
const post = await prisma.post.create({
  data: {
    title: 'My Post',
    author: { connect: { id: userId } },       // Link to existing user
    tags: {
      connectOrCreate: [
        { where: { name: 'prisma' }, create: { name: 'prisma' } },
        { where: { name: 'database' }, create: { name: 'database' } },
      ],
    },
  },
  include: { author: true, tags: true },
});
```

### Transactions

**Interactive transactions (multiple operations that must all succeed or all fail):**
```ts
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { email: 'new@example.com', name: 'New User' },
  });

  const post = await tx.post.create({
    data: { title: 'First Post', authorId: user.id },
  });

  return { user, post };
});
```

**Batch transactions (array of operations):**
```ts
const [deletedPosts, updatedUser] = await prisma.$transaction([
  prisma.post.deleteMany({ where: { authorId: userId } }),
  prisma.user.update({
    where: { id: userId },
    data: { role: 'ADMIN' },
  }),
]);
```

**Rules:**
- Use transactions when multiple writes must be atomic
- Interactive transactions (`$transaction(async (tx) => ...)`) give you full control
- Use the `tx` client inside the transaction, not the global `prisma` client
- Set a timeout for long transactions: `prisma.$transaction(fn, { timeout: 10000 })`

### Migrations

```bash
# Create and apply a migration (development)
npx prisma migrate dev --name [migration-name]

# Apply pending migrations (production / CI)
npx prisma migrate deploy

# Push schema changes without creating a migration file (prototyping only)
npx prisma db push

# Reset the database (drops all data, re-applies migrations)
npx prisma migrate reset

# Check migration status
npx prisma migrate status

# Generate Prisma Client (after schema changes, without migrating)
npx prisma generate
```

**Rules:**
- Use `prisma migrate dev` during development — it creates migration files and applies them
- Use `prisma migrate deploy` in production/CI — it only applies pending migrations, never creates them
- Use `prisma db push` only for rapid prototyping — it doesn't create migration files
- Never edit migration files after they've been applied to a shared database
- Commit migration files to version control
- Use descriptive migration names: `add_tags_table`, `make_email_unique`, `add_published_at_to_posts`

### Seeding

```ts
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create seed data
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      role: 'ADMIN',
      posts: {
        create: [
          { title: 'First Post', content: 'Hello world', published: true },
          { title: 'Draft Post', content: 'Work in progress' },
        ],
      },
    },
  });

  console.log(`Seeded: ${alice.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

```json
// package.json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

```bash
# Run seed manually
npx prisma db seed

# Seed runs automatically with:
npx prisma migrate reset
```

### Prisma Studio

```bash
# Open a visual database browser
npx prisma studio
```

Opens at `http://localhost:5555`. Use it to view and edit data during development. Never run it against production.

### TypeScript Types

Prisma auto-generates types from your schema. They update every time you run `prisma generate` or `prisma migrate dev`.

```ts
import { User, Post, Role } from '@prisma/client';

// Full model types
type UserWithPosts = User & { posts: Post[] };

// Prisma utility types (match specific query shapes)
import { Prisma } from '@prisma/client';

type UserCreateInput = Prisma.UserCreateInput;
type PostWhereInput = Prisma.PostWhereInput;

// Type-safe query results that match your select/include
const userWithPosts = await prisma.user.findUnique({
  where: { id: userId },
  include: { posts: true },
});
// typeof userWithPosts = (User & { posts: Post[] }) | null
```

**Rules:**
- Never manually define types that match your database models — use the generated types
- Run `npx prisma generate` after every schema change
- Use `Prisma.` namespace types for input/where/orderBy types in function signatures

### Raw SQL

For complex queries that Prisma's API can't express:

```ts
// Tagged template (safe from SQL injection)
const result = await prisma.$queryRaw<{ id: string; total: number }[]>`
  SELECT author_id as id, COUNT(*) as total
  FROM posts
  WHERE published = true
  GROUP BY author_id
  ORDER BY total DESC
  LIMIT 10
`;

// Execute (for INSERT/UPDATE/DELETE that don't return rows)
await prisma.$executeRaw`
  UPDATE posts SET published = true WHERE created_at < ${cutoffDate}
`;
```

**Rules:**
- Always use tagged template literals (`$queryRaw\`...\``) — they parameterize inputs and prevent SQL injection
- Never use `$queryRawUnsafe` with user input
- Type the result explicitly — raw queries return unknown shapes
- Use raw SQL sparingly — if Prisma's API can do it, prefer that

### Middleware

```ts
// lib/prisma.ts
const prisma = new PrismaClient();

// Logging middleware
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(`${params.model}.${params.action} took ${after - before}ms`);
  return result;
});

// Soft delete middleware
prisma.$use(async (params, next) => {
  if (params.model === 'Post') {
    if (params.action === 'delete') {
      params.action = 'update';
      params.args.data = { deletedAt: new Date() };
    }
    if (params.action === 'findMany') {
      params.args.where = { ...params.args.where, deletedAt: null };
    }
  }
  return next(params);
});
```

### File Structure

```
[project-root]/
├── prisma/
│   ├── schema.prisma             # Database schema (single source of truth)
│   ├── seed.ts                   # Seed data script
│   └── migrations/               # Migration files (auto-generated, committed)
│       ├── 20240101_init/
│       │   └── migration.sql
│       └── 20240115_add_tags/
│           └── migration.sql
├── lib/
│   └── prisma.ts                 # Singleton Prisma Client
├── .env                          # DATABASE_URL (gitignored)
└── .env.example                  # Template without secrets (committed)
```

### Anti-Patterns — Do NOT

- Create `new PrismaClient()` in multiple files — use the singleton pattern from `lib/prisma.ts`
- Skip `@updatedAt` — add it to every model so you always know when a record changed
- Use auto-increment integers as public IDs — use `cuid()` or `uuid()` to prevent enumeration
- Forget indexes on foreign keys and frequently filtered columns — queries will be slow
- Edit migration files after they've been applied to a shared environment
- Use `prisma db push` in production — use `prisma migrate deploy`
- Use both `include` and `select` on the same query level — they are mutually exclusive
- Fetch all records without pagination — always use `take` (and optionally `skip` or `cursor`)
- Use `$queryRawUnsafe` with user input — it's vulnerable to SQL injection
- Ignore the Prisma Client return types — they tell you exactly what shape you'll get
- Forget to run `prisma generate` after schema changes — your types will be stale
- Store the `DATABASE_URL` in committed files — keep it in `.env` (gitignored)
- Skip the seed file — having reproducible dev data saves time
- Use the global `prisma` client inside a `$transaction` callback — use the `tx` parameter
- Run `prisma studio` against production databases — use a read replica or local copy

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All database changes through `prisma migrate dev` (development) and `prisma migrate deploy` (production)
- Schema is the source of truth — never modify the database directly
- Prisma Client imported from `lib/prisma.ts` singleton
- Types imported from `@prisma/client` — never manually duplicate model types
- Migrations committed to version control
- Seed data maintained for reproducible development environments

## Notes

[Any project-specific context — database provider, connection pooling setup, Prisma version]
