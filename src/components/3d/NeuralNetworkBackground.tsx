import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface NeuronProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  pulseSpeed?: number;
  pulseIntensity?: number;
}

const Neuron: React.FC<NeuronProps> = ({
  position,
  size = 0.15,
  color = '#6366f1',
  pulseSpeed = 1,
  pulseIntensity = 0.3,
}) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      // Pulse effect
      ref.current.scale.setScalar(
        size * (1 + Math.sin(time * pulseSpeed) * pulseIntensity)
      );
      
      // Subtle movement
      ref.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.05;
    }
  });
  
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

interface SynapseProps {
  startPos: [number, number, number];
  endPos: [number, number, number];
  color?: string;
  thickness?: number;
  speed?: number;
  pulseIntensity?: number;
}

const Synapse: React.FC<SynapseProps> = ({
  startPos,
  endPos,
  color = '#6366f1',
  thickness = 0.02,
  speed = 1,
  pulseIntensity = 0.5,
}) => {
  const ref = useRef<THREE.Line>(null);
  
  // Create a curved path between neurons
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...startPos);
    const end = new THREE.Vector3(...endPos);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    
    // Add some random offset to the midpoint
    mid.y += (Math.random() - 0.5) * 0.5;
    
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [startPos, endPos]);
  
  // Create points along the curve for the line
  const points = useMemo(() => curve.getPoints(20), [curve]);
  
  // Create geometry from points
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      const material = ref.current.material as THREE.LineBasicMaterial;
      
      // Pulse opacity for synapse firing effect
      material.opacity = 0.2 + Math.sin(time * speed) * pulseIntensity;
    }
  });
  
  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.5}
        linewidth={thickness}
      />
    </line>
  );
};

interface NeuralNetworkBackgroundProps {
  neuronCount?: number;
  synapseCount?: number;
  depth?: number;
  width?: number;
  height?: number;
}

const NeuralNetworkBackground: React.FC<NeuralNetworkBackgroundProps> = ({
  neuronCount = 50,
  synapseCount = 80,
  depth = 10,
  width = 10,
  height = 10,
}) => {
  // Generate random neuron positions
  const neurons = useMemo(() => {
    return Array.from({ length: neuronCount }).map(() => ({
      position: [
        (Math.random() - 0.5) * width,
        (Math.random() - 0.5) * height,
        (Math.random() - 0.5) * depth,
      ] as [number, number, number],
      size: 0.05 + Math.random() * 0.1,
      pulseSpeed: 0.5 + Math.random() * 1.5,
      color: Math.random() > 0.7 ? '#10b981' : '#6366f1',
    }));
  }, [neuronCount, width, height, depth]);
  
  // Generate random synapses between neurons
  const synapses = useMemo(() => {
    return Array.from({ length: synapseCount }).map(() => {
      const startIndex = Math.floor(Math.random() * neuronCount);
      let endIndex = Math.floor(Math.random() * neuronCount);
      
      // Ensure we don't connect a neuron to itself
      while (endIndex === startIndex) {
        endIndex = Math.floor(Math.random() * neuronCount);
      }
      
      return {
        startPos: neurons[startIndex].position,
        endPos: neurons[endIndex].position,
        speed: 0.5 + Math.random() * 1.5,
        pulseIntensity: 0.3 + Math.random() * 0.4,
        color: Math.random() > 0.7 ? '#10b981' : '#6366f1',
      };
    });
  }, [neurons, neuronCount, synapseCount]);
  
  return (
    <group>
      {/* Render neurons */}
      {neurons.map((neuron, index) => (
        <Neuron
          key={`neuron-${index}`}
          position={neuron.position}
          size={neuron.size}
          pulseSpeed={neuron.pulseSpeed}
          color={neuron.color}
        />
      ))}
      
      {/* Render synapses */}
      {synapses.map((synapse, index) => (
        <Synapse
          key={`synapse-${index}`}
          startPos={synapse.startPos}
          endPos={synapse.endPos}
          speed={synapse.speed}
          pulseIntensity={synapse.pulseIntensity}
          color={synapse.color}
        />
      ))}
    </group>
  );
};

export default NeuralNetworkBackground;
