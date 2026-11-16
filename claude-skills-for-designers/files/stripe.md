# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / SvelteKit / Express / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- **Stripe** for payments (Checkout, subscriptions, webhooks)

## Payments: Stripe

This project uses Stripe for payment processing — Checkout Sessions for one-time and recurring payments, webhook handling for fulfillment, and the Customer Portal for subscription management.

### Setup

```bash
npm install stripe                    # Server-side SDK
npm install @stripe/stripe-js         # Client-side (loadStripe)
npm install @stripe/react-stripe-js   # React components (optional)
```

```ts
// lib/stripe/server.ts — server-side Stripe client
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
});
```

```ts
// lib/stripe/client.ts — client-side Stripe
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
```

**Environment variables:**
```
STRIPE_SECRET_KEY=sk_test_...            # Server only — never expose
STRIPE_PUBLISHABLE_KEY=pk_test_...       # Safe for client
STRIPE_WEBHOOK_SECRET=whsec_...          # For verifying webhooks
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Client-side (Next.js)
```

### Product and Price Modeling

Set up products and prices in the Stripe Dashboard or via API:

```ts
// One-time product (e.g., a course or template)
const product = await stripe.products.create({
  name: 'Skill Files Pack',
  description: '12 AI-powered CLAUDE.md skill files',
  metadata: { type: 'pack' },
});

const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 2900,           // $29.00 (in cents)
  currency: 'usd',
});

// Recurring product (subscription)
const monthlyPrice = await stripe.prices.create({
  product: product.id,
  unit_amount: 900,            // $9.00/month
  currency: 'usd',
  recurring: { interval: 'month' },
});

const yearlyPrice = await stripe.prices.create({
  product: product.id,
  unit_amount: 7900,           // $79.00/year
  currency: 'usd',
  recurring: { interval: 'year' },
});
```

**Best practice:** Create products and prices in the Stripe Dashboard for simple setups. Use the API only when you need dynamic pricing or automated product creation.

### Checkout Sessions (Hosted Payment Page)

Redirect users to Stripe's hosted checkout — handles payment forms, validation, and 3D Secure:

```ts
// app/api/checkout/route.ts
import { stripe } from '@/lib/stripe/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { priceId, mode } = await request.json();
  // mode: 'payment' for one-time, 'subscription' for recurring

  const session = await stripe.checkout.sessions.create({
    mode: mode || 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    metadata: {
      // Store any data you need for fulfillment
      userId: '[user-id]',
    },
  });

  return NextResponse.json({ url: session.url });
}
```

```tsx
// Client-side: redirect to checkout
async function handleCheckout(priceId: string) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, mode: 'payment' }),
  });

  const { url } = await response.json();
  window.location.href = url;   // Redirect to Stripe Checkout
}
```

### Payment Links (No-Code)

Create payment links in the Stripe Dashboard — no backend code needed. Each link is a shareable URL that goes directly to checkout. Perfect for:
- Gumroad-style quick sales
- Social media links
- Email campaigns

### Webhook Handling

Webhooks are how Stripe tells your app about events (payment completed, subscription canceled, etc.):

```ts
// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe/server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      // Fulfill the purchase — grant access, send email, etc.
      await fulfillOrder(session);
      break;
    }
    case 'customer.subscription.created': {
      const subscription = event.data.object;
      await activateSubscription(subscription);
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      await updateSubscription(subscription);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      await cancelSubscription(subscription);
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      await handleFailedPayment(invoice);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
```

**Critical:** Always verify the webhook signature with `stripe.webhooks.constructEvent()`. Never trust raw POST data.

### Stripe CLI (Local Webhook Testing)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local endpoint
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# The CLI gives you a webhook signing secret (whsec_...) — use it as STRIPE_WEBHOOK_SECRET locally

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.created
```

### Customer Portal

Let customers manage their subscriptions (upgrade, downgrade, cancel, update payment method):

```ts
// app/api/portal/route.ts
export async function POST(request: Request) {
  const { customerId } = await request.json();

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/account`,
  });

  return NextResponse.json({ url: session.url });
}
```

Configure the portal in **Stripe Dashboard → Settings → Billing → Customer Portal**.

### Subscription Billing

```ts
// Create a subscription checkout
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  line_items: [{ price: 'price_monthly_id', quantity: 1 }],
  success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
  cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  subscription_data: {
    trial_period_days: 14,        // Optional free trial
    metadata: { userId: '...' },
  },
});

// Check subscription status
const subscription = await stripe.subscriptions.retrieve(subscriptionId);
const isActive = ['active', 'trialing'].includes(subscription.status);

// Cancel subscription (at period end)
await stripe.subscriptions.update(subscriptionId, {
  cancel_at_period_end: true,
});
```

### Pricing Table (Embeddable)

Stripe provides a no-code pricing table component:

```html
<!-- Embed in any page — Stripe hosts it -->
<script async src="https://js.stripe.com/v3/pricing-table.js"></script>
<stripe-pricing-table
  pricing-table-id="prctbl_..."
  publishable-key="pk_test_..."
  client-reference-id="[user-id]"
></stripe-pricing-table>
```

### Test Mode

**Always develop in test mode.** Use test API keys (`sk_test_`, `pk_test_`).

Test card numbers:
| Card | Behavior |
|------|----------|
| `4242 4242 4242 4242` | Succeeds |
| `4000 0000 0000 3220` | Requires 3D Secure |
| `4000 0000 0000 0002` | Declined |
| `4000 0000 0000 9995` | Insufficient funds |

Use any future expiry date and any 3-digit CVC.

### Error Handling

```ts
try {
  const session = await stripe.checkout.sessions.create({ /* ... */ });
} catch (err) {
  if (err instanceof Stripe.errors.StripeCardError) {
    // Card was declined
    console.error('Card declined:', err.message);
  } else if (err instanceof Stripe.errors.StripeInvalidRequestError) {
    // Invalid parameters
    console.error('Invalid request:', err.message);
  } else {
    // Other error
    console.error('Stripe error:', err);
  }
}
```

### Idempotency

Prevent duplicate charges from retried requests:

```ts
const session = await stripe.checkout.sessions.create(
  { /* params */ },
  { idempotencyKey: `checkout_${userId}_${orderId}` }
);
```

Always use idempotency keys for create operations (charges, sessions, subscriptions).

### File Structure

```
[project-root]/
├── lib/
│   ├── stripe/
│   │   ├── server.ts          # Server-side Stripe client
│   │   └── client.ts          # Client-side loadStripe
│   └── utils/
│       └── fulfillment.ts     # Order fulfillment logic
├── app/
│   ├── api/
│   │   ├── checkout/route.ts  # Create checkout sessions
│   │   ├── portal/route.ts    # Customer portal sessions
│   │   └── webhooks/
│   │       └── stripe/route.ts # Webhook handler
│   ├── pricing/page.tsx       # Pricing page
│   └── success/page.tsx       # Post-purchase success page
└── .env.local
    # STRIPE_SECRET_KEY=sk_test_...
    # NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
    # STRIPE_WEBHOOK_SECRET=whsec_...
```

### Anti-Patterns — Do NOT

- Expose `STRIPE_SECRET_KEY` in client-side code — it can create charges
- Skip webhook signature verification — anyone can POST to your webhook URL
- Fulfill orders on the success page — users can manipulate the URL; use webhooks instead
- Store credit card numbers in your database — Stripe handles PCI compliance, you don't
- Use live API keys during development — always use test mode (`sk_test_`, `pk_test_`)
- Forget idempotency keys on create operations — network retries can cause double charges
- Hardcode prices in your app — reference Stripe price IDs so you can change pricing without redeploying
- Handle only `checkout.session.completed` — also handle subscription lifecycle events and failed payments
- Skip error handling on Stripe API calls — network failures and card declines happen
- Cancel subscriptions immediately instead of at period end — users expect access until their billing cycle ends
- Ignore the `invoice.payment_failed` event — notify users and handle grace periods

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All Stripe operations happen server-side (never call Stripe API from the browser)
- Webhook handler is the single source of truth for fulfillment
- Test mode for development, live mode only in production
- Idempotency keys on all create operations
- Customer-facing subscription management through Stripe Customer Portal

## Notes

[Any project-specific context — Stripe account, products/prices, webhook events to monitor]
