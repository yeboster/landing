'use client'

import { motion } from 'framer-motion'
import { Code2, Lightbulb, Rocket, Heart, Coffee, Zap, Compass, Route, Sparkles } from 'lucide-react'
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const values = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing code that humans can read, not just machines.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Learning',
    description: 'Always exploring new technologies and pushing boundaries.',
  },
  {
    icon: Rocket,
    title: 'Ship Fast',
    description: 'Bias towards action. Build, iterate, improve.',
  },
  {
    icon: Heart,
    title: 'User First',
    description: 'Every line of code serves a person on the other side.',
  },
  {
    icon: Coffee,
    title: 'Deep Work',
    description: 'Focused sessions over scattered multitasking.',
  },
  {
    icon: Zap,
    title: 'Simplicity',
    description: 'The best solution is often the simplest one.',
  },
]

const timeline = [
  {
    icon: Compass,
    label: 'Now',
    title: 'Full-Stack Developer',
    description: 'Building products, exploring ML, and crafting side projects that matter.',
  },
  {
    icon: Route,
    label: 'The Path',
    title: 'From Curiosity to Craft',
    description: 'What started as tinkering became a career — from first scripts to production systems.',
  },
  {
    icon: Sparkles,
    label: 'The Future',
    title: 'Builder & Creator',
    description: 'Merging software engineering with data science to create impactful tools.',
  },
]

export default function About() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero */}
      <section className="w-full pt-16 md:pt-28 lg:pt-36 pb-12 md:pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-800/50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <Chip>About Me</Chip>
          </motion.div>
          <motion.h1
            className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
          >
            Building things that{' '}
            <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-800/50 bg-clip-text text-transparent">
              matter
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300 md:text-xl"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            Developer, tinkerer, and lifelong learner. I believe in building together
            to create things that last.
          </motion.p>
        </div>
      </section>

      {/* Journey Timeline */}
      <Section className="bg-gray-100 dark:bg-gray-800/50">
        <SectionTitle>
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={0} variants={fadeUp}
          >
            <Chip>My Story</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={1} variants={fadeUp}
          >
            The Journey So Far
          </motion.h2>
        </SectionTitle>

        <div className="max-w-3xl mx-auto mt-12 space-y-0">
          {timeline.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                className="relative flex gap-6 pb-12 last:pb-0"
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={i % 2 === 0 ? slideInLeft : slideInRight}
              >
                {/* Timeline line + icon */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 shrink-0"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gray-300 dark:bg-gray-400 mt-2" />
                  )}
                </div>
                <div className="pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-300">
                    {item.label}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* Values Grid */}
      <Section>
        <SectionTitle>
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={0} variants={fadeUp}
          >
            <Chip>My Philosophy</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={1} variants={fadeUp}
          >
            How I Approach Work
          </motion.h2>
          <motion.p
            className="max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-400"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={2} variants={fadeUp}
          >
            The principles that guide every line of code I write.
          </motion.p>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                className="group relative p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-300 cursor-default"
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gray-100 dark:bg-gray-800/50">
        <motion.div
          className="text-center"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          custom={0} variants={fadeUp}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Want to build something together?
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
            I&apos;m always open to interesting projects, collaborations, or just a good conversation about tech.
          </p>
          <motion.a
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </Section>
    </main>
  )
}
