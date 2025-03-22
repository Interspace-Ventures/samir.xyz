# Portfolio Website Documentation

This directory contains documentation for the Portfolio Website project.

## Contents

- [README](./README.md) - Project overview and setup instructions
- [CHANGELOG](./CHANGELOG.md) - Version history and detailed changes

## Project Structure

The project follows a modular structure with configuration files organized into dedicated directories:

- `/config` - Contains modular configuration files:
  - `/config/next` - Next.js configuration modules
  - `/config/tools` - Configuration for tools like Tailwind and PostCSS
  - `/config/typescript` - TypeScript configuration
- `/docs` - Project documentation (you are here)
- `/public` - Static assets
- `/src` - Application source code

## Architecture

The application is built with:
- Next.js for server-side rendering
- React.js for dynamic user interface
- Tailwind CSS for responsive styling
- TypeScript for type-safe development

## Development Workflow

1. The application starts through the Replit workflow defined in `.workflow-config.json`
2. The workflow executes `start.sh` which:
   - Sets environment variables
   - Starts Next.js in development mode

## Version History

See the [CHANGELOG](./CHANGELOG.md) for detailed version history.