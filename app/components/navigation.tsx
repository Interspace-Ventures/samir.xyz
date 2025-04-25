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
      <div className="container" style={{ padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link 
            href="/" 
            style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.025em' }}
          >
            <span style={{ color: '#ffffff' }}>Interspace</span>
            <span style={{ marginLeft: '0.25rem', color: '#c084fc' }}>Ventures</span>
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