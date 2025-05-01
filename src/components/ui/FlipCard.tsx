import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './FlipCard.module.css';

interface FlipCardProps {
  frontImage: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  aiFeatures?: string[];
  mlTechnologies?: string[];
  demoLink?: string;
  codeLink?: string;
  className?: string;
  onFlip?: (isFlipped: boolean) => void;
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontImage,
  title,
  description,
  longDescription,
  tags,
  aiFeatures = [],
  mlTechnologies = [],
  demoLink,
  codeLink,
  className = '',
  onFlip,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsFlipped(!isFlipped);
    if (onFlip) onFlip(!isFlipped);
    
    // Trigger custom neural animation event
    const event = new CustomEvent('neural-interaction', {
      detail: { type: 'card-flip', projectTitle: title }
    });
    document.dispatchEvent(event);
  };
  
  return (
    <div 
      className={`${styles.flipCardContainer} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={cardRef}
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
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* Front of card */}
        <div className={`${styles.flipCardFace} ${styles.flipCardFront}`} onClick={handleFlip}>
          <div className={styles.imageContainer}>
            <Image
              src={frontImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className={styles.cardImage}
            />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.shortDescription}>{description.length > 100 ? `${description.substring(0, 100)}...` : description}</p>
              <div className={styles.tags}>
                {tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
                {tags.length > 3 && (
                  <span className={styles.moreTag}>+{tags.length - 3}</span>
                )}
              </div>
              <div className={styles.viewDetails}>
                <span>View Details</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className={`${styles.flipCardFace} ${styles.flipCardBack}`}>
          <div className={styles.backContent}>
            <h3 className={styles.backTitle}>{title}</h3>
            <p className={styles.description}>{longDescription || description}</p>
            
            {aiFeatures.length > 0 && (
              <div className={styles.featuresSection}>
                <h4 className={styles.sectionTitle}>AI/ML Features</h4>
                <ul className={styles.featuresList}>
                  {aiFeatures.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {mlTechnologies.length > 0 && (
              <div className={styles.techSection}>
                <h4 className={styles.sectionTitle}>Technologies</h4>
                <div className={styles.backTags}>
                  {mlTechnologies.map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            )}
            
            {tags.length > 0 && (
              <div className={styles.backTags}>
                {tags.map((tag, index) => (
                  <span key={index} className={styles.backTag}>{tag}</span>
                ))}
              </div>
            )}
            
            <div className={styles.links}>
              {codeLink && (
                <a 
                  href={codeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.link} ${styles.codeLink}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className={styles.linkIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Code
                </a>
              )}
              {demoLink && (
                <a 
                  href={demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.link} ${styles.demoLink}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className={styles.linkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
            
            <button 
              className={styles.closeButton}
              onClick={handleFlip}
              aria-label="Flip card back"
            >
              <svg className={styles.closeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
