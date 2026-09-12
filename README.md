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

- `src/app/` — App Router pages, metadata, sitemap, robots, and shared chrome
- `src/components/` — client-side animation and interaction islands
- `src/lib/site.ts` — canonical identity: name, role, employer, availability, socials.
  Change a fact here, not in the pages.
- `src/lib/projects-data.ts` — the project list shared by `/portfolio` and the homepage
- `src/content/projects/` — case studies. A file named for a project `slug` turns that
  card into a case study and links it from the homepage
- `src/content/writing/` — posts, read at build time
- `public/` — icons, logos, and Open Graph image

## Content rules

- **Never invent a number.** A claim on this site should survive being asked about in an
  interview. If a metric is unknown, describe the outcome qualitatively instead.
- Entrance animations set `opacity: 0` inline and rely on JS to reveal content. Two safety
  nets keep the page readable anyway: a `<noscript>` style block in `src/app/layout.tsx`,
  and a rule in `src/app/globals.css` that pins those elements visible under
  `prefers-reduced-motion`.
- Verify with `pnpm verify` before pushing.
