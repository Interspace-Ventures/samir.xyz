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
          <div className="h-12 bg-gray-700 rounded w-48 mb-6 animate-pulse"></div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-8">
            <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
          </div>
          
          {/* Ventures grid skeleton */}
          <div className="grid grid-cols-4 gap-6 max-sm:grid-cols-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="relative aspect-square bg-gray-800 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}