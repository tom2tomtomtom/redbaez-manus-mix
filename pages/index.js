import { useEffect } from 'react';
import Head from 'next/head';
import CustomCursor from '../components/CustomCursor';
import WebGLBackground from '../components/WebGLBackground';
import PageTransition from '../components/PageTransition';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import AidenShowcase from '../components/AidenShowcase';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    // Register GSAP plugins and other initialization
    // This will run only on client-side
  }, []);

  return (
    <>
      <Head>
        <title>Red Baez | Human Creativity × AI Precision</title>
        <meta name="description" content="Red Baez is a human/AI hybrid creative company delivering cutting-edge content and advertising solutions." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <CustomCursor />
      <WebGLBackground />
      
      <PageTransition>
        <main className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Services />
          <AidenShowcase />
          <Portfolio />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </PageTransition>
    </>
  );
}
