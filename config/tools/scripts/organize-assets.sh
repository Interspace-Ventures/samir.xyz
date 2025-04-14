#!/bin/bash

# Script to organize assets into consistent locations for the Next.js app
# This ensures all images are properly accessible from the public directory
# UPDATED: Now consolidates all assets to public/attached_assets folder only

echo "Organizing image assets..."

# Create necessary directories
mkdir -p public/attached_assets
mkdir -p public/logos/ventures
mkdir -p public/images

# Migrate assets from root attached_assets to public/attached_assets
# This is a one-time consolidation to eliminate duplicate asset folders
if [ -d "attached_assets" ]; then
  echo "Migrating assets from attached_assets to public/attached_assets..."
  
  # Count how many files need migration
  file_count=$(find attached_assets -type f -not -path "*.gitkeep" | wc -l)
  
  if [ "$file_count" -gt 0 ]; then
    # Move all files from root attached_assets to public/attached_assets
    find attached_assets -type f -not -path "*.txt" -not -path "*.gitkeep" | while read -r file; do
      filename=$(basename "$file")
      if [ ! -f "public/attached_assets/$filename" ]; then
        echo "  Moving $filename to public/attached_assets/"
        cp "$file" "public/attached_assets/$filename"
        rm "$file"
      else
        echo "  File $filename already exists in public/attached_assets, removing from root"
        rm "$file"
      fi
    done
    
    # Also move error logs to a dedicated directory
    mkdir -p public/logs/errors
    find attached_assets -type f -name "*.txt" | while read -r file; do
      filename=$(basename "$file")
      if [ ! -f "public/logs/errors/$filename" ]; then
        echo "  Moving error log $filename to public/logs/errors/"
        cp "$file" "public/logs/errors/$filename"
        rm "$file"
      else
        echo "  Error log $filename already exists in public/logs/errors, removing from root"
        rm "$file"
      fi
    done
    
    # Create a .gitkeep file to preserve the directory structure
    touch attached_assets/.gitkeep
    
    echo "Asset migration complete. All files moved to public/attached_assets and error logs to public/logs/errors."
  else
    echo "No files found in attached_assets to migrate. Directory is already clean."
  fi

  # Create a symlink for backward compatibility
  if [ ! -L "attached_assets/public_assets_link" ]; then
    echo "Creating symlink for backward compatibility"
    ln -sf ../public/attached_assets attached_assets/public_assets_link
  fi
fi

# Specifically ensure venture logos are in public/logos/ventures
# and create case-normalized copies with consistent names
echo "Ensuring venture logos are in public/logos/ventures..."

# Key venture logos to ensure are available
declare -a VENTURE_LOGOS=(
  "2de-interspace.png"
  "hey-im-samir.png" 
  "interspace.png"
  "perspectives.png"
  "Predictive.film icon 2025.png"
  "Solo Wordmark - Gradient 2025.png"
)

for logo in "${VENTURE_LOGOS[@]}"; do
  # Create normalized name (lowercase, spaces to dashes)
  normalized=$(echo "$logo" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
  
  # Check in public/attached_assets (since we've now consolidated all assets here)
  if [ -f "public/attached_assets/$logo" ]; then
    echo "  Copying from public/attached_assets/$logo to public/logos/ventures/$normalized"
    cp "public/attached_assets/$logo" "public/logos/ventures/$normalized"
  else
    echo "  Warning: Could not find $logo in public/attached_assets"
  fi
done

# Ensure profile images are in the images directory
echo "Ensuring profile images are in public/images..."

# Key profile images to ensure are available
declare -a PROFILE_IMAGES=(
  "samir-profile-photo.webp"
  "samir.png"
  "hey-im-samir.png"
)

for image in "${PROFILE_IMAGES[@]}"; do
  # Check in public/attached_assets (since we've now consolidated all assets here)
  if [ -f "public/attached_assets/$image" ]; then
    echo "  Copying from public/attached_assets/$image to public/images/$image"
    cp "public/attached_assets/$image" "public/images/$image"
  else
    echo "  Warning: Could not find $image in public/attached_assets"
  fi
done

echo "Asset organization complete!"