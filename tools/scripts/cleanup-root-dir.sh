#!/bin/bash

# Root Directory Cleanup Script
# This script consolidates and organizes configuration files,
# removes redundant files, and cleans up the root directory.

echo "Starting root directory cleanup..."

# Create config directories if they don't exist
mkdir -p config/next
mkdir -p config/postcss
mkdir -p config/tailwind
mkdir -p tools/archive

# 1. Move configuration files to their proper locations
echo "Moving configuration files to organized locations..."

# Next.js configuration
if [ -f "next-config.js" ]; then
  cp next-config.js config/next/next.config.js
  echo "Moved next-config.js to config/next/next.config.js"
fi

# Tailwind configuration
if [ -f "tailwind-config.cjs" ]; then
  cp tailwind-config.cjs config/tailwind/tailwind.config.cjs
  echo "Moved tailwind-config.cjs to config/tailwind/tailwind.config.cjs"
fi

# PostCSS configuration
if [ -f "postcss-config.cjs" ]; then
  cp postcss-config.cjs config/postcss/postcss.config.cjs
  echo "Moved postcss-config.cjs to config/postcss/postcss.config.cjs"
fi

# 2. Update symlinks
echo "Updating symlinks for configuration files..."

# Ensure next.config.js points to the right location
if [ -L "next.config.js" ]; then
  rm next.config.js
fi
ln -s config/next/next.config.js next.config.js
echo "Updated next.config.js symlink"

# 3. Move/archive backup directory
if [ -d "backup" ]; then
  echo "Moving backup directory to tools/archive..."
  mv backup tools/archive/
fi

# 4. Clean up attached_assets in root (using existing script)
if [ -d "attached_assets" ] && [ -f "tools/scripts/final-cleanup.sh" ]; then
  echo "Cleaning up attached_assets using final-cleanup.sh..."
  bash tools/scripts/final-cleanup.sh --force
fi

# 5. Remove out directory (build artifacts)
if [ -d "out" ]; then
  echo "Removing out directory (build artifacts)..."
  rm -rf out
  mkdir -p out
  touch out/.gitkeep
fi

# 6. Create a simple file to track when this cleanup was done
echo "$(date)" > tools/archive/root-cleanup-date.txt

# 7. Create config pointers instead of modifying package.json
# Instead of directly modifying package.json, create symlinks in the root directory
echo "Creating config pointers for build tools..."
ln -sf config/postcss/postcss.config.cjs postcss.config.cjs 2>/dev/null || true
ln -sf config/tailwind/tailwind.config.cjs tailwind.config.cjs 2>/dev/null || true

echo "Root directory cleanup complete!"
echo "Note: You may need to update any hard-coded references to the moved configuration files."