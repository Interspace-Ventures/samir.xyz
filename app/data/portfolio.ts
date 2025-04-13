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
    name: "FinanceForward",
    logo: "/logos/companies/financeforward.svg",
    category: "Fintech",
    description: "Automated financial management platform for small businesses.",
    markup: true
  },
  {
    name: "MediTrack",
    logo: "/logos/companies/meditrack.svg",
    category: "Health",
    description: "Digital health tracking platform for patients and providers.",
    markup: true
  },
  {
    name: "RetailGenius",
    logo: "/logos/companies/retailgenius.svg",
    category: "Retail",
    description: "Retail management and POS solution for small to medium businesses.",
    acquired: true
  },
  {
    name: "DevOpsNinja",
    logo: "/logos/companies/devopsninja.svg",
    category: "SaaS",
    description: "Analytics solution for SaaS companies to track KPIs and growth metrics."
  },
  {
    name: "PayFlow",
    logo: "/logos/companies/payflow.svg",
    category: "Fintech",
    description: "Secure payment processing gateway for international transactions.",
    markup: true
  },
  {
    name: "HealthHub",
    logo: "/logos/companies/healthhub.svg",
    category: "Health",
    description: "AI-powered diagnostic assistant for healthcare providers.",
    markup: true
  },
  {
    name: "ShopSmart",
    logo: "/logos/companies/shopsmart.svg",
    category: "Retail",
    description: "Customer analytics platform for retail businesses."
  },
  {
    name: "CloudSecure",
    logo: "/logos/companies/cloudsecure.svg",
    category: "SaaS",
    description: "Cloud infrastructure management and optimization tool.",
    markup: true
  },
  {
    name: "PayFlow Crypto",
    logo: "/logos/companies/payflow.svg",
    category: "Fintech",
    description: "Cryptocurrency trading and portfolio management platform.",
    markup: true
  },
  {
    name: "MediTrack Pro",
    logo: "/logos/companies/meditrack.svg",
    category: "Health",
    description: "Appointment scheduling system for medical practices."
  },
  {
    name: "RetailGenius Plus",
    logo: "/logos/companies/retailgenius.svg",
    category: "Retail",
    description: "Inventory management system with predictive ordering capabilities.",
    acquired: true
  },
  {
    name: "DataSync",
    logo: "/logos/companies/datasync.svg",
    category: "SaaS",
    description: "Data synchronization and integration platform for enterprise applications.",
    markup: true
  }
];