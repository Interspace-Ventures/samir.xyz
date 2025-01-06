import React from 'react';
import { Card } from "../components/ui/card";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <section id="portfolio" className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Portfolio</h2>
          <p className="mb-8 text-muted-foreground">
            I advise and invest in ambitious teams building innovative products who focus on unit economics optimized business models.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'afar',
              'aon3d',
              'aura',
              'backpack',
              'caliber',
              'gem'
            ].map((company) => (
              <Card key={company} className="p-4 hover:shadow-lg transition-shadow">
                <img 
                  src={`/assets/${company}.png`} 
                  alt={company.toUpperCase()} 
                  className="w-32 mx-auto mb-4"
                />
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;