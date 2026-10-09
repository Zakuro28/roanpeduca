// Small motion building blocks, after reactbits.dev: split-text reveal, magnetic pull,
// 3D tilt and a scroll-velocity marquee.
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'

const ease = [0.16, 1, 0.3, 1] as const

/** Words rise out of a mask one after another, once they scroll into view */
export function SplitReveal({ text, className = '', delay = 0, as = 'h2', id, slot, label }: { text: string; className?: string; delay?: number; as?: 'h1' | 'h2' | 'h3' | 'p'; id?: string; slot?: ReactNode; label?: string }) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag id={id} className={className} aria-label={label ?? text} initial="hidden" whileInView="shown" viewport={{ once: true, margin: '0px 0px -12% 0px' }}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '105%', rotate: 4 }, shown: { y: '0%', rotate: 0 } }}
            transition={{ duration: 0.8, delay: delay + i * 0.055, ease }}
          >
            {w === '{slot}' ? slot : w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Leans toward the pointer while it's nearby, then springs back */
export function Magnetic({ children, strength = 0.3, className = 'inline-block' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 220, damping: 15 })
  const y = useSpring(0, { stiffness: 220, damping: 15 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** Tilts in 3D toward the pointer, with a soft glare that follows it */
export function Tilt({ children, className = '', max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 18 })
  const glare = useTransform([px, py], ([a, b]: number[]) => `radial-gradient(420px circle at ${a * 100}% ${b * 100}%, rgba(255,255,255,0.28), transparent 55%)`)
  const [hover, setHover] = useState(false)
  return (
    <div style={{ perspective: 1100 }}>
      <motion.div
        ref={ref}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className={`relative ${className}`}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse' || !ref.current) return
          const r = ref.current.getBoundingClientRect()
          px.set((e.clientX - r.left) / r.width)
          py.set((e.clientY - r.top) / r.height)
          setHover(true)
        }}
        onPointerLeave={() => {
          px.set(0.5)
          py.set(0.5)
          setHover(false)
        }}
      >
        {children}
        <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300" style={{ background: glare, opacity: hover ? 1 : 0 }} aria-hidden />
      </motion.div>
    </div>
  )
}

/** A strip that drifts on its own and speeds up (and flips direction) with scrolling */
export function VelocityMarquee({ children, className = '' }: { children: ReactNode; className?: string }) {
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const el = track.current
    if (!el || reduce) return
    let x = 0
    let last = performance.now()
    let lastY = window.scrollY
    let boost = 0
    let dir = -1
    let raf = 0
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000
      last = now
      const dy = window.scrollY - lastY
      lastY = window.scrollY
      if (dy) dir = dy > 0 ? -1 : 1
      boost = boost * 0.9 + Math.min(Math.abs(dy), 140) * 0.4
      x += dir * (36 + boost * 6) * dt
      const half = el.scrollWidth / 2
      if (half > 0) {
        if (x <= -half) x += half
        if (x > 0) x -= half
      }
      el.style.transform = `translate3d(${x}px,0,0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce])
  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}

/** A card with a soft light that follows the pointer */
export function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      className={`spotlight ${className}`}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        ref.current!.style.setProperty('--sx', `${e.clientX - r.left}px`)
        ref.current!.style.setProperty('--sy', `${e.clientY - r.top}px`)
      }}
    >
      {children}
    </div>
  )
}

/** Wraps a Lucide icon so its lines draw in when seen, and redraw on hover */
export function DrawIcon({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  useEffect(() => {
    ref.current?.querySelectorAll('path, circle, rect, line, polyline, polygon, ellipse').forEach((p) => p.setAttribute('pathLength', '1'))
  }, [])
  const replay = () => {
    const el = ref.current
    if (!el) return
    el.classList.remove('is-drawn')
    void el.offsetWidth
    el.classList.add('is-drawn')
  }
  return (
    <span ref={ref} className={`draw-icon ${inView ? 'is-drawn' : ''} ${className}`} onPointerEnter={replay}>
      {children}
    </span>
  )
}

/** A ring that trails the mouse, grows over links, and turns into a label over [data-cursor] */
export function Cursor() {
  const [fine] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const [mode, setMode] = useState<'idle' | 'link' | 'label'>('idle')
  const [label, setLabel] = useState('')
  const x = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.4 })
  const y = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.4 })
  const reduce = useReducedMotion()
  const enabled = fine && !reduce
  useEffect(() => {
    if (!enabled) return
    let px = -100
    let py = -100
    // Look at whatever is under the pointer (also after scrolling, when the page moves under a still mouse)
    const read = () => {
      const t = document.elementFromPoint(px, py)
      const tagged = t?.closest<HTMLElement>('[data-cursor]')
      if (tagged) {
        setMode('label')
        setLabel(tagged.dataset.cursor ?? '')
      } else setMode(t?.closest('a, button, summary, input, textarea, label') ? 'link' : 'idle')
    }
    const move = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      x.set(px)
      y.set(py)
      read()
    }
    const leave = () => {
      x.set(-100)
      y.set(-100)
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', read, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', read)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [x, y, enabled])
  if (!enabled) return null
  const size = mode === 'label' ? 84 : mode === 'link' ? 46 : 22
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden>
    <motion.div className="absolute top-0 left-0" style={{ x, y }}>
      <motion.div
        className={`grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs font-semibold text-paper ${mode === 'label' ? '' : 'border-2 border-violet/70'}`}
        animate={{ width: size, height: size, backgroundColor: mode === 'label' ? 'rgba(42,31,61,0.92)' : mode === 'link' ? 'rgba(124,77,204,0.14)' : 'rgba(124,77,204,0)' }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <AnimatePresence>
          {mode === 'label' && (
            <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
    </div>
  )
}

/** Words brighten one by one as the line scrolls through the screen (reactbits ScrollReveal) */
export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <ScrollWord key={i} word={w} progress={scrollYProgress} from={i / words.length} to={(i + 1) / words.length} />
      ))}
    </p>
  )
}

function ScrollWord({ word, progress, from, to }: { word: string; progress: MotionValue<number>; from: number; to: number }) {
  const opacity = useTransform(progress, [from, to], [0.15, 1])
  const y = useTransform(progress, [from, to], [6, 0])
  return (
    <motion.span className="inline-block" style={{ opacity, y }}>
      {word}&nbsp;
    </motion.span>
  )
}
