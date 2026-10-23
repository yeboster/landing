import { cn } from '@/lib/utils'

/**
 * Technology tags in mono. Outlined rather than filled: muted text on a muted
 * fill drops below AA contrast in dark mode.
 */
export function TagList({ tags, label = 'Technologies', className }: { tags: string[]; label?: string; className?: string }) {
  if (!tags.length) return null
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] leading-5 text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
