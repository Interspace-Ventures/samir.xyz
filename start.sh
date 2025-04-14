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
echo "Building Tailwind CSS from consolidated file..."
mkdir -p public/build

# Create Tailwind CSS files - create both to ensure compatibility
cat > public/build/tailwind.css << EOL
@tailwind base;
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
}
EOL

# Create a copy with app.css name as that's what the error is looking for
cp public/build/tailwind.css public/build/app.css

echo "Starting Remix development server..."
npx remix dev
