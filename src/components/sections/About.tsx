import { motion } from 'framer-motion';
import Image from 'next/image';
import SkillTag from '@/components/ui/SkillTag';

const About = () => {
  const skills = [
    { name: 'Machine Learning', level: 95, description: 'Expert in supervised and unsupervised learning algorithms' },
    { name: 'Deep Learning', level: 90, description: 'Proficient with neural networks, CNN, RNN, and transformers' },
    { name: 'Python', level: 95, description: 'Advanced Python programming with focus on data science libraries' },
    { name: 'TensorFlow', level: 85, description: 'Building and deploying production-ready ML models' },
    { name: 'PyTorch', level: 90, description: 'Research and prototyping of deep learning models' },
    { name: 'Computer Vision', level: 80, description: 'Object detection, image segmentation, and classification' },
    { name: 'NLP', level: 85, description: 'Text classification, sentiment analysis, and language generation' },
    { name: 'MLOps', level: 75, description: 'CI/CD pipelines for ML, model monitoring, and deployment' },
    { name: 'Data Engineering', level: 80, description: 'ETL processes, data pipelines, and big data technologies' },
    { name: 'Cloud ML', level: 85, description: 'AWS SageMaker, Google AI Platform, and Azure ML' },
  ];

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
    <section id="about" className="bg-dark py-24">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="heading-lg gradient-text mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-6"></div>
          <p className="text-xl text-light/70 max-w-3xl mx-auto">
            AI/ML developer passionate about building intelligent systems that solve real-world problems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] w-full lg:h-[500px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-secondary-600/20 z-10 rounded-xl"></div>
              <Image
                src="/images/profile.jpg"
                alt="Sohom Chatterjee"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-tr from-primary-500 to-secondary-500 rounded-full opacity-20 blur-2xl"></div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="text-light/70 mb-4">
                I'm Sohom Chatterjee, a passionate AI/ML developer from Kolkata, India. With a strong foundation in computer science and a specialization in artificial intelligence, I've worked on diverse projects ranging from computer vision applications to natural language processing systems. My expertise includes developing deep learning models, implementing MLOps practices, and creating end-to-end AI solutions.
              </p>
              <p className="text-light/70 mb-4">
                My goal is to leverage cutting-edge AI technologies to create solutions that make a positive impact on society. I'm particularly interested in the intersection of AI with healthcare, education, and sustainability.
              </p>
              <p className="text-light/70">
                I'm constantly learning and exploring new techniques to stay at the forefront of this rapidly evolving field, and I enjoy collaborating with like-minded professionals who share my passion for innovation and problem-solving.
              </p>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold mb-6"
            >
              My Skills
            </motion.h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill) => (
                <motion.div key={skill.name} variants={itemVariants}>
                  <SkillTag name={skill.name} level={skill.level} description={skill.description} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;