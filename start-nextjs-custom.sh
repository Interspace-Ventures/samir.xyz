#!/bin/bash
echo "Starting custom Next.js server on port 3001..."
pkill -f "npx next" || true
export NODE_ENV=development
npx next dev -p 3001 -H 0.0.0.0