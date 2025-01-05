import React, { Suspense } from 'react';
import { Switch, Route } from "wouter";
import { Skeleton } from "./components/ui/skeleton";
import { ParallaxSection } from "./components/ui/parallax-section";
import { ThemeToggle } from "./components/theme-toggle";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="text-xl font-bold text-gray-900 dark:text-white transition-colors">HEY SAMIR</a>
            <div className="flex items-center gap-8">
              <a href="/profile" className="nav-link">PROFILE</a>
              <a href="/portfolio" className="nav-link">PORTFOLIO</a>
              <a href="https://interspace.samir.xyz" target="_blank" rel="noopener noreferrer" className="nav-link">INTERSPACE</a>
              <a href="https://perspectives.samir.xyz" target="_blank" rel="noopener noreferrer" className="nav-link">PERSPECTIVES</a>
              <ThemeToggle />
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
        <ParallaxSection offset={20}>
          <h1 className="text-5xl font-normal mb-8 text-gray-900 dark:text-white transition-colors">Hey - I'm Samir.</h1>
        </ParallaxSection>

        <ParallaxSection offset={30}>
          <p className="text-xl mb-6 text-gray-900 dark:text-white transition-colors">
            I drive business impact at fintechs.
          </p>
        </ParallaxSection>

        <ParallaxSection offset={40}>
          <p className="text-lg mb-6 leading-relaxed text-gray-900 dark:text-white transition-colors">
            Today, I am building Strategic Finance at <a href="#" className="content-link">HRT</a> where we're using algorithms to drive efficiency in markets. Previously, I was at <a href="#" className="content-link">Unit</a>, which embeds financial features into products. Before that, I built and led the Strategic Finance function at <a href="#" className="content-link">Chime</a>. Earlier, I was the first finance hire at <a href="#" className="content-link">Sift</a>. I got my start in investment banking in the Financial Institutions Group at <a href="#" className="content-link">JP Morgan</a> covering market structure and asset management.
          </p>
        </ParallaxSection>

        <ParallaxSection offset={50}>
          <p className="text-lg text-gray-900 dark:text-white transition-colors">
            In my free time, I write over-engineered threads on <a href="#" className="content-link">Twitter</a> and fintech posts at <a href="#" className="content-link">Interspace</a>.
          </p>
        </ParallaxSection>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <ParallaxSection offset={20}>
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white transition-colors">Portfolio</h2>
      </ParallaxSection>

      <ParallaxSection offset={30}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio items will go here */}
        </div>
      </ParallaxSection>
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">404 - Page Not Found</h1>
    </div>
  );
}

export default App;