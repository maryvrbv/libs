---
name: funnel-analysis
description: "Funnel Analysis framework for marketing work. Marketing funnel analysis is the process of mapping the customer journey from first touch to purchase, measuring conversion rates between stages, diagnosing where and why prospects drop off, and generating prioritized optimization hypotheses. A marketer does this when auditing the acquisition funnel, optimizing a campaign flow, improving landing page performance, or diagnosing why lead volume is not converting to revenue. Use when asked for: анализ воронки, воронка продаж, конверсия по этапам, где отваливаются."
---

# Funnel Analysis

Marketing funnel analysis is the process of mapping the customer journey from first touch to purchase, measuring conversion rates between stages, diagnosing where and why prospects drop off, and generating prioritized optimization hypotheses. A marketer does this when auditing the acquisition funnel, optimizing a campaign flow, improving landing page performance, or diagnosing why lead volume is not converting to revenue.

## Before you start

- **Product context.** This framework needs to know the product: name, what it does, who it serves. Take it from the request, the project's CLAUDE.md or README, or earlier conversation. If it is missing and matters for the output, ask one short question instead of inventing facts.
- **Language.** The framework is written in English; write the deliverable in the language of the request (Russian request → Russian output), and adapt examples, platforms and conventions to that market.
- **No invented numbers.** Placeholders in `[brackets]` are to be filled with real data from the user. Where data is missing, leave a clearly marked placeholder rather than fabricating metrics, quotes or customer names.

## Structure

#### Funnel Overview

**Funnel Name:** [Name — e.g., "Paid Social → Purchase Funnel"]
**Date Range:** [Analysis period]
**Total Visitors Entering Funnel:** [Count]
**Overall Conversion Rate:** [Entry to final stage %]
**Revenue Generated:** [Total revenue from conversions in this period]

#### Funnel Stages

| Stage | Definition | Visitors/Leads | Conversion from Previous | Cumulative Conversion | Median Time to Next Stage | Revenue Impact |
|-------|-----------|----------------|--------------------------|----------------------|---------------------------|----------------|
| 1. [Stage Name] | [What the visitor did to enter this stage] | [Count] | — | 100% | [Time] | — |
| 2. [Stage Name] | [Specific action or event] | [Count] | [%] | [%] | [Time] | — |
| 3. [Stage Name] | [Specific action or event] | [Count] | [%] | [%] | [Time] | — |
| 4. [Stage Name] | [Specific action or event] | [Count] | [%] | [%] | [Time] | — |
| 5. [Stage Name] | [Specific action or event] | [Count] | [%] | [%] | — | [$] |

#### Funnel Visualization

```
Stage 1: [Name]     ████████████████████████████████████████  [Count] (100%)
Stage 2: [Name]     ████████████████████████████             [Count] ([%])
Stage 3: [Name]     ██████████████████                       [Count] ([%])
Stage 4: [Name]     ██████████                               [Count] ([%])
Stage 5: [Name]     ██████                                   [Count] ([%])
```

#### Drop-Off Analysis

For each significant drop-off point:

**Drop-Off: Stage [X] → Stage [Y] ([%] drop, [Count] visitors lost)**

| Factor | Evidence | Impact (H/M/L) |
|--------|----------|-----------------|
| [Potential cause] | [Data or qualitative signal supporting this] | [High/Medium/Low] |
| [Potential cause] | [Data or qualitative signal] | [High/Medium/Low] |

#### Segment Comparison

| Segment | Stage 1→2 | Stage 2→3 | Stage 3→4 | Stage 4→5 | Overall | AOV |
|---------|-----------|-----------|-----------|-----------|---------|-----|
| [Channel A] | [%] | [%] | [%] | [%] | [%] | [$] |
| [Channel B] | [%] | [%] | [%] | [%] | [%] | [$] |
| [Device Type] | [%] | [%] | [%] | [%] | [%] | [$] |
| All Traffic | [%] | [%] | [%] | [%] | [%] | [$] |

#### Optimization Hypotheses

| # | Hypothesis | Target Stage | Expected Impact | Effort | Priority |
|---|-----------|-------------|-----------------|--------|----------|
| 1 | [If we do X, then Y will improve by Z because...] | [Stage X→Y] | [% improvement estimate] | [S/M/L] | [P1/P2/P3] |
| 2 | ... | ... | ... | ... | ... |

#### Test Plan

| Test | Hypothesis # | Type | Metric | Sample Size | Duration | Success Criteria |
|------|-------------|------|--------|-------------|----------|-----------------|
| [Test name] | [#] | [A/B / Multivariate / Before-After] | [Primary metric] | [Required sample] | [Weeks] | [What constitutes a win] |

## How to Write Each Section

**Funnel Overview**
Set the frame immediately. Name the funnel so there is zero ambiguity about which customer journey you are analyzing. A marketing team may have 5-10 funnels running simultaneously — "the funnel" is not specific enough. Include the date range, total volume, overall conversion rate, and total revenue. These four numbers are the headline. A reader should know the scale and efficiency of this funnel in 10 seconds.

Good: "Paid Social → Purchase Funnel, Feb 1-28, 2026. 142,000 visitors entered. 1.8% overall conversion. $384,000 revenue generated."
Bad: "Marketing funnel analysis" with no dates, no volume, no conversion rate.

**Funnel Stages**
Each stage must correspond to a measurable event — a click, a form submission, an add-to-cart, a payment. Not "awareness" or "consideration." Those are marketing framework concepts, not measurable stages. The stages should reflect the actual customer journey on your site or in your app.

For e-commerce: Landing Page View → Product Page View → Add to Cart → Begin Checkout → Purchase.
For SaaS: Ad Click → Landing Page → Sign-Up → Activation → Paid Conversion.
For lead gen: Ad Click → Landing Page → Form Submit → Sales Contact → Closed-Won.

Include revenue impact at the final stage so the funnel connects to dollars, not just percentages.

Good: "Stage 3: Add to Cart — Visitor clicks the 'Add to Cart' button on any product page. Event: `ecommerce.add_to_cart`. Count: 8,420."
Bad: "Stage 3: Interest — Visitors who seem interested in buying."

**Drop-Off Analysis**
This is the diagnostic core. For every major drop-off (any stage-to-stage conversion below 50%, or any stage significantly below benchmark), list 2-5 potential causes with supporting evidence. Evidence can be quantitative (heatmap data, session recordings, A/B test results) or qualitative (customer feedback, support tickets, usability tests). Rate the likely impact of each factor.

Always calculate the revenue impact of each drop-off. If 5,000 visitors drop off between "Add to Cart" and "Begin Checkout," and the average order value is $68, the maximum revenue at stake is $340,000. This reframes a percentage problem as a dollar problem and helps prioritize.

Good: "Drop-off at Add to Cart → Begin Checkout (38% drop, 3,200 visitors lost). Revenue at stake: $217,600. Factor: Shipping costs revealed only at checkout — 44% of exit survey respondents cited 'unexpected shipping costs.' Heatmap shows 62% of checkout abandoners leave within 8 seconds of the shipping cost appearing. Impact: High."
Bad: "People drop off at checkout. We should improve the checkout."

**Segment Comparison**
The aggregate funnel averages away the most important insights. Always segment by: traffic source/channel, device type (mobile vs desktop), new vs returning visitors, and geography (if relevant). The segment with the highest overall conversion tells you where the funnel works best. The segment with the lowest tells you where to investigate.

Include Average Order Value (AOV) by segment. A channel with lower conversion but higher AOV may generate more total revenue per visitor than a high-converting, low-AOV channel.

Good: "Email traffic converts at 4.2% with $82 AOV ($3.44 revenue per visitor) vs paid social at 1.1% with $54 AOV ($0.59 revenue per visitor). Email drives 5.8x more revenue per visitor."
Bad: "Email converts better than social."

**Optimization Hypotheses**
Every hypothesis must follow the structure: "If we [action], then [metric] will improve by [estimate] because [evidence]." Prioritize by expected revenue impact and effort. Link each hypothesis to a specific drop-off point identified in the analysis. Do not include hypotheses that are not supported by evidence from the drop-off analysis.

**Test Plan**
Every hypothesis worth pursuing gets a test plan. Specify the test type (A/B, multivariate, or before-after if A/B is not feasible), the primary metric, the required sample size for statistical significance, the estimated duration, and the success criteria. This prevents the team from running tests without a clear definition of "win."

Good: "A/B test: Show shipping cost on product page vs current (reveal at checkout). Primary metric: Add-to-Cart → Purchase conversion rate. Required sample: 12,000 visitors per variant (based on 80% power, 5% significance, 15% minimum detectable effect). Duration: 3 weeks at current traffic levels. Success: Variant B improves Stage 3→5 conversion by at least 10% with no decrease in AOV."
Bad: "Let's test showing shipping costs earlier and see what happens."

## Conventions

- Always include the date range, total volume, and overall conversion rate in the overview. Funnel analysis without context is noise.
- Define every stage by a specific, measurable visitor action or event. No subjective stages.
- Include both absolute counts and percentages at every stage. Percentages without counts hide sample size issues.
- Calculate the revenue at stake for each major drop-off. This converts percentage problems into dollar problems.
- Segment the funnel by at least two dimensions — typically channel and device type.
- Include Average Order Value (AOV) in segment comparisons. Conversion rate alone does not capture value.
- Hypotheses must be testable. If you cannot design an experiment around it, rewrite it.
- Format large numbers with commas (142,000 not 142000). Percentages to one decimal place (34.2% not 34.218%).
- Every test plan must include required sample size and success criteria before the test begins.
- When comparing funnels over time, use the same stage definitions and entry criteria.
- Specify the measurement window for multi-session funnels — e.g., "30 days from first visit."
- The audience is the marketing team and leadership who will allocate budget and resources based on this analysis.

## Anti-Patterns

- Do NOT define funnel stages using abstract marketing concepts like "awareness" or "consideration." Every stage must map to a trackable event.
- Do NOT analyze a marketing funnel without specifying the traffic source or entry criteria. "All traffic" is rarely useful — segment by channel at minimum.
- Do NOT ignore time-between-stages. A funnel with 60% conversion over 30 days performs very differently from one with 60% conversion in a single session.
- Do NOT present only the aggregate funnel. Always segment by at least channel and device type.
- Do NOT jump from "there is a drop-off" to "here is the solution" without a diagnostic step. Diagnose causes before prescribing fixes.
- Do NOT treat all drop-offs as problems. Some drop-offs are healthy — visitors who are not in your target audience self-selecting out save you ad spend.
- Do NOT mix traffic from different campaigns or time periods without accounting for creative changes, landing page updates, or seasonality.
- Do NOT count the same visitor multiple times in a single funnel pass. Use distinct visitor counts, not pageview counts.
- Do NOT ignore mobile vs desktop differences. Mobile funnels often have 40-60% lower conversion rates than desktop — combining them hides the issue.
- Do NOT present funnel data without revenue impact. A 5% improvement at Stage 3→4 means nothing without knowing the dollar value at stake.
- Do NOT run optimization tests without pre-defined success criteria and sample size requirements. "Let's see what happens" is not a test plan.
- Do NOT optimize a funnel stage in isolation. Fixing Stage 2→3 may push unqualified traffic into Stage 3→4 and worsen downstream conversion.
- Do NOT assume the funnel is linear. Some visitors skip stages, revisit stages, or enter mid-funnel from retargeting. Account for non-linear paths.
- Do NOT present a funnel analysis without next steps. Every analysis should end with specific actions and their expected impact.
- Do NOT confuse correlation with causation in drop-off analysis. "Users who view 3+ products convert at higher rates" does not mean showing more products causes conversion — those users may already have higher purchase intent.

## Examples

#### Funnel Analysis: GearVault (E-Commerce — Outdoor Equipment)

**Product Context:** GearVault is a direct-to-consumer e-commerce brand selling outdoor equipment — camping gear, hiking packs, and climbing accessories. Average order value is $127. The marketing team runs paid campaigns on Google, Meta (Instagram/Facebook), and email. The team wants to diagnose why the February purchase funnel underperformed despite a 22% increase in traffic.

---

**Funnel Overview**

**Funnel Name:** Site-Wide Purchase Funnel (All Channels)
**Date Range:** February 1-28, 2026
**Total Visitors Entering Funnel:** 186,400
**Overall Conversion Rate:** 1.72% (3,210 purchases)
**Revenue Generated:** $407,700
**Average Order Value:** $127
**Entry Criteria:** All visitors who viewed at least one page on gearvault.com during the date range. Bot traffic excluded (identified by user-agent filter and IP blacklist). Internal traffic excluded (office IP range).
**Measurement Window:** Single-session funnel. Multi-session purchases tracked separately via attribution model.

**Funnel Stages**

| Stage | Definition | Visitors | Conv. from Previous | Cumulative Conv. | Median Time to Next | Revenue Impact |
|-------|-----------|----------|---------------------|------------------|---------------------|----------------|
| 1. Site Visit | Visitor loads any page on gearvault.com | 186,400 | — | 100% | 48 sec | — |
| 2. Product Page View | Visitor views a product detail page (PDP) | 94,200 | 50.5% | 50.5% | 2.1 min | — |
| 3. Add to Cart | Visitor clicks "Add to Cart" on any PDP | 18,840 | 20.0% | 10.1% | 3.4 min | — |
| 4. Begin Checkout | Visitor enters the checkout flow (clicks "Checkout") | 9,420 | 50.0% | 5.1% | 1.8 min | — |
| 5. Purchase Complete | Visitor completes payment | 3,210 | 34.1% | 1.72% | — | $407,700 |

**Funnel Visualization**

```
1. Site Visit          ████████████████████████████████████████  186,400 (100%)
2. Product Page View   ████████████████████                      94,200 (50.5%)
3. Add to Cart         ████                                      18,840 (10.1%)
4. Begin Checkout      ██                                         9,420 (5.1%)
5. Purchase Complete   █                                          3,210 (1.72%)
```

**Drop-Off Analysis**

**Drop-Off: Stage 1 → Stage 2 (49.5% drop — 92,200 visitors lost)**

| Factor | Evidence | Impact |
|--------|----------|--------|
| Blog traffic with no purchase intent | 38% of February traffic landed on blog posts (up from 24% in January — a viral camping safety article drove 26,000 visits). Blog-to-PDP rate is 12% vs 68% for category page landings. | High |
| Homepage bounce rate increased | Homepage bounce rate rose from 34% to 41% in February. Heatmap shows the above-fold hero banner (winter clearance sale) had low click engagement — 8% CTR vs 14% for the previous banner. | Medium |
| Slow page load on mobile | Mobile page load time increased from 2.1s to 3.4s in February after the addition of a new review widget. Mobile bounce rate is 52% vs 31% on desktop. | Medium |

**Drop-Off: Stage 2 → Stage 3 (80.0% drop — 75,360 visitors lost, $9.6M revenue at stake)**

| Factor | Evidence | Impact |
|--------|----------|--------|
| Price comparison browsing | Session replay analysis of 200 sessions shows visitors viewing 4-6 product pages, comparing prices, then leaving. Average session depth for non-converters: 4.8 pages. For converters: 2.1 pages. Heavy browsing without adding to cart suggests price sensitivity or decision paralysis. | High |
| Out-of-stock products still indexed | 14% of PDP visits in February were to out-of-stock products. These pages show "Notify Me" instead of "Add to Cart." Users who hit an out-of-stock page are 3x less likely to view another product and 5x less likely to purchase. | High |
| Insufficient product information | Exit survey (n=340): 28% of respondents who viewed a PDP but did not add to cart cited "not enough information to decide" — specifically wanting more size/weight specs and comparison photos. | Medium |
| No urgency or social proof | GearVault PDPs have no stock indicators, no "X people viewing this" signals, and no recent purchase notifications. Competitor sites (REI, Backcountry) use scarcity and social proof extensively. | Medium |

**Drop-Off: Stage 3 → Stage 4 (50.0% drop — 9,420 visitors lost, $1.2M revenue at stake)**

| Factor | Evidence | Impact |
|--------|----------|--------|
| Shipping cost surprise | Shipping costs ($8.95 flat rate) are not shown until the checkout page. Cart abandonment survey (n=180): 52% cited "shipping costs" as the primary reason. GearVault shows "$8.95 shipping" only after "Checkout" is clicked. | High |
| Forced account creation | Checkout requires account creation before entering payment information. 34% of checkout abandoners exit on the account creation step. Guest checkout is not available. | High |
| Cart timeout / save issues | Mobile users who add to cart and return later find an empty cart. Cart persistence is 30 minutes. Industry standard is 7-30 days. | Medium |

**Drop-Off: Stage 4 → Stage 5 (65.9% drop — 6,210 visitors lost, $788,670 revenue at stake)**

| Factor | Evidence | Impact |
|--------|----------|--------|
| Payment method limitations | GearVault accepts credit cards and PayPal only. No Apple Pay, Google Pay, or buy-now-pay-later (BNPL). Competitor analysis shows 60% of outdoor e-commerce sites now offer BNPL, which increases conversion by 20-30% on orders over $100. | High |
| Delivery time uncertainty | Checkout shows "Ships in 3-7 business days" with no specific delivery date. Competitors show exact delivery dates. Checkout survey respondents (n=120): 22% cited "unclear when it would arrive" as a hesitation. | Medium |
| Security concerns | No trust badges visible on the checkout page. GearVault is a newer brand — 40% of traffic is first-time visitors who have no brand familiarity. | Low |

**Segment Comparison**

| Segment | 1→2 | 2→3 | 3→4 | 4→5 | Overall | AOV | Rev/Visitor |
|---------|------|------|------|------|---------|-----|-------------|
| Google Ads (search) | 68.2% | 24.1% | 56.4% | 38.2% | 3.54% | $142 | $5.03 |
| Meta (Instagram) | 42.1% | 16.8% | 44.2% | 28.6% | 0.90% | $98 | $0.88 |
| Meta (Facebook) | 45.6% | 18.2% | 46.8% | 30.1% | 1.16% | $108 | $1.25 |
| Email (campaigns) | 72.4% | 28.6% | 62.1% | 42.8% | 5.53% | $156 | $8.63 |
| Organic (SEO) | 38.4% | 18.4% | 48.6% | 32.4% | 1.10% | $134 | $1.47 |
| Direct | 61.2% | 22.8% | 54.2% | 40.1% | 3.02% | $148 | $4.47 |
| Mobile (all channels) | 44.2% | 15.6% | 42.1% | 26.8% | 0.78% | $94 | $0.73 |
| Desktop (all channels) | 58.4% | 24.8% | 56.2% | 38.4% | 3.16% | $152 | $4.80 |
| All Traffic | 50.5% | 20.0% | 50.0% | 34.1% | 1.72% | $127 | $2.19 |

**Key segment insights:**

- **Email crushes everything:** 5.53% conversion, $8.63 revenue per visitor. 9.8x more revenue per visitor than Instagram. Email subscribers are the highest-value traffic source by a wide margin.
- **Mobile is broken:** 0.78% conversion vs 3.16% desktop. The 4x gap is larger than the industry average (2-3x gap is typical for e-commerce). Mobile-specific issues (page load, cart persistence, checkout UX) are costing significant revenue. Mobile accounts for 58% of traffic but only 26% of revenue.
- **Instagram traffic is low-value:** 0.90% conversion, $98 AOV. Instagram visitors browse more pages (5.2 avg) but buy less. They may be using GearVault for product research without purchase intent, or the Instagram creative is attracting window-shoppers rather than buyers.
- **Google Search is efficient:** 3.54% conversion with the highest non-email AOV ($142). High-intent search traffic converts well. The 68.2% landing-to-PDP rate confirms these visitors arrive with specific product interest.

**Optimization Hypotheses**

| # | Hypothesis | Target Stage | Expected Impact | Effort | Priority |
|---|-----------|-------------|-----------------|--------|----------|
| 1 | If we show shipping costs on the product page (not just at checkout), then Stage 3→4 conversion will improve by 12-18% because 52% of cart abandoners cite shipping cost surprise and this removes the surprise. Revenue impact: $142K-$213K/month. | 3→4 | +12-18% | Small | P1 |
| 2 | If we add guest checkout (no account required), then Stage 3→4 conversion will improve by 8-14% because 34% of checkout abandoners exit at account creation. Revenue impact: $95K-$166K/month. | 3→4 | +8-14% | Medium | P1 |
| 3 | If we add Apple Pay, Google Pay, and Afterpay (BNPL) as payment options, then Stage 4→5 conversion will improve by 15-25% because competitors offering BNPL report 20-30% lift on orders over $100, and GearVault's AOV is $127. Revenue impact: $118K-$197K/month. | 4→5 | +15-25% | Medium | P1 |
| 4 | If we remove out-of-stock products from paid search and ad campaigns, then Stage 2→3 conversion will improve by 3-5% because 14% of PDP visits go to out-of-stock pages and these visitors rarely convert. Savings: reduced wasted ad spend on dead-end clicks. | 2→3 | +3-5% | Small | P1 |
| 5 | If we optimize mobile page load time back to 2.1s (from 3.4s) by lazy-loading the review widget, then Stage 1→2 mobile conversion will improve by 8-12% because every 1s of load time reduces mobile conversion by 7-10%. | 1→2 | +8-12% | Small | P2 |
| 6 | If we add stock level indicators and recent purchase notifications to PDPs, then Stage 2→3 conversion will improve by 4-8% because urgency and social proof signals are standard on competing sites and absent on GearVault. | 2→3 | +4-8% | Medium | P2 |
| 7 | If we add a size/weight comparison table to gear PDPs, then Stage 2→3 conversion will improve by 2-4% because 28% of exit survey respondents cited insufficient specs as the reason for not adding to cart. | 2→3 | +2-4% | Medium | P3 |

**Test Plan**

| Test | Hyp # | Type | Primary Metric | Sample Size | Duration | Success Criteria |
|------|-------|------|---------------|-------------|----------|-----------------|
| Show shipping on PDP | 1 | A/B | Cart-to-Checkout rate | 8,000 visitors per variant | 2 weeks | ≥10% improvement in Stage 3→4, no decrease in Add-to-Cart rate |
| Guest checkout | 2 | A/B | Checkout completion rate | 4,000 checkout entrants per variant | 3 weeks | ≥8% improvement in Stage 4→5, account creation rate tracked as secondary metric |
| BNPL payment option | 3 | Before/After | Purchase completion rate | N/A (site-wide change) | 4 weeks, compare to prior 4-week period | ≥12% improvement in Stage 4→5, BNPL adoption rate ≥15% of transactions |
| Remove OOS from ads | 4 | Before/After | PDP-to-Cart rate | N/A (feed change) | 2 weeks | ROAS improvement of ≥0.5:1, CPL reduction |
| Mobile page speed | 5 | Before/After | Mobile bounce rate | N/A (site-wide) | 2 weeks | Bounce rate drops ≥5pp, Stage 1→2 mobile improves ≥6% |

**Impact Projection**

If the top 4 hypotheses (P1 items) succeed at the low end of their estimated ranges:
- Stage 2→3: Improves from 20.0% to ~20.7% (+0.7pp from removing OOS products from ads)
- Stage 3→4: Improves from 50.0% to ~60.0% (+10pp from shipping transparency + guest checkout)
- Stage 4→5: Improves from 34.1% to ~39.2% (+5.1pp from BNPL payment options)
- New overall conversion: ~2.45% (up from 1.72%, a 42% relative improvement)
- Additional monthly revenue: ~$173,000

This projection assumes effects are independent and additive, which is optimistic. A more conservative compound estimate accounting for diminishing returns would be approximately 2.1-2.2% overall conversion, representing $95K-$120K in additional monthly revenue.

**Historical Comparison**

| Month | Visitors | Overall Conv. | Revenue | AOV | Key Changes |
|-------|----------|--------------|---------|-----|-------------|
| Nov 2025 | 142,000 | 2.14% | $385,400 | $127 | Holiday campaign, free shipping over $75 |
| Dec 2025 | 168,000 | 2.38% | $509,200 | $127 | Peak holiday season, gift guide launch |
| Jan 2026 | 152,000 | 1.94% | $374,900 | $127 | Post-holiday normalization |
| Feb 2026 (current) | 186,400 | 1.72% | $407,700 | $127 | 22% traffic increase (viral blog post), review widget added |

February's conversion rate declined despite higher traffic. The 22% traffic increase came primarily from the viral blog post (low-intent blog traffic) and increased Meta spend (lower-converting channel). The review widget degraded mobile performance. Adjusting for the traffic mix shift, the comparable conversion rate is approximately 1.9% — still below January, suggesting the mobile page speed issue is contributing to the decline independently of traffic quality.

**Next Steps**

1. **This week:** Push shipping cost display to PDPs — this is the highest-impact, lowest-effort change. Implement as an A/B test with 50/50 traffic split.
2. **This week:** Remove out-of-stock products from Google Ads and Meta product feeds. This requires no development — just a feed filter update.
3. **Sprint 1:** Lazy-load the review widget to restore mobile page speed to 2.1s. This is a bug fix, not a test — the performance regression is clear.
4. **Sprint 1:** Begin guest checkout implementation. Scope the work and run the A/B test within 3 weeks.
5. **Sprint 2:** Integrate Afterpay (BNPL). This requires a payment provider integration and checkout flow update.
6. **Ongoing:** Re-run this funnel analysis monthly. Compare to the historical table above. Track whether each shipped hypothesis moves its target stage transition as expected.

## Customization

Replace all bracket sections with your product's specifics. Adjust the number of funnel stages based on your purchase flow — 4-6 stages is typical for e-commerce, 5-7 for SaaS, 3-5 for lead gen. For SaaS products, replace "Purchase" with "Paid Conversion" and add activation stages between sign-up and payment. For B2B with sales teams, add MQL → SQL → Opportunity → Closed-Won stages after the marketing handoff. For marketplace products, create separate buyer and seller funnels. For subscription e-commerce, add a reorder/renewal funnel alongside the first-purchase funnel. The segment dimensions should match your business — for B2B, segment by company size, industry, and buying committee role instead of device type.
