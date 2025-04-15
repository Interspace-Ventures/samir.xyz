import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { companies } from "../data/portfolio";
import { ventures } from "../data/ventures";

export const meta: MetaFunction = () => {
  return [
    { title: "Samir.xyz - Home" },
    { name: "description", content: "Portfolio and ventures by Samir" },
  ];
};

// Loader function to load data for this route
export async function loader() {
  // Use actual data from our portfolio and ventures
  return json({
    // Get the top 3 companies by categories for featured items
    featuredCompanies: companies.slice(0, 3),
    // Get priority ventures
    featuredVentures: ventures.filter(v => v.priority).slice(0, 2)
  });
}

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Samir's Portfolio</h1>
        <p className="text-xl text-muted-foreground">
          Investments, ventures, and projects
        </p>
      </header>

      <nav className="flex justify-center space-x-6 mb-12">
        <Link to="/" className="text-primary font-medium hover:underline">
          Home
        </Link>
        <Link to="/portfolio" className="text-muted-foreground hover:text-primary hover:underline">
          Portfolio
        </Link>
        <Link to="/ventures" className="text-muted-foreground hover:text-primary hover:underline">
          Ventures
        </Link>
        <Link to="/profile" className="text-muted-foreground hover:text-primary hover:underline">
          Profile
        </Link>
      </nav>

      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Sections</h2>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
            <Button asChild>
              <Link to="/ventures">Explore Ventures</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>Companies and investments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Browse through the collection of companies in various sectors including Fintech, Health, Retail, and SaaS.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <Link to="/portfolio">View Portfolio</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ventures</CardTitle>
              <CardDescription>Strategic investments and partnerships</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Discover innovative ventures exploring new frontiers in technology and business.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <Link to="/ventures">Explore Ventures</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This portfolio website showcases investments, ventures and projects across multiple sectors.
            Browse through the different sections to learn more about our work and approach.
          </p>
          <p>
            Built with Remix, React, TypeScript, and Tailwind CSS with shadcn/ui components.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}