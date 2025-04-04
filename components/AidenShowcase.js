import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollReveal from './ScrollReveal';
import GlassmorphismCard from './GlassmorphismCard';
import TextReveal from './TextReveal';
import MagneticElement from './MagneticElement';
import * as THREE from 'three';

const AidenShowcase = () => {
  const showcaseRef = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Initialize 3D visualization
      const canvas = canvasRef.current;
      
      if (canvas) {
        // Scene setup
        const scene = new THREE.Scene();
        
        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ 
          canvas,
          alpha: true,
          antialias: true 
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create brain-like structure
        const brainGroup = new THREE.Group();
        scene.add(brainGroup);
        
        // Create nodes
        const nodeCount = 100;
        const nodes = [];
        const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        
        for (let i = 0; i < nodeCount; i++) {
          const nodeMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(
              i % 3 === 0 ? '#3C91E6' : i % 3 === 1 ? '#7B4AE2' : '#9C27B0'
            ),
            transparent: true,
            opacity: 0.7
          });
          
          const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
          
          // Random position within a sphere
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const radius = 1.5 * Math.cbrt(Math.random());
          
          node.position.x = radius * Math.sin(phi) * Math.cos(theta);
          node.position.y = radius * Math.sin(phi) * Math.sin(theta);
          node.position.z = radius * Math.cos(phi);
          
          brainGroup.add(node);
          nodes.push(node);
        }
        
        // Create connections between nodes
        const connectionCount = 150;
        const connections = [];
        
        for (let i = 0; i < connectionCount; i++) {
          const nodeA = nodes[Math.floor(Math.random() * nodes.length)];
          const nodeB = nodes[Math.floor(Math.random() * nodes.length)];
          
          if (nodeA !== nodeB) {
            const points = [nodeA.position, nodeB.position];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            
            const material = new THREE.LineBasicMaterial({
              color: new THREE.Color(
                i % 3 === 0 ? '#3C91E6' : i % 3 === 1 ? '#7B4AE2' : '#9C27B0'
              ),
              transparent: true,
              opacity: 0.3
            });
            
            const line = new THREE.Line(geometry, material);
            brainGroup.add(line);
            connections.push(line);
          }
        }
        
        // Mouse movement effect
        let mouseX = 0;
        let mouseY = 0;
        
        function onDocumentMouseMove(event) {
          const rect = canvas.getBoundingClientRect();
          mouseX = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
          mouseY = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
        }
        
        document.addEventListener('mousemove', onDocumentMouseMove);
        
        // Handle window resize
        function onWindowResize() {
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        }
        
        window.addEventListener('resize', onWindowResize);
        
        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          
          // Rotate brain
          brainGroup.rotation.y += 0.002;
          brainGroup.rotation.x += 0.001;
          
          // Respond to mouse movement
          brainGroup.rotation.y += mouseX * 0.001;
          brainGroup.rotation.x += mouseY * 0.001;
          
          // Pulse effect
          const time = Date.now() * 0.001;
          
          nodes.forEach((node, i) => {
            node.material.opacity = 0.5 + 0.3 * Math.sin(time + i * 0.1);
            node.scale.setScalar(0.8 + 0.2 * Math.sin(time + i * 0.1));
          });
          
          connections.forEach((connection, i) => {
            connection.material.opacity = 0.1 + 0.1 * Math.sin(time + i * 0.05);
          });
          
          renderer.render(scene, camera);
        };
        
        animate();
        
        // Cleanup
        return () => {
          window.removeEventListener('resize', onWindowResize);
          document.removeEventListener('mousemove', onDocumentMouseMove);
          
          // Dispose resources
          nodes.forEach(node => {
            node.geometry.dispose();
            node.material.dispose();
          });
          
          connections.forEach(connection => {
            connection.geometry.dispose();
            connection.material.dispose();
          });
          
          renderer.dispose();
        };
      }
    }
  }, []);
  
  const features = [
    {
      title: 'Content Generation',
      description: 'AIDEN can generate high-quality content across multiple formats and styles, adapting to your brand voice.',
      icon: '📝'
    },
    {
      title: 'Image Creation',
      description: 'Create stunning visuals from simple text prompts, perfectly aligned with your brand guidelines.',
      icon: '🖼️'
    },
    {
      title: 'Data Analysis',
      description: 'Extract actionable insights from your content performance to continuously improve results.',
      icon: '📊'
    },
    {
      title: 'Personalization',
      description: 'Deliver tailored content to different audience segments for maximum engagement.',
      icon: '🎯'
    }
  ];
  
  return (
    <section 
      ref={showcaseRef}
      id="aiden" 
      className="relative py-24 bg-primary-dark"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                <TextReveal>Meet <span className="text-accent-2">AIDEN</span></TextReveal>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <h3 className="text-2xl font-display text-accent-1 mb-6">
                <TextReveal delay={0.4}>Your Digital Muse</TextReveal>
              </h3>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <p className="text-xl text-text-gray mb-8">
                AIDEN is our proprietary AI tool that works alongside our human creatives to generate, refine, and optimize content at scale. It's not just another AI—it's a creative partner trained specifically for marketing and advertising content.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.6}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-2xl mr-4 text-accent-2">{feature.icon}</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{feature.title}</h4>
                      <p className="text-text-gray text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.8}>
              <MagneticElement strength={0.5}>
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-gradient-to-r from-accent-2 to-accent-3 text-white font-medium rounded-lg transition-transform duration-300 hover:scale-105 interactive inline-block"
                >
                  Try AIDEN
                </a>
              </MagneticElement>
            </ScrollReveal>
          </div>
          
          <ScrollReveal direction="right">
            <div className="relative aspect-square">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full rounded-xl"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AidenShowcase;
