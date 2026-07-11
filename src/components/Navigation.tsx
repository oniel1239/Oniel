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
          ? 'bg-[rgba(3,7,18,0.95)] backdrop-blur-xl border-b border-[rgba(158,255,0,0.1)] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="flex items-center justify-between px-[5vw] max-w-7xl mx-auto">
        <Magnetic>
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            aria-label="Home"
            className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] focus-visible:text-[var(--accent)] transition-colors block"
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative z-[1001] flex items-center justify-center w-11 h-11 border border-[rgba(158,255,0,0.25)] hover:border-[var(--accent)] bg-[rgba(158,255,0,0.05)] hover:bg-[rgba(158,255,0,0.12)] transition-all duration-300 rounded-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="flex flex-col items-center justify-center gap-[5px]">
            <span
              className={`block w-5 h-[2px] bg-[var(--accent)] transition-all duration-300 ease-out ${
                mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-[var(--accent)] transition-all duration-300 ease-out ${
                mobileOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-[var(--accent)] transition-all duration-300 ease-out ${
                mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-[999] transition-all duration-500 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(3,7,18,0.92)',
          backdropFilter: mobileOpen ? 'blur(24px)' : 'blur(0px)',
          WebkitBackdropFilter: mobileOpen ? 'blur(24px)' : 'blur(0px)',
        }}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2 px-[5vw]">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="group relative w-full max-w-xs text-center py-4 overflow-hidden"
              style={{
                transitionDelay: mobileOpen ? `${i * 80}ms` : '0ms',
              }}
            >
              <span
                className={`relative z-10 block font-display text-2xl font-bold tracking-wider uppercase transition-all duration-500 ease-out ${
                  mobileOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${i * 80 + 100}ms` : '0ms',
                  color: 'var(--text-primary)',
                }}
              >
                {item.label}
              </span>

              {/* Hover underline accent */}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[var(--accent)] transition-all duration-500 ease-out ${
                  mobileOpen ? 'w-0 group-hover:w-3/4' : 'w-0'
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${i * 80 + 200}ms` : '0ms',
                }}
              />
            </a>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div
          className={`absolute bottom-12 left-[5vw] right-[5vw] h-[1px] transition-all duration-700 ease-out ${
            mobileOpen ? 'opacity-30' : 'opacity-0'
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
