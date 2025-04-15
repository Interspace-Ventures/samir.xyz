# Portfolio Website

> Personal portfolio website showcasing professional achievements and ventures.

## Table of Contents
- [Project Structure](#project-structure)
  - [Core Directories](#core-directories)
  - [Supporting Directories](#supporting-directories)
  - [Naming Conventions](#naming-conventions)
- [Configuration](#configuration)
  - [Core Configuration](#core-configuration)
  - [Styling Configuration](#styling-configuration)
  - [Asset Configuration](#asset-configuration)
  - [Configuration Best Practices](#configuration-best-practices)
- [Development Tools & Scripts](#development-tools--scripts)
  - [organize-assets.sh](#organize-assetssh)
  - [check-ventures.sh](#check-venturessh)
  - [cleanup-test-dirs.sh](#cleanup-test-dirssh)
  - [Archived Scripts](#archived-scripts)
  - [Best Practices for Scripts](#best-practices-for-scripts)
- [Development Guidelines](#development-guidelines)
  - [Component Structure](#component-structure)
  - [Styling Approach](#styling-approach)
  - [Performance Optimization](#performance-optimization)
  - [Error Handling](#error-handling)
  - [Code Quality Best Practices](#code-quality-best-practices)
- [Artificial Intelligence Model Instructions](#artificial-intelligence-model-instructions)
  - [Model Context](#model-context)
  - [Seven Laws of Artificial Intelligence](#seven-laws-of-artificial-intelligence)
- [Building and Running](#building-and-running)
- [Project Cleanup Notes](#project-cleanup-notes)
- [Version History](#version-history)
  - [Versioning Philosophy](#versioning-philosophy)
  - [Latest Version](#latest-version)
- [License](#license)

## Overview

This portfolio website was built to showcase professional achievements in a modern, technologically advanced presentation. The platform emphasizes:

- Interactive user experience with responsive design
- Clean, consistent visual design patterns
- Optimized performance for quick loading
- Robust error handling and stability
- Maintainable, modular codebase architecture

## Tech Stack

### Core Framework & Runtime
- **Node.js (v20.x)**: JavaScript runtime for the server
- **Remix (v2.16.5)**: React framework for server-side rendering with modern web standards
- **TypeScript (v5.8.2)**: Typed superset of JavaScript for safe development

### Frontend Libraries
- **React (v19.0.0)**: Library for building dynamic user interface components
- **React DOM (v19.0.0)**: DOM-specific methods for React
- **isbot (v5.1.26)**: Bot detection for optimizing server responses

### Styling & UI
- **Tailwind CSS (v4.0.15)**: Utility-first CSS framework for responsive styling
- **@tailwindcss/typography (v0.5.16)**: Typography plugin for Tailwind CSS
- **tailwind-merge (v3.0.2)**: Utility for merging Tailwind CSS classes
- **tailwindcss-animate (v1.0.7)**: Animation utilities for Tailwind CSS
- **class-variance-authority (v0.7.1)**: Utility for creating component variants
- **shadcn (v2.4.0-canary.17)**: UI component library

### CSS Processing
- **postcss (v8.5.3)**: Tool for transforming CSS with JavaScript
- **autoprefixer (v10.4.21)**: PostCSS plugin to parse CSS and add vendor prefixes

### Fonts
- **@fontsource/alexandria (v5.2.5)**: Self-hosted font package

## Project Structure

### Core Directories

- **`/app`**: Main Remix application source code
  - `/routes`: Remix route files
  - `/components`: Reusable React components
  - `/config`: Application configuration files 
  - `/layout`: Layout components and UI structure
  - `/styles`: Global styles and Tailwind configuration
  - `/portfolio`: Portfolio-specific components
  - `/ventures`: Ventures-specific components

- **`/public`**: Static assets served directly
  - `/assets`: Primary location for all categorized assets
    - `/icons`: Icon assets for the UI
    - `/images`: Content images
    - `/logos`: Logo files
  - `/build`: Remix build output for client assets
  - `/styles`: Global stylesheets

- **`/config`**: Configuration files
  - Contains modular configuration files including Tailwind, PostCSS, etc.

- **`/server`**: Server-related files
  - Contains server scripts for production and development

- **`/tools`**: Development and maintenance tools
  - `/scripts`: Helper scripts for automation and asset management
  - `/archive`: Previously used scripts (preserved for reference)

- **`/docs`**: Project documentation
  - Contains README, CHANGELOG, and other documentation files

### Supporting Directories

- **`/build`**: Remix server build output
- **`/attached_assets`**: Original asset files (moved to public during startup)
- **`/node_modules`**: Third-party dependencies (generated)
- **`/temp-backup`**: Temporary backup of files during migration

### Naming Conventions

The project follows consistent naming conventions for better readability and maintenance:

- **Files and Directories**: Uses `kebab-case` for script files and config files (e.g., `organize-assets.sh`)
- **React Components**: Uses `PascalCase` for component names and their files (e.g., `ClientWrapper.tsx`)
- **React Routes**: Follows Remix naming convention with files in `routes` directory like `_index.tsx` and route-specific files
- **CSS and Style Files**: Uses `kebab-case` (e.g., `globals.css`)
- **Configuration Files**: Uses standard naming with appropriate extensions (e.g., `remix.config.js`, `tailwind.config.cjs`)
- **Utility Scripts**: Uses `kebab-case` with descriptive prefixes (e.g., `organize-assets.sh`)

## Configuration

### Core Configuration

- **remix.config.js** - Main Remix configuration
  - Configures server and client build paths
  - Sets up module format and dependencies to bundle
  - Points to config files in their appropriate locations

### Styling Configuration

- **tailwind.config.cjs** - Tailwind CSS configuration
  - Defines custom colors, animation, keyframes, and responsive breakpoints
  - Includes container configurations
  - Sets up typography and animation plugins

- **postcss.config.cjs** - PostCSS configuration
  - Configures Tailwind CSS PostCSS plugin with optimized settings
  - Sets up autoprefixer for better browser compatibility

### Asset Configuration

- **app/config/paths.ts** - Centralizes path configurations for consistent asset references
- **tools/scripts/organize-assets.sh** - Script for normalizing and organizing image assets

### Configuration Best Practices

1. **Keep it Simple**: Avoid creating multiple configuration files for the same tool
2. **Centralize Settings**: Use a single source of truth for configuration values
3. **Document Changes**: Add comments for complex configuration options
4. **Follow Official Patterns**: Adhere to Remix and Tailwind CSS recommended patterns
5. **Performance Optimization**: Include specific performance enhancements in the configuration

## Development Tools & Scripts

### organize-assets.sh

Located in `tools/scripts/organize-assets.sh`, this script handles asset organization and normalization:

- **Purpose**: Ensures consistent image asset locations and naming conventions
- **When it runs**: Automatically executed during the `run-remix.sh` startup process
- **What it does**:
  1. Creates necessary directories for assets
  2. Copies images from `attached_assets` to `public/attached_assets`
  3. Normalizes venture logos with consistent naming
  4. Places logos in `public/logos/ventures` with standardized filenames

### check-ventures.sh

Located in `tools/check-ventures.sh`, this script verifies venture data:

- **Purpose**: Ensures venture images and data are properly loaded
- **When to use**: Run manually for debugging venture data
- **What it does**: Checks for missing venture images and reports any issues

### cleanup-test-dirs.sh

Located in `tools/scripts/cleanup-test-dirs.sh`, this script cleans up test directories:

- **Purpose**: Safely removes or archives test and debug directories
- **When to use**: During codebase cleanup to improve maintainability
- **What it does**: Moves test directories to a backup location for reference

### Archived Scripts

The `tools/archive` directory contains previous scripts that have been preserved for reference but should not be used:

- `check-portfolio-styles.js` - Replaced by improved Tailwind configuration
- `test-grid-with-fetch.js` - No longer needed with current architecture
- `update-navbar-shadows.js` - Functionality now handled by proper CSS

### Best Practices for Scripts

1. **Script Organization**: Keep all utility scripts in the `tools` directory
2. **Documentation**: Document purpose and usage for all scripts
3. **Maintenance**: Archive rather than delete scripts that might be useful for reference
4. **Automation**: Automate repetitive tasks through the startup process
5. **Error Handling**: Include proper error handling and logging in scripts

## Development Guidelines

### Component Structure

- Keep components simple and focused on a single responsibility
- Use proper error boundaries for component error handling
- Follow Remix's component and route architecture
- Organize components by domain and feature

### Styling Approach

- Use Tailwind CSS utilities for styling components
- Avoid inline styles or custom CSS when possible
- Follow the project's design system for consistency
- Maintain responsive design throughout the application

### Performance Optimization

- Utilize Remix's built-in asset handling
- Implement proper code splitting with route-based modules
- Minimize client-side JavaScript with progressive enhancement
- Follow Remix's recommended data loading patterns

### Error Handling

- Use proper error boundaries to catch and display errors
- Implement informative error messages for better debugging
- Avoid error suppression in favor of proper error handling
- Log errors appropriately for debugging

### Code Quality Best Practices

- **No shortcuts that compromise quality** - Never use bad coding practices to solve problems quickly. Quality must never be sacrificed for speed.
  
- **No `!important` flags in CSS** - CSS should be structured with proper specificity hierarchies, not forced with `!important` flags which create maintenance problems.
  
- **No inline styles** - All styling should be managed through Tailwind utility classes or component-specific stylesheets, never with inline style attributes.
  
- **Consistent component architecture** - All components should follow the same patterns and architecture for maintainability.
  
- **Proper separation of concerns** - Keep component logic, styling, and markup appropriately separated following industry best practices.
  
- **10x engineer mindset** - Write clean, optimized, maintainable code that follows all industry best practices, enabling future developers to easily understand and extend the codebase.
  
- **Global vs. component-specific styles** - Keep global styles (in globals.css) truly global, with component-specific styles contained within their respective component files.
  
- **Accessibility standards** - Maintain proper accessibility practices throughout the codebase including proper semantic HTML, ARIA attributes, and keyboard navigation support.

## Artificial Intelligence Model Instructions

### Model Context

When working with this codebase, please adhere to these best practices:

1. **Runtime Environment**: Use Node.js for the server runtime. The project no longer uses Bun.

2. **Framework**: This project is built with Remix, not Next.js. Follow Remix conventions for routing, data loading, and components.

3. **CSS Strategy**: Use Tailwind CSS for styling. The project uses a consolidated approach with minimal global CSS.

4. **Component Structure**: React components are organized in domain-specific directories (/layout, /portfolio, /ventures) for better separation of concerns.

5. **Error Handling**: Use proper error boundaries with the ErrorBoundary component to catch and display errors gracefully.

### Seven Laws of Artificial Intelligence

1. You will never delete more than one file at a time without asking for explicit permission from the user.

2. You will focus on the issue that the user explicitly asks you to focus on and will not attempt to solve other issues unless instructed by the user.

3. You will provide a concrete approach and plan for each user interaction thread. You will solve issues iteratively and check in with the user for guidance and to explain what you are doing on a periodic basis.

4. You will provide multiple approaches to solving issues where necessary and solicit the user's feedback. You will provide your recommendation for best approach.

5. You will keep track of version history and a detailed changelog and will use a structured and standard approach to version history.

6. You will always prioritize code quality and follow best practices, never implementing shortcuts or "hacky" solutions even when they might seem faster. Quality code is maintainable code; use proper CSS specificity instead of `!important`, Tailwind classes instead of inline styles, and appropriate component architecture rather than quick fixes.

7. You will implement solutions with a systems-thinking approach that considers long-term maintainability and scalability. This includes:
   - Using centralized configuration and avoiding duplication of code or assets
   - Creating proper abstractions rather than copy-pasting similar code
   - Ensuring backward compatibility when refactoring
   - Addressing the root cause of issues rather than symptoms
   - Testing changes thoroughly before considering work complete
   - Documenting architectural decisions and their implications
   - Never introducing technical debt knowingly — always factor in the time to do things properly

## Building and Running

The application is configured to run automatically through the "Start application" workflow, which executes `./run-remix.sh`.

```bash
# View application version
cat version.json

# Manual start (if needed)
./run-remix.sh
```

The application will be available at the designated Replit URL or locally at [http://localhost:5000](http://localhost:5000).

## Project Cleanup Notes

The codebase has been significantly optimized to:

1. **Remove Problematic Scripts**: 
   - Removed scripts like `check-portfolio-styles.js`, `test-grid-with-fetch.js`, and `update-navbar-shadows.js` that were directly modifying files or making unnecessary HTTP requests
   - Eliminated code causing hydration errors and unexpected behavior

2. **Optimize Development Process**:
   - Improved `run-remix.sh` to streamline the asset management and server startup
   - Optimized environment variables to follow best practices
   - Streamlined the development server startup process

3. **Consolidate Asset Directories**:
   - Reorganized all assets in `public/assets` with logical subdirectories
   - Created backward compatibility mappings in app/config/paths.ts
   - Eliminated redundant asset directories and duplicate files
   - Integrated asset management into the application startup process

3. **Modernize Component Architecture**:
   - Implemented Remix-based component organization with domain-specific directories
   - Added proper error boundary components for each route
   - Created a simplified theme provider compatible with Remix architecture
   - Organized components by feature rather than technical concern

4. **Improve Configuration**:
   - Added `remix.config.js` to configure the application properly
   - Set up appropriate server port and host configurations
   - Consolidated duplicate Tailwind and PostCSS configurations
   - Enhanced Tailwind config with optimized animations and responsive design features
   - Migrated from Next.js to Remix framework

5. **Better Error Handling**:
   - Implemented proper error boundaries to catch and display errors
   - Removed problematic environment variables like `NEXT_IGNORE_REACT_ERROR`
   - Added better logging for debugging purposes

6. **Asset Management & Project Structure**:
   - Implemented a single source of truth for assets in `public/assets`
   - Created a simplified folder structure with domain-specific component directories
   - Established consistent naming patterns for files and components
   - Implemented Remix-compatible asset loading approaches
   - Documented the asset structure and organization pattern for future maintenance
   - Cleaned up root directory by moving files to appropriate locations
   - Created clean separation between configuration, layout, and domain components

7. **CSS and Styling Improvements**:
   - Removed all `!important` flags from stylesheets for improved maintainability
   - Replaced inline style attributes with Tailwind utility classes throughout the codebase
   - Standardized the globals.css structure with proper layer organization
   - Established consistent link styling with proper dark/light theme support
   - Implemented proper CSS variable usage for theme colors
   - Created consistent component-specific styling patterns
   - Added clear code quality guidelines for future development

## Version History

This project follows a structured versioning system with detailed change tracking in the [docs/CHANGELOG.md](./CHANGELOG.md).

### Versioning Philosophy

The project follows Semantic Versioning with the following custom guidelines:

- **Major Versions (X.0.0)**: Dictated by user requirement changes or significant architectural shifts
- **Minor Versions (0.X.0)**: Represent new chat/interaction cycles with the AI assistant
- **Patch Versions (0.0.X)**: Individual commits within a single chat session

### Latest Version

Current version: 9.1.0 (2025-04-15)

Key updates in the latest version:
- **Codebase Cleanup** - Removed redundant src and temp directories after migrating all content
- **Script Optimization** - Simplified run-remix.sh and removed unnecessary start.sh wrapper
- **Data Consolidation** - Merged all companies and ventures from duplicate sources
- **Profile Enhancement** - Updated profile content with personalized information
- **Documentation Update** - Updated all scripts and workflow references in documentation

Previous version: 9.0.0 (2025-04-14)
- **Framework Migration** - Migrated from Next.js to Remix for improved developer experience and performance
- **Simplified Structure** - Created a dramatically simplified folder structure with domain-specific organization
- **Dependency Cleanup** - Removed unnecessary dependencies including Next.js-related packages and Bun runtime
- **Modern CSS Approach** - Consolidated CSS using Tailwind + minimal global CSS to reduce styling conflicts
- **Improved Documentation** - Updated all documentation to reflect the current Remix-based architecture
- **Enhanced Asset Management** - Reorganized assets with logical directory structure and proper referencing

For detailed changes across all versions, see the [CHANGELOG.md](./CHANGELOG.md).

## License

This project is provided as open source software and can be freely modified and distributed. 
Developed with the assistance of Replit's AI tools and hosted on the Replit platform.
