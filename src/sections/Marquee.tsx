import Marquee from '@/components/fx/Marquee';

const items = [
  'Ethical Hacking',
  'Workflow Automation',
  'Web Development',
  'App Development',
  'Cybersecurity',
  'Penetration Testing',
  'CI/CD Pipelines',
  'React',
  'Node.js',
  'Python',
  'Three.js',
  'GSAP',
];

export default function MarqueeSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 bg-[#06070a] border-y border-[rgba(255,255,255,0.04)] overflow-hidden">
      <Marquee speed={50} className="py-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white/15 hover:text-white transition-colors duration-500 tracking-tight">
              {item}
            </span>
            <span className="text-[#b6ff3a]/40 text-3xl sm:text-5xl">?</span>
          </div>
        ))}
      </Marquee>

      <Marquee speed={60} reverse className="py-2 mt-2">
        {items.slice().reverse().map((item, i) => (
          <div key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-[rgba(182,255,58,0.25)] tracking-tight">
              {item}
            </span>
            <span className="text-[#79f5d4]/30 text-2xl sm:text-4xl">?</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
