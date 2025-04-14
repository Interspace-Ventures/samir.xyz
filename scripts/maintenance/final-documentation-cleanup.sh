#!/bin/bash

# Script to perform final documentation cleanup
echo "Performing final documentation cleanup..."

# 1. Make sure the consolidated README is set up correctly
# Run consolidate-readmes.sh to ensure all README files are properly handled
if [ -f "tools/scripts/consolidate-readmes.sh" ]; then
  echo "Running README consolidation..."
  ./tools/scripts/consolidate-readmes.sh
fi

# 2. Check if there are any .md files outside the /docs folder that should be linked to the main README
echo "Checking for other .md files that should be linked to the main README..."
md_files=$(find . -name "*.md" -not -path "*node_modules*" -not -path "*.cache*" -not -path "*.pythonlibs*" -not -path "./docs/*" -not -path "./README.md" -not -path "./config/README.md" -not -path "./tools/README.md")

if [ -n "$md_files" ]; then
  echo "Found .md files to process:"
  echo "$md_files"
  
  # Process each .md file
  for md_file in $md_files; do
    if [ ! -L "$md_file" ]; then
      # Get the relative path to the root README
      dir_path=$(dirname "$md_file")
      rel_path_to_root=$(realpath --relative-to="$dir_path" .)
      
      echo "Creating symlink from $md_file to root README.md..."
      
      # Remove the original file
      rm "$md_file"
      
      # Create a symlink from the original location to the root README
      ln -sf "$rel_path_to_root/README.md" "$md_file"
      
      echo "Created symlink from $md_file to root README.md"
    fi
  done
fi

# 3. Update version-config.json to indicate documentation cleanup is complete
if grep -q '"documentationCleanup"' config/version/version-config.json; then
  echo "Documentation cleanup already recorded in version-config.json."
else
  # Update version-config.json to indicate documentation cleanup is complete
  if ! grep -q '"features":' config/version/version-config.json; then
    # Add features object if it doesn't exist
    sed -i 's/{/{\n  "features": {},/g' config/version/version-config.json
  fi
  
  # Add documentationCleanup property
  sed -i 's/"features": {/"features": {\n    "documentationCleanup": true,/g' config/version/version-config.json
  echo "Updated version-config.json to indicate documentation cleanup is complete."
fi

echo "Documentation cleanup complete."