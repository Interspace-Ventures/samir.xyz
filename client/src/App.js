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
          <p className="text-gray-600">
            Today, I am building Strategic Finance at HRT where we're using algorithms to drive
            efficiency in markets. Previously, I was at Unit, which embeds financial features into
            products. Before that, I built and led the Strategic Finance function at Chime.
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