export default function Footer() {
  return (
    <footer className="relative w-full bg-[var(--bg-primary)] border-t border-[rgba(255,255,255,0.05)] py-8 px-[5vw]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-[var(--text-primary)] text-lg">
            ONIEL<span className="text-[var(--accent)]">.</span>
          </span>
          <span className="text-[var(--text-secondary)] text-sm">
            Systems Architect
          </span>
        </div>

        <div className="text-[var(--text-secondary)] text-xs font-mono tracking-wider">
          &lt;/&gt; WITH PRECISION &amp; PURPOSE
        </div>

        <div className="text-[var(--text-secondary)] text-xs">
          &copy; {new Date().getFullYear()} Oniel Robin Samuel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
