export interface Venture {
  name: string;
  description: string;
  image: string;
  link: string;
  priority?: boolean;
  stage?: string;
}

// Venture data for ventures page
export const ventures: Venture[] = [
  // Original ventures
  {
    name: "Future Fund",
    description: "Early-stage investment fund focused on disruptive technologies and AI-driven startups.",
    image: "/assets/ventures/future-fund.png",
    link: "/ventures/future-fund",
    priority: true
  },
  {
    name: "Tech Accelerator",
    description: "Startup accelerator program providing mentorship, resources, and funding for early-stage tech companies.",
    image: "/assets/ventures/tech-accelerator.png",
    link: "/ventures/tech-accelerator",
    priority: true
  },
  {
    name: "Innovation Lab",
    description: "Research and development lab exploring frontier technologies and next-generation solutions.",
    image: "/assets/ventures/innovation-lab.png",
    link: "/ventures/innovation-lab"
  },
  {
    name: "Founders Network",
    description: "Global community of tech entrepreneurs sharing knowledge and resources.",
    image: "/assets/ventures/founders-network.png",
    link: "/ventures/founders-network"
  },
  {
    name: "Digital Ventures Studio",
    description: "Studio building and scaling digital products for the future of work, health, and finance.",
    image: "/assets/ventures/digital-ventures.png",
    link: "/ventures/digital-ventures-studio"
  },
  {
    name: "Climate Tech Fund",
    description: "Investment fund focusing on technologies addressing climate change and sustainability.",
    image: "/assets/ventures/climate-tech.png",
    link: "/ventures/climate-tech-fund"
  },
  
  // Additional ventures from src directory
  {
    name: "Fintech Innovation Lab",
    description: "Incubating next-generation financial technology startups.",
    image: "/assets/ventures/fintech-innovation-lab.png",
    link: "/ventures/fintech-innovation-lab",
    stage: "Early Stage"
  },
  {
    name: "Digital Banking Platform",
    description: "Building accessible digital banking tools for everyone.",
    image: "/assets/ventures/digital-banking-platform.png",
    link: "/ventures/digital-banking-platform",
    stage: "Growth"
  },
  {
    name: "Blockchain Solutions",
    description: "Exploring blockchain applications for financial services.",
    image: "/assets/ventures/blockchain-solutions.png",
    link: "/ventures/blockchain-solutions",
    stage: "Research"
  }
];