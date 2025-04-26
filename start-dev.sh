#!/bin/bash

# Generate Prisma client
npx prisma generate

# Start Next.js server on port 8080
npx next dev -p 8080 -H 0.0.0.0