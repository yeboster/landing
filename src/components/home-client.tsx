'use client'

import { useRef } from 'react'
import { motion, type Variants } from 'motion/react'
import { ArrowRight, ArrowUpRight, BookOpen, Building2, ChevronDown, FileText, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/ui/logo'
import { RotatingText } from '@/components/rotating-text'
import { MagneticLink } from '@/components/magnetic-link'
import { AvailabilityBadge } from '@/components/availability-badge'
import { TechMarquee } from '@/components/tech-marquee'
import { GithubStats } from '@/components/github-stats'
import { SplitText } from '@/components/split-text'
import { Aurora } from '@/components/aurora'
import { TiltCard } from '@/components/tilt-card'
import { DotGrid, type DotGridHandle } from '@/components/dot-grid'
import { TerminalCard } from '@/components/terminal-card'
import { ScrollRevealText } from '@/components/scroll-reveal-text'
import { highlightedProjects } from '@/lib/projects-data'
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

const roles = ['Rails engineer', 'TypeScript & Rust', 'Kubernetes & GitOps', 'AI feature builder']

/**
 * Three facts a reader can check, in place of adjectives they cannot.
 * Each one restates something the CV and the project pages already claim.
 */
const credibility = [
  { label: 'Currently', value: `${site.company}, Paris — anti-fraud platform on Rails 8` },
  { label: 'Architected', value: 'TrustAI, the LLM framework behind our AI features' },
  { label: 'Shipped', value: 'GenAI and VoiceAI features into production' },
  { label: 'Runs at home', value: 'A Talos Kubernetes cluster, reconciled by FluxCD' },
]

export default function Home({ caseStudies = [] }: { caseStudies?: string[] }) {
  const dotGridRef = useRef<DotGridHandle>(null)

  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero */}
      <section
        className="w-full py-20 md:py-28 lg:py-32 relative"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          dotGridRef.current?.setPointer(e.clientX - rect.left, e.clientY - rect.top)
        }}
        onMouseLeave={() => dotGridRef.current?.setPointer(null, null)}
      >
        {/* Aurora background with mouse-parallax */}
        <Aurora maxOffset={14}>
          <div className="aurora absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-[#9f4f9d]/20 dark:bg-[#9f4f9d]/25 blur-3xl" />
          <div className="aurora absolute top-24 -left-32 h-[320px] w-[420px] rounded-full bg-[#c06fbe]/10 dark:bg-[#c06fbe]/15 blur-3xl [animation-delay:-6s]" />
          <div className="aurora absolute top-40 -right-32 h-[320px] w-[420px] rounded-full bg-[#7a3a78]/10 dark:bg-[#7a3a78]/20 blur-3xl [animation-delay:-11s]" />
        </Aurora>
        <DotGrid ref={dotGridRef} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-900 pointer-events-none" />
        <div className="flex flex-col items-center justify-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Logo className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_24px_rgba(159,79,157,0.35)]" width={80} height={80} priority />
          </motion.div>
          <h1
            className="mt-5 text-center text-4xl font-bold tracking-tight sm:text-6xl"
            aria-label={site.person}
          >
            <SplitText text={site.person} stagger={0.05} by="letter" />
          </h1>
          <motion.p
            className="mt-3 text-sm font-medium text-[#9f4f9d] dark:text-[#cb85c9]"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            <RotatingText words={roles} />
          </motion.p>
          <motion.p
            className="mt-4 max-w-xl text-center text-lg text-gray-700 dark:text-gray-200 md:text-xl"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            {site.pitch}
          </motion.p>
          <motion.p
            className="mt-2 text-xs text-gray-500 dark:text-gray-400"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            {site.name} · {site.tagline}
          </motion.p>
          <motion.div
            className="mt-5"
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
          >
            <AvailabilityBadge />
          </motion.div>
          <motion.div
            initial="hidden" animate="visible" custom={4} variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticLink href="/portfolio">
              See the work
              <ArrowRight className="w-4 h-4" />
            </MagneticLink>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:border-[#9f4f9d] hover:text-[#9f4f9d] dark:border-gray-600 dark:text-gray-100 dark:hover:border-[#c06fbe] dark:hover:text-[#cb85c9]"
            >
              Get in touch
            </Link>
            <Link
              href={site.resumePath}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <FileText className="w-4 h-4" />
              Résumé
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 text-gray-500 dark:text-gray-400"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Credibility strip */}
      <section className="w-full border-y border-gray-200 bg-white/60 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-5 px-4 py-8 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
          {credibility.map((item, i) => (
            <motion.div
              key={item.label}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
              custom={i} variants={fadeUp}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9f4f9d]">{item.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="w-full py-14 md:py-20">
        <motion.div
          className="max-w-2xl mx-auto px-4 md:px-6 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          custom={0} variants={fadeUp}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9f4f9d]">Manifesto</span>
          <h2 className="sr-only">What I build and why</h2>
          <ScrollRevealText
            className="mt-3 text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed"
            text={`${site.role} at ${site.company} in Paris, building anti-fraud products and AI features on Rails. Off the clock: a Talos Kubernetes home cluster run via GitOps, and AI automation agents — built together, made to last.`}
          />
        </motion.div>
      </section>

      {/* Tech marquee */}
      <TechMarquee />

      {/* Featured work */}
      <section className="w-full py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            custom={0} variants={fadeUp}
            className="text-center mb-10"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9f4f9d]">Selected work</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              What I&apos;ve{' '}
              <span className="bg-gradient-to-r from-[#9f4f9d] via-[#c06fbe] to-[#9f4f9d] bg-clip-text text-transparent">
                shipped
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Current professional work — the strongest evidence, so it leads. */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
              custom={0} variants={scaleIn}
            >
              <TiltCard className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-[#9f4f9d]/50 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 group-hover:bg-[#9f4f9d] group-hover:text-white dark:bg-gray-700">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">{site.company}</h3>
                <p className="mt-3 grow text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  Anti-fraud platform on Rails 8 with Sidekiq. I architected the TrustAI LLM framework
                  and shipped GenAI and VoiceAI features on top of it.
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {['Rails 8', 'Sidekiq', 'LLM', 'React'].map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/about"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 transition-colors group-hover:text-[#9f4f9d] dark:text-white"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Career details
                </Link>
              </TiltCard>
            </motion.div>

            {highlightedProjects.map((project, i) => {
              const hasCaseStudy = caseStudies.includes(project.slug)
              const Icon = project.icon
              return (
                <motion.div
                  key={project.slug}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                  custom={i + 1} variants={scaleIn}
                >
                  <TiltCard className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-[#9f4f9d]/50 dark:border-gray-700 dark:bg-gray-800">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.alt}
                        width={44}
                        height={44}
                        className="mb-5 h-11 w-11 object-contain"
                      />
                    ) : (
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 group-hover:bg-[#9f4f9d] group-hover:text-white dark:bg-gray-700">
                        {Icon ? <Icon className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                      </div>
                    )}
                    <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
                    <p className="mt-3 grow text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      {hasCaseStudy ? (
                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#9f4f9d] transition-colors hover:text-[#7a3a78] dark:text-[#cb85c9]"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          Case study
                        </Link>
                      ) : null}
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {project.href.includes('github') ? 'Source' : 'Website'}
                      </a>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            custom={0} variants={fadeUp}
            className="mt-8 text-center"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#9f4f9d] dark:text-gray-300"
            >
              All projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

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
              <div className="space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  <span className="font-medium text-gray-700 dark:text-gray-200">{site.role}</span> at{' '}
                  <span className="font-medium text-gray-700 dark:text-gray-200">{site.company}</span>, Paris — building anti-fraud products on Rails. Architected the TrustAI LLM framework, shipped GenAI + VoiceAI features.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  On the side: <span className="font-medium text-gray-700 dark:text-gray-200">bon.so</span> (this site), a Talos/Kubernetes home cluster, and AI automation agents.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['TypeScript', 'Rust', 'Kubernetes', 'Rails'].map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-gray-200 dark:border-gray-700 px-2.5 py-0.5 text-xs text-gray-500 dark:text-gray-400 hover:border-[#9f4f9d] hover:text-[#9f4f9d] transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <Link href="/now" className="inline-block pt-1 text-xs text-gray-500 underline underline-offset-4 hover:text-[#9f4f9d] dark:text-gray-400">
                  More detail on /now
                </Link>
              </div>
            </TiltCard>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            custom={1} variants={fadeUp}
          >
            <TiltCard className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-[#9f4f9d]/10 dark:bg-[#9f4f9d]/20 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-[#9f4f9d]" />
                </span>
                <h2 className="text-xl font-bold tracking-tight">Open Source, Live</h2>
              </div>
              <GithubStats />
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Pulled live from{' '}
                <Link href="https://github.com/yeboster" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#9f4f9d] transition-colors">
                  github.com/yeboster
                </Link>
              </p>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* Terminal */}
      <section className="w-full py-14 md:py-20">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            custom={0} variants={fadeUp}
            className="text-center mb-8"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9f4f9d]">Interactive</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Try the{' '}
              <span className="bg-gradient-to-r from-[#9f4f9d] via-[#c06fbe] to-[#9f4f9d] bg-clip-text text-transparent">
                terminal
              </span>
            </h2>
          </motion.div>
          <TerminalCard />
        </div>
      </section>

      {/* Close */}
      <section className="w-full py-16 md:py-24 bg-gray-100 dark:bg-gray-800/50">
        <motion.div
          className="mx-auto max-w-2xl px-4 text-center md:px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          custom={0} variants={fadeUp}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Have a hard problem worth solving?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-500 dark:text-gray-400">
            I take on {site.engagements.slice(0, -1).join(', ')} and{' '}
            {site.engagements[site.engagements.length - 1]?.toLowerCase()}. Tell me the outcome you need
            and I&apos;ll reply within {site.responseTime}.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#9f4f9d] px-8 py-3 font-medium text-white transition-colors hover:bg-[#7a3a78]"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
