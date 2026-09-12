import type { Metadata } from 'next'
import { site } from '@/lib/site'
import NowClient from '@/components/now-client'
export const metadata: Metadata = { title: 'Now', description: `What ${site.person} is working on right now — ${site.company}, side projects, and the current stack.` }
export default function NowPage() { return <NowClient /> }
