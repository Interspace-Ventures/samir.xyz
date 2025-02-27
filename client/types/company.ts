export type CompanyCategory = 'Fintech' | 'AI' | 'Infrastructure' | 'Developer Tools' | 'Enterprise' | 'Crypto' | 'Commerce' | 'Health';
export type CompanyTag = 'Markup' | 'IPO' | 'Acquired' | undefined;

export interface Company {
  name: string;
  url: string;
  category: CompanyCategory;
  description: string;
  tag?: CompanyTag;
}

export const categories: CompanyCategory[] = ['Fintech', 'AI', 'Infrastructure', 'Developer Tools', 'Enterprise', 'Crypto', 'Commerce', 'Health'];

export const companies: Company[] = [
  {
    name: "Afar",
    url: "https://afar.io",
    category: "Infrastructure",
    description: "Remote access infrastructure",
    tag: "Markup"
  },
  {
    name: "AON3D",
    url: "https://aon3d.com",
    category: "Enterprise",
    description: "Industrial 3D printing solutions",
    tag: "Markup"
  },
  {
    name: "Aura",
    url: "https://aura.com",
    category: "Fintech",
    description: "All-in-one digital security",
    tag: "Markup"
  },
  {
    name: "Backpack",
    url: "https://backpack.app",
    category: "Crypto",
    description: "Crypto wallet and exchange",
    tag: "Markup"
  },
  {
    name: "CaliberX",
    url: "https://caliberx.com",
    category: "Fintech",
    description: "Financial optimization platform",
    tag: "Markup"
  },
  {
    name: "GEM",
    url: "https://gem.co",
    category: "Crypto",
    description: "Cryptocurrency investment platform",
    tag: "Markup"
  },
  {
    name: "Goodmylk",
    url: "https://goodmylk.co",
    category: "Health",
    description: "Plant-based dairy alternatives",
    tag: "Markup"
  },
  {
    name: "Harper",
    url: "https://harper.io",
    category: "Developer Tools",
    description: "Developer productivity platform",
    tag: "Acquired"
  },
  {
    name: "Hedgehog",
    url: "https://hedgehog.app",
    category: "Crypto",
    description: "Automated crypto investing",
    tag: "Markup"
  },
  {
    name: "Juneshine",
    url: "https://juneshine.com",
    category: "Health",
    description: "Hard kombucha and spirits",
    tag: "Markup" 
  },
  {
    name: "Juno",
    url: "https://juno.finance",
    category: "Fintech",
    description: "Digital banking platform",
    tag: "Markup"
  },
  {
    name: "Kartera",
    url: "https://kartera.finance",
    category: "Fintech",
    description: "Investment portfolio management",
    tag: "Markup"
  },
  {
    name: "Keep",
    url: "https://keep.network",
    category: "Crypto",
    description: "Secure, private data on public blockchains",
    tag: "Markup"
  },
  {
    name: "Launchpad",
    url: "https://launchpad.xyz",
    category: "Developer Tools",
    description: "Developer workflow optimization",
    tag: "Acquired"
  },
  {
    name: "Lunar",
    url: "https://lunar.app",
    category: "Fintech",
    description: "Nordic banking app",
    tag: "Markup"
  },
  {
    name: "Margin",
    url: "https://margin.co",
    category: "Fintech",
    description: "Trading and investment platform",
    tag: "Markup"
  },
  {
    name: "Maridea",
    url: "https://maridea.co",
    category: "Enterprise",
    description: "AI-powered idea generation",
    tag: "Markup"
  },
  {
    name: "Metadata",
    url: "https://metadata.io",
    category: "AI",
    description: "AI-powered B2B marketing",
    tag: "Markup"
  },
  {
    name: "Moku",
    url: "https://moku.io",
    category: "Infrastructure",
    description: "Cloud infrastructure optimization",
    tag: "Acquired"
  },
  {
    name: "Playbook",
    url: "https://playbook.com",
    category: "Enterprise",
    description: "Creative file management",
    tag: "Markup"
  },
  {
    name: "Rely",
    url: "https://rely.io",
    category: "Fintech",
    description: "Buy now, pay later solutions",
    tag: "Acquired"
  },
  {
    name: "Restream",
    url: "https://restream.io",
    category: "Infrastructure",
    description: "Multi-platform streaming",
    tag: "Markup"
  },
  {
    name: "RPM",
    url: "https://rpm.com",
    category: "Health",
    description: "Virtual physical therapy",
    tag: "Markup" 
  },
  {
    name: "Sanzo",
    url: "https://drinksanzo.com",
    category: "Commerce",
    description: "Asian-inspired sparkling water",
    tag: "Markup"
  },
  {
    name: "Soot",
    url: "https://soot.com",
    category: "Enterprise",
    description: "Carbon footprint management",
    tag: "Markup"
  },
  {
    name: "Sugar",
    url: "https://sugar.app",
    category: "Commerce",
    description: "Mobile commerce platform",
    tag: "Markup"
  },
  {
    name: "Sundae",
    url: "https://sundae.com",
    category: "Commerce",
    description: "Marketplace for distressed properties",
    tag: "Markup"
  },
  {
    name: "Superplastic",
    url: "https://superplastic.co",
    category: "Commerce",
    description: "Digital collectibles and vinyl toys",
    tag: "Markup"
  },
  {
    name: "Swan",
    url: "https://swan.io",
    category: "Fintech",
    description: "Banking-as-a-service platform",
    tag: "Markup"
  },
  {
    name: "Swansea City AFC",
    url: "https://swanseacity.com",
    category: "Enterprise",
    description: "Professional football club",
    tag: "Acquired"
  },
  {
    name: "Techmate",
    url: "https://techmate.io",
    category: "Developer Tools",
    description: "Technical documentation platform",
    tag: "Markup"
  },
  {
    name: "The Coffee",
    url: "https://thecoffee.co",
    category: "Commerce",
    description: "Specialty coffee subscription",
    tag: "Markup"
  },
  {
    name: "The Food Company",
    url: "https://thefoodcompany.com",
    category: "Commerce",
    description: "Sustainable food production",
    tag: "Markup" 
  },
  {
    name: "Waldo",
    url: "https://waldo.io",
    category: "Developer Tools",
    description: "Mobile app testing platform",
    tag: "Markup"
  }
];

// Updated metrics with correctly counted markups
export const portfolioMetrics = {
  totalInvestments: 34,
  markups: 28, 
  busts: 3,
  tvpi: 2.8,
  grossMultiple: 3.2,
  netMultipleNetOfCarry: 2.6,
  returnNetOfFees: 160,
  irr: 45
};