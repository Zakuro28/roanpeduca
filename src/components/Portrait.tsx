import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { Tilt } from './fx'
import { PERSON } from '../content'

/** Moves a layer with the mouse; bigger depth means it moves further */
function useLayer(sx: MotionValue<number>, sy: MotionValue<number>, depth: number) {
  return { x: useTransform(sx, (v) => v * depth), y: useTransform(sy, (v) => v * depth) }
}

/** My photo on a dotted card, with a glow, a turning ring and sparkles around it */
export default function Portrait({ caption, className = '' }: { caption?: string; className?: string }) {
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
    <motion.figure
      ref={photo}
      className={`relative w-full max-w-xs ${className}`}
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
      </div>
      {caption && <figcaption className="mt-5 text-center text-sm text-muted md:text-left">{caption}</figcaption>}
    </motion.figure>
  )
}
