#!/bin/bash

echo "Starting Next.js development server... VERSION 4.6"

# Make scripts executable if needed
chmod +x *.sh
mkdir -p tools/scripts
chmod +x tools/scripts/organize-assets.sh 2>/dev/null || true
chmod +x tools/scripts/cleanup-test-dirs.sh 2>/dev/null || true
chmod +x tools/scripts/final-cleanup.sh 2>/dev/null || true
chmod +x tools/scripts/cleanup-root-dir.sh 2>/dev/null || true
chmod +x tools/scripts/consolidate-readmes.sh 2>/dev/null || true
chmod +x tools/scripts/final-documentation-cleanup.sh 2>/dev/null || true

# Create public directories structure
mkdir -p public/attached_assets
mkdir -p public/logos/ventures
mkdir -p public/screenshots
mkdir -p public/logs/errors

# Run asset organization script to ensure consistent file structure
echo "Organizing assets for consistency..."
echo "NOTE: Assets are now consolidated to public/attached_assets only!"
./tools/scripts/organize-assets.sh

# Check if we should run final cleanup
# This will only happen if assets have been migrated at least once
if [ -d "attached_assets" ] && [ -d "public/attached_assets" ]; then
  # Count remaining files
  remaining_files=$(find attached_assets -type f -not -path "*.gitkeep" -not -path "*public_assets_link*" | wc -l)
  public_files=$(find public/attached_assets -type f | wc -l)
  
  if [ "$remaining_files" -eq 0 ] && [ "$public_files" -gt 0 ]; then
    # Only attempt final cleanup if assets are properly migrated
    if ! grep -q '"assetCleanup":true' config/version/version-config.json 2>/dev/null; then
      echo "Asset migration complete. Running final cleanup..."
      ./tools/scripts/final-cleanup.sh
    else
      echo "Asset cleanup already completed."
    fi
  fi
fi

# Check for test directories and clean them up if found
if ls -d src/app/{basic,basic-diagnostic,basic-test,debug,debug-portfolio,grid-test,simple-ventures,test,test-simple,ultra-minimal} 2>/dev/null >/dev/null; then
  echo "Found test directories, cleaning up..."
  ./tools/scripts/cleanup-test-dirs.sh
fi

# Run root directory cleanup if not done before
# Look for a marker file to determine if cleanup has already been performed
if [ ! -f "tools/archive/root-cleanup-date.txt" ] && [ -f "tools/scripts/cleanup-root-dir.sh" ]; then
  echo "Cleaning up root directory structure..."
  ./tools/scripts/cleanup-root-dir.sh
fi

# Consolidate README files if not already done
if [ -f "tools/scripts/consolidate-readmes.sh" ]; then
  if ! grep -q '"readmeConsolidation":true' config/version/version-config.json 2>/dev/null; then
    echo "Consolidating README files to docs directory..."
    ./tools/scripts/consolidate-readmes.sh
  else
    echo "README consolidation already completed."
  fi
fi

# Run final documentation cleanup if not already done
if [ -f "tools/scripts/final-documentation-cleanup.sh" ]; then
  if ! grep -q '"documentationCleanup":true' config/version/version-config.json 2>/dev/null; then
    echo "Performing final documentation cleanup..."
    ./tools/scripts/final-documentation-cleanup.sh
  else
    echo "Documentation cleanup already completed."
  fi
fi

# Only clean up processes if they're causing issues
if pgrep -f "next" >/dev/null; then
  echo "Cleaning up existing Next.js processes..."
  pkill -f "next" || true
fi

# Define necessary environment variables
export NODE_ENV=development
export NEXT_TELEMETRY_DISABLED=1
# Keep only essential environment variables
export PORT=5000
export HOSTNAME=0.0.0.0

# Set optimized Node options
export NODE_OPTIONS="--max-http-header-size=16384 --max-old-space-size=4096"

# Only create .next directory if it doesn't exist
mkdir -p .next 2>/dev/null || true

# Update webview compatibility (only if file doesn't exist)
if [ ! -f public/webview-compat.js ]; then
  echo "Creating WebView compatibility script..."
  # Create a backup of our script (previously pasted here)
  echo "// Set WebView compatibility flag for the application
window.__NEXT_WEBVIEW_COMPATIBILITY__ = true;

// Immediately apply visibility enforcement for WebView
(function() {
  console.log('WebView compatibility script: initializing');
  
  // Make content visible immediately (don't wait for hydration)
  document.documentElement.setAttribute('data-webview-ready', 'true');
  
  // Apply immediate visibility to the body when it becomes available
  function enforceVisibility() {
    if (document.body) {
      // Apply multiple important inline styles for maximum visibility
      document.body.setAttribute('style', 
        'visibility: visible !important; ' +
        'opacity: 1 !important; ' + 
        'display: block !important; ' +
        'animation: none !important; ' +
        'transition: none !important;'
      );
      
      // Apply to all major containers
      var containers = document.querySelectorAll(
        'body > *, ' + 
        '#__next, ' + 
        '#__next > *, ' + 
        'main, ' + 
        '[class*=\"container\"], ' + 
        '[class*=\"content\"], ' + 
        '.flex-grow'
      );
      
      for (var i = 0; i < containers.length; i++) {
        containers[i].setAttribute('style', 
          'visibility: visible !important; ' +
          'opacity: 1 !important; ' + 
          'display: block !important;'
        );
      }
      
      console.log('WebView compatibility script: enforced visibility');
    } else {
      // If body isn't available yet, try again very soon
      setTimeout(enforceVisibility, 10);
    }
  }
  
  // Patch any theme-related functions to ensure they don't hide content
  // This prevents theme flashing protection from hiding content
  function patchThemeMethods() {
    if (window.next && window.next.themes) {
      // Backup the original methods
      var original = window.next.themes;
      
      // Override with versions that don't hide content
      window.next.themes = {
        ...original,
        // Ensure the setTheme method doesn't hide content temporarily
        setTheme: function(theme) {
          // Call original but ensure visibility immediately after
          var result = original.setTheme(theme);
          enforceVisibility();
          return result;
        }
      };
      
      console.log('WebView compatibility: patched next-themes');
    }
  }
  
  // Start enforcement immediately
  enforceVisibility();
  
  // Also apply when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    enforceVisibility();
    patchThemeMethods();
    console.log('WebView compatibility: DOMContentLoaded handler fired');
  });
  
  // And when window is fully loaded
  window.addEventListener('load', function() {
    enforceVisibility();
    patchThemeMethods();
    console.log('WebView compatibility: load handler fired');
  });
  
  // Create a MutationObserver to watch for any changes that might hide content
  if (typeof MutationObserver !== 'undefined') {
    setTimeout(function() {
      var observer = new MutationObserver(function(mutations) {
        // Force visibility after any DOM changes that might affect visibility
        enforceVisibility();
      });
      
      // Start observing once the body is available
      if (document.body) {
        observer.observe(document.body, { 
          attributes: true, 
          childList: true, 
          subtree: true 
        });
        console.log('WebView compatibility: MutationObserver started');
      }
    }, 100); // Short delay to ensure body is available
  }
  
  // Set periodic enforcement as a fallback
  var forcedInterval = setInterval(function() {
    enforceVisibility();
  }, 500); // Check every 500ms as an ultimate fallback
  
  // Clear interval after 5 seconds (should be fully loaded by then)
  setTimeout(function() {
    clearInterval(forcedInterval);
    console.log('WebView compatibility: stopped periodic enforcement');
  }, 5000);
})();" > public/webview-compat.js
  echo "Created WebView compatibility script with comprehensive visibility enforcement"
else
  echo "WebView compatibility script already exists, preserving custom implementation"
fi

# Create symlink from next.config.js to the proper config location
echo "Creating symlink for Next.js configuration..."
if [ -f "config/next/next.config.js" ]; then
  ln -sf config/next/next.config.js next.config.js
elif [ -f "next-config.js" ]; then
  ln -sf next-config.js next.config.js
else
  echo "Warning: No Next.js config file found. Using fallback location."
  ln -sf next-config.js next.config.js
fi

# Test server script
chmod +x tools/scripts/test-server.sh 2>/dev/null || true

# Start the Next.js development server
echo "Starting Next.js dev server on port 5000 (http://0.0.0.0:5000)..."
# Fork a background process to run tests after server startup
(
  # Wait for server to be up
  echo "Waiting for Next.js server to be ready..."
  for i in {1..30}; do
    if curl -s http://localhost:5000/ > /dev/null; then
      echo "Server is ready. Running server tests..."
      ./tools/scripts/test-server.sh
      break
    fi
    sleep 1
  done
) &
exec bun run next dev -p 5000 --hostname 0.0.0.0 --turbo