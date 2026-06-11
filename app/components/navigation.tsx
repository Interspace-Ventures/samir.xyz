'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X, ExternalLink, User, Handshake, Briefcase, Rocket, Newspaper } from 'lucide-react';

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
    { href: '/', label: 'Profile', icon: User },
    { href: '/advisory', label: 'Advisory', icon: Handshake },
    { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
    { href: '/ventures', label: 'Ventures', icon: Rocket },
    { href: 'https://posts.interspace.ventures', label: 'Interspace', external: true, icon: Newspaper }
  ];

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 pt-4"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#2a313a] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between py-3 px-4 sm:px-6">
            <Link href="/" onClick={closeMobileMenu} className="shrink-0 mr-4">
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
            
            {/* Desktop Navigation - Always visible except on small screens */}
            <nav className="hidden md:block">
              <ul className="flex items-center">
                {menuItems.map((item, index) => (
                  <li key={item.href} className={index === 0 ? 'pl-0 pr-3' : index === menuItems.length - 1 ? 'pl-3 pr-0' : 'px-3'}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-white font-bold text-[clamp(0.7rem,1.6vw,0.875rem)] uppercase tracking-wider transition-colors duration-200 hover:text-[#7f54dc]"
                      >
                        {item.label}
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link 
                        href={item.href}
                        className="text-white font-bold text-[clamp(0.7rem,1.6vw,0.875rem)] uppercase tracking-wider transition-colors duration-200 hover:text-[#7f54dc]"
                        prefetch={true}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Mobile menu button - Only visible on small screens */}
            <button 
              className="md:hidden text-white p-2 border-2 border-black bg-[#7f54dc] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
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
            className="fixed inset-0 bg-[#2a313a] sl-solid border-4 border-black z-40 flex flex-col pt-14"
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
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-white text-2xl font-bold uppercase tracking-wide hover:text-[#7f54dc] transition-colors duration-200"
                        onClick={closeMobileMenu}
                      >
                        <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
                        {item.label}
                        <ExternalLink className="w-5 h-5" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link 
                        href={item.href} 
                        className="inline-flex items-center gap-3 text-white text-2xl font-bold uppercase tracking-wide hover:text-[#7f54dc] transition-colors duration-200"
                        onClick={closeMobileMenu}
                        prefetch={true}
                      >
                        <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
                        {item.label}
                      </Link>
                    )}
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