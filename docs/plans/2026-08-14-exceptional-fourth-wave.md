# Fourth-Wave "Exceptional" Implementation Plan

> **For Hermes:** Execute via Claude Code CLI in per-task chunks (build + commit after EACH task). See `static-site-improvements` skill.

**Goal:** Elevate bon.so from "interactive" to "exceptional" — butter-smooth scrolling, agency-grade micro-typography, cinematic theme switching, and playful easter eggs with real personality.

**Architecture:** Eight small islands on the existing Next 15 / motion v12 / Tailwind 3.4 app. ONE new dependency allowed: `lenis` (smooth scroll). Everything else is hand-rolled. Every feature honors `prefers-reduced-motion` (motion features degrade to static/instant, never broken).

**Tech Stack:** Next 15, React 19, motion v12 (`motion/react`), Tailwind 3.4, lenis, accent `#9f4f9d`.

**Hard invariants (must not break):**
- `transitionEnd: { filter: 'none' }` in `split-text.tsx` visible variant (Chrome gradient-text bug).
- All existing reduced-motion guards + every new motion feature gets one.
- Identity from `src/lib/site.ts` only. No invented bio/employer/project claims anywhere.
- No new deps except `lenis` (Task 1). `package.json`/`pnpm-lock.yaml` diff must contain lenis ONLY.
- Do not touch `docs/`.
- Per-chunk build: `rm -rf .next && node node_modules/next/dist/bin/next build` (NEVER pnpm build — non-TTY abort). Must show `✓ Generating static pages`, exit 0. Fix failures within the current task before committing.
- Commit ONLY the task's own files (never `git add -A`), exact messages below.

---

### Task 1: Lenis smooth scrolling

**Files:**
- Modify: `package.json` (add `"lenis": "^1"` — run `node node_modules/.bin/pnpm add lenis` if pnpm works, else `npm install lenis --no-audit --no-fund`; whichever succeeds. Lockfile update is expected HERE and only here.)
- Create: `src/components/smooth-scroll.tsx`
- Modify: `src/app/layout.tsx` (wrap `{children}` in `<SmoothScroll>`)

**Spec:**
- `'use client'`; use `import { ReactLenis } from 'lenis/react'` with `root` and options `{ lerp: 0.1, duration: 1.15, smoothWheel: true }`.
- Reduced motion: `useReducedMotion()` → render children WITHOUT the Lenis wrapper (native scroll).
- Anchor compatibility: intercept clicks on `a[href^="#"]` → `lenis.scrollTo(hash)` (or rely on lenis `anchors: true` option if the installed version supports it — check the lenis/react README in node_modules).
- Must not break the existing scroll-driven features: `useScroll()` in scroll-progress.tsx reads native scroll — Lenis drives native scroll by default so this works; VERIFY scroll progress bar still animates by reading its code after integration.
- Navbar hide-on-scroll uses `useMotionValueEvent(scrollY, ...)` — same native-scroll basis, should keep working; verify by reading navbar.tsx.

**Commit:** `feat: lenis smooth scrolling (reduced-motion safe)`

---

### Task 2: Film grain overlay

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx` (one `<div className="grain" aria-hidden="true" />` as last body child)

**Spec:**
- `.grain`: `position: fixed; inset: -50%; width: 200%; height: 200%; pointer-events: none; z-index: 90; opacity: 0.035` (dark: `dark:opacity-50`-style tweak via media query if needed — keep subtle).
- Background: inline SVG feTurbulence noise as data-URI `background-image`, `background-size: 256px`.
- Static (no keyframe jitter) under `@media (prefers-reduced-motion: reduce)`; otherwise an 8-step `steps(8)` jitter animation translating the background position, ~1s loop. Keep opacity LOW — texture, not snow.

**Commit:** `feat: subtle film grain overlay`

---

### Task 3: Scramble/decode hover on navbar links

**Files:**
- Create: `src/components/scramble-text.tsx`
- Modify: `src/app/navbar.tsx` (wrap desktop nav link labels — and footer social labels in `src/app/footer.tsx` if they render text)

**Spec:**
- Component props: `text: string`, `className?`. On pointerenter, animate: each character cycles through a glyph pool (`!<>-_\\/[]{}—=+*^?#`) 2-3 times before settling to the real char, left-to-right stagger (~28ms per char), total ~400ms. Implementation: `setInterval`/`rAF` driving a `useState` string; cancel + restore on pointerleave mid-animation.
- Screen readers: render real text in an `sr-only` span; the animated span gets `aria-hidden="true"`.
- Reduced motion OR touch (`matchMedia('(hover: none)')`): render plain text, zero JS listeners.
- Apply to navbar desktop links only (mobile menu links excluded — they're transient).

**Commit:** `feat: scramble-decode hover on navbar links`

---

### Task 4: Scroll-illuminated manifesto paragraph (homepage)

**Files:**
- Create: `src/components/scroll-reveal-text.tsx`
- Modify: `src/components/home-client.tsx` (new section directly AFTER the hero, BEFORE the cards/marquee — read the file to find the seam)

**Spec:**
- Copy: compose ONE short paragraph (25-40 words) STRICTLY from facts already present in home-client.tsx / about-client.tsx (role, Paris, fraud-prevention at Trustpair, side projects). Do NOT invent claims, numbers, or employers. Eyebrow: match the page's eyebrow style.
- Mechanic: split into words; container `useScroll({ target: ref, offset: ['start 0.8', 'start 0.25'] })`; each word is a `motion.span` whose `opacity` is a `useTransform(scrollYProgress, [start, end], [0.15, 1])` slice proportional to its index. Result: paragraph illuminates left-to-right as you scroll into it.
- No SplitText needed here (this is scroll-linked, not entrance); keep the h2/eyebrow consistent with neighboring sections.
- Reduced motion: render the paragraph at full opacity, no scroll hook subscription.
- The section must include the standard `fadeUp` entrance wrapper so it matches the page rhythm.

**Commit:** `feat: scroll-illuminated manifesto paragraph on homepage`

---

### Task 5: Circular theme transition (View Transitions API)

**Files:**
- Modify: `src/components/theme-toggle.tsx` (read it and `theme-provider.tsx` first — reuse the existing set-theme call)

**Spec:**
- On toggle click: if `document.startViewTransition` exists AND not reduced motion:
  1. Capture click coords `(x, y)`.
  2. `document.startViewTransition(() => applyTheme())` where applyTheme is the EXISTING theme switch.
  3. Inject (once, module scope) a `<style>` with `::view-transition-old(root) { animation: none } ::view-transition-new(root) { animation: theme-circle .55s ease-in }` plus `@keyframes theme-circle { from { clip-path: circle(0px at var(--tx) var(--ty)) } to { clip-path: circle(150% at var(--tx) var(--ty)) } }`; set `--tx`/`--ty` on `document.documentElement` before starting.
  4. Fallback (Firefox/Safari/reduced motion): plain existing toggle, zero behavioral change.
- Feature-detect per click; never throw if the API is missing.

**Commit:** `feat: circular theme reveal via View Transitions API`

---

### Task 6: Terminal-themed 404

**Files:**
- Create: `src/app/not-found.tsx`
- Reuse: the visual language of `src/components/terminal-card.tsx` (read it; extract nothing — just match styling: macOS dots, `marco@bon.so ~ zsh`, font-mono, dark card)

**Spec:**
- Server component shell is fine; interactivity not required. Content:
  - Terminal card showing: `$ cd <path>` is overkill — keep static: `$ open <requested>` is unavailable server-side; use `$ open ???` NO — keep it simple and static:
    - line 1: `$ open page`
    - line 2: `zsh: command not found: 404`
    - line 3: `this page doesn't exist (or I haven't built it yet)`
  - Below: two links styled like the terminal hint: `cd /home` (→ `/`) and `press ⌘K anywhere` hint text.
- Page must export `metadata` = `{ title: '404 — command not found' }` if it stays a server component; if client needed, keep parent layout metadata pattern used by other pages.
- Match site container width/centering; footer+navbar come from layout automatically.

**Commit:** `feat: terminal-themed 404 page`

---

### Task 7: Konami code → Matrix rain easter egg

**Files:**
- Create: `src/components/konami-matrix.tsx`
- Modify: `src/app/layout.tsx` (mount once)

**Spec:**
- Listen for the sequence `ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a` (case-insensitive for letters). Rolling buffer of last 10 keys, compare on each keydown.
- On match: mount a full-screen fixed canvas (`z-[95]`, click + `Escape` dismiss, auto-dismiss after 12s).
- Rain: classic matrix columns — monospace glyphs (katakana + digits + `marco` rarely for a wink), `fillStyle` fade trail via `rgba(0,0,0,0.08)` rect per frame, glyph color `#9f4f9d` (violet rain — on-brand, NOT green). ~24fps (skip frames or throttle rAF).
- A tiny `hint` toast bottom-center on activation: `matrix mode — esc to exit` (auto-fades).
- DPR-aware sizing, resize handler, full cleanup on unmount/dismiss (cancel rAF, remove listeners).
- Reduced motion: feature disabled entirely (listener not even attached).

**Commit:** `feat: konami code matrix-rain easter egg`

---

### Task 8: /now becomes live + count-up stats

**Files:**
- Create: `src/components/paris-now.tsx`
- Modify: `src/components/now-client.tsx` (render `<ParisNow />` near the top — read the file for placement + card style conventions)
- Modify: `src/components/github-stats.tsx` (count-up numbers)

**Spec — ParisNow:**
- A compact chip/card row: pulsing dot + `Paris` + live ticking local time (`Europe/Paris` via `Intl.DateTimeFormat` with `timeZone`, update every 1s, cleanup on unmount) + current weather (emoji glyph + °C + short label) from `https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m,weather_code` — map WMO weather_code to ~8 labels/glyphs.
- Fetch failure → render time only; time failure impossible. Never render an error box (same philosophy as github-stats returning null on failure).
- Client component; SSR placeholder avoids layout shift (fixed-height row).

**Spec — count-up:**
- In github-stats.tsx: when the stats row first enters viewport (motion `useInView`, `once: true`), animate each number 0 → value using motion's `animate(0, value, { duration: 1.2, ease: 'easeOut', onUpdate })` writing to state or a ref+render. Reduced motion: show final values immediately.
- Numbers only; labels static.

**Commit:** `feat: live Paris time/weather on /now + count-up GitHub stats`

---

### Task 9: Final sweep + push

1. `grep -rn 'console.log' src/` → remove any new debug logging.
2. `git diff e4ff575..HEAD -- package.json` shows ONLY lenis added (plus lockfile).
3. Reduced-motion guard present in: smooth-scroll, scramble-text, scroll-reveal-text, konami-matrix, grain (CSS media query), theme transition — grep to confirm each.
4. Final build green (`✓ Generating static pages`, exit 0).
5. `git push origin main`.
6. Final message: files changed per task, per-task one-liner, `git log --oneline -12`, build result, push confirmation.

**Commit (only if sweep changed code):** `chore: fourth-wave sweep`

---

## Post-deploy live verification (supervisor)

Cache-busted curl for: 404 page content on a bogus URL (`curl -s https://bon.so/nope?cb=N | grep -i 'command not found'`), homepage manifesto section text, /now Paris chip. Browser checks: scramble on nav hover, theme circle transition (click toggle, screenshot mid-transition is bonus — just verify theme still flips), matrix rain via synthesized Konami key sequence, lenis active (`window.lenis` or smooth wheel feel — check DOM class), grain visible in screenshot.
