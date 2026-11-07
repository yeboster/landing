# portfolio

## Overview

Components for the portfolio index and the case-study pages: hero, project cards and logos, case-study metadata and previous/next navigation, stack and profile grids, and a contact call to action. Project and case-study data come from `@/lib/projects-data` and `@/lib/projects`; `data.ts` holds the local `skills` and `profiles` lists.

## Interface

- `PortfolioHero({ projectCount, caseStudyCount })`. `[portfolio-hero.tsx:PortfolioHero]`
- `ProjectCard({ project, hasCaseStudy, featured? = false, headingLevel? = 'h3' })`. `[project-card.tsx:ProjectCard]`
- `ProjectLogo({ project, size? = 'md', className? })`, `ProjectPreview({ project, hasCaseStudy, featured? })` and `CaseStudyBadge({ className? })`. `[project-logo.tsx:ProjectLogo]` `[project-logo.tsx:ProjectPreview]` `[project-logo.tsx:CaseStudyBadge]`
- `CaseStudyMeta({ study: CaseStudy, project?: Project })`. `[case-study-meta.tsx:CaseStudyMeta]`
- `CaseStudyNav({ slug })`. `[case-study-nav.tsx:CaseStudyNav]`
- `StackGrid()` renders `skills`; `ProfileLinks()` renders `profiles`. `[stack-grid.tsx:StackGrid]` `[profile-links.tsx:ProfileLinks]`
- `ContactCta({ title? = 'Have a project in mind?' })`. `[contact-cta.tsx:ContactCta]`
- `TagList({ tags: string[], label? = 'Technologies', className? })`. `[tag-list.tsx:TagList]`
- `type Skill`, `skills`, `type Profile` and `profiles`. `[data.ts:Skill]` `[data.ts:skills]` `[data.ts:Profile]` `[data.ts:profiles]`
- No file has `'use client'`; all exports are named.

## Invariants

- A comment in `data.ts` states that it is rendered only by Server Components, so the Lucide icon components never cross the server/client boundary. `[data.ts:skills]`
- `primaryTarget`: with a case study, the card links to `/portfolio/${project.slug}`. Without one, it uses `links.find(l => l.href === project.href) ?? links[0]` as an external link. The code has no guard for an empty `links`. `[project-card.tsx:primaryTarget]`
- `ordered()` sorts `getCaseStudies()` by each study's index in `projects` (studies not found rank last), breaking ties with newest `date` first. `CaseStudyNav` returns `null` when there is no previous or next study. `[case-study-nav.tsx:ordered]` `[case-study-nav.tsx:CaseStudyNav]`
- Reading time is `Math.max(1, Math.round(words / 230))`. `[case-study-meta.tsx:readingMinutes]`
- The Role row renders only when `project?.role` is set; the Stack row renders only when `study.tags.length > 0`. `[case-study-meta.tsx:CaseStudyMeta]`
- `ProjectLogo` renders `project.image`, else `project.icon`, else `null`. Sizes are `sm`/`md`/`lg` with image sizes 48/96/160. `[project-logo.tsx:ProjectLogo]`
- `TagList` returns `null` when `tags` is empty. `[tag-list.tsx:TagList]`

## Side Effects

- `CaseStudyNav` calls `getCaseStudies()` from `@/lib/projects` during render. `[case-study-nav.tsx:ordered]`
- External links open with `target="_blank" rel="noopener noreferrer"`. `[project-card.tsx:ProjectCard]` `[profile-links.tsx:ProfileLinks]` `CaseStudyMeta` (`ButtonLink external`) and `ContactCta` (`ButtonLink href={site.booking}`, an `https://` URL) do the same through `ButtonLink`. `[case-study-meta.tsx:CaseStudyMeta]` `[contact-cta.tsx:ContactCta]`
- No file here adds fetch, timers, storage or listeners itself. Rendered children do: `PortfolioHero` renders `Aurora` (pointer listeners, `requestAnimationFrame`) and `ProfileLinks` renders `TiltCard` (`matchMedia` listener, pointer handlers); see `../README.md`. `[portfolio-hero.tsx:PortfolioHero]` `[profile-links.tsx:ProfileLinks]`

## Verification

- Run: `pnpm verify` (runs `pnpm lint && pnpm build`)
