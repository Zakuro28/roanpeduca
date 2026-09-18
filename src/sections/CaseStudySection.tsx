import { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Map, LayoutDashboard, ChevronDown, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: 1,
    category: 'Systems & Operations',
    title: 'Building an Operations System from Scratch',
    icon: Layers,
    problem:
      "An organization's documentation, SOPs, and daily operations were scattered across tools with no central home — new hires and even leadership had no single place to find \"how we do things here.\"",
    built:
      'A complete Notion operating system from the ground up: navigation architecture, a "Start Here" onboarding page, documented SOPs across departments, and a recurring daily briefing template for leadership to track priorities at a glance.',
    outcome:
      "What used to live in scattered docs, chat threads, and someone's memory now lives in one navigable system — searchable, onboarding-ready, and built to outlast any single person's institutional knowledge.",
  },
  {
    id: 2,
    category: 'Program Management',
    title: 'Mapping Tasks Into a Working Roadmap',
    icon: Map,
    problem:
      'A multi-workstream program with a hard pilot deadline had no shared picture of scope. Six different project areas were moving independently, with no single view of dependencies, hours, or ownership.',
    built:
      'A full project mapping session covering six parent project areas and roughly 85 individual tasks, followed by a formal work plan document breaking the highest-priority workstreams (a website audit and a program demo-page integration) into scoped, estimated units of work — roughly 40–50 hours of scope made visible and sequenced.',
    outcome:
      'Leadership went from "we know this is complicated" to a shared, task-level roadmap with clear ownership and a realistic timeline — including flagging the most complex workstream early enough to protect the pilot date.',
  },
  {
    id: 3,
    category: 'Product Design',
    title: 'Designing a CRM Dashboard Mockup',
    icon: LayoutDashboard,
    problem:
      'A colleague needed to visualize a sales pipeline the way a dedicated CRM (VinSolutions) would — but without access to that tool.',
    built:
      "A dashboard mockup that replicated VinSolutions' pipeline logic — stages, lead status, and flow — using tools already available to the team.",
    outcome:
      'Gave a non-technical stakeholder an immediately usable visual model of their own pipeline, without waiting on procurement or a new tool rollout.',
  },
];

const caseStudySamples = [
  {
    id: 4,
    category: 'Project Management',
    title: 'Project Management Case Study',
    image: '/case-study-project-management.png',
    link: 'https://dour-tarsal-e68.notion.site/Project-Management-Case-Study-1da58abefc75836f97250195cb80a435',
  },
  {
    id: 5,
    category: 'Executive Assistance',
    title: 'Executive Assistant Case Study',
    image: '/case-study-executive-assistant.png',
    link: 'https://dour-tarsal-e68.notion.site/EA-Case-Study-Sample-68858abefc758264ab49813464d9a2c5',
  },
];

const CaseStudySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sampleCardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
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

      // Cards reveal
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: isDesktop ? 0 : index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: isDesktop ? 'top 90%' : 'top 92%',
                end: isDesktop ? 'top 65%' : 'top 74%',
                scrub: isDesktop ? 0.4 : false,
              },
            }
          );
        }
      });
      // Sample cards reveal
      sampleCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: isDesktop ? 0 : index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: isDesktop ? 'top 90%' : 'top 92%',
                end: isDesktop ? 'top 65%' : 'top 74%',
                scrub: isDesktop ? 0.4 : false,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw] overflow-visible"
      style={{
        background: 'radial-gradient(ellipse at 70% 30%, rgba(168,85,247,0.06) 0%, transparent 40%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headlineRef} className="mb-10 text-center">
          <span className="font-mono text-base tracking-[0.2em] uppercase text-[#a855f7] block mb-3">
            Approach
          </span>
          <h2 className="text-[clamp(44px,4.4vw,66px)] font-bold text-gradient mb-3">
            Case Studies
          </h2>
          <p className="text-[#a78bfa]/70 text-[clamp(17px,1.35vw,21px)] max-w-2xl mx-auto leading-relaxed">
            A closer look at how I diagnose, structure, and solve operational problems.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {caseStudies.map((study, index) => {
            const isOpen = openIds.has(study.id);
            return (
              <div
                key={study.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group flex-1 w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-purple-500/20 card-glass border border-purple-500/20"
              >
                <button
                  type="button"
                  onClick={() => toggleCard(study.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 flex flex-col cursor-pointer"
                >
                  {/* Icon */}
                  <div className="w-fit p-3 rounded-full bg-purple-500/10 text-[#a855f7] group-hover:bg-[#a855f7] group-hover:text-[#0a0a0f] transition-colors duration-300 mb-5">
                    <study.icon size={22} />
                  </div>

                  {/* Category + Title */}
                  <span className="font-mono text-xs tracking-[0.14em] uppercase text-[#d8b4fe] mb-2 block">
                    {study.category}
                  </span>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[#c084fc] text-xl font-bold leading-snug">
                      {study.title}
                    </h3>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 mt-1 text-[#a855f7] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {!isOpen && (
                    <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#a855f7]/70 mt-4">
                      Read case study
                    </span>
                  )}
                </button>

                {/* Problem / Built / Outcome */}
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-4 px-6 pb-6">
                      <div>
                        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#d8b4fe]/80 block mb-1">
                          The Problem
                        </span>
                        <p className="text-[#e9d5ff] text-sm leading-relaxed">{study.problem}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#d8b4fe]/80 block mb-1">
                          What I Built
                        </span>
                        <p className="text-[#e9d5ff] text-sm leading-relaxed">{study.built}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#d8b4fe]/80 block mb-1">
                          The Outcome
                        </span>
                        <p className="text-[#e9d5ff] text-sm leading-relaxed">{study.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Case Study Samples */}
        <div className="relative flex flex-col lg:flex-row justify-center items-stretch gap-6 lg:gap-8 mt-8">
          {caseStudySamples.map((sample, index) => (
            <a
              key={sample.id}
              href={sample.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { sampleCardsRef.current[index] = el; }}
              className="group flex-1 w-full lg:max-w-[28vw] rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-purple-500/20 card-glass border border-purple-500/20"
            >
              {/* Image on top */}
              <div className="relative h-[220px] sm:h-[260px] lg:h-[230px] overflow-hidden">
                <img
                  src={sample.image}
                  alt={sample.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
              </div>

              {/* Content below image */}
              <div className="p-5">
                <span className="font-mono text-xs tracking-[0.14em] uppercase text-[#d8b4fe] mb-2 block">
                  {sample.category}
                </span>
                <h3 className="text-[#c084fc] text-xl font-bold mb-3">
                  {sample.title}
                </h3>
                <div className="flex items-center gap-2 text-[#d8b4fe] text-sm font-medium">
                  <span>View Case Study</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
