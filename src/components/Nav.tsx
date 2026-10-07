import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { Mail, Menu, X } from 'lucide-react'
import { Magnetic } from './fx'
import { releaseButterflies } from './swarm'
import { PERSON } from '../content'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'How I work' },
  { id: 'skills', label: 'Skills' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [current, setCurrent] = useState<string | null>(null)
  // Reading progress along the top edge
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section being read
  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => Boolean(e))
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setCurrent(hit.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    els.forEach((e) => io.observe(e))
    const top = () => window.scrollY < 300 && setCurrent(null)
    window.addEventListener('scroll', top, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', top)
    }
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${scrolled || menu ? 'bg-lilac/85 shadow-[0_1px_0_rgba(42,31,61,0.08)] backdrop-blur-md' : ''}`}>
      <motion.div className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-linear-to-r from-violet via-butter to-[#cdbaf0]" style={{ scaleX: progress }} aria-hidden />
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8" aria-label="Main">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="Roan Peduca, back to top"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            releaseButterflies(r.left + 18, r.top + r.height / 2)
          }}
        >
          <motion.img
            src="/butterfly-sm.png"
            alt=""
            className="h-7 w-auto"
            initial={{ x: -30, y: 10, rotate: -25, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            whileHover={{ rotate: -10, y: -3, scaleX: [1, 0.5, 1] }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          />
          <span className="font-display text-lg font-semibold tracking-tight">Roan Peduca</span>
        </a>

        <ul className="ml-auto hidden items-center lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} aria-current={current === l.id ? 'true' : undefined} className={`relative isolate block rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${current === l.id ? 'text-paper' : 'text-ink-soft hover:text-ink'}`}>
                {current === l.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Magnetic strength={0.25} className="ml-auto hidden lg:ml-2 lg:inline-block">
          <a href={`mailto:${PERSON.email}`} className="flex items-center gap-2 rounded-full bg-violet px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-plum">
            <Mail className="size-4" aria-hidden /> Email me
          </a>
        </Magnetic>

        <button type="button" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-label={menu ? 'Close menu' : 'Open menu'} className="ml-auto grid size-10 place-items-center rounded-full hover:bg-ink/5 lg:hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={menu ? 'x' : 'menu'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 lg:hidden">
            {LINKS.map((l, i) => (
              <motion.li key={l.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 + i * 0.05 }}>
                <a href={`#${l.id}`} onClick={() => setMenu(false)} className="block border-b border-line py-3.5 font-display text-xl font-bold">
                  {l.label}
                </a>
              </motion.li>
            ))}
            <li className="py-4">
              <a href={`mailto:${PERSON.email}`} className="flex items-center justify-center gap-2 rounded-full bg-ink py-3 font-semibold text-paper">
                <Mail className="size-4" aria-hidden /> Email me
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
