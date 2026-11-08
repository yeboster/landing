# portfolio

## Overview

The `/portfolio` route segment, titled "Work". It lists projects from `projects` in `src/lib/projects-data.ts`. A project gets a case-study badge when its slug appears in `caseStudySlugs()` from `src/lib/projects.ts`. The page also contains the stack grid, profile links and a contact CTA. Individual case-study pages live in the `[slug]` child.

## Interface

- `[page.tsx:PortfolioPage]` - default export. Renders `PortfolioHero` (with `projectCount` and `caseStudyCount`), an optional featured `ProjectCard`, then a grid of the remaining `ProjectCard`s, `StackGrid`, `ProfileLinks` and `ContactCta`.
- `[page.tsx:metadata]` - `title: 'Work'`, a `description`, and `alternates` (canonical `${siteUrl}/portfolio` plus `types: feedAlternates`).
- `[opengraph-image.tsx:Image]` - default export. Returns `ogImage({ title: 'Selected work', subtitle })`.
- `[opengraph-image.tsx:alt]`, `[opengraph-image.tsx:size]`, `[opengraph-image.tsx:contentType]` - `alt` is ``${site.person} — Selected work``. `size` and `contentType` are re-exported from `@/lib/og`.
- `[slug]`: [./[slug]/README.md](./[slug]/README.md) - the dynamic case-study page (`/portfolio/[slug]`) and its Open Graph image.

## Invariants

- `[page.tsx:PortfolioPage]` - `featured` is the first entry in `projects` with `featured` truthy (`projects.find`). Every other project is rendered in the grid, so no project appears twice.
- `[page.tsx:PortfolioPage]` - `hasCaseStudy` for each card is `caseStudies.has(project.slug)`, where `caseStudies = new Set(caseStudySlugs())`. `caseStudyCount` counts only projects whose slug is in that set.
- `[page.tsx:metadata]` - setting `alternates` replaces the root layout's, so it passes `types: feedAlternates` again to keep the RSS feed link.

## Side Effects

- `[page.tsx:PortfolioPage]` - `caseStudySlugs` in `src/lib/projects.ts` reads Markdown files from `src/content/projects` with `readdirSync` and `readFileSync`.
- `[opengraph-image.tsx:Image]` - `ogImage` in `src/lib/og.tsx` reads `public/images/logo-light.svg` from disk and fetches the Inter font files from `github.com`.

## Verification

- Run: `pnpm verify`
