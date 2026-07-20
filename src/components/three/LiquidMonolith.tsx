import { useRef } from 'react';
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

export default function LiquidMonolith({ position = [0, 0, 0], scale = 1 }: LiquidMonolithProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

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
          <icosahedronGeometry args={[1.1, 16]} />
          <MeshDistortMaterial
            color="#06070a"
            emissive="#b6ff3a"
            emissiveIntensity={0.18}
            distort={0.35}
            speed={1.4}
            roughness={0.05}
            metalness={0.95}
          />
        </mesh>
      </Float>

      <mesh scale={1.45}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
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

      <mesh scale={1.8}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#b6ff3a" wireframe transparent opacity={0.18} />
      </mesh>

      <mesh ref={ring1}>
        <torusGeometry args={[2.6, 0.006, 8, 200]} />
        <meshBasicMaterial color="#b6ff3a" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.9, 0.004, 8, 200]} />
        <meshBasicMaterial color="#79f5d4" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.003, 8, 200]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>

      <Sparkles count={120} scale={6} size={2} speed={0.25} opacity={0.6} color="#b6ff3a" />
      <Sparkles count={60} scale={4} size={1.2} speed={0.15} opacity={0.4} color="#79f5d4" />
    </group>
  );
}
