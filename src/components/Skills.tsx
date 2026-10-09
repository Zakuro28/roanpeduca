import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BriefcaseBusiness, FolderKanban, PenLine, Users, type LucideIcon } from 'lucide-react'
import Section from './Section'
import { DrawIcon, Spotlight } from './fx'
import { SKILLS } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

// One color and icon per area, so every chip shows where it belongs
const AREAS: { color: string; tint: string; icon: LucideIcon }[] = [
  { color: '#7c4dcc', tint: 'bg-violet/12 text-violet', icon: BriefcaseBusiness },
  { color: '#3e9e6a', tint: 'bg-leaf/12 text-leaf', icon: FolderKanban },
  { color: '#d9a531', tint: 'bg-butter/25 text-[#8a6410]', icon: PenLine },
  { color: '#e2829f', tint: 'bg-rose/20 text-[#a3375a]', icon: Users },
]
const ALL = SKILLS.flatMap((g, i) => g.items.map((item) => ({ item, area: g.area, color: AREAS[i % AREAS.length].color })))

export default function Skills() {
  const [area, setArea] = useState(SKILLS[0].area)
  const shown = ALL.filter((s) => s.area === area)
  const filters = SKILLS.map((g, i) => ({ area: g.area, label: g.area, count: g.items.length, color: AREAS[i % AREAS.length].color }))

  return (
    <Section id="skills" title="What I’m good at" intro="The skills behind the case studies, grouped by the kind of work they support.">
      {/* The four areas, each with a few of its skills */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((g, i) => {
          const a = AREAS[i % AREAS.length]
          return (
            <motion.li
              key={g.area}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ type: 'spring', stiffness: 160, damping: 17, delay: i * 0.08 }}
            >
              <Spotlight className="group h-full rounded-3xl bg-paper p-6 ring-1 ring-line transition-transform duration-500 hover:-translate-y-1.5">
                <DrawIcon className={`grid size-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] ${a.tint}`}>
                  <a.icon className="size-6" aria-hidden />
                </DrawIcon>
                <p className="mt-5 font-display text-xl leading-tight font-semibold">{g.area}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{g.items.slice(0, 3).join(', ')} and more</p>
              </Spotlight>
            </motion.li>
          )
        })}
      </ul>

      {/* Every skill, one area at a time */}
      <motion.div
        className="mt-6 rounded-[2rem] bg-paper/70 p-5 ring-1 ring-line sm:p-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.9, ease }}
      >
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Show skills by area">
          {filters.map((f) => {
            const on = area === f.area
            return (
              <button
                key={f.label}
                type="button"
                aria-pressed={on}
                onClick={() => setArea(f.area)}
                className={`relative isolate flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${on ? 'text-paper' : 'text-ink-soft ring-1 ring-line hover:text-ink'}`}
              >
                {on && <motion.span layoutId="skill-filter" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="size-2 rounded-full" style={{ background: on ? '#e9c46a' : f.color }} aria-hidden />
                {f.label}
                <span className={`rounded-full px-1.5 text-xs ${on ? 'bg-paper/15' : 'bg-lilac'}`}>{f.count}</span>
              </button>
            )
          })}
        </div>

        <motion.ul layout className="mt-6 flex flex-wrap gap-2.5" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((s, k) => (
              <motion.li
                layout
                key={s.item}
                initial={{ opacity: 0, scale: 0.6, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', stiffness: 420, damping: 30, delay: Math.min(k, 20) * 0.015 }}
                whileHover={{ y: -4, rotate: k % 2 ? 2 : -2 }}
                className="flex cursor-default items-center gap-2 rounded-full bg-lilac px-3.5 py-2 text-[15px] text-ink-soft ring-1 ring-line transition-colors hover:bg-ink hover:text-paper hover:ring-ink"
              >
                <span className="size-1.5 rounded-full" style={{ background: s.color }} aria-hidden />
                {s.item}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
    </Section>
  )
}
