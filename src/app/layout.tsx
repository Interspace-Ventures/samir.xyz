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
        {/* Ultra-aggressive WebView compatibility script */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Critical WebView compatibility - execute before anything else
          (function() {
            // Immediately force visibility of the page
            document.documentElement.style.visibility = 'visible';
            document.documentElement.style.opacity = '1';
            
            // Add critical styles for WebView environments
            var criticalStyles = document.createElement('style');
            criticalStyles.textContent = 
              'html, body { visibility: visible !important; opacity: 1 !important; display: block !important; }' +
              'html.hide-content * { visibility: hidden !important; }' +
              'html.hide-content body, html.hide-content head { visibility: visible !important; }' +
              '@media screen { html, body { visibility: visible !important; opacity: 1 !important; } }';
            
            // Insert as first child of head for highest priority
            if (document.head.firstChild) {
              document.head.insertBefore(criticalStyles, document.head.firstChild);
            } else {
              document.head.appendChild(criticalStyles);
            }
            
            // Remove any hide-content class after a small delay
            setTimeout(function() {
              document.documentElement.classList.remove('hide-content');
            }, 50);
          })();
        ` }} />
        
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=dark_mode,menu,light_mode" />
        
        {/* Enhanced theme and WebView compatibility script */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Enhanced theme and WebView compatibility (v2)
          (function() {
            try {
              // Apply theme class directly to html element
              if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
              
              // Additional WebView compatibility
              var isWebView = 
                (navigator.userAgent.includes('wv') || 
                navigator.userAgent.includes('WebView') ||
                window.navigator.standalone === true || 
                window.matchMedia('(display-mode: standalone)').matches);
              
              if (isWebView) {
                // Add WebView-specific class for targeting CSS
                document.documentElement.classList.add('webview');
                
                // Force page visibility in WebViews
                document.documentElement.style.visibility = 'visible';
                document.documentElement.style.opacity = '1';
                document.body.style.visibility = 'visible';
                document.body.style.opacity = '1';
                
                // Force repaint in WebView
                setTimeout(function() {
                  window.scrollTo(0, 1);
                  setTimeout(function() {
                    window.scrollTo(0, 0);
                  }, 10);
                }, 50);
              }
            } catch(e) {
              // If something fails, make sure content is still visible
              document.documentElement.style.visibility = 'visible';
              document.documentElement.style.opacity = '1';
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