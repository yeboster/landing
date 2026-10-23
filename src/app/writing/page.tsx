import type { Metadata } from 'next'

import { WritingEmptyState } from '@/components/writing/empty-state'
import { PostList } from '@/components/writing/post-list'
import { WritingHero } from '@/components/writing/writing-hero'
import { site, siteUrl } from '@/lib/site'
import { getPosts } from '@/lib/writing'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Long-form notes on Rails, Rust, Kubernetes, and the AI plumbing in between.',
  // Setting `alternates` replaces the layout's, so the feed link is restated here.
  alternates: {
    canonical: `${siteUrl}/writing`,
    types: { 'application/rss+xml': [{ url: '/writing/rss.xml', title: `${site.person} — Writing` }] },
  },
}

export default function WritingPage() {
  const posts = getPosts()

  return (
    <main className="flex-1 overflow-hidden">
      <WritingHero />
      <section aria-label="Posts" className="w-full pb-24 md:pb-32">
        <div className="container max-w-3xl">
          {posts.length ? <PostList posts={posts} /> : <WritingEmptyState />}
        </div>
      </section>
    </main>
  )
}
