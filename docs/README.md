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

## Important Development Notes

### Critical Configuration Requirements

1. **Always use Bun runtime** - This project must use Bun instead of Node.js for proper hydration in the Replit environment.

2. **Source Map Management** - Source maps must be disabled to prevent client-side hydration errors.
   - This is handled in both `next.config.js` and environment variables in `start.sh`

3. **Hydration Safety** - The application uses `ClientWrapper` components to safely handle client-side hydration.

4. **Turbopack Configuration** - Special configuration in `next.config.js` ensures compatibility with Replit.

### Avoiding Common Issues

To prevent the hydration and infinite loading issues from recurring:

1. **DO NOT** modify environment variables in `start.sh` that control the runtime (keep using Bun)
2. **DO NOT** enable source maps or source map related features
3. **DO NOT** change the `ClientWrapper` implementation which safely handles hydration
4. **DO NOT** modify the webpack configuration that disables source maps

## Running the Application

The application is configured to run automatically through the "Start application" workflow, which executes `./start.sh`.

```bash
# View application version
cat version.json

# Manual start (if needed)
./start.sh
```

## Version History

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

## Troubleshooting

If you encounter any issues:

1. Check the logs for source map or webpack related errors
2. Ensure Bun is being used as the runtime
3. Clear cache files with `rm -rf .next` and `rm -rf node_modules/.cache`
4. Restart the application with the workflow