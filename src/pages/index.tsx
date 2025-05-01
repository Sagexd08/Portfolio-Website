import { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import dynamic from 'next/dynamic';
import SEO from '@/components/layout/SEO';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import AIShowcase from '@/components/sections/AIShowcase';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

// Dynamically import the Hero component with 3D elements
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
  suspense: true,
});

// Dynamically import the 3D background component
const NeuralScene = dynamic(() => import('@/components/3d/NeuralScene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background z-[-1]" />
});

const Home: NextPage = () => {
  const neuralSceneRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  const heroInView = useIntersectionObserver(heroRef, { threshold: 0.1 });
  
  return (
    <>
      <SEO
        title="Sohom Chatterjee | AI/ML Developer Portfolio"
        description="Sohom Chatterjee's portfolio showcasing expertise in artificial intelligence and machine learning"
      />
      
      {/* Neural network background (fixed position) */}
      <div ref={neuralSceneRef} className="fixed inset-0 z-[-1] pointer-events-none">
        <NeuralScene />
      </div>
      
      {/* Scroll down indicator - visible only when hero is in view */}
      {heroInView && (
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <ScrollLink 
            to="about" 
            smooth={true} 
            duration={800}
            offset={-70}
            className="flex flex-col items-center cursor-pointer"
          >
            <span className="text-sm text-white/60 mb-2">Scroll Down</span>
            <div className="w-5 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div 
                className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </ScrollLink>
        </motion.div>
      )}

      <main className="overflow-hidden relative z-10">
        <Hero ref={heroRef} />
        <About id="about" />
        <Projects id="projects" />
        <AIShowcase id="ai-showcase" />
        <Experience id="experience" />
        <Contact id="contact" />
      </main>
    </>
  );
};

export default Home;
