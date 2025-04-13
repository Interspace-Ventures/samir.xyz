#!/bin/bash
export PORT=5000
export NODE_ENV=development

echo "Starting static Express server with Bun..."
bun static-server.js
