'use client'

import { motion, type Variants } from "motion/react"
import { CalendarClock, Twitter, ArrowRight } from 'lucide-react'
import { Chip } from '@/components/ui/chip'
import { Section, SectionTitle } from '@/components/ui/section'
import { AvailabilityBadge } from '@/components/availability-badge'
import { ContactForm } from '@/components/contact-form'
import { site } from '@/lib/site'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
}

type Channel = {
  icon: typeof CalendarClock
  title: string
  description: string
  href: string
  cta: string
}

const socialChannels: Channel[] = [
  {
    icon: Twitter,
    title: 'Twitter',
    description: 'Follow me on Twitter to stay updated with my latest projects.',
    href: site.socials.twitter,
    cta: 'Follow me',
  },
]

const bookingChannel: Channel = {
  icon: CalendarClock,
  title: 'Book a call',
  description: 'Prefer a call? Grab 20 minutes on my calendar.',
  href: site.booking,
  cta: 'Book a call',
}

const channels: Channel[] = site.booking
  ? [bookingChannel, ...socialChannels]
  : socialChannels

export default function Contact() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero */}
      <section className="w-full pt-16 md:pt-28 lg:pt-36 pb-12 md:pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-800/50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <Chip>Contact</Chip>
          </motion.div>
          <motion.h1
            className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
          >
            Let&apos;s{' '}
            <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-800/50 bg-clip-text text-transparent">
              connect
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300 md:text-xl"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            I&apos;m always open to discuss your projects, innovative ideas, or opportunities to be part of your visions.
          </motion.p>
          <motion.div
            className="mt-6"
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
          >
            <AvailabilityBadge />
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <Section>
        <SectionTitle>
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={0} variants={fadeUp}
          >
            <Chip>Message</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={1} variants={fadeUp}
          >
            Send Me a Message
          </motion.h2>
        </SectionTitle>
        <motion.div
          className="max-w-2xl mx-auto mt-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-8"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          custom={2} variants={fadeUp}
        >
          <ContactForm />
        </motion.div>
      </Section>

      {/* Contact Cards */}
      <Section className="bg-gray-100 dark:bg-gray-800/50">
        <SectionTitle>
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={0} variants={fadeUp}
          >
            <Chip>Elsewhere</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={1} variants={fadeUp}
          >
            Elsewhere
          </motion.h2>
        </SectionTitle>

        <div className={`grid grid-cols-1 gap-6 mt-8 max-w-5xl mx-auto ${channels.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'max-w-md'}`}>
          {channels.map((channel, i) => {
            const Icon = channel.icon
            return (
              <motion.a
                key={channel.title}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group block p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300"
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{channel.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  {channel.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white group-hover:gap-3 transition-all duration-300">
                  {channel.cta}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.a>
            )
          })}
        </div>
      </Section>
    </main>
  )
}
