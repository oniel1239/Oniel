import type { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: number;
}

/**
 * Infinite horizontal marquee using CSS animation.
 * The track is duplicated to enable seamless looping.
 */
export default function Marquee({ children, className = '', reverse = false, speed = 40 }: MarqueeProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max gap-12 will-change-transform"
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          animationDuration: `${speed}s`,
        }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>
          {children}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#06070a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#06070a] to-transparent" />
    </div>
  );
}
