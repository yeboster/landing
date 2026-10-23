import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PostFooter } from '@/components/writing/post-footer'
import { PostHeader } from '@/components/writing/post-header'
import { TableOfContents, TableOfContentsDisclosure, TOC_MIN_HEADINGS } from '@/components/writing/table-of-contents'
import { headings, Markdown } from '@/lib/markdown'
import { site, siteUrl } from '@/lib/site'
import { getPost, getPosts } from '@/lib/writing'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${siteUrl}/writing/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `${siteUrl}/writing/${post.slug}`,
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: site.person, url: siteUrl },
    mainEntityOfPage: `${siteUrl}/writing/${post.slug}`,
  }

  const outline = headings(post.content)
  const toc = outline.length >= TOC_MIN_HEADINGS ? outline : null

  // `<` escaped so a title containing `</script>` can't close the tag early.
  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }} />
      <div className="container pb-24 pt-12 md:pb-32 md:pt-20">
        {/* Three columns on wide screens keep the article centred with the outline beside it. */}
        <div className="mx-auto max-w-2xl xl:grid xl:max-w-none xl:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)] xl:gap-12">
          <div className="xl:col-start-2 xl:row-start-1">
            <article>
              <PostHeader post={post} />
              {toc ? <TableOfContentsDisclosure items={toc} className="mt-10 xl:hidden" /> : null}
              <hr className="my-10 border-border md:my-12" />
              <Markdown source={post.content} />
            </article>
            <PostFooter />
          </div>
          {toc ? (
            <aside className="hidden xl:col-start-3 xl:row-start-1 xl:block">
              <TableOfContents items={toc} className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pt-2" />
            </aside>
          ) : null}
        </div>
      </div>
    </main>
  )
}
