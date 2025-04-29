import React, { useRef, useEffect, useState } from 'react';
import styles from './ParticleText.module.css';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

interface ParticleTextProps {
  text: string;
  className?: string;
  fontSize?: number;
  particleSize?: number;
  particleGap?: number;
  color?: string;
  interactive?: boolean;
  density?: number;
}

const ParticleText: React.FC<ParticleTextProps> = ({
  text,
  className = '',
  fontSize = 80,
  particleSize = 2,
  particleGap = 4,
  color = '#6366f1',
  interactive = true,
  density = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      
      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });
      
      // Redraw text and initialize particles
      initParticles();
    };
    
    // Initialize particles from text
    const initParticles = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw text (invisible, just to get pixel data)
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      
      // Measure text
      const textWidth = ctx.measureText(text).width;
      const textHeight = fontSize;
      
      // Calculate position to center text
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      
      // Draw text
      ctx.fillText(text, x, y);
      
      // Get image data
      const imageData = ctx.getImageData(
        Math.max(0, x - textWidth / 2 - 10),
        Math.max(0, y - textHeight / 2 - 10),
        Math.min(canvas.width, textWidth + 20),
        Math.min(canvas.height, textHeight + 20)
      );
      
      // Create particles
      const particles: Particle[] = [];
      
      // Scan pixel data and create particles
      for (let py = 0; py < imageData.height; py += particleGap) {
        for (let px = 0; px < imageData.width; px += particleGap) {
          // Get pixel index
          const index = (py * imageData.width + px) * 4;
          
          // Check if pixel is not transparent
          if (imageData.data[index + 3] > 0) {
            // Calculate actual position
            const x = px + Math.max(0, canvas.width / 2 - textWidth / 2 - 10);
            const y = py + Math.max(0, canvas.height / 2 - textHeight / 2 - 10);
            
            // Skip some particles based on density
            if (Math.random() > density) continue;
            
            // Create particle
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              size: particleSize * (0.8 + Math.random() * 0.4),
              color,
              alpha: 0.6 + Math.random() * 0.4,
              vx: 0,
              vy: 0,
              originX: x,
              originY: y,
            });
          }
        }
      }
      
      particlesRef.current = particles;
    };
    
    // Handle window resize
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [text, fontSize, particleSize, particleGap, color, density]);
  
  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    
    // Mouse leave handler
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };
    
    // Add event listeners
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (const particle of particlesRef.current) {
        // Calculate distance to target position
        const dx = particle.originX - particle.x;
        const dy = particle.originY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate force
        const force = distance * 0.03;
        const angle = Math.atan2(dy, dx);
        
        // Update velocity
        particle.vx += Math.cos(angle) * force;
        particle.vy += Math.sin(angle) * force;
        
        // Apply friction
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        
        // Interactive mode - repel particles from mouse
        if (interactive) {
          const mouseX = mouseRef.current.x;
          const mouseY = mouseRef.current.y;
          const mouseRadius = mouseRef.current.radius;
          
          const mdx = mouseX - particle.x;
          const mdy = mouseY - particle.y;
          const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);
          
          if (mouseDistance < mouseRadius) {
            const mouseForce = (mouseRadius - mouseDistance) * 0.1;
            const mouseAngle = Math.atan2(mdy, mdx);
            
            particle.vx -= Math.cos(mouseAngle) * mouseForce;
            particle.vy -= Math.sin(mouseAngle) * mouseForce;
          }
        }
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.alpha})`;
        ctx.fill();
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [interactive, dimensions]);
  
  // Helper function to convert hex color to RGB
  const hexToRgb = (hex: string): string => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  };
  
  return (
    <canvas
      ref={canvasRef}
      className={`${styles.particleText} ${className}`}
    />
  );
};

export default ParticleText;
