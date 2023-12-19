'use client'

import Link from "next/link"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeInOnFirstScroll } from "@/components/ui/fade-in-on-first-scroll";

export default function Home() {
  return (
    <main className="flex-1">
      <section
        className="w-full pt-12 md:pt-24 lg:pt-32 bg-center bg-cover"
        style={{
          backgroundImage: "\"url('/path-to-theme-background-image.jpg')\"",
        }}
      >
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Welcome to My Tech Portfolio
              </h1>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover my skills, projects, and my passion for technology.
              </p>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#1a202c] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#2d3748] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d3748] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#2d3748] dark:text-white dark:hover:bg-[#2d3748] dark:focus-visible:ring-[#2d3748]"
                  href="#"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#1a202c] px-3 py-1 text-sm text-white">
                My Skills
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Proficient in Multiple Technologies
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                I am skilled in a variety of programming languages and tools, always learning and eager to take on new
                challenges.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">JavaScript</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Proficient with both vanilla JavaScript and popular frameworks like React and Vue.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Python</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Experienced in writing Python scripts and using frameworks like Django and Flask.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">DevOps</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Familiar with CI/CD, AWS, Docker, and Kubernetes to manage and deploy applications.
              </p>
            </div>
          </div>
        </div>
      </section>
      <FadeInOnFirstScroll className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32 bg-[#edf2f7]">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#1a202c] px-3 py-1 text-sm text-white">
                Featured Projects
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Some of My Work
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Here are a few design projects I&apos;ve worked on recently. Want to see more? Email me.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <Card className="animate-fade-in-on-scroll">
              <CardHeader className="animate-fade-in-on-scroll">
                <h3 className="text-lg font-bold">Project 1</h3>
              </CardHeader>
              <CardContent className="animate-fade-in-on-scroll">
                <img
                  alt="Project 1"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A brief description of Project 1.
                </p>
              </CardContent>
            </Card>
            <Card className="animate-fade-in-on-scroll">
              <CardHeader className="animate-fade-in-on-scroll">
                <h3 className="text-lg font-bold">Project 2</h3>
              </CardHeader>
              <CardContent className="animate-fade-in-on-scroll">
                <img
                  alt="Project 2"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A brief description of Project 2.
                </p>
              </CardContent>
            </Card>
            <Card className="animate-fade-in-on-scroll">
              <CardHeader className="animate-fade-in-on-scroll">
                <h3 className="text-lg font-bold">Project 3</h3>
              </CardHeader>
              <CardContent className="animate-fade-in-on-scroll">
                <img
                  alt="Project 3"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A brief description of Project 3.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </FadeInOnFirstScroll>
      <FadeInOnFirstScroll className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#1a202c] px-3 py-1 text-sm text-white">
                Get in Touch
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Let&apos;s Build Something Together
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Feel free to reach out if you&apos;re looking for a developer, have a question, or just want to connect.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="animate-fade-in-on-scroll" variant="outline">
              Contact Me
            </Button>
          </div>
        </div>
      </FadeInOnFirstScroll>
    </main>
  )
}
