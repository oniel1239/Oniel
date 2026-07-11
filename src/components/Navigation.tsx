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
          className="md:hidden flex flex-col gap-1.5 z-[1001] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`w-6 h-[2px] bg-[var(--accent)] transition-all duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-[8px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[var(--accent)] transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[var(--accent)] transition-all duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 bg-[rgba(3,7,18,0.98)] backdrop-blur-2xl transition-all duration-500 flex flex-col items-center justify-center gap-8 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="font-display text-3xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)] focus-visible:text-[var(--accent)] transition-colors"
            style={{
              transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
