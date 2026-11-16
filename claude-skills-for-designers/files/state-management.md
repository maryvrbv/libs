# [Project Name]

[Brief description of what this project does.]

---

## Capability: State Management

This project manages client-side state with clear boundaries between server state and UI state. Each type of state lives in the right tool — no single solution handles everything well.

### When to Use What

| State Type | Tool | Examples |
|-----------|------|----------|
| Server data (fetched, cached, synced) | React Query / SWR | User profile, item lists, dashboard stats |
| Global UI state (simple, shared) | Zustand | Sidebar open/closed, modal state, toast queue |
| Atomic/granular state (many independent pieces) | Jotai | Filter selections, form field atoms, feature flags |
| Complex normalized data with history | Redux Toolkit | Document editor state, undo/redo, collaborative data |
| Low-frequency cross-cutting config | React Context | Theme, locale, auth user, feature flags |
| Shareable/bookmarkable state | URL search params | Filters, pagination, sort order, active tab |
| Ephemeral component state | useState / useReducer | Form input, dropdown open, local toggle |

**Decision flow:**
```
Is it from the server? → React Query / SWR
Is it in the URL? (filters, pagination, tabs) → URL search params
Is it used by one component? → useState / useReducer
Is it shared across components? → Zustand (simple) or Jotai (granular)
Is it deeply nested with complex updates? → Redux Toolkit or useReducer
Is it low-frequency config? (theme, auth) → React Context
```

### Server State: React Query

Server state is not your state — it is a cache of someone else's state. React Query manages fetching, caching, revalidation, and synchronization.

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetching data
function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: () => fetch("/api/items").then((r) => r.json()),
    staleTime: 5 * 60 * 1000,    // Consider fresh for 5 minutes
    gcTime: 30 * 60 * 1000,      // Keep in cache for 30 minutes
  });
}

// Parameterized queries
function useItem(id: string) {
  return useQuery({
    queryKey: ["items", id],
    queryFn: () => fetch(`/api/items/${id}`).then((r) => r.json()),
    enabled: !!id,                // Don't fetch until id exists
  });
}

// Mutations with optimistic updates
function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: Item) => fetch(`/api/items/${item.id}`, {
      method: "PUT",
      body: JSON.stringify(item),
    }),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["items", newItem.id] });
      const previous = queryClient.getQueryData(["items", newItem.id]);
      queryClient.setQueryData(["items", newItem.id], newItem);
      return { previous };
    },
    onError: (_err, _newItem, context) => {
      queryClient.setQueryData(["items", context?.previous], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
```

**Rules:**
- Every API call goes through React Query — no `useEffect` + `fetch` patterns.
- Query keys are arrays, structured from general to specific: `["items"]`, `["items", id]`, `["items", { status: "active" }]`.
- Set `staleTime` based on how often data changes. Defaults to 0 (always stale) which causes excessive refetching.
- Use `enabled` to conditionally fetch — do not put queries inside conditionals.

### Zustand: Global UI State

Zustand is for simple shared state that multiple components read or write. No providers, no boilerplate.

**Creating a store:**
```ts
import { create } from "zustand";

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  activeModal: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  activeModal: null,
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));
```

**Using selectors (prevents unnecessary re-renders):**
```tsx
// Good — only re-renders when sidebarOpen changes
const sidebarOpen = useUIStore((state) => state.sidebarOpen);
const toggleSidebar = useUIStore((state) => state.toggleSidebar);

// Bad — re-renders on ANY store change
const store = useUIStore();
```

**Always use selectors.** Selecting the entire store is the most common Zustand mistake.

**Middleware — persist to localStorage:**
```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      viewMode: "grid" as "grid" | "list",
      setViewMode: (mode) => set({ viewMode: mode }),
      itemsPerPage: 25,
      setItemsPerPage: (n) => set({ itemsPerPage: n }),
    }),
    {
      name: "user-preferences",   // localStorage key
      partialize: (state) => ({   // Only persist these fields
        viewMode: state.viewMode,
        itemsPerPage: state.itemsPerPage,
      }),
    }
  )
);
```

**Middleware — devtools:**
```ts
import { devtools } from "zustand/middleware";

export const useStore = create<Store>()(
  devtools(
    (set) => ({
      // ... store definition
    }),
    { name: "AppStore" }
  )
);
```

**Combining middleware:**
```ts
export const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({ /* ... */ }),
      { name: "store-key" }
    ),
    { name: "StoreName" }
  )
);
```

### Jotai: Atomic State

Jotai is for fine-grained, composable state. Each atom is an independent piece of state. Components subscribe to only the atoms they use.

**Basic atoms:**
```ts
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

// Primitive atom
const countAtom = atom(0);

// In a component
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}

// Read-only access (no setter needed)
function Display() {
  const count = useAtomValue(countAtom);
  return <span>{count}</span>;
}

// Write-only access (no value needed)
function IncrementButton() {
  const setCount = useSetAtom(countAtom);
  return <button onClick={() => setCount((c) => c + 1)}>+</button>;
}
```

**Derived atoms (computed state):**
```ts
const itemsAtom = atom<Item[]>([]);
const searchQueryAtom = atom("");

// Derived — recalculates when dependencies change
const filteredItemsAtom = atom((get) => {
  const items = get(itemsAtom);
  const query = get(searchQueryAtom).toLowerCase();
  if (!query) return items;
  return items.filter((item) =>
    item.title.toLowerCase().includes(query) || item.tags.some((t) => t.includes(query))
  );
});

// Derived with count
const filteredCountAtom = atom((get) => get(filteredItemsAtom).length);
```

**Write-only atoms (actions):**
```ts
const addItemAtom = atom(null, (get, set, newItem: Item) => {
  const items = get(itemsAtom);
  set(itemsAtom, [...items, { ...newItem, id: crypto.randomUUID() }]);
});

const removeItemAtom = atom(null, (get, set, id: string) => {
  const items = get(itemsAtom);
  set(itemsAtom, items.filter((item) => item.id !== id));
});
```

**Async atoms:**
```ts
const userAtom = atom(async () => {
  const res = await fetch("/api/user");
  return res.json();
});

// Component using async atom — wrap in Suspense
function UserProfile() {
  const user = useAtomValue(userAtom);
  return <span>{user.name}</span>;
}

// In the parent:
// <Suspense fallback={<Skeleton />}><UserProfile /></Suspense>
```

### React Context: Low-Frequency Config

Context is right for values that rarely change and affect many components: theme, locale, authenticated user, feature flags.

**Pattern:**
```tsx
interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession().then(setUser).finally(() => setIsLoading(false));
  }, []);

  const login = async (credentials: Credentials) => {
    const user = await apiLogin(credentials);
    setUser(user);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(() => ({ user, isLoading, login, logout }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook with safety check
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
```

**Avoiding re-renders with Context:**
- Split contexts by update frequency. Do not put theme and user and notifications in one context.
- Memoize the context value with `useMemo`.
- If a child only needs part of the context, extract it into a selector hook:

```tsx
export function useUser() {
  const { user } = useAuth();
  return user;
}

export function useIsAuthenticated() {
  const { user, isLoading } = useAuth();
  return { isAuthenticated: !!user, isLoading };
}
```

### URL State: Search Params

Filters, pagination, sort order, and active tabs belong in the URL. They should survive refresh and be shareable.

```tsx
import { useSearchParams } from "react-router-dom"; // or next/navigation

function useFilterState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    query: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? "all",
    sort: searchParams.get("sort") ?? "newest",
    page: parseInt(searchParams.get("page") ?? "1", 10),
  };

  const setFilter = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value && value !== "all" && value !== "1") {
        next.set(key, value);
      } else {
        next.delete(key);  // Remove default values from URL
      }
      if (key !== "page") next.delete("page"); // Reset page when filters change
      return next;
    });
  };

  return { filters, setFilter };
}
```

**Rules:**
- Only store values that differ from defaults in the URL.
- Reset pagination when filters change.
- Debounce search query updates (300ms) before writing to the URL.
- Use `replace` instead of `push` for filter changes to avoid polluting browser history.

### Common Patterns

**Loading and error states per action:**
```ts
interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// In Zustand
interface ItemStore {
  items: Item[];
  createStatus: { isLoading: boolean; error: string | null };
  deleteStatus: { isLoading: boolean; error: string | null };
  createItem: (item: NewItem) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}
```

Track loading/error per action, not globally. Users need to know which operation failed.

**Optimistic updates:**
```ts
// Pattern: update UI immediately, roll back on error
const deleteItem = async (id: string) => {
  const previousItems = get().items;
  set({ items: get().items.filter((i) => i.id !== id) }); // Optimistic remove
  try {
    await api.deleteItem(id);
  } catch (error) {
    set({ items: previousItems }); // Roll back
    toast.error("Failed to delete item");
  }
};
```

**State machines for complex flows:**
```ts
type UploadState =
  | { status: "idle" }
  | { status: "selecting" }
  | { status: "uploading"; progress: number }
  | { status: "processing" }
  | { status: "complete"; url: string }
  | { status: "error"; message: string };

// Discriminated union prevents impossible states.
// You cannot have progress without being in "uploading".
// You cannot have a url without being in "complete".
```

**Computed/derived state:**
```ts
// Zustand — derive in selectors, not in the store
const useItemCount = () => useItemStore((state) => state.items.length);
const useActiveItems = () => useItemStore((state) => state.items.filter((i) => i.status === "active"));

// Jotai — derive in atoms
const activeItemsAtom = atom((get) => get(itemsAtom).filter((i) => i.status === "active"));
const itemCountAtom = atom((get) => get(itemsAtom).length);
```

Never store derived values separately. Compute them on read.

### Anti-Patterns — Do NOT

- Put everything in global state — most state is local to one component; start with `useState`
- Use React Context for frequently-updated state — every consumer re-renders on every change
- Store server data in Zustand/Redux — use React Query/SWR; they handle caching, revalidation, and stale data
- Select the entire Zustand store (`const store = useStore()`) — always use selectors
- Store derived state separately from its source — compute it in selectors or derived atoms
- Use `useEffect` to sync state between two stores — this means your state model is wrong
- Create one mega-store for everything — split stores by domain (ui, preferences, [feature])
- Mutate state directly in Zustand — always use `set()` to trigger re-renders
- Put form state in global state — forms are local; use `useState`, `useReducer`, or a form library
- Forget to memoize Context values — wrap the value object in `useMemo`
- Use Redux for a simple app — the boilerplate is not worth it unless you need normalized data, middleware, or time-travel debugging
- Store UI state in the URL that should not be shareable (modal open state, tooltip visibility)
- Initialize stores with expensive computations without using lazy initializers
- Forget loading and error states — every async operation needs both

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Server state: React Query — all API data flows through query hooks
- Global UI state: [Zustand / Jotai] — for shared component state
- Config state: React Context — for theme, auth, locale
- URL state: search params — for filters, pagination, sort
- Local state: useState — for everything else
- Derived state is always computed, never stored

## Notes

[Any project-specific context — which state library is in use, special patterns, migration notes.]
