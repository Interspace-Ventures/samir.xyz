import ChangelogDrawer from './changelog-drawer';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-white text-sm text-center">
          &copy; {currentYear} <ChangelogDrawer />. samir.xyz is an{' '}
          <a
            href="https://interspace.ventures"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-white transition-colors"
          >
            Interspace Venture
          </a>
          . Built at the speed of thought with{' '}
          <a
            href="https://replit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-white transition-colors"
          >
            Replit
          </a>
        </p>
      </div>
    </footer>
  );
}
