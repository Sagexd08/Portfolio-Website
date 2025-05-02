import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ExpandedProjectView from './ExpandedProjectView';
import { ProjectType } from '@/types/project';

interface ProjectCarouselProps {
  projects: ProjectType[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate the width of the carousel container
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [projects]);

  const handleCardClick = (project: ProjectType) => {
    if (!isDragging) {
      setSelectedProject(project);
    }
  };

  const handleCloseExpandedView = () => {
    setSelectedProject(null);
  };

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the beginning
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(projects.length - 1); // Loop to the end
    }
  };

  // Calculate the drag constraints based on the number of projects and viewport
  const getConstraints = () => {
    if (isMobile) {
      return { left: 0, right: 0 }; // No drag on mobile (stacked view)
    }
    return { left: -width, right: 0 };
  };

  // Calculate the x position for the carousel based on the current index
  const getXPosition = () => {
    if (isMobile) return 0;
    
    // Calculate card width + gap (assuming 3 cards visible on desktop)
    const cardWidth = carouselRef.current ? carouselRef.current.offsetWidth / 3 : 0;
    return -currentIndex * cardWidth;
  };

  return (
    <div className="relative w-full py-8">
      {/* Carousel Navigation */}
      {!isMobile && projects.length > 3 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-primary/80 transition-colors duration-300"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-primary/80 transition-colors duration-300"
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden">
        <motion.div
          ref={carouselRef}
          className={`flex ${isMobile ? 'flex-col gap-8' : 'gap-6'}`}
          drag={isMobile ? false : 'x'}
          dragConstraints={getConstraints()}
          animate={{ x: getXPosition() }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        >
          {projects.map((project, index) => (
            <div 
              key={project.id || index} 
              className={`${isMobile ? 'w-full' : 'min-w-[calc(33.333%-16px)] md:min-w-[calc(33.333%-16px)]'} h-[400px]`}
            >
              <ProjectCard
                project={project}
                layoutId={project.id || `project-${index}`}
                onClick={() => handleCardClick(project)}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      {projects.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-primary w-8' 
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Expanded Project View */}
      {selectedProject && (
        <ExpandedProjectView
          project={selectedProject}
          layoutId={selectedProject.id || `project-${projects.indexOf(selectedProject)}`}
          onClose={handleCloseExpandedView}
          isOpen={!!selectedProject}
        />
      )}
    </div>
  );
};

export default ProjectCarousel;
