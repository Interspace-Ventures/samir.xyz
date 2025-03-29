import { Company } from '../types';

// Helper function to safely convert image paths with spaces
const safePath = (imageName: string) => {
  // Ensure the image name has no spaces and uses the correct path
  const sanitizedName = imageName.replace(/\s+/g, '');
  
  // First try the attached_assets directory in public
  return `/attached_assets/${sanitizedName}.png`;
};

export const companies: Company[] = [
  { name: 'Afar', logo: safePath('Afar'), category: 'Health', description: 'Low sugar high protein savory snack bars.' },
  { name: 'AON3D', logo: safePath('AON3D'), category: 'SaaS', markup: true, description: 'Industrial 3D printing solutions for high-performance thermoplastics.' },
  { name: 'Aura', logo: safePath('Aura'), category: 'Health', markup: true, description: 'Digital mental health platform offering mindfulness meditation, life coaching, and therapy.' },
  { name: 'Backpack', logo: safePath('Backpack'), category: 'Fintech', description: 'Modern 529 college savings platform making education investing accessible.' },
  { name: 'GEM', logo: safePath('GEM'), category: 'Health', markup: true, description: 'Real food daily bites made from algae, plants, and probiotics to optimize your daily nutrition.' },
  { name: 'Goodmylk', logo: safePath('Goodmylk'), category: 'Health', description: 'Plant-based dairy alternatives made from simple, wholesome ingredients.' },
  { name: 'Harper', logo: safePath('Harper'), category: 'Fintech', description: 'Digital-first insurance platform for modern businesses.' },
  { name: 'Hedgehog', logo: safePath('Hedgehog'), category: 'Health', description: 'Digital health platform for personalized wellness and preventive care.' },
  { name: 'Juneshine', logo: safePath('Juneshine'), category: 'Retail', markup: true, description: 'Premium hard kombucha brewed with real organic ingredients and probiotics.' },
  { name: 'Kartera', logo: safePath('Kartera'), category: 'Fintech', description: 'Digital asset management platform for institutional investors.' },
  { name: 'Keep', logo: safePath('Keep'), category: 'Fintech', description: 'All-in-one banking for any business.' },
  { name: 'margin', logo: safePath('margin'), category: 'SaaS', description: 'Increase profitability by measuring cost & revenue of every user action.' },
  { name: 'Maridea', logo: safePath('Maridea'), category: 'Fintech', markup: true, description: 'Wealth management platform for high-net-worth individuals.' },
  { name: 'Playbook', logo: safePath('Playbook'), category: 'Health', description: 'Platform enabling fitness creators to build, manage and grow their digital business.' },
  { name: 'RPM', logo: safePath('RPM'), category: 'Health', acquired: true, description: 'At-home fitness programming combining functional movement with high-intensity training.' },
  { name: 'Rely', logo: safePath('Rely'), category: 'Fintech', description: 'An AI-powered knowledge base and automation platform for the property management industry.' },
  { name: 'Restream', logo: safePath('Restream'), category: 'SaaS', description: 'Multi-platform streaming solution for content creators and businesses.' },
  { name: 'Sanzo', logo: safePath('Sanzo'), category: 'Retail', markup: true, description: 'Asian-inspired sparkling water made with real fruit and no added sugar.' },
  { name: 'Soot', logo: safePath('Soot'), category: 'SaaS', markup: true, description: 'Visual-first filing system powered by AI.' },
  { name: 'Sugar', logo: safePath('Sugar'), category: 'SaaS', acquired: true, description: 'Property management platform streamlining operations and resident experience.' },
  { name: 'Sundae', logo: safePath('Sundae'), category: 'Fintech', description: 'Marketplace for distressed property sales connecting sellers with investors.' },
  { name: 'Superplastic', logo: safePath('Superplastic'), category: 'Retail', description: 'Digital-first luxury brand creating synthetic celebrities and collectible art toys.' },
  { name: 'Swan', logo: safePath('Swan'), category: 'Fintech', markup: true, description: 'Bitcoin savings and investment platform for long-term wealth building.' },
  { name: 'Swansea City AFC', logo: safePath('Swansea City AFC'), category: 'Retail', description: 'Professional football club competing in the English Football League Championship.' },
  { name: 'Techmate', logo: safePath('Techmate'), category: 'SaaS', description: 'AI-powered technical support automation platform.' },
  { name: 'The Coffee', logo: safePath('The Coffee'), category: 'Retail', markup: true, description: 'Premium coffee brand focused on quality beans and innovative brewing methods.' },
  { name: 'The Food Company', logo: safePath('The Food Company'), category: 'Retail', description: 'Innovative food products and sustainable packaging solutions.' },
  { name: 'Waldo', logo: safePath('Waldo'), category: 'Fintech', description: 'Next-gen fraud and compliance monitoring tools.' }
];

export const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const;