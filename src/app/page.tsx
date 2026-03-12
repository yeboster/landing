'use client'

import { motion } from 'framer-motion'
import { ArrowRight, User, Briefcase, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'

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

const cards = [
  {
    icon: User,
    title: 'About Me',
    description: 'A brief introduction about myself and my journey in the world.',
    href: '/about',
    cta: 'Learn more',
  },
  {
    icon: Briefcase,
    title: 'My Portfolio',
    description: 'Discover my skills, projects, and my passion for technology.',
    href: '/portfolio',
    cta: 'Check it out',
  },
  {
    icon: MessageCircle,
    title: 'Get in Touch',
    description: 'Feel free to reach out if you\'re looking for a developer, have a question, or just want to connect.',
    href: '/contact',
    cta: 'Contact Me',
  },
]

export default function Home() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero */}
      <section className="w-full py-20 md:py-32 lg:py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-900 pointer-events-none" />
        <div className="flex flex-col items-center justify-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Logo className="w-24 h-24 md:w-32 md:h-32" width={128} height={128} />
          </motion.div>
          <motion.h1
            className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl"
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
          >
            Yeboster
          </motion.h1>
          <motion.p
            className="mt-3 text-base md:text-lg text-gray-500 dark:text-gray-400"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            Build Together to Live Forever
          </motion.p>
          <motion.div
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 text-sm"
            >
              View my work
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  custom={i}
                  variants={scaleIn}
                >
                  <Link href={card.href} className="block h-full">
                    <motion.div
                      className="group h-full p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-pointer"
                      whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight">{card.title}</h2>
                      <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {card.description}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white group-hover:gap-3 transition-all duration-300">
                        {card.cta}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
