import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Play } from 'lucide-react'
import Portrait from './Portrait'
import { releaseButterflies } from './swarm'
import { Magnetic } from './fx'
import { PERSON } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [more, setMore] = useState(false)
  // The soft light in the background drifts toward the mouse
  const follow = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r || e.pointerType !== 'mouse') return
    ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <section id="top" ref={ref} onPointerMove={follow} className="relative overflow-hidden pt-28 pb-6 sm:pt-32 lg:pb-2">
      <div className="aurora" aria-hidden />
      <div className="hero-spot" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <Portrait className="mx-auto max-w-[19rem] sm:max-w-xs" />

        <div className="text-center lg:text-left">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex items-center justify-center gap-2 text-sm font-semibold tracking-[0.18em] text-violet uppercase lg:justify-start">
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
            You may call me
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mt-3 font-display text-[clamp(3.5rem,9vw,6.5rem)] leading-none font-semibold tracking-[-0.035em] text-plum"
          >
            {PERSON.firstName}
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-7 flex justify-center lg:justify-start">
            <Magnetic strength={0.2}>
              <a href={PERSON.intro} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 rounded-full bg-ink py-2 pr-5 pl-2 font-semibold text-paper transition-colors hover:bg-plum">
                <span className="grid size-9 place-items-center rounded-full bg-violet text-paper transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-3.5 translate-x-px fill-current" aria-hidden />
                </span>
                Watch my intro video
              </a>
            </Magnetic>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }} className="mx-auto mt-7 max-w-[36rem] space-y-4 text-lg leading-relaxed text-ink-soft lg:mx-0">
            <p>
              I am a multifaceted professional with a robust background in <span className="font-medium text-violet">administration</span>, <span className="font-medium text-violet">executive assistance</span> and <span className="font-medium text-violet">customer service</span>.
            </p>
            <AnimatePresence mode="wait" initial={false}>
              {more ? (
                <motion.p key="more" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
                  Over the years, I have mastered the art of creating systems that enhance productivity and efficiency, consistently exploring the latest tools for organization. Balancing flexibility with discipline, my strong organizational and time-management skills enable me to thrive in fast-paced environments.
                </motion.p>
              ) : (
                <motion.button key="btn" type="button" onClick={() => setMore(true)} exit={{ opacity: 0 }} className="rounded-full px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-paper hover:ring-ink/30">
                  View more
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }} className="mx-auto mt-7 max-w-[36rem] rounded-2xl bg-paper/70 p-5 text-left ring-1 ring-line lg:mx-0">
            <p className="text-ink-soft">
              A staunch advocate for the <span className="font-semibold text-violet">environment</span> and <span className="font-semibold text-violet">children’s rights</span>
            </p>
            <p className="mt-1.5 text-sm text-muted">Previously involved with UPD Pahinungod, YACAP Philippines and AGHAM Youth</p>
          </motion.div>
        </div>
      </div>
      <motion.a
        href="#work"
        className="relative mx-auto mt-10 hidden w-fit flex-col items-center gap-2 text-xs font-medium tracking-wide text-muted transition-colors hover:text-ink lg:flex"
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
