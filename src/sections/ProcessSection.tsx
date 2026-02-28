import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Layout, Code, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Understand',
    description: 'Goals, users, constraints.',
  },
  {
    number: '02',
    icon: Layout,
    title: 'Prototype',
    description: 'UI structure + motion direction.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Engineer',
    description: 'Clean, scalable implementation.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Ship & Iterate',
    description: 'Measure, refine, improve.',
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      // Steps entrance
      stepsRef.current.forEach((step, index) => {
        if (step) {
          scrollTl.fromTo(
            step,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.out' },
            0.1 + index * 0.03
          );
        }
      });

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, rotateY: 0, opacity: 1 },
        { x: '-18vw', rotateY: -18, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, headlineRef.current],
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      );

      stepsRef.current.forEach((step, index) => {
        if (step) {
          scrollTl.fromTo(
            step,
            { x: 0, opacity: 1 },
            { x: '10vw', opacity: 0, ease: 'power2.in' },
            0.72 + index * 0.02
          );
        }
      });
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
          src="/process-city.jpg"
          alt="Process"
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
          PROCESS
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[clamp(28px,3vw,42px)] font-semibold text-[#F4F6FF] leading-tight mb-10"
        >
          Discovery, build, polish—repeat.
        </h2>

        {/* Steps */}
        <div className="space-y-5">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[index] = el; }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#7B8CFF]/10 text-[#7B8CFF]">
                <step.icon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#7B8CFF]">
                    {step.number}
                  </span>
                  <h3 className="text-[#F4F6FF] font-semibold">{step.title}</h3>
                </div>
                <p className="text-[#A7B0C8] text-sm ml-10">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
