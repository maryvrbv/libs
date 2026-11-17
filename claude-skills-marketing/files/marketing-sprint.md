# [Product Name]

[Brief description of the product/project.]

---

## Skill: Marketing Sprint

A marketing sprint is a focused 2-week cycle where the marketing team commits to a single growth goal and runs experiments to hit it. Borrowed from engineering sprint methodology but adapted for marketing — where the work is creative, the feedback loops are longer, and "done" is harder to define. Sprints prevent the scattered, reactive work that kills marketing impact.

### Structure

```markdown
# Marketing Sprint: [Sprint Name]

**Sprint #:** [Number]
**Period:** [YYYY-MM-DD] to [YYYY-MM-DD]
**Sprint Goal:** [One sentence — the single outcome this sprint targets]
**North Star Metric:** [The metric this sprint moves]
**Baseline:** [Current value]
**Target:** [Value by end of sprint]
**Sprint Lead:** [Name]

---

## 1. Sprint Goal & Context

**Goal:** [One sentence — specific, measurable, time-bound]

**Why this goal:**
[2-3 sentences — what makes this the highest-leverage focus for the next 2 weeks. What data or insight drove this decision.]

**What we're NOT doing this sprint:**
- [Explicitly listed work that's out of scope to prevent drift]
- [Work that's important but not this sprint's focus]

## 2. Backlog (Ranked by ICE Score)

| # | Initiative | Impact (1-10) | Confidence (1-10) | Ease (1-10) | ICE Score | Status |
|---|-----------|---------------|-------------------|-------------|-----------|--------|
| 1 | [Initiative] | [X] | [X] | [X] | [X] | Selected / Backlog |
| 2 | [Initiative] | [X] | [X] | [X] | [X] | Selected / Backlog |
| 3 | [Initiative] | [X] | [X] | [X] | [X] | Selected / Backlog |
| 4 | [Initiative] | [X] | [X] | [X] | [X] | Backlog |
| 5 | [Initiative] | [X] | [X] | [X] | [X] | Backlog |

**ICE Scoring:**
- **Impact:** How much will this move the sprint metric? (1 = barely, 10 = game-changing)
- **Confidence:** How sure are we this will work? (1 = pure guess, 10 = proven in similar context)
- **Ease:** How quickly can we execute? (1 = full sprint, 10 = half a day)
- **Score:** Impact × Confidence × Ease

**Selected for this sprint:** Top [2-3] initiatives. Do not select more than 3. Each must be completable within the sprint.

## 3. Sprint Board

### To Do

| Task | Initiative | Owner | Due | Est. Hours |
|------|-----------|-------|-----|-----------|
| [Task] | [Initiative #] | [Name] | [Date] | [X]h |
| [Task] | [Initiative #] | [Name] | [Date] | [X]h |

### In Progress

| Task | Initiative | Owner | Started | Est. Completion |
|------|-----------|-------|---------|----------------|
| [Task] | [Initiative #] | [Name] | [Date] | [Date] |

### Done

| Task | Initiative | Owner | Completed | Result |
|------|-----------|-------|-----------|--------|
| [Task] | [Initiative #] | [Name] | [Date] | [Outcome] |

### Blocked

| Task | Initiative | Owner | Blocker | Needed From |
|------|-----------|-------|---------|-------------|
| [Task] | [Initiative #] | [Name] | [What's blocking] | [Who can unblock] |

## 4. Experiment Tracker

| # | Hypothesis | Metric | Variant A | Variant B | Sample Size | Duration | Result |
|---|-----------|--------|-----------|-----------|-------------|----------|--------|
| 1 | [If X then Y by Z%] | [Metric] | [Control] | [Change] | [N needed] | [Days] | Pending / Win / Lose / Inconclusive |
| 2 | [If X then Y by Z%] | [Metric] | [Control] | [Change] | [N needed] | [Days] | Pending |

## 5. Daily Check-In Format

**Duration:** 10 minutes max. Async-first (Slack thread). Sync only if blocked.

Each team member posts:
1. **Yesterday:** [What I shipped — not what I worked on, what's done]
2. **Today:** [What I'm shipping today — specific deliverable]
3. **Blocked:** [What's preventing progress — name the person who can unblock]

Rules:
- No status updates longer than 3 bullets
- If blocked, tag the person who can unblock — don't wait for the standup
- Skip if nothing changed since yesterday

## 6. Mid-Sprint Check (Day 7)

**Date:** [YYYY-MM-DD]

| Question | Answer |
|----------|--------|
| Are we on track to hit the sprint target? | [Yes / No — with data] |
| What's the biggest risk to the goal? | [Risk] |
| Do we need to cut scope? | [What to cut and why] |
| Any new data that changes our approach? | [Data point or "None"] |
| Decision: Continue / Pivot / Adjust | [Decision with rationale] |

## 7. Sprint Review (Day 14)

**Date:** [YYYY-MM-DD]

### Results

| Metric | Baseline | Target | Actual | Δ | Hit Target? |
|--------|----------|--------|--------|---|-------------|
| [Sprint metric] | [Start] | [Goal] | [End] | [Change] | ✅ / ❌ |
| [Supporting metric] | [Start] | [Goal] | [End] | [Change] | ✅ / ❌ |

### Initiative Results

| # | Initiative | Status | Key Result | Keep / Kill / Iterate |
|---|-----------|--------|------------|----------------------|
| 1 | [Initiative] | Complete / Partial / Abandoned | [What happened] | [Decision] |
| 2 | [Initiative] | [Status] | [Result] | [Decision] |

### Experiment Results

| # | Hypothesis | Result | Confidence | Decision |
|---|-----------|--------|------------|----------|
| 1 | [Hypothesis] | [Win/Lose/Inconclusive] | [Statistical confidence] | [Ship / Kill / Extend] |

### Learnings

**What worked:**
- [Specific thing that drove results — with data]
- [Specific thing]

**What didn't work:**
- [Specific thing that underperformed — with data]
- [Specific thing]

**Surprises:**
- [Unexpected finding — with data]

## 8. Retrospective

**Format:** 15 minutes. Whole sprint team.

| Category | Item |
|----------|------|
| Keep doing | [What went well that we should repeat] |
| Keep doing | [What went well] |
| Stop doing | [What hurt us or wasted time] |
| Stop doing | [What hurt us] |
| Start doing | [What we should try next sprint] |
| Start doing | [What we should try] |

**Process improvements for next sprint:**
- [ ] [Specific change to how we run sprints]
- [ ] [Specific change]

**Next sprint goal (preliminary):**
[One sentence — what the next 2 weeks should focus on, based on what we learned]
```

### How to Write Each Section

**Sprint Goal & Context**
One goal. Not two. Not three. One. If your sprint has multiple goals, you have no goal. The goal must be specific enough that on Day 14, you can look at a number and say "we hit it" or "we didn't." Include why this is the highest-leverage focus — what data, feedback, or strategic priority makes this more important than everything else you could be doing.

Good: "Increase email signup conversion rate from 2.1% to 3.5% on the pricing page."

Bad: "Improve our marketing." / "Grow the email list and also launch the new campaign and update the website."

The "what we're NOT doing" section is critical. Marketing teams are magnets for scope creep. Listing 3-4 things explicitly out of scope gives the team permission to say no during the sprint.

**ICE Backlog**
List 5-8 possible initiatives, score them, pick the top 2-3. ICE scoring is fast and imperfect — that's the point. You're making quick prioritization decisions, not building a business case. Impact is how much it moves the sprint metric. Confidence is how sure you are. Ease is how fast you can execute.

Score honestly. A "10 Impact, 10 Confidence, 10 Ease" initiative doesn't exist. If everything scores above 7 on Confidence, you're not being honest about uncertainty. If everything scores above 7 on Ease, you're underestimating the work.

Select 2-3 initiatives maximum. Each must be completable within the sprint. If an initiative takes longer than 2 weeks, break it into a smaller version that delivers a measurable result within the sprint.

**Sprint Board**
Four columns: To Do, In Progress, Done, Blocked. Break each initiative into tasks that take 2-8 hours. Anything smaller is overhead to track. Anything larger needs to be broken down further. Move cards in real-time — the board should reflect current state at any moment. If a task sits in "In Progress" for more than 2 days, it's either too large or blocked.

**Experiment Tracker**
Every experiment needs a hypothesis in the format "If [change], then [metric] will [improve by X%] because [rationale]." Without the "because," you're guessing, not testing. Define the sample size needed for statistical significance before you start. Define what "win" looks like before you see the results. Post-hoc success criteria are not success criteria.

**Daily Check-In**
Keep it to 10 minutes or async. Three questions: what shipped yesterday, what ships today, what's blocked. "Shipped" means done — not "worked on." If your standups are 30 minutes of status updates, they're meetings, not check-ins. Cut ruthlessly.

**Mid-Sprint Check**
On Day 7, stop and assess. Are you on track? If the metric hasn't moved at all, something needs to change — don't wait until Day 14 to discover the sprint was wasted. Be willing to cut scope, pivot to a different initiative, or double down on what's working. This is a 15-minute decision point, not a planning session.

**Sprint Review**
Compare actual results to targets. For each initiative, decide: keep (it's working, continue), kill (it didn't work, stop), or iterate (promising but needs adjustment). Same for experiments. The review is about data, not feelings. "It felt like it went well" is not a review — show the numbers.

**Retrospective**
Keep/Stop/Start format. Focus on process, not results — the review covers results. What about how you worked helped or hurt? Commit to 1-2 specific process changes for the next sprint. If you do retrospectives without changing anything, stop doing retrospectives.

### Conventions

- Sprints are exactly 2 weeks. No "we'll extend it a few days." If you didn't finish, carry the work to the next sprint with a clear explanation.
- One sprint goal per sprint. Sub-metrics are fine. Multiple goals are not.
- Select 2-3 initiatives maximum. More than 3 means none get the focus they need.
- ICE scores are discussed as a team, not assigned by one person. Different perspectives surface blind spots.
- Update the sprint board daily. A board that's updated weekly is a report, not a management tool.
- Every experiment needs a hypothesis written before execution starts. No post-hoc storytelling.
- Mid-sprint check is mandatory. If you skip it, you lose your only chance to course-correct.
- The retrospective produces 1-2 concrete changes for the next sprint. If it produces zero, the retrospective failed.
- Sprint reviews are shared with stakeholders. This builds trust and visibility into marketing's work.
- Time-box ruthlessly. If a task is eating the sprint, either cut scope or move it to the backlog.
- Keep a running backlog across sprints. Ideas from this sprint that didn't make the cut should be scored and ranked for next sprint.

### Anti-Patterns

- Do NOT set vague sprint goals like "improve marketing performance" or "do more content." If you can't measure it, you can't sprint toward it.
- Do NOT select more than 3 initiatives per sprint. Splitting focus across 5 initiatives means none get enough attention to produce results.
- Do NOT skip ICE scoring because "we already know what to work on." The scoring process surfaces disagreements and assumptions that matter.
- Do NOT let tasks sit in "In Progress" for more than 2 days without investigating. Something is wrong — it's too big, it's blocked, or it's not actually being worked on.
- Do NOT run experiments without pre-defined success criteria. Deciding what "good" looks like after seeing results is confirmation bias, not analysis.
- Do NOT skip the mid-sprint check. Two weeks is too long to wait before discovering you're off track.
- Do NOT carry over more than 1 initiative from the previous sprint. If you're consistently carrying work over, your sprint planning is too ambitious.
- Do NOT use sprints for BAU (business-as-usual) work. Newsletters, social posting, and recurring tasks are not sprint initiatives. Sprint initiatives are focused bets to move a specific metric.
- Do NOT run a retrospective without committing to at least one change. A retro that produces "let's keep doing what we're doing" every sprint is a wasted meeting.
- Do NOT let stakeholder requests derail a mid-sprint. If it's truly urgent, it replaces an existing initiative — it doesn't get added on top.
- Do NOT confuse busyness with progress. Shipping 15 tasks that don't move the sprint metric is worse than shipping 3 that do.
- Do NOT plan sprints in isolation. The sprint goal should connect to the quarterly marketing goal. If it doesn't, either the sprint is wrong or the quarterly goal needs updating.

### Examples

```markdown
# Marketing Sprint: Activation Rate Boost

**Sprint #:** 7
**Period:** 2026-04-07 to 2026-04-18
**Sprint Goal:** Increase trial-to-paid conversion rate from 4.2% to 6.0%
**North Star Metric:** Trial-to-paid conversion rate (14-day window)
**Baseline:** 4.2% (March 2026 average, n=1,840 trials)
**Target:** 6.0%
**Sprint Lead:** Marcus Rivera

---

## 1. Sprint Goal & Context

**Goal:** Increase trial-to-paid conversion rate from 4.2% to 6.0% within 2 weeks.

**Why this goal:**
Our CAC is $42 but trial-to-paid is only 4.2%, making effective CAC per paying customer $1,000. Competitor benchmarks show 6-8% is achievable for our category. User research from March revealed that 62% of churned trialists "didn't have time to set it up properly" — suggesting onboarding friction, not product-market fit, is the bottleneck. Fixing conversion is higher leverage than increasing top-of-funnel volume.

**What we're NOT doing this sprint:**
- New blog content (paused — existing pipeline covers next 2 weeks)
- Paid acquisition optimization (current campaigns running as-is)
- Landing page redesign (scheduled for Sprint 8)
- Social media campaigns (Jess maintains posting cadence, no new initiatives)

## 2. Backlog (Ranked by ICE Score)

| # | Initiative | Impact | Confidence | Ease | ICE | Status |
|---|-----------|--------|------------|------|-----|--------|
| 1 | Onboarding email sequence rewrite (5 emails, focus on first-value moment) | 8 | 7 | 7 | 392 | Selected |
| 2 | In-app checklist targeting "first project created" milestone | 9 | 6 | 6 | 324 | Selected |
| 3 | Day-3 personal outreach to trialists who haven't activated | 7 | 8 | 8 | 448 | Selected |
| 4 | Pricing page clarity improvements | 6 | 5 | 8 | 240 | Backlog |
| 5 | Video walkthrough embedded in trial dashboard | 8 | 5 | 4 | 160 | Backlog |
| 6 | Exit survey for churned trialists | 5 | 6 | 9 | 270 | Backlog |

**Selected:** Initiatives 1, 2, and 3. Initiative 3 scored highest on ICE but is lowest leverage long-term (manual process). Running it this sprint to generate quick learnings while building the scalable solutions (1 and 2).

## 3. Sprint Board

### To Do

| Task | Initiative | Owner | Due | Est. Hours |
|------|-----------|-------|-----|-----------|
| Map current onboarding email sequence and identify gaps | 1 | Sarah | Apr 8 | 3h |
| Write 5 new onboarding emails focused on "first project" milestone | 1 | Sarah | Apr 10 | 8h |
| Design email templates (5 emails) | 1 | Jess | Apr 11 | 4h |
| Set up A/B test: old sequence vs. new sequence | 1 | Marcus | Apr 12 | 3h |
| Define in-app checklist steps and copy | 2 | Marcus | Apr 9 | 4h |
| Work with eng to implement checklist | 2 | Marcus + Dev | Apr 14 | 6h |
| Build trialist outreach list and write personal email template | 3 | Sarah | Apr 8 | 3h |
| Send Day-3 outreach to first batch (est. 120 trialists) | 3 | Sarah | Apr 10 | 4h |
| Send Day-3 outreach to second batch | 3 | Sarah | Apr 15 | 4h |
| Track and log responses from personal outreach | 3 | Sarah | Ongoing | 1h/day |

### In Progress

(Empty — sprint starts Apr 7)

### Done

(Empty — sprint starts Apr 7)

## 4. Experiment Tracker

| # | Hypothesis | Metric | Variant A | Variant B | Sample | Duration | Result |
|---|-----------|--------|-----------|-----------|--------|----------|--------|
| 1 | If we rewrite onboarding emails to focus on "create first project" milestone, trial-to-paid will increase by 30% because users who create a project convert at 3x the rate of those who don't | Trial-to-paid rate | Current 5-email sequence | New 5-email sequence (first-project focused) | 400/arm | 14 days | Pending |
| 2 | If we send personal outreach on Day 3 to inactive trialists, 20% will activate because the barrier is confusion, not disinterest | Day-3 activation rate | No outreach (control) | Personal email from team member | 120 outreach / compare to historical | 10 days | Pending |

## 7. Sprint Review (Day 14)

### Results

| Metric | Baseline | Target | Actual | Δ | Hit Target? |
|--------|----------|--------|--------|---|-------------|
| Trial-to-paid rate | 4.2% | 6.0% | 5.4% | +1.2pp (+29%) | ❌ (missed by 0.6pp) |
| First-project creation rate | 31% | 45% | 42% | +11pp (+35%) | ✅ (close) |
| Day-3 activation rate | 18% | 25% | 27% | +9pp (+50%) | ✅ |

### Initiative Results

| # | Initiative | Status | Key Result | Keep / Kill / Iterate |
|---|-----------|--------|------------|----------------------|
| 1 | Onboarding email rewrite | Complete | New sequence: 5.1% conversion vs. 4.2% control (early, n=380) | Keep — extend test to full sample |
| 2 | In-app checklist | Partial | Shipped Day 10 (delayed by eng). First-project rate up 11pp. | Iterate — add progress indicators |
| 3 | Personal outreach | Complete | 27% activation rate on outreach group. 8 replies with qualitative feedback. | Kill (manual) but use learnings to automate |

### Learnings

**What worked:**
- Personal outreach revealed that 5/8 respondents didn't know they could invite team members during trial — this is a product gap, not a marketing gap
- New onboarding email sequence with "create your first project in 3 minutes" subject line had 2x click rate vs. old "Welcome to Planwise" email

**What didn't work:**
- In-app checklist shipped late (Day 10) — only 4 days of data. Not enough to evaluate. Need full sprint of exposure.
- Email #4 in new sequence (case study) had lowest engagement — trialists at Day 7 want help, not social proof

**Surprises:**
- Trial-to-paid improved most for solo users (5.8%) vs. team trials (4.0%). Team trials may need a different activation path entirely.

## 8. Retrospective

| Category | Item |
|----------|------|
| Keep doing | ICE scoring as a team — surfaced that personal outreach would generate learnings fast |
| Keep doing | Daily async check-ins in Slack — kept everyone aligned without meetings |
| Stop doing | Depending on eng for sprint-critical features without pre-committed capacity |
| Stop doing | Tracking too many secondary metrics — focus on the sprint metric only |
| Start doing | Pre-book eng time for marketing sprints 1 sprint ahead |
| Start doing | Add "learnings" column to daily check-in — capture insights in real-time |

**Process improvements for next sprint:**
- [ ] Book eng capacity for Sprint 8 by Apr 18
- [ ] Reduce experiment tracker to 2 experiments max — we ran out of bandwidth analyzing both

**Next sprint goal (preliminary):**
Reduce onboarding time-to-first-project from 47 minutes to under 15 minutes (based on sprint 7 learning that first-project creation is the key activation milestone).
```
