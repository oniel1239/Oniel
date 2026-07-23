import { useRef } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import LiquidMonolith from '@/components/three/LiquidMonolith';
import StarField from '@/components/three/StarField';

function SceneInner() {
  const camRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (camRef.current) {
      camRef.current.rotation.y = state.pointer.x * 0.15;
      camRef.current.rotation.x = -state.pointer.y * 0.08;
    }
    return t;
  });
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 6, 5]} intensity={1.3} color='#ffffff' />
      <pointLight position={[-6, -4, -6]} intensity={0.7} color='#b6ff3a' />
      <pointLight position={[6, 2, 4]} intensity={0.4} color='#79f5d4' />
      <Environment preset='city' />
      <group ref={camRef}>
        <LiquidMonolith position={[0, 0, 0]} scale={1.1} />
      </group>

      <StarField count={800} radius={30} />
      <Sparkles count={60} scale={20} size={1.5} speed={0.2} opacity={0.3} color='#79f5d4' />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneInner />
    </Canvas>
  );
}
