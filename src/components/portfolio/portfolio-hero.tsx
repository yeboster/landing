import { Aurora } from '@/components/aurora'
import { Reveal } from '@/components/motion/reveal'
import { SplitText } from '@/components/split-text'
import { Eyebrow } from '@/components/ui/eyebrow'

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

export function PortfolioHero({ projectCount, caseStudyCount }: { projectCount: number; caseStudyCount: number }) {
  return (
    <section className="relative overflow-hidden pb-12 pt-16 md:pb-16 md:pt-28">
      {/* Blobs are centred with `mx-auto`, not translate: the aurora keyframes own `transform`. */}
      <Aurora maxOffset={14}>
        <div className="aurora absolute inset-x-0 -top-40 mx-auto h-[420px] w-[min(680px,100%)] rounded-full bg-brand/15 blur-3xl" />
        <div className="aurora absolute -right-40 top-24 h-[300px] w-[420px] rounded-full bg-brand-strong/10 blur-3xl [animation-delay:-8s]" />
      </Aurora>

      <div className="container relative text-center">
        <Reveal immediate>
          <Eyebrow>Selected work</Eyebrow>
        </Reveal>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl" aria-label="Things I've built">
          <SplitText text="Things I've" by="word" />{' '}
          <em className="font-serif font-normal italic">
            <SplitText text="built" by="letter" stagger={0.04} gradient />
          </em>
        </h1>
        <Reveal immediate delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            From Rust smart contracts to a GitOps Kubernetes cluster. Case studies cover the decisions behind the work; the rest
            link straight to the code or the live product.
          </p>
        </Reveal>
        <Reveal immediate delay={0.3}>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {count(projectCount, 'project', 'projects')} <span aria-hidden>·</span> {count(caseStudyCount, 'case study', 'case studies')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
