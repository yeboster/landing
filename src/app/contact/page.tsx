import type { Metadata } from 'next'
import { site } from '@/lib/site'
import ContactClient from '@/components/contact-client'
export const metadata: Metadata = { title: 'Contact', description: `Get in touch about Rails, AI and platform work. I reply within ${site.responseTime}.` }
export default function ContactPage() { return <ContactClient /> }
