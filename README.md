# Portfolio Website

A simplified personal portfolio website for Samir that embodies true simplicity.

## Tech Stack

- React.js
- Tailwind CSS
- Express.js (simplified server)
- Framer Motion for animations
- Mobile-first responsive design

## Project Structure

The project has been radically simplified to follow a clean, straightforward structure:

- `public/`: Contains all static assets served directly to the client
  - `assets/css/`: Stylesheet files
  - `assets/js/`: JavaScript files
  - `assets/images/`: Image assets
  - `assets/icons/`: Icon files
  - `index.html`: Main HTML entry point

- `server/`: Contains the server implementation
  - `index.ts`: Simple Express server that serves static files from the public directory

## Development & Deployment

The project runs with a single command:

```bash
npm run dev
```

This starts the Express server which serves the static files from the public directory on port 3000.

## Simplification Philosophy

This project has been deliberately simplified to eliminate unnecessary complexity:
- No build process - static assets are served directly
- One server approach - simple Express configuration
- Clear separation of concerns - server code vs static assets
- No staging or complex deployment pipelines

## Notes

- The application uses SPA routing where all unknown routes serve the main `index.html` file
- All assets are pre-built and ready to serve from the `public` directory
- The server is designed to run on Replit with minimal configuration