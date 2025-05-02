import React from 'react';
import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  percentage: number;
  color?: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ 
  name, 
  percentage, 
  color = 'bg-primary' 
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium">{name}</span>
        <span className="text-sm font-medium text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-secondary/10">
        <motion.div 
          className={`h-2.5 rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
