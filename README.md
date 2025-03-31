# Modern Portfolio Website

A cutting-edge personal portfolio website that transforms developer showcasing into an interactive, technologically advanced experience. The platform creates an engaging, dynamic presentation of professional achievements through innovative web technologies.

## Tech Stack

- **Next.js 15** with server-side rendering
- **React 19** with modern JSX runtime
- **Tailwind CSS** for responsive design
- **TypeScript** for robust type management
- **Responsive design** with adaptive layouts
- **Modular architecture** for maintainability

## Development Guidelines

### Best Practices

1. **Component Structure**
   - Keep components simple and focused on a single responsibility
   - Use the Client Wrapper for client-side only components
   - Prefer server components when possible

2. **Styling Approach**
   - Use Tailwind CSS utilities for styling components
   - Avoid inline styles or custom CSS when possible
   - Follow the project's design system for consistency

3. **Performance Optimization**
   - Utilize Next.js image optimization
   - Implement proper code splitting
   - Minimize client-side JavaScript

### Getting Started

To run the development server:

```bash
# Start the Next.js development server
./start.sh
```

The application will be available at [http://localhost:5000](http://localhost:5000).

### Project Structure

- `/src/app`: Application routes and pages
- `/src/components`: Reusable React components
- `/public`: Static assets
- `/config`: Configuration files for Next.js and other tools

## Project Cleanup Notes

The codebase has been significantly optimized to:

1. **Remove Problematic Scripts**: 
   - Removed scripts like `check-portfolio-styles.js`, `test-grid-with-fetch.js`, and `update-navbar-shadows.js` that were directly modifying files or making unnecessary HTTP requests
   - Eliminated code causing hydration errors and unexpected behavior

2. **Optimize Development Process**:
   - Improved `start.sh` to perform selective cache clearing instead of aggressive wiping on each run
   - Optimized environment variables to follow best practices
   - Streamlined the development server startup process

3. **Modernize Component Architecture**:
   - Refactored `ClientWrapper` to use modern React 19 patterns and proper Suspense handling
   - Simplified `client-theme-provider` for better compatibility
   - Added proper error boundaries for better error handling instead of error suppression

4. **Improve Configuration**:
   - Updated `next.config.js` to follow Next.js 15 best practices
   - Added appropriate CORS and cache headers
   - Improved development performance settings
   - Consolidated duplicate Tailwind and PostCSS configurations
   - Enhanced Tailwind config with optimized animations and responsive design features

5. **Better Error Handling**:
   - Implemented proper error boundaries to catch and display errors
   - Removed problematic environment variables like `NEXT_IGNORE_REACT_ERROR`
   - Added better logging for debugging purposes

6. **Asset Management & Project Structure**:
   - Created `organize-assets.sh` script to ensure consistent asset organization
   - Consolidated and normalized image assets for better accessibility
   - Updated paths configuration for consistent image references
   - Removed duplicate configuration files to simplify maintenance
   - Streamlined project structure by eliminating unnecessary directories and files
   - Created `cleanup-test-dirs.sh` to safely move test/debug directories to a backup location
   - Removed ten test/debug directories from src/app to improve codebase maintainability