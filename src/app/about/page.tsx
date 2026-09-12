import type { Metadata } from 'next'
import { site } from '@/lib/site'
import AboutClient from '@/components/about-client'
export const metadata: Metadata = { title: 'About', description: `${site.person} — ${site.role} at ${site.company}, Paris. Career history, technical background, and how I work.` }
export default function AboutPage() { return <AboutClient /> }
