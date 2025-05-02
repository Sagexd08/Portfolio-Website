import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  shape?: 'box' | 'sphere' | 'tetrahedron' | 'octahedron';
}

// Floating shape component
const FloatingShape: React.FC<FloatingShapeProps> = ({ position, rotation, scale, color, shape = 'box' }) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.003;
      mesh.current.rotation.y += 0.002;

      // Subtle floating movement
      mesh.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
        {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {shape === 'sphere' && <sphereGeometry args={[0.7, 16, 16]} />}
        {shape === 'tetrahedron' && <tetrahedronGeometry args={[0.8, 0]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[0.7, 0]} />}
        <meshLambertMaterial color={color} />
      </mesh>
    </Float>
  );
};

interface ParticleSystemProps {
  count?: number;
  color?: string;
}

// Particle system
const ParticleSystem: React.FC<ParticleSystemProps> = ({ count = 100, color = '#ffffff' }) => {
  const particles = useRef<THREE.Points>(null);
  const { size, camera } = useThree();

  // Create particles
  const particlePositions = [];
  const particleSizes = [];

  for (let i = 0; i < count; i++) {
    particlePositions.push(
      (Math.random() - 0.5) * 20, // x
      (Math.random() - 0.5) * 20, // y
      (Math.random() - 0.5) * 20  // z
    );
    particleSizes.push(Math.random() * 0.05 + 0.01);
  }

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y += 0.0005;

      // Update particle positions
      const geometry = particles.current.geometry;
      if (geometry.attributes.position) {
        const positions = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.001;
        }
        geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlePositions.length / 3}
          array={new Float32Array(particlePositions)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleSizes.length}
          array={new Float32Array(particleSizes)}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

interface CameraControllerProps {
  mousePosition: React.RefObject<{x: number, y: number}>;
}

// Camera controller with parallax effect
const CameraController: React.FC<CameraControllerProps> = ({ mousePosition }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (mousePosition.current) {
      // Smooth camera movement based on mouse position
      camera.position.x += (mousePosition.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mousePosition.current.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
};

// Main component
const ThreeBackground = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />

        <CameraController mousePosition={mousePosition} />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />

        {/* Floating shapes */}
        <FloatingShape position={[-3, 1, -2]} rotation={[0, 0, 0]} scale={0.8} color="#7980fe" shape="tetrahedron" />
        <FloatingShape position={[2, -1, -1]} rotation={[0, 0, 0]} scale={0.6} color="#9A70FF" shape="octahedron" />
        <FloatingShape position={[0, 2, -3]} rotation={[0, 0, 0]} scale={0.7} color="#838aff" shape="sphere" />
        <FloatingShape position={[3, 0, -2]} rotation={[0, 0, 0]} scale={0.5} color="#7980fe" shape="box" />
        <FloatingShape position={[-2, -2, -1]} rotation={[0, 0, 0]} scale={0.4} color="#9A70FF" shape="tetrahedron" />

        {/* Particle system */}
        <ParticleSystem count={200} color="#ffffff" />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
