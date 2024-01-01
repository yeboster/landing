'use client'

import { FadeInOnFirstScroll } from "@/components/ui/fade-in-on-first-scroll";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function Home(props: any) {
  return (
    <main className="flex-1">
      <section
        className="w-full h-full py-12 md:py-24 lg:py-32 bg-center bg-cover"
      >
        <div className="flex flex-col items-center justify-center">
          <Logo
            className="w-1/4"
            sizes="40vw, 40vw"
          />
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Yeboster</h1>
          <h4 className="text-sm md:text-base text-gray-400">Build Together to Live Forever</h4>
        </div>
      </section>
      <FadeInOnFirstScroll
        className="w-full py-12 md:py-24 lg:py-32 bg-center bg-cover bg-gray-100 dark:bg-gray-500"
      >
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                About Me
              </h1>
            </div>
            <div className="flex flex-col items-center md:items-start space-y-4">
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-200">
                A brief introduction about myself and my journey in the world.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d3748] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus-visible:ring-[#2d3748]"
                href="/about"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </FadeInOnFirstScroll>
      <FadeInOnFirstScroll
        className="w-full py-12 md:py-24 lg:py-32 bg-center bg-cover"
      >
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                My Portfolio
              </h1>
            </div>
            <div className="flex flex-col items-center md:items-start space-y-4">
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-200">
                Discover my skills, projects, and my passion for technology.
              </p>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d3748] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus-visible:ring-[#2d3748]"
                  href="/portfolio"
                >
                  Check it out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeInOnFirstScroll>
      <FadeInOnFirstScroll
        className="w-full py-12 md:py-24 lg:py-32 bg-center bg-cover bg-gray-100 dark:bg-gray-500"
      >
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Get in Touch
              </h1>
            </div>
            <div className="flex flex-col items-center md:items-start space-y-4">
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl text-center md:text-start dark:text-gray-200">
                Feel free to reach out if you&apos;re looking for a developer, have a question, or just want to connect.
              </p>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d3748] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus-visible:ring-[#2d3748]"
                  href="/contact"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeInOnFirstScroll>
    </main>
  )
}
