import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SAMPLES } from '../content'

/**
 * The portfolios and case studies as a hand of cards. They're dealt onto the table when the page
 * loads, fan apart when you reach for them, and each opens the document.
 */
export default function SampleDeck() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [unit, setUnit] = useState(1) // scales offsets with the deck's width
  const [open, setOpen] = useState(false) // pointer or focus is on the deck
  const [active, setActive] = useState<number | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setUnit(e.contentRect.width / 560))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const mid = (SAMPLES.length - 1) / 2

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-[5/4] w-full max-w-[560px]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false)
        setActive(null)
      }}
    >
      {/* The whole hand bobs gently while nobody is reaching for it */}
      <motion.ul
        className="absolute inset-0"
        aria-label="Portfolios and case studies"
        animate={reduce || open ? { y: 0 } : { y: [0, -10, 0] }}
        transition={open ? { duration: 0.4 } : { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
      >
        {SAMPLES.map((p, i) => {
          const d = i - mid
          const isActive = active === i
          // Resting hand, then a wider fan when the deck is reached for
          const spread = open ? 1.9 : 1
          const x = d * 46 * spread * unit
          const y = (Math.abs(d) * 14 * (open ? 1.5 : 1) + (isActive ? -34 : 0)) * unit
          const rotate = isActive ? 0 : d * (open ? 9 : 6)
          return (
            <motion.li
              key={p.name}
              className="absolute top-[14%] left-1/2 w-[62%] list-none"
              style={{ zIndex: isActive ? 20 : 10 - Math.abs(Math.round(d)) }}
              initial={reduce ? false : { x: '-50%', y: 520 * unit, rotate: d * 24 - 8, opacity: 0 }}
              animate={{ x: `calc(-50% + ${x}px)`, y, rotate, scale: isActive ? 1.06 : 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 170,
                damping: 20,
                // Dealt one after another on load; quick and together afterwards
                delay: open || active !== null ? 0 : 0.35 + (SAMPLES.length - 1 - i) * 0.11,
              }}
            >
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActive(i)}
                onFocus={() => {
                  setOpen(true)
                  setActive(i)
                }}
                onBlur={() => {
                  setOpen(false)
                  setActive(null)
                }}
                aria-label={`${p.name}, ${p.kind.toLowerCase()}. Opens in a new tab`}
                className="block overflow-hidden rounded-xl bg-paper shadow-[0_18px_40px_-18px_rgba(42,31,61,0.55),0_2px_6px_rgba(42,31,61,0.08)] ring-1 ring-ink/10 transition-shadow duration-300 hover:shadow-[0_30px_60px_-20px_rgba(42,31,61,0.6)]"
              >
                <span className="flex items-center gap-1.5 border-b border-line bg-lilac px-3 py-2">
                  <span className="size-2 rounded-full bg-[#e2829f]" />
                  <span className="size-2 rounded-full bg-butter" />
                  <span className="size-2 rounded-full bg-violet" />
                  <span className="ml-2 truncate text-[11px] text-muted">{p.host}</span>
                </span>
                <img src={p.image} alt="" className="aspect-[16/10] w-full object-cover object-top" draggable={false} />
                <span className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate font-display text-[15px] font-bold">{p.name}</span>
                    <span className="block truncate text-xs text-muted">{p.kind}</span>
                  </span>
                  <ArrowUpRight className={`size-4 shrink-0 transition-all duration-300 ${isActive ? 'text-violet' : 'text-muted/60'}`} aria-hidden />
                </span>
              </a>
            </motion.li>
          )
        })}
      </motion.ul>
    </div>
  )
}
