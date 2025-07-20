'use client';

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/ventures-detailed')
      .then(res => res.json())
      .then(data => {
        console.log('Test page - data received:', data);
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Test page - error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-20 pb-16 text-white">
      <h1 className="text-2xl font-bold mb-4">Ventures Test Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {data && (
        <div>
          <p>Found {data.length} ventures</p>
          <pre className="bg-gray-800 p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}