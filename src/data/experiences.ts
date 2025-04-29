import { Experience } from '@/types/index';

export const experiences: Experience[] = [
  {
    id: 'ml-engineer',
    title: 'ML Engineer',
    company: 'AI Innovations Lab',
    location: 'Kolkata, India',
    startDate: 'Jan 2023',
    endDate: 'Present',
    description: [
      'Developing computer vision solutions for autonomous systems using deep learning',
      'Improved object detection model accuracy by 18% while reducing inference time by 30%',
      'Implementing MLOps practices with CI/CD pipelines for model deployment',
      'Collaborating with cross-functional teams to integrate ML solutions into production systems',
    ],
    technologies: ['PyTorch', 'TensorFlow', 'Computer Vision', 'Docker', 'Python', 'CUDA'],
  },
  {
    id: 'research-intern',
    title: 'AI Research Intern',
    company: 'Neural Systems Research',
    location: 'Remote',
    startDate: 'May 2022',
    endDate: 'Dec 2022',
    description: [
      'Researched and implemented transformer-based models for natural language processing tasks',
      'Developed a sentiment analysis system with 92% accuracy on benchmark datasets',
      'Contributed to open-source NLP libraries and tools',
      'Presented research findings at internal conferences and workshops',
    ],
    technologies: ['BERT', 'Transformers', 'NLP', 'HuggingFace', 'Python', 'PyTorch'],
  },
  {
    id: 'data-scientist',
    title: 'Data Science Intern',
    company: 'DataTech Solutions',
    location: 'Bangalore, India',
    startDate: 'Jun 2021',
    endDate: 'Apr 2022',
    description: [
      'Analyzed large datasets to extract actionable insights for business decisions',
      'Built predictive models for customer segmentation and churn prediction',
      'Developed interactive dashboards for real-time data visualization',
      'Optimized ETL pipelines for improved data processing efficiency',
    ],
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'SQL', 'Tableau', 'Matplotlib'],
  },
  {
    id: 'ml-project',
    title: 'ML Project Lead',
    company: 'University AI Club',
    location: 'Kolkata, India',
    startDate: 'Sep 2020',
    endDate: 'May 2021',
    description: [
      'Led a team of 4 students in developing a reinforcement learning project',
      'Implemented a deep Q-learning algorithm for game-playing agents',
      'Organized workshops and training sessions on machine learning fundamentals',
      'Mentored junior students in AI/ML concepts and programming',
    ],
    technologies: ['TensorFlow', 'Reinforcement Learning', 'Python', 'Keras', 'NumPy'],
  },
];