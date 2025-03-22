#!/bin/bash

echo "Starting simple test server..."
bun --version
echo "Bun version check complete"

# Now try to run a simple http server
echo "Running a simple test..."
bun run simple-server.js