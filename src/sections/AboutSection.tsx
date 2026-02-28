import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        },
      });

      // ENTRANCE (0% - 30%)
      // Image card entrance
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', rotateY: 35, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Label entrance
      scrollTl.fromTo(
        labelRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      // Body entrance
      scrollTl.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.12
      );

      // Link entrance
      scrollTl.fromTo(
        linkRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, rotateY: 0, opacity: 1 },
        { x: '-18vw', rotateY: -18, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, bodyRef.current, linkRef.current],
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pinned bg-[#05060B]"
    >
      {/* Left image card */}
      <div
        ref={imageRef}
        className="absolute left-[6vw] top-[18vh] w-[40vw] h-[64vh] rounded-[22px] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.45)] preserve-3d"
      >
        <img
          src="/about-portrait.jpg"
          alt="About portrait"
          className="w-full h-full object-cover"
        />
        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05060B]/40 via-transparent to-transparent" />
      </div>

      {/* Right content */}
      <div className="absolute left-[54vw] top-[18vh] w-[40vw]">
        {/* Label */}
        <span
          ref={labelRef}
          className="font-mono text-xs tracking-[0.14em] uppercase text-[#7B8CFF] block mb-6"
        >
          ABOUT
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[clamp(28px,3vw,42px)] font-semibold text-[#F4F6FF] leading-tight mb-8"
        >
          I build fast, accessible interfaces with obsessive attention to detail.
        </h2>

        {/* Body */}
        <div ref={bodyRef} className="space-y-4 mb-8">
          <p className="text-[#A7B0C8] text-[clamp(14px,1.1vw,17px)] leading-relaxed">
            Over the last 8 years, I've partnered with product teams to turn
            complex ideas into simple, delightful UI.
          </p>
          <p className="text-[#A7B0C8] text-[clamp(14px,1.1vw,17px)] leading-relaxed">
            My stack is modern—React, TypeScript, WebGL—but my focus is
            timeless: clarity, performance, and craft.
          </p>
        </div>

        {/* Link */}
        <button
          ref={linkRef}
          className="group flex items-center gap-2 text-[#F4F6FF] hover:text-[#7B8CFF] transition-colors"
        >
          <span className="text-sm font-medium">
            Read more about my approach
          </span>
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
