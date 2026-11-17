---
name: seo-strategy
description: "SEO Strategy framework for marketing work. An SEO strategy document maps how organic search drives acquisition for your product. Marketers write this to align keyword targeting, content planning, and technical optimization into a single executable plan. It answers: 'How do we get found by the right people at the right time — and what do we do once they land?' Use when asked for: SEO-стратегия, семантическое ядро, поисковое продвижение, ключевые слова."
---

# SEO Strategy

An SEO strategy document maps how organic search drives acquisition for your product. Marketers write this to align keyword targeting, content planning, and technical optimization into a single executable plan. It answers: "How do we get found by the right people at the right time — and what do we do once they land?"

## Before you start

- **Product context.** This framework needs to know the product: name, what it does, who it serves. Take it from the request, the project's CLAUDE.md or README, or earlier conversation. If it is missing and matters for the output, ask one short question instead of inventing facts.
- **Language.** The framework is written in English; write the deliverable in the language of the request (Russian request → Russian output), and adapt examples, platforms and conventions to that market.
- **No invented numbers.** Placeholders in `[brackets]` are to be filled with real data from the user. Where data is missing, leave a clearly marked placeholder rather than fabricating metrics, quotes or customer names.

## Structure

```markdown
# SEO Strategy: [Product/Brand Name]

**Author:** [Name]
**Last Updated:** [Date]
**Time Horizon:** [e.g., Q2-Q4 2026]
**Primary Goal:** [e.g., Grow organic traffic from 15K to 50K monthly sessions]

---

## 1. Current State Audit

**Domain Authority:** [DA score]
**Monthly Organic Traffic:** [Sessions from Google Search Console or analytics]
**Indexed Pages:** [Count]
**Top 10 Ranking Keywords:** [Count]
**Top 3 Ranking Keywords:** [Count]
**Average Position:** [Across tracked keywords]

### What's Working
- [Page/keyword that ranks well and why]
- [Content type that performs]
- [Technical strength]

### What's Not Working
- [Pages with high impressions but low CTR]
- [Content gaps]
- [Technical issues — crawl errors, speed, indexation]

## 2. Keyword Research Framework

### Seed Topics
| Topic Cluster | Search Intent | Volume Range | Difficulty | Priority |
|--------------|---------------|-------------|------------|----------|
| [Topic 1] | [Informational/Commercial/Transactional] | [Monthly volume] | [Low/Med/High] | [P0/P1/P2] |
| [Topic 2] | [Intent] | [Volume] | [Difficulty] | [Priority] |
| [Topic 3] | [Intent] | [Volume] | [Difficulty] | [Priority] |
| [Topic 4] | [Intent] | [Volume] | [Difficulty] | [Priority] |
| [Topic 5] | [Intent] | [Volume] | [Difficulty] | [Priority] |

### Keyword Targeting Criteria
- **Minimum monthly volume:** [e.g., 200+]
- **Maximum keyword difficulty:** [e.g., KD < 40 for new domains, < 60 for established]
- **Intent alignment:** [Which intents map to which funnel stages]
- **Commercial value:** [How to assess whether a keyword leads to revenue]

### Long-Tail Strategy
[2-3 sentences on how you'll target long-tail variations. Include your approach to question keywords, comparison keywords, and "best X for Y" patterns.]

## 3. Content Cluster Map

### Cluster 1: [Pillar Topic]
- **Pillar Page:** [Title and target keyword]
- **Supporting Pages:**
  - [Subtopic 1] — [Target keyword, volume, difficulty]
  - [Subtopic 2] — [Target keyword, volume, difficulty]
  - [Subtopic 3] — [Target keyword, volume, difficulty]
  - [Subtopic 4] — [Target keyword, volume, difficulty]
  - [Subtopic 5] — [Target keyword, volume, difficulty]
- **Internal Linking Plan:** [How cluster pages link to pillar and to each other]

### Cluster 2: [Pillar Topic]
- **Pillar Page:** [Title and target keyword]
- **Supporting Pages:**
  - [Subtopic 1] — [Target keyword, volume, difficulty]
  - [Subtopic 2] — [Target keyword, volume, difficulty]
  - [Subtopic 3] — [Target keyword, volume, difficulty]
  - [Subtopic 4] — [Target keyword, volume, difficulty]
- **Internal Linking Plan:** [How cluster pages link to pillar and to each other]

### Cluster 3: [Pillar Topic]
[Same format]

## 4. Technical SEO Checklist

### Crawling & Indexation
- [ ] XML sitemap submitted and error-free
- [ ] Robots.txt reviewed — no accidental blocks
- [ ] Canonical tags set correctly on all pages
- [ ] No orphan pages (every page reachable from navigation or internal links)
- [ ] Pagination handled with rel=next/prev or infinite scroll SEO fallback
- [ ] Hreflang tags set (if multi-language)

### Performance
- [ ] Core Web Vitals passing (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- [ ] Images optimized (WebP/AVIF, lazy loading, width/height set)
- [ ] JavaScript rendering verified — critical content visible without JS
- [ ] Mobile-first indexing verified in Search Console
- [ ] Server response time < 200ms (TTFB)

### Structured Data
- [ ] Schema markup on key page types (Product, Article, FAQ, HowTo, Organization)
- [ ] Rich results validated via Google Rich Results Test
- [ ] Breadcrumb schema implemented

### Site Architecture
- [ ] Flat URL structure — key pages within 3 clicks of homepage
- [ ] URL slugs are clean, keyword-relevant, and lowercase
- [ ] 301 redirects in place for changed URLs
- [ ] 404 page returns proper status code and provides navigation

## 5. On-Page Optimization Standards

### Title Tags
- Format: [Primary Keyword] — [Secondary Keyword] | [Brand]
- Length: 50-60 characters
- [Rule for homepage vs. blog vs. product pages]

### Meta Descriptions
- Length: 140-155 characters
- Include: primary keyword, value proposition, call to action
- [Template for each page type]

### Header Hierarchy
- H1: One per page, contains primary keyword
- H2: Section headings, contain secondary keywords
- H3-H4: Subsections, natural language
- [Rule for keyword density — e.g., primary keyword in first 100 words]

### Content Standards
- Minimum word count: [e.g., 1,500 for blog posts, 2,500 for pillar pages]
- Include: table of contents for posts > 2,000 words
- Media: at least 1 image per 500 words, with descriptive alt text
- Internal links: minimum [X] per post, linking to relevant cluster pages
- External links: [X] authoritative outbound links per post

## 6. Link Building Strategy

### Approach
[2-3 sentences on overall link building philosophy — quality vs. quantity, white-hat methods only, etc.]

### Tactics
| Tactic | Target Links/Month | Effort | Expected DA Range |
|--------|-------------------|--------|-------------------|
| [Guest posting] | [Count] | [Hours/mo] | [DA range] |
| [Digital PR / data studies] | [Count] | [Hours/mo] | [DA range] |
| [Resource page outreach] | [Count] | [Hours/mo] | [DA range] |
| [Broken link building] | [Count] | [Hours/mo] | [DA range] |
| [HARO / journalist queries] | [Count] | [Hours/mo] | [DA range] |
| [Partnership/co-marketing links] | [Count] | [Hours/mo] | [DA range] |

### Link Targets
- [List 5-10 specific publications, blogs, or resource pages you want links from]

### Links to Avoid
- [PBNs, link farms, paid links, comment spam, etc.]

## 7. Competitor SEO Analysis

| Metric | Us | [Competitor 1] | [Competitor 2] | [Competitor 3] |
|--------|-----|----------------|----------------|----------------|
| Domain Authority | [Score] | [Score] | [Score] | [Score] |
| Organic Traffic (est.) | [Monthly] | [Monthly] | [Monthly] | [Monthly] |
| Indexed Pages | [Count] | [Count] | [Count] | [Count] |
| Referring Domains | [Count] | [Count] | [Count] | [Count] |
| Top Keywords | [Count] | [Count] | [Count] | [Count] |
| Content Velocity | [Posts/mo] | [Posts/mo] | [Posts/mo] | [Posts/mo] |

### Content Gaps
[Keywords competitors rank for that we don't — prioritized by volume and relevance]

### Link Gaps
[Domains that link to competitors but not to us — sorted by DA]

## 8. Measurement Plan

### KPIs
| Metric | Current | 3-Month Target | 6-Month Target | 12-Month Target |
|--------|---------|----------------|----------------|-----------------|
| Organic sessions/month | [Current] | [Target] | [Target] | [Target] |
| Keywords in top 10 | [Current] | [Target] | [Target] | [Target] |
| Keywords in top 3 | [Current] | [Target] | [Target] | [Target] |
| Organic signups/month | [Current] | [Target] | [Target] | [Target] |
| Organic revenue/month | [Current] | [Target] | [Target] | [Target] |
| Domain Authority | [Current] | [Target] | [Target] | [Target] |
| Backlinks acquired/month | [Current] | [Target] | [Target] | [Target] |

### Reporting Cadence
- **Weekly:** Keyword position changes, traffic trends, new backlinks
- **Monthly:** Full SEO report — traffic, rankings, conversions, content published, links acquired
- **Quarterly:** Strategy review — adjust clusters, re-prioritize keywords, update competitor analysis

### Tools
- [Analytics platform — e.g., GA4, Plausible]
- [Search Console]
- [Keyword tracking — e.g., Ahrefs, SEMrush, Ubersuggest]
- [Technical SEO — e.g., Screaming Frog, Sitebulb]
```

## How to Write Each Section

**Current State Audit**
Start with data, not assumptions. Pull real numbers from Google Search Console and your analytics platform. The audit establishes your baseline — without it, you can't measure progress. Be honest about weaknesses. If your Core Web Vitals are failing, say so. If you have 200 indexed pages but only 10 get traffic, call it out.

Good: "Domain Authority: 34. Monthly organic traffic: 8,200 sessions. 47 keywords in top 10, but only 6 in top 3. Average position: 18.4. Core Web Vitals failing on mobile — LCP at 4.1s due to unoptimized hero images."

Bad: "We have some traffic from Google and rank for a few keywords." (No numbers, no specifics, no actionable insight.)

**Keyword Research Framework**
Organize keywords into topic clusters, not flat lists. For each keyword, capture search intent (informational, commercial, transactional, navigational), monthly volume, keyword difficulty, and priority. Priority should reflect both difficulty and business value — a 500-volume transactional keyword often matters more than a 5,000-volume informational one.

Good: "'best project management software for startups' — Commercial intent, 2,400/mo volume, KD 38, P0. High commercial value because searchers are actively evaluating tools. We can rank with a comparison page within 4-6 months given our current DA."

Bad: "'project management' — 100K volume, P0." (Impossibly broad, no intent analysis, no realistic ranking assessment.)

**Content Cluster Map**
Group related keywords under pillar topics. Each cluster has one pillar page (comprehensive, 2,500+ words) and 5-10 supporting pages that target specific long-tail keywords. The pillar page links to all supporting pages, and each supporting page links back to the pillar. This builds topical authority and tells Google you're an expert on the subject.

**Technical SEO Checklist**
Treat this as a living checklist. Check each item, fix what's broken, and re-audit quarterly. Technical SEO is the foundation — no amount of great content will rank if Google can't crawl, index, and render your pages properly. Core Web Vitals directly impact rankings on mobile.

**Link Building Strategy**
Be specific about tactics, targets, and expected outcomes. Generic "build backlinks" plans fail. Name the publications you want links from. Estimate the effort required per tactic. Set realistic monthly targets — 5-10 quality links per month is excellent for most businesses. Quality matters exponentially more than quantity.

**Measurement Plan**
Define success before you start. Set targets for 3, 6, and 12 months. Track leading indicators (rankings, traffic) and lagging indicators (signups, revenue). SEO compounds — expect slow early progress and acceleration over time. If you're not seeing ranking improvements after 3 months of consistent execution, re-evaluate your keyword targeting and content quality.

## Conventions

- Length: 5-8 pages
- Tone: Strategic but grounded in data. Every recommendation should trace back to a number
- Update the current state audit monthly and the full strategy quarterly
- Use tools like Ahrefs, SEMrush, or Ubersuggest for keyword data — don't guess volumes
- Always pair keyword volume with keyword difficulty — volume without difficulty is misleading
- Prioritize keywords by commercial intent, not just volume
- Map every keyword to a specific page (existing or planned) — no orphan keywords
- Include both branded and non-branded keyword strategies
- Set realistic timelines — new content typically takes 3-6 months to rank
- Track competitor content velocity — if they publish 20 posts/month and you publish 2, adjust your expectations
- Always include a link building strategy — content alone doesn't rank without authority
- Use Google Search Console as the source of truth for impressions, clicks, and average position — third-party tools estimate

## Anti-Patterns

- Do NOT target keywords without assessing difficulty — ranking for "CRM software" with a DA 25 domain is not going to happen
- Do NOT write content without keyword research — "let's blog about whatever" is not an SEO strategy
- Do NOT ignore search intent — a transactional keyword needs a product page, not a blog post. An informational keyword needs a guide, not a pricing page
- Do NOT stuff keywords — Google's algorithms detect this and it tanks rankings. Write for humans, optimize for machines
- Do NOT neglect technical SEO — a site that takes 5 seconds to load won't rank regardless of content quality
- Do NOT build links from irrelevant sites — a link from a random directory does nothing. A link from an industry blog moves the needle
- Do NOT set "rank #1 for [head term]" as a primary goal — it's not actionable and probably not achievable in a reasonable timeframe
- Do NOT ignore internal linking — it's free, it's powerful, and most sites underutilize it dramatically
- Do NOT create thin content to target keywords — Google's Helpful Content Update penalizes pages that exist only for SEO
- Do NOT skip the measurement plan — without targets and tracking, you can't prove ROI or justify continued investment
- Do NOT treat SEO as a one-time project — it's an ongoing program that compounds over months and years
- Do NOT optimize for Google at the expense of the user — if a page is unpleasant to read, it won't convert even if it ranks
- Do NOT forget about featured snippets and People Also Ask — structuring content to answer questions directly can win position zero
- Do NOT copy competitor content — analyze what they rank for, then create something genuinely better

## Examples

```markdown
# SEO Strategy: FlowStack — B2B Project Management SaaS

**Author:** Rachel Kim
**Last Updated:** 2026-03-15
**Time Horizon:** Q2-Q4 2026
**Primary Goal:** Grow organic traffic from 12K to 40K monthly sessions and increase organic signups from 180 to 600/month

---

## 1. Current State Audit

**Domain Authority:** 38
**Monthly Organic Traffic:** 12,400 sessions (Google Search Console, Feb 2026)
**Indexed Pages:** 187
**Top 10 Ranking Keywords:** 94
**Top 3 Ranking Keywords:** 12
**Average Position:** 22.7

### What's Working
- Comparison pages ("FlowStack vs Asana", "FlowStack vs Monday.com") rank top 5 and drive 30% of organic signups — high commercial intent, strong conversion
- "Project management for remote teams" pillar page ranks #4 and gets 2,100 sessions/month
- Core Web Vitals passing on both mobile and desktop after Q1 performance sprint

### What's Not Working
- Blog content averages 600 words — too thin to compete for target keywords. None of our 45 blog posts rank in top 10
- No internal linking strategy — blog posts don't link to product pages or pillar content
- 23 pages returning soft 404s due to deprecated help docs — wasting crawl budget
- Zero backlinks to product pages — all 340 referring domains point to blog or homepage

## 2. Keyword Research Framework

### Seed Topics
| Topic Cluster | Search Intent | Volume Range | Difficulty | Priority |
|--------------|---------------|-------------|------------|----------|
| Project management for startups | Commercial/Informational | 1,200-8,000 | Medium (KD 30-45) | P0 |
| Remote team collaboration | Informational | 2,000-12,000 | Medium (KD 25-40) | P0 |
| Agile project management | Informational/Commercial | 3,000-15,000 | High (KD 45-60) | P1 |
| Task management software | Transactional | 5,000-20,000 | High (KD 50-65) | P1 |
| Project management templates | Transactional | 4,000-10,000 | Low (KD 15-30) | P0 |

### Keyword Targeting Criteria
- **Minimum monthly volume:** 300 for long-tail, 1,000 for pillar targets
- **Maximum keyword difficulty:** KD < 45 for blog content, < 55 for pillar pages (given our DA 38)
- **Intent alignment:** Informational keywords map to blog posts and guides. Commercial keywords map to comparison pages and pillar content. Transactional keywords map to landing pages and template galleries
- **Commercial value:** Keywords are high-value if the searcher is evaluating project management tools, switching from a competitor, or looking for templates they could use inside FlowStack

### Long-Tail Strategy
We'll target question-based keywords ("how to manage a remote team's tasks," "what's the best project management tool for 10-person teams") with in-depth FAQ sections at the bottom of pillar pages. Comparison keywords ("Asana vs Monday vs FlowStack") will get dedicated pages because they convert at 3x the rate of informational content. "Best X for Y" keywords ("best project management app for designers," "best free task management tool") will each get a listicle-style page where FlowStack is featured but not the sole focus.

## 3. Content Cluster Map

### Cluster 1: Project Management for Startups
- **Pillar Page:** "The Complete Guide to Project Management for Startups (2026)" — target: "project management for startups" (3,200/mo, KD 34)
- **Supporting Pages:**
  - "How to Set Up Project Management When You're a Team of 5" — "project management small team" (1,800/mo, KD 22)
  - "10 Project Management Mistakes That Kill Startups" — "startup project management mistakes" (720/mo, KD 18)
  - "Project Management Tools Comparison: What Startups Actually Need" — "best project management tools for startups" (2,400/mo, KD 38)
  - "Agile vs Waterfall for Early-Stage Startups" — "agile vs waterfall startups" (590/mo, KD 21)
  - "Free Project Management Templates for Startup Founders" — "startup project management templates" (1,100/mo, KD 15)
- **Internal Linking Plan:** Pillar links to all 5 supporting pages. Each supporting page links back to the pillar in the first paragraph and links to 1-2 other supporting pages where relevant. All pages link to FlowStack's startup plan landing page via contextual CTA.

### Cluster 2: Remote Team Collaboration
- **Pillar Page:** "Remote Team Collaboration: The Playbook That Actually Works" — target: "remote team collaboration" (5,400/mo, KD 40)
- **Supporting Pages:**
  - "Async Communication for Remote Teams: Tools and Frameworks" — "async communication remote teams" (2,100/mo, KD 28)
  - "How to Run Effective Standups With a Distributed Team" — "remote standup meetings" (1,400/mo, KD 25)
  - "Remote Team Productivity: Metrics That Matter" — "remote team productivity metrics" (880/mo, KD 20)
  - "FlowStack vs Notion for Remote Teams" — "notion vs project management tool remote" (640/mo, KD 19)
- **Internal Linking Plan:** Same hub-and-spoke model. Pillar page links to all supporting pages, each supporting page links back and cross-links to the most relevant sibling.

### Cluster 3: Project Management Templates
- **Pillar Page:** "50 Free Project Management Templates (Download Now)" — target: "project management templates" (8,200/mo, KD 28)
- **Supporting Pages:**
  - "Sprint Planning Template (Free Download)" — "sprint planning template" (3,100/mo, KD 20)
  - "Project Roadmap Template for Product Teams" — "product roadmap template" (4,500/mo, KD 32)
  - "Meeting Agenda Template for Project Managers" — "project meeting agenda template" (1,200/mo, KD 12)
  - "Risk Assessment Template for Projects" — "project risk assessment template" (900/mo, KD 14)
  - "Gantt Chart Template (Free Excel + FlowStack)" — "gantt chart template free" (6,100/mo, KD 25)
- **Internal Linking Plan:** Pillar links to each template page. Template pages include "Use this template in FlowStack" CTA linking to signup. Cross-link related templates (sprint planning links to roadmap, etc.).

## 4. Technical SEO Checklist

### Crawling & Indexation
- [x] XML sitemap submitted and error-free
- [x] Robots.txt reviewed — no accidental blocks
- [ ] Canonical tags set correctly on all pages — **3 blog posts have duplicate canonical issues**
- [ ] No orphan pages — **23 deprecated help docs need redirects or noindex**
- [x] Pagination handled correctly on blog archive
- N/A Hreflang tags (English only)

### Performance
- [x] Core Web Vitals passing (LCP 1.8s, INP 120ms, CLS 0.04)
- [x] Images optimized (WebP, lazy loading, dimensions set)
- [x] JavaScript rendering verified — SSR via Next.js
- [x] Mobile-first indexing verified
- [ ] Server response time — **averaging 280ms, target < 200ms. CDN caching needs tuning**

### Structured Data
- [x] Organization schema on homepage
- [ ] Article schema on blog posts — **not implemented, estimated 15% CTR lift**
- [ ] FAQ schema on comparison pages — **not implemented**
- [x] Breadcrumb schema implemented
- [ ] SoftwareApplication schema on product pages — **not implemented**

### Site Architecture
- [x] Key pages within 3 clicks of homepage
- [ ] URL slugs — **12 blog posts have dates in URLs, should be removed**
- [x] 301 redirects in place for rebranded pages
- [x] 404 page returns proper status code

## 5. On-Page Optimization Standards

### Title Tags
- Blog: [Primary Keyword]: [Compelling Hook] | FlowStack
- Comparison: [Product A] vs [Product B]: [Year] Comparison | FlowStack
- Template: [Template Name] (Free Download) | FlowStack
- Length: 50-60 characters

### Meta Descriptions
- Length: 140-155 characters
- Blog: Summarize the key takeaway + "Learn how to [outcome]."
- Comparison: "[Product A] or [Product B]? We compare [key features]. See which fits your team."
- Template: "Download our free [template name]. Ready to use in [format]. No signup required."

### Content Standards
- Blog posts: minimum 1,800 words (up from current 600 average)
- Pillar pages: minimum 3,000 words
- Comparison pages: minimum 2,000 words
- Table of contents for posts > 2,000 words
- At least 1 image per 500 words with descriptive alt text containing target keyword naturally
- Minimum 3 internal links per post — at least 1 to a product page, 1 to the pillar page, 1 to a related blog post
- 2-3 authoritative outbound links per post (industry reports, research, official documentation)

## 6. Link Building Strategy

### Approach
Focus on earning links through original research, data studies, and free tools/templates. Supplement with strategic guest posts on industry publications. Quality over quantity — one link from a DA 60+ industry site is worth more than 20 links from DA 20 blogs.

### Tactics
| Tactic | Target Links/Month | Effort | Expected DA Range |
|--------|-------------------|--------|-------------------|
| Original data studies (remote work trends, PM surveys) | 3-5 | 20 hrs/mo | DA 40-70 |
| Guest posts on PM/startup blogs | 2-3 | 15 hrs/mo | DA 35-55 |
| Free template distribution (embed links) | 5-8 | 10 hrs/mo | DA 20-45 |
| HARO / Qwoted journalist responses | 2-4 | 8 hrs/mo | DA 50-80 |
| Integration partner co-marketing | 1-2 | 5 hrs/mo | DA 30-60 |
| Broken link building on PM resource pages | 1-2 | 5 hrs/mo | DA 30-50 |

### Link Targets
- ProductHunt (DA 90) — launch new features and templates
- Smashing Magazine (DA 89) — guest post on PM for design teams
- HubSpot Blog (DA 93) — HARO responses on productivity topics
- Zapier Blog (DA 90) — integration partnership content
- Atlassian Community (DA 91) — comparison content and migration guides
- First Round Review (DA 72) — data study on startup project management
- SaaStr (DA 68) — guest post on PLG and product-led growth metrics

## 7. Competitor SEO Analysis

| Metric | FlowStack | Asana | Monday.com | ClickUp | Notion |
|--------|-----------|-------|------------|---------|--------|
| Domain Authority | 38 | 91 | 89 | 78 | 92 |
| Organic Traffic (est.) | 12K/mo | 4.2M/mo | 3.8M/mo | 1.6M/mo | 6.1M/mo |
| Indexed Pages | 187 | 12,400 | 8,900 | 4,200 | 15,600 |
| Referring Domains | 340 | 48,000 | 35,000 | 12,000 | 52,000 |
| Content Velocity | 2 posts/mo | 15 posts/mo | 20 posts/mo | 12 posts/mo | 8 posts/mo |

### Content Gaps
High-priority keywords competitors rank for that we don't:
1. "project management software free" (22K/mo) — ClickUp ranks #2, we have no free tier page
2. "how to create a project plan" (14K/mo) — Asana ranks #1 with a comprehensive guide
3. "kanban board template" (9K/mo) — Notion ranks #3 with a template gallery page
4. "project timeline examples" (4K/mo) — Monday.com ranks #4, we have no content on this

### Link Gaps
Domains linking to competitors but not us (top targets):
1. TechCrunch (DA 93) — covers Asana, Monday, ClickUp product launches
2. G2 (DA 92) — all competitors have optimized profiles with backlinks, ours is minimal
3. Forbes (DA 95) — quotes ClickUp and Asana in productivity roundups
4. PCMag (DA 93) — reviews all major PM tools, hasn't reviewed FlowStack

## 8. Measurement Plan

### KPIs
| Metric | Current | 3-Month Target | 6-Month Target | 12-Month Target |
|--------|---------|----------------|----------------|-----------------|
| Organic sessions/month | 12,400 | 18,000 | 30,000 | 50,000 |
| Keywords in top 10 | 94 | 150 | 280 | 450 |
| Keywords in top 3 | 12 | 25 | 55 | 100 |
| Organic signups/month | 180 | 280 | 450 | 700 |
| Organic MRR contribution | $4,200 | $6,500 | $12,000 | $22,000 |
| Domain Authority | 38 | 42 | 46 | 52 |
| Backlinks acquired/month | 5 | 12 | 18 | 20 |

### Reporting Cadence
- **Weekly:** Keyword position changes (focus on P0 targets), traffic trends, new backlinks detected
- **Monthly:** Full SEO report — traffic by cluster, rankings movement, conversion rate by content type, links acquired, content published vs. plan
- **Quarterly:** Strategy review — re-assess keyword priorities, update competitor analysis, adjust content calendar, review ROI by cluster

### Tools
- GA4 for traffic and conversion tracking
- Google Search Console for impressions, clicks, average position, and indexation
- Ahrefs for keyword tracking, backlink monitoring, and competitor analysis
- Screaming Frog for technical audits (monthly crawl)
- Clearscope for content optimization scoring before publish
```

## Customization

Replace all `[bracketed]` sections with your actual product, market, and competitive data. Adjust the number of content clusters based on your resources — 3 clusters is a strong starting point, but 5-7 is ideal for a mature SEO program. Scale keyword difficulty thresholds to match your domain authority. If your DA is under 30, target keywords with KD under 25. If your DA is over 50, you can compete for KD 40-60. Always validate keyword data with a real tool — don't estimate volumes.
