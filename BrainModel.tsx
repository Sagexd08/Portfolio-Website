import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFResult } from '@/types/three-types';
import { useLoading } from '@/context/LoadingContext';

interface BrainModelProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  animate?: boolean;
  onClick?: () => void;
  pulseIntensity?: number;
}

const BrainModel: React.FC<BrainModelProps> = ({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  animate = true,
  onClick,
  pulseIntensity = 0.2
}) => {
  const brainRef = useRef<THREE.Group>(null);
  const { isLoading } = useLoading();
  
  // Load the GLTF model (assumes the brain model is available)
  // Use a placeholder sphere mesh if the model isn't available
  const { scene, animations } = useGLTF('/models/brain.glb') as unknown as GLTFResult;
  const { actions, names } = useAnimations(animations, brainRef);
  
  // Apply any animations if they exist
  useEffect(() => {
    if (names.length > 0 && animate && !isLoading) {
      const animationName = names[0]; // Use the first animation
      actions[animationName]?.reset().play();
    }
    
    return () => {
      if (names.length > 0) {
        const animationName = names[0];
        actions[animationName]?.stop();
      }
    };
  }, [actions, names, animate, isLoading]);
  
  // Handle hover and pulse animations
  useFrame(({ clock }) => {
    if (!brainRef.current || isLoading) return;
    
    if (animate) {
      // Apply a subtle floating animation
      const time = clock.getElapsedTime();
      brainRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
      
      // Apply a rotation animation
      brainRef.current.rotation.y = rotation[1] + time * 0.1;
      
      // Pulse effect
      const pulse = 1 + Math.sin(time * 2) * pulseIntensity * 0.05;
      brainRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
    }
  });
  
  // Generate random neural activity animation
  useEffect(() => {
    if (!brainRef.current) return;
    
    // Find all materials in the brain model
    const materials: THREE.Material[] = [];
    brainRef.current.traverse((child) => {
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
          material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.2;
        }
      });
      
      requestAnimationFrame(animateMaterials);
    };
    
    let animationFrame = requestAnimationFrame(animateMaterials);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <group
      ref={brainRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
      onClick={onClick}
    >
      {/* If the GLTF model is loaded, use it. Otherwise, use a placeholder sphere */}
      {scene?.children.length ? (
        <primitive object={scene.clone()} />
      ) : (
        <group>
          {/* Placeholder brain made of multiple spheres if GLTF isn't available */}
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial 
              color="#6366f1" 
              emissive="#4338ca"
              metalness={0.3}
              roughness={0.6}
            />
          </mesh>
          <mesh position={[0.7, 0.5, 0]}>
            <sphereGeometry args={[0.7, 24, 24]} />
            <meshStandardMaterial 
              color="#6366f1" 
              emissive="#4338ca"
              metalness={0.3}
              roughness={0.6}
            />
          </mesh>
          <mesh position={[-0.7, 0.5, 0]}>
            <sphereGeometry args={[0.7, 24, 24]} />
            <meshStandardMaterial 
              color="#6366f1" 
              emissive="#4338ca"
              metalness={0.3}
              roughness={0.6}
            />
          </mesh>
          <mesh position={[0, -0.5, 0.5]} scale={[0.8, 0.8, 1.2]}>
            <sphereGeometry args={[0.6, 24, 24]} />
            <meshStandardMaterial 
              color="#6366f1" 
              emissive="#4338ca"
              metalness={0.3}
              roughness={0.6}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default BrainModel;

// Preload the model
useGLTF.preload('/models/brain.glb');