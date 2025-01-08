import React, { useState, useEffect, useRef, type FC } from "react";
import { Card, CardContent } from "../components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { companies, categories, type CompanyCategory } from "../types/company";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { Skeleton } from "../components/ui/skeleton";

// Sort categories alphabetically with "All" first, then "Fintech"
const displayCategories = ['All', 'Fintech', ...categories.filter(c => c !== 'Fintech').sort()] as const;

// Add picture source set helper
const getImagePaths = (companyName: string): { webp: string; png: string } => {
  const baseName = companyName.toLowerCase().replace(/\s+/g, '-');
  return {
    webp: `/assets/images/logos/${baseName}.webp`,
    png: `/assets/images/logos/${baseName}.png`
  };
};

// Sort companies alphabetically
const sortedCompanies = [...companies].sort((a, b) => a.name.localeCompare(b.name));

export const Portfolio: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CompanyCategory | 'All'>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [displayCount, setDisplayCount] = useState(12);
  const [isMobile, setIsMobile] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Map<string, HTMLImageElement>>(new Map());

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and sort companies based on selected category
  const filteredCompanies = selectedCategory === 'All'
    ? sortedCompanies
    : sortedCompanies.filter(company => company.category === selectedCategory);

  const displayedCompanies = filteredCompanies.slice(0, displayCount);

  // Image loading observer with improved mobile performance
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const companyName = img.dataset.company;
            if (companyName && !loadedImages.has(companyName) && !failedImages.has(companyName)) {
              // Image src is now handled within the picture element
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: isMobile ? '1000px 0px' : '500px 0px',
        threshold: 0.1
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadedImages, failedImages, isMobile]);

  // Load more observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < filteredCompanies.length) {
          const increment = isMobile ? 8 : 12;
          setDisplayCount(prev => Math.min(prev + increment, filteredCompanies.length));
        }
      },
      {
        rootMargin: isMobile ? '800px 0px' : '500px 0px',
        threshold: 0.1
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [displayCount, filteredCompanies.length, isMobile]);

  // Initial loading state with shorter timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Reset display count when category changes
  useEffect(() => {
    setDisplayCount(isMobile ? 8 : 12);
  }, [selectedCategory, isMobile]);

  const handleImageLoad = (companyName: string) => {
    setLoadedImages(prev => new Set([...prev, companyName]));
    setIsLoading(false);
  };

  const handleImageError = (companyName: string) => {
    console.error(`Failed to load image for ${companyName}`);
    setFailedImages(prev => new Set([...prev, companyName]));
  };

  const imageRef = (companyName: string) => (element: HTMLImageElement | null) => {
    if (element) {
      imageRefs.current.set(companyName, element);
      element.dataset.company = companyName;
      observerRef.current?.observe(element);
    } else {
      imageRefs.current.delete(companyName);
    }
  };

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

      <motion.section
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            Array.from({ length: isMobile ? 4 : 6 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="h-40"
              >
                <Card className="h-full dark:bg-gray-800 bg-white">
                  <CardContent className="h-full p-6 flex items-center justify-center">
                    <div className="w-full flex flex-col items-center gap-4">
                      <Skeleton className="h-20 w-4/5" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            displayedCompanies.map((company) => {
              const hasLoadedImage = loadedImages.has(company.name);
              const hasFailedImage = failedImages.has(company.name);
              const imagePaths = getImagePaths(company.name);

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
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-full block"
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800">
                      <CardContent className="h-full p-4 flex items-center justify-center relative">
                        {!hasFailedImage ? (
                          <div className="flex items-center justify-center w-full h-full">
                            <picture>
                              <source srcSet={imagePaths.webp} type="image/webp" />
                              <img
                                ref={imageRef(company.name)}
                                src={imagePaths.png}
                                data-company={company.name}
                                alt={`${company.name} logo`}
                                className={`w-auto h-auto max-h-[100px] max-w-[280px] object-contain transition-opacity duration-200 
                                  ${hasLoadedImage ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => handleImageLoad(company.name)}
                                onError={() => handleImageError(company.name)}
                              />
                            </picture>
                          </div>
                        ) : (
                          <div className="text-center font-semibold">
                            {company.name}
                          </div>
                        )}
                        {!hasLoadedImage && !hasFailedImage && (
                          <div className="absolute inset-0 flex items-center justify-center p-6">
                            <Skeleton className="h-20 w-4/5" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.section>

      {displayCount < filteredCompanies.length && (
        <div ref={loadMoreRef} className="h-20" />
      )}
    </div>
  );
};

export default Portfolio;