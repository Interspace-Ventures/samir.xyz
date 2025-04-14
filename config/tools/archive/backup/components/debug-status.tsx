"use client"

import React, { useEffect, useState } from 'react';

export function DebugStatus() {
  const [info, setInfo] = useState({
    mounted: false,
    mountTime: '',
    windowExists: false,
    documentExists: false,
    navigatorExists: false,
    userAgent: '',
    errors: [] as string[]
  });

  useEffect(() => {
    try {
      const windowExists = typeof window !== 'undefined';
      const documentExists = typeof document !== 'undefined';
      const navigatorExists = typeof navigator !== 'undefined';
      
      setInfo({
        mounted: true,
        mountTime: new Date().toISOString(),
        windowExists,
        documentExists,
        navigatorExists,
        userAgent: navigatorExists ? navigator.userAgent : 'Unknown',
        errors: []
      });

      console.log('Debug component mounted with info:', {
        time: new Date().toISOString(),
        window: windowExists ? 'available' : 'not available',
        document: documentExists ? 'available' : 'not available',
        navigator: navigatorExists ? 'available' : 'not available',
        userAgent: navigatorExists ? navigator.userAgent : 'Unknown'
      });
    } catch (err) {
      console.error('Error in debug component:', err);
      setInfo(prev => ({
        ...prev,
        errors: [...prev.errors, err instanceof Error ? err.message : String(err)]
      }));
    }
  }, []);

  if (!info.mounted) {
    return <div className="text-sm text-gray-500">Debug component loading...</div>;
  }

  return (
    <div className="text-xs p-3 my-3 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
      <h3 className="font-bold mb-2">Debug Status</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <div>Client mounted:</div>
        <div className="font-mono">{info.mounted ? '✅' : '❌'}</div>
        
        <div>Mount time:</div>
        <div className="font-mono truncate">{info.mountTime}</div>
        
        <div>Window:</div>
        <div className="font-mono">{info.windowExists ? '✅' : '❌'}</div>
        
        <div>Document:</div>
        <div className="font-mono">{info.documentExists ? '✅' : '❌'}</div>
        
        <div>Navigator:</div>
        <div className="font-mono">{info.navigatorExists ? '✅' : '❌'}</div>
      </div>
      
      {info.errors.length > 0 && (
        <div className="mt-2">
          <div className="text-red-500 font-bold">Errors:</div>
          <ul className="list-disc pl-5">
            {info.errors.map((error, i) => (
              <li key={i} className="text-red-500">{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}