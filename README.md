# Hey I'm Samir

I'm building design-forward, high performance apps and concepts by coding at the speed of thought with Replit.

## Version Information

This project follows [Semantic Versioning](https://semver.org/):
- Patch updates (x.x.1): Every single commit
- Minor updates (x.1.x): Every chat/feature session
- Major updates (1.x.x): Significant architectural changes

Current Version: 2.4.1
For detailed changes, see [CHANGELOG.md](docs/CHANGELOG.md).

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

Each dependency serves a specific purpose in our stack:
- PostCSS and Autoprefixer are required for Tailwind CSS to function properly
- Tailwind and its plugins provide our core styling capabilities
- TypeScript and its type definitions ensure type safety
- Zod handles runtime type validation
- Next.js and React form our application foundation

## Project Structure

The project follows a clean, organized structure:

```
├── public/
│   └── images/
│       ├── brand/           # Brand-related assets
│       ├── portfolio-logos/ # Company logos
│       ├── profile/         # Profile photos
│       └── ventures-brands/ # Venture project logos
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── portfolio/      # Portfolio section
│   │   ├── ventures/       # Ventures section
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   └── components/         # Reusable UI components
│       ├── Footer.tsx      # Site footer
│       ├── PortfolioLogos/ # Portfolio grid
│       ├── ProjectCard/    # Project cards
│       ├── navbar.tsx      # Navigation
│       └── theme/          # Theme components
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
3. When using Next.js Image component, always use `onLoad` instead of the deprecated `onLoadingComplete`
4. All assets are optimized during build time

## Building for Production

Build the static site:

```bash
npm run build
```

This generates optimized static files for production deployment.

## Notes

- Leverages Next.js App Router for improved routing and layouts
- All assets are optimized during build
- Static site deployment ready
- Organized asset structure for easy maintenance
- Separated portfolio company logos for better organization