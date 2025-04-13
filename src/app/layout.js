import './globals.css';

export const metadata = {
  title: 'Samir | Portfolio',
  description: 'Personal portfolio showcasing my projects and skills',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container header-content">
            <div className="logo">samir.xyz</div>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/portfolio">Portfolio</a>
              <a href="/profile">About</a>
              <a href="/ventures">Ventures</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Samir. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}