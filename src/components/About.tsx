import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Section from './Section'
import Portrait from './Portrait'
import { ScrollWords } from './fx'
import { PERSON, VALUES } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

export default function About() {
  return (
    <Section id="about" title="A bit about me">
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,21rem)_1fr] md:gap-16">
        <Portrait caption={PERSON.name} className="mx-auto md:mx-0" />

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
