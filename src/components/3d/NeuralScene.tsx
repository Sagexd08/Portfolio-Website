import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  EffectComposer, 
  Bloom, 
  Noise,
  ChromaticAberration
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import {
  PerspectiveCamera,
  useGLTF,
  OrbitControls,
  useTexture,
  Sphere,
  Points,
  Point,
  Line,
  MeshDistortMaterial
} from '@react-three/drei';
import * as THREE from 'three';
import { Neuron3D, Connection3D } from '@/types/three-types';
import { useLoading } from '@/context/LoadingContext';

// Neural network data generator
const generateNeuralNetworkData = () => {
  const layerSizes = [6, 12, 8, 3]; // Number of neurons per layer
  const neurons: Neuron3D[] = [];
  const connections: Connection3D[] = [];
  
  // Create neurons for each layer
  let neuronId = 0;
  layerSizes.forEach((size, layerIndex) => {
    const layerZ = (layerIndex - (layerSizes.length - 1) / 2) * 4; // Z position determines the layer
    
    for (let i = 0; i < size; i++) {
      const normalizedIndex = size > 1 ? i / (size - 1) - 0.5 : 0;
      const posY = normalizedIndex * 6; // Vertical position
      
      // Add some randomization for x position
      const randX = (Math.random() - 0.5) * 1.5;
      
      neurons.push({
        id: `neuron-${neuronId}`,
        position: [randX, posY, layerZ],
        layer: layerIndex,
        index: i,
        connections: [],
        value: Math.random(),
        active: false
      });
      
      neuronId++;
    }
  });
  
  // Create connections between layers
  for (let layerIndex = 0; layerIndex < layerSizes.length - 1; layerIndex++) {
    const currentLayerStart = layerSizes.slice(0, layerIndex).reduce((sum, size) => sum + size, 0);
    const nextLayerStart = currentLayerStart + layerSizes[layerIndex];
    
    // Connect each neuron in current layer to some neurons in next layer
    for (let i = 0; i < layerSizes[layerIndex]; i++) {
      const sourceNeuronIdx = currentLayerStart + i;
      
      // Connect to all neurons in next layer (fully connected)
      for (let j = 0; j < layerSizes[layerIndex + 1]; j++) {
        const targetNeuronIdx = nextLayerStart + j;
        
        // Create connection with random weight
        const connectionId = `conn-${sourceNeuronIdx}-${targetNeuronIdx}`;
        const sourceId = neurons[sourceNeuronIdx].id;
        const targetId = neurons[targetNeuronIdx].id;
        const weight = Math.random() * 2 - 1; // Range: -1 to 1
        
        connections.push({
          sourceId,
          targetId,
          weight,
          active: Math.random() > 0.7 // Some connections start active
        });
      }
    }
  }
  
  return { neurons, connections };
};

// Individual Neuron component
interface NeuronProps {
  neuron: Neuron3D;
  pulsating?: boolean;
}

const Neuron: React.FC<NeuronProps> = ({ neuron, pulsating = true }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Pulsate the neuron
  useFrame(({ clock }) => {
    if (!meshRef.current || !glowRef.current) return;
    
    if (pulsating) {
      // Calculate pulse based on neuron value and time
      const pulse = 0.8 + Math.sin(clock.getElapsedTime() * 1 + neuron.index * 0.5) * 0.2;
      meshRef.current.scale.setScalar(pulse * (neuron.active ? 1.2 : 1));
      
      // Update glow intensity
      glowRef.current.scale.setScalar(pulse * 2 * (neuron.active ? 1.5 : 1));
      
      // Rotation
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <group position={neuron.position as [number, number, number]}>
      {/* Neuron core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={neuron.active ? "#6366f1" : "#4338ca"} 
          emissive={neuron.active ? "#818cf8" : "#4338ca"}
          emissiveIntensity={neuron.active ? 0.5 : 0.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial 
          color={neuron.active ? "#818cf8" : "#4338ca"} 
          transparent={true}
          opacity={0.15}
        />
      </mesh>
    </group>
  );
};

// Neural Connections component
interface ConnectionsProps {
  neurons: Neuron3D[];
  connections: Connection3D[];
}

const Connections: React.FC<ConnectionsProps> = ({ neurons, connections }) => {
  // Create a lookup map for neurons by id
  const neuronMap = useMemo(() => {
    const map = new Map<string, Neuron3D>();
    neurons.forEach(neuron => map.set(neuron.id, neuron));
    return map;
  }, [neurons]);
  
  // Generate positions for all connections
  const connectionLines = useMemo(() => {
    return connections.map(connection => {
      const source = neuronMap.get(connection.sourceId);
      const target = neuronMap.get(connection.targetId);
      
      if (!source || !target) return null;
      
      // Create a curved line between neurons
      // Calculate control point for the curve
      const midPoint = new THREE.Vector3(
        (source.position[0] + target.position[0]) / 2,
        (source.position[1] + target.position[1]) / 2,
        (source.position[2] + target.position[2]) / 2
      );
      
      // Add a slight offset to the control point to create a curve
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        0
      );
      midPoint.add(offset);
      
      // Create curve points
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...source.position),
        midPoint,
        new THREE.Vector3(...target.position)
      );
      
      const points = curve.getPoints(10);
      
      return {
        id: `${connection.sourceId}-${connection.targetId}`,
        points,
        weight: connection.weight,
        active: connection.active
      };
    }).filter(Boolean);
  }, [connections, neuronMap]);
  
  return (
    <group>
      {connectionLines.map((conn, i) => {
        if (!conn) return null;
        
        // Determine color based on weight and activity
        const color = conn.active 
          ? new THREE.Color(conn.weight > 0 ? '#a5b4fc' : '#f472b6') 
          : new THREE.Color('#1e293b');
          
        // Calculate opacity based on weight
        const opacity = conn.active ? 
          Math.abs(conn.weight) * 0.8 + 0.2 : // Active connections with varying opacity
          0.1; // Inactive connections are very faint
        
        return (
          <group key={conn.id}>
            <Line
              points={conn.points}
              color={color}
              lineWidth={1.5 * Math.abs(conn.weight) + 0.5}
              transparent
              opacity={opacity}
              alphaWrite={false}
            />
          </group>
        );
      })}
    </group>
  );
};

// Particle system for background effect
const NeuralParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Random points in space
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 300; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);
  
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    
    // Rotate slowly
    pointsRef.current.rotation.x = clock.getElapsedTime() * 0.03;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#a5b4fc"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
};

// Main neural network scene
const NeuralNetwork: React.FC = () => {
  const { isLoading } = useLoading();
  const { neurons, connections } = useMemo(() => generateNeuralNetworkData(), []);
  
  // Refs for animations
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Slow rotation of the entire network
  useFrame(({ clock }) => {
    if (!groupRef.current || isLoading) return;
    
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.15;
    
    // Random activation of neurons
    if (Math.random() > 0.99) {
      const randomIndex = Math.floor(Math.random() * neurons.length);
      neurons[randomIndex].active = !neurons[randomIndex].active;
    }
    
    // Random activation of connections
    if (Math.random() > 0.98) {
      const randomIndex = Math.floor(Math.random() * connections.length);
      connections[randomIndex].active = !connections[randomIndex].active;
    }
  });
  
  // Initial camera position
  useEffect(() => {
    if (camera) {
      camera.position.set(0, 0, 12);
      camera.lookAt(0, 0, 0);
    }
  }, [camera]);
  
  return (
    <group ref={groupRef}>
      {/* Background particles */}
      <NeuralParticles />
      
      {/* Neural network */}
      {neurons.map(neuron => (
        <Neuron key={neuron.id} neuron={neuron} />
      ))}
      
      {/* Connections between neurons */}
      <Connections neurons={neurons} connections={connections} />
    </group>
  );
};

// Main component that sets up the canvas
const NeuralScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 50 }}>
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 8, 25]} />
        
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        
        <NeuralNetwork />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
        
        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.8}
          />
          <Noise 
            opacity={0.025} 
            blendFunction={BlendFunction.ADD}
          />
          <ChromaticAberration 
            offset={[0.0005, 0.0005]}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={true}
            modulationOffset={0.3}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default NeuralScene;