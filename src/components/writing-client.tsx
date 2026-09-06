'use client'

import Link from 'next/link'
import { motion, type Variants } from 'motion/react'
import { ArrowUpRight, PenLine } from 'lucide-react'
import { Chip } from '@/components/ui/chip'
import { Section } from '@/components/ui/section'
import { SplitText } from '@/components/split-text'
import { Aurora } from '@/components/aurora'
import { TiltCard } from '@/components/tilt-card'
import { formatDate, type PostMeta } from '@/lib/post'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function WritingClient({ posts }: { posts: PostMeta[] }) {
  return (
    <main className="flex-1 overflow-hidden">
      <section className="w-full relative pt-16 md:pt-28 lg:pt-36 pb-12 md:pb-20">
        <Aurora maxOffset={14}>
          <div className="aurora absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-[#9f4f9d]/20 dark:bg-[#9f4f9d]/25 blur-3xl" />
          <div className="aurora absolute top-24 -left-32 h-[320px] w-[420px] rounded-full bg-[#c06fbe]/10 dark:bg-[#c06fbe]/15 blur-3xl [animation-delay:-6s]" />
        </Aurora>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-800/50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <Chip>Writing</Chip>
          </motion.div>
          <h1 className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl" aria-label="Notes from the build">
            <SplitText text="Notes from the" by="word" />{' '}
            <span className="bg-gradient-to-r from-[#9f4f9d] via-[#c06fbe] to-[#9f4f9d] bg-clip-text text-transparent">
              <SplitText text="build" by="letter" />
            </span>
          </h1>
          <motion.p
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300 md:text-xl"
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
          >
            Long-form notes on the things I actually ship — Rails at scale, Rust on chain,
            Kubernetes at home, and the AI plumbing in between.
          </motion.p>
        </div>
      </section>

      <Section className="pb-24">
        <div className="mx-auto max-w-3xl">
          {posts.length === 0 ? (
            <motion.div
              className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center dark:border-gray-700"
              initial="hidden" animate="visible" custom={0} variants={fadeUp}
            >
              <PenLine className="mx-auto h-8 w-8 text-[#9f4f9d]" />
              <p className="mt-4 text-lg font-medium">The first post is being written.</p>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Check back soon, or{' '}
                <Link href="/contact" className="text-[#9f4f9d] underline underline-offset-4">
                  get in touch
                </Link>{' '}
                in the meantime.
              </p>
            </motion.div>
          ) : (
            <ul className="space-y-6">
              {posts.map((post, i) => (
                <motion.li
                  key={post.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  custom={i}
                  variants={fadeUp}
                >
                  <TiltCard className="h-full">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="group block rounded-2xl border border-gray-200 bg-white/70 p-6 transition-colors hover:border-[#9f4f9d]/50 dark:border-gray-800 dark:bg-gray-900/50 sm:p-8"
                    >
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {post.draft ? (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                            Draft
                          </span>
                        ) : null}
                      </div>
                      <h2 className="mt-2 flex items-start gap-2 text-2xl font-bold tracking-tight">
                        <span className="transition-colors group-hover:text-[#9f4f9d]">{post.title}</span>
                        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9f4f9d]" />
                      </h2>
                      {post.description ? (
                        <p className="mt-3 text-gray-600 dark:text-gray-300">{post.description}</p>
                      ) : null}
                      {post.tags.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </Link>
                  </TiltCard>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </Section>
    </main>
  )
}
