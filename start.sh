#!/bin/bash
export PORT=5000
export NODE_ENV=development

# Make sure the public directory exists
mkdir -p public/build
mkdir -p public/logos/companies

# Copy logo files to public directory if they don't exist
if [ ! -f "public/logos/companies/Afar.png" ]; then
  cp -r public/* public/logos/companies/ 2>/dev/null || true
fi

# Build the Tailwind CSS file
echo "Building Tailwind CSS from consolidated file..."
mkdir -p public/build

# Create a basic Tailwind CSS file - will be processed by Remix
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

echo "Starting Remix development server..."
npx remix dev
