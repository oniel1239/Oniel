import { useEffect, useRef } from 'react';

export default function NeonGrid() {
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

    let animId: number;
    let time = 0;

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const horizonY = canvas.height * 0.45;
      const gridLines = 30;
      const gridSpacing = 60;

      // Horizontal lines (perspective)
      ctx.strokeStyle = 'rgba(158, 255, 0, 0.08)';
      ctx.lineWidth = 1;

      for (let i = 0; i < gridLines; i++) {
        const progress = i / gridLines;
        const y = horizonY + (canvas.height - horizonY) * Math.pow(progress, 1.5);
        const alpha = 0.03 + progress * 0.12;

        ctx.strokeStyle = `rgba(158, 255, 0, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines (converging to center)
      const numVertical = 20;
      for (let i = -numVertical; i <= numVertical; i++) {
        const spreadFactor = 3 + Math.abs(i) * 0.5;
        const endX = centerX + i * gridSpacing * spreadFactor;
        const alpha = Math.max(0.02, 0.1 - Math.abs(i) * 0.004);

        ctx.strokeStyle = `rgba(0, 255, 204, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(centerX, horizonY);
        ctx.lineTo(endX, canvas.height + 50);
        ctx.stroke();
      }

      // Scanning line effect
      const scanY = horizonY + ((canvas.height - horizonY) * ((Math.sin(time) + 1) / 2));
      const scanGradient = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scanGradient.addColorStop(0, 'rgba(158, 255, 0, 0)');
      scanGradient.addColorStop(0.5, 'rgba(158, 255, 0, 0.15)');
      scanGradient.addColorStop(1, 'rgba(158, 255, 0, 0)');
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 2, canvas.width, 4);

      // Horizontal scan line
      const scanX = canvas.width * ((Math.cos(time * 0.7) + 1) / 2);
      const scanGradientX = ctx.createLinearGradient(scanX - 2, 0, scanX + 2, 0);
      scanGradientX.addColorStop(0, 'rgba(0, 255, 204, 0)');
      scanGradientX.addColorStop(0.5, 'rgba(0, 255, 204, 0.08)');
      scanGradientX.addColorStop(1, 'rgba(0, 255, 204, 0)');
      ctx.fillStyle = scanGradientX;
      ctx.fillRect(scanX - 2, horizonY, 4, canvas.height - horizonY);

      // Horizon glow
      const glowGradient = ctx.createRadialGradient(
        centerX, horizonY, 0,
        centerX, horizonY, canvas.width * 0.5
      );
      glowGradient.addColorStop(0, 'rgba(158, 255, 0, 0.06)');
      glowGradient.addColorStop(0.5, 'rgba(0, 255, 204, 0.02)');
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, horizonY - 100, canvas.width, 200);

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
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
}
