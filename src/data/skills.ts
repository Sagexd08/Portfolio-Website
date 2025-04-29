import { Skill } from '@/types/index';

export const skills: Skill[] = [
  {
    name: 'TensorFlow',
    proficiency: 90,
    description: 'Expert in building and deploying deep learning models with TensorFlow.',
    category: 'ML',
    icon: 'tensorflow',
  },
  {
    name: 'PyTorch',
    proficiency: 85,
    description: 'Proficient in developing neural networks and computer vision models with PyTorch.',
    category: 'ML',
    icon: 'pytorch',
  },
  {
    name: 'Natural Language Processing',
    proficiency: 80,
    description: 'Experienced in building NLP systems including sentiment analysis, text classification, and chatbots.',
    category: 'AI',
    icon: 'nlp',
  },
  {
    name: 'Computer Vision',
    proficiency: 85,
    description: 'Skilled in object detection, image segmentation, and facial recognition systems.',
    category: 'AI',
    icon: 'vision',
  },
  {
    name: 'Python',
    proficiency: 95,
    description: 'Expert-level Python programming with focus on data science and ML libraries.',
    category: 'Programming',
    icon: 'python',
  },
  {
    name: 'JavaScript/TypeScript',
    proficiency: 85,
    description: 'Strong frontend development skills with React and Next.js.',
    category: 'Programming',
    icon: 'typescript',
  },
  {
    name: 'Data Visualization',
    proficiency: 80,
    description: 'Experienced with D3.js, Matplotlib, and other data visualization tools.',
    category: 'Tools',
    icon: 'visualization',
  },
  {
    name: 'MLOps',
    proficiency: 75,
    description: 'Knowledge of ML pipelines, model deployment, and monitoring using tools like MLflow and Kubeflow.',
    category: 'Tools',
    icon: 'mlops',
  },
  {
    name: 'Problem Solving',
    proficiency: 90,
    description: 'Strong analytical thinking and creative problem-solving abilities.',
    category: 'Soft Skills',
    icon: 'problem',
  },
  {
    name: 'Communication',
    proficiency: 85,
    description: 'Excellent at explaining complex technical concepts to non-technical stakeholders.',
    category: 'Soft Skills',
    icon: 'communication',
  },
];