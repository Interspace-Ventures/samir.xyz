#!/bin/bash

# Export port setting
export PORT=5000

# Try using ESM compatibility flag for Next.js
NODE_OPTIONS="--no-warnings --experimental-modules" exec bun next dev -p $PORT --hostname 0.0.0.0
