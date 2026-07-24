import { useState, useEffect, useRef, useCallback } from 'react';

const WHATSAPP_NUMBER = '923473716434';
const WHATSAPP_MESSAGE = encodeURIComponent("Hey Oniel! I found your website and would like to connect.");
const ULTRA_PRIMARY = '#9eff00';
const ULTRA_ACCENT = '#00ffcc';

export default function RobotMascotUltra() {
  const [isHovered, setIsHovered] = useState(false);
  const [isBeaming, setIsBeaming] = useState(false);
  const [blink, setBlink] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const faceRef = useRef<HTMLDivElement | null>(null);
  const pupilsRef = useRef<[SVGCircleElement | null, SVGCircleElement | null]>([null, null]);

  const handleClick = useCallback(() => {
    setIsBeaming(true);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank');
      setTimeout(() => setIsBeaming(false), 900);
    }, 350);
  }, []);

  // simple eye follow for extra polish
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!faceRef.current) return;
      const r = faceRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const px = Math.max(-5, Math.min(5, dx * 5));
      const py = Math.max(-4, Math.min(4, dy * 4));
      pupilsRef.current.forEach(p => { if (p) p.style.transform = `translate(${px}px, ${py}px)`; });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Blink periodically for more life
  useEffect(() => {
    let blinkTimer: ReturnType<typeof setTimeout> | null = null;
    let unblinkTimer: ReturnType<typeof setTimeout> | null = null;
    const schedule = () => {
      const delay = 2000 + Math.random() * 4000;
      blinkTimer = setTimeout(() => {
        setBlink(true);
        unblinkTimer = setTimeout(() => setBlink(false), 120);
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      if (blinkTimer) clearTimeout(blinkTimer);
      if (unblinkTimer) clearTimeout(unblinkTimer);
    };
  }, []);

  // Tooltip auto-show (non-intrusive)
  useEffect(() => {
    const t1 = setTimeout(() => setShowTooltip(true), 3200);
    const t2 = setTimeout(() => setShowTooltip(false), 9000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ right: 'clamp(16px, 2.4vw, 36px)', bottom: 'clamp(16px, 2.4vw, 36px)' }} className="fixed z-[9999]">
      {isBeaming && (
        <div style={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          position: 'absolute',
          right: '50%',
          bottom: '50%',
          transform: 'translate(50%, 50%)',
          background: `radial-gradient(circle at 40% 30%, ${ULTRA_PRIMARY}33 0%, ${ULTRA_ACCENT}22 30%, transparent 60%)`,
          filter: 'blur(18px)',
          pointerEvents: 'none',
          animation: 'ultraBeam 0.9s ease-out forwards'
        }} />
      )}

      {showTooltip && !isBeaming && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 text-[10px] sm:text-[11px] font-mono bg-[rgba(2,8,16,0.92)] border border-[rgba(158,255,0,0.16)] text-[#9eff00] rounded-sm pointer-events-none" style={{ boxShadow: '0 0 12px rgba(0,0,0,0.4)' }}>
          Let&apos;s chat!
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[rgba(2,8,16,0.92)] border-r border-b border-[rgba(158,255,0,0.12)]" />
        </div>
      )}

      <div
        ref={faceRef}
        role="button"
        tabIndex={0}
        aria-label="Open WhatsApp chat"
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`cursor-pointer select-none transition-transform duration-400 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
        style={{ width: 'clamp(100px, 12vw, 150px)', height: 'clamp(80px, 10.5vw, 120px)', filter: isHovered ? 'drop-shadow(0 18px 40px rgba(0,0,0,0.45))' : 'drop-shadow(0 8px 18px rgba(0,0,0,0.35))' }}
      >
        <svg viewBox="0 0 140 110" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="ultraChrome" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#0f1720" />
              <stop offset="45%" stopColor="#0b1220" />
              <stop offset="100%" stopColor="#07101a" />
            </linearGradient>
            <radialGradient id="visorGlow" cx="40%" cy="30%">
              <stop offset="0%" stopColor={ULTRA_PRIMARY} stopOpacity="0.95" />
              <stop offset="60%" stopColor={ULTRA_ACCENT} stopOpacity="0.18" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Chrome shell */}
          <rect x="16" y="18" width="108" height="66" rx="34" fill="url(#ultraChrome)" stroke="rgba(158,255,80,0.06)" strokeWidth="0.6" />

          {/* Visor */}
          <rect x="28" y="34" width="84" height="22" rx="6" fill="#041018" />
          <rect x="28" y="34" width="84" height="22" rx="6" fill="url(#visorGlow)" opacity="0.28" />

          {/* Left eye band */}
          <g>
            <rect x="44" y="38" width="14" height="10" rx="3" fill={ULTRA_PRIMARY} opacity="0.95" />
            <circle ref={(el) => { pupilsRef.current[0] = el; }} cx="51" cy="43" r="2.2" fill="#fff" style={{ transition: 'transform 0.12s linear' }} />
          </g>

          {/* Right eye band */}
          <g>
            <rect x="82" y="38" width="14" height="10" rx="3" fill={ULTRA_PRIMARY} opacity="0.95" />
            <circle ref={(el) => { pupilsRef.current[1] = el; }} cx="89" cy="43" r="2.2" fill="#fff" style={{ transition: 'transform 0.12s linear' }} />
          </g>

          {/* Subtle chrome rim and highlights */}
          <path d="M28 28 C 44 12, 96 12, 112 28" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />

          {/* Antenna */}
          <line x1="70" y1="8" x2="70" y2="20" stroke="#08101a" strokeWidth="2" strokeLinecap="round" />
          <g style={{ transformOrigin: '70px 8px', animation: 'ultraAntenna 2.2s linear infinite' }}>
            <circle cx="70" cy="6" r="4" fill={ULTRA_PRIMARY} opacity="0.95" />
            <circle cx="70" cy="6" r="8" fill={ULTRA_PRIMARY} opacity="0.08" style={{ animation: 'antennaPulse 1.6s ease-in-out infinite' }} />
          </g>
        </svg>
      </div>

      <style>{`
        @keyframes ultraBeam { from { transform: scale(0.6); opacity: 1 } to { transform: scale(2.6); opacity: 0 } }
        @keyframes ultraAntenna { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
