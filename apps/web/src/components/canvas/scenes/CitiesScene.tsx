import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneProps {
  progress: number;
  quality: 'high' | 'low';
  active: boolean;
}

export const CitiesScene: React.FC<SceneProps> = ({ quality }) => {
  const groupRef = useRef<THREE.Group>(null);
  const buildingCount = quality === 'high' ? 14 : 8;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.03;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      {Array.from({ length: buildingCount }).map((_, idx) => {
        const angle = (idx / buildingCount) * Math.PI * 2;
        const radius = 1.6 + (idx % 3) * 0.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = 1.2 + (idx % 5) * 0.5;

        return (
          <group key={idx} position={[x, height / 2, z]}>
            {/* Architectural building block */}
            <mesh>
              <boxGeometry args={[0.5, height, 0.5]} />
              <meshStandardMaterial color="#64748b" roughness={0.7} metalness={0.2} />
            </mesh>

            {/* Living green roof terrace */}
            <mesh position={[0, height / 2 + 0.04, 0]}>
              <boxGeometry args={[0.48, 0.08, 0.48]} />
              <meshStandardMaterial
                color="#9CAF88" // Sage green
                roughness={0.9}
              />
            </mesh>
          </group>
        );
      })}

      {/* Central urban park green space */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 24]} />
        <meshStandardMaterial color="#9CAF88" roughness={0.8} />
      </mesh>

      <directionalLight position={[4, 6, 4]} intensity={1.0} />
      <ambientLight intensity={0.5} />
    </group>
  );
};
