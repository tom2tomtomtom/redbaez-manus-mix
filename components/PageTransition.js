import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';

const PageTransition = ({ children }) => {
  const router = useRouter();
  const pageRef = useRef(null);
  const overlayRef = useRef(null);
  
  useEffect(() => {
    const page = pageRef.current;
    const overlay = overlayRef.current;
    
    if (!page || !overlay) return;
    
    // Initial page load animation
    const tl = gsap.timeline();
    
    tl.fromTo(
      overlay,
      { 
        y: 0,
      },
      {
        y: '-100%',
        duration: 1,
        ease: 'power3.inOut',
      }
    );
    
    tl.fromTo(
      page,
      { 
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.5'
    );
    
    // Handle route changes
    const handleRouteChangeStart = () => {
      gsap.to(page, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: 'power2.in',
      });
      
      gsap.fromTo(
        overlay,
        { 
          y: '-100%',
        },
        {
          y: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        }
      );
    };
    
    const handleRouteChangeComplete = () => {
      gsap.to(overlay, {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.1,
      });
      
      gsap.fromTo(
        page,
        { 
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5,
        }
      );
    };
    
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);
  
  return (
    <div className="relative">
      <div 
        ref={overlayRef} 
        className="fixed inset-0 bg-gradient-to-r from-accent-1 to-accent-2 z-50 transform -translate-y-full"
      />
      <div ref={pageRef} className="opacity-0">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
