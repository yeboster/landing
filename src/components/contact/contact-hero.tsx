import { Aurora } from '@/components/aurora'
import { AvailabilityBadge } from '@/components/availability-badge'
import { Reveal } from '@/components/motion/reveal'
import { SplitText } from '@/components/split-text'
import { Eyebrow } from '@/components/ui/eyebrow'
import { site } from '@/lib/site'

export function ContactHero() {
  return (
    <section className="relative w-full pb-12 pt-16 md:pb-16 md:pt-28">
      <Aurora maxOffset={14}>
        <div className="aurora absolute inset-x-0 -top-40 mx-auto h-[420px] w-[min(680px,100%)] rounded-full bg-brand/15 blur-3xl dark:bg-brand/20" />
        <div className="aurora absolute -right-40 top-16 h-[300px] w-[420px] rounded-full bg-brand-strong/10 blur-3xl [animation-delay:-8s] dark:bg-brand-strong/15" />
      </Aurora>

      <div className="container relative z-10 flex max-w-3xl flex-col items-center text-center">
        <Reveal immediate>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl" aria-label="Let's connect">
          <SplitText text="Let's" by="word" />{' '}
          <em className="font-serif font-normal italic">
            <SplitText text="connect" by="word" gradient />
          </em>
        </h1>
        <Reveal immediate delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{site.availability.detail}</p>
        </Reveal>
        <Reveal immediate delay={0.3} className="mt-6">
          <AvailabilityBadge />
        </Reveal>
      </div>
    </section>
  )
}
