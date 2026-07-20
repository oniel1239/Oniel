import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import RobotMascot from './components/RobotMascot';

import Footer from './components/Footer';
import Hero from './sections/Hero';
import MarqueeSection from './sections/Marquee';
import About from './sections/About';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Stats from './sections/Stats';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-[#06070a]">
      {/* UI overlays */}
      <CustomCursor />
      <Navigation />
      <RobotMascot />

      <main>
        <Hero />
        <MarqueeSection />
        <About />
        <Services />
        <Stats />
        <Portfolio />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
