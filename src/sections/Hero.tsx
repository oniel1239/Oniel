import { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';


/* --- Lazy-loaded 3D Scene (code-splits ~600KB Three.js) --- */
const HeroScene = lazy(() => import('./HeroScene'));

function SceneFallback() {
  return (
    <div className="absolute inset-0 z-0 bg-[#06070a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated geometric rings */}
        <div className="relative w-20 h-20">
          <div
            className="absolute inset-0 rounded-full border border-[rgba(182,255,58,0.15)]"
            style={{
              animation: 'sf-expand 2s ease-out infinite',
            }}
          />
          <div
            className="absolute inset-2 rounded-full border border-[rgba(121,245,212,0.2)]"
            style={{
              animation: 'sf-expand 2s ease-out 0.4s infinite',
            }}
          />
          <div
            className="absolute inset-4 rounded-full border border-[rgba(182,255,58,0.3)]"
            style={{
              animation: 'sf-expand 2s ease-out 0.8s infinite',
            }}
          />
          {/* Center dot */}
          <div className="absolute inset-[38%] rounded-full bg-[#b6ff3a] opacity-60"
            style={{
              animation: 'sf-pulse 2s ease-in-out infinite',
            }}
          />
        </div>
        {/* Loading text */}
        <div className="text-[10px] font-mono tracking-[0.4em] uppercase text-[rgba(182,255,58,0.4)]">
          Loading<span className="sf-dot">.</span><span className="sf-dot">.</span><span className="sf-dot">.</span>
        </div>
      </div>
      <style>{`
        @keyframes sf-expand {
          0% { transform: scale(0.3); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes sf-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.6); opacity: 1; }
        }
        .sf-dot:nth-child(1) { animation: sf-blink 1.4s infinite; }
        .sf-dot:nth-child(2) { animation: sf-blink 1.4s 0.2s infinite; }
        .sf-dot:nth-child(3) { animation: sf-blink 1.4s 0.4s infinite; }
        @keyframes sf-blink {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* --- Hero --- */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(eyebrowRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
        .fromTo(line1Ref.current, { y: 80, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 }, '-=0.7')
        .fromTo(line2Ref.current, { y: 80, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 }, '-=1')
        .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.8')
        .fromTo(ctaRef.current?.children?.length ? [...ctaRef.current.children] : [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, '-=0.7')
        .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const p = Math.min(y / h, 1);
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${p * 80}px)`;
        textRef.current.style.opacity = String(1 - p * 1.6);
        textRef.current.style.filter = `blur(${p * 12}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[#06070a]"
    >
      {/* 3D Background — lazy loaded with Suspense */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<SceneFallback />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Vignette + grain mask */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 45%, transparent 0%, rgba(6,7,10,0.4) 55%, rgba(6,7,10,0.95) 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 z-[3] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #06070a 100%)',
        }}
      />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-[5vw] min-h-[100dvh] flex flex-col justify-center"
      >
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="flex items-center gap-3 mb-7 sm:mb-9"
          >
            <div className="w-10 h-[1px] divider-line" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[rgba(182,255,58,0.7)]">
              Ethical Hacker &nbsp;·&nbsp; Systems Architect &nbsp;·&nbsp; Karachi
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display font-bold leading-[0.92] tracking-[-0.04em] mb-6 sm:mb-8">
            <span
              ref={line1Ref}
              className="block text-gradient"
              style={{ fontSize: 'clamp(2.6rem, 8.4vw, 8.4rem)' }}
            >
              Securing the
            </span>
            <span
              ref={line2Ref}
              className="block"
              style={{ fontSize: 'clamp(2.6rem, 8.4vw, 8.4rem)' }}
            >
              <span className="text-gradient">future, </span>
              <span className="font-serif font-light text-gradient-accent">elegantly.</span>
            </span>
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="font-body text-[rgba(220,220,230,0.7)] text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            I&apos;m <span className="text-white font-medium">Oniel Robin Samuel</span> — building
            secure digital ecosystems, automating complex workflows, and shipping
            premium web experiences with a cinematic touch.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 text-sm font-display font-medium overflow-hidden rounded-full
                bg-[#b6ff3a] text-[#06070a] transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="relative z-10">View Selected Work</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 text-sm font-display font-medium rounded-full
                border border-[rgba(255,255,255,0.12)] text-white/90 hover:border-[rgba(182,255,58,0.4)] hover:bg-[rgba(182,255,58,0.04)] transition-all duration-300"
            >
              <span>Start a project</span>
            </a>
          </div>


        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase text-[rgba(182,255,58,0.5)]">
          Scroll to explore
        </span>
        <div className="relative w-[1px] h-12 bg-[rgba(255,255,255,0.08)] overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-3 bg-[#b6ff3a]"
            style={{
              animation: 'scrollLine 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes scrollLine {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(400%); }
          }
        `}</style>
      </div>
    </section>
  );
}

