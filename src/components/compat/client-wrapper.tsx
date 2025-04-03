'use client';

import { useEffect, useState } from 'react';
import WebViewProvider from './webview-provider';
import dynamic from 'next/dynamic';

interface ClientWrapperProps {
  children: React.ReactNode;
}

/**
 * Client Wrapper Component
 * 
 * This component wraps content with necessary client-side providers
 * Uses next/dynamic with ssr: false to prevent hydration mismatches
 */
function ClientWrapperInner({ children }: ClientWrapperProps) {
  // Always render children on initial pass for SSR
  // Then let WebViewProvider handle client-side optimizations
  return (
    <WebViewProvider>
      {children}
    </WebViewProvider>
  );
}

// Use dynamic import with ssr: false to ensure clean client-side only rendering
// This avoids hydration mismatches between server and client rendering
export default dynamic(() => Promise.resolve(ClientWrapperInner), {
  ssr: false
});