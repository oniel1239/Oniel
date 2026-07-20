import { useRef, useState, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glow?: boolean;
}

/**
 * A premium 3D tilt card that follows the pointer.
 * Adds a soft glow trail at the cursor location on hover.
 */
export default function TiltCard({ children, className = '', intensity = 12, glow = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ transform: string; '--mx': string; '--my': string }>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)',
    '--mx': '50%',
    '--my': '50%',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    setStyle({
      transform: `perspective(1000px) rotateX(${(-py * intensity).toFixed(2)}deg) rotateY(${(px * intensity).toFixed(2)}deg) translateZ(0)`,
      '--mx': `${x}px`,
      '--my': `${y}px`,
    } as never);
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)',
      '--mx': '50%',
      '--my': '50%',
    } as never);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${glow ? 'glow-card-hover' : ''} ${className}`}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
}
