import React from "react";
import { Switch, Route } from "wouter";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white border-b z-50 px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center">
            <a href="/" className="text-xl font-bold text-black">HEY SAMIR</a>
            <div className="flex gap-8">
              <a href="/profile" className="text-black hover:text-gray-600 uppercase text-sm tracking-wider">Profile</a>
              <a href="/portfolio" className="text-black hover:text-gray-600 uppercase text-sm tracking-wider">Portfolio</a>
              <a href="https://interspace.samir.xyz" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 uppercase text-sm tracking-wider">Interspace</a>
              <a href="https://perspectives.samir.xyz" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 uppercase text-sm tracking-wider">Perspectives</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 px-4">
        <Switch>
          <Route path="/" component={Profile} />
          <Route path="/profile" component={Profile} />
          <Route path="/portfolio" component={Portfolio} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function Profile() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-normal mb-8">Hey - I'm Samir.</h1>
        <p className="text-lg mb-6">
          I drive business impact at fintechs.
        </p>
        <p className="text-lg mb-6">
          Today, I am building Strategic Finance at <a href="#" className="text-blue-600 hover:underline">HRT</a> where we're using algorithms to drive efficiency in markets. Previously, I was at <a href="#" className="text-blue-600 hover:underline">Unit</a>, which embeds financial features into products. Before that, I built and led the Strategic Finance function at <a href="#" className="text-blue-600 hover:underline">Chime</a>. Earlier, I was the first finance hire at <a href="#" className="text-blue-600 hover:underline">Sift</a>. I got my start in investment banking in the Financial Institutions Group at <a href="#" className="text-blue-600 hover:underline">JP Morgan</a> covering market structure and asset management.
        </p>
        <p className="text-lg">
          In my free time, I write over-engineered threads on <a href="#" className="text-blue-600 hover:underline">Twitter</a> and fintech posts at <a href="#" className="text-blue-600 hover:underline">Interspace</a>.
        </p>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8">Portfolio</h2>
      {/* Grid of portfolio items will go here */}
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
    </div>
  );
}

export default App;