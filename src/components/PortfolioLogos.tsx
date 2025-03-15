"use client"

import Image from 'next/image'
import { useState, memo, useEffect } from 'react'

// Performance monitoring
const logPerformance = (component: string, action: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${component} - ${action}: ${performance.now()}ms`);
  }
};

const CategoryButton = memo(({ category, isSelected, onClick }: {
  category: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      w-[90px] h-[36px] rounded text-sm font-medium transition-colors duration-150
      ${isSelected
        ? 'bg-purple-600 text-white'
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200'
      }
    `}
  >
    {category}
  </button>
));

CategoryButton.displayName = 'CategoryButton';

interface Company {
  name: string;
  logo: string;
  description: string;
  category: 'Fintech' | 'Health' | 'Retail' | 'SaaS';
  markup?: boolean;
  acquired?: boolean;
}

const CompanyCard = memo(({ company }: { company: Company }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white dark:bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/2] relative p-4">
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          priority={company.markup || company.acquired}
        />
      </div>

      {/* Hover overlay with description */}
      <div
        className={`
          absolute inset-0 bg-black/80 flex items-center justify-center p-4
          transition-all duration-300 ease-in-out
          ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <p className="text-white text-sm text-center">{company.description}</p>
      </div>

      {/* Badge for markup/acquired status */}
      {(company.markup || company.acquired) && (
        <div className="absolute top-2 right-2 z-10">
          <span className={`
            px-2 py-1 text-xs rounded font-medium
            ${company.acquired
              ? 'bg-blue-100 text-blue-600'
              : 'bg-purple-100 text-purple-600'
            }
          `}>
            {company.acquired ? 'Acquired' : 'Markup'}
          </span>
        </div>
      )}
    </div>
  );
});

CompanyCard.displayName = 'CompanyCard';

const companies: Company[] = [
  { name: 'Afar', logo: '/images/portfolio-logos/Afar.png', category: 'Health', description: 'Low sugar high protein savory snack bars.' },
  { name: 'AON3D', logo: '/images/portfolio-logos/AON3D.png', category: 'SaaS', markup: true, description: 'Industrial 3D printing solutions for high-performance thermoplastics.' },
  { name: 'Aura', logo: '/images/portfolio-logos/Aura.png', category: 'Health', markup: true, description: 'Digital mental health platform offering mindfulness meditation, life coaching, and therapy.' },
  { name: 'Backpack', logo: '/images/portfolio-logos/Backpack.png', category: 'Fintech', description: 'Modern 529 college savings platform making education investing accessible' },
  { name: 'GEM', logo: '/images/portfolio-logos/GEM.png', category: 'Health', markup: true, description: 'Real food daily bites made from algae, plants, and probiotics to optimize your daily nutrition.' },
  { name: 'Goodmylk', logo: '/images/portfolio-logos/Goodmylk.png', category: 'Health', description: 'Plant-based dairy alternatives made from simple, wholesome ingredients.' },
  { name: 'Harper', logo: '/images/portfolio-logos/Harper.png', category: 'Fintech', description: 'Digital-first insurance platform for modern businesses.' },
  { name: 'Hedgehog', logo: '/images/portfolio-logos/Hedgehog.png', category: 'Health', description: 'Digital health platform for personalized wellness and preventive care.' },
  { name: 'Juneshine', logo: '/images/portfolio-logos/Juneshine.png', category: 'Retail', markup: true, description: 'Premium hard kombucha brewed with real organic ingredients and probiotics.' },
  { name: 'Juno', logo: '/images/portfolio-logos/Juno.png', category: 'Retail', description: 'Direct-to-consumer wine club focused on natural and sustainable wines.' },
  { name: 'Kartera', logo: '/images/portfolio-logos/Kartera.png', category: 'Fintech', description: 'Digital asset management platform for institutional investors.' },
  { name: 'Keep', logo: '/images/portfolio-logos/Keep.png', category: 'Fintech', description: 'All-in-one banking for any business' },
  { name: 'Lunar', logo: '/images/portfolio-logos/Lunar.png', category: 'Retail', description: 'Asian-inspired hard seltzer celebrating authentic flavors and cultural heritage.' },
  { name: 'Margin', logo: '/images/portfolio-logos/Margin.png', category: 'SaaS', description: 'Increase profitability by measuring cost & revenue of every user action' },
  { name: 'Maridea', logo: '/images/portfolio-logos/Maridea.png', category: 'Fintech', markup: true, description: 'Wealth management platform for high-net-worth individuals.' },
  { name: 'Metadata', logo: '/images/portfolio-logos/Metadata.png', category: 'SaaS', markup: true, description: 'AI-powered B2B marketing operations platform automating customer acquisition.' },
  { name: 'Moku', logo: '/images/portfolio-logos/Moku.png', category: 'Retail', markup: true, description: 'Plant-based jerky made from mushrooms, offering a sustainable protein alternative.' },
  { name: 'Playbook', logo: '/images/portfolio-logos/Playbook.png', category: 'Health', description: 'Platform enabling fitness creators to build, manage and grow their digital business.' },
  { name: 'Rely', logo: '/images/portfolio-logos/Rely.png', category: 'Fintech', description: 'An AI-powered knowledge base and automation platform for the property management industry' },
  { name: 'Restream', logo: '/images/portfolio-logos/Restream.png', category: 'SaaS', description: 'Multi-platform streaming solution for content creators and businesses.' },
  { name: 'RPM', logo: '/images/portfolio-logos/RPM.png', category: 'Health', acquired: true, description: 'At-home fitness programming combining functional movement with high-intensity training.' },
  { name: 'Sanzo', logo: '/images/portfolio-logos/Sanzo.png', category: 'Retail', markup: true, description: 'Asian-inspired sparkling water made with real fruit and no added sugar.' },
  { name: 'Soot', logo: '/images/portfolio-logos/Soot.png', category: 'SaaS', markup: true, description: 'Visual-first filing system powered by AI.' },
  { name: 'Sugar', logo: '/images/portfolio-logos/Sugar.png', category: 'SaaS', acquired: true, description: 'Property management platform streamlining operations and resident experience.' },
  { name: 'Sundae', logo: '/images/portfolio-logos/Sundae.png', category: 'Fintech', description: 'Marketplace for distressed property sales connecting sellers with investors.' },
  { name: 'Superplastic', logo: '/images/portfolio-logos/Superplastic.png', category: 'Retail', description: 'Digital-first luxury brand creating synthetic celebrities and collectible art toys.' },
  { name: 'Swan', logo: '/images/portfolio-logos/Swan.png', category: 'Fintech', markup: true, description: 'Bitcoin savings and investment platform for long-term wealth building.' },
  { name: 'Swansea City AFC', logo: '/images/portfolio-logos/Swansea City AFC.png', category: 'Retail', description: 'Professional football club competing in the English Football League Championship.' },
  { name: 'Techmate', logo: '/images/portfolio-logos/Techmate.png', category: 'SaaS', description: 'AI-powered technical support automation platform.' },
  { name: 'The Coffee', logo: '/images/portfolio-logos/The Coffee.png', category: 'Retail', markup: true, description: 'Premium coffee brand focused on quality beans and innovative brewing methods.' },
  { name: 'Waldo', logo: '/images/portfolio-logos/Waldo.png', category: 'Fintech', description: 'Next-gen fraud and compliance monitoring tools.' }
];

const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const;

export default function PortfolioLogos() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All')

  useEffect(() => {
    logPerformance('PortfolioLogos', 'mount');
    return () => logPerformance('PortfolioLogos', 'unmount');
  }, []);

  useEffect(() => {
    logPerformance('PortfolioLogos', `category-change-${selectedCategory}`);
  }, [selectedCategory]);

  const filteredCompanies = companies.filter(company =>
    selectedCategory === 'All' || company.category === selectedCategory
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            isSelected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredCompanies.map((company) => (
          <CompanyCard
            key={company.name}
            company={company}
          />
        ))}
      </div>
    </div>
  )
}