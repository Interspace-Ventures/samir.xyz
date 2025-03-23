import { Company } from '../types';

export const companies: Company[] = [
  { name: 'Afar', logo: '/logos/portfolio/Afar.png', category: 'Health', description: 'Low sugar high protein savory snack bars.' },
  { name: 'AON3D', logo: '/logos/portfolio/AON3D.png', category: 'SaaS', markup: true, description: 'Industrial 3D printing solutions for high-performance thermoplastics.' },
  { name: 'Aura', logo: '/logos/portfolio/Aura.png', category: 'Health', markup: true, description: 'Digital mental health platform offering mindfulness meditation, life coaching, and therapy.' },
  { name: 'Backpack', logo: '/logos/portfolio/Backpack.png', category: 'Fintech', description: 'Modern 529 college savings platform making education investing accessible.' },
  { name: 'GEM', logo: '/logos/portfolio/GEM.png', category: 'Health', markup: true, description: 'Real food daily bites made from algae, plants, and probiotics to optimize your daily nutrition.' },
  { name: 'Goodmylk', logo: '/logos/portfolio/Goodmylk.png', category: 'Health', description: 'Plant-based dairy alternatives made from simple, wholesome ingredients.' },
  { name: 'Harper', logo: '/logos/portfolio/Harper.png', category: 'Fintech', description: 'Digital-first insurance platform for modern businesses.' },
  { name: 'Hedgehog', logo: '/logos/portfolio/Hedgehog.png', category: 'Health', description: 'Digital health platform for personalized wellness and preventive care.' },
  { name: 'Juneshine', logo: '/logos/portfolio/Juneshine.png', category: 'Retail', markup: true, description: 'Premium hard kombucha brewed with real organic ingredients and probiotics.' },
  { name: 'Kartera', logo: '/logos/portfolio/Kartera.png', category: 'Fintech', description: 'Digital asset management platform for institutional investors.' },
  { name: 'Keep', logo: '/logos/portfolio/Keep.png', category: 'Fintech', description: 'All-in-one banking for any business.' },
  { name: 'margin', logo: '/logos/portfolio/margin.png', category: 'SaaS', description: 'Increase profitability by measuring cost & revenue of every user action.' },
  { name: 'Maridea', logo: '/logos/portfolio/Maridea.png', category: 'Fintech', markup: true, description: 'Wealth management platform for high-net-worth individuals.' },
  { name: 'Playbook', logo: '/logos/portfolio/Playbook.png', category: 'Health', description: 'Platform enabling fitness creators to build, manage and grow their digital business.' },
  { name: 'RPM', logo: '/logos/portfolio/RPM.png', category: 'Health', acquired: true, description: 'At-home fitness programming combining functional movement with high-intensity training.' },
  { name: 'Rely', logo: '/logos/portfolio/Rely.png', category: 'Fintech', description: 'An AI-powered knowledge base and automation platform for the property management industry.' },
  { name: 'Restream', logo: '/logos/portfolio/Restream.png', category: 'SaaS', description: 'Multi-platform streaming solution for content creators and businesses.' },
  { name: 'Sanzo', logo: '/logos/portfolio/Sanzo.png', category: 'Retail', markup: true, description: 'Asian-inspired sparkling water made with real fruit and no added sugar.' },
  { name: 'Soot', logo: '/logos/portfolio/Soot.png', category: 'SaaS', markup: true, description: 'Visual-first filing system powered by AI.' },
  { name: 'Sugar', logo: '/logos/portfolio/Sugar.png', category: 'SaaS', acquired: true, description: 'Property management platform streamlining operations and resident experience.' },
  { name: 'Sundae', logo: '/logos/portfolio/Sundae.png', category: 'Fintech', description: 'Marketplace for distressed property sales connecting sellers with investors.' },
  { name: 'Superplastic', logo: '/logos/portfolio/Superplastic.png', category: 'Retail', description: 'Digital-first luxury brand creating synthetic celebrities and collectible art toys.' },
  { name: 'Swan', logo: '/logos/portfolio/Swan.png', category: 'Fintech', markup: true, description: 'Bitcoin savings and investment platform for long-term wealth building.' },
  { name: 'Swansea City AFC', logo: '/logos/portfolio/Swansea City AFC.png', category: 'Retail', description: 'Professional football club competing in the English Football League Championship.' },
  { name: 'Techmate', logo: '/logos/portfolio/Techmate.png', category: 'SaaS', description: 'AI-powered technical support automation platform.' },
  { name: 'The Coffee', logo: '/logos/portfolio/The Coffee.png', category: 'Retail', markup: true, description: 'Premium coffee brand focused on quality beans and innovative brewing methods.' },
  { name: 'The Food Company', logo: '/logos/portfolio/The Food Company.png', category: 'Retail', description: 'Innovative food products and sustainable packaging solutions.' },
  { name: 'Waldo', logo: '/logos/portfolio/Waldo.png', category: 'Fintech', description: 'Next-gen fraud and compliance monitoring tools.' }
];

export const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const;