import { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillTagProps {
  name: string;
  level: number;
  description: string;
}

const SkillTag = ({ name, level, description }: SkillTagProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <motion.div
        className="bg-dark-800 border border-primary-500/30 rounded-full px-4 py-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <span className="text-light/90">{name}</span>
      </motion.div>
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-dark-700 rounded-lg shadow-xl p-3"
        >
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-light/90">{name}</span>
              <span className="text-xs text-light/70">{level}%</span>
            </div>
            <div className="w-full bg-dark-600 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full" 
                style={{ width: `${level}%` }}
              ></div>
            </div>
          </div>
          <p className="text-xs text-light/70">{description}</p>
        </motion.div>
      )}
    </div>
  );
};

export default SkillTag;