'use client';

import CompanySection from '../components/company-section';

export default function PortfolioPage() {
  return (
    <div className="pt-16 pb-16">
      <section className="section">
        <div className="container max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Portfolio</h1>
          
          {/* Investment Philosophy */}
          <p className="text-lg text-text-tertiary mb-8 max-w-3xl">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
          
          <CompanySection />
        </div>
      </section>
    </div>
  );
}