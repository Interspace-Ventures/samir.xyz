/**
 * Ventures Page Loading Component
 * 
 * Shows skeleton loading specific to the ventures page layout
 */
export default function VenturesLoading() {
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
          
          {/* Ventures grid skeleton */}
          <div className="grid grid-cols-4 gap-6 max-sm:grid-cols-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="relative aspect-square neo-card bg-purple-400 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}