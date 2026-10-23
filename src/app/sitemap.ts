import type { MetadataRoute } from 'next'

import { navLinks, siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map(({ href }) => ({
    url: new URL(href, siteConfig.url).toString(),
    changeFrequency: 'monthly',
    priority: href === '/' ? 1 : 0.8,
  }))
}
