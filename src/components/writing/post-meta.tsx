import { formatDate, type PostMeta } from '@/lib/post'
import { cn } from '@/lib/utils'

/** Drafts only ever render in `next dev`, so the badge is a reminder, not a feature. */
export function DraftBadge() {
  return (
    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
      Draft
    </span>
  )
}

/** "Sep 05, 2026 · 6 min read", in mono. */
export function PostMetaLine({
  post,
  dateStyle = 'short',
  className,
}: {
  post: Pick<PostMeta, 'date' | 'readingTime' | 'draft'>
  dateStyle?: 'long' | 'short'
  className?: string
}) {
  return (
    <p className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground', className)}>
      <time dateTime={post.date}>{formatDate(post.date, dateStyle)}</time>
      <span aria-hidden>·</span>
      <span>{post.readingTime} min read</span>
      {post.draft ? <DraftBadge /> : null}
    </p>
  )
}

export function TagList({ tags, className }: { tags: string[]; className?: string }) {
  if (!tags.length) return null
  return (
    <ul className={cn('flex flex-wrap gap-2', className)} aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
          {tag}
        </li>
      ))}
    </ul>
  )
}
