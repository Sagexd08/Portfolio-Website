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
  OrbitControls,
  Line
} from '@react-three/drei';
import * as THREE from 'three';
import { Neuron3D, Connection3D } from '@/types/three-types';
import { useLoading } from '@/context/LoadingContext';

// Brain shape generator
const generateBrainShape = () => {
  const neurons: Neuron3D[] = [];
  const connections: Connection3D[] = [];
  let neuronId = 0;

  // Parameters for brain shape
  const brainWidth = 6;
  const brainHeight = 5;
  const brainDepth = 4;
  const hemisphereGap = 0.8; // Gap between left and right hemispheres
  const neuronCount = 150; // Total neurons in the brain

  // Create neurons in a brain-like shape
  for (let i = 0; i < neuronCount; i++) {
    // Generate a point in a brain-like shape
    // Use parametric equations to create a realistic brain shape
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI;

    // Base ellipsoid shape
    let x = Math.sin(v) * Math.cos(u) * brainWidth/2;
    let y = Math.sin(v) * Math.sin(u) * brainHeight/2;
    let z = Math.cos(v) * brainDepth/2;

    // Create hemispheres by adding a gap in the middle
    if (x > 0) {
      x += hemisphereGap/2;
    } else {
      x -= hemisphereGap/2;
    }

    // Add wrinkles and sulci (brain folds)
    const wrinkleScale = 0.4;
    const wrinkleFrequency = 8;

    x += Math.sin(v * wrinkleFrequency) * Math.cos(u * wrinkleFrequency) * wrinkleScale;
    y += Math.sin(v * wrinkleFrequency) * Math.sin(u * wrinkleFrequency) * wrinkleScale;
    z += Math.cos(v * wrinkleFrequency) * wrinkleScale;

    // Add more detailed wrinkles
    const detailScale = 0.2;
    const detailFrequency = 15;

    x += Math.sin(v * detailFrequency) * Math.cos(u * detailFrequency) * detailScale;
    y += Math.sin(v * detailFrequency) * Math.sin(u * detailFrequency) * detailScale;
    z += Math.cos(v * detailFrequency) * detailScale;

    // Flatten the bottom slightly
    if (y < 0) {
      y *= 0.7;
    }

    // Add some randomness
    x += (Math.random() - 0.5) * 0.3;
    y += (Math.random() - 0.5) * 0.3;
    z += (Math.random() - 0.5) * 0.3;

    // Create the neuron
    neurons.push({
      id: `neuron-${neuronId}`,
      position: [x, y, z],
      layer: Math.floor(Math.random() * 4), // Random layer for visual variety
      index: i,
      connections: [],
      value: Math.random(),
      active: Math.random() > 0.8 // Some neurons start active
    });

    neuronId++;
  }

  // Create connections between neurons
  // Connect neurons that are close to each other
  const connectionCount = neuronCount * 3; // Multiple connections per neuron
  const maxDistance = 3; // Maximum distance for connection

  for (let i = 0; i < connectionCount; i++) {
    const sourceIdx = Math.floor(Math.random() * neuronCount);
    let targetIdx = Math.floor(Math.random() * neuronCount);

    // Ensure we don't connect a neuron to itself
    while (targetIdx === sourceIdx) {
      targetIdx = Math.floor(Math.random() * neuronCount);
    }

    const source = neurons[sourceIdx];
    const target = neurons[targetIdx];

    // Calculate distance between neurons
    const dx = source.position[0] - target.position[0];
    const dy = source.position[1] - target.position[1];
    const dz = source.position[2] - target.position[2];
    const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

    // Only connect if they're close enough
    if (distance < maxDistance) {
      const weight = Math.random() * 2 - 1; // Range: -1 to 1

      connections.push({
        sourceId: source.id,
        targetId: target.id,
        weight,
        active: Math.random() > 0.5 // Some connections start active
      });
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
  const synapseRef = useRef<THREE.Group>(null);

  // Determine neuron color based on position in the brain
  const neuronColor = useMemo(() => {
    // Left hemisphere - more blue/purple
    if (neuron.position[0] < 0) {
      return neuron.active ? "#6366f1" : "#4338ca";
    }
    // Right hemisphere - more red/pink
    else {
      return neuron.active ? "#ff6b81" : "#e11d48";
    }
  }, [neuron.position, neuron.active]);

  // Determine glow color based on activity
  const glowColor = useMemo(() => {
    return neuron.active ? "#ffffff" : (neuron.position[0] < 0 ? "#818cf8" : "#fda4af");
  }, [neuron.position, neuron.active]);

  // Animate the neuron
  useFrame(({ clock }) => {
    if (!meshRef.current || !glowRef.current || !synapseRef.current) return;

    if (pulsating) {
      // Base pulse animation
      const time = clock.getElapsedTime();
      const baseFrequency = 0.8 + (neuron.index % 5) * 0.1; // Varied frequencies
      const pulse = 0.8 + Math.sin(time * baseFrequency + neuron.index * 0.5) * 0.2;

      // More dramatic pulse when active
      const activeScale = neuron.active ? 1.5 : 1;
      meshRef.current.scale.setScalar(pulse * activeScale);

      // Update glow intensity and size
      const glowScale = neuron.active ? 3 : 2;
      glowRef.current.scale.setScalar(pulse * glowScale);

      // Material updates for active neurons
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.emissiveIntensity = neuron.active ?
          0.8 + Math.sin(time * 3) * 0.2 : // Pulsing emission when active
          0.2; // Constant low emission when inactive
      }

      if (glowRef.current.material instanceof THREE.MeshBasicMaterial) {
        glowRef.current.material.opacity = neuron.active ?
          0.3 + Math.sin(time * 4) * 0.1 : // Pulsing opacity when active
          0.1; // Constant low opacity when inactive
      }

      // Subtle rotation for visual interest
      synapseRef.current.rotation.y = time * 0.1;
      synapseRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <group position={neuron.position as [number, number, number]}>
      <group ref={synapseRef}>
        {/* Neuron core - cell body */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={neuronColor}
            emissive={neuronColor}
            emissiveIntensity={neuron.active ? 0.8 : 0.2}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Dendrites (small protrusions) - only visible when zoomed in */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh
            key={`dendrite-${i}`}
            position={[
              (Math.random() - 0.5) * 0.15,
              (Math.random() - 0.5) * 0.15,
              (Math.random() - 0.5) * 0.15
            ]}
            scale={[0.03, 0.03, 0.03 + Math.random() * 0.05]}
            rotation={[
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2
            ]}
          >
            <cylinderGeometry args={[1, 0.7, 1, 6]} />
            <meshStandardMaterial
              color={neuronColor}
              roughness={0.5}
              metalness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Glow effect - neural activity */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color={glowColor}
          transparent={true}
          opacity={neuron.active ? 0.3 : 0.1}
        />
      </mesh>
    </group>
  );
};

// Neural Connections component - represents axons and synapses
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

      // Create a curved line between neurons to represent axons
      // Calculate control points for a more natural, organic curve
      const sourcePos = new THREE.Vector3(...source.position);
      const targetPos = new THREE.Vector3(...target.position);

      // Distance between neurons
      const distance = sourcePos.distanceTo(targetPos);

      // Create multiple control points for more organic curves
      const controlPoints = [];
      const segmentCount = Math.max(3, Math.floor(distance * 2)); // More segments for longer distances

      // Direction vector from source to target
      const direction = new THREE.Vector3().subVectors(targetPos, sourcePos).normalize();

      // Create perpendicular vectors for natural curvature
      const perpA = new THREE.Vector3(-direction.y, direction.x, direction.z).normalize();
      const perpB = new THREE.Vector3().crossVectors(direction, perpA).normalize();

      // Generate control points along the path with natural variation
      for (let i = 0; i <= segmentCount; i++) {
        const t = i / segmentCount;

        // Base position along straight line
        const basePos = new THREE.Vector3().lerpVectors(sourcePos, targetPos, t);

        // Add curvature that's stronger in the middle
        const curveFactor = Math.sin(t * Math.PI) * distance * 0.2;

        // Random offset perpendicular to the main direction
        const offsetA = perpA.clone().multiplyScalar((Math.random() - 0.5) * 0.3 * curveFactor);
        const offsetB = perpB.clone().multiplyScalar((Math.random() - 0.5) * 0.3 * curveFactor);

        // Combine offsets
        basePos.add(offsetA).add(offsetB);

        controlPoints.push(basePos);
      }

      // Create a smooth curve through all control points
      const curve = new THREE.CatmullRomCurve3(controlPoints);
      const points = curve.getPoints(20); // More points for smoother curves

      return {
        id: `${connection.sourceId}-${connection.targetId}`,
        points,
        weight: connection.weight,
        active: connection.active,
        // Store source and target hemispheres for coloring
        sourceHemisphere: source.position[0] < 0 ? 'left' : 'right',
        targetHemisphere: target.position[0] < 0 ? 'left' : 'right'
      };
    }).filter(Boolean);
  }, [connections, neuronMap]);

  // Animation for connections
  useFrame(() => {
    // Randomly activate connections for brain activity simulation
    if (Math.random() > 0.99) {
      const randomIndex = Math.floor(Math.random() * connections.length);
      if (connections[randomIndex]) {
        connections[randomIndex].active = true;

        // Deactivate after a short time
        setTimeout(() => {
          if (connections[randomIndex]) {
            connections[randomIndex].active = false;
          }
        }, 300 + Math.random() * 500);
      }
    }
  });

  return (
    <group>
      {connectionLines.map((conn) => {
        if (!conn) return null;

        // Determine color based on hemispheres and activity
        let color;
        if (conn.active) {
          // Active connections are brighter
          if (conn.sourceHemisphere === 'left' && conn.targetHemisphere === 'left') {
            // Left hemisphere connections (blue/purple)
            color = new THREE.Color('#818cf8');
          } else if (conn.sourceHemisphere === 'right' && conn.targetHemisphere === 'right') {
            // Right hemisphere connections (red/pink)
            color = new THREE.Color('#fb7185');
          } else {
            // Cross-hemisphere connections (white/yellow)
            color = new THREE.Color('#fef3c7');
          }
        } else {
          // Inactive connections are more subdued
          if (conn.sourceHemisphere === 'left' && conn.targetHemisphere === 'left') {
            color = new THREE.Color('#4338ca');
          } else if (conn.sourceHemisphere === 'right' && conn.targetHemisphere === 'right') {
            color = new THREE.Color('#be123c');
          } else {
            color = new THREE.Color('#525252');
          }
        }

        // Calculate opacity and width based on weight and activity
        const opacity = conn.active ?
          Math.abs(conn.weight) * 0.8 + 0.2 : // Active connections with varying opacity
          0.05 + Math.abs(conn.weight) * 0.05; // Inactive connections are very faint

        const lineWidth = conn.active ?
          1.2 * Math.abs(conn.weight) + 0.8 : // Thicker active connections
          0.8 * Math.abs(conn.weight) + 0.3; // Thinner inactive connections

        return (
          <group key={conn.id}>
            <Line
              points={conn.points}
              color={color}
              lineWidth={lineWidth}
              transparent
              opacity={opacity}
            />
          </group>
        );
      })}
    </group>
  );
};

// Particle system for brain background effect
const NeuralParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const pointsRef2 = useRef<THREE.Points>(null);

  // Create particles in a brain-like shape
  const particles = useMemo(() => {
    const temp = [];
    const particleCount = 500;

    // Create particles that form a brain-like cloud
    for (let i = 0; i < particleCount; i++) {
      // Use parametric equations similar to the brain shape
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI;

      // Base ellipsoid shape
      const brainWidth = 8;
      const brainHeight = 6;
      const brainDepth = 5;

      let x = Math.sin(v) * Math.cos(u) * brainWidth/2;
      let y = Math.sin(v) * Math.sin(u) * brainHeight/2;
      let z = Math.cos(v) * brainDepth/2;

      // Create hemispheres
      const hemisphereGap = 0.8;
      if (x > 0) {
        x += hemisphereGap/2;
      } else {
        x -= hemisphereGap/2;
      }

      // Add some randomness
      x += (Math.random() - 0.5) * 2;
      y += (Math.random() - 0.5) * 2;
      z += (Math.random() - 0.5) * 2;

      temp.push(x, y, z);
    }

    return new Float32Array(temp);
  }, []);

  // Create a second set of particles for depth and visual interest
  const backgroundParticles = useMemo(() => {
    const temp = [];
    const particleCount = 300;

    // Create a wider cloud of particles
    for (let i = 0; i < particleCount; i++) {
      const radius = 10 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      temp.push(x, y, z);
    }

    return new Float32Array(temp);
  }, []);

  // Create colors for the particles
  const colors = useMemo(() => {
    const temp = [];
    const particleCount = particles.length / 3;

    for (let i = 0; i < particleCount; i++) {
      // Position in the array
      const x = particles[i * 3];

      // Different colors for left and right hemispheres
      if (x < 0) {
        // Left hemisphere - blue/purple
        temp.push(0.4 + Math.random() * 0.1); // R
        temp.push(0.4 + Math.random() * 0.1); // G
        temp.push(0.9 + Math.random() * 0.1); // B
      } else {
        // Right hemisphere - red/pink
        temp.push(0.9 + Math.random() * 0.1); // R
        temp.push(0.4 + Math.random() * 0.1); // G
        temp.push(0.5 + Math.random() * 0.1); // B
      }
    }

    return new Float32Array(temp);
  }, [particles]);

  // Create colors for background particles
  const backgroundColors = useMemo(() => {
    const temp = [];
    const particleCount = backgroundParticles.length / 3;

    for (let i = 0; i < particleCount; i++) {
      // Subtle colors for background
      temp.push(0.2 + Math.random() * 0.1); // R
      temp.push(0.2 + Math.random() * 0.1); // G
      temp.push(0.4 + Math.random() * 0.1); // B
    }

    return new Float32Array(temp);
  }, [backgroundParticles]);

  // Animate particles
  useFrame(({ clock }) => {
    if (!pointsRef.current || !pointsRef2.current) return;

    const time = clock.getElapsedTime();

    // Gentle breathing motion for brain particles
    pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.05;
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.scale.x = 1 + Math.sin(time * 0.3) * 0.03;
    pointsRef.current.scale.y = 1 + Math.sin(time * 0.3) * 0.03;
    pointsRef.current.scale.z = 1 + Math.sin(time * 0.3) * 0.03;

    // Slower rotation for background particles
    pointsRef2.current.rotation.y = time * 0.02;
    pointsRef2.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <>
      {/* Brain-shaped particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </points>

      {/* Background particles */}
      <points ref={pointsRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={backgroundParticles.length / 3}
            array={backgroundParticles}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={backgroundColors.length / 3}
            array={backgroundColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </points>
    </>
  );
};

// Main brain visualization scene
const BrainVisualization: React.FC = () => {
  const { isLoading } = useLoading();
  const { neurons, connections } = useMemo(() => generateBrainShape(), []);

  // Refs for animations
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Slow rotation of the entire brain
  useFrame(({ clock }) => {
    if (!groupRef.current || isLoading) return;

    // Gentle breathing motion
    const breathingTime = clock.getElapsedTime() * 0.2;
    groupRef.current.scale.x = 1 + Math.sin(breathingTime) * 0.03;
    groupRef.current.scale.y = 1 + Math.sin(breathingTime) * 0.03;
    groupRef.current.scale.z = 1 + Math.sin(breathingTime) * 0.03;

    // Subtle rotation
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.05;

    // Neural activity simulation - random activation of neurons
    if (Math.random() > 0.97) {
      const randomIndex = Math.floor(Math.random() * neurons.length);
      neurons[randomIndex].active = true;

      // Deactivate after a short time
      setTimeout(() => {
        neurons[randomIndex].active = false;
      }, 500 + Math.random() * 1000);
    }

    // Neural activity simulation - activation propagation through connections
    if (Math.random() > 0.95) {
      const randomIndex = Math.floor(Math.random() * connections.length);
      connections[randomIndex].active = true;

      // Deactivate after a short time
      setTimeout(() => {
        connections[randomIndex].active = false;
      }, 300 + Math.random() * 700);
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

      {/* Brain neurons */}
      {neurons.map((neuron: Neuron3D) => (
        <Neuron key={neuron.id} neuron={neuron} />
      ))}

      {/* Neural connections */}
      <Connections neurons={neurons} connections={connections} />
    </group>
  );
};

// Main component that sets up the canvas
const NeuralScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 50 }}>
        {/* Dark background for brain visualization */}
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 8, 25]} />

        {/* Lighting for realistic brain appearance */}
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#ff6b81" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6366f1" />
        <spotLight
          position={[0, 5, 10]}
          angle={0.5}
          penumbra={0.8}
          intensity={0.8}
          castShadow
          color="#ffffff"
        />

        {/* Brain visualization */}
        <BrainVisualization />

        {/* Camera controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          rotateSpeed={0.3}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />

        {/* Post-processing effects for realistic brain appearance */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={1.0}
          />
          <Noise
            opacity={0.035}
            blendFunction={BlendFunction.OVERLAY}
          />
          <ChromaticAberration
            offset={new THREE.Vector2(0.0008, 0.0008)}
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