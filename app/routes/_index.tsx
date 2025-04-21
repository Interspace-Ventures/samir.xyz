import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio - Home" },
    { name: "description", content: "A developer productivity portfolio website" },
  ];
};

// Loader function to load data for this route
export async function loader() {
  // Here you would typically fetch data from a database or API
  // For now, we'll return a simple object
  return json({
    featuredProjects: [
      { id: 1, name: "Project Alpha", description: "A cutting-edge development tool" },
      { id: 2, name: "Project Beta", description: "Streamlined workflow automation" },
      { id: 3, name: "Project Gamma", description: "Developer productivity suite" },
    ],
  });
}

export default function Index() {
  const { featuredProjects } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Developer Portfolio</h1>
        <p className="text-xl text-gray-600">
          A showcase of innovative projects and development tools
        </p>
      </header>

      <nav className="flex justify-center space-x-6 mb-12">
        <Link to="/" className="text-primary font-medium hover:underline">
          Home
        </Link>
        <Link to="/portfolio" className="text-gray-600 hover:text-primary hover:underline">
          Portfolio
        </Link>
        <Link to="/ventures" className="text-gray-600 hover:text-primary hover:underline">
          Ventures
        </Link>
        <Link to="/profile" className="text-gray-600 hover:text-primary hover:underline">
          Profile
        </Link>
      </nav>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div key={project.id} className="card p-6">
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <button className="btn btn-primary">View Project</button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">About This Project</h2>
        <p className="text-gray-700 mb-4">
          This portfolio website is built with Remix, React, TypeScript, and Tailwind CSS.
          It showcases a collection of projects and developer tools designed to improve
          productivity and enhance the development experience.
        </p>
        <p className="text-gray-700">
          Explore the different sections to learn more about our work and approach
          to software development.
        </p>
      </section>
    </div>
  );
}