import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TextReveal = ({ children, className = '', delay = 0, stagger = 0.03, color = 'accent-1' }) => {
  const textRef = useRef(null);
  
  useEffect(() => {
    const element = textRef.current;
    
    if (!element) return;
    
    // Split text into spans for animation
    const splitText = () => {
      const text = element.textContent;
      element.textContent = '';
      
      // Create wrapper for characters
      const wrapper = document.createElement('span');
      wrapper.style.display = 'inline-block';
      
      // Add each character in its own span
      [...text].forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.style.display = 'inline-block';
        charSpan.style.opacity = '0';
        charSpan.style.transform = 'translateY(20px)';
        wrapper.appendChild(charSpan);
      });
      
      element.appendChild(wrapper);
      return wrapper.children;
    };
    
    // Create animation
    const chars = splitText();
    
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: stagger,
      delay: delay,
      ease: 'power2.out',
      onComplete: () => {
        // Add gradient effect after reveal
        if (color) {
          element.classList.add(`text-${color}`);
          element.classList.add('gradient-text');
        }
      }
    });
    
    // Cleanup
    return () => {
      gsap.killTweensOf(chars);
    };
  }, [delay, stagger, color]);
  
  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
};

export default TextReveal;
