import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { getPosts } from '@/lib/writing'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ['', '/about', '/portfolio', '/now', '/writing', '/contact'].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: path === '' ? 1 : 0.8,
    }),
  )

  const posts: MetadataRoute.Sitemap = getPosts()
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/writing/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly',
      priority: 0.7,
    }))

  return [...pages, ...posts]
}
