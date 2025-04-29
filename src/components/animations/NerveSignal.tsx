import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './NerveSignal.module.css';

interface Point {
  x: number;
  y: number;
}

interface NerveSignalProps {
  startElement: string | null;
  endElement: string | null;
  color?: string;
  duration?: number;
  thickness?: number;
  onComplete?: () => void;
}

const NerveSignal: React.FC<NerveSignalProps> = ({
  startElement,
  endElement,
  color = '#6366f1',
  duration = 0.8,
  thickness = 2,
  onComplete,
}) => {
  const [path, setPath] = useState<Point[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const controls = useAnimation();

  // Calculate the path between two elements
  useEffect(() => {
    if (!startElement || !endElement) return;

    const calculatePath = () => {
      const startEl = document.querySelector(startElement);
      const endEl = document.querySelector(endElement);

      if (!startEl || !endEl) return;

      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();

      // Calculate start and end points (center of elements)
      const start: Point = {
        x: startRect.left + startRect.width / 2,
        y: startRect.top + startRect.height / 2,
      };

      const end: Point = {
        x: endRect.left + endRect.width / 2,
        y: endRect.top + endRect.height / 2,
      };

      // Calculate control points for a curved path
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Control point offset (perpendicular to the line)
      const offset = distance / 3;
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;

      // Add some randomness to the control point
      const randomOffset = (Math.random() - 0.5) * offset;

      const control1: Point = {
        x: midX + randomOffset,
        y: midY + randomOffset,
      };

      // Create path
      const pathPoints = [start, control1, end];

      // Calculate SVG dimensions
      const minX = Math.min(start.x, control1.x, end.x) - 20;
      const minY = Math.min(start.y, control1.y, end.y) - 20;
      const maxX = Math.max(start.x, control1.x, end.x) + 20;
      const maxY = Math.max(start.y, control1.y, end.y) + 20;

      // Adjust path points relative to SVG
      const adjustedPath = pathPoints.map(point => ({
        x: point.x - minX,
        y: point.y - minY,
      }));

      setPath(adjustedPath);
      setDimensions({
        width: maxX - minX,
        height: maxY - minY,
      });

      // Position the SVG
      if (svgRef.current) {
        svgRef.current.style.left = `${minX}px`;
        svgRef.current.style.top = `${minY}px`;
      }
    };

    calculatePath();
    setIsAnimating(true);

    // Animate the path
    controls.start({
      pathLength: 1,
      transition: { duration, ease: "easeInOut" },
    }).then(() => {
      if (onComplete) onComplete();
      setIsAnimating(false);
    });

    // Recalculate on window resize
    window.addEventListener('resize', calculatePath);
    return () => window.removeEventListener('resize', calculatePath);
  }, [startElement, endElement, controls, duration, onComplete]);

  if (!isAnimating || path.length < 2) return null;

  // Create SVG path
  const pathData = `M ${path[0].x} ${path[0].y} Q ${path[1].x} ${path[1].y} ${path[2].x} ${path[2].y}`;

  return (
    <svg
      ref={svgRef}
      className={styles.nerveSignal}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        position: 'fixed',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <motion.path
        d={pathData}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={controls}
      />
      <motion.circle
        cx={path[0].x}
        cy={path[0].y}
        r={thickness * 2}
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 0] }}
        transition={{ duration: duration * 0.3, ease: "easeOut" }}
      />
      <motion.circle
        cx={path[2].x}
        cy={path[2].y}
        r={thickness * 2}
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 0 }}
        transition={{ duration: duration * 0.7, ease: "easeIn" }}
        style={{ opacity: 0 }}
      />
    </svg>
  );
};

export default NerveSignal;
