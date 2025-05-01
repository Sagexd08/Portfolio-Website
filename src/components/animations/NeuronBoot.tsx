import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface NeuronBootProps {
  onComplete: () => void;
}

const NeuronBoot: React.FC<NeuronBootProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bootProgress, setBootProgress] = useState(0);
  const [neurons, setNeurons] = useState<Array<{ id: number; x: number; y: number; size: number; active: boolean; }>>([]);
  const [connections, setConnections] = useState<Array<{ from: number; to: number; progress: number; active: boolean; }>>([]);
  
  // Generate random neurons and connections on mount
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const neuronCount = Math.floor((width * height) / 15000); // Responsive neuron count
    
    // Create neurons in a grid-like pattern
    const layerCount = 4;
    const neuronsPerLayer = Math.ceil(neuronCount / layerCount);
    const newNeurons = [];
    
    for (let layer = 0; layer < layerCount; layer++) {
      for (let i = 0; i < neuronsPerLayer; i++) {
        newNeurons.push({
          id: layer * neuronsPerLayer + i,
          x: (width * (layer + 1)) / (layerCount + 1) + (Math.random() - 0.5) * 60,
          y: (height * (i + 1)) / (neuronsPerLayer + 1) + (Math.random() - 0.5) * 60,
          size: Math.random() * 3 + 3,
          active: false
        });
      }
    }
    
    setNeurons(newNeurons);
    
    // Create connections between layers
    const newConnections = [];
    
    for (let layer = 0; layer < layerCount - 1; layer++) {
      const sourceLayerStart = layer * neuronsPerLayer;
      const targetLayerStart = (layer + 1) * neuronsPerLayer;
      
      for (let i = 0; i < neuronsPerLayer; i++) {
        const sourceIndex = sourceLayerStart + i;
        
        // Connect to 2-3 neurons in the next layer
        const connectionCount = Math.floor(Math.random() * 2) + 2;
        
        for (let c = 0; c < connectionCount; c++) {
          if (targetLayerStart + c < newNeurons.length) {
            const targetIndex = targetLayerStart + Math.floor(Math.random() * neuronsPerLayer);
            
            newConnections.push({
              from: sourceIndex,
              to: targetIndex,
              progress: 0,
              active: false
            });
          }
        }
      }
    }
    
    setConnections(newConnections);
    
    // Start the boot sequence
    startBootSequence(newNeurons, newConnections);
  }, []);
  
  // Boot sequence animation
  const startBootSequence = (initialNeurons: typeof neurons, initialConnections: typeof connections) => {
    let progress = 0;
    let activeNeuronCount = 0;
    const totalNeurons = initialNeurons.length;
    const activationDelay = 2500 / totalNeurons; // Spread activations across 2.5 seconds
    
    // Create a copy of the neurons and connections for animation
    const animatedNeurons = [...initialNeurons];
    const animatedConnections = [...initialConnections];
    
    // Function to activate a neuron and its connections
    const activateNeuron = (index: number) => {
      if (index >= animatedNeurons.length) return;
      
      // Activate the neuron
      animatedNeurons[index].active = true;
      setNeurons([...animatedNeurons]);
      activeNeuronCount++;
      
      // Update boot progress
      progress = Math.min(100, Math.floor((activeNeuronCount / totalNeurons) * 100));
      setBootProgress(progress);
      
      // Activate outgoing connections
      const outgoingConnections = animatedConnections.filter(conn => conn.from === index);
      
      outgoingConnections.forEach((conn, i) => {
        // Animate connection over time
        setTimeout(() => {
          animateConnection(conn);
        }, i * 100); // Stagger connection animations
      });
      
      // Check if boot sequence is complete
      if (activeNeuronCount >= totalNeurons) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };
    
    // Animate a connection from source to target
    const animateConnection = (connection: typeof connections[0]) => {
      let step = 0;
      const totalSteps = 10;
      
      const interval = setInterval(() => {
        if (step >= totalSteps) {
          clearInterval(interval);
          
          // Once connection reaches target, activate the target neuron
          const targetIndex = connection.to;
          if (!animatedNeurons[targetIndex].active) {
            setTimeout(() => {
              activateNeuron(targetIndex);
            }, 100);
          }
          
          // Mark connection as active
          connection.active = true;
          connection.progress = 1;
        } else {
          step++;
          connection.progress = step / totalSteps;
        }
        
        setConnections([...animatedConnections]);
      }, 30);
    };
    
    // Start with the first layer neurons
    for (let i = 0; i < Math.min(5, totalNeurons); i++) {
      setTimeout(() => {
        activateNeuron(i);
      }, i * activationDelay);
    }
  };
  
  return (
    <div className="loader-wrapper">
      <div 
        ref={containerRef} 
        className="w-full h-full relative overflow-hidden"
        style={{ background: 'radial-gradient(circle at center, #1e293b, #0f172a)' }}
      >
        <svg className="absolute inset-0 w-full h-full">
          {/* Render connections */}
          {connections.map((connection, index) => {
            const source = neurons[connection.from];
            const target = neurons[connection.to];
            
            if (!source || !target) return null;
            
            // Calculate progress along the line
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const progressX = source.x + dx * connection.progress;
            const progressY = source.y + dy * connection.progress;
            
            return (
              <line 
                key={`conn-${index}`}
                x1={source.x}
                y1={source.y}
                x2={connection.active ? target.x : progressX}
                y2={connection.active ? target.y : progressY}
                stroke={connection.active ? "#6366f1" : "#4338ca"}
                strokeWidth={connection.active ? 1 : 2}
                strokeOpacity={connection.active ? 0.4 : 0.7}
                className={connection.active ? "synapse-line" : ""}
              />
            );
          })}
          
          {/* Render neurons */}
          {neurons.map(neuron => (
            <circle
              key={`neuron-${neuron.id}`}
              cx={neuron.x}
              cy={neuron.y}
              r={neuron.size}
              fill={neuron.active ? "#6366f1" : "#1e293b"}
              className={`transition-all duration-300 ${neuron.active ? "neuron-firing" : ""}`}
            />
          ))}
        </svg>
        
        {/* Boot status text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gradient mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Neural Network Boot
          </motion.h1>
          
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-neural rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${bootProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <motion.div 
            className="mt-4 font-mono text-sm text-neural-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-block w-8 text-right">{bootProgress}</span>% Complete
          </motion.div>
          
          <motion.div
            className="mt-8 font-mono text-xs text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: bootProgress > 30 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {bootProgress < 30 && "Initializing neural pathways..."}
            {bootProgress >= 30 && bootProgress < 60 && "Calibrating synaptic weights..."}
            {bootProgress >= 60 && bootProgress < 90 && "Optimizing network parameters..."}
            {bootProgress >= 90 && "Neural network ready..."}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NeuronBoot;