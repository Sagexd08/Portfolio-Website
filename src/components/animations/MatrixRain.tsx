import React, { useRef, useEffect } from 'react';
import styles from './MatrixRain.module.css';

interface MatrixRainProps {
  className?: string;
  fontSize?: number;
  speed?: number;
  density?: number;
  color?: string;
  backgroundColor?: string;
  characters?: string;
  opacity?: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  className = '',
  fontSize = 14,
  speed = 1,
  density = 0.05,
  color = '#6366f1',
  backgroundColor = 'transparent',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~',
  opacity = 0.8,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match parent element
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix rain effect
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }
    
    // Draw function
    const draw = () => {
      // Semi-transparent background to create fade effect
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text properties
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Calculate x position
        const x = i * fontSize;
        
        // Calculate y position
        const y = drops[i] * fontSize;
        
        // Calculate opacity based on position (fade out at the bottom)
        const charOpacity = Math.min(1, Math.max(0.1, 1 - (y / canvas.height)));
        
        // Draw the character with varying opacity
        ctx.globalAlpha = charOpacity * opacity;
        ctx.fillText(text, x, y);
        
        // Reset drop if it reaches bottom or randomly
        if (y > canvas.height || Math.random() > 0.99) {
          drops[i] = 0;
        }
        
        // Move drop down
        drops[i]++;
      }
    };
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      // Adjust speed by skipping frames
      if (Math.random() < speed) {
        draw();
      }
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [fontSize, speed, density, color, backgroundColor, characters, opacity]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`${styles.matrixRain} ${className}`}
      style={{ opacity }}
    />
  );
};

export default MatrixRain;
