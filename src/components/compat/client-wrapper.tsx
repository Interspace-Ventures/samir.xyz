"use client";

import React, { useEffect, useState } from 'react';

interface ClientCompatWrapperProps {
  children: React.ReactNode;
}

/**
 * ClientCompatWrapper provides client-side compatibility features
 * with minimal complexity to avoid React Server Component issues
 */
export default function ClientCompatWrapper({ children }: ClientCompatWrapperProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Simple JS detection
    document.documentElement.classList.add('js-enabled');
  }, []);
  
  if (!mounted) {
    return <div id="client-wrapper-loading" aria-hidden="true" />;
  }
  
  return <>{children}</>;
}