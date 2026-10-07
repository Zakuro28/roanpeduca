import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

type Fly = { id: number; x: number; y: number; dx: number; dy: number; size: number; spin: number; delay: number }

/** A dozen butterflies burst out from where you clicked, flutter upward and fade away */
export default function Butterflies() {
  const [flies, setFlies] = useState<Fly[]>([])
  const reduce = useReducedMotion()

  useEffect(() => {
    let next = 0
    const go = (e: Event) => {
      const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail
      const batch = Array.from({ length: 12 }, (_, i) => {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.4
        const dist = 260 + Math.random() * 380
        return {
          id: next++,
          x,
          y,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 120,
          size: 22 + Math.random() * 26,
          spin: (Math.random() - 0.5) * 70,
          delay: i * 0.03,
        }
      })
      setFlies((f) => [...f, ...batch])
      const ids = new Set(batch.map((b) => b.id))
      setTimeout(() => setFlies((f) => f.filter((b) => !ids.has(b.id))), 2600)
    }
    window.addEventListener('butterflies', go)
    return () => window.removeEventListener('butterflies', go)
  }, [])

  if (reduce) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-[65] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {flies.map((b) => (
          <motion.img
            key={b.id}
            src="/butterfly-sm.png"
            alt=""
            className="absolute top-0 left-0 drop-shadow-[0_6px_10px_rgba(124,77,204,0.35)]"
            style={{ width: b.size, marginLeft: -b.size / 2, marginTop: -b.size / 2 }}
            initial={{ x: b.x, y: b.y, scale: 0.2, opacity: 0, rotate: 0 }}
            animate={{
              x: [b.x, b.x + b.dx * 0.45 + 30, b.x + b.dx],
              y: [b.y, b.y + b.dy * 0.5, b.y + b.dy],
              scale: [0.2, 1, 0.8],
              scaleX: [1, 0.35, 1, 0.35, 1, 0.35, 1],
              opacity: [0, 1, 0],
              rotate: [0, b.spin, b.spin * -0.5],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeOut', delay: b.delay, scaleX: { duration: 2.2, ease: 'linear', delay: b.delay } }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
