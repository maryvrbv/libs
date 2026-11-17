---
name: product-launch-announcement
description: "Product Launch Announcement framework for marketing work. Multi-channel launch copy that coordinates messaging across press release, email, social media, blog, and in-app notification for a product or feature launch. The marketer uses this when a new product, major feature, or significant update needs to be announced to customers, prospects, press, and the broader market with consistent messaging across every channel. Use when asked for: анонс запуска, анонс продукта или фичи, пресс-релиз."
---

# Product Launch Announcement

Multi-channel launch copy that coordinates messaging across press release, email, social media, blog, and in-app notification for a product or feature launch. The marketer uses this when a new product, major feature, or significant update needs to be announced to customers, prospects, press, and the broader market with consistent messaging across every channel.

## Before you start

- **Product context.** This framework needs to know the product: name, what it does, who it serves. Take it from the request, the project's CLAUDE.md or README, or earlier conversation. If it is missing and matters for the output, ask one short question instead of inventing facts.
- **Language.** The framework is written in English; write the deliverable in the language of the request (Russian request → Russian output), and adapt examples, platforms and conventions to that market.
- **No invented numbers.** Placeholders in `[brackets]` are to be filled with real data from the user. Where data is missing, leave a clearly marked placeholder rather than fabricating metrics, quotes or customer names.

## Structure

```markdown
# Product Launch Announcement: [Product/Feature Name]

**Author:** [Name]
**Status:** Draft | In Review | Approved | Scheduled | Live
**Launch Date:** [Date]
**Launch Type:** [New Product | Major Feature | Minor Feature | Major Update | Integration]
**Embargo Date:** [Date, if press is involved]

---

## 1. Launch Messaging Framework

**Product/Feature Name:** [Official name]
**One-Line Description:** [What it does in one sentence — clear, no jargon]
**Value Proposition:** [Why it matters to the customer — outcome-focused]
**Key Differentiator:** [What makes this different from competitors or the previous version]
**Target Audience:** [Primary persona for this launch]
**Secondary Audience:** [Other personas who should hear about this]

### Core Messaging

| Message Layer | Content |
|---------------|---------|
| Headline | [6-10 words — the outcome or capability] |
| Subheadline | [1-2 sentences expanding the headline] |
| Elevator Pitch | [30-second explanation for non-technical audiences] |
| Technical Summary | [2-3 sentences for technical audiences or press] |
| Customer Benefit Statement | [What changes in the customer's workflow or life] |

### Key Proof Points

| Proof Point | Detail |
|-------------|--------|
| [Stat or result] | [Context — beta data, internal testing, customer feedback] |
| [Stat or result] | [Context] |
| [Stat or result] | [Context] |

## 2. Press Release

```
FOR IMMEDIATE RELEASE

[Headline: Company Name + What Launched + Key Benefit]

[Subheadline: Expanding on the headline with a specific detail]

[City, State] — [Date] — [Company Name], [one-line company description], today announced [product/feature name], [one sentence describing what it does]. [One sentence describing why it matters — market context or customer need].

[Paragraph 2: The problem this solves. Market context. Why now.]

[Paragraph 3: What the product/feature does. 2-3 key capabilities. How it works at a high level.]

[Quote from company executive — CEO, VP Product, or CTO:]
"[Quote that speaks to the vision, customer need, or market opportunity. Not generic praise.]"
— [Name], [Title], [Company]

[Paragraph 4: Customer validation. Beta results, early adopter quote, or data point.]

[Quote from customer or analyst:]
"[Quote with specific result or endorsement.]"
— [Name], [Title], [Company]

[Paragraph 5: Availability, pricing, and how to get started.]

### About [Company Name]
[Company boilerplate — 2-3 sentences describing the company, its mission, and scale.]

### Media Contact
[Name] | [Email] | [Phone]
```

## 3. Email Announcement

**To:** [Segment — all customers, specific plan, beta users, prospects]
**Subject Line:** [Specific, benefit-driven subject line]
**Subject Line B:** [A/B variant]
**Preview Text:** [Complements subject — adds new info]
**From Name:** [Person from Company]
**From Email:** [Email]

**Body:**

```
[Opening line — what just happened, stated directly]

[2-3 short paragraphs: what it is, why it matters to them, what they can do with it]

[Key capabilities — 3-4 bullets max]

[CTA — one clear action]

[Sign-off]
```

**Primary CTA:** [Button text → URL]
**Secondary CTA:** [Link text → URL (optional — blog post, docs)]

## 4. Blog Post

**Title:** [Announcing [Feature/Product]: [Benefit Statement]]
**URL:** /blog/announcing-[slug]
**Meta Description:** [150-160 characters]

### Blog Structure

```
## [Opening — what launched and why it matters]
[2-3 paragraphs setting context, naming the problem, introducing the solution]

## [What it does — feature walkthrough]
[Detailed explanation with screenshots or GIFs]

### [Capability 1]
[Description + how to use it]

### [Capability 2]
[Description + how to use it]

### [Capability 3]
[Description + how to use it]

## [Customer/Beta Results]
[Data from beta, customer quotes, early results]

## [How to Get Started]
[Step-by-step for existing and new users]

## [What's Next]
[Roadmap tease — what comes after this launch]
```

## 5. Social Media Posts

### Twitter/X

**Launch Tweet:**
```
[Announcement — what shipped + key benefit. Under 280 chars.]
```

**Thread (if applicable):**
```
Tweet 1: [What shipped]
Tweet 2: [The problem it solves]
Tweet 3: [Key capability 1]
Tweet 4: [Key capability 2]
Tweet 5: [Customer quote or data point]
Tweet 6: [How to get started + link]
```

### LinkedIn

**Post:**
```
[Professional announcement — first 2 lines are the hook. 500-1,500 chars. Hashtags at end.]
```

### Instagram (if applicable)

**Caption:**
```
[Visual-first announcement. Hook in first line. Hashtags at end or in comments.]
```
**Visual:** [Carousel / Reel / Image — describe content]

## 6. In-App Notification

**Type:** [Banner | Modal | Tooltip | Notification Center | None]
**Target:** [All users | Specific segment | New users only]
**Display Trigger:** [On login | On feature page | After action]
**Display Duration:** [Dismissible | Auto-dismiss after X seconds | Persistent until action]

**Headline:** [Short — 5-8 words]
**Body:** [1-2 sentences max]
**CTA:** [Button text → destination]
**Dismiss Option:** [X button | "Maybe later" | "Don't show again"]

## 7. Launch Timeline

| Timing | Channel | Action | Owner | Status |
|--------|---------|--------|-------|--------|
| [T-7 days] | [Internal] | [Team briefing] | [Name] | [Status] |
| [T-3 days] | [Press] | [Embargo briefings] | [Name] | [Status] |
| [T-1 day] | [Email] | [Schedule email blast] | [Name] | [Status] |
| [Launch day, 9am] | [Blog] | [Publish blog post] | [Name] | [Status] |
| [Launch day, 9am] | [Product] | [Enable feature flag + in-app notification] | [Name] | [Status] |
| [Launch day, 9:30am] | [Email] | [Send email announcement] | [Name] | [Status] |
| [Launch day, 10am] | [Twitter/X] | [Post launch tweet + thread] | [Name] | [Status] |
| [Launch day, 10:30am] | [LinkedIn] | [Post LinkedIn announcement] | [Name] | [Status] |
| [Launch day, 11am] | [Press] | [Embargo lifts — press release goes live] | [Name] | [Status] |
| [T+1 day] | [Community] | [Post in community channels] | [Name] | [Status] |
| [T+3 days] | [Social] | [Follow-up post with early results] | [Name] | [Status] |
| [T+7 days] | [Email] | [Follow-up email to non-openers] | [Name] | [Status] |

## 8. Internal Enablement

**Sales Talking Points:**
- [Point 1 — what to say to prospects]
- [Point 2]
- [Point 3]

**Support FAQ:**
| Question | Answer |
|----------|--------|
| [Expected question 1] | [Answer] |
| [Expected question 2] | [Answer] |
| [Expected question 3] | [Answer] |

**Known Limitations:**
- [Limitation 1 — what to say if asked]
- [Limitation 2]
```

## How to Write Each Section

**Launch Messaging Framework:** This is the single source of truth for all channels. Write this first, then derive every other piece of copy from it. The headline, subheadline, and elevator pitch should be reusable across blog, email, social, and press. If the messaging framework is not clear, the channel copy will be inconsistent.

Good elevator pitch: "Teams can now see exactly which messages in their Slack workspace are blocking decisions — and resolve them in one click without leaving the conversation."

Bad elevator pitch: "We're excited to announce a powerful new feature that leverages AI to transform how teams communicate and collaborate."

**Press Release:** Follow the inverted pyramid — most important information first. Journalists scan, they do not read. The first paragraph answers who, what, when, where, why. Quotes from executives should add perspective, not repeat the announcement. Customer quotes must include specific results.

Good executive quote: "Our customers told us that 40% of their Slack messages are questions that go unanswered for more than 4 hours. Resolve fixes that. In beta, teams reduced decision-blocking time by 62%."

Bad executive quote: "We are thrilled to bring this innovative solution to market and look forward to delighting our customers with this transformative capability."

**Email Announcement:** This is not the blog post. It is shorter, more direct, and focused on one action. Open with what happened, explain why it matters to the reader, and give them one thing to do. Three bullets for key capabilities. One CTA button.

**Blog Post:** The blog post is the detailed record. It can be 1,000-2,000 words. Include screenshots, GIFs, or demo videos showing the feature in action. The "How to Get Started" section is critical — readers who just learned about the feature need a clear path to try it.

**Social Media Posts:** Each platform gets its own copy. Twitter/X: short, punchy, link in reply. LinkedIn: professional, personal take, longer form. Instagram: visual-first. Do not post the press release to social media.

**In-App Notification:** Keep it short — 5-8 word headline, 1-2 sentence body, one CTA. Users are in the middle of something. Respect their attention. Do not use a full-screen modal unless this is a once-a-year launch.

## Conventions

- All channels use the same core messaging. Headline, value prop, and proof points are consistent across press release, email, blog, and social.
- The messaging framework is written before any channel-specific copy. It is the source of truth.
- Press releases follow AP style. Dates, titles, and company references are formatted correctly.
- Email announcements are under 200 words. Blog posts are 1,000-2,000 words. Social posts respect platform character limits.
- Launch timeline sequences channels in order: internal enablement → press (under embargo) → blog + product → email → social → press release (embargo lifts).
- Internal teams are briefed before any external communication. Sales has talking points. Support has FAQ answers.
- Every channel has a single CTA. The CTA may differ by channel (email: "Try it now" / blog: "Read the docs" / social: "See the demo"), but each channel has only one.
- In-app notifications are dismissible. Forcing users to interact with a launch modal before they can use the product is hostile.
- Screenshots and visuals are prepared before launch day. Scrambling for a product screenshot at 8am on launch day is avoidable.
- Post-launch follow-up is planned before launch. The T+3 day social post and T+7 day email are written in advance.

## Anti-Patterns

- Do NOT launch without a messaging framework. Writing the press release, email, and social posts independently guarantees inconsistent messaging.
- Do NOT use the same copy for every channel. A press release is not a tweet. A blog post is not an email. Rewrite for each channel's format and audience.
- Do NOT announce to customers via social media before they receive the email. Customers should learn about changes from you directly, not from their Twitter feed.
- Do NOT write press releases with marketing language. Journalists want facts, not superlatives. Remove "revolutionary," "game-changing," and "best-in-class."
- Do NOT skip internal enablement. If a customer asks a sales rep about the new feature and they have not heard of it, the launch failed.
- Do NOT use a full-screen modal for a minor feature launch. In-app notifications should be proportional to the significance of the change.
- Do NOT launch on a Friday. Monday through Wednesday gives you the full week for press coverage, social engagement, and customer feedback.
- Do NOT forget to update existing product pages, help docs, and changelogs. The blog post announces; the documentation explains.
- Do NOT schedule all channels for the exact same minute. Stagger by 30-60 minutes so you can monitor each channel's performance and catch issues.
- Do NOT write executive quotes that could appear in any press release for any company. "We're excited" is not a quote. A specific number, a customer insight, or a strategic perspective is.
- Do NOT include pricing changes in the launch announcement without clear communication to existing customers. Pricing changes need their own sequence.
- Do NOT ignore the "What's Next" section in the blog. Customers want to know the feature is the beginning of a direction, not a one-off.
- Do NOT send the email announcement without testing the in-app notification first. If the notification is broken when thousands of users open the email and click through, the launch impression is negative.

## Examples

```markdown
# Product Launch Announcement: Resolve — Slack Decision Tracking

**Author:** Tanya Flores
**Status:** Approved
**Launch Date:** 2026-04-15
**Launch Type:** Major Feature
**Embargo Date:** 2026-04-14, 6:00pm ET

---

## 1. Launch Messaging Framework

**Product/Feature Name:** Resolve
**One-Line Description:** Resolve identifies unanswered questions in Slack and helps teams make decisions faster without leaving the conversation.
**Value Proposition:** Teams lose hours every week to questions that sit unanswered in Slack threads. Resolve surfaces these blockers in real-time and creates a decision log so nothing falls through the cracks.
**Key Differentiator:** Unlike Slack reminders or workflow builders, Resolve uses AI to detect questions (not just keywords) and tracks whether they were actually answered — not just replied to.
**Target Audience:** Engineering managers and team leads at companies with 50-500 employees who use Slack as their primary communication tool.
**Secondary Audience:** Operations teams, product managers, and anyone who has lost a decision in a Slack thread.

### Core Messaging

| Message Layer | Content |
|---------------|---------|
| Headline | Stop losing decisions in Slack threads |
| Subheadline | Resolve finds unanswered questions in your Slack workspace and creates a decision log your team can actually trust. |
| Elevator Pitch | Teams using Slack lose an average of 4 hours per week to questions that go unanswered. Resolve scans your channels, detects real questions (not just messages with question marks), checks if they were answered, and surfaces blockers in a dashboard. One click to answer, assign, or escalate. |
| Technical Summary | Resolve is a Slack app that uses NLP to classify messages as questions, track response status, and generate a real-time decision backlog. It integrates with Jira and Linear for automatic ticket creation from unresolved questions. |
| Customer Benefit Statement | You will stop losing decisions in Slack threads. Every question gets tracked. Every decision gets logged. Your team makes faster calls with less follow-up. |

### Key Proof Points

| Proof Point | Detail |
|-------------|--------|
| 62% reduction in decision-blocking time | Measured across 14 beta teams over 60 days — average time from question asked to answer received. |
| 4.2 hours/week recovered per team | Self-reported by beta participants — time previously spent re-asking questions, searching for answers, or waiting for responses. |
| 89% question detection accuracy | NLP model tested on 50,000 Slack messages across 8 industries. False positive rate: 3.2%. |

## 2. Press Release

```
FOR IMMEDIATE RELEASE

ThreadSync Launches Resolve: AI-Powered Decision Tracking for Slack That Cuts Blocking Time by 62%

New feature detects unanswered questions in Slack and creates a real-time decision backlog for engineering and product teams.

San Francisco, CA — April 15, 2026 — ThreadSync, the team communication intelligence platform used by 3,200 companies, today announced Resolve, a Slack integration that uses AI to detect unanswered questions in channels and threads, track whether they receive real answers, and surface blocking decisions in a single dashboard.

The average knowledge worker sends and receives 72 Slack messages per day. Research from ThreadSync's internal analysis of 2 million messages found that 23% of questions asked in Slack go unanswered for more than 4 hours, with 8% never receiving an answer at all. These unresolved questions create cascading delays — blocked pull requests, stalled projects, and repeated conversations.

Resolve scans Slack channels in real-time using a natural language model trained to detect questions (not just messages with question marks). It tracks response status, identifies whether the response actually answers the question, and surfaces unresolved items in a centralized dashboard. Team members can answer, assign, or escalate directly from the dashboard without switching to Slack.

"Our customers told us their biggest Slack problem isn't noise — it's silence. Questions that slip through the cracks cost teams hours every week in re-work and follow-up," said Marcus Adeyemi, CEO of ThreadSync. "Resolve finds those silent failures and fixes them before they become blockers. In beta, teams reduced decision-blocking time by 62%."

During a 60-day beta with 14 engineering and product teams, Resolve identified an average of 34 unresolved questions per team per week. Teams reported recovering 4.2 hours per week previously spent searching for answers, re-asking questions, or waiting for responses.

"We had a P0 bug that sat unassigned for 3 days because the question about ownership got buried in a 47-message thread. Resolve would have flagged it in 20 minutes," said Kim Tanaka, Engineering Manager at Clearpath. "Since installing Resolve, we've cut our average decision time from 6 hours to 2.3 hours."

Resolve is available today for all ThreadSync customers on the Team and Enterprise plans. A 14-day free trial is available at threadsync.com/resolve. Pricing starts at $8 per user per month.

### About ThreadSync
ThreadSync is a team communication intelligence platform that helps companies understand, optimize, and act on their Slack and Teams conversations. Used by 3,200 companies including Clearpath, Lattice, and Webflow, ThreadSync surfaces insights that make team communication faster and more effective. Learn more at threadsync.com.

### Media Contact
Tanya Flores | tanya@threadsync.com | (415) 555-0142
```

## 3. Email Announcement

**To:** All active customers (Team and Enterprise plans)
**Subject Line:** New: Find every unanswered question in your Slack
**Subject Line B:** Resolve is here — stop losing decisions in Slack threads
**Preview Text:** 62% faster decisions in beta. Try it today.
**From Name:** Marcus from ThreadSync
**From Email:** marcus@threadsync.com

**Body:**

```
Hey [First Name],

We just launched Resolve — and it is live in your ThreadSync dashboard right now.

Resolve scans your Slack workspace and finds questions that went unanswered. Not messages with question marks — actual questions that need actual answers.

Here is what it does:

- Detects unanswered questions across all your Slack channels
- Shows whether responses actually answer the question (not just "thanks" or emoji reactions)
- Surfaces blockers in a decision dashboard — answer, assign, or escalate in one click
- Creates a searchable decision log so answers do not get lost

In beta, teams reduced decision-blocking time by 62% and recovered 4.2 hours per week.

→ Try Resolve now: [CTA button]

Resolve is included in your Team plan. No setup required — just authorize the Slack connection and it starts scanning.

— Marcus
```

**Primary CTA:** Try Resolve now → threadsync.com/resolve
**Secondary CTA:** Read the full announcement → threadsync.com/blog/announcing-resolve

## 5. Social Media Posts

### Twitter/X

**Launch Tweet:**
```
We just shipped Resolve.

It finds every unanswered question in your Slack workspace — and tracks whether they actually get answered.

In beta, teams cut decision-blocking time by 62%.

Live now for all ThreadSync customers. Details below 👇
```

**Thread:**
```
Tweet 1: [Launch tweet above]

Tweet 2: The problem: 23% of questions asked in Slack go unanswered for 4+ hours. 8% never get answered at all.

These aren't trivial questions. They're "who owns this bug?" and "did we decide on the API format?" — blockers hiding in plain sight.

Tweet 3: Resolve uses NLP to detect real questions — not just messages with "?" at the end.

Then it checks: did the response actually answer the question? Or did someone just react with 👍 and move on?

Tweet 4: Every unresolved question shows up in a single dashboard.

One click to answer inline, assign to someone, or escalate to a ticket in Jira or Linear.

Tweet 5: Beta results from 14 teams over 60 days:

- 62% reduction in decision-blocking time
- 4.2 hours/week recovered per team
- 34 unresolved questions caught per team per week (questions that would have been lost)

Tweet 6: Resolve is live today for all ThreadSync customers on Team and Enterprise plans.

14-day free trial if you're not on ThreadSync yet.

threadsync.com/resolve
```

### LinkedIn

**Post:**
```
We spent 8 months building a feature that solves the most frustrating thing about Slack.

Not the notifications. Not the threads. The silence.

23% of questions asked in Slack go unanswered for more than 4 hours. 8% never get answered at all.

These are questions like "who owns this bug?" and "did we finalize the pricing?" — decisions that block real work, buried in threads nobody scrolls back to read.

Today we launched Resolve.

It scans your Slack workspace, detects real questions using NLP (not just keyword matching), and checks whether they actually got answered — not just replied to.

Unresolved questions surface in a decision dashboard. One click to answer, assign, or escalate.

During our 60-day beta with 14 teams:
→ 62% reduction in decision-blocking time
→ 4.2 hours/week recovered per team
→ 89% question detection accuracy

If your team loses decisions in Slack threads (and every team does), Resolve finds them.

Live now for ThreadSync customers. Free 14-day trial for new users.

Link in comments.

#Slack #TeamCommunication #ProductLaunch #EngineeringManagement #Productivity
```

## 6. In-App Notification

**Type:** Banner (top of dashboard, non-blocking)
**Target:** All active users on Team and Enterprise plans
**Display Trigger:** On next login after launch date
**Display Duration:** Persistent until dismissed or Resolve is activated

**Headline:** Resolve is live — find unanswered Slack questions
**Body:** Resolve scans your Slack workspace and surfaces questions that never got answered. Connect Slack to get started.
**CTA:** Try Resolve → /resolve/setup
**Dismiss Option:** X button (dismisses permanently)

## 7. Launch Timeline

| Timing | Channel | Action | Owner | Status |
|--------|---------|--------|-------|--------|
| T-7 (Apr 8) | Internal | Sales enablement session + talking points doc | Tanya Flores | Complete |
| T-5 (Apr 10) | Internal | Support team training + FAQ doc in Zendesk | Jordan Lee | Complete |
| T-3 (Apr 12) | Press | Embargo briefings with 4 journalists | Tanya Flores | Complete |
| T-1 (Apr 14) | Email | Schedule email blast in Customer.io | Tanya Flores | Complete |
| T-1 (Apr 14) | Product | Feature flag tested in staging, in-app banner configured | Marcus Adeyemi | Complete |
| Launch (Apr 15, 9:00am ET) | Blog | Publish blog post | Tanya Flores | Scheduled |
| Launch (Apr 15, 9:00am ET) | Product | Enable feature flag + in-app banner | Engineering | Scheduled |
| Launch (Apr 15, 9:30am ET) | Email | Send email announcement to all customers | Tanya Flores | Scheduled |
| Launch (Apr 15, 10:00am ET) | Twitter/X | Post launch tweet + thread | Tanya Flores | Scheduled |
| Launch (Apr 15, 10:30am ET) | LinkedIn | Post LinkedIn announcement | Marcus Adeyemi | Scheduled |
| Launch (Apr 15, 11:00am ET) | Press | Embargo lifts — press release on wire | Tanya Flores | Scheduled |
| T+1 (Apr 16) | Community | Post in Slack communities (DevTools, Engineering Leadership) | Tanya Flores | Planned |
| T+3 (Apr 18) | Social | Follow-up tweet with Day 1-3 adoption data | Tanya Flores | Planned |
| T+7 (Apr 22) | Email | Follow-up email to non-openers with different subject line | Tanya Flores | Planned |

## 8. Internal Enablement

**Sales Talking Points:**
- Resolve is included in Team and Enterprise plans — no upsell required. Use it as a retention and expansion conversation.
- Lead with the stat: "23% of questions in Slack go unanswered for 4+ hours." Ask the prospect if that matches their experience.
- Competitive angle: No other Slack integration detects questions using NLP. Competitors rely on keyword matching or manual tagging.

**Support FAQ:**
| Question | Answer |
|----------|--------|
| Does Resolve read my messages? | Resolve processes message text to detect questions. It does not store message content — it stores metadata (question detected, answered/unanswered, timestamp). Messages remain in Slack. |
| Which Slack plans does Resolve work with? | Resolve works with Slack Pro, Business+, and Enterprise Grid. It does not work with Slack Free due to API limitations. |
| Can I choose which channels Resolve monitors? | Yes. During setup, you select which channels to scan. You can add or remove channels at any time in Settings > Resolve > Channels. |

**Known Limitations:**
- Resolve does not yet support Slack DMs — only public and private channels. DM support is on the roadmap for Q3.
- Question detection accuracy drops to 78% for messages under 5 words (e.g., "thoughts?" or "timeline?"). The model is being improved.
- Resolve requires Slack Pro or higher. Slack Free plan APIs do not support the real-time event stream Resolve needs.
```

## Customization

Scale the number of channels based on launch significance. A minor feature update needs an in-app notification, a changelog entry, and maybe a tweet. A major feature launch needs all channels. A new product launch adds press outreach and analyst briefings. For launches without press involvement, remove the Press Release section and Embargo Date. For product-led growth companies without a sales team, remove the Sales Talking Points section and expand the in-app notification and email sections.
