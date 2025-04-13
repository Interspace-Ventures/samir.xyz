"use client";

import React, { useEffect } from 'react';

interface PageTransitionProps {
  timeout?: number;
}

/**
 * PageTransition component handles smooth transitions between pages
 * by applying CSS classes at appropriate times
 */
export default function PageTransition({ timeout = 300 }: PageTransitionProps) {
  useEffect(() => {
    // Mark the document as loaded after a short timeout
    const timer = setTimeout(() => {
      document.documentElement.classList.add('page-loaded');
      document.documentElement.classList.remove('page-loading');
    }, timeout);

    // Always ensure the page has proper load classes
    document.documentElement.classList.add('page-loading');
    document.documentElement.classList.remove('page-loaded');

    // Clean up on unmount
    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('page-loading');
      document.documentElement.classList.add('page-loaded');
    };
  }, [timeout]);

  return null; // This component doesn't render anything
}