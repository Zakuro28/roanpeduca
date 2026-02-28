import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const attributionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

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
      // Image entrance
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

      // Quote entrance
      scrollTl.fromTo(
        quoteRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      // Attribution entrance
      scrollTl.fromTo(
        attributionRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.12
      );

      // CTA entrance
      scrollTl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.15
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
        [labelRef.current, quoteRef.current, attributionRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-[#05060B]">
      {/* Left image card */}
      <div
        ref={imageRef}
        className="absolute left-[6vw] top-[18vh] w-[44vw] h-[64vh] rounded-[22px] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.45)] preserve-3d"
      >
        <img
          src="/testimonial-portrait.jpg"
          alt="Testimonial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05060B]/40 via-transparent to-transparent" />
      </div>

      {/* Right content */}
      <div className="absolute left-[54vw] top-[18vh] w-[40vw]">
        {/* Label */}
        <span
          ref={labelRef}
          className="font-mono text-xs tracking-[0.14em] uppercase text-[#7B8CFF] block mb-6"
        >
          TESTIMONIALS
        </span>

        {/* Quote icon */}
        <div className="mb-6">
          <Quote size={32} className="text-[#7B8CFF]/50" />
        </div>

        {/* Quote */}
        <blockquote
          ref={quoteRef}
          className="text-[clamp(20px,2vw,28px)] font-medium text-[#F4F6FF] leading-snug mb-10"
        >
          "Alex turned our product vision into a UI that feels effortless. The
          performance gains were immediate."
        </blockquote>

        {/* Attribution */}
        <div ref={attributionRef} className="mb-8">
          <p className="text-[#F4F6FF] font-semibold">Jordan Lee</p>
          <p className="text-[#A7B0C8] text-sm">
            Product Lead, Orbit
          </p>
        </div>

        {/* CTA */}
        <button
          ref={ctaRef}
          className="group flex items-center gap-2 text-[#F4F6FF] hover:text-[#7B8CFF] transition-colors"
        >
          <span className="text-sm font-medium">Request references</span>
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
