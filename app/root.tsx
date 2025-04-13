import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
// Import the stylesheet directly
// We'll link to it using the links export

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/styles/global.css" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Samir's Portfolio" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
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
          <Outlet />
        </main>
        
        <footer>
          <div className="footer-content">
            <p>© {new Date().getFullYear()} Samir. All rights reserved.</p>
          </div>
        </footer>
        
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}