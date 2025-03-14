# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.16] - 2025-03-14

### Changed
- Consolidated all CSS into src/app/globals.css
- Updated/marked other CSS files as deprecated


## [1.1.15] - 2025-03-14

### Changed
- Fixed root route to properly display Profile page
- Marked redundant page components for removal
- Consolidated routing to use Next.js App Router exclusively

## [1.1.14] - 2025-03-14

### Changed
- Consolidated routing to use Next.js App Router exclusively
- Set Profile page as default route at app/page.tsx
- Deprecated pages/profile-page.tsx in favor of app/page.tsx
- Fixed 404 error on root path by setting Profile as index page

## [1.1.13] - 2025-03-14

### Changed
- Consolidated CSS files into a single global.css file
- Removed redundant globals.css in favor of global.css
- Simplified public directory structure by removing redundant assets folder
- Reorganized venture brand images into dedicated ventures-brands directory
- Updated image paths to reflect new directory structure

### Technical Notes
- All global styles now live in src/app/global.css
- Image assets now follow a flatter, more intuitive directory structure


## [1.1.12] - 2025-03-13

### Changed
- Reorganized venture icons into dedicated directory
- Removed test routes and unused files
- Updated venture cards to use full-background images
- Enhanced navbar font styling with proper Inter font integration
- Improved image loading performance with proper sizing
- Organized public assets directory structure

### Removed
- Removed test routes (test-route-1, test-route-2)
- Cleaned up unused server configuration

## [1.1.11] - 2025-03-13

### Changed
- Fixed deprecated `onLoadingComplete` Image property, replaced with `onLoad`
- Updated image loading animation in project cards

### Technical Notes
- Application runs on workflow "Start application" using start-dev.sh
- Development server configured to run on port 5000 with proper host binding

## [1.1.10] - 2025-03-13

### Changed
- Updated Ventures page styling to match Portfolio page header
- Enhanced project cards with consistent hover effects and typography
- Optimized card grid layout to 3 columns per row
- Removed redundant Interspace Ventures card
- Improved mobile responsiveness of venture cards

## [1.1.9] - 2025-03-13

### Changed
- Simplified server configuration to use Next.js directly
- Removed deprecated server/index.ts reference
- Updated start-dev.sh script for proper Next.js configuration
- Added kill-port package for better port management

### Technical Debt
- Workflow configuration needs proper setup for continuous development
- Need to implement proper error handling for port conflicts
- Consider implementing health checks for the Next.js server

## [1.1.8] - 2025-03-11

### Changed
- Enhanced navbar font styling with proper Inter font integration
- Improved responsive design to show menu items at wider range of screen sizes
- Adjusted mobile menu breakpoint to 480px for better usability
- Optimized navbar text with improved leading and tracking

## [1.1.7] - 2025-03-11

### Changed
- Updated portfolio filter categories to be square and left-aligned
- Fixed portfolio logo cards to use true white background in both light and dark modes
- Improved background color matching for portfolio logo images

## [1.1.6] - 2025-03-11

### Changed
- Updated navbar layout and positioning
- Fixed mobile menu and theme toggle alignment
- Added dark mode support for navbar gradient text
- Implemented Inter font in navigation
- Fixed z-index issues with mobile menu
- Updated profile image path to use correct asset

## [1.1.5] - 2025-03-10

### Changed
- Updated navbar design to match minimal aesthetic
- Simplified navigation to three core sections: About, Portfolio, Ventures
- Enhanced mobile responsiveness with cleaner dropdown menu
- Improved theme toggle button styling
- Refined backdrop blur and transparency effects

## [1.1.4] - 2025-03-10

### Changed
- Reorganized project structure for better component organization
- Moved Profile and Portfolio sections to dedicated folders
- Updated navbar design with cleaner look and better responsiveness
- Fixed footer component casing inconsistency

### Added
- New folder structure for major sections
- Improved navigation component styling

## [1.1.3] - 2025-03-10

### Changed
- Simplified deployment setup to use Next.js built-in development server
- Removed custom server configuration
- Streamlined next.config.mjs to only include essential image configuration

### Removed
- Removed unnecessary dependencies (kill-port, tsx)
- Removed custom server implementation

## [1.1.2] - 2025-03-10

### Changed
- Updated Next.js to latest version
- Updated React and React DOM to latest versions
- Simplified Next.js configuration
- Removed deprecated experimental flags

### Fixed
- Fixed package version conflicts
- Improved development server configuration

## [1.1.1] - 2025-03-10

### Changed
- Updated Next.js to version 14.1.0
- Migrated fully to App Router from Pages Router
- Resolved conflicting page routes

### Fixed
- Fixed duplicate route conflicts between pages and app directories
- Updated dependencies to latest compatible versions

## [1.1.0] - 2025-03-10

### Added
- Implemented responsive navbar with purple underline indicators
- Added dark mode toggle with system preference support
- Integrated new profile image in homepage layout
- Created responsive layout with Tailwind CSS
- Added version display in footer

### Changed
- Updated profile page layout to match new design
- Improved theme switching implementation
- Enhanced mobile responsiveness

### Fixed
- Resolved casing issue with Footer component import
- Fixed theme provider configuration

## [1.0.0] - 2025-03-09

### Added
- Complete migration to Next.js with TypeScript
- Established project structure with clear organization
- Set up Tailwind CSS with proper theme configuration
- Integrated Framer Motion for animations
- Added version tracking in footer
- Implemented basic routing structure
- Created placeholder image assets
- Added dark/light mode support with next-themes

### Changed
- Migrated from previous implementation to Next.js
- Restructured project files for better organization
- Updated styling system to use Tailwind CSS

### Technical Debt
- Profile section needs rebuilding with original content
- Portfolio section needs rebuilding with original content
- Ventures section needs rebuilding with original content
- Profile photo placeholder needs replacement
- Company logos are using placeholder SVGs
- Social media links need updating