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
  // Define custom data attributes for WebView compatibility
  // These will be present from server-side rendering
  // Use typed attributes to avoid TypeScript errors
  const webViewAttributes = {
    'data-webview-compatible': 'true',
    // Use empty attribute to avoid hydration mismatch (will be set by client JS)
    'data-webview-ready': '', 
  };

  return (
    <html 
      lang="en" 
      className={`${inter.className} webview-compatible`}
      suppressHydrationWarning 
      {...webViewAttributes}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=dark_mode,menu,light_mode" />
        <script src="/webview-compat.js"></script>
        {/* Inline script for immediate WebView compatibility without waiting for external scripts */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Immediately set WebView compatibility flag
            window.__NEXT_WEBVIEW_COMPATIBILITY__ = true;
            // Apply immediate visibility to body as soon as this script runs
            document.documentElement.setAttribute('data-webview-ready', 'true');
          `
        }} />
      </head>
      <body 
        className="antialiased webview-compatible" 
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}