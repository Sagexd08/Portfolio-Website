import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Trail, Float } from '@react-three/drei';
import { Group, Vector3 } from 'three';

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
}

// Neural synapse component
const NeuralSynapse = ({
  startPosition,
  endPosition,
  thickness = 0.02,
  color = '#6366f1',
  speed = 1
}: {
  startPosition: [number, number, number];
  endPosition: [number, number, number];
  thickness?: number;
  color?: string;
  speed?: number;
}) => {
  const lineRef = useRef<any>(null);
  const points = useMemo(() => [
    new Vector3(...startPosition),
    new Vector3(...endPosition)
  ], [startPosition, endPosition]);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      const time = clock.getElapsedTime();
      // Animate the line opacity for a pulsing effect
      if (lineRef.current.material) {
        lineRef.current.material.opacity = 0.3 + Math.sin(time * speed) * 0.2;
      }
    }
  });

  return (
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
  );
};

// Neural node component
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
  const nodeRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (nodeRef.current) {
      const time = clock.getElapsedTime();
      // Pulse effect
      nodeRef.current.scale.setScalar(size * (1 + Math.sin(time * pulseSpeed) * 0.2));
    }
  });

  return (
    <mesh ref={nodeRef} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={emissiveColor}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

const BrainModel = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  interactive = true,
  pulseSpeed = 0.5,
  pulseIntensity = 0.1,
  distortionStrength = 0.3,
  distortionSpeed = 0.5,
  color = '#6366f1',
  emissiveColor = '#4338ca',
  emissiveIntensity = 0.5
}: BrainModelProps) => {
  // Reference to the model
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Neural nodes positions
  const neuralNodes = [
    [0.8, 0.5, 0.3],
    [-0.7, 0.6, 0.4],
    [0.5, -0.5, 0.7],
    [-0.5, -0.4, 0.6],
    [0.6, 0.7, -0.5],
    [-0.6, 0.5, -0.6]
  ] as [number, number, number][];

  // Rotate the brain model slightly on each frame
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Always rotate slightly for animation
      groupRef.current.rotation.y += delta * 0.1;

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
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Main brain shape */}
        <Sphere args={[1, 32, 32]} scale={[1, 1.2, 0.8]}>
          <MeshDistortMaterial
            color={color}
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity}
            roughness={0.4}
            metalness={0.6}
            distort={distortionStrength * (hovered ? 1.5 : 1)}
            speed={distortionSpeed}
          />
        </Sphere>

        {/* Outer layer to simulate brain texture */}
        <Sphere args={[1.05, 32, 32]} scale={[1, 1.2, 0.8]}>
          <meshPhongMaterial
            color="#818cf8"
            transparent
            opacity={0.3}
            wireframe
          />
        </Sphere>

        {/* Another outer layer with different appearance */}
        <Sphere args={[1.1, 32, 32]} scale={[1, 1.2, 0.8]}>
          <meshStandardMaterial
            color={color}
            roughness={0.7}
            metalness={0.3}
            transparent
            opacity={0.2}
          />
        </Sphere>

        {/* Neural nodes */}
        {neuralNodes.map((nodePos, index) => (
          <NeuralNode
            key={`node-${index}`}
            position={nodePos}
            size={0.08 + Math.random() * 0.05}
            color={color}
            emissiveColor={emissiveColor}
            pulseSpeed={0.5 + Math.random() * 1}
          />
        ))}

        {/* Neural synapses */}
        {neuralNodes.map((startPos, i) =>
          neuralNodes.slice(i + 1).map((endPos, j) => (
            <NeuralSynapse
              key={`synapse-${i}-${j}`}
              startPosition={startPos}
              endPosition={endPos}
              thickness={0.01 + Math.random() * 0.01}
              color={color}
              speed={0.5 + Math.random() * 1}
            />
          ))
        )}

        {/* Add a trail effect to the brain */}
        {clicked && (
          <Trail
            width={0.5}
            length={8}
            color={emissiveColor}
            attenuation={(t) => t * t}
          />
        )}
      </Float>
    </group>
  );
};

export default BrainModel;