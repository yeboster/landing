# about

## Overview

Sections for the about/résumé page: hero, career timeline, principles, skills, closing call to action, and print-only pieces. Content comes from `@/content/about` (`timeline`, `principles`, `skills`) and `@/lib/site`. `HeroGlow` is also imported by `now/now-hero.tsx`.

## Interface

- `AboutHero()`: hero with facts, an "Open to" list (`site.engagements`), `PrintButton`, `HeroGlow` and `AvailabilityBadge`. `[about-hero.tsx:AboutHero]`
- `CareerTimeline()`: renders `timeline` from `@/content/about` inside `TimelineRail`. `[career-timeline.tsx:CareerTimeline]`
- `PrinciplesSection()`: renders `principles` from `@/content/about`. `[principles-section.tsx:PrinciplesSection]`
- `SkillsSection()`: renders `skills` from `@/content/about`. `[skills-section.tsx:SkillsSection]`
- `AboutCta()`: contact and booking calls to action. `[about-cta.tsx:AboutCta]`
- `HeroGlow()`: `Aurora maxOffset={12}` with two `.aurora` blobs and a grid overlay. Its doc comment says it is shared by `/about` and `/now`. `[hero-glow.tsx:HeroGlow]`
- `PrintButton()`: client component labelled "Save résumé as PDF". `[print-button.tsx:PrintButton]`
- `PrintMasthead()`: header with class `print-only`, rendering `site.person`, `site.role`, `site.company`, `site.location`, `site.email`, `siteUrl`, GitHub/LinkedIn and `site.pitch`. `[print-masthead.tsx:PrintMasthead]`
- `TimelineRail({ children })`: client component that draws a scroll-linked vertical rail. `[timeline-rail.tsx:TimelineRail]`
- All exports are named. `'use client'` appears only in `print-button.tsx` and `timeline-rail.tsx`.

## Invariants

- `AboutHero` and `AboutCta` set `data-print="hide"` on their root section. `[about-hero.tsx:AboutHero]` `[about-cta.tsx:AboutCta]`
- `bare(url)` strips `^https?://(www\.|fr\.)?` before printing a URL. `[print-masthead.tsx:bare]`
- Timeline entries are keyed `${entry.org}-${entry.period}`. `entry.current` switches on the brand border and adds the "· Current" label. `place` renders only when present. `[career-timeline.tsx:CareerTimeline]`
- `TimelineRail` uses `scaleY: reduce ? 1 : scrollYProgress` (`useReducedMotion()`) and `useScroll` with offset `['start 75%', 'end 60%']`. `[timeline-rail.tsx:TimelineRail]`

## Side Effects

- `window.print()` on click. `[print-button.tsx:PrintButton]`
- A scroll subscription through Motion's `useScroll({ target: ref })`. The file adds no `addEventListener` of its own. `[timeline-rail.tsx:TimelineRail]`
- No other file in this directory has side effects. `[about-cta.tsx:AboutCta]` `[principles-section.tsx:PrinciplesSection]`

## Verification

- Run: `pnpm verify` (runs `pnpm lint && pnpm build`)
