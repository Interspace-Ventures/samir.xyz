'use client';

import Image from 'next/image';
import VenturesGrid from '../components/ventures-grid';

export default function VenturesPage() {
  return (
    <div className="pt-16 pb-16">
      <section className="section">
        <div className="container max-w-6xl px-0">
          <div className="flex mb-6">
            <h1 className="text-4xl font-bold text-white">Interspace Ventures</h1>
          </div>
          <p className="text-lg text-text-tertiary mb-10 max-w-3xl">I create apps and concepts by coding at the speed of thought using Replit.</p>
          
          {/* Display as 2x4 grid */}
          <div className="mb-12 w-full">
            <VenturesGrid />
          </div>
        </div>
      </section>
    </div>
  );
}