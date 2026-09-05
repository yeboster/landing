import type { Metadata } from 'next'
import WritingClient from '@/components/writing-client'
import { getPosts } from '@/lib/writing'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Long-form notes on Rails, Rust, Kubernetes, and the AI plumbing in between.',
}

export default function WritingPage() {
  return <WritingClient posts={getPosts()} />
}
