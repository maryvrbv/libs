# [Product Name]

[Brief description of the product/project — what it does and who it serves.]

---

## Skill: Referral Program

A referral program design document defines how your existing customers bring in new customers through structured incentives and viral mechanics. Marketers write this to turn word-of-mouth into a scalable, measurable acquisition channel. It answers: "How do we make it easy, rewarding, and natural for customers to refer others — and how do we track whether it's working?"

### Structure

```markdown
# Referral Program: [Product/Brand Name]

**Author:** [Name]
**Last Updated:** [Date]
**Program Name:** [e.g., "Share & Earn", "[Brand] Referrals"]
**Launch Date:** [Date]
**Primary Goal:** [e.g., Acquire 500 new customers via referrals in 6 months]

---

## 1. Program Overview

**Who can refer:** [All customers / Customers with X+ days tenure / Paid plan only]
**Who can be referred:** [New customers only / Anyone without an account / Non-subscribers]
**Program type:** [One-sided / Two-sided / Tiered]
**Core mechanic:** [Referrer gets X, referred gets Y]

### One-Line Pitch
[How you describe the program to the referrer — e.g., "Give your friends $20 off, get $20 when they purchase."]

## 2. Incentive Structure

### Referrer Reward
| Reward Type | Value | When Earned | Expiration |
|------------|-------|-------------|------------|
| [Credit / Cash / Free month / Points] | $[Amount] | [On referred signup / On referred purchase / After X days] | [30 days / Never / End of quarter] |

### Referred Reward
| Reward Type | Value | Conditions | Expiration |
|------------|-------|-----------|------------|
| [Discount / Free trial extension / Credit] | $[Amount or %] | [First purchase only / Minimum order / Any plan] | [7 days / 30 days / First use] |

### Tiered Rewards (Optional)
| Tier | Referrals Required | Referrer Reward | Status |
|------|-------------------|----------------|--------|
| Bronze | 1-3 | [Reward] | [Active] |
| Silver | 4-10 | [Reward] | [Active] |
| Gold | 11-25 | [Reward] | [Active] |
| Platinum | 26+ | [Reward] | [Active] |

### Reward Economics
- Cost per referral: $[Amount]
- Referred customer LTV: $[Amount]
- LTV:Referral Cost ratio: [X]:1
- Comparison to paid CAC: $[Referral cost] vs. $[Paid CAC]
- Maximum referral rewards per referrer per [period]: [Cap]

## 3. Referral Flow

### User Journey — Referrer
1. [Where they discover the program — in-app, email, settings]
2. [How they get their referral link/code]
3. [How they share — copy link, email, social, SMS]
4. [How they track referral status]
5. [How they receive their reward]
6. [How they're encouraged to refer again]

### User Journey — Referred
1. [How they receive the referral — link, code, email]
2. [Where the link takes them — landing page, signup with code pre-filled]
3. [How the discount/credit is applied]
4. [What their onboarding experience is (different from non-referred?)]
5. [When/how they learn about the referral program themselves]

### Referral Link Structure
- Format: `[yourdomain.com]/refer/[unique-code]`
- Code type: [Auto-generated alphanumeric / Custom vanity codes / User ID-based]
- Tracking: [URL parameter / Cookie / Account linking]
- Attribution window: [30 days / 90 days / First-touch only]

## 4. Tracking & Attribution

### Conversion Events
| Event | Definition | Tracking Method |
|-------|-----------|----------------|
| Referral link shared | Referrer copies link or clicks share button | [Frontend event] |
| Referral link clicked | Referred user clicks the link | [UTM + cookie] |
| Referred signup | New user creates account via referral | [Account creation with referral code] |
| Referred qualification | Referred user completes qualifying action | [e.g., First purchase, trial activation, plan upgrade] |
| Reward issued | Referrer reward credited/paid | [Backend event + notification] |

### Funnel Metrics
| Stage | Metric | Target |
|-------|--------|--------|
| Awareness → Share | % of eligible customers who share | [Target %] |
| Share → Click | Clicks per share (virality) | [Target ratio] |
| Click → Signup | Referral link conversion rate | [Target %] |
| Signup → Qualification | % of referred signups who qualify | [Target %] |
| Overall | Referrals per referring customer | [Target ratio] |

## 5. Viral Coefficient Calculation

### Formula
```
K = i × c
```
- **i** = invitations per user (average shares per referring customer)
- **c** = conversion rate per invitation (% of invited who become customers)
- **K** = viral coefficient (> 1.0 = exponential growth, < 1.0 = still valuable as acquisition supplement)

### Current/Projected Numbers
- Average invitations per referring customer: [X]
- Conversion rate per invitation: [X%]
- Viral coefficient (K): [X]
- Viral cycle time: [X days] (time from referral to new customer referring)

### Improvement Levers
| Lever | Current | Target | Impact on K |
|-------|---------|--------|-------------|
| Increase share rate | [%] | [%] | K goes from [X] to [X] |
| Increase link click-through | [%] | [%] | K goes from [X] to [X] |
| Increase signup conversion | [%] | [%] | K goes from [X] to [X] |
| Decrease viral cycle time | [X days] | [X days] | Faster compounding |

## 6. A/B Test Plan

| Test | Hypothesis | Variants | Metric | Duration | Min Sample |
|------|-----------|----------|--------|----------|-----------|
| [Reward amount] | [Higher reward increases share rate without tanking ROI] | [$10 vs. $20 vs. $30] | [Shares per user, cost per referral] | [30 days] | [500 per variant] |
| [Reward type] | [Account credit converts better than discount code] | [Credit vs. % discount vs. free month] | [Qualification rate] | [30 days] | [300 per variant] |
| [Share prompt timing] | [Prompting after a positive event increases shares] | [After first success / After 7 days / In settings only] | [Share rate] | [21 days] | [1,000 per variant] |
| [Referral landing page] | [Social proof increases signup conversion] | [Standard LP vs. LP with referrer name + testimonials] | [Signup rate] | [21 days] | [500 per variant] |
| [One-sided vs. two-sided] | [Two-sided rewards increase both share and signup rates] | [Referrer-only vs. Both get reward] | [K factor] | [30 days] | [500 per variant] |
| [Share channel] | [Pre-written message increases share completion] | [Copy link only vs. Pre-filled email/SMS/social] | [Shares per session] | [14 days] | [300 per variant] |

## 7. Fraud Prevention

### Risk Vectors
| Risk | Description | Prevention |
|------|------------|------------|
| Self-referral | User refers themselves with a second account | [Email domain matching, device fingerprinting, IP checks] |
| Referral rings | Groups of users referring each other for rewards | [Graph analysis on referral chains, cap rewards per period] |
| Fake signups | Referrer creates fake accounts to earn rewards | [Require qualification event before reward, email verification] |
| Coupon abuse | Referred discount shared publicly on deal sites | [Single-use codes, tie to referral link, monitor for public posting] |
| Bot abuse | Automated signups via referral links | [CAPTCHA on signup, device fingerprinting, velocity checks] |

### Fraud Rules
- Maximum [X] referral rewards per user per [month/quarter]
- Referrer and referred cannot share the same IP address or device
- Referred user must complete [qualifying action] before referrer receives reward
- Reward clawback policy: If referred user refunds/churns within [X] days, referrer reward is reversed
- Monitor for referral codes appearing on coupon/deal aggregator sites — auto-expire if found
- Flag accounts with > [X] referrals per day for manual review

## 8. Program Promotion

### Launch Plan
| Phase | Timeline | Channels | Action |
|-------|----------|----------|--------|
| Soft launch | [Week 1-2] | [Email to top 10% customers] | [Test mechanics, gather feedback, fix bugs] |
| Full launch | [Week 3] | [All channels] | [Email blast, in-app announcement, social] |
| Sustained promotion | [Ongoing] | [Automated touchpoints] | [Post-purchase, milestone emails, in-app prompts] |

### Automated Touchpoints
| Trigger | Channel | Message | Timing |
|---------|---------|---------|--------|
| [First purchase / signup] | [Email] | [Welcome + introduce referral program] | [24 hours after] |
| [Positive event — milestone, achievement, NPS 9-10] | [In-app + email] | ["Love [product]? Share it with a friend"] | [Immediately after event] |
| [X days after signup with no referral] | [Email] | [Reminder + incentive urgency] | [Day 14] |
| [Referral reward earned] | [Email + in-app notification] | [Celebrate + encourage another referral] | [Immediately] |
| [NPS survey — promoters only] | [Email] | [Direct from NPS to referral program] | [Immediately after NPS 9-10] |

### Program Page
- URL: [yourdomain.com/refer]
- Content: How it works (3 steps), reward details, FAQ, share tools
- SEO: Target "[brand] referral program" and "refer a friend [brand]"

## 9. Success Metrics

| Metric | Target (Month 1) | Target (Month 3) | Target (Month 6) |
|--------|------------------|------------------|------------------|
| Referral program awareness (% of customers who know about it) | [%] | [%] | [%] |
| Share rate (% of aware customers who share) | [%] | [%] | [%] |
| Referrals per referrer | [X] | [X] | [X] |
| Referral signup rate | [%] | [%] | [%] |
| Referral qualification rate | [%] | [%] | [%] |
| Cost per referred customer | $[X] | $[X] | $[X] |
| % of new customers from referral | [%] | [%] | [%] |
| Referred customer 90-day retention | [%] | [%] | [%] |
| Viral coefficient (K) | [X] | [X] | [X] |
```

### How to Write Each Section

**Program Overview**
Start with the simplest possible explanation. Who refers, who gets referred, what does each person get. If you can't explain the program in one sentence, it's too complicated. Two-sided incentives (both referrer and referred get rewarded) outperform one-sided in most cases because they reduce friction for the referrer — it's easier to share when you're offering something, not just asking for a favor.

Good: "Any customer on a paid plan can refer a friend. The friend gets their first month free. When the friend subscribes to a paid plan, the referrer gets $25 credit. Simple — share a link, friend signs up, you both win."

Bad: "Our multi-tiered advocacy partner ecosystem enables brand ambassadors to leverage their network..." (Nobody will share a program they can't explain.)

**Incentive Structure**
The reward must be large enough to motivate action but small enough to sustain unit economics. Test different reward types — account credit, cash, free months, and physical goods all perform differently depending on your product. The referred reward is often more important than the referrer reward because it directly impacts conversion rate. Two-sided programs typically have a 2-3x higher K factor than one-sided programs.

**Referral Flow**
Map every step both users take. Friction at any point kills the loop. Common friction points: the referrer can't find their link, the share mechanism is clunky, the referred user's discount doesn't auto-apply, the referrer doesn't know when their reward arrives. Test every step yourself before launching.

**Viral Coefficient Calculation**
Be honest about your K factor. Very few products achieve K > 1.0 (true virality). A K of 0.3-0.5 is excellent for most B2B products and means referrals supplement paid acquisition significantly. The viral cycle time matters as much as K — a K of 0.5 with a 7-day cycle compounds much faster than K of 0.5 with a 60-day cycle.

**Fraud Prevention**
Design for fraud from day one — don't bolt it on after you've been exploited. The most common fraud vectors are self-referral, referral rings, and coupon abuse on deal sites. Delay reward distribution until a qualifying event (purchase, trial activation, or retention milestone) to filter out gaming. Set per-user caps and monitor anomalies.

### Conventions

- Length: 4-6 pages
- Tone: Clear, specific, focused on mechanics and measurement
- Keep the program simple — if it takes more than 2 sentences to explain, simplify
- Two-sided incentives outperform one-sided in most cases
- Delay referrer rewards until the referred user completes a qualifying action
- Set per-user reward caps to prevent fraud and control costs
- Calculate and track your viral coefficient monthly
- Test incentive amounts and types — don't assume you know what motivates sharing
- Build fraud prevention into the design, not as an afterthought
- Prompt referrals at moments of delight, not randomly
- Make sharing dead simple — pre-filled messages, one-click copy, direct social share
- Track referred customer quality (retention, LTV) separately from overall customer metrics

### Anti-Patterns

- Do NOT launch a referral program without fraud prevention — it will be exploited within days
- Do NOT make the referral process require more than 3 clicks — every click loses 50%+ of potential referrers
- Do NOT reward referrers before the referred user completes a qualifying action — this invites fake signups
- Do NOT create tiered rewards that are too complex to understand — if the user needs a chart to know their reward, it's too complex
- Do NOT rely on a referral program as your only acquisition channel — even well-designed programs typically drive 10-30% of new customers, not 100%
- Do NOT forget to track referred customer LTV separately — referred customers often have different (usually higher) retention and spending patterns
- Do NOT send referral prompts to customers who haven't experienced product value yet — you're asking unhappy or neutral users to vouch for you
- Do NOT use generic share copy ("Check this out!") — write specific messages that explain the benefit to the recipient
- Do NOT ignore the referred user's experience — if the landing page doesn't clearly explain what they get and how to claim it, conversion drops
- Do NOT set the attribution window too short — if it's 7 days and someone takes 10 days to sign up, the referrer gets no credit and stops referring
- Do NOT cap referrals too aggressively — your best referrers are worth protecting, not limiting
- Do NOT launch without a plan for sustained promotion — day-one email blast fades fast. You need automated, ongoing touchpoints

### Examples

```markdown
# Referral Program: Streamline — Project Management SaaS

**Author:** Jordan Blake
**Last Updated:** 2026-03-18
**Program Name:** Streamline Referrals
**Launch Date:** April 7, 2026
**Primary Goal:** Acquire 300 new paying customers via referrals in 6 months, at < $18 cost per referral

---

## 1. Program Overview

**Who can refer:** Any customer on a paid plan (Starter, Pro, or Business) with at least 14 days of active use
**Who can be referred:** Anyone who doesn't currently have a Streamline account
**Program type:** Two-sided
**Core mechanic:** Referrer gets $25 account credit, referred gets first month free (any plan)

### One-Line Pitch
"Give a friend their first month of Streamline free — get $25 off your next bill when they subscribe."

## 2. Incentive Structure

### Referrer Reward
| Reward Type | Value | When Earned | Expiration |
|------------|-------|-------------|------------|
| Account credit | $25 | When referred user subscribes to a paid plan (after free month ends) | 90 days from issue |

### Referred Reward
| Reward Type | Value | Conditions | Expiration |
|------------|-------|-----------|------------|
| Free first month | $0 for month 1 (any plan) | New account only, no previous trial | Auto-applied via referral link |

### Reward Economics
- Cost per referral: $25 (referrer credit) + $29 estimated (free month at avg plan price) = $54 total
- Referred customer LTV (12-month): $348 (avg plan $29/mo × 12 months at 78% retention)
- LTV:Referral Cost ratio: 6.4:1
- Comparison to paid CAC: $54 (referral) vs. $92 (Google Ads) vs. $78 (Meta Ads)
- Maximum referral rewards per referrer per quarter: $250 (10 referrals)

## 3. Referral Flow

### User Journey — Referrer
1. **Discovery:** Referral tab in left sidebar (persistent), post-onboarding email (Day 14), and celebration email after completing first project
2. **Get link:** One-click copy of unique referral link from referral dashboard. Format: streamline.app/refer/jordan-x7k2
3. **Share:** Copy link button (primary), pre-filled email ("I've been using Streamline for project management — here's a free month"), Twitter share button, LinkedIn share button
4. **Track:** Referral dashboard shows: link clicks, signups, active trials, conversions, credits earned
5. **Reward:** $25 credit auto-applied to next billing cycle. Email notification: "Your friend [name] just subscribed — $25 credit applied!"
6. **Re-engage:** After each successful referral, dashboard shows progress toward next tier and suggests sharing again

### User Journey — Referred
1. **Receive:** Friend shares link via email, DM, social, or Slack
2. **Land:** Referral landing page (streamline.app/refer/jordan-x7k2) — personalized with referrer's name: "Jordan invited you to try Streamline free for a month"
3. **Signup:** Standard signup flow, free month auto-applied (no code entry needed). Badge: "Referred by Jordan — your first month is free"
4. **Onboard:** Same onboarding as all new users, with an additional welcome message: "Jordan thought you'd love Streamline. Here's how to get started."
5. **Learn about referral program:** Day 14 email (same as all users) introduces the referral program

### Referral Link Structure
- Format: `streamline.app/refer/[first-name]-[4-char-code]`
- Code type: Auto-generated, using first name + random 4-character alphanumeric
- Tracking: Referral code stored in cookie (90-day expiry) and linked to account on signup
- Attribution window: 90 days from first click

## 4. Tracking & Attribution

### Conversion Events
| Event | Definition | Tracking Method |
|-------|-----------|----------------|
| Link shared | Referrer clicks "Copy link" or any share button | Frontend event → Mixpanel |
| Link clicked | Referred user lands on referral page | UTM + cookie (90-day) |
| Referred signup | Account created via referral link | Account creation event with referral_code field |
| Referred qualification | Referred user subscribes to paid plan after free month | Stripe webhook (subscription.created) |
| Reward issued | $25 credit applied to referrer's account | Backend event → referrer notification |

### Funnel Metrics
| Stage | Metric | Month 1 Target | Month 6 Target |
|-------|--------|---------------|----------------|
| Awareness → Share | % of eligible customers who share at least once | 8% | 15% |
| Share → Click | Avg clicks per share event | 1.4 | 1.8 |
| Click → Signup | Referral link signup conversion rate | 18% | 25% |
| Signup → Qualification | % of referred signups who convert to paid | 40% | 50% |
| Overall | Avg referrals per referring customer (6-month) | 1.2 | 2.0 |

## 5. Viral Coefficient Calculation

### Current/Projected Numbers (Month 1 → Month 6)
- Active paid customers: 4,200 → 5,100
- % who refer at least once: 8% → 15%
- Referring customers: 336 → 765
- Avg invitations per referring customer: 3 → 4
- Total invitations: 1,008 → 3,060
- Signup conversion per invitation: 18% → 25%
- New signups from referrals: 181 → 765
- Qualification rate: 40% → 50%
- New paying customers from referrals: 72 → 382
- Viral coefficient (K): 0.017 → 0.075

K is well below 1.0 — this is normal for B2B SaaS. The program is not designed for viral growth. It's designed as a cost-efficient acquisition channel ($54/customer vs. $92 from paid). At 300 new customers over 6 months, referrals will represent approximately 12% of new customer acquisition at 59% lower cost than paid channels.

### Improvement Levers
| Lever | Month 1 | Month 6 Target | Impact |
|-------|---------|---------------|--------|
| Share rate (% of customers) | 8% | 15% | 88% more referring customers |
| Invitations per referrer | 3 | 4 | 33% more total invitations |
| Signup conversion | 18% | 25% | 39% more signups per invitation |
| Qualification rate | 40% | 50% | 25% more paying customers per signup |

## 6. A/B Test Plan

| Test | Hypothesis | Variants | Metric | Duration | Min Sample |
|------|-----------|----------|--------|----------|-----------|
| Referrer reward amount | $25 credit is the sweet spot — $15 is too low to motivate, $40 tanks ROI | $15 / $25 / $40 | Share rate, cost per referral | 30 days | 500 eligible users per variant |
| Referred offer | Free month converts better than 50% discount because "free" has stronger psychological pull | Free month vs. 50% off first 2 months | Signup rate, qualification rate | 30 days | 300 clicks per variant |
| Share prompt timing | Prompting after project completion (positive event) increases share rate vs. generic Day 14 email | Post-project prompt vs. Day 14 email vs. Both | Share rate | 21 days | 1,000 per variant |
| Referral landing page | Showing the referrer's name and a personal message increases trust and signup rate | Generic LP vs. Personalized ("Jordan invited you") | Signup rate | 21 days | 500 clicks per variant |
| Share mechanism | Pre-filled email converts better than copy-link-only because it reduces effort | Copy link only vs. Copy + pre-filled email/Slack | Shares per session, clicks per share | 14 days | 300 per variant |

## 7. Fraud Prevention

### Risk Vectors
| Risk | Description | Prevention |
|------|------------|------------|
| Self-referral | User signs up for a second account using their own referral link | Email domain matching (block same domain for non-business emails), device fingerprinting, same billing address check |
| Referral rings | Coworkers at same company referring each other for credits | Company domain detection — if referrer and referred share the same work email domain, flag for review. Allow but monitor |
| Fake signups | Referrer creates throwaway accounts to earn credits | Qualification event required (paid subscription after free month). No reward on signup alone |
| Coupon sharing | Free month link shared on Reddit, deal forums, or Twitter as a "hack" | Monitor referral codes with > 20 clicks/day. Auto-pause codes appearing on known deal aggregator URLs |
| Bot abuse | Automated account creation via referral link | CAPTCHA on signup, email verification required, rate limit: max 5 signups per referral code per hour |

### Fraud Rules
- Maximum 10 referral rewards per user per quarter ($250 cap)
- Referrer and referred cannot share the same billing address or payment method
- Referred user must convert to paid plan (after free month) before referrer receives credit
- Reward clawback: If referred user cancels within 30 days of paid conversion, referrer credit is reversed
- Referral codes with > 50 signups in 7 days auto-paused for review
- Dedicated Slack alert for any referrer earning > $100 in credits in a 7-day period

## 8. Program Promotion

### Launch Plan
| Phase | Timeline | Channels | Action |
|-------|----------|----------|--------|
| Soft launch | April 7-18 | Email to NPS 9-10 respondents (top 200 customers) | Test full flow, gather feedback, fix UX issues, collect initial testimonials |
| Full launch | April 21 | Email blast (all paid customers), in-app banner, social announcement | Broad awareness, drive first wave of referrals |
| Sustained | Ongoing | Automated touchpoints (see below) | Keep the program visible at moments of delight |

### Automated Touchpoints
| Trigger | Channel | Message | Timing |
|---------|---------|---------|--------|
| First project completed | In-app modal | "Nice work! Know someone who'd love Streamline? Give them a free month." | Immediately after project marked complete |
| Day 14 of active use | Email | "You've been using Streamline for 2 weeks. Share it with your team." | Day 14, 10 AM local time |
| Referral reward earned | Email + in-app | "Your friend just subscribed! $25 credit applied. Want to share again?" | Immediately after qualification event |
| NPS survey — promoters | Email | "Glad you love Streamline! Here's the easiest way to share it." | Within 1 hour of NPS 9-10 response |
| Quarterly reminder | Email | "You haven't referred anyone yet — here's what you're missing." | Quarterly, to eligible non-referrers only |

### Program Page
- URL: streamline.app/referrals
- Content: 3-step how-it-works, reward details, leaderboard (top referrers, anonymized), FAQ
- SEO: Target "Streamline referral program" and "Streamline free month"

## 9. Success Metrics

| Metric | Month 1 Target | Month 3 Target | Month 6 Target |
|--------|---------------|----------------|----------------|
| Program awareness (% of paid customers) | 40% | 65% | 80% |
| Share rate (% of aware who share) | 8% | 12% | 15% |
| Avg referrals per referrer | 1.0 | 1.5 | 2.0 |
| Referral signup rate (click → account) | 18% | 22% | 25% |
| Qualification rate (signup → paid) | 40% | 45% | 50% |
| Cost per referred customer | $54 | $50 | $46 |
| % of new customers from referral | 5% | 8% | 12% |
| Referred customer 90-day retention | 82% | 85% | 85% |
| Viral coefficient (K) | 0.017 | 0.040 | 0.075 |
| Total referred paying customers (cumulative) | 72 | 165 | 300 |
```

### Customization

Replace all `[bracketed]` sections with your product, pricing, and user data. Adjust the incentive structure to match your unit economics — the referrer reward should be 5-15% of first-year LTV. For B2C products, consider physical rewards or experiential incentives alongside account credits. For B2B products, account credits typically work best because they reduce churn risk. Set your fraud prevention rules based on your product's vulnerability — freemium products need tighter controls than paid-only products.
