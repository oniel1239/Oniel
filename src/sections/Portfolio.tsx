import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/utils';
import TiltCard from '@/components/fx/TiltCard';
import RevealText from '@/components/fx/RevealText';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'SecureNet PenTest Suite',
    italic: 'A new weapon in your arsenal.',
    category: 'Ethical Hacking',
    description: 'Automated penetration testing framework with real-time vulnerability scanning.',
    image: asset('/portfolio-1.jpg'),
    tags: ['Python', 'Metasploit', 'Nmap', 'Docker'],
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: 2,
    title: 'AutoFlow Enterprise',
    italic: 'Operations on autopilot.',
    category: 'Workflow Automation',
    description: 'End-to-end business process automation handling 10,000+ daily operations.',
    image: asset('/portfolio-2.jpg'),
    tags: ['Node.js', 'Redis', 'Kubernetes', 'GraphQL'],
  },
  {
    id: 3,
    title: 'CipherVault Dashboard',
    italic: 'Threats, visualized.',
    category: 'Web Development',
    description: 'Real-time cybersecurity monitoring dashboard with threat visualization.',
    image: asset('/portfolio-5.jpg'),
    tags: ['React', 'D3.js', 'WebSocket', 'TypeScript'],
  },
  {
    id: 4,
    title: 'NeuralSync API',
    italic: 'Microservices at scale.',
    category: 'App Development',
    description: 'High-performance microservices architecture processing 50M+ requests daily.',
    image: asset('/portfolio-4.jpg'),
    tags: ['Go', 'gRPC', 'PostgreSQL', 'AWS'],
  },
  {
    id: 5,
    title: 'PhishGuard AI',
    italic: '99.7% catch rate.',
    category: 'Ethical Hacking',
    description: 'AI-powered phishing detection with industry-leading accuracy.',
    image: asset('/portfolio-6.jpg'),
    tags: ['Python', 'TensorFlow', 'NLP', 'ElasticSearch'],
  },
  {
    id: 6,
    title: 'DevOps Pipeline Pro',
    italic: '85% faster ships.',
    category: 'Workflow Automation',
    description: 'CI/CD automation suite reducing deployment time dramatically.',
    image: asset('/portfolio-3.jpg'),
    tags: ['Jenkins', 'Terraform', 'Ansible', 'Prometheus'],
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const revealItems = headerRef.current?.querySelectorAll('.reveal-item');
      if (revealItems && revealItems.length > 0) {
        gsap.fromTo(revealItems,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
          }
        );
      }
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative w-full bg-[#06070a] py-24 sm:py-32 overflow-hidden" style={{ isolation: 'isolate' }}>
      <div className="relative z-10 px-6 lg:px-[5vw]">
        <div className="max-w-7xl mx-auto">
          <RevealText className="mb-14 sm:mb-20 max-w-4xl">
            <div ref={headerRef}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-[1px] divider-line" />
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[rgba(182,255,58,0.5)]">
                  // Selected Work
                </span>
              </div>
              <h2 className="font-display font-bold text-white text-3xl sm:text-5xl md:text-7xl tracking-[-0.03em] mb-5">
                A small archive of <span className="font-serif font-light italic text-gradient-accent">big things.</span>
              </h2>
              <p className="font-body text-[rgba(220,220,230,0.6)] text-base sm:text-lg max-w-2xl">
                Selected works across security, automation, and development.
              </p>
            </div>
          </RevealText>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 auto-rows-[300px] sm:auto-rows-[340px]">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`group relative ${p.span || ''}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <TiltCard intensity={6} className="relative w-full h-full rounded-2xl overflow-hidden glow-card-hover">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(6,7,10,0.0) 0%, rgba(6,7,10,0.2) 50%, rgba(6,7,10,0.95) 100%)',
                      }}
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, rgba(182,255,58,0.1) 0%, transparent 50%)',
                        opacity: active === i ? 1 : 0,
                      }}
                    />
                  </div>

                  {/* Top meta */}
                  <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase">
                    <span className="text-[rgba(182,255,58,0.6)]">/{p.id.toString().padStart(2, '0')}</span>
                    <span className="text-white/40">{p.category}</span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
                    <h3 className="font-display font-bold text-white text-xl sm:text-2xl md:text-3xl tracking-[-0.02em] group-hover:text-[#b6ff3a] transition-colors duration-500">
                      {p.title}
                    </h3>
                    <p className="font-serif italic text-[rgba(220,220,230,0.6)] text-sm sm:text-base mt-1">
                      {p.italic}
                    </p>
                    <p className="text-[rgba(220,220,230,0.5)] text-xs sm:text-sm mt-2 max-w-md line-clamp-2">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 border border-[rgba(182,255,58,0.15)] text-[rgba(220,220,230,0.55)] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Border */}
                  <div className="absolute inset-0 border border-[rgba(255,255,255,0.05)] group-hover:border-[rgba(182,255,58,0.2)] rounded-2xl transition-colors duration-500 pointer-events-none" />
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
