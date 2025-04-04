import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollReveal from './ScrollReveal';
import GlassmorphismCard from './GlassmorphismCard';
import TextReveal from './TextReveal';
import HorizontalScrollGallery from './HorizontalScrollGallery';

const Portfolio = () => {
  const portfolioRef = useRef(null);
  const filterRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Initialize filter buttons
      const filterButtons = filterRef.current?.querySelectorAll('button');
      
      if (filterButtons) {
        filterButtons.forEach(button => {
          button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
              btn.classList.remove('bg-gradient-to-r', 'from-accent-1', 'to-accent-2', 'text-white');
              btn.classList.add('bg-transparent', 'text-text-gray');
            });
            
            // Add active class to clicked button
            button.classList.remove('bg-transparent', 'text-text-gray');
            button.classList.add('bg-gradient-to-r', 'from-accent-1', 'to-accent-2', 'text-white');
          });
        });
      }
    }
  }, []);
  
  // Portfolio gallery images
  const portfolioImages = [
    {
      src: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
      alt: 'Social media campaign for tech startup',
      category: 'social'
    },
    {
      src: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f',
      alt: 'Website redesign for luxury brand',
      category: 'web'
    },
    {
      src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d',
      alt: 'AI-generated product photography',
      category: 'ai'
    },
    {
      src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
      alt: 'Video marketing campaign',
      category: 'video'
    },
    {
      src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
      alt: 'Brand identity design',
      category: 'branding'
    },
    {
      src: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
      alt: 'Social media content strategy',
      category: 'social'
    },
    {
      src: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356',
      alt: 'AI-powered content generation',
      category: 'ai'
    },
    {
      src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
      alt: 'Corporate website development',
      category: 'web'
    }
  ];
  
  return (
    <section 
      ref={portfolioRef}
      id="portfolio" 
      className="relative py-24 bg-secondary-dark"
    >
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-4">
            <TextReveal>Our Portfolio</TextReveal>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-xl text-text-gray text-center max-w-3xl mx-auto mb-12">
            Explore our latest projects showcasing the power of human creativity enhanced by AI precision.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <div ref={filterRef} className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Social Media', 'Web Design', 'AI Content', 'Video', 'Branding'].map((filter, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-accent-1 to-accent-2 text-white' 
                    : 'bg-transparent text-text-gray border border-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.4}>
          <HorizontalScrollGallery images={portfolioImages} className="mb-16" />
        </ScrollReveal>
        
        <ScrollReveal delay={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Projects Completed', value: '150+' },
              { title: 'Client Satisfaction', value: '98%' },
              { title: 'Industry Verticals', value: '12' }
            ].map((stat, index) => (
              <GlassmorphismCard key={index} className="p-8 text-center">
                <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-text-gray">{stat.title}</p>
              </GlassmorphismCard>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Portfolio;
