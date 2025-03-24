// Version 12.0.1 - Enhanced Homepage with purple accents and dark theme

export default function HomePage() {
  return (
    <div className="py-10">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Hey, I'm <span className="text-purple-500">Samir</span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          I drive business impact at fintechs and create innovative digital products.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/profile" className="btn-primary">
            About Me
          </a>
          <a href="/portfolio" className="btn-secondary">
            View Portfolio
          </a>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-purple-400">Professional Expertise</h2>
            <p className="text-gray-300 mb-4">
              Leading Strategic Finance for the Financial Partnerships team at Cash App,
              with previous experience at Unit and Chime.
            </p>
            <a href="/profile" className="text-purple-400 hover:text-purple-300">
              Learn more →
            </a>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-purple-400">Interspace Ventures</h2>
            <p className="text-gray-300 mb-4">
              Creating apps and concepts using modern technologies and innovative approaches.
            </p>
            <a href="/ventures" className="text-purple-400 hover:text-purple-300">
              Explore ventures →
            </a>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="section-title border-b border-gray-800 pb-2 mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-bold mb-2 text-purple-400">Solo</h3>
            <p className="text-gray-300 text-sm mb-3">
              Design-forward climbing app for tracking and sharing routes.
            </p>
            <a href="/ventures" className="text-sm text-purple-400 hover:text-purple-300">
              Learn more →
            </a>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-bold mb-2 text-purple-400">Predictive:film</h3>
            <p className="text-gray-300 text-sm mb-3">
              AI-powered script analysis for screenwriters and production studios.
            </p>
            <a href="/ventures" className="text-sm text-purple-400 hover:text-purple-300">
              Learn more →
            </a>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-bold mb-2 text-purple-400">2 Days Early</h3>
            <p className="text-gray-300 text-sm mb-3">
              Get in on the next big thing before everyone else knows about it.
            </p>
            <a href="/ventures" className="text-sm text-purple-400 hover:text-purple-300">
              Learn more →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}