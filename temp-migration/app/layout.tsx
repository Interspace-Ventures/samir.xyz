import "./globals.css";
import { metadata, viewport } from "./metadata";

// Export metadata for Next.js
export { metadata, viewport };

// Simplified layout without client component wrappers
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/attached_assets/favicon.png" type="image/png" />
        
        {/* Basic styles for layout */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          
          header {
            background-color: #5239cc;
            color: white;
            padding: 1rem 0;
            height: 60px;
            display: flex;
            align-items: center;
          }
          
          nav {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            padding: 0 1rem;
          }
          
          .logo {
            font-size: 1.5rem;
            font-weight: bold;
          }
          
          .nav-links {
            display: flex;
            gap: 1.5rem;
          }
          
          .nav-links a {
            color: white;
            text-decoration: none;
          }
          
          footer {
            background-color: #5239cc;
            color: white;
            padding: 2rem 0;
            margin-top: 2rem;
          }
          
          .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          
          main {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }
        `}} />
      </head>
      <body>
        <header>
          <nav>
            <div className="logo">samir.xyz</div>
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/portfolio">Portfolio</a>
              <a href="/profile">About</a>
              <a href="/ventures">Ventures</a>
            </div>
          </nav>
        </header>
        
        <main>
          {children}
        </main>
        
        <footer>
          <div className="footer-content">
            <p>© {new Date().getFullYear()} Samir. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}