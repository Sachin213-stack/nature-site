import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneProps {
  progress: number;
  quality: 'high' | 'low';
  active: boolean;
}

export const LossScene: React.FC<SceneProps> = ({ progress, quality }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = quality === 'high' ? 800 : 350;

  // Particle positions for 3 clusters: Freshwater, Terrestrial, Marine
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const clusterColors = [
      new THREE.Color('#38bdf8'), // Freshwater cyan
      new THREE.Color('#9CAF88'), // Terrestrial Sage
      new THREE.Color('#3b82f6'), // Marine deep blue
    ];

    for (let i = 0; i < count; i++) {
      const cluster = i % 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 2.5;
      const height = (Math.random() - 0.5) * 3;

      // Center of cluster
      const cx = (cluster - 1) * 3.2;
      const cy = Math.sin(cluster * 2) * 0.8;
      const cz = (Math.random() - 0.5) * 2;

      pos[i * 3] = cx + Math.cos(angle) * radius;
      pos[i * 3 + 1] = cy + height;
      pos[i * 3 + 2] = cz + Math.sin(angle) * radius;

      const c = clusterColors[cluster];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    // Gentle natural drift, shrinking average density rather than vanishing
    const shrinkFactor = 1 - Math.min(progress, 1) * 0.45;
    pointsRef.current.scale.set(shrinkFactor, shrinkFactor, shrinkFactor);
    pointsRef.current.rotation.y += delta * 0.08;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <group position={[0, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={quality === 'high' ? 0.06 : 0.09}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
      {/* Ambient cluster glows */}
      <pointLight position={[-3, 1, 1]} color="#38bdf8" intensity={0.4} />
      <pointLight position={[0, 0, 1]} color="#9CAF88" intensity={0.6} />
      <pointLight position={[3, -1, 1]} color="#3b82f6" intensity={0.4} />
    </group>
  );
};
