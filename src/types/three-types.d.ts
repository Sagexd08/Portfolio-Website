import { Object3D, Material, Mesh, BufferGeometry } from 'three';
import { ReactThreeFiber } from '@react-three/fiber';

// Custom Three.js objects
declare global {
  namespace JSX {
    interface IntrinsicElements {
      neuralGroup: ReactThreeFiber.Object3DNode<any, any>;
      synapseLines: ReactThreeFiber.Object3DNode<any, any>;
      neuronMesh: ReactThreeFiber.Object3DNode<any, any>;
    }
  }
}

// Extend Three.js Objects
declare module 'three' {
  interface Object3D {
    isSynapse?: boolean;
    isNeuron?: boolean;
    synapseType?: 'input' | 'hidden' | 'output';
    weights?: number[];
    activationLevel?: number;
    fired?: boolean;
  }
}

// Extend Mesh
declare module 'three' {
  interface Mesh {
    originalPosition?: {
      x: number;
      y: number;
      z: number;
    };
    targetPosition?: {
      x: number;
      y: number;
      z: number;
    };
  }
}

// Shader Materials
export interface ShaderMaterialProps {
  time?: number;
  resolution?: [number, number];
  color?: string;
  opacity?: number;
  amplitude?: number;
  frequency?: number;
}

// Model with Animation Definitions
export interface GLTFResult {
  nodes: Record<string, Mesh>;
  materials: Record<string, Material>;
  animations: Array<THREE.AnimationClip>;
  scene: THREE.Group;
}

// Neural Network 3D Visualization Types
export interface Neuron3D {
  id: string;
  position: [number, number, number];
  layer: number;
  index: number;
  connections: Connection3D[];
  value: number;
  active: boolean;
}

export interface Connection3D {
  sourceId: string;
  targetId: string;
  weight: number;
  active: boolean;
}

// Raycasting Types
export interface RaycastResult {
  object: Object3D;
  distance: number;
  point: THREE.Vector3;
  userData: any;
}