import ChangelogDrawer from './changelog-drawer';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black py-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-white text-sm text-center">
          <div className="w-full text-center">
            <p className="text-center">
              samir.xyz is an <a 
                href="https://interspace.ventures" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white transition-colors"
              >
                Interspace Venture
              </a>. Copyright {currentYear}. Built at the speed of thought with <a 
                href="https://replit.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white transition-colors"
              >
                Replit
              </a>
            </p>
          </div>

          <div className="w-full text-center">
            <ChangelogDrawer />
          </div>
        </div>
      </div>
    </footer>
  );
}