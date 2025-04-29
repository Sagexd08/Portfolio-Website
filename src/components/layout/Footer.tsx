import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Sagexd08' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sohom-chatterjee-61828a312/' },
  ];

  return (
    <footer className="bg-dark-900 py-12">
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="text-2xl font-bold gradient-text">
              Sohom Chatterjee
            </Link>
            <p className="mt-4 text-light/60 max-w-md">
              Building intelligent systems that solve real-world problems through machine learning and artificial intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-light/60 hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-light/60 hover:text-primary-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-light/60 hover:text-primary-400 transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-light/60 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light/60 hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-light/10 text-center text-light/40">
          <p>© {currentYear} Sohom Chatterjee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;