import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

interface FloatingInputProps {
  position: [number, number, number];
  width?: number;
  height?: number;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  position,
  width = 4,
  height = 0.5,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  type = 'text',
}) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  
  // Animation
  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });
  
  // Handle focus
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setFocused(true);
    if (onFocus) onFocus();
  };
  
  // Handle blur
  const handleBlur = () => {
    setFocused(false);
    if (onBlur) onBlur();
  };
  
  return (
    <group position={position}>
      {/* 3D Input Box */}
      <motion.group
        ref={boxRef}
        whileHover={{ scale: 1.05 }}
        animate={{
          z: focused ? 0.2 : 0,
        }}
      >
        <RoundedBox
          args={[width, height, 0.1]}
          radius={0.1}
          smoothness={4}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={handleClick}
        >
          <meshStandardMaterial
            color={focused ? '#6366f1' : hovered ? '#4f46e5' : '#1f2937'}
            metalness={0.5}
            roughness={0.2}
          />
        </RoundedBox>
        
        {/* Label */}
        <Text
          position={[-width / 2 + 0.2, 0, 0.06]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {value ? '' : label}
        </Text>
        
        {/* Value */}
        <Text
          position={[-width / 2 + 0.2, 0, 0.06]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          maxWidth={width - 0.4}
        >
          {value}
        </Text>
      </motion.group>
      
      {/* Hidden HTML Input */}
      <Html position={[0, 0, 0]}>
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
        />
      </Html>
    </group>
  );
};

// HTML component for Three.js
const Html: React.FC<{ children: React.ReactNode; position: [number, number, number] }> = ({ children, position }) => {
  const { size, viewport } = useThree();
  const [htmlEl] = useState(() => document.createElement('div'));
  
  React.useEffect(() => {
    htmlEl.style.position = 'absolute';
    htmlEl.style.top = '0';
    htmlEl.style.left = '0';
    htmlEl.style.width = '100%';
    htmlEl.style.height = '100%';
    htmlEl.style.pointerEvents = 'none';
    document.body.appendChild(htmlEl);
    
    return () => {
      document.body.removeChild(htmlEl);
    };
  }, [htmlEl]);
  
  return (
    <group position={position}>
      {React.cloneElement(children as React.ReactElement, {
        style: {
          ...((children as React.ReactElement).props.style || {}),
          position: 'absolute',
          left: `${(position[0] / viewport.width + 0.5) * 100}%`,
          top: `${(-position[1] / viewport.height + 0.5) * 100}%`,
          transform: 'translate(-50%, -50%)',
        },
      })}
    </group>
  );
};

interface FloatingFormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}

const FloatingForm: React.FC<FloatingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    onSubmit(formData);
  };
  
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <FloatingInput
          position={[0, 1, 0]}
          label="Name"
          value={formData.name}
          onChange={(value) => handleChange('name', value)}
        />
        
        <FloatingInput
          position={[0, 0, 0]}
          label="Email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          type="email"
        />
        
        <FloatingInput
          position={[0, -1, 0]}
          label="Message"
          value={formData.message}
          onChange={(value) => handleChange('message', value)}
          width={4}
          height={1}
        />
        
        {/* Submit Button */}
        <group position={[0, -2, 0]}>
          <motion.group
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
          >
            <RoundedBox args={[2, 0.5, 0.1]} radius={0.1} smoothness={4}>
              <meshStandardMaterial
                color="#10b981"
                metalness={0.5}
                roughness={0.2}
              />
            </RoundedBox>
            
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.2}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              Send Message
            </Text>
          </motion.group>
        </group>
      </Canvas>
    </div>
  );
};

export default FloatingForm;
