# home

## Overview

Sections for the home page and the static copy they render. `data.ts` builds that copy from `site` (`@/lib/site`), and the section components compose shared primitives from `src/components` (`Aurora`, `DotGrid`, `TerminalCard`, `GithubStats`, `TiltCard`, `ui/*`, `motion/reveal`).

## Interface

- `Hero()`: no props. Renders `HeroStage labelledBy="hero-title"` and `RotatingText` with `specialisms`. `[hero.tsx:Hero]`
- `HeroStage({ children, labelledBy? })`: client component. Renders `Aurora` and a `DotGrid`, and forwards pointer coordinates to the grid. `[hero-stage.tsx:HeroStage]`
- `Highlights()`: renders `credibility` as a `dl`. `[highlights.tsx:Highlights]`
- `Manifesto()`: renders `manifesto` through `ScrollRevealText`, plus `TechMarquee`. `[manifesto.tsx:Manifesto]`
- `SelectedWork({ caseStudies: string[] })`: renders `highlightedProjects` from `@/lib/projects-data`. `[selected-work.tsx:SelectedWork]`
- `NowAndOss()`: shows the "now" panel and the open-source panel, which renders `GithubStats`. `[now-and-oss.tsx:NowAndOss]`
- `TerminalSection()`: wraps `TerminalCard`. `[terminal-section.tsx:TerminalSection]`
- `ClosingCta()`: shows contact and booking calls to action. `[closing-cta.tsx:ClosingCta]`
- `TagList({ tags: readonly string[], className? })`. `[tag-list.tsx:TagList]`
- Data constants: `city`, `specialisms`, `credibility`, `currentWork`, `manifesto`, `nowStack`, `engagementsSentence`. `[data.ts:city]` `[data.ts:specialisms]` `[data.ts:credibility]` `[data.ts:currentWork]` `[data.ts:manifesto]` `[data.ts:nowStack]` `[data.ts:engagementsSentence]`
- All exports are named. Only `hero-stage.tsx` has `'use client'`.

## Invariants

- `city` is `site.location.split(',')[0]`. `[data.ts:city]`
- `engagementsSentence` is `new Intl.ListFormat('en', { type: 'conjunction' }).format(site.engagements)`. `[data.ts:engagementsSentence]`
- `SelectedWork` renders the "Case study" link (`/portfolio/${project.slug}`) only when `caseStudies.includes(project.slug)`. `[selected-work.tsx:SelectedWork]`
- `ClosingCta` renders `ButtonLink href={site.booking}` without checking that `site.booking` is set. (`contact/contact-aside.tsx` does check it.) `[closing-cta.tsx:ClosingCta]`
- `githubHandle` is `site.socials.github` with `^https?://` removed. `[now-and-oss.tsx:githubHandle]`

## Side Effects

- `HeroStage` calls `dotGridRef.current?.setPointer(x, y)` on mouse move and `setPointer(null, null)` on mouse leave. `[hero-stage.tsx:HeroStage]`
- No file in this directory fetches data, sets timers, or uses storage. Any network access comes from the child `GithubStats` (see [../README.md](../README.md)). `[now-and-oss.tsx:NowAndOss]`

## Verification

- Run: `pnpm verify` (runs `pnpm lint && pnpm build`)
