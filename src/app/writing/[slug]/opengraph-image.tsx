import { ogImage, size, contentType } from '@/lib/og'
import { getPost, getPosts } from '@/lib/writing'

export { size, contentType }
export const alt = 'Writing — bon.so'

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  return ogImage({
    title: post?.title ?? 'Writing',
    subtitle: post?.description || undefined,
  })
}
