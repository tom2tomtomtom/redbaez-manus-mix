import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HorizontalScrollGallery = ({ images = [], className = '' }) => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    
    if (!container || !scrollContainer || images.length === 0) return;
    
    // Set up horizontal scroll
    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = container.offsetWidth;
    
    // Calculate total scrollable distance
    const scrollDistance = scrollWidth - containerWidth;
    
    // Handle scroll
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollProgress = scrollLeft / scrollDistance;
      
      // Apply parallax effect to images
      const imageElements = scrollContainer.querySelectorAll('.gallery-image');
      
      imageElements.forEach((img, index) => {
        const speed = 1 - (index % 3) * 0.2; // Vary speed based on position
        const xPos = -scrollProgress * 100 * speed;
        img.style.transform = `translateX(${xPos}px)`;
      });
    };
    
    // Add scroll event listener
    container.addEventListener('scroll', handleScroll);
    
    // Initialize scroll position
    handleScroll();
    
    // Cleanup
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [images]);
  
  return (
    <div 
      ref={containerRef}
      className={`overflow-x-auto overflow-y-hidden whitespace-nowrap hide-scrollbar ${className}`}
    >
      <div 
        ref={scrollContainerRef}
        className="inline-flex items-center h-full"
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative inline-block mx-4 gallery-image"
            style={{ 
              height: '300px', 
              width: '400px',
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img 
              src={image.src} 
              alt={image.alt || `Gallery image ${index + 1}`}
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollGallery;
