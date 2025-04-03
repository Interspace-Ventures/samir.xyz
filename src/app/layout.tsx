import { inter } from "../config/fonts";
import "./globals.css";
import { metadata, viewport } from "./metadata";
import ClientLayout from "../components/layout/client-layout";

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
        
        {/* Enhanced WebView compatibility - preload scripts */}
        <link rel="preload" href="/webview-compat.js" as="script" />
        
        {/* Simple, immediate script to apply theme and ensure WebView compatibility */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Simple theme script that works in any environment including WebViews
          (function() {
            // Apply dark theme immediately if system prefers it
            function applyTheme() {
              try {
                // Check if system prefers dark mode
                const prefersDark = window.matchMedia && 
                  window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                // Apply theme class directly to html element
                if (prefersDark) {
                  document.documentElement.classList.add('dark');
                }
                
                // Set flag to indicate this script ran
                window.__themeInitialized = true;

                console.log("Theme initialized, dark mode:", prefersDark);
              } catch(e) {
                // Fallback to default (no dark mode)
                console.error("Error initializing theme:", e);
              }
            }
            
            // Run immediately
            applyTheme();
            
            // Check if we're in a WebView for extra compatibility
            function isWebView() {
              try {
                const ua = navigator.userAgent || '';
                return /(WebView|wv)/.test(ua) || 
                      /Android.*(wv|.NET)/.test(ua) ||
                      /iPhone|iPad.*AppleWebKit(?!.*Safari)/.test(ua) ||
                      /FB_IAB|FBAN|FBAV|Line|Instagram|NAVER|KAKAOTALK|Electron|Capacitor|Cordova/.test(ua);
              } catch(e) {
                return false;
              }
            }
            
            // For WebViews, apply additional compatibility
            if (isWebView() || window.location.search.includes('webview=true')) {
              // Load compat script for problematic WebViews
              var compat = document.createElement('script');
              compat.src = '/webview-compat.js';
              compat.async = false;
              document.head.appendChild(compat);
            }
          })();
        ` }} />
      </head>
      <body 
        className="antialiased"
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}