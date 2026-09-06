import { ogImage, size, contentType } from '@/lib/og'
import { getCaseStudies, getCaseStudy } from '@/lib/projects'

export { size, contentType }
export const alt = 'Case study — bon.so'

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  return ogImage({
    title: study?.title ?? 'Case study',
    subtitle: study?.description || undefined,
  })
}
