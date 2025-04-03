/**
 * Special layout for direct WebView access
 * 
 * This is a minimal, lightweight layout specifically for WebView direct access
 * that avoids any unnecessary elements that might cause rendering issues in WebViews
 */
export default function WebViewDirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="webview">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Basic styles for consistent rendering */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            opacity: 1 !important;
            visibility: visible !important;
            background: #fff;
          }
          
          /* Hardware acceleration for smoother rendering */
          body {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-overflow-scrolling: touch;
          }
          
          /* Loading animation */
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}} />
      </head>
      <body>
        {children}
        
        {/* Fail-safe script to force visibility */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.body.style.opacity = '1';
          document.body.style.visibility = 'visible';
        `}} />
      </body>
    </html>
  );
}