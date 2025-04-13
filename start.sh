#!/bin/bash
export PORT=5000
export NODE_ENV=development

echo "Building Remix application..."
bun node_modules/@remix-run/dev/dist/cli.js build

echo "Starting static server..."
# Using exec with & causes process tracking issues, use regular call instead
bun static-server.js
