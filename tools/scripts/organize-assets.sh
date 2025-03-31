#!/bin/bash

# Script to organize assets into consistent locations for the Next.js app
# This ensures all images are properly accessible from the public directory

echo "Organizing image assets..."

# Create necessary directories
mkdir -p public/attached_assets
mkdir -p public/logos/ventures

# Copy images from the root attached_assets to public/attached_assets if they don't exist
echo "Copying assets from attached_assets to public/attached_assets..."
find attached_assets -type f -not -path "*.txt" | while read -r file; do
  filename=$(basename "$file")
  if [ ! -f "public/attached_assets/$filename" ]; then
    echo "  Copying $filename to public/attached_assets/"
    cp "$file" "public/attached_assets/$filename"
  fi
done

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
  
  # First check in attached_assets
  if [ -f "attached_assets/$logo" ]; then
    echo "  Copying $logo to public/logos/ventures/$normalized"
    cp "attached_assets/$logo" "public/logos/ventures/$normalized"
  # Then check in public/attached_assets
  elif [ -f "public/attached_assets/$logo" ]; then
    echo "  Copying from public/attached_assets/$logo to public/logos/ventures/$normalized"
    cp "public/attached_assets/$logo" "public/logos/ventures/$normalized"
  else
    echo "  Warning: Could not find $logo in attached_assets or public/attached_assets"
  fi
done

echo "Asset organization complete!"