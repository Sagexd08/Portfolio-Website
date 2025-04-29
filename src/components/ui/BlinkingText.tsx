import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BlinkingText.module.css';

interface BlinkingTextProps {
  phrases: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
  prefix?: string;
}

const BlinkingText: React.FC<BlinkingTextProps> = ({
  phrases,
  typingSpeed = 100,
  deleteSpeed = 50,
  delayBetweenPhrases = 2000,
  className = '',
  prefix = 'I am ',
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // If we're not deleting, we're typing
    if (!isDeleting) {
      // If we haven't completed the current phrase
      if (currentText.length < phrases[currentPhraseIndex].length) {
        timeout = setTimeout(() => {
          setCurrentText(phrases[currentPhraseIndex].substring(0, currentText.length + 1));
        }, typingSpeed);
      } 
      // If we've completed typing the phrase
      else {
        // Pause at the end of typing before starting to delete
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenPhrases);
      }
    } 
    // If we're deleting
    else {
      // If we still have text to delete
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, deleteSpeed);
      } 
      // If we've deleted all text
      else {
        setIsDeleting(false);
        // Move to the next phrase
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deleteSpeed, delayBetweenPhrases]);

  // Blink cursor effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className={`${styles.blinkingTextContainer} ${className}`}>
      <span className={styles.prefix}>{prefix}</span>
      <span className={styles.dynamicText}>{currentText}</span>
      <span className={`${styles.cursor} ${isBlinking ? styles.blink : ''}`}>|</span>
    </div>
  );
};

export default BlinkingText;
