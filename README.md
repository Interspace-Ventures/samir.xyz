# Portfolio Website

A modern portfolio website that embodies over-engineered simplicity, enabling users to write, design, code, and build ventures powered by artificial intelligence.

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- Framer Motion for animations
- AI-enhanced project building tools
- Mobile-first responsive design
- Advanced interactive project presentation
- Domain redirection capabilities

## Development

To start the development server:

```bash
npm run dev
```

This will start the development server on port 3000.

## Building for Production

To build the project for production:

```bash
npm run build
```

This will create a production build in the `build` directory.

## Deployment

This project is designed to be easily deployed on Replit. There are several deployment options available:

### Option 1: Using Replit Deployment

The project is configured to deploy using the `deploy.js` script, which is a production-ready Express server that serves the static files from the `public` directory.

### Option 2: Using Deployment Monitor (recommended)

For more robust deployment with automatic restart capability:

```bash
node deployment-monitor.js
```

The deployment monitor will automatically restart the server if it crashes, making the deployment more resilient.

### Option 3: Using the Simple Server

For a minimalistic approach:

```bash
node server.js
```

### Deployment Helper

A useful helper script is included to make deployment easier:

```bash
node deploy-helper.js
```

This script will:
- Check if all necessary deployment files are available
- Verify the public directory and its contents
- Provide guidance on the different deployment options

## Project Structure

- `/client`: Frontend React application
- `/public`: Static assets served in production
- `/build`: Production build output
- `/scripts/deployment`: Deployment-related scripts
- `/server`: Backend server code

## Notes

- The application is designed to work in both development and production environments.
- Static assets are served from the `public` directory in production.
- For SPA routing, all unknown routes will serve the main `index.html` file.