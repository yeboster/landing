'use client'

import { FadeInOnFirstScroll } from "@/components/ui/fade-in-on-first-scroll";
import { Section, SectionHead } from "@/components/ui/section";

export default function About() {
  return (
    <main className="flex-1">
      <SectionHead>
        <div>
          <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
            About Me
          </h1>
        </div>
        <div className="flex flex-col items-start space-y-4">
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-200">
            A brief introduction about myself and my journey in the world of technology.
          </p>
        </div>
      </SectionHead>
      <Section>
        <div className="inline-block rounded-lg bg-gray-950 dark:bg-white dark:text-gray-500 font-medium tracking-tighter dark:border-gray-400 px-3 py-1 text-sm text-white">
          My Story
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          The Journey So Far
        </h2>
        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-200">
          An overview of my career and the experiences that have shaped me as a developer.
        </p>
      </Section>
      <FadeInOnFirstScroll>
        <Section className="bg-gray-100 dark:bg-gray-500">
          <div className="inline-block rounded-lg bg-gray-950 dark:bg-white dark:text-gray-500 font-medium tracking-tighter dark:border-gray-400 px-3 py-1 text-sm text-white">
            My Philosophy
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            How I Approach Work
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-200">
            A look at my work philosophy, values, and the principles that guide my approach to programming.
          </p>
        </Section>
      </FadeInOnFirstScroll>
    </main >
  )
}
