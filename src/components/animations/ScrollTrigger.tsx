import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useAnimation, Variant, Variants } from 'framer-motion';

interface ScrollTriggerProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  variants?: Variants;
  customVariants?: {
    hidden: Variant;
    visible: Variant;
  };
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  }
};

const ScrollTrigger: React.FC<ScrollTriggerProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  variants,
  customVariants,
  delay = 0,
  duration,
  className = '',
  id,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Determine which variants to use
  const animationVariants = customVariants || variants || defaultVariants;
  
  // Modify transition if duration is provided
  if (duration && animationVariants.visible?.transition) {
    animationVariants.visible.transition = {
      ...animationVariants.visible.transition,
      duration,
    };
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        if (isIntersecting) {
          controls.start('visible');
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          controls.start('hidden');
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls, threshold, rootMargin, triggerOnce]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animationVariants}
      transition={{ delay }}
      className={className}
      id={id}
      data-visible={isVisible}
    >
      {children}
    </motion.div>
  );
};

export default ScrollTrigger;
