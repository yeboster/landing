import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import type { ToolGroup } from '@/content/about'

export function Toolbox({ groups }: { groups: ToolGroup[] }) {
  return (
    <RevealGroup className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <dl className="divide-y">
        {groups.map(({ area, note, icon: Icon, tools }) => (
          <RevealItem
            key={area}
            className="grid gap-4 px-6 py-6 md:grid-cols-[15rem_minmax(0,1fr)] md:items-center md:gap-8 md:px-8"
          >
            <dt className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-xl border bg-subtle text-muted-foreground [&_svg]:size-4"
              >
                <Icon />
              </span>
              <span className="flex flex-col">
                <span className="font-medium">{area}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{note}</span>
              </span>
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border bg-subtle px-3 py-1 text-sm text-foreground/90"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </dd>
          </RevealItem>
        ))}
      </dl>
    </RevealGroup>
  )
}
