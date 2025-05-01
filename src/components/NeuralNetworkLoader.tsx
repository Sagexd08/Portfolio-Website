import { useEffect, useRef } from 'react';
import styles from '../styles/NeuralNetworkLoader.module.css';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Connection {
  source: number;
  target: number;
  strength: number;
}

const NeuralNetworkLoader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Neural network parameters
    const nodeCount = 50;
    const nodes: Node[] = [];
    const connections: Connection[] = [];
    const layerCount = 4;
    const nodesPerLayer = Math.ceil(nodeCount / layerCount);
    
    // Create nodes in layers
    for (let layer = 0; layer < layerCount; layer++) {
      for (let i = 0; i < nodesPerLayer && nodes.length < nodeCount; i++) {
        const x = (canvas.width * (layer + 1)) / (layerCount + 1);
        const y = (canvas.height * (i + 1)) / (nodesPerLayer + 1);
        
        nodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 2
        });
      }
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() < 0.1) {
          connections.push({
            source: i,
            target: j,
            strength: Math.random()
          });
        }
      }
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw connections
      ctx.lineWidth = 0.5;
      connections.forEach(connection => {
        const source = nodes[connection.source];
        const target = nodes[connection.target];
        
        const distance = Math.hypot(target.x - source.x, target.y - source.y);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          
          const alpha = Math.max(0, 1 - distance / maxDistance) * connection.strength;
          ctx.strokeStyle = `rgba(88, 101, 242, ${alpha})`;
          
          ctx.stroke();
        }
      });
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Update position with small random movements
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x <= node.radius || node.x >= canvas.width - node.radius) {
          node.vx = -node.vx;
        }
        
        if (node.y <= node.radius || node.y >= canvas.height - node.radius) {
          node.vy = -node.vy;
        }
        
        // Occasionally change direction
        if (Math.random() < 0.02) {
          node.vx = (Math.random() - 0.5) * 0.5;
          node.vy = (Math.random() - 0.5) * 0.5;
        }
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#5865F2';
        ctx.fill();
      });
      
      // Pulse animation for loading effect
      const time = Date.now() / 1000;
      const pulseNodes = Math.floor((Math.sin(time) + 1) / 2 * nodes.length);
      
      for (let i = 0; i < pulseNodes; i++) {
        const node = nodes[i];
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(88, 101, 242, 0.3)';
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className={styles.loaderContainer}>
      <canvas ref={canvasRef} className={styles.neuralCanvas}></canvas>
      <div className={styles.loadingText}>
        <h2>Loading Neural Experience</h2>
        <div className={styles.dots}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetworkLoader;