import { Aurora } from '@/components/aurora'

/**
 * Soft brand glow behind a page hero, shared by /about and /now. Two blobs,
 * kept faint so the headline stays the loudest thing on screen.
 */
export function HeroGlow() {
  return (
    <>
      <Aurora maxOffset={12}>
        <div className="aurora absolute -top-40 left-[10%] h-[420px] w-[640px] rounded-full bg-brand/15 blur-3xl dark:bg-brand/20" />
        <div className="aurora absolute -right-40 top-10 h-[320px] w-[420px] rounded-full bg-brand-strong/10 blur-3xl [animation-delay:-8s]" />
      </Aurora>
      <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-60" />
    </>
  )
}
