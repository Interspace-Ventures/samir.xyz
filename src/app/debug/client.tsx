"use client"

import React, { useState, useEffect } from 'react';

export default function ClientDebugComponent() {
  const [time, setTime] = useState<string>('Loading...');
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setMounted(true);
      setTime(new Date().toISOString());
      
      console.log('Client component mounted successfully', {
        timestamp: new Date().toISOString(),
        window: typeof window !== 'undefined' ? 'available' : 'not available',
        document: typeof document !== 'undefined' ? 'available' : 'not available',
      });
    } catch (err) {
      console.error('Error in client component:', err);
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">Client-Side Rendering</h2>
      <p>
        This content is rendered on the client. The timestamp below is generated
        when the component mounts in the browser:
      </p>
      <p className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">{time}</p>
      
      <div className="mt-4">
        <p>Component mounted: <span className={mounted ? "text-green-500" : "text-red-500"}>{mounted ? "Yes" : "No"}</span></p>
        {error && (
          <p className="text-red-500 mt-2">Error: {error}</p>
        )}
      </div>
    </div>
  );
}