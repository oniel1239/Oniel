import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionElements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const visibilityMap = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let maxIndex = 0;
        sections.forEach((s, i) => {
          const ratio = visibilityMap.get(s.id) || 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxIndex = i;
          }
        });

        if (maxRatio > 0) {
          setActiveIndex(maxIndex);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    sectionElements.forEach((el) => observerRef.current?.observe(el));

    // Fade dots at page extremes
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Fade out in first 5vh and last 5vh of scroll
      const fadeRange = window.innerHeight * 0.05;
      setVisible(scrollTop > fadeRange && scrollTop < docHeight - fadeRange);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-[900] flex flex-col items-center gap-2 transition-all duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Top line */}
      <div className="w-[1px] h-5 bg-gradient-to-b from-transparent to-[rgba(158,255,0,0.25)]" />

      {sections.map((section, i) => {
        const isActive = i === activeIndex;
        const isHovered = i === hoveredIndex;

        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(i)}
            onBlur={() => setHoveredIndex(null)}
            aria-label={`Scroll to ${section.label}`}
            className="group relative flex items-center justify-center p-3 transition-transform active:scale-90"
          >
            {/* Tooltip label */}
            <span
              className={`absolute right-full mr-3 px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                isHovered || isActive
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-2 pointer-events-none'
              }`}
              style={{
                color: 'var(--accent)',
                background: 'rgba(3,7,18,0.9)',
                border: '1px solid rgba(158,255,0,0.2)',
              }}
            >
              {section.label}
            </span>

            {/* Dot container */}
            <div
              className="relative flex items-center justify-center transition-all duration-500 ease-out"
              style={{
                width: isActive ? '14px' : '8px',
                height: isActive ? '14px' : '8px',
              }}
            >
              {/* Outer ring pulse */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ease-out ${
                  isActive
                    ? 'opacity-100 scale-[1.6]'
                    : 'opacity-0 scale-100'
                }`}
                style={{
                  border: '1.5px solid var(--accent)',
                  animation: isActive ? 'pulse-dot 2s ease-in-out infinite' : 'none',
                }}
              />
              {/* Inner dot */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? 'bg-[var(--accent)] shadow-[0_0_10px_rgba(158,255,0,0.7)]'
                    : isHovered
                    ? 'bg-[rgba(158,255,0,0.5)]'
                    : 'bg-[rgba(158,255,0,0.2)]'
                }`}
              />
            </div>
          </button>
        );
      })}

      {/* Bottom line */}
      <div className="w-[1px] h-5 bg-gradient-to-b from-[rgba(158,255,0,0.25)] to-transparent" />
    </nav>
  );
}
