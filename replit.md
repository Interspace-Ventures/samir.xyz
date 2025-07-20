# Portfolio Website - Replit Configuration

## Overview

This is a modern personal portfolio website built with Next.js that showcases professional achievements, portfolio companies, and ventures. The application features a responsive design with smooth animations and a clean, professional interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (2025-07-20)

- **Neobrutalism.dev Migration**: Successfully migrated from custom neobrutalism to official neobrutalism.dev components
- **Component Updates**: Updated Button and Card components to use neobrutalism.dev styling with full variant support
- **Enhanced Shadows**: Increased portfolio card shadow depth (8px → 12px on hover) for stronger visual impact
- **CSS Configuration**: Updated Tailwind config to support shadcn/ui color system and CSS custom properties
- **Filter Improvements**: Enhanced filter buttons with bold fonts and consistent neobrutalism styling
- **Previous Changes (2025-07-15)**: 10x Engineer refactor with type safety, component system, and performance optimizations

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15.3.1 with App Router
- **Language**: TypeScript for type safety with centralized type definitions
- **Styling**: Tailwind CSS with custom neobrutalism component system
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