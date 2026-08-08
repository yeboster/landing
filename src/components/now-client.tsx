'use client'

import { motion, type Variants } from 'motion/react'
import { Briefcase, Server, Bot, Code2, Clock } from 'lucide-react'
import { Chip } from '@/components/ui/chip'
import { Section, SectionTitle } from '@/components/ui/section'
import { TiltCard } from '@/components/tilt-card'
import { SplitText } from '@/components/split-text'
import { Aurora } from '@/components/aurora'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

const focus = [
  {
    icon: Briefcase,
    title: 'Trustpair, Paris',
    description: 'Software Engineer building anti-fraud products on Rails 8 with Sidekiq. Architected the TrustAI LLM framework and shipped GenAI + VoiceAI features.',
  },
  {
    icon: Server,
    title: 'Home Kubernetes Cluster',
    description: 'Running a Talos/Kubernetes home cluster, managed via GitOps with FluxCD, Helm and Kustomize.',
  },
  {
    icon: Bot,
    title: 'AI Automation Agents',
    description: 'Building agents that automate parts of my own workflow, from code review to infra maintenance.',
  },
  {
    icon: Code2,
    title: 'bon.so',
    description: 'This site — a Next.js playground for trying out new interaction and motion ideas.',
  },
]

const stack = ['TypeScript', 'Rust', 'Kubernetes', 'Rails']

export default function NowClient() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero */}
      <section className="w-full pt-16 md:pt-28 lg:pt-36 pb-12 md:pb-20 relative">
        <Aurora maxOffset={14}>
          <div className="aurora absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-[#9f4f9d]/20 dark:bg-[#9f4f9d]/25 blur-3xl" />
          <div className="aurora absolute top-24 -left-32 h-[320px] w-[420px] rounded-full bg-[#c06fbe]/10 dark:bg-[#c06fbe]/15 blur-3xl [animation-delay:-6s]" />
          <div className="aurora absolute top-40 -right-32 h-[320px] w-[420px] rounded-full bg-[#7a3a78]/10 dark:bg-[#7a3a78]/20 blur-3xl [animation-delay:-11s]" />
        </Aurora>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-800/50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <Chip>Now</Chip>
          </motion.div>
          <h1 className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl" aria-label="What I'm focused on now">
            <SplitText text="What I'm focused on" by="word" />{' '}
            <span className="bg-gradient-to-r from-[#9f4f9d] via-[#c06fbe] to-[#9f4f9d] bg-clip-text text-transparent">
              <SplitText text="now" by="letter" />
            </span>
          </h1>
          <motion.p
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300 md:text-xl"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            A snapshot of my work, side projects, and current stack — in the spirit of{' '}
            <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-gray-900 dark:hover:text-white transition-colors">
              nownownow.com
            </a>.
          </motion.p>
          <motion.p
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500"
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
          >
            <Clock className="w-4 h-4" aria-hidden="true" />
            Last updated August 2026
          </motion.p>
        </div>
      </section>

      {/* Focus grid */}
      <Section className="bg-gray-100 dark:bg-gray-800/50">
        <SectionTitle>
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={0} variants={fadeUp}
          >
            <Chip>Right Now</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={1} variants={fadeUp}
          >
            Work &amp; Side Projects
          </motion.h2>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
          {focus.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={scaleIn}
              >
                <TiltCard className="group relative p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#9f4f9d]/50 dark:hover:border-[#9f4f9d]/50 transition-colors duration-300 cursor-default h-full">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 group-hover:bg-[#9f4f9d] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                    {item.description}
                  </p>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* Current stack */}
      <Section>
        <SectionTitle>
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={0} variants={fadeUp}
          >
            <Chip>Current Stack</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={1} variants={fadeUp}
          >
            What I&apos;m Reaching For
          </motion.h2>
        </SectionTitle>

        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mt-8 max-w-2xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          custom={0} variants={fadeUp}
        >
          {stack.map((s) => (
            <span
              key={s}
              className="px-4 py-2 text-sm rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#9f4f9d]/50 hover:text-[#9f4f9d] dark:hover:text-[#c06fbe] transition-colors duration-300"
            >
              {s}
            </span>
          ))}
        </motion.div>
      </Section>
    </main>
  )
}
