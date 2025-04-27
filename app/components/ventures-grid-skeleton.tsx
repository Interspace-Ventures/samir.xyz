'use client';

/**
 * Ventures Grid Skeleton Component
 * 
 * This component displays a skeleton loading state for the ventures grid
 * that precisely mirrors the actual ventures grid layout.
 */
export default function VenturesGridSkeleton() {
  // Use the same fixed layout as the real ventures grid
  return (
    <div className="w-full mx-auto mb-6" style={{ minHeight: '480px' }}>
      {/* Ensure exact match to grid layout used in both minimal and detailed views */}
      <div className="grid grid-cols-4 gap-6 max-sm:grid-cols-2">
        {/* Generate 8 skeleton venture cards exactly matching the final layout */}
        {Array(8).fill(0).map((_, index) => (
          <div
            key={`venture-skeleton-${index}`}
            className="relative aspect-square"
          >
            {/* Match the dark background with slight transparency */}
            <div className="absolute inset-0 bg-black/20 border border-purple-900/20 overflow-hidden">
              {/* Center empty placeholder instead of mini logos */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Empty div - no logo placeholders to prevent mini-logo look */}
              </div>
              
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}