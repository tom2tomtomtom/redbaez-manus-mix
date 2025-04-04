import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollReveal from './ScrollReveal';
import GlassmorphismCard from './GlassmorphismCard';
import TextReveal from './TextReveal';

const About = () => {
  const aboutRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);
  
  const features = [
    {
      title: 'Human Creativity',
      description: 'Our team of creative professionals brings decades of experience in content creation, design, and marketing strategy.',
      icon: '👤',
      color: 'accent-1'
    },
    {
      title: 'AI Precision',
      description: 'We leverage cutting-edge AI tools to enhance, optimize, and scale creative content with unprecedented efficiency.',
      icon: '🤖',
      color: 'accent-2'
    },
    {
      title: 'Hybrid Approach',
      description: 'By combining human creativity with AI capabilities, we deliver results that neither could achieve alone.',
      icon: '🔄',
      color: 'accent-3'
    }
  ];
  
  return (
    <section 
      ref={aboutRef}
      id="about" 
      className="relative py-24 bg-primary-dark"
    >
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-4">
            <TextReveal>About Red Baez</TextReveal>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-xl text-text-gray text-center max-w-3xl mx-auto mb-16">
            Red Baez is a human/AI hybrid creative company that combines the best of both worlds to create content that stands out in today's crowded digital landscape.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={0.3 + index * 0.2} direction={index === 0 ? 'left' : index === 2 ? 'right' : 'bottom'}>
              <GlassmorphismCard glowColor={feature.color} className="p-8 h-full">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-bold mb-4 text-${feature.color}`}>{feature.title}</h3>
                <p className="text-text-gray">{feature.description}</p>
              </GlassmorphismCard>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={0.8}>
          <div className="mt-16 text-center">
            <p className="text-xl text-white max-w-3xl mx-auto">
              Our mission is to empower businesses with content that combines the emotional intelligence and creativity of humans with the efficiency and scalability of AI.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
