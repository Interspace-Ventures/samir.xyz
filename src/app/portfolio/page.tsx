import styles from './styles.module.css';
import StatsDisplayServer from './StatsDisplayServer';
import PortfolioMain from './portfolio-main';

export default function PortfolioPage() {
  return (
    <div className={styles.portfolioContainer}>
      {/* Header section with black text */}
      <div className="mb-8 text-left">
        <h1 className="text-4xl font-bold mb-4 text-black">Portfolio</h1>
        <p className="text-lg max-w-3xl text-gray-700 mb-6">
          I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
        </p>
      </div>
      
      {/* Stats Section - Using server component for fast loading */}
      <StatsDisplayServer />
      
      {/* Interactive elements in client component */}
      <PortfolioMain />
    </div>
  );
}
