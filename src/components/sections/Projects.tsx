import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import dynamic from 'next/dynamic';
import Card from '@/components/ui/Card';
import TypeWriter from '@/components/ui/TypeWriter';
import ScrollTrigger from '@/components/animations/ScrollTrigger';
import { projects } from '@/data/projects';

// Dynamically import FlipCard to reduce initial load time
const FlipCard = dynamic(() => import('@/components/ui/FlipCard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] glass-panel animate-pulse"></div>
  )
});

// Dynamically import the brain background component
const NeuralScene = dynamic(() => import('@/components/3d/NeuralScene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background z-[-1]" />
});

interface ProjectsProps {
  id?: string;
}

const Projects: React.FC<ProjectsProps> = ({ id = 'projects' }) => {
  const [filter, setFilter] = useState<string | null>(null);
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFlipCard, setActiveFlipCard] = useState<string | null>(null);

  // Extract all unique tags from projects
  const allTags = Array.from(
    new Set(
      projects.flatMap(project => project.technologies)
    )
  );

  // Filter projects based on selected tag
  const filteredProjects = filter
    ? projects.filter(project => project.technologies.includes(filter))
    : projects;

  // Start animations when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  // Handler for when a card is flipped
  const handleCardFlip = (projectId: string, isFlipped: boolean) => {
    setActiveFlipCard(isFlipped ? projectId : null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section id={id} className="py-24 relative min-h-screen" ref={sectionRef}>
      {/* Neural network background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <NeuralScene />
      </div>

      {/* Overlay to improve text readability */}
      <div className="absolute inset-0 bg-dark-900/70 backdrop-blur-sm z-[1]"></div>

      <div className="container-section relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="heading-lg gradient-text mb-4">
            <TypeWriter
              text="My AI/ML Projects"
              speed={80}
              cursorStyle="block"
              cursorColor="#8B5CF6"
            />
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-light/90 max-w-3xl mx-auto">
            Explore my latest work in <span className="text-primary-400">AI</span> and <span className="text-secondary-400">machine learning</span>
          </p>
        </motion.div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === null
                ? 'bg-primary-600 text-white shadow-neon'
                : 'bg-dark-800/80 text-light/80 hover:text-white border border-primary-500/20 hover:border-primary-500/50'
            }`}
            onClick={() => setFilter(null)}
          >
            All Projects
          </motion.button>

          {allTags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tag
                  ? 'bg-primary-600 text-white shadow-neon'
                  : 'bg-dark-800/80 text-light/80 hover:text-white border border-primary-500/20 hover:border-primary-500/50'
              }`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              data-project-id={project.id}
              style={{ zIndex: activeFlipCard === project.id ? 10 : 1 }}
              className="flex justify-center"
            >
              <ScrollTrigger delay={index * 0.1}>
                <div className="w-full max-w-md">
                  {index % 2 === 0 ? (
                    <FlipCard
                      frontImage={project.image}
                      title={project.title}
                      description={project.description}
                      tags={project.technologies}
                      demoLink={project.demoUrl}
                      codeLink={project.githubUrl}
                      onFlip={(isFlipped) => handleCardFlip(project.id, isFlipped)}
                      icon={`/images/icons/${project.id}.svg`}
                    />
                  ) : (
                    <Card
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      tags={project.technologies}
                      demoLink={project.demoUrl}
                      githubLink={project.githubUrl}
                      icon={`/images/icons/${project.id}.svg`}
                    />
                  )}
                </div>
              </ScrollTrigger>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 glass-card max-w-md mx-auto p-8 rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-500/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-light/90 text-lg mb-2">No projects found with the selected filter.</p>
            <p className="text-light/70">Try selecting a different technology or view all projects.</p>
          </div>
        )}
      </div>

      {/* Neural glow effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </section>
  );
};

export default Projects;
