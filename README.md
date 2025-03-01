# Portfolio Website

A radically simplified personal portfolio website for Samir that embodies true simplicity.

## Tech Stack

- Express.js (simplified server)
- Pre-built static assets

## Project Structure

The project has been radically simplified to the bare essentials:

- `public/`: Contains all static assets served directly to the client
  - `assets/css/`: Stylesheet files
  - `assets/js/`: JavaScript files including pre-built React components
  - `assets/images/`: Image assets
  - `assets/icons/`: Icon files
  - `index.html`: Main HTML entry point

- `server/`: Contains the minimal server implementation
  - `index.ts`: Simple Express server that serves static files from the public directory

## Development & Deployment

The project runs with a single command:

```bash
npm run dev
```

This starts the Express server which serves the static files from the public directory on port 3000.

## Radical Simplification

This project has been deliberately simplified to the absolute minimum:
- No build process - pre-built static assets are served directly
- One server approach - simple Express configuration
- No config files, no client code, no build scripts
- All unnecessary directories have been removed:
  - ✓ Removed `client/` directory (React source)
  - ✓ Removed `config/` directory (build configurations)
  - ✓ Removed `attached_assets/` directory (duplicate assets)
  - ✓ Removed `screenshots/` directory (documentation only)

## Notes

- The application uses SPA routing where all unknown routes serve the main `index.html` file
- All assets are pre-built and ready to serve from the `public` directory
- The server is designed to run on Replit with minimal configuration