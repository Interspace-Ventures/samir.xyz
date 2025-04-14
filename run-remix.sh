#!/bin/bash
set -e # Exit on error

export PORT=5000
export NODE_ENV=development

echo "Setting up directories..."
# Make sure the public/build directory exists for assets
mkdir -p public/build

# Ensure we have the standard asset directories
mkdir -p public/assets/companies
mkdir -p public/assets/images
mkdir -p public/assets/profiles
mkdir -p public/assets/ventures

echo "Processing CSS..."
# Create a simple CSS file
cat > ./public/tailwind.css << EOL
/* Base styles */
body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  color: #333;
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.min-h-screen { min-height: 100vh; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.mt-auto { margin-top: auto; }
.text-center { text-align: center; }
.text-sm { font-size: 0.875rem; }
.text-gray-600 { color: #4b5563; }
.bg-gray-100 { background-color: #f3f4f6; }
EOL

echo "Starting Remix development server..."
# Kill any existing processes using port 5000
kill $(lsof -t -i:5000) 2>/dev/null || true

# Start Remix dev server with npx
echo "Executing: npx remix dev"
npx remix dev