import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GlassmorphismCard = ({ children, className = '', glowColor = 'accent-1', intensity = 0.5 }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    
    if (!card || !glow) return;
    
    // Handle mouse movement for glow effect
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate position relative to card
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      // Update glow position
      gsap.to(glow, {
        background: `radial-gradient(circle at ${xPercent * 100}% ${yPercent * 100}%, rgba(var(--${glowColor}-rgb), ${intensity}), transparent 50%)`,
        duration: 0.3
      });
    };
    
    // Handle mouse enter
    const handleMouseEnter = () => {
      gsap.to(glow, {
        opacity: 1,
        duration: 0.3
      });
    };
    
    // Handle mouse leave
    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.3
      });
    };
    
    // Add event listeners
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [glowColor, intensity]);
  
  return (
    <div 
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl backdrop-blur-md bg-opacity-10 bg-white border border-white/10 ${className}`}
      style={{ isolation: 'isolate' }}
    >
      <div 
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none z-0"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassmorphismCard;
