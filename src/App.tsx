import { MotionConfig } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Work from './components/Work'
import Process from './components/Process'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Volunteer from './components/Volunteer'
import About from './components/About'
import Contact from './components/Contact'
import Butterflies from './components/Butterflies'
import { Cursor } from './components/fx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#work" className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to my work
      </a>
      <Cursor />
      <Butterflies />
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Stats />
        <Work />
        <Process />
        <Skills />
        <Experience />
        <Volunteer />
        <About />
        <Contact />
      </main>
    </MotionConfig>
  )
}
