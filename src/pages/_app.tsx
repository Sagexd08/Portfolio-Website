import { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import NeuronLoader from '@/components/loading/NeuronLoader';
import { NavigationProvider } from '@/context/NavigationContext';
import '@/styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [loading, setLoading] = useState(true);

  // Handle completion of loading animation
  const handleLoadComplete = () => {
    setLoading(false);
  };

  // Use smooth scrolling
  useEffect(() => {
    // Disable default smooth scrolling to use our custom implementation
    document.documentElement.style.scrollBehavior = 'auto';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <>
      {loading ? (
        <NeuronLoader onLoadComplete={handleLoadComplete} />
      ) : (
        <NavigationProvider>
          <Layout>
            <AnimatePresence mode="wait">
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </Layout>
        </NavigationProvider>
      )}
    </>
  );
}

export default MyApp;