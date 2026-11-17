# [Product Name]

[Brief description of the product/project.]

---

## Skill: Attribution Model

Marketing attribution is the process of assigning credit for conversions to the marketing touchpoints that influenced them. A marketer sets up an attribution model when launching multi-channel campaigns, establishing UTM tracking standards, resolving conflicting channel performance reports, or building a measurement framework that accurately connects marketing spend to revenue.

### Structure

#### Attribution Overview

| Field | Detail |
|-------|--------|
| **Attribution Model** | [Selected model — First-Touch / Last-Touch / Linear / Time-Decay / Position-Based / Data-Driven] |
| **Attribution Window** | [Days — e.g., 30-day click, 1-day view] |
| **Conversion Event** | [What counts as a conversion — e.g., purchase, trial sign-up, demo request] |
| **Channels Tracked** | [List of all channels in the model] |
| **Implementation Date** | [When this model was implemented or last updated] |
| **Reporting Tool** | [Where attribution data is reported — GA4, CRM, custom model] |

#### Attribution Model Selection

| Model | How It Works | Best For | Limitation |
|-------|-------------|----------|------------|
| **First-Touch** | 100% credit to the first interaction | Understanding which channels drive discovery | Ignores everything after the first touch |
| **Last-Touch** | 100% credit to the last interaction before conversion | Understanding which channels close deals | Ignores the journey that led to the final touch |
| **Linear** | Equal credit to every touchpoint | Balanced view when no single touchpoint dominates | Treats a casual blog visit the same as a demo request |
| **Time-Decay** | More credit to touchpoints closer to conversion | Long sales cycles where recent touches matter more | May undervalue the awareness channels that started the journey |
| **Position-Based (U-Shaped)** | 40% to first touch, 40% to last touch, 20% split among middle | Valuing both discovery and closing while acknowledging the middle | The 40/40/20 split is arbitrary — the real distribution varies |
| **Data-Driven** | Machine learning assigns credit based on conversion path patterns | Mature organizations with high conversion volume (500+/month) | Requires significant data volume; black-box model is hard to explain |

**Selected Model Rationale:** [2-3 sentences explaining why this model was chosen for this business, given the sales cycle length, channel mix, and data maturity.]

#### UTM Naming Conventions

| Parameter | Purpose | Format | Examples |
|-----------|---------|--------|---------|
| `utm_source` | Where the traffic comes from | Lowercase, no spaces, platform name | `google`, `linkedin`, `facebook`, `newsletter`, `partner-name` |
| `utm_medium` | The marketing medium | Lowercase, standardized terms | `cpc`, `email`, `social`, `organic`, `referral`, `display`, `video` |
| `utm_campaign` | The specific campaign | Lowercase, hyphens, date prefix | `2026-02-product-launch`, `2026-q1-brand-awareness`, `always-on-retargeting` |
| `utm_term` | Paid keyword (search ads) | Lowercase, plus signs for spaces | `payment+processing`, `checkout+widget`, `{keyword}` (dynamic) |
| `utm_content` | Creative variant or CTA | Lowercase, descriptive | `video-testimonial-30s`, `cta-free-trial`, `hero-image-a` |

**URL Structure:**
```
https://example.com/page?utm_source=[source]&utm_medium=[medium]&utm_campaign=[campaign]&utm_term=[term]&utm_content=[content]
```

**Naming Rules:**
- All lowercase, always. `Google` and `google` will create duplicate entries.
- Hyphens for spaces, never underscores in values (underscores are used in parameter names).
- No special characters except hyphens.
- Date prefix on campaigns for chronological sorting: `YYYY-MM-` or `YYYY-QX-`.
- Consistent vocabulary across all team members. Publish the approved terms list.

#### Channel Definitions

| Channel (as reported) | UTM Source/Medium Combination | Includes | Does NOT Include |
|----------------------|------------------------------|----------|-----------------|
| Paid Search | `google / cpc`, `bing / cpc` | Google Ads, Bing Ads — all search campaigns | Shopping ads (tracked as Paid Shopping) |
| Paid Social | `facebook / cpc`, `linkedin / cpc`, `instagram / cpc` | All paid social campaigns | Organic social posts |
| Organic Search | `google / organic`, `bing / organic` | Unpaid search traffic from all search engines | Branded search ads |
| Organic Social | `facebook / social`, `linkedin / social`, `twitter / social` | Unpaid social media posts and shares | Paid-boosted organic posts (tracked as Paid Social) |
| Email | `newsletter / email`, `drip / email`, `campaign / email` | All email marketing — campaigns and automations | Transactional emails (order confirmations) |
| Referral | `[partner-name] / referral` | Partner links, affiliate programs, press mentions | Internal cross-linking |
| Direct | (no UTM) | Typed URL, bookmarks, untagged links | Dark social (should be tagged when possible) |
| Display | `google / display`, `[network] / display` | Banner ads, programmatic display | Native ads (tracked as Native) |
| Content / SEO | `blog / organic`, `[site] / organic` | Blog posts, guides, resources driving organic traffic | Paid content distribution |

#### Tracking Implementation

| Component | Tool | Status | Owner | Notes |
|-----------|------|--------|-------|-------|
| UTM Parameters | [URL builder / automated tagging] | [Live / In Progress / Not Started] | [Person] | [Notes on automation or manual process] |
| Click Tracking | [GA4, HubSpot, etc.] | [Status] | [Person] | [Session-based or user-based tracking] |
| Conversion Tracking | [CRM, e-commerce platform] | [Status] | [Person] | [Pixel, server-side, or API-based] |
| Cross-Device Tracking | [GA4 User-ID, CRM matching] | [Status] | [Person] | [How users are identified across devices] |
| Offline Conversion Import | [CRM → ad platforms] | [Status] | [Person] | [For B2B: importing CRM conversions back to ad platforms] |
| View-Through Tracking | [Ad platforms] | [Status] | [Person] | [Attribution window for impression-based credit] |
| UTM Audit Process | [Monthly review / automated validation] | [Status] | [Person] | [How you catch UTM errors] |

#### Reporting Structure

| Report | Audience | Cadence | Key Metrics | Attribution Model Used |
|--------|----------|---------|-------------|----------------------|
| [Channel Performance] | [Marketing team] | [Weekly] | [Conversions, CPA, ROAS by channel] | [Selected model] |
| [Campaign ROI] | [Leadership] | [Monthly] | [Spend, revenue, ROI by campaign] | [Selected model + last-click comparison] |
| [Multi-Touch Journey] | [Marketing ops] | [Monthly] | [Path analysis, avg touchpoints to conversion, channel assists] | [Linear or position-based] |
| [Channel Comparison] | [Budget planning] | [Quarterly] | [Attributed revenue, CAC by channel, LTV by channel] | [All models side-by-side] |

#### Attribution Audit Checklist

- [ ] All paid campaigns have UTM parameters applied consistently
- [ ] UTM naming conventions are documented and shared with all team members
- [ ] No duplicate source/medium combinations exist in the analytics tool
- [ ] Conversion events are firing correctly (verified via tag assistant or debug mode)
- [ ] Cross-device tracking is enabled (GA4 User-ID or CRM-based matching)
- [ ] Offline conversions (CRM closed-won deals) are imported back to ad platforms
- [ ] Attribution window matches the sales cycle length
- [ ] Self-referral (own domain showing as referral source) is excluded
- [ ] Internal traffic (office IPs, employee visits) is filtered out
- [ ] View-through attribution window is set appropriately (1-day recommended for most businesses)
- [ ] The attribution model is documented and understood by all stakeholders
- [ ] Channel definitions are documented and cover all traffic sources

### How to Write Each Section

**Attribution Overview**
Set the context. Which model are you using, why, and for what conversion event? The attribution window is critical — a 7-day window and a 90-day window tell completely different stories about channel performance. Match the window to your sales cycle. If your average time from first touch to purchase is 45 days, a 7-day attribution window is too short and will massively under-credit awareness channels.

Good: "Position-Based (40/40/20) model with a 60-day click window and 1-day view window. Conversion event: Closed-Won deal in HubSpot CRM. Selected because our average sales cycle is 52 days, and we need to credit both the discovery channel (first touch) and the closing channel (last touch) while acknowledging the nurture touches in between."
Bad: "We use last-click attribution."

**UTM Naming Conventions**
This is the foundation of attribution accuracy. Inconsistent UTMs are the #1 source of attribution data quality issues. Every person who creates a marketing URL must follow the same naming rules. The most common mistakes: mixed case (Google vs google), inconsistent medium names (paid vs cpc vs ppc), and missing campaign parameters. Publish the approved terms list and enforce it through a URL builder tool or automated tagging.

Good: A complete table with every parameter defined, format rules stated, and multiple examples per parameter. A URL builder template linked in the documentation.
Bad: "Use UTMs on all links." with no format specification.

**Channel Definitions**
Every analytics tool groups traffic into channels based on UTM parameters. If your UTM naming is inconsistent, traffic ends up in the wrong channel or in "(Other)." Define every channel by its exact source/medium combination. State what is included and what is excluded. This prevents the argument where someone says "Paid Social generated 200 conversions" and someone else says "But that includes the boosted organic posts."

Good: "Paid Social: Includes traffic where utm_medium = 'cpc' AND utm_source IN ('facebook', 'linkedin', 'instagram', 'tiktok'). Excludes boosted organic posts (tracked as utm_medium = 'social-paid-boost'). Excludes influencer campaigns (tracked under Influencer channel)."
Bad: "Paid Social = social media ads."

**Tracking Implementation**
List every tracking component and its status. This reveals the gaps. Most marketing teams have UTM tracking in place but are missing cross-device tracking, offline conversion imports, or proper view-through attribution. Each gap creates a blind spot in the attribution model. Assign an owner and a target date for each component that is not yet live.

Good: "Offline Conversion Import: Not Started. Owner: Marketing Ops. Target: April 15. We are currently not importing CRM closed-won deals back to Google Ads and LinkedIn Ads, which means these platforms cannot optimize for downstream conversions. They are optimizing for clicks and form fills instead."
Bad: "Our tracking is mostly set up."

**Reporting Structure**
Define who sees what, how often, and using which attribution model. Different audiences need different views. The marketing team needs weekly channel performance to adjust spend. Leadership needs monthly ROI by campaign. The budget planning team needs quarterly channel comparison using multiple attribution models side-by-side to make allocation decisions.

Always present at least two attribution models in quarterly budget reviews. Last-click and first-click will disagree on which channels deserve more investment. The disagreement is the insight — it reveals which channels are doing awareness work (under-credited by last-click) and which are capturing existing demand (over-credited by last-click).

### Conventions

- All UTM parameters must be lowercase. Case sensitivity creates duplicate entries in every analytics tool.
- Use hyphens for multi-word values, never spaces or underscores in UTM parameter values.
- Every paid campaign must have all five UTM parameters. Every organic and email link must have at least source, medium, and campaign.
- Date-prefix all campaign names (YYYY-MM or YYYY-QX) for chronological sorting and easy identification.
- Document the approved terms list for utm_source and utm_medium. No ad hoc values.
- Match the attribution window to the sales cycle. If average time-to-purchase is 45 days, use at least a 60-day window.
- Report attributed conversions under at least two models (typically last-click and one multi-touch model) for any strategic decision.
- Review UTM hygiene monthly. Check for: mixed case, new unrecognized sources, high "(Other)" traffic, self-referral.
- View-through attribution should use a 1-day window for most businesses. Longer view-through windows inflate display and video channel credit.
- Internal traffic must be filtered from all attribution reports. Employee visits should not count as touchpoints.
- Self-referral (your own domain appearing as a referral source) must be excluded in analytics settings.
- The audience for attribution documentation is the entire marketing team, marketing ops, and finance. Everyone who touches UTMs or interprets channel reports must understand the system.

### Anti-Patterns

- Do NOT use last-click attribution as the sole model for budget allocation. It systematically under-credits awareness channels and over-credits bottom-of-funnel channels, leading to a spiral of cutting awareness spend until the pipeline dries up.
- Do NOT allow ad hoc UTM values. Every time someone invents a new utm_source or utm_medium, it creates a data quality issue. Enforce the approved terms list.
- Do NOT mix case in UTM parameters. `Google` and `google` are two different sources in every analytics tool. This is the most common and most damaging UTM error.
- Do NOT use a short attribution window for a long sales cycle. A 7-day window for a product with a 45-day sales cycle will attribute most conversions to the last touch and miss the channels that started the journey.
- Do NOT ignore view-through conversions entirely, but do not over-weight them either. A 30-day view-through window inflates display ad credit for conversions that would have happened anyway. Use 1-day view-through.
- Do NOT attribute conversions to internal traffic. Filter office IPs and employee accounts before running attribution analysis.
- Do NOT treat self-referral as a legitimate traffic source. Your own domain appearing as a referral source is a tracking bug, not a channel.
- Do NOT use UTM parameters on internal links (links within your own site). UTMs are for external sources only. Internal UTMs override the original source and break attribution.
- Do NOT compare channel CPAs without using the same attribution model. Google Ads reporting (last-click within Google) and Facebook Ads reporting (last-click within Facebook) will both over-count their own conversions.
- Do NOT build an attribution model without documenting the channel definitions. Ambiguous channel groupings lead to arguments about which team gets credit.
- Do NOT ignore dark social (untagged traffic that shows up as "Direct"). A significant portion of "Direct" traffic comes from messaging apps, email clients that strip UTMs, and social shares in private channels.
- Do NOT change the attribution model mid-campaign and compare results. If you switch from last-click to linear mid-quarter, the before and after are not comparable.
- Do NOT forget to import offline conversions. For B2B companies where deals close in CRM, not on the website, the ad platforms are flying blind without offline conversion data.
- Do NOT set up attribution tracking once and never audit it. UTM hygiene degrades over time as new team members create links without following conventions, platforms update their tracking, and new channels are added.

### Examples

#### Attribution Model: Meridian (B2B SaaS — HR Management Platform)

**Product Context:** Meridian is a B2B HR management platform selling to mid-market companies (100-2,000 employees). Average contract value is $24,000/year. The sales cycle averages 58 days from first touch to closed-won deal. The marketing team runs campaigns across Google Ads, LinkedIn, email nurture, webinars, and content (blog/SEO). The team has been using last-click attribution and is transitioning to a multi-touch model after realizing that LinkedIn — their largest awareness channel — looks inefficient under last-click while the pipeline it generates closes at the highest rate.

---

**Attribution Overview**

| Field | Detail |
|-------|--------|
| **Attribution Model** | Position-Based (40/40/20) — primary. Last-Click — secondary (for comparison and ad platform optimization). |
| **Attribution Window** | 90-day click window, 1-day view window |
| **Conversion Event** | Closed-Won deal in HubSpot CRM (imported to ad platforms as offline conversion) |
| **Secondary Conversion Events** | Demo Request (website), Trial Start, MQL (HubSpot lifecycle stage change) |
| **Channels Tracked** | Paid Search, Paid Social (LinkedIn), Organic Search, Email (nurture + campaigns), Webinar, Content/Blog, Referral, Direct |
| **Implementation Date** | March 1, 2026 |
| **Reporting Tool** | HubSpot CRM (primary attribution), GA4 (website analytics), Looker (consolidated reporting dashboard) |

**Selected Model Rationale:** Position-Based (40/40/20) because Meridian's 58-day sales cycle involves distinct phases: discovery (first touch), nurture (middle touches), and conversion (last touch). The 40/40/20 split credits both the channel that introduced the prospect and the channel that closed the deal, while acknowledging the 3-5 nurture touches in between. Last-click is maintained as a secondary model for backward compatibility and because Google Ads and LinkedIn Ads optimize on last-click by default.

**UTM Naming Conventions**

| Parameter | Purpose | Format | Examples |
|-----------|---------|--------|---------|
| `utm_source` | Traffic origin platform | Lowercase, platform name, no abbreviations | `google`, `linkedin`, `newsletter`, `webinar`, `partner-lattice`, `capterra` |
| `utm_medium` | Marketing medium | Lowercase, standardized list (see below) | `cpc`, `email`, `social`, `organic`, `referral`, `display`, `video`, `webinar` |
| `utm_campaign` | Specific campaign or initiative | `YYYY-MM-description` or `always-on-description` | `2026-02-product-launch-meridian-connect`, `always-on-brand-search`, `2026-q1-linkedin-awareness` |
| `utm_term` | Keyword or targeting criteria | Lowercase, plus signs for spaces | `hr+management+software`, `employee+onboarding+tool`, `{keyword}` |
| `utm_content` | Creative variant or CTA | Lowercase, descriptive identifier | `video-customer-story-acme`, `cta-book-demo`, `banner-roi-calculator`, `email-3-of-5` |

**Approved utm_medium values (no others permitted):**

| Value | Used For |
|-------|----------|
| `cpc` | All paid search and paid social ads |
| `email` | All email marketing (campaigns + automations) |
| `social` | Organic social media posts |
| `organic` | Organic search (auto-tagged by GA4) |
| `referral` | Partner referrals, affiliates, press |
| `display` | Banner and programmatic display ads |
| `video` | Paid video campaigns (YouTube, LinkedIn video) |
| `webinar` | Webinar registration and follow-up links |
| `qr` | QR codes on printed materials or event collateral |

**Channel Definitions**

| Channel | Source/Medium Combinations | Includes | Excludes |
|---------|--------------------------|----------|----------|
| Paid Search | `google / cpc`, `bing / cpc` (where utm_campaign does not contain "display" or "video") | Google Ads search, Bing Ads search, branded and non-branded | Shopping ads, display campaigns run through Google Ads |
| Paid Social | `linkedin / cpc`, `facebook / cpc` | LinkedIn Sponsored Content, LinkedIn Message Ads, Facebook/Instagram ads | Organic LinkedIn posts, employee advocacy shares |
| Organic Search | `google / organic`, `bing / organic`, `duckduckgo / organic` | All unpaid search engine traffic | Brand search ads (tracked under Paid Search) |
| Email | `newsletter / email`, `nurture / email`, `campaign / email`, `drip / email` | Marketing emails: newsletters, nurture sequences, campaign blasts, automated flows | Transactional emails (order confirmations, password resets — not tagged with UTMs) |
| Webinar | `webinar / webinar` | Registration pages, replay links, follow-up emails specific to webinars | Webinar promotion emails (tracked under Email) |
| Content/Blog | `blog / organic`, `blog / social` | Blog posts, guides, whitepapers, case studies — whether accessed via organic or social sharing | Paid content distribution (tracked under the paid channel) |
| Referral | `[partner-name] / referral` | Partner referral links, affiliate links, press mention links | Internal cross-links (not tagged) |
| Direct | (no UTM parameters) | Typed URL, bookmarks, dark social | Should be minimized through comprehensive UTM tagging |

**Tracking Implementation**

| Component | Tool | Status | Owner | Notes |
|-----------|------|--------|-------|-------|
| UTM Parameters | HubSpot tracking URL builder + Bitly for social | Live | Marketing Ops (Riley) | All paid campaigns auto-tagged via platform integration. Manual UTM required for email, social organic, and partner links. |
| Click Tracking | GA4 + HubSpot | Live | Marketing Ops (Riley) | GA4 handles website sessions. HubSpot tracks form submissions, page views for known contacts, and email clicks. |
| Conversion Tracking — Demo Request | HubSpot form + GA4 event | Live | Marketing Ops (Riley) | Fires on form submission. Deduplicated by email address. |
| Conversion Tracking — Closed-Won | HubSpot CRM deal stage | Live | Sales Ops (Taylor) | Deal moved to "Closed Won" stage triggers the conversion event. |
| Offline Conversion Import — Google | Google Ads offline conversion import via HubSpot integration | Live | Marketing Ops (Riley) | CRM Closed-Won deals imported to Google Ads weekly. Allows Google to optimize for downstream revenue, not just clicks. |
| Offline Conversion Import — LinkedIn | LinkedIn CAPI (Conversions API) | In Progress — target April 1 | Marketing Ops (Riley) | Currently LinkedIn optimizes for demo requests (website pixel). Importing Closed-Won deals will improve LinkedIn's algorithm for finding high-quality leads. |
| Cross-Device Tracking | GA4 User-ID (matched via HubSpot contact ID) | Live | Marketing Ops (Riley) | When a known HubSpot contact visits the site, their GA4 sessions are unified across devices. Covers approximately 40% of site visitors. |
| View-Through Tracking | LinkedIn + Google Ads | Live | Marketing Ops (Riley) | 1-day view-through window. Only counts if a user saw an ad impression and converted within 24 hours without clicking the ad. |
| UTM Audit Process | Monthly review in GA4 | Live | Marketing Ops (Riley) | First Monday of each month: check for new unrecognized source/medium combinations, high "(Other)" traffic, and case inconsistencies. |

**Multi-Touch Path Analysis (Sample — February 2026)**

| Path | Occurrences | Avg Touchpoints | Avg Days to Convert | Revenue |
|------|-------------|-----------------|---------------------|---------|
| LinkedIn Ad → Blog Post → Email Nurture → Demo → Closed Won | 18 | 6.2 | 64 days | $432,000 |
| Google Search → Demo → Email Nurture → Closed Won | 14 | 3.8 | 38 days | $336,000 |
| Blog (Organic) → Email Nurture → Webinar → Demo → Closed Won | 11 | 7.4 | 72 days | $264,000 |
| Referral → Demo → Closed Won | 8 | 2.1 | 22 days | $192,000 |
| LinkedIn Ad → Webinar → Email Nurture → Demo → Closed Won | 6 | 5.8 | 58 days | $144,000 |
| Direct → Demo → Closed Won | 4 | 1.4 | 12 days | $96,000 |

**Key path insights:**
- The most common conversion path starts with LinkedIn. LinkedIn is the #1 first-touch channel but ranks #3 under last-click attribution because prospects discover Meridian on LinkedIn but convert via email or direct demo request.
- Referral deals close fastest (22 days avg, 2.1 touchpoints) and at the same ACV. This channel needs more investment.
- Paths involving webinars have the longest sales cycles (58-72 days) but also the highest ACV ($24,000 — same as others, but close rate is 34% vs 22% overall). Webinar attendees are higher-quality leads.
- Average touchpoints to conversion: 4.8 across all paths. This confirms that single-touch attribution models miss 3-4 out of every 5 interactions.

**Attribution Model Comparison (February 2026 — Closed-Won Deals)**

| Channel | Last-Click Conversions | Last-Click Revenue | Position-Based Conversions | Position-Based Revenue | Delta |
|---------|----------------------|-------------------|---------------------------|----------------------|-------|
| Paid Search (Google) | 22 | $528,000 | 16.4 | $393,600 | -25.5% |
| Paid Social (LinkedIn) | 8 | $192,000 | 18.2 | $436,800 | +127.5% |
| Email | 14 | $336,000 | 10.8 | $259,200 | -22.9% |
| Webinar | 4 | $96,000 | 6.4 | $153,600 | +60.0% |
| Organic Search | 6 | $144,000 | 5.6 | $134,400 | -6.7% |
| Referral | 6 | $144,000 | 4.8 | $115,200 | -20.0% |
| Direct | 4 | $96,000 | 1.8 | $43,200 | -55.0% |
| **Total** | **64** | **$1,536,000** | **64** | **$1,536,000** | — |

**Key attribution insight:** Under last-click, LinkedIn is credited with $192,000 (12.5% of revenue). Under position-based, LinkedIn is credited with $436,800 (28.4% of revenue) — a 127.5% increase. LinkedIn is the primary awareness channel that starts conversion paths, but other channels (email, direct demo) capture the final click. Under last-click, the marketing team would logically cut LinkedIn spend — which would collapse the top of the funnel within 2-3 months.

**Reporting Structure**

| Report | Audience | Cadence | Key Metrics | Model |
|--------|----------|---------|-------------|-------|
| Channel Performance Dashboard | Marketing team | Weekly (Monday) | Conversions, CPA, ROAS by channel | Position-Based (primary) |
| Campaign ROI Report | VP Marketing, CMO | Monthly (1st week) | Spend, pipeline, revenue, ROI by campaign | Position-Based + Last-Click comparison |
| Multi-Touch Path Analysis | Marketing Ops | Monthly (2nd week) | Common paths, avg touchpoints, channel assists | Linear |
| Budget Allocation Review | CMO, CFO | Quarterly | Attributed revenue by channel (all models), CAC by channel, LTV by channel | All models side-by-side |
| UTM Hygiene Report | Marketing Ops | Monthly (1st Monday) | Unrecognized sources, "(Other)" traffic %, case issues | N/A — data quality audit |

**Next Steps**

1. **By April 1:** Complete LinkedIn CAPI integration for offline conversion imports. This is the highest-priority tracking gap.
2. **By April 15:** Build the consolidated Looker dashboard with position-based attribution as the primary view and last-click as the comparison.
3. **This week:** Run the first monthly UTM audit. Fix any case inconsistencies or unrecognized source/medium combinations in GA4.
4. **Ongoing:** Train all marketing team members on the UTM naming conventions. Share the approved terms list and URL builder template.
5. **Q2 planning:** Use the attribution model comparison table to inform Q2 budget allocation. Specifically, evaluate whether LinkedIn spend should increase based on its position-based attribution showing 127.5% more credit than last-click.

### Customization

Replace all bracket sections with your specifics. For e-commerce with short purchase cycles (under 7 days), last-click or time-decay models work reasonably well — multi-touch adds complexity without proportional insight. For B2B with long sales cycles (30-90+ days), multi-touch attribution is essential and last-click will produce dangerous misallocations. For companies running primarily on one channel, attribution modeling is less critical than funnel optimization — invest there first. For marketplace businesses, build separate attribution models for supply-side and demand-side acquisition. For app-based businesses, integrate mobile attribution (Adjust, AppsFlyer, Branch) alongside web attribution. For businesses with significant offline marketing (events, direct mail, TV), establish incrementality testing (holdout markets) alongside digital attribution since offline touches are inherently harder to track.
