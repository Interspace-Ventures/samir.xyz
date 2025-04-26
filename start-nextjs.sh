#!/bin/bash

# Generate the Prisma client with the latest schema
echo "Generating Prisma client..."
npx prisma generate

# Start the Next.js development server
echo "Starting Next.js development server..."
npx next dev -p 3000 -H 0.0.0.0