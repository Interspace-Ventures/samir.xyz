'use client';

/**
 * Metrics Skeleton Component
 * 
 * This component displays a skeleton loading state for metrics
 * that precisely mirrors the actual metrics cards layout.
 */
export default function MetricsSkeleton() {
  // Metric card types that will display in the actual UI
  const metricTypes = [
    { label: "# Investments", value: "23" },
    { label: "# Markups", value: "8" },
    { label: "# Acquisitions", value: "3" },
    { label: "# Busts", value: "4" },
    { label: "TVPI", value: "1.4x" },
    { label: "Gross Multiple", value: "1.2x" },
    { label: "Net Multiple", value: "1.1x" },
    { label: "IRR", value: "10%" }
  ];

  return (
    <div className="mb-8 max-w-7xl mx-auto">
      {/* Exact grid layout matching the real metrics component */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
        {metricTypes.map((metric, index) => (
          <div 
            key={`metric-skeleton-${index}`}
            className="relative bg-purple-primary/30 p-4 rounded sm:rounded-lg border border-purple-900/30 overflow-hidden"
          >
            {/* Label skeleton - matches the real label position/size */}
            <div className="h-3 w-24 bg-white/20 rounded mb-2"></div>
            
            {/* Value skeleton - matches the real value position/size */}
            <div className="h-7 w-16 bg-white/30 rounded"></div>
            
            {/* Shimmer effect that runs horizontally across card */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
}