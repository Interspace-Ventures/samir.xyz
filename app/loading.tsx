'use client';

/**
 * Application Loading Component
 * 
 * Shows a clean, minimalist loading state without text
 * Uses a subtle animated gradient for a modern loading experience
 */
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-20 h-20 relative">
        {/* Animated gradient pulse instead of a spinner */}
        <div className="absolute inset-0 bg-purple-500/20 rounded-lg animate-pulse"></div>
        <div className="absolute inset-2 bg-purple-600/30 rounded-lg animate-pulse" style={{animationDelay: '150ms'}}></div>
        <div className="absolute inset-4 bg-purple-700/40 rounded-lg animate-pulse" style={{animationDelay: '300ms'}}></div>
        <div className="absolute inset-6 bg-purple-800/50 rounded-lg animate-pulse" style={{animationDelay: '450ms'}}></div>
      </div>
    </div>
  );
}