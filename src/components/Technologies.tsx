import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface TechItem {
  name: string;
  icon: string;
  color: string;
  expertise: string;
  years: number;
  projects: number;
  category: 'frontend' | 'backend' | 'cloud' | 'language' | 'database';
  skillLevel: number; // 1-5 scale
}

const Technologies: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const technologies: TechItem[] = [
    {
      name: 'Python',
      icon: '/assets/tech-icons/python.svg',
      color: '53, 114, 165',
      expertise: 'Expert in Python for data science, machine learning, and backend development. Proficient with libraries like NumPy, Pandas, and scikit-learn.',
      years: 3,
      projects: 12,
      category: 'language',
      skillLevel: 5
    },
    {
      name: 'JavaScript',
      icon: '/assets/tech-icons/javascript.svg',
      color: '247, 223, 30',
      expertise: 'Strong knowledge of modern JavaScript (ES6+) for frontend and backend development. Experience with asynchronous programming and DOM manipulation.',
      years: 2,
      projects: 8,
      category: 'language',
      skillLevel: 4
    },
    {
      name: 'TypeScript',
      icon: '/assets/tech-icons/typescript.svg',
      color: '49, 120, 198',
      expertise: 'Skilled in TypeScript for building type-safe applications. Experience with interfaces, generics, and advanced type features.',
      years: 1,
      projects: 5,
      category: 'language',
      skillLevel: 4
    },
    {
      name: 'HTML',
      icon: '/assets/tech-icons/html.svg',
      color: '227, 79, 38',
      expertise: 'Proficient in semantic HTML5 markup, accessibility best practices, and modern web standards.',
      years: 3,
      projects: 15,
      category: 'frontend',
      skillLevel: 5
    },
    {
      name: 'CSS',
      icon: '/assets/tech-icons/css.svg',
      color: '33, 150, 243',
      expertise: 'Advanced CSS skills including Flexbox, Grid, animations, and responsive design. Experience with CSS preprocessors like SASS.',
      years: 3,
      projects: 15,
      category: 'frontend',
      skillLevel: 5
    },
    {
      name: 'React',
      icon: '/assets/tech-icons/react.svg',
      color: '97, 218, 251',
      expertise: 'Expert in React for building interactive UIs. Proficient with hooks, context API, and state management solutions like Redux.',
      years: 2,
      projects: 7,
      category: 'frontend',
      skillLevel: 4
    },
    {
      name: 'Supabase',
      icon: '/assets/tech-icons/supabase.svg',
      color: '62, 207, 142',
      expertise: 'Experience with Supabase for backend services including authentication, database, and real-time subscriptions.',
      years: 1,
      projects: 3,
      category: 'database',
      skillLevel: 3
    },
    {
      name: 'AWS',
      icon: '/assets/tech-icons/aws.svg',
      color: '255, 153, 0',
      expertise: 'Skilled in AWS services including EC2, S3, Lambda, and DynamoDB. Experience with serverless architecture and cloud deployment.',
      years: 2,
      projects: 6,
      category: 'cloud',
      skillLevel: 4
    },
    {
      name: 'Google Cloud',
      icon: '/assets/tech-icons/gcp.svg',
      color: '52, 168, 83',
      expertise: 'Proficient with Google Cloud Platform services including Compute Engine, Cloud Storage, and BigQuery. Experience with ML APIs.',
      years: 1,
      projects: 4,
      category: 'cloud',
      skillLevel: 3
    }
  ];

  const categories = [
    { id: 'all', name: 'All Technologies' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'language', name: 'Languages' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'database', name: 'Database' }
  ];

  const filteredTechnologies = activeCategory === 'all'
    ? technologies
    : technologies.filter(tech => tech.category === activeCategory);

  return (
    <section id="technologies" data-scroll-section>
      <div
        data-scroll
        data-scroll-speed=".4"
        data-scroll-position="top"
        className="my-24 flex flex-col justify-start space-y-10 px-4 md:px-0 relative"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-64 h-64 bg-gradient-to-br from-electric-cyan/5 to-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-gradient-to-tr from-primary/5 to-electric-cyan/5 rounded-full blur-3xl"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          {/* Animated tech symbols */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-electric-cyan/10 text-4xl"
              style={{
                top: `${10 + (i * 20)}%`,
                left: `${5 + (i * 18)}%`,
                rotate: `${i * 15}deg`
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                repeat: Infinity,
                duration: 5 + i,
                ease: "easeInOut"
              }}
            >
              {["</>",'{}',"#","()","[]"][i % 5]}
            </motion.div>
          ))}
        </div>
        {/* Header with animated background */}
        <div className="relative">
          {/* Animated background elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="absolute -top-5 -right-5 w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-lg animate-float"></div>
          <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-gradient-to-tr from-electric-cyan/20 to-primary/10 rounded-full blur-lg animate-float-delayed"></div>

          {/* Section title */}
          <div className="relative z-10">
            <motion.span
              className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter inline-block"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              🛠️ Tech Stack
            </motion.span>
            <motion.h2
              className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan via-soft-white to-primary"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Technologies I work with
            </motion.h2>
            <motion.p
              className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg max-w-2xl"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              These are the technologies I use to build powerful, scalable, and efficient solutions.
              Hover over each card to see my expertise.
            </motion.p>

            {/* Category filter buttons */}
            <motion.div
              className="flex flex-wrap gap-2 mt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 backdrop-blur-sm border ${activeCategory === category.id
                    ? 'border-electric-cyan text-electric-cyan bg-electric-cyan/10 shadow-glow-sm'
                    : 'border-soft-white/20 text-soft-white/70 hover:border-electric-cyan/50 hover:text-electric-cyan/80 hover:bg-electric-cyan/5'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeCategory === category.id && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-electric-cyan/5"
                      layoutId="activeCategoryBackground"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{category.name}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Tech grid with advanced hover effects */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {filteredTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="glassmorphism p-4 flex flex-col items-center justify-center rounded-xl relative group cursor-pointer h-60 overflow-hidden border border-transparent hover:border-electric-cyan/30 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, rgba(${tech.color}, 0.03) 0%, rgba(${tech.color}, 0.08) 100%)`,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 25px rgba(${tech.color}, 0.3)`,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(null)}
              >
              {/* Front side with icon */}
              <motion.div
                className="flex flex-col items-center justify-center w-full h-full z-10"
                animate={{
                  opacity: activeIndex === index ? 0.3 : 1,
                  scale: activeIndex === index ? 0.9 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute inset-0 -z-10 blur-2xl rounded-full opacity-20"
                    style={{ background: `radial-gradient(circle, rgba(${tech.color}, 0.8) 0%, rgba(${tech.color}, 0) 70%)` }}
                  ></div>
                </div>

                {/* Icon container with subtle animation - Special handling for Google Cloud */}
                <motion.div
                  className="w-20 h-20 flex items-center justify-center mb-4 rounded-full relative"
                  whileHover={tech.name === 'Google Cloud'
                    ? {
                        scale: [1, 1.1, 1.05],
                        rotate: [0, 2, -2, 0],
                        transition: { duration: 0.5 }
                      }
                    : {
                        rotate: [0, -5, 5, -5, 0],
                        transition: { duration: 0.5 }
                      }
                  }
                  animate={{
                    boxShadow: [
                      `0 0 0 rgba(${tech.color}, 0)`,
                      `0 0 10px rgba(${tech.color}, 0.3)`,
                      `0 0 0 rgba(${tech.color}, 0)`
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                >
                  {/* Animated background with pulse effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${tech.name === 'Google Cloud' ? 'overflow-hidden' : ''}`}
                    style={{
                      background: tech.name === 'Google Cloud'
                        ? `conic-gradient(from 45deg, rgba(52, 168, 83, 0.2), rgba(66, 133, 244, 0.2), rgba(234, 67, 53, 0.2), rgba(251, 188, 5, 0.2), rgba(52, 168, 83, 0.2))`
                        : `radial-gradient(circle, rgba(${tech.color}, 0.15) 0%, rgba(${tech.color}, 0.05) 100%)`
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut"
                    }}
                  >
                    {tech.name === 'Google Cloud' && (
                      <motion.div
                        className="absolute inset-0 opacity-30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                          background: 'radial-gradient(circle at center, transparent 50%, rgba(255,255,255,0.15) 100%)',
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Icon with special effects for Google Cloud */}
                  {tech.name === 'Google Cloud' ? (
                    <div className="relative">
                      <motion.div
                        className="absolute -inset-1 opacity-20 blur-sm rounded-full"
                        animate={{
                          boxShadow: ['0 0 5px rgba(52, 168, 83, 0.7)', '0 0 10px rgba(66, 133, 244, 0.7)', '0 0 5px rgba(234, 67, 53, 0.7)', '0 0 10px rgba(251, 188, 5, 0.7)', '0 0 5px rgba(52, 168, 83, 0.7)']
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain relative z-10 drop-shadow-glow"
                      />
                      <motion.div
                        className="absolute inset-0 z-20"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                          background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.3), transparent)',
                        }}
                      />
                    </div>
                  ) : (
                    <motion.div
                      animate={{ y: [-2, 2, -2] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                      }}
                    >
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain relative z-10 drop-shadow-glow"
                      />
                    </motion.div>
                  )}
                </motion.div>

                {/* Tech name with gradient text */}
                <h3
                  className="font-orbitron text-lg font-semibold mb-1"
                  style={{ color: `rgb(${tech.color})` }}
                >
                  {tech.name}
                </h3>

                {/* Category badge */}
                <div
                  className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full mb-2"
                  style={{ backgroundColor: `rgba(${tech.color}, 0.15)`, color: `rgb(${tech.color})` }}
                >
                  {tech.category}
                </div>

                {/* Skill level indicator */}
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-5 rounded-full transition-all duration-300 ${i < tech.skillLevel ? 'opacity-100' : 'opacity-30'}`}
                      style={{ backgroundColor: i < tech.skillLevel ? `rgb(${tech.color})` : 'rgba(255, 255, 255, 0.2)' }}
                    />
                  ))}
                </div>

                {/* Experience indicators */}
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-soft-white/70">{tech.years}+ years</span>
                  <span className="h-1 w-1 rounded-full bg-soft-white/30"></span>
                  <span className="text-xs text-soft-white/70">{tech.projects}+ projects</span>
                </div>
              </motion.div>

              {/* Back side with expertise - shown on hover with AnimatePresence */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center p-5 rounded-xl backdrop-blur-md z-20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                    style={{
                      background: `linear-gradient(135deg, rgba(${tech.color}, 0.1) 0%, rgba(${tech.color}, 0.2) 100%)`,
                      boxShadow: `inset 0 0 20px rgba(${tech.color}, 0.1)`
                    }}
                  >
                    {/* Animated particles in background */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full opacity-30"
                          style={{
                            backgroundColor: `rgb(${tech.color})`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.5, 0.2],
                            scale: [1, 1.5, 1]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3 + i,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>

                    <div className="bg-background/80 p-4 rounded-lg backdrop-blur-md w-full h-full flex flex-col justify-center border border-electric-cyan/20 shadow-glow-sm relative overflow-hidden">
                      {/* Decorative corner accents */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-md" style={{ borderColor: `rgb(${tech.color})` }}></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-md" style={{ borderColor: `rgb(${tech.color})` }}></div>

                      <h4
                        className="text-sm font-semibold mb-3 text-center font-orbitron flex items-center justify-center gap-2"
                        style={{ color: `rgb(${tech.color})` }}
                      >
                        <span className="inline-block w-8 h-0.5" style={{ backgroundColor: `rgba(${tech.color}, 0.5)` }}></span>
                        My {tech.name} Expertise
                        <span className="inline-block w-8 h-0.5" style={{ backgroundColor: `rgba(${tech.color}, 0.5)` }}></span>
                      </h4>

                      <p className="text-xs text-center text-soft-white/90 leading-relaxed px-1">
                        {tech.expertise}
                      </p>

                      {/* Project indicator */}
                      <div className="mt-3 pt-2 border-t border-electric-cyan/10 flex justify-center">
                        <span
                          className="text-[10px] font-medium px-2 py-1 rounded-full"
                          style={{ backgroundColor: `rgba(${tech.color}, 0.1)`, color: `rgb(${tech.color})` }}
                        >
                          {tech.projects} Projects Completed
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
