'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github, GitBranch, Globe, Terminal, Server, Code2, Layers, Laugh, ArrowUpRight } from "lucide-react"

import metaNamesLogo from '../../../public/images/meta-names.png'
import kubernetesLogo from '../../../public/images/kubernetes.png'
import todoistActionsLogo from '../../../public/images/todoist-actions.png'

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
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

const skills = [
  {
    icon: Code2,
    title: 'TypeScript',
    description: 'React, Next.js, Vue, Svelte — full-stack JS/TS.',
    tags: ['React', 'Next.js', 'Vue', 'Svelte'],
    color: 'from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20',
  },
  {
    icon: Terminal,
    title: 'Ruby',
    description: 'Rails 5–7, Roda, Sidekiq — backend at scale.',
    tags: ['Rails', 'Roda', 'Sidekiq'],
    color: 'from-red-500/10 to-pink-500/10 dark:from-red-500/20 dark:to-pink-500/20',
  },
  {
    icon: Server,
    title: 'DevOps',
    description: 'Docker, K8s, AWS, CI/CD — ship with confidence.',
    tags: ['Docker', 'K8s', 'AWS', 'CI/CD'],
    color: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20',
  },
]

interface Project {
  title: string
  description: string
  image?: any
  icon?: any
  alt: string
  href: string
  liveUrl?: string
  tags: string[]
  featured?: boolean
}

const projects: Project[] = [
  {
    title: 'Meta Names',
    description: 'A Web3 DNS system on Partisia Blockchain. Full stack — smart contracts in Rust, SDK in TypeScript, front-end in Svelte.',
    image: metaNamesLogo,
    alt: 'Meta Names Logo',
    href: 'https://metanames.app',
    tags: ['Rust', 'TypeScript', 'Svelte', 'Blockchain'],
    featured: true,
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
  {
    title: 'Todoist Actions',
    description: 'Workflow automation for custom behaviors on projects and tasks. A personal collection of daily-use workflows.',
    image: todoistActionsLogo,
    alt: 'Todoist Actions',
    href: 'https://github.com/yeboster/todoist-actions',
    tags: ['Automation', 'Productivity'],
  },
  {
    title: 'GitOps K8s Cluster',
    description: 'Kubernetes cluster orchestrated via GitOps. Bootstrapped with Ansible, managed with FluxCD.',
    image: kubernetesLogo,
    alt: 'Kubernetes Logo',
    href: 'https://github.com/yeboster/k8s',
    tags: ['Kubernetes', 'Ansible', 'FluxCD'],
  },
]

const profiles = [
  {
    title: 'GitHub',
    description: 'All my projects and open source contributions.',
    href: 'https://github.com/yeboster',
    icon: Github,
  },
  {
    title: 'GitLab',
    description: 'My older projects before moving to GitHub.',
    href: 'https://gitlab.com/yeboster',
    icon: GitBranch,
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const IconFallback = project.icon
  return (
    <motion.div
      className={`group relative flex flex-col rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 dark:hover:border-gray-600 transition-all duration-500 ${
        project.featured ? 'sm:col-span-2 sm:flex-row' : ''
      }`}
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
      custom={index} variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      {/* Image / Icon area */}
      <div className={`relative bg-gray-50 dark:bg-gray-800/80 flex items-center justify-center overflow-hidden ${
        project.featured ? 'w-full sm:w-2/5 h-48 sm:h-auto' : 'w-full h-48'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 opacity-50" />
        {project.image ? (
          <Image
            alt={project.alt}
            src={project.image}
            className="object-contain max-h-[120px] relative z-10 group-hover:scale-110 transition-transform duration-700 ease-out"
            height={120}
          />
        ) : IconFallback ? (
          <IconFallback className="w-16 h-16 text-gray-300 dark:text-gray-600 relative z-10 group-hover:scale-110 transition-transform duration-700 ease-out" />
        ) : null}
      </div>

      {/* Content */}
      <div className={`flex flex-col grow p-6 ${project.featured ? 'sm:p-8' : ''}`}>
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-bold ${project.featured ? 'text-2xl' : 'text-lg'}`}>{project.title}</h3>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100"
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <p className={`mt-2 text-gray-500 dark:text-gray-400 grow ${project.featured ? 'text-base' : 'text-sm'}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700/50">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {project.href.includes('github') ? 'Source' : 'Website'}
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero */}
      <section className="w-full pt-16 md:pt-28 lg:pt-36 pb-12 md:pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-800/50 pointer-events-none" />
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
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 md:text-xl"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            From blockchain smart contracts to Kubernetes clusters — a selection of projects and the technologies behind them.
          </motion.p>
        </div>
      </section>

      {/* Skills — compact horizontal strip */}
      <Section className="bg-gray-100 dark:bg-gray-800/50">
        <SectionTitle>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={0} variants={fadeUp}>
            <Chip>Stack</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={1} variants={fadeUp}
          >
            What I Work With
          </motion.h2>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
          {skills.map((skill, i) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.title}
                className={`group p-5 rounded-2xl bg-gradient-to-br ${skill.color} border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300`}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <h3 className="font-semibold">{skill.title}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{skill.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {skill.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* Featured Projects — bento grid */}
      <Section>
        <SectionTitle>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={0} variants={fadeUp}>
            <Chip>Projects</Chip>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={1} variants={fadeUp}
          >
            Featured Work
          </motion.h2>
          <motion.p
            className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-lg"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} custom={2} variants={fadeUp}
          >
            A selection of projects I&apos;ve shipped. Want to see more?{' '}
            <Link className="underline hover:text-gray-900 dark:hover:text-white transition-colors" href="/contact">Let&apos;s talk</Link>
          </motion.p>
        </SectionTitle>

        <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto mt-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </Section>

      {/* Profiles */}
      <Section className="bg-gray-100 dark:bg-gray-800/50">
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 max-w-2xl mx-auto">
          {profiles.map((profile, i) => {
            const Icon = profile.icon
            return (
              <motion.a
                key={profile.title}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 flex-1"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold">{profile.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{profile.description}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 text-gray-400" />
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
          <Layers className="w-10 h-10 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Let&apos;s Build Something Together
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            I&apos;m always looking for new challenges and interesting projects.
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
