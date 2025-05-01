import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillTagProps {
  name: string;
  level: number;
  description: string;
  icon?: string;
}

const SkillTag = ({ name, level, description, icon }: SkillTagProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Map skill level to a descriptive term
  const getLevelText = (level: number): string => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    if (level >= 30) return 'Basic';
    return 'Beginner';
  };
  
  // Neural interaction effect on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Dispatch custom event for potential neural animations
    const event = new CustomEvent('neural-interaction', {
      detail: { type: 'skill-hover', skill: name }
    });
    document.dispatchEvent(event);
  };

  return (
    <div className="relative">
      <motion.div
        className={`bg-dark-800 border rounded-full px-4 py-2 cursor-pointer flex items-center gap-2 transition-all duration-300 ${
          isHovered 
            ? 'border-primary-500 shadow-lg shadow-primary-500/20' 
            : 'border-primary-500/30'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {icon && (
          <span dangerouslySetInnerHTML={{ __html: icon }} className="w-4 h-4 flex-shrink-0" />
        )}
        <span className="text-light/90">{name}</span>
      </motion.div>
      
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 bg-primary-500 rounded-full blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
        />
      )}
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-dark-700 border border-primary-500/30 rounded-lg shadow-xl p-3"
          >
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-light/90">{name}</span>
                <span className="text-xs text-primary-400">{getLevelText(level)}</span>
              </div>
              <div className="w-full bg-dark-600 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${level}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>
            <p className="text-xs text-light/70">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillTag;
