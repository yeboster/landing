import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Card, CardIcon } from '@/components/ui/card'

import { skills } from './data'
import { TagList } from './tag-list'

export function StackGrid() {
  return (
    <RevealGroup as="ul" className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
      {skills.map(({ icon: Icon, title, description, tags }) => (
        <RevealItem as="li" key={title}>
          <Card className="group flex h-full flex-col p-6 md:p-6">
            <div className="flex items-center gap-3">
              <CardIcon>
                <Icon aria-hidden />
              </CardIcon>
              <h3 className="font-semibold">{title}</h3>
            </div>
            <p className="mt-4 grow text-sm leading-relaxed text-muted-foreground">{description}</p>
            <TagList tags={tags} className="mt-4" />
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
