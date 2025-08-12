# Portfolio Website - Replit Configuration

## Overview

This is a modern personal portfolio website built with Next.js that showcases professional achievements, portfolio companies, and ventures. The application features a responsive design with smooth animations and a clean, professional interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (2025-07-27)

- **TypeScript Compilation Fixes**: Fixed deployment error by adding proper type annotations for 'venture' and 'index' parameters in map function (ventures-grid-detailed.tsx line 55)
- **Animation Types Update**: Updated AnimationVariants interface to be compatible with Framer Motion's Variants type by adding index signature
- **Ventures Page Types**: Added proper TypeScript types for Venture interface including status property to resolve compilation errors
- **Build Success**: All TypeScript errors resolved, Next.js build now completes successfully with ✓ Linting and checking validity of types
- **Bio Update**: Updated role to "Global Strategic Partnerships Finance at Block" covering Cash App, Square, Tidal, and Proto ecosystems
- **Ventures Gallery Fix**: Fixed broken ventures display by copying logos to public/attached_assets folder
- **Venture Cards Styling**: Made venture cards square (aspect-square) distinct from rectangular portfolio cards
- **Ventures Skeleton Loader**: Added neobrutalism.dev skeleton loading animation instead of text
- **Pre-launch Links**: Ventures with "Pre-launch" status now link to /launching-soon page (moonshot, omni, predictive, solo)
- **Database Category Consolidation**: Merged "Health" and "Retail" categories into "Commerce", moved Aura & Playbook to "SaaS"
- **Performance Optimization**: Fixed portfolio API slowness by removing excessive console.log statements (7x speed improvement: 1.3s → 0.18s)
- **Hover Effects Fixed**: Redesigned portfolio card hover behavior using inline styles for proper shadow alignment
- **Component Fixes**: Removed duplicate CardHeader declarations and invalid 'interactive' prop errors
- **Filter Button Styling**: Implemented proper neobrutalism.dev button styling with white text when active
- **Shadow Consistency**: Standardized 4px shadows with smooth transitions across all card types
- **Background Fix**: Set proper background color #332452 across the site
- **Code Quality Improvements**: Major refactoring to remove all !important CSS, eliminate inline styles, and create reusable design tokens
- **Design System**: Created centralized design tokens (`lib/constants/design-tokens.ts`) for colors, shadows, transitions, and breakpoints
- **Neobrutalist Utilities**: Built reusable neobrutalist component utilities (`lib/utils/neobrutalist.ts`) for consistent styling
- **CSS Cleanup**: Removed duplicate animations, !important declarations, and hard-coded values from globals.css
- **Component Refactoring**: Updated all card components to use utility classes instead of inline styles for better maintainability
- **Status Badge Fix**: Fixed Markup/Acquired badges to properly display purple (#7f54dc) and gray (#6b7280) backgrounds with white text
- **Hover Overlay Consistency**: Unified hover overlay effects across Portfolio and Ventures cards with consistent purple gradient
- **Metrics Update**: Updated portfolio metrics to reflect current state - Busts: 8, IRR: 13%, # Investments: 42
- **Portfolio Cleanup**: Removed The Food Company from gallery display as it's busted
- **Skeleton Loader Simplification**: Made portfolio loading skeletons cleaner and simpler like ventures page with subtle shimmer effects
- **Ventures Display Update**: Limited ventures display to only active ventures: 2DE, Interspace, TBH, and Moonshot (removed Solo, Omni, samir.xyz, and Predictive)

## Recent Changes (2025-01-12)

- **Portfolio Update**: Removed Superplastic from portfolio (deal went bust)
- **Metrics Updates**: 
  - Changed # Busts from 7 to 8
  - Changed # Investments from 37 to 42
  - Changed "Gross Multiple" label to "Gross MOIC"
  - Changed "Net Multiple" label to "Net MOIC"

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15.3.1 with App Router
- **Language**: TypeScript for type safety with centralized type definitions
- **Styling**: Tailwind CSS with custom neobrutalism component system
  - Design tokens in `lib/constants/design-tokens.ts` (colors, shadows, transitions, breakpoints)
  - Neobrutalist utilities in `lib/utils/neobrutalist.ts` for consistent card and grid styling
  - CSS utility classes for reusable components (neobrutalist-shadow, status-badge, etc.)
- **Animations**: Framer Motion with centralized animation utilities
- **Font**: Alexandria Google Font for consistent typography
- **Component Library**: Reusable UI components with consistent API patterns

### Backend Architecture
- **Database**: Prisma ORM with PostgreSQL
- **API Routes**: Next.js API routes optimized for performance
- **Data Fetching**: TanStack React Query with centralized hooks and caching
- **Validation**: Zod for schema validation
- **Error Handling**: Comprehensive error boundaries and fallback states

### Code Organization
- **`/lib`**: Core utilities, types, constants, and custom hooks
- **`/components/ui`**: Reusable UI component library
- **`/components/portfolio`**: Portfolio-specific components
- **`/components/ventures`**: Venture-specific components
- **`/app`**: Next.js app router pages and layouts

### Key Components

#### Core Pages
- **Home Page**: Profile section with professional introduction
- **Portfolio Page**: Filterable grid of portfolio companies with categories
- **Ventures Page**: Showcase of personal ventures and projects

#### Reusable Components
- **Navigation**: Fixed header with logo and navigation links
- **Footer**: Site footer with version information
- **Company Cards**: Display portfolio companies with logos, descriptions, and categories
- **Filter System**: Category-based filtering for portfolio items

#### Database Schema
- **Portfolio Table**: Companies with name, description, category, logoUrl, website
- **Category Table**: Portfolio categories with display order
- **Tag Table**: Tagging system for portfolio items
- **Venture Table**: Personal ventures and projects

## Data Flow

1. **Database Layer**: Prisma client connects to PostgreSQL database
2. **API Layer**: Next.js API routes serve data to frontend
3. **Client State**: React Query manages client-side data caching and synchronization
4. **Component Layer**: React components consume data through hooks
5. **UI Layer**: Tailwind CSS classes provide consistent styling

## External Dependencies

### Core Dependencies
- **@prisma/client**: Database ORM client
- **@tanstack/react-query**: Data fetching and state management
- **framer-motion**: Animation library
- **lucide-react**: Icon library
- **class-variance-authority**: Utility for component variants
- **clsx & tailwind-merge**: CSS class management utilities

### Development Tools
- **TypeScript**: Type checking and development experience
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## Deployment Strategy

### Replit Configuration
- **Entry Point**: `index.js` serves as the main entry point for Replit
- **Start Script**: `start.sh` handles environment setup and server startup
- **Port**: Application runs on port 3000 by default
- **Environment**: Development mode with hot reloading

### Build Process
- Next.js handles static generation and server-side rendering
- Prisma generates database client during build
- Tailwind CSS compiles utility classes
- TypeScript compiles to JavaScript

### Asset Management
- Static assets stored in `public/` directory
- Company logos in `attached_assets/` directory
- Favicon and icons configured in layout
- Images optimized through Next.js Image component

### Database Setup
- Prisma schema defines database structure
- Migration scripts in `scripts/` directory
- Seed data for portfolio companies and categories
- Database connection configured through environment variables

### Error Handling
- Global error boundary for React errors
- Loading states for async operations
- Fallback UI for failed requests
- Console error logging for debugging

The application follows a clean architecture pattern with clear separation of concerns, making it easy to maintain and extend. The codebase emphasizes performance, accessibility, and user experience while maintaining developer productivity.