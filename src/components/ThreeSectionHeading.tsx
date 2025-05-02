import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingParticleProps {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}

const FloatingParticle: React.FC<FloatingParticleProps> = ({ 
  position, 
  color, 
  size = 0.15,
  speed = 1
}) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      // Add subtle floating movement
      mesh.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002 * speed;
      mesh.current.position.x += Math.cos(state.clock.elapsedTime * 0.3) * 0.001 * speed;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

interface ThreeSectionHeadingProps {
  className?: string;
}

const ThreeSectionHeading: React.FC<ThreeSectionHeadingProps> = ({ className }) => {
  return (
    <div className={`absolute w-full h-24 -z-10 ${className}`} style={{ pointerEvents: 'none' }}>
      <Canvas>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        {/* Particles around the heading */}
        <FloatingParticle position={[-2, 0, 0]} color="#7980fe" size={0.1} speed={1.2} />
        <FloatingParticle position={[-1.5, 0.5, 0]} color="#9A70FF" size={0.08} speed={0.8} />
        <FloatingParticle position={[-1, -0.5, 0]} color="#838aff" size={0.12} speed={1.0} />
        <FloatingParticle position={[0, 0.7, 0]} color="#7980fe" size={0.15} speed={0.9} />
        <FloatingParticle position={[0.5, -0.3, 0]} color="#9A70FF" size={0.07} speed={1.3} />
        <FloatingParticle position={[1, 0.2, 0]} color="#838aff" size={0.1} speed={1.1} />
        <FloatingParticle position={[1.5, -0.4, 0]} color="#7980fe" size={0.09} speed={0.7} />
        <FloatingParticle position={[2, 0.3, 0]} color="#9A70FF" size={0.11} speed={1.0} />
      </Canvas>
    </div>
  );
};

export default ThreeSectionHeading;
