import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Sparkles, Box, Zap, Code2, FileType, Wand2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Layers,
    title: 'Frontend Architecture',
    description: 'Component systems, design tokens, accessibility.',
  },
  {
    icon: Sparkles,
    title: 'Interaction Design',
    description: 'Motion, micro-interactions, scroll-driven storytelling.',
  },
  {
    icon: Box,
    title: 'WebGL / 3D',
    description: 'Three.js, shaders, performant scenes.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Core Web Vitals, lazy loading, runtime optimization.',
  },
];

const toolkit = [
  { icon: Code2, label: 'React / Next.js' },
  { icon: FileType, label: 'TypeScript' },
  { icon: Wand2, label: 'GSAP / WebGL' },
];

const CapabilitiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const toolkitRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.5,
          },
        }
      );

      // Capability items reveal
      itemsRef.current.forEach((item) => {
        if (item) {
          gsap.fromTo(
            item,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 0.5,
              },
            }
          );
        }
      });

      // Toolkit reveal
      gsap.fromTo(
        toolkitRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: toolkitRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#05060B] py-[10vh] px-[6vw]"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-[8vw]">
        {/* Left headline */}
        <div ref={headlineRef} className="lg:w-[40vw] lg:sticky lg:top-[20vh] lg:self-start">
          <h2 className="text-[clamp(34px,3.6vw,52px)] font-semibold text-[#F4F6FF] mb-4">
            Capabilities
          </h2>
          <p className="text-[#A7B0C8] text-[clamp(14px,1.1vw,17px)] leading-relaxed">
            I work across the frontend stack, from UI engineering to real-time
            graphics.
          </p>
        </div>

        {/* Right capability list */}
        <div className="lg:w-[40vw] space-y-8">
          {capabilities.map((cap, index) => (
            <div
              key={cap.title}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="group p-6 rounded-[22px] card-glass hover:bg-white/[0.06] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#7B8CFF]/10 text-[#7B8CFF]">
                  <cap.icon size={22} />
                </div>
                <div>
                  <h3 className="text-[#F4F6FF] text-lg font-semibold mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-[#A7B0C8] text-sm leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toolkit row */}
      <div
        ref={toolkitRef}
        className="mt-[8vh] pt-[8vh] border-t border-white/5"
      >
        <span className="font-mono text-xs tracking-[0.14em] uppercase text-[#A7B0C8] block mb-6">
          TOOLKIT
        </span>
        <div className="flex flex-wrap gap-4">
          {toolkit.map((tool) => (
            <div
              key={tool.label}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.04] border border-white/10"
            >
              <tool.icon size={18} className="text-[#7B8CFF]" />
              <span className="text-[#F4F6FF] text-sm font-medium">
                {tool.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
