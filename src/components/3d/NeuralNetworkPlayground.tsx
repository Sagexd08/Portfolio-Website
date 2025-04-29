import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// Neural Network Node
interface NodeProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  label?: string;
  activation?: number;
  onClick?: () => void;
}

const Node: React.FC<NodeProps> = ({
  position,
  size = 0.5,
  color = '#6366f1',
  label = '',
  activation = 0.5,
  onClick,
}) => {
  const nodeRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Calculate color based on activation
  const activeColor = useMemo(() => {
    const baseColor = new THREE.Color(color);
    const activeColor = new THREE.Color('#10b981');
    return baseColor.lerp(activeColor, activation);
  }, [color, activation]);
  
  useFrame((state) => {
    if (nodeRef.current) {
      // Pulse effect
      const time = state.clock.getElapsedTime();
      const scale = size * (1 + 0.1 * Math.sin(time * 2 * activation));
      nodeRef.current.scale.setScalar(hovered ? scale * 1.2 : scale);
      
      // Glow effect based on activation
      if (nodeRef.current.material) {
        const material = nodeRef.current.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.5 + 0.5 * activation + (hovered ? 0.3 : 0);
      }
    }
  });
  
  return (
    <group position={position}>
      <mesh
        ref={nodeRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          setClicked(!clicked);
          if (onClick) onClick();
        }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={activeColor.getHex()}
          emissive={activeColor.getHex()}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {label && (
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
      
      {/* Activation value */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {activation.toFixed(2)}
      </Text>
    </group>
  );
};

// Neural Network Connection
interface ConnectionProps {
  startPos: [number, number, number];
  endPos: [number, number, number];
  weight?: number;
  onClick?: () => void;
}

const Connection: React.FC<ConnectionProps> = ({
  startPos,
  endPos,
  weight = 0.5,
  onClick,
}) => {
  const lineRef = useRef<THREE.Line>(null);
  const [hovered, setHovered] = useState(false);
  
  // Calculate color based on weight (red for negative, green for positive)
  const color = useMemo(() => {
    if (weight < 0) {
      return new THREE.Color('#ef4444').lerp(new THREE.Color('#ffffff'), 1 + weight);
    } else {
      return new THREE.Color('#10b981').lerp(new THREE.Color('#ffffff'), 1 - weight);
    }
  }, [weight]);
  
  // Create line geometry
  const points = useMemo(() => {
    return [
      new THREE.Vector3(...startPos),
      new THREE.Vector3(...endPos),
    ];
  }, [startPos, endPos]);
  
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);
  
  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Animate line width based on weight
      if (lineRef.current.material) {
        const material = lineRef.current.material as THREE.LineBasicMaterial;
        material.opacity = 0.5 + 0.5 * Math.abs(weight) + (hovered ? 0.3 : 0) + 0.1 * Math.sin(time * 3);
      }
    }
  });
  
  // Calculate midpoint for weight label
  const midPoint = useMemo(() => {
    return [
      (startPos[0] + endPos[0]) / 2,
      (startPos[1] + endPos[1]) / 2,
      (startPos[2] + endPos[2]) / 2,
    ] as [number, number, number];
  }, [startPos, endPos]);
  
  return (
    <group>
      <line
        ref={lineRef}
        geometry={lineGeometry}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
      >
        <lineBasicMaterial
          color={color}
          linewidth={1}
          transparent
          opacity={0.7}
        />
      </line>
      
      {/* Weight value */}
      <Text
        position={midPoint}
        fontSize={0.2}
        color={weight < 0 ? '#ef4444' : '#10b981'}
        anchorX="center"
        anchorY="middle"
        backgroundColor="#00000080"
        padding={0.05}
      >
        {weight.toFixed(2)}
      </Text>
    </group>
  );
};

// Neural Network Playground Component
interface NeuralNetworkPlaygroundProps {
  layers?: number[];
  interactive?: boolean;
  width?: number;
  height?: number;
  depth?: number;
}

const NeuralNetworkPlayground: React.FC<NeuralNetworkPlaygroundProps> = ({
  layers = [3, 4, 3, 2],
  interactive = true,
  width = 10,
  height = 6,
  depth = 4,
}) => {
  // State for node activations and connection weights
  const [activations, setActivations] = useState<number[][]>([]);
  const [weights, setWeights] = useState<number[][][]>([]);
  
  // Initialize activations and weights
  useEffect(() => {
    // Initialize activations (random values between 0 and 1)
    const initialActivations = layers.map(layerSize => 
      Array.from({ length: layerSize }, () => Math.random())
    );
    setActivations(initialActivations);
    
    // Initialize weights (random values between -1 and 1)
    const initialWeights = [];
    for (let i = 0; i < layers.length - 1; i++) {
      const layerWeights = [];
      for (let j = 0; j < layers[i]; j++) {
        const nodeWeights = [];
        for (let k = 0; k < layers[i + 1]; k++) {
          nodeWeights.push(Math.random() * 2 - 1); // Random between -1 and 1
        }
        layerWeights.push(nodeWeights);
      }
      initialWeights.push(layerWeights);
    }
    setWeights(initialWeights);
  }, [layers]);
  
  // Handle node click (change activation)
  const handleNodeClick = (layerIndex: number, nodeIndex: number) => {
    if (!interactive) return;
    
    setActivations(prev => {
      const newActivations = [...prev];
      newActivations[layerIndex][nodeIndex] = Math.random();
      
      // If it's the input layer, propagate forward
      if (layerIndex === 0) {
        propagateForward(newActivations, weights);
      }
      
      return newActivations;
    });
  };
  
  // Handle connection click (change weight)
  const handleConnectionClick = (layerIndex: number, fromNodeIndex: number, toNodeIndex: number) => {
    if (!interactive) return;
    
    setWeights(prev => {
      const newWeights = [...prev];
      newWeights[layerIndex][fromNodeIndex][toNodeIndex] = Math.random() * 2 - 1;
      
      // Propagate forward after weight change
      const newActivations = [...activations];
      propagateForward(newActivations, newWeights);
      setActivations(newActivations);
      
      return newWeights;
    });
  };
  
  // Forward propagation function
  const propagateForward = (acts: number[][], wts: number[][][]) => {
    for (let l = 0; l < wts.length; l++) {
      for (let j = 0; j < acts[l + 1].length; j++) {
        let sum = 0;
        for (let i = 0; i < acts[l].length; i++) {
          sum += acts[l][i] * wts[l][i][j];
        }
        // Apply sigmoid activation function
        acts[l + 1][j] = 1 / (1 + Math.exp(-sum));
      }
    }
  };
  
  // Calculate node positions
  const nodePositions = useMemo(() => {
    const positions: [number, number, number][][] = [];
    
    for (let l = 0; l < layers.length; l++) {
      const layerPositions: [number, number, number][] = [];
      const layerSize = layers[l];
      const layerX = (l / (layers.length - 1) - 0.5) * width;
      
      for (let n = 0; n < layerSize; n++) {
        const nodeY = ((n / (layerSize - 1)) - 0.5) * height;
        layerPositions.push([layerX, nodeY, 0]);
      }
      
      positions.push(layerPositions);
    }
    
    return positions;
  }, [layers, width, height]);
  
  // Render the neural network
  return (
    <group>
      {/* Render nodes */}
      {activations.length > 0 && nodePositions.map((layerPositions, layerIndex) => (
        <React.Fragment key={`layer-${layerIndex}`}>
          {layerPositions.map((position, nodeIndex) => (
            <Node
              key={`node-${layerIndex}-${nodeIndex}`}
              position={position}
              label={layerIndex === 0 ? `Input ${nodeIndex + 1}` : 
                     layerIndex === layers.length - 1 ? `Output ${nodeIndex + 1}` : ''}
              activation={activations[layerIndex][nodeIndex]}
              onClick={() => handleNodeClick(layerIndex, nodeIndex)}
            />
          ))}
        </React.Fragment>
      ))}
      
      {/* Render connections */}
      {weights.length > 0 && weights.map((layerWeights, layerIndex) => (
        <React.Fragment key={`connections-${layerIndex}`}>
          {layerWeights.map((nodeWeights, fromNodeIndex) => (
            <React.Fragment key={`from-${layerIndex}-${fromNodeIndex}`}>
              {nodeWeights.map((weight, toNodeIndex) => (
                <Connection
                  key={`connection-${layerIndex}-${fromNodeIndex}-${toNodeIndex}`}
                  startPos={nodePositions[layerIndex][fromNodeIndex]}
                  endPos={nodePositions[layerIndex + 1][toNodeIndex]}
                  weight={weight}
                  onClick={() => handleConnectionClick(layerIndex, fromNodeIndex, toNodeIndex)}
                />
              ))}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </group>
  );
};

// Main component with Canvas
interface NeuralNetworkPlaygroundContainerProps {
  className?: string;
  height?: string;
  layers?: number[];
  interactive?: boolean;
}

const NeuralNetworkPlaygroundContainer: React.FC<NeuralNetworkPlaygroundContainerProps> = ({
  className = '',
  height = '500px',
  layers = [3, 4, 3, 2],
  interactive = true,
}) => {
  return (
    <div className={`${className}`} style={{ height }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        
        <NeuralNetworkPlayground
          layers={layers}
          interactive={interactive}
        />
        
        {/* Instructions */}
        <Html position={[0, -4, 0]} center>
          <div className="bg-dark-darker/80 text-white p-3 rounded-lg text-sm max-w-xs text-center">
            <p className="font-bold mb-1">Interactive Neural Network</p>
            <p>Click on nodes to change activations</p>
            <p>Click on connections to change weights</p>
          </div>
        </Html>
      </Canvas>
    </div>
  );
};

export default NeuralNetworkPlaygroundContainer;
