# [Product Name]

[Brief description of the product/project.]

---

## Skill: Cohort Analysis

Marketing cohort analysis is the process of grouping customers by their acquisition channel, campaign, or time period and tracking how their behavior — retention, spending, engagement — changes over time. A marketer does this to understand which channels acquire the highest-value customers, identify when and why customers disengage, compare the long-term ROI of different acquisition strategies, and make evidence-based budget reallocation decisions.

### Structure

#### Cohort Definition

| Parameter | Value |
|-----------|-------|
| **Cohort Type** | [Acquisition-based / Campaign-based / Time-based / Behavioral] |
| **Cohort Grouping** | [What defines each cohort — e.g., acquisition channel, campaign, sign-up month] |
| **Time Granularity** | [Weekly / Monthly / Quarterly] |
| **Retention Event** | [The specific action that counts as "retained" — purchase, login, engagement action] |
| **Revenue Event** | [What counts as revenue — purchase, subscription renewal, upsell] |
| **Analysis Window** | [How far out you are tracking — e.g., 6 months, 12 months] |
| **Date Range** | [Start and end dates for cohorts included] |
| **Minimum Cohort Size** | [Minimum customers per cohort for inclusion] |

#### Retention by Acquisition Channel

| Channel | Cohort Size | Month 0 | Month 1 | Month 2 | Month 3 | Month 4 | Month 5 | Month 6 |
|---------|------------|---------|---------|---------|---------|---------|---------|---------|
| [Channel A] | [n] | 100% | [%] | [%] | [%] | [%] | [%] | [%] |
| [Channel B] | [n] | 100% | [%] | [%] | [%] | [%] | [%] | [%] |
| [Channel C] | [n] | 100% | [%] | [%] | [%] | [%] | [%] | [%] |
| [Channel D] | [n] | 100% | [%] | [%] | [%] | [%] | [%] | [%] |
| All Channels | [n] | 100% | [%] | [%] | [%] | [%] | [%] | [%] |

#### Retention Curves (Visual Comparison)

```
100% |●  ●  ●  ●
     |
 80% |   ▲
     |      ▲
 60% |●        ▲
     |   ■        ▲  ▲  ▲
 40% |      ●  ■
     |         ■  ●  ■  ■
 20% |               ●  ●
     |
  0% |________________________________
      M0  M1  M2  M3  M4  M5  M6

● = Channel A    ▲ = Channel B    ■ = Channel C
```

#### LTV by Cohort

| Channel | Customers | Month 1 LTV | Month 3 LTV | Month 6 LTV | Month 12 LTV | Projected Lifetime LTV | CAC | LTV/CAC (6-mo) | LTV/CAC (12-mo) |
|---------|-----------|-------------|-------------|-------------|-------------|----------------------|-----|-----------------|-----------------|
| [Channel A] | [n] | [$] | [$] | [$] | [$] | [$] | [$] | [X:1] | [X:1] |
| [Channel B] | [n] | [$] | [$] | [$] | [$] | [$] | [$] | [X:1] | [X:1] |
| [Channel C] | [n] | [$] | [$] | [$] | [$] | [$] | [$] | [X:1] | [X:1] |
| [Channel D] | [n] | [$] | [$] | [$] | [$] | [$] | [$] | [X:1] | [X:1] |

#### Engagement Patterns by Cohort

| Channel | Avg Sessions (M1) | Avg Sessions (M3) | Avg Sessions (M6) | Avg Orders (6-mo) | Avg AOV | Engagement Score |
|---------|-------------------|-------------------|-------------------|-------------------|---------|-----------------|
| [Channel A] | [Count] | [Count] | [Count] | [Count] | [$] | [H/M/L] |
| [Channel B] | [Count] | [Count] | [Count] | [Count] | [$] | [H/M/L] |

#### Seasonal and Temporal Analysis

| Acquisition Month | Cohort Size | M1 Retention | M3 Retention | M6 Retention | 6-Mo LTV | Key Factor |
|-------------------|------------|-------------|-------------|-------------|----------|------------|
| [Jan 2026] | [n] | [%] | [%] | [%] | [$] | [Seasonal note] |
| [Feb 2026] | [n] | [%] | [%] | [%] | [$] | [Note] |
| [Mar 2026] | [n] | [%] | [%] | [%] | [$] | [Note] |

#### Channel Comparison Summary

| Channel | CAC | 6-Mo LTV | LTV/CAC | M3 Retention | M6 Retention | Verdict |
|---------|-----|----------|---------|-------------|-------------|---------|
| [Channel A] | [$] | [$] | [X:1] | [%] | [%] | [Scale / Maintain / Reduce / Test] |
| [Channel B] | [$] | [$] | [X:1] | [%] | [%] | [Verdict] |
| [Channel C] | [$] | [$] | [X:1] | [%] | [%] | [Verdict] |
| [Channel D] | [$] | [$] | [X:1] | [%] | [%] | [Verdict] |

#### Budget Reallocation Recommendations

| Channel | Current Monthly Spend | Current % of Budget | Recommended Spend | Recommended % | Change | Rationale |
|---------|----------------------|--------------------|--------------------|---------------|--------|-----------|
| [Channel A] | [$] | [%] | [$] | [%] | [+/- $ and %] | [Why — grounded in cohort data] |
| [Channel B] | [$] | [%] | [$] | [%] | [+/- $ and %] | [Why] |
| [Channel C] | [$] | [%] | [$] | [%] | [+/- $ and %] | [Why] |
| [Channel D] | [$] | [%] | [$] | [%] | [+/- $ and %] | [Why] |
| **Total** | **[$]** | **100%** | **[$]** | **100%** | — | |

#### Findings and Recommendations

| # | Finding | Evidence | Recommendation | Priority |
|---|---------|----------|----------------|----------|
| 1 | [What the data shows] | [Specific numbers from the analysis] | [What to do about it] | [P1/P2/P3] |

### How to Write Each Section

**Cohort Definition**
Define exactly what makes a cohort and what counts as retention. For marketing cohort analysis, the most useful grouping is usually acquisition channel — this directly informs budget allocation. But you may also group by campaign, offer type, or acquisition month to isolate specific variables. The retention event must reflect genuine engagement with your product, not just a login or app open.

Good: "Cohort grouping: Acquisition channel (as determined by first-touch UTM attribution). Retention event: Customer made at least one purchase in the calendar month. Revenue event: Total spend including subscription and add-on purchases. Analysis window: 12 months from first purchase. Minimum cohort size: 200 customers."
Bad: "We grouped customers by channel and tracked retention."

**Retention by Acquisition Channel**
This is the core table. Each row is a channel. Each column is a time period after acquisition. Read across a row to see one channel's retention curve. Read down a column to compare channels at the same maturity point. The differences between channels at Month 3 and Month 6 are where the actionable insights live.

Do not fill in zeros for cohorts that have not reached a time period yet. If a cohort was acquired 4 months ago, it only has data through Month 4 — leave subsequent columns empty or mark them as pending.

Good: "Google Ads: 2,400 customers. M0: 100%. M1: 42%. M3: 28%. M6: 22%. Instagram: 1,800 customers. M0: 100%. M1: 38%. M3: 18%. M6: 10%. Google Ads retains at 2.2x Instagram's rate by Month 6."
Bad: Showing only the overall retention rate without channel breakdowns.

**LTV by Cohort**
Retention tells you who stays. LTV tells you what they are worth. Calculate cumulative revenue per customer at each time milestone. The LTV/CAC ratio at 6 months and 12 months reveals which channels are actually profitable — a channel with low CAC but low LTV may be worse than a channel with high CAC and high LTV.

Always show both CAC and LTV together. A channel's LTV in isolation is not actionable — it must be compared to the cost of acquiring those customers.

Good: "Google Ads: CAC $68, 6-month LTV $142, LTV/CAC 2.1:1. Referral: CAC $24, 6-month LTV $186, LTV/CAC 7.8:1. Referral customers are worth 1.3x more and cost 2.8x less — this channel is dramatically under-invested."
Bad: "LTV varies by channel."

**Engagement Patterns**
Engagement metrics explain why retention differs between cohorts. Customers acquired through content marketing may visit more frequently, read more articles, and develop deeper product knowledge — leading to higher retention. Customers acquired through a discount promotion may have lower engagement from the start because they were motivated by price, not product fit.

Track: session frequency, purchase frequency, average order value, and product breadth (how many categories or features used). These engagement indicators predict which cohorts will retain long-term.

Good: "Email cohort: 4.2 sessions/month in M1, 3.8 sessions/month in M3 (9.5% decay). Paid social cohort: 2.1 sessions/month in M1, 1.2 sessions/month in M3 (42.9% decay). The paid social cohort disengages 4.5x faster, explaining the 15pp retention gap at M6."
Bad: "Email customers are more engaged."

**Seasonal and Temporal Analysis**
Acquisition month matters. Customers acquired during a holiday sale may have different retention than customers acquired in a quiet month. Customers acquired during a product launch may retain differently than those acquired through always-on campaigns. Separate these effects from channel effects by comparing the same channel across different time periods.

Good: "November cohort (Black Friday): M3 retention 18%. February cohort (no promotion): M3 retention 32%. Black Friday customers retain at 56% the rate of non-promotional customers, confirming that discount-driven acquisition produces lower-quality customers."
Bad: "November was a big month for sign-ups."

**Budget Reallocation Recommendations**
This is where the analysis becomes a decision. Based on the LTV/CAC ratios and retention curves by channel, recommend specific budget changes. Every recommendation must be grounded in the cohort data — not gut feelings. Include the current spend, recommended spend, and the rationale.

Be conservative with reallocation recommendations. Do not recommend cutting a channel's budget by 50% based on one quarter of data. Recommend 15-25% shifts and monitor for one more period before making larger moves.

Good: "Shift $8,000/month from Instagram (LTV/CAC 1.4:1, M6 retention 10%) to Referral Program (LTV/CAC 7.8:1, M6 retention 34%). This represents a 20% reduction in Instagram spend and a 40% increase in referral program investment. Expected impact: 120 fewer Instagram customers, 80 more referral customers, net revenue increase of $14,000/quarter based on 6-month LTV."
Bad: "Spend more on what works."

### Conventions

- Always define the retention event precisely. "Active customer" means nothing until you define the qualifying action.
- Show both retention rates and LTV by cohort. Retention without LTV misses the revenue picture. LTV without retention misses the engagement picture.
- Include CAC alongside LTV for every channel. LTV in isolation is not actionable.
- Use the same retention event definition across all cohorts. Changing the definition between channels invalidates the comparison.
- Minimum cohort size of 200 for monthly cohorts, 50 for weekly. Smaller cohorts produce noisy curves.
- Always show absolute cohort sizes alongside percentages. A channel with 85% retention and 12 customers is not statistically meaningful.
- Calculate LTV at multiple time milestones (1-month, 3-month, 6-month, 12-month). Short-term LTV and long-term LTV tell different stories.
- Include seasonal analysis when cohorts span different seasons. Holiday cohorts behave differently from non-promotional cohorts.
- Budget reallocation recommendations should be incremental (15-25% shifts), not dramatic, unless the data is overwhelming.
- Format: commas for thousands, one decimal for percentages, dollar signs for currency, X:1 for ratios.
- The audience is marketing leadership and finance — people who allocate budget across channels.
- Always include trend data when multiple periods are available. A channel whose LTV/CAC is improving deserves different treatment than one whose ratio is declining.

### Anti-Patterns

- Do NOT evaluate channel performance using CAC alone. A channel with $20 CAC and 5% Month 6 retention is worse than a channel with $80 CAC and 30% Month 6 retention. LTV/CAC is the metric that matters.
- Do NOT compare cohorts of vastly different sizes. A cohort of 5,000 customers and a cohort of 30 customers are not comparable — the small cohort will have extreme variance.
- Do NOT use the wrong time granularity. Monthly cohorts work for subscription and e-commerce products with monthly purchase cycles. Weekly cohorts work for products with daily or weekly usage. Quarterly cohorts work for high-ACV B2B with long sales cycles.
- Do NOT ignore the difference between discount-acquired and full-price-acquired customers. Promotional cohorts consistently show lower retention and LTV. Mixing them with organic cohorts inflates the problem channels and deflates the healthy ones.
- Do NOT look only at the first-month retention and extrapolate. Month 1 and Month 6 retention curves can cross — a channel that looks weak at Month 1 may stabilize and outperform at Month 6.
- Do NOT assume all channels can scale linearly. Doubling the budget on a high-performing channel may push it into diminishing returns. Cohort analysis should be paired with marginal ROAS analysis for scaling decisions.
- Do NOT forget to account for attribution model differences. A customer attributed to "email" under last-touch may have been acquired through Google Ads (first touch). Use consistent attribution across all cohorts.
- Do NOT mix organic and paid acquisition cohorts without labeling them. Organic customers typically have higher retention because they self-selected — comparing them directly to paid customers is misleading without acknowledging the self-selection bias.
- Do NOT ignore reactivated customers. A customer who churns in Month 2 and returns in Month 5 should not be counted as "retained through Month 5." Define whether you are measuring continuous retention or return-at-any-point retention.
- Do NOT present cohort analysis without budget recommendations. The analysis exists to inform allocation decisions. A retention table with no "so what" is wasted work.
- Do NOT use projected LTV as if it were measured LTV. If your oldest cohort is 6 months old, your 12-month LTV is a projection — label it as such and state the assumptions.
- Do NOT aggregate all campaigns within a channel into one cohort. A Google Ads brand campaign and a Google Ads non-brand campaign acquire very different customers. Segment within channels when the data supports it.
- Do NOT reallocate budget based on a single quarter of cohort data. Confirm trends over 2-3 periods before making large shifts.
- Do NOT ignore the quality of the revenue, not just the quantity. A channel that generates high LTV but also high support cost may have lower net LTV than the raw numbers suggest.

### Examples

#### Cohort Analysis: Driftwood (Subscription E-Commerce — Specialty Coffee)

**Product Context:** Driftwood is a subscription coffee brand that ships freshly roasted specialty coffee monthly. Customers choose a plan (1-bag, 2-bag, or 3-bag per month) starting at $18/month. Average subscription value is $28/month. The company acquires customers through Google Ads, Instagram Ads, influencer partnerships, email marketing, and referral program. Total active subscribers: 8,400. Monthly acquisition: ~1,200 new subscribers. The marketing team wants to understand which channels acquire the highest-value subscribers and where to reallocate the $62,000 monthly marketing budget.

---

**Cohort Definition**

| Parameter | Value |
|-----------|-------|
| **Cohort Type** | Acquisition channel (first-touch attribution) |
| **Cohort Grouping** | Acquisition channel — Google Ads, Instagram, Influencer, Email, Referral |
| **Time Granularity** | Monthly |
| **Retention Event** | Customer's subscription was active (not paused or canceled) and at least one shipment was processed in the calendar month |
| **Revenue Event** | Total charges processed including subscription, add-on products (equipment, single-origin extras), and gift subscriptions |
| **Analysis Window** | 12 months from first subscription |
| **Date Range** | Customers acquired April 2025 – March 2026 (12 monthly cohorts, oldest cohort has full 12-month data) |
| **Minimum Cohort Size** | 100 customers per channel per quarter |

**Retention by Acquisition Channel (Averaged Across Quarterly Cohorts)**

| Channel | Cohort Size | M0 | M1 | M2 | M3 | M4 | M5 | M6 | M9 | M12 |
|---------|------------|-----|-----|-----|-----|-----|-----|-----|-----|------|
| Google Ads | 3,840 | 100% | 68% | 54% | 44% | 38% | 34% | 31% | 26% | 22% |
| Instagram | 2,880 | 100% | 62% | 46% | 35% | 28% | 24% | 20% | 14% | 10% |
| Influencer | 1,680 | 100% | 72% | 60% | 52% | 46% | 42% | 38% | 32% | 28% |
| Email (newsletter → trial) | 2,640 | 100% | 78% | 68% | 62% | 58% | 54% | 50% | 44% | 40% |
| Referral | 2,160 | 100% | 82% | 74% | 68% | 64% | 60% | 56% | 50% | 46% |
| All Channels | 13,200 | 100% | 70% | 58% | 48% | 42% | 38% | 34% | 29% | 24% |

**Retention Curves (Visual)**

```
100% |●  ▲  ■  ◆  ★
     |
 80% |         ◆  ★
     |      ▲  ■     ★
 60% |●  ■           ◆  ★
     |   ▲     ◆        ◆  ★
 40% |      ●  ■  ▲        ◆  ★     ★
     |         ●     ■  ▲     ◆  ◆
 20% |            ▲  ●     ●  ▲
     |               ▲     ▲  ●  ●
  0% |________________________________________________
      M0  M1  M2  M3  M4  M5  M6  M9  M12

● = Google Ads    ▲ = Instagram    ■ = Influencer    ◆ = Email    ★ = Referral
```

**Key retention insights:**
- Referral customers have the best retention at every time point — 46% at Month 12 vs 10% for Instagram. Referral customers arrive with social proof and a personal recommendation, which creates stronger initial commitment.
- Email-acquired customers are the second-best retaining cohort (40% at M12). These customers self-selected by subscribing to the newsletter first, building familiarity and trust before converting.
- Instagram has the steepest decline — from 62% at M1 to 10% at M12 (84% of the cohort churns within a year). Instagram-acquired customers are likely attracted by visual content and promotions rather than genuine product interest.
- The steepest drop for every channel is M0→M1 (the first renewal). Customers who survive the first renewal are significantly more likely to stay long-term.

**LTV by Cohort**

| Channel | Customers | M1 LTV | M3 LTV | M6 LTV | M12 LTV | Projected 24-Mo LTV | CAC | LTV/CAC (6-mo) | LTV/CAC (12-mo) | Payback Month |
|---------|-----------|--------|--------|--------|---------|---------------------|-----|-----------------|-----------------|---------------|
| Google Ads | 3,840 | $28 | $74 | $138 | $224 | $296 | $42 | 3.3:1 | 5.3:1 | Month 2 |
| Instagram | 2,880 | $26 | $62 | $104 | $148 | $178 | $38 | 2.7:1 | 3.9:1 | Month 2 |
| Influencer | 1,680 | $30 | $84 | $162 | $274 | $372 | $56 | 2.9:1 | 4.9:1 | Month 2 |
| Email | 2,640 | $32 | $92 | $184 | $326 | $452 | $18 | 10.2:1 | 18.1:1 | Month 1 |
| Referral | 2,160 | $34 | $98 | $196 | $358 | $498 | $22 | 8.9:1 | 16.3:1 | Month 1 |
| All Channels | 13,200 | $29 | $78 | $148 | $248 | $332 | $36 | 4.1:1 | 6.9:1 | Month 2 |

**Key LTV insights:**
- Referral has the highest 12-month LTV ($358) AND the second-lowest CAC ($22), creating an exceptional 16.3:1 LTV/CAC ratio.
- Email is even more efficient on LTV/CAC (18.1:1) because its CAC ($18) is the lowest of all channels while its LTV ($326) is the second-highest.
- Instagram has the lowest 12-month LTV ($148) — 2.4x lower than referral customers. Combined with its moderate CAC ($38), Instagram has the weakest LTV/CAC ratio (3.9:1). It is not unprofitable, but it is the least efficient channel.
- Influencer has the highest CAC ($56) but also high LTV ($274). Its LTV/CAC (4.9:1) is respectable — the higher cost acquires higher-quality customers who stay longer and spend more (higher AOV due to influencer recommendations for premium plans).

**Engagement Patterns by Cohort**

| Channel | Avg Sessions/Mo (M1) | Avg Sessions/Mo (M6) | Session Decay | Avg Monthly Spend | Add-On Rate | Plan Tier |
|---------|---------------------|---------------------|---------------|-------------------|-------------|-----------|
| Google Ads | 2.8 | 2.1 | -25% | $28 | 12% | 68% 1-bag, 24% 2-bag, 8% 3-bag |
| Instagram | 2.2 | 1.4 | -36% | $24 | 6% | 78% 1-bag, 18% 2-bag, 4% 3-bag |
| Influencer | 3.4 | 2.8 | -18% | $32 | 18% | 52% 1-bag, 34% 2-bag, 14% 3-bag |
| Email | 4.1 | 3.6 | -12% | $34 | 22% | 48% 1-bag, 36% 2-bag, 16% 3-bag |
| Referral | 4.4 | 3.8 | -14% | $36 | 26% | 44% 1-bag, 38% 2-bag, 18% 3-bag |

**Key engagement insights:**
- Instagram customers have the lowest engagement across every metric: fewest sessions, fastest session decay, lowest spend, lowest add-on rate, and highest concentration on the cheapest plan tier.
- Referral and email customers have the highest engagement: most sessions, slowest decay, highest spend and add-on rates, and the most premium plan distribution.
- The add-on rate (purchasing equipment, extra bags, gift subscriptions) is a strong predictor of retention. Channels with >20% add-on rates (Email, Referral) retain at 2x+ the rate of channels with <10% add-on rates (Instagram).
- The plan tier distribution tells the story: Instagram acquires 78% 1-bag (cheapest plan) customers. Referral acquires 56% multi-bag customers. Higher-value plans correlate directly with higher retention.

**Seasonal Analysis**

| Acquisition Quarter | Cohort Size | M3 Retention | M6 Retention | 6-Mo LTV | Key Factor |
|--------------------|------------|-------------|-------------|----------|------------|
| Q2 2025 (Apr-Jun) | 3,200 | 46% | 32% | $142 | Baseline — no major campaigns |
| Q3 2025 (Jul-Sep) | 3,400 | 50% | 36% | $156 | Summer cold brew campaign drove higher engagement |
| Q4 2025 (Oct-Dec) | 3,800 | 42% | 28% | $128 | Holiday gift subscriptions — 30% were gifts (lower self-retention) |
| Q1 2026 (Jan-Mar) | 2,800 | 52% | 38% | $164 | Post-holiday — higher-intent customers, New Year's resolution effect |

**Key seasonal insight:** Q4 cohorts have the lowest retention (28% at M6) despite the highest volume. Approximately 30% of Q4 acquisitions are gift subscriptions — the recipient did not choose to subscribe and retains at roughly half the rate of self-subscribers. For future Q4 planning: separate gift subscription customers into their own cohort and apply a different retention strategy (gift-to-self-subscriber conversion flow after the gift period ends).

**Channel Comparison Summary**

| Channel | CAC | 6-Mo LTV | 12-Mo LTV | LTV/CAC (12-mo) | M6 Retention | M12 Retention | Verdict |
|---------|-----|----------|-----------|-----------------|-------------|---------------|---------|
| Google Ads | $42 | $138 | $224 | 5.3:1 | 31% | 22% | **Maintain** — solid efficiency, moderate retention. Room for optimization but not a problem channel. |
| Instagram | $38 | $104 | $148 | 3.9:1 | 20% | 10% | **Reduce** — lowest LTV, lowest retention, lowest engagement. Profitable but significantly less efficient than other channels. |
| Influencer | $56 | $162 | $274 | 4.9:1 | 38% | 28% | **Test & Scale** — high CAC but high LTV and strong retention. Explore whether increased investment maintains the LTV/CAC ratio. |
| Email | $18 | $184 | $326 | 18.1:1 | 50% | 40% | **Scale aggressively** — best LTV/CAC by far. Grow the newsletter list as fast as possible. |
| Referral | $22 | $196 | $358 | 16.3:1 | 56% | 46% | **Scale aggressively** — highest LTV, second-best LTV/CAC. Invest in referral incentives and program expansion. |

**Budget Reallocation Recommendations**

| Channel | Current Spend | Current % | Recommended Spend | Recommended % | Change | Rationale |
|---------|--------------|-----------|-------------------|---------------|--------|-----------|
| Google Ads | $22,000 | 35.5% | $20,000 | 32.3% | -$2,000 (-9%) | Maintain investment with slight reduction. Reallocate savings to higher-LTV channels. Google remains the largest volume channel. |
| Instagram | $16,000 | 25.8% | $10,000 | 16.1% | -$6,000 (-37.5%) | Significant reduction justified by lowest LTV/CAC (3.9:1), lowest retention (10% at M12), and lowest engagement metrics across the board. |
| Influencer | $8,000 | 12.9% | $10,000 | 16.1% | +$2,000 (+25%) | Moderate increase. High LTV and retention but highest CAC. Test whether increased spend maintains quality or hits diminishing returns. Cap increase at 25% and re-evaluate after one quarter. |
| Email (list building) | $6,000 | 9.7% | $12,000 | 19.4% | +$6,000 (+100%) | Double investment in newsletter list growth. This is the highest-LTV/CAC channel (18.1:1). Every dollar spent growing the email list has the highest expected return. Invest in: lead magnets, co-registration partnerships, content upgrades. |
| Referral Program | $10,000 | 16.1% | $10,000 | 16.1% | $0 (0%) | Maintain current investment. The referral program is already efficient (16.3:1 LTV/CAC). Increasing the referral incentive may attract lower-quality referrals. Instead, invest in making the referral process frictionless (better sharing tools, in-app prompts). |
| **Total** | **$62,000** | **100%** | **$62,000** | **100%** | **$0 net** | Budget-neutral reallocation. Shift from lowest-performing (Instagram) to highest-performing (Email list building) with moderate increase to Influencer for testing. |

**Expected Impact of Reallocation**

| Metric | Current (Projected Q2) | After Reallocation (Projected Q2) | Change |
|--------|----------------------|----------------------------------|--------|
| New Subscribers (monthly) | 1,200 | 1,140 | -60 (-5%) |
| Avg 6-Month LTV (blended) | $148 | $162 | +$14 (+9.5%) |
| Avg 12-Month LTV (blended) | $248 | $278 | +$30 (+12.1%) |
| Blended LTV/CAC (12-mo) | 6.9:1 | 8.2:1 | +1.3 (+18.8%) |
| Revenue per Marketing Dollar (12-mo) | $4.80 | $5.68 | +$0.88 (+18.3%) |

The reallocation trades 5% of new subscriber volume for a 12.1% increase in 12-month LTV and an 18.3% increase in revenue per marketing dollar. Fewer customers acquired, but each customer is worth significantly more.

**Findings and Recommendations**

| # | Finding | Evidence | Recommendation | Priority |
|---|---------|----------|----------------|----------|
| 1 | Email and referral acquire customers with 3-4x higher LTV than Instagram at 40-50% lower CAC. | Email LTV/CAC: 18.1:1. Referral: 16.3:1. Instagram: 3.9:1. The gap is consistent across every metric: retention, engagement, AOV, and plan tier. | Shift $6,000/month from Instagram to email list growth. This is the single highest-ROI budget change available. | P1 |
| 2 | The first renewal (M0→M1) is the steepest drop for every channel. M1 retention ranges from 62% (Instagram) to 82% (Referral). | M0→M1 churn accounts for 30-38% of all churn across channels. Customers who survive M1 retain at 2-3x higher rates through M12. | Launch a first-renewal retention campaign: welcome email series, "your first bag is shipping" excitement builder, early feedback request, and a "second month surprise" (small sample or upgrade). Target: improve M1 retention by 5pp across all channels. | P1 |
| 3 | Instagram customers are concentrated on the cheapest plan (78% on 1-bag) and have the lowest add-on rate (6%). They are the least engaged and least profitable cohort. | Instagram M6 retention: 20%. 12-mo LTV: $148. Add-on rate: 6%. Session decay: -36% from M1 to M6. | Beyond reducing spend, test whether Instagram creative changes can attract higher-intent customers. Replace lifestyle imagery with product-focused creative (the coffee itself, brewing process) and test a 2-bag starter offer instead of 1-bag. | P2 |
| 4 | Q4 (holiday) cohorts retain at 12pp lower than Q1 cohorts at Month 6 due to gift subscriptions. | Q4 M6 retention: 28%. Q1 M6 retention: 38%. 30% of Q4 acquisitions are gift subscriptions where the recipient did not choose to subscribe. | Build a gift-to-self-subscriber conversion flow. Before the gift period ends (typically 3 months), send the recipient an offer to continue at a discounted rate. Target: convert 20% of gift recipients to self-subscribers. | P2 |
| 5 | Influencer-acquired customers have the highest CAC ($56) but also the third-highest LTV and retention. The LTV/CAC ratio (4.9:1) justifies the premium. | Influencer M6 retention: 38%. 12-mo LTV: $274. LTV/CAC: 4.9:1. Add-on rate: 18%. Plan tier: 48% multi-bag. | Increase influencer budget by 25% ($2,000/month) and test scaling with 2-3 additional influencer partners. Monitor whether the LTV/CAC ratio holds at higher spend. If it drops below 4:1, pull back. | P2 |

**Next Steps**

1. **This week:** Begin the Instagram-to-email budget shift for April campaigns. Allocate the freed-up $6,000 to email list-building initiatives (lead magnet campaign, co-registration partnerships).
2. **This week:** Brief the retention team on the first-renewal campaign concept. Target launch by April 15.
3. **Sprint 1:** Redesign Instagram creative to test product-focused imagery and 2-bag starter offers. Run for one month and compare M1 retention and plan tier distribution to the historical Instagram cohort.
4. **Sprint 1:** Design the gift-to-self-subscriber conversion flow for Q4 2025 gift recipients (whose 3-month gift periods are ending in Q1 2026).
5. **Sprint 2:** Identify and onboard 2-3 new influencer partners for the increased influencer budget.
6. **Quarterly:** Re-run this cohort analysis at the end of Q2 2026 to validate the reallocation impact. Compare the Q2 blended LTV/CAC to the current 6.9:1 baseline.

**Cohort Analysis Checklist**

Before finalizing any marketing cohort analysis, verify it passes these checks:

- [ ] Cohort grouping and retention event are precisely defined
- [ ] Retention is measured by acquisition channel (not just time-based)
- [ ] LTV is calculated at multiple time milestones (M1, M3, M6, M12)
- [ ] CAC is shown alongside LTV for every channel to calculate LTV/CAC
- [ ] Cohort sizes are shown alongside percentages
- [ ] All cohorts meet the minimum sample size threshold
- [ ] Engagement metrics (sessions, AOV, add-on rate) are included to explain retention differences
- [ ] Seasonal effects are identified and separated from channel effects
- [ ] Budget reallocation recommendations are specific, incremental, and grounded in the data
- [ ] Expected impact of the reallocation is projected
- [ ] Findings are connected to specific, actionable recommendations
- [ ] The analysis distinguishes between measured LTV and projected LTV

If the analysis is missing any of these elements, it is incomplete. Address the gaps before using the findings to inform budget decisions.

### Customization

Replace all bracket sections with your product's specifics. For B2B SaaS, replace subscription retention with contract renewal and track expansion revenue (upsells, seat additions) as a separate LTV component. For marketplace businesses, create separate cohort analyses for supply-side and demand-side acquisition — the channels that acquire buyers are different from those that acquire sellers. For mobile apps, use weekly cohorts with daily retention events (app opens + core action) and track install-to-registration, registration-to-activation, and activation-to-retention as separate funnels by channel. For high-ACV B2B ($50K+), quarterly cohorts with 24-month analysis windows are more appropriate — the sales cycle is too long for monthly cohort analysis to be meaningful. For e-commerce without subscriptions, use purchase-based retention (repeat purchase within X days) rather than subscription-based retention.
