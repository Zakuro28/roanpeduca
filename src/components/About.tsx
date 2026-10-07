import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { ArrowRight, Award, Crown, HeartPulse, Music, PenLine, Trophy } from 'lucide-react'
import Section from './Section'
import { ScrollWords, Tilt } from './fx'
import { PERSON, VALUES } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

/** Little stickers that float around the photo */
const STICKERS = [
  { text: 'University Scholar', icon: Award, className: '-left-4 top-8 -rotate-6 bg-butter text-ink sm:-left-10', delay: 0 },
  { text: 'Editor-in-Chief', icon: PenLine, className: '-right-4 top-20 rotate-6 bg-violet text-paper sm:-right-8', delay: 0.6 },
  { text: 'Dancesport', icon: Music, className: '-left-4 top-[45%] -rotate-3 bg-paper text-ink ring-1 ring-line sm:-left-7', delay: 1.8 },
  { text: 'Gerry Roxas Leadership Awardee', icon: Trophy, className: '-right-4 top-[58%] -rotate-2 bg-ink text-paper sm:-right-10', delay: 1.2 },
  { text: 'Chess champion', icon: Crown, className: '-left-3 bottom-6 -rotate-2 bg-rose text-ink sm:-left-6', delay: 2.4 },
  { text: 'First aid trainer', icon: HeartPulse, className: '-right-3 bottom-16 rotate-3 bg-leaf text-paper sm:-right-8', delay: 3 },
]

/** Moves a layer with the mouse; bigger depth means it moves further */
function useLayer(sx: MotionValue<number>, sy: MotionValue<number>, depth: number) {
  return { x: useTransform(sx, (v) => v * depth), y: useTransform(sy, (v) => v * depth) }
}

export default function About() {
  const photo = useRef<HTMLElement>(null)
  // The photo drifts a little slower than the page, and its backing card turns
  const { scrollYProgress } = useScroll({ target: photo, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], [40, -40])
  const back = useTransform(scrollYProgress, [0, 1], [-8, 6])
  // Layers behind the photo shift with the mouse, each by a different amount, for depth
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 110, damping: 18 })
  const sy = useSpring(my, { stiffness: 110, damping: 18 })
  const blob = useLayer(sx, sy, -46)
  const card = useLayer(sx, sy, -18)
  const ring = useLayer(sx, sy, 26)
  const spark = useLayer(sx, sy, 40)

  return (
    <Section id="about" title="A bit about me">
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,21rem)_1fr] md:gap-16">
        <motion.figure
          ref={photo}
          className="relative mx-auto w-full max-w-xs md:mx-0"
          initial={{ opacity: 0, rotate: -6, y: 40 }}
          whileInView={{ opacity: 1, rotate: 0, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          <div
            className="group/photo relative isolate"
            onPointerMove={(e) => {
              if (e.pointerType !== 'mouse') return
              const r = e.currentTarget.getBoundingClientRect()
              mx.set((e.clientX - r.left) / r.width - 0.5)
              my.set((e.clientY - r.top) / r.height - 0.5)
            }}
            onPointerLeave={() => {
              mx.set(0)
              my.set(0)
            }}
          >
            {/* A glowing blob that slowly changes shape */}
            <motion.div className="photo-blob absolute -inset-12 -z-30" style={blob} aria-hidden />
            {/* A slowly turning dashed ring */}
            <motion.div className="pointer-events-none absolute top-1/2 left-1/2 -z-20 aspect-square w-[135%] -translate-x-1/2 -translate-y-1/2" style={ring} aria-hidden>
              <div className="photo-orbit size-full rounded-full border-2 border-dashed border-violet/30" />
            </motion.div>
            {/* The dotted card the photo sits on */}
            <motion.div className="photo-card absolute -inset-3 -z-10 rounded-[2rem]" style={{ rotate: back, ...card }} aria-hidden />
            {/* Sparkles */}
            <motion.div className="pointer-events-none absolute inset-0 -z-10" style={spark} aria-hidden>
              <span className="photo-spark -top-8 left-[18%] text-2xl" />
              <span className="photo-spark top-[30%] -right-10 text-lg [animation-delay:-1.2s]" />
              <span className="photo-spark -bottom-6 left-[55%] text-xl [animation-delay:-2.1s]" />
            </motion.div>
            <motion.div style={{ y: drift }}>
              <Tilt className="rounded-[1.6rem]" max={10}>
                <img src="/roan.jpg" alt={PERSON.name} className="aspect-[4/5] w-full rounded-[1.6rem] object-cover object-[50%_25%] shadow-[0_24px_50px_-28px_rgba(42,31,61,0.6)]" />
              </Tilt>
            </motion.div>
            {STICKERS.map((s, i) => (
              <motion.span
                key={s.text}
                className={`absolute z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap shadow-[0_12px_24px_-12px_rgba(42,31,61,0.6)] ${s.className}`}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                viewport={{ once: true }}
                transition={{
                  opacity: { delay: 0.4 + i * 0.2 },
                  scale: { type: 'spring', stiffness: 380, damping: 14, delay: 0.4 + i * 0.2 },
                  y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: s.delay },
                }}
              >
                <s.icon className="size-3.5" aria-hidden /> {s.text}
              </motion.span>
            ))}
          </div>
          <figcaption className="mt-5 text-center text-sm text-muted md:text-left">{PERSON.name}, Philippines</figcaption>
        </motion.figure>

        <div>
          {/* The one line that sums me up: each word lights up as it scrolls by */}
          <ScrollWords
            text="Good systems should outlast the person who built them. That’s the whole point."
            className="font-display text-[clamp(1.7rem,3.3vw,2.7rem)] leading-[1.12] font-semibold tracking-[-0.025em]"
          />
          <motion.div
            className="mt-7 max-w-[60ch] space-y-4 text-lg leading-relaxed text-ink-soft"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ staggerChildren: 0.15 }}
          >
            {[
              'I’m a multifaceted professional with a background in administration, executive assistance and customer service.',
              'I studied Family Life and Child Development at UP Diliman, where I was a University and College Scholar, and spent the in-between hours running ROTC offices, editing a student paper and competing in dancesport.',
              'Outside work, I’m a staunch advocate for the environment and for children’s rights.',
            ].map((p) => (
              <motion.p key={p} variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }} transition={{ duration: 0.7, ease }}>
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>

      {/* What I value */}
      <div className="mt-16">
        <p className="text-sm font-semibold text-violet">What I value</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {VALUES.map((v, i) => (
            <motion.li
              key={v}
              className="rounded-2xl bg-paper px-5 py-3.5 font-display text-lg font-semibold ring-1 ring-line transition-colors hover:bg-ink hover:text-paper sm:text-xl"
              initial={{ opacity: 0, y: 30, rotate: i % 2 ? 4 : -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -4, rotate: i % 2 ? 2 : -2 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ type: 'spring', stiffness: 220, damping: 16, delay: i * 0.08 }}
            >
              {v}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Invitation to get in touch */}
      <motion.a
        href="#contact"
        className="group mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-ink px-6 py-6 text-paper sm:px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
      >
        <span className="flex items-center gap-3 font-display text-xl font-semibold sm:text-2xl">
          <img src="/butterfly-sm.png" alt="" className="h-6 w-auto" />
          Need someone to keep things in order?
        </span>
        <span className="flex items-center gap-2 rounded-full bg-butter px-5 py-2.5 font-semibold text-ink transition-transform duration-300 group-hover:translate-x-1">
          Let’s talk <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </motion.a>
    </Section>
  )
}
