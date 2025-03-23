#!/bin/sh
# Ultra-simplified startup script v3.4.6
# Designed for maximum compatibility with Replit

echo "Starting Next.js application..."

# Clean up the build directory
rm -rf .next

# Copy assets for image loading
mkdir -p public
cp -r attached_assets/* public/ 2>/dev/null || true

# Set basic environment variables
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development

# Start Next.js in the simplest possible way
exec bun run next dev -p 5000 --hostname 0.0.0.0