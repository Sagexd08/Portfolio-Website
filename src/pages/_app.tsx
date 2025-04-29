import { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-dark text-white">
          <div className="text-2xl font-bold">Loading your AI experience...</div>
        </div>
      ) : (
        <Layout>
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      )}
    </>
  );
}

export default MyApp;