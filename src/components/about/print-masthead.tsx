import { site, siteUrl } from '@/lib/site'

const bare = (url: string) => url.replace(/^https?:\/\/(www\.|fr\.)?/, '')

/** Masthead for the printed CV. Hidden on screen, where the hero does this job. */
export function PrintMasthead() {
  return (
    <header className="print-only mb-8 border-b border-black pb-4">
      <p className="text-3xl font-bold">{site.person}</p>
      <p className="mt-1 text-lg">
        {site.role} — {site.company}, {site.location}
      </p>
      <p className="mt-2 text-sm">
        {site.email} · {bare(siteUrl)} · {bare(site.socials.github)} · {bare(site.socials.linkedin)}
      </p>
      <p className="mt-2 text-sm">{site.pitch}</p>
    </header>
  )
}
