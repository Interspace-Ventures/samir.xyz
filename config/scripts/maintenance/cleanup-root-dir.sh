#!/bin/bash

# This script cleans up the root directory by moving files to appropriate directories
echo "Cleaning up root directory..."

# Create necessary directories
mkdir -p config/version
mkdir -p tools/archive

# 1. Move version-config.json to config/version directory if it exists in root
if [ -f "version-config.json" ] && [ ! -L "version-config.json" ]; then
  echo "Moving version-config.json to config/version directory..."
  cp version-config.json config/version/version-config.json
  # Create a symlink to maintain compatibility
  ln -sf config/version/version-config.json version-config.json
  echo "Created symlink from version-config.json to config/version/version-config.json"
else
  echo "version-config.json is already properly setup or doesn't exist."
fi

# 2. Clean up attached_assets directory if it only contains .gitkeep
if [ -d "attached_assets" ]; then
  file_count=$(find attached_assets -type f -not -name ".gitkeep" | wc -l)
  if [ "$file_count" -eq 0 ]; then
    echo "No actual files in attached_assets directory, only keeping .gitkeep for compatibility."
    # Add a note explaining this is a placeholder
    echo "This directory is maintained for backward compatibility only. All assets are now in public/attached_assets." > attached_assets/README.txt
  fi
fi

# 3. Run the README cleanup script
if [ -f "tools/scripts/cleanup-readme.sh" ]; then
  echo "Running README cleanup script..."
  chmod +x tools/scripts/cleanup-readme.sh
  ./tools/scripts/cleanup-readme.sh
else
  echo "README cleanup script not found."
fi

# Create a marker file to indicate this script has run
date > tools/archive/root-cleanup-date.txt
echo "Root directory cleanup completed."