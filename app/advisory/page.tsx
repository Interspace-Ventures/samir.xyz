import { permanentRedirect } from 'next/navigation';

// Advisory is now the site's home page. Keep this route as a permanent redirect
// so existing links and bookmarks to /advisory still work and search engines
// treat the move as permanent.
export default function AdvisoryRedirect() {
  permanentRedirect('/');
}
