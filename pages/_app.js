import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Add cursor-none class to body for custom cursor
    document.body.classList.add('cursor-none');
    
    return () => {
      document.body.classList.remove('cursor-none');
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
