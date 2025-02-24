import React, { useState, useEffect, useRef, type FC } from "react";
import { Card, CardContent } from "../components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { companies, categories, portfolioMetrics, type CompanyCategory } from "../types/company";
import { RevealOnScroll } from "../components/ui/RevealOnScroll";

// Sort categories alphabetically with "All" first, then "Fintech"
const displayCategories = ['All', 'Fintech', ...categories.filter(c => c !== 'Fintech').sort()] as const;

// Simple image path function - no cache busting or transforms
const getImagePath = (companyName: string): string => {
  return `/public/assets/images/logos/${companyName}.png`;
};

// Sort companies alphabetically by default
const sortedCompanies = [...companies].sort((a, b) => a.name.localeCompare(b.name));

export const Portfolio: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CompanyCategory | 'All'>('All');
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [displayCount, setDisplayCount] = useState(12);
  const [isMobile, setIsMobile] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === 'All'
    ? sortedCompanies
    : sortedCompanies.filter(company => company.category === selectedCategory);

  const displayedCompanies = filteredCompanies.slice(0, displayCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < filteredCompanies.length) {
          const increment = isMobile ? 8 : 12;
          setDisplayCount(prev => Math.min(prev + increment, filteredCompanies.length));
        }
      },
      { rootMargin: '50px 0px', threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [displayCount, filteredCompanies.length, isMobile]);

  useEffect(() => {
    setDisplayCount(isMobile ? 8 : 12);
  }, [selectedCategory, isMobile]);

  return (
    <div className="space-y-12">
      <RevealOnScroll>
        <section className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4 flex-1">
            <h1 className="text-5xl sm:text-6xl font-bold">Portfolio</h1>
            <p className="text-xl sm:text-2xl max-w-3xl">
              I have advised and invested in ambitious teams building innovative products who focus on
              unit economics optimized business models since 2019.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { label: '# Investments', value: portfolioMetrics.totalInvestments },
                    { label: '# Markups', value: portfolioMetrics.markups },
                    { label: '# Busts', value: portfolioMetrics.busts },
                    { label: 'TVPI', value: `${portfolioMetrics.tvpi}x` },
                    { label: 'Gross Multiple', value: `${portfolioMetrics.grossMultiple}x` },
                    { label: 'Net Multiple, Net of Carry', value: `${portfolioMetrics.netMultipleNetOfCarry}x` },
                    { label: 'Return, net of fees', value: `${portfolioMetrics.returnNetOfFees}%` },
                    { label: 'IRR', value: `${portfolioMetrics.irr}%` }
                  ].map((item, idx) => (
                    <tr key={item.label} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}>
                      <td className="px-3 py-1.5 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="flex flex-wrap gap-4">
          {displayCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-[#7343d0] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </section>
      </RevealOnScroll>

      <motion.section layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedCompanies.map((company) => {
            const hasLoadedImage = loadedImages.has(company.name);

            return (
              <motion.div
                key={company.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="h-32"
              >
                {(() => {
                  const cardContent = (
                    <Card className={`h-full ${company.tag !== 'Acquired' ? 'hover:shadow-lg' : ''} transition-all duration-200 !bg-white dark:!bg-white group`}>
                      <CardContent className="h-full p-4 flex items-center justify-center relative !bg-white dark:!bg-white">
                        {company.tag && (
                          <div className={`absolute top-0 right-0 text-white text-xs px-2 py-1 ${
                            company.tag === 'Markup' ? 'bg-[#7343d0]' :
                            company.tag === 'IPO' ? 'bg-blue-500' :
                            'bg-gray-500' // Acquired
                          }`}>
                            {company.tag}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center z-20">
                          <p className="text-white text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {company.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-center w-full h-full">
                          <img
                            src={getImagePath(company.name)}
                            alt={`${company.name} logo`}
                            className={`w-auto h-auto max-h-[100px] max-w-[280px] object-contain transition-opacity duration-500 ${
                              hasLoadedImage ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => setLoadedImages(prev => new Set([...prev, company.name]))}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );

                  return company.tag !== 'Acquired' ? (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-full block"
                    >
                      {cardContent}
                    </a>
                  ) : cardContent;
                })()}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.section>

      {displayCount < filteredCompanies.length && (
        <div ref={loadMoreRef} className="h-20" />
      )}
    </div>
  );
};

export default Portfolio;