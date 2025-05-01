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
    <section className="relative h-screen w-full overflow-hidden bg-hero-gradient animated-bg" id="hero">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene
          enableOrbitControls={true}
          enableParticles={true}
          particleCount={1000}
          showStars={true}
          showEffects={true}
          showFloatingText={true}
          textContent="Sohom Chatterjee"
          backgroundColor="#0B0F19"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-[1] grid-pattern-bg opacity-20"></div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.215, 0.61, 0.355, 1] // Ease out cubic
          }}
          className="max-w-4xl glass-panel p-10 rounded-2xl shadow-glass border border-primary-500/10"
        >
          {/* Decorative elements */}
          <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary-500/20 backdrop-blur-md"></div>
          <div className="absolute -bottom-5 -right-5 w-10 h-10 rounded-full bg-secondary-500/20 backdrop-blur-md"></div>

          <motion.h1
            className="heading-xl mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            I'm <span className="gradient-text font-extrabold">Sohom Chatterjee</span>
          </motion.h1>

          <motion.div
            className="text-2xl md:text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
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
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-light/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Building <span className="text-primary-400">intelligent systems</span> that solve <span className="text-secondary-400">real-world problems</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <a
              href="#projects"
              id="hero-projects"
              className="btn-primary rounded-full shadow-neon hover-lift"
              onClick={(e) => handleNavigation('projects', e)}
            >
              View My Work
            </a>
            <a
              href="#contact"
              id="hero-contact"
              className="btn-glass rounded-full hover-glow"
              onClick={(e) => handleNavigation('contact', e)}
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.5 },
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
        >
          <span className="text-light/60 text-sm mb-2 font-light">Scroll Down</span>
          <div className="w-8 h-12 border-2 border-light/30 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-primary-400 rounded-full"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;