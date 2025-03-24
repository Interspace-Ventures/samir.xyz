# Hey - I'm Samir

I drive business impact at fintechs.

## Stack

- **Next.js (v15.2.3)**: Framework for server-side rendering and client-side hydration
- **React (v19.0.0)**: Library for building dynamic user interface components
- **React DOM (v19.0.0)**: DOM-specific methods for React
- **Bun Runtime**: Fast JavaScript/TypeScript runtime (critical for this project)
- **Tailwind CSS (v4.0.15)**: Utility-first CSS framework for responsive styling
- **TypeScript (v5.8.2)**: Typed superset of JavaScript for safe development
- **next-themes (v0.4.6)**: Theme management for Next.js
- **@tanstack/react-query (v5.69.0)**: Data fetching and state management
- **@svgr/webpack (v8.1.0)**: Transform SVGs into React components
- **@tailwindcss/typography (v0.5.16)**: Typography plugin for Tailwind CSS
- **@tailwindcss/postcss (v4.0.15)**: PostCSS plugin for Tailwind
- **autoprefixer (v10.4.21)**: PostCSS plugin to parse CSS and add vendor prefixes
- **postcss (v8.5.3)**: Tool for transforming CSS with JavaScript
- **tailwind-merge (v3.0.2)**: Utility for merging Tailwind CSS classes
- **tailwindcss-animate (v1.0.7)**: Animation utilities for Tailwind CSS
- **react-hydration-provider (v2.1.0)**: Hydration safety utilities for React
- **critters (v0.0.23)**: Critical CSS inlining tool
- **http-server (v14.1.1)**: Simple HTTP server for static content
- **vercel (v41.4.1)**: Deployment platform integration

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

### Latest Version: 4.0.0 (2025-03-23)

Key updates in the latest version:
- Documentation restructuring for improved AI collaboration
- Consolidated documentation to the docs directory
- Enhanced Stack section with detailed package information
- Added AI Model Instructions with context and five laws
- Updated build instructions and version history information

For detailed changes across all versions, see the [CHANGELOG.md](./CHANGELOG.md).

## License

This project is provided as open source software and can be freely modified and distributed. 
Developed with the assistance of Replit's AI tools and hosted on the Replit platform.

