'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(140, 92, 246, 0.6)', 'rgba(140, 92, 246, 0.95)']
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(8px)']
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 w-full z-50"
      style={{ 
        backgroundColor,
        backdropFilter: backdropBlur
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xl font-bold tracking-tight"
          >
            <span className="text-text-primary">Interspace</span>
            <span className="ml-1 text-text-secondary">Ventures</span>
          </Link>
          
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link 
                  href="#profile" 
                  className="text-text-primary hover:text-text-secondary transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  href="#portfolio" 
                  className="text-text-primary hover:text-text-secondary transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link 
                  href="#ventures" 
                  className="text-text-primary hover:text-text-secondary transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Ventures
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;