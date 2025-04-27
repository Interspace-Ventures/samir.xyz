# samir.xyz

> Hey I'm Samir - I drive business impact at fintechs

## Table of Contents
- [Overview](#overview)
  - [License](#license)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
  - [Core Directories](#core-directories)
  - [Supporting Directories](#supporting-directories)
  - [Naming Conventions](#naming-conventions)
- [Configuration](#configuration)
  - [Core Configuration](#core-configuration)
  - [Styling Configuration](#styling-configuration)
  - [Database Configuration](#database-configuration)
  - [Asset Configuration](#asset-configuration)
  - [Configuration Best Practices](#configuration-best-practices)
- [Development Tools & Scripts](#development-tools--scripts)
- [Artificial Intelligence Model Instructions](#artificial-intelligence-model-instructions)
  - [Model Context](#model-context)
  - [Seven Laws of Artificial Intelligence](#seven-laws-of-artificial-intelligence)
  - [Maximal Quality Minimalism Development Framework](#maximal-quality-minimalism-development-framework)
- [Build + Run](#build--run)
  - [Database Setup](#database-setup)
  - [Replit Configuration](#replit-configuration)
- [Version History](#version-history)
  - [Versioning Philosophy](#versioning-philosophy)
  - [Latest Version](#latest-version)

## Overview

This portfolio website for Samir showcases how he drives business impact at fintechs, presented in a modern, technologically advanced presentation. The platform emphasizes:

- Interactive user experience with responsive design
- Clean, consistent visual design patterns
- Optimized performance for quick loading
- Robust error handling and stability
- Maintainable, modular codebase architecture

### License

This project is provided as open source software and can be freely modified and distributed. 
Developed with the assistance of Replit's AI tools and hosted on the Replit platform.

## Tech Stack

### Core Framework & Runtime
- **Next.js (v15.3.1)**: Framework for server-side rendering and client-side hydration
- **TypeScript (v5.8.3)**: Typed superset of JavaScript for safe development
- **Node.js**: JavaScript runtime environment

### Frontend Libraries
- **React (v19.1.0)**: Library for building dynamic user interface components
- **React DOM (v19.1.0)**: DOM-specific methods for React
- **@tanstack/react-query (v5.74.4)**: Data fetching and state management
- **framer-motion (v12.7.4)**: Animation library for React
- **zod (v3.24.3)**: TypeScript-first schema validation library

### Styling & UI
- **Tailwind CSS (v3.3.0)**: Utility-first CSS framework for responsive styling
- **class-variance-authority (v0.7.1)**: Utility for creating variant components
- **tailwind-merge (v3.2.0)**: Utility for merging Tailwind CSS classes
- **clsx (v2.1.1)**: Utility for conditionally joining classNames
- **lucide-react (v0.501.0)**: Icon library for React

### Data Management
- **Prisma (v6.6.0)**: Next-generation ORM for Node.js and TypeScript
- **@prisma/client (v6.6.0)**: Auto-generated client for database access
- **xlsx (v0.18.5)**: Library for parsing Excel files

### CSS Processing
- **postcss (v8.5.3)**: Tool for transforming CSS with JavaScript
- **autoprefixer (v10.4.21)**: PostCSS plugin to parse CSS and add vendor prefixes

## Project Structure

### Core Directories

- **`/app`**: Main application source code
  - `/api`: API routes for database access (categories, companies, portfolio, ventures)
  - `/components`: Reusable React components (navigation, footer, sections)
  - `/lib`: Utility functions and shared libraries (prisma client)
  - `/portfolio`: Portfolio page component
  - `/portfolio-metrics`: Investment metrics and financial analysis page
  - `/ventures`: Ventures page component
  - `/ventures-new`: Updated ventures page component with enhanced features

- **`/public`**: Static assets served directly
  - `/companies`: Company logos and images
  - `/images`: General image assets
  - `/logos`: Company and venture logos
  - `/ventures`: Venture-related images

- **`/prisma`**: Database configuration and models
  - `/schema.prisma`: Database schema definition

- **`/scripts`**: Development and maintenance tools
  - Various database management scripts for seeding, updating, and fixing data
  - Scripts for managing assets such as company logos
  - Scripts for testing API endpoints and database connections

- **`/attached_assets`**: Original image assets (company logos, etc.)
  - Contains all original PNG files for portfolio companies and ventures
  - Contains screenshots and error examples for reference

### Supporting Directories

- **`/node_modules`**: Third-party dependencies (generated)
- **`/.next`**: Next.js build cache (generated)
- **`/.git`**: Git version control system files
- **`/.cache`**: Build and dependency cache

### Naming Conventions

The project follows consistent naming conventions for better readability and maintenance:

- **Files and Directories**: Uses `kebab-case` for script files and config files (e.g., `organize-assets.sh`)
- **React Components**: Uses `PascalCase` for component names and their files (e.g., `ClientWrapper.tsx`)
- **React Pages**: Follows Next.js naming convention with lowercase `page.tsx` in directories representing routes
- **CSS and Style Files**: Uses `kebab-case` (e.g., `globals.css`)
- **Configuration Files**: Uses standard naming with appropriate extensions (e.g., `next.config.js`, `tailwind.config.cjs`)
- **Utility Scripts**: Uses `kebab-case` with descriptive prefixes (e.g., `organize-assets.sh`)

## Configuration

### Core Configuration

- **next.config.js** - Main Next.js configuration
  - Simple configuration for Next.js 15 compatibility
  - Optimizes for the Replit environment
  - Sets up server-side rendering

- **package.json** - Project dependencies and scripts
  - Defines development and production scripts
  - Lists all project dependencies with versions
  - Configures Prisma and TypeScript settings

- **tsconfig.json** - TypeScript configuration
  - Configures TypeScript compilation options
  - Sets up path aliases for cleaner imports
  - Enables strict type checking for better code quality

### Styling Configuration

- **tailwind.config.js** - Tailwind CSS configuration
  - Defines custom purple theme colors (#8c5cf6, #3D365C)
  - Sets up the Alexandria font as default
  - Configures content paths for Tailwind CSS processing
  - Establishes responsive breakpoints

- **postcss.config.js** - PostCSS configuration
  - Sets up Tailwind CSS processing
  - Configures autoprefixer for better browser compatibility

- **app/globals.css** - Global CSS styles
  - Imports Alexandria font
  - Sets up Tailwind CSS base, components, and utilities
  - Defines global styles and dark mode variants

### Database Configuration

- **prisma/schema.prisma** - Prisma ORM configuration
  - Defines database models and relationships
  - Sets up PostgreSQL connection
  - Configures data types and field constraints
  - Establishes entity relationships (Tags, Projects, Companies, etc.)

### Asset Configuration

- **public/** - Static asset directories
  - Organizes company logos and images
  - Structures venture-related assets
  - Provides direct access to static files

- **attached_assets/** - Source image files
  - Contains all company logos in PNG format
  - Includes sample files and error screenshots for reference

### Configuration Best Practices

1. **Minimal Configuration**: Keep configuration files as simple as possible
2. **Type Safety**: Leverage TypeScript for type checking throughout the application
3. **CSS Structure**: Use Tailwind CSS utility classes instead of custom CSS
4. **Database First**: Keep database schema as the single source of truth
5. **Environmental Adaptation**: Configure application to work seamlessly in Replit environment

## Development Tools & Scripts

### Database Scripts

Located in `scripts/database/`, these scripts handle database operations:

- **seed-database.js**: Seeds the database with initial data
  - Creates sample projects and ventures
  - Adds tags for filtering
  - Sets up basic relationships

- **seed-categories.js**: Initializes portfolio categories
  - Creates consistent categories for portfolio items
  - Sets order values for proper sorting
  - Ensures categories match design requirements

- **seed-companies.js / seed-portfolio.js**: Populates portfolio data
  - Adds company information from screenshots
  - Creates tag relationships
  - Links logos to companies

- **import-investment-data.js**: Imports financial metrics
  - Reads data from Excel spreadsheet
  - Updates portfolio items with investment metrics
  - Converts dates and number formats appropriately

- **update-company-*.js**: Various company data update scripts
  - Fix company names and websites
  - Update descriptions
  - Link company logos to entries

### Asset Management Scripts

Located in `scripts/assets/`:

- **create-placeholder-logos.js**: Creates SVG placeholders
  - Generates branded SVG files for missing logos
  - Creates consistent styling for placeholder images
  - Uses company initials for visual identification

### Utility Scripts

Located in `scripts/utils/`:

- **start-app.sh**: Handles application startup
  - Ensures proper environment setup
  - Configures runtime settings
  - Starts Next.js application correctly

- **run-dev.sh**: Development environment setup
  - Configures development-specific settings
  - Starts application in development mode

### Startup Scripts

Located in the root directory:

- **start-nextjs.sh**: Main application startup script
  - Configures environment variables for Replit
  - Sets proper permissions for execution
  - Ensures application binds to correct port (8080)
  - Uses appropriate startup flags for Replit environment



## Artificial Intelligence Model Instructions

### Model Context

When working with this codebase, please adhere to these best practices:

1. **Runtime Environment**: Always use Bun runtime for optimal performance in the Replit environment. Do not substitute with Node.js.

2. **Source Map Configuration**: Source maps must remain disabled to prevent client-side hydration errors. This configuration exists in `next.config.js` and environment variables in `start.sh`.

3. **Component Structure**: The application uses a specialized `ClientWrapper` component architecture to safely handle client-side hydration issues in the Replit environment.

4. **Next.js Configuration**: The `next.config.js` file contains specific Turbopack and webpack configurations designed for Replit compatibility.

5. **Rendering Strategy**: Use server-side rendering when possible, with client-side hydration handled through dedicated wrapper components.

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

### Maximal Quality Minimalism Development Framework

- **No shortcuts that compromise quality** - Never use bad coding practices to solve problems quickly. Quality must never be sacrificed for speed.
  
- **No `!important` flags in CSS** - CSS should be structured with proper specificity hierarchies, not forced with `!important` flags which create maintenance problems.
  
- **No inline styles** - All styling should be managed through Tailwind utility classes or component-specific stylesheets, never with inline style attributes.
  
- **Consistent component architecture** - All components should follow the same patterns and architecture for maintainability.
  
- **Proper separation of concerns** - Keep component logic, styling, and markup appropriately separated following industry best practices.
  
- **10x engineer mindset** - Write clean, optimized, maintainable code that follows all industry best practices, enabling future developers to easily understand and extend the codebase.
  
- **Global vs. component-specific styles** - Keep global styles (in globals.css) truly global, with component-specific styles contained within their respective component files.
  
- **Accessibility standards** - Maintain proper accessibility practices throughout the codebase including proper semantic HTML, ARIA attributes, and keyboard navigation support.

## Build + Run

The application is configured to run automatically through the Replit "Run" button, which executes `./start-nextjs.sh`.

```bash
# Manual start
./start-nextjs.sh

# Development mode
npx next dev -p 8080

# Build for production
npx next build

# Database operations
npx prisma db push     # Push schema changes to database
node scripts/database/seed-database.js  # Seed database with initial data
node scripts/database/import-investment-data.js  # Import investment metrics
```

The application will be available at the designated Replit URL or locally at [http://localhost:8080](http://localhost:8080).

### Database Setup

This application uses PostgreSQL with Prisma ORM:

1. The database connection is configured through the DATABASE_URL environment variable
2. Prisma schema is defined in `prisma/schema.prisma`
3. The schema includes the following models:
   - **Portfolio**: Companies with investment information (initial investment, valuation, etc.)
   - **Venture**: Creative projects and venture investments
   - **Project**: Additional portfolio projects (legacy model)
   - **Tag**: For project categorization (legacy model)

### Replit Configuration

The application is optimized for the Replit environment:

1. Port 8080 is used instead of the default Next.js port 3000
2. The `start-nextjs.sh` script handles proper binding to `0.0.0.0` instead of localhost
3. Environment variables are properly set for the Replit environment
4. Database connection is configured for the Replit-provided PostgreSQL instance



## Version History

This project follows a structured versioning system with detailed change tracking in the [CHANGELOG.md](./CHANGELOG.md).

### Versioning Philosophy

The project follows Semantic Versioning with the following custom guidelines:

- **Major versions (X.0.0)**: Dictated by user requirement changes or significant architectural shifts
- **Minor versions (0.X.0)**: Represent new chat/interaction cycles with the AI assistant
- **Patch versions (0.0.X)**: Individual commits within a single chat session

### Latest Version

Current version: 8.5.3 (2025-04-27)

Key updates in the latest version:
- **Improved Layout** - Updated ventures grid to 4 columns on desktop, 2 columns on mobile
- **Enhanced Styling** - Changed page background color to #2d0c6a throughout the site
- **Updated Content** - Added Hudson River Trading experience to profile section
- **Fixed Responsiveness** - Set viewport breakpoint to 480px for mobile devices
- **Visual Consistency** - Harmonized background colors and improved filter categories

Previous version: 8.5.2 (2025-04-25)
- **Accurate Project Structure** - Updated README.md with accurate reflection of current codebase structure
- **Enhanced Configuration Documentation** - Added detailed database configuration information
- **Improved Script Documentation** - Updated Development Tools & Scripts section with accurate descriptions
- **Building Instructions** - Added comprehensive building and database setup instructions
- **Replit Environment** - Added Replit-specific configuration details

For detailed changes across all versions, see the [CHANGELOG.md](./CHANGELOG.md).