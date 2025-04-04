import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ParallaxEffect from './ParallaxEffect';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';
import MagneticElement from './MagneticElement';

const Hero = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      const tl = gsap.timeline();
      
      // Animate hero section elements
      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.5 }
      );
    }
  }, []);
  
  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div id="background-animation" className="absolute inset-0 -z-10" />
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal delay={0.5}>
            <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
              <span className="block">
                <TextReveal delay={0.8} color="accent-1">HUMAN CREATIVITY</TextReveal>
              </span>
              <span className="block">
                <TextReveal delay={1.2} color="accent-2">×</TextReveal>
              </span>
              <span className="block">
                <TextReveal delay={1.6} color="accent-3">AI PRECISION</TextReveal>
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={1.8} direction="bottom" distance={30}>
            <p ref={subheadingRef} className="text-xl md:text-2xl text-text-gray mb-12">
              We combine human creativity with AI-powered tools to deliver cutting-edge content and advertising solutions.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={2.2} direction="bottom" distance={40}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <MagneticElement strength={0.5}>
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-gradient-to-r from-accent-1 to-accent-2 text-white font-medium rounded-lg transition-transform duration-300 hover:scale-105 interactive"
                >
                  Get Started
                </a>
              </MagneticElement>
              
              <MagneticElement strength={0.3}>
                <a 
                  href="#about" 
                  className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105 interactive"
                >
                  Learn More
                </a>
              </MagneticElement>
            </div>
          </ScrollReveal>
        </div>
        
        <ParallaxEffect speed={0.2} className="absolute -bottom-20 left-0 w-full pointer-events-none">
          <div className="w-full h-40 bg-gradient-to-t from-primary-dark to-transparent opacity-80" />
        </ParallaxEffect>
      </div>
    </section>
  );
};

export default Hero;
