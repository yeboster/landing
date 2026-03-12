'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github, GitBranch, Globe, Terminal, Server, Code2, Layers, Laugh } from "lucide-react"

import metaNamesLogo from '../../../public/images/meta-names.png'
import kubernetesLogo from '../../../public/images/kubernetes.png'
import todoistActionsLogo from '../../../public/images/todoist-actions.png'
import githubLogo from '../../../public/images/github.png'
import gitlabLogo from '../../../public/images/gitlab.png'

import { Section, SectionTitle } from "@/components/ui/section"
import { Chip } from "@/components/ui/chip"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

const skills = [
  {
    icon: Code2,
    title: 'TypeScript',
    description: 'Proficient with vanilla JS, TypeScript and frameworks like React (Next.js), Vue (Nuxt), and Svelte (SvelteKit).',
    tags: ['React', 'Next.js', 'Vue', 'Svelte'],
  },
  {
    icon: Terminal,
    title: 'Ruby',
    description: 'Experienced with Ruby on Rails 5/6/7, Roda, and background processing with Sidekiq.',
    tags: ['Rails', 'Roda', 'Sidekiq'],
  },
  {
    icon: Server,
    title: 'DevOps',
    description: 'CI/CD pipelines, AWS, Docker, and Kubernetes for managing and deploying applications.',
    tags: ['Docker', 'K8s', 'AWS', 'CI/CD'],
  },
]

const projects = [
  {
    title: 'Meta Names',
    description: 'A Web3 DNS system on Partisia Blockchain. Engineered the full stack — smart contracts in Rust, SDK in TypeScript, and front-end apps in Svelte.',
    image: metaNamesLogo,
    alt: 'Meta Names Logo',
    href: 'https://metanames.app',
    tags: ['Rust', 'TypeScript', 'Svelte', 'Blockchain'],
  },
  {
    title: 'Todoist Actions',
    description: 'A workflow management system for custom behaviors on projects and tasks. Includes a personal collection of daily-use workflows.',
    image: todoistActionsLogo,
    alt: 'Todoist Actions',
    href: 'https://github.com/yeboster/todoist-actions',
    tags: ['Automation', 'Productivity'],
  },
  {
    title: 'GitOps K8s Cluster',
    description: 'Kubernetes cluster orchestrated via GitOps. Bootstrapped with Ansible, managed with FluxCD for continuous delivery.',
    image: kubernetesLogo,
    alt: 'Kubernetes Logo',
    href: 'https://github.com/yeboster/k8s',
    tags: ['Kubernetes', 'Ansible', 'FluxCD'],
  },
  {
    title: 'JokeHub',
    description: 'A hub for jokes — browse, share, and enjoy curated humor. Live at jokehub.org.',
    icon: Laugh,
    alt: 'JokeHub',
    href: 'https://github.com/yeboster/jokehub',
    liveUrl: 'https://jokehub.org',
    tags: ['TypeScript', 'Web App'],
  },
]

const profiles = [
  {
    title: 'GitHub',
    description: 'All my projects and open source contributions.',
    image: githubLogo,
    alt: 'GitHub Logo',
    href: 'https://github.com/yeboster',
    icon: Github,
  },
  {
    title: 'GitLab',
    description: 'My older projects before moving to GitHub.',
    image: gitlabLogo,
    alt: 'GitLab Logo',
    href: 'https://gitlab.com/yeboster',
    icon: GitBranch,
  },
]

export default function Portfolio() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero */}
      <section className="w-full pt-16 md:pt-28 lg:pt-36 pb-12 md:pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-500 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <Chip>Portfolio</Chip>
          </motion.div>
          <motion.h1
            className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
          >
            Things I&apos;ve{' '}
            <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent">
              built
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300 md:text-xl"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            From blockchain smart contracts to Kubernetes clusters — a selection of projects and the technologies behind them.
          </motion.p>
        </div>
      </section>

      {/* Skills */}
      <Section className="bg-gray-100 dark:bg-gray-500">
        <SectionTitle>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={0} variants={fadeUp}>
            <Chip>My Skills</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={1} variants={fadeUp}
          >
            Proficient in Multiple Technologies
          </motion.h2>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          {skills.map((skill, i) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.title}
                className="group p-6 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 transition-colors duration-300"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">{skill.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">{skill.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {skill.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* Featured Projects */}
      <Section>
        <SectionTitle>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={0} variants={fadeUp}>
            <Chip>Featured Projects</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={1} variants={fadeUp}
          >
            Some of My Work
          </motion.h2>
          <motion.p
            className="max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-200"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={2} variants={fadeUp}
          >
            Here are a few projects I&apos;ve worked on. Want to see more?{' '}
            <Link className="underline hover:text-gray-900 dark:hover:text-white transition-colors" href="/contact">Contact me</Link>
          </motion.p>
        </SectionTitle>

        <div className="grid gap-8 sm:max-w-4xl sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 mx-auto mt-4">
          {projects.map((project, i) => {
            const IconFallback = 'icon' in project ? (project as any).icon : null
            const liveUrl = 'liveUrl' in project ? (project as any).liveUrl : null
            return (
              <motion.div
                key={project.title}
                className="group flex flex-col rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-lg dark:hover:border-gray-400 transition-all duration-300"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="relative w-full h-48 bg-gray-50 dark:bg-gray-600 flex items-center justify-center p-6 overflow-hidden">
                  {'image' in project ? (
                    <Image
                      alt={project.alt}
                      src={(project as any).image}
                      className="object-contain max-h-full group-hover:scale-105 transition-transform duration-500"
                      height={160}
                    />
                  ) : IconFallback ? (
                    <IconFallback className="w-20 h-20 text-gray-400 dark:text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                  ) : null}
                </div>
                <div className="flex flex-col grow p-6">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300 grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-5">
                    <motion.a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:underline"
                      whileHover={{ x: 4 }}
                    >
                      View project <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    {liveUrl && (
                      <motion.a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:underline transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        Live site <Globe className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* Profiles */}
      <Section className="bg-gray-100 dark:bg-gray-500">
        <SectionTitle>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={0} variants={fadeUp}>
            <Chip>Profiles</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={1} variants={fadeUp}
          >
            Find Me Online
          </motion.h2>
        </SectionTitle>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8 max-w-3xl mx-auto">
          {profiles.map((profile, i) => {
            const Icon = profile.icon
            return (
              <motion.a
                key={profile.title}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-6 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 transition-all duration-300 flex-1"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-600 flex items-center justify-center shrink-0 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{profile.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{profile.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
              </motion.a>
            )
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <motion.div
          className="text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
          custom={0} variants={fadeUp}
        >
          <Layers className="w-10 h-10 mx-auto mb-4 text-gray-400" />
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Let&apos;s Build Something Together
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
            Feel free to reach out if you&apos;re looking for a developer, have a question, or just want to connect.
          </p>
          <motion.a
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </Section>
    </main>
  )
}
