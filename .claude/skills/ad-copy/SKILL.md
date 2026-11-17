---
name: ad-copy
description: "Ad Copy framework for marketing work. Paid advertising copy for Meta (Facebook/Instagram), Google Ads, and LinkedIn Ads — including headlines, descriptions, CTAs, audience targeting notes, and A/B test variants. The marketer uses this when planning and writing paid campaigns that need to drive clicks, conversions, or brand awareness within strict character limits and platform constraints. Use when asked for: рекламные тексты, объявления, таргет, контекстная реклама, креативы для Meta/Google/LinkedIn/VK."
---

# Ad Copy

Paid advertising copy for Meta (Facebook/Instagram), Google Ads, and LinkedIn Ads — including headlines, descriptions, CTAs, audience targeting notes, and A/B test variants. The marketer uses this when planning and writing paid campaigns that need to drive clicks, conversions, or brand awareness within strict character limits and platform constraints.

## Before you start

- **Product context.** This framework needs to know the product: name, what it does, who it serves. Take it from the request, the project's CLAUDE.md or README, or earlier conversation. If it is missing and matters for the output, ask one short question instead of inventing facts.
- **Language.** The framework is written in English; write the deliverable in the language of the request (Russian request → Russian output), and adapt examples, platforms and conventions to that market.
- **No invented numbers.** Placeholders in `[brackets]` are to be filled with real data from the user. Where data is missing, leave a clearly marked placeholder rather than fabricating metrics, quotes or customer names.

## Structure

```markdown
# Ad Copy: [Campaign Name]

**Author:** [Name]
**Status:** Draft | In Review | Approved | Live
**Campaign Objective:** [Awareness | Traffic | Lead Generation | Conversions | Retargeting]
**Product/Offer:** [What is being promoted]
**Landing Page:** [Destination URL]
**Budget:** [Daily or total budget]
**Flight Dates:** [Start date — End date]

---

## 1. Campaign Strategy

**Target Audience:** [Specific persona — demographics, job title, pain point, behavior]
**Awareness Level:** [Unaware | Problem-Aware | Solution-Aware | Product-Aware | Most Aware]
**Core Message:** [One sentence — the key takeaway the ad must communicate]
**Primary CTA:** [What action you want the viewer to take]
**Offer/Hook:** [What makes this ad worth clicking — discount, free resource, trial, demo]
**Competitive Positioning:** [How this differentiates from competitor ads in the same auction]

## 2. Meta Ads (Facebook / Instagram)

### Ad Set: [Audience Name]

**Targeting:**
- **Location:** [Countries / regions / cities]
- **Age:** [Range]
- **Interests:** [Interest targeting options]
- **Behaviors:** [Behavioral targeting]
- **Lookalike:** [Source audience for lookalike, percentage]
- **Exclusions:** [Who to exclude — existing customers, recent converters]

**Placement:** [Feed | Stories | Reels | All automatic]

### Ad Variant A

**Format:** [Single image | Carousel | Video | Collection]
**Primary Text:** [125 characters max for mobile-optimal display, up to 500 allowed]
```
[Ad primary text — the main body copy above the image]
```

**Headline:** [40 characters max]
```
[Headline text — appears below the image]
```

**Description:** [30 characters max — optional, shown on some placements]
```
[Description text]
```

**CTA Button:** [Sign Up | Learn More | Shop Now | Get Offer | Book Now | Download | Contact Us]
**Creative Brief:**
- Visual: [Describe the image or video — what it shows, style, text overlay]
- Dimensions: [1080x1080 for feed, 1080x1920 for stories]
- Brand elements: [Logo placement, colors, fonts]

### Ad Variant B

[Same format as Variant A with one variable changed]

### Ad Variant C

[Same format — different angle or creative approach]

---

## 3. Google Ads

### Search Campaign

**Campaign Type:** [Search | Performance Max | Display | YouTube]
**Keyword Strategy:**

| Keyword | Match Type | Monthly Volume | Est. CPC | Intent |
|---------|-----------|---------------|----------|--------|
| [Keyword 1] | [Exact | Phrase | Broad] | [Volume] | [$X.XX] | [Intent] |
| [Keyword 2] | [Match type] | [Volume] | [CPC] | [Intent] |
| [Keyword 3] | [Match type] | [Volume] | [CPC] | [Intent] |
| [Keyword 4] | [Match type] | [Volume] | [CPC] | [Intent] |

**Negative Keywords:** [Keywords to exclude]

### Responsive Search Ad

**Headlines (up to 15, 30 chars each):**

| # | Headline | Pin Position |
|---|----------|-------------|
| 1 | [Headline] | [1 / 2 / 3 / None] |
| 2 | [Headline] | [Position] |
| 3 | [Headline] | [Position] |
| 4 | [Headline] | [Position] |
| 5 | [Headline] | [Position] |
| 6 | [Headline] | [Position] |
| 7 | [Headline] | [Position] |
| 8 | [Headline] | [Position] |

**Descriptions (up to 4, 90 chars each):**

| # | Description |
|---|-------------|
| 1 | [Description] |
| 2 | [Description] |
| 3 | [Description] |
| 4 | [Description] |

**Sitelink Extensions:**

| Sitelink | Description | URL |
|----------|-------------|-----|
| [Link text] | [2 lines of description] | [URL] |
| [Link text] | [Description] | [URL] |
| [Link text] | [Description] | [URL] |
| [Link text] | [Description] | [URL] |

**Callout Extensions:** [Feature 1] | [Feature 2] | [Feature 3] | [Feature 4]

---

## 4. LinkedIn Ads

### Campaign: [Campaign Name]

**Targeting:**
- **Job Titles:** [List]
- **Job Functions:** [List]
- **Industries:** [List]
- **Company Size:** [Range]
- **Seniority:** [Entry | Senior | Manager | Director | VP | C-Suite]
- **Exclusions:** [Competitors, existing customers]

**Ad Format:** [Single image | Carousel | Video | Document | Message | Conversation]

### Ad Variant A

**Introductory Text:** [600 characters max — appears above the image]
```
[Ad text — professional tone, outcome-focused]
```

**Headline:** [70 characters max — appears below the image]
```
[Headline text]
```

**Description:** [100 characters max — optional]
```
[Description text]
```

**CTA Button:** [Apply | Download | Get Quote | Learn More | Sign Up | Subscribe | Register | Request Demo]
**Creative Brief:**
- Visual: [Describe the image or video]
- Dimensions: [1200x627 for single image, 1080x1080 for carousel]
- Brand elements: [Logo, colors]

### Ad Variant B

[Same format with one variable changed]

---

## 5. A/B Testing Plan

| Test | Platform | Variable | Variant A | Variant B | Budget Split | Duration | Success Metric |
|------|----------|----------|-----------|-----------|-------------|----------|----------------|
| [Test 1] | [Platform] | [Headline | Creative | CTA | Audience] | [A description] | [B description] | [50/50 or 70/30] | [Days] | [CTR | CPC | Conv rate] |
| [Test 2] | [Platform] | [Variable] | [A] | [B] | [Split] | [Days] | [Metric] |

## 6. Performance Targets

| Platform | Metric | Target | Industry Benchmark |
|----------|--------|--------|-------------------|
| Meta | CPC | $[X.XX] | $[X.XX] |
| Meta | CTR | [X]% | [X]% |
| Meta | Conversion Rate | [X]% | [X]% |
| Google | CPC | $[X.XX] | $[X.XX] |
| Google | CTR | [X]% | [X]% |
| Google | Quality Score | [X]/10 | [X]/10 |
| LinkedIn | CPC | $[X.XX] | $[X.XX] |
| LinkedIn | CTR | [X]% | [X]% |
| LinkedIn | Cost per Lead | $[X.XX] | $[X.XX] |
```

## How to Write Each Section

**Campaign Strategy:** Define the audience, awareness level, and core message before writing any ad copy. Ads targeting Problem-Aware audiences need to name the pain. Ads targeting Product-Aware audiences need to differentiate from competitors. The awareness level determines the copy angle.

Good: "Target audience: Engineering managers at SaaS companies (50-500 employees) who currently track project status using spreadsheets or Jira boards and spend 5+ hours per week in status meetings. Problem-Aware — they know status meetings are a waste but have not found a tool that eliminates them."

Bad: "Target audience: People interested in project management."

**Meta Ads:** The primary text must hook attention in the first 2 lines (before the "See more" truncation). For feed ads, the image carries 70% of the work — the text supports the visual. For story/reel ads, the text overlay on the creative is the primary copy. Keep primary text under 125 characters for maximum mobile display.

Good primary text: "We cancelled 3 status meetings. Nobody asked where the updates went.\n\nPlanwise auto-generates reports from your Jira data."
Bad primary text: "Introducing Planwise, the revolutionary AI-powered project management platform that is transforming how engineering teams track and report on project status across organizations of all sizes."

**Google Ads:** Headlines must include the primary keyword (for Quality Score) and a benefit or differentiator. Pin your strongest headline to position 1 and your brand name to position 3. Descriptions should expand on the headline with proof points and a CTA. Use all available extensions.

Good headline: "Cut Status Meetings by 60%"
Bad headline: "Planwise Project Management"

**LinkedIn Ads:** LinkedIn is expensive. Every ad must be sharply targeted with a clear value proposition for the specific job title seeing it. Introductory text should read like a first-person professional insight, not a corporate ad. LinkedIn users scroll past anything that looks like a traditional ad.

Good introductory text: "Last quarter, our engineering team spent 340 hours in status meetings. This quarter: zero.\n\nWe switched to Planwise, which auto-generates weekly reports from Jira and GitHub. The result: 5 hours/week back per manager, and stakeholders actually read the updates."
Bad introductory text: "Are you looking for a better way to manage your projects? Look no further! Planwise is the leading AI-powered solution for engineering teams."

## Conventions

- Every ad has exactly one CTA. Do not ask the viewer to do two things.
- Character limits are hard constraints. Meta headlines: 40 chars. Google headlines: 30 chars. LinkedIn headlines: 70 chars. Write to the limit, not over it.
- Primary keyword appears in at least 2 Google Ads headlines and 1 description.
- Meta primary text is under 125 characters for full mobile display. Longer text is allowed but truncated.
- Every ad variant changes exactly one variable. Testing two changes at once makes results unattributable.
- Exclude existing customers from acquisition campaigns. Paying to acquire people you already have is waste.
- Creative briefs describe the visual specifically enough for a designer to execute without additional context.
- LinkedIn ads target by job title and seniority, not by interest. Interest targeting on LinkedIn is unreliable.
- Every campaign has at least 2 ad variants per ad set for testing.
- Negative keywords are defined before launch for Google campaigns. Without them, you pay for irrelevant clicks.
- Landing pages match the ad. The headline and offer on the landing page must reflect what the ad promised. Mismatched messaging kills conversion rates and Quality Score.

## Anti-Patterns

- Do NOT write ad copy without knowing the landing page. The ad and the page must tell the same story. Writing ads in isolation creates messaging mismatches.
- Do NOT use the same copy across all platforms. Meta, Google, and LinkedIn have different character limits, audience mindsets, and creative formats. Rewrite for each platform.
- Do NOT target broad audiences on LinkedIn. LinkedIn CPCs are $8-15+. Broad targeting burns budget on people who will never convert. Narrow to specific job titles and company sizes.
- Do NOT skip negative keywords on Google Ads. Without them, your ad for "project management software" shows up for "project management degree" and "free project management courses."
- Do NOT write Google Ads headlines that waste characters on your brand name. Pin the brand to position 3 and use positions 1-2 for keywords and benefits.
- Do NOT use stock imagery in Meta ads. Authentic product screenshots, real photos, and designed graphics outperform generic stock photos.
- Do NOT write Meta primary text longer than 3 lines without testing. Mobile truncates at 3 lines with a "See more" link. Most people do not click "See more."
- Do NOT run ads to a homepage. Send traffic to a landing page specific to the offer in the ad. Homepage bounce rates for paid traffic are typically 70-80%.
- Do NOT set and forget. Check ad performance daily for the first week. Pause underperforming variants. Scale winners.
- Do NOT ignore frequency on Meta. When frequency exceeds 3 (the average user has seen the ad 3 times), creative fatigue sets in. Refresh creative or audience.
- Do NOT launch without conversion tracking. If you cannot measure the downstream action (signup, purchase, demo booked), you cannot optimize. Set up tracking before the first dollar is spent.
- Do NOT A/B test with less than 500 impressions per variant. Statistical significance requires sufficient data. Small audiences need longer test periods.

## Examples

```markdown
# Ad Copy: Planwise — Engineering Manager Campaign

**Author:** Nadia Petrov
**Status:** Approved
**Campaign Objective:** Lead Generation (free trial signups)
**Product/Offer:** Planwise — 14-day free trial, no credit card required
**Landing Page:** planwise.com/try
**Budget:** $3,000/month ($100/day)
**Flight Dates:** 2026-04-01 — 2026-04-30

---

## 1. Campaign Strategy

**Target Audience:** Engineering managers at B2B SaaS companies (50-500 employees) who manage 3+ concurrent projects and spend 5+ hours/week in status meetings or writing status reports.
**Awareness Level:** Problem-Aware — they know status meetings are wasteful but have not seen a tool that replaces them.
**Core Message:** Planwise eliminates status meetings by auto-generating reports from the tools your team already uses.
**Primary CTA:** Start free trial
**Offer/Hook:** Free 14-day trial, no credit card required. See your first auto-generated report within 24 hours.
**Competitive Positioning:** Unlike Jira/Linear dashboards that require manual curation, Planwise generates complete narrative reports automatically from existing data.

## 2. Meta Ads (Facebook / Instagram)

### Ad Set: Engineering Managers — SaaS

**Targeting:**
- **Location:** United States, Canada, United Kingdom
- **Age:** 28-50
- **Interests:** Engineering management, Jira, Agile methodology, Software engineering
- **Behaviors:** Technology early adopters
- **Lookalike:** 1% lookalike of existing trial signups
- **Exclusions:** Existing Planwise users (custom audience), competitors' employees

**Placement:** Feed + Stories (automatic)

### Ad Variant A — Pain-focused

**Format:** Single image
**Primary Text:**
```
We cancelled 3 status meetings last month. Nobody noticed.

Planwise reads your Jira and GitHub data, then writes the weekly update for you. Stakeholders get the report. Engineers get their time back.

Free for 14 days. No credit card.
```

**Headline:**
```
Stop Writing Status Updates
```

**Description:**
```
Free 14-day trial
```

**CTA Button:** Sign Up
**Creative Brief:**
- Visual: Split-screen. Left side: a calendar full of recurring "Status Meeting" blocks (red). Right side: the same calendar with those blocks removed and replaced by a single "Planwise Report — Auto-sent" notification (green). Clean, minimal design.
- Dimensions: 1080x1080
- Brand elements: Planwise logo bottom-right. Navy blue and white palette.

### Ad Variant B — Result-focused

**Format:** Single image
**Primary Text:**
```
Engineering managers using Planwise get 5 hours back per week.

Auto-generated status reports from Jira, GitHub, and Slack data. Your first report arrives within 24 hours of connecting.

Try it free → no credit card needed.
```

**Headline:**
```
Get 5 Hours Back Every Week
```

**Description:**
```
Auto status reports from Jira
```

**CTA Button:** Sign Up
**Creative Brief:**
- Visual: Product screenshot of the Planwise dashboard showing a multi-project health view with green/yellow/red indicators. A status report preview is visible in a panel on the right. Real UI, not a mockup.
- Dimensions: 1080x1080
- Brand elements: Planwise logo bottom-right.

---

## 3. Google Ads

### Search Campaign

**Campaign Type:** Search
**Keyword Strategy:**

| Keyword | Match Type | Monthly Volume | Est. CPC | Intent |
|---------|-----------|---------------|----------|--------|
| project status report tool | Exact | 720 | $4.80 | Commercial |
| automated status updates engineering | Phrase | 320 | $5.20 | Commercial |
| reduce status meetings | Broad | 1,100 | $3.90 | Problem-Aware |
| project management for engineering teams | Phrase | 2,400 | $6.10 | Solution-Aware |

**Negative Keywords:** free, course, degree, certification, template, excel, google sheets, internship, job, salary

### Responsive Search Ad

**Headlines:**

| # | Headline | Pin Position |
|---|----------|-------------|
| 1 | Cut Status Meetings by 60% | 1 |
| 2 | Auto Status Reports from Jira | None |
| 3 | Planwise — Free 14-Day Trial | 3 |
| 4 | No More Manual Status Updates | None |
| 5 | 5 Hours Back Per Week Per Manager | None |
| 6 | See Your First Report in 24hrs | None |
| 7 | Works With Jira, Linear, GitHub | None |
| 8 | Engineering Project Management | 2 |

**Descriptions:**

| # | Description |
|---|-------------|
| 1 | Planwise auto-generates weekly status reports from your Jira and GitHub data. Free 14-day trial. |
| 2 | Stop writing status updates. Planwise reads your tools and writes the report. No credit card required. |
| 3 | Trusted by 2,400+ engineering teams. Auto reports, risk detection, multi-team dashboards. Start free. |
| 4 | Your first AI-generated status report in 24 hours. Connects to Jira, Linear, and GitHub in 2 minutes. |

**Sitelink Extensions:**

| Sitelink | Description | URL |
|----------|-------------|-----|
| See How It Works | Watch a 2-minute demo video | planwise.com/demo |
| Customer Stories | See how engineering teams use Planwise | planwise.com/customers |
| Pricing | Free starter plan. Team plans from $49/mo | planwise.com/pricing |
| Integrations | Jira, Linear, GitHub, Slack + more | planwise.com/integrations |

**Callout Extensions:** Free 14-Day Trial | No Credit Card | SOC 2 Certified | 2-Minute Setup

---

## 4. LinkedIn Ads

### Campaign: Engineering Managers — Status Meeting Pain

**Targeting:**
- **Job Titles:** Engineering Manager, Senior Engineering Manager, Director of Engineering, VP of Engineering, Head of Engineering
- **Job Functions:** Engineering, Information Technology
- **Industries:** Computer Software, Internet, SaaS
- **Company Size:** 51-500 employees
- **Seniority:** Manager, Director, VP
- **Exclusions:** Planwise employees, competitors (Jira, Linear, Asana, Monday.com)

**Ad Format:** Single image

### Ad Variant A

**Introductory Text:**
```
Last quarter, our engineering org spent 340 hours in status meetings.

This quarter: zero.

We connected Planwise to our Jira and GitHub, and it auto-generates weekly status reports for every project. Stakeholders read them. Engineers stopped getting pulled into syncs.

The 5 hours per week I got back? I spend them on actual engineering leadership — architecture reviews, 1:1s, unblocking the team.

If your calendar looks like a graveyard of recurring status meetings, give Planwise 14 days. Free trial, no credit card.
```

**Headline:**
```
Stop Writing Status Reports. Start Leading Your Team.
```

**CTA Button:** Sign Up
**Creative Brief:**
- Visual: Clean graphic showing a before/after. Before: 5 calendar blocks labeled "Status Sync." After: 1 notification — "Planwise Report Sent Automatically." Modern, minimal design with navy blue palette.
- Dimensions: 1200x627

---

## 5. A/B Testing Plan

| Test | Platform | Variable | Variant A | Variant B | Budget Split | Duration | Success Metric |
|------|----------|----------|-----------|-----------|-------------|----------|----------------|
| 1 | Meta | Primary text angle | Pain-focused (cancelled meetings) | Result-focused (5 hours back) | 50/50 | 14 days | CTR + conv rate |
| 2 | Google | Headline position 1 | "Cut Status Meetings by 60%" | "Auto Status Reports from Jira" | Auto-rotation | 14 days | CTR |
| 3 | LinkedIn | Introductory text length | Long (340 words) | Short (100 words) | 50/50 | 14 days | CTR + cost per lead |

## 6. Performance Targets

| Platform | Metric | Target | Industry Benchmark (B2B SaaS) |
|----------|--------|--------|-------------------------------|
| Meta | CPC | $2.80 | $3.50 |
| Meta | CTR | 1.8% | 1.1% |
| Meta | Conversion Rate | 4.5% | 3.2% |
| Google | CPC | $5.50 | $6.40 |
| Google | CTR | 4.2% | 3.5% |
| Google | Quality Score | 7/10 | 6/10 |
| LinkedIn | CPC | $9.50 | $11.00 |
| LinkedIn | CTR | 0.8% | 0.5% |
| LinkedIn | Cost per Lead | $42 | $55 |
```

## Customization

For retargeting campaigns, adjust the awareness level to Product-Aware and write copy that addresses specific objections (pricing, competitor comparison, ease of setup). For e-commerce, add product feed campaigns and dynamic creative. For brand awareness campaigns, shift success metrics from conversion rate to reach, frequency, and brand lift. For single-platform campaigns, remove the unused platform sections and expand the A/B testing plan for the active platform.
