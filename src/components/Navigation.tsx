import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const light = savedTheme ? savedTheme === 'light' : systemPrefersLight;
    setIsLightMode(light);
    document.documentElement.classList.toggle('light', light);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    const next = !isLightMode;
    setIsLightMode(next);
    document.documentElement.classList.toggle('light', next);
    localStorage.setItem('theme', next ? 'light' : 'dark');
    window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: { isLight: next } }));
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Work', id: 'work' },
    { label: 'Expertise', id: 'skills' },
    { label: 'Involvement', id: 'activities' },
    { label: 'Recognition', id: 'achievements' },
    { label: 'Service', id: 'volunteer' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? isLightMode
              ? 'bg-[#ede8d0]/90 backdrop-blur-xl border-b border-purple-500/15'
              : 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-purple-500/10'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-[4vw] py-4 lg:py-5">
          {/* Logo with Butterfly */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <img 
              src="/butterfly-logo.png" 
              alt="Roan Logo" 
              className="w-8 h-8 butterfly-glow transition-transform group-hover:scale-110"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="uiverse-nav-btn font-mono text-sm tracking-[0.14em] uppercase text-[#a78bfa]/70 hover:text-[#a855f7]"
                style={{ ['--nav-i' as string]: index }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`theme-toggle-icons ${isLightMode ? 'is-light' : ''}`}
              role="switch"
              aria-checked={isLightMode}
              aria-label={isLightMode ? 'Enable dark mode' : 'Enable light mode'}
              title={isLightMode ? 'Enable dark mode' : 'Enable light mode'}
            >
              <Sun size={15} className="theme-toggle-icons__icon theme-toggle-icons__sun" />
              <Moon size={15} className="theme-toggle-icons__icon theme-toggle-icons__moon" />
              <span className="theme-toggle-icons__thumb" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 ${isLightMode ? 'text-slate-800' : 'text-[#f3e8ff]'}`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isLightMode ? 'bg-white/95' : 'bg-[#0a0a0f]/98'
        } ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`uiverse-nav-btn uiverse-nav-btn--mobile font-mono text-xl tracking-[0.14em] uppercase hover:text-[#a855f7] ${
                isLightMode ? 'text-slate-800' : 'text-[#f3e8ff]'
              }`}
              style={{ ['--nav-i' as string]: index }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
