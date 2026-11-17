# [Project Name]

[Brief description of what this project does.]

---

## Capability: UI Copy Polish

Every piece of UI text in this project must be intentional. Microcopy is the difference between software that feels amateur and software that feels considered. This file covers every category of UI text — empty states, errors, buttons, confirmations, placeholders, toasts, loading, onboarding, settings, and tooltips. Apply these rules to every string you generate or modify.

### Empty States

The user sees nothing. Your copy decides whether they feel lost or guided.

**Bad:**
```
"No data found."
"0 results."
"Nothing to display."
```

**Good:**
```
"No projects yet. Create your first one to get started."
"No messages. Start a conversation to see them here."
"No teammates yet. Invite someone to collaborate."
```

**Pattern:** Name what belongs here + encourage the next action. Use "yet" to imply this state is temporary. Never just state the absence — give direction.

### Error Messages

Errors are where most UI copy fails. The user hit a wall. Your copy is the handrail.

**Bad:**
```
"Invalid input."
"Something went wrong."
"Error 422."
"Oops! That didn't work."
```

**Good:**
```
"Password must be at least 8 characters."
"Couldn't save your changes. Check your connection and try again."
"That email is already registered. Try signing in instead."
"File must be under 10MB. Your file is 14MB."
```

**Rules:**
- Say what happened, specifically. "Invalid input" is never acceptable.
- Say what to do about it. Every error must include a recovery path.
- Never blame the user. "That email is already registered" not "You entered a duplicate email."
- Never use technical codes in user-facing copy. Log them to console.
- Never use "oops", "uh oh", "whoops", or any cutesy language. This is software, not a cartoon.

### Button Labels

Buttons describe actions. If a user reads only the buttons on a page, they should understand what they can do.

**Bad:**
```
"Submit"
"OK"
"Click here"
"Yes"
"Go"
```

**Good:**
```
"Save changes"
"Create project"
"Send invitation"
"Export as PDF"
"Delete account"
```

**Rule:** Verb + noun. The verb describes the action. The noun describes the object. "Submit" tells you nothing. "Save changes" tells you everything. The only exception is "Cancel" — it stands alone.

### Confirmation Dialogs

Confirmations exist because the action has consequences. Your copy must state those consequences clearly.

**Bad:**
```
Title: "Are you sure?"
Body: "This action cannot be undone."
Buttons: [Cancel] [OK]
```

**Good:**
```
Title: "Delete 3 projects?"
Body: "This will permanently remove all files and data in these projects. This can't be undone."
Buttons: [Cancel] [Delete 3 projects]
```

**Rules:**
- Title states the specific action: "Remove Sarah from the team?" not "Are you sure?"
- Body states the consequence: what will the user lose, break, or trigger?
- Confirm button repeats the action verb: "Delete 3 projects" not "OK" or "Yes."
- Destructive confirm buttons use destructive styling (red/warning variant).

### Placeholder Text

Placeholders show what goes in the field. They disappear on focus, so they must be instantly scannable.

**Bad:**
```
"Enter text here"
"Type something..."
"Input"
```

**Good:**
```
"e.g., My first project"
"Search by name or email"
"https://example.com"
"Enter your company name"
```

**Rules:**
- Show an example value (prefixed with "e.g.,") or describe what to type.
- Never repeat the label. If the label says "Email," the placeholder shouldn't say "Enter your email."
- Never use placeholder as a replacement for a label. Placeholders disappear — labels don't.
- Keep it under 40 characters. It gets truncated on mobile.

### Toast / Notification Copy

Toasts confirm that something happened. They're read in under a second.

**Bad:**
```
"Success!"
"Done!"
"Operation completed successfully."
"Your request has been processed."
```

**Good:**
```
"Project created."
"Changes saved."
"Invitation sent to sarah@example.com."
"3 files uploaded."
```

**Rules:**
- Past tense. Describe what happened, not that it succeeded.
- No exclamation marks. Exclamation marks make software feel desperate.
- Be specific when possible. "Invitation sent to sarah@example.com" beats "Invitation sent."
- No "successfully." If it's a success toast, the success is implied.
- Auto-dismiss after 4-5 seconds. Error toasts stay until dismissed.

### Loading Messages

Most loading states should use skeleton screens or spinners with no text. Text is a last resort.

**Bad:**
```
"Loading..."
"Please wait..."
"Fetching data..."
```

**Good:**
```
"Loading your projects..."
"Preparing your export..."
```

**Rules:**
- Only show loading text if the wait exceeds 3 seconds.
- Be specific about what's loading. "Loading your projects" not "Loading."
- For waits over 10 seconds, add a progress indicator or secondary message: "This usually takes 10-15 seconds."
- For instant actions, show no loading state at all. Skeleton screens are preferred for content loading.

### Onboarding Copy

First impressions. The user just arrived. Tell them what's about to happen.

**Bad:**
```
"Welcome to our app!"
"Thanks for signing up!"
"Let's get you set up!"
```

**Good:**
```
"Welcome to [App]. Let's set up your workspace."
"First, tell us about your team."
"You're all set. Here's your dashboard."
```

**Rules:**
- State what's about to happen. "Let's set up your workspace" sets expectations.
- Break onboarding into numbered steps. "Step 1 of 3" reduces anxiety.
- End onboarding with a clear transition: "You're all set. Here's your dashboard."
- No over-enthusiasm. Skip the "We're SO excited you're here!" energy.

### Settings Labels

Settings are scanned, not read. Labels must be self-explanatory at a glance.

**Bad:**
```
[ ] Enable notifications
[ ] Dark mode
[ ] Analytics
```

**Good:**
```
Email notifications
  Get notified when someone comments on your project.

Dark mode
  Switch to a dark color scheme across the app.

Usage analytics
  Help us improve by sharing anonymous usage data.
```

**Rules:**
- Every setting has a label + description. The label names the setting. The description explains what it does.
- Labels are noun phrases: "Email notifications" not "Enable email notifications."
- Descriptions explain the effect, not the mechanism. "Get notified when..." not "Toggles the notification flag."
- Group related settings under section headings.

### Tooltip Copy

Tooltips appear on hover. They must be scannable in under 2 seconds.

**Bad:**
```
"This is the settings button."
"Click this to open settings."
"Settings — manage your application settings and preferences here."
```

**Good:**
```
"Manage your account and preferences"
"Copy to clipboard"
"Undo last action (Ctrl+Z)"
```

**Rules:**
- Max 1 sentence. No periods if it's a fragment.
- Explain what something does, not what it is. "Manage your account" not "This is settings."
- Include keyboard shortcuts when applicable: "Undo last action (Ctrl+Z)."
- Never use tooltips for essential information. If the user needs it, it should be visible.

### General Rules

Apply these to every piece of UI text in the project:

- **Sentence case** for all labels, buttons, headings, and menu items. "Create new project" not "Create New Project." Title Case is for marketing pages, not UI.
- **No exclamation marks** in UI copy. Not in toasts, not in empty states, not anywhere.
- **No "please."** You're software, not a waiter. "Enter your email" not "Please enter your email."
- **No "oops"** or any cutesy error language. No "uh oh," "whoops," "yikes." Be direct.
- **15 words max** per UI message. If you need more, restructure. Toasts under 8. Tooltips under 10.
- **Write for scanning, not reading.** Users don't read UI — they scan for the thing they need. Front-load the important word.
- **No redundancy with context.** If the page title says "Projects," the empty state doesn't need to say "You have no projects in your projects list."
- **Use contractions.** "Can't" not "cannot." "Don't" not "do not." UI copy should sound human.
- **Never say "click."** Not everyone clicks — some tap, some use keyboards. Say "select," "choose," or just state the action.

### Anti-Patterns

Do NOT do any of the following:

- **Generic button labels.** "Submit," "OK," "Yes," "No," "Click here" — these communicate nothing. Every button gets a verb + noun.
- **Passive error messages.** "An error has occurred" — what error? What should the user do? Passive errors are useless errors.
- **Placeholder-as-label.** Using placeholder text instead of a visible label. Placeholders disappear on focus. Labels don't.
- **All-caps UI text.** "DELETE" is not more serious than "Delete." It's just harder to read.
- **Walls of text in modals.** If your confirmation dialog needs a paragraph, your flow is too complex. Simplify the action, not the explanation.
- **Marketing copy in UI.** "Supercharge your workflow!" belongs on a landing page, not in a settings panel.
- **Inconsistent terminology.** If you call it a "project" in the nav, don't call it a "workspace" in the empty state and a "board" in the tooltip.
- **Technical jargon.** "Authentication failed" means nothing to most users. "Wrong password" does.
- **Missing copy entirely.** A button with just an icon and no aria-label. A form field with no label. A toggle with no description. Every interactive element needs text, visible or accessible.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All UI text follows sentence case
- All error messages include a recovery action
- All buttons use verb + noun labels
- All settings have a label + description pair
- All empty states use the icon + headline + description + action pattern

## Notes

[Any project-specific context.]
