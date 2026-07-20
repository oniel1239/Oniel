import { useRef, type ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Card with a soft radial glow that follows the cursor.
 */
export default function GlowCard({ children, className = '', onClick }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onClick={onClick}
      className={`relative overflow-hidden bg-[rgba(20,24,32,0.45)] border border-[rgba(255,255,255,0.04)] transition-all duration-500 ${className}`}
      style={{
        // @ts-expect-error custom prop
        '--mx': '50%',
        '--my': '50%',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(400px circle at var(--mx) var(--my), rgba(182,255,58,0.08), transparent 50%)',
        }}
      />
      {children}
    </div>
  );
}
