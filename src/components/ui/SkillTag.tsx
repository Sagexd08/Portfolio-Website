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
        className={`glass-card border px-4 py-2 cursor-pointer flex items-center gap-2 transition-all duration-300 ${
          isHovered
            ? 'border-primary-500 shadow-neon'
            : 'border-primary-500/20'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        style={{
          borderRadius: '9999px',
        }}
      >
        {icon && (
          <span dangerouslySetInnerHTML={{ __html: icon }} className="w-4 h-4 flex-shrink-0" />
        )}
        <span className={`text-sm font-medium ${isHovered ? 'text-primary-300' : 'text-light/90'}`}>{name}</span>
      </motion.div>

      {/* Glow effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 -z-10 bg-primary-500 rounded-full blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-72 glass-card border border-primary-500/30 rounded-lg shadow-glass p-4"
          >
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-dark-800/80 border-r border-b border-primary-500/30"></div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-primary-300">{name}</span>
                <span className="text-xs bg-primary-500/20 text-primary-300 px-2 py-0.5 rounded-full">{getLevelText(level)}</span>
              </div>
              <div className="w-full bg-dark-900/50 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${level}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className="absolute top-0 right-0 bottom-0 w-20 bg-white/10 skew-x-12 animate-shimmer" style={{ backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
                </motion.div>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-light/80">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillTag;
