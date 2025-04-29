import React, { useState, useEffect, useRef } from 'react';
import styles from './TypeWriter.module.css';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  loop?: boolean;
  cursorStyle?: 'block' | 'underscore' | 'pipe';
  cursorColor?: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  speed = 50,
  delay = 1000,
  className = '',
  onComplete,
  loop = false,
  cursorStyle = 'pipe',
  cursorColor = '#6366f1',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get cursor class based on style prop
  const getCursorClass = () => {
    switch (cursorStyle) {
      case 'block':
        return styles.blockCursor;
      case 'underscore':
        return styles.underscoreCursor;
      case 'pipe':
      default:
        return styles.pipeCursor;
    }
  };
  
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Reset state when text changes
    setDisplayText('');
    setIsTyping(false);
    setIsDeleting(false);
    setIsComplete(false);
    
    // Start typing after delay
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
    }, delay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay]);
  
  useEffect(() => {
    if (!isTyping) return;
    
    // If we're not deleting and haven't completed the text
    if (!isDeleting && displayText.length < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(text.substring(0, displayText.length + 1));
      }, speed);
    } 
    // If we've completed typing the text
    else if (!isDeleting && displayText.length === text.length) {
      setIsComplete(true);
      
      if (onComplete) {
        onComplete();
      }
      
      // If looping is enabled, start deleting after a pause
      if (loop) {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }
    // If we're deleting
    else if (isDeleting && displayText.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(text.substring(0, displayText.length - 1));
      }, speed / 2);
    }
    // If we've finished deleting
    else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setIsComplete(false);
      
      // Pause before starting to type again
      timeoutRef.current = setTimeout(() => {
        setIsTyping(true);
      }, 1000);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTyping, isDeleting, displayText, text, speed, loop, onComplete]);
  
  return (
    <span className={`${styles.typewriter} ${className}`}>
      <span>{displayText}</span>
      <span 
        className={`${styles.cursor} ${getCursorClass()}`}
        style={{ backgroundColor: cursorColor, borderColor: cursorColor }}
      ></span>
    </span>
  );
};

export default TypeWriter;
