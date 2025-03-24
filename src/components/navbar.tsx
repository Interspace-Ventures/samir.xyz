// Version 12.0.4 - Updated Navbar with Inter font and requested structure

export default function Navbar() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a 
          href="/" 
          className="text-xl font-bold text-white hover:text-purple-400 transition-colors"
        >
          Hey - I'm <span className="text-purple-500">Samir</span>
        </a>

        <nav className="flex items-center space-x-6">
          <a 
            href="/profile" 
            className="text-gray-300 hover:text-purple-400 font-medium transition-colors"
          >
            ABOUT
          </a>
          <a 
            href="/portfolio" 
            className="text-gray-300 hover:text-purple-400 font-medium transition-colors"
          >
            PORTFOLIO
          </a>
          <a 
            href="/ventures" 
            className="text-gray-300 hover:text-purple-400 font-medium transition-colors"
          >
            VENTURES
          </a>
        </nav>
      </div>
    </header>
  )
}