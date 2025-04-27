'use client';

export default function Loading() {
  return (
    <div className="pt-16 pb-16">
      <section className="section">
        <div className="container max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ventures</h1>
          
          <div className="w-full mx-auto mb-12">
            {/* Always use 4 columns on desktop, 2 on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Generate 8 skeleton venture cards */}
              {Array(8).fill(0).map((_, index) => (
                <div
                  key={`venture-skeleton-${index}`}
                  className="aspect-square bg-white/5 rounded-md border border-purple-900/30 relative overflow-hidden animate-pulse"
                >
                  {/* Center logo placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10"></div>
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-transparent"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}