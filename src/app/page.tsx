// Redirect from home page to profile page
import { redirect } from 'next/navigation';

export default function HomePage() {
  // This will redirect from the root (/) to the profile page (/profile)
  // The redirect happens on the server-side during the initial page load
  redirect('/profile');
}