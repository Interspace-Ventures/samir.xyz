# Deployment Scripts

This directory contains scripts for deploying the portfolio website on various platforms, with a focus on Replit deployment.

## Scripts

### deploy.js

The main deployment script that:
- Checks for the existence of the public directory
- Copies files from the build directory to public if necessary
- Serves static files from the public directory
- Provides SPA routing (serves index.html for unknown routes)

Usage:
```bash
node deploy.js
```

### monitor.js

A process monitor that ensures the deployment server stays running by automatically restarting it if it crashes.

Usage:
```bash
node monitor.js
```

### simple-server.js

A minimalistic server for deployment when you need the absolute simplest solution.

Usage:
```bash
node simple-server.js
```

### deploy-server.js

A fallback server with enhanced debugging capabilities for deployment troubleshooting.

Usage:
```bash
node deploy-server.js
```

## Configuration

All servers are configured to:
- Use port 3000 by default, or the PORT environment variable if specified
- Serve static files from the public directory
- Implement SPA routing by serving index.html for unknown routes
- Handle port conflicts by automatically trying the next available port

## Troubleshooting

If you encounter any issues with deployment:

1. Check that the public directory exists and contains the necessary files
2. Verify that index.html exists in the public directory
3. Ensure all paths are correctly resolved
4. Try running the `deploy-helper.js` script from the root directory
5. Check the console output for any error messages

## Best Practices

- Always build the project before deployment (`npm run build`)
- Use the monitor.js script for production deployments for better reliability
- Keep the public directory clean and organized
- Add proper error handling for all deployment scripts
- Test all deployment configurations before going live