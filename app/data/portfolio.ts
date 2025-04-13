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
    name: "FinanceFlow",
    logo: "/logos/companies/financeflow.svg",
    category: "Fintech",
    description: "Automated financial management platform for small businesses.",
    markup: true
  },
  {
    name: "HealthTrack",
    logo: "/logos/companies/healthtrack.svg",
    category: "Health",
    description: "Digital health tracking platform for patients and providers.",
    markup: true
  },
  {
    name: "RetailPro",
    logo: "/logos/companies/retailpro.svg",
    category: "Retail",
    description: "Retail management and POS solution for small to medium businesses.",
    acquired: true
  },
  {
    name: "SaaSMetrics",
    logo: "/logos/companies/saasmetrics.svg",
    category: "SaaS",
    description: "Analytics solution for SaaS companies to track KPIs and growth metrics."
  },
  {
    name: "PaymentGate",
    logo: "/logos/companies/paymentgate.svg",
    category: "Fintech",
    description: "Secure payment processing gateway for international transactions.",
    markup: true
  },
  {
    name: "HealthAI",
    logo: "/logos/companies/healthai.svg",
    category: "Health",
    description: "AI-powered diagnostic assistant for healthcare providers.",
    markup: true
  },
  {
    name: "RetailInsight",
    logo: "/logos/companies/retailinsight.svg",
    category: "Retail",
    description: "Customer analytics platform for retail businesses."
  },
  {
    name: "CloudManage",
    logo: "/logos/companies/cloudmanage.svg",
    category: "SaaS",
    description: "Cloud infrastructure management and optimization tool.",
    markup: true
  },
  {
    name: "CryptoTrade",
    logo: "/logos/companies/cryptotrade.svg",
    category: "Fintech",
    description: "Cryptocurrency trading and portfolio management platform.",
    markup: true
  },
  {
    name: "MedSchedule",
    logo: "/logos/companies/medschedule.svg",
    category: "Health",
    description: "Appointment scheduling system for medical practices."
  },
  {
    name: "InventoryPlus",
    logo: "/logos/companies/inventoryplus.svg",
    category: "Retail",
    description: "Inventory management system with predictive ordering capabilities.",
    acquired: true
  },
  {
    name: "DataSyncPro",
    logo: "/logos/companies/datasyncpro.svg",
    category: "SaaS",
    description: "Data synchronization and integration platform for enterprise applications.",
    markup: true
  }
];