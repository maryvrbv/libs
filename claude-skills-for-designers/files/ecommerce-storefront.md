# [Project Name]

[One-line description of what this store sells and who it serves.]

---

## Project Type: E-Commerce Storefront

This is a product-focused e-commerce storefront. The goal is to move visitors from browsing to purchase with minimal friction. Every page exists to showcase products, build confidence, and reduce barriers to checkout.

### Site Structure

```
/                               # Home — featured products, categories, promos
/products                       # Product grid (all products, filterable)
/products/[slug]                # Product detail page
/products/category/[cat]        # Category-filtered listing
/cart                           # Cart page (or cart drawer)
/checkout                       # Checkout flow
/checkout/confirmation          # Order confirmation
/search                         # Search results
/wishlist                       # Saved items (authenticated)
/account                        # User account (orders, addresses, profile)
```

### File Structure

```
[root]/
├── components/
│   ├── layout/
│   │   ├── navbar.tsx              # Site header (logo, search, cart, account)
│   │   ├── footer.tsx              # Footer (links, policies, newsletter)
│   │   ├── breadcrumbs.tsx         # Breadcrumb navigation
│   │   └── announcement-bar.tsx    # Top banner (sales, shipping threshold)
│   ├── product/
│   │   ├── product-card.tsx        # Card for product grid
│   │   ├── product-grid.tsx        # Grid layout with filters
│   │   ├── product-filters.tsx     # Sidebar/top filter controls
│   │   ├── product-sort.tsx        # Sort dropdown
│   │   ├── product-gallery.tsx     # Image gallery with zoom
│   │   ├── variant-selector.tsx    # Size, color, option pickers
│   │   ├── size-guide.tsx          # Size guide modal/drawer
│   │   ├── add-to-cart.tsx         # Add to cart button with quantity
│   │   ├── product-reviews.tsx     # Review list + write review
│   │   ├── related-products.tsx    # "You may also like" section
│   │   └── wishlist-button.tsx     # Save/unsave toggle
│   ├── cart/
│   │   ├── cart-drawer.tsx         # Slide-out cart panel
│   │   ├── cart-page.tsx           # Full cart page (alternative to drawer)
│   │   ├── cart-item.tsx           # Single cart line item
│   │   ├── cart-summary.tsx        # Subtotal, taxes, shipping estimate
│   │   └── cart-icon.tsx           # Navbar cart icon with item count badge
│   ├── checkout/
│   │   ├── checkout-form.tsx       # Shipping + payment form
│   │   ├── checkout-summary.tsx    # Order summary sidebar
│   │   ├── checkout-steps.tsx      # Progress indicator
│   │   └── order-confirmation.tsx  # Thank you page content
│   ├── search/
│   │   ├── search-bar.tsx          # Search input with autocomplete
│   │   └── search-results.tsx      # Results grid
│   └── newsletter-signup.tsx       # Email capture
├── hooks/
│   ├── use-cart.ts                 # Cart state management
│   ├── use-wishlist.ts             # Wishlist state
│   └── use-filters.ts             # Filter/sort state for product grid
├── lib/
│   ├── cart.ts                     # Cart logic (add, remove, update, totals)
│   ├── format.ts                   # Currency formatting, price display
│   └── api.ts                      # Product and order API client
├── types/
│   ├── product.ts                  # Product, Variant, Option types
│   ├── cart.ts                     # Cart, CartItem types
│   └── order.ts                    # Order, Address types
└── pages/
```

### Navigation and Header

**Navbar structure:**
```
┌──────────────────────────────────────────────────────┐
│ [Free shipping on orders over $X]                     │  ← Announcement bar
├──────────────────────────────────────────────────────┤
│ [Logo]   [Shop ▾] [Categories]   [Search] [♡] [🛒 3] │  ← Main nav
└──────────────────────────────────────────────────────┘
```

- **Logo** — links to home.
- **Shop dropdown** — mega menu or dropdown with categories.
- **Search** — expands to a search input with autocomplete suggestions (products, categories).
- **Wishlist icon** — heart icon, links to /wishlist.
- **Cart icon** — bag/cart icon with item count badge. Clicking opens cart drawer.

**Breadcrumbs:** Shown on product pages and category pages.
```
Home > [Category] > [Product Name]
```

**Mobile nav:**
- Hamburger menu with category links.
- Search icon (opens full-screen search overlay).
- Cart icon with badge persists in the top bar.

### Product Grid

The main browsing experience.

**Product card structure:**
- Product image (hover: show second image or quick-add overlay)
- Product name
- Price (sale price + original price with strikethrough if discounted)
- Rating stars (if reviews exist)
- Color swatches (optional, for multi-color products)
- Wishlist heart icon (top-right of image)

**Grid layout:**
- Desktop: 3-4 columns
- Tablet: 2-3 columns
- Mobile: 2 columns (or 1 for larger cards)

**Filters:**
- **Position:** Sidebar on desktop, drawer/modal on mobile (triggered by "Filter" button).
- **Filter types:**
  - Category (checkbox list)
  - Price range (slider or min/max inputs)
  - [Size / Color / Material / etc.] (checkbox or swatch)
  - Rating (star filter)
  - Availability (in stock / out of stock)
- **Active filters:** Show as removable chips/badges above the grid.
- **Clear all:** Button to reset all filters.
- **Count:** Show number of matching products ("42 products").

**Sorting:**
- Dropdown: "Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Selling", "Top Rated"
- Default: "Featured" (curated order).

**Pagination or infinite scroll:**
- Paginated: show page numbers + previous/next. Better for SEO.
- Infinite scroll: "Load More" button (not auto-loading — users should choose). Better for mobile browsing.

### Product Detail Page

The most critical page for conversion.

**Structure:**
```
┌─────────────────────────────────────────────┐
│ Breadcrumbs                                  │
├────────────────────┬────────────────────────┤
│                    │ Product Title            │
│  [Image Gallery]   │ Price / Sale price       │
│                    │ Rating (★★★★☆ 42 reviews)│
│  [thumbnails]      │ Short description        │
│                    │ [Variant selectors]       │
│                    │ [Size guide link]         │
│                    │ [Quantity] [Add to Cart]  │
│                    │ [♡ Add to Wishlist]       │
│                    │ Shipping info             │
├────────────────────┴────────────────────────┤
│ Tabs: Description | Reviews | Size Guide     │
├─────────────────────────────────────────────┤
│ Related Products                             │
└─────────────────────────────────────────────┘
```

**Image gallery:**
- Main image (large) with thumbnail strip below or to the left.
- Click thumbnail to switch main image.
- Click main image to open a zoom view (lightbox or inline zoom on hover).
- Swipe on mobile to navigate between images.
- Support 3-8 images per product.
- First image is the LCP element — load eagerly with `fetchpriority="high"`.

**Variant selector:**
- **Color:** Swatch circles (filled with the color or pattern). Active: ring/border.
- **Size:** Button group (S, M, L, XL). Unavailable sizes: grayed out with strike-through.
- **Other options:** Dropdown selectors.
- Changing a variant updates: price, images, availability, SKU.

**Size guide:**
- Link below the size selector: "Size Guide".
- Opens a modal/drawer with a measurement table.
- Include a "How to measure" illustration if applicable.

**Add to cart:**
- Quantity selector (increment/decrement buttons, minimum 1).
- "Add to Cart" button (primary, full-width on mobile).
- On success: open cart drawer, or show a toast confirmation with "View Cart" link.
- Out of stock: disable button, show "Out of Stock" label. Optional: "Notify me" email capture.

**Reviews section:**
- Average rating + total review count at the top.
- Star breakdown bar chart (5 star: ████░ 70%).
- Individual reviews: star rating, reviewer name, date, review text.
- "Write a Review" button.
- Paginated if more than 10 reviews.

### Cart

**Cart state management (client-side):**
- Store cart in localStorage (guest) or synced to server (authenticated).
- Cart persists across page reloads and browser sessions.
- Cart state: items (product, variant, quantity, price), subtotal, item count.

**Cart hook/store API:**
```
addItem(productId, variantId, quantity)
removeItem(itemId)
updateQuantity(itemId, quantity)
clearCart()
getSubtotal()
getItemCount()
```

**Cart drawer (preferred):**
- Slide-in panel from the right.
- Triggered by: adding an item, clicking cart icon.
- Contents: item list (image, name, variant, quantity, price, remove button), subtotal, "Checkout" button, "Continue Shopping" link.
- Update quantity inline (increment/decrement or input).
- Overlay dims the page behind the drawer.

**Cart page (alternative or additional):**
- Full page at /cart.
- Same content as drawer but with more room: larger images, promo code input, shipping estimator.
- "Checkout" button prominent at top and bottom.

**Empty cart:**
- Message: "Your cart is empty."
- CTA: "Continue Shopping" linking to /products.

### Checkout Flow

**Steps:**
```
1. Information (email, shipping address)
2. Shipping (shipping method selection)
3. Payment (card details, order review)
4. Confirmation (thank you + order details)
```

**Progress indicator:** Step bar at the top showing current step. Completed steps are clickable to go back.

**Information step:**
- Email
- Shipping address (name, address line 1, line 2, city, state, zip, country)
- "Save this information" checkbox (if authenticated)
- "Continue to Shipping" button

**Shipping step:**
- Available shipping options with price and estimated delivery.
- Radio selection.
- "Continue to Payment" button.

**Payment step:**
- Order summary (all items, subtotal, shipping, taxes, total).
- Payment form (card number, expiry, CVC) — or third-party integration ([Stripe / PayPal / etc.]).
- Billing address (same as shipping checkbox).
- "Place Order" button (primary, prominent).

**Confirmation page:**
- Order number.
- Summary of items ordered.
- Shipping address and method.
- "A confirmation email has been sent to [email]."
- "Continue Shopping" link.

**Rules:**
- Never lose the cart during checkout — persist state.
- Show the order summary at every step (sidebar on desktop, collapsible on mobile).
- Validate address fields in real-time.
- Show loading state on "Place Order" button while processing.
- Handle payment errors inline — do not redirect to an error page.

### Search with Autocomplete

**Search bar behavior:**
- Expands on focus in the navbar.
- Shows autocomplete suggestions after 2+ characters.
- Suggestions include: product names (with thumbnail and price), categories, recent searches.
- Enter or click submits to /search?q=[query].
- "X" button clears the input.

**Search results page:**
- Same grid layout as /products with filter and sort options.
- "No results" state with suggestions: check spelling, try broader terms, browse categories.
- Show query in the page title: "Results for '[query]'"

### Image Optimization

- **Product images:** Serve in WebP/AVIF. Multiple sizes via `srcset` (thumbnail: 300px, card: 600px, detail: 1200px, zoom: 2400px).
- **Lazy loading:** All images below the fold.
- **Aspect ratio:** Consistent across product cards (1:1 or 4:5). Use `object-fit: cover` with explicit dimensions.
- **Zoom images:** Higher resolution loaded on demand (not preloaded).

### Responsive Breakpoints

```
Mobile:    < 640px    — 2-col product grid, stacked PDP, full-screen search
Tablet:    640-1024px — 2-3 col grid, side-by-side PDP
Desktop:   > 1024px   — 3-4 col grid, full PDP layout, sidebar filters
```

**Mobile rules:**
- Cart drawer: full-screen on mobile.
- Checkout: single column, full-width fields.
- Product images: swipeable gallery.
- Filters: bottom sheet or full-screen modal.
- "Add to Cart" button: sticky at the bottom of the screen on PDP.
- Touch targets: minimum 44x44px.

### Anti-Patterns — Do NOT

- Require account creation before checkout — offer guest checkout
- Hide shipping costs until the last checkout step
- Use a multi-page checkout when a single-page or accordion would work
- Show out-of-stock products in the grid without indicating they're unavailable
- Auto-play product videos
- Remove items from the cart without confirmation
- Show prices without currency symbols or proper formatting
- Use low-quality product images or inconsistent aspect ratios
- Make the search hard to find — it should be prominent in the navbar
- Disable the back button during checkout
- Show a "Login" wall before the user can browse products
- Use infinite scroll without a "Load More" trigger — don't auto-load
- Forget to handle variant changes (price, availability, images must all update)
- Put the "Add to Cart" button below the fold on desktop
- Skip empty states for cart, wishlist, and search results

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Client-side cart with localStorage persistence
- All prices displayed with consistent currency formatting
- Product images: consistent aspect ratio across cards
- Guest checkout supported — no account required to purchase
- Mobile-first responsive design with sticky "Add to Cart" on mobile PDP

## Notes

[Any project-specific context — payment provider, shipping integrations, inventory management, CMS for product content.]
