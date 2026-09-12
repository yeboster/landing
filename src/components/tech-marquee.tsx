const technologies = ['TypeScript', 'React', 'Next.js', 'Ruby', 'Rust', 'Kubernetes', 'Docker', 'AWS']

/**
 * How many times the list repeats inside one copy of the track.
 *
 * The animation travels `translateX(-50%)` of the track, which is exactly one
 * copy, so the loop only looks infinite if a single copy is at least as wide as
 * the viewport. One pass of the list is ~960px, which left a visible gap on
 * every screen — the track ran out before the animation did.
 *
 * Three passes put a copy at ~2890px, wider than any ordinary desktop, so the
 * items keep their natural spacing instead of being stretched apart. The
 * `min-w-[100vw]` below covers the rest: on an ultrawide display the copy is
 * grown to the viewport, which keeps the invariant true rather than merely
 * likely.
 */
const REPEATS_PER_COPY = 3

/**
 * One pass of the strip. Rendered twice: the second is a visual duplicate that
 * completes the loop, so it is hidden from assistive tech.
 *
 * `pr-8` matches the `gap-8` between items. Without it the seam between the two
 * copies has no spacing where every other item boundary has some, and on a wide
 * screen — where `justify-around` spreads the free space — the seam reads as a
 * stutter once per loop.
 */
function Track({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="flex min-w-[100vw] shrink-0 items-center justify-around gap-8 pr-8 whitespace-nowrap"
      aria-hidden={duplicate || undefined}
    >
      {Array.from({ length: REPEATS_PER_COPY }).flatMap((_, pass) =>
        technologies.map((technology) => (
          <li
            key={`${pass}-${technology}`}
            className="text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="mr-8 text-[#9f4f9d]" aria-hidden="true">
              ✦
            </span>
            {technology}
          </li>
        )),
      )}
    </ul>
  )
}

export function TechMarquee() {
  return (
    <div className="marquee overflow-hidden border-y border-gray-200/70 py-4 dark:border-gray-700/70">
      <div className="marquee-track flex w-max">
        <Track />
        <Track duplicate />
      </div>
    </div>
  )
}
