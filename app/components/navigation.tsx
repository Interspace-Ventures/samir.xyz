'use client';

import Link from 'next/link';
import Image from 'next/image';
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
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor,
        backdropFilter: backdropBlur
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-6xl px-0">
        <div className="flex items-center justify-between py-3">
          <Link href="/">
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
          
          <nav>
            <ul style={{ display: 'flex', gap: '2rem' }}>
              <li>
                <Link 
                  href="/" 
                  style={{ 
                    color: '#ffffff', 
                    fontWeight: 500, 
                    fontSize: '0.875rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#c084fc'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  href="/portfolio" 
                  style={{ 
                    color: '#ffffff', 
                    fontWeight: 500, 
                    fontSize: '0.875rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#c084fc'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link 
                  href="/ventures" 
                  style={{ 
                    color: '#ffffff', 
                    fontWeight: 500, 
                    fontSize: '0.875rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#c084fc'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}
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