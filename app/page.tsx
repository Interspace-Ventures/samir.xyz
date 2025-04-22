'use client';

import ProfileSection from './components/profile-section';
import CompanySection from './components/company-section';
import InterspaceSection from './components/interspace-section';

export default function Home() {
  return (
    <div className="space-y-20 pt-24 pb-16">
      <section id="profile" className="section">
        <ProfileSection />
      </section>
      
      <section id="portfolio" className="section">
        <div className="container">
          <h2 className="section-title">Portfolio</h2>
          <CompanySection />
        </div>
      </section>
      
      <section id="ventures" className="section">
        <div className="container">
          <h2 className="section-title">Ventures</h2>
          <InterspaceSection />
        </div>
      </section>
    </div>
  );
}