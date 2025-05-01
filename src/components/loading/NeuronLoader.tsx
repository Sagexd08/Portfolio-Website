import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './NeuronLoader.module.css';

interface Neuron {
  id: number;
  x: number;
  y: number;
  size: number;
  connections: number[];
  active: boolean;
  activationTime: number;
  layer: number;
}

interface Connection {
  from: number;
  to: number;
  active: boolean;
  activationTime: number;
  pulsePosition: number;
}

interface NeuronLoaderProps {
  onLoadComplete: () => void;
}

const NeuronLoader: React.FC<NeuronLoaderProps> = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [neuronsFired, setNeuronsFired] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('Initializing Neurons');

  // Canvas and animation refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const lastActivationRef = useRef<number>(0);

  // Function to update canvas size
  const updateCanvasSize = useRef((canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Initialize neural network
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Set canvas dimensions
        const handleResize = () => {
          if (canvasRef.current) {
            updateCanvasSize.current(canvasRef.current);
          }
        };

        // Initial size
        updateCanvasSize.current(canvas);

        // Add resize listener
        window.addEventListener('resize', handleResize);

        // Create neural network
        createNeuralNetwork();

        // Start animation
        startAnimation();

        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        };
      }
    }
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);

          // Add a small delay before completing the loading
          setTimeout(() => {
            setIsLoading(false);
            onLoadComplete();
          }, 500);

          return 100;
        }
        return newProgress;
      });

      // Increment neurons fired count
      const newFired = Math.floor(Math.random() * 10) + 1;
      setNeuronsFired((prev) => prev + newFired);

      // Update loading status
      if (progress < 25) {
        setLoadingStatus('Initializing Neurons');
      } else if (progress < 50) {
        setLoadingStatus('Calibrating Synapses');
      } else if (progress < 75) {
        setLoadingStatus('Optimizing Weights');
      } else {
        setLoadingStatus('Finalizing Network');
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete, progress]);

  // Create neural network
  const createNeuralNetwork = () => {
    const neurons: Neuron[] = [];
    const connections: Connection[] = [];

    // Define network architecture (layers and neurons per layer)
    const layers = [12, 18, 12, 8];
    let neuronId = 0;

    // Create neurons for each layer
    layers.forEach((neuronsInLayer, layerIndex) => {
      const layerX = (layerIndex + 1) * (window.innerWidth / (layers.length + 1));

      for (let i = 0; i < neuronsInLayer; i++) {
        const layerHeight = neuronsInLayer * 30;
        const startY = (window.innerHeight / 2) - (layerHeight / 2);
        const y = startY + (i * 30);

        neurons.push({
          id: neuronId,
          x: layerX,
          y,
          size: 6 + Math.random() * 4,
          connections: [],
          active: false,
          activationTime: 0,
          layer: layerIndex
        });

        // Connect to previous layer
        if (layerIndex > 0) {
          const prevLayer = layerIndex - 1;
          const prevLayerNeurons = neurons.filter(n => n.layer === prevLayer);

          // Connect to 2-4 random neurons in previous layer
          const connectionsCount = 2 + Math.floor(Math.random() * 3);
          const availableNeurons = [...prevLayerNeurons];

          for (let j = 0; j < connectionsCount; j++) {
            if (availableNeurons.length > 0) {
              const randomIndex = Math.floor(Math.random() * availableNeurons.length);
              const targetNeuron = availableNeurons[randomIndex];
              availableNeurons.splice(randomIndex, 1);

              connections.push({
                from: targetNeuron.id,
                to: neuronId,
                active: false,
                activationTime: 0,
                pulsePosition: 0
              });

              neurons[targetNeuron.id].connections.push(neuronId);
            }
          }
        }

        neuronId++;
      }
    });

    neuronsRef.current = neurons;
    connectionsRef.current = connections;
  };

  // Start animation
  const startAnimation = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ensure canvas is properly sized
    updateCanvasSize.current(canvas);

    const animate = (timestamp: number) => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Activate random input neurons periodically
      if (timestamp - lastActivationRef.current > 300) {
        const inputNeurons = neuronsRef.current.filter(n => n.layer === 0);
        if (inputNeurons.length > 0) {
          const randomIndex = Math.floor(Math.random() * inputNeurons.length);
          activateNeuron(inputNeurons[randomIndex].id, timestamp);
          lastActivationRef.current = timestamp;
        }
      }

      // Draw connections
      drawConnections(ctx, timestamp);

      // Draw neurons
      drawNeurons(ctx, timestamp);

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Activate a neuron and propagate signal
  const activateNeuron = (id: number, timestamp: number) => {
    const neurons = neuronsRef.current;
    const connections = connectionsRef.current;

    // Find the neuron
    const neuron = neurons.find(n => n.id === id);
    if (neuron && !neuron.active) {
      // Activate the neuron
      neuron.active = true;
      neuron.activationTime = timestamp;

      // Activate outgoing connections
      neuron.connections.forEach(targetId => {
        const connection = connections.find(c => c.from === id && c.to === targetId);
        if (connection) {
          connection.active = true;
          connection.activationTime = timestamp;
          connection.pulsePosition = 0;

          // Schedule activation of target neuron (with delay)
          setTimeout(() => {
            activateNeuron(targetId, performance.now());
          }, 200 + Math.random() * 100);
        }
      });

      // Deactivate after a delay
      setTimeout(() => {
        neuron.active = false;
      }, 500);
    }
  };

  // Draw neurons
  const drawNeurons = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    const neurons = neuronsRef.current;

    neurons.forEach(neuron => {
      // Draw neuron
      ctx.beginPath();

      // Neuron glow effect when active
      if (neuron.active) {
        const timeSinceActivation = timestamp - neuron.activationTime;
        const glowIntensity = Math.max(0, 1 - timeSinceActivation / 500);

        const gradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, neuron.size * 3
        );

        gradient.addColorStop(0, `rgba(99, 102, 241, ${glowIntensity * 0.8})`);
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(neuron.x, neuron.y, neuron.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Neuron body
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.size, 0, Math.PI * 2);

      // Gradient fill
      const gradient = ctx.createRadialGradient(
        neuron.x - neuron.size * 0.3, neuron.y - neuron.size * 0.3, 0,
        neuron.x, neuron.y, neuron.size
      );

      if (neuron.active) {
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#6366f1');
      } else {
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#1a1a2e');
      }

      ctx.fillStyle = gradient;
      ctx.fill();

      // Neuron border
      ctx.strokeStyle = neuron.active ? '#6366f1' : '#2a2a3a';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  };

  // Draw connections
  const drawConnections = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    const neurons = neuronsRef.current;
    const connections = connectionsRef.current;

    connections.forEach(connection => {
      const fromNeuron = neurons.find(n => n.id === connection.from);
      const toNeuron = neurons.find(n => n.id === connection.to);

      if (fromNeuron && toNeuron) {
        // Draw base connection line
        ctx.beginPath();
        ctx.moveTo(fromNeuron.x, fromNeuron.y);
        ctx.lineTo(toNeuron.x, toNeuron.y);
        ctx.strokeStyle = 'rgba(60, 60, 80, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw active connection with pulse
        if (connection.active) {
          const timeSinceActivation = timestamp - connection.activationTime;
          const duration = 300; // ms to travel along connection

          // Calculate pulse position (0 to 1)
          connection.pulsePosition = Math.min(1, timeSinceActivation / duration);

          // Calculate point along the connection
          const x = fromNeuron.x + (toNeuron.x - fromNeuron.x) * connection.pulsePosition;
          const y = fromNeuron.y + (toNeuron.y - fromNeuron.y) * connection.pulsePosition;

          // Draw the active part of the connection
          ctx.beginPath();
          ctx.moveTo(fromNeuron.x, fromNeuron.y);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(99, 102, 241, 0.8)`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw pulse effect
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
          ctx.fill();

          // Deactivate connection after pulse completes
          if (connection.pulsePosition >= 1) {
            setTimeout(() => {
              connection.active = false;
            }, 100);
          }
        }
      }
    });
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.loaderContainer}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Neural network canvas */}
          <canvas
            ref={canvasRef}
            className={styles.neuralCanvas}
          />

          {/* Static neuron grid (as fallback and additional visual) */}
          <div className={styles.neuronGrid}>
            {Array.from({ length: 100 }).map((_, index) => (
              <div
                key={index}
                className={`${styles.neuron} ${
                  index < (progress / 100) * 100 ? styles.active : ''
                }`}
                style={{
                  animationDelay: `${index * 0.02}s`,
                }}
              />
            ))}
          </div>

          <div className={styles.loaderInfo}>
            <h1 className={styles.loaderTitle}>Neural Network Initializing</h1>
            <div className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={styles.loaderStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Progress:</span>
                <span className={styles.statValue}>{Math.floor(progress)}%</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Neurons Fired:</span>
                <span className={styles.statValue}>{neuronsFired.toLocaleString()}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Status:</span>
                <span className={styles.statValue}>{loadingStatus}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NeuronLoader;
