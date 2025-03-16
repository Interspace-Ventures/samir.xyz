import { Company } from '../types';

export const companies: Company[] = [
  { name: 'Afar', logo: '/assets/logos/Afar.webp', category: 'Health', description: 'Low sugar high protein savory snack bars.' },
  { name: 'AON3D', logo: '/assets/logos/AON3D.webp', category: 'SaaS', markup: true, description: 'Industrial 3D printing solutions for high-performance thermoplastics.' },
  { name: 'Aura', logo: '/assets/logos/Aura.webp', category: 'Health', markup: true, description: 'Digital mental health platform offering mindfulness meditation, life coaching, and therapy.' },
  { name: 'Backpack', logo: '/assets/logos/Backpack.webp', category: 'Fintech', description: 'Modern 529 college savings platform making education investing accessible' },
  { name: 'GEM', logo: '/assets/logos/GEM.webp', category: 'Health', markup: true, description: 'Real food daily bites made from algae, plants, and probiotics to optimize your daily nutrition.' },
  { name: 'Goodmylk', logo: '/assets/logos/Goodmylk.webp', category: 'Health', description: 'Plant-based dairy alternatives made from simple, wholesome ingredients.' },
  { name: 'Harper', logo: '/assets/logos/Harper.webp', category: 'Fintech', description: 'Digital-first insurance platform for modern businesses.' },
  { name: 'Hedgehog', logo: '/assets/logos/Hedgehog.webp', category: 'Health', description: 'Digital health platform for personalized wellness and preventive care.' },
  { name: 'Juneshine', logo: '/assets/logos/Juneshine.webp', category: 'Retail', markup: true, description: 'Premium hard kombucha brewed with real organic ingredients and probiotics.' },
  { name: 'Juno', logo: '/assets/logos/Juno.webp', category: 'Retail', description: 'Direct-to-consumer wine club focused on natural and sustainable wines.' },
  { name: 'Kartera', logo: '/assets/logos/Kartera.webp', category: 'Fintech', description: 'Digital asset management platform for institutional investors.' },
  { name: 'Keep', logo: '/assets/logos/Keep.webp', category: 'Fintech', description: 'All-in-one banking for any business' },
  { name: 'Lunar', logo: '/assets/logos/Lunar.webp', category: 'Retail', description: 'Asian-inspired hard seltzer celebrating authentic flavors and cultural heritage.' },
  { name: 'Margin', logo: '/assets/logos/Margin.webp', category: 'SaaS', description: 'Increase profitability by measuring cost & revenue of every user action' },
  { name: 'Maridea', logo: '/assets/logos/Maridea.webp', category: 'Fintech', markup: true, description: 'Wealth management platform for high-net-worth individuals.' },
  { name: 'Metadata', logo: '/assets/logos/Metadata.webp', category: 'SaaS', markup: true, description: 'AI-powered B2B marketing operations platform automating customer acquisition.' },
  { name: 'Moku', logo: '/assets/logos/Moku.webp', category: 'Retail', markup: true, description: 'Plant-based jerky made from mushrooms, offering a sustainable protein alternative.' },
  { name: 'Playbook', logo: '/assets/logos/Playbook.webp', category: 'Health', description: 'Platform enabling fitness creators to build, manage and grow their digital business.' },
  { name: 'Rely', logo: '/assets/logos/Rely.webp', category: 'Fintech', description: 'An AI-powered knowledge base and automation platform for the property management industry' },
  { name: 'Restream', logo: '/assets/logos/Restream.webp', category: 'SaaS', description: 'Multi-platform streaming solution for content creators and businesses.' },
  { name: 'RPM', logo: '/assets/logos/RPM.webp', category: 'Health', acquired: true, description: 'At-home fitness programming combining functional movement with high-intensity training.' },
  { name: 'Sanzo', logo: '/assets/logos/Sanzo.webp', category: 'Retail', markup: true, description: 'Asian-inspired sparkling water made with real fruit and no added sugar.' },
  { name: 'Soot', logo: '/assets/logos/Soot.webp', category: 'SaaS', markup: true, description: 'Visual-first filing system powered by AI.' },
  { name: 'Sugar', logo: '/assets/logos/Sugar.webp', category: 'SaaS', acquired: true, description: 'Property management platform streamlining operations and resident experience.' },
  { name: 'Sundae', logo: '/assets/logos/Sundae.webp', category: 'Fintech', description: 'Marketplace for distressed property sales connecting sellers with investors.' },
  { name: 'Superplastic', logo: '/assets/logos/Superplastic.webp', category: 'Retail', description: 'Digital-first luxury brand creating synthetic celebrities and collectible art toys.' },
  { name: 'Swan', logo: '/assets/logos/Swan.webp', category: 'Fintech', markup: true, description: 'Bitcoin savings and investment platform for long-term wealth building.' },
  { name: 'Swansea City AFC', logo: '/assets/logos/Swansea City AFC.webp', category: 'Retail', description: 'Professional football club competing in the English Football League Championship.' },
  { name: 'Techmate', logo: '/assets/logos/Techmate.webp', category: 'SaaS', description: 'AI-powered technical support automation platform.' },
  { name: 'The Coffee', logo: '/assets/logos/The Coffee.webp', category: 'Retail', markup: true, description: 'Premium coffee brand focused on quality beans and innovative brewing methods.' },
  { name: 'Waldo', logo: '/assets/logos/Waldo.webp', category: 'Fintech', description: 'Next-gen fraud and compliance monitoring tools.' }
];

export const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const;