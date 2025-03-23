#!/bin/sh
# Ultra-simplified run script v3.4.9
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

# Make sure public directory exists
mkdir -p public

# Make sure public has the same content as attached_assets
echo "Ensuring public folder has access to attached_assets content..."
mkdir -p attached_assets
ln -sf $(pwd)/attached_assets/* $(pwd)/public/ 2>/dev/null || true

# Set enhanced environment variables for React 19 compatibility
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export NODE_OPTIONS="--no-warnings"

# Make sure attached_assets folder is created
mkdir -p attached_assets

echo "Starting Next.js server on port 5000..."

# Start Next.js directly with simplified configuration
exec bun run next dev -p 5000 --hostname 0.0.0.0
