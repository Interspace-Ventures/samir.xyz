# Configuration Guidelines

This document provides information about the configuration architecture of the portfolio website.

## Configuration Files

### Core Configuration

- **next.config.js** - Main Next.js configuration
  - Contains settings for image optimization, CORS headers, and development environment
  - Configures cross-origin settings for Replit
  - Sets cache headers for static assets

### Styling Configuration

- **tailwind.config.cjs** - Tailwind CSS configuration
  - Defines custom colors, animation, keyframes, and responsive breakpoints
  - Includes container configurations
  - Sets up typography and animation plugins

- **postcss.config.cjs** - PostCSS configuration
  - Configures Tailwind CSS PostCSS plugin with optimized settings
  - Sets up autoprefixer for better browser compatibility

## Previously Removed Configurations

As part of the codebase cleanup, several redundant configuration files were consolidated:

1. Duplicate Tailwind and PostCSS configurations from `config/tools` were merged into the root config files
2. Modular configuration files in `config/next` were removed as they were not being used

## Asset Configuration

- **src/config/paths.ts** - Centralizes path configurations for consistent asset references
- **tools/scripts/organize-assets.sh** - Script for normalizing and organizing image assets

## Configuration Best Practices

1. **Keep it Simple**: Avoid creating multiple configuration files for the same tool
2. **Centralize Settings**: Use a single source of truth for configuration values
3. **Document Changes**: Add comments for complex configuration options
4. **Follow Official Patterns**: Adhere to Next.js and Tailwind CSS recommended patterns
5. **Performance Optimization**: Include specific performance enhancements in the configuration

## Future Improvements

Potential future configuration improvements:

1. Implement module path aliases for better import organization
2. Set up environment-specific configurations for development, testing, and production
3. Implement bundle analyzer for better performance monitoring