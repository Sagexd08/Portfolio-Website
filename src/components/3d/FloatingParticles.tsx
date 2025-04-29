import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

const FloatingParticles = ({
  count = 100,
  color = '#88ccff',
  size = 0.015,
  speed = 0.1
}: FloatingParticlesProps) => {
  const points = useRef<THREE.Points>(null);

  // Generate random positions for particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, [count]);

  // Animate particles
  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * speed * 0.15;
      points.current.rotation.y += delta * speed * 0.1;
    }
  });

  return (
    <group>
      <Points ref={points} positions={particlesPosition} stride={3}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default FloatingParticles;