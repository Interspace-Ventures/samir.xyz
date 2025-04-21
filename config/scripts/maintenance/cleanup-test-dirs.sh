#!/bin/bash

# Script to clean up test/debug directories in the src/app folder
# This will move them to a backup location instead of deleting them

echo "Starting cleanup of test/debug directories..."

# Create backup directory
BACKUP_DIR="backup/test-dirs-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# List of test/debug directories to move
TEST_DIRS=(
  "src/app/basic"
  "src/app/basic-diagnostic" 
  "src/app/basic-test"
  "src/app/debug"
  "src/app/debug-portfolio"
  "src/app/grid-test"
  "src/app/simple-ventures"
  "src/app/test"
  "src/app/test-simple"
  "src/app/ultra-minimal"
)

# Process each directory
for dir in "${TEST_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo "Moving $dir to $BACKUP_DIR/"
    # Create target directory structure
    target_dir="$BACKUP_DIR/$(basename "$dir")"
    mkdir -p "$target_dir"
    
    # Copy files to backup
    cp -r "$dir"/* "$target_dir"/ 2>/dev/null || true
    
    # Remove the original directory
    rm -rf "$dir"
  else
    echo "Directory $dir does not exist, skipping"
  fi
done

echo "Cleanup complete. Test directories have been moved to $BACKUP_DIR"
echo "Original application structure has been preserved."