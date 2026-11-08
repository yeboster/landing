# app

## Overview

The Next.js App Router root. Its direct files define the site-wide shell:

- `layout.tsx`: the root layout, global metadata, viewport, JSON-LD `Person` and client providers.
- `navbar.tsx` and `footer.tsx`: the site chrome.
- `template.tsx`: the per-navigation page transition.
- `page.tsx`: the home page.
- `not-found.tsx`: the 404 page.
- `robots.ts` and `sitemap.ts`: metadata routes.
- `opengraph-image.tsx`: the default Open Graph image.

Each child directory is one route segment. Content is file-backed. Posts and case studies come from `src/lib/writing.ts` and `src/lib/projects.ts`, and copy values come from `site` and `siteUrl` in `src/lib/site.ts`.

## Interface

- `[layout.tsx:RootLayout]` - default export. Renders `<html>`, an inline theme script, a JSON-LD `personSchema`, a `<noscript>` style, a skip link to `#main-content`, and `ThemeProvider` > `MotionProvider` wrapping `ScrollProgress`, `Cursor`, `CommandPaletteHost posts={getPosts()}`, `KonamiMatrix`, `Navbar`, `{children}` and `Footer`.
- `[layout.tsx:metadata]` - title template `%s | ${site.person}` with `defaultTitle`, `metadataBase: new URL(siteUrl)`, `alternates` (canonical `siteUrl` plus the `application/rss+xml` feed `/writing/rss.xml`), `openGraph`, `twitter`, `icons` and `manifest: '/site.webmanifest'`.
- `[layout.tsx:viewport]` - `themeColor` `#f9fafb` (light) and `#111827` (dark).
- `[page.tsx:HomePage]` - default export. Renders `Hero`, `Highlights`, `SelectedWork caseStudies={caseStudySlugs()}`, `Manifesto`, `NowAndOss`, `TerminalSection` and `ClosingCta`.
- `[page.tsx:metadata]` - `title: { absolute: defaultTitle }` and canonical `site.siteUrl`.
- `[navbar.tsx:Navbar]` - default export, `'use client'`. A fixed header with desktop `primaryNav` links, `PaletteTrigger`, `ThemeToggle`, and a mobile disclosure menu (`aria-controls={menuId}`).
- `[footer.tsx:Footer]` - named export. Renders the brand, `footerNav`, social links from `site.socials`, `mailto:${site.email}`, the `site.booking` link and the copyright year.
- `[not-found.tsx:NotFound]` - default export. A terminal-styled 404 page that links to `/`, `/portfolio`, `/writing` and `/contact` (`routes`).
- `[not-found.tsx:metadata]` - `title: '404 — command not found'`.
- `[template.tsx:Template]` - default export. Wraps `children` in `PageTransition`.
- `[robots.ts:robots]` - default export. Returns `rules: { userAgent: '*', allow: '/' }` and a `sitemap` URL of `${siteUrl}/sitemap.xml`.
- `[sitemap.ts:sitemap]` - default export. Returns the static pages `''`, `/about`, `/portfolio`, `/now`, `/writing` and `/contact`, followed by non-draft posts and non-draft case studies.
- `[opengraph-image.tsx:Image]` - default export. Returns `ogImage({ title: site.person, subtitle: site.pitch })`. `alt`, `size` and `contentType` are exported alongside it.

### Subdirectories

- about: [./about/README.md](./about/README.md) - `/about`, the About page, which is also the printable CV, plus its OG image.
- api: [./api/README.md](./api/README.md) - server JSON route handlers: `/api/github-stats` (GitHub counters, `revalidate = 3600`) and `/api/paris-weather` (Open-Meteo, `revalidate = 900`).
- contact: [./contact/README.md](./contact/README.md) - `/contact`, the contact page that hosts `ContactForm` and `ContactAside`, plus its OG image.
- now: [./now/README.md](./now/README.md) - `/now`, the "Now" page (`NowHero` and `FocusGrid`), plus its OG image.
- portfolio: [./portfolio/README.md](./portfolio/README.md) - `/portfolio`, the project listing, and `/portfolio/[slug]`, the case-study pages.
- writing: [./writing/README.md](./writing/README.md) - `/writing`, the post index, `/writing/[slug]`, the post pages, and `/writing/rss.xml`, the RSS 2.0 feed.

## Invariants

- `[layout.tsx:metadata]` - the root `alternates` holds the RSS feed link. Child segments that set their own `alternates` replace it and must pass `types: feedAlternates` (`src/lib/site.ts`) again. `[page.tsx:metadata]`, `contact`, `portfolio`, `portfolio/[slug]`, `writing` and `writing/[slug]` all do.
- `[layout.tsx:RootLayout]` - `<html>` has `suppressHydrationWarning`. Before hydration, the inline head script adds the `dark` class when `localStorage.theme === 'dark'`, or when no theme is stored and `prefers-color-scheme: dark` matches.
- `[layout.tsx:RootLayout]` - the `<noscript>` style forces `opacity:1`, `transform:none` and `filter:none` on elements whose inline style contains `opacity:0;`. Per the code comment, this keeps entrance-animated content visible without JS.
- `[layout.tsx:RootLayout]` - the skip link targets `#main-content`, a `tabIndex={-1}` spacer `div` rendered right after `Navbar`.
- `[navbar.tsx:Navbar]` - the header is never hidden when reduced motion is on, the menu is open, focus is inside the header, or `scrollY < TOP_ZONE` (`80`). Scroll deltas within `SCROLL_DELTA` (`6`) do not toggle visibility.
- `[navbar.tsx:Navbar]` - the mobile menu closes on `pathname` change, on `Escape` (which also returns focus to the toggle), on a backdrop click, when the viewport matches `(min-width: 768px)`, and when focus leaves the header for another element.
- `[sitemap.ts:sitemap]` - posts and case studies with `draft` set are excluded. Static pages get `priority` `1` for `''` and `0.8` for the others. Posts and case studies get `priority` `0.7`, `changeFrequency: 'yearly'` and `lastModified: new Date(<entry>.date)`.

## Side Effects

- `[layout.tsx:RootLayout]` - calls `getPosts()` (`src/lib/writing.ts`), which reads `src/content/writing` with `readdirSync` and `readFileSync`. The inline script reads `localStorage.getItem('theme')` and mutates `document.documentElement.classList`. It imports `./globals.css` and loads the Inter, Instrument Serif and JetBrains Mono fonts via `next/font/google`.
- `[navbar.tsx:Navbar]` - while the menu is open, sets `document.body.style.overflow = 'hidden'` (restored on close) and moves focus to the first link. It adds a `keydown` listener on `window` and a `change` listener on `matchMedia('(min-width: 768px)')`, and removes both on cleanup. It subscribes to page scroll through Motion's `useScroll()` and `useMotionValueEvent(scrollY, 'change', …)`, reads `window.scrollY` on mount, and reads `document.activeElement` on each scroll change.
- `[page.tsx:HomePage]` - `caseStudySlugs()` (`src/lib/projects.ts`) reads `src/content/projects` with `readdirSync` and `readFileSync`.
- `[sitemap.ts:sitemap]` - `getPosts()` and `getCaseStudies()` read `src/content/writing` and `src/content/projects`. Static pages use `lastModified: new Date()`.
- `[footer.tsx:Footer]` - reads `new Date().getFullYear()` at render.
- `[opengraph-image.tsx:Image]` - `ogImage` in `src/lib/og.tsx` reads `public/images/logo-light.svg` from disk and fetches the Inter font files from `github.com`.
- `[not-found.tsx:NotFound]`, `[template.tsx:Template]`, `[robots.ts:robots]` - None in these files.

## Verification

- Run: `pnpm verify`
