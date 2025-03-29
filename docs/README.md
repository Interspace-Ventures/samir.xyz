# Hey - I'm Samir

I drive business impact at fintechs.

## Outline

- [Stack](#stack) - Technologies used in this project
  - [Core Framework & Runtime](#core-framework--runtime) - Key platform technologies
  - [Frontend Libraries](#frontend-libraries) - React ecosystem components
  - [Styling & UI](#styling--ui) - Visual presentation tools
  - [CSS Processing](#css-processing) - Style transformation tools
  - [Development & Deployment](#development--deployment) - Infrastructure tools
- [Repository Overview](#repository-overview) - Directory structure and naming conventions
  - [Core Directories](#core-directories) - Main application directories
  - [Supporting Directories](#supporting-directories) - Additional resource directories
  - [Naming Conventions](#naming-conventions) - File and directory naming patterns
- [Artificial Intelligence Model Instructions](#artificial-intelligence-model-instructions) - Guidelines for AI
  - [Model Context](#model-context) - Technical context for AI models
  - [Five Laws of Artificial Intelligence](#five-laws-of-artificial-intelligence) - Rules for AI collaboration
- [Build Instructions](#build-instructions) - How to run the application
- [Version History](#version-history) - Tracking changes and updates
  - [Versioning Philosophy](#versioning-philosophy) - How versions are structured
  - [Latest Version](#latest-version-410-2025-03-24) - Current release details
- [License](#license) - Open source licensing information

## Stack

### Core Framework & Runtime
- **Bun Runtime**: Fast JavaScript/TypeScript runtime (critical for this project)
- **Next.js (v15.2.3)**: Framework for server-side rendering and client-side hydration
- **TypeScript (v5.8.2)**: Typed superset of JavaScript for safe development

### Frontend Libraries
- **React (v19.0.0)**: Library for building dynamic user interface components
- **React DOM (v19.0.0)**: DOM-specific methods for React
- **@tanstack/react-query (v5.69.0)**: Data fetching and state management
- **react-hydration-provider (v2.1.0)**: Hydration safety utilities for React
- **next-themes (v0.4.6)**: Theme management for Next.js

### Styling & UI
- **Tailwind CSS (v4.0.15)**: Utility-first CSS framework for responsive styling
- **@tailwindcss/typography (v0.5.16)**: Typography plugin for Tailwind CSS
- **tailwind-merge (v3.0.2)**: Utility for merging Tailwind CSS classes
- **tailwindcss-animate (v1.0.7)**: Animation utilities for Tailwind CSS
- **@svgr/webpack (v8.1.0)**: Transform SVGs into React components

### CSS Processing
- **postcss (v8.5.3)**: Tool for transforming CSS with JavaScript
- **@tailwindcss/postcss (v4.0.15)**: PostCSS plugin for Tailwind
- **autoprefixer (v10.4.21)**: PostCSS plugin to parse CSS and add vendor prefixes
- **critters (v0.0.23)**: Critical CSS inlining tool

### Development & Deployment
- **http-server (v14.1.1)**: Simple HTTP server for static content
- **vercel (v41.4.1)**: Deployment platform integration

## Repository Overview

The project follows a structured organization with the following key directories:

### Core Directories

- **`/src`**: Main application source code
  - `/app`: Next.js application routes and pages
  - `/components`: Reusable React components
  - `/config`: Application configuration files
  - `/lib`: Utility functions and shared libraries
  - `/styles`: Global styles and Tailwind configuration

- **`/public`**: Static assets served directly
  - `/icons`: Icon assets for the UI
  - `/images`: Image assets for content
  - `/logos`: Logo files for companies and brands
  - `/logs`: Application logs for debugging

- **`/config`**: Configuration files
  - `/next`: Next.js specific configuration
  - `/tools`: Build tools configuration
  - `/typescript`: TypeScript configuration

- **`/out`**: Static HTML export from Next.js build
  - Contains the pre-rendered HTML, CSS, and assets

- **`/docs`**: Project documentation
  - `README.md`: This documentation file
  - `CHANGELOG.md`: Version history

### Supporting Directories

- **`/attached_assets`**: Original asset files before processing
- **`/node_modules`**: Third-party dependencies (generated)
- **`/.next`**: Next.js build cache (generated)

### Naming Conventions

The project follows consistent naming conventions for better readability and maintenance:

- **Files and Directories**: Uses `kebab-case` for script files and config files (e.g., `bun-simple-server.js`, `generate-simple-site.sh`)
- **React Components**: Uses `PascalCase` for component names and their files (e.g., `ClientWrapper.tsx`, `PortfolioCards.tsx`)
- **React Pages**: Follows Next.js naming convention with lowercase `page.tsx` in directories representing routes
- **CSS and Style Files**: Uses `kebab-case` (e.g., `globals.css`)
- **Configuration Files**: Uses standard naming with appropriate extensions (e.g., `next.config.js`, `tailwind.config.cjs`)
- **Utility Scripts**: Uses `kebab-case` with descriptive prefixes (e.g., `simple-start.sh`, `smart-start.sh`)

## Artificial Intelligence Model Instructions

### Model Context

When working with this codebase, please adhere to these best practices:

1. **Runtime Environment**: Always use Bun runtime for optimal performance in the Replit environment. Do not substitute with Node.js.

2. **Source Map Configuration**: Source maps must remain disabled to prevent client-side hydration errors. This configuration exists in `next.config.js` and environment variables in `start.sh`.

3. **Component Structure**: The application uses a specialized `ClientWrapper` component architecture to safely handle client-side hydration issues in the Replit environment.

4. **Next.js Configuration**: The `next.config.js` file contains specific Turbopack and webpack configurations designed for Replit compatibility.

5. **Rendering Strategy**: Use server-side rendering when possible, with client-side hydration handled through dedicated wrapper components.

### Five Laws of Artificial Intelligence

1. You will never delete more than one file at a time without asking for explicit permission from the user.

2. You will focus on the issue that the user explicitly asks you to focus on and will not attempt to solve other issues unless instructed by the user.

3. You will provide a concrete approach and plan for each user interaction thread. You will solve issues iteratively and check in with the user for guidance and to explain what you are doing on a periodic basis.

4. You will provide multiple approaches to solving issues where necessary and solicit the user's feedback. You will provide your recommendation for best approach.

5. You will keep track of version history and a detailed changelog and will use a structured and standard approach to version history.

## Build Instructions

The application is configured to run automatically through the "Start application" workflow, which executes `./start.sh`.

```bash
# View application version
cat version.json

# Manual start (if needed)
./start.sh
```

## Version History

This project follows a structured versioning system with detailed change tracking in the [CHANGELOG.md](./CHANGELOG.md).

### Versioning Philosophy

The project follows [Semantic Versioning](https://semver.org/) with the following custom guidelines:

- **Major Versions (X.0.0)**: Dictated by user requirement changes or significant architectural shifts
- **Minor Versions (0.X.0)**: Represent new chat/interaction cycles with the AI assistant
- **Patch Versions (0.0.X)**: Individual commits within a single chat session

### Latest Version: 4.5.0 (2025-03-29)

Key updates in the latest version:
- Improved navbar responsiveness to show menu at all but the narrowest viewports
- Updated mobile navigation to respond to content width rather than device type
- Created adaptive menu spacing that adjusts to available viewport width
- Ensured menu visibility on medium and larger screens for better usability
- Maintained consistent purple accent styling across all viewport sizes

For detailed changes across all versions, see the [CHANGELOG.md](./CHANGELOG.md).

## License

This project is provided as open source software and can be freely modified and distributed. 
Developed with the assistance of Replit's AI tools and hosted on the Replit platform.

