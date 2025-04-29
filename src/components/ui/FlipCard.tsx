import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './FlipCard.module.css';

interface FlipCardProps {
  frontImage: string;
  title: string;
  description: string;
  tags: string[];
  demoLink?: string;
  codeLink?: string;
  className?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontImage,
  title,
  description,
  tags,
  demoLink,
  codeLink,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div 
      className={`${styles.flipCardContainer} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className={styles.flipCard}
        initial={false}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isHovered ? 1.02 : 1,
          boxShadow: isHovered 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
            : '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Front of card */}
        <div className={`${styles.flipCardFace} ${styles.flipCardFront}`}>
          <div className={styles.imageContainer}>
            <Image
              src={frontImage}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              className={styles.cardImage}
            />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.tags}>
                {tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <button 
                className={styles.flipButton}
                onClick={handleFlip}
                aria-label="Flip card to see details"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                  <path d="M3 22v-6h6"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className={`${styles.flipCardFace} ${styles.flipCardBack}`}>
          <div className={styles.backContent}>
            <h3 className={styles.backTitle}>{title}</h3>
            <p className={styles.description}>{description}</p>
            
            <div className={styles.backTags}>
              {tags.map((tag, index) => (
                <span key={index} className={styles.backTag}>{tag}</span>
              ))}
            </div>
            
            <div className={styles.links}>
              {demoLink && (
                <a 
                  href={demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Live Demo
                </a>
              )}
              {codeLink && (
                <a 
                  href={codeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  View Code
                </a>
              )}
            </div>
            
            <button 
              className={styles.flipButton}
              onClick={handleFlip}
              aria-label="Flip card back"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
