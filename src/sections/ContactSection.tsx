import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Send, CheckCircle } from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
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
          <div ref={linkedinRef} className="p-6 rounded-2xl bg-gradient-to-br from-[#0a66c2]/20 to-[#0a66c2]/5 border border-[#0a66c2]/30">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#0a66c2]/20 text-[#0a66c2]">
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
              className="mt-4 block w-full py-3 px-4 bg-[#0a66c2] hover:bg-[#0855a3] text-white text-center rounded-xl font-medium transition-colors"
            >
              View LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Right form */}
        <div ref={formRef} className="lg:w-[40vw]">
          <div className="p-7 rounded-2xl card-glass">
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-xs tracking-[0.14em] uppercase text-[#a78bfa]/70 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-purple-500/5 border-purple-500/20 text-[#f3e8ff] placeholder:text-[#a78bfa]/40 focus:border-[#a855f7]/50 focus:ring-[#a855f7]/20 rounded-xl"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs tracking-[0.14em] uppercase text-[#a78bfa]/70 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-purple-500/5 border-purple-500/20 text-[#f3e8ff] placeholder:text-[#a78bfa]/40 focus:border-[#a855f7]/50 focus:ring-[#a855f7]/20 rounded-xl"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs tracking-[0.14em] uppercase text-[#a78bfa]/70 mb-2">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={4}
                    className="bg-purple-500/5 border-purple-500/20 text-[#f3e8ff] placeholder:text-[#a78bfa]/40 focus:border-[#a855f7]/50 focus:ring-[#a855f7]/20 rounded-xl resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#a855f7] text-[#0a0a0f] hover:bg-[#c084fc] font-medium rounded-xl py-3 transition-colors disabled:opacity-50"
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
        className="mt-[8vh] pt-[8vh] border-t border-purple-500/10 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-3">
          <img 
            src="/butterfly-logo.png" 
            alt="Roan" 
            className="w-6 h-6 butterfly-glow opacity-60"
          />
          <p className="font-mono text-xs text-[#a78bfa]/50">
            © 2024 Roan. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/roghpeduca/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#a78bfa]/50 hover:text-[#a855f7] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:roghpeduca@gmail.com"
            className="font-mono text-xs text-[#a78bfa]/50 hover:text-[#a855f7] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
