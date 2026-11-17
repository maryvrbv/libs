# [Project Name]

[Brief description of what this project does.]

---

## Capability: Auth Pages Polish

This project has authentication pages. Auth pages are the front door — they must feel trustworthy, clean, and effortless. Login, signup, forgot password, and reset password should feel like variations of the same flow. Apply these rules to all auth UI generated or modified.

### Layout

```
Page:   min-h-screen, flex items-center justify-center, bg-muted/30, p-4
Card:   max-w-sm (384px), w-full, bg-background, border, rounded-xl, shadow-lg, p-8
Logo:   centered, h-10, mb-8 (above or inside card — pick one, use everywhere)
```

Mobile: card goes full-width (remove max-width), padding adjusts to p-6, keep 16px font-size on inputs (prevents iOS zoom).

### Form Structure

**Headings:** text-2xl font-bold text-center. Login: "Welcome back". Signup: "Create your account". Forgot: "Reset your password". Reset: "Choose a new password". Optional subheading: text-sm text-muted-foreground text-center mt-2.

**Fields:** space-y-4 (16px gap). Label: text-sm font-medium mb-1.5 above input. Input: w-full h-10 px-3 border rounded-md text-base. Focus: border-primary ring-2 ring-primary/20.

### Field Details

**Email:** `type="email" autocomplete="email" inputmode="email" placeholder="name@example.com"`

**Password:** relative container, pr-10 for eye toggle icon. Toggle: absolute right-3, eye/eye-off icon button, text-muted-foreground hover:text-foreground. Login: `autocomplete="current-password"`. Signup/reset: `autocomplete="new-password"`.

**Password requirements (signup/reset):** Show on focus, not after error. Below field, mt-2, text-xs space-y-1. Each rule: circle icon + text (unmet: text-muted-foreground) or check icon + text (met: text-green-600).

**Forgot password link:** text-sm text-primary, right-aligned below password field or on same line as label.

### Primary CTA

w-full, h-10 to h-11, mt-6, primary variant, font-medium. Text: "Sign in" / "Create account" / "Send reset link" / "Reset password". Never "Submit."

### Social Login

```
Divider:  flex items-center gap-4 my-6 — border-t left/right, "or" center (text-sm text-muted-foreground)
Buttons:  space-y-3, w-full h-10, outline variant (border bg-background)
          flex items-center justify-center gap-3, provider icon (20px) + "Continue with Google"
          hover: bg-muted 150ms
Order:    Google first, then GitHub, then Apple. Max 3-4.
```

Social buttons must be outline variant — visually distinct from the primary CTA.

### Footer Links

Centered below or inside card (mt-6, text-sm text-muted-foreground). Login: "Don't have an account? `Sign up`". Signup: "Already have an account? `Sign in`". Forgot: "`Back to sign in`".

### Error States

**Inline field errors:** border-destructive on input, ring-destructive/20 on focus. Message: text-sm text-destructive mt-1.5, alert-circle icon + text. `aria-invalid="true" aria-describedby="[field]-error"`, message has `role="alert"`.

**General form errors:** Above fields, below heading. bg-destructive/10 border-destructive/20 rounded-md p-3. Warning icon + message (text-sm text-destructive). Never reveal whether an email exists: "If an account exists, we'll send a reset link."

Inline errors appear on blur or submit, not on keystroke. Clear when user starts typing again.

### Loading State

Button: text-transparent, pointer-events-none, spinner centered (absolute, 16px, border-2 spin). All fields: disabled, opacity-60.

### Success States

**Login:** Immediate redirect. No success screen. **Signup:** Redirect to onboarding, or "Check your email" if verification required (envelope icon + instructions + "Resend" link). **Forgot password:** "Check your email" confirmation. **Reset:** "Password updated" + check icon, redirect to login after 2s or on CTA.

### Anti-Patterns — Do NOT

- Show password requirements only after submission failure. Show on focus.
- Make login and signup visually different. Same card, same layout.
- Use a non-full-width CTA. Auth CTAs are always full-width.
- Reveal whether an email exists in error messages.
- Skip the password visibility toggle.
- Use "Submit" as button text.
- Add navbars or sidebars to auth pages. Standalone, distraction-free.
- Use inputs smaller than 16px font. iOS will zoom.
- Show a success screen after login. Redirect immediately.
- Let social buttons compete with the primary form. Outline variant only.
- Forget "Back to sign in" on forgot/reset pages.

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Centered card (max-w-sm) on all auth pages
- Consistent logo placement across all pages
- Full-width CTA with specific action text
- Social login: outline buttons with "or" divider
- Inline field errors with aria-invalid and role="alert"
- Immediate redirect on login, confirmation on signup/forgot/reset

## Notes

[Any project-specific context.]
