import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight, CircleAlert, Hammer, Sparkles } from 'lucide-react'
import { DrawIcon, Magnetic } from './fx'
import Section from './Section'
import SampleDeck from './SampleDeck'
import { CASE_STUDIES, SAMPLES, type CaseStudy } from '../content'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Work() {
  const list = useRef<HTMLUListElement>(null)
  // Drives the stack: earlier cards shrink back as later ones slide over them
  const { scrollYProgress } = useScroll({ target: list, offset: ['start start', 'end end'] })
  return (
    <Section id="work" title="Case studies" intro="A closer look at how I diagnose, structure and solve operational problems.">
      <ul ref={list} className="space-y-10 sm:space-y-14">
        {CASE_STUDIES.map((c, i) => (
          <CaseCard key={c.title} c={c} i={i} total={CASE_STUDIES.length} progress={scrollYProgress} />
        ))}
      </ul>
      <Samples />
    </Section>
  )
}

const PARTS = [
  { key: 'problem', label: 'The problem', icon: CircleAlert, tint: 'bg-rose/20 text-[#a3375a]' },
  { key: 'built', label: 'What I built', icon: Hammer, tint: 'bg-violet/15 text-violet' },
  { key: 'outcome', label: 'The outcome', icon: Sparkles, tint: 'bg-leaf/15 text-leaf', panel: 'bg-leaf/[0.06]' },
] as const

/** One case study, told as problem, build and outcome. On big screens the cards stick and pile up as you scroll. */
function CaseCard({ c, i, total, progress }: { c: CaseStudy; i: number; total: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.03])
  return (
    <li className="[@media(min-width:1024px)_and_(min-height:760px)]:sticky" style={{ top: `calc(5.5rem + ${i * 14}px)` }}>
      <motion.article
        style={{ scale }}
        className="relative origin-top overflow-hidden rounded-[2rem] bg-paper shadow-[0_30px_60px_-40px_rgba(42,31,61,0.6)] ring-1 ring-line"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <header className="flex flex-col gap-6 p-6 sm:p-9 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="flex items-center gap-3 text-[15px] font-medium text-violet">
              <span className="font-display font-bold text-ink tabular-nums">
                {String(i + 1).padStart(2, '0')}
                <span className="text-muted"> / {String(total).padStart(2, '0')}</span>
              </span>
              <span className="h-px w-8 bg-line" aria-hidden />
              {c.area}
            </p>
            <h3 className="mt-3 max-w-[24ch] font-display text-3xl leading-[1.08] font-semibold tracking-[-0.02em] text-balance sm:text-[2.4rem]">{c.title}</h3>
          </div>
          {c.sample && (
            <Magnetic strength={0.25} className="inline-block w-fit shrink-0">
              <a href={c.sample} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-paper transition-colors hover:bg-plum">
                Read the full write-up
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
            </Magnetic>
          )}
        </header>

        {/* Problem, build, outcome side by side */}
        <ol className="grid border-t border-line lg:grid-cols-3">
          {PARTS.map((p, k) => (
            <motion.li
              key={p.key}
              className={`border-line p-6 not-first:border-t sm:p-9 lg:not-first:border-t-0 lg:not-first:border-l ${'panel' in p ? p.panel : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 + k * 0.12 }}
            >
              <div className="flex items-center gap-3">
                <DrawIcon className={`grid size-10 shrink-0 place-items-center rounded-xl ${p.tint}`}>
                  <p.icon className="size-5" aria-hidden />
                </DrawIcon>
                <p className="font-semibold text-ink">{p.label}</p>
              </div>
              <p className="mt-4 leading-relaxed text-ink-soft">{c[p.key]}</p>
            </motion.li>
          ))}
        </ol>
      </motion.article>
    </li>
  )
}

/** Every portfolio and write-up: a list beside a hand of cards, both opening the real document */
function Samples() {
  const [active, setActive] = useState<number | null>(null)
  return (
    <div className="mt-20 grid items-center gap-12 sm:mt-24 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <div>
        <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">Portfolios and samples</h3>
        <p className="mt-2 max-w-md text-ink-soft">Writing, design and teaching work, plus the full case-study documents.</p>
        <ul className="mt-8 border-t border-line" onMouseLeave={() => setActive(null)}>
          {SAMPLES.map((s, i) => (
            <motion.li
              key={s.name}
              className="border-b border-line"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
            >
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group flex items-center gap-4 py-4"
              >
                <span className={`w-6 shrink-0 font-display text-sm font-bold tabular-nums transition-colors ${active === i ? 'text-violet' : 'text-muted'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1">
                  <span className={`block font-display text-lg leading-tight font-semibold transition-transform duration-300 ${active === i ? 'translate-x-1' : ''}`}>{s.name}</span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {s.kind} · {s.host}
                  </span>
                </span>
                <ArrowUpRight className={`size-5 shrink-0 transition-[color,transform] duration-300 ${active === i ? 'translate-x-0.5 -translate-y-0.5 text-violet' : 'text-muted/60'}`} aria-hidden />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="hidden sm:block">
        <SampleDeck active={active} onActive={setActive} />
      </div>
    </div>
  )
}
