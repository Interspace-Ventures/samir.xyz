'use client';

import CompanySection from '../components/company-section';

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="section">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">Portfolio</h1>
          <CompanySection />
        </div>
      </section>
    </div>
  );
}