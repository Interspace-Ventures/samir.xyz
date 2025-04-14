import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import Navbar from "./layout/navbar";

// Import the Tailwind CSS file directly
import styles from "./styles/tailwind.css";

// Use the links function to link CSS
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "/favicon.ico" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio App" },
    { name: "description", content: "A developer productivity portfolio website" },
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
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <footer className="mt-auto py-4 bg-gray-100">
            <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
              Portfolio App &copy; {new Date().getFullYear()}
            </div>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// Error boundary for catching and displaying errors
export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Error!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="error-container p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Application Error</h1>
          <p className="mb-4">Sorry, an unexpected error has occurred.</p>
          <a href="/" className="text-blue-500 hover:underline">
            Return to homepage
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}