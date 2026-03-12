'use client'

import { motion } from 'framer-motion'
import { Mail, Send, Twitter, ArrowRight } from 'lucide-react'
import { Chip } from '@/components/ui/chip'
import { Section, SectionTitle } from '@/components/ui/section'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
}

const channels = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Contact me via email for collaborations.',
    href: 'mailto:contact@yeboster.com?subject=Collaboration',
    cta: 'Email me',
  },
  {
    icon: Send,
    title: 'Telegram',
    description: 'Reach me on Telegram for quick chats or to discuss ideas.',
    href: 'https://t.me/yeboster',
    cta: 'Ping me',
  },
  {
    icon: Twitter,
    title: 'Twitter',
    description: 'Follow me on Twitter to stay updated with my latest projects.',
    href: 'https://twitter.com/yeboster',
    cta: 'Follow me',
  },
]

export default function Contact() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero */}
      <section className="w-full pt-16 md:pt-28 lg:pt-36 pb-12 md:pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-500 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <Chip>Contact</Chip>
          </motion.div>
          <motion.h1
            className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
          >
            Let&apos;s{' '}
            <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent">
              connect
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300 md:text-xl"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            I&apos;m always open to discuss your projects, innovative ideas, or opportunities to be part of your visions.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <Section className="bg-gray-100 dark:bg-gray-500">
        <SectionTitle>
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={0} variants={fadeUp}
          >
            <Chip>Get In Touch</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={1} variants={fadeUp}
          >
            Choose Your Channel
          </motion.h2>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          {channels.map((channel, i) => {
            const Icon = channel.icon
            return (
              <motion.a
                key={channel.title}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group block p-8 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 transition-all duration-300"
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-600 flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors duration-300">
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
