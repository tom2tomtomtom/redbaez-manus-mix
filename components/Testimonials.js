import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollReveal from './ScrollReveal';
import GlassmorphismCard from './GlassmorphismCard';
import TextReveal from './TextReveal';
import MagneticElement from './MagneticElement';

const Testimonials = () => {
  const testimonialsRef = useRef(null);
  const sliderRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Initialize testimonial slider
      const slider = sliderRef.current;
      const testimonials = slider?.querySelectorAll('.testimonial-card');
      
      if (slider && testimonials && testimonials.length > 0) {
        let currentIndex = 0;
        
        // Function to show testimonial at index
        const showTestimonial = (index) => {
          // Hide all testimonials
          testimonials.forEach((testimonial, i) => {
            gsap.to(testimonial, {
              opacity: i === index ? 1 : 0,
              x: i === index ? 0 : i < index ? -100 : 100,
              duration: 0.5,
              ease: 'power2.out'
            });
          });
        };
        
        // Initialize first testimonial
        showTestimonial(0);
        
        // Set up auto-rotation
        const interval = setInterval(() => {
          currentIndex = (currentIndex + 1) % testimonials.length;
          showTestimonial(currentIndex);
        }, 5000);
        
        // Cleanup
        return () => {
          clearInterval(interval);
        };
      }
    }
  }, []);
  
  const testimonialsList = [
    {
      quote: "Red Baez transformed our content strategy. The combination of human creativity and AI efficiency has doubled our engagement while cutting production time in half.",
      author: "Sarah Johnson",
      position: "Marketing Director, TechVision",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      color: "accent-1"
    },
    {
      quote: "The team at Red Baez understands how to leverage AI without losing the human touch. Our ad campaigns now consistently outperform industry benchmarks.",
      author: "Michael Chen",
      position: "CMO, Elevate Brands",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      color: "accent-2"
    },
    {
      quote: "Working with Red Baez has been a game-changer for our social media presence. Their hybrid approach delivers content that feels authentic but scales incredibly well.",
      author: "Priya Patel",
      position: "Social Media Manager, Horizon",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      color: "accent-3"
    }
  ];
  
  return (
    <section 
      ref={testimonialsRef}
      id="testimonials" 
      className="relative py-24 bg-primary-dark"
    >
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-4">
            <TextReveal>Client Success Stories</TextReveal>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-xl text-text-gray text-center max-w-3xl mx-auto mb-16">
            Hear from our clients about how our human/AI hybrid approach has transformed their content and marketing strategies.
          </p>
        </ScrollReveal>
        
        <div ref={sliderRef} className="relative max-w-4xl mx-auto h-96">
          {testimonialsList.map((testimonial, index) => (
            <div 
              key={index}
              className={`testimonial-card absolute inset-0 opacity-0 transition-all duration-500 ease-out ${index === 0 ? 'opacity-100' : ''}`}
            >
              <GlassmorphismCard glowColor={testimonial.color} className="p-8 h-full flex flex-col">
                <div className="flex-1">
                  <div className="text-4xl text-white mb-6">"</div>
                  <p className="text-lg text-white mb-8">{testimonial.quote}</p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className={`font-bold text-${testimonial.color}`}>{testimonial.author}</h4>
                    <p className="text-text-gray text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </GlassmorphismCard>
            </div>
          ))}
        </div>
        
        <ScrollReveal delay={0.6}>
          <div className="mt-16 text-center">
            <MagneticElement strength={0.5}>
              <a 
                href="#contact" 
                className="px-8 py-4 bg-gradient-to-r from-accent-1 to-accent-2 text-white font-medium rounded-lg transition-transform duration-300 hover:scale-105 interactive"
              >
                Become Our Next Success Story
              </a>
            </MagneticElement>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
