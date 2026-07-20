import Counter from '@/components/fx/Counter';
import RevealText from '@/components/fx/RevealText';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Shipped' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: ' yrs', label: 'Experience' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

export default function Stats() {
  return (
    <section className="relative w-full bg-[#06070a] py-20 sm:py-28 px-6 lg:px-[5vw]">
      <div className="max-w-7xl mx-auto">
        <RevealText className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-[1px] divider-line" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[rgba(182,255,58,0.5)]">
              // By the numbers
            </span>
          </div>
          <h2 className="font-display font-bold text-white text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] max-w-3xl">
            Crafted with precision, <span className="font-serif font-light italic text-gradient-accent">measured in outcomes.</span>
          </h2>
        </RevealText>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)]">
          {stats.map((s, i) => (
            <RevealText key={i} delay={i * 0.08} className="bg-[#06070a] p-6 sm:p-8 md:p-10 group">
              <div className="flex items-baseline gap-1 mb-2">
                <Counter
                  to={s.value}
                  suffix={s.suffix}
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gradient-accent tracking-tight"
                />
              </div>
              <div className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-[rgba(220,220,230,0.45)]">
                {s.label}
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
