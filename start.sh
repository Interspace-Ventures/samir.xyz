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

# Skip the tailwind build for now as we're having npm issues
echo "Skipping Tailwind CSS build due to npm issues..."
mkdir -p public/build
# Create a minimal CSS file to get started
cat > public/build/app.css << EOL
/* Base Tailwind Utilities */
.container { width: 100%; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem; }
@media (min-width: 640px) { .container { max-width: 640px; } }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }

/* Typography */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }

/* Colors */
.text-white { color: white; }
.text-gray-500 { color: #6b7280; }
.text-gray-700 { color: #374151; }
.text-gray-900 { color: #111827; }
.text-indigo-600 { color: #4f46e5; }
.text-indigo-800 { color: #3730a3; }
.bg-white { background-color: white; }
.bg-gray-50 { background-color: #f9fafb; }
.bg-gray-100 { background-color: #f3f4f6; }
.bg-indigo-50 { background-color: #eef2ff; }
.bg-indigo-600 { background-color: #4f46e5; }
.border-gray-200 { border-color: #e5e7eb; }
.border-indigo-600 { border-color: #4f46e5; }

/* Layout */
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.my-8 { margin-top: 2rem; margin-bottom: 2rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-6 { margin-top: 1.5rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.p-4 { padding: 1rem; }

/* Borders */
.rounded-md { border-radius: 0.375rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-full { border-radius: 9999px; }
.border { border-width: 1px; }
.border-t { border-top-width: 1px; }

/* Effects */
.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }

/* Interactivity */
.hover\:bg-indigo-700:hover { background-color: #4338ca; }
.hover\:text-indigo-600:hover { color: #4f46e5; }
.hover\:bg-gray-100:hover { background-color: #f3f4f6; }
.hover\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }

/* Custom Component Classes */
.btn { display: inline-flex; align-items: center; justify-content: center; border-radius: 0.375rem; padding: 0.5rem 1rem; font-weight: 500; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.btn-primary { background-color: #4f46e5; color: white; }
.btn-outline { background-color: white; border: 1px solid #4f46e5; color: #4f46e5; }
.card { background-color: white; border-radius: 0.5rem; border: 1px solid #e5e7eb; overflow: hidden; }
.company-category { display: inline-flex; align-items: center; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; background-color: #eef2ff; color: #4f46e5; }
EOL

echo "Starting Remix development server..."
node ./remix-dev.js
