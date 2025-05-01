import { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import SkillTag from '@/components/ui/SkillTag';
import ParticleText from '@/components/animations/ParticleText';
import MatrixRain from '@/components/animations/MatrixRain';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface AboutProps {
  id?: string;
}

const About: React.FC<AboutProps> = ({ id = 'about' }) => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  if (isVisible) {
    controls.start('visible');
  }

  // Skills data with categories
  const skillsData = [
    { name: 'Machine Learning', level: 95, description: 'Expert in supervised and unsupervised learning algorithms', category: 'ML' },
    { name: 'Deep Learning', level: 90, description: 'Proficient with neural networks, CNN, RNN, and transformers', category: 'ML' },
    { name: 'Python', level: 95, description: 'Advanced Python programming with focus on data science libraries', category: 'Programming' },
    { name: 'TensorFlow', level: 85, description: 'Building and deploying production-ready ML models', category: 'AI' },
    { name: 'PyTorch', level: 90, description: 'Research and prototyping of deep learning models', category: 'AI' },
    { name: 'Computer Vision', level: 80, description: 'Object detection, image segmentation, and classification', category: 'AI' },
    { name: 'NLP', level: 85, description: 'Text classification, sentiment analysis, and language generation', category: 'AI' },
    { name: 'MLOps', level: 75, description: 'CI/CD pipelines for ML, model monitoring, and deployment', category: 'Cloud' },
    { name: 'Data Engineering', level: 80, description: 'ETL processes, data pipelines, and big data technologies', category: 'Data' },
    { name: 'Cloud ML', level: 85, description: 'AWS SageMaker, Google AI Platform, and Azure ML', category: 'Cloud' },
  ];

  // Group skills by category
  const skillsByCategory = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skillsData>);

  // Order of categories to display
  const categoryOrder = ['AI', 'ML', 'Programming', 'Data', 'Cloud'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={sectionRef} id={id} className="bg-dark-900 py-24 dots-pattern-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary-500/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-secondary-500/5 to-transparent"></div>
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-secondary-500/5 blur-3xl"></div>

      <div className="container-section relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="relative h-24 mb-8">
            <ParticleText
              text="About Me"
              fontSize={80}
              particleSize={2}
              color="#8B5CF6"
              interactive={true}
              density={0.8}
            />
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-light/80 max-w-3xl mx-auto leading-relaxed">
            AI/ML developer passionate about building <span className="text-primary-400">intelligent systems</span> that solve <span className="text-secondary-400">real-world problems</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -50 }
            }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] w-full lg:h-[500px] rounded-2xl overflow-hidden glass-card p-1 shadow-neon">
              {/* Matrix Rain Effect */}
              <div className="absolute inset-0 z-5 opacity-30">
                <MatrixRain
                  fontSize={12}
                  speed={0.8}
                  density={0.05}
                  color="#8B5CF6"
                  opacity={0.5}
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 via-transparent to-secondary-600/20 z-10 rounded-xl"></div>

              {/* Profile image */}
              <div className="relative h-full w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/profile.jpg"
                  alt="Sohom Chatterjee"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-xl hover-scale transition-transform duration-700"
                  priority
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-primary-500/30 backdrop-blur-sm animate-pulse-slow"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-secondary-500/30 backdrop-blur-sm animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Background glow */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-gradient-to-bl from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl"></div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 }
              }}
              transition={{ duration: 0.6 }}
              className="mb-10 glass-card p-6 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-4 gradient-text inline-block">Who I Am</h3>
              <p className="text-light/80 mb-5 leading-relaxed">
                I'm <span className="text-primary-400 font-semibold">Sohom Chatterjee</span>, a passionate AI/ML developer from Kolkata, India. With a strong foundation in computer science and a specialization in artificial intelligence, I've worked on diverse projects ranging from <span className="text-secondary-400">computer vision applications</span> to <span className="text-primary-400">natural language processing systems</span>. My expertise includes developing deep learning models, implementing MLOps practices, and creating end-to-end AI solutions.
              </p>
              <p className="text-light/80 mb-5 leading-relaxed">
                My goal is to leverage cutting-edge AI technologies to create solutions that make a <span className="text-secondary-400">positive impact on society</span>. I'm particularly interested in the intersection of AI with healthcare, education, and sustainability.
              </p>
              <p className="text-light/80 leading-relaxed">
                I'm constantly learning and exploring new techniques to stay at the forefront of this rapidly evolving field, and I enjoy collaborating with like-minded professionals who share my passion for <span className="text-primary-400">innovation</span> and <span className="text-secondary-400">problem-solving</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 rounded-xl mb-6"
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text inline-block">My Skills</h3>

              <div className="space-y-8">
                {categoryOrder.map((category, i) => {
                  const categorySkills = skillsByCategory[category];
                  if (!categorySkills?.length) return null;

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 10 }}
                      animate={controls}
                      variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 10 }
                      }}
                      transition={{ delay: 0.1 * i, duration: 0.6 }}
                      className="mb-6"
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500 mr-2"></div>
                        <h4 className="text-sm font-semibold text-primary-300 uppercase tracking-wider">{category}</h4>
                        <div className="h-px flex-grow ml-3 bg-gradient-to-r from-primary-500/50 to-transparent"></div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {categorySkills.map(skill => (
                          <motion.div key={skill.name} variants={itemVariants} className="hover-lift">
                            <SkillTag
                              name={skill.name}
                              level={skill.level}
                              description={skill.description}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
