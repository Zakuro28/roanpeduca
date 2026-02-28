import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowUpRight, FileText, Palette, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const portfolios = [
  {
    id: 1,
    title: 'Writing Portfolio',
    description: 'A collection of technical writing samples, documentation, and creative content showcasing my writing expertise.',
    category: 'Writing',
    icon: FileText,
    link: 'https://drive.google.com/file/d/1y4gLU506j_aple6dr_o19SwkdIrvoba1/view',
    image: '/writing.jpg',
  },
  {
    id: 2,
    title: 'Design Portfolio',
    description: 'Visual design projects, creative works, and design thinking showcased through various mediums and platforms.',
    category: 'Design',
    icon: Palette,
    link: 'https://drive.google.com/file/d/126d-zKaaHHZ67iuMUN6pCmjls8KLM3BH/view',
    image: '/design.jpg',
  },
  {
    id: 3,
    title: 'Teaching Portfolio',
    description: 'Educational materials, teaching methodologies, and instructional design demonstrating my passion for education.',
    category: 'Teaching',
    icon: GraduationCap,
    link: 'https://drive.google.com/file/d/1MKKAOzybiS4OZ81WloKHsk12KkwsNZ7h/view',
    image: '/teaching.jpg',
  },
];

const WorkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.45,
          },
        });

        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.02
        );

        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          tl.fromTo(
            card,
            { opacity: 0, y: 60, rotateX: index === 1 ? -20 : -12 },
            { opacity: 1, y: 0, rotateX: 0, ease: 'power2.out' },
            0.08 + index * 0.05
          );
        });

        tl.to(headerRef.current, { opacity: 0, y: -20, ease: 'power2.in' }, 0.72);
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          tl.to(card, { opacity: 0, y: 30, scale: 0.95, ease: 'power2.in' }, 0.74 + index * 0.02);
        });
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.set([headerRef.current, ...cardsRef.current], {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw] overflow-visible lg:py-0 lg:px-0 lg:section-pinned lg:overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.06) 0%, transparent 40%)',
      }}
    >
      {/* Header */}
      <div ref={headerRef} className="mb-8 lg:mb-0 lg:absolute lg:left-[6vw] lg:top-[10vh]">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#a855f7] block mb-2">
          My Work
        </span>
        <h2 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient mb-2">
          Portfolio
        </h2>
        <p className="text-[#a78bfa]/70 text-[clamp(14px,1.1vw,17px)] max-w-xl lg:w-[min(50vw,600px)] leading-relaxed">
          Explore my work across writing, design, and teaching disciplines.
        </p>
      </div>

      {/* Portfolio Cards */}
      <div className="relative lg:absolute lg:top-[26vh] lg:left-0 lg:right-0 flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 lg:px-[6vw]">
        {portfolios.map((portfolio, index) => (
          <a
            key={portfolio.id}
            href={portfolio.link}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group relative w-full lg:w-[28vw] h-[300px] sm:h-[340px] lg:h-[42vh] rounded-2xl overflow-hidden shadow-2xl cursor-pointer preserve-3d transition-all duration-500 hover:-translate-y-3 hover:shadow-purple-500/20 card-glass"
          >
            {/* Background image */}
            <img
              src={portfolio.image}
              alt={portfolio.title}
              className="absolute inset-0 w-full h-full object-cover opacity-70 transition-all duration-500"
            />

            {/* Glow border on hover */}
            <div className="absolute inset-0 rounded-2xl border border-purple-500/20 group-hover:border-purple-500/50 transition-colors duration-500" />

            {/* Icon background */}
            <div className="absolute top-6 left-6 p-4 rounded-2xl bg-purple-500/10 text-[#a855f7] group-hover:bg-[#a855f7] group-hover:text-[#0a0a0f] transition-colors duration-300">
              <portfolio.icon size={32} />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="font-mono text-xs tracking-[0.14em] uppercase text-white/90 mb-2 block">
                {portfolio.category}
              </span>
              <h3 className="text-white text-xl font-bold mb-2">
                {portfolio.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-2">
                {portfolio.description}
              </p>
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <span>View Portfolio</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>

            {/* External link icon */}
            <div className="absolute top-6 right-6 p-2 rounded-full bg-purple-500/10 text-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={18} />
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent opacity-80 transition-opacity duration-500" />
          </a>
        ))}
      </div>

    </section>
  );
};

export default WorkSection;
