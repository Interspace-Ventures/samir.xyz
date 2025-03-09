# Portfolio Website

A radically simplified personal portfolio website for Samir that embodies true simplicity.

## Tech Stack

- Next.js for server-side rendering and optimized builds
- Tailwind CSS for styling
- Framer Motion for animations
- Static file hosting

## Project Structure

The project follows a clean, organized structure:

```
├── public/
│   └── assets/
│       └── images/
│           ├── brand/           # Brand-related assets
│           │   ├── portfolio-logos/  # Company logos used in portfolio
│           │   └── [brand assets]    # Favicons and personal brand logos
│           ├── content/         # General content images
│           ├── profile/         # Profile photos
│           └── ventures/        # Venture-related images
├── src/
│   ├── config/           # Project configuration files
│   │   ├── postcss.config.cjs
│   │   └── tailwind.config.js
│   ├── pages/           # Next.js page components
│   ├── components/      # Reusable UI components
│   └── styles/         # Global styles and themes
└── [Root Configuration] # Essential Next.js files
    ├── next.config.mjs
    ├── tsconfig.json
    └── next-env.d.ts   # Auto-generated Next.js types
```

## Development

Run the development server:

```bash
npm run dev
```

This starts Next.js development server with hot module replacement on port 5000.

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
- Organized asset structure for easy maintenance
- Separated portfolio company logos for better organization