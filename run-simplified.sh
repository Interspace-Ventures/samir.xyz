#!/bin/sh
# Ultra-simplified startup script - bare minimum

echo "Starting minimal Next.js server..."

# Do NOT clean up build directory this time
# rm -rf .next

# Ensure public directory exists
mkdir -p public

# Set essential environment variables
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export NODE_OPTIONS="--no-warnings"

# Just start the server with minimal configuration
exec bun run next dev -p 5000 --hostname 0.0.0.0