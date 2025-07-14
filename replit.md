# Portfolio Website - Replit Configuration

## Overview

This is a modern personal portfolio website built with Next.js that showcases professional achievements, portfolio companies, and ventures. The application features a responsive design with smooth animations and a clean, professional interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15.3.1 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom color system and neobrutalism design elements
- **Animations**: Framer Motion for smooth transitions and interactions
- **Font**: Alexandria Google Font for consistent typography

### Backend Architecture
- **Database**: Prisma ORM with PostgreSQL (configured but may need setup)
- **API Routes**: Next.js API routes for data fetching
- **Data Fetching**: TanStack React Query for client-side state management
- **Validation**: Zod for schema validation

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