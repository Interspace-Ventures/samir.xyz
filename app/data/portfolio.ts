export interface Company {
  name: string;
  logo?: string;
  category: string;
  description: string;
  markup?: boolean;
  acquired?: boolean;
}

// Define available categories for filtering
export const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'];

// Company data for portfolio
export const companies: Company[] = [
  {
    name: "Afar",
    logo: "/logos/companies/Afar.png",
    category: "Fintech",
    description: "Modern travel experience platform for explorers.",
    markup: true
  },
  {
    name: "AON3D",
    logo: "/logos/companies/AON3D.png",
    category: "Health",
    description: "Industrial 3D printing solutions for high-performance parts.",
    markup: true
  },
  {
    name: "Aura",
    logo: "/logos/companies/Aura.png",
    category: "SaaS",
    description: "Digital security that protects you and your family.",
    acquired: true
  },
  {
    name: "Backpack",
    logo: "/logos/companies/Backpack.png",
    category: "SaaS",
    description: "All-in-one travel planning and booking platform."
  },
  {
    name: "Goodmylk",
    logo: "/logos/companies/Goodmylk.png",
    category: "Health",
    description: "Plant-based dairy alternatives with clean ingredients.",
    markup: true
  },
  {
    name: "Harper",
    logo: "/logos/companies/Harper.png",
    category: "Health",
    description: "Personalized holistic wellness platform.",
    markup: true
  },
  {
    name: "Juneshine",
    logo: "/logos/companies/Juneshine.png",
    category: "Retail",
    description: "Organic hard kombucha beverages with clean ingredients."
  },
  {
    name: "Kartera",
    logo: "/logos/companies/Kartera.png",
    category: "SaaS",
    description: "Digital asset management platform for enterprises.",
    markup: true
  },
  {
    name: "Keep",
    logo: "/logos/companies/Keep.png",
    category: "Fintech",
    description: "Cryptocurrency security and management solution.",
    markup: true
  },
  {
    name: "Restream",
    logo: "/logos/companies/Restream.png",
    category: "SaaS",
    description: "Multi-platform live streaming solution for creators."
  },
  {
    name: "Sanzo",
    logo: "/logos/companies/Sanzo.png",
    category: "Retail",
    description: "Asian-inspired sparkling water with real fruit.",
    acquired: true
  },
  {
    name: "Superplastic",
    logo: "/logos/companies/Superplastic.png",
    category: "Retail",
    description: "Digital and physical collectibles, art, and entertainment.",
    markup: true
  }
];