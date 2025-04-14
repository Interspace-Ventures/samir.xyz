/**
 * Ventures Data Configuration
 * 
 * This file contains structured data for the Ventures page, including:
 * - Venture projects (with logos, descriptions, and links)
 * - Investment ventures (with metrics and stage information)
 * - Investment criteria for potential investments
 * 
 * All data is exported from this central location to ensure consistency
 * across the application.
 */

export interface Venture {
  name: string;
  description: string;
  imagePath: string;
  link: string;
  priority?: boolean;
}

export interface InvestmentVenture {
  name: string;
  stage: string;
  stageColor: string;
  description: string;
  metrics: Array<{label: string, value: string}>;
}

// Venture data for the ventures page
export const ventures: Venture[] = [
  {
    name: "2 Days Early",
    description: "Early access to innovative products and services.",
    imagePath: "/assets/ventures/2de-interspace.png",
    link: "https://2daysearly.com",
    priority: true
  },
  {
    name: "Solo",
    description: "Design-forward climbing app for tracking and sharing routes.",
    imagePath: "/assets/ventures/solo-wordmark---gradient-2025.png",
    link: "https://soloclimbing.com"
  },
  {
    name: "Predictive:film",
    description: "AI-powered script analysis for screenwriters and studios.",
    imagePath: "/assets/ventures/predictive.film-icon-2025.png",
    link: "https://predictive.film",
    priority: true
  },
  {
    name: "Interspace",
    description: "Digital product studio focused on innovative solutions.",
    imagePath: "/assets/ventures/interspace.png",
    link: "https://interspace.sh",
    priority: true
  },
  {
    name: "Hey I'm Samir",
    description: "Personal website showcasing professional expertise.",
    imagePath: "/assets/ventures/hey-im-samir.png",
    link: "https://heyimsamir.com"
  },
  {
    name: "Perspectives",
    description: "Insights on tech and finance through analysis and interviews.",
    imagePath: "/assets/ventures/perspectives.png",
    link: "https://perspectives.fyi"
  }
];

// Venture categories (if we implement filtering in the future)
export const ventureCategories = [
  'All',
  'Fintech',
  'Design',
  'Media',
  'Technology'
];

// Investment criteria data
export interface InvestmentCriteria {
  category: string;
  items: string[];
}

export const investmentCriteria: InvestmentCriteria[] = [
  {
    category: "Business Model",
    items: [
      "Subscription or transaction-based revenue",
      "Clear path to profitability",
      "Scalable with reasonable CAC"
    ]
  },
  {
    category: "Team",
    items: [
      "Domain expertise in finance or technology",
      "Strong technical co-founder",
      "Previous startup experience preferred"
    ]
  },
  {
    category: "Market",
    items: [
      "TAM > $1B",
      "Growing market segment",
      "Clear competitive advantage"
    ]
  }
];

// Investment ventures data
export const investmentVentures: InvestmentVenture[] = [
  {
    name: "Fintech Accelerator",
    stage: "Active",
    stageColor: "green",
    description: "An accelerator program focused on helping early-stage fintech startups gain traction and secure funding. Currently supporting 12 companies through their growth journey.",
    metrics: [
      { label: "Companies", value: "12" },
      { label: "Investments", value: "$3.6M" },
      { label: "Success Rate", value: "73%" }
    ]
  },
  {
    name: "Banking API Platform",
    stage: "Seed Stage",
    stageColor: "blue",
    description: "A platform that provides banking APIs for developers to build and embed financial services into their applications. Currently in development with beta testing scheduled for Q3.",
    metrics: [
      { label: "Team Size", value: "8" },
      { label: "Funding", value: "$2.1M" },
      { label: "Partners", value: "4" }
    ]
  },
  {
    name: "Financial Education Initiative",
    stage: "Launched",
    stageColor: "purple",
    description: "A non-profit initiative to improve financial literacy through free educational resources and workshops targeted at underserved communities.",
    metrics: [
      { label: "Workshops", value: "45" },
      { label: "Participants", value: "780+" },
      { label: "NPS", value: "92" }
    ]
  },
  {
    name: "Crypto Payment Gateway",
    stage: "In Development",
    stageColor: "amber",
    description: "A payment gateway that enables businesses to accept cryptocurrencies as payment with seamless conversion to fiat currencies.",
    metrics: [
      { label: "Beta Testers", value: "14" },
      { label: "Currencies", value: "8" },
      { label: "Transactions", value: "$56K" }
    ]
  }
];