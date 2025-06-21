/**
 * Global Loading Component
 * 
 * Shows a clean, minimal loading state for route transitions
 * Provides immediate feedback when navigating between pages
 */
export default function Loading() {
  return (
    <div className="pt-16 pb-16 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-2 border-purple-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-text-tertiary text-sm">Loading...</p>
      </div>
    </div>
  );
}