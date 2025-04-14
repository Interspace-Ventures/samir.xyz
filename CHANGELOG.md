# Changelog

All notable changes to the Portfolio Website project will be documented in this file.

## [8.16.0] - 2025-04-14

### Added
- Created logical subdirectories for companies, ventures, profiles, logos, icons, images, and documents
- Created proper favicon and icon files in the assets/icons directory

### Changed
- Reorganized all assets into standardized directory structure in /public/assets
- Implemented consistent naming conventions for all asset files
- Updated all image path references to use the new standardized directory structure
- Updated root.tsx to reference the correct asset paths for stylesheets and icons

### Removed
- Eliminated redundant /public/logos and /public/screenshots directories
- Removed duplicate files from root /public directory

## [8.15.0] - 2025-04-09

### Added
- Created an emergency navbar that loads via a separate script for guaranteed rendering
- Enhanced navbar with right-aligned navigation links and proper wordmark logo positioning

### Changed
- Implemented a simplified navbar component with improved structure and styling
- Updated navbar with Alexandria font, purple background color, and correct dimensions (80px height)
- Fixed navbar position to stay at the top when scrolling
- Updated footer with version number linked to changelog and consistent purple styling

### Fixed
- Fixed menu items to appear on the same line as logo with proper spacing
- Ensured navbar spans the full width of the page with no white borders

## [8.14.0] - 2025-04-07

### Added
- Implemented shadcn CSS variable system for more consistent theming
- Created custom button variant for filter categories to avoid conflicts
- Added proper theme configuration using shadcn conventions

### Changed
- Updated globals.css to use CSS variables for colors and design tokens
- Replaced direct color references with CSS variables
- Refactored button component to use data attributes for state

### Removed
- Eliminated !important flags by implementing proper CSS specificity
- Removed hard-coded color values in favor of themeable variables 

## [8.13.1] - 2025-04-07

### Fixed
- Fixed styling issue with navbar and footer background color not correctly displaying #5239cc
- Fixed filter category styling to ensure selected categories properly show purple background
- Added CSS specificity overrides with !important flags to resolve styling conflicts
- Resolved Button component styling conflicts by removing defaults that were overriding custom styles

## [8.13.0] - 2025-04-07

### Added
- Enhanced visual styling of active filter categories with purple background and white text

### Changed
- Updated navbar and footer background color to #5239cc for consistent branding
- Simplified portfolio filter categories to match the provided design
- Improved the overall visual consistency of the website

### Fixed
- Fixed duplicate 'All' button issue in the portfolio filters

### Maintained
- Portfolio stats section with TVPI, Gross Multiple, Net Multiple, and IRR metrics
- Portfolio cards displaying in 2 columns on all screen sizes, including mobile

## [8.12.3] - 2025-04-06

### Added
- Added complete stats display with TVPI, Gross Multiple, Net Multiple, and IRR
- Implemented subtle hover scaling animations for better interactivity

### Changed
- Enhanced filter categories with gradient backgrounds, hover effects, and animations
- Added visual polish with shadow effects and improved spacing for filter buttons
- Refined the filter container with gradient background and border styling
- Improved company card styling with full width and proper responsive layout

### Fixed
- Reverted stats section to match original design with 4 columns layout
- Ensured portfolio cards display in 2 columns on all screen sizes, including mobile

## [8.11.0] - 2025-04-05

### Changed
- Updated asset path references in portfolio.ts from `/assets/` to `/attached_assets/`
- Updated favicon references in layout.tsx from `/assets/images/favicon.svg` to `/attached_assets/favicon.png`

### Fixed
- Fixed README.md table of contents link to point correctly to 'Seven Laws of Artificial Intelligence' section
- Verified all asset references using the centralized path structure
- Eliminated 404 errors for images by ensuring consistent asset path usage

### Implemented
- Applied Law #7 principle of using centralized configuration and avoiding duplication

## [7.9.0] - 2025-04-04

### Added
- Added webview compatibility support for Replit environment with specialized scripts
- Created globals.d.ts with TypeScript declarations for webview compatibility

### Changed
- Enhanced CSS with forced visibility rules to prevent loading state in webview
- Improved ThemeProvider with webview-specific detection and rendering optimizations
- Added client-side visibility enforcement via ClientLayout component

### Fixed
- Added CSS fallbacks to ensure content is always visible regardless of theme state
- Fixed discrepancy between browser and webview rendering behaviors
