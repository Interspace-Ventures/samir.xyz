import type { MetaFunction } from "@remix-run/node";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Ventures - Samir's Investments" },
    { name: "description", content: "Explore Samir's venture investments and entrepreneurial projects." },
  ];
};

// Venture data
const ventures = [
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

// Investment criteria data
const investmentCriteria = [
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

export default function Ventures() {
  // Function to determine badge background color
  const getBadgeColor = (color: string) => {
    const colors = {
      green: "bg-green-100 text-green-800",
      blue: "bg-blue-100 text-blue-800",
      purple: "bg-purple-100 text-purple-800",
      amber: "bg-amber-100 text-amber-800"
    };
    return colors[color as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Ventures</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            I'm actively building and investing in ventures at the intersection of finance and 
            technology. These are the projects I'm currently involved with as founder or investor.
          </p>
        </header>

        {/* Ventures Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Current Ventures</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ventures.map((venture, index) => (
              <Card key={index} className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between mb-1">
                    <CardTitle className="text-xl">{venture.name}</CardTitle>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(venture.stageColor)}`}>
                      {venture.stage}
                    </span>
                  </div>
                  <CardDescription className="text-gray-700">{venture.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {venture.metrics.map((metric, mIndex) => (
                      <div key={mIndex} className="text-center">
                        <p className="text-2xl font-bold text-indigo-700">{metric.value}</p>
                        <p className="text-sm text-gray-500">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Investment Criteria */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Investment Criteria</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investmentCriteria.map((criteria, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-700">{criteria.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {criteria.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="mr-2 text-green-500 mt-0.5">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}