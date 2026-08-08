'use client'

import { motion, type Variants } from "motion/react"
import { Code2, Lightbulb, Rocket, Heart, Coffee, Zap, Briefcase, GraduationCap, Hammer, ShieldCheck, Globe } from 'lucide-react'
import { Chip } from '@/components/ui/chip'
import { Section, SectionTitle } from '@/components/ui/section'
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const slideInRight: Variants = {
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
    icon: Briefcase,
    label: '2022 — Now',
    title: 'Ruby on Rails Developer @ Trustpair — Paris',
    description: 'Building anti-fraud products and AI features on Rails 8 with Sidekiq and some React. Shipped GenAI contact collection (+128pts). Observability-first.',
  },
  {
    icon: Globe,
    label: '2020 — 2022',
    title: 'Web Developer @ Develon Group',
    description: 'Developed and maintained web apps with Ruby on Rails 4/5 and JavaScript/TypeScript (Adonis, NestJS, Nuxt), deployed with Docker & Kubernetes.',
  },
  {
    icon: ShieldCheck,
    label: '2020',
    title: 'Cyber Security Student @ CyberChallengeIT — Udine',
    description: 'A 360° view of cybersecurity: from software security and cryptography to web and hardware security.',
  },
  {
    icon: Code2,
    label: '2018 — 2019',
    title: 'Software Developer @ Satelicom — Vicenza',
    description: 'Web applications with Ruby on Rails up to 5.2, plus Android apps in Kotlin and Java.',
  },
  {
    icon: GraduationCap,
    label: '2013 — 2018',
    title: 'ITT G. Chilesotti — Thiene',
    description: 'Computer science education — where tinkering turned into a career, from first scripts to production systems.',
  },
  {
    icon: Hammer,
    label: 'Side by Side',
    title: 'Builder',
    description: 'bon.so (Next.js), a Talos/Kubernetes home cluster managed via GitOps with FluxCD, Helm and Kustomize, and AI automation agents.',
  },
]

const skills = [
  { title: 'Languages', items: ['Ruby', 'TypeScript', 'Rust', 'Python'] },
  { title: 'Frameworks', items: ['Rails 4 → 8', 'Sidekiq', 'Next.js', 'NestJS', 'Nuxt', 'React', 'SvelteKit', 'Vue', 'Tailwind CSS'] },
  { title: 'Functional Programming', items: ['Elixir', 'Elm'] },
  { title: 'Infrastructure', items: ['Kubernetes', 'FluxCD', 'Helm', 'Kustomize', 'Docker', 'Linux', 'Cloud'] },
  { title: 'Security', items: ['Pen-testing', 'Web security'] },
  { title: 'Blockchain', items: ['Rust smart contracts'] },
]

export default function About() {
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
            <Chip>About Me</Chip>
          </motion.div>
          <h1 className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl" aria-label="Building things that matter">
            <SplitText text="Building things that" by="word" />{' '}
            <span className="bg-gradient-to-r from-[#9f4f9d] via-[#c06fbe] to-[#9f4f9d] bg-clip-text text-transparent">
              <SplitText text="matter" by="letter" />
            </span>
          </h1>
          <motion.p
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300 md:text-xl"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            Software Engineer at Trustpair, tinkerer, and lifelong learner. I believe in building together
            to create things that last.
          </motion.p>
          <motion.a
            href={site.socials.linkedin}
            target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-gray-400 underline underline-offset-4 hover:text-gray-900 dark:hover:text-white transition-colors"
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
          >
            Find me on LinkedIn →
          </motion.a>
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

      {/* Skills Grid */}
      <Section>
        <SectionTitle>
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={0} variants={fadeUp}
          >
            <Chip>What I Bring</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={1} variants={fadeUp}
          >
            On the Table
          </motion.h2>
          <motion.p
            className="max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-400"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={2} variants={fadeUp}
          >
            Passionate about learning new tech and methods, on a strong computer science background.
          </motion.p>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          {skills.map((group, i) => (
            <motion.div
              key={group.title}
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={i} variants={scaleIn}
            >
              <TiltCard className="group relative p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#9f4f9d]/50 dark:hover:border-[#9f4f9d]/50 transition-colors duration-300 cursor-default h-full">
                <h3 className="font-semibold text-lg">{group.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-[#9f4f9d]/10 group-hover:text-[#9f4f9d] dark:group-hover:text-[#c06fbe] transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
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
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={scaleIn}
              >
                <TiltCard className="group relative p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#9f4f9d]/50 dark:hover:border-[#9f4f9d]/50 transition-colors duration-300 cursor-default">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 group-hover:bg-[#9f4f9d] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{value.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                    {value.description}
                  </p>
                </TiltCard>
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
            className="inline-block mt-6 px-8 py-3 bg-[#9f4f9d] text-white rounded-lg font-medium hover:bg-[#7a3a78] transition-colors duration-200"
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
