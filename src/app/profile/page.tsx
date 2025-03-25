import RootLayout from "../../components/root-layout";

export default function Profile() {
  return (
    <RootLayout>
      <div className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          About <span className="text-purple-500">Samir</span>
        </h1>
        
        <div className="max-w-3xl mx-auto card mb-10">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">I drive business impact at fintechs</h2>
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            Today, I am leading Strategic Finance for the Financial Partnerships team at Cash App
            where we're expanding financial access to help users do more with their money.
          </p>
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            Prior to that, I drove financial partnerships at Unit, which embeds financial features into products.
            Before that, I built and led the Strategic Finance function at Chime. Earlier, I was the first finance
            hire at Sift. I got my start in investment banking in the Financial Institutions Group at JP Morgan
            covering market structure and asset management.
          </p>
          
          <p className="text-gray-300 leading-relaxed">
            Outside of work, I write over-engineered fintech threads on Twitter, share perspectives on Substack
            and write fintech & stratfin posts at Interspace. I also create over-engineered apps and ideas at
            Interspace Ventures.
          </p>
        </div>
        
        <div className="text-center">
          <a 
            href="/portfolio" 
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium 
                      hover:from-purple-500 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-purple-800/30"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </RootLayout>
  );
}
