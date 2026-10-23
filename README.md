# Yeboster Landing

The personal landing site for Yeboster, built with Next.js 15, React 19, TypeScript, Tailwind CSS 3.4, Motion, and Lucide icons.

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
