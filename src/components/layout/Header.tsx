import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useNavigation } from '@/context/NavigationContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 50;
  const { navigateTo } = useNavigation();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-section py-0">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            Sohom Chatterjee
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-light/80 hover:text-primary-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = link.href.replace('#', '');
                  navigateTo(targetId, `#nav-${link.name.toLowerCase()}`);
                }}
                id={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-light p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              className="md:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex flex-col space-y-4 p-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-light/80 hover:text-primary-400 transition-colors py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      const targetId = link.href.replace('#', '');
                      navigateTo(targetId, `#mobile-nav-${link.name.toLowerCase()}`);
                    }}
                    id={`mobile-nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;