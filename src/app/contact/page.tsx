'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section, SectionHead, SectionTitle } from "@/components/ui/section";
import { Link } from "lucide-react";

export default function About() {
  return (
    <main className="flex-1">
      <SectionHead>
        <div>
          <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
            Contact Me
          </h1>
        </div>
        <div className="flex flex-col items-start space-y-4">
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-200">
            Get in touch with me for any queries, collaborations or discussions.
          </p>
        </div>
      </SectionHead>
      <Section>
        <SectionTitle>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Get In Touch
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-200">
            I&apos;m always open to discuss your projects, innovative ideas, or opportunities to be part of your visions.
          </p>
        </SectionTitle>
        <div className="mx-auto grid gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <Card className="bg-gray-100 dark:bg-gray-500">
            <CardHeader>
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              Contact me via email for collaborations.
              <a href="mailto:contact@yeboster.com?subject=Colloboration" target="_blank">
                <Button>
                  Email me
                </Button>
              </a>
            </CardContent>
          </Card>
          <Card className="bg-gray-100 dark:bg-gray-500">
            <CardHeader>
              <CardTitle>Telegram</CardTitle>
            </CardHeader>
            <CardContent>
              Reach me out on Telegram for quick chats or to discuss ideas.
              <a href="https://t.me/yeboster" target="_blank">
                <Button>
                  Ping me
                </Button>
              </a>
            </CardContent>
          </Card>
          <Card className="bg-gray-100 dark:bg-gray-500">
            <CardHeader>
              <CardTitle>Twitter</CardTitle>
            </CardHeader>
            <CardContent>
              Follow me on Twitter to stay updated with my latest projects.
              <a href="https://twitter.com/yeboster" target="_blank">
                <Button>
                  Follow me
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </Section>
    </main >
  )
}
