import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ProjectType } from '@/types/project';

interface ProjectCardProps {
  project: ProjectType;
  layoutId: string;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, layoutId, onClick }) => {
  const { title, description, image, techStack } = project;

  return (
    <motion.div
      layoutId={`card-container-${layoutId}`}
      className="relative h-full w-full cursor-pointer group"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -10,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.4, type: "spring", stiffness: 300 }
      }}
    >
      <motion.div 
        className="relative overflow-hidden rounded-xl h-full bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 transition-all duration-500"
        layoutId={`card-${layoutId}`}
      >
        {/* Card Image */}
        <motion.div 
          className="relative aspect-video w-full overflow-hidden"
          layoutId={`image-container-${layoutId}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 backdrop-blur-sm"></div>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Card Content */}
        <motion.div 
          className="p-6"
          layoutId={`content-${layoutId}`}
        >
          <motion.h3 
            className="text-xl font-bold text-gradient mb-2"
            layoutId={`title-${layoutId}`}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-sm text-gray-300 mb-4 line-clamp-2"
            layoutId={`description-${layoutId}`}
          >
            {description}
          </motion.p>
          
          {/* Tech Stack Badges */}
          <motion.div 
            className="flex flex-wrap gap-2"
            layoutId={`tech-stack-${layoutId}`}
          >
            {techStack.map((tech, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
