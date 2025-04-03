'use client';

interface LoadingFallbackProps {
  message?: string;
}

/**
 * Loading Fallback Component
 * 
 * Displays a loading indicator with optional message
 * Used as a fallback during page transitions
 */
export default function LoadingFallback({ message = 'Loading...' }: LoadingFallbackProps) {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'white',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div 
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '3px solid #e5e7eb',
          borderTopColor: '#9333ea',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ marginTop: '16px', color: '#4b5563' }}>{message}</p>
    </div>
  );
}