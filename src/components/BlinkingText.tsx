import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlinkingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

const BlinkingText = ({ texts, interval = 5000, className = '' }: BlinkingTextProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Text rotation interval - slower transition between texts
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    // Cursor blinking interval - slower blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 800);

    return () => {
      clearInterval(textInterval);
      clearInterval(cursorInterval);
    };
  }, [texts, interval]);

  return (
    <div className={`flex items-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[currentTextIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {texts[currentTextIndex]}
        </motion.span>
      </AnimatePresence>
      <span
        className={`ml-1 h-6 w-1 bg-primary ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      ></span>
    </div>
  );
};

export default BlinkingText;
