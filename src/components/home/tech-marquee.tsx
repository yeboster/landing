import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const stack = [
  'TypeScript',
  'React',
  'Next.js',
  'Vue',
  'Svelte',
  'Ruby on Rails',
  'Roda',
  'Sidekiq',
  'Rust',
  'Docker',
  'Kubernetes',
  'AWS',
  'FluxCD',
  'Ansible',
  'CI/CD',
]

/**
 * CSS-only infinite marquee of the tools I use. Pauses on hover, fades at the
 * edges, and falls back to a static wrapped list under reduced motion.
 */
export function TechMarquee() {
  return (
    <section aria-labelledby="stack-heading" className="pb-20 md:pb-28">
      <div className="container">
        <Reveal>
          <h2
            id="stack-heading"
            className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
          >
            Tools I reach for
          </h2>

          <div className="group mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] motion-reduce:[mask-image:none]">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className={cn(
                  'flex shrink-0 items-center gap-x-12 pr-12',
                  'animate-marquee group-hover:[animation-play-state:paused]',
                  'motion-reduce:w-full motion-reduce:shrink motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4 motion-reduce:pr-0',
                  copy === 1 && 'motion-reduce:hidden'
                )}
              >
                {stack.map((name) => (
                  <li
                    key={name}
                    className="whitespace-nowrap text-base font-medium tracking-tight text-muted-foreground transition-colors duration-300 hover:text-foreground md:text-lg"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
