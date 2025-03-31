#!/bin/bash

# Script to consolidate README files into the docs folder
echo "Consolidating README files into docs folder..."

# Create sections in consolidated-README.md for each README
# First, back up the current consolidated-README.md
cp docs/consolidated-README.md docs/consolidated-README.md.bak

# Handle README files in config directory
if [ -f "config/README.md" ] && [ ! -L "config/README.md" ]; then
  echo "Adding config README content to consolidated documentation..."
  
  # Add config section if it doesn't exist
  if ! grep -q "## Configuration" docs/consolidated-README.md; then
    echo -e "\n## Configuration\n" >> docs/consolidated-README.md
    cat config/README.md | grep -v "^# Configuration" | grep -v "For complete documentation" >> docs/consolidated-README.md
  fi
  
  # Remove the original file
  rm config/README.md
  echo "Reference file removed: config/README.md"
fi

# Handle README files in tools directory
if [ -f "tools/README.md" ] && [ ! -L "tools/README.md" ]; then
  echo "Adding tools README content to consolidated documentation..."
  
  # Add tools section if it doesn't exist
  if ! grep -q "## Development Tools & Scripts" docs/consolidated-README.md; then
    echo -e "\n## Development Tools & Scripts\n" >> docs/consolidated-README.md
    cat tools/README.md | grep -v "^# Development Tools & Scripts" | grep -v "For complete documentation" >> docs/consolidated-README.md
  fi
  
  # Remove the original file
  rm tools/README.md
  echo "Reference file removed: tools/README.md"
fi

# Create a symlink from the original locations to the consolidated documentation
ln -sf ../docs/consolidated-README.md config/README.md
ln -sf ../docs/consolidated-README.md tools/README.md

echo "Created symlinks from config/README.md and tools/README.md to docs/consolidated-README.md"

# Update the root README to be more concise
if [ -f "README.md" ]; then
  # Keep the root README but make it point to the consolidated documentation
  cat > README.md << 'EOF'
# Portfolio Website

A cutting-edge personal portfolio website leveraging modern web technologies to create an immersive and interactive developer showcase.

## Documentation

All documentation is available in the [docs folder](./docs/):

- [Complete Documentation](./docs/consolidated-README.md)
- [Changelog](./docs/CHANGELOG.md)

## Tech Stack

- Next.js 15 with React 19
- TypeScript for type safety
- Tailwind CSS for styling
- Bun runtime environment

## Quick Start

```bash
# Start the development server
./start.sh
```

Visit [http://localhost:5000](http://localhost:5000)
EOF

  echo "Updated root README.md to point to consolidated documentation."
fi

# Check for any other README files (excluding node_modules, .cache, and public directories)
echo "Searching for other README files that should be removed or symlinked..."
other_readmes=$(find . -name "README*" -not -path "*node_modules*" -not -path "*.cache*" -not -path "./README.md" -not -path "./docs/*" -not -path "./config/README.md" -not -path "./tools/README.md" -not -path "./public/logs/errors/README.txt")

if [ -n "$other_readmes" ]; then
  echo "Found additional README files to process:"
  echo "$other_readmes"
  
  # Process each README file
  for readme in $other_readmes; do
    dir_path=$(dirname "$readme")
    filename=$(basename "$readme")
    rel_path=$(realpath --relative-to="$dir_path" "docs")
    
    # Check if file is not already a symlink
    if [ ! -L "$readme" ]; then
      echo "Processing $readme..."
      
      # If it's a .md file, incorporate content into consolidated README
      if [[ "$filename" == *.md ]]; then
        dir_name=$(basename "$dir_path")
        section_title="## $dir_name"
        
        # Convert to title case
        section_title=$(echo "$section_title" | sed 's/\b\(.\)/\u\1/g')
        
        # Add content to consolidated README
        if ! grep -q "$section_title" docs/consolidated-README.md; then
          echo -e "\n$section_title\n" >> docs/consolidated-README.md
          cat "$readme" | grep -v "^# " >> docs/consolidated-README.md
          echo -e "\n" >> docs/consolidated-README.md
        fi
      fi
      
      # Remove the original file
      rm "$readme"
      echo "Removed $readme"
      
      # Create a symlink to the consolidated documentation
      ln -sf "$rel_path/consolidated-README.md" "$readme"
      echo "Created symlink from $readme to consolidated documentation"
    fi
  done
fi

echo "README consolidation complete."

# Update version-config.json to indicate README consolidation is complete
if grep -q '"readmeConsolidation"' config/version/version-config.json; then
  echo "README consolidation already recorded in version-config.json."
else
  # Update version-config.json to indicate README consolidation is complete
  if ! grep -q '"features":' config/version/version-config.json; then
    # Add features object if it doesn't exist
    sed -i 's/{/{\n  "features": {},/g' config/version/version-config.json
  fi
  
  # Add readmeConsolidation property
  sed -i 's/"features": {/"features": {\n    "readmeConsolidation": true,/g' config/version/version-config.json
  echo "Updated version-config.json to indicate README consolidation is complete."
fi