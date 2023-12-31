'use client'

import { FadeInOnFirstScroll } from "@/components/ui/fade-in-on-first-scroll";

export default function About() {
  return (
    <main className="flex-1">
      <section
        className="w-full pt-12 md:pt-24 lg:pt-32 bg-center bg-cover"
      >
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                About Me
              </h1>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                A brief introduction about myself and my journey in the world of technology.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col items-center py-12 py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-fiord-950 px-3 py-1 text-sm text-white">
                My Story
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                The Journey So Far
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                An overview of my career and the experiences that have shaped me as a developer.
              </p>
            </div>
          </div>
        </div>
      </section>
      <FadeInOnFirstScroll className="w-full flex flex-col items-center py-12 py-12 md:py-24 lg:py-32 bg-fiord-100">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-fiord-950 px-3 py-1 text-sm text-white">
                My Philosophy
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                How I Approach Work
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                A look at my work philosophy, values, and the principles that guide my approach to programming.
              </p>
            </div>
          </div>
        </div>
      </FadeInOnFirstScroll>
    </main>
  )
}
