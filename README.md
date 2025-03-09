# Portfolio Website

A radically simplified personal portfolio website for Samir that embodies true simplicity.

## Tech Stack

- Next.js for server-side rendering and optimized builds
- Tailwind CSS for styling
- Framer Motion for animations
- Static file hosting

## Project Structure

The project is organized for maximum simplicity:

- `src/`: React components and application code
  - `pages/`: Next.js page components (index, ventures)
  - `components/`: Reusable UI components

- `public/`: Static assets served directly to the client
  - `assets/images/`: Image assets
    - `profile/`: Profile photos
    - `ventures/`: Venture-related images
  - `assets/icons/`: Icon files

## Development

Run the development server:

```bash
npm run dev
```

This starts Next.js development server with hot module replacement.

## Building for Production

Build the static site:

```bash
npm run build
```

This generates optimized static files for production deployment.

## Features

- Responsive design
- Dark/light mode support
- Animated transitions
- Optimized images and assets
- Simple and maintainable codebase

## Notes

- Leverages Next.js for server-side rendering and routing
- All assets are optimized during build
- Static site deployment ready