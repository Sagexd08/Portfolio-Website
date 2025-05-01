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
    company: 'DataWorks Technologies',
    position: 'Machine Learning Engineer',
    dateRange: 'Mar 2019 - Dec 2020',
    description: [
      'Built recommendation systems using collaborative filtering and deep learning approaches',
      'Engineered features for time-series forecasting models in the financial sector',
      'Optimized model performance, reducing inference time by 40% while maintaining accuracy',
      'Created data pipelines for efficient model training and validation'
    ],
    technologies: ['PyTorch', 'Scikit-learn', 'Apache Spark', 'Docker', 'AWS SageMaker']
  },
 
];

export default experiences;
