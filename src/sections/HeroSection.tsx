import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type SwarmButterfly = {
  id: number;
  x: number;
  y: number;
  scatterX: number;
  scatterY: number;
  targetX: number;
  targetY: number;
  scale: number;
  rotate: number;
};

const buildTextTargets = (
  text: string,
  sectionWidth: number,
  sectionHeight: number
): Array<{ x: number; y: number }> => {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.floor(sectionWidth));
  canvas.height = Math.max(1, Math.floor(sectionHeight));
  const ctx = canvas.getContext('2d');

  if (!ctx) return [];

  const compactLength = [...text.replace(/\s/g, '')].length;
  const isShortWord = compactLength <= 6;
  const fontSize = isShortWord
    ? Math.max(72, Math.min(170, Math.floor(sectionWidth * 0.2)))
    : Math.max(42, Math.min(84, Math.floor(sectionWidth * 0.09)));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `700 ${fontSize}px "Open Sans", sans-serif`;
  ctx.fillText(text, canvas.width * 0.5, canvas.height * 0.45);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const points: Array<{ x: number; y: number }> = [];
  const step = isShortWord ? 6 : 8;

  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const alpha = imageData[(y * canvas.width + x) * 4 + 3];
      if (alpha > 120) {
        points.push({
          x: x + gsap.utils.random(-2, 2),
          y: y + gsap.utils.random(-2, 2),
        });
      }
    }
  }

  return points;
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const butterflyButtonRef = useRef<HTMLButtonElement>(null);
  const butterflyRef = useRef<HTMLImageElement>(null);
  const roanRef = useRef<HTMLHeadingElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const introButtonRef = useRef<HTMLAnchorElement>(null);
  const swarmTimeoutRef = useRef<number | null>(null);
  const [swarmButterflies, setSwarmButterflies] = useState<SwarmButterfly[]>([]);
  const [showSwarmOverlay, setShowSwarmOverlay] = useState(false);
  const [showMoreIntro, setShowMoreIntro] = useState(false);

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

  useEffect(() => {
    if (swarmButterflies.length === 0) return;

    swarmButterflies.forEach((butterfly) => {
      const selector = `[data-swarm-id="${butterfly.id}"]`;

      gsap.fromTo(
        selector,
        { opacity: 0, scale: 0.2, x: butterfly.x, y: butterfly.y, rotate: butterfly.rotate },
        {
          opacity: 1,
          scale: butterfly.scale,
          x: butterfly.scatterX,
          y: butterfly.scatterY,
          rotate: butterfly.rotate + 120,
          duration: 1.5,
          ease: 'power2.out',
        }
      );

      gsap.to(selector, {
        x: butterfly.targetX,
        y: butterfly.targetY,
        scale: 0.36,
        opacity: 1,
        duration: 1.15,
        delay: 1.5,
        ease: 'power2.inOut',
      });

      gsap.to(selector, {
        opacity: 0,
        duration: 0.8,
        delay: 3.75,
        ease: 'power2.inOut',
      });
    });

    if (swarmTimeoutRef.current) {
      window.clearTimeout(swarmTimeoutRef.current);
    }

    swarmTimeoutRef.current = window.setTimeout(() => {
      setSwarmButterflies([]);
      setShowSwarmOverlay(false);
    }, 4600);

    return () => {
      if (swarmTimeoutRef.current) {
        window.clearTimeout(swarmTimeoutRef.current);
      }
    };
  }, [swarmButterflies]);

  useEffect(() => {
    const resetThemeMotionState = () => {
      if (!imageRef.current) return;
      gsap.set(imageRef.current, { rotate: 0 });
    };

    const onThemeChange = () => {
      if (!imageRef.current) return;
      resetThemeMotionState();
      gsap.to(imageRef.current, {
        rotate: '+=360',
        duration: 1.05,
        ease: 'power2.inOut',
      });
    };

    window.addEventListener('portfolio-theme-change', onThemeChange as EventListener);
    window.addEventListener('resize', resetThemeMotionState);
    resetThemeMotionState();

    return () => {
      window.removeEventListener('portfolio-theme-change', onThemeChange as EventListener);
      window.removeEventListener('resize', resetThemeMotionState);
    };
  }, []);

  useEffect(() => {
    const ensureHeroVisible = () => {
      const nodes = [
        imageRef.current,
        contentRef.current,
        valuesRef.current,
        introButtonRef.current,
        butterflyButtonRef.current,
      ].filter(Boolean) as HTMLElement[];

      nodes.forEach((node) => {
        const opacity = Number(gsap.getProperty(node, 'opacity'));
        if (Number.isFinite(opacity) && opacity < 0.1) {
          gsap.set(node, { opacity: 1, x: 0, y: 0, scale: 1 });
        }
      });
    };

    const t = window.setTimeout(ensureHeroVisible, 900);
    return () => window.clearTimeout(t);
  }, []);

  const handleButterflyClick = () => {
    if (!butterflyRef.current) return;

    const butterflyRect = butterflyRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const startX = butterflyRect.left + butterflyRect.width * 0.5;
    const startY = butterflyRect.top + butterflyRect.height * 0.5;
    const textPoints = buildTextTargets('ZACC\u2764\uFE0F', viewportWidth, viewportHeight);
    const shuffledPoints = [...textPoints];
    for (let i = shuffledPoints.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPoints[i], shuffledPoints[j]] = [shuffledPoints[j], shuffledPoints[i]];
    }
    const usablePoints = shuffledPoints.slice(0, 320);

    const created = usablePoints.map((point, index) => ({
      id: Date.now() + index,
      x: startX,
      y: startY,
      scatterX: gsap.utils.random(0, viewportWidth),
      scatterY: gsap.utils.random(0, viewportHeight),
      targetX: point.x,
      targetY: point.y,
      scale: gsap.utils.random(0.2, 0.55),
      rotate: gsap.utils.random(-90, 90),
    }));

    setShowSwarmOverlay(true);
    setSwarmButterflies(created);
  };

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

      {/* Floating Butterfly (wide click area) */}
      <button
        ref={butterflyButtonRef}
        type="button"
        onClick={handleButterflyClick}
        className="absolute z-30 top-[7%] right-[4%] w-24 h-24 sm:top-[12%] sm:right-[8%] sm:w-28 sm:h-28 flex items-center justify-center cursor-pointer"
        aria-label="Trigger butterfly swarm"
      >
        <span className="absolute inset-1 rounded-full bg-[#a855f7]/20 blur-md sm:inset-0 sm:bg-transparent sm:blur-none" />
        <img
          ref={butterflyRef}
          src="/butterfly-logo.png"
          alt="Butterfly"
          className="relative w-20 h-20 sm:w-24 sm:h-24 butterfly-glow animate-float opacity-95 sm:opacity-70 brightness-125 saturate-150"
        />
      </button>

      {/* Full-page butterfly swarm effect */}
      <div
        className={`pointer-events-none fixed inset-0 z-[120] overflow-hidden transition-opacity duration-300 ${
          showSwarmOverlay ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/85" />
        {swarmButterflies.map((butterfly) => (
          <img
            key={butterfly.id}
            data-swarm-id={butterfly.id}
            src="/butterfly-logo.png"
            alt=""
            className="absolute w-7 h-7 opacity-0"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-[4vw] py-20">
        <div className="hero-main-layout flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <div
            ref={imageRef}
            className="hero-image-wrap relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0"
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
          <div ref={contentRef} className="hero-main-content flex-1 text-center lg:text-left">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#a855f7] mb-4 block">
              You may call me
            </span>
            
            <h1 ref={roanRef} className="text-5xl lg:text-7xl font-bold text-gradient mb-6 no-text-outline">
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
              {!showMoreIntro ? (
                <button
                  type="button"
                  onClick={() => setShowMoreIntro(true)}
                  className="uiverse-fun-btn inline-flex items-center"
                >
                  <span className="uiverse-fun-btn__label">View More</span>
                </button>
              ) : (
                <p>
                  Over the years, I have mastered the art of creating systems that enhance productivity and efficiency, consistently exploring the latest tools for organization. Balancing flexibility with discipline, my strong organizational and time-management skills enable me to thrive in fast-paced environments.
                </p>
              )}
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
          className="hero-values mt-12 lg:mt-16 flex flex-wrap justify-center gap-4 lg:gap-6"
        >
          <span className="w-full text-center font-mono text-sm tracking-[0.18em] uppercase text-[#a855f7] font-semibold">
            Values
          </span>
          {values.map((value) => (
            <div
              key={value}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20"
            >
              <span className="text-sm text-[#a78bfa]/70">{value}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
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



