import Link from 'next/link';
import ChangelogDrawer from './changelog-drawer';

const footerNav = [
  { href: '/profile', label: 'Profile' },
  { href: '/', label: 'Advisory' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/ventures', label: 'Ventures' },
  { href: 'https://posts.interspace.ventures', label: 'Interspace', external: true },
];

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/heysamir',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    name: 'X',
    href: 'https://x.com/heysamir_',
    path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/heyinterspace',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
  {
    name: 'Substack',
    href: 'https://posts.interspace.ventures',
    path: 'M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z',
  },
];

const linkClass =
  'text-text-secondary hover:text-white transition-colors text-sm';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-10 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-10 sm:gap-16">
          {/* Navigate */}
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-1.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={linkClass} prefetch={true}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* About + Connect stacked in the wider right column */}
          <div className="flex flex-col gap-8">
            <div className="text-text-secondary text-sm leading-relaxed">
              &copy; {currentYear} <ChangelogDrawer />. Interspace Ventures is an{' '}
              <a
                href="https://interspace.ventures"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#7f54dc] transition-colors"
              >
                Interspace Venture
              </a>
              . Built at the speed of thought with{' '}
              <a
                href="https://replit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#7f54dc] transition-colors"
              >
                Replit
              </a>
              .
            </div>

            {/* Connect / social row */}
            <div>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-[#7f54dc] border-2 border-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    aria-label={link.name}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d={link.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
