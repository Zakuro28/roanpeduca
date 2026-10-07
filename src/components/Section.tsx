import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { SplitReveal } from './fx'

/** A page section: its heading rises in word by word, then the intro fades up */
export default function Section({ id, title, intro, children, className = '' }: { id: string; title: string; intro?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SplitReveal id={`${id}-title`} text={title} className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] font-bold tracking-[-0.03em]" />
        {intro && (
          <motion.p
            className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {intro}
          </motion.p>
        )}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
