export interface Company {
  name: string;
  logo?: string;
  category: string;
  description: string;
  markup?: boolean;
  acquired?: boolean;
  website?: string;
}

// Define available categories for filtering
export const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'];

// Company data for portfolio
export const companies: Company[] = [
  // Original companies
  {
    name: "Afar",
    logo: "/assets/companies/afar.png",
    category: "Fintech",
    description: "Modern travel experience platform for explorers.",
    markup: true,
    website: "https://www.afar.com"
  },
  {
    name: "AON3D",
    logo: "/assets/companies/aon3d.png",
    category: "Health",
    description: "Industrial 3D printing solutions for high-performance parts.",
    markup: true,
    website: "https://www.aon3d.com"
  },
  {
    name: "Aura",
    logo: "/assets/companies/aura.png",
    category: "SaaS",
    description: "Digital security that protects you and your family.",
    acquired: true,
    website: "https://www.aura.com"
  },
  {
    name: "Backpack",
    logo: "/assets/companies/backpack.png",
    category: "SaaS",
    description: "All-in-one travel planning and booking platform.",
    website: "https://www.backpackapp.io"
  },
  {
    name: "Goodmylk",
    logo: "/assets/companies/goodmylk.png",
    category: "Health",
    description: "Plant-based dairy alternatives with clean ingredients.",
    markup: true,
    website: "https://www.goodmylk.co"
  },
  {
    name: "Harper",
    logo: "/assets/companies/harper.png",
    category: "Health",
    description: "Personalized holistic wellness platform.",
    markup: true,
    website: "https://www.harperhealth.io"
  },
  {
    name: "Juneshine",
    logo: "/assets/companies/juneshine.png",
    category: "Retail",
    description: "Organic hard kombucha beverages with clean ingredients.",
    website: "https://www.juneshine.com"
  },
  {
    name: "Kartera",
    logo: "/assets/companies/kartera.png",
    category: "SaaS",
    description: "Digital asset management platform for enterprises.",
    markup: true,
    website: "https://www.kartera.io"
  },
  {
    name: "Keep",
    logo: "/assets/companies/keep.png",
    category: "Fintech",
    description: "Cryptocurrency security and management solution.",
    markup: true,
    website: "https://www.keep.network"
  },
  {
    name: "Restream",
    logo: "/assets/companies/restream.png",
    category: "SaaS",
    description: "Multi-platform live streaming solution for creators.",
    website: "https://www.restream.io"
  },
  {
    name: "Sanzo",
    logo: "/assets/companies/sanzo.png",
    category: "Retail",
    description: "Asian-inspired sparkling water with real fruit.",
    acquired: true,
    website: "https://www.drinksanzo.com"
  },
  {
    name: "Superplastic",
    logo: "/assets/companies/superplastic.png",
    category: "Retail",
    description: "Digital and physical collectibles, art, and entertainment.",
    markup: true,
    website: "https://www.superplastic.co"
  },
  
  // Additional companies from src directory
  {
    name: "HealthHub",
    logo: "/assets/companies/healthhub.png", // Updated path
    category: "Health",
    description: "AI-powered health analytics platform for predictive care",
    markup: true,
    website: "https://www.healthhub.ai"
  },
  {
    name: "PayFlow",
    logo: "/assets/companies/payflow.png", // Updated path
    category: "Fintech",
    description: "Modern payment infrastructure for global businesses",
    markup: true,
    website: "https://www.payflow.io"
  },
  {
    name: "RetailGenius",
    logo: "/assets/companies/retailgenius.png", // Updated path
    category: "Retail",
    description: "Inventory optimization software for retail chains",
    acquired: true,
    website: "https://www.retailgenius.com"
  },
  {
    name: "DataSync",
    logo: "/assets/companies/datasync.png", // Updated path
    category: "SaaS",
    description: "Enterprise data synchronization platform",
    markup: true,
    website: "https://www.datasync.dev"
  },
  {
    name: "CloudSecure",
    logo: "/assets/companies/cloudsecure.png", // Updated path
    category: "SaaS",
    description: "Zero-trust security framework for cloud applications",
    markup: true,
    website: "https://www.cloudsecure.io"
  },
  {
    name: "MediTrack",
    logo: "/assets/companies/meditrack.png", // Updated path
    category: "Health",
    description: "Medical supply chain management system",
    website: "https://www.meditrack.health"
  },
  {
    name: "FinanceForward",
    logo: "/assets/companies/financeforward.png", // Updated path
    category: "Fintech",
    description: "B2B financing platform for SMBs",
    markup: true,
    website: "https://www.financeforward.com"
  },
  {
    name: "ShopSmart",
    logo: "/assets/companies/shopsmart.png", // Updated path
    category: "Retail",
    description: "AI shopping assistant for e-commerce",
    acquired: true,
    website: "https://www.shopsmart.ai"
  },
  {
    name: "DevOpsNinja",
    logo: "/assets/companies/devopsninja.png", // Updated path
    category: "SaaS",
    description: "Automated CI/CD pipeline management",
    markup: true,
    website: "https://www.devopsninja.dev"
  }
];