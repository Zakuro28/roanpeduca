import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const butterflyRef = useRef<HTMLImageElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const introButtonRef = useRef<HTMLAnchorElement>(null);

  // Entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Butterfly entrance
      tl.fromTo(
        butterflyRef.current,
        { opacity: 0, scale: 0.5, y: -30 },
        { opacity: 1, scale: 1, y: 0, duration: 1 },
        0
      );

      // Image entrance
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: -50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1 },
        0.2
      );

      // Content entrance
      tl.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1 },
        0.3
      );

      // Values entrance
      tl.fromTo(
        valuesRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.6
      );

      tl.fromTo(
        introButtonRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        0.58
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.5,
            onLeaveBack: () => {
              gsap.set([imageRef.current, contentRef.current, butterflyRef.current, valuesRef.current, introButtonRef.current], {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              });
            },
          },
        });

        // EXIT (70% - 100%)
        scrollTl.fromTo(
          butterflyRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -50, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          imageRef.current,
          { opacity: 1, x: 0, scale: 1 },
          { opacity: 0, x: '-20vw', scale: 0.9, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          contentRef.current,
          { opacity: 1, x: 0 },
          { opacity: 0, x: '20vw', ease: 'power2.in' },
          0.72
        );

        scrollTl.fromTo(
          valuesRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0, y: 30, ease: 'power2.in' },
          0.75
        );

        scrollTl.fromTo(
          introButtonRef.current,
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0, y: 20, scale: 0.92, ease: 'power2.in' },
          0.74
        );
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.set([imageRef.current, contentRef.current, butterflyRef.current, valuesRef.current, introButtonRef.current], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    'Family',
    'Ethical Behavior',
    'Social Responsibility',
    'Management Mindedness',
    'Pursuit of Excellence',
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#0a0a0f] flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(126,34,206,0.05) 0%, transparent 40%)',
      }}
    >
      <div className="absolute -left-20 top-20 w-56 h-56 rounded-full bg-[#9333ea]/20 blur-[90px] animate-pulse-slow pointer-events-none" />
      <div className="absolute -right-12 bottom-24 w-48 h-48 rounded-full bg-[#7e22ce]/20 blur-[80px] animate-float pointer-events-none" />

      {/* Floating Butterfly */}
      <img
        ref={butterflyRef}
        src="/butterfly-logo.png"
        alt="Butterfly"
        className="absolute top-[15%] right-[15%] w-24 h-24 butterfly-glow animate-float opacity-60"
      />

      <div className="container mx-auto px-6 lg:px-[4vw] py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <div
            ref={imageRef}
            className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#a855f7] via-[#7e22ce] to-[#4c1d95] p-1">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0a0a0f]">
                <img
                  src="/roanpic.jpg"
                  alt="Roan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-full bg-[#a855f7]/20 blur-2xl -z-10" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex-1 text-center lg:text-left">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#a855f7] mb-4 block">
              You may call me
            </span>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gradient mb-6 no-text-outline">
              Roan
            </h1>

            <a
              ref={introButtonRef}
              href="https://www.loom.com/share/9e21b74ea41d4bf0ae65ba76083cdab1"
              target="_blank"
              rel="noopener noreferrer"
              className="uiverse-fun-btn mb-6 inline-flex items-center gap-2"
            >
              <span className="uiverse-fun-btn__label">Click Here To Watch My Intro Video</span>
              <Play size={18} className="uiverse-fun-btn__icon" />
            </a>

            <div className="space-y-4 text-[#c4b5fd]/80 text-base lg:text-lg leading-relaxed max-w-2xl">
              <p>
                I am a multifaceted professional with a robust background in <span className="text-[#a855f7] font-medium">administration</span>, <span className="text-[#a855f7] font-medium">executive assistance</span>, and <span className="text-[#a855f7] font-medium">customer service</span>.
              </p>
              <p>
                Over the years, I have mastered the art of creating systems that enhance productivity and efficiency, consistently exploring the latest tools for organization. Balancing flexibility with discipline, my strong organizational and time-management skills enable me to thrive in fast-paced environments.
              </p>
            </div>

            {/* Advocacy */}
            <div className="mt-6 p-4 rounded-xl card-glass">
              <p className="text-sm text-[#a78bfa]">
                A staunch advocate for the <span className="text-[#a855f7] font-semibold">environment</span> and <span className="text-[#a855f7] font-semibold">children's rights</span>
              </p>
              <p className="text-xs text-[#a78bfa]/70 mt-2">
                Previously involved with UPD Pahinungod, YACAP Philippines, and AGHAM Youth
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div
          ref={valuesRef}
          className="mt-12 lg:mt-16 flex flex-wrap justify-center gap-4 lg:gap-6"
        >
          <span className="w-full text-center font-mono text-xs tracking-[0.14em] uppercase text-[#a78bfa]/70">
            Values
          </span>
          {values.map((value) => (
            <div
              key={value}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20"
            >
              <span className="text-sm text-[#c4b5fd]">{value}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-[#a78bfa]/50">
            Scroll to explore
          </span>
          <ChevronDown size={20} className="text-[#a855f7] animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
