# Hey I'm Samir

I'm building design-forward, high performance apps and concepts by coding at the speed of thought with Replit.

## Version Information

This project follows [Semantic Versioning](https://semver.org/):
- Patch updates (x.x.1): Every single commit
- Minor updates (x.1.x): Every chat/feature session
- Major updates (1.x.x): Significant architectural changes

Current Version: 2.4.5
For detailed changes, see [CHANGELOG.md](docs/CHANGELOG.md).

## Tech Stack

- Next.js for server-side rendering
- React.js for dynamic user interface
- Tailwind CSS for responsive styling
- TypeScript for type-safe development
- Responsive mobile-first design
- Inter font for consistent typography
- Performance-optimized loading states
- CSS-based animations for smooth transitions

## Dependencies

### Core Framework
- `next` - The React framework for production web applications
- `react` & `react-dom` - Core React libraries
- `typescript` - Programming language adding static types to JavaScript
- `@types/node`, `@types/react`, `@types/react-dom` - TypeScript type definitions

### Styling & UI
- `tailwindcss` - Utility-first CSS framework
- `tailwindcss-animate` - Animation utilities for Tailwind CSS
- `@tailwindcss/typography` - Typography plugin for consistent text styling
- `postcss` - Tool for transforming CSS with JavaScript (required by Tailwind)
- `autoprefixer` - PostCSS plugin to parse CSS and add vendor prefixes

### Form Handling & Validation
- `@hookform/resolvers` - Validation resolvers for React Hook Form
- `zod` - TypeScript-first schema validation

### Theming
- `next-themes` - Feature-rich theme system for Next.js

## Project Structure

The project follows a clean, organized structure:

```
├── public/
│   └── images/
│       ├── brand/           # Brand-related assets
│       ├── portfolio-logos/ # Company logos
│       ├── profile/         # Profile photos
│       └── ventures-brands/ # Venture project logos and favicons
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── portfolio/      # Portfolio section
│   │   ├── ventures/       # Ventures section
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles and theme
│   └── components/         # Reusable UI components
│       ├── data/          # Static data and types
│       ├── ui/            # Shared UI components
│       ├── footer.tsx     # Site footer
│       ├── navbar.tsx     # Navigation with theme toggle
│       ├── company-card/  # Portfolio company cards
│       ├── project-card/  # Venture project cards
│       └── stats-section/ # Portfolio statistics
├── docs/                   # Documentation
│   └── CHANGELOG.md        # Version history
└── [Configuration]         # Project configuration
    ├── next.config.mjs     # Next.js config
    ├── tailwind.config.js  # Tailwind config
    └── tsconfig.json       # TypeScript config
```

## Development

Run the development server:

```bash
npm run dev
```

This starts Next.js development server with hot module replacement on port 5000.

### Important Development Notes

1. The application runs through the "Start application" workflow which executes start-dev.sh
2. Development server is configured to run on port 5000 with proper host binding (0.0.0.0)
3. All assets are optimized during build time
4. Uses CSS-based animations instead of Framer Motion for better performance
5. Theme support with next-themes including system preference detection

## Features

- Responsive design optimized for mobile, tablet, and desktop
- Dark/light mode with system preference detection
- CSS-based animated transitions
- SEO-optimized metadata configuration
- Performance-optimized image loading
- Consistent typography with Inter font
- Category filtering for portfolio companies
- Interactive project cards with hover effects
- Optimized asset loading with proper caching

## Notes

- Uses Next.js App Router exclusively for improved routing and layouts
- All assets are optimized during build
- Static site deployment ready
- Organized asset structure in public/images
- Proper favicon configuration for all devices