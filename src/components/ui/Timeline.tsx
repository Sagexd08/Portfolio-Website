import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Experience } from '@/types/index';

interface TimelineProps {
  experiences: Experience[];
}

const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.215, 0.61, 0.355, 1] 
      }
    }
  };
  
  return (
    <div className="relative" ref={timelineRef}>
      {/* Timeline center line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary transform -translate-x-1/2"></div>
      
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="space-y-12"
      >
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            variants={itemVariants}
            className={`relative flex flex-col md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Timeline dot with pulse effect */}
            <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 z-10">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary opacity-50"></div>
            </div>
            
            {/* Date */}
            <div className="md:w-1/2 pb-8 md:pb-0 md:px-8 text-center md:text-right">
              <span className="inline-block px-3 py-1 bg-dark-lighter rounded-full text-sm text-primary-light">
                {experience.startDate} - {experience.endDate}
              </span>
            </div>
            
            {/* Content */}
            <div className="md:w-1/2 pl-8 md:px-8">
              <div className="bg-dark-lighter p-6 rounded-lg shadow-lg backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">{experience.title}</h3>
                <h4 className="text-lg text-primary-light mb-2">{experience.company}</h4>
                <p className="text-sm text-light/70 mb-2">{experience.location}</p>
                
                <ul className="space-y-2 mt-4">
                  {experience.description.map((item, i) => (
                    <li key={i} className="text-sm text-light/80 flex items-start">
                      <span className="mr-2 mt-1.5 h-1 w-1 bg-primary rounded-full inline-block flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {experience.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-primary/20 text-primary-light px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;
