import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import WorkSection from './sections/WorkSection';
import SkillsSection from './sections/SkillsSection';
import ExtracurricularSection from './sections/ExtracurricularSection';
import AchievementsSection from './sections/AchievementsSection';
import VolunteerSection from './sections/VolunteerSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mainRef} className="relative bg-[#0a0a0f] min-h-screen">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        <HeroSection />
        <WorkSection />
        <SkillsSection />
        <ExtracurricularSection />
        <AchievementsSection />
        <VolunteerSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
