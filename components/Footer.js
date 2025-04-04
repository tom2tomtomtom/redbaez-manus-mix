import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';
import MagneticElement from './MagneticElement';

const Footer = () => {
  const footerRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);
  
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Services',
      links: [
        { name: 'Content Creation', url: '#services' },
        { name: 'Ad Creative', url: '#services' },
        { name: 'Social Media', url: '#services' },
        { name: 'SEO Optimization', url: '#services' },
        { name: 'Video Production', url: '#services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '#about' },
        { name: 'Portfolio', url: '#portfolio' },
        { name: 'Testimonials', url: '#testimonials' },
        { name: 'Careers', url: '#' },
        { name: 'Contact', url: '#contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', url: '#' },
        { name: 'Case Studies', url: '#' },
        { name: 'AI Tools', url: '#aiden' },
        { name: 'Privacy Policy', url: '#' },
        { name: 'Terms of Service', url: '#' }
      ]
    }
  ];
  
  return (
    <footer 
      ref={footerRef}
      className="relative py-16 bg-primary-dark border-t border-white/10"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <a href="#" className="text-3xl font-display font-bold text-white inline-block mb-4">
                <TextReveal>RED BAEZ</TextReveal>
              </a>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-text-gray mb-6 max-w-md">
                Red Baez is a human/AI hybrid creative company that combines the best of both worlds to create content that stands out in today's crowded digital landscape.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'Instagram', 'Behance'].map((platform, index) => (
                  <MagneticElement key={index} strength={0.3}>
                    <a 
                      href="#" 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-gradient-to-r hover:from-accent-1 hover:to-accent-2 transition-all duration-300 interactive"
                    >
                      {platform.charAt(0)}
                    </a>
                  </MagneticElement>
                ))}
              </div>
            </ScrollReveal>
          </div>
          
          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex}>
              <ScrollReveal delay={0.3 + columnIndex * 0.1}>
                <h3 className="text-white font-bold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.url} 
                        className="text-text-gray hover:text-accent-1 transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          ))}
        </div>
        
        <ScrollReveal delay={0.6}>
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-gray text-sm mb-4 md:mb-0">
              © {currentYear} Red Baez. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-text-gray hover:text-accent-1 text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-text-gray hover:text-accent-1 text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-text-gray hover:text-accent-1 text-sm transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
