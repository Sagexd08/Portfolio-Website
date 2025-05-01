import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Trail, Float, useGLTF, useAnimations } from '@react-three/drei';
import { Group, Vector3, MeshStandardMaterial, Color, Mesh, BufferGeometry } from 'three';
import * as THREE from 'three';

interface BrainModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  interactive?: boolean;
  pulseSpeed?: number;
  pulseIntensity?: number;
  distortionStrength?: number;
  distortionSpeed?: number;
  color?: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
  animate?: boolean;
  onClick?: () => void;
  useGLTFModel?: boolean;
}

interface GLTFResult {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
  animations: THREE.AnimationClip[];
  scene: THREE.Group;
}

// Brain region component for anatomical accuracy
const BrainRegion = ({
  position,
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  color = '#ff6b81',
  emissiveColor = '#ff4757',
  emissiveIntensity = 0.3,
  roughness = 0.6,
  distort = 0.2,
  distortSpeed = 0.3,
  pulsate = true
}: {
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
  roughness?: number;
  distort?: number;
  distortSpeed?: number;
  pulsate?: boolean;
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current && pulsate) {
      const time = clock.getElapsedTime();
      // Subtle pulsating effect
      const pulse = 1 + Math.sin(time * 0.8) * 0.03;
      meshRef.current.scale.set(
        scale[0] * pulse,
        scale[1] * pulse,
        scale[2] * pulse
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation as [number, number, number]}
      scale={scale}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        roughness={roughness}
        metalness={0.2}
        distort={distort}
        speed={distortSpeed}
      />
    </mesh>
  );
};

// Neural synapse component with improved visual effects
const NeuralSynapse = ({
  startPosition,
  endPosition,
  thickness = 0.02,
  color = '#6366f1',
  speed = 1,
  pulseSize = 0.08
}: {
  startPosition: [number, number, number];
  endPosition: [number, number, number];
  thickness?: number;
  color?: string;
  speed?: number;
  pulseSize?: number;
}) => {
  const lineRef = useRef<any>(null);
  const pulseRef = useRef<Mesh>(null);
  const points = useMemo(() => [
    new Vector3(...startPosition),
    new Vector3(...endPosition)
  ], [startPosition, endPosition]);

  // Calculate direction vector for pulse movement
  const direction = useMemo(() => {
    const dir = new Vector3();
    dir.subVectors(
      new Vector3(...endPosition),
      new Vector3(...startPosition)
    ).normalize();
    return dir;
  }, [startPosition, endPosition]);

  // Calculate distance for timing
  const distance = useMemo(() => {
    return new Vector3(...startPosition).distanceTo(new Vector3(...endPosition));
  }, [startPosition, endPosition]);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      const time = clock.getElapsedTime();
      // Animate the line opacity for a pulsing effect
      if (lineRef.current.material) {
        lineRef.current.material.opacity = 0.3 + Math.sin(time * speed) * 0.2;
      }

      // Animate pulse along the synapse
      if (pulseRef.current) {
        // Calculate position along the line based on time
        const cycleTime = 2; // seconds per cycle
        const normalizedTime = (time % cycleTime) / cycleTime;

        // Position the pulse along the line
        const newPos = new Vector3(...startPosition).lerp(
          new Vector3(...endPosition),
          normalizedTime
        );

        pulseRef.current.position.copy(newPos);

        // Make pulse more visible in the middle of the journey
        const visibility = Math.sin(normalizedTime * Math.PI);
        pulseRef.current.scale.setScalar(pulseSize * visibility);

        // Set opacity based on position
        if (pulseRef.current.material) {
          (pulseRef.current.material as MeshStandardMaterial).opacity = visibility * 0.8;
        }
      }
    }
  });

  return (
    <>
      <line ref={lineRef}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap((p: Vector3) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          color={color}
          transparent
          opacity={0.5}
          linewidth={thickness}
        />
      </line>

      {/* Pulse effect traveling along the synapse */}
      <mesh ref={pulseRef} position={startPosition}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </>
  );
};

// Neural node component with improved visual effects
const NeuralNode = ({
  position,
  size = 0.1,
  color = '#6366f1',
  emissiveColor = '#4338ca',
  pulseSpeed = 1
}: {
  position: [number, number, number];
  size?: number;
  color?: string;
  emissiveColor?: string;
  pulseSpeed?: number;
}) => {
  const nodeRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const [isActive, setIsActive] = useState(false);

  // Randomly activate nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(prev => !prev);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  useFrame(({ clock }) => {
    if (nodeRef.current) {
      const time = clock.getElapsedTime();
      // Pulse effect
      nodeRef.current.scale.setScalar(size * (1 + Math.sin(time * pulseSpeed) * 0.2));

      // Update glow effect
      if (glowRef.current) {
        const glowIntensity = isActive ?
          0.6 + Math.sin(time * pulseSpeed * 2) * 0.4 :
          0.2 + Math.sin(time * pulseSpeed) * 0.1;

        glowRef.current.scale.setScalar(size * 2.5 * glowIntensity);

        if (glowRef.current.material) {
          (glowRef.current.material as MeshStandardMaterial).opacity = isActive ? 0.4 : 0.15;
        }
      }
    }
  });

  return (
    <group position={position}>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={emissiveColor}
          emissive={emissiveColor}
          emissiveIntensity={1}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Main neuron */}
      <mesh ref={nodeRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={isActive ? 1 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

// Anatomically accurate brain model
const BrainModel = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  interactive = true,
  pulseSpeed = 0.5,
  pulseIntensity = 0.1,
  distortionStrength = 0.3,
  distortionSpeed = 0.5,
  color = '#ff6b81',
  emissiveColor = '#ff4757',
  emissiveIntensity = 0.5,
  animate = true,
  onClick,
  useGLTFModel = false
}: BrainModelProps) => {
  // Reference to the model
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Load GLTF model if enabled
  const { scene, animations } = useGLTFModel ?
    (useGLTF('/models/brain.glb') as unknown as GLTFResult) :
    { scene: null, animations: [] };

  const { actions, names } = useAnimations(animations, groupRef);

  // Apply animations if they exist
  useEffect(() => {
    if (useGLTFModel && names.length > 0 && animate) {
      const animationName = names[0]; // Use the first animation
      actions[animationName]?.reset().play();
    }

    return () => {
      if (useGLTFModel && names.length > 0) {
        const animationName = names[0];
        actions[animationName]?.stop();
      }
    };
  }, [actions, names, animate, useGLTFModel]);

  // Brain texture for realism when not using GLTF
  const brainTexture = useMemo(() => {
    // Return empty texture properties to avoid errors with missing files
    return {
      map: null,
      normalMap: null,
      roughnessMap: null,
      aoMap: null
    };
  }, []);

  // Define anatomical regions of the brain
  const brainRegions = useMemo(() => [
    // Frontal lobe (decision making, problem solving)
    {
      position: [0.5, 0.4, 0.6],
      scale: [0.6, 0.5, 0.5],
      color: '#ff6b81',
      emissiveColor: '#ff4757',
      distort: 0.2
    },
    // Left frontal lobe
    {
      position: [-0.5, 0.4, 0.6],
      scale: [0.6, 0.5, 0.5],
      color: '#ff6b81',
      emissiveColor: '#ff4757',
      distort: 0.2
    },
    // Parietal lobe (sensory processing)
    {
      position: [0.5, 0.4, -0.2],
      scale: [0.5, 0.5, 0.4],
      color: '#70a1ff',
      emissiveColor: '#1e90ff',
      distort: 0.15
    },
    // Left parietal lobe
    {
      position: [-0.5, 0.4, -0.2],
      scale: [0.5, 0.5, 0.4],
      color: '#70a1ff',
      emissiveColor: '#1e90ff',
      distort: 0.15
    },
    // Temporal lobe (auditory processing, memory)
    {
      position: [0.7, -0.1, 0.2],
      scale: [0.4, 0.4, 0.5],
      color: '#7bed9f',
      emissiveColor: '#2ed573',
      distort: 0.25
    },
    // Left temporal lobe
    {
      position: [-0.7, -0.1, 0.2],
      scale: [0.4, 0.4, 0.5],
      color: '#7bed9f',
      emissiveColor: '#2ed573',
      distort: 0.25
    },
    // Occipital lobe (visual processing)
    {
      position: [0.3, 0.2, -0.7],
      scale: [0.4, 0.4, 0.3],
      color: '#eccc68',
      emissiveColor: '#ffa502',
      distort: 0.18
    },
    // Left occipital lobe
    {
      position: [-0.3, 0.2, -0.7],
      scale: [0.4, 0.4, 0.3],
      color: '#eccc68',
      emissiveColor: '#ffa502',
      distort: 0.18
    },
    // Cerebellum (motor control, coordination)
    {
      position: [0, -0.5, -0.5],
      scale: [0.7, 0.4, 0.4],
      color: '#a4b0be',
      emissiveColor: '#747d8c',
      distort: 0.1
    },
    // Brain stem
    {
      position: [0, -0.8, -0.1],
      scale: [0.2, 0.5, 0.2],
      color: '#a4b0be',
      emissiveColor: '#747d8c',
      distort: 0.05
    },
  ], []);

  // Neural nodes positions (synapses)
  const neuralNodes = useMemo(() => [
    [0.8, 0.5, 0.3],
    [-0.7, 0.6, 0.4],
    [0.5, -0.5, 0.7],
    [-0.5, -0.4, 0.6],
    [0.6, 0.7, -0.5],
    [-0.6, 0.5, -0.6],
    [0.3, -0.6, -0.4],
    [-0.3, -0.6, -0.4],
    [0, 0.7, 0.3],
    [0, -0.3, 0.7],
    [0.4, 0.3, 0],
    [-0.4, 0.3, 0]
  ] as [number, number, number][], []);

  // Generate random neural activity animation for GLTF model
  useEffect(() => {
    if (!groupRef.current || !useGLTFModel) return;

    // Find all materials in the brain model
    const materials: THREE.Material[] = [];
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          materials.push(...child.material);
        } else {
          materials.push(child.material);
        }
      }
    });

    // Set up pulse animation for emissive properties if available
    const animateMaterials = () => {
      const time = Date.now() * 0.001;

      materials.forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          // Pulse the emissive intensity
          material.emissiveIntensity = emissiveIntensity + Math.sin(time * 2) * 0.2;
        }
      });

      requestAnimationFrame(animateMaterials);
    };

    let animationFrame = requestAnimationFrame(animateMaterials);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [useGLTFModel, emissiveIntensity]);

  // Animate the brain model
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (animate) {
        // Subtle rotation for animation
        groupRef.current.rotation.y += delta * 0.05;

        // Add some subtle movement based on time
        const time = state.clock.getElapsedTime();
        if (groupRef.current.position.y !== undefined) {
          groupRef.current.position.y = position[1] + Math.sin(time * pulseSpeed) * pulseIntensity;
        }

        // If clicked, add a pulse effect
        if (clicked) {
          const pulseEffect = 1 + Math.sin(time * 4) * 0.05;
          groupRef.current.scale.x = currentScale[0] * pulseEffect;
          groupRef.current.scale.y = currentScale[1] * pulseEffect;
          groupRef.current.scale.z = currentScale[2] * pulseEffect;
        }
      }
    }
  });

  // Handle mouse interactions
  const handlePointerOver = () => {
    if (interactive) {
      setHovered(true);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = () => {
    if (interactive) {
      setHovered(false);
      document.body.style.cursor = 'auto';
    }
  };

  const handleClick = () => {
    if (interactive) {
      setClicked(!clicked);
      if (onClick) onClick();
    }
  };

  // Reset cursor on unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Ensure scale is always a tuple of 3 numbers
  const scaleVector: [number, number, number] = Array.isArray(scale) && scale.length === 3
    ? scale as [number, number, number]
    : [1, 1, 1];

  const currentScale: [number, number, number] = hovered
    ? [scaleVector[0] * 1.1, scaleVector[1] * 1.1, scaleVector[2] * 1.1]
    : scaleVector;

  return (
    <group
      ref={groupRef}
      position={position as [number, number, number]}
      rotation={rotation as [number, number, number]}
      scale={currentScale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {useGLTFModel && scene ? (
        // Render the GLTF model if available
        <primitive object={scene.clone()} />
      ) : (
        // Otherwise render the procedural brain
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          {/* Base brain shape with realistic texture */}
          <Sphere args={[1, 64, 64]} scale={[1, 1.2, 0.8]}>
            <meshStandardMaterial
              {...brainTexture}
              color="#ff6b81"
              emissive="#ff4757"
              emissiveIntensity={0.2}
              roughness={0.8}
              metalness={0.1}
            />
          </Sphere>

          {/* Brain sulci and gyri (wrinkles) for realism */}
          <Sphere args={[1.02, 64, 64]} scale={[1, 1.2, 0.8]}>
            <meshStandardMaterial
              color="#ff6b81"
              emissive="#ff4757"
              emissiveIntensity={0.1}
              roughness={1}
              metalness={0}
              wireframe
              transparent
              opacity={0.3}
            />
          </Sphere>

          {/* Anatomical brain regions */}
          {brainRegions.map((region, index) => (
            <BrainRegion
              key={`region-${index}`}
              position={region.position as [number, number, number]}
              scale={region.scale as [number, number, number]}
              color={region.color}
              emissiveColor={region.emissiveColor}
              distort={region.distort}
              pulsate={true}
            />
          ))}

          {/* Neural nodes (neurons) */}
          {neuralNodes.map((nodePos, index) => (
            <NeuralNode
              key={`node-${index}`}
              position={nodePos}
              size={0.08 + Math.random() * 0.05}
              color="#ffffff"
              emissiveColor="#6366f1"
              pulseSpeed={0.5 + Math.random() * 1}
            />
          ))}

          {/* Neural synapses (connections between neurons) */}
          {neuralNodes.map((startPos, i) =>
            neuralNodes.slice(i + 1).filter(() => Math.random() > 0.7).map((endPos, j) => (
              <NeuralSynapse
                key={`synapse-${i}-${j}`}
                startPosition={startPos}
                endPosition={endPos}
                thickness={0.01 + Math.random() * 0.01}
                color="#6366f1"
                speed={0.5 + Math.random() * 1}
              />
            ))
          )}

          {/* Add a trail effect to the brain when clicked */}
          {clicked && (
            <Trail
              width={0.5}
              length={8}
              color={emissiveColor}
              attenuation={(t) => t * t}
            />
          )}
        </Float>
      )}
    </group>
  );
};

export default BrainModel;

// Preload the brain model
useGLTF.preload('/models/brain.glb');
