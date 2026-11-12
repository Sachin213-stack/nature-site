import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSiteStore } from '../../../store/useSiteStore';

interface SceneProps {
  progress: number;
  quality: 'high' | 'low';
  active: boolean;
}

export const FoodScene: React.FC<SceneProps> = ({ quality }) => {
  const isNatureFriendly = useSiteStore((s) => s.foodRegenerativeMode);
  const groupRef = useRef<THREE.Group>(null);
  const gridSize = quality === 'high' ? 6 : 4;

  const currentLerp = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const target = isNatureFriendly ? 1 : 0;
    currentLerp.current = THREE.MathUtils.lerp(currentLerp.current, target, delta * 3);

    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    groupRef.current.rotation.x = 0.5 + Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {Array.from({ length: gridSize }).map((_, r) =>
        Array.from({ length: gridSize }).map((_, c) => {
          const x = (c - gridSize / 2 + 0.5) * 0.9;
          const z = (r - gridSize / 2 + 0.5) * 0.9;
          const isEven = (r + c) % 2 === 0;

          // Color morphs from monoculture tan/brown to regenerative mosaic green
          const baseColor = isNatureFriendly
            ? isEven
              ? '#9CAF88'
              : '#658055'
            : isEven
              ? '#c2b280'
              : '#a89f78';

          return (
            <mesh key={`${r}-${c}`} position={[x, 0, z]}>
              <boxGeometry args={[0.82, 0.25, 0.82]} />
              <meshStandardMaterial color={baseColor} roughness={0.8} metalness={0.1} />
            </mesh>
          );
        })
      )}
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <ambientLight intensity={0.5} />
    </group>
  );
};
