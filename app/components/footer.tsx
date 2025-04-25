import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const version = "1.0.0"; // Version number
  
  return (
    <footer className="bg-purple-dark py-6 border-t border-purple-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <div>
            <p>
              © {currentYear} <a 
                href="https://interspace.ventures" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-light hover:text-white transition-colors"
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
              className="hover:text-purple-light transition-colors"
            >
              Version {version}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}