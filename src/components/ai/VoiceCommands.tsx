import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import styles from './VoiceCommands.module.css';

interface VoiceCommandsProps {
  enabled?: boolean;
  commands?: Record<string, string>;
  className?: string;
}

const VoiceCommands: React.FC<VoiceCommandsProps> = ({
  enabled = true,
  commands = {
    'go to home': 'hero',
    'show about': 'about',
    'show projects': 'projects',
    'show showcase': 'showcase',
    'show experience': 'experience',
    'contact me': 'contact',
  },
  className = '',
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { navigateTo } = useNavigation();
  
  // Initialize speech recognition
  useEffect(() => {
    if (!enabled) return;
    
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Configure recognition
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      // Set up event handlers
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setFeedback('Listening...');
        setShowFeedback(true);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript.toLowerCase();
        setTranscript(result);
        
        // Check if the result matches any commands
        let commandFound = false;
        for (const [command, target] of Object.entries(commands)) {
          if (result.includes(command)) {
            setFeedback(`Command recognized: "${command}"`);
            navigateTo(target);
            commandFound = true;
            break;
          }
        }
        
        if (!commandFound) {
          setFeedback('Command not recognized. Try again.');
        }
        
        // Hide feedback after a delay
        setTimeout(() => {
          setShowFeedback(false);
        }, 3000);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setFeedback(`Error: ${event.error}`);
        setShowFeedback(true);
        
        // Hide feedback after a delay
        setTimeout(() => {
          setShowFeedback(false);
        }, 3000);
      };
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
    
    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [enabled, commands, navigateTo]);
  
  // Start listening
  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition', error);
      }
    } else {
      setFeedback('Speech recognition not supported in this browser');
      setShowFeedback(true);
      
      // Hide feedback after a delay
      setTimeout(() => {
        setShowFeedback(false);
      }, 3000);
    }
  };
  
  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };
  
  if (!enabled) return null;
  
  return (
    <div className={`${styles.voiceCommands} ${className}`}>
      <motion.button
        className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`}
        onClick={isListening ? stopListening : startListening}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.voiceIcon}
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </motion.button>
      
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className={styles.feedback}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Available commands tooltip */}
      <div className={styles.commandsTooltip}>
        <h4>Voice Commands</h4>
        <ul>
          {Object.entries(commands).map(([command, _]) => (
            <li key={command}>{command}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VoiceCommands;
