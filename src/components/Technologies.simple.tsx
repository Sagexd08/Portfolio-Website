import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface TechItem {
  name: string;
  icon: string;
  color: string;
  expertise: string;
  years?: number;
  projects?: number;
}

const Technologies: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const technologies: TechItem[] = [
    {
      name: 'Python',
      icon: '/assets/tech-icons/python.svg',
      color: '53, 114, 165',
      expertise: 'Expert in Python for ML/AI and backend. Proficient with NumPy, Pandas, scikit-learn, and TensorFlow.',
      years: 3,
      projects: 10
    },
    {
      name: 'JavaScript',
      icon: '/assets/tech-icons/javascript.svg',
      color: '247, 223, 30',
      expertise: 'Modern JavaScript (ES6+) for frontend & backend. Async programming, DOM manipulation, and web APIs.',
      years: 1,
      projects: 2
    },
    {
      name: 'TypeScript',
      icon: '/assets/tech-icons/typescript.svg',
      color: '49, 120, 198',
      expertise: 'Type-safe applications with interfaces, generics, and advanced typing. Enhanced code quality and maintainability.',
      years: 1,
      projects: 1
    },
    {
      name: 'HTML',
      icon: '/assets/tech-icons/html.svg',
      color: '227, 79, 38',
      expertise: 'Semantic HTML5, accessibility, SEO optimization, and responsive layouts. Focus on clean, standards-compliant code.',
      years: 1,
      projects: 2
    },
    {
      name: 'CSS',
      icon: '/assets/tech-icons/css.svg',
      color: '33, 150, 243',
      expertise: 'Flexbox, Grid, animations, and responsive design. SASS/SCSS, Tailwind CSS, and CSS-in-JS solutions.',
      years: 1,
      projects: 2
    },
    {
      name: 'React',
      icon: '/assets/tech-icons/react.svg',
      color: '97, 218, 251',
      expertise: 'Component-based UIs with hooks, context API, and state management. Next.js, React Router, and performance optimization.',
      years: 1,
      projects: 1
    },
    {
      name: 'Supabase',
      icon: '/assets/tech-icons/supabase.svg',
      color: '62, 207, 142',
      expertise: 'Backend-as-a-service with PostgreSQL, auth, storage, and real-time subscriptions. API integration and serverless functions.',
      years: 1,
      projects: 2
    },
    {
      name: 'AWS',
      icon: '/assets/tech-icons/aws.svg',
      color: '255, 153, 0',
      expertise: 'Cloud infrastructure with EC2, S3, Lambda, and DynamoDB. Serverless architecture, IAM, and CI/CD pipelines.',
      years: 1,
      projects: 1
    },
    {
      name: 'Google Cloud',
      icon: '/assets/tech-icons/gcp-new.svg',
      color: '66, 133, 244',
      expertise: 'GCP services for ML/AI workloads. Compute Engine, Cloud Functions, BigQuery, and AI Platform. Integration with TensorFlow and PyTorch.',
      years: 1,
      projects: 1
    }
  ];

  return (
    <section id="technologies" className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-gradient-to-tr from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>

        {/* Animated tech symbols */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-500/10 text-4xl"
            style={{
              top: `${10 + (i * 20)}%`,
              left: `${5 + (i * 18)}%`,
              rotate: `${i * 15}deg`
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + i,
              ease: "easeInOut"
            }}
          >
            {["</>",'{}',"#","()","[]"][i % 5]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with animated elements */}
        <div className="relative mb-16">
          <motion.div
            className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          ></motion.div>
          <motion.div
            className="absolute -top-5 -right-5 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-lg"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity }}
          ></motion.div>

          <div className="text-center relative z-10">
            <motion.span
              className="inline-block text-sm font-semibold tracking-wider text-cyan-400 mb-2"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              🛠️ TECH STACK
            </motion.span>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-purple-500"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Technologies I Work With
            </motion.h2>

            <motion.p
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              These are the technologies I use to build powerful, scalable, and efficient solutions.
              Hover over each card to see my expertise.
            </motion.p>
          </div>
        </div>

        {/* Tech grid with advanced hover effects */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="bg-gray-900/40 backdrop-blur-md p-6 rounded-2xl border border-gray-800 hover:border-cyan-500/50 flex flex-col items-center justify-center group relative overflow-hidden h-64"
              style={{
                background: `linear-gradient(135deg, rgba(${tech.color}, 0.03) 0%, rgba(${tech.color}, 0.08) 100%)`,
                boxShadow: `0 10px 30px -15px rgba(0, 0, 0, 0.5)`
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 25px rgba(${tech.color}, 0.3)`,
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(null)}
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute inset-0 -z-10 blur-2xl rounded-full opacity-20"
                  style={{ background: `radial-gradient(circle, rgba(${tech.color}, 0.8) 0%, rgba(${tech.color}, 0) 70%)` }}
                ></div>
              </div>

              {/* Special Google Cloud effects - Using the official SVG with smooth animations */}
              {tech.name === 'Google Cloud' && (
                <div className="absolute inset-0 opacity-30 overflow-hidden">
                  {/* Subtle cloud background glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    animate={{
                      opacity: [0.15, 0.25, 0.15],
                      scale: [0.85, 0.95, 0.85]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1] // Ensures smooth transitions
                    }}
                    style={{
                      background: 'radial-gradient(circle, rgba(66, 133, 244, 0.2) 0%, rgba(66, 133, 244, 0) 70%)'
                    }}
                  />

                  {/* Google Cloud colors animated rings - smoother and more subtle */}
                  <div className="absolute inset-0">
                    {/* Blue ring */}
                    <motion.div
                      className="absolute w-full h-full rounded-full border border-blue-500/10"
                      style={{ borderRadius: '40%' }}
                      animate={{
                        rotate: 360,
                        scale: [0.75, 0.8, 0.75]
                      }}
                      transition={{
                        rotate: {
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear"
                        },
                        scale: {
                          duration: 12,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.5, 1]
                        }
                      }}
                    />

                    {/* Red ring */}
                    <motion.div
                      className="absolute w-full h-full rounded-full border border-red-500/10"
                      style={{ borderRadius: '45%' }}
                      animate={{
                        rotate: -360,
                        scale: [0.65, 0.7, 0.65]
                      }}
                      transition={{
                        rotate: {
                          duration: 35,
                          repeat: Infinity,
                          ease: "linear"
                        },
                        scale: {
                          duration: 14,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.5, 1]
                        }
                      }}
                    />

                    {/* Yellow ring */}
                    <motion.div
                      className="absolute w-full h-full rounded-full border border-yellow-500/10"
                      style={{ borderRadius: '35%' }}
                      animate={{
                        rotate: 360,
                        scale: [0.55, 0.6, 0.55]
                      }}
                      transition={{
                        rotate: {
                          duration: 40,
                          repeat: Infinity,
                          ease: "linear"
                        },
                        scale: {
                          duration: 16,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.5, 1]
                        }
                      }}
                    />

                    {/* Green ring */}
                    <motion.div
                      className="absolute w-full h-full rounded-full border border-green-500/10"
                      style={{ borderRadius: '38%' }}
                      animate={{
                        rotate: -360,
                        scale: [0.45, 0.5, 0.45]
                      }}
                      transition={{
                        rotate: {
                          duration: 45,
                          repeat: Infinity,
                          ease: "linear"
                        },
                        scale: {
                          duration: 18,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.5, 1]
                        }
                      }}
                    />
                  </div>

                  {/* Data particles - smoother and more subtle */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        background: [
                          'rgba(66, 133, 244, 0.5)',  // Blue
                          'rgba(234, 67, 53, 0.5)',   // Red
                          'rgba(251, 188, 5, 0.5)',   // Yellow
                          'rgba(52, 168, 83, 0.5)',   // Green
                          'rgba(66, 133, 244, 0.5)',  // Blue
                          'rgba(234, 67, 53, 0.5)'    // Red
                        ][i],
                        boxShadow: `0 0 3px ${[
                          'rgba(66, 133, 244, 0.3)',
                          'rgba(234, 67, 53, 0.3)',
                          'rgba(251, 188, 5, 0.3)',
                          'rgba(52, 168, 83, 0.3)',
                          'rgba(66, 133, 244, 0.3)',
                          'rgba(234, 67, 53, 0.3)'
                        ][i]}`
                      }}
                      animate={{
                        x: [
                          Math.cos(i * Math.PI / 3) * 25,
                          Math.cos((i * Math.PI / 3) + Math.PI) * 25,
                          Math.cos(i * Math.PI / 3) * 25
                        ],
                        y: [
                          Math.sin(i * Math.PI / 3) * 25,
                          Math.sin((i * Math.PI / 3) + Math.PI) * 25,
                          Math.sin(i * Math.PI / 3) * 25
                        ],
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 8 + (i % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                        times: [0, 0.5, 1] // Ensures smooth transitions
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Front content */}
              <motion.div
                className="relative z-10 flex flex-col items-center w-full h-full"
                animate={{
                  opacity: activeIndex === index ? 0.3 : 1,
                  scale: activeIndex === index ? 0.9 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon container with animations */}
                <motion.div
                  className="w-20 h-20 flex items-center justify-center mb-4 rounded-full relative"
                  style={{
                    background: `radial-gradient(circle, rgba(${tech.color}, 0.15) 0%, rgba(${tech.color}, 0.05) 100%)`
                  }}
                  whileHover={tech.name === 'Google Cloud'
                    ? { scale: [1, 1.1, 1.05], rotate: [0, 2, -2, 0] }
                    : { rotate: [0, -5, 5, -5, 0] }
                  }
                  animate={{
                    boxShadow: [
                      `0 0 0 rgba(${tech.color}, 0)`,
                      `0 0 10px rgba(${tech.color}, 0.3)`,
                      `0 0 0 rgba(${tech.color}, 0)`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Icon with special effects for Google Cloud - smoother animations */}
                  {tech.name === 'Google Cloud' ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Subtle glowing backdrop for the icon */}
                      <motion.div
                        className="absolute w-16 h-16 rounded-full blur-lg opacity-60"
                        animate={{
                          boxShadow: [
                            '0 0 10px rgba(66, 133, 244, 0.3)',
                            '0 0 10px rgba(234, 67, 53, 0.3)',
                            '0 0 10px rgba(251, 188, 5, 0.3)',
                            '0 0 10px rgba(52, 168, 83, 0.3)',
                            '0 0 10px rgba(66, 133, 244, 0.3)'
                          ]
                        }}
                        transition={{
                          duration: 12,
                          repeat: Infinity,
                          ease: "linear",
                          times: [0, 0.25, 0.5, 0.75, 1] // Ensures smooth color transitions
                        }}
                      />

                      {/* Main icon with subtle animation */}
                      <motion.div
                        className="relative z-10"
                        animate={{
                          scale: [1, 1.03, 1],
                          rotate: [0, 2, 0, -2, 0]
                        }}
                        transition={{
                          scale: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.5, 1] // Ensures smooth scaling
                          },
                          rotate: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.25, 0.5, 0.75, 1] // Ensures smooth rotation
                          }
                        }}
                      >
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={56}
                          height={56}
                          className="w-14 h-14 object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
                        />
                      </motion.div>

                      {/* Subtle colored light beams radiating from the icon */}
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute h-px"
                          style={{
                            left: '50%',
                            right: '50%',
                            top: '50%',
                            transformOrigin: 'center',
                            transform: `rotate(${i * 45}deg)`,
                            background: [
                              'linear-gradient(90deg, rgba(66, 133, 244, 0) 0%, rgba(66, 133, 244, 0.4) 50%, rgba(66, 133, 244, 0) 100%)',
                              'linear-gradient(90deg, rgba(234, 67, 53, 0) 0%, rgba(234, 67, 53, 0.4) 50%, rgba(234, 67, 53, 0) 100%)',
                              'linear-gradient(90deg, rgba(251, 188, 5, 0) 0%, rgba(251, 188, 5, 0.4) 50%, rgba(251, 188, 5, 0) 100%)',
                              'linear-gradient(90deg, rgba(52, 168, 83, 0) 0%, rgba(52, 168, 83, 0.4) 50%, rgba(52, 168, 83, 0) 100%)'
                            ][i]
                          }}
                          animate={{
                            scaleX: [0, 4, 0],
                            opacity: [0, 0.5, 0]
                          }}
                          transition={{
                            duration: 6 + (i * 0.5),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 1.5,
                            times: [0, 0.5, 1] // Ensures smooth transitions
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                      />
                    </motion.div>
                  )}
                </motion.div>

                {/* Tech name with gradient text */}
                <h3
                  className="text-lg font-bold mb-2 font-mono"
                  style={{ color: `rgb(${tech.color})` }}
                >
                  {tech.name}
                </h3>

                {/* Experience indicators */}
                {tech.years && tech.projects && (
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-400">{tech.years}+ years</span>
                    <span className="h-1 w-1 rounded-full bg-gray-500"></span>
                    <span className="text-xs text-gray-400">{tech.projects}+ projects</span>
                  </div>
                )}
              </motion.div>

              {/* Back side with expertise - shown on hover with AnimatePresence */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center p-5 rounded-2xl backdrop-blur-md z-20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                    style={{
                      background: `linear-gradient(135deg, rgba(${tech.color}, 0.1) 0%, rgba(${tech.color}, 0.2) 100%)`,
                      boxShadow: `inset 0 0 20px rgba(${tech.color}, 0.1)`
                    }}
                  >
                    {/* Animated particles in background */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full opacity-30"
                          style={{
                            backgroundColor: `rgb(${tech.color})`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.5, 0.2],
                            scale: [1, 1.5, 1]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3 + i,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>

                    <div className="bg-gray-900/80 p-4 rounded-lg backdrop-blur-md w-full h-full flex flex-col justify-center border border-cyan-500/20 relative overflow-hidden">
                      {/* Decorative corner accents */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-md" style={{ borderColor: `rgb(${tech.color})` }}></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-md" style={{ borderColor: `rgb(${tech.color})` }}></div>

                      <h4
                        className="text-sm font-bold mb-3 text-center font-mono flex items-center justify-center gap-2"
                        style={{ color: `rgb(${tech.color})` }}
                      >
                        <span className="inline-block w-8 h-0.5" style={{ backgroundColor: `rgba(${tech.color}, 0.5)` }}></span>
                        My {tech.name} Expertise
                        <span className="inline-block w-8 h-0.5" style={{ backgroundColor: `rgba(${tech.color}, 0.5)` }}></span>
                      </h4>

                      <p className="text-xs text-center text-gray-300 leading-relaxed px-1">
                        {tech.expertise}
                      </p>

                      {/* Project indicator */}
                      {tech.projects && (
                        <div className="mt-3 pt-2 border-t border-cyan-500/10 flex justify-center">
                          <span
                            className="text-[10px] font-medium px-2 py-1 rounded-full"
                            style={{ backgroundColor: `rgba(${tech.color}, 0.1)`, color: `rgb(${tech.color})` }}
                          >
                            {tech.projects} Projects Completed
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
