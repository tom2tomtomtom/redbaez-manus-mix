import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollReveal from './ScrollReveal';
import GlassmorphismCard from './GlassmorphismCard';
import TextReveal from './TextReveal';
import MagneticElement from './MagneticElement';

const Services = () => {
  const servicesRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);
  
  const servicesList = [
    {
      title: 'Content Creation',
      description: 'High-quality, engaging content for blogs, social media, and websites that combines human creativity with AI efficiency.',
      icon: '✍️',
      color: 'accent-1'
    },
    {
      title: 'Ad Creative',
      description: 'Scroll-stopping ad creative that leverages AI-generated visuals enhanced by human design expertise.',
      icon: '🎨',
      color: 'accent-2'
    },
    {
      title: 'Social Media Management',
      description: 'Comprehensive social media strategy and execution powered by AI analytics and human engagement.',
      icon: '📱',
      color: 'accent-3'
    },
    {
      title: 'SEO Optimization',
      description: 'Data-driven SEO strategies that combine AI keyword analysis with human-crafted content that actually converts.',
      icon: '📊',
      color: 'accent-1'
    },
    {
      title: 'Video Production',
      description: 'Compelling video content that uses AI for efficiency while maintaining the human touch that connects with audiences.',
      icon: '🎬',
      color: 'accent-2'
    },
    {
      title: 'Brand Strategy',
      description: 'Holistic brand development that uses AI insights to inform human-led creative direction and storytelling.',
      icon: '💡',
      color: 'accent-3'
    }
  ];
  
  return (
    <section 
      ref={servicesRef}
      id="services" 
      className="relative py-24 bg-secondary-dark"
    >
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-4">
            <TextReveal>Our Services</TextReveal>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-xl text-text-gray text-center max-w-3xl mx-auto mb-16">
            We offer a comprehensive suite of creative services that leverage our unique human/AI hybrid approach.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <ScrollReveal key={index} delay={0.3 + index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
              <GlassmorphismCard glowColor={service.color} className="p-8 h-full">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className={`text-xl font-bold mb-4 text-${service.color}`}>{service.title}</h3>
                <p className="text-text-gray">{service.description}</p>
              </GlassmorphismCard>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={0.8}>
          <div className="mt-16 text-center">
            <MagneticElement strength={0.5}>
              <a 
                href="#contact" 
                className="px-8 py-4 bg-gradient-to-r from-accent-1 to-accent-2 text-white font-medium rounded-lg transition-transform duration-300 hover:scale-105 interactive"
              >
                Get a Custom Quote
              </a>
            </MagneticElement>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;
