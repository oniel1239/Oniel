import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const textRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!section || !image || !text) return;

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        image,
        { opacity: 0, scale: 0.9, x: -50 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Text lines reveal
      const textElements = text.querySelectorAll('.reveal-line');
      gsap.fromTo(
        textElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Skill bars
      skillRefs.current.forEach((skillEl, i) => {
        if (!skillEl) return;
        const bar = skillEl.querySelector('.skill-bar-fill') as HTMLElement;
        const target = skills[i].level;
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${target}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: skillEl,
              start: 'top 85%',
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
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--bg-primary)] py-[10vh] px-[5vw]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span className="text-[var(--accent)] text-sm tracking-[0.3em] uppercase font-body">
            // Identity
          </span>
          <h2
            className="font-display font-bold text-[var(--text-primary)] mt-2"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            THE ARCHITECT
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden border-2 border-[var(--accent)]">
              <img
                src="/profile.jpg"
                alt="Portrait of Oniel Robin Samuel, Systems Architect"
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(158,255,0,0.03) 2px, rgba(158,255,0,0.03) 4px)',
                }}
              />
            </div>
            {/* Corner accents */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[var(--accent)]" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[var(--accent)]" />
          </div>

          {/* Bio Content */}
          <div ref={textRef} className="space-y-6">
            <h3 className="reveal-line font-display text-2xl font-bold text-[var(--accent)]">
              Oniel Robin Samuel
            </h3>

            <p className="reveal-line font-body text-[var(--text-secondary)] leading-relaxed text-lg">
              A multidisciplinary systems architect specializing in ethical hacking,
              workflow automation, and full-stack development. With a deep-rooted
              passion for cybersecurity and a methodical approach to problem-solving,
              I build secure, scalable digital ecosystems that stand the test of time.
            </p>

            <p className="reveal-line font-body text-[var(--text-secondary)] leading-relaxed">
              My expertise spans penetration testing, custom automation pipelines,
              high-performance web applications, and robust backend architectures.
              I operate at the intersection of security and innovation — ensuring every
              system I touch is not only functional but fortified against emerging threats.
            </p>

            {/* Location & Availability */}
            <div className="reveal-line flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--accent)] animate-pulse" />
                <span className="text-[var(--text-secondary)] text-sm">
                  Karachi, Pakistan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--accent-secondary)] animate-pulse" />
                <span className="text-[var(--text-secondary)] text-sm">
                  Available for projects
                </span>
              </div>
            </div>

            {/* Skills */}
            <div className="reveal-line pt-6 space-y-4">
              <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[var(--text-secondary)]">
                Core Competencies
              </h4>
              {skills.map((skill, i) => (
                <div
                  key={skill.name}
                  ref={(el) => {
                    if (el) skillRefs.current[i] = el;
                  }}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-[var(--text-primary)] text-sm font-medium">
                      {skill.name}
                    </span>
                    <span className="text-[var(--accent)] text-sm font-mono">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-[rgba(255,255,255,0.05)]">
                    <div
                      className="skill-bar-fill h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
                      style={{ width: '0%' }}
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
