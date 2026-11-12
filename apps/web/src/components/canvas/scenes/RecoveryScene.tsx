import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneProps {
  progress: number;
  quality: 'high' | 'low';
  active: boolean;
}

export const RecoveryScene: React.FC<SceneProps> = ({ quality }) => {
  const count = quality === 'high' ? 900 : 400;
  const pointsRef = useRef<THREE.Points>(null);

  // Parametric cat/tiger profile silhouette particles
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      // Body arch and head profile approximation
      const x = (u - 0.5) * 4.2;
      const spine = Math.sin(u * Math.PI) * 1.2 - 0.4;
      const y = spine + (v - 0.5) * 1.1;
      const z = (Math.random() - 0.5) * 0.8;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.2;
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
  });

  return (
    <group position={[0, -0.1, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={quality === 'high' ? 0.07 : 0.1}
          color="#f59e0b" // Warm tiger amber/gold
          transparent
          opacity={0.88}
          sizeAttenuation
        />
      </points>

      <pointLight position={[0, 0, 1.5]} color="#f59e0b" intensity={1.2} />
      <ambientLight intensity={0.4} />
    </group>
  );
};
