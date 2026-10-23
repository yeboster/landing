import { site } from '@/lib/site'

/** "Open to …" pill. The wording lives in `site.availability` so it is stated once. */
export function AvailabilityBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
      <span aria-hidden className="size-2 animate-pulse-dot rounded-full bg-emerald-500" />
      {site.availability.label}
    </span>
  )
}
