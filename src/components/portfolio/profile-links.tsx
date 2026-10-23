import { ArrowUpRight } from 'lucide-react'

import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { TiltCard } from '@/components/tilt-card'
import { Card, CardIcon } from '@/components/ui/card'

import { profiles } from './data'

export function ProfileLinks() {
  return (
    <RevealGroup as="ul" className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
      {profiles.map(({ icon: Icon, title, description, href }) => (
        <RevealItem as="li" key={title}>
          <TiltCard maxTilt={3}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="group block rounded-3xl">
              <Card interactive className="flex items-center gap-4 p-5 md:p-5">
                <CardIcon>
                  <Icon aria-hidden />
                </CardIcon>
                <div className="min-w-0">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <ArrowUpRight
                  aria-hidden
                  className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </Card>
            </a>
          </TiltCard>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
