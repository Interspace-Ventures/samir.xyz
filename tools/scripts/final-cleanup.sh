#!/bin/bash

# Final cleanup script to completely remove the attached_assets directory
# This should only be run once all assets have been successfully migrated
# Usage: ./tools/scripts/final-cleanup.sh [--force]

echo "Final cleanup - removing attached_assets directory now that all assets are consolidated to public/attached_assets"

# Check if there are still files in attached_assets
file_count=$(find attached_assets -type f -not -path "*.gitkeep" -not -path "*public_assets_link*" | wc -l)

if [ "$file_count" -gt 0 ] && [ "$1" != "--force" ]; then
  echo "WARNING: There are still $file_count files in the attached_assets directory."
  echo "Please run ./tools/scripts/organize-assets.sh first to migrate them."
  echo "Or use --force flag to remove the directory anyway."
  exit 1
fi

# Check if public/attached_assets directory exists and has files
if [ ! -d "public/attached_assets" ] || [ "$(find public/attached_assets -type f | wc -l)" -eq 0 ]; then
  echo "ERROR: public/attached_assets directory missing or empty."
  echo "Cannot remove attached_assets until migration is complete."
  echo "Run ./tools/scripts/organize-assets.sh first."
  exit 1
fi

# Check all required venture logos are in public/logos/ventures
required_files=(
  "public/logos/ventures/2de-interspace.png"
  "public/logos/ventures/hey-im-samir.png"
  "public/logos/ventures/interspace.png"
  "public/logos/ventures/perspectives.png"
  "public/logos/ventures/predictive.film-icon-2025.png"
  "public/logos/ventures/solo-wordmark---gradient-2025.png"
)

missing_files=0
for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Missing required file: $file"
    missing_files=$((missing_files+1))
  fi
done

if [ $missing_files -gt 0 ] && [ "$1" != "--force" ]; then
  echo "ERROR: $missing_files required venture logo files are missing."
  echo "Cannot remove attached_assets until all required files are in public/logos/ventures."
  echo "Run ./tools/scripts/organize-assets.sh first or use --force to continue anyway."
  exit 1
fi

# All checks passed or force flag used, remove the directory
echo "Removing attached_assets directory..."
rm -rf attached_assets
echo "Creating a backup placeholder for backward compatibility..."
mkdir -p attached_assets
touch attached_assets/.gitkeep
echo "Final cleanup complete. All assets are now in public/attached_assets only."

# Update version-config.json to indicate the cleanup has been completed
if [ -f "version-config.json" ]; then
  tmp=$(mktemp)
  jq '.features.assetCleanup = true' version-config.json > "$tmp" && mv "$tmp" version-config.json
  echo "Updated version-config.json to indicate asset cleanup is complete."
fi

exit 0