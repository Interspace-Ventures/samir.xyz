/**
 * Portfolio Page Loading Component
 * 
 * Shows skeleton loading specific to the portfolio page layout
 */
export default function PortfolioLoading() {
  return (
    <div className="pt-16 pb-16">
      <section className="section">
        <div className="container max-w-6xl">
          {/* Title skeleton */}
          <div className="h-12 bg-[#2a313a] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-48 mb-6 animate-pulse"></div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-8">
            <div className="h-4 bg-purple-200 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] w-3/4 animate-pulse"></div>
            <div className="h-4 bg-purple-200 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] w-1/2 animate-pulse"></div>
          </div>
          
          {/* Metrics skeleton */}
          <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="neo-card bg-purple-600 p-4 animate-pulse">
                <div className="h-8 bg-purple-300 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-2"></div>
                <div className="h-4 bg-purple-300 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] w-2/3"></div>
              </div>
            ))}
          </div>
          
          {/* Portfolio grid skeleton */}
          <div className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="neo-card overflow-hidden relative animate-pulse">
                  <div className="h-20 sm:h-24 flex items-center justify-center p-3 sm:p-4 bg-white">
                    <div className="w-[140px] h-[70px] bg-gray-200 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-w-full max-h-full"></div>
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