import type { MetaFunction } from "@remix-run/node";
import { Card, CardContent } from "../layout/card";

export const meta: MetaFunction = () => {
  return [
    { title: "About - Samir's Profile" },
    { name: "description", content: "Learn about Samir's professional experience and expertise in finance and technology." },
  ];
};

// Experience data
const experiences = [
  {
    company: "Cash App",
    position: "Strategic Finance, Financial Partnerships",
    period: "2022 - Present",
    description: "Leading Strategic Finance for the Financial Partnerships team, expanding financial access to help users do more with their money.",
    url: "https://cash.app"
  },
  {
    company: "Unit",
    position: "Financial Partnerships",
    period: "2020 - 2022",
    description: "Drove financial partnerships, helping companies embed financial features into their products.",
    url: "https://unit.co"
  },
  {
    company: "Chime",
    position: "Strategic Finance",
    period: "2018 - 2020",
    description: "Built and led the Strategic Finance function, supporting the company's growth from Series C to Series E.",
    url: "https://chime.com"
  }
];

// Skills data
const skills = [
  { category: "Finance", items: ["Strategic Finance", "Financial Modeling", "Capital Markets", "Venture Capital", "Financial Analysis"] },
  { category: "Technology", items: ["Fintech", "Product Strategy", "API Integration", "Data Analysis", "Banking-as-a-Service"] },
  { category: "Leadership", items: ["Team Building", "Cross-functional Collaboration", "Strategy Development", "Investor Relations", "Public Speaking"] }
];

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="mb-12 md:flex items-start gap-8">
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
              <span className="text-4xl font-bold text-white">S</span>
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-3">Hey - I'm Samir</h1>
            <h2 className="text-2xl text-gray-600 mb-6">I drive business impact at fintechs</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              I'm passionate about the intersection of finance and technology, with a focus on 
              creating accessible financial services for everyone.
            </p>
            
            <div className="flex gap-3 mt-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a 
                href="https://interspace.sh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-900 rounded-full text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11a9 9 0 0 1 9 9"></path>
                  <path d="M4 4a16 16 0 0 1 16 16"></path>
                  <circle cx="5" cy="19" r="1"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Experience Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Professional Experience</h3>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <div>
                      <h4 className="text-xl font-semibold">
                        <a href={exp.url} target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:text-indigo-500">
                          {exp.company}
                        </a>
                      </h4>
                      <p className="font-medium text-gray-700">{exp.position}</p>
                    </div>
                    <span className="text-sm text-gray-500 md:text-right mt-1 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Skills & Expertise</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4 text-indigo-700">{skill.category}</h4>
                  <ul className="space-y-2">
                    {skill.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Personal Section */}
        <section>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Outside of Work</h3>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                When I'm not working, I write over-engineered fintech threads on <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-700 hover:text-indigo-500 font-medium"
                >
                  Twitter
                </a> and publish detailed fintech & strategic finance analyses at <a 
                  href="https://interspace.sh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-700 hover:text-indigo-500 font-medium"
                >
                  Interspace
                </a>.
              </p>
              
              <p className="text-gray-700">
                I'm also an active angel investor focusing on early-stage fintech, SaaS, and health startups 
                that are solving real problems with innovative approaches.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}