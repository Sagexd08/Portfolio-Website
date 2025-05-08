import React from 'react';
import { motion } from 'framer-motion';

interface TechItemProps {
  name: string;
  icon: string;
  color: string;
}

const TechItem: React.FC<TechItemProps> = ({ name, icon, color }) => {
  return (
    <motion.div
      className="glassmorphism p-4 flex flex-col items-center justify-center rounded-lg"
      whileHover={{ 
        y: -10,
        boxShadow: `0 0 15px ${color}`,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div 
        className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 rounded-full"
        style={{ background: `rgba(${color}, 0.1)` }}
      >
        <img src={icon} alt={name} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
      </div>
      <h3 className="font-orbitron text-electric-cyan text-lg">{name}</h3>
    </motion.div>
  );
};

const Technologies: React.FC = () => {
  const technologies = [
    {
      name: 'Python',
      icon: '/assets/tech-icons/python.svg',
      color: '53, 114, 165'
    },
    {
      name: 'JavaScript',
      icon: '/assets/tech-icons/javascript.svg',
      color: '247, 223, 30'
    },
    {
      name: 'TypeScript',
      icon: '/assets/tech-icons/typescript.svg',
      color: '49, 120, 198'
    },
    {
      name: 'HTML',
      icon: '/assets/tech-icons/html.svg',
      color: '227, 79, 38'
    },
    {
      name: 'CSS',
      icon: '/assets/tech-icons/css.svg',
      color: '33, 150, 243'
    },
    {
      name: 'React',
      icon: '/assets/tech-icons/react.svg',
      color: '97, 218, 251'
    },
    {
      name: 'Supabase',
      icon: '/assets/tech-icons/supabase.svg',
      color: '62, 207, 142'
    },
    {
      name: 'AWS',
      icon: '/assets/tech-icons/aws.svg',
      color: '255, 153, 0'
    },
    {
      name: 'Google Cloud',
      icon: '/assets/tech-icons/gcp.svg',
      color: '52, 168, 83'
    }
  ];

  return (
    <div className="container-main">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-gradient mb-4">Technologies</h2>
        <p className="font-montserrat text-soft-white max-w-2xl mx-auto">
          The cutting-edge tools and technologies I work with to build innovative solutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {technologies.map((tech, index) => (
          <TechItem
            key={tech.name}
            name={tech.name}
            icon={tech.icon}
            color={tech.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Technologies;
