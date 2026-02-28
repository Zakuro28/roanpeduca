import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileText, MessageSquare, Calendar, BarChart3, 
  Code, Palette, Globe, Database, Users, Lightbulb, 
  Clock, Target
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const softSkills = [
  { icon: Users, name: 'Leadership', level: 95 },
  { icon: MessageSquare, name: 'Communication', level: 95 },
  { icon: Clock, name: 'Time Management', level: 92 },
  { icon: Target, name: 'Organization', level: 90 },
  { icon: Lightbulb, name: 'Problem Solving', level: 88 },
  { icon: MessageSquare, name: 'Customer Relations', level: 93 },
];

const hardSkills = [
  { icon: FileText, name: 'Technical Writing', level: 90 },
  { icon: Target, name: 'Project Management', level: 91 },
  { icon: MessageSquare, name: 'Inbox Management', level: 90 },
  { icon: Calendar, name: 'Administrative Systems', level: 92 },
  { icon: Calendar, name: 'Calendar Management', level: 92 },
  { icon: Globe, name: 'Travel Management', level: 88 },
  { icon: BarChart3, name: 'Data Management', level: 85 },
  { icon: Code, name: 'Documentation Tools', level: 88 },
  { icon: Palette, name: 'Content Creation', level: 82 },
  { icon: Globe, name: 'Research & Analysis', level: 87 },
  { icon: Database, name: 'Database Management', level: 80 },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'soft' | 'hard'>('soft');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: isDesktop ? 'top 80%' : 'top 88%',
            end: isDesktop ? 'top 50%' : 'top 68%',
            scrub: isDesktop ? 0.4 : false,
          },
        }
      );

      // Tabs reveal
      gsap.fromTo(
        tabsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: isDesktop ? 'top 85%' : 'top 90%',
            end: isDesktop ? 'top 60%' : 'top 72%',
            scrub: isDesktop ? 0.4 : false,
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: isDesktop ? 'top 85%' : 'top 90%',
            end: isDesktop ? 'top 60%' : 'top 72%',
            scrub: isDesktop ? 0.4 : false,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentSkills = activeTab === 'soft' ? softSkills : hardSkills;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw]"
      style={{
        background: 'radial-gradient(ellipse at 20% 80%, rgba(168,85,247,0.06) 0%, transparent 40%)',
      }}
    >
      {/* Headline */}
      <div ref={headlineRef} className="text-center mb-12">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#a855f7] block mb-2">
          Expertise
        </span>
        <h2 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient mb-4">
          Skills
        </h2>
        <p className="text-[#a78bfa]/70 text-[clamp(14px,1.1vw,17px)] max-w-xl mx-auto leading-relaxed">
          A blend of interpersonal abilities and technical competencies honed through years of diverse experience.
        </p>
      </div>

      {/* Tabs */}
      <div ref={tabsRef} className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveTab('soft')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeTab === 'soft'
              ? 'bg-[#a855f7] text-[#0a0a0f] shadow-lg shadow-purple-500/30'
              : 'bg-purple-500/10 text-[#a78bfa] border border-purple-500/20 hover:bg-purple-500/20'
          }`}
        >
          Soft Skills
        </button>
        <button
          onClick={() => setActiveTab('hard')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeTab === 'hard'
              ? 'bg-[#a855f7] text-[#0a0a0f] shadow-lg shadow-purple-500/30'
              : 'bg-purple-500/10 text-[#a78bfa] border border-purple-500/20 hover:bg-purple-500/20'
          }`}
        >
          Hard Skills
        </button>
      </div>

      {/* Skills Grid */}
      <div ref={contentRef} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group p-5 rounded-2xl card-glass hover:bg-purple-500/10 transition-all duration-300"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-[#a855f7] group-hover:bg-[#a855f7] group-hover:text-[#0a0a0f] transition-colors">
                  <skill.icon size={22} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-[#f3e8ff] font-semibold">{skill.name}</h3>
                  </div>
                  <div className="h-2 bg-purple-500/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
