import { z } from 'zod';

export type CompanyCategory = 'Health' | 'Retail' | 'SaaS' | 'Fintech';
export type CompanyTag = 'Markup' | 'IPO' | 'Acquired';

export interface Company {
  name: string;
  url: string;
  category: CompanyCategory;
  description?: string;
  tag?: CompanyTag;
}

export interface PortfolioMetrics {
  totalInvestments: number;
  markups: number;
  busts: number;
  tvpi: number;
  grossMultiple: number;
  netMultipleNetOfCarry: number;
  returnNetOfFees: number;
  yearsInvested: number;
  irr: number;
}

export const portfolioMetrics: PortfolioMetrics = {
  totalInvestments: 32,
  markups: 13,
  busts: 4,
  tvpi: 1.44,
  grossMultiple: 1.22,
  netMultipleNetOfCarry: 1.12,
  returnNetOfFees: 32,
  yearsInvested: 5.79,
  irr: 10
};

export const companies: Company[] = [
  // Health
  { name: 'Afar', url: 'https://www.afarfoods.com/', category: 'Health', description: 'Low sugar high protein savory snack bars.' },
  { name: 'GEM', url: 'https://dailygem.com/', category: 'Health', description: 'Real food daily bites made from algae, plants, and probiotics to optimize your daily nutrition.', tag: 'Markup' },
  { name: 'Aura', url: 'https://www.aurahealth.io/', category: 'Health', description: 'Digital mental health platform offering mindfulness meditation, life coaching, and therapy.', tag: 'Markup' },
  { name: 'RPM', url: 'https://rpmtraining.com/', category: 'Health', description: 'At-home fitness programming combining functional movement with high-intensity training.', tag: 'Acquired' },
  { name: 'Playbook', url: 'https://www.joinplaybook.com/', category: 'Health', description: 'Platform enabling fitness creators to build, manage and grow their digital business.' },

  // Retail
  { name: 'Juneshine', url: 'https://www.juneshine.com', category: 'Retail', description: 'Premium hard kombucha brewed with real organic ingredients and probiotics.', tag: 'Markup' },
  { name: 'Sanzo', url: 'https://www.drinksanzo.com', category: 'Retail', description: 'Asian-inspired sparkling water made with real fruit and no added sugar.', tag: 'Markup' },
  { name: 'Moku', url: 'https://mokufoods.com/', category: 'Retail', description: 'Plant-based jerky made from mushrooms, offering a sustainable protein alternative.', tag: 'Markup' },
  { name: 'Superplastic', url: 'https://www.superplastic.co', category: 'Retail', description: 'Digital-first luxury brand creating synthetic celebrities and collectible art toys.' },
  { name: 'Lunar', url: 'https://drinklunar.com', category: 'Retail', description: 'Asian-inspired hard seltzer celebrating authentic flavors and cultural heritage.' },
  { name: 'The Coffee', url: 'https://thecoffee.com/', category: 'Retail', description: 'Premium coffee brand focused on quality beans and innovative brewing methods.', tag: 'Markup' },
  { name: 'Swansea City AFC', url: 'https://www.swanseacity.com', category: 'Retail', description: 'Professional football club competing in the English Football League Championship.' },

  // SaaS
  { name: 'AON3D', url: 'https://www.aon3d.com', category: 'SaaS', description: 'Industrial 3D printing solutions for high-performance thermoplastics.', tag: 'Markup' },
  { name: 'Metadata', url: 'https://www.metadata.io', category: 'SaaS', description: 'AI-powered B2B marketing operations platform automating customer acquisition.', tag: 'Markup' },
  { name: 'Restream', url: 'https://www.restream.io', category: 'SaaS', description: 'Multi-platform streaming solution for content creators and businesses.' },
  { name: 'Sugar', url: 'https://www.sugarliving.com/', category: 'SaaS', description: 'Property management platform streamlining operations and resident experience.' },
  { name: 'Soot', url: 'https://www.soot.com', category: 'SaaS', description: 'Visual-first filing system powered by AI.', tag: 'Markup' },
  { name: 'Techmate', url: 'https://www.techmate.com', category: 'SaaS', description: 'AI-powered technical support automation platform.' },

  // Fintech
  { name: 'Backpack', url: 'https://www.backpack529.com/', category: 'Fintech', description: 'Modern 529 college savings platform making education investing accessible.' },
  { name: 'Harper', url: 'https://www.harperinsure.com/', category: 'Fintech', description: 'Digital-first insurance platform for modern businesses.' },
  { name: 'Maridea', url: 'https://marideawealth.com/', category: 'Fintech', description: 'Wealth management platform for high-net-worth individuals.', tag: 'Markup' },
  { name: 'Swan', url: 'https://www.swanbitcoin.com/', category: 'Fintech', description: 'Bitcoin savings and investment platform for long-term wealth building.', tag: 'Markup' },
  { name: 'Waldo', url: 'https://www.waldo.ai/', category: 'Fintech', description: 'Next-gen fraud and compliance monitoring tools.' },
  { name: 'Sundae', url: 'https://www.sundae.com', category: 'Fintech', description: 'Marketplace for distressed property sales connecting sellers with investors.' },
  { name: 'Kartera', url: 'https://www.kartera.com', category: 'Fintech', description: 'Digital asset management platform for institutional investors.' }
];

export const displayCategories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const;
export const categories: CompanyCategory[] = ['Fintech', 'Health', 'Retail', 'SaaS'];
export const companyTags: CompanyTag[] = ['Markup', 'IPO', 'Acquired'];