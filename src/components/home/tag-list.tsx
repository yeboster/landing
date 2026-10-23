import { cn } from '@/lib/utils'

/** Small mono tags for a card's stack. Static labels, so no hover state. */
export function TagList({ tags, className }: { tags: readonly string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-border bg-subtle px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
