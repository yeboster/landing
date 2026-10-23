import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import type { PostMeta } from '@/lib/post'

import { PostMetaLine, TagList } from './post-meta'

/** Editorial index: one row per post, newest first, the whole row clickable. */
export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <RevealGroup as="ol" className="divide-y divide-border border-y border-border">
      {posts.map((post) => (
        <RevealItem as="li" key={post.slug}>
          <article className="group relative py-8 sm:py-10">
            <PostMetaLine post={post} />
            <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
              {/* The ::after stretches the link over the row, so the whole article is one target. */}
              <Link
                href={`/writing/${post.slug}`}
                className="inline-flex items-start gap-2 transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:text-brand-ink"
              >
                {post.title}
                <ArrowUpRight
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-ink"
                />
              </Link>
            </h2>
            {post.description ? (
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{post.description}</p>
            ) : null}
            <TagList tags={post.tags} className="mt-5" />
          </article>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
