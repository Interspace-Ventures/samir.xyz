# Portfolio Project Scripts

This directory contains utility scripts for managing the portfolio project. The scripts are organized into the following categories:

## Database Scripts (`/scripts/database`)

### Seeding Data
- `seed-categories.js` - Adds portfolio categories to the database
- `seed-companies.js` - Adds portfolio companies to the database
- `seed-database.js` - Adds sample data (projects, ventures) to the database
- `seed-portfolio.js` - Adds portfolio items to the database

### Updating Data
- `fix-company-names.js` - Updates company names and categories with corrected information
- `fix-company-websites.js` - Updates company websites with correct URLs
- `fix-more-company-names.js` - Updates additional company names with correct formatting
- `update-company-descriptions.js` - Updates descriptions for companies
- `update-company-info.js` - Updates portfolio items with website URLs and descriptions
- `update-company-logos.js` - Updates logo URLs to use PNG images
- `update-company-logos-exact.js` - Updates logo URLs using exact name matches

### Importing Data
- `import-investment-data.js` - Imports investment data from Excel file

## Asset Management (`/scripts/assets`)
- `create-placeholder-logos.js` - Creates SVG placeholder logos for companies

## Utility Scripts (`/scripts/utils`)
- `run-dev.sh` - Development server startup script
- `start-app.sh` - Production server startup script

## Running Scripts

To run a script, use node with the relative path to the script:

```bash
node scripts/database/seed-categories.js
```

For shell scripts:

```bash
bash scripts/utils/start-app.sh
```