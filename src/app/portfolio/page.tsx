// Version 12.0.1 - Enhanced Portfolio Page with purple accents and dark theme
import StatsSection from '../../components/stats-section';
import PortfolioCards from '../../components/portfolio-cards';

export default function Portfolio() {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Portfolio
        </h1>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
        </p>
      </div>
      
      {/* Stats Section */}
      <div className="mb-16">
        <StatsSection />
      </div>
      
      {/* Portfolio Cards */}
      <div className="mb-12">
        <PortfolioCards />
      </div>
      
      <div className="text-center mt-16">
        <a href="/profile" className="btn-primary">
          Back to Profile
        </a>
      </div>
    </div>
  );
}