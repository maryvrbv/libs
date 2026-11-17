---
name: email-sequence
description: "Email Sequence framework for marketing work. A multi-email sequence framework for designing welcome, nurture, re-engagement, and conversion campaigns. The marketer uses this when building automated email flows that guide subscribers toward a specific action over time — onboarding new users, warming up leads, recovering churning customers, or promoting a launch. Use when asked for: цепочка писем, welcome-серия, прогревающая цепочка, email-автоматизация."
---

# Email Sequence

A multi-email sequence framework for designing welcome, nurture, re-engagement, and conversion campaigns. The marketer uses this when building automated email flows that guide subscribers toward a specific action over time — onboarding new users, warming up leads, recovering churning customers, or promoting a launch.

## Before you start

- **Product context.** This framework needs to know the product: name, what it does, who it serves. Take it from the request, the project's CLAUDE.md or README, or earlier conversation. If it is missing and matters for the output, ask one short question instead of inventing facts.
- **Language.** The framework is written in English; write the deliverable in the language of the request (Russian request → Russian output), and adapt examples, platforms and conventions to that market.
- **No invented numbers.** Placeholders in `[brackets]` are to be filled with real data from the user. Where data is missing, leave a clearly marked placeholder rather than fabricating metrics, quotes or customer names.

## Structure

```markdown
# Email Sequence: [Sequence Name]

**Author:** [Name]
**Status:** Draft | In Review | Approved | Live
**Sequence Type:** [Welcome | Nurture | Re-engagement | Launch | Post-Purchase | Upgrade]
**Trigger:** [What action starts this sequence]
**Goal:** [The specific action you want recipients to take by sequence end]
**ESP:** [Mailchimp | ConvertKit | Customer.io | HubSpot | ActiveCampaign | Other]

---

## 1. Sequence Strategy

**Target Audience:** [Who enters this sequence — be specific about segment]
**Entry Criteria:** [Exact trigger condition — signup, purchase, inactivity, tag applied]
**Exit Criteria:** [When someone leaves the sequence — goal completed, unsubscribe, moved to another sequence]
**Exclusions:** [Who should NOT enter this sequence even if they meet the trigger]
**Sending Window:** [Days/times emails are sent — e.g., weekdays 9am-11am recipient timezone]
**Expected Completion Rate:** [% of entrants expected to receive all emails]

## 2. Segmentation

| Segment | Definition | Sequence Variation |
|---------|-----------|-------------------|
| [Segment 1] | [How this group is identified] | [What changes for them — different subject line, content, timing] |
| [Segment 2] | [How identified] | [What changes] |
| [Segment 3] | [How identified] | [What changes] |

## 3. Sequence Map

| # | Email Name | Send Timing | Goal | Success Metric |
|---|-----------|-------------|------|----------------|
| 1 | [Email name] | [Trigger + 0 min / 1 hour / 1 day] | [What this email should accomplish] | [Open rate / click rate / reply rate / conversion] |
| 2 | [Email name] | [Trigger + X days] | [Goal] | [Metric] |
| 3 | [Email name] | [Trigger + X days] | [Goal] | [Metric] |
| 4 | [Email name] | [Trigger + X days] | [Goal] | [Metric] |
| 5 | [Email name] | [Trigger + X days] | [Goal] | [Metric] |
| 6 | [Email name] | [Trigger + X days] | [Goal] | [Metric] |

### Sequence Flow Diagram

```
[Trigger] → Email 1 (Day 0)
              ↓
         [Wait X days]
              ↓
         Email 2 (Day X)
              ↓
    [Condition check: Did they take action?]
         ↓ Yes              ↓ No
    [Exit: Goal met]    Email 3 (Day X)
                              ↓
                         [Continue...]
```

## 4. Individual Emails

### Email 1: [Email Name]

**Send Timing:** [When relative to trigger]
**Subject Line:** [Primary subject line]
**Subject Line B:** [A/B test variant]
**Preview Text:** [40-90 characters — the text that appears after the subject in the inbox]
**From Name:** [Sender name]
**From Email:** [Sender email]

**Purpose:** [What this specific email needs to accomplish]

**Body:**

```
[Opening line — personal, direct, sets context]

[2-3 short paragraphs of body content]

[CTA — clear, single action]

[Sign-off]
```

**CTA:** [Button/link text]
**CTA URL:** [Destination]

**Conditional Logic:**
- If [condition], then [variation or skip]
- If [condition], then [variation or skip]

---

### Email 2: [Email Name]

[Same format as Email 1]

---

### Email 3: [Email Name]

[Same format as Email 1]

---

### Email 4: [Email Name]

[Same format as Email 1]

---

### Email 5: [Email Name]

[Same format as Email 1]

---

### Email 6: [Email Name]

[Same format as Email 1]

---

## 5. A/B Testing Plan

| Test | Variable | Variant A | Variant B | Sample Size | Duration | Success Metric |
|------|----------|-----------|-----------|-------------|----------|----------------|
| [Test 1] | [Subject line / send time / CTA / body length] | [A] | [B] | [% of audience] | [Days] | [Metric] |
| [Test 2] | [Variable] | [A] | [B] | [Size] | [Duration] | [Metric] |

## 6. Performance Benchmarks

| Metric | Sequence Target | Industry Average |
|--------|----------------|-----------------|
| Open rate | [Target]% | [Average]% |
| Click rate | [Target]% | [Average]% |
| Unsubscribe rate | < [Target]% per email | [Average]% |
| Sequence completion rate | [Target]% | [Average]% |
| Conversion rate (goal action) | [Target]% | [Average]% |
```

## How to Write Each Section

**Sequence Strategy:** Define the single goal of the sequence before writing any email. Every email in the sequence must move the recipient closer to that goal. If an email does not serve the goal, it does not belong in the sequence.

Good: "Goal: Get new trial users to complete their first project within 7 days. Every email teaches one step of project setup and tracks whether they have completed it."

Bad: "Goal: Engage new users and keep them interested."

**Segmentation:** Not everyone in the sequence should get the same content. Identify meaningful segments and specify what changes. Segmentation can be as simple as changing the subject line for different industries or as complex as entirely different email content based on behavior.

Good: "Segment: Users who connected an integration on Day 1 skip Email 3 (integration setup guide) and receive Email 3b (power user tips) instead."

Bad: "We'll personalize the emails."

**Sequence Map:** This is the bird's-eye view. Every email has a name, a timing, a goal, and a metric. The timing column should be specific — "Trigger + 2 days" not "a few days later." The map should make it obvious how the sequence progresses and where branch points exist.

**Individual Emails:** Subject lines are 6-10 words. Preview text complements the subject — it should not repeat it. The body opens with a line that is personal or directly relevant, not "I hope this email finds you well." Every email has exactly one CTA. The CTA is a specific action, not "check it out."

Good subject line: "Your project dashboard is waiting"
Bad subject line: "Welcome to Planwise! Here's Everything You Need to Know to Get Started"

**A/B Testing Plan:** Test one variable per email. Subject lines are the easiest to test. Define the sample size, duration, and success metric before launching the test. A test without a predetermined metric is not a test — it is guessing.

## Conventions

- Each email has exactly one CTA. Two CTAs split attention and reduce clicks.
- Subject lines are 6-10 words. Shorter is almost always better in mobile-first inboxes.
- Preview text is 40-90 characters and adds new information — it does not repeat the subject line.
- Send timing is in the recipient's timezone, not yours. Specify this in the ESP configuration.
- Minimum 24 hours between emails. Maximum 4 days between emails in a welcome sequence (to prevent the sequence from feeling disconnected).
- Every email in the sequence has an explicit exit condition. If the user completes the goal action, they leave the sequence immediately — they do not receive the remaining emails.
- Unsubscribe link is in every email (legally required in most jurisdictions). Do not hide it.
- Plain text versions are included for every HTML email. Some email clients and many B2B recipients prefer plain text.
- From name is a person's name (or person + company), not just the company name. "Sarah from Planwise" outperforms "Planwise" for open rates.
- Conditional logic is documented per email. If an email has a skip condition, it is written in the email spec — not just configured in the ESP.
- Sequence length matches the goal complexity. A welcome sequence is 4-6 emails. A nurture sequence can be 8-12. A re-engagement sequence is 3-4.
- Reply-to address goes to a monitored inbox. If someone replies, a human should see it.

## Anti-Patterns

- Do NOT send more than one email per day in any automated sequence. Frequency fatigue is the fastest path to unsubscribes.
- Do NOT write subject lines that are clickbait. "You won't believe what happened" destroys trust. The subject should accurately preview the email content.
- Do NOT include multiple CTAs in a single email. "Book a demo, read the blog, follow us on Twitter, and check out our new feature" is four emails, not one.
- Do NOT skip the preview text. If you leave it blank, the email client will pull the first line of your email body, which is often "View in browser" or a header image alt text.
- Do NOT use "no-reply" as the from address. It signals that you do not want to hear from the recipient, which is the opposite of building a relationship.
- Do NOT send the entire sequence regardless of user behavior. If the user completed the goal on Email 2, do not send Emails 3-6. Exit conditions are mandatory.
- Do NOT write emails longer than 200 words for a welcome sequence. New users are not going to read a 500-word email on Day 1. Save the depth for later in the sequence.
- Do NOT design emails that only work with images. Many email clients block images by default. The email must be readable without them.
- Do NOT start every email with "Hi [First Name]." Personalization is not limited to a merge tag in the greeting. Personalize the content based on their behavior, plan, or segment.
- Do NOT A/B test two variables at once. Testing subject line AND send time simultaneously means you cannot attribute the result to either variable.
- Do NOT forget to suppress recent purchasers or converters from promotional sequences. Nothing erodes trust faster than asking someone to buy something they already bought.
- Do NOT send time-sensitive content in an evergreen sequence. "Join our webinar this Thursday" breaks when someone enters the sequence 3 weeks later.
- Do NOT use the same email copy for all segments when behavior-based segmentation is available. A user who visited the pricing page 3 times needs a different email than one who only read a blog post.
- Do NOT launch a sequence without sending test emails to yourself and at least one colleague. Broken links, rendering issues, and typos in automated emails reach thousands of people before you notice.

## Examples

```markdown
# Email Sequence: Planwise Welcome Sequence

**Author:** Jamie Vasquez
**Status:** Live
**Sequence Type:** Welcome / Onboarding
**Trigger:** User signs up for free trial
**Goal:** User completes their first project setup within 7 days
**ESP:** Customer.io

---

## 1. Sequence Strategy

**Target Audience:** New free trial signups — engineering managers and team leads who registered via the website or product signup flow.
**Entry Criteria:** Account created event fires in Customer.io. User has verified their email address.
**Exit Criteria:** User completes their first project (event: project_created) OR trial expires (Day 14) OR user unsubscribes.
**Exclusions:** Users who signed up via enterprise sales (tag: enterprise_lead). Users who already had a previous trial (attribute: previous_trial = true).
**Sending Window:** Weekdays, 9am-11am in the recipient's timezone. Weekend emails are queued for Monday.
**Expected Completion Rate:** 60% of entrants receive all 5 emails (40% expected to convert or churn before completion).

## 2. Segmentation

| Segment | Definition | Sequence Variation |
|---------|-----------|-------------------|
| Connected integrations on Day 0 | User triggered `integration_connected` event within 1 hour of signup | Skip Email 2 (integration setup), receive Email 2b (power user tip) instead |
| Solo user (no team) | User has not invited any team members by Day 3 | Email 4 subject line changes to "You don't need a team to start" with adjusted body copy |
| Enterprise trial | Company size > 200 in signup form | Entire sequence replaced with enterprise onboarding sequence (separate flow) |

## 3. Sequence Map

| # | Email Name | Send Timing | Goal | Success Metric |
|---|-----------|-------------|------|----------------|
| 1 | Welcome + Quick Win | Trigger + 5 minutes | Open email, click to dashboard | 65% open rate, 40% click rate |
| 2 | Connect Your First Tool | Trigger + 1 day | Connect Jira, Linear, or GitHub | 50% open rate, 25% click rate |
| 3 | Your First Auto Report | Trigger + 3 days | View first auto-generated status report | 45% open rate, 20% click rate |
| 4 | Invite Your Team | Trigger + 5 days | Send at least 1 team invite | 40% open rate, 15% click rate |
| 5 | Your 7-Day Recap | Trigger + 7 days | Complete first project setup or book onboarding call | 40% open rate, 18% click rate |

### Sequence Flow Diagram

```
[Signup] → Email 1: Welcome (5 min)
              ↓
         [Wait 1 day]
              ↓
    [Did they connect an integration?]
       ↓ Yes                ↓ No
  Email 2b: Power tips    Email 2: Connect tool
              ↓                    ↓
         [Wait 2 days]        [Wait 2 days]
              ↓                    ↓
         Email 3: First report (Day 3)
              ↓
    [Did they create a project?]
       ↓ Yes                ↓ No
    [Exit sequence]     Email 4: Invite team (Day 5)
                              ↓
                         [Wait 2 days]
                              ↓
                         Email 5: 7-day recap (Day 7)
                              ↓
                    [Did they create a project?]
                       ↓ Yes           ↓ No
                    [Exit]     [Move to re-engagement]
```

## 4. Individual Emails

### Email 1: Welcome + Quick Win

**Send Timing:** Trigger + 5 minutes
**Subject Line:** Your dashboard is ready
**Subject Line B:** Let's get your first project set up
**Preview Text:** It takes about 3 minutes to see your first insight.
**From Name:** Jamie from Planwise
**From Email:** jamie@planwise.com

**Purpose:** Make the user feel welcomed and get them to open the product immediately. Reduce time-to-first-value.

**Body:**

```
Hey [First Name],

Your Planwise account is live.

The fastest way to see what Planwise can do: connect one tool (Jira, Linear, or GitHub) and let it scan your active projects. Takes about 3 minutes.

Once connected, Planwise will:
- Map your projects and sprints automatically
- Generate your first status report within 24 hours
- Flag any at-risk projects based on current velocity

→ Open your dashboard: [CTA link]

If you hit any snags, reply to this email. I read every response.

— Jamie
```

**CTA:** Open your dashboard
**CTA URL:** https://app.planwise.com/dashboard

**Conditional Logic:**
- None — all new users receive this email

---

### Email 2: Connect Your First Tool

**Send Timing:** Trigger + 1 day
**Subject Line:** One connection, and Planwise starts working
**Subject Line B:** Connect Jira in 60 seconds
**Preview Text:** No API keys. Just one click.
**From Name:** Jamie from Planwise
**From Email:** jamie@planwise.com

**Purpose:** Get the user to connect their first integration, which is the #1 predictor of trial-to-paid conversion.

**Body:**

```
Hey [First Name],

Planwise gets useful the moment it sees your project data.

Connect one of these tools and Planwise will automatically map your active projects:

- Jira → One-click OAuth, no admin permissions needed
- Linear → Same one-click setup
- GitHub → Connect to see commit velocity and PR status

Most teams connect in under 60 seconds.

→ Connect your first tool: [CTA link]

Once connected, you'll get your first auto-generated status report tomorrow morning.

— Jamie
```

**CTA:** Connect your first tool
**CTA URL:** https://app.planwise.com/integrations

**Conditional Logic:**
- If user already connected an integration (event: integration_connected), send Email 2b instead
- Email 2b subject: "You're ahead of 90% of new users"
- Email 2b body: Congratulates them, shares 3 power-user tips for the dashboard

---

### Email 3: Your First Auto Report

**Send Timing:** Trigger + 3 days
**Subject Line:** Your first status report is ready
**Subject Line B:** No more writing status updates
**Preview Text:** Planwise wrote it for you. Review it in 2 minutes.
**From Name:** Jamie from Planwise
**From Email:** jamie@planwise.com

**Purpose:** Show the core value — an automated status report the user did not have to write.

**Body:**

```
Hey [First Name],

Planwise generated your first status report based on activity from [connected tool].

It covers:
- Project health (on track / at risk / blocked)
- Key updates from the last 3 days
- Risks flagged based on velocity changes

→ Review your report: [CTA link]

You can customize the template, change the sections, and schedule it to auto-send to stakeholders every Monday.

The teams that get the most from Planwise review their first report within a day. Takes about 2 minutes.

— Jamie
```

**CTA:** Review your report
**CTA URL:** https://app.planwise.com/reports/latest

**Conditional Logic:**
- If user has not connected an integration by Day 3, replace body with a nudge to connect first + link to integrations page

---

### Email 4: Invite Your Team

**Send Timing:** Trigger + 5 days
**Subject Line:** Planwise works better with your team
**Subject Line B:** Invite your first teammate (takes 10 seconds)
**Preview Text:** Multi-team dashboards unlock when you add one person.
**From Name:** Jamie from Planwise
**From Email:** jamie@planwise.com

**Purpose:** Increase account stickiness by getting team members added. Multi-user accounts convert to paid at 3x the rate of solo accounts.

**Body:**

```
Hey [First Name],

You've seen what Planwise does for your projects. Here's what it does for your team:

When teammates join, Planwise can:
- Show a multi-team dashboard with health scores across every project
- Route auto-generated reports to the right stakeholders
- Flag cross-team dependency risks

Inviting someone takes 10 seconds — just enter their email.

→ Invite a teammate: [CTA link]

Even one additional user unlocks the team dashboard, which is where most managers say Planwise becomes indispensable.

— Jamie
```

**CTA:** Invite a teammate
**CTA URL:** https://app.planwise.com/settings/team

**Conditional Logic:**
- If user has not created a project, replace with "Complete your first project" email instead
- If user is solo (no team in signup form), change subject to "You don't need a team to start" and focus body on solo dashboard features

---

### Email 5: Your 7-Day Recap

**Send Timing:** Trigger + 7 days
**Subject Line:** Your first week with Planwise
**Subject Line B:** Here's what Planwise found this week
**Preview Text:** A recap of your projects, risks, and next steps.
**From Name:** Jamie from Planwise
**From Email:** jamie@planwise.com

**Purpose:** Summarize the value delivered so far and push toward project completion or an onboarding call.

**Body:**

```
Hey [First Name],

You've been on Planwise for a week. Here's a quick look at what happened:

- Projects tracked: [dynamic: project_count or "0 — let's fix that"]
- Status reports generated: [dynamic: report_count]
- Risks flagged: [dynamic: risk_count]
- Time saved (estimated): [dynamic: time_saved or "Set up your first project to start tracking"]

[If project_count > 0:]
Your trial runs for 7 more days. To keep everything running after the trial, upgrade anytime — your data and settings carry over.

→ View your plan options: [CTA link]

[If project_count = 0:]
You still have 7 days left on your trial. The fastest path to seeing Planwise in action: connect a tool and let it scan your projects. Takes 3 minutes.

→ Set up your first project: [CTA link]

If you want a walkthrough, reply to this email and I'll set up a 15-minute call.

— Jamie
```

**CTA:** View plan options (active users) / Set up your first project (inactive users)
**CTA URL:** https://app.planwise.com/billing (active) / https://app.planwise.com/integrations (inactive)

**Conditional Logic:**
- Dynamic content blocks based on project_count, report_count, risk_count
- If user created a project, show upgrade CTA
- If user has not created a project, show setup CTA and offer onboarding call

---

## 5. A/B Testing Plan

| Test | Variable | Variant A | Variant B | Sample Size | Duration | Success Metric |
|------|----------|-----------|-----------|-------------|----------|----------------|
| Email 1 | Subject line | "Your dashboard is ready" | "Let's get your first project set up" | 50/50 split | 7 days | Open rate |
| Email 2 | CTA text | "Connect your first tool" | "Connect Jira in 60 seconds" (tool-specific) | 50/50 split | 14 days | Click rate |
| Email 5 | Body approach | Dynamic recap with numbers | Static "here's what to do next" without recap | 50/50 split | 14 days | Conversion to paid |

## 6. Performance Benchmarks

| Metric | Sequence Target | Industry Average (SaaS) |
|--------|----------------|------------------------|
| Open rate | 55% (Email 1), 40%+ (remaining) | 38% |
| Click rate | 25% (Email 1), 15%+ (remaining) | 7.8% |
| Unsubscribe rate | < 0.5% per email | 0.4% |
| Sequence completion rate | 60% | 50% |
| Conversion rate (project created) | 35% of all entrants | 25% (activation metric) |
```

## Customization

Adjust sequence length based on the type. Welcome/onboarding: 4-6 emails over 7-14 days. Nurture: 6-12 emails over 4-8 weeks. Re-engagement: 3-4 emails over 7-10 days. Launch: 3-5 emails in 1-2 weeks. For B2C products, shorten emails further (under 100 words) and increase visual content. For high-ticket B2B, add longer-form emails with case studies and ROI calculators. If your ESP supports liquid/template logic, build the conditional content blocks directly into the email spec rather than creating separate email variants.
