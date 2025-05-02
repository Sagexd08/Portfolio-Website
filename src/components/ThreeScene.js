import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// This is a fallback component that uses plain Three.js instead of React Three Fiber
// to avoid the compatibility issues with Next.js

const ThreeScene = ({ className, type = 'carousel' }) => {
  const mountRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Make sure the ref is available
    if (!mountRef.current) return;

    setMounted(true);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 2, 0.1, 1000);
    camera.position.z = 5;

    // Get container dimensions
    const width = mountRef.current.clientWidth || 300;
    const height = mountRef.current.clientHeight || 300;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x9A70FF, 0.2);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Create objects based on type
    const objects = [];

    if (type === 'carousel') {
      // Create floating objects for carousel
      createFloatingObject(scene, objects, [-3, 2, -2], 0x7980fe, 'tetrahedron', 0.4);
      createFloatingObject(scene, objects, [-2.5, 1.5, -1], 0x9A70FF, 'sphere', 0.2);
      createFloatingObject(scene, objects, [3, 2, -3], 0x838aff, 'octahedron', 0.3);
      createFloatingObject(scene, objects, [2.5, 1.2, -2], 0x7980fe, 'box', 0.25);
      createFloatingObject(scene, objects, [-3, -2, -2], 0x9A70FF, 'torus', 0.3);
      createFloatingObject(scene, objects, [-2.2, -1.5, -1], 0x7980fe, 'sphere', 0.15);
      createFloatingObject(scene, objects, [3, -2, -1], 0x838aff, 'tetrahedron', 0.35);
      createFloatingObject(scene, objects, [2.3, -1.3, -2], 0x9A70FF, 'box', 0.2);
      createFloatingObject(scene, objects, [0, 0, -4], 0x7980fe, 'sphere', 0.5);
    } else if (type === 'decoration') {
      // Create smaller decorative objects
      createFloatingObject(scene, objects, [-1, 1, 0], 0x7980fe, 'tetrahedron', 0.2);
      createFloatingObject(scene, objects, [-0.7, 0.7, -0.5], 0x9A70FF, 'sphere', 0.1);
    } else if (type === 'heading') {
      // Create particles for heading
      for (let i = 0; i < 20; i++) {
        const x = (Math.random() - 0.5) * 5;
        const y = (Math.random() - 0.5) * 2;
        const z = (Math.random() - 0.5) * 2;
        const color = Math.random() > 0.5 ? 0x7980fe : 0x9A70FF;
        createFloatingObject(scene, objects, [x, y, z], color, 'sphere', 0.05 + Math.random() * 0.1);
      }
    }

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Animate all objects
      objects.forEach((obj, index) => {
        // Rotation
        obj.rotation.x += 0.002 * (index % 3 + 1);
        obj.rotation.y += 0.003 * (index % 2 + 1);

        // Floating movement
        obj.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.002;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;

      const width = mountRef.current.clientWidth || 300;
      const height = mountRef.current.clientHeight || 300;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      objects.forEach(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
        scene.remove(obj);
      });

      renderer.dispose();
    };
  }, [type, mounted]);

  // Helper function to create floating objects
  function createFloatingObject(scene, objects, position, color, shape, scale) {
    let geometry;

    switch (shape) {
      case 'box':
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(0.6, 16, 16);
        break;
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(0.7, 0);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(0.6, 0);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 32);
        break;
      default:
        geometry = new THREE.SphereGeometry(0.5, 16, 16);
    }

    const material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.5,
      roughness: 0.2,
      emissive: color,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.8
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.scale.set(scale, scale, scale);

    scene.add(mesh);
    objects.push(mesh);

    return mesh;
  }

  // Only render on client side
  if (typeof window === 'undefined') return null;

  return <div ref={mountRef} className={className} style={{ width: '100%', height: '100%' }} />;
};

export default ThreeScene;
