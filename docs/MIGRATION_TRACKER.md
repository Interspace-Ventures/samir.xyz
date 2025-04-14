# Migration Tracker for Portfolio Website

## Project Migration: Next.js to Remix

This document tracks the progress of migrating the website from Next.js framework to Remix.

## Directory Structure Migration

### Completed
- [x] Consolidated `/public/assets` structure with subdirectories for different asset types
  - `/public/assets/companies` - Company logos and images
  - `/public/assets/ventures` - Venture logos and images  
  - `/public/assets/profiles` - Profile photos
  - `/public/assets/logos` - Brand logos and primary brand assets
  - `/public/assets/images` - General images
  - `/public/assets/icons` - Icon files including favicon and app icons
  - `/public/assets/documents` - Document files
  - Added README.md file documenting the asset structure
  - Merged and normalized files from legacy directories:
    - `/public/logos/companies` → `/public/assets/companies` (converted to lowercase with hyphens)
    - `/public/logos/ventures` → `/public/assets/ventures` (normalized naming)
    - `/public/images` → `/public/assets/profiles` and `/public/assets/images` (categorized by type)
  - Removed redundant directories:
    - Eliminated `/public/logos` and `/public/screenshots` directories
    - Moved files from root `/public` directory to appropriate `/public/assets` subdirectories

- [x] Updated image paths in components
  - Updated portfolio.ts file with new image paths
  - Fixed portfolio-card.tsx to use new asset structure
  - Updated venture-card.tsx to handle both legacy and new paths

- [x] Consolidated configuration
  - Updated paths.ts with new directory structure
  - Added backward compatibility for legacy paths

- [x] Updated portfolio data structure
  - Moved portfolio data to config/data directory
  - Updated imports across components to use new paths
  
- [x] Updated ventures components and data
  - Created ventures.ts data file in config/data
  - Rewrote ventures-card.tsx to use standard img instead of Next.js Image
  - Updated ventures-grid.tsx to use the new data structure
  - Enhanced ventures.tsx route to show both projects and investments
  - Consolidated investment criteria and investment venture data into config/data/ventures.ts

### In Progress
- [ ] Simplify component organization
  - Move UI components to consistent location
  - Consider kebab-case naming convention for all component files

- [ ] Refactor stylesheet organization
  - Consolidate global CSS
  - Organize Tailwind usage

- [ ] Complete migration from Next.js specific code
  - Replace Next.js Image component with standard img tags
  - Remove Next.js specific hooks and APIs

- [x] Remove redundant asset directories after migration
  - Created backup in ./temp-backup
  - Consolidated all assets into /public/assets with proper subdirectories
  - Updated all image references to use new paths

### Pending
- [ ] Clean up /src directory once all components are migrated
- [ ] Remove deprecated components and utilities

## Build Process Migration

- [x] Maintain both /build and /public/build directories
- [ ] Update build scripts for Remix compatibility

## Documentation
- [ ] Update README with new project structure
- [ ] Document migration decisions and architecture choices