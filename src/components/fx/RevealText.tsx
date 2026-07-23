import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'span' | 'section' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

/**
 * Reveals text from below with a clip-path / y translation.
 * Triggers on scroll into view.
 */
export default function RevealText({ children, className = '', delay = 0, y = 40, as: Tag = 'div' }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.3,
          delay,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );
    });
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
