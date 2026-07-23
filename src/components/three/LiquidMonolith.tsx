import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Float,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';

interface LiquidMonolithProps {
  position?: [number, number, number];
  scale?: number;
}

type Quality = 'low' | 'high';

function getQuality(): Quality {
  if (typeof window === 'undefined') return 'high';
  // Detect low-end devices: mobile, low memory, or low DPR
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const dpr = window.devicePixelRatio || 1;
  const hasLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory <= 4;
  if (isMobile || dpr <= 1 || hasLowMemory) return 'low';
  return 'high';
}

export default function LiquidMonolith({ position = [0, 0, 0], scale = 1 }: LiquidMonolithProps) {
  const [quality] = useState<Quality>(getQuality);
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  const isLow = quality === 'low';

  useFrame((state, delta) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    }
    if (ring1.current) ring1.current.rotation.z += delta * 0.6;
    if (ring2.current) ring2.current.rotation.x += delta * 0.4;
    if (ring3.current) ring3.current.rotation.y -= delta * 0.5;
    if (innerRef.current) {
      const s = 1 + Math.sin(state.clock.getElapsedTime() * 1.2) * 0.04;
      innerRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={innerRef}>
          {/* Low-end: fewer subdivisions */}
          <icosahedronGeometry args={[1.1, isLow ? 6 : 12]} />
          <MeshDistortMaterial
            color="#06070a"
            emissive="#b6ff3a"
            emissiveIntensity={0.18}
            distort={isLow ? 0.15 : 0.35}
            speed={1.4}
            roughness={0.05}
            metalness={0.95}
          />
        </mesh>
      </Float>

      {/* Skip transmission material on low-end - it's the most expensive effect */}
      {!isLow && (
        <mesh scale={1.45}>
          <icosahedronGeometry args={[1, 6]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={1.2}
            roughness={0.05}
            ior={1.4}
            chromaticAberration={0.08}
            distortion={0.4}
            distortionScale={0.4}
            temporalDistortion={0.1}
            color="#b6ff3a"
            attenuationColor="#79f5d4"
            attenuationDistance={2.4}
          />
        </mesh>
      )}

      {/* Low-end fallback: simpler glass effect */}
      {isLow && (
        <mesh scale={1.45}>
          <icosahedronGeometry args={[1, 3]} />
          <meshPhysicalMaterial
            color="#b6ff3a"
            transparent
            opacity={0.15}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      )}

      <mesh scale={1.8}>
        <icosahedronGeometry args={[1, isLow ? 1 : 2]} />
        <meshBasicMaterial color="#b6ff3a" wireframe transparent opacity={isLow ? 0.1 : 0.18} />
      </mesh>

      {/* Fewer ring segments on low-end */}
      <mesh ref={ring1}>
        <torusGeometry args={[2.6, 0.006, 8, isLow ? 48 : 128]} />
        <meshBasicMaterial color="#b6ff3a" transparent opacity={isLow ? 0.35 : 0.55} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.9, 0.004, 8, isLow ? 48 : 128]} />
        <meshBasicMaterial color="#79f5d4" transparent opacity={isLow ? 0.2 : 0.35} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.003, 8, isLow ? 32 : 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={isLow ? 0.1 : 0.18} />
      </mesh>

      {/* Fewer sparkles on low-end */}
      <Sparkles count={isLow ? 30 : 80} scale={6} size={isLow ? 1 : 2} speed={0.25} opacity={isLow ? 0.3 : 0.6} color="#b6ff3a" />
      {!isLow && <Sparkles count={40} scale={4} size={1.2} speed={0.15} opacity={0.4} color="#79f5d4" />}
    </group>
  );
}
