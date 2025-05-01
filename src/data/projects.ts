import { Project } from '@/types/index';

/**
 * Portfolio projects data showcasing AI/ML expertise
 */
export const projects: Project[] = [
  {
    id: 'neural-style-transfer',
    title: 'Neural Style Transfer App',
    description: 'A web application that uses deep learning to apply artistic styles to images using PyTorch and Flask.',
    longDescription: 'This project implements neural style transfer techniques using PyTorch and Flask backend with a React frontend. Users can upload their images and select from various artistic styles, with the deep learning model separating and recombining content and style features to create unique artistic renditions.',
    image: '/images/projects/neural-style.jpg',
    tags: ['Deep Learning', 'Computer Vision', 'Web Application', 'Art Generation'],
    technologies: ['PyTorch', 'Flask', 'React', 'TensorFlow.js'],
    githubUrl: 'https://github.com/Sagexd08/neural-style-transfer',
    demoUrl: 'https://neural-style-demo.vercel.app',
    aiFeatures: [
      'VGG19-based feature extraction',
      'Content and style loss optimization',
      'GPU acceleration for faster processing',
      'Progressive resolution enhancement'
    ],
    mlTechnologies: ['Convolutional Neural Networks', 'Transfer Learning', 'Gram Matrix Computation', 'Adam Optimizer'],
    featured: true,
  },
  {
    id: 'sentiment-analysis',
    title: 'Real-time Sentiment Analysis',
    description: 'A real-time sentiment analysis tool for social media feeds using BERT and streaming data processing.',
    longDescription: 'This application monitors social media platforms and provides real-time sentiment analysis using BERT-based natural language processing. The system processes streaming data through Kafka, analyzes sentiment patterns, and visualizes trends on an interactive dashboard.',
    image: '/images/projects/sentiment.jpg',
    tags: ['NLP', 'Sentiment Analysis', 'Real-time Processing', 'Social Media Analytics'],
    technologies: ['BERT', 'Kafka', 'Python', 'React'],
    githubUrl: 'https://github.com/Sagexd08/sentiment-analysis',
    aiFeatures: [
      'Fine-tuned BERT model for sentiment classification',
      'Entity recognition and topic extraction',
      'Temporal trend analysis',
      'Anomaly detection in sentiment shifts'
    ],
    mlTechnologies: ['Transformer Models', 'Streaming Data Processing', 'Text Classification', 'Data Visualization'],
    featured: true,
  },
  {
    id: 'object-detection',
    title: 'Object Detection System',
    description: 'A computer vision system that detects and classifies objects in real-time video streams using YOLO.',
    longDescription: 'This project implements state-of-the-art YOLO (You Only Look Once) object detection algorithms that can identify and track multiple objects in real-time video feeds. The system works with webcams and video files, providing bounding boxes and confidence scores for detected objects.',
    image: '/images/projects/object-detection.jpg',
    tags: ['Computer Vision', 'Object Detection', 'Real-time Processing', 'Video Analysis'],
    technologies: ['YOLO', 'OpenCV', 'TensorFlow', 'Python'],
    githubUrl: 'https://github.com/Sagexd08/object-detection',
    demoUrl: 'https://object-detection-demo.vercel.app',
    aiFeatures: [
      'YOLOv5 architecture implementation',
      'Multi-object tracking across frames',
      'Transfer learning for custom object classes',
      'Edge deployment optimization'
    ],
    mlTechnologies: ['Anchor-based Detection', 'Non-Maximum Suppression', 'Feature Pyramid Networks', 'IoU Calculation'],
    featured: true,
  },
  {
    id: 'recommendation-engine',
    title: 'ML Recommendation Engine',
    description: 'A recommendation system using collaborative filtering and content-based approaches for e-commerce.',
    longDescription: 'This recommendation engine combines collaborative filtering and content-based approaches to provide personalized product recommendations for e-commerce platforms. The system analyzes user behavior, purchase history, and product attributes to suggest relevant items to users.',
    image: '/images/projects/recommendation.jpg',
    tags: ['Recommender Systems', 'E-commerce', 'Personalization', 'Data Mining'],
    technologies: ['Scikit-learn', 'Pandas', 'FastAPI', 'PostgreSQL'],
    githubUrl: 'https://github.com/Sagexd08/recommendation-engine',
    aiFeatures: [
      'Matrix factorization for collaborative filtering',
      'Content-based similarity computation',
      'Hybrid recommendation approach',
      'Cold-start problem handling'
    ],
    mlTechnologies: ['Singular Value Decomposition', 'Cosine Similarity', 'A/B Testing Framework', 'Feature Engineering'],
    featured: false,
  },
  {
    id: 'nlp-chatbot',
    title: 'NLP-Powered Chatbot',
    description: 'An intelligent chatbot using natural language processing to provide contextual responses.',
    longDescription: 'This conversational AI chatbot uses advanced natural language processing techniques to understand user queries and provide contextually relevant responses. Built with Rasa framework, it maintains conversation context and can be integrated with various messaging platforms.',
    image: '/images/projects/chatbot.jpg',
    tags: ['Conversational AI', 'NLP', 'Chatbots', 'Intent Recognition'],
    technologies: ['Rasa', 'NLP', 'Python', 'Docker'],
    githubUrl: 'https://github.com/Sagexd08/nlp-chatbot',
    demoUrl: 'https://chatbot-demo.vercel.app',
    aiFeatures: [
      'Intent classification and entity extraction',
      'Contextual response generation',
      'Dialog management system',
      'Multi-turn conversation handling'
    ],
    mlTechnologies: ['Transformer Models', 'Named Entity Recognition', 'Intent Classification', 'Dialogue State Tracking'],
    featured: false,
  },
  {
    id: 'anomaly-detection',
    title: 'Anomaly Detection System',
    description: 'A system that detects anomalies in time-series data using autoencoders and statistical methods.',
    longDescription: 'This anomaly detection system identifies unusual patterns in time-series data using a combination of deep learning autoencoders and statistical methods. Designed for monitoring industrial systems and IoT devices, it can detect subtle deviations that might indicate equipment failures or security breaches.',
    image: '/images/projects/anomaly.jpg',
    tags: ['Anomaly Detection', 'Time Series Analysis', 'Predictive Maintenance', 'IoT'],
    technologies: ['Keras', 'NumPy', 'Matplotlib', 'AWS'],
    githubUrl: 'https://github.com/Sagexd08/anomaly-detection',
    aiFeatures: [
      'Autoencoder-based reconstruction error analysis',
      'Statistical outlier detection methods',
      'Real-time anomaly scoring',
      'Adaptive thresholding techniques'
    ],
    mlTechnologies: ['LSTM Autoencoders', 'One-Class SVM', 'Isolation Forest', 'Exponential Moving Averages'],
    featured: false,
  },
  {
    id: 'reinforcement-learning-game',
    title: 'Reinforcement Learning Game AI',
    description: 'A game environment where an AI agent learns optimal strategies through reinforcement learning.',
    longDescription: 'This project demonstrates how reinforcement learning can be applied to game environments. The AI agent learns to navigate complex game scenarios by receiving rewards for successful actions. The visualization allows users to watch the agent learn in real-time and understand the decision-making process.',
    image: '/images/projects/rl-game.jpg',
    tags: ['Reinforcement Learning', 'Game AI', 'Deep Q-Learning', 'Simulation'],
    technologies: ['PyTorch', 'OpenAI Gym', 'Python', 'JavaScript'],
    githubUrl: 'https://github.com/Sagexd08/rl-game-agent',
    aiFeatures: [
      'Deep Q-Network (DQN) implementation',
      'Experience replay for stable learning',
      'Progressive difficulty adaptation',
      'Visual representation of agent learning'
    ],
    mlTechnologies: ['Deep Q-Networks', 'Policy Gradients', 'Reward Shaping', 'State Representation'],
    featured: false,
  },
];
