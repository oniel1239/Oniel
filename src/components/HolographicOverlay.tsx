import { useEffect, useRef } from 'react';

export default function HolographicOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animId = 0;
    let time = 0;

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sparse floating particles
      const fragments = 5;
      for (let i = 0; i < fragments; i++) {
        const phase = (time + i * 0.8) % (Math.PI * 2);
        const x = canvas.width * (0.1 + 0.8 * ((Math.sin(phase * 0.3 + i) + 1) / 2));
        const y = canvas.height * (0.1 + 0.8 * ((Math.cos(phase * 0.2 + i * 1.5) + 1) / 2));
        const alpha = 0.02 + Math.sin(phase * 2) * 0.015;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(182, 255, 58, ${alpha})`;
        ctx.fill();
      }

      // Subtle scan lines
      const scanSpacing = 6;
      for (let y = 0; y < canvas.height; y += scanSpacing) {
        const scanAlpha = 0.005 + Math.sin(y * 0.03 + time * 2) * 0.003;
        ctx.fillStyle = `rgba(182, 255, 58, ${scanAlpha})`;
        ctx.fillRect(0, y, canvas.width, 1);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none"
      style={{ opacity: 0.15, mixBlendMode: 'screen' }}
    />
  );
}
