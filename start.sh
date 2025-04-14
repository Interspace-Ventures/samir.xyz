#!/bin/bash
export PORT=5000
export NODE_ENV=development

# Make sure the public/build directory exists for assets
mkdir -p public/build

# Ensure we have the standard asset directories
mkdir -p public/assets/companies
mkdir -p public/assets/images
mkdir -p public/assets/profiles
mkdir -p public/assets/ventures

# Build the Tailwind CSS file
echo "Building Tailwind CSS file..."
mkdir -p public/build

# Create Tailwind CSS file
TAILWIND_CSS="@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 248 90% 66%;
    --primary-foreground: 210 40% 98%;
  }

  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
  .btn { 
    @apply inline-flex items-center justify-center rounded-md px-4 py-2 font-medium shadow-sm;
  }
  .btn-primary { 
    @apply bg-primary text-white hover:bg-primary/90;
  }
  .btn-outline { 
    @apply bg-white border border-primary text-primary hover:bg-gray-50;
  }
  .card { 
    @apply bg-white rounded-lg border border-gray-200 overflow-hidden;
  }
  .company-category { 
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600;
  }
}"

# Write to both filenames for compatibility
cat > public/build/tailwind.css << EOL
$TAILWIND_CSS
EOL

cat > public/build/app.css << EOL
$TAILWIND_CSS
EOL

echo "Starting Remix development server..."
# Kill any existing processes using port 5000
kill $(lsof -t -i:5000) 2>/dev/null || true
# Start Remix dev server
npx remix dev
