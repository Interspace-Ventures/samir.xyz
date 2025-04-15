"use client";

import React from 'react';

interface LoadingFallbackProps {
  message?: string;
}

/**
 * LoadingFallback component shows a simple loading spinner
 * with an optional message
 */
export default function LoadingFallback({ message = "Loading..." }: LoadingFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      {message && (
        <p className="text-gray-600 text-sm font-medium">{message}</p>
      )}
    </div>
  );
}