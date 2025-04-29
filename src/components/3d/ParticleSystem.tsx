import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

interface ParticleSystemProps {
  count?: number;
  radius?: number;
  colors?: string[];
  size?: number;
  speed?: number;
  interactive?: boolean;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 1000,
  radius = 5,
  colors = ['#6366f1', '#10b981', '#3b82f6'],
  size = 0.02,
  speed = 0.05,
  interactive = true,
}) => {
  const points = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Generate random positions for particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.cbrt(Math.random()) * radius;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    return positions;
  }, [count, radius]);

  // Generate random colors for particles
  const particlesColor = useMemo(() => {
    const colorArray = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      color.set(randomColor);
      
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }
    
    return colorArray;
  }, [count, colors]);

  // Animation spring for interactive effects
  const [spring, api] = useSpring(() => ({
    scale: 1,
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 }
  }));

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    if (interactive) {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    }
  };

  // Add mouse move event listener
  useMemo(() => {
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [interactive]);

  // Animate particles
  useFrame((state, delta) => {
    if (points.current) {
      // Rotate based on mouse position if interactive
      if (interactive) {
        api.start({
          rotation: [
            mousePosition.current.y * 0.1,
            mousePosition.current.x * 0.1,
            0
          ]
        });
      } else {
        // Regular rotation if not interactive
        points.current.rotation.x += delta * speed * 0.2;
        points.current.rotation.y += delta * speed * 0.1;
      }
      
      // Pulsate size
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      const initialPositions = particlesPosition;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = initialPositions[i3];
        const y = initialPositions[i3 + 1];
        const z = initialPositions[i3 + 2];
        
        // Add subtle movement
        const time = state.clock.elapsedTime;
        const offset = Math.sin(time * speed + i * 0.1) * 0.05;
        
        positions[i3] = x * (1 + offset);
        positions[i3 + 1] = y * (1 + offset);
        positions[i3 + 2] = z * (1 + offset);
      }
      
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <animated.group rotation={spring.rotation}>
      <Points ref={points} positions={particlesPosition} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </animated.group>
  );
};

export default ParticleSystem;
