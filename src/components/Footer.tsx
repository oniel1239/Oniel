export default function Footer() {
  return (
    <footer className="relative w-full bg-[#06070a] border-t border-[rgba(255,255,255,0.04)] py-10 sm:py-14 px-6 lg:px-[5vw] overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(182,255,58,0.15) 30%, rgba(121,245,212,0.1) 70%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[60vw] max-w-[600px] h-[200px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(182,255,58,0.18) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-white text-lg sm:text-xl tracking-tight">
            ONIEL<span className="text-[#b6ff3a]">.</span>
          </span>
          <span className="text-[rgba(220,220,230,0.4)] text-[10px] sm:text-xs font-mono">
            Systems Architect
          </span>
        </div>

        <div className="text-[rgba(220,220,230,0.25)] text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase">
          &lt;/&gt; Crafted with precision &amp; purpose
        </div>

        <div className="text-[rgba(220,220,230,0.3)] text-[10px] sm:text-xs">
          &copy; {new Date().getFullYear()} Oniel Robin Samuel
        </div>
      </div>
    </footer>
  );
}
