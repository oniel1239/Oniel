import { useEffect, useState } from 'react';
import Magnetic from './Magnetic';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(3,7,18,0.95)] backdrop-blur-xl border-b border-[rgba(158,255,0,0.1)] py-3 md:py-4'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-[5vw] max-w-7xl mx-auto">
        <Magnetic>
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            aria-label="Home"
            className="font-display text-xl md:text-2xl font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] focus-visible:text-[var(--accent)] transition-colors block"
          >
            ONIEL<span className="text-[var(--accent)]">.</span>
          </a>
        </Magnetic>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Magnetic>
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="font-body text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] focus-visible:text-[var(--accent)] transition-colors relative group py-2 block"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger - more visible */}
        <button
          className="md:hidden relative z-[1001] flex items-center justify-center w-10 h-10 border border-[rgba(158,255,0,0.4)] hover:border-[var(--accent)] bg-[rgba(158,255,0,0.1)] hover:bg-[rgba(158,255,0,0.2)] active:bg-[rgba(158,255,0,0.3)] transition-all duration-200 rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="flex flex-col items-center justify-center gap-[4px]">
            <span
              className={`block w-[18px] h-[2px] bg-[var(--accent)] rounded-full transition-all duration-300 ease-out ${
                mobileOpen ? 'rotate-45 translate-y-[6px]' : ''
              }`}
            />
            <span
              className={`block w-[18px] h-[2px] bg-[var(--accent)] rounded-full transition-all duration-300 ease-out ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-[18px] h-[2px] bg-[var(--accent)] rounded-full transition-all duration-300 ease-out ${
                mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-[999] transition-all duration-400 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(3,7,18,0.95)',
          backdropFilter: mobileOpen ? 'blur(20px)' : 'blur(0px)',
          WebkitBackdropFilter: mobileOpen ? 'blur(20px)' : 'blur(0px)',
        }}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      >
        <div className="flex flex-col items-center justify-center h-full px-6 py-24 overflow-y-auto">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="w-full max-w-[240px] text-center py-3 md:py-4 relative group"
              style={{
                transitionDelay: mobileOpen ? `${i * 80}ms` : '0ms',
              }}
            >
              <span
                className={`relative z-10 block font-display text-xl sm:text-2xl font-bold tracking-wider uppercase transition-all duration-500 ease-out ${
                  mobileOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${i * 80 + 100}ms` : '0ms',
                  color: 'var(--text-primary)',
                }}
              >
                {item.label}
              </span>

              {/* Hover underline */}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[var(--accent)] transition-all duration-500 ease-out ${
                  mobileOpen ? 'w-0 group-hover:w-full' : 'w-0'
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${i * 80 + 200}ms` : '0ms',
                }}
              />
            </a>
          ))}
        </div>

        {/* Bottom accent line */}
        <div
          className={`absolute bottom-8 left-[10vw] right-[10vw] h-[1px] transition-all duration-700 ease-out ${
            mobileOpen ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            transitionDelay: mobileOpen ? '500ms' : '0ms',
          }}
        />
      </div>
    </nav>
  );
}
