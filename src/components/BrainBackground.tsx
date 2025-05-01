import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from '../styles/BrainBackground.module.css';

const BrainBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f1218');

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create brain particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;

    // Create a brain-like shape using parametric equations
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    const brainShape = (u: number, v: number, radius: number) => {
      // Parametric equations to create a brain-like shape
      const theta = u * Math.PI * 2;
      const phi = v * Math.PI;
      
      // Base sphere
      let x = radius * Math.sin(phi) * Math.cos(theta);
      let y = radius * Math.sin(phi) * Math.sin(theta);
      let z = radius * Math.cos(phi);
      
      // Add some brain-like wrinkles
      const wrinkleScale = 1.5;
      const wrinkleFrequency = 8;
      
      x += Math.sin(phi * wrinkleFrequency) * Math.cos(theta * wrinkleFrequency) * wrinkleScale;
      y += Math.sin(phi * wrinkleFrequency) * Math.sin(theta * wrinkleFrequency) * wrinkleScale;
      z += Math.cos(phi * wrinkleFrequency) * wrinkleScale;
      
      // Add additional deformation for brain hemispheres
      if (x > 0) {
        x += 1;
      } else {
        x -= 1;
      }
      
      return { x, y, z };
    };

    // Generate particles in a brain-like pattern
    for (let i = 0; i < particlesCount; i++) {
      // Random parameters for brain shape
      const u = Math.random();
      const v = Math.random();
      const radius = 15;
      
      const { x, y, z } = brainShape(u, v, radius);
      
      // Set position
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Set colors (blue/purple gradient)
      colors[i * 3] = 0.345 + Math.random() * 0.1; // R: ~88/255
      colors[i * 3 + 1] = 0.392 + Math.random() * 0.1; // G: ~100/255
      colors[i * 3 + 2] = 0.949 + Math.random() * 0.05; // B: ~242/255
      
      // Random sizes
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Create shader material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceToCenter > 0.5) {
            discard;
          }
          gl_FragColor = vec4(vColor, 1.0 - distanceToCenter * 2.0);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    // Create particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Add connections between particles to simulate neural connections
    const linePositions = [];
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x5865F2,
      transparent: true,
      opacity: 0.2
    });

    // Create connections between nearby particles
    for (let i = 0; i < particlesCount; i++) {
      const x1 = positions[i * 3];
      const y1 = positions[i * 3 + 1];
      const z1 = positions[i * 3 + 2];

      for (let j = i + 1; j < particlesCount; j++) {
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];

        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + 
          Math.pow(y2 - y1, 2) + 
          Math.pow(z2 - z1, 2)
        );

        // Connect only nearby particles to avoid too many lines
        if (distance < 5 && Math.random() < 0.03) {
          linePositions.push(x1, y1, z1);
          linePositions.push(x2, y2, z2);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position', 
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Add mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Use raycaster to find intersected particles
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(particleSystem);
      
      if (intersects.length > 0) {
        // Smoothly update rotation based on mouse position
        const rotSpeed = 0.05;
        particleSystem.rotation.x += (mouse.y * rotSpeed - particleSystem.rotation.x) * 0.1;
        particleSystem.rotation.y += (mouse.x * rotSpeed - particleSystem.rotation.y) * 0.1;
        lines.rotation.copy(particleSystem.rotation);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      controls.update();
      
      // Pulse animation
      const time = Date.now() * 0.001;
      particleSystem.rotation.y = time * 0.05;
      lines.rotation.copy(particleSystem.rotation);
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.brainBackground} />;
};

export default BrainBackground;