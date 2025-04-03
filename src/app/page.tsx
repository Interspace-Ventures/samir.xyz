// Redirect from home page to profile page
import { redirect } from 'next/navigation';

// Server components can't use ssr: false with dynamic imports
// Need to handle WebView compatibility another way
export default function HomePage() {
  // Log the redirect for clarity in the server console
  console.log('🔄 Root page (/) redirecting to /profile');
  
  // The WebView compatibility is now handled through the client-wrapper component
  // which is loaded in the root layout
  
  // This redirect happens on the server-side during the initial page load
  // WebView-specific redirect handling is done through other components
  redirect('/profile');
}