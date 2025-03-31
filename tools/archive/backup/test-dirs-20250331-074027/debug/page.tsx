import React from 'react';
import ClientDebugComponent from './client';
import { DebugStatus } from '@/components/debug-status';

export default function DebugPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Debug Page</h1>
      <p className="mb-4">This is a simple page to test rendering and help diagnose problems.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Server-Side Rendering</h2>
          <p>
            This content is rendered on the server. The timestamp below is generated
            at build time:
          </p>
          <p className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
            {new Date().toISOString()}
          </p>
          <DebugStatus />
        </div>
        
        <ClientDebugComponent />
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Troubleshooting Information</h2>
        <p>If you're seeing this page:</p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>The server is running correctly</li>
          <li>The base application routing is working</li>
          <li>React Server Components are functioning</li>
          <li>Next.js is properly configured with Bun</li>
        </ul>
        <p className="mt-3">Check for any error messages in the browser console for more detailed information.</p>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Navigation Tests</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Home Page
          </a>
          <a href="/portfolio" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Portfolio Page
          </a>
          <a href="/ventures" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Ventures Page
          </a>
        </div>
      </div>
    </div>
  );
}