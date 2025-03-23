#!/bin/sh
# Ultra-simplified startup script v3.4.9
# Designed for maximum compatibility with Replit

echo "Starting Next.js application with enhanced debugging..."

# Clean up the build directory
rm -rf .next

# Print system info for debugging
echo "System info:"
echo "Bun version: $(bun -v)"
echo "Current directory: $(pwd)"

# Do NOT copy assets, ensure they stay in the attached_assets folder
# We've modified next.config.js to handle loading from attached_assets directly

# Make sure public directory and structure exists
mkdir -p public/logos public/images public/icons public/logs

# Make sure public has the same content as attached_assets
echo "Ensuring public folder has access to attached_assets content..."
mkdir -p attached_assets

# Copy assets maintaining folder structure instead of simple symlinks
cp -a attached_assets/* public/logos/ 2>/dev/null || true

# Move specific files to appropriate folders
mv public/logos/*.txt public/logs/ 2>/dev/null || true
mv public/logos/*.jpg public/images/ 2>/dev/null || true
mv public/logos/*.webp public/images/ 2>/dev/null || true
mv public/logos/*.svg public/images/ 2>/dev/null || true

# Keep these in root for compatibility
cp public/logos/favicon.png public/ 2>/dev/null || true
cp public/logos/generated-icon.png public/ 2>/dev/null || true

# Set enhanced environment variables for React 19 compatibility
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export NODE_OPTIONS="--no-warnings"

# Make sure attached_assets folder is created
mkdir -p attached_assets

echo "Starting Next.js server on port 5000..."

# Start Next.js directly with simplified configuration
exec bun run next dev -p 5000 --hostname 0.0.0.0