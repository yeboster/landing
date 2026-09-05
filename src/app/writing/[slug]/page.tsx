import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Markdown } from '@/lib/markdown'
import { formatDate } from '@/lib/post'
import { getPost, getPosts } from '@/lib/writing'
import { Section } from '@/components/ui/section'
import { siteUrl } from '@/lib/site'

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
    author: { '@type': 'Person', name: 'Marco Vaccari', url: siteUrl },
    mainEntityOfPage: `${siteUrl}/writing/${post.slug}`,
  }

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Section className="pt-16 md:pt-24 pb-24">
        <article className="mx-auto max-w-2xl">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[#9f4f9d] dark:text-gray-400"
          >
            <ArrowLeft className="h-4 w-4" />
            All writing
          </Link>

          <header className="mt-8">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.draft ? (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  Draft
                </span>
              ) : null}
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tighter sm:text-5xl">{post.title}</h1>
            {post.description ? (
              <p className="mt-4 text-xl text-gray-500 dark:text-gray-300">{post.description}</p>
            ) : null}
            {post.tags.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          <hr className="my-10 border-gray-200 dark:border-gray-800" />

          <Markdown source={post.content} />
        </article>
      </Section>
    </main>
  )
}
