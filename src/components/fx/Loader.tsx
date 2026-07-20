import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setHidden(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#06070a] transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="font-display text-5xl sm:text-7xl font-bold tracking-tighter text-gradient-accent">
          {progress.toString().padStart(3, '0')}
        </div>
        <div className="w-40 h-[1px] bg-[rgba(255,255,255,0.08)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#b6ff3a] to-[#79f5d4]"
            style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
          />
        </div>
        <div className="text-[10px] font-mono tracking-[0.4em] uppercase text-[rgba(182,255,58,0.4)]">
          Initializing
        </div>
      </div>
    </div>
  );
}
