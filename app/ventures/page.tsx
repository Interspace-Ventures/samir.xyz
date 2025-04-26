'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with no SSR to avoid any hydration issues
const VenturesGrid = dynamic(() => import('../components/ventures-grid'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center py-10">
      <div className="animate-pulse text-text-secondary">Loading ventures...</div>
    </div>
  ),
});

export default function VenturesPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="section">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">Ventures</h1>
          <VenturesGrid />
        </div>
      </section>
    </div>
  );
}