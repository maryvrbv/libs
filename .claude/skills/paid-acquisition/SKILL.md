---
name: paid-acquisition
description: "Paid Acquisition framework for marketing work. A paid acquisition strategy defines how you spend money to acquire customers profitably. Marketers write this to align channel selection, budget allocation, targeting, and creative testing into a system that scales. It answers: 'Where do we spend, how much, on whom, and when do we scale or cut?' Use when asked for: платный трафик, закупка трафика, медиаплан, бюджет на рекламу."
---

# Paid Acquisition

A paid acquisition strategy defines how you spend money to acquire customers profitably. Marketers write this to align channel selection, budget allocation, targeting, and creative testing into a system that scales. It answers: "Where do we spend, how much, on whom, and when do we scale or cut?"

## Before you start

- **Product context.** This framework needs to know the product: name, what it does, who it serves. Take it from the request, the project's CLAUDE.md or README, or earlier conversation. If it is missing and matters for the output, ask one short question instead of inventing facts.
- **Language.** The framework is written in English; write the deliverable in the language of the request (Russian request → Russian output), and adapt examples, platforms and conventions to that market.
- **No invented numbers.** Placeholders in `[brackets]` are to be filled with real data from the user. Where data is missing, leave a clearly marked placeholder rather than fabricating metrics, quotes or customer names.

## Structure

```markdown
# Paid Acquisition Strategy: [Product/Brand Name]

**Author:** [Name]
**Last Updated:** [Date]
**Budget Period:** [e.g., Q2 2026]
**Total Budget:** [e.g., $45,000/month]
**Primary KPI:** [e.g., CAC < $38, ROAS > 3.5x]

---

## 1. Unit Economics

**Average Order Value (AOV):** $[Amount]
**Customer Lifetime Value (LTV):** $[Amount]
**LTV:CAC Target Ratio:** [e.g., 3:1 minimum]
**Maximum Allowable CAC:** $[Amount]
**Payback Period Target:** [e.g., < 90 days]
**Gross Margin:** [%]

### Breakeven Calculation
- Revenue per customer (first purchase): $[Amount]
- Cost of goods/delivery: $[Amount]
- Gross profit per customer: $[Amount]
- Breakeven CAC: $[Amount]
- Target CAC (with margin): $[Amount]

### Blended vs. Channel CAC Targets
| Channel | Target CAC | Rationale |
|---------|-----------|-----------|
| [Channel 1] | $[Amount] | [Why this target for this channel] |
| [Channel 2] | $[Amount] | [Why this target for this channel] |
| [Channel 3] | $[Amount] | [Why this target for this channel] |

## 2. Channel Selection

### Active Channels
| Channel | Monthly Budget | % of Total | Stage | Role |
|---------|---------------|-----------|-------|------|
| [Channel 1] | $[Amount] | [%] | [Testing/Scaling/Mature] | [Acquisition/Retargeting/Brand] |
| [Channel 2] | $[Amount] | [%] | [Testing/Scaling/Mature] | [Role] |
| [Channel 3] | $[Amount] | [%] | [Testing/Scaling/Mature] | [Role] |
| [Channel 4] | $[Amount] | [%] | [Testing/Scaling/Mature] | [Role] |

### Channel Selection Criteria
For each channel, answer:
1. **Audience presence:** Does our target customer spend time here?
2. **Intent level:** Are they actively looking or passively browsing?
3. **Targeting precision:** Can we reach our ICP specifically?
4. **Creative format:** Does the format suit our product?
5. **Measurement:** Can we track conversions accurately?
6. **Competition:** How saturated is the channel for our category?

### Channels Evaluated and Rejected
| Channel | Reason for Rejection | Revisit Date |
|---------|---------------------|-------------|
| [Channel] | [Specific reason — too expensive, poor targeting, wrong audience] | [Date] |

## 3. Budget Allocation Model

### Monthly Allocation
| Category | Budget | % |
|----------|--------|---|
| Prospecting (cold audiences) | $[Amount] | [%] |
| Retargeting (warm audiences) | $[Amount] | [%] |
| Brand awareness | $[Amount] | [%] |
| Creative testing | $[Amount] | [%] |
| Experimental / new channels | $[Amount] | [%] |
| **Total** | **$[Amount]** | **100%** |

### Budget Rules
- Minimum test budget per channel: $[Amount] over [timeframe]
- Kill threshold: If CPA exceeds [X]x target after $[Amount] spent, pause
- Scale threshold: If CPA is below target for [X] consecutive days at $[Amount]+/day, increase budget by [%]
- Never increase budget by more than [%] per day to avoid resetting algorithm learning
- Reserve [%] of budget for testing new creatives, audiences, or channels each month

## 4. Campaign Structure

### [Channel 1] Campaign Structure
```
Account
├── Campaign: Prospecting — [Audience Segment 1]
│   ├── Ad Set: [Targeting variant A]
│   │   ├── Ad: [Creative 1]
│   │   ├── Ad: [Creative 2]
│   │   └── Ad: [Creative 3]
│   └── Ad Set: [Targeting variant B]
│       ├── Ad: [Creative 1]
│       └── Ad: [Creative 2]
├── Campaign: Prospecting — [Audience Segment 2]
│   └── [Same structure]
├── Campaign: Retargeting — Website Visitors
│   ├── Ad Set: Visited pricing page (7 days)
│   └── Ad Set: Visited product page (14 days)
└── Campaign: Retargeting — Engaged Users
    └── Ad Set: Email subscribers, non-purchasers
```

### Naming Convention
`[Channel]-[Objective]-[Audience]-[Creative Type]-[Date]`
Example: `meta-prospecting-designersUS-video-2026Q2`

## 5. Audience Targeting

### Primary Audiences (Prospecting)
| Audience | Platform | Targeting Method | Est. Size | Priority |
|----------|----------|-----------------|-----------|----------|
| [Audience 1] | [Platform] | [Interest/Behavior/Lookalike/Keyword] | [Size] | [P0/P1/P2] |
| [Audience 2] | [Platform] | [Method] | [Size] | [Priority] |
| [Audience 3] | [Platform] | [Method] | [Size] | [Priority] |
| [Audience 4] | [Platform] | [Method] | [Size] | [Priority] |

### Retargeting Audiences
| Audience | Window | Platform | Est. Size | Bid Adjustment |
|----------|--------|----------|-----------|---------------|
| [Website visitors — pricing page] | [7 days] | [Platform] | [Size] | [+X%] |
| [Cart/signup abandoners] | [3 days] | [Platform] | [Size] | [+X%] |
| [Blog readers — 3+ pages] | [14 days] | [Platform] | [Size] | [+X%] |
| [Email subscribers — non-purchasers] | [30 days] | [Platform] | [Size] | [+X%] |

### Exclusions
- Current customers/subscribers
- Employees
- Converted users (for [X] days post-purchase)
- [Other exclusions specific to your business]

## 6. Bidding Strategy

| Campaign Type | Bid Strategy | Target | Daily Cap |
|--------------|-------------|--------|-----------|
| Prospecting | [CPA target / ROAS target / Maximize conversions] | $[Target] | $[Cap] |
| Retargeting | [Bid strategy] | $[Target] | $[Cap] |
| Brand | [Bid strategy] | [Target metric] | $[Cap] |

### Bidding Rules
- Start new campaigns with [bid strategy] for the first [X] days to gather data
- Switch to target CPA/ROAS once [X] conversions have accumulated
- If CPA spikes > [X]% above target for 3+ days, reduce budget by [%] — don't change targeting
- Separate campaigns by device if mobile vs. desktop CPA differs by > [X]%

## 7. Creative Testing Plan

### Creative Types to Test
| Format | Channel | Hypothesis | Test Duration | Success Metric |
|--------|---------|-----------|--------------|---------------|
| [Static image] | [Platform] | [What you expect this to prove] | [Days] | [CTR/CPA/ROAS] |
| [Video — 15s] | [Platform] | [Hypothesis] | [Days] | [Metric] |
| [Carousel] | [Platform] | [Hypothesis] | [Days] | [Metric] |
| [UGC-style] | [Platform] | [Hypothesis] | [Days] | [Metric] |

### Testing Protocol
- Run [X] creatives per ad set minimum
- Declare a winner after [X] conversions or $[X] spent, whichever comes first
- Kill underperforming creatives when CTR is [X]% below ad set average after [X] impressions
- Refresh winning creatives every [X] weeks to combat fatigue
- Test one variable at a time: headline, image, CTA, or hook — never all at once
- Naming: `[format]-[hook]-[variant]-[version]` — e.g., `video-testimonial-founder-v2`

### Creative Refresh Calendar
| Month | New Creatives | Format Focus | Theme |
|-------|-------------|-------------|-------|
| [Month 1] | [Count] | [Format] | [Theme/angle] |
| [Month 2] | [Count] | [Format] | [Theme/angle] |
| [Month 3] | [Count] | [Format] | [Theme/angle] |

## 8. Scaling Criteria

### When to Scale a Campaign
- CPA at or below target for 7+ consecutive days
- At least [X] conversions at current budget
- Conversion rate stable (not declining)
- Frequency below [X] (not saturating the audience)
- Creative fatigue not evident (CTR stable or rising)

### How to Scale
1. **Budget scaling:** Increase daily budget by 20% every 3 days (never more than 30% at once)
2. **Audience scaling:** Expand lookalike from 1% to 2%, then 3%. Add new interest layers
3. **Geographic scaling:** Add new geos one at a time, treat each as a test
4. **Channel scaling:** Once one channel is profitable and stable, allocate test budget to the next channel

### When to Cut
- CPA > 1.5x target after $[X] minimum spend
- ROAS < [X]x for 5+ consecutive days
- Frequency > [X] with declining CTR
- No statistical significance after [X] days

## 9. Measurement & Attribution

### Conversion Tracking
| Event | Tracking Method | Attribution Window |
|-------|----------------|-------------------|
| [Purchase/Signup] | [Pixel/API/Server-side] | [7-day click, 1-day view] |
| [Add to cart] | [Method] | [Window] |
| [Lead form] | [Method] | [Window] |
| [Page view] | [Method] | [Window] |

### Attribution Model
- Primary: [Last-click / Data-driven / Linear]
- Secondary: [Model for cross-channel reporting]
- [How you handle view-through conversions]

### Reporting Dashboard
| Metric | Daily | Weekly | Monthly |
|--------|-------|--------|---------|
| Spend | ✓ | ✓ | ✓ |
| Conversions | ✓ | ✓ | ✓ |
| CPA | ✓ | ✓ | ✓ |
| ROAS | ✓ | ✓ | ✓ |
| CTR | | ✓ | ✓ |
| Frequency | | ✓ | ✓ |
| Creative performance | | ✓ | ✓ |
| Channel mix | | | ✓ |
| LTV cohort analysis | | | ✓ |
```

## How to Write Each Section

**Unit Economics**
Start here. Do not write a paid strategy without knowing your numbers. If you don't know your LTV, estimate conservatively. If you don't know your gross margin, find out. Your maximum allowable CAC determines everything downstream — channel selection, budget, targeting. If the math doesn't work, no amount of creative or targeting will save the campaigns.

Good: "AOV: $67. LTV (12-month): $201. Gross margin: 72%. Maximum allowable CAC: $48 (LTV * margin / 3). We need to acquire customers for under $48 to maintain a 3:1 LTV:CAC ratio."

Bad: "We want to keep costs low." (No numbers, no framework, no decision-making criteria.)

**Channel Selection**
Choose channels based on where your audience is, not where you're comfortable advertising. For each channel, explicitly assess audience presence, intent level, targeting precision, creative format fit, and measurement capability. Don't spread budget across 6 channels at $500/month each — concentrate on 2-3 channels and win there first.

Good: "Meta Ads (60% of budget) — Our ICP (startup founders, 25-45, US) is highly reachable via interest and lookalike targeting. Creative format (video + carousel) suits product demonstrations. Strong pixel infrastructure for conversion tracking."

Bad: "We'll run ads on Facebook, Google, TikTok, LinkedIn, Twitter, Pinterest, and Reddit." (Too many channels, too little budget per channel.)

**Campaign Structure**
Define the hierarchy before you build anything. Separate prospecting from retargeting. Within prospecting, separate audience segments into their own campaigns so budgets don't cannibalize. Name everything consistently so you can analyze performance by segment without decoding cryptic campaign names.

**Creative Testing Plan**
Creative is the biggest lever in paid acquisition. A winning creative can 3x your results. Test systematically — change one variable at a time, set minimum sample sizes before declaring winners, and refresh creatives before fatigue sets in (typically every 3-4 weeks). Document every test and its result.

**Scaling Criteria**
Define exactly when to scale and when to cut before you launch. Emotion-driven scaling ("this campaign is doing great, let's 5x the budget!") kills performance. Algorithm-driven platforms need gradual budget increases — 20% every 3 days is the standard rule. Define your kill criteria too — knowing when to stop is as important as knowing when to scale.

## Conventions

- Length: 5-8 pages
- Tone: Analytical and precise. Every dollar should be accounted for
- Update this document weekly during active campaigns, monthly for strategy
- Always start with unit economics — if the math doesn't work, don't run ads
- Set per-channel CAC targets, not just blended targets
- Include both prospecting and retargeting in every strategy — they serve different purposes
- Never increase daily budgets by more than 20-30% at a time
- Test creatives on a schedule — set a calendar, don't wait for fatigue to appear
- Track incrementality, not just last-click — run holdout tests quarterly
- Separate mobile and desktop campaigns if performance differs by more than 30%
- Document every test hypothesis and result in a shared log
- Always exclude current customers from prospecting campaigns

## Anti-Patterns

- Do NOT launch paid campaigns without knowing your unit economics — if you don't know your CAC ceiling, you can't manage spend
- Do NOT spread budget across too many channels — $500/month on any single channel is too little to learn anything
- Do NOT scale a campaign by doubling the budget overnight — this resets algorithm learning and tanks performance
- Do NOT run the same creative for more than 4-6 weeks without refreshing — creative fatigue is the most common cause of rising CPAs
- Do NOT optimize for clicks or impressions when your goal is conversions — vanity metrics feel good and waste money
- Do NOT ignore the landing page — a great ad sending traffic to a bad page is the most expensive mistake in paid acquisition
- Do NOT test multiple variables simultaneously — if you change the image, headline, and CTA at once, you learn nothing
- Do NOT retarget with the same ad the prospect already saw — retargeting creative should advance the conversation, not repeat it
- Do NOT rely on platform-reported conversions without verifying against your own data — every ad platform over-reports
- Do NOT set and forget campaigns — check performance daily, adjust weekly
- Do NOT bid manually unless you have significant historical conversion data — let algorithms optimize with enough signal
- Do NOT forget to exclude converted users from retargeting — paying to advertise to customers is pure waste
- Do NOT ignore frequency — if your audience sees the same ad 8+ times, you're paying for annoyance, not awareness
- Do NOT compare channels on different attribution windows — normalize before drawing conclusions

## Examples

```markdown
# Paid Acquisition Strategy: Bloom & Co — DTC Skincare

**Author:** Marcus Chen
**Last Updated:** 2026-03-20
**Budget Period:** Q2 2026 (April-June)
**Total Budget:** $52,000/month
**Primary KPI:** Blended CAC < $34, ROAS > 3.2x

---

## 1. Unit Economics

**Average Order Value (AOV):** $78
**Customer Lifetime Value (LTV, 12-month):** $195 (avg 2.5 orders/year)
**LTV:CAC Target Ratio:** 4:1
**Maximum Allowable CAC:** $48 (breakeven), Target: $34 (with margin)
**Payback Period Target:** < 60 days (first purchase covers CAC)
**Gross Margin:** 74%

### Breakeven Calculation
- Revenue per customer (first purchase): $78
- Cost of goods/delivery: $20.28
- Gross profit per customer: $57.72
- Breakeven CAC: $57.72
- Target CAC (with 40% margin buffer): $34

### Blended vs. Channel CAC Targets
| Channel | Target CAC | Rationale |
|---------|-----------|-----------|
| Meta Ads | $32 | Primary channel, mature data, highest efficiency expected |
| Google Shopping | $38 | Higher intent = higher AOV, can afford slightly higher CAC |
| TikTok Ads | $28 | Lower funnel confidence, need lower CAC to offset measurement risk |
| Email retargeting | $8 | Warm audience, low cost, high conversion rate |

## 2. Channel Selection

### Active Channels
| Channel | Monthly Budget | % of Total | Stage | Role |
|---------|---------------|-----------|-------|------|
| Meta Ads (IG + FB) | $28,000 | 54% | Scaling | Primary acquisition + retargeting |
| Google Shopping + Search | $14,000 | 27% | Mature | High-intent capture |
| TikTok Ads | $6,000 | 11% | Testing | Top-of-funnel prospecting |
| Email (Klaviyo, paid sends) | $4,000 | 8% | Mature | Retargeting + retention |

### Channel Selection Criteria
1. **Meta:** 82% of our customers are women 25-44 on Instagram. Carousel and video formats showcase product texture and results. Lookalike audiences from our 12K customer list perform at $28 CAC currently.
2. **Google Shopping:** Captures "buy clean moisturizer" intent. Product feed optimization drives 4.1x ROAS currently. Scaling with brand keywords and competitor conquesting.
3. **TikTok:** Testing ground. Our demographic is active here but purchase behavior is unproven. UGC content format fits our brand. Starting with Spark Ads using creator content.
4. **Email:** Not traditional "paid" but included because Klaviyo sends have a cost and ROI. Abandoned cart and browse abandonment flows are our most efficient "retargeting."

### Channels Evaluated and Rejected
| Channel | Reason for Rejection | Revisit Date |
|---------|---------------------|-------------|
| Pinterest Ads | CPM too high for our category ($12+ vs. $6 on Meta). Organic Pinterest drives sales — paid didn't add incrementality in Q1 test | Sept 2026 |
| LinkedIn Ads | Wrong audience — our buyers are consumers, not professionals. $45+ CPC is prohibitive for a $78 AOV product | Not planned |
| Snapchat Ads | Audience skews too young (18-24) for our price point. Tested in Q4 2025, $52 CAC vs. $34 target | Not planned |

## 3. Budget Allocation Model

### Monthly Allocation
| Category | Budget | % |
|----------|--------|---|
| Prospecting (cold audiences) | $31,200 | 60% |
| Retargeting (warm audiences) | $10,400 | 20% |
| Creative testing | $5,200 | 10% |
| Experimental / TikTok testing | $5,200 | 10% |
| **Total** | **$52,000** | **100%** |

### Budget Rules
- Minimum test budget per channel: $3,000 over 21 days
- Kill threshold: If CPA exceeds 1.5x target ($51) after $1,500 spent, pause and diagnose
- Scale threshold: If CPA is below $30 for 5+ consecutive days at $300+/day, increase budget by 20%
- Never increase any campaign budget by more than 25% per day
- Reserve 10% of monthly budget ($5,200) for testing new creatives, audiences, or channels

## 4. Campaign Structure

### Meta Ads Campaign Structure
```
Bloom & Co Meta Account
├── Campaign: Prospecting — Skincare Enthusiasts (CBO, Purchase)
│   ├── Ad Set: Lookalike 1% — Purchasers
│   │   ├── Ad: Hero product carousel (before/after)
│   │   ├── Ad: Founder story video (30s)
│   │   └── Ad: UGC testimonial (15s)
│   ├── Ad Set: Lookalike 2% — Purchasers
│   │   ├── Ad: Hero product carousel (before/after)
│   │   └── Ad: Ingredient education static
│   └── Ad Set: Interest — Clean beauty + skincare
│       ├── Ad: Problem/solution video (15s)
│       └── Ad: Social proof carousel (reviews)
├── Campaign: Prospecting — New Audience Tests (CBO, Purchase)
│   ├── Ad Set: Lookalike — Email subscribers
│   └── Ad Set: Interest — Wellness + sustainability
├── Campaign: Retargeting — Website Visitors (CBO, Purchase)
│   ├── Ad Set: Viewed product page (7 days, exclude purchasers)
│   │   ├── Ad: Product-specific carousel + 10% off
│   │   └── Ad: Customer review video
│   └── Ad Set: Added to cart, didn't purchase (3 days)
│       ├── Ad: Cart reminder + free shipping
│       └── Ad: Urgency — limited stock
└── Campaign: Retargeting — Engaged (CBO, Purchase)
    └── Ad Set: IG engagers + video viewers 50%+ (14 days)
        ├── Ad: Bundle offer
        └── Ad: Founder DM-style creative
```

### Naming Convention
`bloom-[channel]-[objective]-[audience]-[creative]-[date]`
Example: `bloom-meta-prosp-lal1purch-founderVid30s-2026Q2`

## 5. Audience Targeting

### Primary Audiences (Prospecting)
| Audience | Platform | Targeting Method | Est. Size | Priority |
|----------|----------|-----------------|-----------|----------|
| Lookalike 1% — Past purchasers | Meta | Lookalike | 2.1M | P0 |
| Lookalike 2% — Past purchasers | Meta | Lookalike | 4.2M | P0 |
| Clean beauty enthusiasts | Meta | Interest (Sephora, clean beauty, The Ordinary) | 8.5M | P1 |
| "Clean moisturizer" searchers | Google | Keyword (exact + phrase match) | 45K/mo | P0 |
| Skincare routine TikTok users | TikTok | Interest + hashtag | 12M | P2 |
| Competitor brand searchers | Google | Keyword (competitor names) | 18K/mo | P1 |

### Retargeting Audiences
| Audience | Window | Platform | Est. Size | Bid Adjustment |
|----------|--------|----------|-----------|---------------|
| Product page viewers | 7 days | Meta | 28K | +20% |
| Cart abandoners | 3 days | Meta + Klaviyo | 4K | +40% |
| Blog readers (3+ pages) | 14 days | Meta | 11K | +10% |
| Email subscribers — non-purchasers | 30 days | Meta + Klaviyo | 8K | +15% |
| Video viewers (50%+) | 14 days | Meta + TikTok | 35K | +10% |

### Exclusions
- Purchased in last 30 days (all campaigns)
- Current subscription customers (all campaigns)
- Employees and internal team (all platforms)
- Returns/refund customers in last 90 days

## 6. Bidding Strategy

| Campaign Type | Bid Strategy | Target | Daily Cap |
|--------------|-------------|--------|-----------|
| Prospecting — Meta | Cost cap | $32 CPA | $700 |
| Prospecting — Google Shopping | Target ROAS | 350% | $350 |
| Prospecting — TikTok | Maximize conversions (learning) | N/A (gathering data) | $200 |
| Retargeting — Meta | Cost cap | $18 CPA | $250 |
| Retargeting — Klaviyo | N/A (email cost) | $8 CPA | N/A |

### Bidding Rules
- Start all new Meta campaigns with "Maximize Conversions" for the first 7 days to exit learning phase (need 50 conversions)
- Switch to Cost Cap once 50+ conversions accumulated at acceptable CPA
- If CPA spikes > 40% above target for 3+ consecutive days, reduce budget by 20% — do not change targeting or creative simultaneously
- Google Shopping: Start with Maximize Conversions, switch to Target ROAS at 100+ conversions
- TikTok: Stay on Maximize Conversions for the full Q2 test period — insufficient data for automated bidding

## 7. Creative Testing Plan

### Creative Types to Test
| Format | Channel | Hypothesis | Test Duration | Success Metric |
|--------|---------|-----------|--------------|---------------|
| UGC testimonial (15s) | Meta, TikTok | Authentic creator content outperforms polished brand creative for cold audiences | 14 days | CPA < $30 |
| Before/after carousel | Meta | Transformation visuals drive higher purchase intent than product-only shots | 14 days | ROAS > 3.5x |
| Founder story video (30s) | Meta | Brand narrative builds trust and converts at lower frequency than product ads | 21 days | CPA < $35, frequency cap 2.0 |
| Ingredient education static | Meta | Information-first creative attracts higher-LTV customers | 14 days | CPA < $36, 90-day LTV > $150 |
| Problem/solution video (6s) | TikTok | Fast-hook format stops scroll and drives clicks in feed | 14 days | CTR > 1.2%, CPA < $28 |
| Unboxing video (creator) | TikTok | Spark Ads with real unboxing content outperforms studio content | 21 days | CPA < $32 |

### Testing Protocol
- Run 3-5 creatives per ad set minimum
- Declare a winner after 30 conversions or $500 spent per creative, whichever comes first
- Kill underperforming creatives when CTR is 30%+ below ad set average after 5,000 impressions
- Refresh winning creatives every 3-4 weeks — update thumb-stop image, color, or text overlay
- Test one variable at a time: visual, headline, CTA, or hook
- Naming: `bloom-[format]-[hook]-[variant]-v[#]` — e.g., `bloom-ugc-glow-sarah-v2`

### Creative Refresh Calendar
| Month | New Creatives | Format Focus | Theme |
|-------|-------------|-------------|-------|
| April | 8 | UGC video + carousel | Spring skin reset |
| May | 6 | Before/after + founder story | Mother's Day gifting |
| June | 8 | Product education + bundles | Summer routine |

## 8. Scaling Criteria

### When to Scale a Campaign
- CPA at or below target for 7+ consecutive days
- At least 50 conversions at current budget level
- Conversion rate stable or improving week-over-week
- Frequency below 2.5 on Meta (not saturating)
- No creative fatigue signals (CTR stable, not declining > 15%)

### How to Scale
1. Budget: Increase daily budget by 20% every 3 days. Meta maximum daily increase: 25%.
2. Audience: Expand LAL from 1% to 2% first. Layer in broader interests second.
3. Geographic: US-only for Q2. Test Canada in Q3 if US is stable.
4. Channel: TikTok is the scale channel. If CPA < $32 after $3K spend, increase to $400/day.

### When to Cut
- CPA > $51 (1.5x target) after $1,500 minimum spend
- ROAS < 2.0x for 5+ consecutive days on Meta
- Frequency > 4.0 with declining CTR on retargeting
- TikTok: CPA > $42 after full $3K test budget exhausted

## 9. Measurement & Attribution

### Conversion Tracking
| Event | Tracking Method | Attribution Window |
|-------|----------------|-------------------|
| Purchase | Meta CAPI + Pixel | 7-day click, 1-day view |
| Add to Cart | Meta Pixel | 7-day click, 1-day view |
| Initiate Checkout | Meta Pixel | 7-day click, 1-day view |
| Purchase (Google) | Google Ads conversion tag + enhanced conversions | 30-day click |
| Purchase (TikTok) | TikTok Pixel + Events API | 7-day click, 1-day view |

### Attribution Model
- Primary: Platform-reported (last-click equivalent within each platform)
- Secondary: Triple Whale / Northbeam for cross-channel, first-touch and linear models
- View-through conversions: Reported but discounted 50% in internal reporting — used for directional signal only
- Monthly incrementality check: Compare platform-reported vs. Shopify revenue to identify over-reporting

### Reporting Dashboard
| Metric | Daily | Weekly | Monthly |
|--------|-------|--------|---------|
| Spend by channel | ✓ | ✓ | ✓ |
| Purchases | ✓ | ✓ | ✓ |
| CPA by channel | ✓ | ✓ | ✓ |
| ROAS by channel | ✓ | ✓ | ✓ |
| CTR by creative | | ✓ | ✓ |
| Frequency by campaign | | ✓ | ✓ |
| Creative winner/loser log | | ✓ | |
| New vs. returning customer split | | | ✓ |
| LTV by acquisition channel (cohort) | | | ✓ |
| Blended CPA (all channels) | | ✓ | ✓ |
```

## Customization

Replace all `[bracketed]` sections with your product, pricing, and channel details. Adjust the number of channels based on your budget — at $10K/month or less, focus on one channel. At $25K+, you can run two primary channels plus retargeting. At $50K+, add a testing channel. The campaign structure should match your actual ad platform setup. Unit economics must use real numbers — estimated LTV is acceptable if you document your assumptions.
