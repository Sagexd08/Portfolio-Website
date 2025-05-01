import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface TransitionEffectProps {
  sourcePosition: [number, number];
  targetPosition: [number, number];
}

const TransitionEffect: React.FC<TransitionEffectProps> = ({ 
  sourcePosition, 
  targetPosition 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pulseControls = useAnimation();
  const pathControls = useAnimation();
  const particleControls = useAnimation();
  
  // Calculate path and animate when component mounts
  useEffect(() => {
    // Generate a slightly curved path between source and target
    const [sx, sy] = sourcePosition;
    const [tx, ty] = targetPosition;
    
    // Calculate control point for the quadratic curve
    const dx = tx - sx;
    const dy = ty - sy;
    const midX = sx + dx / 2;
    const midY = sy + dy / 2;
    
    // Add a slight curve
    const curveOffsetX = -dy * 0.2; // Perpendicular to line direction
    const curveOffsetY = dx * 0.2;
    const ctrlX = midX + curveOffsetX;
    const ctrlY = midY + curveOffsetY;
    
    // Create SVG path
    const path = `M${sx},${sy} Q${ctrlX},${ctrlY} ${tx},${ty}`;
    
    // Initial pulse at source position
    pulseControls.start({
      scale: [0, 1.5, 0],
      opacity: [0, 0.8, 0],
      transition: { duration: 0.5, ease: "easeOut" }
    });
    
    // Animate the path drawing
    pathControls.start({
      pathLength: [0, 1],
      opacity: [0.8, 0],
      transition: { duration: 0.5, ease: "easeInOut" }
    });
    
    // Animate the particles along the path
    particleControls.start({
      offsetDistance: ["0%", "100%"],
      scale: [1, 0],
      transition: { duration: 0.5, ease: "easeIn" }
    });
    
    // Store the path for reference
    if (svgRef.current) {
      const pathElement = svgRef.current.querySelector("path");
      if (pathElement) {
        pathElement.setAttribute("d", path);
      }
    }
  }, [sourcePosition, targetPosition, pulseControls, pathControls, particleControls]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg ref={svgRef} className="w-full h-full absolute inset-0">
        {/* Initial pulse at source */}
        <motion.circle
          cx={sourcePosition[0]}
          cy={sourcePosition[1]}
          r={20}
          fill="none"
          stroke="#6366f1"
          strokeWidth={2}
          animate={pulseControls}
        />
        
        {/* The neural connection path */}
        <motion.path
          d=""
          stroke="#6366f1"
          strokeWidth={2}
          fill="none"
          animate={pathControls}
        />
        
        {/* Particle that travels along the path */}
        <motion.circle
          r={5}
          fill="#6366f1"
          filter="url(#glow)"
          animate={particleControls}
          style={{ offsetPath: "path('')", offsetRotate: "0deg" }}
        />
        
        {/* Pulse at destination */}
        <motion.circle
          cx={targetPosition[0]}
          cy={targetPosition[1]}
          r={0}
          fill="#6366f1"
          animate={{
            r: [0, 30],
            opacity: [0, 0.8, 0],
            transition: { delay: 0.4, duration: 0.6 }
          }}
        />
        
        {/* SVG Filters */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default TransitionEffect;