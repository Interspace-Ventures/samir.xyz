import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const version = "1.0.0"; // Version number
  
  return (
    <motion.footer 
      className="bg-bg-primary py-6 border-t border-purple-primary/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-text-tertiary text-sm">
          <div>
            <p>
              © {currentYear} <a 
                href="https://interspace.ventures" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Interspace Ventures
              </a>
            </p>
          </div>
          
          <div>
            <p>Built with Replit AI at the speed of thought</p>
          </div>
          
          <div>
            <a 
              href="https://github.com/interspace-ventures/portfolio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-text-secondary transition-colors"
            >
              Version {version}
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;