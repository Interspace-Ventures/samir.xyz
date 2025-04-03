import { inter } from "../config/fonts";
import "./globals.css";
import { metadata, viewport } from "./metadata";
import ClientLayout from "../components/layout/client-layout";
import ClientCompatWrapper from "../components/compat/client-wrapper";

/**
 * Root layout that supports both server-side metadata and client interactivity
 * 
 * This component stays as a server component to support next/metadata exports
 * but delegates interactive rendering to the ClientLayout component
 */
export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={inter.className}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=dark_mode,menu,light_mode" />
        
        {/* Minimal theme detection script - using a cleaner approach */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Simple initial theme detection to avoid flash of wrong theme
          (function() {
            try {
              if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {
              // Silent fallback for older browsers
            }
          })();
        ` }} />
      </head>
      <body 
        className="antialiased"
      >
        {/* WebView compatibility provider - cleanly handles WebView-specific optimizations */}
        <ClientCompatWrapper>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ClientCompatWrapper>
      </body>
    </html>
  );
}