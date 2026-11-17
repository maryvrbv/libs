---
name: launch-checklist
description: "Launch Checklist framework for marketing work. A launch checklist is the step-by-step operational plan that ensures nothing gets missed when you take a product, feature, or campaign live. It breaks the launch into three phases — pre-launch, launch day, and post-launch — with specific tasks, owners, and deadlines. The difference between a smooth launch and a chaotic one is almost always whether someone wrote the checklist. Use when asked for: чек-лист запуска, подготовка к запуску, план запуска."
---

# Launch Checklist

A launch checklist is the step-by-step operational plan that ensures nothing gets missed when you take a product, feature, or campaign live. It breaks the launch into three phases — pre-launch, launch day, and post-launch — with specific tasks, owners, and deadlines. The difference between a smooth launch and a chaotic one is almost always whether someone wrote the checklist.

## Before you start

- **Product context.** This framework needs to know the product: name, what it does, who it serves. Take it from the request, the project's CLAUDE.md or README, or earlier conversation. If it is missing and matters for the output, ask one short question instead of inventing facts.
- **Language.** The framework is written in English; write the deliverable in the language of the request (Russian request → Russian output), and adapt examples, platforms and conventions to that market.
- **No invented numbers.** Placeholders in `[brackets]` are to be filled with real data from the user. Where data is missing, leave a clearly marked placeholder rather than fabricating metrics, quotes or customer names.

## Structure

```markdown
# Launch Checklist: [Product/Feature/Campaign Name]

**Launch Date:** [YYYY-MM-DD]
**Launch Type:** [Product Launch | Feature Launch | Campaign Launch | Event]
**Owner:** [Launch Lead Name]
**Status:** Pre-Launch | Launch Day | Post-Launch | Complete
**Last Updated:** [YYYY-MM-DD]

---

## Launch Overview

**What:** [1-2 sentences — what is launching]
**Why:** [Business driver — why now]
**Audience:** [Who this targets]
**Success Metrics:** [2-3 key metrics you'll measure]

---

## T-Minus Timeline

| Milestone | Date | Owner | Status |
|-----------|------|-------|--------|
| Messaging finalized | T-14 | [Name] | ⬜ |
| Landing page live | T-10 | [Name] | ⬜ |
| Email copy approved | T-7 | [Name] | ⬜ |
| Social assets ready | T-7 | [Name] | ⬜ |
| Internal team briefed | T-5 | [Name] | ⬜ |
| Email scheduled | T-3 | [Name] | ⬜ |
| Social posts scheduled | T-3 | [Name] | ⬜ |
| Final QA / link check | T-1 | [Name] | ⬜ |
| Launch | T-0 | [Name] | ⬜ |
| Performance check | T+1 | [Name] | ⬜ |
| Post-launch report | T+7 | [Name] | ⬜ |
| Retrospective | T+14 | [Name] | ⬜ |

---

## Pre-Launch (T-14 to T-1)

### Messaging & Positioning
- [ ] Value proposition finalized and approved
- [ ] Key messages documented (headline, subhead, 3 benefits)
- [ ] Audience segments identified with segment-specific messaging
- [ ] Competitive differentiation points confirmed
- [ ] Internal FAQ prepared for sales/support teams

### Content & Creative
- [ ] Landing page copy written and approved
- [ ] Landing page designed and built
- [ ] Email announcement copy written and approved
- [ ] Email nurture/follow-up sequence drafted
- [ ] Blog post or press release drafted (if applicable)
- [ ] Social media posts written for each platform
- [ ] Visual assets created (social graphics, email headers, ads)
- [ ] Video content produced (if applicable)
- [ ] All copy reviewed for brand voice consistency

### Technical & Operations
- [ ] Landing page live and tested on mobile + desktop
- [ ] UTM parameters set for all links
- [ ] Analytics tracking confirmed (GA, pixel, conversion events)
- [ ] Email lists segmented and ready
- [ ] Email deliverability tested (send to seed list)
- [ ] Social posts scheduled in publishing tool
- [ ] Redirects and SEO metadata configured
- [ ] Payment/checkout flow tested end-to-end (if applicable)
- [ ] Support team briefed with talking points and escalation path

### Internal Readiness
- [ ] Sales team has positioning doc and demo script
- [ ] Support team has FAQ and known issues list
- [ ] Leadership notified of launch date and plan
- [ ] Cross-functional dependencies confirmed (product, engineering, legal)
- [ ] Go/no-go decision confirmed — all stakeholders green-lighted

---

## Launch Day (T-0)

### Morning (Pre-Launch)
- [ ] Final check: landing page live, links working, tracking firing
- [ ] Confirm email is queued and send time correct
- [ ] Confirm social posts are scheduled
- [ ] Team Slack/comms channel open for real-time coordination
- [ ] Monitoring dashboards open (analytics, email, social)

### Launch Window
- [ ] Email sent — confirm delivery and open rates in first hour
- [ ] Social posts published — confirm they went live, engage with replies
- [ ] Blog post / press release published
- [ ] In-app announcement triggered (if applicable)
- [ ] Paid ads activated (if applicable)
- [ ] Monitor for broken links, errors, or unexpected issues
- [ ] Respond to early comments, questions, shares

### End of Day
- [ ] Quick metrics snapshot: email opens, clicks, landing page visits, conversions
- [ ] Flag any issues for immediate fix vs. next-day fix
- [ ] Send internal "Day 1" update to stakeholders

---

## Post-Launch (T+1 to T+14)

### Day 1-3
- [ ] Review email performance (open rate, CTR, unsubscribes)
- [ ] Review landing page analytics (visits, bounce rate, conversion rate)
- [ ] Review social engagement (impressions, clicks, shares)
- [ ] Address customer questions or support tickets
- [ ] Send follow-up email to non-openers (if planned)
- [ ] Adjust paid ad targeting/budget based on early data

### Day 4-7
- [ ] Publish follow-up content (blog post, social thread, customer story)
- [ ] Review full-week metrics against targets
- [ ] Compile initial performance report
- [ ] Identify top-performing channel and double down
- [ ] Identify underperforming channel and diagnose

### Day 7-14
- [ ] Send post-launch nurture email
- [ ] Gather customer feedback (survey, interviews, support themes)
- [ ] Write launch retrospective
- [ ] Document what worked and what to repeat
- [ ] Document what failed and what to change
- [ ] Archive launch assets for future reference
- [ ] Update campaign performance dashboard

---

## Contingency Plan

| Scenario | Response | Owner |
|----------|----------|-------|
| Landing page goes down | Switch to backup URL, notify team, ETA for fix | [Name] |
| Email doesn't send on time | Manual send, adjust social timing | [Name] |
| Negative response / PR issue | Pause paid, draft response, escalate to [Name] | [Name] |
| Conversion rate below [X]% after 24h | Review landing page, check tracking, test checkout | [Name] |
| Major bug reported | Pull launch announcement, fix, re-launch | [Name] |

---

## Channel-Specific Checklists

### Email
- [ ] Subject line A/B test set up
- [ ] Preview text written
- [ ] From name and reply-to confirmed
- [ ] Mobile rendering tested
- [ ] Unsubscribe link working
- [ ] Personalization tokens tested
- [ ] Send time optimized for audience timezone

### Social Media
- [ ] Platform-native format for each network (no cross-posting identical copy)
- [ ] Hashtags researched and added
- [ ] Images/videos meet platform specs (dimensions, file size)
- [ ] Links shortened with UTMs
- [ ] Team members tagged for amplification
- [ ] Community manager available for replies during launch window

### Paid Ads
- [ ] Ad creative approved and uploaded
- [ ] Audiences configured and reviewed
- [ ] Budget set with daily caps
- [ ] Conversion tracking pixel verified
- [ ] A/B variants set up
- [ ] Negative keywords added (Google)
- [ ] Billing confirmed and active

### Landing Page
- [ ] Page loads in under 3 seconds
- [ ] Above-the-fold CTA visible without scrolling
- [ ] Form works and submissions route correctly
- [ ] Social proof elements current (testimonials, logos, numbers)
- [ ] Mobile responsive — tested on 3+ devices
- [ ] Thank you / confirmation page or email working
- [ ] Exit intent or secondary CTA configured (if applicable)
```

## How to Write Each Section

**Launch Overview**
Four lines. What, why, audience, metrics. If you can't state these clearly, you're not ready to launch. This section exists so anyone picking up the checklist mid-stream knows what they're working toward.

Good: "What: Launching AI writing assistant for marketing teams. Why: Competitive window — two competitors raised prices this month. Audience: Marketing managers at companies with 50-500 employees. Success metrics: 200 signups in first week, 15% email CTR, $5K in first-week revenue."

Bad: "We're launching our new product to grow the business."

**T-Minus Timeline**
Work backward from launch day. Every milestone has a specific date (not "a few days before"), an owner, and a status. This is the project management view — stakeholders check this to know if the launch is on track. If any milestone slips, the launch date discussion happens immediately, not on T-1.

**Pre-Launch Checklist**
Group tasks by function, not by date. This makes it easy for different team members to scan their section. Every checkbox is binary — done or not done. If a task is "partially done," break it into smaller tasks. Do not launch with unchecked boxes unless you've explicitly documented why that item is acceptable to skip.

**Launch Day**
Divide into morning, launch window, and end of day. The morning check is your pre-flight — verify everything is ready before you flip the switch. The launch window is active execution and monitoring. End of day is the first assessment. Have a dedicated communication channel open all day.

**Post-Launch**
The launch isn't over when the email sends. The first two weeks are critical for optimization, follow-up, and learning. Break post-launch into day ranges so tasks don't pile up. The retrospective at T+14 is non-negotiable — if you don't document what you learned, you'll repeat the same mistakes.

**Contingency Plan**
Plan for the top 5 things that could go wrong. For each, define the trigger (what tells you it's happening), the response (what you do), and the owner (who acts). Write this before launch day, not during it. When things break at launch, you need a playbook, not a brainstorm.

## Conventions

- Complete the pre-launch checklist in order — later tasks depend on earlier ones being done right.
- Every task has a single owner. "Marketing team" is not an owner.
- Use ISO dates (YYYY-MM-DD) for all dates. T-minus notation (T-7, T-3) is fine for the timeline table but convert to real dates before launch week.
- Check off tasks in real-time, not at the end of the day. The checklist should reflect current state at any moment.
- The go/no-go decision happens at T-1 or T-2. If critical tasks are incomplete, delay. The cost of a delayed launch is almost always lower than the cost of a broken one.
- Archive the completed checklist after the retrospective. It becomes the template for the next launch.
- Channel-specific checklists are additive — use only the channels relevant to your launch.
- If you skip a task, note why. "N/A — no paid ads for this launch" is fine. An unchecked box with no explanation is a risk.
- Test everything in the order a customer would experience it: see ad → click → land on page → read → click CTA → complete action → receive confirmation.
- Schedule sends for optimal timezone windows. Don't launch at 5pm on a Friday unless your audience is most active then (they're not).

## Anti-Patterns

- Do NOT launch without testing the full customer journey end-to-end. Clicking every link, filling every form, completing every checkout. Every time.
- Do NOT skip the go/no-go decision. "We'll just launch and see" is how broken launches happen.
- Do NOT assign tasks without deadlines. "Before launch" is not a deadline.
- Do NOT cross-post identical content across platforms. Each platform has its own format, tone, and audience expectations.
- Do NOT launch on a Friday afternoon unless you have weekend coverage for monitoring and support.
- Do NOT forget UTM parameters. If you can't attribute traffic to the launch, you can't measure ROI.
- Do NOT schedule all emails and posts for the exact same moment. Stagger by channel — email first, then social 30-60 minutes later, then paid ads after organic has seeded.
- Do NOT skip the post-launch phase. The launch email is not the finish line. Follow-up, optimization, and retrospective are where the real value gets captured.
- Do NOT write the contingency plan after launch day. By then it's too late.
- Do NOT launch without briefing support. The first customer question that goes unanswered damages trust more than any marketing copy can build.
- Do NOT treat the checklist as optional. If it's on the list, it matters. If it doesn't matter, remove it from the list.
- Do NOT ignore early signals. If conversion is 0% after 100 landing page visits on launch day, something is broken. Investigate immediately.
- Do NOT forget mobile. Test everything on a phone. More than half your audience will see the launch on mobile first.

## Examples

```markdown
# Launch Checklist: Planwise AI — Smart Scheduling Feature

**Launch Date:** 2026-04-15
**Launch Type:** Feature Launch
**Owner:** Sarah Kim, Product Marketing Manager
**Status:** Pre-Launch
**Last Updated:** 2026-03-29

---

## Launch Overview

**What:** AI-powered scheduling assistant that auto-blocks focus time based on task deadlines and meeting patterns.
**Why:** #1 requested feature for 6 months. Competitor Clockwork launched similar feature in Feb — we need to ship before users switch.
**Audience:** Existing Planwise users (12,400 active) + new prospects from paid campaign.
**Success Metrics:** 2,000 feature activations in first 14 days, 40% D7 retention on the feature, 300 new signups attributed to launch campaign.

---

## T-Minus Timeline

| Milestone | Date | Owner | Status |
|-----------|------|-------|--------|
| Messaging finalized | 2026-04-01 | Sarah | ✅ |
| Landing page live | 2026-04-04 | Dev team | ✅ |
| Email copy approved | 2026-04-08 | Sarah | ✅ |
| Social assets ready | 2026-04-08 | Jess (design) | 🔄 In progress |
| Internal team briefed | 2026-04-10 | Sarah | ⬜ |
| Email scheduled | 2026-04-12 | Sarah | ⬜ |
| Social posts scheduled | 2026-04-12 | Marcus | ⬜ |
| Final QA / link check | 2026-04-14 | Sarah + Marcus | ⬜ |
| Launch | 2026-04-15 | Sarah | ⬜ |
| Performance check | 2026-04-16 | Sarah | ⬜ |
| Post-launch report | 2026-04-22 | Sarah | ⬜ |
| Retrospective | 2026-04-29 | Sarah | ⬜ |

## Pre-Launch (Completed / In Progress)

### Messaging & Positioning
- [x] Value proposition: "Planwise now protects your focus time automatically — so you ship more and meet less."
- [x] Key messages: Headline ("Your calendar just got smarter"), 3 benefits (auto-blocks focus time, learns from your patterns, respects your preferences)
- [x] Segments: power users (show advanced settings), casual users (show simplicity), prospects (show differentiation vs. Clockwork)
- [x] Competitive angle: "Unlike Clockwork, Smart Scheduling works inside the tools you already use — no separate app."
- [ ] Internal FAQ for support — draft done, needs review by support lead (due Apr 10)

### Content & Creative
- [x] Landing page: planwise.com/smart-scheduling — live, reviewed
- [x] Email announcement: "Your Calendar Just Got Smarter" — approved
- [x] Follow-up email for non-activators at Day 3 — drafted
- [ ] Blog post: "How We Built Smart Scheduling" — in review (due Apr 10)
- [ ] Social posts: 4 tweets, 2 LinkedIn posts, 1 Instagram carousel — 2/7 done (due Apr 8)
- [x] Hero video: 45-second product demo — final cut approved
- [ ] Ad creative: 3 variants for LinkedIn campaign — in design (due Apr 8)

### Technical
- [x] Landing page tested mobile + desktop
- [x] UTM parameters: ?utm_source=email&utm_medium=launch&utm_campaign=smart-scheduling
- [x] GA4 conversion event: smart_scheduling_activated
- [x] Existing user email list segmented: power users (3,200), regular (5,800), dormant (3,400)
- [ ] LinkedIn pixel verified on landing page — waiting on dev (due Apr 8)
- [ ] Email seed test — scheduled for Apr 10

## Contingency Plan

| Scenario | Response | Owner |
|----------|----------|-------|
| Feature has critical bug on launch day | Kill feature flag, send "coming soon" update, fix and re-launch | Eng lead + Sarah |
| Email bounce rate > 5% | Pause sends, check list hygiene, resend to clean segment | Sarah |
| Landing page converts < 5% after 500 visits | Review hero copy, test shorter form, check page speed | Sarah + Marcus |
| Negative social response about AI/privacy | Publish pre-drafted privacy FAQ, pause paid, respond 1:1 | Sarah |
| Clockwork launches competing update same week | Accelerate launch to Apr 14, add comparison section to landing page | Sarah |
```
