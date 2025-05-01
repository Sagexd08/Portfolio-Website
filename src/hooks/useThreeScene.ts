import { useEffect, useRef, useState, useCallback, MutableRefObject } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface SceneConfig {
  backgroundColor?: string | number;
  cameraPosition: [number, number, number];
  lightIntensity: number;
  ambientLightColor: string;
  pointLightColor: string;
  fogDensity: number;
  enablePostProcessing: boolean;
}

interface ThreeSceneOptions {
  config?: Partial<SceneConfig>;
  backgroundColor?: string | number;
  enableOrbitControls?: boolean;
  enableLights?: boolean;
  enableGrid?: boolean;
  enableFog?: boolean;
  enableStats?: boolean;
  cameraPosition?: [number, number, number];
  autoRotate?: boolean;
  enableInteraction?: boolean;
  controlsConfig?: {
    enableZoom?: boolean;
    enableRotate?: boolean;
    enablePan?: boolean;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
  };
  onUpdate?: (scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer) => void;
  onMouseMove?: (x: number, y: number, intersect: THREE.Intersection | null) => void;
}

/**
 * Custom hook for creating and managing a Three.js scene
 * Handles scene setup, camera, lighting, and interaction
 */
const useThreeScene = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  options: ThreeSceneOptions = {}
) => {
  // Default configuration
  const defaultConfig: SceneConfig = {
    cameraPosition: [0, 0, 10],
    lightIntensity: 0.5,
    ambientLightColor: '#ffffff',
    pointLightColor: '#6366f1',
    fogDensity: 0.02,
    enablePostProcessing: false,
  };
  
  // Merge provided config with defaults
  const sceneConfig: SceneConfig = {
    ...defaultConfig,
    ...(options.config || {}),
  };

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [hovered, setHovered] = useState<THREE.Intersection | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Default options
  const {
    backgroundColor = 0x0f172a,
    enableOrbitControls = true,
    enableLights = true,
    enableGrid = false,
    enableFog = false,
    cameraPosition = sceneConfig.cameraPosition,
    autoRotate = false,
    enableInteraction = true,
    controlsConfig = {
      enableZoom: true,
      enableRotate: true,
      enablePan: false,
      autoRotate: autoRotate,
      autoRotateSpeed: 1.0,
    },
    onUpdate,
    onMouseMove,
  } = options;

  // Handle mouse movement for raycasting
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!enableInteraction || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      mouseRef.current.set(x, y);
      setIsInteracting(true);
      
      // Call custom mouse move handler if provided
      if (onMouseMove && sceneRef.current && cameraRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(
          sceneRef.current.children,
          true
        );
        onMouseMove(x, y, intersects.length > 0 ? intersects[0] : null);
      }
    },
    [enableInteraction, onMouseMove]
  );

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Container dimensions
    const { clientWidth: width, clientHeight: height } = containerRef.current;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Add group for easier manipulation
    scene.add(groupRef.current);

    // Set background color
    scene.background = new THREE.Color(backgroundColor);

    // Add fog if enabled
    if (enableFog) {
      scene.fog = new THREE.FogExp2(backgroundColor, sceneConfig.fogDensity);
    }

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(...cameraPosition);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lights if enabled
    if (enableLights) {
      // Ambient light
      const ambientLight = new THREE.AmbientLight(
        sceneConfig.ambientLightColor, 
        sceneConfig.lightIntensity
      );
      scene.add(ambientLight);

      // Directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 10);
      scene.add(directionalLight);

      // Point light
      const pointLight = new THREE.PointLight(
        sceneConfig.pointLightColor, 
        1, 
        100
      );
      pointLight.position.set(-10, -10, -10);
      scene.add(pointLight);
    }

    // Add grid helper if enabled
    if (enableGrid) {
      const gridHelper = new THREE.GridHelper(100, 100);
      scene.add(gridHelper);
    }

    // Add orbit controls if enabled
    if (enableOrbitControls) {
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = controlsConfig.enableZoom ?? true;
      controls.enableRotate = controlsConfig.enableRotate ?? true;
      controls.enablePan = controlsConfig.enablePan ?? false;
      controls.autoRotate = controlsConfig.autoRotate ?? false;
      controls.autoRotateSpeed = controlsConfig.autoRotateSpeed ?? 1.0;
      controlsRef.current = controls;
    }

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const { clientWidth: width, clientHeight: height } = containerRef.current;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    if (enableInteraction) {
      containerRef.current.addEventListener('mousemove', handleMouseMove as EventListener);
    }

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      animationFrameRef.current = requestAnimationFrame(animate);
      const deltaTime = clockRef.current.getDelta();

      // Update controls if enabled
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Auto rotation if enabled and not interacting
      if (autoRotate && !isInteracting && groupRef.current) {
        groupRef.current.rotation.y += deltaTime * 0.1;
      }

      // Update raycaster and check for intersections
      if (enableInteraction && sceneRef.current && cameraRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(
          sceneRef.current.children,
          true
        );
        
        if (intersects.length > 0) {
          setHovered(intersects[0]);
        } else {
          setHovered(null);
        }
      }

      // Reset interaction flag after some time without movement
      if (isInteracting) {
        setTimeout(() => {
          setIsInteracting(false);
        }, 2000);
      }

      // Call user-provided update function
      if (onUpdate) {
        onUpdate(sceneRef.current, cameraRef.current, rendererRef.current);
      }

      // Render the scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    // Start animation loop
    clockRef.current.start();
    animate();
    setIsInitialized(true);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && enableInteraction) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove as EventListener);
      }
      
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      // Clear references
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
    };
  }, [
    backgroundColor,
    enableOrbitControls,
    enableLights,
    enableGrid,
    enableFog,
    cameraPosition,
    controlsConfig,
    onUpdate,
  ]);

  // Add an object to the scene
  const addToScene = (object: THREE.Object3D) => {
    if (sceneRef.current) {
      sceneRef.current.add(object);
    }
  };

  // Add an object to the group
  const addToGroup = (object: THREE.Object3D) => {
    if (groupRef.current) {
      groupRef.current.add(object);
    }
  };

  // Remove an object from the scene
  const removeFromScene = (object: THREE.Object3D) => {
    if (sceneRef.current) {
      sceneRef.current.remove(object);
    }
  };

  // Remove an object from the group
  const removeFromGroup = (object: THREE.Object3D) => {
    if (groupRef.current) {
      groupRef.current.remove(object);
    }
  };

  // Clear all objects from the group
  const clearGroup = () => {
    if (groupRef.current) {
      while (groupRef.current.children.length > 0) {
        groupRef.current.remove(groupRef.current.children[0]);
      }
    }
  };

  return {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    controls: controlsRef.current,
    group: groupRef.current,
    raycaster: raycasterRef.current,
    mouse: mouseRef.current,
    clock: clockRef.current,
    isInitialized,
    isInteracting,
    hovered,
    sceneConfig,
    addToScene,
    removeFromScene,
    addToGroup,
    removeFromGroup,
    clearGroup,
  };
};

export default useThreeScene;
