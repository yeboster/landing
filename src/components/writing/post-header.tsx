import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import type { PostMeta } from '@/lib/post'

import { PostMetaLine, TagList } from './post-meta'

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft aria-hidden className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5" />
      {children}
    </Link>
  )
}

export function PostHeader({ post }: { post: PostMeta }) {
  return (
    <header>
      <Reveal immediate>
        <BackLink href="/writing">All writing</BackLink>
      </Reveal>
      <Reveal immediate delay={0.05} className="mt-10">
        <PostMetaLine post={post} dateStyle="long" />
        <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{post.title}</h1>
        {post.description ? (
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">{post.description}</p>
        ) : null}
        <TagList tags={post.tags} className="mt-6" />
      </Reveal>
    </header>
  )
}
