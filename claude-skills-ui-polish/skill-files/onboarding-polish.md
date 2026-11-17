# [Project Name]

[Brief description of what this project does.]

---

## Capability: Onboarding Polish

This project has a first-time user experience. Onboarding determines whether someone becomes a user or a churn statistic. Every screen must feel easy, fast, and purposeful. Apply these rules to all onboarding UI generated or modified.

### Welcome Screen

```
Layout:      centered, max-w-lg, min-h-screen flex items-center justify-center
Heading:     text-3xl to text-4xl font-bold, "Welcome to [App]"
Value prop:  text-lg text-muted-foreground, 1-2 sentences (what they'll do, not what the product is)
Spacing:     24px heading-to-value-prop, 32px before CTA
Primary CTA: "Get started" — primary button, lg, min-w-[200px]
Skip:        text link below CTA, text-sm text-muted-foreground, "Skip for now" — NOT a button
```

No feature tours or product screenshots. The skip option must always exist.

### Step Indicator

**Dots:** flex items-center justify-center gap-2, mb-8. Inactive: w-2 h-2 rounded-full bg-muted-foreground/30. Active: bg-primary scale-125. Completed: bg-primary.

**Progress bar:** w-full max-w-xs mx-auto, mb-8. Track: h-1.5 bg-muted rounded-full. Fill: bg-primary, width transitions 300ms ease.

Always show step count text ("Step 2 of 4") regardless of which visual indicator you use.

### Step Layout

```
Container:   max-w-lg mx-auto, p-8
Heading:     text-2xl font-bold text-center
Description: text-base text-muted-foreground text-center, mt-2, max-w-md mx-auto
Input area:  mt-8
Navigation:  mt-8, flex justify-between
             Back: outline button (hidden on step 1)
             Next: primary button, disabled until valid input
Transitions: exit: fade + slide-left 200ms, enter: fade + slide-from-right 200ms
```

### Input Steps

One question per step. One decision. No multi-field forms.

**Selection inputs (preferred):** Grid of selectable cards — border rounded-lg p-4, icon/emoji + label + description. Unselected: border-border bg-background. Selected: border-primary border-2 bg-primary/5 + check icon. Transition 150ms. Auto-advance 400ms after selection.

**Text inputs:** Single input, full-width, auto-focused. text-lg h-12 with generous padding. Show check icon when valid. Never auto-advance on text — wait for Next click.

### Completion Screen

```
Layout:     centered, max-w-md, text-center
Icon:       check circle 48-64px, text-primary, animate scale 0->1 with bounce, 400ms
Heading:    text-2xl font-bold, "You're all set!"
Description: text-base text-muted-foreground, mt-2
CTA:        primary button, mt-8, "Go to dashboard"
Auto-redirect: 3s if no click, show "Redirecting..." text
```

Keep celebration subtle. Animated check is enough. Confetti only if genuinely restrained.

### Skip Flow and Dashboard Checklist

Store progress for users who skip. Show a setup checklist widget on the dashboard:

```
Card:       bg-card border rounded-lg p-6, prominent position (top of dashboard)
Heading:    text-base font-semibold, "Complete your setup"
Progress:   progress bar + "2 of 4 complete"
Items:      completed: check (text-green-600) + strikethrough
            pending: circle outline + clickable link (opens that step)
Dismiss:    x button top-right. After dismiss: subtle "Complete setup" link in sidebar
```

Checklist disappears automatically when all steps complete (collapse animation).

### Anti-Patterns — Do NOT

- Create more than 5 steps. 3-4 is ideal, 5 is the hard max.
- Ask for information you won't use to personalize the experience.
- Remove the skip option. Ever.
- Hide the step count. Users need to know how much is left.
- Put multiple questions on one step.
- Use small cramped inputs. Onboarding inputs should feel generous.
- Skip the completion screen. Users need closure.
- Forget the dashboard checklist for users who skip.
- Auto-advance on text input steps. Only on card selection.
- Show a spinner between steps. Use slide transitions.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Welcome screen centered with heading, value prop, and skip option
- Step indicator shows dots/bar plus "Step X of Y"
- One question per step, max 4-5 steps
- Selection inputs auto-advance after 400ms
- Completion screen with animated check icon
- Dashboard checklist for users who skip

## Notes

[Any project-specific context.]
