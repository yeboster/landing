'use client'

import Link from "next/link"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { FadeInOnFirstScroll } from "@/components/ui/fade-in-on-first-scroll";
import Image from "next/image";

import metaNamesLogo from '../../../public/images/meta-names.png'
import kubernetesLogo from '../../../public/images/kubernetes.png'
import todoistActionsLogo from '../../../public/images/todoist-actions.png'
import githubLogo from '../../../public/images/github.png'
import gitlabLogo from '../../../public/images/gitlab.png'

export default function Portfolio() {
  return (
    <main className="flex-1">
      <section
        className="w-full pt-12 md:pt-24 lg:pt-32 bg-center bg-cover"
      >
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                My Tech Portfolio
              </h1>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-200">
                Discover my skills, projects, and my passion for technology
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-950 px-3 py-1 text-sm text-white">
                My skills
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Proficient in Multiple Technologies
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-200">
                I am skilled in a variety of programming languages and tools, always learning and eager to take on new
                challenges.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Typescript</h3>
              <p className="text-sm text-gray-500 dark:text-gray-200">
                Proficient with both vanilla JavaScript, Typescript and popular frameworks like React (NextJs), Vue (NuxtJs) and Svelte (SvelteKit).
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Ruby</h3>
              <p className="text-sm text-gray-500 dark:text-gray-200">
                Experienced in writing ruby applications with multiple frameworks like Ruby on Rails 5/6/7, Roda along with background processing like Sidekiq.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">DevOps</h3>
              <p className="text-sm text-gray-500 dark:text-gray-200">
                Familiar with CI/CD, AWS, Docker, and Kubernetes to manage and deploy applications.
              </p>
            </div>
          </div>
        </div>
      </section>
      <FadeInOnFirstScroll className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-500">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-950 px-3 py-1 text-sm text-white">
                Featured Projects
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Some of My Work
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-200">
                Here are a few design projects I&apos;ve worked on recently. Want to see more?&nbsp;
                <Link className="underline" href="/contact">Contact me</Link>
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">Meta Names</h3>
              </CardHeader>
              <CardContent>
                <Image
                  alt="Meta Names Logo"
                  height="200"
                  src={metaNamesLogo}
                />
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  A Web 3 DNS system, developed on the Partisia Blockchain. I engineered the entire stack, starting from smart contract in Rust, the SDK in TypeScript, to various front-end applications using Svelte.
                </p>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900mt-2 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d3748] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800 dark:focus-visible:ring-[#2d3748]"
                  href="https://metanames.app"
                  target="_blank"
                >
                  Check it out
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">Todoist Actions</h3>
              </CardHeader>
              <CardContent>
                <Image
                  alt="Todoist Actions"
                  height="250"
                  src={todoistActionsLogo}
                />
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  A workflow management system designed to introduce custom behaviors to projects and tasks. It includes a personal collection of workflows that I utilize on a daily basis.
                </p>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900mt-2 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d3748] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800 dark:focus-visible:ring-[#2d3748]"
                  href="https://github.com/yeboster/todoist-actions"
                  target="_blank"
                >
                  Check it out
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">GitOps K8s cluster</h3>
              </CardHeader>
              <CardContent>
                <Image
                  alt="Kubernetes Logo"
                  height="200"
                  src={kubernetesLogo}
                />
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  My Kubernetes cluster is orchestrated through a GitOps approach. The cluster was initially set up using an Ansible playbook, and I utilize FluxCD for its ongoing management and maintenance.
                </p>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900mt-2 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d3748] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800 dark:focus-visible:ring-[#2d3748]"
                  href="https://github.com/yeboster/k8s"
                  target="_blank"
                >
                  Check it out
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">Github</h3>
              </CardHeader>
              <CardContent>
                <Image
                  alt="Github Logo"
                  height="200"
                  src={githubLogo}
                />
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  The full list of all project I have worked on, including open source contributions.
                </p>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900mt-2 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d3748] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800 dark:focus-visible:ring-[#2d3748]"
                  href="https://github.com/yeboster"
                  target="_blank"
                >
                  Check it out
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">Gitlab</h3>
              </CardHeader>
              <CardContent>
                <Image
                  alt="Gitlab Logo"
                  height="200"
                  src={gitlabLogo}
                />
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  My old Gitlab account, where I used to host my projects before moving to Github.
                </p>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900mt-2 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d3748] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800 dark:focus-visible:ring-[#2d3748]"
                  href="https://gitlab.com/yeboster"
                  target="_blank"
                >
                  Check it out
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </FadeInOnFirstScroll>
      <FadeInOnFirstScroll className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-950 px-3 py-1 text-sm text-white">
                Get in Touch
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Let&apos;s Build Something Together
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-200">
                Feel free to reach out if you&apos;re looking for a developer, have a question, or just want to connect.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d3748] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800 dark:focus-visible:ring-[#2d3748]"
              href="/contact"
            >
              Contact me
            </Link>
          </div>
        </div>
      </FadeInOnFirstScroll>
    </main>
  )
}
