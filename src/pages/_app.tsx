import { useState, useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import NeuronLoader from '@/components/loading/NeuronLoader';
import { NavigationProvider } from '@/context/NavigationContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { LoadingProvider } from '@/context/LoadingContext';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add loading class to prevent FOUC (Flash of Unstyled Content)
    document.documentElement.classList.add('loading');
    
    // Disable default smooth scrolling to use our custom implementation
    document.documentElement.style.scrollBehavior = 'auto';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    document.documentElement.classList.remove('loading');
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </Head>
      
      <ThemeProvider>
        <LoadingProvider>
          <NavigationProvider>
            {isLoading ? (
              <NeuronLoader onLoadComplete={handleLoadComplete} />
            ) : (
              <Layout>
                <AnimatePresence 
                  mode="wait" 
                  initial={false}
                  onExitComplete={() => window.scrollTo(0, 0)}
                >
                  <Component {...pageProps} key={router.route} />
                </AnimatePresence>
              </Layout>
            )}
          </NavigationProvider>
        </LoadingProvider>
      </ThemeProvider>
    </>
  );
}
