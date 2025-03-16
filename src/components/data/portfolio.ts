import { Company } from '../types';

export const companies: Company[] = [
  { name: 'Afar', logo: '/attached_assets/portfolio-logos/Afar.png', category: 'Health', description: 'Low sugar high protein savory snack bars.' },
  { name: 'AON3D', logo: '/attached_assets/portfolio-logos/AON3D.png', category: 'SaaS', markup: true, description: 'Industrial 3D printing solutions for high-performance thermoplastics.' },
  { name: 'Aura', logo: '/attached_assets/portfolio-logos/Aura.png', category: 'Health', markup: true, description: 'Digital mental health platform offering mindfulness meditation, life coaching, and therapy.' },
  { name: 'Backpack', logo: '/attached_assets/portfolio-logos/Backpack.png', category: 'Fintech', description: 'Modern 529 college savings platform making education investing accessible' },
  { name: 'GEM', logo: '/attached_assets/portfolio-logos/GEM.png', category: 'Health', markup: true, description: 'Real food daily bites made from algae, plants, and probiotics to optimize your daily nutrition.' },
  { name: 'Goodmylk', logo: '/attached_assets/portfolio-logos/Goodmylk.png', category: 'Health', description: 'Plant-based dairy alternatives made from simple, wholesome ingredients.' },
  { name: 'Harper', logo: '/attached_assets/portfolio-logos/Harper.png', category: 'Fintech', description: 'Digital-first insurance platform for modern businesses.' },
  { name: 'Hedgehog', logo: '/attached_assets/portfolio-logos/Hedgehog.png', category: 'Health', description: 'Digital health platform for personalized wellness and preventive care.' },
  { name: 'Juneshine', logo: '/attached_assets/portfolio-logos/Juneshine.png', category: 'Retail', markup: true, description: 'Premium hard kombucha brewed with real organic ingredients and probiotics.' },
  { name: 'Juno', logo: '/attached_assets/portfolio-logos/Juno.png', category: 'Retail', description: 'Direct-to-consumer wine club focused on natural and sustainable wines.' },
  { name: 'Kartera', logo: '/attached_assets/portfolio-logos/Kartera.png', category: 'Fintech', description: 'Digital asset management platform for institutional investors.' },
  { name: 'Keep', logo: '/attached_assets/portfolio-logos/Keep.png', category: 'Fintech', description: 'All-in-one banking for any business' },
  { name: 'Lunar', logo: '/attached_assets/portfolio-logos/Lunar.png', category: 'Retail', description: 'Asian-inspired hard seltzer celebrating authentic flavors and cultural heritage.' },
  { name: 'Margin', logo: '/attached_assets/portfolio-logos/Margin.png', category: 'SaaS', description: 'Increase profitability by measuring cost & revenue of every user action' },
  { name: 'Maridea', logo: '/attached_assets/portfolio-logos/Maridea.png', category: 'Fintech', markup: true, description: 'Wealth management platform for high-net-worth individuals.' },
  { name: 'Metadata', logo: '/attached_assets/portfolio-logos/Metadata.png', category: 'SaaS', markup: true, description: 'AI-powered B2B marketing operations platform automating customer acquisition.' },
  { name: 'Moku', logo: '/attached_assets/portfolio-logos/Moku.png', category: 'Retail', markup: true, description: 'Plant-based jerky made from mushrooms, offering a sustainable protein alternative.' },
  { name: 'Playbook', logo: '/attached_assets/portfolio-logos/Playbook.png', category: 'Health', description: 'Platform enabling fitness creators to build, manage and grow their digital business.' },
  { name: 'Rely', logo: '/attached_assets/portfolio-logos/Rely.png', category: 'Fintech', description: 'An AI-powered knowledge base and automation platform for the property management industry' },
  { name: 'Restream', logo: '/attached_assets/portfolio-logos/Restream.png', category: 'SaaS', description: 'Multi-platform streaming solution for content creators and businesses.' },
  { name: 'RPM', logo: '/attached_assets/portfolio-logos/RPM.png', category: 'Health', acquired: true, description: 'At-home fitness programming combining functional movement with high-intensity training.' },
  { name: 'Sanzo', logo: '/attached_assets/portfolio-logos/Sanzo.png', category: 'Retail', markup: true, description: 'Asian-inspired sparkling water made with real fruit and no added sugar.' },
  { name: 'Soot', logo: '/attached_assets/portfolio-logos/Soot.png', category: 'SaaS', markup: true, description: 'Visual-first filing system powered by AI.' },
  { name: 'Sugar', logo: '/attached_assets/portfolio-logos/Sugar.png', category: 'SaaS', acquired: true, description: 'Property management platform streamlining operations and resident experience.' },
  { name: 'Sundae', logo: '/attached_assets/portfolio-logos/Sundae.png', category: 'Fintech', description: 'Marketplace for distressed property sales connecting sellers with investors.' },
  { name: 'Superplastic', logo: '/attached_assets/portfolio-logos/Superplastic.png', category: 'Retail', description: 'Digital-first luxury brand creating synthetic celebrities and collectible art toys.' },
  { name: 'Swan', logo: '/attached_assets/portfolio-logos/Swan.png', category: 'Fintech', markup: true, description: 'Bitcoin savings and investment platform for long-term wealth building.' },
  { name: 'Swansea City AFC', logo: '/attached_assets/portfolio-logos/Swansea City AFC.png', category: 'Retail', description: 'Professional football club competing in the English Football League Championship.' },
  { name: 'Techmate', logo: '/attached_assets/portfolio-logos/Techmate.png', category: 'SaaS', description: 'AI-powered technical support automation platform.' },
  { name: 'The Coffee', logo: '/attached_assets/portfolio-logos/The Coffee.png', category: 'Retail', markup: true, description: 'Premium coffee brand focused on quality beans and innovative brewing methods.' },
  { name: 'Waldo', logo: '/attached_assets/portfolio-logos/Waldo.png', category: 'Fintech', description: 'Next-gen fraud and compliance monitoring tools.' }
];

export const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const;