#!/bin/bash
export PORT=5000
export NODE_ENV=development

echo "Starting Remix dev server..."
npx --no-install remix dev --port 5000 --host 0.0.0.0
