'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <div className="rounded-lg bg-red-50 p-6 shadow-md md:p-8 max-w-xl mx-auto text-center">
        <h2 className="mb-4 text-xl font-bold text-red-800 md:text-2xl">
          Something went wrong
        </h2>
        <p className="mb-6 text-red-600">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={() => reset()}
          className="rounded-md bg-purple-700 px-6 py-3 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}