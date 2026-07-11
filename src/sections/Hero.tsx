import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, Sphere, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Particle Field for background depth
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const isAccent = Math.random() > 0.8;
      color.set(isAccent ? '#9eff00' : '#ffffff');
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.05;
      ref.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial transparent vertexColors size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </Points>
  );
}

// A highly dynamic, high-tech core element
function TechCore() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Rotate entire group
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = t * 0.1;
      
      // Interactive parallax based on pointer
      gsap.to(groupRef.current.position, {
        x: pointer.x * 2,
        y: pointer.y * 2,
        duration: 2,
        ease: "power2.out"
      });
      gsap.to(groupRef.current.rotation, {
        x: pointer.y * 0.5 + t * 0.1,
        y: pointer.x * 0.5 + t * 0.2,
        duration: 2,
        ease: "power2.out"
      });
    }
    
    if (coreRef.current) {
      // Pulsing effect
      const scale = 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        {/* Inner Glowing Core */}
        <Sphere ref={coreRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial 
            color="#030712" 
            emissive="#9eff00" 
            emissiveIntensity={0.2}
            distort={0.4} 
            speed={2} 
            roughness={0.2} 
            metalness={0.8}
            wireframe={true}
          />
        </Sphere>

        {/* Outer Orbiting Rings */}
        <mesh>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#9eff00" transparent opacity={0.3} />
        </mesh>
        
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.01, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>

        <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
          <torusGeometry args={[2, 0.03, 16, 100]} />
          <meshBasicMaterial color="#00ffcc" transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

// 3D Scene setup
function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#9eff00" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffcc" />
      
      <TechCore />
      <ParticleField />
      <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#9eff00" />
    </>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const role1Ref = useRef<HTMLSpanElement>(null);
  const role2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Initial reveal animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(titleRef.current, 
        { y: 100, opacity: 0, filter: 'blur(10px)' }, 
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out', delay: 0.5 }
      )
      .fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=1"
      )
      .fromTo([role1Ref.current, role2Ref.current],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.5)' },
        "-=0.5"
      );
      
      // Glitch effect loop
      gsap.to(titleRef.current, {
        textShadow: "0px 0px 20px rgba(158,255,0,0.8)",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Scroll fade and blur effect
  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / window.innerHeight, 1);
      textEl.style.opacity = String(1 - progress * 1.5); // Fades out faster
      textEl.style.transform = `translateY(${progress * 150}px)`;
      textEl.style.filter = `blur(${progress * 15}px)`;
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-primary-dark">
      {/* 3D Environment Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Scene />
        </Canvas>
      </div>

      {/* Futuristic Overlay Gradients */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#030712] opacity-80" />
      <div className="absolute inset-0 z-[5] pointer-events-none radial-gradient-mask" 
        style={{ background: 'radial-gradient(circle at center, transparent 0%, #030712 100%)', opacity: 0.7 }} />

      {/* Hero Content */}
      <div
        ref={textRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4"
      >
        <div className="relative group" style={{ perspective: '1000px' }}>
          <h1
            ref={titleRef}
            className="font-display font-bold text-transparent bg-clip-text bg-white text-center leading-none tracking-tighter"
            style={{ 
              fontSize: 'clamp(4rem, 12vw, 12rem)',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)',
            }}
          >
            ONIEL<span className="text-accent drop-shadow-[0_0_15px_rgba(158,255,0,0.8)]">.</span>
          </h1>
        </div>

        <p ref={subtitleRef} className="mt-6 flex flex-wrap justify-center items-center gap-4 text-sm md:text-base font-body tracking-[0.4em] uppercase text-center text-text-secondary">
          <span ref={role1Ref} className="px-4 py-1 border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm text-text-primary shadow-[0_0_15px_rgba(158,255,0,0.1)]">
            Systems Architect
          </span>
          <span className="hidden md:inline text-accent/50">/</span>
          <span ref={role2Ref} className="px-4 py-1 border border-[#00ffcc]/30 rounded-full bg-[#00ffcc]/5 backdrop-blur-sm text-text-primary shadow-[0_0_15px_rgba(0,255,204,0.1)]">
            Security &amp; Automation
          </span>
        </p>
        
        {/* High-tech decorative elements */}
        <div className="absolute top-[20%] left-[10%] hidden lg:flex flex-col gap-2 opacity-30">
          <div className="w-12 h-[1px] bg-accent"></div>
          <div className="text-[10px] font-mono tracking-widest text-accent">SYS.ONL.01</div>
        </div>
        
        <div className="absolute bottom-[25%] right-[10%] hidden lg:flex flex-col items-end gap-2 opacity-30">
          <div className="text-[10px] font-mono tracking-widest text-accent">STATUS: ONLINE</div>
          <div className="w-12 h-[1px] bg-accent"></div>
        </div>


      </div>
    </section>
  );
}
