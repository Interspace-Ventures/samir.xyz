import React, { Suspense } from "react";
import { Switch, Route } from "wouter";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="text-xl font-bold text-black">HEY SAMIR</a>
            <div className="flex gap-8">
              <a href="/profile" className="nav-link">PROFILE</a>
              <a href="/portfolio" className="nav-link">PORTFOLIO</a>
              <a href="https://interspace.samir.xyz" target="_blank" rel="noopener noreferrer" className="nav-link">INTERSPACE</a>
              <a href="https://perspectives.samir.xyz" target="_blank" rel="noopener noreferrer" className="nav-link">PERSPECTIVES</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 px-4">
        <Suspense fallback={<LoadingSkeleton />}>
          <Switch>
            <Route path="/" component={Profile} />
            <Route path="/profile" component={Profile} />
            <Route path="/portfolio" component={Portfolio} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="max-w-2xl">
        <Skeleton className="h-12 w-3/4 mb-8" />
        <Skeleton className="h-6 w-1/2 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-9/12" />
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-normal mb-8">Hey - I'm Samir.</h1>
        <p className="text-xl mb-6">
          I drive business impact at fintechs.
        </p>
        <p className="text-lg mb-6 leading-relaxed">
          Today, I am building Strategic Finance at <a href="#" className="content-link">HRT</a> where we're using algorithms to drive efficiency in markets. Previously, I was at <a href="#" className="content-link">Unit</a>, which embeds financial features into products. Before that, I built and led the Strategic Finance function at <a href="#" className="content-link">Chime</a>. Earlier, I was the first finance hire at <a href="#" className="content-link">Sift</a>. I got my start in investment banking in the Financial Institutions Group at <a href="#" className="content-link">JP Morgan</a> covering market structure and asset management.
        </p>
        <p className="text-lg">
          In my free time, I write over-engineered threads on <a href="#" className="content-link">Twitter</a> and fintech posts at <a href="#" className="content-link">Interspace</a>.
        </p>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Portfolio items will go here */}
      </div>
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