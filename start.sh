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
# Create a more comprehensive CSS file with Tailwind-like utility classes
cat > ./public/tailwind.css << CSSEOF
/* Enhanced styles mimicking Tailwind utilities */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --primary: 248 90% 66%;
  --primary-foreground: 210 40% 98%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --secondary: 220 14.3% 95.9%;
  --secondary-foreground: 220.9 39.3% 11%;
  --muted: 220 14.3% 95.9%;
  --muted-foreground: 220 8.9% 46.1%;
  --border: 214.3 31.8% 91.4%;
  --accent: 248 90% 66%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 248 90% 66%;
  --primary-foreground: 0 0% 100%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --border: 217.2 32.6% 17.5%;
  --accent: 248 90% 66%;
}

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  color: rgb(var(--foreground));
  background-color: rgb(var(--background));
}

/* Layout utilities */
.container { width: 100%; max-width: 1200px; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-grow { flex-grow: 1; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.min-h-screen { min-height: 100vh; }
.h-24 { height: 6rem; }
.w-24 { width: 6rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.my-4 { margin-top: 1rem; margin-bottom: 1rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-10 { margin-bottom: 2.5rem; }
.mb-12 { margin-bottom: 3rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-auto { margin-top: auto; }
.p-6 { padding: 1.5rem; }
.p-4 { padding: 1rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.pl-4 { padding-left: 1rem; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.space-y-4 > * + * { margin-top: 1rem; }
.space-y-6 > * + * { margin-top: 1.5rem; }
.space-x-6 > * + * { margin-left: 1.5rem; }
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 768px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\\:block { display: block; }
  .md\\:hidden { display: none; }
}
.hidden { display: none; }
.block { display: block; }
.max-w-4xl { max-width: 56rem; }

/* Typography */
.text-center { text-align: center; }
.text-sm { font-size: 0.875rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.text-primary { color: rgb(var(--primary)); }
.text-white { color: white; }
.text-gray-500 { color: #6b7280; }
.text-gray-600 { color: #4b5563; }
.text-gray-700 { color: #374151; }
.text-gray-900 { color: #111827; }
.text-purple-700 { color: #7e22ce; }

/* Background utilities */
.bg-primary { background-color: rgb(var(--primary)); }
.bg-gray-50 { background-color: #f9fafb; }
.bg-gray-100 { background-color: #f3f4f6; }
.bg-white { background-color: white; }

/* Border utilities */
.border-l-4 { border-left-width: 4px; border-left-style: solid; }
.border-primary { border-color: rgb(var(--primary)); }
.rounded-full { border-radius: 9999px; }
.rounded-lg { border-radius: 0.5rem; }
.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }

/* Interactive elements */
.hover\\:text-purple-700:hover { color: #7e22ce; }
.hover\\:underline:hover { text-decoration: underline; }
CSSEOF

echo "Starting Remix development server..."
# Kill any existing processes using port 5000
kill $(lsof -t -i:5000) 2>/dev/null || true

# Start Remix dev server with Bun
echo "Executing: bun run remix dev"
bun run remix dev
