/**
 * Changelog and versioning
 *
 * Single source of truth for the site's version history. The footer shows the
 * latest version (the first entry below) and links to the /changelog page,
 * which renders this list. Add a new entry to the top for each release.
 *
 * Versioning follows semantic versioning (MAJOR.MINOR.PATCH):
 *   MAJOR: large platform shifts (framework upgrades, redesigns)
 *   MINOR: new pages or features
 *   PATCH: fixes and small polish
 */

export interface Change {
  date: string;
  text: string;
}

export interface Release {
  version: string;
  date: string;
  title: string;
  changes: Change[];
}

export const CHANGELOG: Release[] = [
  {
    version: '2.1.0',
    date: 'June 6, 2026',
    title: 'Advisory practice',
    changes: [
      { date: 'June 6, 2026', text: 'Launched the Advisory page for the strategic finance practice' },
      { date: 'June 6, 2026', text: 'Added a fill-in-the-blank contact form that saves every enquiry' },
      { date: 'June 6, 2026', text: 'Added Advisory to the main navigation' },
    ],
  },
  {
    version: '2.0.0',
    date: 'June 6, 2026',
    title: 'Platform refresh',
    changes: [
      { date: 'June 6, 2026', text: 'Upgraded to Next.js 16 with Turbopack' },
      { date: 'June 6, 2026', text: 'Updated React, Prisma, Framer Motion and other core libraries' },
      { date: 'June 6, 2026', text: 'Added seven portfolio companies, including Parrot Finance' },
      { date: 'June 6, 2026', text: 'Fixed a bug that was hiding companies with no investment status' },
      { date: 'June 6, 2026', text: 'Refreshed metrics and removed unused files and dependencies' },
    ],
  },
  {
    version: '1.3.0',
    date: 'June 5, 2026',
    title: 'New ventures and status updates',
    changes: [
      { date: 'June 5, 2026', text: 'Added Verse, Spacebase and Orbit to the ventures showcase' },
      { date: 'June 5, 2026', text: 'Updated investment statuses and markup counts' },
      { date: 'June 5, 2026', text: 'Refreshed the homepage bio' },
    ],
  },
  {
    version: '1.2.0',
    date: 'August 19, 2025',
    title: 'Performance',
    changes: [
      { date: 'August 19, 2025', text: 'Switched to a production build for serving the site' },
      { date: 'August 19, 2025', text: 'Cut initial load time from around 20 seconds to 2 to 3 seconds' },
    ],
  },
  {
    version: '1.1.1',
    date: 'August 13, 2025',
    title: 'Branding polish',
    changes: [
      { date: 'August 13, 2025', text: 'Updated the Replit, Perplexity and Fizz logos' },
      { date: 'August 13, 2025', text: 'Tidied up portfolio categories and status badges' },
    ],
  },
  {
    version: '1.1.0',
    date: 'July 27, 2025',
    title: 'Design system',
    changes: [
      { date: 'July 27, 2025', text: 'Rebuilt the site on a neobrutalist design system' },
      { date: 'July 27, 2025', text: 'Added reusable design tokens and component styles' },
      { date: 'July 27, 2025', text: 'Improved animations and loading states' },
    ],
  },
  {
    version: '1.0.0',
    date: 'January 12, 2025',
    title: 'Launch',
    changes: [
      { date: 'January 12, 2025', text: 'First public version of the portfolio' },
      { date: 'January 12, 2025', text: 'Portfolio gallery with category filters' },
      { date: 'January 12, 2025', text: 'Ventures showcase and profile' },
    ],
  },
];

export const CURRENT_VERSION = CHANGELOG[0].version;
