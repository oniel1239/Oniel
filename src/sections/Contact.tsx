import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Instagram, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.querySelectorAll('.reveal-item'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll('.form-field'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const service = formData.get('service') as string;
    const message = formData.get('message') as string;

    const subject = encodeURIComponent(`Project Inquiry: ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:oliverkcw199@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--bg-primary)] py-[10vh] px-[5vw]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="reveal-item text-[var(--accent)] text-sm tracking-[0.3em] uppercase font-body block">
            // Transmit
          </span>
          <h2
            className="reveal-item font-display font-bold text-[var(--text-primary)] mt-2"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            CONTACT
          </h2>
          <p className="reveal-item font-body text-[var(--text-secondary)] mt-4 max-w-2xl text-lg">
            Ready to secure your systems or automate your workflows?
            Transmit your request and I will respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <a
                href="mailto:oliverkcw199@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 border border-[rgba(158,255,0,0.2)] flex items-center justify-center group-hover:border-[var(--accent)] group-hover:bg-[rgba(158,255,0,0.1)] transition-all">
                  <Mail className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <span className="text-[var(--text-secondary)] text-xs uppercase tracking-wider block">
                    Email
                  </span>
                  <span className="text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    oliverkcw199@gmail.com
                  </span>
                </div>
              </a>

              <a href="tel:+923473716434" className="flex items-center gap-4 group">
                <div className="w-12 h-12 border border-[rgba(158,255,0,0.2)] flex items-center justify-center group-hover:border-[var(--accent)] group-hover:bg-[rgba(158,255,0,0.1)] transition-all">
                  <Phone className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <span className="text-[var(--text-secondary)] text-xs uppercase tracking-wider block">
                    Phone
                  </span>
                  <span className="text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    +92 347 3716434
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-[rgba(158,255,0,0.2)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <span className="text-[var(--text-secondary)] text-xs uppercase tracking-wider block">
                    Location
                  </span>
                  <span className="text-[var(--text-primary)]">
                    Karachi, Pakistan
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <span className="text-[var(--text-secondary)] text-xs uppercase tracking-wider block mb-4">
                Networks
              </span>
              <div className="flex gap-4">
                <a
                  href="https://github.com/oniel1239"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-[rgba(158,255,0,0.2)] flex items-center justify-center hover:border-[var(--accent)] hover:bg-[rgba(158,255,0,0.1)] transition-all"
                >
                  <Github className="w-5 h-5 text-[var(--text-secondary)] hover:text-[var(--accent)]" />
                </a>
                <a
                  href="https://www.instagram.com/onielrobinsamuel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-[rgba(158,255,0,0.2)] flex items-center justify-center hover:border-[var(--accent)] hover:bg-[rgba(158,255,0,0.1)] transition-all"
                >
                  <Instagram className="w-5 h-5 text-[var(--text-secondary)] hover:text-[var(--accent)]" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 border border-[rgba(158,255,0,0.2)] flex items-center justify-center hover:border-[var(--accent)] hover:bg-[rgba(158,255,0,0.1)] transition-all"
                >
                  <Linkedin className="w-5 h-5 text-[var(--text-secondary)] hover:text-[var(--accent)]" />
                </a>
              </div>
            </div>

            {/* Status */}
            <div className="pt-8 p-6 border border-[rgba(158,255,0,0.1)] bg-[rgba(158,255,0,0.02)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-[var(--accent)] animate-pulse" />
                <span className="text-[var(--accent)] font-mono text-sm">
                  STATUS: OPERATIONAL
                </span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm">
                Currently accepting new projects. Response time: &lt; 24 hours.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="form-field">
              <label htmlFor="name" className="text-[var(--text-secondary)] text-xs uppercase tracking-wider block mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full bg-transparent border-0 border-b border-[var(--text-secondary)] text-[var(--text-primary)] py-3 px-0 focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[rgba(255,255,255,0.2)]"
                placeholder="Your name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="text-[var(--text-secondary)] text-xs uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-transparent border-0 border-b border-[var(--text-secondary)] text-[var(--text-primary)] py-3 px-0 focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[rgba(255,255,255,0.2)]"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-field">
              <label htmlFor="service" className="text-[var(--text-secondary)] text-xs uppercase tracking-wider block mb-2">
                Service Required
              </label>
              <select
                id="service"
                name="service"
                required
                className="w-full bg-transparent border-0 border-b border-[var(--text-secondary)] text-[var(--text-primary)] py-3 px-0 focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none"
              >
                <option value="" className="bg-[var(--bg-primary)]">
                  Select a service
                </option>
                <option value="hacking" className="bg-[var(--bg-primary)]">
                  Ethical Hacking
                </option>
                <option value="automation" className="bg-[var(--bg-primary)]">
                  Workflow Automation
                </option>
                <option value="webdev" className="bg-[var(--bg-primary)]">
                  Website Development
                </option>
                <option value="appdev" className="bg-[var(--bg-primary)]">
                  Application Development
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="message" className="text-[var(--text-secondary)] text-xs uppercase tracking-wider block mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full bg-transparent border-0 border-b border-[var(--text-secondary)] text-[var(--text-primary)] py-3 px-0 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none placeholder:text-[rgba(255,255,255,0.2)]"
                placeholder="Describe your project..."
              />
            </div>

            {/* Submit Button */}
            <div className="form-field pt-4">
              <button
                type="submit"
                className="group relative w-full py-4 font-display font-bold text-sm tracking-[0.2em] uppercase overflow-hidden border border-[var(--accent)] text-[var(--accent)] transition-all duration-500 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)]"
              >
                <span className="relative z-10">CONTACT ME</span>
                <div className="absolute inset-0 bg-[var(--accent)] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
