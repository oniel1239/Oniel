import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/utils';
import TiltCard from '@/components/fx/TiltCard';
import RevealText from '@/components/fx/RevealText';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Ethical Hacking',
    italic: 'Security, audited.',
    description:
      'Comprehensive security audits, vulnerability assessments, and penetration testing. I identify weaknesses before malicious actors do — providing detailed remediation strategies.',
    features: ['Network Penetration Testing', 'Web App Security Audits', 'Social Engineering Assessments', 'Red Team Operations'],
    image: asset('/portfolio-1.jpg'),
  },
  {
    id: '02',
    title: 'Workflow Automation',
    italic: 'Bots that ship work.',
    description:
      'Custom automation pipelines that eliminate repetitive tasks, streamline operations, and boost productivity. From bot development to CI/CD orchestration.',
    features: ['Custom Bot Development', 'CI/CD Pipeline Design', 'Data Processing Automation', 'API Integration & Orchestration'],
    image: asset('/portfolio-2.jpg'),
  },
  {
    id: '03',
    title: 'Website Development',
    italic: 'Fast. Secure. Cinematic.',
    description:
      'Modern, blazing-fast web applications built with security-first architecture. React ecosystems, server-side rendering, and progressive web apps.',
    features: ['React & Next.js Development', 'Secure Authentication Systems', 'Performance Optimization', 'Responsive & Accessible Design'],
    image: asset('/portfolio-3.jpg'),
  },
  {
    id: '04',
    title: 'App Development',
    italic: 'Backends that scale.',
    description:
      'Robust, scalable backend architectures and RESTful/GraphQL APIs. Database schemas, microservices, and the infrastructure that powers modern applications.',
    features: ['API Design & Development', 'Database Architecture', 'Microservices Implementation', 'Cloud Infrastructure Setup'],
    image: asset('/portfolio-4.jpg'),
  },
];



export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.querySelectorAll('.reveal-item'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
          }
        );
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const direction = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(card,
          { x: direction, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        );
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative w-full bg-[#06070a] py-24 sm:py-32 px-6 lg:px-[5vw]">
      <div className="max-w-7xl mx-auto">
        <RevealText className="mb-14 sm:mb-20 max-w-4xl">
          <div ref={headerRef}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-[1px] divider-line" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[rgba(182,255,58,0.5)]">
                // Capabilities
              </span>
            </div>
            <h2 className="font-display font-bold text-white text-3xl sm:text-5xl md:text-7xl tracking-[-0.03em] mb-5">
              Four pillars of <span className="font-serif font-light italic text-gradient-accent">precision.</span>
            </h2>
            <p className="font-body text-[rgba(220,220,230,0.6)] text-base sm:text-lg max-w-2xl">
              From pentesting to pipelines, every system I touch is engineered with intent.
            </p>
          </div>
        </RevealText>

        <div className="space-y-16 sm:space-y-20">
          {services.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => { if (el) cardRefs.current[i] = el; }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
            >
              <div className={`relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <TiltCard intensity={10} className="relative group rounded-2xl overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(6,7,10,0.0) 0%, rgba(6,7,10,0.0) 50%, rgba(6,7,10,0.85) 100%)',
                      }}
                    />

                    <div className="absolute top-4 left-4 font-display text-5xl sm:text-6xl font-bold text-white/10">
                      {s.id}
                    </div>
                    <div className="absolute bottom-4 left-4 text-[9px] font-mono tracking-[0.2em] uppercase text-[rgba(182,255,58,0.6)]">
                      Service / {s.id}
                    </div>
                    <div className="absolute inset-0 border border-[rgba(255,255,255,0.05)] group-hover:border-[rgba(182,255,58,0.2)] rounded-2xl transition-colors duration-500" />
                  </div>
                </TiltCard>
              </div>

              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[rgba(182,255,58,0.6)]">
                    {s.id} / 04
                  </span>
                  <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]" />
                </div>
                <h3 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] mb-2">
                  {s.title}
                </h3>
                <p className="font-serif italic text-[#b6ff3a] text-xl sm:text-2xl mb-5">
                  {s.italic}
                </p>
                <p className="font-body text-[rgba(220,220,230,0.6)] leading-relaxed text-sm sm:text-base mb-6 max-w-xl">
                  {s.description}
                </p>
                <ul className="space-y-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 group">
                      <span className="w-6 h-[1px] bg-[#b6ff3a]/60 group-hover:w-10 transition-all duration-500" />
                      <span className="text-[rgba(220,220,230,0.6)] text-sm group-hover:text-white transition-colors duration-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
