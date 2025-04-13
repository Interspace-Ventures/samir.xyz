export interface Company {
  name: string;
  logo?: string;
  category: string;
  description: string;
  markup?: boolean;
  acquired?: boolean;
}

export const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'];

export const companies: Company[] = [
  {
    name: "HealthHub",
    logo: "/logos/companies/healthhub.svg",
    category: "Health",
    description: "AI-powered health analytics platform for predictive care",
    markup: true
  },
  {
    name: "PayFlow",
    logo: "/logos/companies/payflow.svg",
    category: "Fintech",
    description: "Modern payment infrastructure for global businesses",
    markup: true
  },
  {
    name: "RetailGenius",
    logo: "/logos/companies/retailgenius.svg",
    category: "Retail",
    description: "Inventory optimization software for retail chains",
    acquired: true
  },
  {
    name: "DataSync",
    logo: "/logos/companies/datasync.svg",
    category: "SaaS",
    description: "Enterprise data synchronization platform",
    markup: true
  },
  {
    name: "CloudSecure",
    logo: "/logos/companies/cloudsecure.svg", 
    category: "SaaS",
    description: "Zero-trust security framework for cloud applications",
    markup: true
  },
  {
    name: "MediTrack",
    logo: "/logos/companies/meditrack.svg",
    category: "Health",
    description: "Medical supply chain management system",
    markup: false
  },
  {
    name: "FinanceForward",
    logo: "/logos/companies/financeforward.svg",
    category: "Fintech",
    description: "B2B financing platform for SMBs",
    markup: true
  },
  {
    name: "ShopSmart",
    logo: "/logos/companies/shopsmart.svg",
    category: "Retail",
    description: "AI shopping assistant for e-commerce",
    acquired: true
  },
  {
    name: "DevOpsNinja",
    logo: "/logos/companies/devopsninja.svg",
    category: "SaaS",
    description: "Automated CI/CD pipeline management",
    markup: true
  }
];