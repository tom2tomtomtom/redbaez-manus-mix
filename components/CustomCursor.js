import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    // Set initial position off-screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    
    // Create variables for mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Create variables for previous mouse position
    let prevMouseX = 0;
    let prevMouseY = 0;
    
    // Smoothing factor (lower = smoother)
    const smoothFactor = 0.15;
    
    // Update mouse position on mouse move
    const updateMousePosition = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    // Animate cursor position
    const animateCursor = () => {
      // Calculate smooth movement
      prevMouseX += (mouseX - prevMouseX) * smoothFactor;
      prevMouseY += (mouseY - prevMouseY) * smoothFactor;
      
      // Apply position to cursor elements
      gsap.set(cursor, { x: prevMouseX, y: prevMouseY });
      gsap.set(cursorDot, { x: mouseX, y: mouseY });
      
      // Request next frame
      requestAnimationFrame(animateCursor);
    };
    
    // Start animation
    window.addEventListener('mousemove', updateMousePosition);
    animateCursor();
    
    // Handle cursor interactions with elements
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, opacity: 0.7, duration: 0.3 });
      gsap.to(cursorDot, { scale: 0.5, opacity: 0.5, duration: 0.3 });
    };
    
    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(cursorDot, { scale: 1, opacity: 1, duration: 0.3 });
    };
    
    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    // Handle cursor visibility
    const handleMouseOut = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
      gsap.to(cursorDot, { opacity: 0, duration: 0.3 });
    };
    
    const handleMouseOver = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
      gsap.to(cursorDot, { opacity: 1, duration: 0.3 });
    };
    
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseover', handleMouseOver);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseover', handleMouseOver);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-accent-1 pointer-events-none z-50 mix-blend-difference"
        style={{ opacity: 0 }}
      />
      <div 
        ref={cursorDotRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-accent-2 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ opacity: 0 }}
      />
    </>
  );
};

export default CustomCursor;
