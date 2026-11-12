import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSiteStore } from '../../../store/useSiteStore';

interface SceneProps {
  progress: number;
  quality: 'high' | 'low';
  active: boolean;
}

export const RiversScene: React.FC<SceneProps> = ({ quality }) => {
  const damProgress = useSiteStore((s) => s.riversDamRemovalProgress); // 0 to 100
  const fishCount = quality === 'high' ? 80 : 35;
  const damMeshRef = useRef<THREE.Mesh>(null);
  const fishRef = useRef<THREE.Points>(null);

  // Fish particle positions
  const fishPositions = useMemo(() => {
    const pos = new Float32Array(fishCount * 3);
    for (let i = 0; i < fishCount; i++) {
      pos[i * 3] = -4 + Math.random() * 8;
      pos[i * 3 + 1] = -0.2 + (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, [fishCount]);

  useFrame((state, delta) => {
    // Animate fish movement
    if (fishRef.current) {
      const geo = fishRef.current.geometry;
      const posAttr = geo.attributes.position;
      const damRemovedRatio = damProgress / 100;
      const barrierX = 0;

      for (let i = 0; i < fishCount; i++) {
        let x = posAttr.getX(i);
        // Move towards positive X (upstream)
        x += delta * 1.2;

        // If dam is not removed, fish get blocked at barrierX
        if (damRemovedRatio < 0.95 && x > barrierX - 0.2 && x < barrierX + 0.5) {
          x = -4 + Math.random() * 1.5; // Loop back
        } else if (x > 5) {
          x = -4.5;
        }

        posAttr.setX(i, x);
        posAttr.setY(i, -0.2 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1);
      }
      posAttr.needsUpdate = true;
    }

    // Lower dam based on progress
    if (damMeshRef.current) {
      const damHeight = Math.max(0.01, 1 - damProgress / 100);
      damMeshRef.current.scale.y = damHeight;
      damMeshRef.current.position.y = -0.5 + damHeight * 0.5;
      (damMeshRef.current.material as THREE.MeshStandardMaterial).opacity = damHeight;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Flowing river ribbon */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 3, 32, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.15}
          metalness={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Concrete dam barrier */}
      <mesh ref={damMeshRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.35, 1.2, 3.2]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} transparent opacity={1} />
      </mesh>

      {/* Fish particles */}
      <points ref={fishRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[fishPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#fbbf24" transparent opacity={0.9} />
      </points>

      <directionalLight position={[0, 5, 2]} intensity={1.0} />
      <ambientLight intensity={0.5} />
    </group>
  );
};
