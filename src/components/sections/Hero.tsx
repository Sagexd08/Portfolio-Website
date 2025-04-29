import { motion } from 'framer-motion';
import Scene from '@/components/3d/Scene';
import BlinkingText from '@/components/ui/BlinkingText';
import { useNavigation } from '@/context/NavigationContext';

const Hero = () => {
  const { navigateTo } = useNavigation();

  const handleNavigation = (targetId: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(targetId, `#hero-${targetId}`);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden" id="hero">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene
          enableOrbitControls={true}
          enableParticles={true}
          particleCount={800}
          showStars={true}
          showEffects={true}
          showFloatingText={true}
          textContent="Sohom Chatterjee"
          backgroundColor="#111827"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl backdrop-blur-sm bg-dark-darker/30 p-8 rounded-xl"
        >
          <h1 className="heading-xl mb-4">
            I'm <span className="gradient-text">Sohom Chatterjee</span>,
          </h1>
          <div className="text-2xl md:text-3xl font-bold mb-6">
            <BlinkingText
              phrases={[
                "AI/ML Developer",
                "Deep Learning Specialist",
                "Computer Vision Engineer",
                "NLP Enthusiast"
              ]}
              typingSpeed={80}
              deleteSpeed={50}
              delayBetweenPhrases={1500}
            />
          </div>
          <p className="text-xl md:text-2xl text-light/80 mb-8 max-w-2xl mx-auto">
            Building intelligent systems that solve real-world problems
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <a
              href="#projects"
              id="hero-projects"
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-full transition-colors font-medium"
              onClick={(e) => handleNavigation('projects', e)}
            >
              View My Work
            </a>
            <a
              href="#contact"
              id="hero-contact"
              className="px-8 py-3 bg-transparent border border-light/30 hover:border-light/60 text-light rounded-full transition-colors font-medium"
              onClick={(e) => handleNavigation('contact', e)}
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-light/60"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;