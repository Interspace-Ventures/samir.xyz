#!/bin/bash

# Generate the Prisma client with the latest schema
echo "Generating Prisma client..."
npx prisma generate

# Start the Next.js development server
echo "Starting Next.js development server on port 8080..."
npx next dev -p 8080 -H 0.0.0.0