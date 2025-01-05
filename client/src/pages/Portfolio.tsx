import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { companies, type CompanyCategory } from "@/types/company";
import { Skeleton } from "@/components/ui/skeleton";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<CompanyCategory | 'All'>('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories: Array<CompanyCategory | 'All'> = ['All', 'Health', 'Consumer', 'SaaS', 'Fintech'];

  const filteredCompanies = companies
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(company => selectedCategory === 'All' || company.category === selectedCategory);

  // Simulate loading on category change
  const handleCategoryChange = (category: CompanyCategory | 'All') => {
    setIsLoading(true);
    setSelectedCategory(category);
    // Simulate network delay
    setTimeout(() => setIsLoading(false), 500);
  };

  // Simulate initial load
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <motion.div 
      className="container mx-auto py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold tracking-tight mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Portfolio
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mb-12 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        I advise and invest in ambitious teams building innovative products who focus on unit economics optimized business models.
      </motion.p>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${selectedCategory === category 
                ? 'bg-[#482a83] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Company Grid with Loading State */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
        layout
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Skeleton Loading Grid
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-gray-100 rounded-lg p-6">
                    <Skeleton className="w-full h-full rounded-lg" />
                  </div>
                </motion.div>
              ))}
            </>
          ) : (
            // Actual Company Grid
            filteredCompanies.map((company) => (
              <motion.div
                key={company.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <a 
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="block p-6 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="aspect-video flex items-center justify-center p-4">
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`}
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                </a>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;