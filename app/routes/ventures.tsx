import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import VenturesGrid from "../ventures/ventures-grid";
import { ventures as venturesData } from "../config/data/ventures";

export const meta: MetaFunction = () => {
  return [
    { title: "samir.xyz - Ventures" },
    { name: "description", content: "Explore our latest ventures and investments" },
  ];
};

// Loader function to load data for this route
export async function loader() {
  return json({
    ventures: venturesData
  });
}

export default function Ventures() {
  const { ventures } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Ventures</h1>
        <p className="text-gray-600">
          Exploring new frontiers through strategic investments and partnerships
        </p>
      </header>

      <VenturesGrid ventures={ventures} />

      <div className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">About Our Ventures</h2>
        <p className="text-gray-700 mb-4">
          We invest in and develop innovative products and platforms that improve how we work, 
          live, and interact with technology. Our ventures span from early-stage investments 
          to established products across multiple domains.
        </p>
        <p className="text-gray-700">
          If you're working on an innovative project and looking for investment or 
          partnership opportunities, we'd love to hear from you.
        </p>
        <a 
          href="mailto:ventures@samir.xyz" 
          className="inline-block mt-6 px-6 py-3 bg-purple-700 text-white font-medium rounded-lg 
                      hover:bg-purple-800 transition-colors duration-200"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}