import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight, CircleAlert, Hammer, Sparkles } from 'lucide-react'
import { DrawIcon, Magnetic, Tilt } from './fx'
import Section from './Section'
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
  { key: 'outcome', label: 'The outcome', icon: Sparkles, tint: 'bg-leaf/15 text-leaf' },
] as const

/** One case study, told as problem, build and outcome. On big screens the cards stick and pile up as you scroll. */
function CaseCard({ c, i, total, progress }: { c: CaseStudy; i: number; total: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.03])
  return (
    <li className="[@media(min-width:1024px)_and_(min-height:760px)]:sticky" style={{ top: `calc(5.5rem + ${i * 14}px)` }}>
      <motion.article
        style={{ scale }}
        className="relative grid origin-top gap-8 overflow-hidden rounded-[2rem] bg-paper p-6 shadow-[0_30px_60px_-40px_rgba(42,31,61,0.6)] ring-1 ring-line sm:p-9 lg:grid-cols-[1fr_1.45fr] lg:gap-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <motion.span
          aria-hidden
          className="outline-num pointer-events-none absolute -bottom-6 -left-2 font-display text-[7rem] leading-none font-bold select-none sm:-bottom-10 sm:text-[10rem]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
        >
          {String(i + 1).padStart(2, '0')}
        </motion.span>

        <div className="relative flex flex-col">
          <p className="text-[15px] font-medium text-violet">{c.area}</p>
          <h3 className="mt-1 max-w-[16ch] font-display text-3xl leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[2.1rem]">{c.title}</h3>
          {c.sample && (
            <Magnetic strength={0.25} className="mt-7 inline-block w-fit lg:mt-auto">
              <a href={c.sample} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-paper transition-colors hover:bg-plum">
                Read the full write-up
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
            </Magnetic>
          )}
        </div>

        {/* Problem, build, outcome down a short rail */}
        <ol className="relative space-y-6">
          <span className="absolute top-5 bottom-5 left-5 w-px bg-line" aria-hidden />
          {PARTS.map((p, k) => (
            <motion.li
              key={p.key}
              className="relative grid grid-cols-[2.5rem_1fr] gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 + k * 0.12 }}
            >
              <DrawIcon className={`relative grid size-10 place-items-center rounded-xl ring-4 ring-paper ${p.tint}`}>
                <p.icon className="size-5" aria-hidden />
              </DrawIcon>
              <div>
                <p className="text-sm font-semibold text-ink">{p.label}</p>
                <p className="mt-1 max-w-[58ch] leading-relaxed text-ink-soft">{c[p.key]}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.article>
    </li>
  )
}

/** Every portfolio and write-up, each opening the real document */
function Samples() {
  return (
    <div className="mt-24 sm:mt-28">
      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">Portfolios and samples</h3>
      <p className="mt-2 max-w-xl text-ink-soft">Writing, design and teaching work, plus the full case-study documents.</p>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLES.map((s, i) => (
          <motion.li
            key={s.name}
            initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ type: 'spring', stiffness: 150, damping: 18, delay: (i % 3) * 0.08 }}
          >
            <Tilt className="h-full rounded-3xl" max={6}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open ↗"
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-paper ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_30px_50px_-30px_rgba(42,31,61,0.6)]"
              >
                <span className="block overflow-hidden">
                  <img src={s.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="text-sm font-medium text-violet">{s.kind}</span>
                  <span className="mt-1 flex items-start justify-between gap-3">
                    <span className="font-display text-xl leading-tight font-semibold">{s.name}</span>
                    <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-muted transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet" aria-hidden />
                  </span>
                  <span className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.description}</span>
                  <span className="mt-auto pt-4 text-xs text-muted">Opens on {s.host}</span>
                </span>
              </a>
            </Tilt>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
