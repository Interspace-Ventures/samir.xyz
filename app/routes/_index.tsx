import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Samir's Portfolio - Home" },
    { name: "description", content: "Welcome to Samir's professional portfolio showcasing expertise in finance and technology." },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Venture Capital & Technology</h1>
            <p className="text-xl mb-8">
              Building and investing in the next generation of groundbreaking companies.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/portfolio" className="inline-flex">
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-white text-indigo-800 hover:bg-gray-100"
                >
                  View Portfolio
                </Button>
              </Link>
              <Link to="/ventures" className="inline-flex">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Our Ventures
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-indigo-700">32</p>
                <p className="text-gray-600 mt-2">Investments</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-indigo-700">$42M</p>
                <p className="text-gray-600 mt-2">Capital Deployed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-indigo-700">13</p>
                <p className="text-gray-600 mt-2">Markups</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-indigo-700">1.44x</p>
                <p className="text-gray-600 mt-2">TVPI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Investments</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "FinanceForward",
                  category: "Fintech",
                  description: "Automated financial management platform for small businesses.",
                  imagePath: "/logos/companies/financeforward.svg"
                },
                {
                  title: "HealthHub",
                  category: "Health",
                  description: "Digital health tracking platform for patients and providers.",
                  imagePath: "/logos/companies/healthhub.svg"
                },
                {
                  title: "RetailGenius",
                  category: "Retail",
                  description: "Retail management and POS solution for small to medium businesses.",
                  imagePath: "/logos/companies/retailgenius.svg"
                }
              ].map((project, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                  <div className="aspect-[3/2] bg-gray-50 flex items-center justify-center p-6">
                    <img 
                      src={project.imagePath} 
                      alt={`${project.title} logo`}
                      className="max-w-[80%] max-h-[80%] object-contain"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{project.title}</CardTitle>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {project.category}
                      </span>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link to="/portfolio" className="inline-flex">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/portfolio" className="inline-flex">
                <Button variant="default" className="bg-indigo-700 hover:bg-indigo-800">
                  View All Investments
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}