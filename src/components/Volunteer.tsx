import { motion } from 'motion/react'
import { BookOpen, HandHeart, Hammer, LifeBuoy, ShieldAlert, Sprout, Baby, GraduationCap, Users } from 'lucide-react'
import Section from './Section'
import { DrawIcon, Spotlight } from './fx'
import { CAUSES, VOLUNTEER } from '../content'

const ease = [0.16, 1, 0.3, 1] as const
const ICONS = [Hammer, LifeBuoy, BookOpen, ShieldAlert]
const CAUSE_ICONS = [Sprout, Baby, GraduationCap, Users]

/** Volunteer work as cards that lean in from alternating sides, then the causes behind it */
export default function Volunteer() {
  return (
    <Section id="volunteer" title="Giving back" intro="Time spent with communities, students and families, mostly through UP Diliman.">
      <ul className="grid gap-4 sm:grid-cols-2">
        {VOLUNTEER.map((v, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <motion.li
              key={v.title}
              initial={{ opacity: 0, x: i % 2 ? 60 : -60, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease, delay: (i % 2) * 0.1 }}
            >
              <Spotlight className="group flex h-full gap-5 rounded-3xl bg-paper p-6 ring-1 ring-line transition-transform duration-500 hover:-translate-y-1 sm:p-7">
                <DrawIcon className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf/12 text-leaf transition-transform duration-500 group-hover:rotate-[-8deg]">
                  <Icon className="size-6" aria-hidden />
                </DrawIcon>
                <div>
                  <p className="text-sm text-muted">
                    {v.org}
                    {v.year && <span className="ml-2 rounded-full bg-lilac px-2 py-0.5 text-xs font-semibold text-plum">{v.year}</span>}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold">{v.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{v.text}</p>
                </div>
              </Spotlight>
            </motion.li>
          )
        })}
      </ul>

      <motion.div
        className="relative mt-6 overflow-hidden rounded-[2rem] bg-ink p-6 text-paper sm:p-9"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="aurora-dark opacity-70" aria-hidden />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="flex items-center gap-3 font-display text-2xl font-semibold">
            <HandHeart className="size-7 text-butter" aria-hidden /> Causes I stand for
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {CAUSES.map((c, i) => {
              const Icon = CAUSE_ICONS[i % CAUSE_ICONS.length]
              return (
                <motion.li
                  key={c}
                  className="flex items-center gap-2 rounded-full bg-paper/10 px-4 py-2 font-semibold ring-1 ring-paper/20"
                  initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 360, damping: 14, delay: 0.3 + i * 0.1 }}
                >
                  <Icon className="size-4 text-[#c7b2f2]" aria-hidden /> {c}
                </motion.li>
              )
            })}
          </ul>
        </div>
      </motion.div>
    </Section>
  )
}
