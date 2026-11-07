# contact

## Overview

Components for the contact page: the hero, a client-side enquiry form that posts from the browser to FormSubmit, a sidebar with booking, social and engagement details, and a copy-email button. All values about the person (email, booking URL, socials, response time, engagements) come from `site` in `@/lib/site`.

## Interface

- `ContactHero()`: hero section with no props. `<Aurora maxOffset={14}>` wraps only the two `.aurora` glow layers; the eyebrow, heading, `site.availability.detail` and `AvailabilityBadge` sit in a sibling `div.container`. Server component. `[contact-hero.tsx:ContactHero]`
- `ContactForm()`: enquiry form with no props. Client component (`'use client'`). `[contact-form.tsx:ContactForm]`
- `ContactAside()`: sidebar with no props, showing booking, a "Good fit" list, social links and `CopyEmail`. Server component. `[contact-aside.tsx:ContactAside]`
- `CopyEmail()`: button that copies `site.email`, with no props. Client component. `[copy-email.tsx:CopyEmail]`
- All exports are named; there are no default exports.

## Invariants

- Required fields are `['name', 'email', 'message']`. `company` and `timeline` are optional. `[contact-form.tsx:REQUIRED]`
- Maximum lengths are `{ name: 100, email: 200, company: 150, message: 5000 }`, applied as `maxLength`. `[contact-form.tsx:MAX]`
- Email is checked against `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. `[contact-form.tsx:EMAIL]`
- The timeline options are `['Just exploring', 'This quarter', 'This month', 'ASAP']`, plus an empty "Prefer not to say" option. `[contact-form.tsx:TIMELINES]`
- `validate` trims the value before checking it. Validation runs on blur and on submit. `onChange` re-validates a field only if it already shows an error. On a failed submit, focus moves to the first invalid field. `[contact-form.tsx:validate]` `[contact-form.tsx:ContactForm]`
- Honeypot: the `_honey` check runs only after every required field passes validation. If it is filled at that point, the form shows the success state and sends nothing. `[contact-form.tsx:ContactForm]`
- Before sending, every field is trimmed and empty fields are dropped. `[contact-form.tsx:ContactForm]`
- A send counts as successful only when `response.ok` and `String(result?.success) === 'true'`. The code comments that FormSubmit reports most rejections as HTTP 200 with `success: "false"`. `[contact-form.tsx:ContactForm]`
- `Status` is `'idle' | 'loading' | 'success' | 'error'`. Inputs are disabled while the status is `'loading'`. `[contact-form.tsx:Status]`
- `ContactAside` renders the booking block only when `site.booking` is truthy. `[contact-aside.tsx:ContactAside]`
- The "copied" state resets after 2000 ms. `[copy-email.tsx:CopyEmail]`

## Side Effects

- Network: `POST https://formsubmit.co/ajax/${site.email}` with headers `Content-Type: application/json` and `Accept: application/json`. The JSON body holds the non-empty fields plus `_subject: "New message from <host of site.siteUrl>"` and `_template: 'table'`. The request is sent from the browser; this file reads no env var. `[contact-form.tsx:ContactForm]`
- Focus: moves focus to the success message when the status becomes `'success'`. `[contact-form.tsx:ContactForm]`
- Clipboard: `navigator.clipboard.writeText(site.email)`. If that fails, it sets `window.location.href = mailto:${site.email}`. `[copy-email.tsx:CopyEmail]`
- Timer: a 2000 ms `setTimeout`, cleared on unmount. `[copy-email.tsx:CopyEmail]`
- External links open with `target="_blank" rel="noopener noreferrer"`. `[contact-aside.tsx:ContactAside]`

## Verification

- Run: `pnpm verify` (runs `pnpm lint && pnpm build`)
