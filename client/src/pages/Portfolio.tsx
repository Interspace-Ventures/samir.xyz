import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { companies, type CompanyCategory } from "@/types/company";
import { Skeleton } from "@/components/ui/skeleton";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<CompanyCategory | 'All'>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [imageStates, setImageStates] = useState<Record<string, boolean>>({});

  const categories: Array<CompanyCategory | 'All'> = ['All', 'Health', 'Consumer', 'SaaS', 'Fintech'];

  const filteredCompanies = companies
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(company => selectedCategory === 'All' || company.category === selectedCategory);

  // Simulate loading on category change
  const handleCategoryChange = (category: CompanyCategory | 'All') => {
    setIsLoading(true);
    setSelectedCategory(category);
    // Reset image states when changing categories
    setImageStates({});
    // Simulate network delay
    setTimeout(() => setIsLoading(false), 500);
  };

  // Handle image load success
  const handleImageLoad = (companyName: string) => {
    setImageStates(prev => ({
      ...prev,
      [companyName]: true
    }));
  };

  // Handle image load error
  const handleImageError = (companyName: string) => {
    setImageStates(prev => ({
      ...prev,
      [companyName]: false
    }));
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
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${selectedCategory === category 
                ? 'bg-[#482a83] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
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
                <motion.a 
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="block p-4 bg-white border border-gray-200 rounded-lg transition-all duration-300"
                  whileHover={{ 
                    y: -4,
                    boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="aspect-video flex items-center justify-center p-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {imageStates[company.name] === false ? (
                      // Error state - show company name instead of error icon
                      <motion.div 
                        className="flex flex-col items-center justify-center text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-xl font-semibold text-center">{company.name}</span>
                        <span className="text-sm text-gray-400 mt-2">{company.category}</span>
                      </motion.div>
                    ) : (
                      // Image with loading state
                      <motion.img 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        className="w-full h-auto max-h-[120px] object-contain"
                        loading="lazy"
                        onLoad={() => handleImageLoad(company.name)}
                        onError={() => handleImageError(company.name)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: imageStates[company.name] ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </motion.a>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;