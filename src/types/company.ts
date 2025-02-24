export type CompanyCategory = 'Fintech' | 'AI' | 'Infrastructure' | 'Developer Tools' | 'Enterprise';
export type CompanyTag = 'Markup' | 'IPO' | 'Acquired' | undefined;

export interface Company {
  name: string;
  url: string;
  category: CompanyCategory;
  description: string;
  tag?: CompanyTag;
}

export const categories: CompanyCategory[] = ['Fintech', 'AI', 'Infrastructure', 'Developer Tools', 'Enterprise'];

export const companies: Company[] = [
  {
    name: "cash-app",
    url: "https://cash.app",
    category: "Fintech",
    description: "Mobile payment service",
    tag: "Markup"
  },
  {
    name: "chime",
    url: "https://www.chime.com",
    category: "Fintech",
    description: "Digital banking platform",
    tag: "Markup"
  },
  {
    name: "sift",
    url: "https://sift.com",
    category: "Enterprise",
    description: "Digital fraud prevention",
    tag: "Acquired"
  }
];

export const portfolioMetrics = {
  totalInvestments: 15,
  markups: 8,
  busts: 2,
  tvpi: 2.8,
  grossMultiple: 3.2,
  netMultipleNetOfCarry: 2.6,
  returnNetOfFees: 160,
  irr: 45
};
