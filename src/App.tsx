import React from 'react';
import { Card, CardContent } from "./components/ui/card";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-20">
          <h1 className="text-4xl font-bold text-foreground mb-4" tabIndex={0}>
            Portfolio
          </h1>
          <p className="text-lg text-muted-foreground mb-8" tabIndex={0}>
            Welcome to my portfolio website. I advise and invest in ambitious teams building innovative products.
          </p>
        </section>

        {/* Portfolio Grid */}
        <section aria-labelledby="portfolio-heading">
          <h2 id="portfolio-heading" className="text-3xl font-bold mb-6 text-foreground">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'AFAR', description: 'Travel and lifestyle platform' },
              { name: 'AON3D', description: '3D printing solutions' },
              { name: 'AURA', description: 'Digital security platform' },
            ].map((project) => (
              <Card key={project.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;