import type { Metadata } from 'next'
import ContactClient from '@/components/contact-client'
export const metadata: Metadata = { title: 'Contact', description: 'Get in touch with Yeboster about freelance work, collaborations, and interesting ideas.' }
export default function ContactPage() { return <ContactClient /> }
