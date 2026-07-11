import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'ETHICAL HACKING',
    subtitle: 'Penetration Testing & Security Assessment',
    description:
      'Comprehensive security audits, vulnerability assessments, and penetration testing. I identify weaknesses before malicious actors do — providing detailed remediation strategies and fortifying your digital infrastructure against evolving cyber threats.',
    features: ['Network Penetration Testing', 'Web App Security Audits', 'Social Engineering Assessments', 'Red Team Operations', 'Security Reporting & Remediation'],
    image: '/portfolio-1.jpg',
    accent: '#9eff00',
  },
  {
    id: '02',
    title: 'WORKFLOW AUTOMATION',
    subtitle: 'Intelligent Process Optimization',
    description:
      'Custom automation pipelines that eliminate repetitive tasks, streamline operations, and boost productivity. From bot development to CI/CD orchestration, I engineer intelligent workflows that let your team focus on what matters most.',
    features: ['Custom Bot Development', 'CI/CD Pipeline Design', 'Data Processing Automation', 'API Integration & Orchestration', 'Monitoring & Alerting Systems'],
    image: '/portfolio-2.jpg',
    accent: '#00ffcc',
  },
  {
    id: '03',
    title: 'WEBSITE DEVELOPMENT',
    subtitle: 'High-Performance Secure Frontends',
    description:
      'Modern, blazing-fast web applications built with security-first architecture. I specialize in React ecosystems, server-side rendering, and progressive web apps that deliver exceptional user experiences while maintaining ironclad security standards.',
    features: ['React & Next.js Development', 'Secure Authentication Systems', 'Performance Optimization', 'Responsive & Accessible Design', 'SEO-First Architecture'],
    image: '/portfolio-3.jpg',
    accent: '#9eff00',
  },
  {
    id: '04',
    title: 'APPLICATION DEVELOPMENT',
    subtitle: 'Scalable Backend Systems & APIs',
    description:
      'Robust, scalable backend architectures and RESTful/GraphQL APIs. I design database schemas, implement microservices, and build the infrastructure that powers modern applications — all with security, performance, and maintainability at the core.',
    features: ['API Design & Development', 'Database Architecture', 'Microservices Implementation', 'Cloud Infrastructure Setup', 'Real-time Data Processing'],
    image: '/portfolio-4.jpg',
    accent: '#00ffcc',
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
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.reveal-item'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Card animations
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const direction = i % 2 === 0 ? -80 : 80;

        gsap.fromTo(
          card,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-[var(--bg-primary)] py-[10vh] px-[5vw]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20">
          <span className="reveal-item text-[var(--accent)] text-sm tracking-[0.3em] uppercase font-body block">
            // Capabilities
          </span>
          <h2
            className="reveal-item font-display font-bold text-[var(--text-primary)] mt-2"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            SERVICES
          </h2>
          <p className="reveal-item font-body text-[var(--text-secondary)] mt-4 max-w-2xl text-lg">
            Four pillars of technical expertise. Each service is delivered with
            military-grade precision and an obsession for quality.
          </p>
        </div>

        {/* Service Cards */}
        <div className="space-y-32">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative group ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative overflow-hidden border border-[rgba(255,255,255,0.1)]">
                  <img
                    src={service.image}
                    alt={`${service.title} service visualization`}
                    loading="lazy"
                    className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${service.accent}33 0%, transparent 60%)`,
                    }}
                  />
                  {/* Number */}
                  <div
                    className="absolute top-4 left-4 font-display text-6xl font-bold opacity-30"
                    style={{ color: service.accent }}
                  >
                    {service.id}
                  </div>
                </div>
                {/* Glow line */}
                <div
                  className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700"
                  style={{ backgroundColor: service.accent }}
                />
              </div>

              {/* Content */}
              <div className={`space-y-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <span
                    className="text-sm font-mono tracking-wider"
                    style={{ color: service.accent }}
                  >
                    {service.id} / 04
                  </span>
                  <h3
                    className="font-display font-bold text-[var(--text-primary)] mt-2"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="font-body text-sm mt-1 tracking-wide uppercase"
                    style={{ color: service.accent, opacity: 0.7 }}
                  >
                    {service.subtitle}
                  </p>
                </div>

                <p className="font-body text-[var(--text-secondary)] leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div
                        className="w-1.5 h-1.5 flex-shrink-0"
                        style={{ backgroundColor: service.accent }}
                      />
                      <span className="text-[var(--text-secondary)] text-sm">
                        {feature}
                      </span>
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
