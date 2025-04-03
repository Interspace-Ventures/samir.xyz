'use client';

import { useEffect, useState } from 'react';
import WebViewProvider from './webview-provider';

interface ClientWrapperProps {
  children: React.ReactNode;
}

/**
 * Client Wrapper Component
 * 
 * This component wraps content with necessary client-side providers
 * Used to add client-side functionality to server components
 */
export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Don't render anything on the server
  if (!isMounted) {
    return null;
  }
  
  // On the client, wrap content with WebView provider
  return (
    <WebViewProvider>
      {children}
    </WebViewProvider>
  );
}