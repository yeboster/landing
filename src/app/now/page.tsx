import type { Metadata } from 'next'

import { FocusGrid } from '@/components/now/focus-grid'
import { NowHero } from '@/components/now/now-hero'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Now',
  description: `What ${site.person} is working on right now — ${site.company}, side projects, and the current stack.`,
}

export default function NowPage() {
  return (
    <main className="flex-1 overflow-x-clip">
      <NowHero />
      <FocusGrid />
    </main>
  )
}
