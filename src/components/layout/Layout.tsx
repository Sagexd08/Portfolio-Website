import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamically import the brain background component
const BrainBackground = dynamic(() => import('@/components/3d/NeuralScene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background z-[-1]" />
});

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.000],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.645, 0.045, 0.355, 1.000],
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Brain thinking background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <BrainBackground />
      </div>

      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={router.route}
          className="flex-grow relative"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Layout;
