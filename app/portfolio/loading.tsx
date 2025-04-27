'use client';

export default function Loading() {
  return (
    <div className="pt-16 pb-16">
      <section className="section">
        <div className="container max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Portfolio</h1>
          
          {/* Investment Philosophy */}
          <p className="text-lg text-text-tertiary mb-8 max-w-3xl">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
          
          {/* Metrics Skeleton */}
          <div className="w-full mb-10 overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
              {/* Generate 8 skeleton metric cards */}
              {Array(8).fill(0).map((_, index) => (
                <div
                  key={`metric-skeleton-${index}`}
                  className="relative bg-white/5 p-4 rounded-lg border border-purple-900/30 animate-pulse"
                >
                  <div className="h-3 w-16 bg-purple-300/20 rounded mb-2"></div>
                  <div className="h-7 w-20 bg-purple-300/30 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Portfolio Gallery Skeleton */}
          <div className="mt-8">
            {/* Category tabs skeleton */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Array(5).fill(0).map((_, index) => (
                <div 
                  key={`category-skeleton-${index}`}
                  className="h-8 w-24 bg-white/5 rounded-full animate-pulse"
                ></div>
              ))}
            </div>
            
            {/* Portfolio grid skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(12).fill(0).map((_, index) => (
                <div
                  key={`portfolio-skeleton-${index}`}
                  className="bg-white/5 border border-purple-900/30 rounded-lg overflow-hidden animate-pulse"
                >
                  {/* Company logo placeholder */}
                  <div className="aspect-video p-6 flex items-center justify-center">
                    <div className="w-20 h-12 rounded-md bg-white/10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}