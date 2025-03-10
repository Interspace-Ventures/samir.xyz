# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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