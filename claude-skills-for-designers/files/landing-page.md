# [Project Name]

[One-line description of what this landing page promotes.]

---

## Project Type: Landing Page

This is a conversion-focused landing page. Every section exists to move the visitor toward one action: [sign up / buy / subscribe / book a call]. Design, copy, and layout decisions serve that single goal.

### Page Structure

Sections appear in this order. Do not rearrange unless there's a strong reason — this sequence matches how visitors evaluate an offer.

```
1. Hero
2. Social Proof Bar (logos or stats)
3. Problem / Pain
4. Features / Benefits
5. How It Works
6. Testimonials
7. Pricing
8. FAQ
9. Final CTA
10. Footer
```

### File Structure

```
[root]/
├── components/
│   ├── hero.tsx                # Hero section
│   ├── social-proof-bar.tsx    # Logo bar or stat counters
│   ├── problem-section.tsx     # Pain points
│   ├── features-section.tsx    # Feature grid or list
│   ├── how-it-works.tsx        # Step-by-step process
│   ├── testimonials.tsx        # Testimonial cards
│   ├── pricing-table.tsx       # Pricing tiers
│   ├── faq.tsx                 # Accordion FAQ
│   ├── final-cta.tsx           # Closing CTA block
│   ├── navbar.tsx              # Sticky top nav
│   └── footer.tsx              # Footer with links
├── assets/
│   ├── images/                 # Hero images, screenshots, logos
│   └── icons/                  # Feature icons, check marks
├── styles/                     # Global styles, variables
└── index.tsx                   # Page composition
```

### Section Breakdown

#### 1. Hero

The hero is the most important section. It must communicate the offer in under 5 seconds.

**Structure:**
- **Headline** — one clear sentence stating the outcome. No clever wordplay.
- **Subheadline** — one sentence expanding on who it's for or how it works.
- **Primary CTA** — single button, high contrast, action-oriented label ("Get Started Free", "Start Building", not "Submit" or "Learn More").
- **Secondary CTA** (optional) — lower-emphasis link ("See how it works", "View demo").
- **Visual** — product screenshot, hero image, or short video. Right side on desktop, below text on mobile.

**Above-the-fold rules:**
- Headline, subhead, and primary CTA must be visible without scrolling on all viewports.
- No carousels, sliders, or auto-playing video above the fold.
- Maximum two CTAs above the fold.
- Hero image should be lazy-loaded only if it's decorative. If it's the LCP element, load it eagerly with `fetchpriority="high"`.

#### 2. Social Proof Bar

Immediately after the hero. Builds trust before the visitor evaluates details.

**Patterns (choose one):**
- **Logo bar** — "Trusted by teams at [logos]". Grayscale logos, 4-6 max.
- **Stat counters** — "10,000+ users", "4.9/5 rating", "50M+ processed". 3 stats max.
- **As-seen-in** — Publication or media logos.

Keep it one line on desktop. Horizontally scrollable or stacked on mobile.

#### 3. Problem / Pain

State the problem the visitor has. Make them feel understood before showing the solution.

**Structure:**
- 2-3 pain points as short statements or a brief paragraph.
- Optional: icon + text pairs in a grid.
- Tone: empathetic, not dramatic.

#### 4. Features / Benefits

Show what the product does. Lead with the benefit, support with the feature.

**Layout options:**
- **3-column grid** — icon + heading + short description per card. Best for 3 or 6 features.
- **Alternating rows** — image left / text right, then swap. Best for 2-4 features with visuals.
- **Feature list** — check icon + single line. Best for long feature lists.

**Rules:**
- Headings state the benefit ("Ship 10x faster"), descriptions explain the feature.
- Use consistent icon style. Don't mix illustration styles.
- 3, 4, or 6 features — not 5 or 7 (grid math).

#### 5. How It Works

Reduce friction by showing simplicity. 3 steps is ideal.

**Structure:**
- Step number + heading + one-sentence description.
- Optional: illustration or screenshot per step.
- Horizontal layout on desktop (1 — 2 — 3), vertical stack on mobile.

#### 6. Testimonials

Real words from real people. Place after features to reinforce claims.

**Patterns:**
- **Card grid** — 3 cards, each with quote + name + role + photo.
- **Single highlight** — one large quote with photo, company, and context.
- **Carousel** — only if you have 6+ testimonials. Show 3 at a time on desktop.

**Rules:**
- Always include name and role. Photos increase trust.
- Highlight specific results ("Cut our deploy time by 70%"), not vague praise.
- Never fabricate testimonials.

#### 7. Pricing

Present pricing clearly. No surprises, no hidden costs.

**3-tier layout:**
- Left: [Starter / Free] — lower price, limited features.
- Center: [Pro / Popular] — highlighted (border, badge, or background), recommended tier.
- Right: [Team / Enterprise] — highest tier or "Contact us".

**Structure per tier:**
- Tier name
- Price (monthly or annual toggle if both exist)
- Short description (one sentence)
- Feature list with check icons
- CTA button (primary on recommended tier, secondary on others)

**Rules:**
- Highlight the recommended tier visually — it should be obvious.
- Show annual savings as a badge ("Save 20%") next to the toggle.
- Feature lists should be vertically aligned across tiers for easy comparison.
- "Contact us" for enterprise — no price.

#### 8. FAQ

Remove objections. Answer the 5-8 most common questions.

**Pattern:** Accordion (click to expand, one open at a time).

**Structure:**
- Question as the trigger (bold, full sentence).
- Answer as the collapsible content (1-3 sentences, plain language).

**Rules:**
- Lead with purchase-blocking questions: pricing, refunds, compatibility.
- Use real questions from users or support tickets.
- Link to relevant pages in answers where appropriate.

#### 9. Final CTA

One last push. Repeat the core offer and primary CTA.

**Structure:**
- Short headline restating the main benefit.
- Primary CTA button (same as hero).
- Optional: secondary link ("Have questions? Contact us").
- Background color or gradient to visually separate from the FAQ.

### CTA Placement and Hierarchy

- **Primary CTA appears 3 times:** hero, pricing, final CTA section. Same label, same style.
- **Sticky nav CTA:** small CTA button in the top-right of the navbar, visible after scrolling past the hero.
- **One primary action per page.** Do not split attention between "Sign Up" and "Book a Demo" as equal-weight CTAs.
- **Secondary CTAs** (ghost or outline buttons) can exist but must be visually subordinate.

### Responsive Breakpoints

```
Mobile:    < 640px    — single column, stacked sections, hamburger nav
Tablet:    640-1024px — 2-column grids, side-by-side hero text/image
Desktop:   > 1024px   — full layout, 3-column grids, horizontal steps
```

**Mobile rules:**
- Hero image moves below hero text.
- Feature grid stacks to single column.
- Pricing cards stack vertically (recommended tier first).
- FAQ accordion stays the same.
- Sticky nav CTA remains visible.
- Touch targets minimum 44x44px.

### Performance

- **LCP target: < 2.5s.** The hero headline or hero image is usually the LCP element.
- Hero image: serve in WebP/AVIF, use `srcset` for responsive sizes, explicit `width` and `height` attributes.
- Fonts: preload the primary font. Use `font-display: swap`.
- Defer all JavaScript that isn't needed for above-the-fold rendering.
- Inline critical CSS for the hero section.
- Lazy-load all images below the fold.
- No layout shift — set explicit dimensions on all images and embeds.

### Smooth Scroll Navigation

The navbar links should smooth-scroll to section anchors. Each section component gets an `id` prop.

```
<nav>
  <a href="#features">Features</a>
  <a href="#pricing">Pricing</a>
  <a href="#faq">FAQ</a>
</nav>
```

Use `scroll-behavior: smooth` on the `html` element. Account for fixed navbar height with `scroll-margin-top` on each section.

### Anti-Patterns — Do NOT

- Put more than one primary CTA above the fold
- Use a carousel or slider in the hero — pick one message
- Auto-play video with sound
- Hide pricing — if you have pricing, show it on the page
- Use stock photos of handshakes or people pointing at screens
- Write vague headlines ("Welcome to our platform", "The future of X")
- Add a chatbot widget that covers the CTA on mobile
- Use more than 2 fonts
- Make the page longer than necessary — every section must earn its place
- Skip mobile optimization — most traffic will be mobile
- Use popups or modals on page load
- Put social media icons above the fold — they send people away
- Use "Click here" or "Submit" as CTA labels
- Add a sidebar — landing pages are single-column focused

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Single-page layout with anchor navigation
- Mobile-first responsive design
- One primary conversion action for the entire page
- All copy in [language] — keep it concise and benefit-driven
- Optimize for Core Web Vitals (LCP, CLS, INP)

## Notes

[Any project-specific context — target audience, brand guidelines, A/B tests to run.]
