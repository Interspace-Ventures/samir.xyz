import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio - Ventures" },
    { name: "description", content: "Explore our latest ventures and investments" },
  ];
};

// Loader function to load data for this route
export async function loader() {
  // Here you would typically fetch data from a database or API
  return json({
    ventures: [
      { 
        id: 1, 
        name: "CodeFund", 
        status: "Active",
        description: "Funding platform for open source projects and developers",
        logoUrl: "/assets/logos/venture-1.svg"
      },
      { 
        id: 2, 
        name: "DevStack", 
        status: "Active",
        description: "Full-stack development environment for collaborative teams",
        logoUrl: "/assets/logos/venture-2.svg"
      },
      { 
        id: 3, 
        name: "AITools", 
        status: "Early Stage",
        description: "AI-powered development tools for modern applications",
        logoUrl: "/assets/logos/venture-3.svg"
      },
      { 
        id: 4, 
        name: "CloudNative", 
        status: "Active",
        description: "Cloud-native application development platform",
        logoUrl: "/assets/logos/venture-4.svg"
      },
      { 
        id: 5, 
        name: "EdTech Hub", 
        status: "Research",
        description: "Educational technology for teaching coding and development",
        logoUrl: "/assets/logos/venture-5.svg"
      },
      { 
        id: 6, 
        name: "DevSecOps", 
        status: "Growth",
        description: "Security-focused DevOps platform for enterprise",
        logoUrl: "/assets/logos/venture-6.svg"
      },
    ],
  });
}

export default function Ventures() {
  const { ventures } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Our Ventures</h1>
        <p className="text-gray-600">
          Explore our portfolio of ventures and investments in the developer tools space
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ventures.map((venture) => (
          <div key={venture.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                {/* Fallback for logo */}
                <span className="text-xl font-bold text-primary">
                  {venture.name.charAt(0)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{venture.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  venture.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {venture.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{venture.description}</p>
              <button className="btn btn-outline w-full">Learn More</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">About Our Ventures</h2>
        <p className="text-gray-700 mb-4">
          We invest in and develop innovative tools and platforms that improve developer 
          productivity and enhance the software development ecosystem. Our ventures span 
          from early-stage investments to established products.
        </p>
        <p className="text-gray-700">
          If you're working on a developer tools project and looking for investment or 
          partnership opportunities, we'd love to hear from you.
        </p>
        <button className="btn btn-primary mt-6">Contact Us</button>
      </div>
    </div>
  );
}