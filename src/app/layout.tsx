import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";

// Version 10.1.0 - Enhanced layout with compatibility fixes for Replit Webview

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Samir's Portfolio",
  description: "Personal portfolio website showcasing fintech expertise and ventures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Special compatibility script for Replit Webview */}
        <Script src="/webview-compat.js" strategy="beforeInteractive" />
        {/* Force reload if there are issues with React initialization */}
        <Script id="compatibility-fix" strategy="afterInteractive">
          {`
            // Check if we need to refresh due to incomplete React initialization
            if (typeof window !== 'undefined') {
              console.log('Checking for React compatibility');
              
              // Detect if React is properly initialized
              if (!window.React && !window.__NEXT_HYDRATED && location.search.indexOf('retry=true') === -1) {
                console.log('React not properly initialized, will reload in 2 seconds...');
                
                // Set a timeout to reload the page with a retry parameter
                setTimeout(() => {
                  const separator = location.search ? '&' : '?';
                  window.location.href = location.href + separator + 'retry=true';
                }, 2000);
              } else {
                console.log('React initialized properly');
              }
            }
          `}
        </Script>
      </head>
      <body style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        lineHeight: "1.5",
        color: "#333",
        backgroundColor: "#f5f7fa",
        margin: 0,
        padding: 0
      }} suppressHydrationWarning>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "2rem 1rem"
        }}>
          {children}
        </div>
      </body>
    </html>
  );
}