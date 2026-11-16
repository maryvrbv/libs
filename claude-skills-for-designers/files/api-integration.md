# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / React / Vue / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- [Data Fetching: React Query / SWR / fetch / etc.]
- [API Type: REST / GraphQL]

## Workflow: API Integration

This project fetches data from external APIs. This file defines how to connect, fetch, display data with proper loading/error/empty states, handle pagination, cache responses, and manage API keys.

### Client Setup

**Using fetch (built-in):**
```ts
// lib/api/client.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new ApiError(response.status, error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}
```

**Using React Query (recommended for client-side fetching):**
```bash
npm install @tanstack/react-query
```

```tsx
// components/providers/query-provider.tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,          // 1 minute before refetch
        retry: 2,                       // Retry failed requests twice
        refetchOnWindowFocus: false,    // Don't refetch on tab focus
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

```tsx
// app/layout.tsx — wrap app in QueryProvider
import { QueryProvider } from '@/components/providers/query-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
```

### Fetching and Displaying Data

**Server Component (Next.js — preferred for initial data):**
```tsx
// app/products/page.tsx
import { apiClient } from '@/lib/api/client';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default async function ProductsPage() {
  const products = await apiClient<Product[]>('/products');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Client Component with React Query:**
```tsx
// components/products/product-list.tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export function ProductList() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient<Product[]>('/products'),
  });

  if (isLoading) return <ProductListSkeleton />;
  if (error) return <ErrorState message={error.message} onRetry={() => {}} />;
  if (!products?.length) return <EmptyState message="No products found" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Loading States

Always show something while data loads. Never show a blank screen.

**Skeleton loading (preferred — matches final layout):**
```tsx
function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="p-4">
          <Skeleton className="h-48 w-full rounded-lg mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </Card>
      ))}
    </div>
  );
}
```

**Spinner loading (for smaller areas):**
```tsx
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}
```

**Loading within a button (for mutations):**
```tsx
<Button disabled={isPending}>
  {isPending ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Saving...
    </>
  ) : (
    'Save'
  )}
</Button>
```

### Error States

```tsx
// components/ui/error-state.tsx
interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold mb-2">Error</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
```

**Inline error for form fields:**
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" className={error ? 'border-destructive' : ''} />
  {error && <p className="text-sm text-destructive">{error.message}</p>}
</div>
```

### Empty States

```tsx
function EmptyState({ message, action }: { message: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <InboxIcon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Nothing here yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      {action}
    </div>
  );
}

// Usage
<EmptyState
  message="Create your first product to get started."
  action={<Button>Create Product</Button>}
/>
```

### Pagination Patterns

**Load More button:**
```tsx
'use client';
import { useInfiniteQuery } from '@tanstack/react-query';

export function ProductList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 1 }) =>
      apiClient<{ items: Product[]; nextPage: number | null }>(
        `/products?page=${pageParam}&limit=20`
      ),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const products = data?.pages.flatMap(page => page.items) ?? [];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}
```

**Numbered pages:**
```tsx
function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center gap-2 justify-center mt-8">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
```

### CRUD Operations

```ts
// lib/api/products.ts — typed API functions
export const productsApi = {
  list: () => apiClient<Product[]>('/products'),

  get: (id: string) => apiClient<Product>(`/products/${id}`),

  create: (data: CreateProductInput) =>
    apiClient<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Product>) =>
    apiClient<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient<void>(`/products/${id}`, { method: 'DELETE' }),
};
```

**Mutations with React Query:**
```tsx
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateProductForm() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Refetch list
      toast.success('Product created');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (data: CreateProductInput) => {
    mutate(data);
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

### TypeScript Types from API Responses

```ts
// types/api.ts — define types matching the API response shape
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: { id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

interface ApiErrorResponse {
  message: string;
  code: string;
  details?: Record<string, string[]>;
}

type CreateProductInput = Pick<Product, 'name' | 'description' | 'price'>;
type UpdateProductInput = Partial<CreateProductInput>;
```

### Environment Variables for API Keys

```
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com    # Client-accessible
API_SECRET_KEY=sk_...                          # Server-only

# For third-party APIs (server-only)
OPENAI_API_KEY=sk-...
SENDGRID_API_KEY=SG...
```

**Rules:**
- `NEXT_PUBLIC_` prefix makes vars accessible in the browser — only use for public API URLs
- API secret keys stay server-side only (route handlers, Server Components, Server Actions)
- Never log API keys or include them in error messages

### CORS Handling

If calling an external API from the browser and hitting CORS errors:

```ts
// Option 1: Proxy through your own API route (recommended)
// app/api/proxy/[...path]/route.ts
export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const response = await fetch(`https://external-api.com/${path}`, {
    headers: { 'Authorization': `Bearer ${process.env.API_SECRET_KEY}` },
  });
  const data = await response.json();
  return Response.json(data);
}

// Client calls /api/proxy/products instead of external-api.com/products
```

```ts
// Option 2: Server Component (no CORS issue — runs on server)
export default async function Page() {
  const data = await fetch('https://external-api.com/products', {
    headers: { 'Authorization': `Bearer ${process.env.API_SECRET_KEY}` },
  });
  // No CORS — this runs on the server
}
```

### File Structure

```
[project-root]/
├── lib/
│   ├── api/
│   │   ├── client.ts            # Base API client (fetch wrapper)
│   │   ├── products.ts          # Product-specific API functions
│   │   ├── users.ts             # User-specific API functions
│   │   └── auth.ts              # Auth-specific API functions
│   └── utils.ts
├── types/
│   └── api.ts                   # API response types
├── components/
│   ├── providers/
│   │   └── query-provider.tsx   # React Query provider
│   ├── ui/
│   │   ├── error-state.tsx
│   │   ├── empty-state.tsx
│   │   └── skeleton.tsx
│   └── products/
│       ├── product-list.tsx     # Fetches and displays products
│       ├── product-card.tsx     # Single product display
│       └── product-form.tsx     # Create/edit form
├── app/
│   ├── api/
│   │   └── proxy/               # API proxy routes (if needed for CORS)
│   └── products/
│       ├── page.tsx             # Products page
│       └── [id]/page.tsx        # Single product page
└── .env.local                   # API_URL, API keys
```

### Anti-Patterns — Do NOT

- Fetch data in `useEffect` without a library — use React Query, SWR, or Server Components
- Show a blank screen while loading — always use skeletons or spinners
- Ignore error states — every API call can fail; handle it gracefully
- Forget empty states — what does the user see when there's no data?
- Store API secret keys in `NEXT_PUBLIC_` variables — they're exposed to the browser
- Make API calls from the browser to external APIs that need secret keys — proxy through your server
- Cache infinitely without invalidation — stale data causes bugs
- Fetch the same data in multiple components independently — lift the query up or use React Query's deduplication
- Use `any` for API response types — define proper TypeScript interfaces
- Retry failed requests indefinitely — set a retry limit (2-3 max)
- Paginate without showing loading state between pages
- Forget to handle rate limiting (429 status) — add exponential backoff

## Current State

[Where is the project? What's working, what's next?]

## API Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/products` | GET | List all products | No |
| `/products/:id` | GET | Get single product | No |
| `/products` | POST | Create product | Yes |
| `/products/:id` | PUT | Update product | Yes |
| `/products/:id` | DELETE | Delete product | Yes |

## Conventions

- Server Components for initial data fetch (no loading state needed)
- React Query for client-side data that changes (interactive lists, forms)
- All API calls through typed functions in `lib/api/`
- Every data display has loading, error, and empty states
- API keys never in client-side code

## Notes

[Any project-specific context — API documentation URL, rate limits, auth method]
