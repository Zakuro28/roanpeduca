import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Home, BookOpen, Shield, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const volunteerWork = [
  {
    icon: Home,
    title: 'Gawad Kalinga UPD Build Project',
    year: '2016',
    description: 'Contributed to community building efforts for underprivileged families.',
  },
  {
    icon: BookOpen,
    title: 'UPD NSTP Lecturer',
    subtitle: 'Basic Life Saving and Disaster Risk Reduction and Management',
    year: '2018',
    description: 'Educated students on emergency response and safety protocols.',
  },
  {
    icon: Users,
    title: 'Ugnayan ng Pahinungod Diliman',
    subtitle: 'Tutorials Sessions Program',
    year: '2019',
    description: 'Provided academic support to students from marginalized communities.',
  },
  {
    icon: Shield,
    title: 'Ugnayan ng Pahinungod Diliman',
    subtitle: 'Community-Based Disaster Risk Reduction and Management',
    year: '',
    description: 'Assisted in community preparedness and disaster response initiatives.',
  },
];

const causes = [
  { name: 'Environment & Climate', icon: Heart },
  { name: "Children's Rights", icon: Users },
  { name: 'Education Access', icon: BookOpen },
  { name: 'Community Development', icon: Home },
];

const VolunteerSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const causesRef = useRef<HTMLDivElement>(null);

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
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
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

      // Causes reveal
      gsap.fromTo(
        causesRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: causesRef.current,
            start: isDesktop ? 'top 90%' : 'top 92%',
            end: isDesktop ? 'top 65%' : 'top 74%',
            scrub: isDesktop ? 0.4 : false,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="volunteer"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw]"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.05) 0%, transparent 40%)',
      }}
    >
      {/* Headline */}
      <div ref={headlineRef} className="text-center mb-12">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#a855f7] block mb-2">
          Service
        </span>
        <h2 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient mb-4">
          Volunteer Expertise
        </h2>
        <p className="text-[#a78bfa]/70 text-[clamp(14px,1.1vw,17px)] max-w-2xl mx-auto leading-relaxed">
          Giving back to the community through meaningful volunteer work and advocacy.
        </p>
      </div>

      {/* Volunteer Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {volunteerWork.map((work, index) => (
          <div
            key={work.title}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group p-6 rounded-2xl card-glass hover:bg-purple-500/10 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-[#a855f7] group-hover:bg-[#a855f7] group-hover:text-[#0a0a0f] transition-colors">
                <work.icon size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[#f3e8ff] font-semibold">{work.title}</h3>
                  {work.year && (
                    <span className="text-[#a855f7] font-mono text-xs">{work.year}</span>
                  )}
                </div>
                {work.subtitle && (
                  <p className="text-[#a855f7] text-sm mb-2">{work.subtitle}</p>
                )}
                <p className="text-[#a78bfa]/70 text-sm leading-relaxed">
                  {work.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Causes */}
      <div ref={causesRef} className="max-w-3xl mx-auto">
        <p className="text-center text-[#a78bfa]/70 text-sm mb-6">
          Causes I am passionate about
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {causes.map((cause) => (
            <div
              key={cause.name}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
            >
              <cause.icon size={14} className="text-[#a855f7]" />
              <span className="text-sm text-[#c4b5fd]">{cause.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <blockquote className="text-[#c4b5fd]/80 italic text-lg leading-relaxed">
          "Determined, disciplined, and deeply compassionate, I continue to strive for excellence in every aspect of my life, driven by a commitment to my values and goals."
        </blockquote>
      </div>
    </section>
  );
};

export default VolunteerSection;
