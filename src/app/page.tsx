import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <section className="py-8 md:py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-indigo-900/30 rounded-lg"></div>
                <Image
                  src="/images/profile/hero-main.png"
                  alt="Samir profile"
                  width={128}
                  height={128}
                  className="rounded-lg border border-purple-800/50"
                  priority
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  Hey - I'm Samir.
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">
                  I drive business impact at fintechs.
                </h2>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed text-gray-300">
              Today, I am leading Strategic Finance for the Financial Partnerships team at <a href="https://cash.app" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-medium hover:text-purple-300 underline-offset-2 hover:underline">Cash App</a> where we're expanding financial access to help users do more with their money.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-300">
              Prior to that, I drove financial partnerships at <a href="https://unit.co" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-medium hover:text-purple-300 underline-offset-2 hover:underline">Unit</a>, which embeds financial features into products. Before that, I built and led the Strategic Finance function at <a href="https://chime.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-medium hover:text-purple-300 underline-offset-2 hover:underline">Chime</a>. Earlier, I was the first finance hire at <a href="https://sift.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-medium hover:text-purple-300 underline-offset-2 hover:underline">Sift</a>. I got my start in investment banking in the Financial Institutions Group at <a href="https://jpmorgan.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-medium hover:text-purple-300 underline-offset-2 hover:underline">JP Morgan</a> covering market structure and asset management.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-300">
              Outside of work, I write over-engineered fintech threads on <a href="https://twitter.com/samirisms" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-medium hover:text-purple-300 underline-offset-2 hover:underline">Twitter</a>, share perspectives on <a href="https://samirisms.substack.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-medium hover:text-purple-300 underline-offset-2 hover:underline">Substack</a> and write fintech & stratfin posts at <a href="https://interspace.club" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-medium hover:text-purple-300 underline-offset-2 hover:underline">Interspace</a>. I also create over-engineered apps and ideas at <a href="/ventures" className="text-purple-400 font-medium hover:text-purple-300 underline-offset-2 hover:underline">Interspace Ventures</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}