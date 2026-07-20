import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/utils';
import TiltCard from '@/components/fx/TiltCard';
import RevealText from '@/components/fx/RevealText';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Ethical Hacking', level: 95 },
  { name: 'Workflow Automation', level: 90 },
  { name: 'Web Development', level: 92 },
  { name: 'App Development', level: 88 },
  { name: 'Cybersecurity', level: 94 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<HTMLDivElement[]>([]);
  const portraitImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(bioRef.current?.querySelectorAll('.reveal-line') || [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: bioRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );

      skillRefs.current.forEach((el, i) => {
        if (!el) return;
        const bar = el.querySelector('.skill-bar-fill') as HTMLElement;
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: `${skills[i].level}%`, duration: 1.6, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
          }
        );
      });
      gsap.fromTo(portraitImgRef.current,
        { y: 0 },
        {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: portraitImgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full bg-[#06070a] py-24 sm:py-32 px-6 lg:px-[5vw]">
      <div className="max-w-7xl mx-auto">
        <RevealText className="mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-[1px] divider-line" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[rgba(182,255,58,0.5)]">
              // The Architect
            </span>
          </div>
          <h2 className="font-display font-bold text-white text-3xl sm:text-5xl md:text-7xl tracking-[-0.03em] max-w-4xl">
            I build systems that <span className="font-serif font-light italic text-gradient-accent">work beautifully</span> — and stay safe.
          </h2>
        </RevealText>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Portrait */}
          <div ref={imageRef} className="lg:col-span-5">
            <TiltCard intensity={8} className="relative max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <img
                  ref={portraitImgRef}
                  src={asset('/profile.jpg')}
                  alt="Portrait of Oniel Robin Samuel"
                  loading="lazy"
                  className="w-full h-full object-cover scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 0%, transparent 50%, rgba(6,7,10,0.7) 85%, #06070a 100%)',
                  }}
                />
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(182,255,58,0.05) 3px, rgba(182,255,58,0.05) 4px)',
                  }}
                />
                <div className="absolute inset-0 border border-[rgba(182,255,58,0.08)] rounded-2xl" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-[0.2em] uppercase text-[rgba(182,255,58,0.5)]">
                  <span>ORS.001</span>
                  <span>PORTRAIT</span>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[rgba(182,255,58,0.6)] mb-1">
                    // Captured
                  </div>
                  <div className="text-white/90 font-display text-lg">Oniel Robin Samuel</div>
                  <div className="text-[rgba(220,220,230,0.5)] text-xs">Systems Architect</div>
                </div>
              </div>
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-[rgba(182,255,58,0.3)] rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-[rgba(182,255,58,0.3)] rounded-br-lg" />
            </TiltCard>
          </div>

          {/* Bio */}
          <div ref={bioRef} className="lg:col-span-7 space-y-6 sm:space-y-7">
            <h3 className="reveal-line font-display text-2xl sm:text-3xl font-bold text-white">
              A multidisciplinary systems architect.
            </h3>

            <p className="reveal-line font-body text-[rgba(220,220,230,0.7)] leading-relaxed text-base sm:text-lg">
              Specializing in <span className="text-[#b6ff3a]">ethical hacking</span>,{' '}
              <span className="text-[#b6ff3a]">workflow automation</span>, and{' '}
              <span className="text-[#b6ff3a]">full-stack development</span>. With a deep-rooted
              passion for cybersecurity and a methodical approach to problem-solving,
              I build secure, scalable digital ecosystems.
            </p>

            <p className="reveal-line font-body text-[rgba(220,220,230,0.55)] leading-relaxed text-sm sm:text-base">
              My expertise spans penetration testing, custom automation pipelines,
              high-performance web applications, and robust backend architectures.
              I operate at the intersection of security and innovation.
            </p>

            {/* Status indicators */}
            <div className="reveal-line flex flex-wrap gap-6 pt-3">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 bg-[#b6ff3a] animate-pulse rounded-full" />
                <span className="text-[rgba(220,220,230,0.6)] text-xs font-mono">Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 bg-[#79f5d4] animate-pulse rounded-full" />
                <span className="text-[rgba(220,220,230,0.6)] text-xs font-mono">Available for projects</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 bg-white animate-pulse rounded-full" />
                <span className="text-[rgba(220,220,230,0.6)] text-xs font-mono">EST. 2019</span>
              </div>
            </div>

            {/* Skills */}
            <div className="reveal-line pt-4 space-y-4">
              <h4 className="font-display text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[rgba(220,220,230,0.4)]">
                Core Competencies
              </h4>
              {skills.map((skill, i) => (
                <div key={skill.name} ref={(el) => { if (el) skillRefs.current[i] = el; }}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-white/85 text-sm font-medium">{skill.name}</span>
                    <span className="text-[rgba(182,255,58,0.7)] text-xs font-mono">{skill.level}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
                    <div
                      className="skill-bar-fill h-full rounded-full"
                      style={{
                        width: '0%',
                        background: 'linear-gradient(90deg, #b6ff3a, #79f5d4)',
                        boxShadow: '0 0 12px rgba(182,255,58,0.35)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
