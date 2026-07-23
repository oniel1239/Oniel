import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Instagram, Linkedin } from 'lucide-react';
import RevealText from '@/components/fx/RevealText';

gsap.registerPlugin(ScrollTrigger);



export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.querySelectorAll('.reveal-item') || [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
      if (formRef.current) {
        gsap.fromTo(formRef.current.querySelectorAll('.form-field'),
          { y: 25, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        );
      }
    }, section);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const name = fd.get('name') as string;
    const email = fd.get('email') as string;
    const service = fd.get('service') as string;
    const message = fd.get('message') as string;
    const subject = encodeURIComponent(`Project Inquiry: ${service}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`);
    window.open(`mailto:oliverkcw199@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="contact" ref={sectionRef} className="relative w-full bg-[#06070a] py-24 sm:py-32 px-6 lg:px-[5vw] overflow-hidden">


      <div className="relative max-w-7xl mx-auto">
        <RevealText className="mb-14 sm:mb-20 max-w-4xl">
          <div ref={headerRef}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-[1px] divider-line" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[rgba(182,255,58,0.5)]">
                // Transmit
              </span>
            </div>
            <h2 className="font-display font-bold text-white text-3xl sm:text-5xl md:text-7xl tracking-[-0.03em] mb-5">
              Let&apos;s build something <span className="font-serif font-light italic text-gradient-accent">remarkable.</span>
            </h2>
            <p className="font-body text-[rgba(220,220,230,0.6)] text-base sm:text-lg max-w-2xl">
              Ready to secure your systems or automate your workflows? Drop a line � I usually respond within 24 hours.
            </p>
          </div>
        </RevealText>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {[
              { icon: Mail, label: 'Email', value: 'oliverkcw199@gmail.com', href: 'mailto:oliverkcw199@gmail.com' },
              { icon: Phone, label: 'Phone', value: '+92 347 3716434', href: 'tel:+923473716434' },
              { icon: MapPin, label: 'Location', value: 'Karachi, Pakistan' },
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-center gap-4 group">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-[rgba(182,255,58,0.12)] group-hover:border-[rgba(182,255,58,0.4)] group-hover:bg-[rgba(182,255,58,0.05)] transition-all duration-300">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[rgba(182,255,58,0.7)]" />
                  </div>
                  <div>
                    <span className="text-[rgba(220,220,230,0.4)] text-[10px] sm:text-xs uppercase tracking-[0.2em] block mb-0.5">{item.label}</span>
                    <span className="text-white/90 text-sm sm:text-base group-hover:text-[#b6ff3a] transition-colors">{item.value}</span>
                  </div>
                </div>
              );
              return item.href ? <a key={item.label} href={item.href}>{content}</a> : <div key={item.label}>{content}</div>;
            })}

            <div className="pt-4">
              <span className="text-[rgba(220,220,230,0.3)] text-[10px] sm:text-xs uppercase tracking-[0.2em] block mb-3">Networks</span>
              <div className="flex gap-2.5 sm:gap-3">
                {[
                  { icon: Github, href: 'https://github.com/oniel1239' },
                  { icon: Instagram, href: 'https://www.instagram.com/onielrobinsamuel/' },
                  { icon: Linkedin, href: '#' },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-[rgba(182,255,58,0.1)] hover:border-[rgba(182,255,58,0.4)] hover:bg-[rgba(182,255,58,0.04)] transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[rgba(220,220,230,0.5)] hover:text-[#b6ff3a]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4 p-5 sm:p-6 rounded-2xl border border-[rgba(182,255,58,0.08)] bg-[rgba(182,255,58,0.02)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-[#b6ff3a] animate-pulse rounded-full" />
                <span className="text-[rgba(182,255,58,0.7)] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase">Status: Operational</span>
              </div>
              <p className="text-[rgba(220,220,230,0.55)] text-xs sm:text-sm">
                Currently accepting new projects. Response time: &lt; 24 hours.
              </p>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="lg:col-span-7 space-y-5 sm:space-y-7 p-6 sm:p-8 md:p-10 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(20,24,32,0.4)] backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map((field) => (
                <div key={field.id} className="form-field">
                  <label htmlFor={field.id} className="text-[rgba(220,220,230,0.4)] text-[10px] sm:text-xs uppercase tracking-[0.2em] block mb-2">{field.label}</label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required
                    autoComplete={field.id === 'email' ? 'email' : 'name'}
                    className="w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.1)] text-white py-2.5 px-0 text-sm sm:text-base focus:outline-none focus:border-[#b6ff3a] transition-colors placeholder:text-[rgba(255,255,255,0.15)]"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>

            <div className="form-field">
              <label htmlFor="service" className="text-[rgba(220,220,230,0.4)] text-[10px] sm:text-xs uppercase tracking-[0.2em] block mb-2">Service Required</label>
              <select
                id="service"
                name="service"
                required
                autoComplete="off"
                className="w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.1)] text-white py-2.5 px-0 text-sm sm:text-base focus:outline-none focus:border-[#b6ff3a] transition-colors appearance-none"
              >
                <option value="" className="bg-[#06070a]">Select a service</option>
                <option value="hacking" className="bg-[#06070a]">Ethical Hacking</option>
                <option value="automation" className="bg-[#06070a]">Workflow Automation</option>
                <option value="webdev" className="bg-[#06070a]">Website Development</option>
                <option value="appdev" className="bg-[#06070a]">Application Development</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="message" className="text-[rgba(220,220,230,0.4)] text-[10px] sm:text-xs uppercase tracking-[0.2em] block mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                autoComplete="off"
                className="w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.1)] text-white py-2.5 px-0 text-sm sm:text-base focus:outline-none focus:border-[#b6ff3a] transition-colors resize-none placeholder:text-[rgba(255,255,255,0.15)]"
                placeholder="Describe your project..."
              />
            </div>

            <div className="form-field pt-3">
              <button
                type="submit"
                className="group relative w-full py-4 sm:py-5 font-display font-medium text-sm sm:text-base rounded-full overflow-hidden bg-[#b6ff3a] text-[#06070a] transition-transform duration-300 hover:scale-[1.01]"
              >
                <div className="absolute inset-0 bg-[#79f5d4] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
