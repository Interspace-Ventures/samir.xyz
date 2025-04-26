'use client';

import VenturesGrid from '../components/ventures-grid';

export default function VenturesPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="section">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">Interspace Ventures</h1>
          <p className="text-lg text-white/70 mb-12 text-center max-w-2xl mx-auto">I create apps and concepts by coding at the speed of thought using Replit.</p>
          
          {/* Always display as 3x3 grid */}
          <div>
            <VenturesGrid />
          </div>
        </div>
      </section>
    </div>
  );
}