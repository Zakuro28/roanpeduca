import { useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, Play } from 'lucide-react'
import Portrait from './Portrait'
import { releaseButterflies } from './swarm'
import { Magnetic, RotatingWord, SplitReveal } from './fx'
import { EDUCATION, PERSON } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

const KEEPS = ['inboxes', 'calendars', 'projects', 'operations']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  // The soft light in the background drifts toward the mouse
  const follow = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r || e.pointerType !== 'mouse') return
    ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <section id="top" ref={ref} onPointerMove={follow} className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pb-28">
      <div className="aurora" aria-hidden />
      <div className="hero-spot" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex items-center gap-2 text-[15px] font-medium text-ink-soft">
            <motion.button
              type="button"
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                releaseButterflies(r.left + r.width / 2, r.top + r.height / 2)
              }}
              aria-label="Release the butterflies"
              data-cursor="Let them fly"
              className="-my-2 -ml-1 grid size-10 place-items-center rounded-full transition-colors hover:bg-paper"
              animate={{ rotate: [0, -8, 0, 6, 0], y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src="/butterfly-sm.png" alt="" className="h-6 w-auto" />
            </motion.button>
            Hi, I’m {PERSON.firstName}
          </motion.p>

          <SplitReveal
            as="h1"
            delay={0.1}
            text="I keep {slot} in order, so the people I support can focus."
            slot={<RotatingWord words={KEEPS} className="text-violet" />}
            label="I keep inboxes, calendars, projects and operations in order, so the people I support can focus."
            className="mt-5 font-display text-[clamp(2.1rem,4.3vw,3.55rem)] leading-[1.04] font-semibold tracking-[-0.025em]"
          />

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease }} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft">
            I’m {PERSON.name}, a {EDUCATION.school.replace('University of the Philippines', 'UP')} graduate with a background in administration, executive assistance and customer service. I build the systems that keep a team’s work easy to find, and I’m a staunch advocate for the environment and children’s rights.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease }} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#work" className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-paper transition-colors hover:bg-plum">
                See my work
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href={PERSON.intro} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 rounded-full py-2 pr-5 pl-2 font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-paper hover:ring-ink/30">
                <span className="grid size-9 place-items-center rounded-full bg-violet text-paper transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-3.5 translate-x-px fill-current" aria-hidden />
                </span>
                Watch my intro
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <Portrait className="mx-auto max-w-[19rem] sm:max-w-xs" />
      </div>
      <motion.a
        href="#work"
        className="relative mx-auto mt-14 hidden w-fit flex-col items-center gap-2 text-xs font-medium tracking-wide text-muted transition-colors hover:text-ink lg:flex"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="scroll-cue" aria-hidden />
        Scroll to see my work
      </motion.a>
    </section>
  )
}
