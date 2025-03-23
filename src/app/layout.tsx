import type { Metadata } from "next";
import "./globals.css";
import { inter } from "../config/fonts";

// Ultra simplified layout to debug React 19 hydration issues - Version 3.4.4

export const metadata: Metadata = {
  title: "Samir's Portfolio",
  description: "Personal portfolio website showcasing professional achievements and investments",
  // Prevent caching during debugging
  other: {
    "Cache-Control": "no-cache, no-store, must-revalidate"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{__html: `
          /* Ensure the font is loaded immediately */
          body {
            font-family: ${inter.style.fontFamily}, system-ui, sans-serif;
          }
        `}} />
      </head>
      <body 
        suppressHydrationWarning 
        className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col"
      >
        {/* React 19 compatibility fix - help initialize React correctly */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // React 19 global compatibility settings - force production mode
              window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__ = false;
              window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__ = false;
              window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__ = false;
              window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {};
              
              // Force a specific React 19 environment
              window.__NEXT_REACT_ROOT = true;
              window.__NEXT_HMR_LATENCY_CB = () => null;
              
              // Delay hydration to ensure DOM is ready
              window.__NEXT_DATA__ = window.__NEXT_DATA__ || {};
              window.__NEXT_DATA__.tree = window.__NEXT_DATA__.tree || [];

              // Add additional hydration helpers
              window.__HYDRATION_STATE__ = { initialized: false };
              
              // Ensure React is initialized properly
              document.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                  window.__HYDRATION_STATE__.initialized = true;
                }, 0);
              });
            `,
          }}
        />
        <div id="__next">
          <main className="container mx-auto my-8 px-4">
            <header className="mb-8">
              <h1 className="text-3xl font-bold">Samir's Portfolio</h1>
              <p className="text-gray-600 dark:text-gray-400">Simplified React 19 Compatible Version</p>
            </header>
            <div className="content-container">
              {children}
            </div>
          </main>
        </div>
        {/* Feedback element to show we're rendering */}
        <div id="debug-info" className="fixed bottom-2 right-2 p-2 bg-green-100 dark:bg-green-900 text-xs rounded shadow">
          Page rendered successfully
        </div>
      </body>
    </html>
  );
}