#!/bin/bash

# This script consolidates README files and makes the main README more concise
echo "Cleaning up README files..."

# Update the main README.md to be more concise
cat > README.md << 'EOF'
# Portfolio Website

A cutting-edge personal portfolio website leveraging modern web technologies to create an immersive and interactive developer showcase.

## Quick Start

```bash
# Start the development server
./start.sh
```

Visit [http://localhost:5000](http://localhost:5000)

## Documentation

Comprehensive documentation is available in this README file. See individual directories for specific component documentation.

## Tech Stack

- Next.js 15 with React 19
- TypeScript for type safety
- Tailwind CSS for styling
- Bun runtime environment

## Project Structure

- `/src`: Application code
- `/public`: Static assets
- `/config`: Configuration files
- `/tools`: Helper scripts
- `/docs`: Documentation

## Recent Updates

- Restructured directories for better organization
- Consolidated configuration files into dedicated directories
- Improved asset management
- Enhanced error handling

For details, see [changelog](./docs/CHANGELOG.md).
EOF

echo "Updated main README.md to be more concise."

# Add note about README to version-config.json
if grep -q '"documentationConsolidated"' config/version/version-config.json; then
  echo "Documentation consolidation already recorded in version-config.json."
else
  # Update version-config.json to indicate documentation is consolidated
  sed -i 's/"features": {/"features": {\n    "documentationConsolidated": true,/g' config/version/version-config.json
  echo "Updated version-config.json to indicate documentation is consolidated."
fi

echo "README cleanup completed."