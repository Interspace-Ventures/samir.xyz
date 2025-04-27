'use client';

/**
 * Portfolio Gallery Skeleton Component
 * 
 * This component displays a skeleton loading state for the portfolio gallery
 * that closely mirrors the actual content layout.
 */
export default function PortfolioGallerySkeleton() {
  return (
    <div className="mt-8">
      <div className="mb-6">
        {/* Category tabs skeleton - matches actual filter buttons */}
        <div className="flex justify-between sm:justify-start overflow-x-auto scrollbar-thin pb-2 mb-4 w-full">
          <div className="inline-flex space-x-2 px-0.5 w-full sm:w-auto">
            {/* All button placeholder */}
            <div className="h-10 w-20 bg-purple-primary/70 rounded px-6 py-2"></div>
            
            {/* Category buttons placeholders */}
            {['Tech', 'Finance', 'Health', 'Retail'].map((_, index) => (
              <div 
                key={`category-skeleton-${index}`}
                className="h-10 w-24 bg-[#2d0c6a] rounded border border-[#7f55dc]/30"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio grid skeleton - exactly matches the real grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {Array(12).fill(0).map((_, index) => (
          <div
            key={`portfolio-skeleton-${index}`}
            className="bg-white/5 border border-purple-900/20 overflow-hidden relative"
          >
            {/* White background for logo area - exactly like real cards */}
            <div className="h-20 sm:h-24 bg-white flex items-center justify-center overflow-hidden">
              {/* Logo placeholder - centered as in real items */}
              <div className="w-20 h-10 bg-gray-200/40 rounded animate-pulse"></div>
            </div>
            
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
}