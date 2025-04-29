import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  useTexture,
  Stars,
  Trail,
  Float,
  Text,
  MeshDistortMaterial
} from '@react-three/drei';
import * as THREE from 'three';
import BrainModel from './BrainModel';
import ParticleSystem from './ParticleSystem';

interface SceneProps {
  modelPath?: string;
  cameraPosition?: [number, number, number];
  enableOrbitControls?: boolean;
  enableParticles?: boolean;
  particleCount?: number;
  backgroundColor?: string;
  showStars?: boolean;
  showEffects?: boolean;
  showFloatingText?: boolean;
  textContent?: string;
  children?: React.ReactNode;
}

// Floating Neural Network Nodes component
const NeuralNetworkNodes = ({ count = 8, radius = 4 }) => {
  const nodes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 2;
      return { position: [x, y, z], size: 0.2 + Math.random() * 0.2 };
    });
  }, [count, radius]);

  return (
    <group>
      {nodes.map((node, i) => (
        <NeuralNode key={i} position={node.position as [number, number, number]} size={node.size} index={i} />
      ))}
      {nodes.map((node, i) => {
        // Connect each node to 2-3 other nodes
        const connections = [];
        for (let j = 1; j <= 2 + Math.floor(Math.random()); j++) {
          const targetIndex = (i + j) % count;
          connections.push(
            <NeuralConnection
              key={`${i}-${targetIndex}`}
              start={node.position as [number, number, number]}
              end={nodes[targetIndex].position as [number, number, number]}
            />
          );
        }
        return connections;
      })}
    </group>
  );
};

// Individual neural node
const NeuralNode = ({ position, size, index }: { position: [number, number, number], size: number, index: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Add subtle floating motion
      const t = clock.getElapsedTime() + index * 100;
      ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4338ca"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
        <Trail
          width={0.1}
          length={4}
          color="#818cf8"
          attenuation={(t) => t * t}
        />
      </mesh>
    </Float>
  );
};

// Connection between nodes
const NeuralConnection = ({ start, end }: { start: [number, number, number], end: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);

  // Calculate the midpoint and direction
  const midPoint = useMemo(() => {
    const mid = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
      (start[2] + end[2]) / 2
    ];
    // Add some random offset to the midpoint
    mid[1] += (Math.random() - 0.5) * 0.5;
    return mid;
  }, [start, end]);

  // Create a curved path
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(...start),
      new THREE.Vector3(...midPoint),
      new THREE.Vector3(...end)
    ];
    return new THREE.QuadraticBezierCurve3(points[0], points[1], points[2]);
  }, [start, midPoint, end]);

  // Create geometry from the curve
  const geometry = useMemo(() => {
    const points = curve.getPoints(20);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [curve]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color="#818cf8"
        transparent
        opacity={0.4}
        linewidth={1}
      />
    </line>
  );
};

// Floating 3D text component
const FloatingText = ({ text = "AI/ML", position = [0, 0, 0] }: { text?: string, position?: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.y = Math.sin(t * 0.2) * 0.1;
      ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          fontSize={0.5}
          color="#6366f1"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          outlineWidth={0.02}
          outlineColor="#4338ca"
        >
          {text}
          <meshStandardMaterial
            color="#6366f1"
            emissive="#4338ca"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
          />
        </Text>
      </Float>
    </group>
  );
};

const Scene: React.FC<SceneProps> = ({
  modelPath,
  cameraPosition = [0, 0, 5],
  enableOrbitControls = false,
  enableParticles = true,
  particleCount = 500,
  backgroundColor = '#111827',
  showStars = true,
  showEffects = true,
  showFloatingText = false,
  textContent = "AI/ML",
  children,
}) => {
  return (
    <div className="w-full h-full">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: 50 }}
      >
        <color attach="background" args={[backgroundColor]} />
        <fog attach="fog" args={[backgroundColor, 5, 20]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#10b981" />

        {/* Camera Controls */}
        {enableOrbitControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}

        {/* Environment */}
        <Environment preset="night" />

        {/* Stars background */}
        {showStars && (
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0.5}
            fade
            speed={1}
          />
        )}

        {/* Content */}
        <Suspense fallback={null}>
          {/* Brain Model */}
          <BrainModel
            position={[0, 0, 0]}
            scale={[1.5, 1.5, 1.5]}
            interactive={true}
          />

          {/* Particle System */}
          {enableParticles && (
            <ParticleSystem
              count={particleCount}
              radius={5}
              size={0.02}
              speed={0.05}
              interactive={true}
            />
          )}

          {/* Neural Network Visualization */}
          <NeuralNetworkNodes count={10} radius={6} />

          {/* Floating Text */}
          {showFloatingText && (
            <FloatingText text={textContent} position={[0, 2, 0]} />
          )}

          {children}
        </Suspense>

        {/* Enhanced lighting for visual effects */}
        {showEffects && (
          <>
            <pointLight position={[2, 0, 2]} intensity={0.8} color="#6366f1" />
            <pointLight position={[-2, 0, -2]} intensity={0.8} color="#10b981" />
            <spotLight
              position={[0, 10, 0]}
              angle={0.3}
              penumbra={1}
              intensity={0.5}
              color="#ffffff"
              castShadow
            />
          </>
        )}

        {/* Auto-rotate camera */}
        <CameraAnimation />
      </Canvas>
    </div>
  );
};

// Camera animation component
const CameraAnimation = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(({ clock }) => {
    if (cameraRef.current) {
      const t = clock.getElapsedTime() * 0.1;
      cameraRef.current.position.x = Math.sin(t) * 5;
      cameraRef.current.position.z = Math.cos(t) * 5;
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} fov={50} />;
};

export default Scene;
