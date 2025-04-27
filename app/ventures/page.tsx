'use client';

import VenturesGrid from '../components/ventures-grid';

export default function VenturesPage() {
  return (
    <div className="pt-16 pb-16">
      <section className="section">
        <div className="container max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-left">Interspace Ventures</h1>
          <p className="text-lg text-text-tertiary mb-10 max-w-3xl">I create apps and concepts by coding at the speed of thought using Replit.</p>
          
          {/* Display as 2x4 grid */}
          <div className="mb-12">
            <VenturesGrid />
          </div>
        </div>
      </section>
    </div>
  );
}