import { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface ContactSectionProps {
  id?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ id = 'contact' }) => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.215, 0.61, 0.355, 1] 
      }
    }
  };
  
  // Trigger animations when section is visible
  if (isVisible && formStatus === 'idle') {
    controls.start('visible');
  }
  
  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission with a delay
    setTimeout(() => {
      // Here you would normally handle the actual submission
      console.log('Form submitted:', formData);
      setFormStatus('success');
      
      // Reset form after some time
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };
  
  // Neural interaction on field focus
  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
    
    // Dispatch neural interaction event
    const event = new CustomEvent('neural-interaction', {
      detail: { type: 'form-focus', field: fieldName }
    });
    document.dispatchEvent(event);
  };
  
  return (
    <section
      id={id}
      ref={sectionRef}
      className="py-20 relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6 inline-block text-gradient">
            Get In Touch
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            Have a project in mind or want to discuss AI/ML opportunities? Feel free to reach out—I'm always open to new challenges and collaborations.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="glass-panel rounded-xl overflow-hidden p-8 relative"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Neural glow effect around the form */}
            <div className="absolute -inset-px rounded-xl bg-neural/10 blur-lg opacity-50" />
            
            <div className="relative">
              {formStatus === 'success' ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg 
                    className="w-16 h-16 mx-auto text-green-400 mb-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <h3 className="text-2xl font-bold text-gradient mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-white/70">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <motion.div className="mb-6" variants={itemVariants}>
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-medium mb-2 transition-colors ${
                        focusedField === 'name' ? 'text-neural' : 'text-white/70'
                      }`}
                    >
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full bg-background-dark border rounded-lg py-3 px-4 text-white transition-all focus:outline-none focus:shadow-lg ${
                          focusedField === 'name' 
                            ? 'border-neural shadow-neural/20' 
                            : 'border-white/20'
                        }`}
                      />
                      {focusedField === 'name' && (
                        <motion.div
                          className="absolute inset-0 -z-10 rounded-lg bg-neural/20 blur-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div className="mb-6" variants={itemVariants}>
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium mb-2 transition-colors ${
                        focusedField === 'email' ? 'text-neural' : 'text-white/70'
                      }`}
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full bg-background-dark border rounded-lg py-3 px-4 text-white transition-all focus:outline-none focus:shadow-lg ${
                          focusedField === 'email' 
                            ? 'border-neural shadow-neural/20' 
                            : 'border-white/20'
                        }`}
                      />
                      {focusedField === 'email' && (
                        <motion.div
                          className="absolute inset-0 -z-10 rounded-lg bg-neural/20 blur-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div className="mb-8" variants={itemVariants}>
                    <label 
                      htmlFor="message" 
                      className={`block text-sm font-medium mb-2 transition-colors ${
                        focusedField === 'message' ? 'text-neural' : 'text-white/70'
                      }`}
                    >
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={5}
                        className={`w-full bg-background-dark border rounded-lg py-3 px-4 text-white transition-all focus:outline-none focus:shadow-lg ${
                          focusedField === 'message' 
                            ? 'border-neural shadow-neural/20' 
                            : 'border-white/20'
                        }`}
                      />
                      {focusedField === 'message' && (
                        <motion.div
                          className="absolute inset-0 -z-10 rounded-lg bg-neural/20 blur-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className={`w-full py-3 px-6 rounded-lg font-semibold text-white 
                                transition-all transform hover:translate-y-[-2px] ${
                                  formStatus === 'submitting'
                                    ? 'bg-neural/70 cursor-not-allowed'
                                    : 'bg-neural hover:bg-neural-dark hover:shadow-lg hover:shadow-neural/20'
                                }`}
                    >
                      {formStatus === 'submitting' ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
          
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-8"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Contact channels */}
            <motion.a
              href="mailto:contact@example.com"
              className="flex items-center gap-3 text-white/70 hover:text-neural transition-colors"
              variants={itemVariants}
            >
              <div className="w-10 h-10 rounded-full bg-neural/10 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <span>contact@example.com</span>
            </motion.a>
            
            <motion.a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/70 hover:text-neural transition-colors"
              variants={itemVariants}
            >
              <div className="w-10 h-10 rounded-full bg-neural/10 flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span>GitHub</span>
            </motion.a>
            
            <motion.a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/70 hover:text-neural transition-colors"
              variants={itemVariants}
            >
              <div className="w-10 h-10 rounded-full bg-neural/10 flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <span>LinkedIn</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      {/* Neural glow effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neural/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default ContactSection;