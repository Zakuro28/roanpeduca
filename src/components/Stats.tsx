import { CalendarDays, ClipboardList, FileText, Inbox, Map, NotebookPen, Plane, Search, Users } from 'lucide-react'
import { CountUp, VelocityMarquee } from './fx'
import { HONORS, LEADERSHIP_COUNT } from '../content'

const STRIP = [
  { name: 'Inbox management', icon: Inbox },
  { name: 'Calendars', icon: CalendarDays },
  { name: 'Travel', icon: Plane },
  { name: 'Project roadmaps', icon: Map },
  { name: 'SOPs', icon: ClipboardList },
  { name: 'Technical writing', icon: FileText },
  { name: 'Research', icon: Search },
  { name: 'Notion systems', icon: NotebookPen },
  { name: 'Team leadership', icon: Users },
]

/** Numbers that count up, then a strip of what I do that moves with the scroll */
export default function Stats() {
  const stats = [
    { value: 85, label: 'tasks mapped into one working roadmap' },
    { value: LEADERSHIP_COUNT, label: 'leadership and organization roles' },
    { value: HONORS.length, label: 'scholarships, awards and honors' },
  ]
  return (
    <section aria-label="At a glance" className="border-y border-line bg-paper/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8">
        {stats.map((s) => (
          <p key={s.label} className="flex items-baseline gap-3 sm:block">
            <CountUp to={s.value} className="font-display text-5xl font-semibold tracking-[-0.04em] text-plum sm:text-6xl" />
            <span className="text-ink-soft sm:mt-2 sm:block">{s.label}</span>
          </p>
        ))}
      </div>
      <VelocityMarquee className="border-t border-line py-5">
        {STRIP.map((t) => (
          <span key={t.name} className="flex items-center gap-3 pr-12 font-display text-2xl font-semibold tracking-[-0.02em] text-ink/80 sm:text-3xl">
            <t.icon className="size-6 text-violet" aria-hidden />
            {t.name}
          </span>
        ))}
      </VelocityMarquee>
    </section>
  )
}
