#!/bin/bash

echo "Building Next.js static site..."

# Install dependencies if needed
echo "Checking Next.js dependencies..."

# Build the Next.js site (outputs to /out directory)
echo "Building static site with Next.js..."
bun run next build

# Copy the attached assets to the output directory
echo "Copying attached assets..."
mkdir -p out/attached_assets
cp attached_assets/* out/attached_assets/ 2>/dev/null || :

echo "Next.js static site build complete!"