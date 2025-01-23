
import { z } from 'zod';

export type CompanyCategory = 'Health' | 'Retail' | 'SaaS' | 'Fintech';

export interface Company {
  name: string;
  url: string;
  category: CompanyCategory;
  description?: string;
  exited?: boolean;
}

export const companies: Company[] = [
  // Health
  { name: 'Afar', url: 'https://www.afarfoods.com/', category: 'Health', description: 'Plant-based ready-to-eat meals that combine nutrition and convenience for the modern lifestyle.' },
  { name: 'GEM', url: 'https://dailygem.com/', category: 'Health', description: 'Real food daily bites made from algae, plants, and probiotics to optimize your daily nutrition.' },
  { name: 'Aura', url: 'https://www.aurahealth.io/', category: 'Health', description: 'Digital mental health platform offering mindfulness meditation, life coaching, and therapy.' },
  { name: 'RPM', url: 'https://rpmtraining.com/', category: 'Health', description: 'At-home fitness programming combining functional movement with high-intensity training.' },
  { name: 'Playbook', url: 'https://www.joinplaybook.com/', category: 'Health', description: 'Platform enabling fitness creators to build, manage and grow their digital business.' },

  // Retail
  { name: 'Juneshine', url: 'https://www.juneshine.com', category: 'Retail', description: 'Premium hard kombucha brewed with real organic ingredients and probiotics.' },
  { name: 'Sanzo', url: 'https://www.drinksanzo.com', category: 'Retail', description: 'Asian-inspired sparkling water made with real fruit and no added sugar.' },
  { name: 'Goodmylk', url: 'https://www.goodmylk.co', category: 'Retail', description: 'Plant-based milk concentrates made from simple, wholesome ingredients.' },
  { name: 'Moku', url: 'https://mokufoods.com/', category: 'Retail', description: 'Plant-based jerky made from mushrooms, offering a sustainable protein alternative.' },
  { name: 'Superplastic', url: 'https://www.superplastic.co', category: 'Retail', description: 'Digital-first luxury brand creating synthetic celebrities and collectible art toys.' },
  { name: 'Lunar', url: 'https://drinklunar.com', category: 'Retail', description: 'Asian-inspired hard seltzer celebrating authentic flavors and cultural heritage.' },
  { name: 'The Coffee', url: 'https://thecoffee.com/', category: 'Retail', description: 'Premium coffee brand focused on quality beans and innovative brewing methods.' },
  { name: 'The Food Company', url: 'https://thefoodcompany.com/', category: 'Retail', description: 'Sustainable food solutions for the modern consumer.' },
  { name: 'Swansea City AFC', url: 'https://www.swanseacity.com', category: 'Retail', description: 'Professional football club competing in the English Football League Championship.' },

  // SaaS
  { name: 'AON3D', url: 'https://www.aon3d.com', category: 'SaaS', description: 'Industrial 3D printing solutions for high-performance thermoplastics.' },
  { name: 'Metadata', url: 'https://www.metadata.io', category: 'SaaS', description: 'AI-powered B2B marketing operations platform automating customer acquisition.' },
  { name: 'Restream', url: 'https://www.restream.io', category: 'SaaS', description: 'Multi-platform streaming solution for content creators and businesses.' },
  { name: 'Sugar', url: 'https://www.sugarliving.com/', category: 'SaaS', description: 'Property management platform streamlining operations and resident experience.' },
  { name: 'Hedgehog', url: 'https://www.thehedgehogcompany.com/', category: 'SaaS', description: 'Investment platform simplifying digital asset portfolio management.' },
  { name: 'Soot', url: 'https://www.soot.com', category: 'SaaS', description: 'Cloud-based business intelligence and analytics platform.' },
  { name: 'Techmate', url: 'https://www.techmate.com', category: 'SaaS', description: 'AI-powered technical support automation platform.' },
  { name: 'Launchpad', category: 'SaaS', description: 'Developer platform for building and scaling web applications.', exited: true },

  // Fintech
  { name: 'Backpack', url: 'https://www.backpack529.com/', category: 'Fintech', description: 'Modern 529 college savings platform making education investing accessible.' },
  { name: 'Harper', url: 'https://www.harperinsure.com/', category: 'Fintech', description: 'Digital-first insurance platform for modern businesses.' },
  { name: 'Juno', url: 'https://www.withjuno.com', category: 'Fintech', description: 'Digital banking platform offering high-yield accounts and cash back rewards.' },
  { name: 'Maridea', url: 'https://marideawealth.com/', category: 'Fintech', description: 'Wealth management platform for high-net-worth individuals.' },
  { name: 'Swan', url: 'https://www.swanbitcoin.com/', category: 'Fintech', description: 'Bitcoin savings and investment platform for long-term wealth building.' },
  { name: 'Waldo', url: 'https://www.waldo.ai/', category: 'Fintech', description: 'AI-powered expense management and reimbursement platform.' },
  { name: 'Sundae', url: 'https://www.sundae.com', category: 'Fintech', description: 'Marketplace for distressed property sales connecting sellers with investors.' },
  { name: 'Kartera', url: 'https://www.kartera.com', category: 'Fintech', description: 'Digital asset management platform for institutional investors.' }
];

export const displayCategories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const;
export const categories: CompanyCategory[] = ['Fintech', 'Health', 'Retail', 'SaaS'];
