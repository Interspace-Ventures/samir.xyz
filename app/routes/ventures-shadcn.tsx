import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import VenturesGridShadcn from "../ventures/ventures-grid-shadcn";
import { ventures as venturesData } from "../data/ventures";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

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

export default function VenturesShadcn() {
  const { ventures } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Ventures</h1>
        <p className="text-muted-foreground text-lg">
          Exploring new frontiers through strategic investments and partnerships
        </p>
      </header>

      <VenturesGridShadcn ventures={ventures} />

      <Card className="mt-16">
        <CardHeader>
          <CardTitle>About Our Ventures</CardTitle>
          <CardDescription>Supporting innovation across multiple domains</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              We invest in and develop innovative products and platforms that improve how we work, 
              live, and interact with technology. Our ventures span from early-stage investments 
              to established products across multiple domains.
            </p>
            <p>
              If you're working on an innovative project and looking for investment or 
              partnership opportunities, we'd love to hear from you.
            </p>
            <Button asChild className="mt-4">
              <a href="mailto:ventures@samir.xyz">Contact Us</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}