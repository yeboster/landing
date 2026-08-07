'use client'

import { motion, type Variants } from 'motion/react'
import { ArrowRight, User, Briefcase, MessageCircle, ChevronDown, Zap } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { RotatingText } from '@/components/rotating-text'
import { MagneticLink } from '@/components/magnetic-link'
import { AvailabilityBadge } from '@/components/availability-badge'
import { TechMarquee } from '@/components/tech-marquee'
import { GithubStats } from '@/components/github-stats'
import { SplitText } from '@/components/split-text'
import { Aurora } from '@/components/aurora'
import { TiltCard } from '@/components/tilt-card'

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

const roles = ['Full-stack Developer', 'Rust Engineer', 'Kubernetes Wrangler', 'Builder']

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
        {/* Aurora background with mouse-parallax */}
        <Aurora maxOffset={14}>
          <div className="aurora absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-[#9f4f9d]/20 dark:bg-[#9f4f9d]/25 blur-3xl" />
          <div className="aurora absolute top-24 -left-32 h-[320px] w-[420px] rounded-full bg-[#c06fbe]/10 dark:bg-[#c06fbe]/15 blur-3xl [animation-delay:-6s]" />
          <div className="aurora absolute top-40 -right-32 h-[320px] w-[420px] rounded-full bg-[#7a3a78]/10 dark:bg-[#7a3a78]/20 blur-3xl [animation-delay:-11s]" />
        </Aurora>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-900 pointer-events-none" />
        <div className="flex flex-col items-center justify-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Logo className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_24px_rgba(159,79,157,0.35)]" width={128} height={128} />
          </motion.div>
          <h1
            className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl"
            aria-label="Yeboster"
          >
            <SplitText text="Yeboster" stagger={0.06} by="letter" />
          </h1>
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            <RotatingText words={roles} />
          </motion.p>
          <motion.p
            className="mt-2 text-sm text-gray-400 dark:text-gray-500"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            Build Together to Live Forever
          </motion.p>
          <motion.div
            className="mt-5"
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
          >
            <AvailabilityBadge />
          </motion.div>
          <motion.div
            initial="hidden" animate="visible" custom={4} variants={fadeUp}
            className="mt-8"
          >
            <MagneticLink href="/portfolio">
              View my work
              <ArrowRight className="w-4 h-4" />
            </MagneticLink>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-14 text-gray-400 dark:text-gray-500"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Tech marquee */}
      <TechMarquee />

      {/* Now + GitHub stats */}
      <section className="w-full py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid gap-6 md:grid-cols-2">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            custom={0} variants={fadeUp}
          >
            <TiltCard className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-[#9f4f9d]/10 dark:bg-[#9f4f9d]/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#9f4f9d]" />
                </span>
                <h2 className="text-xl font-bold tracking-tight">Now</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Full-stack developer building products, exploring ML, and crafting side projects that matter.
                Currently shipping with TypeScript, Rust, and Kubernetes.
              </p>
            </TiltCard>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            custom={1} variants={fadeUp}
          >
            <TiltCard className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-[#9f4f9d]/10 dark:bg-[#9f4f9d]/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-[#9f4f9d]" />
                </span>
                <h2 className="text-xl font-bold tracking-tight">Open Source, Live</h2>
              </div>
              <GithubStats />
              <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                Pulled live from{' '}
                <Link href="https://github.com/yeboster" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#9f4f9d] transition-colors">
                  github.com/yeboster
                </Link>
              </p>
            </TiltCard>
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
                    <TiltCard className="group h-full p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#9f4f9d]/50 dark:hover:border-[#9f4f9d]/50 transition-all duration-300 cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6 group-hover:bg-[#9f4f9d] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight">{card.title}</h2>
                      <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {card.description}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#9f4f9d] group-hover:gap-3 transition-all duration-300">
                        {card.cta}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </TiltCard>
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
