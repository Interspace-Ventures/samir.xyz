// Version 12.0.1 - Enhanced Portfolio Page with purple accents and dark theme

export default function Portfolio() {
  // Pre-defined static data
  const companies = [
    { name: "Backpack", description: "Financial services platform for modern banking", category: "Fintech" },
    { name: "Caliber X", description: "AI-powered health tech innovation and diagnostics", category: "Health" },
    { name: "Kartera", description: "Retail analytics platform with predictive insights", category: "Retail" },
    { name: "Techmate", description: "Enterprise SaaS solution for team collaboration", category: "SaaS" },
    { name: "Aura", description: "Personal finance management and investment platform", category: "Fintech" },
    { name: "Hedgehog", description: "Cybersecurity solutions for healthcare providers", category: "Health" },
    { name: "Margin", description: "Smart money transfer and currency exchange app", category: "Fintech" },
    { name: "Moku", description: "Sustainable retail marketplace for eco-friendly products", category: "Retail" },
    { name: "Rely", description: "B2B SaaS platform for business process automation", category: "SaaS" },
  ];
  
  // Categories for filtering
  const categories = ["All", "Fintech", "Health", "Retail", "SaaS"];
  
  return (
    <div className="py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Portfolio <span className="text-purple-500">Companies</span>
      </h1>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-gray-800 rounded-lg">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-1.5 rounded-md text-sm font-medium bg-transparent text-purple-400 hover:bg-gray-700"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {companies.map((company, index) => (
          <div key={index} className="card">
            <h3 className="text-xl font-bold mb-2 text-purple-400">{company.name}</h3>
            <p className="text-gray-300 mb-4">{company.description}</p>
            <div className="flex justify-between items-center">
              <span className="inline-block px-3 py-1 bg-gray-900 text-purple-300 rounded-full text-sm">
                {company.category}
              </span>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
                Details →
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <a href="/" className="btn-primary">
          Back to Home
        </a>
      </div>
    </div>
  );
}