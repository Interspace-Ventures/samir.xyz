// Ultra-simplified page for React 19 compatibility testing - Version 3.4.4

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Simple Hero Section */}
      <section className="py-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">
            Hey - I'm Samir.
          </h1>
          
          <p className="text-lg">
            I drive business impact at fintechs.
          </p>
          
          <div className="p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p>
              Leading Strategic Finance for the Financial Partnerships team at Cash App.
            </p>
          </div>
          
          <div className="p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">Experience</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cash App - Strategic Finance</li>
              <li>Unit - Financial Partnerships</li>
              <li>Chime - Strategic Finance</li>
            </ul>
          </div>
          
          <div className="p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">Test Links</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><a href="/test-simple" className="underline">Simple Test Page</a></li>
              <li><a href="/ventures" className="underline">Ventures Page</a></li>
              <li><a href="/portfolio" className="underline">Portfolio Page</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}