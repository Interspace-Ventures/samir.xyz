'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Effect to prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { href: '/', label: 'Profile' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/ventures', label: 'Ventures' }
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 w-full z-50 bg-[#2a313a] border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)]"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
      >
        <div className="container max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <Link href="/" onClick={closeMobileMenu}>
              <div className="flex items-center space-x-2">
                <Image 
                  src="/favicon.png"
                  alt="S logo"
                  width={24}
                  height={24}
                  className="rounded"
                  priority
                />
                <span className="text-white font-bold text-xl tracking-tight">samir.xyz</span>
              </div>
            </Link>
            
            {/* Desktop Navigation - Always visible except on very small screens */}
            <nav className="hidden sm:block">
              <ul className="flex items-center">
                {menuItems.map((item) => (
                  <li key={item.href} className="px-2 lg:px-4">
                    <Link 
                      href={item.href}
                      className="text-white font-bold text-xs sm:text-sm lg:text-sm uppercase tracking-wider transition-colors duration-200 hover:bg-white hover:text-[#2a313a] px-3 py-2 border-2 border-black bg-[#7f54dc] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
                      prefetch={true}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Mobile menu button - Only visible on very small screens */}
            <button 
              className="sm:hidden text-white p-2 border-2 border-black bg-[#7f54dc] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-[#2a313a] border-4 border-black z-40 flex flex-col pt-14"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center justify-center flex-grow">
              <ul className="flex flex-col gap-8 text-center">
                {menuItems.map((item) => (
                  <motion.li 
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link 
                      href={item.href} 
                      className="text-white text-2xl font-bold uppercase tracking-wide border-2 border-black bg-[#7f54dc] px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-[#7f54dc]"
                      onClick={closeMobileMenu}
                      prefetch={true}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;