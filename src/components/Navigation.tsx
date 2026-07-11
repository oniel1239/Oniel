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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
    <>
      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-[rgba(3,7,18,0.92)] backdrop-blur-xl border-b border-[rgba(158,255,0,0.08)] py-3 md:py-4'
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-[5vw] max-w-7xl mx-auto">
          <Magnetic>
            <a
              href="#home"
              onClick={(e) => handleClick(e, '#home')}
              aria-label="Home"
              className="font-display text-xl md:text-2xl font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors block"
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
                    className="font-body text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors relative group py-2 block"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-[1001] flex items-center justify-center w-11 h-11 border border-[rgba(158,255,0,0.5)] hover:border-[var(--accent)] bg-[rgba(158,255,0,0.12)] hover:bg-[rgba(158,255,0,0.2)] active:bg-[rgba(158,255,0,0.3)] transition-all duration-200 rounded-[4px]"
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
                  mobileOpen ? 'opacity-0 scale-x-0' : ''
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
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[999] transition-all duration-500 ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-all duration-500 ${
            mobileOpen ? 'opacity-60' : 'opacity-0'
          }`}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] max-w-[85vw] transition-all duration-400 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'rgba(3,7,18,0.97)',
            borderLeft: '1px solid rgba(158,255,0,0.1)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[rgba(158,255,0,0.06)]">
            <span className="font-display text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
              Navigation
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center w-8 h-8 border border-[rgba(158,255,0,0.2)] hover:border-[var(--accent)] bg-[rgba(158,255,0,0.05)] transition-all duration-200 rounded-[4px]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[var(--accent)]">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Navigation items */}
          <div className="flex flex-col flex-1 px-6 pt-4 pb-8 overflow-y-auto">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="group relative py-4 border-b border-[rgba(158,255,0,0.04)] last:border-b-0 transition-all duration-300"
              >
                <span
                  className={`block font-display text-lg font-bold tracking-wider uppercase transition-all duration-500 ease-out ${
                    mobileOpen
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-6 opacity-0'
                  }`}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : '0ms',
                    color: 'var(--text-primary)',
                  }}
                >
                  {item.label}
                </span>
                <span
                  className={`block text-[11px] font-mono tracking-wider uppercase transition-all duration-500 ease-out mt-1 ${
                    mobileOpen
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 60 + 150}ms` : '0ms',
                    color: 'var(--text-secondary)',
                    opacity: mobileOpen ? 0.4 : 0,
                  }}
                >
                  {['00', '01', '02', '03', '04'][i]}
                </span>
                {/* Hover accent */}
                <span
                  className={`absolute left-0 top-0 w-[2px] h-full bg-[var(--accent)] transition-all duration-300 ${
                    mobileOpen ? 'scale-y-0 group-hover:scale-y-100 origin-bottom' : 'scale-y-0'
                  }`}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 60 + 200}ms` : '0ms',
                  }}
                />
              </a>
            ))}

            {/* Bottom info */}
            <div className="mt-auto pt-8">
              <div
                className={`transition-all duration-500 ease-out ${
                  mobileOpen ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: mobileOpen ? '500ms' : '0ms' }}
              >
                <div className="w-full h-[1px] bg-gradient-to-r from-[rgba(158,255,0,0.3)] to-transparent mb-4" />
                <p className="text-[10px] font-mono tracking-wider text-[rgba(255,255,255,0.2)] uppercase">
                  Let&apos;s build something<br />extraordinary
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
