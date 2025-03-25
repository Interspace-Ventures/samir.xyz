"use client";

import RootLayout from "../../components/root-layout";

export default function GridTestPage() {
  return (
    <RootLayout>
      <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Grid Layout Test</h1>
        
        <h2 className="text-xl font-semibold mb-4 text-center">3-Column Grid (Desktop)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div 
              key={num} 
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center"
              style={{ height: '200px' }}
            >
              <div className="text-5xl font-bold text-purple-500">{num}</div>
              <div className="text-lg mt-4">Card Item {num}</div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-400 mb-4">Test the responsive behavior by resizing your browser:</p>
          <ul className="list-disc list-inside text-left max-w-md mx-auto mb-8">
            <li className="text-gray-300">Mobile: 1 column</li>
            <li className="text-gray-300">Tablet (sm): 2 columns</li>
            <li className="text-gray-300">Desktop (lg): 3 columns</li>
          </ul>
          
          <a 
            href="/ventures" 
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium 
                    hover:from-purple-500 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-purple-800/30"
          >
            View Ventures Page
          </a>
        </div>
      </div>
    </RootLayout>
  );
}