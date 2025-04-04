import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MagneticElement = ({ children, className = '', strength = 0.5 }) => {
  const elementRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;
    
    // Element bounds
    let bounds;
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Calculate bounds on resize
    const calculateBounds = () => {
      bounds = element.getBoundingClientRect();
    };
    
    // Initialize
    calculateBounds();
    window.addEventListener('resize', calculateBounds);
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to viewport
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Check if mouse is near the element
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      
      // Distance from mouse to center of element
      const distanceX = mouseX - centerX;
      const distanceY = mouseY - centerY;
      
      // Calculate distance
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Maximum distance to apply effect (twice the element's width)
      const maxDistance = bounds.width;
      
      // Apply magnetic effect if mouse is within range
      if (distance < maxDistance) {
        // Calculate strength based on distance (closer = stronger)
        const magneticStrength = strength * (1 - distance / maxDistance);
        
        // Calculate movement amount
        const moveX = distanceX * magneticStrength;
        const moveY = distanceY * magneticStrength;
        
        // Animate element position
        gsap.to(element, {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        // Reset position if mouse is far away
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    };
    
    // Handle mouse leave
    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)'
      });
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', calculateBounds);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);
  
  return (
    <div ref={elementRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};

export default MagneticElement;
