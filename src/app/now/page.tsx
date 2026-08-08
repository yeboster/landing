import type { Metadata } from 'next'
import NowClient from '@/components/now-client'
export const metadata: Metadata = { title: 'Now', description: "What Yeboster is focused on right now — work, side projects, and the current stack." }
export default function NowPage() { return <NowClient /> }
