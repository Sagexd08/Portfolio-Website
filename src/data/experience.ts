import { Experience } from '@/types';

/**
 * Sample professional experience data for the timeline section
 */
export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'AI Wallah',
    position: 'Gen AI Internr',
    dateRange: 'April 2025 -Present',
    description: [
'Deepen my grasp of transformer architectures, attention mechanisms, and tokenization for text, image, and audio generation. Prototype, train, fine-tune, and deploy generative models on real datasets. Build end-to-end pipelines, integrate models into applications, optimize performance and scalability, conduct evaluations, and document solutions with the AI WALLAH team.'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'Computer Vision', 'NLP', 'Kubernetes', 'Python']
  },
  {
    id: 'exp-2',
    company: 'Geeks For Geeks SNU Chapter',
    position: 'Technical Executive',
    dateRange: 'Mar 2025 - Present',
    description: [
      'Mentored 15+ student teams through the full AI/ML project lifecycle—helping them define problem statements, select appropriate algorithms, and design solution architectures—while providing in-depth code reviews and technical feedback to boost solution robustness and learning outcomes.',
      'Guided teams in data preprocessing, model training, hyperparameter tuning, and deployment with Python, scikit-learn, TensorFlow, Flask, and Docker, enabling 10+ successful live demos and real-world application showcases'
      
    ],
    technologies: ['PyTorch', 'Scikit-learn', 'Apache Spark', 'Docker', 'AWS SageMaker']
  },
 
];

export default experiences;
