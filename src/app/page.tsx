import Image from 'next/image';
import ClientWrapper from '../components/client-wrapper';
import PortfolioCards from '../components/portfolio-cards';
import StatsSection from '../components/stats-section';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Hero Section */}
      <section className="py-8 md:py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex-1 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                <div className="w-full h-full bg-purple-100 rounded-lg"></div>
              </div>
              <div className="space-y-2 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  Hey - I'm Samir.
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
                  I drive business impact at fintechs.
                </h2>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed">
              I advise and invest in ambitious teams with complementary skills that build innovative solutions to global problems, leveraging unit economics optimized business models. I believe in creating lasting value through sustainable business practices and responsible innovation.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/portfolio" 
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Portfolio
              </Link>
              <Link 
                href="/ventures" 
                className="px-4 py-2 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                Ventures
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Investment Track Record</h2>
        <StatsSection />
      </section>
      
      {/* Portfolio Section */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Investments</h2>
          <Link 
            href="/portfolio" 
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            View all →
          </Link>
        </div>
        <ClientWrapper>
          <PortfolioCards />
        </ClientWrapper>
      </section>
    </div>
  );
}