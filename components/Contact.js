import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollReveal from './ScrollReveal';
import GlassmorphismCard from './GlassmorphismCard';
import TextReveal from './TextReveal';
import MagneticElement from './MagneticElement';

const Contact = () => {
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    service: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setFormStatus('submitting');
    
    setTimeout(() => {
      setFormStatus('success');
      setFormState({
        name: '',
        email: '',
        message: '',
        service: ''
      });
    }, 1500);
  };
  
  const services = [
    'Content Creation',
    'Ad Creative',
    'Social Media Management',
    'SEO Optimization',
    'Video Production',
    'Brand Strategy',
    'Custom Project'
  ];
  
  return (
    <section 
      ref={contactRef}
      id="contact" 
      className="relative py-24 bg-secondary-dark"
    >
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-4">
            <TextReveal>Get in Touch</TextReveal>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-xl text-text-gray text-center max-w-3xl mx-auto mb-16">
            Ready to transform your content strategy with the power of human creativity and AI precision? Let's talk.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal delay={0.3} direction="left">
            <GlassmorphismCard className="p-8 h-full">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-1"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-1"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-white mb-2">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-1"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-1"
                  ></textarea>
                </div>
                
                <div>
                  <MagneticElement strength={0.3}>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full px-8 py-4 bg-gradient-to-r from-accent-1 to-accent-2 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 interactive"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                  </MagneticElement>
                </div>
                
                {formStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center">
                    Your message has been sent successfully! We'll get back to you soon.
                  </div>
                )}
              </form>
            </GlassmorphismCard>
          </ScrollReveal>
          
          <ScrollReveal delay={0.5} direction="right">
            <div className="space-y-8">
              <GlassmorphismCard className="p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-2xl text-accent-1 mr-4">📍</div>
                    <div>
                      <h4 className="text-white font-bold">Location</h4>
                      <p className="text-text-gray">123 Innovation Way, Creative District, CA 94103</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-2xl text-accent-2 mr-4">📧</div>
                    <div>
                      <h4 className="text-white font-bold">Email</h4>
                      <p className="text-text-gray">hello@redbaez.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-2xl text-accent-3 mr-4">📱</div>
                    <div>
                      <h4 className="text-white font-bold">Phone</h4>
                      <p className="text-text-gray">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </GlassmorphismCard>
              
              <GlassmorphismCard className="p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-6">Follow Us</h3>
                
                <div className="flex space-x-4">
                  {['Twitter', 'LinkedIn', 'Instagram', 'Behance'].map((platform, index) => (
                    <MagneticElement key={index} strength={0.5}>
                      <a 
                        href="#" 
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-gradient-to-r hover:from-accent-1 hover:to-accent-2 transition-all duration-300 interactive"
                      >
                        {platform.charAt(0)}
                      </a>
                    </MagneticElement>
                  ))}
                </div>
              </GlassmorphismCard>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
