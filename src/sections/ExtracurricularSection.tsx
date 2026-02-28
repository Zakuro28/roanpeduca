import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Leaf, Megaphone, FlaskConical, PenTool, 
  Users, Music, Flag
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const activities = [
  {
    category: 'Environmental & Advocacy',
    icon: Leaf,
    items: [
      { org: 'Youth Advocates for Climate Action Philippines', role: 'Creatives Committee Member', year: '2020' },
    ],
  },
  {
    category: 'Community Service',
    icon: Megaphone,
    items: [
      { org: 'Tulong Kabataan', role: 'Public & Media Relations Co-head', year: '2020' },
    ],
  },
  {
    category: 'Science & Education',
    icon: FlaskConical,
    items: [
      { org: 'Agham Youth UP Diliman', role: 'Webiskwela Programs Committee Head', year: '' },
      { org: 'Agham Youth UP Diliman', role: 'Integrations and Outreach Committee Deputy Officer', year: '2020' },
    ],
  },
  {
    category: 'Media & Publications',
    icon: PenTool,
    items: [
      { org: 'UP ICTUS', role: "Fish 'n Quips Editor-In-Chief", year: '2020' },
      { org: 'UP ICTUS', role: 'Electoral Board', year: '2020' },
      { org: 'UP ICTUS', role: 'Finance Committee Head', year: '2017' },
      { org: 'The Zamboangueñian', role: 'Sports Writer', year: '2014' },
      { org: 'The Zamboangueñian', role: 'Editor-in-Chief', year: '2015' },
    ],
  },
  {
    category: 'Academic Organizations',
    icon: Users,
    items: [
      { org: 'UP Mathematics Club', role: 'Ways and Means Committee Secretary', year: '2018' },
      { org: 'UP Dormitory', role: 'Financial Literacy Talk Head', year: '2016' },
    ],
  },
  {
    category: 'Military Training (ROTC)',
    icon: Flag,
    items: [
      { org: 'UP Diliman Reserve Officers\' Training Corps', role: 'Head for the Office of Administrative and Personnel', year: '2016-2018' },
      { org: 'UP Diliman ROTC', role: 'Cadet Officer Candidate Course 68-B Tactical Officer', year: '' },
      { org: 'UP Diliman ROTC', role: 'Barracks Commander', year: '' },
      { org: 'UP Diliman ROTC', role: 'Head for the Office of Logistics and Finance', year: '' },
      { org: 'UP Diliman ROTC', role: 'Deputy for the Office of Operations and Training', year: '' },
      { org: 'UP Diliman ROTC', role: 'Bravo Company Executive Officer', year: '' },
      { org: 'DASH 2018 Run with Heroes', role: 'Logistics and Finance Head', year: '2018' },
      { org: 'UP Corps of Cadets', role: 'ACLE COIC', year: '' },
      { org: 'UP COC', role: 'Movie Block Screening Marketing Head', year: '' },
    ],
  },
  {
    category: 'Arts & Performance',
    icon: Music,
    items: [
      { org: '2019 Mandopop Band Festival 2nd Season', role: 'Participant (Vocalist)', year: '2019' },
      { org: "2018 Lilian's Cup Latin American Discipline", role: '2nd place', year: '2018' },
      { org: 'UP Dancesport Society', role: 'Member', year: '2017 - 2023' },
      { org: 'UP Singing Ambassadors', role: 'Trainee', year: '2015' },
      { org: 'The Patrons of Daniw Study Center A Night of Music VI', role: 'Participant (Soprano II)', year: '2015' },
    ],
  },
];

const ExtracurricularSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="activities"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw]"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.04) 0%, transparent 50%)',
      }}
    >
      {/* Headline */}
      <div ref={headlineRef} className="text-center mb-12">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#a855f7] block mb-2">
          Involvement
        </span>
        <h2 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient mb-4">
          Extracurricular Activities
        </h2>
        <p className="text-[#a78bfa]/70 text-[clamp(14px,1.1vw,17px)] max-w-2xl mx-auto leading-relaxed">
          Leadership roles and active participation in various organizations throughout my academic journey.
        </p>
      </div>

      {/* Activities Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((category, catIndex) => (
          <div
            key={category.category}
            ref={(el) => { cardsRef.current[catIndex] = el; }}
            className={`group p-6 rounded-2xl card-glass hover:bg-purple-500/10 transition-all duration-300 ${
              catIndex === activities.length - 1 ? 'lg:col-start-2' : ''
            }`}
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-purple-500/20">
              <div className="p-2 rounded-lg bg-purple-500/10 text-[#a855f7]">
                <category.icon size={20} />
              </div>
              <h3 className="text-[#f3e8ff] font-semibold text-sm">{category.category}</h3>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="text-sm">
                  <p className="text-[#c4b5fd] font-medium">{item.org}</p>
                  <p className="text-[#a78bfa]/70 text-xs">
                    {item.role}
                    {item.year && <span className="text-[#a855f7]"> • {item.year}</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExtracurricularSection;
