import { NextPage } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SEO } from '@/components/layout/SEO';

const ServerError: NextPage = () => {
  return (
    <>
      <SEO
        title="500 - Server Error | Sohom Chatterjee"
        description="Something went wrong on our server."
      />
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-6">500</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Server Error</h2>
          <p className="text-light/70 max-w-md mx-auto mb-8">
            Something went wrong on our server. We're working to fix the issue. Please try again later.
          </p>
          
          <Link href="/">
            <motion.span
              className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return Home
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default ServerError;
