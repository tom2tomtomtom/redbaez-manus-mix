import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const WebGLBackground = ({ className = '' }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add renderer to DOM
    container.appendChild(renderer.domElement);
    
    // Create gradient background
    const gradientTexture = new THREE.CanvasTexture(createGradientCanvas());
    scene.background = gradientTexture;
    
    // Create floating shapes
    const shapes = [];
    const shapeCount = 15;
    
    for (let i = 0; i < shapeCount; i++) {
      const shape = createRandomShape();
      scene.add(shape);
      shapes.push(shape);
    }
    
    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    composer.addPass(bloomPass);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    }
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Handle window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      gradientTexture.needsUpdate = true;
    }
    
    window.addEventListener('resize', onWindowResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate and move shapes
      shapes.forEach(shape => {
        shape.rotation.x += 0.001;
        shape.rotation.y += 0.002;
        
        // Subtle floating motion
        shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.001;
      });
      
      // Respond to mouse movement
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      composer.render();
    };
    
    animate();
    
    // Helper function to create gradient canvas
    function createGradientCanvas() {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      
      const context = canvas.getContext('2d');
      
      // Create gradient
      const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#111111');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      return canvas;
    }
    
    // Helper function to create random shape
    function createRandomShape() {
      const geometries = [
        new THREE.IcosahedronGeometry(Math.random() * 0.5 + 0.1, 0),
        new THREE.TetrahedronGeometry(Math.random() * 0.5 + 0.1, 0),
        new THREE.OctahedronGeometry(Math.random() * 0.5 + 0.1, 0)
      ];
      
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      
      // Create material with random color
      const colors = [
        new THREE.Color('#3C91E6'),
        new THREE.Color('#7B4AE2'),
        new THREE.Color('#9C27B0')
      ];
      
      const material = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      
      const shape = new THREE.Mesh(geometry, material);
      
      // Random position
      shape.position.x = (Math.random() - 0.5) * 10;
      shape.position.y = (Math.random() - 0.5) * 10;
      shape.position.z = (Math.random() - 0.5) * 10;
      
      // Random rotation
      shape.rotation.x = Math.random() * Math.PI;
      shape.rotation.y = Math.random() * Math.PI;
      
      return shape;
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      
      // Dispose resources
      shapes.forEach(shape => {
        shape.geometry.dispose();
        shape.material.dispose();
      });
      
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}
    />
  );
};

export default WebGLBackground;
