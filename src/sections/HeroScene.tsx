import { useRef } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
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
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[-3.5, 1.5, -2]}>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial color='#b6ff3a' wireframe />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[3.8, -1, -1.5]}>
          <torusGeometry args={[0.25, 0.05, 8, 32]} />
          <meshStandardMaterial color='#b6ff3a' emissive='#b6ff3a' emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
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
