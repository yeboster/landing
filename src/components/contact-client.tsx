'use client'

import { motion, type Variants } from "motion/react"
import { CalendarClock, Twitter, Linkedin, ArrowRight } from 'lucide-react'
import { Chip } from '@/components/ui/chip'
import { Section, SectionTitle } from '@/components/ui/section'
import { AvailabilityBadge } from '@/components/availability-badge'
import { ContactForm } from '@/components/contact-form'
import { TiltCard } from '@/components/tilt-card'
import { SplitText } from '@/components/split-text'
import { Aurora } from '@/components/aurora'
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
    icon: Linkedin,
    title: 'LinkedIn',
    description: 'Connect with me professionally — work, career, and recommendations.',
    href: site.socials.linkedin,
    cta: 'Connect',
  },
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
        {/* Aurora background with mouse-parallax */}
        <Aurora maxOffset={14}>
          <div className="aurora absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-[#9f4f9d]/20 dark:bg-[#9f4f9d]/25 blur-3xl" />
          <div className="aurora absolute top-24 -left-32 h-[320px] w-[420px] rounded-full bg-[#c06fbe]/10 dark:bg-[#c06fbe]/15 blur-3xl [animation-delay:-6s]" />
          <div className="aurora absolute top-40 -right-32 h-[320px] w-[420px] rounded-full bg-[#7a3a78]/10 dark:bg-[#7a3a78]/20 blur-3xl [animation-delay:-11s]" />
        </Aurora>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-800/50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <Chip>Contact</Chip>
          </motion.div>
          <h1 className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl" aria-label="Let's connect">
            <SplitText text="Let's" by="word" />{' '}
            <span className="bg-gradient-to-r from-[#9f4f9d] via-[#c06fbe] to-[#9f4f9d] bg-clip-text text-transparent">
              <SplitText text="connect" by="letter" />
            </span>
          </h1>
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
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={scaleIn}
              >
                <TiltCard className="group block p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#9f4f9d]/50 dark:hover:border-[#9f4f9d]/50 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6 group-hover:bg-[#9f4f9d] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">{channel.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                    {channel.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#9f4f9d] group-hover:gap-3 transition-all duration-300">
                    {channel.cta}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </TiltCard>
              </motion.a>
            )
          })}
        </div>
      </Section>
    </main>
  )
}
