# Hey - I'm Samir

I drive business impact at fintechs.

## Technology Stack

- **Next.js 15.2.3**: Server-side rendering and client-side hydration
- **React 19**: Dynamic user interface components
- **Bun Runtime**: Fast JavaScript/TypeScript runtime (critical for this project)
- **Tailwind CSS**: Responsive styling
- **TypeScript**: Type-safe development

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