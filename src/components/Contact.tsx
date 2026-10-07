import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, Mail, Send } from 'lucide-react'
import { Magnetic, SplitReveal, VelocityMarquee } from './fx'
import { PERSON } from '../content'

const YEAR = new Date().getFullYear()
const field = 'w-full rounded-xl bg-lilac/60 px-4 pt-6 pb-2.5 text-ink ring-1 ring-line outline-none transition-[box-shadow,background-color] focus:bg-paper focus:ring-2 focus:ring-violet'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSON.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  }

  // No server: the form opens the visitor's email app with the message filled in
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name || !message) return setError('Add your name and a message, then send again.')
    setError('')
    const subject = encodeURIComponent(`Hello from ${name}`)
    const body = encodeURIComponent(message)
    // Let the paper plane fly off before the email app opens
    setSending(true)
    setTimeout(() => {
      window.location.href = `mailto:${PERSON.email}?subject=${subject}&body=${body}`
      setTimeout(() => setSending(false), 1200)
    }, 650)
  }

  const links = [
    { label: 'LinkedIn', value: PERSON.name, href: PERSON.linkedin, logo: '/brands/linkedin.svg' },
    { label: 'Intro video', value: 'About Roan on Notion', href: PERSON.intro, logo: '/brands/notion.svg' },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink pb-20 text-paper sm:pb-28">
      <div className="aurora-dark" aria-hidden />
      <VelocityMarquee className="relative border-b border-paper/10 py-6 sm:py-8">
        {['Let’s talk', 'Let’s get organized', 'Say hello'].map((t) => (
          <span key={t} className="flex items-center gap-8 pr-8 font-display text-5xl font-bold tracking-[-0.03em] text-transparent [-webkit-text-stroke:1.5px_rgba(252,250,254,0.35)] sm:text-7xl" aria-hidden>
            {t}
            <img src="/butterfly-sm.png" alt="" className="h-10 w-auto sm:h-14" />
          </span>
        ))}
      </VelocityMarquee>
      <div className="relative mx-auto mt-16 grid sm:mt-20 max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SplitReveal id="contact-title" text="Have a role or a team that needs support? Let’s talk." className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.04] font-bold tracking-[-0.03em]" />
          <p className="mt-4 max-w-md text-lg leading-relaxed text-paper/70">I reply to every message, usually within a day.</p>

          <div className="mt-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <a href={`mailto:${PERSON.email}`} className="flex items-center gap-3 rounded-2xl bg-paper/8 px-4 py-3 text-lg font-semibold ring-1 ring-paper/15 transition-colors hover:bg-paper/14">
                <Mail className="size-5 text-[#c7b2f2]" aria-hidden /> {PERSON.email}
              </a>
              <button type="button" onClick={copyEmail} className="flex items-center gap-2 rounded-2xl px-3.5 py-3 text-sm font-semibold text-paper/75 ring-1 ring-paper/15 transition-colors hover:bg-paper/10 hover:text-paper">
                {copied ? <Check className="size-4 text-[#c7b2f2]" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
              </button>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 rounded-full bg-paper/5 py-2 pr-4 pl-2 text-sm font-semibold text-paper/85 ring-1 ring-paper/15 transition-[background-color,transform,color] duration-300 hover:-translate-y-1 hover:bg-paper/12 hover:text-paper">
                  <span className="grid size-8 place-items-center rounded-full bg-paper/10 transition-transform duration-500 group-hover:rotate-[360deg]">
                    <img src={l.logo} alt="" className="size-4.5" />
                  </span>
                  {l.label}
                  <span className="sr-only">: {l.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <motion.form
          onSubmit={send}
          noValidate
          className="rounded-3xl bg-paper p-6 text-ink sm:p-8"
          initial={{ opacity: 0, y: 40, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ type: 'spring', stiffness: 110, damping: 16 }}
        >
          <h3 className="font-display text-xl font-bold">Send a message</h3>
          <p className="mt-1 text-sm text-muted">This opens your email app with your message ready to send.</p>
          <label className="float-field mt-6">
            <input name="name" autoComplete="name" placeholder=" " className={field} />
            <span>Your name</span>
          </label>
          <label className="float-field mt-4">
            <textarea name="message" rows={5} placeholder=" " className={`${field} resize-y`} />
            <span>Tell me about the role or the team</span>
          </label>
          <AnimatePresence>
            {error && (
              <motion.p role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 text-sm font-medium text-[#b4233f]">
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <Magnetic strength={0.12} className="mt-6 block w-full">
            <button type="submit" className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink py-3.5 font-semibold text-paper transition-colors hover:bg-plum">
              <span aria-live="polite">{sending ? 'Opening your email…' : 'Send message'}</span>
              <motion.span
                animate={sending ? { x: 180, y: -70, rotate: 25, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
                transition={sending ? { duration: 0.7, ease: [0.5, 0, 0.75, 0] } : { duration: 0.3 }}
                className="inline-grid"
              >
                <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
              </motion.span>
            </button>
          </Magnetic>
        </motion.form>
      </div>

      <footer className="mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-paper/15 px-5 pt-8 text-sm text-paper/55 sm:flex-row sm:px-8">
        <p className="flex items-center gap-2">
          <img src="/butterfly-sm.png" alt="" className="h-5 w-auto" /> © {YEAR} {PERSON.name}
        </p>
        <a href="#top" className="hover:text-paper">
          Back to top
        </a>
      </footer>
    </section>
  )
}
