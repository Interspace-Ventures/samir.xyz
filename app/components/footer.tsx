import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const version = "v8.5.0"; // Version number
  
  return (
    <footer className="bg-purple-primary py-6 border-t border-purple-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-white text-sm">
          <div>
            <p>
              Copyright {currentYear} <a 
                href="https://interspace.ventures" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white transition-colors"
              >
                Interspace Ventures
              </a>
            </p>
          </div>
          
          <div>
            <p>
              Version {version} | Built with <a 
                href="https://replit.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white transition-colors"
              >
                Replit
              </a> at the speed of thought
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}