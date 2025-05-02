import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingObjectProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color: string;
  shape: 'box' | 'sphere' | 'tetrahedron' | 'octahedron' | 'torus';
  speed?: number;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({ 
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
      mesh.current.rotation.x += 0.002 * speed;
      mesh.current.rotation.y += 0.003 * speed;
      
      // Add subtle floating movement
      mesh.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002 * speed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
        {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {shape === 'sphere' && <sphereGeometry args={[0.6, 16, 16]} />}
        {shape === 'tetrahedron' && <tetrahedronGeometry args={[0.7, 0]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[0.6, 0]} />}
        {shape === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
        <meshStandardMaterial 
          color={color} 
          metalness={0.5} 
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

interface ThreeCarouselElementsProps {
  className?: string;
}

const ThreeCarouselElements: React.FC<ThreeCarouselElementsProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 -z-10 opacity-70 ${className}`}>
      <Canvas>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#9A70FF" />
        
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        {/* Top left area */}
        <FloatingObject position={[-3, 2, -2]} color="#7980fe" shape="tetrahedron" scale={0.4} />
        <FloatingObject position={[-2.5, 1.5, -1]} color="#9A70FF" shape="sphere" scale={0.2} speed={1.5} />
        
        {/* Top right area */}
        <FloatingObject position={[3, 2, -3]} color="#838aff" shape="octahedron" scale={0.3} speed={0.8} />
        <FloatingObject position={[2.5, 1.2, -2]} color="#7980fe" shape="box" scale={0.25} />
        
        {/* Bottom left area */}
        <FloatingObject position={[-3, -2, -2]} color="#9A70FF" shape="torus" scale={0.3} speed={1.2} />
        <FloatingObject position={[-2.2, -1.5, -1]} color="#7980fe" shape="sphere" scale={0.15} speed={0.7} />
        
        {/* Bottom right area */}
        <FloatingObject position={[3, -2, -1]} color="#838aff" shape="tetrahedron" scale={0.35} />
        <FloatingObject position={[2.3, -1.3, -2]} color="#9A70FF" shape="box" scale={0.2} speed={1.3} />
        
        {/* Center background */}
        <FloatingObject position={[0, 0, -4]} color="#7980fe" shape="sphere" scale={0.5} speed={0.5} />
        <FloatingObject position={[1, -0.5, -3]} color="#9A70FF" shape="octahedron" scale={0.3} speed={0.6} />
        <FloatingObject position={[-1, 0.5, -3.5]} color="#838aff" shape="torus" scale={0.4} speed={0.4} />
      </Canvas>
    </div>
  );
};

export default ThreeCarouselElements;
