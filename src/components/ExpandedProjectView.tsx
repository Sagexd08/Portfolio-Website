import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ExternalLink, Github } from 'lucide-react';
import { ProjectType } from '@/types/project';

interface ExpandedProjectViewProps {
  project: ProjectType;
  layoutId: string;
  onClose: () => void;
  isOpen: boolean;
}

const ExpandedProjectView: React.FC<ExpandedProjectViewProps> = ({ 
  project, 
  layoutId, 
  onClose, 
  isOpen 
}) => {
  const { 
    title, 
    description, 
    fullDescription, 
    image, 
    techStack, 
    liveLink, 
    githubLink, 
    screenshots 
  } = project;

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Handle ESC key to close
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            layoutId={`card-container-${layoutId}`}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 shadow-2xl"
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-primary/80 transition-colors duration-300"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={20} />
            </motion.button>

            {/* Project Image */}
            <motion.div 
              className="relative w-full aspect-video"
              layoutId={`image-container-${layoutId}`}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
            </motion.div>

            {/* Project Content */}
            <motion.div 
              className="p-6 md:p-8"
              layoutId={`content-${layoutId}`}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-gradient mb-4"
                layoutId={`title-${layoutId}`}
              >
                {title}
              </motion.h2>

              {/* Tech Stack */}
              <motion.div 
                className="flex flex-wrap gap-2 mb-6"
                layoutId={`tech-stack-${layoutId}`}
              >
                {techStack && techStack.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-sm rounded-full bg-primary/20 text-primary backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* Full Description */}
              <motion.div 
                className="mb-8 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="mb-4">{fullDescription || description}</p>
              </motion.div>

              {/* Screenshots Slider */}
              {screenshots && screenshots.length > 0 && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4">Screenshots</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {screenshots.map((screenshot, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                        <Image
                          src={screenshot}
                          alt={`${title} screenshot ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Links */}
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {liveLink && (
                  <a 
                    href={liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors duration-300"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
                {githubLink && (
                  <a 
                    href={githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                  >
                    <Github size={16} />
                    <span>View Code</span>
                  </a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpandedProjectView;
