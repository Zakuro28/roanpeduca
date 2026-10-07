import { useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Award, Check, GraduationCap, Users } from 'lucide-react'
import Section from './Section'
import { DrawIcon } from './fx'
import { EDUCATION, HONORS, LEADERSHIP } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

type Stop = { id: string; tab: string; sub: string; mono: string; kind: 'school' | 'group'; title: string; org: string; items: { main: string; sub: string }[] }

// The degree and its honors first, then each kind of leadership role
const STOPS: Stop[] = [
  {
    id: 'education',
    tab: 'UP Diliman',
    sub: 'Degree and honors',
    mono: 'UP',
    kind: 'school',
    title: EDUCATION.degree,
    org: EDUCATION.school,
    items: HONORS.map((h) => ({ main: h.title, sub: [h.detail, h.year].filter(Boolean).join(', ') })),
  },
  ...LEADERSHIP.map((g) => ({
    id: g.area.toLowerCase().replace(/[^a-z]/g, ''),
    tab: g.area,
    sub: `${g.roles.length} roles`,
    mono: g.mono,
    kind: 'group' as const,
    title: g.area,
    org: [...new Set(g.roles.map((r) => r.org))].slice(0, 3).join(', '),
    items: g.roles.map((r) => ({ main: r.role, sub: [r.org, r.year].filter(Boolean).join(', ') })),
  })),
]

/** Pick a stop on the left; its story slides in on the right. Until someone picks one, it moves on by itself every 10 seconds. */
export default function Experience() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const reduce = useReducedMotion()
  const stop = STOPS[active]
  const autoOn = auto ? !reduce : false
  const pick = (i: number) => {
    setAuto(false)
    setActive(i)
  }

  // Arrow keys move between tabs, like a native tab list
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!next) return
    e.preventDefault()
    const i = (active + next + STOPS.length) % STOPS.length
    pick(i)
    document.getElementById(`exp-tab-${STOPS[i].id}`)?.focus()
  }

  return (
    <Section id="leadership" title="Education and leadership" intro="A scholar at UP Diliman who kept saying yes to running things: ROTC offices, a student paper, advocacy groups and a dance team.">
      <motion.div
        className="grid gap-5 lg:grid-cols-[17rem_1fr] lg:gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 0.9, ease }}
      >
        {/* Tabs: a column on desktop, a swipeable row on phones */}
        <div role="tablist" aria-label="Education and leadership" aria-orientation="vertical" onKeyDown={onKey} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
          {STOPS.map((s, i) => {
            const on = i === active
            return (
              <button
                key={s.id}
                id={`exp-tab-${s.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="exp-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => pick(i)}
                className={`group relative isolate flex shrink-0 items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors lg:w-full ${on ? 'text-paper' : 'text-ink-soft hover:bg-paper hover:text-ink'}`}
              >
                {on && <motion.span layoutId="exp-tab" className="absolute inset-0 -z-10 rounded-2xl bg-ink shadow-[0_16px_30px_-18px_rgba(42,31,61,0.9)]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className={`grid size-10 shrink-0 place-items-center rounded-xl font-display text-sm font-bold transition-[background-color,color,transform] duration-300 group-hover:rotate-[-6deg] ${on ? 'bg-butter text-ink' : 'bg-lilac-deep text-plum'}`}>{s.mono}</span>
                <span className="grid">
                  <span className="font-display font-semibold whitespace-nowrap">{s.tab}</span>
                  <span className={`text-xs whitespace-nowrap ${on ? 'text-paper/65' : 'text-muted'}`}>{s.sub}</span>
                </span>
                {/* Countdown to the next stop; gone once the visitor picks one */}
                {on && autoOn && (
                  <span className="absolute inset-x-3 bottom-1.5 h-0.5 overflow-hidden rounded-full bg-paper/15" aria-hidden>
                    <span key={active} className="tab-timer block h-full origin-left rounded-full bg-butter" onAnimationEnd={() => setActive((active + 1) % STOPS.length)} />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* The story of the chosen stop */}
        <div id="exp-panel" role="tabpanel" aria-labelledby={`exp-tab-${stop.id}`} className="relative isolate min-h-[26rem] overflow-hidden rounded-[2rem] bg-ink p-6 text-paper sm:p-10">
          <div className="aurora-dark opacity-80" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.div
              key={stop.id}
              className="relative"
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease }}
            >
              <motion.span
                className="pointer-events-none absolute -top-6 -right-2 font-display text-[7rem] leading-none font-bold text-transparent select-none [-webkit-text-stroke:1.5px_rgba(252,250,254,0.12)] sm:-top-10 sm:text-[11rem]"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
                aria-hidden
              >
                {stop.mono}
              </motion.span>

              <p className="flex items-center gap-2 text-sm font-medium text-butter">
                {stop.kind === 'school' ? <GraduationCap className="size-4" aria-hidden /> : <Users className="size-4" aria-hidden />}
                {stop.kind === 'school' ? 'Education' : 'Leadership'}
              </p>
              <h3 className="mt-2 max-w-[20ch] pr-16 font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{stop.title}</h3>
              <p className="mt-3 max-w-[50ch] text-paper/70">{stop.org}</p>

              <ul className="mt-7 grid gap-x-8 gap-y-4 md:grid-cols-2">
                {stop.items.map((it, k) => (
                  <motion.li
                    key={it.main + it.sub}
                    className="flex gap-3.5 leading-snug"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, ease, delay: 0.2 + k * 0.06 }}
                  >
                    <DrawIcon className={`mt-0.5 size-6 shrink-0 rounded-full ${stop.kind === 'school' ? 'bg-butter text-ink' : 'bg-violet/40 text-[#c7b2f2]'}`}>
                      {stop.kind === 'school' ? <Award className="size-3.5" aria-hidden /> : <Check className="size-3.5" strokeWidth={3} aria-hidden />}
                    </DrawIcon>
                    <span>
                      <span className="block font-semibold text-paper">{it.main}</span>
                      <span className="mt-0.5 block text-sm text-paper/60">{it.sub}</span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </Section>
  )
}
