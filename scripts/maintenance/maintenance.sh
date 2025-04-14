#!/bin/bash

# Maintenance script for portfolio website
# Provides a convenient interface for running common maintenance tasks
#
# Usage: ./tools/scripts/maintenance.sh [command]
#   commands:
#     organize - Run the organize-assets.sh script
#     cleanup-tests - Run the cleanup-test-dirs.sh script
#     final-cleanup - Run the final-cleanup.sh script
#     help - Show this help message

# Make sure all scripts are executable
chmod +x tools/scripts/organize-assets.sh
chmod +x tools/scripts/cleanup-test-dirs.sh
chmod +x tools/scripts/final-cleanup.sh

# Function to display help
show_help() {
  echo "Portfolio Website Maintenance Tool"
  echo "--------------------------------"
  echo "Usage: ./tools/scripts/maintenance.sh [command]"
  echo
  echo "Commands:"
  echo "  organize       - Run the organize-assets.sh script to consolidate assets"
  echo "  cleanup-tests  - Run the cleanup-test-dirs.sh script to remove test directories"
  echo "  final-cleanup  - Run the final-cleanup.sh script for complete asset cleanup"
  echo "  status         - Show the current status of assets and cleanup"
  echo "  help           - Show this help message"
  echo
  echo "Example: ./tools/scripts/maintenance.sh organize"
}

# Function to show status
show_status() {
  echo "Portfolio Website Status"
  echo "----------------------"
  
  # Check assets
  echo "Asset status:"
  echo "  Files in attached_assets: $(find attached_assets -type f | wc -l)"
  echo "  Files in public/attached_assets: $(find public/attached_assets -type f 2>/dev/null | wc -l)"
  echo "  Error logs in public/logs/errors: $(find public/logs/errors -type f 2>/dev/null | wc -l)"
  echo "  Logos in public/logos/ventures: $(find public/logos/ventures -type f 2>/dev/null | wc -l)"
  
  # Check version status
  if grep -q '"assetCleanup": *true' version.json 2>/dev/null; then
    echo "  Asset cleanup marked as complete in version.json"
  else
    echo "  Asset cleanup not marked as complete in version.json"
  fi
  
  # Check test directories
  if ls -d src/app/{basic,basic-diagnostic,basic-test,debug,debug-portfolio,grid-test,simple-ventures,test,test-simple,ultra-minimal} 2>/dev/null >/dev/null; then
    echo "  Test directories exist and should be cleaned up"
  else
    echo "  No test directories found"
  fi
}

# Main logic
case "$1" in
  organize)
    echo "Running asset organization..."
    ./tools/scripts/organize-assets.sh
    ;;
  cleanup-tests)
    echo "Running test directory cleanup..."
    ./tools/scripts/cleanup-test-dirs.sh
    ;;
  final-cleanup)
    echo "Running final asset cleanup..."
    ./tools/scripts/final-cleanup.sh
    ;;
  status)
    show_status
    ;;
  help|--help|-h|"")
    show_help
    ;;
  *)
    echo "Unknown command: $1"
    echo "Run './tools/scripts/maintenance.sh help' for usage information"
    exit 1
    ;;
esac

exit 0