# Header Polish + LinkedIn/Career Update — Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Fix the navbar's off-looking scrolled shade, apply the homepage SplitText letter animation to every page header, add LinkedIn across the site, and ground the About page in Marco's real career path.

**Architecture:** Single shared navbar (`src/app/navbar.tsx`) — one fix applies everywhere. Page heroes live in `src/components/{about,portfolio,contact}-client.tsx` and already use motion; reuse existing `SplitText` (`src/components/split-text.tsx`). Identity centralised in `src/lib/site.ts` — add `linkedin` there and cascade (footer, JSON-LD, contact channels).

**Tech Stack:** Next.js 15 app router, Tailwind, motion v12 (`motion/react`), lucide-react.

**Facts (verified):**
- LinkedIn: https://fr.linkedin.com/in/yeboster — Marco Vaccari, Trustpair, Paris. Education ITT G. Chilesotti 2013–2018. Headline: "passionate about learning new tech and methods, strong background in computer science".
- Trustpair work (from vault Achievements.md): TrustAI LLM framework architect, GenAI contact collection (+128pts), VoiceAI, observability/metrics, Ruby/Rails stack (Sidekiq, factory_bot, Metabase).

---

### Task 1: Fix navbar scrolled shade

**Problem:** `src/app/navbar.tsx:59` — scrolled state stacks `border-b` + `shadow-lg shadow-black/[0.03] dark:shadow-black/20`, producing a heavy shade band at the header's bottom edge.

**Fix:** Drop the shadow entirely, keep the blur + translucent bg, soften the border:

```
scrolled
  ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-900/5 dark:border-white/10'
  : 'bg-transparent border-b border-transparent'
```

### Task 2: SplitText animation on every page header

Mirror homepage hero (`home-client.tsx:81-86`): plain part by word, gradient keyword by letter, keep the existing gradient span classes and add `aria-label` with the full title on each h1.

- about-client.tsx h1: "Building things that **matter**"
- portfolio-client.tsx h1: "Things I've **built**"
- contact-client.tsx h1: "Let's **connect**"

Pattern per h1:
```tsx
<h1 className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl" aria-label="Building things that matter">
  <SplitText text="Building things that" by="word" />{' '}
  <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-800/50 bg-clip-text text-transparent">
    <SplitText text="matter" by="letter" />
  </span>
</h1>
```
Remove the now-unused motion wrapper on those h1s; keep following subtitle motion.p with fadeUp custom={2}. Apostrophes: `Things I've` → use `Things I&apos;ve` in JSX text — but since it becomes a JS string prop, write `text="Things I've"` (double-quoted attr, safe).

### Task 3: Add LinkedIn everywhere

1. `src/lib/site.ts`: add `linkedin: 'https://fr.linkedin.com/in/yeboster'` to `socials`.
2. `src/app/footer.tsx`: add `{href:site.socials.linkedin,icon:Linkedin,label:'LinkedIn'}` (import `Linkedin` from lucide-react).
3. `src/app/layout.tsx:13` JSON-LD sameAs: add `site.socials.linkedin`.
4. `contact-client.tsx` socialChannels: prepend LinkedIn card `{icon: Linkedin, title: 'LinkedIn', description: 'Connect with me professionally — work, career, and recommendations.', href: site.socials.linkedin, cta: 'Connect'}`. Grid already adapts (3 items → lg:grid-cols-3).

### Task 4: About page — real career path + LinkedIn

Rewrite `timeline` in about-client.tsx with verified facts (no invented employers):

```
- Now — Software Engineer @ Trustpair (Paris): "Building anti-fraud products on Rails — architected the TrustAI LLM framework, GenAI contact collection (+128pts), VoiceAI. Observability-first."
- The Path — From Thiene to Paris: "Computer science at ITT G. Chilesotti (2013–2018), then turned tinkering into a career — first scripts to production systems."
- Side by side — Builder: "bon.so, a Talos/Kubernetes home cluster, and AI automation agents — shipping side projects that matter."
- The Future — Builder & Creator: "Merging software engineering with data and AI to create impactful tools."
```

Hero subtitle: mention Trustpair + link LinkedIn:
```tsx
Software Engineer at Trustpair, tinkerer, and lifelong learner. I believe in building together to create things that last.
```
Add under subtitle a small LinkedIn link: `motion.a` href site.socials.linkedin, `text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white underline underline-offset-4`, text "Find me on LinkedIn →", custom={3} fadeUp. Import site + SplitText.

### Task 5: Verify + commit + push

- `pnpm build` (or npm run build) must pass after EACH task chunk.
- Commit per task: `feat: soften navbar scrolled shade`, `feat: split-text page headers`, `feat: add LinkedIn channel`, `feat: real career timeline on about`.
- Final: push to main (Vercel auto-deploys).

**Verification:** live curl after ~60s: `curl -s https://bon.so/about | grep -o 'linkedin.com/in/yeboster'`.
