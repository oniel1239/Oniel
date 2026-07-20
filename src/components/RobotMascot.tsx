import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const WHATSAPP_NUMBER = '923473716434';
const WHATSAPP_MESSAGE = encodeURIComponent('Hey Oniel! I found your website and would like to connect.');

// Mascot color - matching site accent green
const MASCOT_COLOR = 0x9eff00;
const MASCOT_GLOW = '#9eff00';

function createFaceScene() {
  const scene = new THREE.Scene();
  const face = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a18,
    metalness: 0.92,
    roughness: 0.12,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: MASCOT_COLOR,
    emissive: MASCOT_COLOR,
    emissiveIntensity: 2.5,
    metalness: 0.2,
    roughness: 0.15,
  });
  const darkGlass = new THREE.MeshStandardMaterial({
    color: 0x050510,
    metalness: 0.85,
    roughness: 0.05,
    transparent: true,
    opacity: 0.9,
  });

  // Oval head
  const headGeo = new THREE.CapsuleGeometry(0.45, 0.9, 20, 32);
  const head = new THREE.Mesh(headGeo, bodyMat.clone());
  head.rotation.z = Math.PI / 2;
  head.scale.set(1, 0.75, 0.65);
  face.add(head);

  // Visor
  const visorGeo = new THREE.BoxGeometry(1.2, 0.28, 0.08);
  const visor = new THREE.Mesh(visorGeo, darkGlass);
  visor.position.set(0, 0.02, 0.35);
  face.add(visor);

  // Eyes
  const eyeMat = accentMat.clone();
  eyeMat.emissiveIntensity = 3;

  const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.1, 0.02), eyeMat.clone());
  leftEye.position.set(-0.22, 0, 0.05);
  visor.add(leftEye);

  const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.1, 0.02), eyeMat.clone());
  rightEye.position.set(0.22, 0, 0.05);
  visor.add(rightEye);

  // Pupils
  const dotMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: MASCOT_COLOR, emissiveIntensity: 4 });
  const leftDot = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), dotMat);
  leftDot.position.set(0, 0, 0.02);
  leftEye.add(leftDot);
  const rightDot = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), dotMat.clone());
  rightDot.position.set(0, 0, 0.02);
  rightEye.add(rightDot);

  // Mouth
  const mouthShape = new THREE.Shape();
  mouthShape.moveTo(-0.15, 0);
  mouthShape.quadraticCurveTo(0, -0.06, 0.15, 0);
  const mouthMat = new THREE.MeshStandardMaterial({ color: MASCOT_COLOR, emissive: MASCOT_COLOR, emissiveIntensity: 1.2, side: THREE.DoubleSide });
  const mouth = new THREE.Mesh(new THREE.ShapeGeometry(mouthShape), mouthMat);
  mouth.position.set(0, -0.12, 0.4);
  face.add(mouth);

  // Antenna
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.015, 0.3, 6), bodyMat.clone());
  stick.position.set(0, 0.45, 0);
  face.add(stick);

  const tip = new THREE.Mesh(new THREE.OctahedronGeometry(0.05, 0), accentMat.clone());
  tip.position.set(0, 0.65, 0);
  face.add(tip);

  // Ear nubs
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.12, 8), bodyMat.clone());
    ear.position.set(side * 0.65, 0.05, 0);
    ear.rotation.z = side * 0.3;
    face.add(ear);

    const ringMat = accentMat.clone();
    ringMat.emissiveIntensity = 1.5;
    ringMat.opacity = 0.7;
    ringMat.transparent = true;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.008, 8, 16), ringMat);
    ring.position.set(side * 0.65, 0.05, 0.08);
    face.add(ring);
  }

  scene.add(face);
  return { scene, face, visor, leftEye, rightEye, leftDot, rightDot, tip, mouth };
}

export default function RobotMascot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isBeaming, setIsBeaming] = useState(false);
  const blinkTimerRef = useRef(0);

  const handleWhatsApp = useCallback(() => {
    setIsBeaming(true);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank');
      setTimeout(() => setIsBeaming(false), 800);
    }, 400);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(130, 100);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(32, 130 / 100, 0.1, 100);
    camera.position.set(0, 0.05, 3.2);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0x223344, 0.7));

    const key = new THREE.DirectionalLight(0xffffff, 2);
    key.position.set(2, 4, 4);
    scene.add(key);

    const fill = new THREE.DirectionalLight(MASCOT_COLOR, 0.4);
    fill.position.set(-3, 1, 2);
    scene.add(fill);

    const rim = new THREE.PointLight(0x00ffcc, 0.6, 6);
    rim.position.set(0, -1, -2);
    scene.add(rim);

    const faceData = createFaceScene();
    scene.add(faceData.scene);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouse);

    let time = 0;
    const animate = () => {
      time += 0.016;
      rafRef.current = requestAnimationFrame(animate);

      faceData.face.position.y = Math.sin(time * 1.6) * 0.06;
      faceData.face.rotation.z = Math.sin(time * 1.1) * 0.04;

      faceData.face.rotation.y += (mouseRef.current.x * 0.2 - faceData.face.rotation.y) * 0.05;
      faceData.face.rotation.x += (-mouseRef.current.y * 0.12 - faceData.face.rotation.x) * 0.05;

      const px = mouseRef.current.x * 0.04;
      const py = mouseRef.current.y * 0.03;
      faceData.leftDot.position.x = px;
      faceData.leftDot.position.y = py;
      faceData.rightDot.position.x = px;
      faceData.rightDot.position.y = py;

      faceData.tip.rotation.y = time * 2.5;
      faceData.tip.rotation.x = Math.sin(time * 3) * 0.3;
      const ts = 1 + Math.sin(time * 4) * 0.25;
      faceData.tip.scale.set(ts, ts, ts);

      blinkTimerRef.current += 0.016;
      if (blinkTimerRef.current > 2 + Math.random() * 3.5) {
        blinkTimerRef.current = 0;
        gsap.to(faceData.leftEye.scale, { y: 0.05, duration: 0.04, yoyo: true, repeat: 1, ease: 'power2.inOut' });
        gsap.to(faceData.rightEye.scale, { y: 0.05, duration: 0.04, yoyo: true, repeat: 1, ease: 'power2.inOut' });
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouse);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTooltip(true), 3500);
    const t2 = setTimeout(() => setShowTooltip(false), 9000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="fixed z-[9998] pointer-events-auto"
      style={{ right: 'clamp(14px, 2vw, 28px)', bottom: 'clamp(14px, 2vw, 28px)' }}
    >
      {isBeaming && (
        <div className="absolute inset-0 z-10 pointer-events-none rounded-full"
          style={{
            background: `radial-gradient(circle, ${MASCOT_GLOW}99 0%, ${MASCOT_GLOW}40 45%, transparent 70%)`,
            animation: 'mascotBeam 0.4s ease-out forwards',
          }}
        />
      )}

      {showTooltip && !isBeaming && (
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 text-[10px] sm:text-[11px] font-mono
          bg-[rgba(2,8,16,0.9)] border border-[rgba(158,255,0,0.2)] text-[#9eff00]
          backdrop-blur-md z-20 pointer-events-none rounded-sm"
          style={{ animation: 'mascotTip 0.3s ease-out', boxShadow: '0 0 15px rgba(158,255,0,0.08)' }}>
          Let&apos;s chat!
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45
            bg-[rgba(2,8,16,0.9)] border-r border-b border-[rgba(158,255,0,0.2)]" />
        </div>
      )}

      <div
        ref={containerRef}
        className={`cursor-pointer transition-all duration-500 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
        style={{
          width: 'clamp(90px, 11vw, 130px)',
          height: 'clamp(70px, 9vw, 100px)',
          filter: isHovered
            ? 'drop-shadow(0 0 20px rgba(158,255,0,0.45)) drop-shadow(0 0 45px rgba(158,255,0,0.15))'
            : 'drop-shadow(0 0 8px rgba(158,255,0,0.2))',
        }}
        onClick={handleWhatsApp}
        onMouseEnter={() => { setIsHovered(true); setShowTooltip(false); }}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="Open WhatsApp chat with Oniel"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleWhatsApp(); } }}
      />

      <style>{`
        @keyframes mascotBeam {
          0% { transform: scale(0.4); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes mascotTip {
          0% { opacity: 0; transform: translateX(-50%) translateY(5px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
