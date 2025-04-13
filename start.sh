#!/bin/bash
export PORT=5000
export NODE_ENV=development

echo "Starting server with Bun..."
bun run simple-server.js
