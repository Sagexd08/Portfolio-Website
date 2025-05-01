import { Project } from '@/types/index';

export const projectsData: Project[] = [
  {
    id: 'neural-image-classifier',
    title: 'Neural Image Classifier',
    description: 'A deep learning model that classifies images using convolutional neural networks (CNNs).',
    longDescription: 'This project implements a state-of-the-art image classification system using deep convolutional neural networks. The model was trained on a large dataset of labeled images and achieves over 92% accuracy on test data. It can classify objects into 1000 different categories in real-time.',
    tags: ['Deep Learning', 'Computer Vision', 'CNN', 'TensorFlow', 'Python'],
    image: '/images/projects/neural-classifier.jpg',
    githubUrl: 'https://github.com/username/neural-image-classifier',
    liveUrl: 'https://demo.example.com/neural-classifier',
    aiFeatures: [
      'Multi-layer convolutional neural network architecture',
      'Transfer learning using pre-trained models',
      'Real-time classification with webcam input',
      'Attention mechanisms for improved accuracy'
    ],
    mlTechnologies: ['TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'Scikit-learn'],
    featured: true
  },
  {
    id: 'nlp-sentiment-analyzer',
    title: 'NLP Sentiment Analyzer',
    description: 'Natural language processing model that analyzes sentiment in text using transformer-based architecture.',
    longDescription: 'This NLP project implements sentiment analysis using BERT, a transformer-based model. It can determine if text expresses positive, negative, or neutral sentiment with high accuracy. The system was fine-tuned on domain-specific data and includes a web interface for real-time analysis.',
    tags: ['NLP', 'BERT', 'Transformers', 'PyTorch', 'Python'],
    image: '/images/projects/nlp-sentiment.jpg',
    githubUrl: 'https://github.com/username/nlp-sentiment-analyzer',
    liveUrl: 'https://demo.example.com/sentiment-analyzer',
    aiFeatures: [
      'BERT transformer architecture for context-aware analysis',
      'Fine-tuned on domain-specific data',
      'Multi-language support',
      'Attention visualization for model interpretability'
    ],
    mlTechnologies: ['PyTorch', 'Hugging Face Transformers', 'NLTK', 'spaCy', 'Flask'],
    featured: true
  },
  {
    id: 'reinforcement-learning-game',
    title: 'RL Game Agent',
    description: 'Reinforcement learning agent that learns to play games through trial and error.',
    longDescription: 'This project implements a reinforcement learning agent using Deep Q-Networks (DQN) that learns to play various Atari games. The agent improves its performance over time through experience, without explicit programming of game strategies. It demonstrates how AI can learn complex tasks through interaction with environments.',
    tags: ['Reinforcement Learning', 'DQN', 'PyTorch', 'OpenAI Gym', 'Python'],
    image: '/images/projects/rl-game.jpg',
    githubUrl: 'https://github.com/username/reinforcement-learning-game',
    liveUrl: 'https://demo.example.com/rl-game',
    aiFeatures: [
      'Deep Q-Network (DQN) with experience replay',
      'Policy gradient methods for continuous action spaces',
      'Prioritized experience replay for improved learning',
      'Visual demonstration of agent learning progress'
    ],
    mlTechnologies: ['PyTorch', 'OpenAI Gym', 'NumPy', 'TensorBoard', 'Docker'],
    featured: true
  },
  {
    id: 'generative-art-gan',
    title: 'Generative Art GAN',
    description: 'Generative adversarial network that creates original artwork in various artistic styles.',
    longDescription: 'This creative AI project uses a StyleGAN architecture to generate unique artwork in different artistic styles. The model was trained on thousands of paintings from various artistic periods and can generate high-resolution, original artwork. It includes style mixing capabilities and allows for controlled image generation through a user-friendly interface.',
    tags: ['GAN', 'StyleGAN', 'Generative Art', 'TensorFlow', 'Python'],
    image: '/images/projects/generative-art.jpg',
    githubUrl: 'https://github.com/username/generative-art-gan',
    liveUrl: 'https://demo.example.com/generative-art',
    aiFeatures: [
      'StyleGAN2 architecture for high-quality image generation',
      'Progressive growing for high-resolution outputs',
      'Style mixing and interpolation between artistic styles',
      'Latent space exploration interface'
    ],
    mlTechnologies: ['TensorFlow', 'CUDA', 'NumPy', 'Matplotlib', 'React'],
    featured: false
  },
  {
    id: 'autonomous-drone',
    title: 'Autonomous Drone Navigation',
    description: 'AI system for autonomous drone navigation using computer vision and reinforcement learning.',
    longDescription: 'This project combines computer vision and reinforcement learning to enable drones to navigate autonomously in complex environments. The system uses depth estimation from camera input and a trained policy network to make real-time navigation decisions. The drone can avoid obstacles, follow paths, and reach targets without human intervention.',
    tags: ['Robotics', 'Computer Vision', 'Reinforcement Learning', 'ROS', 'Python'],
    image: '/images/projects/autonomous-drone.jpg',
    githubUrl: 'https://github.com/username/autonomous-drone',
    liveUrl: null,
    aiFeatures: [
      'Depth estimation from monocular camera',
      'Policy gradient methods for control',
      'Sim-to-real transfer for robust performance',
      'Collision avoidance using SLAM techniques'
    ],
    mlTechnologies: ['PyTorch', 'ROS', 'OpenCV', 'Gazebo Simulator', 'C++'],
    featured: false
  },
  {
    id: 'medical-diagnosis-ai',
    title: 'Medical Diagnosis AI',
    description: 'AI-powered diagnostic system that identifies diseases from medical images.',
    longDescription: 'This healthcare AI project uses deep learning to assist medical professionals in diagnosing diseases from X-rays, CT scans, and MRIs. The model was trained on a large dataset of annotated medical images and validated by healthcare professionals. It can detect multiple conditions and provides visual explanations for its predictions.',
    tags: ['Healthcare AI', 'Computer Vision', 'CNN', 'PyTorch', 'Python'],
    image: '/images/projects/medical-diagnosis.jpg',
    githubUrl: 'https://github.com/username/medical-diagnosis-ai',
    liveUrl: null,
    aiFeatures: [
      'Multi-modal input support (X-rays, CT scans, MRIs)',
      '3D convolutional networks for volumetric data',
      'Grad-CAM visualization for model interpretability',
      'Uncertainty estimation for reliable predictions'
    ],
    mlTechnologies: ['PyTorch', 'MONAI', 'OpenCV', 'scikit-learn', 'Flask'],
    featured: false
  }
];