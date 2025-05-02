import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingAccentProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color: string;
  shape: 'box' | 'sphere' | 'tetrahedron' | 'octahedron' | 'torus';
  speed?: number;
}

const FloatingAccent: React.FC<FloatingAccentProps> = ({ 
  position, 
  rotation = [0, 0, 0], 
  scale = 1, 
  color, 
  shape,
  speed = 1
}) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.003 * speed;
      mesh.current.rotation.y += 0.002 * speed;
      
      // Add subtle floating movement
      mesh.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.003 * speed;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
        {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {shape === 'sphere' && <sphereGeometry args={[0.5, 16, 16]} />}
        {shape === 'tetrahedron' && <tetrahedronGeometry args={[0.6, 0]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[0.5, 0]} />}
        {shape === 'torus' && <torusGeometry args={[0.4, 0.15, 16, 32]} />}
        <meshStandardMaterial 
          color={color} 
          metalness={0.6} 
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

interface ThreeCardDecorationProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const ThreeCardDecoration: React.FC<ThreeCardDecorationProps> = ({ 
  className,
  position = 'top-right'
}) => {
  // Define positions based on the corner
  const getElements = () => {
    switch (position) {
      case 'top-left':
        return (
          <>
            <FloatingAccent position={[-1, 1, 0]} color="#7980fe" shape="tetrahedron" scale={0.2} />
            <FloatingAccent position={[-0.7, 0.7, -0.5]} color="#9A70FF" shape="sphere" scale={0.1} speed={1.5} />
          </>
        );
      case 'top-right':
        return (
          <>
            <FloatingAccent position={[1, 1, 0]} color="#838aff" shape="octahedron" scale={0.15} speed={0.8} />
            <FloatingAccent position={[0.7, 0.7, -0.5]} color="#7980fe" shape="box" scale={0.12} />
          </>
        );
      case 'bottom-left':
        return (
          <>
            <FloatingAccent position={[-1, -1, 0]} color="#9A70FF" shape="torus" scale={0.15} speed={1.2} />
            <FloatingAccent position={[-0.7, -0.7, -0.5]} color="#7980fe" shape="sphere" scale={0.08} speed={0.7} />
          </>
        );
      case 'bottom-right':
        return (
          <>
            <FloatingAccent position={[1, -1, 0]} color="#838aff" shape="tetrahedron" scale={0.18} />
            <FloatingAccent position={[0.7, -0.7, -0.5]} color="#9A70FF" shape="box" scale={0.1} speed={1.3} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`absolute w-16 h-16 ${className}`} style={{ pointerEvents: 'none' }}>
      <Canvas>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        {getElements()}
      </Canvas>
    </div>
  );
};

export default ThreeCardDecoration;
