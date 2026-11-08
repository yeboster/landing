# Yeboster Landing

The personal landing site for Yeboster, built with Next.js 15, React 19, TypeScript, Tailwind CSS 3.4, Motion, and Lucide icons.

## System Overview

A Next.js App Router site. Pages are Server Components in `src/app`. They render
sections from `src/components` and read typed content from `src/content` plus shared
helpers from `src/lib`. Posts (`src/content/writing`) and case studies
(`src/content/projects`) are Markdown files read from disk by `src/lib/writing.ts` and
`src/lib/projects.ts`. The hand-written route handlers are `GET /api/github-stats`,
`GET /api/paris-weather` and `GET /writing/rss.xml`. Next also serves the metadata routes
`robots` and `sitemap` and the `opengraph-image.tsx` files (root, `about`, `contact`,
`now`, `portfolio`, `portfolio/[slug]`, `writing`, `writing/[slug]`). The contact form
sends messages from the browser straight to FormSubmit.

## Local Interface & Invariants

- `next.config.js` (`nextConfig`): `reactStrictMode: true`, `poweredByHeader: false`,
  `experimental.optimizePackageImports: ['lucide-react', 'motion']`. `headers()` applies
  to `/:path*`: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`,
  `Permissions-Policy`, `Strict-Transport-Security` and a `Content-Security-Policy` with
  `base-uri`, `form-action 'self'`, `frame-ancestors 'none'`, `object-src 'none'` and
  `upgrade-insecure-requests`. The code comment says `script-src` is omitted on purpose,
  because a nonce would opt every page out of static rendering.
- `tailwind.config.ts` (`config`): `darkMode: 'class'`. Colors are built by `token(name)`
  as `rgb(var(--<name>) / <alpha-value>)`, reading CSS variables from
  `src/app/globals.css`. `content` globs cover `src/components`, `src/app` and `src/lib`.
  Fonts read `--font-sans`, `--font-serif` and `--font-mono`.
- `postcss.config.js`: plugins `tailwindcss` and `autoprefixer`.
- `tsconfig.json`: `strict: true`, path alias `@/*` → `./src/*`.
- `pnpm-workspace.yaml`: `allowBuilds` for `sharp` and `unrs-resolver` must be real
  booleans. Its comment says placeholder text there made `pnpm install --frozen-lockfile`
  fail.

## Subdirectories & System Boundaries

- src: [./src/README.md](./src/README.md) - All application source, split into `app`,
  `components`, `content` and `lib` (see that file for the child contracts).
- docs: no README - `docs/plans/` holds Markdown plan notes only.
- public: no README - static icons, `site.webmanifest`, `og-image.png` and
  `public/images/*` (project and tool logos as PNG, and the site logo as
  `logo-light.svg` / `logo-dark.svg`).

## Global Invariants

- Site identity facts (name, role, company, email, booking, socials) live in `site` in
  `src/lib/site.ts`. Pages, content and the contact form read them from there.
- Only `*.md` files not starting with `_` are loaded from `src/content/writing` and
  `src/content/projects`. Frontmatter needs a string `title` and a `Date.parse`-able
  string `date`, otherwise the loader throws. `draft: true` files are included only when
  `NODE_ENV === 'development'`, and `sitemap` and the RSS feed exclude drafts.
- The root layout's `metadata.alternates` carries the RSS feed. A route that sets its own
  `alternates` replaces it and must pass `types: feedAlternates` (from `src/lib/site.ts`)
  again. Every route that sets `alternates` does this: the layout, `/`, `/contact`,
  `/portfolio`, `/portfolio/[slug]`, `/writing` and `/writing/[slug]`.
- Theme: the `dark` class on `<html>` is the source of truth. An inline script in
  `src/app/layout.tsx` sets it before hydration from `localStorage.theme` or
  `prefers-color-scheme`.
- Entrance animations start at inline `opacity: 0`. A `<noscript>` style in
  `src/app/layout.tsx` and a `prefers-reduced-motion` rule in `src/app/globals.css` keep
  the content visible.
- Markdown is rendered to React elements without `dangerouslySetInnerHTML`. Link and
  image URLs are filtered by `safeHref` / `safeSrc` in `src/lib/markdown.tsx`.

## Global Side Effects

- Build/render-time disk reads: `src/content/writing` and `src/content/projects`
  (`src/lib/writing.ts`, `src/lib/projects.ts`), and `public/images/logo-light.svg`
  (`src/lib/og.tsx`).
- Outbound network calls from the server: `api.github.com` (`src/app/api/github-stats`,
  `revalidate = 3600`), `api.open-meteo.com` (`src/app/api/paris-weather`,
  `revalidate = 900`), and the Inter font files on `github.com` (`src/lib/og.tsx`).
- Fonts: `src/app/layout.tsx` loads `Inter`, `Instrument_Serif` and `JetBrains_Mono`
  through `next/font/google`.
- Outbound network calls from the browser: `POST https://formsubmit.co/ajax/<site.email>`
  (`src/components/contact/contact-form.tsx`). Same-origin fetches go to
  `/api/github-stats` and `/api/paris-weather`.
- Browser storage and DOM: `localStorage` key `theme` and the `<html>` `dark` class
  (`src/components/theme-provider.tsx`), plus clipboard writes and `window.print()`.

## System Verification

- Run: `pnpm verify` (`pnpm lint && pnpm build`)

## Commands

This project is managed with **pnpm** — the version is pinned in
`package.json` under `packageManager`. Do not run `npm install` here: npm
does not understand pnpm's store layout and will spend minutes revalidating
hundreds of packages before flattening `node_modules` and desyncing
`pnpm-lock.yaml`.

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm verify   # lint + production build, the gate before pushing
```

## Deployment

Deployed on Vercel. The `main` branch is connected for automatic production deployments; pull requests receive preview deployments.

## Structure

- `src/app/` — App Router pages (Server Components with their own metadata), sitemap,
  robots, OG images, and shared chrome (navbar, footer, 404)
- `src/components/<area>/` — each page's sections (`home/`, `about/`, `now/`, `portfolio/`,
  `writing/`, `contact/`, `chrome/`). Static markup renders on the server; only interactive
  pieces are `'use client'` islands
- `src/components/ui/` — primitives: `Button`/`ButtonLink`, `Card`, `Eyebrow`,
  `Section`/`SectionHeader`, `Logo`
- `src/components/motion/` — `<Reveal>` / `<RevealGroup>` entrance wrappers usable from
  Server Components; variants and timings live in `src/lib/motion.ts`
- `src/components/*.tsx` — shared interaction islands (aurora, split text, tilt card,
  command palette, cursor, terminal…)
- `src/content/*.ts` — typed page content (about timeline, /now)
- `src/lib/site.ts` — canonical identity: name, role, employer, availability, socials.
  Change a fact here, not in the pages.
- `src/lib/projects-data.ts` — the project list shared by `/portfolio` and the homepage
- `src/content/projects/` — case studies. A file named for a project `slug` turns that
  card into a case study and links it from the homepage
- `src/content/writing/` — posts, read at build time
- `public/` — icons, logos, and Open Graph image

## Design tokens

Colors are CSS variables in `src/app/globals.css`, exposed to Tailwind as `bg-background`,
`text-foreground`, `text-muted-foreground`, `bg-card`, `bg-subtle`, `border-border`, `bg-brand`,
`hover:bg-brand-strong`, `text-brand-ink` and `bg-brand-soft`. Use these instead of raw `gray-*`
classes or hex values: they switch with the theme and keep the WCAG AA contrast the palette
was tuned for. Fonts: `font-sans` (Inter), `font-mono` (JetBrains Mono, for labels and code)
and `font-serif` (Instrument Serif, for one emphasised word per heading at most).

## Content rules

- **Never invent a number.** A claim on this site should survive being asked about in an
  interview. If a metric is unknown, describe the outcome qualitatively instead.
- Entrance animations set `opacity: 0` inline and rely on JS to reveal content. Two safety
  nets keep the page readable anyway: a `<noscript>` style block in `src/app/layout.tsx`,
  and a rule in `src/app/globals.css` that pins those elements visible under
  `prefers-reduced-motion`.
- Verify with `pnpm verify` before pushing.
