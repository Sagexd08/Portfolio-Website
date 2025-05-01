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

const Projects = () => {
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
    <section id="projects" className="py-24 bg-dark-lighter relative" ref={sectionRef}>
      <div className="container-section">
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
              cursorColor="#6366f1"
            />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-xl text-light/70 max-w-3xl mx-auto">
            Explore my latest work in AI and machine learning
          </p>
        </motion.div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === null
                ? 'bg-primary text-white'
                : 'bg-dark-darker text-light/70 hover:text-white'
            }`}
            onClick={() => setFilter(null)}
          >
            All
          </motion.button>

          {allTags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === tag
                  ? 'bg-primary text-white'
                  : 'bg-dark-darker text-light/70 hover:text-white'
              }`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
            >
              <ScrollTrigger delay={index * 0.1}>
                {index % 2 === 0 ? (
                  <FlipCard
                    frontImage={project.image}
                    title={project.title}
                    description={project.description}
                    tags={project.technologies}
                    demoLink={project.demoUrl}
                    codeLink={project.githubUrl}
                    onFlip={(isFlipped) => handleCardFlip(project.id, isFlipped)}
                  />
                ) : (
                  <Card
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.technologies}
                    demoLink={project.demoUrl}
                    githubLink={project.githubUrl}
                  />
                )}
              </ScrollTrigger>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-light/70 text-lg">No projects found with the selected filter.</p>
          </div>
        )}
      </div>
      
      {/* Neural glow effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </section>
  );
};

export default Projects;
