import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Markdown } from '@/lib/markdown'
import { formatDate } from '@/lib/post'
import { getCaseStudies, getCaseStudy } from '@/lib/projects'
import { Section } from '@/components/ui/section'
import { siteUrl } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `${siteUrl}/portfolio/${study.slug}` },
    openGraph: {
      type: 'article',
      title: study.title,
      description: study.description,
      url: `${siteUrl}/portfolio/${study.slug}`,
      publishedTime: study.date,
      tags: study.tags,
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  return (
    <main className="flex-1">
      <Section className="pt-16 md:pt-24 pb-24">
        <article className="mx-auto max-w-2xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[#9f4f9d] dark:text-gray-400"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>

          <header className="mt-8">
            <time className="text-sm text-gray-500 dark:text-gray-400" dateTime={study.date}>
              {formatDate(study.date)}
            </time>
            <h1 className="mt-3 text-4xl font-bold tracking-tighter sm:text-5xl">{study.title}</h1>
            {study.description ? (
              <p className="mt-4 text-xl text-gray-500 dark:text-gray-300">{study.description}</p>
            ) : null}
            {study.tags.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
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

          <Markdown source={study.content} />
        </article>
      </Section>
    </main>
  )
}
