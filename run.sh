#!/bin/bash

# Kill any running Next.js instances
pkill -f next-server || true

# Start Next.js
exec npx next dev -p 8080 -H 0.0.0.0