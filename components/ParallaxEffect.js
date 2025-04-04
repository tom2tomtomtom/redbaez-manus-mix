import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const ParallaxEffect = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      const element = ref.current;
      
      if (!element) return;
      
      // Create parallax effect
      gsap.fromTo(
        element,
        {
          y: 0,
        },
        {
          y: () => element.offsetHeight * speed * -1,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ParallaxEffect;
