# [Project Name] — Multi-Page Form

[Brief description — what does this form collect? What happens after submission?]

---

## Tech Stack

- [Framework: React / Vue / Next.js / Svelte / etc.]
- [Design System: file reference]
- [Form library: React Hook Form / Formik / Zod / Valibot / native]
- [State persistence: localStorage / server-side draft / URL params]

## Project Type: Multi-Page Form

This is a multi-step form that guides users through a structured data collection flow. It breaks a long form into manageable steps with validation, progress tracking, draft saving, and a review step before submission. The focus is on reducing cognitive load and preventing data loss.

Pair this file with a design system file for component-level guidance.

### Page Layout

Centered form layout with step indicator, content area, and navigation.

```
┌──────────────────────────────────────────────────────────┐
│ [Logo]                    Step 2 of 5               [X]  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Step Indicator                                    │  │
│  │  ① Basic Info  ─  ② Details  ─  ③ Upload  ─  ...  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Progress Bar  ████████████░░░░░░░░░░  40%        │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                                                    │  │
│  │  Step Title                                        │  │
│  │  Step description / instructions                   │  │
│  │                                                    │  │
│  │  ┌──────────────────────────────────────────────┐  │  │
│  │  │  Form fields for this step                   │  │  │
│  │  │  ...                                         │  │  │
│  │  └──────────────────────────────────────────────┘  │  │
│  │                                                    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  [← Back]                             [Continue →] │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Rules:**
- Maximum content width: 640px (forms read best narrow)
- Center the form container horizontally
- Fixed header with step count and close/exit button
- Navigation buttons anchored at the bottom of the form area
- On mobile: full-width, no horizontal padding waste

### Step Indicator

Visual representation of all steps with current, completed, and upcoming states.

```
Step states:
├── Completed  ✓  (checkmark, filled, muted color)
│   └── Clickable — user can jump back to edit
├── Current    ●  (filled, primary/accent color, bold label)
│   └── Not clickable (already here)
├── Upcoming   ○  (outline only, muted)
│   └── Not clickable until reached
└── Error      ⚠  (warning icon, error color)
    └── Clickable — returns to step with errors
```

**Layout options:**
- **Horizontal bar** (desktop): numbered circles connected by lines
- **Compact** (mobile): "Step 2 of 5" text + progress bar (no full indicator)
- **Vertical sidebar** (long forms): steps listed vertically on the left

```
Desktop step indicator:
  ✓ Basic Info ── ● Details ── ○ Upload ── ○ Review
     (completed)    (current)    (upcoming)   (upcoming)

Mobile step indicator:
  Step 2 of 5: Details
  ████████████░░░░░░░░░░
```

**Rules:**
- Show step number AND label (not just numbers)
- Completed steps are always re-accessible (click to jump back)
- Upcoming steps are NOT accessible (prevent skipping ahead)
- Connecting lines between steps: solid for completed, dashed/light for upcoming
- On mobile, collapse to text + progress bar (horizontal indicators take too much space)
- If a step has validation errors after review, show error state on that step

### Progress Bar

Visual progress through the entire form.

```
Calculation: (current step / total steps) × 100%
Alternative: (completed fields / total fields) × 100%

Display:
  ████████████░░░░░░░░░░  40%
```

**Rules:**
- Place below the step indicator (or integrated into it)
- Smoothly animate between steps (transition width)
- Step-based progress is simpler and more predictable than field-based
- Show percentage label (optional — some designs omit it for cleanliness)
- Progress never goes backward when navigating back (show the highest step reached)
- At 100%: show on the review/summary step, not the success page

### Conditional Steps

Show or hide steps based on answers from previous steps.

```
Example:
├── Step 1: What type of account?
│   ├── "Personal" → skip Step 2 (Business Details)
│   └── "Business" → include Step 2
├── Step 2: Business Details (conditional)
├── Step 3: Contact Info (always)
└── Step 4: Review (always)
```

**Rules:**
- Recalculate visible steps whenever a conditional answer changes
- Update the step indicator and progress bar to reflect the actual step count
- If a user goes back and changes an answer that removes a step, clear the data from that step
- Conditional logic should be defined declaratively (config/schema), not scattered through components
- Never show a hidden step's data in the review summary
- Total step count in "Step X of Y" must update dynamically

### Per-Step Validation

Validate all fields on the current step before allowing advancement.

```
Validation timing:
├── On field blur (individual field)     # Validate as user moves between fields
├── On "Continue" click (entire step)    # Validate all fields on the step
└── On step revisit (re-validate)        # Re-check when returning to a completed step
```

**Validation behavior:**
- "Continue" button click triggers validation for all fields on the current step
- If validation fails: scroll to the first error, focus the first invalid field
- Show inline error messages below each invalid field
- Do not clear valid fields when validation fails — only highlight errors
- If all fields are valid: advance to the next step

**Field-level validation:**
- Validate on blur (when the user leaves the field)
- Do not validate on every keystroke (too aggressive)
- Clear the error when the user starts fixing it (on focus or on change)
- Required fields: mark with asterisk (*) or "(required)" label
- Optional fields: mark with "(optional)" — do not leave it ambiguous

**Rules:**
- Never let the user advance past a step with invalid required fields
- Show a step-level error summary at the top if there are multiple errors
- Server-side validation happens on final submission — not on each step (unless checking uniqueness)
- Disable the "Continue" button while async validation is in progress (e.g., checking email availability)

### Save Draft Functionality

Persist form state so users can return and finish later.

**Client-side (localStorage):**
```
Storage key: "[form-name]-draft"
Saved data: { currentStep, formData, lastSaved, expiresAt }
Trigger: auto-save on every step advancement + on field blur (debounced)
```

**Server-side:**
```
Endpoint: POST /api/[resource]/draft
Saved data: { id, currentStep, formData, lastSaved }
Trigger: auto-save on step advancement
Resume: GET /api/[resource]/draft/[id]
```

**Resume flow:**
1. User returns to the form URL
2. Check for existing draft (localStorage or server)
3. Show prompt: "You have an unsaved draft from [date]. Resume or start over?"
4. Resume: restore form data and navigate to the last step
5. Start over: clear draft, begin from step 1

**Rules:**
- Auto-save silently — show a subtle "Draft saved" indicator (not a modal)
- Include a timestamp: "Last saved 2 minutes ago"
- Drafts expire after [7/30] days — include an expiration timestamp
- Allow explicit "Save and exit" action
- Clear the draft after successful submission
- If the form structure changes between saves (new fields, removed steps), handle gracefully — don't crash on missing/extra data

### Review / Summary Step

The final step before submission — shows all entered data for confirmation.

```
Review layout:
├── Step 1: Basic Info                    [Edit]
│   ├── Name: [value]
│   ├── Email: [value]
│   └── Phone: [value]
├── Step 2: Details                       [Edit]
│   ├── Category: [value]
│   ├── Description: [value]
│   └── Budget: [value]
├── Step 3: Uploads                       [Edit]
│   ├── Document: [filename] (2.4 MB)
│   └── Photo: [thumbnail preview]
├── ──────────────────────
│   Confirmation checkbox (if needed):
│   ☐ I confirm this information is correct
└── Navigation
    ├── [← Back]
    └── [Submit]
```

**Rules:**
- Display all entered data grouped by step
- Each step section has an "Edit" link that returns to that step
- After editing, return to the review step (not the next step after the edited one)
- Show file uploads as filenames with sizes (and thumbnails for images)
- Do not show data from skipped/hidden conditional steps
- Format values for readability (dates formatted, currencies with symbols, etc.)
- "Submit" button is visually distinct (primary style, larger) — this is the final action
- Optional: require a confirmation checkbox before enabling Submit

### Back / Forward Navigation

Preserve state when navigating between steps.

```
Navigation controls:
├── [← Back]        # Returns to previous step, preserves current step data
├── [Continue →]    # Validates, then advances to next step
└── [Submit]        # Final step only — submits the form
```

**Behavior:**
- "Back" always works — no confirmation needed (data is preserved)
- "Continue" validates before advancing
- Form data for all visited steps is held in state (not lost on navigation)
- Browser back button should also navigate to the previous step (not leave the form)
- Direct URL access to a step (e.g., `/form/step-3`) should redirect to step 1 if no prior data exists

**Rules:**
- "Back" button on step 1: either hidden or acts as "Cancel/Exit"
- "Continue" button on the last content step: changes to "Review" or "Next: Review"
- "Submit" button only appears on the review step
- Keyboard: Enter key advances to the next step (if the current field is valid)
- Never show both "Continue" and "Submit" on the same step
- Animate step transitions (slide left/right) for directional context

### Mobile Form Layout

Optimize for touch input on small screens.

**Field layout:**
- One field per row — never side-by-side on mobile
- Labels above fields (not inline or floating until focused)
- Minimum input height: 48px (touch target)
- Minimum tap target for buttons: 48x48px
- Full-width inputs and buttons

**Mobile-specific patterns:**
- Use native input types: `type="email"`, `type="tel"`, `type="date"` — they trigger the correct keyboard
- Large "Continue" button anchored at the bottom of the viewport (sticky)
- Step indicator collapses to "Step X of Y" + progress bar
- Scroll to the active field when keyboard opens
- Avoid dropdowns for 2-4 options — use radio buttons or segmented controls instead

**Rules:**
- Test with a real device keyboard open — ensure fields are visible above the keyboard
- Prevent double-tap zoom on inputs (set viewport meta: `maximum-scale=1`)
- Allow pinch-to-zoom on the page (do not disable completely — accessibility requirement)
- Group related fields visually (card/container) to reduce visual noise
- Show field descriptions/help text below the label, not in a tooltip (tooltips are hard to trigger on mobile)

### Error Recovery

When validation fails after review or submission, guide the user back to fix it.

```
Error scenarios:
├── Step-level validation failure
│   └── Highlight the step in error state in the step indicator
│       Show error summary, focus first invalid field
├── Server-side submission failure
│   ├── Field-specific error (e.g., "email already taken")
│   │   └── Return to the step with the error, show inline error on the field
│   ├── General error (e.g., server timeout)
│   │   └── Stay on review step, show error message, "Try again" button
│   └── Partial failure (e.g., upload failed but data saved)
│       └── Show what succeeded, allow retry for what failed
└── Session expired
    └── Save draft, prompt re-authentication, restore state after login
```

**Rules:**
- Never show a generic "Something went wrong" — identify the step and field with the error
- Auto-navigate to the step containing the error
- Scroll to and focus the first invalid field
- Preserve all valid data — never clear the form on error
- If the server returns an error after submission, keep the user on the review step
- Allow retry without re-entering data

### Keyboard Navigation

Support efficient keyboard-driven form completion.

| Key | Action |
|-----|--------|
| `Tab` | Move to the next field |
| `Shift+Tab` | Move to the previous field |
| `Enter` | Submit current step (advance to next) — if focused on last field or button |
| `Escape` | Close dropdowns, modals, or cancel the current action |
| `Space` | Toggle checkboxes, activate buttons |
| Arrow keys | Navigate radio groups, dropdowns, date pickers |

**Rules:**
- Enter on the last field of a step should trigger "Continue" (same as clicking the button)
- Do not trap focus — users should be able to Tab through the entire step
- Visible focus indicators on all interactive elements
- Skip links not needed (form is already linear)
- Auto-focus the first field when navigating to a new step

### Success State

What the user sees after successful submission.

```
Success page:
├── ✓ Success icon / illustration
├── Headline: "[Confirmation message]"
├── Subtext: "[What happens next — processing time, email confirmation, etc.]"
├── Reference number / confirmation ID (if applicable)
├── Next steps:
│   ├── [Primary CTA: View submission / Go to dashboard / etc.]
│   └── [Secondary: Return home / Submit another]
└── Optional: summary of submitted data (collapsed/expandable)
```

**Rules:**
- Clear the draft after successful submission
- Include a confirmation number/reference if the system generates one
- Set clear expectations: "You'll receive a confirmation email within 5 minutes"
- Primary CTA leads to the most logical next action
- Do not show the form again — replace it entirely with the success state
- Browser back button from success page should NOT return to the form (redirect or replace history)
- If the user refreshes the success page, show the confirmation again (not a resubmission)

### State Management

How form data flows through the multi-step experience.

```
State structure:
{
  currentStep: [number],
  completedSteps: [number[]],
  formData: {
    step1: { [field]: [value], ... },
    step2: { [field]: [value], ... },
    ...
  },
  validationErrors: {
    step1: { [field]: [message], ... },
    ...
  },
  isDirty: [boolean],
  lastSaved: [timestamp]
}
```

**Rules:**
- Single source of truth for all form data (one state object or store)
- Each step reads and writes to its own section of the state
- Validation errors are stored per-step, per-field
- `isDirty` flag tracks whether there are unsaved changes (for the "unsaved changes" warning)
- State survives step navigation — do not reset on back/forward
- Clear state completely after successful submission

### File Structure

```
[project-name]/
├── [config files]
├── src/
│   ├── components/
│   │   ├── form/
│   │   │   ├── MultiStepForm.[ext]       # Main form container / orchestrator
│   │   │   ├── StepIndicator.[ext]       # Step dots / labels
│   │   │   ├── ProgressBar.[ext]         # Progress bar
│   │   │   ├── StepNavigation.[ext]      # Back / Continue / Submit buttons
│   │   │   ├── ReviewStep.[ext]          # Summary / review before submit
│   │   │   ├── SuccessStep.[ext]         # Post-submission confirmation
│   │   │   └── FormField.[ext]           # Reusable field wrapper (label + input + error)
│   │   └── steps/
│   │       ├── Step1[Name].[ext]         # Each step is its own component
│   │       ├── Step2[Name].[ext]
│   │       ├── Step3[Name].[ext]
│   │       └── ...
│   ├── hooks/ (or composables/)
│   │   ├── useMultiStepForm.[ext]        # Step navigation, state, validation orchestration
│   │   └── useDraftSave.[ext]            # Auto-save / restore draft logic
│   ├── schemas/
│   │   └── [formName]Schema.[ext]        # Validation schema per step (Zod, Yup, etc.)
│   ├── config/
│   │   └── formSteps.[ext]              # Step definitions (order, conditional logic, metadata)
│   └── services/
│       └── formApi.[ext]                 # Submission endpoint, draft save/load
└── public/
    └── [assets]
```

### Naming Conventions

- **Step components:** `Step[N][Name].[ext]` — `Step1BasicInfo.tsx`, `Step2Details.tsx`
- **Form hooks:** `useMultiStepForm`, `useDraftSave`
- **Validation schemas:** `[formName]Schema` with per-step exports — `step1Schema`, `step2Schema`
- **Config:** `formSteps` — array of step definitions with label, component, validation schema, conditional logic

### Anti-Patterns — Do NOT

- Show all steps at once as a single long form — that defeats the purpose of multi-step
- Let users skip ahead to unvisited steps — they'll miss required fields
- Validate only on final submission — validate each step before advancing
- Lose data when navigating back — every step must preserve its state
- Use browser `alert()` for validation errors — use inline field-level errors
- Auto-advance when the last field on a step is filled — always require explicit "Continue" click
- Show a spinner with no context during submission — show "Submitting your [thing]..."
- Forget the review step — users need to confirm before committing
- Resubmit on browser refresh — use POST-redirect-GET or replace history state
- Build each step as a separate page/route without shared state — the form is one unit
- Use only placeholder text as field labels — placeholders disappear when typing
- Disable the back button — users should always be able to go back
- Put more than 5-7 fields on a single step — if you need more, split into another step
- Forget to clear the draft after successful submission — users will see stale data
- Show conditional step data in the review that was collected but is no longer relevant
- Make "Continue" and "Back" the same visual weight — "Continue" should be primary, "Back" should be secondary/ghost

## Form Steps

1. **[Step Name]** — [what it collects]
2. **[Step Name]** — [what it collects]
3. **[Step Name]** — [what it collects]
4. **Review** — summary of all entered data
5. **Success** — confirmation and next steps

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- One component per step, orchestrated by a parent form container
- Validation schema defined per step (not one giant schema)
- Draft auto-saved on step advancement
- Review step before every submission
- All form state in a single store/hook

## Notes

[Any project-specific context]
