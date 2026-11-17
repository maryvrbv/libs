# [Product Name]

[Brief description of the product/project.]

---

## Skill: Marketing Metrics

Marketing metrics definition is the process of selecting, defining, and organizing the KPIs that measure marketing performance across acquisition, engagement, and revenue. A marketer does this when building a marketing dashboard, aligning the team around goals, or establishing a measurement framework for a new quarter or campaign cycle.

### Structure

#### Metrics Overview

| # | Metric Name | Category | Definition | Formula | Data Source | Owner | Baseline | Target | Cadence |
|---|-------------|----------|------------|---------|-------------|-------|----------|--------|---------|
| 1 | [Name] | [Acquisition/Engagement/Revenue/Retention] | [Plain-English definition] | [Exact calculation] | [Where the data lives] | [Team or person] | [Current value] | [Goal + timeframe] | [How often reviewed] |
| 2 | ... | ... | ... | ... | ... | ... | ... | ... | ... |

#### Metric Tree

```
North Star Metric: [Top-level marketing outcome — e.g., Marketing-Sourced Revenue]
├── Acquisition Metrics
│   ├── Customer Acquisition Cost (CAC)
│   ├── Cost Per Lead (CPL)
│   └── Traffic Volume by Channel
├── Conversion Metrics
│   ├── Lead-to-MQL Conversion Rate
│   ├── MQL-to-SQL Conversion Rate
│   └── SQL-to-Customer Conversion Rate
├── Revenue Metrics
│   ├── Monthly Recurring Revenue (MRR)
│   ├── Lifetime Value (LTV)
│   └── Return on Ad Spend (ROAS)
├── Retention Metrics
│   ├── Churn Rate
│   ├── Net Revenue Retention (NRR)
│   └── Net Promoter Score (NPS)
└── Counter-Metrics
    ├── [Metric that could degrade if you optimize too hard on acquisition]
    └── [Metric that could degrade if you optimize too hard on conversion]
```

#### Detailed Metric Definitions

For each metric:

**[Metric Name]**
- **Definition:** [One sentence. No ambiguity.]
- **Category:** [Acquisition / Engagement / Revenue / Retention]
- **Formula:** `[Exact numerator] / [Exact denominator]` or `SUM([values]) WHERE [conditions]`
- **Inclusions:** [What counts]
- **Exclusions:** [What does NOT count — internal traffic, test accounts, partner deals]
- **Data Source:** [Specific platform, table, or tool]
- **Granularity:** [Per channel, per campaign, per customer, per month]
- **Baseline:** [Current value as of DATE]
- **Target:** [Value by DATE]
- **Benchmark:** [Industry average or competitive reference]
- **Owner:** [Name or team]
- **Review Cadence:** [Daily / Weekly / Monthly / Quarterly]
- **Alert Threshold:** [When to flag — e.g., CAC exceeds $X or LTV/CAC drops below 3:1]

#### Leading vs Lagging Classification

| Metric | Classification | Rationale |
|--------|---------------|-----------|
| [Metric A] | Leading | [Why this predicts future outcomes] |
| [Metric B] | Lagging | [Why this reflects past outcomes] |

#### Counter-Metrics

| Primary Metric | Counter-Metric | Why It Matters |
|----------------|----------------|----------------|
| [Metric you are optimizing] | [Metric that could degrade] | [The tradeoff you are watching for] |

#### Review Cadence Summary

| Metric | Review Forum | Cadence | Alert Threshold |
|--------|-------------|---------|-----------------|
| [Metric] | [Meeting or dashboard] | [Frequency] | [When to escalate] |

#### Data Source Map

| Metric | Primary Source | Secondary Source | Integration Method |
|--------|---------------|-----------------|-------------------|
| [Metric] | [Platform — e.g., Google Analytics, HubSpot] | [Backup or validation source] | [API, manual export, webhook] |

### How to Write Each Section

**Metrics Overview Table**
This is the executive summary. Every metric gets one row. A CMO reading only this table should understand what marketing is tracking and what success looks like. Order metrics by category (acquisition, conversion, revenue, retention) so the table tells a story from top-of-funnel to bottom-of-funnel.

Good: "Customer Acquisition Cost (CAC): Total marketing and sales spend in the period divided by the number of new customers acquired in the same period. Formula: (Marketing Spend + Sales Spend) / New Customers. Baseline: $142. Target: $120 by Q3 2026."
Bad: "CAC — how much it costs to get a customer."

**Metric Tree**
Start with the single number the marketing team would pick if they could only track one thing. For most marketing teams, this is marketing-sourced revenue, marketing-sourced pipeline, or qualified leads. Then decompose it: what inputs drive that number? Each branch of the tree should represent a different dimension of the marketing engine — acquisition, conversion, revenue, retention. Include counter-metrics at the bottom to prevent gaming.

Good: "North Star: Marketing-Sourced ARR → Input: Qualified Pipeline → Sub-Input: MQL Volume × MQL-to-SQL Rate"
Bad: A flat list of 20 metrics with no hierarchy or relationship.

**Detailed Metric Definitions**
This is where precision eliminates arguments. Two marketers reading the same definition should calculate the exact same number. The most common source of conflict in marketing teams is imprecise metric definitions. "Lead" means something different to every person in the room unless you specify exactly what qualifies.

Specify inclusions and exclusions explicitly. CAC that includes only paid media spend tells a very different story from CAC that includes salaries, tools, and agency fees. Neither is wrong — but both are wrong if the definition is not stated.

Good: "CAC (Blended): Total marketing spend (paid media + content production + marketing salaries + tool subscriptions + agency fees) plus total sales spend (sales salaries + commission + sales tools) in the calendar month, divided by the count of new customers whose first payment was processed in that month. Excludes customers acquired through partner referral agreements (tracked separately as Partner CAC). Excludes reactivated churned customers (tracked as Win-Back CAC)."
Bad: "CAC = spend / customers."

**LTV and LTV/CAC Ratio**
LTV is the most commonly miscalculated metric in marketing. The formula depends on your business model. For subscription businesses: `LTV = ARPU × Gross Margin % × (1 / Monthly Churn Rate)`. For e-commerce: `LTV = Average Order Value × Purchase Frequency × Average Customer Lifespan`. Always specify the time horizon — a 12-month LTV and a lifetime LTV are very different numbers. When calculating LTV/CAC, use the same customer definition in both.

Good: "LTV (12-month): Average revenue per customer in the first 12 months after acquisition, multiplied by gross margin. Based on the cohort of customers acquired in Q1 2025. LTV = $2,840 × 72% margin = $2,045. LTV/CAC = $2,045 / $142 = 14.4:1."
Bad: "LTV is how much a customer is worth."

**ROAS and ROI**
ROAS measures the revenue generated per dollar of ad spend. ROI measures the profit generated relative to the total investment. These are not the same thing. ROAS = Revenue / Ad Spend. ROI = (Revenue - Total Cost) / Total Cost. A ROAS of 5:1 does not mean a 5x return on investment if your ad spend is only 30% of your total cost. Always specify which you are calculating and what costs are included.

Good: "ROAS (Google Ads): Revenue directly attributed to Google Ads (last-click attribution, 30-day window) divided by Google Ads spend. February ROAS: $48,200 revenue / $9,400 spend = 5.1:1. Note: This uses last-click attribution and does not account for assisted conversions."
Bad: "Our ROI is 5x."

**Churn Rate**
Specify the denominator and time period. Monthly churn rate = customers lost during the month / customers at the start of the month. Logo churn (customer count) and revenue churn (dollar value) tell different stories. A company can have low logo churn but high revenue churn if large accounts are leaving. Always report both.

Good: "Monthly Logo Churn: Customers who canceled or did not renew in the calendar month / Customers active at the start of the month. February: 34 / 1,240 = 2.7%. Monthly Revenue Churn: MRR lost from churned and downgraded accounts / MRR at the start of the month. February: $12,400 / $186,000 = 6.7%. The gap between logo churn and revenue churn indicates larger accounts are churning disproportionately."
Bad: "Our churn is 3%."

**NPS**
Net Promoter Score = % Promoters (9-10) minus % Detractors (0-6). Always report the sample size, response rate, and survey timing. An NPS of 40 from 20 responses is not actionable. An NPS of 40 from 2,000 responses at 30-day post-purchase is a useful signal. Segment NPS by acquisition channel, plan tier, and tenure to find patterns.

Good: "NPS: 38 (Q4 2025 survey). 1,840 responses out of 4,200 sent (43.8% response rate). Survey sent 30 days after first purchase. Promoters: 52%, Passives: 34%, Detractors: 14%. Segmented: Enterprise NPS = 52, SMB NPS = 31, Self-serve NPS = 28."
Bad: "Our NPS is good — around 40."

**Baselines and Targets**
Every target needs three components: a baseline (where you are), a target (where you are going), and a deadline (by when). The baseline must be measured over a stable period — at least 4 weeks, ideally 8-12 weeks. Avoid baselines from periods with anomalies (holiday spikes, outages, major campaigns).

Justify the target magnitude. "Reduce CAC by 15%" is meaningless without explaining why 15% is achievable. Ground targets in: (1) historical improvement rates, (2) specific initiatives planned, or (3) business requirements.

Good: "Baseline: $142 CAC (average of Jan-Feb 2026, 8-week period, excludes holiday week). Target: $120 by Q3 2026. Justification: The planned SEO investment is expected to shift 15% of lead volume from paid to organic by Q3, and the landing page optimization program targets a 20% improvement in paid conversion rate."
Bad: "We want CAC under $100."

### Conventions

- Use plain English for definitions. A new team member should understand every metric without asking follow-up questions.
- Formulas must be unambiguous. Specify numerator, denominator, time window, and any filters.
- Every metric needs a baseline measured over at least 4 weeks of stable data. If no baseline exists, the first action item is to establish one.
- Targets must include both a value and a timeframe. "Improve ROAS" is not a target.
- Limit the core marketing metrics set to 8-12 metrics. More than that and the dashboard becomes noise.
- Always pair acquisition metrics with quality metrics. High lead volume with low conversion is a vanity metric.
- Specify whether CAC is blended (all channels) or channel-specific. Report both.
- LTV must specify the time horizon (12-month, 24-month, or projected lifetime) and whether it is gross or net of costs.
- Format large numbers with commas ($12,400 not $12400). Percentages to one decimal place (34.2% not 34.218%).
- Every metric must have a single owner — one person who answers when the number moves in the wrong direction.
- Use consistent time windows across related metrics. Do not mix monthly CAC with quarterly LTV without justification.
- The audience is the marketing team, leadership, and finance. Write for people who allocate budget based on these numbers.

### Anti-Patterns

- Do NOT define metrics without specifying the exact formula. "Engagement" is not a metric. "Email click-through rate (unique clicks / delivered emails)" is.
- Do NOT calculate CAC using only paid media spend. Blended CAC must include all costs: salaries, tools, agencies, content production. Channel CAC uses only that channel's costs. Always label which you are using.
- Do NOT report LTV without specifying the time horizon. A "lifetime" LTV based on 6 months of customer data is a projection, not a measurement. Label it accordingly.
- Do NOT use LTV/CAC ratio without checking that both numbers use the same customer definition and time period.
- Do NOT track more than 12 core KPIs. If everything is a priority, nothing is.
- Do NOT include vanity metrics (total impressions, total page views) without pairing them with quality metrics (CPM, bounce rate, conversion rate).
- Do NOT mix different attribution models across metrics without noting it. ROAS using last-click and conversion rate using first-touch will produce conflicting stories.
- Do NOT set alert thresholds as round numbers without justification. "Alert when CAC exceeds $150" should be grounded in the LTV/CAC ratio breaking below an acceptable level, not because $150 is a nice number.
- Do NOT use NPS as a standalone metric. Always report sample size, response rate, and segmentation.
- Do NOT report MRR growth without separating new, expansion, contraction, and churned MRR. The total hides the dynamics.
- Do NOT define churn rate without specifying logo churn vs revenue churn. They diverge significantly in most businesses.
- Do NOT copy metric definitions from another company without adapting them. "DAU/MAU ratio" matters for a consumer app but is meaningless for a B2B SaaS marketing team.
- Do NOT assign every metric to the same owner. If one person owns 12 KPIs, none of them are truly owned.
- Do NOT define review cadence as "as needed." Specify daily, weekly, monthly, or quarterly.
- Do NOT calculate ROAS and call it ROI. They are different metrics with different formulas and different implications.

### Examples

#### Marketing Metrics: Stackline (B2B SaaS — Developer Analytics Platform)

**Product Context:** Stackline is a developer analytics platform helping engineering teams track code quality, deployment frequency, and incident response times. The company is 2 years post-launch with 680 paying accounts, $1.2M ARR, and a 12-person marketing team. The CMO wants a unified metrics framework for Q2 2026 planning.

---

**Metrics Overview**

| # | Metric Name | Category | Definition | Formula | Data Source | Owner | Baseline | Target | Cadence |
|---|-------------|----------|------------|---------|-------------|-------|----------|--------|---------|
| 1 | Marketing-Sourced Pipeline | Revenue | Total dollar value of qualified opportunities created from marketing-sourced leads | `SUM(opportunity_value) WHERE source = 'marketing' AND stage >= 'SQL'` | HubSpot CRM | VP Marketing | $340K/mo | $500K/mo by Q3 2026 | Weekly |
| 2 | Blended CAC | Acquisition | Total marketing + sales cost divided by new customers | `(Marketing Spend + Sales Spend) / New Customers` | Finance + CRM | Growth Lead | $1,420 | $1,100 by Q3 2026 | Monthly |
| 3 | LTV (12-month) | Revenue | Average revenue per customer in first 12 months × gross margin | `ARPU_12mo × Gross Margin %` | Billing + Finance | RevOps | $8,640 | $10,200 by Q4 2026 | Quarterly |
| 4 | LTV/CAC Ratio | Efficiency | 12-month LTV divided by blended CAC | `LTV_12mo / Blended_CAC` | Derived | VP Marketing | 6.1:1 | 9.3:1 by Q4 2026 | Quarterly |
| 5 | MQL Volume | Acquisition | Marketing Qualified Leads per month | `COUNT(leads) WHERE lifecycle_stage = 'MQL'` | HubSpot | Demand Gen | 420/mo | 600/mo by Q3 2026 | Weekly |
| 6 | MQL-to-SQL Rate | Conversion | Percentage of MQLs accepted by sales as SQLs | `SQLs created / MQLs created in same cohort` | HubSpot CRM | Demand Gen | 32% | 40% by Q3 2026 | Weekly |
| 7 | SQL-to-Customer Rate | Conversion | Percentage of SQLs that become paying customers | `New Customers / SQLs in same cohort` | CRM | Sales Ops | 22% | 28% by Q3 2026 | Monthly |
| 8 | Monthly Churn Rate (Logo) | Retention | Percentage of customers who cancel in the month | `Churned Customers / Customers at Start of Month` | Billing | CS Lead | 2.8% | 2.0% by Q4 2026 | Monthly |
| 9 | Monthly Churn Rate (Revenue) | Retention | MRR lost from churned and downgraded accounts | `Lost MRR / MRR at Start of Month` | Billing | CS Lead | 3.4% | 2.2% by Q4 2026 | Monthly |
| 10 | ROAS (Paid Channels) | Efficiency | Revenue attributed to paid ads / ad spend | `Attributed Revenue / Ad Spend` | Google Ads + LinkedIn + CRM | Paid Media Lead | 4.2:1 | 5.5:1 by Q3 2026 | Weekly |
| 11 | NPS | Retention | Net Promoter Score from post-onboarding survey | `% Promoters - % Detractors` | Typeform + CRM | CS Lead | 34 | 45 by Q4 2026 | Quarterly |

**Metric Tree**

```
North Star: Marketing-Sourced Pipeline ($340K/mo → $500K/mo)
├── Lead Generation
│   ├── MQL Volume (420/mo → 600/mo)
│   │   ├── Organic Traffic (blog, SEO, community)
│   │   ├── Paid Traffic (Google Ads, LinkedIn Ads)
│   │   └── Referral Traffic (partner programs, word of mouth)
│   └── Cost Per MQL ($78 → $65)
├── Lead Conversion
│   ├── MQL-to-SQL Rate (32% → 40%)
│   │   ├── Lead Scoring Accuracy
│   │   └── Sales Follow-Up Speed (median hours to first contact)
│   └── SQL-to-Customer Rate (22% → 28%)
│       ├── Demo-to-Trial Rate
│       └── Trial-to-Paid Rate
├── Revenue Per Customer
│   ├── Average Contract Value ($860/mo → $980/mo)
│   └── Expansion Rate (seat additions in first 90 days)
├── Customer Retention
│   ├── Monthly Logo Churn (2.8% → 2.0%)
│   ├── Monthly Revenue Churn (3.4% → 2.2%)
│   └── NPS (34 → 45)
└── Counter-Metrics
    ├── Lead Quality Score (counter to MQL volume — watch for volume surge with quality drop)
    └── Sales Cycle Length (counter to conversion rate — watch for rushed deals that churn)
```

**Detailed Definition: Customer Acquisition Cost (Blended CAC)**

- **Definition:** Total marketing and sales spend in the calendar month divided by the number of new customers whose first payment was processed in that month.
- **Category:** Acquisition
- **Formula:** `(Total Marketing Spend + Total Sales Spend) / New Customers Acquired`
- **Marketing Spend Includes:** Paid media (Google Ads, LinkedIn Ads, sponsorships), content production (writers, designers, video), marketing salaries and benefits, marketing tools (HubSpot, SEMrush, Webflow), agency fees, event costs.
- **Sales Spend Includes:** Sales salaries and benefits, sales commissions, sales tools (Gong, Outreach, CRM seats), travel and entertainment.
- **Exclusions:** Customers acquired through the partner referral program (tracked as Partner CAC separately). Reactivated churned customers (tracked as Win-Back CAC). Internal test accounts.
- **Data Source:** Finance team monthly spend report + HubSpot CRM for customer count.
- **Granularity:** Monthly, blended across all channels. Also calculated per-channel (Paid CAC, Organic CAC, Referral CAC) for channel-level decisions.
- **Baseline:** $1,420 (average of November 2025 – February 2026, 4-month period).
- **Target:** $1,100 by Q3 2026 (22.5% reduction).
- **Benchmark:** B2B SaaS developer tools median CAC is $1,000-$1,800 (OpenView 2025 benchmark report). Stackline is mid-range.
- **Owner:** Growth Lead (Marcus Chen).
- **Review Cadence:** Monthly in the marketing review. Quarterly in the board deck.
- **Alert Threshold:** CAC exceeding $1,700 in any single month (LTV/CAC drops below 5:1 at that level).

**Detailed Definition: Lifetime Value (12-Month LTV)**

- **Definition:** Average revenue generated per customer in the first 12 months after their acquisition date, multiplied by gross margin.
- **Category:** Revenue
- **Formula:** `Average(SUM(payments) WHERE payment_date BETWEEN acquisition_date AND acquisition_date + 365 days) × Gross Margin %`
- **Inclusions:** All recurring subscription payments, seat expansion revenue, and plan upgrade revenue within the 12-month window. Customers acquired at least 12 months ago (cohorts with complete data).
- **Exclusions:** One-time implementation fees (tracked separately). Professional services revenue. Customers who churned and reactivated within the window (counted as a single customer journey).
- **Data Source:** Stripe billing data, joined with CRM for acquisition date.
- **Granularity:** Per customer, aggregated by quarterly acquisition cohort.
- **Baseline:** $8,640 (based on customers acquired in Q1 2025, the most recent cohort with full 12-month data). Gross margin: 78%. ARPU 12-month: $11,077.
- **Target:** $10,200 by Q4 2026. Justification: Planned seat-based pricing tier (launching Q2) is expected to increase ARPU by 12-15% for new customers.
- **Benchmark:** B2B SaaS developer tools median 12-month LTV is $6,000-$14,000 (varies widely by ACV). Stackline is mid-range.
- **Owner:** RevOps (Dana Okafor).
- **Review Cadence:** Quarterly, when the newest complete 12-month cohort becomes available.
- **Alert Threshold:** LTV dropping below $7,500 (LTV/CAC ratio breaks below 5:1 at current CAC).

**Detailed Definition: Monthly Recurring Revenue (MRR) Components**

- **Definition:** The total predictable revenue normalized to a monthly amount, broken into four components.
- **Category:** Revenue
- **Components:**
  - **New MRR:** MRR from customers acquired this month. Formula: `SUM(first_month_MRR) WHERE acquisition_month = current_month`
  - **Expansion MRR:** MRR increase from existing customers (upgrades, seat additions). Formula: `SUM(MRR_increase) WHERE customer_tenure > 1 month`
  - **Contraction MRR:** MRR decrease from existing customers (downgrades, seat removals). Formula: `SUM(MRR_decrease) WHERE customer_status = 'active'`
  - **Churned MRR:** MRR lost from customers who canceled. Formula: `SUM(last_month_MRR) WHERE customer_status changed to 'churned'`
  - **Net New MRR:** `New MRR + Expansion MRR - Contraction MRR - Churned MRR`
- **Data Source:** Stripe billing dashboard + internal MRR tracking spreadsheet.
- **Baseline:** Total MRR: $100,000 (as of March 1, 2026). New: $8,200/mo. Expansion: $4,100/mo. Contraction: $1,800/mo. Churned: $3,400/mo. Net New: $7,100/mo.
- **Owner:** Finance (Jordan Park), with input from Marketing (New MRR) and CS (Churn and Contraction).
- **Review Cadence:** Monthly in the revenue review. Weekly tracking of New MRR as a leading indicator.

**Counter-Metrics**

| Primary Metric | Counter-Metric | Why It Matters |
|----------------|----------------|----------------|
| MQL Volume | MQL-to-SQL Conversion Rate | Increasing MQL volume by loosening lead scoring criteria will inflate the number but waste sales time on unqualified leads. If MQL volume rises and MQL-to-SQL rate drops proportionally, net pipeline is unchanged. |
| Blended CAC | Sales Cycle Length | Reducing CAC by cutting sales support or shortening trials may speed up acquisition but produce poorly-fit customers who churn faster. Watch for CAC improvements that correlate with churn increases. |
| ROAS | Brand Search Cannibalization | High ROAS on branded search campaigns may be capturing demand that would have converted organically. Check incrementality by running holdout tests on brand campaigns. |
| SQL-to-Customer Rate | Average Contract Value | Improving close rates by offering heavy discounts inflates conversion but reduces revenue per customer. Watch for conversion improvements that correlate with ACV drops. |
| NPS | Response Rate | NPS can improve simply because unhappy customers stop responding to surveys. Always track response rate alongside NPS. A rising NPS with a falling response rate is a false signal. |

**Leading vs Lagging Classification**

| Metric | Classification | Rationale |
|--------|---------------|-----------|
| MQL Volume | Leading | Changes in MQL volume predict pipeline and revenue changes 2-4 months later (based on the average sales cycle). |
| MQL-to-SQL Rate | Leading | A drop in qualification rate today means fewer opportunities next month. Early signal of lead quality issues. |
| ROAS | Leading | Weekly ROAS changes predict monthly CAC shifts. A declining ROAS signals rising acquisition costs before they hit the P&L. |
| Marketing-Sourced Pipeline | Leading/Lagging | Lagging indicator of lead generation quality. Leading indicator of revenue (pipeline precedes closed-won by 1-3 months). |
| Blended CAC | Lagging | CAC is calculated after the month closes. It confirms efficiency but cannot predict it. Leading indicators: CPL, ROAS, conversion rates. |
| LTV (12-month) | Lagging | Requires 12 months of customer data. The ultimate measure of customer quality, but far too slow for real-time decisions. |
| Monthly Churn Rate | Lagging | Churn confirms that customers left. Leading indicators: NPS decline, support ticket volume increase, usage drop-off. |
| NPS | Leading | NPS predicts churn 3-6 months in advance. Detractors churn at 3x the rate of promoters in Stackline's historical data. |

**Review Cadence Summary**

| Metric | Review Forum | Cadence | Alert Threshold |
|--------|-------------|---------|-----------------|
| MQL Volume | Demand gen standup | Weekly (Mon) | Drop below 80/week (320/mo) for 2 consecutive weeks |
| MQL-to-SQL Rate | Demand gen standup | Weekly (Mon) | Drop below 25% for 2 consecutive weeks |
| ROAS | Paid media review | Weekly (Wed) | Drop below 3.5:1 on any channel |
| Marketing-Sourced Pipeline | Marketing leadership | Weekly (Fri) | Below 75% of monthly target pace at mid-month |
| Blended CAC | Marketing review | Monthly (1st week) | Exceeds $1,700 in any single month |
| SQL-to-Customer Rate | Revenue review | Monthly (2nd week) | Drop below 18% |
| MRR (Net New) | Revenue review | Monthly (2nd week) | Net New MRR negative in any month |
| Logo Churn | CS + Marketing review | Monthly (2nd week) | Exceeds 3.5% in any month |
| Revenue Churn | CS + Marketing review | Monthly (2nd week) | Exceeds 4.5% in any month |
| LTV (12-month) | Board prep | Quarterly | Drops below $7,500 |
| NPS | CS review | Quarterly | Drops below 25 |

**Data Source Map**

| Metric | Primary Source | Secondary Source | Integration |
|--------|---------------|-----------------|-------------|
| MQL Volume | HubSpot (lifecycle stage changes) | Google Analytics (form submissions) | HubSpot API → dashboard |
| CAC | Finance spend report + HubSpot customer count | Google Ads, LinkedIn Ads (channel-level spend) | Manual monthly reconciliation |
| LTV | Stripe (payment data) | HubSpot (acquisition date, channel) | Stripe API + CRM join |
| ROAS | Google Ads, LinkedIn Ads (spend) + CRM (attributed revenue) | Google Analytics (assisted conversions) | CRM attribution + ad platform API |
| MRR | Stripe | ChartMogul (MRR decomposition) | Stripe webhook → ChartMogul |
| Churn | Stripe (cancellation events) | HubSpot (deal status) | Stripe webhook → internal tracking |
| NPS | Typeform (survey responses) | HubSpot (customer metadata for segmentation) | Typeform API → HubSpot |

**Next Steps**

1. Build the consolidated marketing dashboard in Looker with all 11 metrics and the alert thresholds defined above (Data Analyst, by April 14).
2. Automate the MRR decomposition report — currently a manual spreadsheet updated monthly (RevOps, by April 21).
3. Run a CAC audit by channel to identify the 2-3 channels with the highest and lowest efficiency (Growth Lead, by April 7).
4. Establish the first quarterly NPS survey baseline with segmented results (CS Lead, Q2 survey by May 15).
5. Present this metrics framework to the full marketing team for alignment and feedback (VP Marketing, next all-hands).

**Marketing Metrics Checklist**

Before finalizing any marketing metrics framework, verify each metric passes these checks:

- [ ] The metric has a single, unambiguous name and formula
- [ ] Inclusions and exclusions are stated explicitly
- [ ] A baseline exists and was measured over at least 4 weeks of stable data
- [ ] The target includes both a value and a timeframe
- [ ] A single owner is assigned (not "marketing team" — a specific person)
- [ ] A review cadence is specified with a concrete meeting or forum
- [ ] The metric has at least one counter-metric paired with it
- [ ] The data source exists and is accessible today (or a dependency is logged)
- [ ] An alert threshold is defined for when the metric moves outside acceptable range
- [ ] The metric appears in the metric tree in the correct position
- [ ] The metric can be influenced by the team that owns it
- [ ] Leading/lagging classification is stated with rationale

If any metric fails one of these checks, it is not ready for the dashboard. Address the gap before adding it.

### Customization

Replace all bracket sections with your product's specifics. For e-commerce businesses, replace MQL/SQL with Add-to-Cart and Purchase metrics, and adjust LTV to use Average Order Value × Purchase Frequency × Customer Lifespan. For marketplace businesses, create separate metric trees for supply-side and demand-side acquisition. For consumer subscription businesses, replace pipeline metrics with trial-to-paid conversion and adjust churn definitions to account for monthly vs annual billing cycles. For early-stage companies without enough data for LTV calculations, use 3-month or 6-month payback period as a proxy until 12 months of cohort data are available. For PLG (product-led growth) businesses, add product-qualified lead (PQL) metrics alongside or instead of MQLs.
