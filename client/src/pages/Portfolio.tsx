import React, { useState, useEffect } from "react";
import { type FC } from "react";
import { Card, CardContent } from "../components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { companies, categories, type CompanyCategory } from "../types/company";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { Skeleton } from "../components/ui/skeleton";

export const Portfolio: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CompanyCategory | 'All'>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (companyName: string) => {
    setLoadedImages(prev => new Set([...prev, companyName]));
  };

  const handleImageError = (companyName: string) => {
    const imgElement = document.querySelector(`img[alt="${companyName}"]`) as HTMLImageElement;
    if (imgElement) {
      imgElement.style.display = 'none';
      const textElement = imgElement.parentElement?.querySelector('.company-name');
      if (textElement) {
        textElement.classList.remove('hidden');
      }
    }
  };

  const LoadingSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={`skeleton-${i}`}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Card className="w-full h-32 dark:bg-gray-800 bg-white">
            <CardContent className="p-6 flex items-center justify-center">
              <Skeleton className="h-16 w-3/4" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </>
  );

  return (
    <div className="space-y-12">
      <RevealOnScroll>
        <section className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold">
            Portfolio
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl">
            I advise and invest in ambitious teams building innovative products who focus on 
            unit economics optimized business models.
          </p>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'All'
                ? 'bg-[#7343d0] text-white'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {categories.map(category => (
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

      <motion.section 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            filteredCompanies.map((company) => (
              <motion.div
                key={company.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <a href={company.url} target="_blank" rel="noopener noreferrer">
                  <Card className="h-32 dark:bg-gray-800 bg-white hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6 flex items-center justify-center">
                      <img 
                        src={`/logos/${company.name.toLowerCase().replace(/\s+/g, '')}.svg`}
                        alt={company.name}
                        className={`max-h-16 w-auto dark:invert ${
                          loadedImages.has(company.name) ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-200`}
                        onLoad={() => handleImageLoad(company.name)}
                        onError={() => handleImageError(company.name)}
                        loading="lazy"
                      />
                      <span className={`company-name text-lg font-semibold ${
                        loadedImages.has(company.name) ? 'hidden' : ''
                      }`}>
                        {company.name}
                      </span>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
};

export default Portfolio;