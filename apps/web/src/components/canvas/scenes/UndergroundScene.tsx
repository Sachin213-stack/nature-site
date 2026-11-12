import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSiteStore } from '../../../store/useSiteStore';

interface SceneProps {
  progress: number;
  quality: 'high' | 'low';
  active: boolean;
}

export const UndergroundScene: React.FC<SceneProps> = ({ quality }) => {
  const selectedNode = useSiteStore((s) => s.undergroundSelectedNode);
  const setSelectedNode = useSiteStore((s) => s.setUndergroundSelectedNode);
  const groupRef = useRef<THREE.Group>(null);

  // Generate mycorrhizal network node points and connecting line segments
  const { nodePositions, linePositions } = useMemo(() => {
    const nodeCount = quality === 'high' ? 18 : 10;
    const nodes: [number, number, number][] = [];
    const conns: [number, number][] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 1.0 + Math.random() * 3.0;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.5;
      nodes.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius]);
    }

    // Connect close neighbors
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.5) {
          conns.push([i, j]);
        }
      }
    }

    const lines = new Float32Array(conns.length * 6);
    conns.forEach(([a, b], idx) => {
      lines[idx * 6] = nodes[a][0];
      lines[idx * 6 + 1] = nodes[a][1];
      lines[idx * 6 + 2] = nodes[a][2];
      lines[idx * 6 + 3] = nodes[b][0];
      lines[idx * 6 + 4] = nodes[b][1];
      lines[idx * 6 + 5] = nodes[b][2];
    });

    return { nodePositions: nodes, linePositions: lines, connections: conns };
  }, [quality]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.04;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Network lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={selectedNode !== null ? '#e8412c' : '#9CAF88'}
          transparent
          opacity={0.65}
          linewidth={1}
        />
      </lineSegments>

      {/* Nodes */}
      {nodePositions.map((pos, idx) => {
        const isSelected = selectedNode === idx;
        return (
          <mesh
            key={idx}
            position={pos}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNode(isSelected ? null : idx);
            }}
          >
            <sphereGeometry args={[isSelected ? 0.15 : 0.08, 16, 16]} />
            <meshStandardMaterial
              color={isSelected ? '#E8412C' : '#9CAF88'}
              emissive={isSelected ? '#E8412C' : '#4a5b3a'}
              emissiveIntensity={isSelected ? 0.8 : 0.3}
              roughness={0.2}
            />
          </mesh>
        );
      })}

      <pointLight position={[0, 0, 0]} color="#9CAF88" intensity={0.8} />
    </group>
  );
};
