'use client';

import Navigation from './components/navigation';
import ProfileSection from './components/profile-section';
import PortfolioSection from './components/portfolio-section';
import CompanySection from './components/company-section';
import InterspaceSection from './components/interspace-section';
import Footer from './components/footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <ProfileSection />
      <PortfolioSection />
      <CompanySection />
      <InterspaceSection />
      <Footer />
    </>
  );
}