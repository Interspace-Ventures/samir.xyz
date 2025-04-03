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
        <link rel="preload" href="/webview-detector.js" as="script" />
        
        {/* Inline WebView detection to load compatibility scripts immediately */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Immediate WebView detection and script loading
          (function() {
            function detectWebView() {
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
            
            // If URL parameter indicates WebView or we detect it
            if (window.location.search.includes('webview=true') || detectWebView()) {
              // Check if we should redirect to fallback
              if (window.location.pathname !== '/webview-fallback.html') {
                // Load compatibility scripts immediately with high priority
                var compat = document.createElement('script');
                compat.src = '/webview-compat.js';
                compat.async = false;
                document.head.appendChild(compat);
                
                var detector = document.createElement('script');
                detector.src = '/webview-detector.js';
                detector.async = false;
                document.head.appendChild(detector);
              }
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