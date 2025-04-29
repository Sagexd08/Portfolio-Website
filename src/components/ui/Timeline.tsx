import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '@/types/index';

interface TimelineProps {
  experiences: Experience[];
}

const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary transform -translate-x-1/2"></div>
      
      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            className={`relative flex flex-col md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 z-10"></div>
            
            {/* Date */}
            <div className="md:w-1/2 pb-8 md:pb-0 md:px-8 text-center md:text-right">
              <span className="inline-block px-3 py-1 bg-dark-lighter rounded-full text-sm text-primary-light">
                {experience.startDate} - {experience.endDate}
              </span>
            </div>
            
            {/* Content */}
            <div className="md:w-1/2 pl-8 md:px-8">
              <div className="bg-dark-lighter p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-white">{experience.title}</h3>
                <h4 className="text-lg text-primary-light mb-2">{experience.company}</h4>
                <p className="text-sm text-light/70 mb-2">{experience.location}</p>
                
                <ul className="list-disc list-inside text-sm text-light/80 space-y-1 mt-4">
                  {experience.description.map((item, i) => (
                    <li key={i}>{item}</li>
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
      </div>
    </div>
  );
};

export default Timeline;
