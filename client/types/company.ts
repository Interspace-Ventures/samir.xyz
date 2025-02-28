export type CompanyCategory = 'Health' | 'SaaS' | 'Retail' | 'Fintech';
export type CompanyTag = 'Markup' | 'Acquired' | 'IPO';

export interface Company {
  name: string;
  url: string;
  category: CompanyCategory;
  description: string;
  tag?: CompanyTag;
}

export const categories: CompanyCategory[] = ['Health', 'SaaS', 'Retail', 'Fintech'];

export const companies: Company[] = [
  {
    name: "Afar",
    url: "https://afar.io",
    category: "Health",
    description: "Remote access infrastructure"
  },
  {
    name: "AON3D",
    url: "https://aon3d.com",
    category: "SaaS",
    description: "Industrial 3D printing solutions",
    tag: "Markup"
  },
  {
    name: "Aura",
    url: "https://aura.com",
    category: "Health",
    description: "All-in-one digital security",
    tag: "Markup"
  },
  {
    name: "Backpack",
    url: "https://backpack.app",
    category: "Fintech",
    description: "Crypto wallet and exchange"
  },
  {
    name: "GEM",
    url: "https://gem.co",
    category: "Health",
    description: "Cryptocurrency investment platform",
    tag: "Markup"
  },
  {
    name: "Goodmylk",
    url: "https://goodmylk.co",
    category: "Health",
    description: "Plant-based dairy alternatives"
  },
  {
    name: "Harper",
    url: "https://harper.io",
    category: "Fintech",
    description: "Developer productivity platform"
  },
  {
    name: "Hedgehog",
    url: "https://hedgehog.app",
    category: "Health",
    description: "Automated crypto investing"
  },
  {
    name: "Juneshine",
    url: "https://juneshine.com",
    category: "Retail",
    description: "Hard kombucha and spirits",
    tag: "Markup"
  },
  {
    name: "Juno",
    url: "https://juno.finance",
    category: "Retail",
    description: "Digital banking platform"
  },
  {
    name: "Kartera",
    url: "https://kartera.finance",
    category: "Fintech",
    description: "Investment portfolio management"
  },
  {
    name: "Keep",
    url: "https://keep.network",
    category: "Fintech",
    description: "Secure, private data on public blockchains"
  },
  {
    name: "Lunar",
    url: "https://lunar.app",
    category: "Retail",
    description: "Nordic banking app"
  },
  {
    name: "Margin",
    url: "https://margin.co",
    category: "SaaS",
    description: "Trading and investment platform"
  },
  {
    name: "Maridea",
    url: "https://maridea.co",
    category: "Fintech",
    description: "AI-powered idea generation",
    tag: "Markup"
  },
  {
    name: "Metadata",
    url: "https://metadata.io",
    category: "SaaS",
    description: "AI-powered B2B marketing",
    tag: "Markup"
  },
  {
    name: "Moku",
    url: "https://moku.io",
    category: "Retail",
    description: "Cloud infrastructure optimization",
    tag: "Markup"
  },
  {
    name: "Playbook",
    url: "https://playbook.com",
    category: "Health",
    description: "Creative file management"
  },
  {
    name: "Rely",
    url: "https://rely.io",
    category: "Fintech",
    description: "Buy now, pay later solutions"
  },
  {
    name: "Restream",
    url: "https://restream.io",
    category: "SaaS",
    description: "Multi-platform streaming"
  },
  {
    name: "RPM",
    url: "https://rpm.com",
    category: "Health",
    description: "Virtual physical therapy",
    tag: "Acquired"
  },
  {
    name: "Sanzo",
    url: "https://drinksanzo.com",
    category: "Retail",
    description: "Asian-inspired sparkling water",
    tag: "Markup"
  },
  {
    name: "Soot",
    url: "https://soot.com",
    category: "SaaS",
    description: "Carbon footprint management",
    tag: "Markup"
  },
  {
    name: "Sugar",
    url: "https://sugar.app",
    category: "SaaS",
    description: "Mobile commerce platform",
    tag: "Acquired"
  },
  {
    name: "Sundae",
    url: "https://sundae.com",
    category: "Fintech",
    description: "Marketplace for distressed properties"
  },
  {
    name: "Superplastic",
    url: "https://superplastic.co",
    category: "Retail",
    description: "Digital collectibles and vinyl toys"
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
    category: "Retail",
    description: "Professional football club"
  },
  {
    name: "Techmate",
    url: "https://techmate.io",
    category: "SaaS",
    description: "Technical documentation platform"
  },
  {
    name: "The Coffee",
    url: "https://thecoffee.co",
    category: "Retail",
    description: "Specialty coffee subscription",
    tag: "Markup"
  },
  {
    name: "Waldo",
    url: "https://waldo.io",
    category: "Fintech",
    description: "Mobile app testing platform"
  }
];

// Updated metrics with the correct values provided by the user
export const portfolioMetrics = {
  totalInvestments: 32,
  markups: 13, 
  busts: 4,
  tvpi: 1.44,
  grossMultiple: 1.22,
  netMultipleNetOfCarry: 1.12,
  returnNetOfFees: 32,
  irr: 10
};