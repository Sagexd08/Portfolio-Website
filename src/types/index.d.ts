// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  aiFeatures: string[];
  mlTechnologies: string[];
  featured: boolean;
}

// Experience Types
export interface Experience {
  id: string;
  company: string;
  position: string;
  dateRange: string;
  description: string[];
  technologies: string[];
}

// Skill Types
export interface Skill {
  name: string;
  icon: string;
  level: number; // 0-100
  category: 'AI' | 'ML' | 'Programming' | 'Data' | 'Cloud' | 'Other';
}

// AI Algorithm Types for Visualizations
export interface Algorithm {
  name: string;
  description: string;
  category: 'supervised' | 'unsupervised' | 'reinforcement' | 'neural-networks';
  complexity: number; // 1-10
  accuracy: number; // 0-100
  dataPoints: DataPoint[];
}

export interface DataPoint {
  x: number;
  y: number;
  label?: string;
  value?: number;
}

// Neural Network Types
export interface NeuralLayer {
  id: string;
  neurons: number;
  activationFunction: 'relu' | 'sigmoid' | 'tanh' | 'softmax';
}

export interface NeuralNetwork {
  layers: NeuralLayer[];
  connections: NeuralConnection[];
}

export interface NeuralConnection {
  sourceLayerId: string;
  targetLayerId: string;
  weight: number;
}

// Animation Types
export interface AnimationState {
  progress: number;
  isComplete: boolean;
}

export interface TransitionEffect {
  type: 'fade' | 'slide' | 'scale' | 'neural';
  duration: number;
  easing: string;
}

// 3D Scene Types
export interface SceneConfig {
  cameraPosition: [number, number, number];
  lightIntensity: number;
  ambientLightColor: string;
  pointLightColor: string;
  fogDensity: number;
  enablePostProcessing: boolean;
}