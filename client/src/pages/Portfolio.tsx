const Portfolio = () => {
  const companies = [
    { name: "AFAR", logo: "AFAR" },
    { name: "AON3D", logo: "AON3D" }, 
    { name: "AURA", logo: "AURA" },
    { name: "Backpack", logo: "Backpack" },
    { name: "CALIBER", logo: "CALIBER" },
    { name: "GEM", logo: "GEM" }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
      
      <p className="text-lg mb-12">
        I advise and invest in ambitious teams building innovative products who focus on
        unit economics optimized business models.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {companies.map((company) => (
          <div
            key={company.name}
            className="flex items-center justify-center p-8 bg-white border border-gray-200 rounded-lg"
          >
            <span className="text-xl font-medium">{company.logo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
