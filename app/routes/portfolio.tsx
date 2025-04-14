import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio - Projects" },
    { name: "description", content: "View our portfolio of developer tools and projects" },
  ];
};

// Loader function to load data for this route
export async function loader() {
  // Here you would typically fetch data from a database or API
  return json({
    projects: [
      { 
        id: 1, 
        name: "Developer Toolkit", 
        category: "Productivity",
        description: "A comprehensive suite of tools for modern web development" 
      },
      { 
        id: 2, 
        name: "Code Analytics", 
        category: "Analytics",
        description: "Real-time code quality and performance analytics" 
      },
      { 
        id: 3, 
        name: "API Manager", 
        category: "Backend",
        description: "Streamlined API development and management platform" 
      },
      { 
        id: 4, 
        name: "UI Component Library", 
        category: "Frontend",
        description: "Customizable and accessible UI components for web apps" 
      },
      { 
        id: 5, 
        name: "Cloud Deployment Tool", 
        category: "DevOps",
        description: "Simplified cloud deployment for web applications" 
      },
      { 
        id: 6, 
        name: "Data Visualization Kit", 
        category: "Frontend",
        description: "Interactive data visualization components and charts" 
      },
    ],
    categories: ["All", "Productivity", "Analytics", "Backend", "Frontend", "DevOps"]
  });
}

export default function Portfolio() {
  const { projects, categories } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Project Portfolio</h1>
        <p className="text-gray-600">
          Explore our collection of developer tools and projects
        </p>
      </header>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm font-medium"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full mb-2">
                {project.category}
              </span>
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <button className="btn btn-primary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}