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
              Today, I am leading Strategic Finance for the Financial Partnerships team at <span className="text-purple-400 font-medium">Cash App</span> where we're expanding financial access to help users do more with their money.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-300">
              Prior to that, I drove financial partnerships at <span className="text-purple-400 font-medium">Unit</span>, which embeds financial features into products. Before that, I built and led the Strategic Finance function at <span className="text-purple-400 font-medium">Chime</span>. Earlier, I was the first finance hire at <span className="text-purple-400 font-medium">Sift</span>. I got my start in investment banking in the Financial Institutions Group at <span className="text-purple-400 font-medium">JP Morgan</span> covering market structure and asset management.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-300">
              Outside of work, I write over-engineered fintech threads on <span className="text-purple-400 font-medium">Twitter</span>, share perspectives on <span className="text-purple-400 font-medium">Substack</span> and write fintech & stratfin posts at <span className="text-purple-400 font-medium">Interspace</span>. I also create over-engineered apps and ideas at <span className="text-purple-400 font-medium">Interspace Ventures</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}