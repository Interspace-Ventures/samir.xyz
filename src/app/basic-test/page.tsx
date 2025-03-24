'use client';

import React, { useState, useEffect } from 'react';
import ClientWrapper from '@/components/client-wrapper';
import { ErrorBoundary } from '@/components/error-boundary';

export default function BasicTestPage() {
  return (
    <ErrorBoundary name="BasicTestPage">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Basic Test Page</h1>
        
        <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Server-Rendered Content</h2>
          <p>This text should always be visible, as it's rendered by the server.</p>
        </div>
        
        <ClientWrapper
          placeholder={<div className="p-4 border border-gray-300 rounded">Loading client component...</div>}
        >
          <ClientTest />
        </ClientWrapper>
      </div>
    </ErrorBoundary>
  );
}

function ClientTest() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    // Set mounted state to indicate successful client-side hydration
    setMounted(true);
    
    // Update time every second to show client-side functionality
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    // Log successful client component mounting
    console.log('Client component mounted successfully');
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="p-6 border border-blue-300 rounded-lg bg-blue-50 dark:bg-blue-900 dark:border-blue-700">
      <h2 className="text-xl font-semibold mb-4">Client-Side Component</h2>
      
      <div className="mb-4">
        <p>Client component mounted: <span className="font-bold">{mounted ? 'Yes ✅' : 'No ❌'}</span></p>
        <p>Current time (updated every second): <span className="font-mono">{currentTime}</span></p>
      </div>
      
      <div className="mb-4">
        <p>Count: <span className="font-bold">{count}</span></p>
        <button 
          onClick={() => setCount(prev => prev + 1)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Increment Count
        </button>
      </div>
      
      <div className="mt-4 text-sm bg-gray-200 dark:bg-gray-700 p-3 rounded">
        <p>If you can see the time updating and increment the counter, client-side JavaScript is working properly!</p>
      </div>
    </div>
  );
}