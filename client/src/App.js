
const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="px-4 py-6 border-b">
        <nav className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hey Samir</h1>
          <div className="flex gap-6">
            <a href="#profile" className="hover:text-gray-600">PROFILE</a>
            <a href="#portfolio" className="hover:text-gray-600">PORTFOLIO</a>
            <a href="#interspace" className="hover:text-gray-600">INTERSPACE</a>
            <a href="#perspectives" className="hover:text-gray-600">PERSPECTIVES</a>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <section id="profile" className="mb-20">
          <h2 className="text-4xl font-bold mb-6">Hey - I'm Samir.</h2>
          <p className="text-xl mb-4">I drive business impact at fintechs.</p>
          <p className="text-gray-600 mb-4">
            Today, I am leading Finance & Strategy for the Financial Partnerships team at <a href="https://cash.app/" className="text-[#482a83] hover:underline">Cash App</a> where we're expanding financial access to help users do more with their money. Previously I built Strategic Finance at <a href="https://www.hudsonrivertrading.com/" className="text-[#482a83] hover:underline">HRT</a> which uses algorithms to drive efficiency in markets. Before that I was at <a href="https://www.unit.co/" className="text-[#482a83] hover:underline">Unit</a>, which embeds financial features into products. Prior to that, I built and led the Strategic Finance function at <a href="https://www.chime.com/" className="text-[#482a83] hover:underline">Chime</a>. Earlier, I was the first finance hire at <a href="https://sift.com/" className="text-[#482a83] hover:underline">Sift</a>. I got my start in investment banking in the Financial Institutions Group at <a href="https://www.jpmorgan.com/investment-banking" className="text-[#482a83] hover:underline">JP Morgan</a> covering market structure and asset management.
          </p>
          <p className="text-gray-600">
            In my free time, I write over-engineered threads on <a href="https://x.com/heysamir_" className="text-[#482a83] hover:underline">Twitter</a>, share perspectives on <a href="https://perspectives.samir.xyz/" className="text-[#482a83] hover:underline">Substack</a> and write over-engineered fintech posts at <a href="https://interspace.samir.xyz/" className="text-[#482a83] hover:underline">Interspace</a>. I'm also learning to <a href="https://github.com/hey-samir" className="text-[#482a83] hover:underline">code at the speed of thought</a> via Replit AI.
          </p>
        </section>

        <section id="portfolio" className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Portfolio</h2>
          <p className="mb-8">I advise and invest in ambitious teams building innovative products who focus on unit economics optimized business models.</p>
          <div className="grid grid-cols-3 gap-8">
            {/* Portfolio items will go here */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
