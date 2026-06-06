import Link from 'next/link';
import { CURRENT_VERSION } from '../lib/changelog';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const version = CURRENT_VERSION;
  
  return (
    <footer className="bg-purple-primary py-6 border-t border-purple-primary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-white text-sm text-center">
          <div className="w-full text-center">
            <p className="text-center">
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
          
          <div className="w-full text-center">
            <p className="text-center">
              <Link
                href="/changelog"
                className="text-text-secondary hover:text-white transition-colors"
              >
                v{version}
              </Link> | Built with <a 
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