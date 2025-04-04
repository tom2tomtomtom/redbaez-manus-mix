import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const ScrollReveal = ({ children, className = '', delay = 0, direction = 'bottom', distance = 50 }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      const element = ref.current;
      
      if (!element) return;
      
      // Set initial position based on direction
      let initialProps = {};
      
      switch (direction) {
        case 'left':
          initialProps = { x: -distance, opacity: 0 };
          break;
        case 'right':
          initialProps = { x: distance, opacity: 0 };
          break;
        case 'top':
          initialProps = { y: -distance, opacity: 0 };
          break;
        case 'bottom':
        default:
          initialProps = { y: distance, opacity: 0 };
          break;
      }
      
      // Create reveal animation
      gsap.fromTo(
        element,
        initialProps,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        }
      );
    }
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [delay, direction, distance]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
