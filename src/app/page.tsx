import Image from 'next/image';
import ClientWrapper from '../components/client-wrapper';
import PortfolioCards from '../components/portfolio-cards';
import StatsSection from '../components/stats-section';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Portfolio Website
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mb-10">
              Showcasing professional projects through an AI-enhanced interactive design
              that dynamically highlights technical expertise and achievements.
            </p>
          </div>
        </div>
      </section>
      
      {/* Portfolio Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <ClientWrapper>
            <PortfolioCards />
          </ClientWrapper>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Portfolio Stats</h2>
          <StatsSection />
        </div>
      </section>
    </div>
  );
}