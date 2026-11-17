---
name: ab-test-design
description: "A/B Test Design (Marketing) framework for marketing work. A/B test design is the process of structuring a controlled marketing experiment to measure the impact of a creative, messaging, or channel change. A marketer writes this before launching any test on landing pages, email subject lines, ad creative, CTAs, or pricing pages to ensure the experiment produces a clear, actionable decision. Use when asked for: A/B-тест, сплит-тест, дизайн эксперимента, гипотеза для теста."
---

# A/B Test Design (Marketing)

A/B test design is the process of structuring a controlled marketing experiment to measure the impact of a creative, messaging, or channel change. A marketer writes this before launching any test on landing pages, email subject lines, ad creative, CTAs, or pricing pages to ensure the experiment produces a clear, actionable decision.

## Before you start

- **Product context.** This framework needs to know the product: name, what it does, who it serves. Take it from the request, the project's CLAUDE.md or README, or earlier conversation. If it is missing and matters for the output, ask one short question instead of inventing facts.
- **Language.** The framework is written in English; write the deliverable in the language of the request (Russian request → Russian output), and adapt examples, platforms and conventions to that market.
- **No invented numbers.** Placeholders in `[brackets]` are to be filled with real data from the user. Where data is missing, leave a clearly marked placeholder rather than fabricating metrics, quotes or customer names.

## Structure

```markdown
# [Experiment Name] — A/B Test Design

**Date:** [YYYY-MM-DD]
**Owner:** [Marketer responsible]
**Status:** [Draft / In Review / Running / Complete / Killed]
**Channel:** [Where this test runs — landing page, email, paid social, etc.]

---

## Hypothesis

**Problem Statement:**
[What problem have you observed? Include data that demonstrates the problem exists. Cite specific metrics, user behavior data, or qualitative feedback.]

**Hypothesis:**
If we [specific change], then [primary metric] will [improve/increase/decrease] by [estimated magnitude] because [rationale grounded in evidence].

**Null Hypothesis:**
The change will have no statistically significant effect on [primary metric].

## Test Design

| Field | Value |
|-------|-------|
| **Test Type** | [A/B / A/B/C / Multivariate] |
| **Test Location** | [Specific page, email, ad set, etc.] |
| **Traffic Source** | [Where the traffic comes from — organic, paid, email, etc.] |
| **Test Duration** | [Planned number of days/weeks] |
| **Start Date** | [Planned date] |
| **End Date** | [Planned or projected date] |

## Variants

### Control (A)
**Description:** [Precisely describe the current experience — the exact headline, CTA, layout, or creative the user sees today.]

[Optional: screenshot or mockup link]

### Treatment (B)
**Description:** [Precisely describe the changed experience — what is different and only what is different.]

**What changed:** [Bullet list of every element that differs from Control]
- [Change 1]
- [Change 2]

[Optional: screenshot or mockup link]

## Audience & Traffic Allocation

| Parameter | Value |
|-----------|-------|
| **Eligible Audience** | [Who sees this test — all visitors, segment, etc.] |
| **Exclusions** | [Who is excluded and why] |
| **Traffic Split** | [50/50 or other ratio] |
| **Randomization Method** | [Cookie-based, user ID, etc.] |
| **Estimated Daily Traffic** | [Number of eligible visitors/recipients per day] |

## Metrics

### Primary Metric (Decision Metric)

| Metric | Definition | Current Baseline | Minimum Detectable Effect |
|--------|-----------|------------------|--------------------------|
| [Metric name] | [Exact definition — what counts as a conversion] | [Current value] | [Smallest improvement worth detecting — relative and absolute] |

### Secondary Metrics

| Metric | Definition | Baseline | Expected Direction |
|--------|-----------|----------|--------------------|
| [Metric 1] | [Definition] | [Value] | [Up / Down / Neutral] |
| [Metric 2] | [Definition] | [Value] | [Up / Down / Neutral] |

### Guardrail Metrics

| Metric | Definition | Baseline | Threshold for Concern |
|--------|-----------|----------|-----------------------|
| [Metric 1] | [Definition] | [Value] | [If this moves by X%, investigate] |
| [Metric 2] | [Definition] | [Value] | [Threshold] |

## Sample Size & Duration

| Parameter | Value |
|-----------|-------|
| **Significance Level** | [0.05 standard] |
| **Statistical Power** | [0.80 standard] |
| **Baseline Conversion Rate** | [Current rate] |
| **Minimum Detectable Effect** | [Relative or absolute] |
| **Required Sample per Variant** | [Calculated number] |
| **Daily Eligible Traffic** | [Number] |
| **Estimated Duration** | [Days = Required sample / Daily traffic per variant] |

## Decision Framework

| Outcome | Action |
|---------|--------|
| Primary metric is significant and positive, guardrails clean | Ship Treatment to 100% |
| Primary metric is significant and positive, guardrail triggered | Investigate guardrail. Ship only if degradation is acceptable and temporary. |
| Primary metric is not significant | Do not ship. Analyze secondary metrics and segments for learnings. |
| Primary metric is significant and negative | Kill the test. Document learnings. |

## Results (Complete After Test Ends)

| Metric | Control | Treatment | Difference | p-value | Confidence Interval | Significant? |
|--------|---------|-----------|------------|---------|---------------------|-------------|
| [Primary] | [value] | [value] | [+/- %] | [value] | [range] | [Yes/No] |
| [Secondary 1] | [value] | [value] | [+/- %] | [value] | [range] | [Yes/No] |
| [Secondary 2] | [value] | [value] | [+/- %] | [value] | [range] | [Yes/No] |

**Decision:** [Ship / Do Not Ship / Iterate]

**Learnings:** [What this test taught us — 2-3 sentences]

**Next Experiment:** [What hypothesis does this generate?]
```

## How to Write Each Section

**Hypothesis**
The hypothesis is the backbone. Start with the problem — prove it exists with data, not gut feeling. The hypothesis itself must be specific and falsifiable. You need: the specific change, the specific metric, the expected direction, an estimated magnitude, and the reasoning.

Good: "If we change the landing page headline from 'Project Management Made Simple' to 'Ship Projects 2x Faster,' then landing page conversion rate will increase by 15-25% because our top-performing ad copy (3.2% CTR) uses outcome-focused language while the current headline is feature-descriptive, and qualitative user testing (n=12) showed that 9 of 12 participants found the outcome framing more compelling."
Bad: "A better headline will get more conversions."

**Variants**
Describe Control and Treatment with enough precision that anyone on the team can implement them or verify they are correct. The Control is always the current experience — describe it in full, do not just say "current." For the Treatment, list every element that changes. If you change the headline AND the button color AND the image, you are testing a bundle of changes, not individual elements. Be clear about what you can and cannot learn.

Good: "Control: H1 headline reads 'Project Management Made Simple,' blue CTA button reads 'Start Free Trial,' hero image shows dashboard screenshot. Treatment: H1 headline reads 'Ship Projects 2x Faster,' all other elements identical."
Bad: "Control: current page. Treatment: new page with improvements."

**Metrics**
One primary metric that determines the ship/no-ship decision. For marketing tests, this is typically conversion rate (visitor-to-signup, click-to-purchase, open-to-click). Secondary metrics help you understand why the primary moved. Guardrail metrics protect against unintended consequences — for example, a headline change that increases signups but decreases trial-to-paid conversion because it attracts the wrong audience.

Good primary for a landing page test: "Visitor-to-trial-signup conversion rate (unique visitors who click 'Start Free Trial' and complete the signup form / unique visitors who view the page)."
Bad primary: "Engagement" — too vague to measure.

**Sample Size & Duration**
Use a sample size calculator. You need: baseline conversion rate, MDE (minimum detectable effect), significance level, and power. The MDE is the smallest improvement worth detecting — set it at the smallest lift that would justify implementing and maintaining the change. If your landing page gets 200 visitors/day, you cannot detect a 2% relative lift in any reasonable timeframe. Be realistic.

Good: "Baseline: 4.2% conversion rate. MDE: 20% relative (0.84pp). At 200 visitors/day, 50/50 split, the test needs 5,400 visitors per variant = 54 days. This is too long. Increasing MDE to 30% relative reduces the requirement to 2,400 per variant = 24 days."
Bad: "We'll run it for a week and check."

**Decision Framework**
Pre-commit to what you will do with every possible outcome. This prevents post-hoc rationalization. If the primary metric is flat, you do not ship — even if a secondary metric looks promising. If the primary is positive but a guardrail triggers, you investigate before shipping.

## Conventions

- One primary metric per test. No exceptions. If you cannot pick one, you do not understand what you are testing.
- Always calculate sample size before launching. "Run it and see" is not experimentation.
- Use 0.05 significance and 0.80 power as defaults unless you have a documented reason to deviate.
- Traffic split should be 50/50 for two-variant tests. Asymmetric splits require larger total samples.
- Document the test design before implementation. The doc is written before the test goes live, not after.
- Test one variable at a time unless you explicitly document that you are testing a bundle.
- Name tests with a consistent convention: YYYY-MM-[channel]-[element]-[description]. Example: 2026-04-LP-headline-outcome-framing.
- Include screenshots or mockups of both variants when possible.
- Record the results in the same document. The test design doc becomes the test results doc — one artifact per experiment.
- Archive completed tests in a shared location. Future marketers should reference past tests before designing new ones.

## Anti-Patterns

- Do NOT run a test without a written hypothesis. Testing without a hypothesis is random guessing with a dashboard.
- Do NOT peek at results before the test reaches the required sample size. Peeking inflates false positive rates. If you see "95% confidence" after 48 hours on a test designed for 3 weeks, it is a mirage.
- Do NOT test multiple variables simultaneously without acknowledging you are testing the bundle. If you change the headline, hero image, and CTA simultaneously, you will not know which change drove the result.
- Do NOT skip guardrail metrics. A landing page change that increases signups but tanks trial quality has not succeeded.
- Do NOT set the MDE at an unrealistically small level to look rigorous. Detecting a 2% relative lift on a 4% baseline requires 190,000 visitors per variant. Be practical.
- Do NOT run the test during major promotional periods, holidays, or marketing campaigns unless you are specifically testing within that context. Unusual traffic patterns contaminate results.
- Do NOT end a test early because it "looks like a winner." Statistical significance at day 3 of a 21-day test is unreliable.
- Do NOT declare a test inconclusive without checking segments. The aggregate may show no effect while mobile visitors show a strong positive and desktop shows a negative.
- Do NOT rerun the same test hoping for a different result. If the first test was well-designed and showed no effect, the answer is no effect.
- Do NOT test trivial changes (button color, font size) when there are larger strategic questions to answer. Test the things that might move the metric by 20%, not 2%.
- Do NOT forget to document the outcome. A test without recorded results and learnings is wasted effort.
- Do NOT use the results of one test to justify a change in a completely different context. A headline test on the landing page does not prove the same headline will work in email.
- Do NOT ignore novelty effects. New designs often get a short-term boost that fades. Consider extending the test or excluding the first 2-3 days from analysis.
- Do NOT test without sufficient traffic. If your page gets 50 visitors/day, you cannot run meaningful A/B tests on that page. Focus on driving traffic first.

## Examples

#### A/B Test Design: CloudKitchen Landing Page Headline

**Product Context:** CloudKitchen is a virtual kitchen management platform for restaurant operators. The main landing page converts at 3.8% (visitor-to-demo-request). The marketing team hypothesizes that changing the headline from feature-focused ("Virtual Kitchen Management Platform") to outcome-focused ("Launch a New Restaurant in 48 Hours") will increase demo requests.

---

```markdown
# 2026-04-LP-headline-outcome-framing — A/B Test Design

**Date:** 2026-04-01
**Owner:** David Park, Growth Marketing
**Status:** Draft
**Channel:** Landing page (cloudkitchen.com)

---

## Hypothesis

**Problem Statement:**
The landing page converts at 3.8% (visitor-to-demo-request), below the 5% target. Heatmap data (Feb-Mar 2026, n=4,200 sessions) shows that 44% of visitors scroll past the hero section without clicking anything. The current headline ("Virtual Kitchen Management Platform") describes the category but does not communicate a specific outcome. Customer interview data (n=18, Q1 2026) shows that the top motivation for prospects is speed-to-launch — 14 of 18 cited "getting a new concept live quickly" as their primary reason for evaluating virtual kitchen platforms.

**Hypothesis:**
If we change the landing page headline from "Virtual Kitchen Management Platform" to "Launch a New Restaurant in 48 Hours," then visitor-to-demo-request conversion rate will increase by 20-35% (0.76-1.33pp) because customer interviews consistently cite speed-to-launch as the primary motivation, and our best-performing Google ad (4.1% CTR) uses "launch in 48 hours" language while our worst performer (1.2% CTR) uses category-descriptive language.

**Null Hypothesis:**
The headline change will have no statistically significant effect on demo request conversion rate.

## Test Design

| Field | Value |
|-------|-------|
| **Test Type** | A/B |
| **Test Location** | cloudkitchen.com homepage — hero section headline only |
| **Traffic Source** | All sources (organic search 42%, paid search 28%, direct 18%, social 12%) |
| **Test Duration** | 21 days (planned) |
| **Start Date** | April 7, 2026 |
| **End Date** | April 28, 2026 (projected) |

## Variants

### Control (A)
**Description:** Current homepage hero section. H1 headline: "Virtual Kitchen Management Platform." Subhead: "Everything you need to launch and manage virtual restaurant brands from your existing kitchen." CTA button: "Request a Demo" (blue, #2563EB). Hero image: Dashboard screenshot showing order management view.

### Treatment (B)
**Description:** Identical to Control except for the H1 headline. H1 headline changed to: "Launch a New Restaurant in 48 Hours." All other elements (subhead, CTA, hero image, layout) remain identical.

**What changed:**
- H1 headline text only: "Virtual Kitchen Management Platform" changed to "Launch a New Restaurant in 48 Hours"

## Audience & Traffic Allocation

| Parameter | Value |
|-----------|-------|
| **Eligible Audience** | All visitors to cloudkitchen.com homepage. No geographic or device restrictions. |
| **Exclusions** | Internal IPs (office and VPN). Existing customers (identified by login cookie). Bot traffic (filtered by GA4). |
| **Traffic Split** | 50% Control / 50% Treatment |
| **Randomization Method** | Cookie-based via Google Optimize. Consistent per visitor across sessions. |
| **Estimated Daily Traffic** | ~340 eligible unique visitors/day (average from Feb-Mar 2026, excluding bots and internal) |

## Metrics

### Primary Metric

| Metric | Definition | Baseline | MDE |
|--------|-----------|----------|-----|
| Demo request conversion rate | Unique visitors who submit the demo request form / Unique visitors who view the homepage. One conversion per visitor per 30-day window. | 3.8% | 20% relative (0.76pp — detecting a move from 3.8% to 4.56%) |

### Secondary Metrics

| Metric | Definition | Baseline | Expected Direction |
|--------|-----------|----------|--------------------|
| Hero section CTA click rate | Visitors who click "Request a Demo" in hero / Homepage visitors | 8.2% | Up |
| Scroll depth (below fold) | Visitors who scroll past the hero section / Homepage visitors | 56% | Neutral or down (if hero converts more, fewer need to scroll) |
| Time on page | Median seconds on homepage | 42s | Neutral |
| Bounce rate | Single-page sessions / All sessions | 52% | Down |

### Guardrail Metrics

| Metric | Definition | Baseline | Threshold |
|--------|-----------|----------|-----------|
| Demo-to-qualified rate | Demos that sales marks as "qualified" / Total demos requested | 62% | If drops below 50%, the headline may attract unqualified prospects who expect something different from what the product delivers |
| Demo show rate | Prospects who attend the scheduled demo / Demos requested | 71% | If drops below 60%, investigate whether the headline sets expectations that the demo does not meet |

## Sample Size & Duration

| Parameter | Value |
|-----------|-------|
| **Significance Level** | 0.05 (two-tailed) |
| **Power** | 0.80 |
| **Baseline Rate** | 3.8% |
| **MDE** | 20% relative (0.76pp — from 3.8% to 4.56%) |
| **Required Sample per Variant** | 3,400 visitors |
| **Daily Eligible Traffic** | ~340 visitors/day |
| **Traffic per Variant per Day** | ~170 visitors/day |
| **Estimated Duration** | 20 days (3,400 / 170) — rounding up to 21 days to include full weeks |

## Decision Framework

| Outcome | Action |
|---------|--------|
| Conversion rate is significantly higher in Treatment, guardrails clean | Ship "Launch a New Restaurant in 48 Hours" to 100%. Begin testing subheadline and CTA variations in a follow-up experiment. |
| Conversion rate is significant and positive, but demo-to-qualified rate drops below 50% | Do not ship. The headline attracts interest but sets wrong expectations. Test a modified version that preserves the outcome framing but qualifies the audience (e.g., "Launch a New Restaurant Brand from Your Existing Kitchen in 48 Hours"). |
| No significant difference | Do not ship. Analyze by traffic source — paid search visitors may respond differently than organic. If a segment shows a strong effect, design a segment-specific follow-up test. |
| Conversion rate is significant and negative | Kill test. Document that outcome-focused headlines may not resonate with this audience. Investigate whether the "48 hours" claim creates skepticism rather than motivation. |

## Results (Complete After Test Ends)

| Metric | Control | Treatment | Difference | p-value | CI (95%) | Significant? |
|--------|---------|-----------|------------|---------|----------|-------------|
| Demo request CVR | 3.8% | 4.9% | +28.9% | 0.018 | [0.3pp, 1.9pp] | Yes |
| Hero CTA click rate | 8.2% | 11.4% | +39.0% | 0.003 | [1.1pp, 5.3pp] | Yes |
| Bounce rate | 52% | 47% | -9.6% | 0.041 | [-9.8pp, -0.2pp] | Yes |
| Demo-to-qualified rate | 62% | 58% | -6.5% | 0.34 | [-12pp, 4pp] | No |
| Demo show rate | 71% | 69% | -2.8% | 0.62 | [-8pp, 5pp] | No |

**Decision:** Ship. Primary metric (demo request CVR) increased 28.9% with statistical significance. Both guardrail metrics showed small, non-significant decreases that are within acceptable range. The net effect is meaningfully more qualified demos.

**Learnings:** Outcome-focused headlines significantly outperform category-descriptive headlines for this audience. The "48 hours" specificity likely drove credibility — it is a concrete, verifiable claim rather than a vague promise. The improvement was consistent across traffic sources (paid search +31%, organic +26%, direct +24%), suggesting the effect is robust rather than segment-specific.

**Next Experiment:** Test subheadline variations. The current subhead is feature-descriptive ("Everything you need to launch and manage virtual restaurant brands"). Hypothesis: changing it to outcome-focused language aligned with the new headline will compound the conversion improvement. Planned test: 2026-05-LP-subhead-outcome-framing.
```

## Customization

Replace all bracket sections with your actual marketing context. Adjust the metrics to match your conversion funnel — SaaS landing pages measure demo requests or trial signups, e-commerce measures add-to-cart or purchase, content marketing measures email signups or content downloads. The guardrail metrics should reflect the downstream quality indicators that matter for your business. The structure stays the same regardless of channel — adapt the specifics for email subject line tests, ad creative tests, or pricing page tests.

For email A/B tests, the primary metric is typically open rate (for subject lines) or click-through rate (for body content). For ad creative tests, the primary metric is typically CTR or conversion rate. For pricing tests, always include revenue per visitor as a guardrail — a lower price may increase conversion but decrease revenue.
