import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './NeuronLoader.module.css';

interface NeuronLoaderProps {
  onLoadComplete: () => void;
}

const NeuronLoader: React.FC<NeuronLoaderProps> = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [neuronsFired, setNeuronsFired] = useState(0);

  useEffect(() => {
    // Simulate loading progress
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
      setNeuronsFired((prev) => prev + Math.floor(Math.random() * 10) + 1);
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.loaderContainer}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
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
                <span className={styles.statValue}>
                  {progress < 30 ? 'Initializing Neurons' : 
                   progress < 60 ? 'Calibrating Synapses' : 
                   progress < 90 ? 'Optimizing Weights' : 
                   'Finalizing Network'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NeuronLoader;
