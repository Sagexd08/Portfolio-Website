import { NextPage } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SEO } from '@/components/layout/SEO';

const NotFound: NextPage = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Sohom Chatterjee"
        description="The page you are looking for does not exist."
      />
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-light/70 max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
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

export default NotFound;
