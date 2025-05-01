import { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Timeline from '@/components/ui/Timeline';
import { experiences } from '@/data/experiences';

interface ExperienceProps {
  id?: string;
}

const Experience: React.FC<ExperienceProps> = ({ id = 'experience' }) => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  if (isVisible) {
    controls.start('visible');
  }
  
  return (
    <section
      id={id}
      ref={sectionRef}
      className="py-24 bg-dark-900 relative"
    >
      <div className="container-section">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-lg gradient-text mb-4">Work Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-6"></div>
          <p className="text-xl text-light/70 max-w-3xl mx-auto">
            My professional journey in AI and machine learning
          </p>
        </motion.div>
        
        <Timeline experiences={experiences} isVisible={isVisible} />
      </div>
      
      {/* Neural glow effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neural/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default Experience;
