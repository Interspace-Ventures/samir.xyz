'use client';

import { useEffect } from 'react';

/**
 * WebView Direct Access Page
 * 
 * This page is a minimal, ultra-lightweight entry point specifically for WebViews
 * that have issues with server-side redirects. It uses window.location for direct
 * navigation to avoid any potential issues with router-based navigation.
 */
export default function WebViewDirectPage() {
  useEffect(() => {
    // Log the access
    console.log('WebView direct access page loaded - redirecting to profile');
    
    // Use a small timeout to ensure the page has initialized
    setTimeout(() => {
      // Use direct window.location navigation for maximum compatibility
      window.location.href = '/profile/';
    }, 50);
  }, []);
  
  // Simple loading display
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          border: '3px solid #e5e7eb',
          borderTopColor: '#9333ea',
          animation: 'spin 1s linear infinite',
        }} />
      </div>
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ color: '#4b5563' }}>Accessing profile...</p>
    </div>
  );
}