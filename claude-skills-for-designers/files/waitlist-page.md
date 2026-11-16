# [Project Name]

[One-line description of what this product is and why someone should join the waitlist.]

---

## Tech Stack

- [Framework: Next.js / Astro / SvelteKit / static HTML]
- TypeScript
- [Styling: Tailwind CSS / etc.]
- [Design System: file reference]
- [Email service: Resend / ConvertKit / Mailchimp / Loops / Buttondown]
- [Database (optional): Supabase / Firebase / Upstash Redis]

## Project Type: Waitlist / Pre-Launch Page

This is a pre-launch page designed to capture email signups before the product is ready. Every element exists to communicate the value proposition and convert visitors into waitlist subscribers. The page is not a full landing page — it's leaner, more focused, and optimized for a single action: entering an email.

### Page Structure

Sections appear in this order. Not all sections are required — start with the essentials and add sections based on how much you have to show.

```
1. Hero (headline + email capture)           — REQUIRED
2. Product Teaser (screenshot/mockup)        — REQUIRED
3. Feature Preview                           — REQUIRED
4. Social Proof                              — if available
5. Referral Program UI                       — optional
6. FAQ                                       — recommended
7. Footer                                    — REQUIRED
```

Optional additions:
- Countdown timer (only if there's a real launch date)
- "Why we're building this" section (founder story, manifesto)
- Comparison table (how this differs from alternatives)

### File Structure

```
[root]/
├── components/
│   ├── hero.[ext]                # Headline + email form
│   ├── product-teaser.[ext]      # Screenshot, mockup, or animation
│   ├── feature-preview.[ext]     # Feature grid or list
│   ├── social-proof.[ext]        # Signup counter, testimonials, logos
│   ├── referral-program.[ext]    # Share link + reward tiers (optional)
│   ├── countdown.[ext]           # Launch countdown timer (optional)
│   ├── faq.[ext]                 # Accordion FAQ
│   ├── email-form.[ext]          # Reusable email capture component
│   ├── success-state.[ext]       # Post-signup confirmation
│   └── footer.[ext]              # Minimal footer
├── assets/
│   ├── images/                   # Product mockups, screenshots, OG image
│   └── icons/                    # Feature icons
├── lib/
│   ├── submit-email.[ext]        # Email submission logic
│   └── analytics.[ext]           # Event tracking
├── styles/
│   └── globals.css
└── index.[ext]                   # Page composition
```

### Section Breakdown

#### 1. Hero

The hero is the page. On a waitlist page, the hero often takes up most of the viewport. It must communicate three things instantly: what the product is, who it's for, and how to sign up.

**Structure:**
- **Headline** — one sentence stating the outcome or transformation. Specific beats clever. ("[Product] helps [audience] [achieve outcome]" or "The [category] that [key differentiator]")
- **Subheadline** — one sentence expanding on the how or the who. Lower visual weight.
- **Email capture form** — single email field + CTA button, inline on one row.
- **Micro-copy below form** — "Join [X] others on the waitlist" or "Free. No spam. Unsubscribe anytime."
- **Background** — gradient, subtle pattern, or illustration. Never competes with text.

**Email form pattern:**
```html
<form class="flex gap-2 w-full max-w-md">
  <input
    type="email"
    placeholder="you@example.com"
    required
    class="[input styling — full width, large, clear placeholder]"
  />
  <button type="submit" class="[primary CTA — high contrast, action label]">
    Join Waitlist
  </button>
</form>
<p class="[small muted text]">Join 2,400+ designers on the list. No spam.</p>
```

**CTA button labels (good):** "Join the Waitlist", "Get Early Access", "Reserve My Spot", "Notify Me"
**CTA button labels (bad):** "Submit", "Sign Up", "Subscribe", "Click Here"

**Rules:**
- Email field and CTA must be visible without scrolling on all viewports
- One form field only — email. Do not ask for name, company, or role at this stage
- Show the signup count if it's impressive (100+). If you have fewer than 100, skip it or show "Join the early adopters"
- After successful signup, replace the form with a success state (not a new page)

#### 2. Product Teaser

Show what the product looks like or what it does. Visitors need a visual anchor.

**Options (choose one):**
- **App screenshot** — real or polished mockup in a browser/device frame
- **Short video or GIF** — 10-15 seconds showing the core interaction. Autoplay, muted, looped
- **Animated demo** — CSS/JS animation showing the product concept
- **Mockup** — designed visual if the product isn't built yet

**Rules:**
- The teaser must look real, even if it's a mockup. Low-fidelity wireframes signal "not serious"
- Device frames (browser chrome, phone frame) make screenshots look more polished
- If using video, keep it under 15 seconds. No sound. No play button — autoplay or don't use video
- Optimize image size — this is the LCP element. Use WebP/AVIF, set explicit dimensions, `fetchpriority="high"`

#### 3. Feature Preview

Show 3-4 key capabilities or promises. This is not a full feature page — it's a taste of what's coming.

**Layout:**
```html
<!-- 3-column grid on desktop, stacked on mobile -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div>
    <div class="[icon]">[icon]</div>
    <h3>[Benefit-first heading]</h3>
    <p>[One sentence explaining the feature]</p>
  </div>
  <!-- repeat 2-3 more -->
</div>
```

**Rules:**
- 3 or 4 features — not more. This is a teaser, not a feature page
- Lead with benefits, not features ("Ship faster" not "CI/CD pipeline")
- Consistent icon style. All outlined or all filled, same size, same color
- Keep descriptions to one sentence

#### 4. Social Proof

Build credibility. What you can show depends on your stage.

**Pre-launch options:**
- **Signup counter** — "2,400+ people on the waitlist" (only if the number is real and impressive)
- **Testimonial quotes** — from beta users, advisors, or early testers. Name + role + photo
- **Press mentions / logos** — "As seen in [Publication]" with grayscale logos
- **Founder credibility** — "Built by the team behind [known product]" or "From a designer at [Company]"

**Rules:**
- Never fake numbers or fabricate testimonials
- If you don't have social proof yet, skip this section entirely — a weak social proof section hurts more than no social proof
- Grayscale logos for press/companies. Color logos look messy
- Show real photos with testimonials — stock photos destroy trust

#### 5. Referral Program UI (Optional)

After signup, encourage sharing by offering rewards.

**Structure (shown in the success state after signup):**
```
"Share your unique link to move up the waitlist"
[https://[domain]/ref/abc123]                [Copy]

Reward Tiers:
- 3 referrals → Early access
- 10 referrals → Lifetime discount
- 25 referrals → Founding member badge

Your referrals: 0
```

**Rules:**
- Only show after the user has signed up — not before
- Rewards must be real and fulfillable
- Make the share link easy to copy (one-click copy button)
- Optionally include pre-written share text for Twitter/LinkedIn
- Track referrals via unique URL parameters

#### 6. FAQ

Remove objections and answer the questions people will have about a product that doesn't exist yet.

**Common waitlist FAQ questions:**
- When does [Product] launch?
- Is it free?
- What happens after I join the waitlist?
- How is this different from [alternative]?
- What platforms will it support?
- Can I get a refund if I pre-order?

**Pattern:** Accordion — click to expand, one open at a time.

**Rules:**
- 4-6 questions maximum
- Answer in 1-3 sentences. Plain language
- Lead with the most purchase-blocking question
- If you don't have a launch date, say "We'll notify you as soon as it's ready" — don't guess

#### 7. Footer

Minimal footer. This is a waitlist page, not a marketing site.

**Include:**
- Copyright line
- Links: Privacy Policy, Terms (if applicable)
- Social links (Twitter/X, optional)
- Brand name or logo

**Do not include:** full site navigation, multiple CTAs, newsletter signup (the whole page IS the signup)

### Email Form Submission

**Submitting to an email service:**
```ts
// lib/submit-email.ts

export async function submitToWaitlist(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.message || 'Something went wrong' };
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}
```

**API route (Next.js example — adapt for your framework):**
```ts
// app/api/waitlist/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ message: 'Valid email required' }, { status: 400 });
  }

  // Option A: Email service (Resend, ConvertKit, Loops, etc.)
  await fetch('https://api.[email-service].com/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      [tag_or_list]: '[waitlist-tag]',
    }),
  });

  // Option B: Database (Supabase)
  // await supabase.from('waitlist').insert({ email });

  return NextResponse.json({ success: true });
}
```

### Success State

After a successful signup, replace the form — do not redirect to a new page.

**Structure:**
```html
<div class="text-center">
  <div class="[checkmark icon or animation]">✓</div>
  <h2>You're on the list!</h2>
  <p>We'll email you at [submitted-email] when [Product] is ready.</p>

  <!-- Optional: referral program -->
  <div class="[share section]">
    <p>Share your link to get early access:</p>
    <div class="flex gap-2">
      <input value="https://[domain]/ref/[code]" readonly />
      <button>Copy</button>
    </div>
  </div>
</div>
```

**Rules:**
- Confirm the specific email they signed up with
- Provide a clear next step (check your email, share the link, follow on Twitter)
- Animate the transition — fade out the form, fade in the success state
- Do not show the email form again after successful submission (use localStorage to remember)

### SEO for Pre-Launch

```html
<head>
  <title>[Product Name] — [One-line value prop]</title>
  <meta name="description" content="[Product] helps [audience] [achieve outcome]. Join the waitlist for early access." />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph -->
  <meta property="og:title" content="[Product Name] — [Headline]" />
  <meta property="og:description" content="[Subheadline or value prop]" />
  <meta property="og:image" content="https://[domain]/og-image.png" />
  <meta property="og:url" content="https://[domain]" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="[Product Name] — [Headline]" />
  <meta name="twitter:description" content="[Subheadline]" />
  <meta name="twitter:image" content="https://[domain]/og-image.png" />
</head>
```

**Rules:**
- Create a dedicated OG image (1200x630px) — this is what people see when the link is shared
- Title tag: "[Product] — [value prop]" (under 60 chars)
- Meta description: what it is + who it's for + CTA (under 160 chars)
- Add JSON-LD structured data for the organization if applicable

### Responsive Design

```
Mobile:    < 640px    — single column, stacked hero, form fills full width
Tablet:    640-1024px — hero text and teaser side by side (optional)
Desktop:   > 1024px   — centered content, max-width container, feature grid
```

**Mobile rules:**
- Email form: stack input and button vertically on very small screens, inline on 640px+
- Product teaser below hero text, not beside it
- Feature grid stacks to single column
- Touch targets minimum 44x44px
- CTA button full width on mobile

### Anti-Patterns — Do NOT

- Ask for more than email — no name, no company, no phone number, no "how did you hear about us"
- Redirect to a new page after signup — show the success state inline
- Show a countdown timer with no real launch date — fake urgency destroys trust
- Use a popup or modal for the email form — the form IS the page
- Put social media links above the fold — they send people away before they sign up
- Auto-play video with sound
- Show a chatbot widget that covers the CTA on mobile
- Use "Coming Soon" as the headline — it says nothing about the product
- Build a full marketing site — this is one page with one job
- Skip the OG image — most traffic comes from shared links
- Forget to test the email flow end-to-end (submission, email service, confirmation)
- Show a waitlist counter below 100 — it signals low interest
- Use stock photography — use product mockups, illustrations, or nothing
- Add navigation to other pages — there are no other pages yet
- Skip mobile optimization — the majority of link-click traffic is mobile

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Single-page, single-action design
- Mobile-first responsive layout
- Email is the only required field
- Success state replaces the form inline — no page redirect
- All copy in [language] — keep it concise and benefit-driven
- Track signups and share link clicks with analytics

## Notes

[Any project-specific context — target audience, email service, launch timeline, referral program details]
