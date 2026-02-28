import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, Award, Trophy, Medal, 
  Star, Crown, ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: GraduationCap,
    title: 'University of the Philippines (UP) Diliman',
    subtitle: 'Graduate of BS Family Life and Child Development',
    highlight: true,
  },
  {
    icon: Star,
    title: 'UP Diliman University Scholar',
    subtitle: '1st Sem AY 2021-2022',
  },
  {
    icon: Star,
    title: 'UP Diliman College Scholar',
    subtitle: '2nd Sem AY 2015-2016, 1st Sem AY 2018-2019',
  },
  {
    icon: Trophy,
    title: 'RAATI First Aid Competition',
    subtitle: 'Trainer of the Champion Team 2018',
  },
  {
    icon: Medal,
    title: 'UP Diliman PE Chess Tournament',
    subtitle: 'Champion 2016',
  },
  {
    icon: Award,
    title: 'National Schools Press Conference',
    subtitle: 'Sports Writing (7th Place) 2015',
  },
  {
    icon: Crown,
    title: 'Kabayan Ten Outstanding Public School Students (TOPS)',
    subtitle: 'For Exemplary Leadership - Mindanao Finalist',
  },
  {
    icon: Star,
    title: 'Gerry Roxas Leadership Awardee',
    subtitle: '',
  },
  {
    icon: Award,
    title: 'Outstanding Kapisanan ng mga Mag-aaral sa Filipino Officer',
    subtitle: '',
  },
];

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Items reveal with stagger
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { x: index % 2 === 0 ? -30 : 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
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
      id="achievements"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw]"
      style={{
        background: 'radial-gradient(ellipse at 80% 50%, rgba(168,85,247,0.06) 0%, transparent 40%)',
      }}
    >
      {/* Headline */}
      <div ref={headlineRef} className="text-center mb-12">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#a855f7] block mb-2">
          Recognition
        </span>
        <h2 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient mb-4">
          Major Achievements
        </h2>
        <p className="text-[#a78bfa]/70 text-[clamp(14px,1.1vw,17px)] max-w-xl mx-auto leading-relaxed">
          Academic excellence, leadership recognition, and competitive accomplishments.
        </p>
      </div>

      {/* Achievements Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.title}
              ref={(el) => { itemsRef.current[index] = el; }}
              className={`group p-5 rounded-2xl transition-all duration-300 ${
                achievement.highlight
                  ? 'bg-gradient-to-br from-purple-500/20 to-purple-900/20 border border-purple-500/30'
                  : 'card-glass hover:bg-purple-500/10'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  achievement.highlight
                    ? 'bg-[#a855f7] text-[#0a0a0f]'
                    : 'bg-purple-500/10 text-[#a855f7]'
                }`}>
                  <achievement.icon size={22} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${
                    achievement.highlight ? 'text-gradient text-lg' : 'text-[#f3e8ff]'
                  }`}>
                    {achievement.title}
                  </h3>
                  {achievement.subtitle && (
                    <p className="text-[#a78bfa]/70 text-sm">{achievement.subtitle}</p>
                  )}
                </div>
                {achievement.highlight && (
                  <ChevronRight size={18} className="text-[#a855f7] opacity-50" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-[#a855f7]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-[#7e22ce]/5 rounded-full blur-3xl" />
    </section>
  );
};

export default AchievementsSection;
