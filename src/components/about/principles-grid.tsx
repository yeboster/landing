import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Card, CardIcon } from '@/components/ui/card'
import type { Principle } from '@/content/about'

export function PrinciplesGrid({ principles }: { principles: Principle[] }) {
  return (
    <RevealGroup>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {principles.map(({ title, description, icon: Icon }, i) => (
          <RevealItem as="li" key={title} className="h-full">
            <Card className="group h-full transition-colors duration-500 ease-out-expo hover:border-foreground/15">
              <div className="flex items-start justify-between">
                <CardIcon>
                  <Icon aria-hidden />
                </CardIcon>
                <span aria-hidden className="font-mono text-xs tabular-nums text-muted-foreground/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{description}</p>
            </Card>
          </RevealItem>
        ))}
      </ul>
    </RevealGroup>
  )
}
