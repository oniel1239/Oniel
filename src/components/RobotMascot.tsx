import { useState, useCallback, useEffect, useRef } from 'react';

const WHATSAPP_NUMBER = '923473716434';
const WHATSAPP_MESSAGE = encodeURIComponent('Hey Oniel! I found your website and would like to connect.');
const MASCOT_GLOW = '#9eff00';

export default function RobotMascot() {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isBeaming, setIsBeaming] = useState(false);
  const faceRef = useRef<HTMLDivElement>(null);
  const pupilsRef = useRef<[SVGCircleElement | null, SVGCircleElement | null]>([null, null]);
  const [blink, setBlink] = useState(false);

  const handleWhatsApp = useCallback(() => {
    setIsBeaming(true);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank');
      setTimeout(() => setIsBeaming(false), 800);
    }, 400);
  }, []);

  // Blink periodically
  useEffect(() => {
    let blinkTimer: ReturnType<typeof setTimeout>;
    let unblinkTimer: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 3500;
      return setTimeout(() => {
        setBlink(true);
        unblinkTimer = setTimeout(() => setBlink(false), 120);
        blinkTimer = scheduleBlink();
      }, delay);
    };

    blinkTimer = scheduleBlink();

    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(unblinkTimer);
    };
  }, []);

  // Eye tracking
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      if (!faceRef.current) return;
      const rect = faceRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const px = Math.min(4, Math.max(-4, dx * 4));
      const py = Math.min(3, Math.max(-3, dy * 3));
      pupilsRef.current.forEach((p) => {
        if (p) {
          p.style.transform = `translate(${px}px, ${py}px)`;
        }
      });
    };
    window.addEventListener('mousemove', onMouse);
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  // Tooltip auto-show
  useEffect(() => {
    const t1 = setTimeout(() => setShowTooltip(true), 3500);
    const t2 = setTimeout(() => setShowTooltip(false), 9000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="fixed z-[9998] pointer-events-auto"
      style={{ right: 'clamp(14px, 2vw, 28px)', bottom: 'clamp(14px, 2vw, 28px)' }}
    >
      {isBeaming && (
        <div className="absolute inset-0 z-10 pointer-events-none rounded-full"
          style={{
            background: `radial-gradient(circle, ${MASCOT_GLOW}99 0%, ${MASCOT_GLOW}40 45%, transparent 70%)`,
            animation: 'mascotBeam 0.4s ease-out forwards',
          }}
        />
      )}

      {showTooltip && !isBeaming && (
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 text-[10px] sm:text-[11px] font-mono
          bg-[rgba(2,8,16,0.9)] border border-[rgba(158,255,0,0.2)] text-[#9eff00]
          backdrop-blur-md z-20 pointer-events-none rounded-sm"
          style={{ animation: 'mascotTip 0.3s ease-out', boxShadow: '0 0 15px rgba(158,255,0,0.08)' }}>
          Let&apos;s chat!
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45
            bg-[rgba(2,8,16,0.9)] border-r border-b border-[rgba(158,255,0,0.2)]" />
        </div>
      )}

      {/* Robot face — pure HTML/CSS, no WebGL */}
      <div
        ref={faceRef}
        className={`cursor-pointer transition-all duration-500 ease-out select-none ${isHovered ? 'scale-110' : 'scale-100'}`}
        style={{
          width: 'clamp(90px, 11vw, 130px)',
          height: 'clamp(70px, 9vw, 100px)',
          filter: isHovered
            ? 'drop-shadow(0 0 20px rgba(158,255,0,0.45)) drop-shadow(0 0 45px rgba(158,255,0,0.15))'
            : 'drop-shadow(0 0 8px rgba(158,255,0,0.2))',
          animation: 'robotFloat 3s ease-in-out infinite',
        }}
        onClick={handleWhatsApp}
        onMouseEnter={() => { setIsHovered(true); setShowTooltip(false); }}
        onMouseLeave={() => { setIsHovered(false); }}
        role="button"
        tabIndex={0}
        aria-label="Open WhatsApp chat with Oniel"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleWhatsApp(); } }}
      >
        <svg viewBox="0 0 130 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Antenna stick */}
          <line x1="65" y1="8" x2="65" y2="22" stroke="#0a0a18" strokeWidth="2" strokeLinecap="round" />

          {/* Antenna tip */}
          <g style={{ transformOrigin: '65px 12px', animation: 'antennaSpin 2s linear infinite' }}>
            <polygon points="65,6 69,14 61,14" fill="#9eff00" />
            <circle cx="65" cy="14" r="2.5" fill="#9eff00" opacity="0.6"
              style={{ animation: 'antennaPulse 1s ease-in-out infinite' }} />
          </g>

          {/* Left ear nub */}
          <ellipse cx="7" cy="42" rx="5" ry="8" fill="#0a0a18" transform="rotate(-15 7 42)" />
          <ellipse cx="7" cy="42" rx="2.5" ry="2.5" fill="none" stroke="#9eff00" strokeWidth="0.8" opacity="0.7" />

          {/* Right ear nub */}
          <ellipse cx="123" cy="42" rx="5" ry="8" fill="#0a0a18" transform="rotate(15 123 42)" />
          <ellipse cx="123" cy="42" rx="2.5" ry="2.5" fill="none" stroke="#9eff00" strokeWidth="0.8" opacity="0.7" />

          {/* Head */}
          <ellipse cx="65" cy="48" rx="50" ry="38" fill="#0a0a18" stroke="rgba(158,255,0,0.06)" strokeWidth="0.5" />

          {/* Head highlight */}
          <ellipse cx="65" cy="48" rx="50" ry="38" fill="url(#headGrad)" opacity="0.3" />

          {/* Subtle jawline */}
          <path d="M 22 55 Q 65 78 108 55" stroke="rgba(158,255,0,0.04)" strokeWidth="0.5" fill="none" />

          {/* Visor bar */}
          <rect x="18" y="36" width="94" height="20" rx="5" fill="#050510" opacity="0.9" stroke="rgba(158,255,0,0.08)" strokeWidth="0.5" />

          {/* Left eyebrow - animates on hover */}
          <path
            ref={(el) => { eyebrowsRef.current[0] = el; }}
            d={isHovered ? "M 38 32 Q 50 25 60 32" : "M 38 35 Q 50 32 60 35"}
            stroke="#9eff00"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={isHovered ? 0.6 : 0.3}
            style={{ transition: 'all 0.3s ease-out' }}
          />

          {/* Right eyebrow - animates on hover */}
          <path
            ref={(el) => { eyebrowsRef.current[1] = el; }}
            d={isHovered ? "M 70 32 Q 80 25 92 32" : "M 70 35 Q 80 32 92 35"}
            stroke="#9eff00"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={isHovered ? 0.6 : 0.3}
            style={{ transition: 'all 0.3s ease-out' }}
          />

          {/* Eye glow (behind eyes) */}
          <ellipse cx="50" cy="44" rx="12" ry="7" fill="#9eff00" opacity={isHovered ? 0.15 : 0.08}
            style={{ transition: 'opacity 0.3s ease-out' }} />
          <ellipse cx="80" cy="44" rx="12" ry="7" fill="#9eff00" opacity={isHovered ? 0.15 : 0.08}
            style={{ transition: 'opacity 0.3s ease-out' }} />

          {/* Left eye */}
          <g>
            <rect x="42" y="40" width="16" height="8" rx="2.5" fill="#9eff00" opacity="0.95"
              style={{ animation: blink ? 'robotBlink 0.12s ease' : 'none', transition: 'opacity 0.3s ease-out' }} />
            {/* Left pupil */}
            <circle ref={(el) => { pupilsRef.current[0] = el; }} cx="50" cy="44" r="2.5" fill="white"
              style={{ transition: 'transform 0.15s ease-out' }} />
          </g>

          {/* Right eye */}
          <g>
            <rect x="72" y="40" width="16" height="8" rx="2.5" fill="#9eff00" opacity="0.95"
              style={{ animation: blink ? 'robotBlink 0.12s ease' : 'none', transition: 'opacity 0.3s ease-out' }} />
            {/* Right pupil */}
            <circle ref={(el) => { pupilsRef.current[1] = el; }} cx="80" cy="44" r="2.5" fill="white"
              style={{ transition: 'transform 0.15s ease-out' }} />
          </g>

          {/* Mouth - changes shape on hover */}
          <path
            ref={mouthRef}
            d={isHovered
              ? "M 48 62 Q 65 72 82 62"
              : "M 52 62 Q 65 66 78 62"}
            stroke="#9eff00"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            opacity={isHovered ? 0.9 : 0.6}
            style={{ transition: 'all 0.3s ease-out' }}
          />

          {/* Mouth corners on hover */}
          {isHovered && (
            <>
              <circle cx="48" cy="62" r="1" fill="#9eff00" opacity="0.6" />
              <circle cx="82" cy="62" r="1" fill="#9eff00" opacity="0.6" />
            </>
          )}

          {/* Cheek glows - brighter on hover */}
          <circle cx="36" cy="52" r="7" fill="#9eff00" opacity={isHovered ? 0.1 : 0.04}
            style={{ transition: 'opacity 0.3s ease-out' }} />
          <circle cx="94" cy="52" r="7" fill="#9eff00" opacity={isHovered ? 0.1 : 0.04}
            style={{ transition: 'opacity 0.3s ease-out' }} />

          {/* Gradients */}
          <defs>
            <radialGradient id="headGrad" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <style>{`
        @keyframes robotFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes robotBlink {
          0% { transform: scaleY(1); }
          50% { transform: scaleY(0.1); }
          100% { transform: scaleY(1); }
        }
        @keyframes antennaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes antennaPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes mascotBeam {
          0% { transform: scale(0.4); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes mascotTip {
          0% { opacity: 0; transform: translateX(-50%) translateY(5px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
