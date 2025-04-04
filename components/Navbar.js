import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import MagneticElement from './MagneticElement';
import TextReveal from './TextReveal';

const Navbar = () => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      const navbar = navbarRef.current;
      
      if (!navbar) return;
      
      // Create scroll animation for navbar
      gsap.fromTo(
        navbar,
        {
          backgroundColor: 'rgba(10, 10, 10, 0)',
          backdropFilter: 'blur(0px)',
        },
        {
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(10px)',
          duration: 0.3,
          scrollTrigger: {
            trigger: document.body,
            start: '100px top',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);
  
  return (
    <nav 
      ref={navbarRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <MagneticElement strength={0.3}>
          <a href="#" ref={logoRef} className="text-2xl font-display font-bold text-white">
            <TextReveal>RED BAEZ</TextReveal>
          </a>
        </MagneticElement>
        
        <div className="hidden md:flex space-x-8">
          {['About', 'Services', 'AIDEN', 'Portfolio', 'Contact'].map((item, index) => (
            <MagneticElement key={item} strength={0.2}>
              <a 
                href={`#${item.toLowerCase()}`} 
                className="text-white hover:text-accent-1 transition-colors duration-300 interactive"
              >
                {item}
              </a>
            </MagneticElement>
          ))}
        </div>
        
        <MagneticElement strength={0.5} className="md:hidden">
          <button className="text-white interactive">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </MagneticElement>
      </div>
    </nav>
  );
};

export default Navbar;
