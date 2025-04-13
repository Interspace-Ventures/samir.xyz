#!/bin/bash

# Export port setting
export PORT=5000

# Create a public directory for static assets if it doesn't exist
mkdir -p ./public

# Copy styles to both app and public directories
cp ./app/tailwind.css ./public/tailwind.css

# For now, we'll continue using the static server
exec bun static-server.js
