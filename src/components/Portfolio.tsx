import React from 'react';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <section id="portfolio" className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Portfolio</h2>
          <p className="mb-8 text-gray-600">
            I advise and invest in ambitious teams building innovative products who focus on unit economics optimized business models.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'AFAR',
              'AON3D',
              'AURA',
              'Backpack',
              'Caliber',
              'GEM'
            ].map((company) => (
              <div key={company} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{company}</h3>
                <p className="text-gray-600">Innovative technology solutions</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
