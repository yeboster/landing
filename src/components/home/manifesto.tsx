import { Reveal } from '@/components/motion/reveal'
import { ScrollRevealText } from '@/components/scroll-reveal-text'
import { TechMarquee } from '@/components/tech-marquee'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Section } from '@/components/ui/section'

import { manifesto } from './data'

/** What I build and why, then the stack it is built with. */
export function Manifesto() {
  return (
    <Section tone="subtle" aria-labelledby="manifesto-title">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <Eyebrow>Manifesto</Eyebrow>
        </Reveal>
        <h2 id="manifesto-title" className="sr-only">
          What I build and why
        </h2>
        <ScrollRevealText
          className="mt-8 text-balance text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl"
          text={manifesto}
        />
      </div>
      <TechMarquee className="mt-14 md:mt-20" />
    </Section>
  )
}
