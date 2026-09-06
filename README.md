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
```

## Deployment

Deployed on Vercel. The `main` branch is connected for automatic production deployments; pull requests receive preview deployments.

## Structure

- `src/app/` — App Router pages, metadata, sitemap, robots, and shared chrome
- `src/components/` — client-side animation and interaction islands
- `src/lib/site.ts` — canonical site identity and social links
- `public/` — icons, logos, and Open Graph image
