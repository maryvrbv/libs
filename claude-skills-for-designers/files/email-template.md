# [Email Name]

[Brief description — what is this email? Welcome, newsletter, transactional, promotional?]

---

## Tech Stack

- HTML email (table-based layout)
- Inline CSS (no external stylesheets)
- [ESP: Mailchimp / SendGrid / Postmark / Amazon SES / Resend]
- [Template engine: MJML / Maizzle / Foundation for Emails / hand-coded]
- Testing: [Litmus / Email on Acid]

## Project Type: Email Template

This is an HTML email template built for maximum client compatibility. Email HTML is not web HTML — it uses table-based layouts, inline CSS, and defensive coding to render consistently across dozens of email clients with wildly different rendering engines.

### The Email Client Reality

Email clients render HTML differently. The constraints:

| Client | Engine | Key Limitations |
|--------|--------|----------------|
| Outlook (Windows) | Word/IE | No CSS grid/flex, limited `background-image`, table-only layout |
| Gmail | Custom | Strips `<style>` in non-AMP emails, limited media query support |
| Apple Mail | WebKit | Most capable — supports modern CSS. Do not design to this baseline |
| Yahoo Mail | Custom | Strips some CSS, rewrites class names |
| Outlook.com | Custom | Strips `<style>` blocks, rewrites styles |
| Samsung Mail | WebKit | Generally good, occasional spacing quirks |

**Design to the lowest common denominator (Outlook on Windows), then enhance for capable clients.**

### Layout Architecture

All layout is table-based. Do not use `div`, `flexbox`, or `grid` for structural layout.

```html
<!-- Outer wrapper: centers the email, sets background -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background-color: [bg-color];">
  <tr>
    <td align="center">
      <!-- Inner container: constrains width -->
      <table role="presentation" width="[600]" cellpadding="0" cellspacing="0" border="0"
             style="max-width: [600]px; width: 100%;">
        <tr>
          <td style="padding: [20]px;">
            <!-- Content goes here -->
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

**Rules:**
- `role="presentation"` on every layout table — required for accessibility
- Maximum width: 600px (standard) or 640px — wider breaks mobile and preview panes
- Use `width` attribute AND `max-width` style for width control
- `cellpadding="0"` and `cellspacing="0"` on every table — reset defaults
- Use `padding` on `<td>` for spacing, not `margin` (margin is unreliable in email)
- Nest tables for multi-column layouts — each column is a `<td>`

### Single-Column Layout (Recommended)

Best for readability, reliability, and mobile.

```
┌──────────────────────────────┐
│         Preheader text       │  (hidden preview text)
├──────────────────────────────┤
│         Header / Logo        │
├──────────────────────────────┤
│                              │
│      Hero image / banner     │
│                              │
├──────────────────────────────┤
│                              │
│      Body content            │
│      (text, images, CTA)     │
│                              │
├──────────────────────────────┤
│         [ CTA Button ]       │
├──────────────────────────────┤
│                              │
│      Secondary content       │
│                              │
├──────────────────────────────┤
│         Footer               │
│   Unsubscribe | Preferences  │
│   Company address            │
└──────────────────────────────┘
```

### Multi-Column Layout

For product grids, feature comparisons, or side-by-side content.

```html
<!-- 2-column layout with mobile stacking -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <!-- Column 1 -->
    <td width="50%" valign="top" style="padding-right: [10]px;"
        class="stack-column">
      <!-- Column 1 content -->
    </td>
    <!-- Column 2 -->
    <td width="50%" valign="top" style="padding-left: [10]px;"
        class="stack-column">
      <!-- Column 2 content -->
    </td>
  </tr>
</table>
```

**Mobile stacking (in `<style>` block):**
```css
@media only screen and (max-width: 480px) {
  .stack-column {
    display: block !important;
    width: 100% !important;
    padding: 0 !important;
  }
}
```

**Rules:**
- Multi-column only for content that benefits from it (product grids, comparisons)
- Maximum 3 columns — 2 is safer
- Always stack columns on mobile (display: block, width: 100%)
- Use percentage widths, not fixed pixel widths, for columns
- Gmail may ignore `<style>` blocks — multi-column will not stack on Gmail mobile (accept this)

### Inline CSS

All critical styles must be inline. `<style>` blocks are enhancement only.

**Inline on every element:**
- `font-family`, `font-size`, `color`, `line-height` on every text element
- `padding`, `background-color` on every `<td>`
- `border`, `border-radius` where needed

**In `<style>` block (enhancement, may be stripped):**
- Media queries for responsive behavior
- Dark mode overrides
- Hover states
- Classes for mobile stacking

**Font stack:**
```
font-family: [brand-font], -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

**Rules:**
- Do not rely on `<style>` block for critical layout — it gets stripped by Gmail and Outlook.com
- Web fonts work only in Apple Mail, iOS Mail, and some Android clients — always provide a fallback stack
- Set `font-size` minimum of 14px for body text (iOS auto-zooms smaller text)
- Use `line-height` as a multiplier (e.g., `1.5`) or fixed value, not percentages

### Dark Mode

Support email dark mode where available.

**How email dark mode works:**
- Apple Mail / iOS Mail: respects `@media (prefers-color-scheme: dark)`
- Outlook.com / Outlook mobile: auto-inverts colors (you have limited control)
- Gmail: no dark mode CSS support (uses its own inversion)

**Defensive strategy:**
```css
/* In <style> block */
@media (prefers-color-scheme: dark) {
  .dark-bg { background-color: [dark-bg] !important; }
  .dark-text { color: [dark-text] !important; }
  .dark-img { display: none !important; }
  .light-img { display: block !important; }
}
```

**Rules:**
- Add `class="dark-bg"` and `class="dark-text"` to elements you want to control
- Use transparent PNGs for logos — they adapt to any background
- Avoid pure white (`#ffffff`) backgrounds — they become blinding in forced dark mode. Use `#fafafa` or `#f5f5f5`
- Test dark mode in Apple Mail and Outlook — they handle it differently
- Accept imperfection — you cannot fully control dark mode across all clients

### Images

**Hosting:**
- All image URLs must be absolute (`https://[domain]/images/[name].png`)
- Host on a CDN or your ESP's image hosting — never use relative paths
- Use HTTPS — some clients block HTTP images

**Implementation:**
```html
<img src="https://[domain]/images/[name].png"
     alt="[Descriptive alt text]"
     width="[width]"
     height="[height]"
     style="display: block; border: 0; outline: none; max-width: 100%;" />
```

**Rules:**
- Always include `alt` text — images are blocked by default in many clients
- Set `width` and `height` attributes — prevents layout shift when images are blocked
- `display: block` on all images — removes the gap below images in some clients
- `border: 0` — removes the blue border on linked images
- Optimize file size: under 200KB per image, under 800KB total for the entire email
- Use `max-width: 100%` for responsive scaling on mobile
- Retina: supply 2x resolution images with 1x `width`/`height` attributes

### Button / CTA Patterns

Buttons must work in Outlook. The two reliable approaches:

**Approach 1: Table-based button (Outlook-safe, recommended):**
```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td align="center" bgcolor="[button-color]"
        style="border-radius: [radius]px; padding: [12]px [24]px;">
      <a href="[url]"
         style="color: [text-color]; font-family: [font-stack]; font-size: [16]px;
                font-weight: bold; text-decoration: none; display: inline-block;">
        [Button Text]
      </a>
    </td>
  </tr>
</table>
```

**Approach 2: VML button (Outlook-only bulletproof, via MSO conditional):**
```html
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="[url]"
             style="width:[width]px; height:[height]px;"
             arcsize="[radius]%" fillcolor="[button-color]">
  <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
    <center style="color:[text-color]; font-family:[font-stack]; font-size:[16]px; font-weight:bold;">
      [Button Text]
    </center>
  </v:textbox>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-->
  <!-- Standard HTML button for non-Outlook clients -->
<!--<![endif]-->
```

**Rules:**
- Primary CTA: one per email, visually dominant, above the fold
- Button text: action-oriented, 2-5 words ("Get Started", "View Your Order")
- Minimum tap target: 44x44px on mobile
- Do not use `<button>` elements — they render inconsistently
- Always set the button color via `bgcolor` attribute AND `background-color` style
- `border-radius` works everywhere except Outlook — accept square buttons in Outlook

### Header Pattern

```
Header:
├── Logo (image, left-aligned or centered, max 200px wide)
├── Optional: navigation links (keep to 3-4 max)
└── Optional: "View in browser" link
```

**Rules:**
- Logo must have descriptive `alt` text (company/brand name)
- Link the logo to your website
- Keep header height under 80px — it's not the hero, just orientation
- "View in browser" link for complex emails that may render poorly

### Footer Pattern

```
Footer:
├── Social media icons (linked, small)
├── Unsubscribe link (REQUIRED by law — CAN-SPAM, GDPR)
├── Email preferences / manage subscription link
├── Company name and physical address (REQUIRED by CAN-SPAM)
├── "You're receiving this because..." explanation
└── Copyright line
```

**Rules:**
- Unsubscribe link is legally required — never hide it or make it hard to find
- Physical mailing address is required by CAN-SPAM — use your company address or a PO Box
- Smaller text for footer (12-13px), muted color
- One-click unsubscribe via `List-Unsubscribe` header (handled by ESP, not in HTML)

### Preheader Text

Hidden preview text that appears in inbox previews (after the subject line).

```html
<!-- Preheader: appears in inbox preview, hidden in email body -->
<div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
  [Preheader text — 40-130 characters. Complements the subject line.]
  <!-- Fill remaining preview space with whitespace to prevent body text from showing -->
  &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
</div>
```

**Rules:**
- 40-130 characters (longer gets truncated)
- Complements the subject line — adds context, does not repeat it
- Fill remaining space with `&nbsp;&zwnj;` entities to prevent body text from leaking into preview
- Place immediately after `<body>`, before any visible content

### Plain Text Fallback

Every HTML email needs a plain text version.

**Rules:**
- Most ESPs generate this automatically — review and edit it
- Maintain the same information hierarchy as the HTML version
- Format links as: `[Link Text]: https://url.com`
- Use line breaks and dashes for visual separation
- Keep lines under 80 characters
- Include the unsubscribe link

### Responsive Patterns

```css
/* In <style> block — enhancement for supporting clients */
@media only screen and (max-width: 480px) {
  /* Stack columns */
  .stack-column { display: block !important; width: 100% !important; }

  /* Full-width images */
  .fluid-img { width: 100% !important; height: auto !important; }

  /* Larger tap targets */
  .mobile-button { padding: 14px 28px !important; }

  /* Increase text size */
  .mobile-text { font-size: 16px !important; }

  /* Hide desktop-only content */
  .hide-mobile { display: none !important; }

  /* Show mobile-only content */
  .show-mobile { display: block !important; }
}
```

**Rules:**
- 480px breakpoint is standard for email
- Use `!important` on all media query styles — inline styles have higher specificity
- Gmail strips `<style>` blocks — ensure the email is usable without media queries
- Test with images off, HTML only, and plain text — all three should be readable

### Testing

Test every email in multiple clients before sending.

**Testing matrix (minimum):**
- Apple Mail (macOS)
- iOS Mail (iPhone)
- Gmail (web)
- Gmail (mobile app)
- Outlook 365 (Windows)
- Outlook (web)
- Yahoo Mail (web)

**Tools:**
- Litmus or Email on Acid for automated multi-client rendering previews
- Mailtrap or your ESP's test mode for delivery testing
- Check spam score (Mail-Tester.com or SpamAssassin)

**Checklist:**
- [ ] All images have alt text
- [ ] All links work and track correctly
- [ ] Unsubscribe link is present and functional
- [ ] Physical address is in the footer
- [ ] Preheader text is set
- [ ] Plain text version is reviewed
- [ ] Total email size is under 102KB (Gmail clips at 102KB)
- [ ] Dark mode tested in Apple Mail and Outlook
- [ ] Mobile rendering tested (stacking, font sizes, tap targets)

### File Structure

```
[project-name]/
├── templates/
│   ├── [template-name].html          # Compiled/inlined HTML
│   ├── [template-name].txt           # Plain text version
│   └── [template-name]/
│       ├── source.html               # Source (pre-inline) HTML
│       └── styles.css                # Styles (pre-inline)
├── partials/
│   ├── header.html                   # Reusable header
│   ├── footer.html                   # Reusable footer
│   ├── button.html                   # Button snippet
│   └── [component].html              # Other reusable blocks
├── images/
│   └── [image-name].[ext]            # Source images (uploaded to CDN)
└── config/
    └── [inliner config]              # CSS inliner configuration
```

### Naming Conventions

- **Template files:** `kebab-case` — `welcome-email.html`, `order-confirmation.html`
- **Images:** `[template]-[description].[ext]` — `welcome-hero.png`, `logo-dark.png`
- **CSS classes:** `kebab-case` — `.stack-column`, `.mobile-button`, `.dark-bg`
- **Template variables:** `[ESP convention]` — `{{first_name}}`, `*|FNAME|*`, `{name}`

### Anti-Patterns — Do NOT

- Use `div` for layout — use tables. `div` breaks in Outlook
- Use `flexbox` or `grid` — zero email client support for layout
- Use `margin` for spacing — use `padding` on `<td>` elements
- Rely on `<style>` blocks for critical styles — Gmail and Outlook.com strip them
- Use background images without a fallback solid color — Outlook does not support `background-image` reliably
- Set font size below 14px for body text — iOS auto-zooms small text and breaks your layout
- Use JavaScript — it is completely stripped by all email clients
- Use forms or interactive elements — they don't work in most clients
- Forget `alt` text on images — images are blocked by default in many enterprise clients
- Send an email over 102KB — Gmail clips it with a "View entire message" link
- Forget the unsubscribe link — this is a legal requirement (CAN-SPAM, GDPR)
- Use a single full-width image as the entire email — it becomes invisible when images are blocked
- Skip the plain text version — some recipients and spam filters require it
- Test only in Apple Mail — it's the most capable client and will mask rendering bugs
- Use relative image URLs — they will break when the email is delivered
- Hardcode the email width in pixels without `max-width` — it will overflow on mobile

## Current State

[Where is the template? What's been tested, what's next?]

## Conventions

- Table-based layout, inline CSS, progressive enhancement via `<style>` block
- Test in Outlook, Gmail, Apple Mail, and mobile at minimum
- Every email has: preheader, header, body, CTA, footer with unsubscribe
- Plain text fallback for every HTML email
- Images hosted on CDN with absolute HTTPS URLs

## Notes

[Any project-specific context — ESP, merge tags, tracking requirements]
