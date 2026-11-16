# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- Nuxt 3
- Vue 3 (Composition API)
- TypeScript
- [Styling: Tailwind CSS / UnoCSS / Nuxt UI / etc.]
- [Data: Prisma / Drizzle / Supabase / etc.]

## Framework: Nuxt 3 + Vue 3

This project uses Nuxt 3 — a full-stack Vue framework with file-based routing, server-side rendering, and auto-imports. All components use the Vue 3 Composition API with `<script setup>`.

### Component Syntax

Always use `<script setup lang="ts">` — the Composition API syntax:

```vue
<script setup lang="ts">
const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>

<template>
  <div>
    <p>{{ count }} (doubled: {{ doubled }})</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

**Rules:**
- Always use `<script setup>` — never Options API (`data()`, `methods`, `computed`)
- Always use `lang="ts"` for TypeScript
- Reactivity: `ref()` for primitives, `reactive()` for objects, `computed()` for derived values
- Access `ref` values with `.value` in script, without `.value` in template

### Auto-Imports

Nuxt auto-imports Vue utilities and composables — no import statements needed:

```vue
<script setup lang="ts">
// These are all auto-imported:
const route = useRoute();          // Current route info
const router = useRouter();        // Programmatic navigation
const count = ref(0);              // Vue ref
const doubled = computed(() => count.value * 2);  // Vue computed
const { data } = await useFetch('/api/posts');     // Data fetching
</script>
```

Auto-imported from Vue: `ref`, `reactive`, `computed`, `watch`, `watchEffect`, `onMounted`, `onUnmounted`, `nextTick`, `toRef`, `toRefs`.

Auto-imported from Nuxt: `useFetch`, `useAsyncData`, `useLazyFetch`, `useRoute`, `useRouter`, `useHead`, `useSeoMeta`, `useRuntimeConfig`, `navigateTo`, `definePageMeta`.

Components in `components/` are also auto-imported by filename.

### Routing

File-based routing in `pages/`:

```
pages/
├── index.vue               # /
├── about.vue               # /about
├── blog/
│   ├── index.vue           # /blog
│   └── [slug].vue          # /blog/my-post (dynamic)
├── dashboard/
│   ├── index.vue           # /dashboard
│   └── settings.vue        # /dashboard/settings
└── [...slug].vue           # Catch-all 404
```

**Layouts** — shared UI wrappers in `layouts/`:
```
layouts/
├── default.vue             # Default layout (navbar + footer)
└── dashboard.vue           # Dashboard layout (sidebar)
```

Use in a page:
```vue
<script setup>
definePageMeta({ layout: 'dashboard' });
</script>
```

**Navigation:**
```vue
<NuxtLink to="/about">About</NuxtLink>         <!-- Preferred -->
<script setup>
navigateTo('/dashboard');                         // Programmatic
</script>
```

**Middleware** — route guards in `middleware/`:
```ts
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const user = useAuth();
  if (!user.value) return navigateTo('/login');
});
```

Apply per-page: `definePageMeta({ middleware: 'auth' })`.

### Data Fetching

Use Nuxt composables — no `axios`, no `fetch` in `onMounted`:

```vue
<script setup lang="ts">
// useFetch — simple API calls (auto-cached, SSR-friendly)
const { data: posts, pending, error } = await useFetch('/api/posts');

// useAsyncData — when you need custom logic
const { data } = await useAsyncData('user', () => $fetch(`/api/users/${id}`));

// useLazyFetch — don't block navigation (loads in background)
const { data: comments, pending } = useLazyFetch('/api/comments');
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>
```

**Server API routes** in `server/api/`:
```ts
// server/api/posts.get.ts
export default defineEventHandler(async () => {
  return await db.posts.findMany();
});

// server/api/posts.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await db.posts.create({ data: body });
});
```

**Rules:**
- Use `useFetch` for API calls, not `fetch` or `axios`
- Fetch data at the top level of `<script setup>`, not inside `onMounted`
- Use `server/api/` for backend logic, not external API routes
- Use `useLazyFetch` when the data isn't needed for initial render
- Use `$fetch` in event handlers (client-side actions after initial load)

### SEO & Head

```vue
<script setup>
useSeoMeta({
  title: 'Page Title',
  description: 'Page description',
  ogTitle: 'Page Title',
  ogDescription: 'Page description',
  ogImage: '/og-image.png',
});

// Or for dynamic values
useHead({
  title: computed(() => post.value?.title),
});
</script>
```

Set default meta in `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Site Name',
      meta: [{ name: 'description', content: 'Default description' }],
    },
  },
});
```

### State Management

Use Vue's built-in reactivity + Nuxt's `useState` for shared state:

```ts
// composables/useAuth.ts
export const useAuth = () => {
  return useState<User | null>('auth', () => null);
};
```

`useState` is SSR-safe and shared across components. For complex state, use Pinia (Nuxt's official store):

```ts
// stores/cart.ts
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const total = computed(() => items.value.reduce((sum, i) => sum + i.price, 0));
  function addItem(item: CartItem) { items.value.push(item); }
  return { items, total, addItem };
});
```

### File Structure

```
app/
├── pages/                    # File-based routes
├── layouts/                  # Layout wrappers
├── components/
│   ├── ui/                   # Reusable UI (Button, Card, etc.)
│   └── [Feature]/            # Feature components
├── composables/              # Shared composables (auto-imported)
├── stores/                   # Pinia stores (if needed)
├── server/
│   ├── api/                  # API routes
│   ├── middleware/            # Server middleware
│   └── utils/                # Server utilities
├── middleware/                # Route middleware
├── plugins/                  # Nuxt plugins
├── public/                   # Static assets
├── assets/                   # Processed assets (CSS, images)
└── nuxt.config.ts            # Nuxt configuration
```

### Naming Conventions

- **Pages:** `kebab-case.vue` (maps to URL segments)
- **Components:** `PascalCase.vue` — auto-imported by filename
- **Composables:** `use[Name].ts` in `composables/` — auto-imported
- **API routes:** `[resource].[method].ts` (e.g., `posts.get.ts`, `posts.post.ts`)
- **Stores:** `use[Name]Store` in `stores/`
- **Middleware:** `kebab-case.ts`

### Template Directives

```vue
<template>
  <!-- Conditional -->
  <div v-if="isLoggedIn">Welcome</div>
  <div v-else-if="isLoading">Loading...</div>
  <div v-else>Please log in</div>

  <!-- Show/hide (keeps in DOM) -->
  <div v-show="isVisible">Toggle me</div>

  <!-- Lists (always provide :key) -->
  <div v-for="item in items" :key="item.id">{{ item.name }}</div>

  <!-- Events -->
  <button @click="handleClick">Click</button>
  <form @submit.prevent="handleSubmit">...</form>
  <input @keyup.enter="search">

  <!-- Two-way binding -->
  <input v-model="searchQuery">

  <!-- Dynamic classes -->
  <div :class="{ active: isActive, 'text-bold': isBold }">Styled</div>
  <div :class="[baseClass, isActive && 'active']">Styled</div>
</template>
```

### Anti-Patterns — Do NOT

- Use Options API (`data()`, `methods`, `computed` as options) — use Composition API
- Add manual import statements for auto-imported utilities (Vue, Nuxt composables, components)
- Fetch data in `onMounted` — use `useFetch` / `useAsyncData` at top level
- Use `axios` — use `useFetch` / `$fetch`
- Use Vuex — use Pinia or `useState`
- Use `this` — there is no `this` in `<script setup>`
- Mutate props directly — emit events to parent or use `defineModel()`
- Skip `v-if` / `v-else` patterns for loading and error states
- Forget `:key` on `v-for` loops
- Create watchers when `computed` works — `computed` is simpler and more efficient
- Import components manually — Nuxt auto-imports from `components/`
- Put business logic in components — extract to composables

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- `<script setup lang="ts">` on every component
- Composition API only, no Options API
- Composables for shared logic (auto-imported from `composables/`)
- Server API routes for all backend logic
- TypeScript strict mode
- Keep components small — extract reusable pieces to `components/ui/`
- Colocate related files near their feature

## Notes

[Any project-specific context]
