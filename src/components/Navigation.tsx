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
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    // Blur the clicked element to remove the green focus-visible outline
    e.currentTarget.blur();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ─── Desktop: Transparent top bar (hides on scroll) ─── */}
      <nav
        aria-label="Main Navigation"
        className="hidden md:block fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ease-out nav-smooth"
        style={{
          background: 'transparent',
          opacity: scrolled ? 0 : 1,
          pointerEvents: scrolled ? 'none' : 'auto',
        }}
      >
        <div className="flex items-center justify-between px-6 lg:px-[5vw] max-w-[1400px] mx-auto h-[72px]">
          <Magnetic>
            <a href="#home" onClick={(e) => handleClick(e, '#home')} aria-label="Home"
              className="font-display text-xl font-bold tracking-tight text-white hover:text-[var(--accent)] transition-colors duration-300 block">
              ONIEL<span className="text-[var(--accent)]">.</span>
            </a>
          </Magnetic>
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Magnetic>
                  <a href={item.href} onClick={(e) => handleClick(e, item.href)}
                    className="relative px-4 py-2 text-[13px] font-body font-medium tracking-wide text-[rgba(148,163,184,0.6)] hover:text-white transition-colors duration-300 group block">
                    {item.label}
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-[#9eff00] to-transparent transition-all duration-500 group-hover:w-3/4 opacity-0 group-hover:opacity-100" />
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ─── Desktop: Floating pill on scroll ─── */}
      <div
        className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-[1001] items-center transition-all duration-700 ease-out nav-smooth"
        style={{
          opacity: scrolled ? 1 : 0,
          transform: `translateX(-50%) translateY(${scrolled ? '0' : '-10px'})`,
          pointerEvents: scrolled ? 'auto' : 'none',
        }}
      >
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-full"
          style={{
            background: 'rgba(2, 8, 16, 0.45)',
            backdropFilter: 'blur(20px) saturate(1.3)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
            border: '1px solid rgba(158, 255, 0, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}>
          <a href="#home" onClick={(e) => handleClick(e, '#home')} aria-label="Home"
            className="font-display text-sm font-bold text-white hover:text-[#9eff00] transition-colors px-3 py-1 block">
            O<span className="text-[#9eff00]">.</span>
          </a>
          <div className="w-[1px] h-4 bg-[rgba(255,255,255,0.06)]" />
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => handleClick(e, item.href)}
              className="relative px-3 py-1.5 text-[11px] font-body font-medium tracking-wide text-[rgba(148,163,184,0.55)] hover:text-white transition-colors duration-300 group block rounded-full">
              {item.label}
              <span className="absolute inset-0 rounded-full bg-[rgba(158,255,0,0.06)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </div>
      </div>

      {/* ─── Mobile: Top-left logo bar (always visible) ─── */}
      <nav
        aria-label="Main Navigation"
        className="md:hidden fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ease-out nav-smooth"
        style={{
          background: 'transparent',
          opacity: scrolled ? 0 : 1,
          pointerEvents: scrolled ? 'none' : 'auto',
        }}
      >
        <div className="flex items-center justify-between px-6 max-w-[1400px] mx-auto h-[64px]">
          <a href="#home" onClick={(e) => handleClick(e, '#home')} aria-label="Home"
            className="font-display text-lg font-bold tracking-tight text-white block">
            ONIEL<span className="text-[#9eff00]">.</span>
          </a>
        </div>
      </nav>

      {/* ─── Mobile: Floating pill on scroll ─── */}
      <div
        className="md:hidden fixed top-3 left-1/2 -translate-x-1/2 z-[1001] transition-all duration-700 ease-out nav-smooth"
        style={{
          opacity: scrolled ? 1 : 0,
          transform: `translateX(-50%) translateY(${scrolled ? '0' : '-8px'})`,
          pointerEvents: scrolled ? 'auto' : 'none',
        }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(2, 8, 16, 0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(158, 255, 0, 0.08)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}>
          <a href="#home" onClick={(e) => handleClick(e, '#home')}
            className="font-display text-sm font-bold text-white block">
            O<span className="text-[#9eff00]">.</span>
          </a>
          <div className="w-[1px] h-3.5 bg-[rgba(255,255,255,0.06)]" />
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full
              border border-[rgba(158,255,0,0.12)] bg-[rgba(158,255,0,0.03)]
              active:scale-95 transition-all duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative flex flex-col items-center justify-center gap-[4px]">
              <span className={`block rounded-full transition-all duration-500 ease-out origin-center ${
                mobileOpen ? 'rotate-45 translate-y-[6px] w-[14px] h-[1.5px]' : 'w-[14px] h-[1.5px]'
              }`} style={{ background: 'linear-gradient(90deg, #9eff00, #00ffcc)' }} />
              <span className={`block h-[1.5px] rounded-full transition-all duration-300 ${
                mobileOpen ? 'opacity-0 scale-x-0 w-[14px]' : 'opacity-100 scale-x-100 w-[10px]'
              }`} style={{ background: 'rgba(158,255,0,0.3)' }} />
              <span className={`block rounded-full transition-all duration-500 ease-out origin-center ${
                mobileOpen ? '-rotate-45 -translate-y-[6px] w-[14px] h-[1.5px]' : 'w-[14px] h-[1.5px]'
              }`} style={{ background: 'linear-gradient(90deg, #9eff00, #00ffcc)' }} />
            </div>
          </button>
        </div>
      </div>

      {/* ─── Mobile: Full-screen centered overlay ─── */}
      <div
        className={`md:hidden fixed inset-0 z-[999] transition-all duration-600 ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      >
        {/* Backdrop */}
        <div className={`absolute inset-0 transition-all duration-600 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'rgba(2, 8, 16, 0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}>

          {/* Nav links - centered vertical */}
          <div className="flex flex-col items-center gap-1">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="group relative block outline-none focus-visible:outline-none"
              >
                <span
                  className={`font-display text-2xl font-bold tracking-[0.08em] uppercase transition-all duration-600 ease-out block py-2.5 ${
                    mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : '0ms',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {item.label}
                </span>
                {/* Underline on hover (only on hover-capable devices) */}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#9eff00] transition-all duration-400 opacity-0 md:group-hover:w-full md:group-hover:opacity-60" />
              </a>
            ))}
          </div>

          {/* Bottom accent */}
          <div
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-600 ${
              mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mobileOpen ? '500ms' : '0ms' }}
          >
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[rgba(158,255,0,0.3)] to-transparent" />
            <span className="text-[8px] font-mono tracking-[0.2em] text-[rgba(158,255,0,0.25)] uppercase">
              Precision &amp; Purpose
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
