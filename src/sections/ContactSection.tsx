import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Send, CheckCircle, User, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const linkedinRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
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

      // Form reveal
      gsap.fromTo(
        formRef.current,
        { x: '4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: isDesktop ? 'top 80%' : 'top 88%',
            end: isDesktop ? 'top 50%' : 'top 68%',
            scrub: isDesktop ? 0.4 : false,
          },
        }
      );

      // LinkedIn reveal
      gsap.fromTo(
        linkedinRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: linkedinRef.current,
            start: isDesktop ? 'top 90%' : 'top 92%',
            end: isDesktop ? 'top 70%' : 'top 74%',
            scrub: isDesktop ? 0.4 : false,
          },
        }
      );

      // Footer reveal
      gsap.fromTo(
        footerRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: isDesktop ? 'top 95%' : 'top 94%',
            end: isDesktop ? 'top 80%' : 'top 78%',
            scrub: isDesktop ? 0.4 : false,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const recipient = 'roghpeduca@gmail.com';
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0d0d14] py-[10vh] px-[6vw]"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.08) 0%, transparent 50%)',
      }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-[8vw] max-w-6xl mx-auto">
        {/* Left headline */}
        <div ref={headlineRef} className="lg:w-[42vw]">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#a855f7] block mb-2">
            Get in Touch
          </span>
          <h2 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient mb-4">
            Let's Connect
          </h2>
          <p className="text-[#a78bfa]/70 text-[clamp(14px,1.1vw,17px)] leading-relaxed mb-8">
            I'm always open to discussing new opportunities, collaborations, or simply having a meaningful conversation about our shared passions.
          </p>

          {/* LinkedIn CTA */}
          <div ref={linkedinRef} className="p-6 rounded-2xl bg-gradient-to-br from-[#a855f7]/20 to-[#7e22ce]/5 border border-[#a855f7]/30">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#a855f7]/20 text-[#c084fc]">
                <Linkedin size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[#f3e8ff] font-semibold mb-1">Connect on LinkedIn</p>
                <p className="text-[#a78bfa]/70 text-sm mb-3">Let's build our professional network</p>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/in/roghpeduca/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full py-3 px-4 bg-[#a855f7] hover:bg-[#9333ea] text-white text-center rounded-xl font-medium transition-colors"
            >
              View LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Right form */}
        <div ref={formRef} className="w-full lg:w-[40vw]">
          <div className="p-5 sm:p-7 rounded-2xl card-glass">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#a855f7]/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-[#a855f7]" />
                </div>
                <h3 className="text-[#f3e8ff] text-xl font-semibold mb-2">
                  Message sent!
                </h3>
                <p className="text-[#a78bfa]/70 text-sm">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#a78bfa]/70 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="h-11 bg-purple-500/5 border-purple-500/20 text-base sm:text-sm text-[#f3e8ff] placeholder:text-[#a78bfa]/40 focus:border-[#a855f7]/50 focus:ring-[#a855f7]/20 rounded-xl"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#a78bfa]/70 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-11 bg-purple-500/5 border-purple-500/20 text-base sm:text-sm text-[#f3e8ff] placeholder:text-[#a78bfa]/40 focus:border-[#a855f7]/50 focus:ring-[#a855f7]/20 rounded-xl"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#a78bfa]/70 mb-2">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={4}
                    className="min-h-28 bg-purple-500/5 border-purple-500/20 text-base sm:text-sm text-[#f3e8ff] placeholder:text-[#a78bfa]/40 focus:border-[#a855f7]/50 focus:ring-[#a855f7]/20 rounded-xl resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="no-text-outline w-full bg-[#a855f7] text-[#0a0a0f] hover:bg-[#c084fc] font-medium rounded-xl py-3 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={16} className="ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="relative mt-[8vh] pt-[8vh] border-t border-purple-500/10 w-full max-w-none mx-auto overflow-hidden"
      >
        {/* Decorative blocks - left */}
        <div className="hidden lg:block absolute left-0 top-8 w-32 h-32 rounded-[2rem] bg-gradient-to-b from-[#a855f7] to-transparent opacity-90" />
        <div className="hidden lg:block absolute left-24 top-2 w-24 h-24 rounded-[1.7rem] bg-gradient-to-b from-[#a855f7] to-transparent opacity-95" />
        <div className="hidden lg:block absolute left-24 top-32 w-24 h-24 rounded-[1.7rem] bg-gradient-to-b from-[#a855f7] to-transparent opacity-90" />

        {/* Decorative blocks - right */}
        <div className="hidden lg:block absolute right-0 top-8 w-32 h-32 rounded-[2rem] bg-gradient-to-b from-[#a855f7] to-transparent opacity-90" />
        <div className="hidden lg:block absolute right-24 top-2 w-24 h-24 rounded-[1.7rem] bg-gradient-to-b from-[#a855f7] to-transparent opacity-95" />
        <div className="hidden lg:block absolute right-24 top-32 w-24 h-24 rounded-[1.7rem] bg-gradient-to-b from-[#a855f7] to-transparent opacity-90" />

        <div className="relative z-10 px-2 lg:px-[13rem] py-2 -translate-y-2 lg:-translate-y-3">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
            <div className="lg:max-w-[56%]">
              <h3 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient leading-[1.1]">
                Efficiency by design.
                <br />
                Clarity by craft.
                <br />
                Results by default.
              </h3>
            </div>

            <div className="portfolio-text-outline space-y-3 text-[clamp(22px,1.6vw,34px)] text-[#a78bfa] lg:min-w-[34%] lg:pt-2">
              <p className="flex items-center gap-4">
                <User size={28} />
                <span>Roan Peduca</span>
              </p>
              <p className="flex items-center gap-4">
                <Mail size={28} />
                <a href="mailto:roghpeduca@gmail.com" className="hover:text-[#c084fc] transition-colors">
                  roghpeduca@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-4">
                <Globe size={28} />
                <a
                  href="https://roanpeduca.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c084fc] transition-colors"
                >
                  roanpeduca.vercel.app
                </a>
              </p>
            </div>
          </div>

          <p className="font-mono text-xs text-[#a78bfa]/50 mt-4 text-center">
            © 2026 Roan. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

