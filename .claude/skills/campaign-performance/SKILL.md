---
name: campaign-performance
description: "Campaign Performance framework for marketing work. Campaign performance analysis is the process of evaluating a marketing campaign's results against its objectives, measuring ROI across channels, analyzing audience and creative performance, extracting learnings, and generating recommendations for future campaigns. A marketer does this after a campaign concludes (or at a mid-campaign checkpoint) to understand what worked, what did not, and where to invest next. Use when asked for: результаты кампании, эффективность кампании, ROI кампании, отчёт по кампании."
---

# Campaign Performance

Campaign performance analysis is the process of evaluating a marketing campaign's results against its objectives, measuring ROI across channels, analyzing audience and creative performance, extracting learnings, and generating recommendations for future campaigns. A marketer does this after a campaign concludes (or at a mid-campaign checkpoint) to understand what worked, what did not, and where to invest next.

## Before you start

- **Product context.** This framework needs to know the product: name, what it does, who it serves. Take it from the request, the project's CLAUDE.md or README, or earlier conversation. If it is missing and matters for the output, ask one short question instead of inventing facts.
- **Language.** The framework is written in English; write the deliverable in the language of the request (Russian request → Russian output), and adapt examples, platforms and conventions to that market.
- **No invented numbers.** Placeholders in `[brackets]` are to be filled with real data from the user. Where data is missing, leave a clearly marked placeholder rather than fabricating metrics, quotes or customer names.

## Structure

#### Campaign Summary

| Field | Detail |
|-------|--------|
| **Campaign Name** | [Name] |
| **Objective** | [Primary goal — awareness, leads, sales, launches] |
| **Date Range** | [Start — End] |
| **Total Budget** | [$X] |
| **Total Spend** | [$X (% of budget used)] |
| **Primary KPI** | [Metric + Target] |
| **Result** | [Actual vs Target — Hit/Missed/Exceeded] |

#### Campaign KPI Summary

| KPI | Target | Actual | % of Target | Trend vs Previous Campaign |
|-----|--------|--------|-------------|---------------------------|
| [Primary KPI] | [Target] | [Actual] | [%] | [↑/↓ %] |
| [Secondary KPI 1] | [Target] | [Actual] | [%] | [↑/↓ %] |
| [Secondary KPI 2] | [Target] | [Actual] | [%] | [↑/↓ %] |
| [Efficiency KPI] | [Target] | [Actual] | [%] | [↑/↓ %] |

#### Channel-by-Channel Results

| Channel | Spend | Impressions | Clicks | CTR | Conversions | Conv. Rate | CPA | Revenue | ROAS |
|---------|-------|-------------|--------|-----|-------------|------------|-----|---------|------|
| [Channel 1] | [$] | [Count] | [Count] | [%] | [Count] | [%] | [$] | [$] | [X:1] |
| [Channel 2] | [$] | [Count] | [Count] | [%] | [Count] | [%] | [$] | [$] | [X:1] |
| [Channel 3] | [$] | [Count] | [Count] | [%] | [Count] | [%] | [$] | [$] | [X:1] |
| **Total** | **[$]** | **[Count]** | **[Count]** | **[%]** | **[Count]** | **[%]** | **[$]** | **[$]** | **[X:1]** |

#### Spend vs Return Analysis

| Metric | Planned | Actual | Variance | Note |
|--------|---------|--------|----------|------|
| Total Spend | [$] | [$] | [+/- $] | [Why the variance] |
| Revenue Generated | [$] | [$] | [+/- $] | [Attribution model used] |
| ROAS | [X:1] | [X:1] | [+/- X] | [Blended across channels] |
| ROI | [X%] | [X%] | [+/- %] | [Revenue - All Costs) / All Costs] |
| Cost Per Acquisition | [$] | [$] | [+/- $] | [All costs / conversions] |
| Customer Lifetime Value (est.) | [$] | [$] | [+/- $] | [Based on historical cohort data] |

#### Audience Performance

| Audience Segment | Spend | Impressions | Conversions | CPA | Conv. Rate | ROAS | Insight |
|-----------------|-------|-------------|-------------|-----|------------|------|---------|
| [Segment 1] | [$] | [Count] | [Count] | [$] | [%] | [X:1] | [Key takeaway] |
| [Segment 2] | [$] | [Count] | [Count] | [$] | [%] | [X:1] | [Key takeaway] |
| [Segment 3] | [$] | [Count] | [Count] | [$] | [%] | [X:1] | [Key takeaway] |

#### Creative Performance

| Creative | Format | Channel | Impressions | CTR | Conv. Rate | CPA | Insight |
|----------|--------|---------|-------------|-----|------------|-----|---------|
| [Creative A — brief description] | [Image/Video/Carousel] | [Channel] | [Count] | [%] | [%] | [$] | [What worked/did not] |
| [Creative B — brief description] | [Format] | [Channel] | [Count] | [%] | [%] | [$] | [What worked/did not] |

#### Attribution Analysis

| Attribution Model | Conversions Attributed | Revenue Attributed | Insight |
|-------------------|----------------------|-------------------|---------|
| Last-Click | [Count] | [$] | [How this model tells the story] |
| First-Click | [Count] | [$] | [How this model differs] |
| Linear / Multi-Touch | [Count] | [$] | [The fuller picture] |

#### Learnings

| # | Learning | Evidence | Implication for Future Campaigns |
|---|---------|----------|----------------------------------|
| 1 | [What we learned] | [Data that supports it] | [How to apply it next time] |
| 2 | ... | ... | ... |

#### Recommendations

| # | Recommendation | Expected Impact | Priority |
|---|---------------|-----------------|----------|
| 1 | [Specific action for next campaign] | [Quantified expected improvement] | [P1/P2/P3] |
| 2 | ... | ... | ... |

## How to Write Each Section

**Campaign Summary**
This is the executive summary — the first thing a CMO or VP reads. One glance should answer: what was the campaign, what was the goal, how much did we spend, and did it work? The "Result" line is the verdict. Be direct. "Exceeded target by 18%" or "Missed target by 22% — root cause: Meta CPM spike mid-campaign." Do not soften a miss.

Good: "Product Launch Campaign: CloudSync Pro. Objective: 500 trial sign-ups in 14 days. Budget: $28,000. Spend: $26,400 (94% utilized). Result: 412 trials — missed target by 17.6%. Root cause: LinkedIn CPA was 2.4x forecast due to competitor campaigns saturating the audience."
Bad: "The campaign went well overall and generated good results."

**Channel-by-Channel Results**
Every channel gets one row. The table should make it immediately obvious which channels performed and which did not. Include all the core metrics: spend, impressions, clicks, CTR, conversions, conversion rate, CPA, revenue, and ROAS. This is the most data-dense section — let the numbers speak.

Sort channels by ROAS or by spend, depending on the story you need to tell. If the question is "where should we spend more?" sort by ROAS. If the question is "where did the money go?" sort by spend.

Good: A complete table with every channel, consistent metrics, and a total row that sums spend, impressions, clicks, conversions, and revenue.
Bad: A table with some channels showing CPA and others showing CPL, with no total row and inconsistent formatting.

**Spend vs Return Analysis**
This section connects the campaign to business outcomes. Planned vs actual for every financial metric. The variance column highlights where reality diverged from the plan. Always include the attribution model used — ROAS calculated with last-click attribution will be very different from multi-touch, and the reader needs to know which lens they are looking through.

Include ROI (not just ROAS) when possible. ROI accounts for all costs — not just ad spend, but creative production, landing page development, and team time. ROAS only measures ad spend efficiency.

Good: "ROAS: 4.2:1 (last-click), 5.8:1 (linear multi-touch). ROI: 186% (all costs including $4,200 creative production and $2,100 landing page development). Note: ROAS last-click underweights email and organic contributions."
Bad: "ROAS was 4.2x."

**Audience Performance**
Break down results by audience segment. For paid campaigns, this means targeting audiences (lookalikes, retargeting, interest-based, custom lists). For email campaigns, this means subscriber segments. For organic, this means traffic cohorts. The segment with the best CPA and highest conversion rate is where to increase investment. The segment with the worst metrics is where to cut or redesign.

Good: "Retargeting (past 30-day site visitors): $42 CPA, 3.8% conv. rate, 8.2:1 ROAS. Best-performing segment by far. Lookalike (1% seed from customers): $128 CPA, 1.1% conv. rate, 2.6:1 ROAS. Acceptable for prospecting but should not receive more than 30% of spend."
Bad: "Retargeting worked better than prospecting."

**Creative Performance**
Which ads, emails, or content pieces drove results? Include format, channel, and the core metrics. Identify the top 2-3 performers and the bottom 2-3. For each, explain why it performed the way it did — based on the creative elements (headline, image, CTA, offer, format), not just the numbers.

Good: "Creative A (video testimonial, 30s, Instagram): 2.4% CTR, $62 CPA. This was the top performer. The testimonial format featuring a customer's before/after results drove the highest engagement. Creative D (product carousel, LinkedIn): 0.6% CTR, $218 CPA. The carousel format underperformed on LinkedIn — the platform favors single-image and text-based formats for B2B audiences."
Bad: "Video ads did better than image ads."

**Attribution Analysis**
Report conversions and revenue under at least two attribution models. Last-click over-credits the final touchpoint. First-click over-credits the discovery channel. Linear or time-decay provides a more balanced view. The delta between models reveals which channels are getting under- or over-credited. This matters for budget allocation — a channel that looks weak under last-click but strong under linear is an assist channel that deserves continued investment.

Good: "Google Search: 180 conversions (last-click) vs 142 conversions (linear). Overstated by 26.8% under last-click — Google captures the final click from users who were already in the funnel from other channels. Meta: 82 conversions (last-click) vs 128 conversions (linear). Understated by 35.9% under last-click — Meta is doing awareness and consideration work that other channels close."
Bad: "We used last-click attribution."

**Learnings and Recommendations**
Learnings are backward-looking: what did the data teach us? Recommendations are forward-looking: what should we do differently next time? Every learning must be supported by specific data from the analysis. Every recommendation must be actionable — a specific change, not a vague suggestion.

Good: "Learning: Video testimonials outperform product feature ads by 2.8x on CPA across Instagram and Facebook. The emotional proof format resonates more than specs. Recommendation: Allocate 60% of creative production budget to testimonial videos for the next campaign. Film 3 new testimonials in Q2 featuring different customer personas."
Bad: "Learning: We should do more of what worked."

## Conventions

- Always include the date range, total spend, and primary KPI result in the campaign summary.
- Channel-by-channel results must include spend, conversions, CPA, and ROAS at minimum. Omitting any of these makes comparison impossible.
- Report ROAS and ROI separately. ROAS = Revenue / Ad Spend. ROI = (Revenue - Total Costs) / Total Costs. They are not interchangeable.
- State the attribution model used for all conversion and revenue numbers. If using multiple models, report the deltas.
- Include a "vs Previous Campaign" or "vs Benchmark" column where possible to provide context.
- Format currency consistently (no mixing $1,200 and $1.2K). Use commas for thousands. Percentages to one decimal place.
- Every learning must cite specific evidence from the campaign data. No unsupported opinions.
- Every recommendation must be specific and actionable — include the expected impact and priority.
- Include audience and creative breakdowns. Aggregate campaign metrics hide the most important insights.
- When the campaign missed its target, state the root cause directly in the summary. Do not bury it in the details.
- The audience is the marketing team, leadership, and anyone who approves future campaign budgets.
- Sort channel tables by ROAS (descending) when the goal is efficiency, by spend (descending) when the goal is budget review.

## Anti-Patterns

- Do NOT report campaign results without specifying the attribution model. Last-click, first-click, and multi-touch tell completely different stories.
- Do NOT present ROAS without specifying what costs are included. ROAS on ad spend alone vs ROAS on total campaign cost (including creative, landing page, team time) can differ by 2x or more.
- Do NOT average performance across channels without showing channel-level detail. A campaign with 6:1 ROAS on email and 0.8:1 on Meta is not a "3.4:1 ROAS campaign" — it is one great channel and one that is losing money.
- Do NOT report conversions without specifying the conversion definition. A "conversion" could be a page view, a lead, a trial, or a purchase. Define it once and use it consistently.
- Do NOT compare campaigns with different objectives using the same KPIs. An awareness campaign should not be evaluated on CPA, and a direct-response campaign should not be evaluated on reach.
- Do NOT ignore creative performance. "The campaign worked" without knowing which ads drove the results means you cannot replicate it.
- Do NOT present learnings without evidence. "We should invest more in video" is not a learning — "Video testimonials generated 2.8x lower CPA than product feature ads across Meta ($62 vs $174)" is.
- Do NOT report results without variance from plan. Actuals without context are meaningless. Show planned vs actual and explain the variance.
- Do NOT ignore underperforming segments. A segment with a CPA 3x the average deserves investigation, not silence.
- Do NOT forget to account for time lag in conversions. A 14-day campaign may generate conversions for weeks after it ends. Specify the attribution window.
- Do NOT mix organic and paid results without labeling them. Organic conversions during a campaign period are not necessarily campaign-driven.
- Do NOT present a campaign review without forward-looking recommendations. The review exists to improve the next campaign, not to archive the last one.
- Do NOT compare CPAs across channels without adjusting for customer quality. A $50 CPA on Meta that generates customers with $200 LTV is worse than a $100 CPA on Google that generates customers with $800 LTV.
- Do NOT use impression-based metrics (CPM, reach) as primary success metrics for direct-response campaigns. They are supporting context, not the outcome.
- Do NOT wait more than 2 weeks after campaign end to produce the review. Data is freshest and insights are most actionable when the campaign is still recent.

## Examples

#### Campaign Performance Review: NovaPay (B2B Fintech — Payment Processing)

**Product Context:** NovaPay is a payment processing platform for SaaS companies. The company launched a new product — NovaPay Checkout — a drop-in checkout widget that reduces payment friction. The marketing team ran a 3-week product launch campaign across Google Ads, LinkedIn, email, and a webinar to drive free trial sign-ups.

---

**Campaign Summary**

| Field | Detail |
|-------|--------|
| **Campaign Name** | NovaPay Checkout Launch |
| **Objective** | Drive 400 free trial sign-ups for NovaPay Checkout in 21 days |
| **Date Range** | February 3 – February 23, 2026 |
| **Total Budget** | $45,000 |
| **Total Spend** | $41,200 (91.6% utilized) |
| **Primary KPI** | Free trial sign-ups: 400 |
| **Result** | 347 trials — missed target by 13.3%. Root cause: LinkedIn CPA was 2.1x forecast ($186 vs $88 planned) due to competitive saturation from three competitor launches in the same window. Google and email outperformed. |

**Campaign KPI Summary**

| KPI | Target | Actual | % of Target | vs Previous Launch |
|-----|--------|--------|-------------|-------------------|
| Trial Sign-Ups | 400 | 347 | 86.8% | ↑ 22% (284 last launch) |
| Cost Per Trial | $112 | $119 | 94.1% (over) | ↓ 8% ($129 last launch) |
| Trial-to-Paid Conv. (30-day) | 18% | 21.4% | 119% | ↑ 3.4pp |
| Pipeline Generated | $180,000 | $212,000 | 117.8% | ↑ 34% |
| Blended ROAS (30-day) | 4.0:1 | 4.6:1 | 115% | ↑ 0.8 |

**Channel-by-Channel Results**

| Channel | Spend | Impressions | Clicks | CTR | Trials | Conv. Rate | CPA | Pipeline | ROAS |
|---------|-------|-------------|--------|-----|--------|------------|-----|----------|------|
| Google Ads (Search) | $14,800 | 286,000 | 8,420 | 2.94% | 142 | 1.69% | $104 | $86,400 | 5.8:1 |
| LinkedIn Ads | $12,600 | 184,000 | 2,840 | 1.54% | 68 | 2.39% | $185 | $48,200 | 3.8:1 |
| Email (3-email sequence) | $1,200 | 18,400 (delivered) | 4,140 | 22.5% | 89 | 2.15% | $13 | $52,800 | 44.0:1 |
| Webinar (live + replay) | $6,400 | — | 1,820 (registrants) | — | 32 | 1.76% | $200 | $18,400 | 2.9:1 |
| Retargeting (Meta + Google) | $6,200 | 412,000 | 6,180 | 1.50% | 16 | 0.26% | $388 | $6,200 | 1.0:1 |
| **Total** | **$41,200** | **900,400** | **23,400** | **2.60%** | **347** | **1.48%** | **$119** | **$212,000** | **5.1:1** |

**Spend vs Return Analysis**

| Metric | Planned | Actual | Variance | Note |
|--------|---------|--------|----------|------|
| Total Ad Spend | $38,000 | $34,600 | -$3,400 | Pulled back LinkedIn spend mid-campaign due to high CPA |
| Creative Production | $4,000 | $4,200 | +$200 | Additional webinar slides and video editing |
| Landing Page Development | $3,000 | $2,400 | -$600 | Reused components from previous launch |
| Total Campaign Cost | $45,000 | $41,200 | -$3,800 | Under budget due to LinkedIn pullback |
| Revenue (30-day attributed) | $180,000 | $212,000 | +$32,000 | Higher trial-to-paid conversion than forecast (21.4% vs 18%) |
| ROAS (ad spend only) | 4.7:1 | 6.1:1 | +1.4 | Ad spend efficiency exceeded plan |
| ROAS (total campaign cost) | 4.0:1 | 5.1:1 | +1.1 | Total cost efficiency exceeded plan |
| ROI (all costs) | 300% | 415% | +115pp | (Revenue - Total Cost) / Total Cost |
| CPA (ad spend) | $95 | $100 | +$5 | Slightly above plan due to LinkedIn |
| CPA (total cost) | $112 | $119 | +$7 | LinkedIn CPA pulled the average up |

**Audience Performance**

| Audience Segment | Channel | Spend | Trials | CPA | Conv. Rate | ROAS | Insight |
|-----------------|---------|-------|--------|-----|------------|------|---------|
| [Branded Search] | Google | $3,200 | 52 | $62 | 4.12% | 9.4:1 | Lowest CPA, highest ROAS. These are users already aware of NovaPay — the campaign amplified existing demand. |
| [Non-Brand "payment checkout"] | Google | $11,600 | 90 | $129 | 1.22% | 4.6:1 | Strong performance for prospecting. High intent keywords convert well. |
| [ICP Lookalike — SaaS founders] | LinkedIn | $7,400 | 38 | $195 | 2.82% | 3.4:1 | Expensive but high-quality trials. 28% converted to paid (highest of any segment). |
| [Job Title — VP Engineering] | LinkedIn | $5,200 | 30 | $173 | 1.88% | 4.2:1 | Acceptable CPA for this audience. Technical decision-makers engage with feature-focused creative. |
| [Existing customers — cross-sell] | Email | $400 | 42 | $10 | 3.84% | 62.0:1 | Existing customers are the easiest trial sign-ups. Low cost, high conversion. Cross-sell is significantly under-invested. |
| [Newsletter subscribers — non-customers] | Email | $800 | 47 | $17 | 1.64% | 32.1:1 | Warm audience converts at 10x lower CPA than paid. Email list is the most efficient pipeline source. |
| [Site visitors — past 30 days] | Retargeting | $6,200 | 16 | $388 | 0.26% | 1.0:1 | Retargeting underperformed dramatically. The audience may have already seen the product and decided against it. Creative fatigue likely — same ads shown to the same pool for 3 weeks. |

**Creative Performance**

| Creative | Format | Channel | Impressions | CTR | Conv. Rate | CPA | Insight |
|----------|--------|---------|-------------|-----|------------|-----|---------|
| "Drop-in checkout in 10 minutes" — product demo video, 45s | Video | LinkedIn | 98,000 | 1.82% | 3.14% | $156 | Top LinkedIn performer. Showing the product being integrated live in under a minute resonated with technical audiences. |
| "Why SaaS companies lose 23% of revenue at checkout" — stat hook | Static image | LinkedIn | 86,000 | 1.24% | 1.62% | $218 | Stat-based creative generated attention but lower conversion. Users who clicked were more research-oriented, less action-oriented. |
| "NovaPay Checkout vs DIY — feature comparison" — search ad | Text | Google | 286,000 | 2.94% | 1.69% | $104 | Comparison framing works well for high-intent search. Users searching for checkout solutions want direct feature comparisons. |
| "See how Meridian SaaS cut cart abandonment by 34%" — case study | Email | Email | 18,400 | 24.2% | 2.48% | $11 | Highest-converting creative overall. Case studies with specific numbers outperform generic product announcements in email. |
| Customer testimonial — 3 rotating quotes | Carousel | Retargeting | 412,000 | 1.50% | 0.26% | $388 | Worst performer. Testimonial carousels showed creative fatigue by week 2 — CTR dropped from 2.1% to 0.8%. The retargeting pool is too small for a 3-week campaign without creative rotation. |

**Attribution Analysis**

| Attribution Model | Trials Attributed | Pipeline Attributed | Key Insight |
|-------------------|------------------|--------------------| ------------|
| Last-Click | 347 | $212,000 | Standard model. Over-credits Google Search (captures the final click) and email (users click the direct CTA). Under-credits LinkedIn and webinar (earlier touches). |
| First-Click | 347 | $212,000 | LinkedIn moves from 68 to 112 trials attributed. The platform introduced many users to NovaPay Checkout for the first time, but they converted via Google or email later. |
| Linear (Multi-Touch) | 347 | $212,000 | Google: 118 trials (vs 142 last-click). LinkedIn: 94 trials (vs 68 last-click). Email: 72 trials (vs 89 last-click). Webinar: 43 trials (vs 32 last-click). Retargeting: 20 trials (vs 16 last-click). Multi-touch shows LinkedIn and webinar contributed more than last-click suggests. |

**Key attribution insight:** Under linear attribution, LinkedIn's effective CPA drops from $185 to $134 and its ROAS improves from 3.8:1 to 5.2:1. LinkedIn is an awareness and consideration channel being evaluated on a direct-response metric. The last-click CPA overstates LinkedIn's inefficiency by approximately 28%.

**Learnings**

| # | Learning | Evidence | Implication |
|---|---------|----------|-------------|
| 1 | Email is the most efficient trial-generation channel by a factor of 8x over the next best channel. | Email CPA: $13. Google CPA: $104. LinkedIn CPA: $185. Email generated 89 trials at $1,200 total cost. | Grow the email list aggressively. Every new subscriber is worth far more as a campaign audience than a paid ad impression. Invest in list-building between campaigns. |
| 2 | Product demo videos outperform stat-based creatives on LinkedIn by 1.9x on CPA. | Demo video CPA: $156, 3.14% conv. rate. Stat creative CPA: $218, 1.62% conv. rate. | Prioritize demo videos for LinkedIn. Technical audiences want to see the product work, not read statistics about the problem. |
| 3 | Retargeting with static creative fatigues within 2 weeks in small audience pools. | Retargeting CTR dropped from 2.1% (Week 1) to 0.8% (Week 3). CPA rose from $180 to $620 over the same period. | Implement a creative rotation schedule — refresh retargeting ads every 7-10 days. Or limit retargeting campaigns to 2 weeks maximum with a frequency cap of 5 impressions per user. |
| 4 | Existing customer cross-sell is the highest-converting segment but received only 1% of campaign spend. | Cross-sell email CPA: $10, 3.84% conv. rate, 28% trial-to-paid. Received $400 of $41,200 total spend. | Allocate dedicated budget to customer cross-sell. A $5,000 investment in cross-sell creative and outreach could generate 200+ trials at under $25 CPA. |
| 5 | The campaign missed its trial target but exceeded its pipeline target. Trial-to-paid conversion was 3.4pp higher than forecast. | 347 trials (87% of target) but $212,000 pipeline (118% of target). The gap means higher-quality leads signed up, even though volume was lower. | For the next campaign, reconsider whether trial volume or pipeline value is the more meaningful primary KPI. Higher-quality leads with lower volume may generate more revenue. |

**Recommendations**

| # | Recommendation | Expected Impact | Priority |
|---|---------------|-----------------|----------|
| 1 | Increase email list-building investment between campaigns. Run a lead magnet campaign targeting the ICP to grow the subscriber list by 5,000 before the next launch. | Email generates trials at $13 CPA. 5,000 new subscribers at a 2% campaign conversion rate = 100 additional trials at ~$13 CPA for the next launch. | P1 |
| 2 | Shift 20% of LinkedIn budget to product demo video production. Produce 3 demo variations (different integration frameworks) instead of spending on broad stat-based awareness ads. | Demo videos convert at 1.9x the rate of stat creatives. Shifting $2,500 from ads to video production and focusing ad spend on the winning format could reduce LinkedIn CPA from $185 to ~$140. | P1 |
| 3 | Reduce retargeting campaign duration to 14 days max with creative rotation every 7 days. Set a frequency cap of 5 impressions per user. | Prevents the CPA escalation from $180 to $620 observed in Week 3. Expected savings of $2,000-$3,000 in wasted spend per campaign. | P1 |
| 4 | Launch a dedicated customer cross-sell campaign with $5,000 budget for the next product release. | At the observed $10 CPA and 28% trial-to-paid rate, this could generate 500 trials and 140 new paid customers. Estimated pipeline: $84,000. | P2 |
| 5 | Test pipeline value (instead of trial volume) as the primary campaign KPI for the next launch. Set a target of $250,000 pipeline with a secondary target of 400 trials. | Aligns the campaign optimization toward revenue outcomes rather than volume metrics. Prevents budget reallocation toward low-CPA-but-low-quality channels. | P2 |

**Next Steps**

1. **This week:** Update the campaign playbook with retargeting frequency caps and creative rotation cadence (Growth Lead).
2. **This week:** Brief the content team on 3 new product demo video scripts for the next LinkedIn campaign (Creative Lead).
3. **By end of month:** Launch a lead magnet campaign to grow the email list by 5,000 subscribers before the next product launch (Demand Gen).
4. **Sprint 1:** Build a customer cross-sell email sequence for NovaPay Checkout, targeting existing customers on other NovaPay products (Email Marketing Lead).
5. **Next campaign:** Use pipeline value as primary KPI, trial volume as secondary. Update the campaign brief template accordingly.

## Customization

Replace all bracket sections with your campaign's specifics. For awareness campaigns, replace conversion metrics with reach, frequency, brand lift, and share of voice. For B2C e-commerce campaigns, replace pipeline with revenue and add AOV, units sold, and return rate. For event-driven campaigns (webinars, conferences), add registration rate, attendance rate, and post-event conversion. For multi-market campaigns, add a geographic performance table. For influencer campaigns, add per-influencer performance with engagement rate, reach, and attributed conversions. For seasonal campaigns (Black Friday, back-to-school), always compare to the same period last year, not the previous month.
